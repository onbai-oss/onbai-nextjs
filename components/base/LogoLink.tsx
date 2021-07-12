import Link from 'next/link'
import React, { ReactElement } from 'react'

interface Props {}

export default function LogoLink({}: Props): ReactElement {
  return (
    <Link href="/">
      <a>
        <img
          className={`w-24 `}
          src="/onbai_text.svg"
          alt="logo"
          draggable="false"
        />
      </a>
    </Link>
  )
}
