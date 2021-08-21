import { UserWrapper } from '@/components/auth/userProvider'
import { app } from '@/utils/api'
import type { AppProps } from 'next/app'
import Script from 'next/script'
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

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}
const LANGUAGE_CODE = 'en'

function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>(undefined)
  const [firebaseLoad, setFirebaseLoad] = useState<Array<any>>([])

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

  useEffect(() => {
    if (firebaseLoad.length === 4) {
      if (!firebase.apps.length) {
        console.log('Init firebase')
        firebase.initializeApp(firebaseConfig)
        firebase.analytics()
      } else {
        console.log('Re-init firebase')
        firebase.app()
      }
    }
  }, [firebaseLoad])

  return (
    <>
      <Head>
        <title>
          {process.env.NODE_ENV === 'production' ? '' : '[DEV]'} Onbai.online{' '}
        </title>
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
        <link
          type="text/css"
          rel="stylesheet"
          href="https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.css"
        />
      </Head>

      {/* Firebase */}
      <Script
        onLoad={() => setFirebaseLoad((o) => [...o, 1])}
        src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"
      />
      <Script
        onLoad={() => setFirebaseLoad((o) => [...o, 2])}
        src="https://www.gstatic.com/firebasejs/8.10.0/firebase-analytics.js"
      />
      <Script
        onLoad={() => setFirebaseLoad((o) => [...o, 3])}
        src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"
      />
      <Script
        src={`https://www.gstatic.com/firebasejs/ui/5.0.0/firebase-ui-auth__${LANGUAGE_CODE}.js`}
        onLoad={() => {
          setFirebaseLoad((o) => [...o, 4])
        }}
      />
      {/* Others */}
      <Script
        strategy="beforeInteractive"
        src="https://cdn.jsdelivr.net/npm/eva-icons@1.1.3/eva.min.js"
      />
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
          duration: 2000,
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
