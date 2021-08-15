import Footer from '@/components/base/Footer'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { PAGES } from '@/utils/constant'
import { FolderAddIcon, UserGroupIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export default function NewPage({}) {
  return (
    <>
      <NavLoggedIn />

      <main className={`min-h-screen`}>
        <div
          className={`h-32 font-semibold flex flex-col justify-center items-center
          bg-gradient-to-r from-blue-600 to-blue-400
          
          `}
        >
          <div
            className={`my-4 text-white text-2xl flex space-x-2 items-center`}
          >
            <div>✨ What you want create</div>
          </div>
        </div>

        <div className={``}>
          <div className={` p-4 flex flex-col items-center mb-8 `}>
            <Link href={PAGES.NEW_COLLECION}>
              <button
                className={`w-60 my-2 text-center border-2 border-gray-500 border-solid p-4 rounded-md hover:border-blue-500 hover:text-blue-500`}
              >
                <span className={`flex items-center space-x-2`}>
                  <FolderAddIcon width="28" />
                  <h1 className={`font-semibold`}>New collection</h1>
                </span>
              </button>
            </Link>
            <Link href={PAGES.NEW_ROOM}>
              <button
                className={`w-60 my-2 text-center border-2 border-gray-500 border-solid p-4 rounded-md  hover:border-blue-500 hover:text-blue-500`}
              >
                <span className={`flex items-center space-x-2`}>
                  <UserGroupIcon width="24" />
                  <h1 className={`font-semibold`}>New room</h1>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  )
}
