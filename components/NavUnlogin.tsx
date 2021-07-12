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
    py-2 px-2 container mx-auto
    sm:justify-between 
  `}
    >
      <LogoLink />
      <div
        className={`fixed bottom-0 left-0 w-screen p-4 border-t-2
        sm:static sm:w-auto sm:p-0 border:none
        `}
      >
        <div className={`flex gap-2 justify-center sm:justify-start`}>
          <Link href="/login">
            <a>
              <Button icon="arrow-circle-right-outline">Đăng nhập</Button>
            </a>
          </Link>
          <Link href="/signup">
            <a>
              <Button icon="person-add-outline" color="primary-outline">
                Đăng ký
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}
