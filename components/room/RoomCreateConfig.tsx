import React, { ReactElement, useState } from 'react'
import toast from 'react-hot-toast'
import { userContext } from '../auth/userProvider'
import Button from '../base/Button'
import Input from '../base/Input'
import CollectionPicker from '../CollectionPicker'
import { roomContext } from './roomProvider'
import { toArray } from 'lodash-es'
import { app } from '@/utils/api'
import { ROOM } from '@/utils/constant'
import UserList from '@/components/room/UserList'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useEffect } from 'react'

interface Props {}

export default function RoomCreateConfig({}: Props): ReactElement {
  const user = userContext()
  const room = roomContext()
  const listRoomUser = toArray(room.users)

  // Configs
  const [collections, setCollections] = useState<any>([])
  const [mode, setMode] = useState<any>(ROOM.RULE.SCORE)
  const [time, setTime] = useState<any>(1)
  const [score, setScore] = useState<any>(10)

  // Modal
  const [isOpen, setIsOpen] = useState<any>(false)

  const roomService = app.service(`room`)

  const joinRoom = async () => {
    try {
      await roomService.patch(room.id, {
        status: ROOM.STATUS.PLAYING,
        collections,
        game: {
          type: ROOM.TYPE.SOLO,
          rule: {
            mode,
            score,
            time,
          },
        },
      })
      toast.success('Success')
    } catch (error) {
      console.error(error)
    } finally {
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!collections.length) {
      setIsOpen(true)
      return
    }
    document.getElementById('timer')?.blur()
    document.getElementById('score_goal')?.blur()
    window.scrollTo(0, 0)
    joinRoom()
  }

  useEffect(() => {
    if (!collections.length) {
      setIsOpen(true)
      return
    }
  }, [])

  return (
    <>
      <form
        onSubmit={onSubmit}
        className={`w-full sm:w-96 mx-auto px-4 sm:px-0 font-semibold mb-12 `}
      >
        {/* Users */}
        <div className={`border shadow hover:shadow-md rounded-md p-2 my-2`}>
          <div className={`text-left  `}>1. Users:</div>
          <UserList />
          <div className={`mb-4`}>
            <hr />
          </div>
          <div className={`text-center mb-1 text-sm `}>
            <CopyToClipboard
              text={process.browser ? location.href : ''}
              onCopy={() => {
                toast.success('Copied to your clipboard!')
              }}
            >
              <button
                type="button"
                className={`font-semibold py-1 text-sm  px-4 border rounded-md focus:text-blue-500`}
              >
                Click to copy link
              </button>
            </CopyToClipboard>
          </div>
        </div>

        {/* Collections */}
        <div className={`border shadow hover:shadow-md rounded-md p-2 my-2`}>
          <div className={`text-left `}>2. Data:</div>
          <div className={`flex justify-center`}>
            <Button
              onClick={() => setIsOpen(true)}
              icon="external-link-outline"
              color="primary"
              type="button"
            >
              Select collections
            </Button>
          </div>
          {collections.length ? (
            <div>
              <div className={`my-2`}>
                <hr />
              </div>
              <div className="mt-3 mb-1 flex justify-center">
                <div className={`whitespace-nowrap overflow-auto`}>
                  {collections.map((i) => (
                    <div
                      key={i.id}
                      className={`inline-block mx-1 bg-white p-2 border rounded-md text-sm`}
                    >
                      <div className={`flex items-center space-x-2`}>
                        <div>{i?.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={`text-center mt-2 text-sm`}>
              <span className={`text-red-500`}>*</span> Please select at least
              one collection.
            </div>
          )}
        </div>

        {/* Modes */}
        <div className={`border shadow hover:shadow-md rounded-md p-2 my-2`}>
          <div className={`text-left  `}>3. Mode:</div>
          <div className={`flex justify-center space-x-2`}>
            <label htmlFor="score">
              <input
                type="radio"
                name="mode"
                id="score"
                value={ROOM.RULE.SCORE}
                onChange={(e) => setMode(e.target.value)}
                checked={mode == ROOM.RULE.SCORE}
              />{' '}
              Score
            </label>
            <label htmlFor="time">
              <input
                type="radio"
                name="mode"
                id="time"
                value={ROOM.RULE.TIMER}
                onChange={(e) => setMode(e.target.value)}
                checked={mode == ROOM.RULE.TIMER}
              />{' '}
              Time
            </label>
            <label htmlFor="all">
              <input
                type="radio"
                name="mode"
                id="all"
                value={ROOM.RULE.ALL}
                onChange={(e) => setMode(e.target.value)}
                checked={mode == ROOM.RULE.ALL}
              />{' '}
              All
            </label>
          </div>
          <div className={`mt-2`}>
            <hr />
          </div>
          <div className={`p-2 grid grid-cols-1 grid-rows-1 gap-2 mt-1`}>
            {[ROOM.RULE.SCORE, ROOM.RULE.ALL].includes(mode) ? (
              <div className={``}>
                <label
                  className={`flex justify-center items-center space-x-2`}
                  htmlFor="score_goal"
                >
                  <div className={`mb-1`}>Goal: </div>
                  <div className={`flex space-x-2 items-center `}>
                    <div className="w-20">
                      <Input
                        value={score}
                        onChange={(e) => setScore(+e.target.value)}
                        min="1"
                        type="number"
                        id="score_goal"
                        name="score_goal"
                      />
                    </div>
                    <div>( point )</div>
                  </div>
                </label>
              </div>
            ) : null}

            {mode === ROOM.RULE.ALL ? (
              <div className={`text-center mr-4`}> or </div>
            ) : null}

            {[ROOM.RULE.TIMER, ROOM.RULE.ALL].includes(mode) ? (
              <div className={``}>
                <label
                  className={`flex justify-center items-center space-x-2`}
                  htmlFor="timer"
                >
                  <div className={`mb-1`}>Timer:</div>

                  <div className={`flex space-x-2 items-center `}>
                    <div className="w-20">
                      <Input
                        value={time}
                        onChange={(e) => setTime(+e.target.value)}
                        min="1"
                        type="number"
                        id="timer"
                        name="timer"
                      />
                    </div>
                    <div>( minute )</div>
                  </div>
                </label>
              </div>
            ) : null}
          </div>
        </div>

        <div className={`flex justify-center mt-6 `}>
          <Button
            className={`block w-full`}
            icon="arrow-circle-right-outline"
            color="info"
            type="submit"
          >
            Start practice
          </Button>
        </div>
      </form>

      <CollectionPicker
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
        onSelected={(list) => setCollections(list)}
      />
    </>
  )
}
