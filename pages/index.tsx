import { NavUnlogin } from '@/components/NavUnlogin'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <NavUnlogin />
      <main>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </main>
    </>
  )
}
