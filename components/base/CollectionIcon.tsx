import React, { ReactElement } from 'react'
import { Twemoji } from 'react-emoji-render'
import BookIcon from './BookIcon'

interface Props {
  fill?: string
  icon?: string
}

export default function CollectionIcon({
  fill = '#fff',
  icon = '',
}: Props): ReactElement {
  return (
    <div className={`relative`}>
      <BookIcon fill={fill} />
      <div
        className={`
                    absolute bottom-1/2 right-1/2 transform translate-y-1/2 translate-x-1/2
                     w-12 h-12 bg-white rounded-md flex justify-center items-center mb-4
                    `}
      >
        <div
          onClick={() => {}}
          style={{
            fontSize: 32,
          }}
          className={` rounded font-semibold`}
        >
          <Twemoji text={icon} />
        </div>
      </div>
    </div>
  )
}
