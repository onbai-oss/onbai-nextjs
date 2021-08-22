import React, { ReactElement } from 'react'

interface Props {}

export default function Spinner({}: Props): ReactElement {
  return (
    <div className={`text-sm animate-pulse text-center font-semibold`}>⌛️</div>
  )
}
