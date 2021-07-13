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
          autoComplete="email"
        ></Input>
      </fieldset>

      <fieldset>
        <label htmlFor="password" className={`my-2 block font-semibold`}>
          Password
        </label>
        <Input
          icon="lock-outline"
          type="password"
          name="password"
          id="password"
          placeholder=""
          required
          autoComplete="on"
        ></Input>
      </fieldset>

      <div className={`mt-2 flex justify-end text-sm`}>
        <Link href="/forgot-password">
          <div
            className={`flex justify-items-center items-center gap-2 cursor-pointer`}
          >
            <a className={`hover:underline text-blue-500 font-semibold`}>
              Forgot your password?
            </a>
          </div>
        </Link>
      </div>

      <fieldset className={`mt-2`}>
        <Button icon="arrow-circle-right-outline" type="submit">
          Login
        </Button>
      </fieldset>
    </form>
  )
}

export default function LoginPage() {
  return (
    <>
      <main className={`w-screen h-auto sm:h-screen block sm:flex-row sm:flex`}>
        <section
          className={`p-6 w-full sm:w-96 flex justify-center items-center overflow-auto`}
        >
          <div className={`w-full`}>
            <div className={`my-4 flex justify-center`}>
              <LogoLink />
            </div>

            <LoginForm />

            <div className={`my-6`}>
              <hr />
            </div>

            <div className={`my-4 grid grid-cols-1 grid-rows-1 gap-4`}>
              <Link href={PAGES.DASHBOARD}>
                <Button icon="google" className={`w-full`} color="danger">
                  Continue with Google
                </Button>
              </Link>
              <Button icon="facebook" color="info">
                Continue with Facebook
              </Button>
            </div>
          </div>
        </section>

        <section
          className={`flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white `}
        >
          <div className={`p-2  h-screen flex justify-center items-center`}>
            <ul className={``}>
              <li>
                <h1 className={`text-2xl text-center font-semibold`}>
                  Good to see you again! 🥳
                </h1>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}
