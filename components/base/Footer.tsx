import React, { ReactElement } from 'react'

interface Props {
  className?
}

export default function Footer({ className }: Props): ReactElement {
  return (
    <footer
      className={`py-6 px-4 bg-green-500 border-t-4 border-solid border-green-400 text-white ${className}`}
    >
      <div className="flex justify-between items-center font-semibold">
        <div className={`text-sm`}>
          <a
            className={`hover:underline`}
            href="https://github.com/onbai-oss/onbai-nextjs"
            target="_blank"
          >
            Onbai.app - {process.env.NEXT_PUBLIC_APP_VERSION}
          </a>
        </div>
        <div className={`text-sm`}></div>
      </div>
    </footer>
  )
}
