import Button from '@/components/base/Button'
import Footer from '@/components/base/Footer'
import { NavUnlogin } from '@/components/NavUnlogin'
import { PAGES } from '@/utils/constant'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <NextSeo
        title={'Landing'}
        titleTemplate={`${
          process.env.NODE_ENV === 'development' ? '[DEV]' : ''
        } Onbai.online | %s`}
      />
      <NavUnlogin />
      <main className={`min-h-screen `}>
        <div
          className={`text-2xl font-semibold flex flex-col justify-center items-center`}
        >
          <div className={`my-8 text-blue-500`}>
            ✨ Free online education tools ✨
          </div>
          <div className={`prose mb-8`}>
            <ul>
              <li>📝 Realtime quiz with your friend</li>
              <li>🔮 Simple, easy to create content</li>
              <li>👋 Share and enjoy learning</li>
              <li>🥳 More features will coming soon</li>
            </ul>
          </div>

          <div className={`mb-8`}>
            <Link href={PAGES.LOGIN}>
              <Button color="info">Getting started</Button>
            </Link>
          </div>
        </div>
        <div className={` border-t-2 border-dashed border-gray-500`}></div>
        <div
          className={`p-6 mb-12 text-2xl text-white font-semibold  flex justify-center items-center`}
        >
          <img
            className={`rounded`}
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
            alt="cover"
            loading="lazy"
            draggable="false"
          />
        </div>
      </main>
      <Footer className={`mb-20 sm:mb-0`}></Footer>
    </>
  )
}
