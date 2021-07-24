import { BaseSyntheticEvent } from 'react'
import Link from 'next/link'
import { API } from 'utils/api'
import { useRouter } from 'next/router'
import { PAGES } from 'utils/constant'
import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import LogoLink from '@/components/base/LogoLink'
import toast from 'react-hot-toast'

const LoginForm = () => {
  const router = useRouter()

  const onChange = (e: BaseSyntheticEvent) => {
    console.log('-> on change', e.target.value)
  }
  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    console.log('On Submit', e.target)
    API.post('users', {
      strategy: 'local',
      email: e.target.email.value,
      password: e.target.password.value,
    })
      .then((res) => {
        console.log(res)
        toast.success('Your account has created!')
        router.push(PAGES.LOGIN)
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
          autoComplete="on"
          required
        ></Input>
      </fieldset>

      <fieldset className={`mt-4`}>
        <Button icon="arrow-circle-right-outline" type="submit">
          Create account
        </Button>
      </fieldset>
    </form>
  )
}

export default function SignUpPage() {
  return (
    <>
      <div className={`w-screen h-screen flex flex-col sm:flex-row`}>
        <div className={`p-6 w-full sm:w-96 flex justify-center items-center `}>
          <div className={`w-full`}>
            <div className={`my-4 flex justify-center`}>
              <LogoLink />
            </div>
            <LoginForm />

            {/* <div className={`my-6`}>
              <Link href="/forgot-password">
                <div
                  className={`flex justify-items-center items-center gap-2 cursor-pointer`}
                >
                  <i
                    data-eva="arrow-circle-left-outline"
                    data-eva-fill="rgba(59, 130, 246,1)"
                  ></i>
                  <a className={`hover:underline text-blue-500 font-semibold`}>
                    Back to home page
                  </a>
                </div>
              </Link>
            </div> */}

            <div className={`my-6`}>
              <hr />
            </div>

            <div className={`my-4 grid grid-cols-1 grid-rows-1 gap-4`}>
              <Button icon="google" className={`w-full`} color="danger">
                Continue with Google
              </Button>

              <Button icon="facebook" color="info">
                Continue with Facebook
              </Button>
            </div>
          </div>
        </div>

        <section
          className={`flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white `}
        >
          <div className={`p-2  h-screen flex justify-center items-center`}>
            <ul className={``}>
              <li>
                <h1 className={`text-2xl text-center font-semibold`}>
                  Hi! Wellcome to the club 👋
                </h1>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}
