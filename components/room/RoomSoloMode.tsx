import React, { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { app } from '@/utils/api'
import {
  QuestionMarkCircleIcon,
  AnnotationIcon,
  FlagIcon,
  ClockIcon,
  CogIcon,
} from '@heroicons/react/outline'
import { userContext } from '../auth/userProvider'
import { roomContext } from './roomProvider'
import { shuffle, filter, chunk, get } from 'lodash-es'
import { Twemoji } from 'react-emoji-render'

import UserList from '@/components/room/UserList'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { ROOM } from '@/utils/constant'
import Button from '../base/Button'
import { useInterval } from 'react-use'
import dayjs from 'dayjs'
import { Disclosure } from '@headlessui/react'

interface Props {}

export default function RoomSoloMode({}: Props): ReactElement {
  const user = userContext()
  const room = roomContext()
  const roomRule = room?.game?.rule
  const isAuthor = user?.id === room?.userId

  const [listQuestion, setListQuestion] = useState<Array<any>>([])
  const [currentQuestion, setCurrentQuestion] = useState<any>({})
  const [isShowResult, setIsShowResult] = useState(false)
  const [isShowGenQuiz, setIsShowGenQuiz] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const [timer, setTimer] = useState('--:--')

  const collectionSevcice = app.service('collection')
  const roomService = app.service('room')
  const questionSevice = app.service('question')

  const setScore = async () => {
    try {
      await roomService.patch(room.id, {
        $inc: { ['users.' + user?.id + '.score']: 1 },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const endGame = async () => {
    try {
      await roomService.patch(room.id, {
        status: ROOM.STATUS.END,
      })
      confetti()
    } catch (error) {
      console.error(error)
    }
  }

  const makeQuestion = (list) => {
    console.log('list', list)

    const listRandom = shuffle(list)
    const randomQuest = listRandom[0]
    const listFake = chunk(
      shuffle(filter(listRandom, (o) => o.id != randomQuest.id)),
      2
    )[0]
    randomQuest['answers'] = shuffle([
      { answer: randomQuest.answer, isCorrect: true },
      ...listFake.map((i) => ({ answer: i.answer, isCorrect: false })),
    ])

    console.log('randomQuest', randomQuest)
    setCurrentQuestion(randomQuest)
    setListQuestion(listRandom)
  }

  const wait = (t: number) => new Promise((r) => setTimeout(() => r(t), t))

  const onAnswer = async ({ isCorrect }) => {
    setIsShowResult(true)
    setIsCorrect(isCorrect)
    if (isCorrect) {
      setScore()
    }
  }

  const nextQuestion = async () => {
    window.scrollTo(0, 0)
    setIsShowResult(false)
    setIsShowGenQuiz(true)
    await wait(500)
    setIsShowGenQuiz(false)
    makeQuestion(shuffle(listQuestion))
  }

  const deleteRoom = async () => {
    try {
      await roomService.remove(room.id)
      toast.success('Deleted!')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const listCollectionID = room.collections.map((i) => i.id)
    questionSevice
      .find({
        query: {
          collectionId: {
            $in: listCollectionID,
          },
        },
      })
      .then((res) => {
        makeQuestion(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  const checkTimeUp = () => {
    const current = dayjs()
    const endTime = dayjs(get(room, `game.endTime`))
    const diff = dayjs.duration(endTime.diff(current)).format('mm:ss')
    if (current.isAfter(endTime)) {
      setTimer('Time up.')
      endGame()
    } else {
      setTimer(diff)
    }
  }

  useEffect(() => {
    // check time
    const userScore = +get(room, `users.${user?.id}.score`)
    const ruleScore = +get(room, `game.rule.score`)
    const ruleMode = get(room, `game.rule.mode`)

    if (
      [ROOM.RULE.TIMER, ROOM.RULE.ALL].includes(ruleMode) &&
      get(room, `status`) == ROOM.STATUS.PLAYING
    ) {
      checkTimeUp()
    }

    // check score
    if (
      [ROOM.RULE.SCORE, ROOM.RULE.ALL].includes(ruleMode) &&
      get(room, `status`) == ROOM.STATUS.PLAYING &&
      userScore >= ruleScore
    ) {
      endGame()
    }
  }, [room])

  useInterval(
    () => {
      checkTimeUp()
    },
    [ROOM.RULE.TIMER, ROOM.RULE.ALL].includes(get(room, `game.rule.mode`))
      ? 1000
      : null
  )

  const correctAnswer =
    currentQuestion?.answers &&
    currentQuestion?.answers
      .filter((i) => i.isCorrect)
      .map((i, k) => (
        <div
          key={k}
          className={`p-3 my-3 w-full text-left border-2 border-gray-400 rounded-md `}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: i.answer,
            }}
            className={`prose`}
          ></div>
        </div>
      ))
  return (
    <>
      <div className={`mt-2 p-2 flex justify-center items-center`}>
        <div className={`mr-1 `}>
          <Twemoji text={room?.password ? '🔒' : '#'} />
        </div>
        <div>
          <h1 className={`text-2xl font-semibold`}> {room?.name}</h1>
        </div>
      </div>

      <div
        className={`flex justify-center items-center font-semibold space-x-1.5`}
      >
        {roomRule.mode == ROOM.RULE.SCORE ? (
          <>
            <FlagIcon width="20" />
            <div>Goal: {roomRule.score} correct answer </div>
          </>
        ) : null}

        {roomRule.mode == ROOM.RULE.TIMER ? (
          <>
            <ClockIcon width="20" />
            <div>{timer}</div>
          </>
        ) : null}

        {roomRule.mode == ROOM.RULE.ALL ? (
          <div>
            <div
              className={`flex justify-center items-center font-semibold space-x-1.5 mb-1`}
            >
              <FlagIcon width="20" />
              <div>Goal: {roomRule.score} correct answer </div>
            </div>
            <div
              className={`flex justify-center items-center font-semibold space-x-1.5`}
            >
              <ClockIcon width="20" />
              <div>{timer}</div>
            </div>
          </div>
        ) : null}
      </div>

      <div className={`mt-2`}>
        <UserList />
      </div>
      <div className={`my-2`}>
        <div
          className={`border-t-2 border-gray-300 border-dashed container mx-auto`}
        ></div>
      </div>

      {/* Question Choice */}
      <div className="px-2">
        <section className={`mt-4 mb-12 p-2 max-w-xl mx-auto paper relative`}>
          <div
            className={`my-2 text-blue-500 font-semibold flex items-center space-x-1`}
          >
            <QuestionMarkCircleIcon className={``} width="20" />
            <div>Question </div>
          </div>
          <div className={`mx-4 my-3`}>
            {isShowGenQuiz ? (
              <div className={`flex justify-center`}>
                <div className={`w-full`}>
                  <div></div>
                  <div
                    className={`px-3 py-6 my-3 w-full bg-gray-200 animate-pulse rounded`}
                  ></div>
                  <div
                    className={`px-3 py-3 my-3 w-full bg-gray-200 animate-pulse rounded`}
                  ></div>
                  <div
                    className={`px-3 py-2 my-3 w-full bg-gray-200 animate-pulse rounded`}
                  ></div>
                </div>
              </div>
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: currentQuestion?.question }}
                className={`prose`}
              ></div>
            )}
          </div>
          <div>
            <div className={`mt-5 mb-2`}>
              <div
                className={`font-semibold text-blue-500 flex items-center space-x-1 w-full`}
              >
                <AnnotationIcon width="20"></AnnotationIcon>
                <div className={`flex-1`}>Choose the correct answer</div>
              </div>
            </div>
            <div className={`mx-4 relative`}>
              {/* List answer */}
              {!isShowGenQuiz &&
                !isShowResult &&
                currentQuestion?.answers &&
                currentQuestion?.answers.map((i, k) => (
                  <button
                    onClick={() => onAnswer(i)}
                    key={k}
                    className={`p-3 my-3 w-full text-left border-2 border-gray-400 sm:hover:border-blue-500 rounded-md `}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: i.answer,
                      }}
                      className={`prose`}
                    ></div>
                  </button>
                ))}

              {isShowGenQuiz && (
                <div>
                  <div
                    className={`px-3 py-2 my-3 w-full bg-gray-200 animate-pulse rounded`}
                  ></div>
                  <div
                    className={`px-3 py-2 my-3 w-full bg-gray-200 animate-pulse rounded`}
                  ></div>
                  <div
                    className={`px-3 py-2 my-3 w-full bg-gray-200 animate-pulse rounded`}
                  ></div>
                </div>
              )}

              {isShowResult && (
                <div>
                  {isCorrect ? (
                    <div className={`p-2 text-center `}>
                      <div className={`text-green-500 text-xl font-semibold`}>
                        Yay! it correct!
                      </div>
                      {correctAnswer}
                    </div>
                  ) : (
                    <div className={`p-2 text-center `}>
                      <div
                        className={`text-yellow-500 text-xl font-semibold mb-2`}
                      >
                        Opps! it not correct.
                      </div>

                      <div className={`font-semibold text-gray-500`}>
                        The correct answer
                      </div>
                      {correctAnswer}
                    </div>
                  )}

                  <div className={`flex justify-center mb-4`}>
                    <div
                      className={`animate__animated animate__fadeIn animate__faster `}
                    >
                      <Button
                        type="button"
                        id="btn-focus"
                        onClick={nextQuestion}
                        color="info"
                        icon="arrow-forward-outline"
                      >
                        Next question
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {isAuthor ? (
        <div className={`my-4`}>
          <Disclosure>
            <Disclosure.Button className="py-2 flex justify-center w-full">
              <CogIcon
                width="24"
                className={`text-gray-500 hover:opacity-75`}
              />
            </Disclosure.Button>
            <Disclosure.Panel>
              <div>
                <div className={`border-t-2 border-dashed mb-4`}></div>
                <div className={`flex my-2 justify-center`}>
                  <Button
                    onClick={deleteRoom}
                    icon="trash-outline"
                    color="warning"
                  >
                    Delete room
                  </Button>
                </div>
              </div>
            </Disclosure.Panel>
          </Disclosure>
        </div>
      ) : null}
    </>
  )
}
