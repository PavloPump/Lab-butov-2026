interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit'
  className?: string
  disabled?: boolean
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  className = '',
  disabled = false
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors'
  const variantStyles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed',
    secondary: 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
