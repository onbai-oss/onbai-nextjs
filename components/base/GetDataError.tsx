import React, { ReactElement } from 'react'

interface Props {}

export default function GetDataError({}: Props): ReactElement {
  return (
    <div className={`text-center my-4 text-sm text-yellow-600`}>
      <i data-eva="github"></i>
      Opps! Something went wrong.
      <br />
      Please wait or refresh browser.
    </div>
  )
}
