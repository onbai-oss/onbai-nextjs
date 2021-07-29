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
    console.log(router.query)
    const access_token = location.hash.split('#access_token=')[1]
    NEXTJS_API.get('api/oauth?access_token=' + access_token)
      .then((r) => {
        console.log(r)
        localStorage.setItem('token', String(access_token))
        toast.success('Login success!')
        router.push(PAGES.DASHBOARD)
      })
      .catch((e) => {
        toast.error('Login failed!')
        router.push('/')
      })
  }, [])
  return <div></div>
}
