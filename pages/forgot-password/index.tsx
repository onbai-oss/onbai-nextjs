import { BaseSyntheticEvent } from 'react'
import Link from 'next/link'
import { API } from 'utils/api'
import { useRouter } from 'next/router'
import { PAGES } from 'utils/constant'
import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import LogoLink from '@/components/base/LogoLink'

const LoginForm = () => {
  const router = useRouter()

  const onChange = (e: BaseSyntheticEvent) => {
    console.log('-> on change', e.target.value)
  }
  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    console.log('On Submit', e.target)
    API.post('authentication', {
      strategy: 'local',
      email: e.target.email.value,
      password: e.target.password.value,
    })
      .then((res) => {
        console.log(res)
        router.push(PAGES.DASHBOARD)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <form onSubmit={onSubmit} className={`w-full`}>
      <fieldset>
        <label htmlFor="email" className={`my-2 block font-semibold`}>
          Email
        </label>
        <Input
          icon="email-outline"
          type="email"
          name="email"
          id="email"
          placeholder=""
          required
          autoFocus
        ></Input>
      </fieldset>

      <fieldset className={`mt-4`}>
        <Button icon="arrow-circle-right-outline" type="submit">
          Send request
        </Button>
      </fieldset>
    </form>
  )
}

export default function ForgotPasswordPage() {
  return (
    <>
      <div className={`w-screen h-screen flex flex-col sm:flex-row`}>
        <div className={`p-6 w-full sm:w-96 flex justify-center items-center `}>
          <div className={`w-full`}>
            <div className={`my-4 flex justify-center`}>
              <LogoLink />
            </div>
            <LoginForm />
          </div>
        </div>
        <div
          className={`flex-1 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white flex justify-center items-center`}
        >
          <div className={`p-2`}>
            <ul className={`list-disc`}>
              <li>
                <h1 className={`text-2xl text-center font-semibold`}>
                  Recovery password
                </h1>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
