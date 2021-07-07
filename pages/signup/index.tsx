import { BaseSyntheticEvent } from 'react'
import Link from 'next/link'
import { API } from '../../utils/api'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

const SignUpForm = () => {
  const router = useRouter()

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    console.log('-> on onSubmit')
    API.post('users', {
      email: e.target.email.value,
      password: e.target.password.value,
    }).then((res) => {
      console.log(res)
      if (res.status === 201) {
        toast.success('Tạo tài khoản thành công.')
        router.push('/login')
      }
    })
  }

  const onChange = (e: BaseSyntheticEvent) => {
    console.log('-> on change', e.target.value)
  }
  return <div>SignUpForm</div>
}

export default function LoginPage() {
  return (
    <>
      <div>LoginPage</div>
    </>
  )
}
