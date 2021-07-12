import React from 'react'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string
}

const Input: React.FC<IInputProps> = (props) => {
  const { disabled, icon } = props
  return (
    <div
      className={`
      relative
    `}
    >
      {icon && icon ? (
        <div className={`absolute bottom-1/2 left-3 transform translate-y-1/2`}>
          <i data-eva={icon} data-eva-fill="#1B324F"></i>
        </div>
      ) : null}

      <input
        className={`
        appearance-none cursor-pointer outline-none
         pr-3 py-2 font-semibold rounded w-full
        border-2 border-solid 
        focus:ring-1 ring-gray-600 ring-offset-2
        ${icon ? 'pl-10' : 'pl-3'}
        ${disabled ? 'cursor-not-allowed' : ''}
        ${disabled ? 'border-gray-300' : 'border-gray-600'}

      `}
        {...props}
      ></input>
    </div>
  )
}

export default Input
