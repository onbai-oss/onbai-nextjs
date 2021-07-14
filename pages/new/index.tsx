import { NavLoggedIn } from '@/components/NavLoggedIn'
import { PAGES } from '@/utils/constant'
import Link from 'next/link'

export default function NewPage() {
  return (
    <>
      <NavLoggedIn isHideNew />

      <main>
        <div
          className={`h-32 font-semibold flex flex-col justify-center items-center
          bg-gradient-to-r from-green-600 to-green-500
          `}
        >
          <div className={`my-4 text-white text-2xl`}>What you want create</div>
        </div>

        <div className={`p-4 flex flex-col items-center mb-8`}>
          <Link href={PAGES.NEW_COLLECION}>
            <button
              className={`w-60 my-2  text-center border-2 border-gray-500 border-dashed p-4 rounded-md hover:border-blue-500`}
            >
              <div>
                <img
                  className={`mx-auto`}
                  width="75"
                  src="/folder.png"
                  alt=""
                />
              </div>
              <h1 className={`mt-2 font-semibold`}>Collection</h1>
            </button>
          </Link>
          <Link href={PAGES.NEW_GAME}>
            <button
              className={`
            w-60 my-2  text-center border-2 border-gray-500 border-dashed p-4
            rounded-md  hover:border-blue-500
             `}
            >
              <div>
                <img className={`mx-auto`} width="75" src="/chat.png" alt="" />
              </div>
              <h1 className={`mt-2 font-semibold`}>Game</h1>
            </button>
          </Link>
        </div>
      </main>
    </>
  )
}
