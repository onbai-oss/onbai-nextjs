import { PAGES } from '@/utils/constant'
import Link from 'next/link'
import React, { ReactElement } from 'react'
import Button from './base/Button'

interface Props {}

export default function RoomCard({}: Props): ReactElement {
  return (
    <section className={`container mx-auto mb-6`}>
      <div>
        <div className=" p-2 w-52 mx-auto">
          <img className={`w-full`} src="/hot.svg" alt="" />
        </div>
      </div>
      <div className={`text-center p-2 mb-2 font-semibold`}>
        Create a live room and start learning with your friend.
      </div>
      <div className={`flex justify-center`}>
        <Link href={PAGES.NEW_ROOM}>
          <Button icon="plus" color="info">
            Create room
          </Button>
        </Link>
      </div>
    </section>
  )
}
