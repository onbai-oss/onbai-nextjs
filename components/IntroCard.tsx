import { PAGES } from '@/utils/constant'
import Link from 'next/link'
import React, { ReactElement, useState } from 'react'
import Button from './base/Button'
import { Menu } from '@headlessui/react'
import { Modal } from './base/Modal'
import { FolderAddIcon, UserGroupIcon } from '@heroicons/react/solid'

interface Props {}

export default function IntroCard({}: Props): ReactElement {
  const [isShowModal, setIsShowModal] = useState(false)

  return (
    <>
      <section className={`container mx-auto `}>
        <div>
          <div className=" p-2 w-40 mx-auto">
            <img className={`w-full`} src="/hot.svg" alt="" />
          </div>
        </div>
        <div className={`text-center p-2  font-semibold`}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum,
          consequatur!
        </div>
        <div></div>
        <div className={`flex mt-2 mb-6 justify-center`}>
          <Button
            onClick={() => setIsShowModal(true)}
            icon="plus"
            color="primary"
          >
            New
          </Button>
        </div>
      </section>

      <Modal isOpen={isShowModal} closeModal={() => setIsShowModal(false)}>
        <div>
          <div className={`w-44 mt-4 mb-2 mx-auto`}>
            <img className={`w-full`} src="/new.svg" alt="" />
          </div>

          <div
            className={`font-semibold flex flex-col justify-center items-center`}
          >
            <div
              className={` text-blue-500 text-2xl flex space-x-2 items-center`}
            >
              <div> What you want create </div>
            </div>
          </div>

          <div className={``}>
            <div className={`p-4 flex flex-col items-center mb-4 `}>
              <Link href={PAGES.NEW_COLLECION}>
                <button
                  className={`w-64 my-2 text-center border-2 border-gray-500 border-solid p-4 rounded-md hover:border-blue-500 hover:text-blue-500 focus:ring-1 ring-gray-600 ring-offset-2`}
                >
                  <span className={`flex items-center space-x-2`}>
                    <FolderAddIcon width="28" />
                    <h1 className={`font-semibold`}>New collection</h1>
                  </span>
                </button>
              </Link>
              <Link href={PAGES.NEW_ROOM}>
                <button
                  className={`w-64 my-2 text-center border-2 border-gray-500 border-solid p-4 rounded-md  hover:border-blue-500 hover:text-blue-500 focus:ring-1 ring-gray-600 ring-offset-2`}
                >
                  <span className={`flex items-center space-x-2`}>
                    <UserGroupIcon width="24" />
                    <h1 className={`font-semibold`}>New room</h1>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
