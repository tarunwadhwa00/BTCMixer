import React from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-light'
    | 'outline-dark'
  size?: 'sm' | 'lg'
}
export const Button = ({ children, variant = 'primary', size, ...props }: ButtonProps) => {
  const defaults = 'font-weight-600 text-capitalize btn'
  const btnClass = `${defaults} btn-${variant} ${size ? `btn-${size}` : ''}`.trim()

  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  )
}
