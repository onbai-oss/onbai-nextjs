import Footer from '@/components/base/Footer'
import { NavUnlogin } from '@/components/NavUnlogin'
import { NextSeo } from 'next-seo'

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
          className={`h-64 text-2xl font-semibold flex flex-col justify-center items-center`}
        >
          <div className={`my-4`}>Free online education tools.</div>
        </div>
        <div className={` border-t-2 border-dashed border-gray-500`}></div>
        <div
          className={`p-6 mb-12 text-2xl text-white font-semibold  flex justify-center items-center`}
        >
          <img
            className={`rounded`}
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
