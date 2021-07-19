import Link from 'next/link'
import React, { ReactElement } from 'react'

interface Props {
  linkTo?: string
}

export default function LogoLink({ linkTo = '/' }: Props): ReactElement {
  return (
    <Link href={linkTo}>
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
