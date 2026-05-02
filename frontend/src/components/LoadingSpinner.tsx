interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
}

export default function LoadingSpinner({ size = 'medium', text }: LoadingSpinnerProps) {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`${sizes[size]} border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin`}></div>
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  );
}
