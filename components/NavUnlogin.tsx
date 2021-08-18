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
      <div className={`flex items-center`}>
        <LogoLink />
      </div>
      <div
        className={`fixed bottom-0 left-0 w-screen p-4 border-t-2 bg-white
        sm:static sm:w-auto sm:p-0 sm:border-t-0
        `}
      >
        <div className={`flex justify-center sm:justify-start`}>
          <div className={`mr-2`}>
            <Link href="/login">
              <Button icon="arrow-circle-right-outline">Login</Button>
            </Link>
          </div>
          <Link href="/signup">
            <Button icon="person-add-outline" color="primary-outline">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
