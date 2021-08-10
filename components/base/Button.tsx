import React, { useEffect } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?:
    | 'primary'
    | 'danger'
    | 'warning'
    | 'info'
    | 'primary-outline'
    | 'danger-outline'
    | 'warning-outline'
    | 'info-outline'
    | 'text-outline'
  size?: 'small' | 'base' | 'large'
  icon?: string
  className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      size = 'base',
      color = 'primary',
      icon,
      disabled,
      className,
    } = props
    const outline = color.includes('outline')

    useEffect(() => {
      if (icon) {
        // @ts-ignore
        eva && eva?.replace()
      }
    }, [icon])

    return (
      <button
        {...props}
        ref={ref}
        className={`
      ${className ? className : ''}
      appearance-none cursor-pointer outline-none 
      px-4 py-2.5 font-semibold rounded 
      focus:ring-1 ring-gray-600 ring-offset-2
      hover:shadow-md 
      ${
        disabled
          ? outline
            ? 'text-gray-300 bg-white border-gray-300 cursor-not-allowed'
            : 'bg-gray-300 text-white cursor-not-allowed'
          : ''
      }
      ${
        !disabled && color.includes('primary')
          ? outline
            ? 'text-green-500 bg-white border-green-500'
            : 'bg-green-500 text-white'
          : ''
      }
      ${
        !disabled && color.includes('danger')
          ? outline
            ? 'text-red-500 bg-white border-red-500'
            : 'bg-red-500 text-white'
          : ''
      }
      ${
        !disabled && color.includes('warning')
          ? outline
            ? 'text-yellow-500 bg-white border-yellow-500'
            : 'bg-yellow-500 text-white'
          : ''
      }
      ${
        !disabled && color.includes('info')
          ? outline
            ? 'text-blue-500 bg-white border-blue-500'
            : 'bg-blue-500 text-white'
          : ''
      }
      ${
        !disabled && color.includes('text')
          ? outline
            ? 'text-gray-600 bg-white border-gray-600'
            : 'bg-gray-600 text-white'
          : ''
      }
      border-2 border-solid border-transparent
      hover:opacity-95
    `}
      >
        <span className={`flex justify-center`}>
          {icon && icon ? (
            <i
              className={children ? 'mr-2' : ''}
              data-eva={icon}
              data-eva-fill={
                outline
                  ? disabled
                    ? '#D1D5DB'
                    : (color.includes('primary') && '#10B981') ||
                      (color.includes('danger') && '#EF4444 ') ||
                      (color.includes('warning') && '#F59E0B ') ||
                      (color.includes('info') && '#3B82F6') ||
                      (color.includes('text') && '#1B324F')
                  : 'rgba(255,255,255,1)'
              }
            ></i>
          ) : null}
          {children}
        </span>
      </button>
    )
  }
)

export default Button
