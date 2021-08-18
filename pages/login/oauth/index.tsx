import { NEXTJS_API } from '@/utils/api'
import { PAGES } from '@/utils/constant'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

interface Props {}

export default function oauth({}: Props): ReactElement {
  const router = useRouter()

  useEffect(() => {
    const access_token = location.hash.split('#access_token=')[1]
    // Set server cookie session
    NEXTJS_API.get('api/oauth?access_token=' + access_token)
      .then((r) => {
        toast.success('Login success!')
        router.push(PAGES.DASHBOARD)
      })
      .catch((e) => {
        toast.error('Login failed!')
        console.error(e)
        router.push(PAGES.LANDING)
      })
  }, [])
  return <div></div>
}
