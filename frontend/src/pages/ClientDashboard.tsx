import Layout from '../components/Layout'

function ClientDashboard() {
  return (
    <Layout showNav={true} userRole="CLIENT">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Панель клиента</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">➕ Создать новый заказ</h3>
            <p className="text-gray-600 mb-4">Заполните форму для создания нового заказа на доставку груза.</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Создать заказ
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">📦 Мои заказы</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded border-l-4 border-indigo-600">
                <p className="font-medium">Заказ #1234</p>
                <p className="text-sm text-gray-600">Москва → Санкт-Петербург</p>
                <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">В процессе</span>
              </div>
              <div className="bg-gray-50 p-3 rounded border-l-4 border-yellow-500">
                <p className="font-medium">Заказ #1233</p>
                <p className="text-sm text-gray-600">Казань → Нижний Новгород</p>
                <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Ожидает водителя</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ClientDashboard
