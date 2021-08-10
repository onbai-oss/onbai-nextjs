import { NavLoggedIn } from '@/components/NavLoggedIn'
import { PAGES } from '@/utils/constant'

import Link from 'next/link'
import { Twemoji } from 'react-emoji-render'

export default function NewPage({}) {
  return (
    <>
      <NavLoggedIn />

      <main>
        <div
          className={`h-32 font-semibold flex flex-col justify-center items-center
          bg-gradient-to-r from-blue-600 to-blue-400
          
          `}
        >
          <div
            className={`my-4 text-white text-2xl flex space-x-2 items-center`}
          >
            <div>
              <Twemoji text="✨"></Twemoji>
            </div>
            <div>What you want create</div>
          </div>
        </div>

        <div className={``}>
          <div className={`min-h-screen p-4 flex flex-col items-center mb-8 `}>
            <Link href={PAGES.NEW_COLLECION}>
              <button
                className={`w-60 my-2 text-center border-2 border-gray-500 border-solid p-4 rounded-md hover:border-blue-500`}
              >
                <div>
                  <img
                    className={`mx-auto`}
                    width="75"
                    src="/folder.png"
                    alt=""
                  />
                </div>
                <h1 className={`mt-2 font-semibold`}>New collection</h1>
              </button>
            </Link>
            <Link href={PAGES.NEW_ROOM}>
              <button
                className={`
            w-60 my-2  text-center border-2 border-gray-500 border-solid p-4
            rounded-md  hover:border-blue-500
             `}
              >
                <div>
                  <img
                    className={`mx-auto`}
                    width="50"
                    src="/chat.png"
                    alt=""
                  />
                </div>
                <h1 className={`mt-2 font-semibold`}>New room</h1>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
