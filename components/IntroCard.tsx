import { PAGES } from '@/utils/constant'
import Link from 'next/link'
import React, { ReactElement } from 'react'
import Button from './base/Button'

interface Props {}

export default function IntroCard({}: Props): ReactElement {
  return (
    <section className={`container mx-auto mb-6`}>
      <div>
        <div className=" p-2 w-52 mx-auto">
          <img className={`w-full`} src="/hot.svg" alt="" />
        </div>
      </div>
      <div className={`text-center p-2 mb-2 font-semibold`}>
        Have a nice day.
      </div>
      <div className={`flex justify-center`}>
        <Link href={PAGES.NEW}>
          <Button icon="plus" color="info">
            New
          </Button>
        </Link>
      </div>
    </section>
  )
}
