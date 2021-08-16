import React, { ReactElement } from 'react'

interface Props {
  className?
}

export default function Footer({ className }: Props): ReactElement {
  return (
    <footer
      className={`py-6 px-4 bg-green-500 border-t-4 border-solid border-green-400 text-white ${className}`}
    >
      <div className={`font-semibold text-center sm:text-left mb-2 sm:mb-0`}>
        <p className={`text-xl`}>Onbai.app - {new Date().getFullYear()}</p>
        <p className={`text-sm`}>Free online education tools</p>
      </div>
      <div className="flex sm:flex-row space-y-4 sm:space-y-0 flex-col justify-between items-center">
        <div className={`text-sm`}>
          <a
            className={`hover:underline`}
            href={
              'https://github.com/001123/onbai-nextjs-dev/commit/' +
              (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || '')
            }
            target="_blank"
          >
            ID:{' '}
            {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
              'cc5a982865d93f298a2634ac2f9aa31b1e7ca96c'}
          </a>
        </div>
        <div className={`text-sm font-semibold`}>
          Language{' '}
          <select className={`text-gray-600 font-semibold p-1 bg-white`}>
            <option value="en">English</option>
            {/* <option value="vi">Vietnam</option> */}
          </select>
        </div>
      </div>
    </footer>
  )
}
