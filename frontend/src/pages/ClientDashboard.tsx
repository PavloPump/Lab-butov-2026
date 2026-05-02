import { useState } from 'react'
import Layout from '../components/Layout'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAuthContext } from '../contexts/AuthContext'
import { useOrders } from '../hooks/useOrders'
import { Order } from '../services/mockData'

function ClientDashboard() {
  const { user, logout } = useAuthContext();
  const { orders, isLoading, createOrder } = useOrders(user?.id);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    
    setIsCreating(true);
    const formData = new FormData(e.currentTarget);
    const orderData = {
      clientId: user.id,
      from: formData.get('from') as string,
      to: formData.get('to') as string,
      weight: parseFloat(formData.get('weight') as string),
      dimensions: formData.get('dimensions') as string
    };

    const result = await createOrder(orderData);
    setIsCreating(false);
    
    if (result.success) {
      setShowCreateForm(false);
      e.currentTarget.reset();
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'PENDING': return 'border-yellow-500';
      case 'ASSIGNED': return 'border-blue-500';
      case 'IN_PROGRESS': return 'border-indigo-600';
      case 'DELIVERED': return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'ASSIGNED': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-indigo-100 text-indigo-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'PENDING': return 'Ожидает водителя';
      case 'ASSIGNED': return 'Назначен';
      case 'IN_PROGRESS': return 'В процессе';
      case 'DELIVERED': return 'Доставлен';
      default: return status;
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
    <Layout showNav={true} userRole="CLIENT">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Панель клиента</h2>
          <Button variant="secondary" onClick={logout}>
            Выйти
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">➕ Создать новый заказ</h3>
            {!showCreateForm ? (
              <>
                <p className="text-gray-600 mb-4">Заполните форму для создания нового заказа на доставку груза.</p>
                <Button onClick={() => setShowCreateForm(true)}>
                  Создать заказ
                </Button>
              </>
            ) : (
              <form onSubmit={handleCreateOrder} className="space-y-4">
                <Input
                  label="Откуда"
                  type="text"
                  name="from"
                  placeholder="Город отправления"
                  required
                />
                <Input
                  label="Куда"
                  type="text"
                  name="to"
                  placeholder="Город назначения"
                  required
                />
                <Input
                  label="Вес (кг)"
                  type="text"
                  name="weight"
                  placeholder="500"
                  required
                />
                <Input
                  label="Габариты (м)"
                  type="text"
                  name="dimensions"
                  placeholder="2x1.5x1"
                  required
                />
                <div className="flex gap-2">
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? 'Создание...' : 'Создать'}
                  </Button>
                  <Button 
                    variant="secondary" 
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">📦 Мои заказы</h3>
            {isLoading ? (
              <p className="text-gray-600">Загрузка заказов...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-600">У вас пока нет заказов</p>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className={`bg-gray-50 p-3 rounded border-l-4 ${getStatusColor(order.status)}`}>
                    <p className="font-medium">Заказ #{order.id}</p>
                    <p className="text-sm text-gray-600">{order.from} → {order.to}</p>
                    <p className="text-sm text-gray-600">Вес: {order.weight} кг, Габариты: {order.dimensions}</p>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${getStatusBadge(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
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

export default ClientDashboard
