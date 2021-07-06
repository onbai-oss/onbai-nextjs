import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <main>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </main>
    </div>
  )
}
