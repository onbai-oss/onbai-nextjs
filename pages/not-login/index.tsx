import Button from '@/components/base/Button'
import { PAGES } from '@/utils/constant'
import Link from 'next/link'

export default function NotLoginPage() {
  return (
    <>
      <main
        className={`p-4 flex min-h-screen justify-center items-start bg-green-500`}
      >
        <div
          className={` mt-12 rounded-md shadow-md hover:shadow-lg px-12 py-6 text-center bg-white`}
        >
          <div className={` my-4 w-full mx-auto flex justify-center `}>
            <img
              className={`w-full object-contain`}
              draggable="false"
              src="/cat_sorry.png"
              alt="sorry"
            />
          </div>
          <h1 className={`text-xl font-semibold`}>
            Your session expired!
            <br />
            Please login to continue.
          </h1>
          <div
            className={`my-4 flex justify-center animate__animated animate__bounceIn`}
          >
            <Link href={PAGES.LOGIN}>
              <Button icon="arrow-circle-right-outline" color="info">
                Go to Login{' '}
              </Button>
            </Link>
          </div>
          <div className={` text-xs`}>
            <span className={`text-red-500`}>*</span> For better security, you
            need re-login after several month.
          </div>
        </div>
      </main>
    </>
  )
}
