import IntroCard from '@/components/IntroCard'
import RoomList from '@/components/RoomList'
import CollectionList from '@/components/CollectionList'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { getPropsUserSever } from '@/utils/session'
import PleaseLogin from '@/components/PleaseLogin'
import { useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { ROOM } from '@/utils/constant'
import Footer from '@/components/base/Footer'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardPage({ user }) {
  useEffect(() => {}, [])

  if (!user) {
    return <PleaseLogin />
  }

  return (
    <>
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
