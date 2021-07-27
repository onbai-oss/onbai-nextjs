import RoomCard from '@/components/RoomCard'
import RoomList from '@/components/RoomList'
import CollectionList from '@/components/CollectionList'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { useUserLocal } from '@/utils/hooks'

export default function DashboardPage() {
  const userLocal = useUserLocal()
  return (
    <>
      <NavLoggedIn />
      <main className={`mb-8`}>
        <section
          className={`h-32 font-semibold flex flex-col justify-center items-center
          bg-gradient-to-r from-green-600 to-green-500
          `}
        >
          <div className={`my-4 text-white text-2xl`}>
            Wellcome {userLocal?.email}
          </div>
        </section>

        <RoomCard />
        <RoomList />
        <CollectionList />
      </main>
    </>
  )
}
