import { app, NEXTJS_API } from '@/utils/api'
import { PAGES } from '@/utils/constant'
import { firebaseLogout } from '@/utils/firebase'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { userContext } from './auth/userProvider'
import Button from './base/Button'
import LogoLink from './base/LogoLink'
import { Modal } from './base/Modal'

export interface INavLoggedInProps {}

export function NavLoggedIn({ ...props }: INavLoggedInProps) {
  const user = userContext()

  useEffect(() => {
    global.eva && global.eva?.replace()
  }, [])

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const onLogout = async () => {
    try {
      await Promise.all([
        NEXTJS_API.post('api/logout'),
        firebaseLogout(),
        app.logout(),
      ])
      location.pathname = PAGES.LANDING
    } catch (error) {
      console.error(error)
      toast.error('💥 Logout error.')
    }
  }

  return (
    <>
      <nav
        {...props}
        className={`
        py-4 px-4 flex justify-between items-center
        sm:py-2 shadow
        `}
      >
        <LogoLink linkTo={PAGES.DASHBOARD}></LogoLink>
        <div className={`flex items-center`}>
          <button
            onClick={openModal}
            className={`ml-2 rounded border-2 px-2 border-solid border-transparent hover:border-gray-700`}
          >
            <i
              data-eva="menu"
              data-eva-width="32"
              data-eva-height="32"
              data-eva-fill="#1B324F"
            ></i>
          </button>
        </div>
      </nav>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <>
          {user ? (
            <div>
              <div className={``}>
                <img
                  className={`mx-auto w-24 rounded-full shadow hover:shadow-md`}
                  src={`${user?.image}`}
                  alt="user avatar"
                  draggable="false"
                  loading="lazy"
                />
              </div>
              <div className={`text-center`}>
                <h1 className="mt-2 font-semibold text-xl">{user?.name}</h1>
                <h1 className="mt-2 font-semibold text-md">{user?.email}</h1>
              </div>

              {/* <div className={`my-2 flex justify-center`}>
            <Button color="primary">Settings</Button>
          </div> */}

              <div className={`my-4`}>
                <hr />
              </div>
              <div className={`flex justify-center`}>
                <Button
                  onClick={onLogout}
                  type="button"
                  color="warning-outline"
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className={``}>
              <div className={`text-center`}>
                <h1 className={`text-xl my-4`}>You not login!</h1>
                <div className={`flex justify-center`}>
                  <a href={PAGES.LOGIN} target="_self">
                    <Button type="button">Login</Button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </>
      </Modal>
    </>
  )
}
