import React, { ReactElement } from 'react'

interface Props {}

export default function GetDataError({}: Props): ReactElement {
  return (
    <div className={`text-center `}>
      <i data-eva="github"></i>
      Opps! Something went wrong.
      <br />
      Please wait or refresh browser.
    </div>
  )
}
