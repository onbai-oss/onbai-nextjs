import { NavLoggedIn } from '@/components/NavLoggedIn'

export default function RoomPage() {
  return (
    <>
      <NavLoggedIn isHideNew />
      <main className={`container mx-auto`}>Room page</main>
    </>
  )
}
