import React, { ReactElement } from 'react'

interface Props {
  className?
}

export default function Footer({ className }: Props): ReactElement {
  return (
    <footer
      className={`py-6 px-4 bg-green-500 border-t-4 border-solid border-green-400 text-white ${className}`}
    >
      <div className="flex sm:flex-row space-y-4 sm:space-y-0 flex-col justify-between items-center font-semibold">
        <div className={`text-sm`}>
          <a
            className={`hover:underline`}
            href="https://github.com/onbai-oss/onbai-nextjs"
            target="_blank"
          >
            ✤ Onbai.app (version: {process.env.NEXT_PUBLIC_APP_VERSION})
          </a>
          <div className={``}> Free online education tools.</div>
        </div>
        <div className={`text-sm `}>
          Language:{' '}
          <select
            className={`text-gray-600 font-semibold p-1 bg-white`}
            name=""
            id=""
          >
            <option value="en">English</option>
            {/* <option value="vi">Vietnam</option> */}
          </select>
        </div>
      </div>
    </footer>
  )
}
