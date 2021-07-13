import { PAGES } from '@/utils/constant'
import Link from 'next/link'
import React, { useState } from 'react'
import Button from './base/Button'

import LogoLink from './base/LogoLink'
import { Modal } from './base/Modal'

export interface INavLoggedInProps {
  isHideNew?: boolean
}

export function NavLoggedIn({ isHideNew, ...props }: INavLoggedInProps) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <nav
        {...props}
        className={`
      p-4  flex justify-between items-center
    `}
      >
        <LogoLink></LogoLink>
        <div className={`flex gap-4`}>
          {isHideNew ? null : (
            <div className={`fixed bottom-12 right-6 sm:static`}>
              <Link href={PAGES.NEW}>
                <Button icon="plus">New</Button>
              </Link>
            </div>
          )}

          <button
            onClick={openModal}
            className={`rounded border-2 px-2 border-solid border-transparent hover:border-gray-700`}
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
          <div className={``}>
            <img
              className={`mx-auto rounded-full shadow hover:shadow-md`}
              src="https://ui-avatars.com/api/?size=128"
              alt=""
            />
          </div>
          <div className={`text-center`}>
            <h1 className="mt-2 font-semibold text-xl">User name</h1>
            <h1 className=" font-semibold text-md">user@email</h1>
          </div>

          <div className={`my-2 flex justify-center`}>
            <Button color="primary">Settings</Button>
          </div>

          <div className={`my-4`}>
            <hr />
          </div>
          <div className={`flex justify-center`}>
            <Button color="warning-outline">Logout</Button>
          </div>
        </>
      </Modal>
    </>
  )
}
