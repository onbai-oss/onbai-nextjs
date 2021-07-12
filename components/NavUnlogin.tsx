import * as React from 'react'
import Button from './base/Button'
import Link from 'next/link'
import LogoLink from './base/LogoLink'

export interface INavUnloginProps {}

export function NavUnlogin(props: INavUnloginProps) {
  return (
    <nav
      {...props}
      className={`
    flex justify-center items-center
    py-4 px-4 container mx-auto
    sm:justify-between sm:py-2
  `}
    >
      <div className={`flex gap-3 items-center`}>
        <LogoLink />
        <img
          src="https://www.countryflags.io/vn/flat/48.png"
          alt="lang"
          draggable="false"
        />
      </div>
      <div
        className={`fixed bottom-0 left-0 w-screen p-4 border-t-2 bg-white
        sm:static sm:w-auto sm:p-0 border:none
        `}
      >
        <div className={`flex gap-2 justify-center sm:justify-start`}>
          <Link href="/login">
            <a>
              <Button icon="arrow-circle-right-outline">Login</Button>
            </a>
          </Link>
          <Link href="/signup">
            <a>
              <Button icon="person-add-outline" color="primary-outline">
                Sign up
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}
