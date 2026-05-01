import { Link } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
  showNav?: boolean
  userRole?: 'CLIENT' | 'DRIVER' | 'ADMIN' | null
}

export default function Layout({ children, showNav = true, userRole = null }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNav && (
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-indigo-600">
                  DeliverySystem
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                {userRole ? (
                  <>
                    <span className="text-gray-700">
                      {userRole === 'CLIENT' ? 'Клиент' : userRole === 'DRIVER' ? 'Водитель' : 'Администратор'}
                    </span>
                    <Link to="/" className="text-gray-700 hover:text-indigo-600">
                      Выйти
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                      Войти
                    </Link>
                    <Link
                      to="/register"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                      Регистрация
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
      <main>{children}</main>
    </div>
  )
}
