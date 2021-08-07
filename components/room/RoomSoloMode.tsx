import React, { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { app } from '@/utils/api'
import {
  QuestionMarkCircleIcon,
  AnnotationIcon,
  FlagIcon,
  ClockIcon,
} from '@heroicons/react/outline'
import { userContext } from '../auth/userProvider'
import { roomContext } from './roomProvider'
import { shuffle, drop, filter, chunk, get } from 'lodash'
import { Twemoji } from 'react-emoji-render'

import UserList from '@/components/room/UserList'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { ROOM } from '@/utils/constant'

interface Props {}

export default function RoomSoloMode({}: Props): ReactElement {
  const user = userContext()
  const room = roomContext()

  const [listQuestion, setListQuestion] = useState<Array<any>>([])
  const [currentQuestion, setCurrentQuestion] = useState<any>({})
  const [isWin, setIsWin] = useState(false)

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

  const setWin = async () => {
    try {
      await roomService.patch(room.id, {
        status: ROOM.STATUS.END,
      })
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

  const onAnswer = ({ isCorrect }) => {
    if (isCorrect) {
      toast.success('Correct!')
      setScore()
    } else {
      toast.error('Wrong!')
    }
    makeQuestion(shuffle(listQuestion))
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

  useEffect(() => {
    // Check score
    // TODO: check time
    if (
      get(room, `status`) == ROOM.STATUS.PLAYING &&
      +get(room, `users.${user?.id}.score`) >= +get(room, `game.rule.score`)
    ) {
      console.log('Win')
      setWin()
      setIsWin(true)
    } else {
      console.log('Not win')
    }
  }, [room])

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
        {/* <ClockIcon width="20" /> */}
        <FlagIcon width="20" />
        <div>Goal: 10 correct answer </div>
      </div>

      <div className={`mt-2`}>
        <UserList />
      </div>
      <div className={`my-2`}>
        <hr />
      </div>

      {/* Question Choice */}
      <div className={`mt-2 mb-12 p-2 max-w-xl mx-auto`}>
        <div
          className={`my-2 text-blue-500 font-semibold flex items-center space-x-1`}
        >
          <QuestionMarkCircleIcon className={``} width="20" />
          <div>Question </div>
        </div>
        <div className={`mx-4 my-3`}>
          <div
            dangerouslySetInnerHTML={{ __html: currentQuestion?.question }}
            className={`prose`}
          ></div>
        </div>
        <div>
          <div className={`mt-5 mb-2`}>
            <div
              className={`font-semibold text-blue-500 flex items-center space-x-1 w-full`}
            >
              <AnnotationIcon width="20"></AnnotationIcon>
              <div className={`flex-1`}>Select answer</div>
            </div>
          </div>

          <div className={`mx-4`}>
            {/* List answer */}
            {currentQuestion?.answers &&
              currentQuestion?.answers.map((i, k) => (
                <button
                  onClick={() => onAnswer(i)}
                  key={k}
                  className={`p-3 my-3 w-full text-left  border-2 border-gray-400 hover:border-blue-500 rounded-md `}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: i.answer,
                    }}
                    className={`prose`}
                  ></div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
