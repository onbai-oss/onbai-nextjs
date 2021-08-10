import IntroCard from '@/components/IntroCard'
import RoomList from '@/components/RoomList'
import CollectionList from '@/components/CollectionList'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { getPropsUserSever } from '@/utils/session'
import PleaseLogin from '@/components/PleaseLogin'
import { useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { ROOM } from '@/utils/constant'

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

        <div className="w-full my-4 sm:px-0">
          <Tab.Group>
            <Tab.List
              className={`max-w-md mx-2 sm:mx-auto flex justify-center p-2 space-x-1 bg-blue-50 rounded-xl`}
            >
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 text-sm leading-5 font-semibold text-blue-600 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-blue-500'
                  )
                }
              >
                Rooms
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 text-sm leading-5 font-semibold text-blue-600 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-blue-500'
                  )
                }
              >
                Collections
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <RoomList />
              </Tab.Panel>
              <Tab.Panel>
                <CollectionList />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = getPropsUserSever
