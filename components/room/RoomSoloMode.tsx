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
import { shuffle } from 'lodash'
import { Twemoji } from 'react-emoji-render'

import UserList from '@/components/room/UserList'

interface Props {}

export default function RoomSoloMode({}: Props): ReactElement {
  const user = userContext()
  const room = roomContext()

  const [listQuestion, setListQuestion] = useState<Array<any>>([])
  const [currentQuestion, setCurrentQuestion] = useState<any>({})

  const collectionSevcice = app.service('collection')
  const questionSevice = app.service('question')

  useEffect(() => {
    console.log('solo', room)
    const listCollectionID = room.collections.map((i) => i.id)
    console.log(listCollectionID)

    questionSevice
      .find({
        query: {
          collectionId: {
            $in: listCollectionID,
          },
        },
      })
      .then((res) => {
        console.log(res)
        setListQuestion(shuffle(res.data))
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])
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
        <div>Correct: 0/10 </div>
      </div>

      <div className={`mt-2`}>
        <UserList />
      </div>
      <div className={`my-2`}>
        <hr />
      </div>

      {/* Question Choice */}
      <div className={`mt-2 mb-8 p-2 max-w-xl mx-auto`}>
        <div
          className={`my-2 text-blue-500 font-semibold flex items-center space-x-1`}
        >
          <QuestionMarkCircleIcon className={``} width="20" />
          <div>Question 1:</div>
        </div>
        <div className={`mx-4 my-3`}>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
            suscipit dicta accusantium tempore veniam commodi harum. Assumenda
            at qui, nesciunt ex repellendus accusamus mollitia reiciendis
            deleniti adipisci quas repudiandae illum libero harum aliquam
            doloremque vitae laudantium dolorum et ducimus ipsam? Quam, sint
            explicabo iusto laboriosam recusandae alias ipsam similique nulla.
          </div>
        </div>
        <div>
          <div className={`my-3 `}>
            <div
              className={`font-semibold text-blue-500 flex items-center space-x-1 w-full`}
            >
              <AnnotationIcon width="20"></AnnotationIcon>
              <div className={`flex-1`}>Select answer:</div>
            </div>
          </div>

          <div className={`mx-4`}>
            <button
              className={`p-3 my-3 w-full text-left shadow-md hover:shadow-xl border-2 border-gray-300 hover:border-blue-300 rounded-md`}
            >
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
            </button>
            <button
              className={`p-3 my-3 w-full text-left shadow-md hover:shadow-xl border-2 border-gray-300 hover:border-blue-300 rounded-md`}
            >
              <div>eccc</div>
            </button>
            <button
              className={`p-3 my-3 w-full text-left shadow-md hover:shadow-xl border-2 border-gray-300 hover:border-blue-300 rounded-md`}
            >
              <div>eccc</div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
