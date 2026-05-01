import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

function HomePage() {
  return (
    <Layout showNav={true} userRole={null}>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Система управления доставкой грузов
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Эффективное управление процессами доставки для клиентов и водителей
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-indigo-700"
              >
                Начать сейчас
              </Link>
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg hover:bg-gray-50 border-2 border-indigo-600"
              >
                Войти в систему
              </Link>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Для клиентов</h3>
              <p className="text-gray-600">
                Создавайте заказы на доставку грузов, отслеживайте их статус в реальном времени
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Для водителей</h3>
              <p className="text-gray-600">
                Принимайте заказы, обновляйте местоположение, управляйте доставками
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Для администраторов</h3>
              <p className="text-gray-600">
                Управляйте пользователями, заказами и аналитикой системы
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
