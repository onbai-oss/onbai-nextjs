import React, { useEffect } from 'react'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string
  className?
}

const Input: React.FC<IInputProps> = (props) => {
  const { disabled, icon, className } = props

  useEffect(() => {
    if (icon) {
      // @ts-ignore
      eva && eva?.replace()
    }
  }, [icon, disabled])

  return (
    <div className={`relative`}>
      {icon && icon ? (
        <div className={`absolute bottom-1/2 left-3 transform translate-y-1/2`}>
          <i
            data-eva={icon}
            data-eva-fill={disabled ? '#D1D5DB' : '#4B5563'}
          ></i>
        </div>
      ) : null}

      <input
        className={`
        ${className}
        appearance-none cursor-pointer outline-none
         pr-3 py-2 font-semibold rounded w-full
         focus:ring-1 ring-gray-600 ring-offset-2
         shadow-md
        ${icon ? 'pl-10' : 'pl-3'}
        ${disabled ? 'cursor-not-allowed text-gray-300' : ''}
        ${disabled ? 'border-gray-300' : 'border-gray-600'}
      `}
        {...props}
      ></input>
    </div>
  )
}

export default Input
