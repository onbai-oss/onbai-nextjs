import { app } from '@/utils/api'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('🥷 - 🥷 - 🥷')
    app
      .reAuthenticate()
      .then(() => {
        console.log('🌻 Logged!')
      })
      .catch(() => {
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
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}

export default App
