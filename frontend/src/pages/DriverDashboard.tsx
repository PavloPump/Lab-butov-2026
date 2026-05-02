import Layout from '../components/Layout'
import Button from '../components/Button'
import { useAuthContext } from '../contexts/AuthContext'
import { useDriver } from '../hooks/useDriver'
import { Delivery } from '../services/mockData'

function DriverDashboard() {
  const { user, logout } = useAuthContext();
  const { 
    availableOrders, 
    myDeliveries, 
    isLoading, 
    acceptOrder, 
    updateDeliveryStatus 
  } = useDriver(user?.id);

  const handleAcceptOrder = async (orderId: string) => {
    const result = await acceptOrder(orderId);
    if (!result.success) {
      alert('Ошибка при принятии заказа');
    }
  };

  const handleUpdateStatus = async (deliveryId: string, newStatus: Delivery['status']) => {
    const result = await updateDeliveryStatus(deliveryId, newStatus);
    if (!result.success) {
      alert('Ошибка при обновлении статуса');
    }
  };

  if (!user) {
    return (
      <Layout showNav={true} userRole={null}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">Загрузка...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showNav={true} userRole="DRIVER">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Панель водителя</h2>
          <Button variant="secondary" onClick={logout}>
            Выйти
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">📋 Доступные заказы</h3>
            {isLoading ? (
              <p className="text-gray-600">Загрузка заказов...</p>
            ) : availableOrders.length === 0 ? (
              <p className="text-gray-600">Нет доступных заказов</p>
            ) : (
              <div className="space-y-3">
                {availableOrders.map((order) => (
                  <div key={order.id} className="bg-gray-50 p-3 rounded border-l-4 border-green-500">
                    <p className="font-medium">Заказ #{order.id}</p>
                    <p className="text-sm text-gray-600">{order.from} → {order.to}</p>
                    <p className="text-sm text-gray-600">Вес: {order.weight} кг, Габариты: {order.dimensions}</p>
                    <Button 
                      className="mt-2 text-sm"
                      onClick={() => handleAcceptOrder(order.id)}
                    >
                      Принять заказ
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">🚚 Текущие доставки</h3>
            {isLoading ? (
              <p className="text-gray-600">Загрузка доставок...</p>
            ) : myDeliveries.length === 0 ? (
              <p className="text-gray-600">У вас пока нет доставок</p>
            ) : (
              <div className="space-y-3">
                {myDeliveries.map((delivery) => (
                  <div key={delivery.id} className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                    <p className="font-medium">Доставка #{delivery.id}</p>
                    <p className="text-sm text-gray-600">Заказ: {delivery.orderId}</p>
                    {delivery.currentLocation && (
                      <p className="text-sm text-gray-600">Локация: {delivery.currentLocation}</p>
                    )}
                    {delivery.estimatedArrival && (
                      <p className="text-sm text-gray-600">Ожидаемое прибытие: {new Date(delivery.estimatedArrival).toLocaleString()}</p>
                    )}
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
                      delivery.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      delivery.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {delivery.status === 'PENDING' ? 'Ожидает' :
                       delivery.status === 'IN_PROGRESS' ? 'В пути' :
                       'Завершена'}
                    </span>
                    {delivery.status === 'PENDING' && (
                      <Button 
                        className="mt-2 text-sm"
                        onClick={() => handleUpdateStatus(delivery.id, 'IN_PROGRESS')}
                      >
                        Начать доставку
                      </Button>
                    )}
                    {delivery.status === 'IN_PROGRESS' && (
                      <Button 
                        className="mt-2 text-sm"
                        onClick={() => handleUpdateStatus(delivery.id, 'COMPLETED')}
                      >
                        Завершить доставку
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DriverDashboard
