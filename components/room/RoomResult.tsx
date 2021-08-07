import React, { ReactElement } from 'react'
import { userContext } from '../auth/userProvider'
import Button from '../base/Button'
import { roomContext } from './roomProvider'
import { toArray } from 'lodash'
import { app } from '@/utils/api'
import toast from 'react-hot-toast'
import router from 'next/router'
import { PAGES } from '@/utils/constant'

interface Props {}

export default function RoomResult({}: Props): ReactElement {
  const user = userContext()
  const room = roomContext()

  const listUser = toArray(room?.users)

  const collectionSevcice = app.service('collection')
  const roomService = app.service('room')

  const deleteRoom = async () => {
    try {
      await roomService.remove(room.id)
      toast.success('Deleted!')
      router.push(PAGES.DASHBOARD)
    } catch (error) {
      console.error(error)
    }
  }

  const newRoom = async () => {
    try {
      router.push(PAGES.NEW_ROOM)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={`mb-12`}>
      <div className={`my-4`}>
        <div className="text-center font-semibold text-2xl text-green-500">
          Result
        </div>
      </div>

      <div className={`p-2 `}>
        {room?.users &&
          listUser.map((i, k) => (
            <div key={k} className="flex justify-center items-center mb-4">
              <div className={`mr-2`} style={{ flex: '0 0 42px' }}>
                {k < 3 ? (
                  <img className={`w-full`} src={`/${k}.svg`} alt="" />
                ) : null}
              </div>

              <div className={`flex items-center space-x-2 font-semibold `}>
                <img className={`w-14 rounded-full`} src={i?.info?.image} />
                <div className={``}>
                  <div className={``}>{i?.info?.name}</div>
                  <div>Score: {i?.score}</div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="my-4">
        <div className={`flex my-2 justify-center`}>
          <Button onClick={newRoom} color="info" icon="plus-outline">
            New Room
          </Button>
        </div>
        <div className={`my-3`}>
          <hr />
        </div>
        <div className={`flex my-2 justify-center`}>
          <Button onClick={deleteRoom} icon="trash-outline" color="warning">
            Delete room
          </Button>
        </div>
      </div>
    </div>
  )
}
