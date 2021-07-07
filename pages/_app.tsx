import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'

declare global {
  interface Window {
    eva: any
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.eva && window.eva?.replace()
  })

  return (
    <>
      <Head>
        <title>Onbai - Nextjs hehe</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script defer src="https://unpkg.com/eva-icons"></script>
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}

export default MyApp
