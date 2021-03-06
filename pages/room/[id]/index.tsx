import Button from '@/components/base/Button'
import Footer from '@/components/base/Footer'
import Input from '@/components/base/Input'
import { Modal } from '@/components/base/Modal'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import PleaseLogin from '@/components/PleaseLogin'
import RoomCreateConfig from '@/components/room/RoomCreateConfig'
import { RoomWrapper } from '@/components/room/roomProvider'
import RoomResult from '@/components/room/RoomResult'
import RoomSoloMode from '@/components/room/RoomSoloMode'
import RoomUserJoin from '@/components/room/RoomUserJoin'
import UserList from '@/components/room/UserList'
import { API, app } from '@/utils/api'
import { PAGES, ROOM } from '@/utils/constant'
import { getPropsUserSever } from '@/utils/session'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import toast from 'react-hot-toast'

export default function RoomPage({ user }) {
  // Init
  const router = useRouter()
  const { id } = router.query
  const [isShowDelete, setIsShowDelete] = useState(false)
  const [isLock, setIsLock] = useState(true)
  const [isCheckedLock, setIsCheckedLock] = useState(false)
  const [isLoaded, setIsLoaded] = useState(true)

  const mountedRef = useRef(true)

  const [room, setRoom] = useState<any>({})

  const isAuthor = user?.id === room?.userId

  const roomService = app.service(`room`)

  const isGuestPlaying =
    room?.users &&
    room?.status === ROOM.STATUS.PLAYING &&
    !room?.users[user?.id]

  // Methods
  const onDelete = () => {
    API.delete(PAGES.ROOM + `/${id}`).then((res) => {
      toast.success('Deleted!')
      setIsShowDelete(false)
    })
  }

  const wellcomeToRoom = () => {
    toast.success('Wellcome you to room.')
  }

  const onSubmitPass = (e) => {
    e.preventDefault()
    const isMatch = e.target.password.value === room?.password
    setIsLock(!isMatch)
    if (!isMatch) {
      toast.error('Please enter correct key!')
      e.target.password.value = ''
    } else {
      wellcomeToRoom()
    }
  }

  // Effects
  useEffect(() => {
    if (!room?.id) return
    if (room?.id) {
      setIsLoaded(false)
    }
    if (!isCheckedLock) {
      if (user?.id === room?.userId) {
        setIsLock(false)
      } else {
        const isLock = Boolean(room?.password)
        setIsLock(isLock)
        if (!isLock) {
          wellcomeToRoom()
        }
      }
      setIsCheckedLock(true)
    }
  }, [room])

  useEffect(() => {
    roomService.get(id).then((data) => {
      if (!mountedRef.current) return null
      setRoom(data)
    })

    roomService.on('patched', (newData) => {
      if (!mountedRef.current) return null
      if (id === newData?.id) {
        setRoom(newData)
      }
    })

    roomService.on('removed', (roomRemoved) => {
      if (id === roomRemoved?.id) {
        router.push(PAGES.DASHBOARD)
      }
    })

    return () => {
      roomService.removeListener('patched')
      roomService.removeListener('removed')
      mountedRef.current = false
    }
    //
  }, [])

  if (!user) {
    return <PleaseLogin />
  }

  if (isLoaded) {
    return (
      <div>
        <NavLoggedIn />
        <div className={`min-h-screen`}></div>
      </div>
    )
  }

  if (isGuestPlaying) {
    return (
      <div>
        <NavLoggedIn />
        <div className={`mt-4 p-2 flex justify-center items-center`}>
          <div>
            <h1 className={`text-2xl font-semibold`}> {room?.name}</h1>
          </div>
        </div>

        <div className={` text-center animate-pulse`}>Playing...</div>
      </div>
    )
  }

  return (
    <>
      <NextSeo
        title={'Room ' + (room?.name || '')}
        titleTemplate={`${
          process.env.NODE_ENV === 'development' ? '[DEV]' : ''
        } Onbai.online | %s`}
      />

      <NavLoggedIn />

      <main className={`min-h-screen mb-24 `}>
        {/* // Check lock */}
        {!isCheckedLock ? (
          <div className={`flex justify-center mt-4`}></div>
        ) : isLock ? (
          <section className={`min-h-screen `}>
            <div className={`mt-4 text-center font-semibold text-2xl`}>
              #Room: {room?.name}
            </div>

            <div className={`w-32 mx-auto pt-10`}>
              <img className={`w-full`} src="/lock.svg" alt="lock" />
            </div>

            <div className={`mt-4 text-center font-semibold text-xl`}>
              Enter key to continue
            </div>
            <form
              onSubmit={onSubmitPass}
              className={` p-4 space-y-4 text-gray-900 `}
            >
              <div className={`flex justify-center `}>
                <Input
                  name="password"
                  icon="unlock-outline"
                  autoFocus
                  type="text"
                  autoComplete="on"
                ></Input>
              </div>
              <div className="flex justify-center">
                <Button icon="arrow-circle-right-outline" color="info">
                  Enter
                </Button>
              </div>
            </form>
          </section>
        ) : (
          // ROOM page
          <RoomWrapper value={room}>
            <section className={`container mx-auto`}>
              {/* WAITING */}
              {room?.status === ROOM.STATUS.WAIT ? (
                <div>
                  {/* Room info */}
                  <div className={`mt-4 p-2 flex justify-center items-center`}>
                    <div>
                      <h1 className={`text-2xl font-semibold`}>
                        {' '}
                        {room?.name}
                      </h1>
                    </div>
                  </div>
                  <div className={`flex justify-center my-2`}>
                    <div className={``}>
                      <div className={`flex items-center space-x-2 w-full`}>
                        <div>
                          <CopyToClipboard
                            text={process.browser ? location.href : ''}
                            onCopy={() => {
                              toast.success('Copied to your clipboard!')
                            }}
                          >
                            <Button icon="share-outline">Share </Button>
                          </CopyToClipboard>
                        </div>
                        <div className={`${isAuthor ? '' : 'hidden'}`}>
                          <Button
                            onClick={() => setIsShowDelete(true)}
                            icon="trash-outline"
                          ></Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`my-4 p-2`}>
                    <div
                      className={`border-t-2 border-gray-300 border-dashed container mx-auto`}
                    ></div>
                  </div>
                  {isAuthor ? (
                    <div className={`mb-40 sm:mb-0`}>
                      <RoomCreateConfig />
                    </div>
                  ) : (
                    <div>
                      <UserList />
                      <RoomUserJoin></RoomUserJoin>
                    </div>
                  )}
                </div>
              ) : null}

              {/* // GAME */}
              {/* SOLO */}
              {room?.status === ROOM.STATUS.PLAYING ? (
                <>{room?.game?.type === ROOM.TYPE.SOLO && <RoomSoloMode />}</>
              ) : null}

              {/* RESULT */}
              {room?.status === ROOM.STATUS.END ? <RoomResult /> : null}
            </section>
          </RoomWrapper>
        )}

        {/* DEBUG: */}
        <summary className={`fixed bottom-0 left-0 max-h-screen overflow-auto`}>
          <details
            className={`prose prose-sm bg-white hover:bg-black cursor-pointer text-white mx-auto`}
          >
            <pre>{JSON.stringify(room, null, 2)}</pre>
          </details>
        </summary>
      </main>

      <Modal isOpen={isShowDelete} closeModal={() => setIsShowDelete(false)}>
        <div className={`p-2`}>
          <div className={` text-2xl font-semibold`}>
            <h1>Are you sure? It can't revert.</h1>
          </div>
          <div className={`w-64 mx-auto`}>
            <img className={`w-full`} src="/dinoc.png" alt="" />
          </div>
          <div className={`flex`}>
            <div className="mr-2">
              <Button
                onClick={onDelete}
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

      <Footer></Footer>
    </>
  )
}

export const getServerSideProps = getPropsUserSever
