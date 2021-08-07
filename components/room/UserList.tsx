import React, { ReactElement } from 'react'
import { toArray } from 'lodash'
import { roomContext } from './roomProvider'
import { userContext } from '../auth/userProvider'
interface Props {}

export default function UserList({}: Props): ReactElement {
  const user = userContext()
  const room = roomContext()
  if (!room) {
    return <div>...</div>
  }
  return (
    <div>
      <div className="flex justify-center">
        <div className={`whitespace-nowrap overflow-auto px-2  `}>
          {toArray(room?.users).map(({ role, score, info }, idx) => (
            <div key={idx} className={`w-12 inline-block relative mx-2 m-2`}>
              <img
                title={info?.name}
                src={info?.image}
                className={`w-full rounded-full shadow-md`}
                draggable="false"
              />
              <div
                className={`text-sm font-semibold absolute -top-1.5 -right-1.5 text-center shadow-md w-5 rounded-full bg-blue-500 text-white`}
              >
                {score}
              </div>
              {/* <div className={`w-2.5 h-2.5 absolute -bottom-0.5 -right-0.5 `}>
                <span className="flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50"></span>
                  <span className="h-2.5 w-2.5 relative inline-flex rounded-full bg-green-400"></span>
                </span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
