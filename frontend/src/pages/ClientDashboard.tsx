function ClientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">DeliverySystem</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Клиент</span>
              <button className="text-gray-700 hover:text-indigo-600">Выйти</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Панель клиента</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Создать новый заказ</h3>
          <p className="text-gray-600">Форма создания заказа будет здесь...</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Мои заказы</h3>
          <p className="text-gray-600">Список заказов будет здесь...</p>
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard
