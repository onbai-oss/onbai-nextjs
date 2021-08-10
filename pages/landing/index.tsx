import Button from '@/components/base/Button'
import Footer from '@/components/base/Footer'
import { NavUnlogin } from '@/components/NavUnlogin'
import { PAGES } from '@/utils/constant'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  return (
    <>
      <NavUnlogin />
      <main className={`min-h-screen `}>
        <div
          className={`h-64 text-2xl text-white font-semibold flex flex-col justify-center items-center
          bg-gradient-to-r from-green-600 to-green-500
          `}
        >
          <div className={`my-4`}>Free online education tools.</div>
          <Link href="/login">
            <a>
              <Button color="primary-outline"> Learn more 🌱</Button>
            </a>
          </Link>
        </div>
        <div
          className={`p-6 text-2xl text-white font-semibold  flex justify-center items-center`}
        >
          <img
            draggable="false"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
            alt="cover"
          />
        </div>
      </main>
      <Footer className={`mb-20 sm:mb-0`}></Footer>
    </>
  )
}
