import React, { ReactElement } from 'react'

interface Props {}

export default function Footer({}: Props): ReactElement {
  return (
    <footer
      className={`py-6 px-4 bg-green-500 border-t-4 border-solid border-green-400 text-white`}
    >
      <div className="flex justify-between items-center font-semibold">
        <div className={`text-sm`}> Onbai.app - 0.0.1</div>
        <div className={`text-sm`}></div>
      </div>
    </footer>
  )
}
