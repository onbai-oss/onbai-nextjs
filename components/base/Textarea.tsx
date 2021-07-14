import React from 'react'

interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<ITextareaProps> = (props) => {
  const { disabled } = props
  return (
    <div
      className={`
      relative
    `}
    >
      <textarea
        className={`
        appearance-none cursor-pointer outline-none
         pr-3 py-2 font-semibold rounded w-full
        border-2 border-solid 
        focus:ring-1 ring-gray-600 ring-offset-2
        pl-3
        ${disabled ? 'cursor-not-allowed' : ''}
        ${disabled ? 'border-gray-300' : 'border-gray-600'}

      `}
        {...props}
      ></textarea>
    </div>
  )
}

export default Textarea
