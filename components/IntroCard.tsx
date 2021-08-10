import { PAGES } from '@/utils/constant'
import Link from 'next/link'
import React, { ReactElement } from 'react'
import Button from './base/Button'

interface Props {}

export default function IntroCard({}: Props): ReactElement {
  return (
    <section className={`container mx-auto `}>
      <div>
        <div className=" p-2 w-40 mx-auto">
          <img className={`w-full`} src="/hot.svg" alt="" />
        </div>
      </div>
      <div className={`text-center p-2  font-semibold`}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum,
        consequatur!
      </div>
      <div></div>
      <div className={`flex mt-2 mb-6 justify-center`}>
        <Link href={PAGES.NEW}>
          <Button icon="plus" color="primary">
            New
          </Button>
        </Link>
      </div>
    </section>
  )
}
