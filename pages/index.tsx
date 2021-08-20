import { PAGES } from '@/utils/constant'
import { getPropsUserSever } from '@/utils/session'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home({ user }) {
  const router = useRouter()
  useEffect(() => {
    if (user) {
      router.replace(PAGES.DASHBOARD)
    } else {
      router.replace(PAGES.LANDING)
    }
  })
  return <></>
}

export const getServerSideProps = getPropsUserSever
