import Footer from '@/components/base/Footer'
import CollectionList from '@/components/CollectionList'
import IntroCard from '@/components/IntroCard'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import RoomList from '@/components/RoomList'
import { PAGES } from '@/utils/constant'
import { getPropsUserSever } from '@/utils/session'
import { NextSeo } from 'next-seo'
import Router from 'next/router'

export default function DashboardPage({ user }) {
  if (!user) {
    if (process.browser) {
      Router.push(PAGES.LOGIN)
    }
    return <></>
  }

  return (
    <>
      <NextSeo
        title={'Dashboard'}
        titleTemplate={`${
          process.env.NODE_ENV === 'development' ? '[DEV]' : ''
        } Onbai.online | %s`}
      />
      <NavLoggedIn />
      <main className={`mb-8 min-h-screen`}>
        <IntroCard />
        <div
          className={`border-t-2 border-gray-300 border-dashed container mx-auto`}
        ></div>
        <RoomList />
        <div
          className={`border-t-2 border-gray-300 border-dashed container mx-auto`}
        ></div>
        <CollectionList />
      </main>
      <Footer></Footer>
    </>
  )
}

export const getServerSideProps = getPropsUserSever
