import Layout from '../components/Layout'

function DriverDashboard() {
  return (
    <Layout showNav={true} userRole="DRIVER">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Панель водителя</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">📋 Доступные заказы</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded border-l-4 border-green-500">
                <p className="font-medium">Заказ #1235</p>
                <p className="text-sm text-gray-600">Новосибирск → Омск</p>
                <p className="text-sm text-gray-600">Вес: 500 кг, Габариты: 2x1.5x1 м</p>
                <button className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700">
                  Принять заказ
                </button>
              </div>
              <div className="bg-gray-50 p-3 rounded border-l-4 border-green-500">
                <p className="font-medium">Заказ #1236</p>
                <p className="text-sm text-gray-600">Самара → Саратов</p>
                <p className="text-sm text-gray-600">Вес: 300 кг, Габариты: 1.5x1x0.8 м</p>
                <button className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700">
                  Принять заказ
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">🚚 Текущие доставки</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                <p className="font-medium">Заказ #1234</p>
                <p className="text-sm text-gray-600">Москва → Санкт-Петербург</p>
                <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">В пути</span>
                <button className="mt-2 bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                  Обновить статус
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DriverDashboard
