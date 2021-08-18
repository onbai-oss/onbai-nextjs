import LogoLink from '@/components/base/LogoLink'
import FirebaseUiLogin from '@/components/auth/FirebaseUiLogin'
import Footer from '@/components/base/Footer'

export default function SignUpPage() {
  return (
    <>
      <main className={`w-screen h-screen flex flex-col sm:flex-row`}>
        <div className={`p-2 w-full sm:w-96 flex justify-center items-center `}>
          <div className={`w-full`}>
            <div className={`my-4 flex justify-center`}>
              <LogoLink />
            </div>
            <div className={`my-12 sm:my-0`}>
              <div className={`w-full mx-auto mt-8`}>
                <img
                  className={`w-full p-4 sm:w-44 mx-auto sm:p-0`}
                  src="/bear.svg"
                  alt="login"
                />
              </div>
              <div className={`block mt-8`}>
                <FirebaseUiLogin />
              </div>
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
      </main>
    </>
  )
}
