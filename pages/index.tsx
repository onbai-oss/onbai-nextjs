import { Box } from 'onui-ts'

import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <main>
        <Box p={2}>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </Box>
      </main>
    </div>
  )
}
