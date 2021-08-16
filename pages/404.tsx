import Button from '@/components/base/Button'
import Footer from '@/components/base/Footer'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import Link from 'next/link'

export default function Custom404() {
  return (
    <>
      <NavLoggedIn></NavLoggedIn>
      <div className={`min-h-screen flex flex-col justify-start items-center`}>
        <h1 className={`text-2xl mb-4 mt-10 font-semibold`}>Page Not Found!</h1>

        <div className={`my-3 w-72 mx-auto`}>
          <img
            className={`shadow-md hover:shadow-lg rounded-md w-full`}
            src="https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=995&q=80"
            alt=""
          />
        </div>
        <div className={`my-5`}>
          <Link href="/">
            <Button icon="home-outline">Back to home</Button>
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}
