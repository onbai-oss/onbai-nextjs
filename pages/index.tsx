import Button from '@/components/base/Button'
import { NavUnlogin } from '@/components/NavUnlogin'
import { PAGES } from '@/utils/constant'
import { getPropsUserSever } from '@/utils/session'
import Link from 'next/link'
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
