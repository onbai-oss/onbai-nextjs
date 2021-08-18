import LogoLink from '@/components/base/LogoLink'
import FirebaseUiLogin from '@/components/auth/FirebaseUiLogin'
import { NextSeo } from 'next-seo'

export default function LoginPage() {
  return (
    <>
      <NextSeo
        title={'Login'}
        titleTemplate={`${
          process.env.NODE_ENV === 'development' ? '[DEV]' : ''
        } Onbai.online | %s`}
      />

      <main className={`w-screen h-auto sm:h-screen block sm:flex-row sm:flex`}>
        <section
          className={`p-2 w-full sm:w-96 flex justify-center items-center overflow-auto`}
        >
          <div className={`w-full`}>
            <div className={`my-4 flex justify-center`}>
              <LogoLink />
            </div>
            <div className={`my-12 sm:my-0`}>
              <div className={`w-full mx-auto mt-8`}>
                <img
                  className={`w-full p-4 sm:w-44 mx-auto sm:p-0`}
                  src="/fox.svg"
                  alt="login"
                />
              </div>
              <div className={`block mt-8`}>
                <FirebaseUiLogin />
              </div>
            </div>
          </div>
        </section>

        <section
          className={`flex-1 bg-gradient-to-r from-green-600 to-green-400 text-white `}
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
