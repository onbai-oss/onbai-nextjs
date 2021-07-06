import { BaseSyntheticEvent } from 'react'
import Link from 'next/link'
import { API } from '../../utils/api'

const ForgotPasswordForm = () => {
  const onChange = (e: BaseSyntheticEvent) => {
    console.log('-> on change', e.target.value)
  }
  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    console.log('On Submit', e.target)
    // API.post('authentication', {
    //   email: e.target.email.value,
    // })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((e) => {
    //     console.error(e)
    //   })
  }

  return <div></div>
}

export default function ForgotPasswordPage() {
  return (
    <>
      <div>ForgotPasswordPage</div>
    </>
  )
}
