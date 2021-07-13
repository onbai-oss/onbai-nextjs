import React from 'react'

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
  size?: 'small' | 'base' | 'large'
  icon?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, size = 'base', color = 'primary', icon, disabled } = props
    const outline = color.includes('outline')

    return (
      <button
        {...props}
        ref={ref}
        className={`
      appearance-none cursor-pointer outline-none
      px-6 py-2.5 font-semibold rounded
      flex gap-2 items-center flex-wrap justify-center
      focus:ring-1 ring-gray-900 ring-offset-2
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
      
      
      border-2 border-solid border-transparent
      hover:opacity-95
    `}
      >
        {icon && icon ? (
          <i
            data-eva={icon}
            data-eva-fill={
              outline
                ? disabled
                  ? '#D1D5DB'
                  : (color.includes('primary') && '#10B981') ||
                    (color.includes('danger') && '#EF4444 ') ||
                    (color.includes('warning') && '#F59E0B ') ||
                    (color.includes('info') && '#3B82F6')
                : 'rgba(255,255,255,1)'
            }
          ></i>
        ) : null}

        {children}
      </button>
    )
  }
)

export default Button
