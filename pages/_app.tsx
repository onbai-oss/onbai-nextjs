import { UserWrapper } from '@/components/auth/userProvider'
import { app } from '@/utils/api'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import '../styles/globals.css'

dayjs.extend(relativeTime)
dayjs.extend(duration)

function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>(undefined)
  useEffect(() => {
    app
      .reAuthenticate()
      .then((userData) => {
        console.log('🌻 Logged!', userData)
        setUser(userData.user)
      })
      .catch(() => {
        setUser(null)
        console.log('👀 Not login')
      })
  }, [])
  return (
    <>
      <Head>
        <title>Onbai - Free education tools</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/eva-icons@1.1.3/eva.min.js"
          integrity="sha256-gjzS0a/05vKcbfZH+V+l5VEXWSzMhddz6x5swhlhjtY="
          crossOrigin="anonymous"
        ></script>
      </Head>
      <UserWrapper value={user}>
        <Component {...pageProps} />
      </UserWrapper>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 1500,
          style: {
            background: '#fff',
            color: '#1B324F',
          },
          // Default options for specific types
          success: {
            duration: 1500,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  )
}

export default App
