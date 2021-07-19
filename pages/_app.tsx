import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import '../styles/globals.css'

declare global {
  interface Window {
    eva: any
  }
}

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    window.eva && window.eva?.replace()
  })

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
        <script defer src="https://unpkg.com/eva-icons"></script>
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}

export default App
