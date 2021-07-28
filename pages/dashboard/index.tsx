import RoomCard from '@/components/RoomCard'
import RoomList from '@/components/RoomList'
import CollectionList from '@/components/CollectionList'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { getPropsUserSever } from '@/utils/session'

export default function DashboardPage({ user }) {
  return (
    <>
      <NavLoggedIn user={user} />
      <main className={`mb-8`}>
        <section
          className={`h-32 font-semibold flex flex-col justify-center items-center
          bg-gradient-to-r from-green-600 to-green-500
          `}
        >
          <div className={`my-4 text-white text-2xl`}>
            Wellcome {user?.email}
          </div>
        </section>

        <RoomCard />
        <RoomList user={user} />
        <CollectionList user={user} />
      </main>
    </>
  )
}

export const getServerSideProps = getPropsUserSever
