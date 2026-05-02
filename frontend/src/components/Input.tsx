interface InputProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'tel'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  name?: string
}

export default function Input({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange,
  required = false,
  name
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  )
}
