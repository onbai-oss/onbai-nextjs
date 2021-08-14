import { app } from '@/utils/api'
import { pick, toArray } from 'lodash-es'
import React, { ReactElement } from 'react'
import toast from 'react-hot-toast'
import { userContext } from '../auth/userProvider'
import Button from '../base/Button'
import { roomContext } from './roomProvider'

interface Props {}

export default function RoomUserJoin({}: Props): ReactElement {
  const user = userContext()
  const room = roomContext()
  const listRoomUser = toArray(room.users)
  const id = room.id

  const isInRoom = room.users ? Boolean(room.users[user?.id]) : false

  const roomService = app.service(`room`)

  const joinRoom = async () => {
    try {
      let roomData = await roomService.patch(id, {
        $set: {
          ['users.' + user?.id]: {
            role: 'guest',
            score: 0,
            info: pick(user, 'image', 'email', 'name'),
          },
        },
      })
      console.log(roomData)
      toast.success('Success')
    } catch (error) {
      console.error(error)
    }
  }
  const outRoom = async () => {
    try {
      let roomData = await roomService.patch(id, {
        $unset: { ['users.' + user?.id]: '' },
      })
      console.log(roomData)
      toast.success('Success')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {isInRoom ? (
        <section>
          <div className={`text-center my-4 font-semibold`}>
            <h1 className={`animate-pulse`}>Waiting for room start...</h1>
          </div>
          <div className={`flex justify-center my-2`}>
            <Button icon="log-out-outline" color="warning" onClick={outRoom}>
              Leave Room
            </Button>
          </div>
        </section>
      ) : (
        <section>
          <div className={`flex justify-center my-2`}>
            <Button icon="log-in-outline" color="info" onClick={joinRoom}>
              Join Room
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
