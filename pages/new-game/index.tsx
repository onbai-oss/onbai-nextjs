import { NavLoggedIn } from '@/components/NavLoggedIn'

export default function NewGamePage({}) {
  return (
    <>
      <NavLoggedIn />

      <main>
        <div
          className={`h-32 font-semibold flex flex-col justify-center items-center bg-gradient-to-r from-green-600 to-green-500`}
        >
          <div className={`my-4 text-white text-2xl`}>New game</div>
        </div>
      </main>
    </>
  )
}
