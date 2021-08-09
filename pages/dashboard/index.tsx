import IntroCard from '@/components/IntroCard'
import RoomList from '@/components/RoomList'
import CollectionList from '@/components/CollectionList'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { getPropsUserSever } from '@/utils/session'
import PleaseLogin from '@/components/PleaseLogin'
import { useEffect } from 'react'
import { Tab } from '@headlessui/react'

export default function DashboardPage({ user }) {
  useEffect(() => {}, [])

  if (!user) {
    return <PleaseLogin />
  }

  return (
    <>
      <NavLoggedIn />
      <main className={`mb-8`}>
        <IntroCard />
        <div className={`p-4`}>
          <hr />
        </div>
        <RoomList />
        <div className={`p-4`}>
          <hr />
        </div>
        <CollectionList />
      </main>
    </>
  )
}

export const getServerSideProps = getPropsUserSever
