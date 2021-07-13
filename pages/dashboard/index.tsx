import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import { NavLoggedIn } from '@/components/NavLoggedIn'

export default function DashboardPage() {
  return (
    <>
      <NavLoggedIn />
      <main>
        <div
          className={`h-64 font-semibold flex flex-col justify-center items-center
          bg-gradient-to-r from-green-600 to-green-500
          `}
        >
          <div className={`my-4 text-white text-2xl`}>Wellcome you.</div>
          <div>
            <Input
              icon="search"
              placeholder="Search something..."
              type="search"
            ></Input>
          </div>
        </div>
      </main>
    </>
  )
}
