import React, { ReactElement, useState } from 'react'
import { userContext } from '../auth/userProvider'
import Button from '../base/Button'
import { roomContext } from './roomProvider'
import { toArray } from 'lodash-es'
import { app } from '@/utils/api'
import toast from 'react-hot-toast'
import router from 'next/router'
import { PAGES } from '@/utils/constant'
import Link from 'next/link'
import { Modal } from '../base/Modal'
import dayjs from 'dayjs'

interface Props {}

export default function RoomResult({}: Props): ReactElement {
  const [isShowDelete, setIsShowDelete] = useState(false)

  const user = userContext()
  const room = roomContext()
  const isAuthor = user?.id === room?.userId

  const listUser = toArray(room?.users)

  const collectionSevcice = app.service('collection')
  const roomService = app.service('room')

  const deleteRoom = async () => {
    try {
      await roomService.remove(room.id)
      toast.success('Deleted!')
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
    <>
      <div className={`mb-12`}>
        <div className={``}>
          <div className={`mt-2 p-2 flex justify-center items-center`}>
            <div>
              <h1 className={`text-2xl font-semibold`}> {room?.name}</h1>
            </div>
          </div>

          <div className=" text-center font-semibold text-2xl text-green-500">
            Result
          </div>
          <div className={`mb-3  text-sm text-center`}>
            {room?.game?.startTime
              ? dayjs(room?.game?.startTime).format('DD/MM/YYYY mm:ss')
              : null}
          </div>
        </div>

        <div className={`p-2 `}>
          {room?.users &&
            listUser
              .sort((a, b) => +b.score - +a.score)
              .map((i, k) => (
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

        {isAuthor ? (
          <div className="my-8">
            <div className={`flex my-2 justify-center`}>
              <Link href={PAGES.DASHBOARD}>
                <Button icon="compass-outline" color="primary">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
            <div className={`my-3`}>
              <hr />
            </div>
            <div className={`flex my-2 justify-center`}>
              <Button
                onClick={() => setIsShowDelete(true)}
                icon="trash-outline"
                color="warning"
              >
                Delete room
              </Button>
            </div>
          </div>
        ) : (
          <div className="my-8">
            <div className={`my-3`}>
              <hr />
            </div>
            <div className={`flex my-2 justify-center`}>
              <Link href={PAGES.DASHBOARD}>
                <Button icon="compass-outline" color="primary">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isShowDelete} closeModal={() => setIsShowDelete(false)}>
        <div className={`p-2`}>
          <div className={`text-2xl font-semibold`}>
            <h1>Are you sure? It can't revert.</h1>
          </div>
          <div className={`w-64 mx-auto`}>
            <img className={`w-full`} src="/dinoc.png" alt="" />
          </div>
          <div className={`flex`}>
            <div className="mr-2">
              <Button
                onClick={deleteRoom}
                title="Delete collecion"
                icon="trash-outline"
                color="danger"
              >
                Yes, delete
              </Button>
            </div>
            <Button onClick={() => setIsShowDelete(false)} color="text-outline">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
