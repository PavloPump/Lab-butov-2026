function DriverDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">DeliverySystem</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Водитель</span>
              <button className="text-gray-700 hover:text-indigo-600">Выйти</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Панель водителя</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Доступные заказы</h3>
          <p className="text-gray-600">Список доступных заказов будет здесь...</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Текущие доставки</h3>
          <p className="text-gray-600">Список текущих доставок будет здесь...</p>
        </div>
      </div>
    </div>
  )
}

export default DriverDashboard
