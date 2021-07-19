import Button from '@/components/base/Button'
import { NavUnlogin } from '@/components/NavUnlogin'
import { PAGES } from '@/utils/constant'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.replace(PAGES.DASHBOARD)
    } else {
      router.replace(PAGES.LANDING)
    }
  })
  return <></>
}
