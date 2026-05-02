import { User, Order, Delivery, mockUsers, mockOrders, mockDeliveries } from './mockData';

// Типы для состояний
export type RequestState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T> {
  data: T | null;
  state: RequestState;
  error: string | null;
}

// Сервис для работы с данными (имитация backend)
class DataService {
  private users: User[] = [...mockUsers];
  private orders: Order[] = [...mockOrders];
  private deliveries: Delivery[] = [...mockDeliveries];

  // Имитация задержки сети
  private async delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Получить всех пользователей
  async getUsers(): Promise<ApiResponse<User[]>> {
    try {
      await this.delay();
      return {
        data: this.users,
        state: 'success',
        error: null
      };
    } catch (error) {
      return {
        data: null,
        state: 'error',
        error: 'Ошибка при получении пользователей'
      };
    }
  }

  // Получить пользователя по ID
  async getUserById(id: string): Promise<ApiResponse<User>> {
    try {
      await this.delay();
      const user = this.users.find(u => u.id === id);
      if (!user) {
        return {
          data: null,
          state: 'error',
          error: 'Пользователь не найден'
        };
      }
      return {
        data: user,
        state: 'success',
        error: null
      };
    } catch (error) {
      return {
        data: null,
        state: 'error',
        error: 'Ошибка при получении пользователя'
      };
    }
  }

  // Создать пользователя
  async createUser(userData: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    try {
      await this.delay();
      const newUser: User = {
        ...userData,
        id: `USER-${Date.now()}`
      };
      this.users.push(newUser);
      return {
        data: newUser,
        state: 'success',
        error: null
      };
    } catch (error) {
      return {
        data: null,
        state: 'error',
        error: 'Ошибка при создании пользователя'
      };
    }
  }

  // Получить все заказы
  async getOrders(): Promise<ApiResponse<Order[]>> {
    try {
      await this.delay();
      return {
        data: this.orders,
        state: 'success',
        error: null
      };
    } catch (error) {
      return {
        data: null,
        state: 'error',
        error: 'Ошибка при получении заказов'
      };
    }
  }

  // Получить заказы клиента
  async getClientOrders(clientId: string): Promise<ApiResponse<Order[]>> {
    try {
      await this.delay();
      const clientOrders = this.orders.filter(o => o.clientId === clientId);
      return {
        data: clientOrders,
        state: 'success',
        error: null
      };
    } catch (error) {
      return {
        data: null,
        state: 'error',
        error: 'Ошибка при получении заказов клиента'
      };
    }
  }

  // Получить доступные заказы для водителя
  async getAvailableOrders(): Promise<ApiResponse<Order[]>> {
    try {
      await this.delay();
      const availableOrders = this.orders.filter(o => o.status === 'PENDING');
      return {
        data: availableOrders,
        state: 'success',
        error: null
      };
    } catch (error) {
      return {
        data: null,
        state: 'error',
        error: 'Ошибка при получении доступных заказов'
      };
    }
  }

  // Создать заказ
  async createOrder(orderData: Omit<Order, 'id' | 'status' | 'createdAt'>): Promise<ApiResponse<Order>> {
    try {
      await this.delay();
      const newOrder: Order = {
        ...orderData,
        id: `ORD-${Date.now()}`,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };
      this.orders.push(newOrder);
      return {
        data: newOrder,
        state: 'success',
        error: null
      };
    } catch (error) {
      return {
        data: null,
        state: 'error',
        error: 'Ошибка при создании заказа'
      };
    }
  }

  // Назначить водителя на заказ
  async assignDriverToOrder(orderId: string, driverId: string): Promise<ApiResponse<Order>> {
    try {
      await this.delay();
      const order = this.orders.find(o => o.id === orderId);
      if (!order) {
        return {
          data: null,
          state: 'error',
          error: 'Заказ не найден'
        };
      }
      order.driverId = driverId;
      order.status = 'ASSIGNED';
      
      // Создать доставку
      const newDelivery: Delivery = {
        id: `DEL-${Date.now()}`,
        orderId: orderId,
        driverId: driverId,
        status: 'PENDING'
      };
      this.deliveries.push(newDelivery);
      
      return {
        data: order,
        state: 'success',
        error: null
      };
    } catch (error) {
      return {
        data: null,
        state: 'error',
        error: 'Ошибка при назначении водителя'
      };
    }
  }

  // Получить доставки водителя
  async getDriverDeliveries(driverId: string): Promise<ApiResponse<Delivery[]>> {
    try {
      await this.delay();
      const driverDeliveries = this.deliveries.filter(d => d.driverId === driverId);
      return {
        data: driverDeliveries,
        state: 'success',
        error: null
      };
    } catch (error) {
      return {
        data: null,
        state: 'error',
        error: 'Ошибка при получении доставок'
      };
    }
  }

  // Обновить статус доставки
  async updateDeliveryStatus(deliveryId: string, status: Delivery['status']): Promise<ApiResponse<Delivery>> {
    try {
      await this.delay();
      const delivery = this.deliveries.find(d => d.id === deliveryId);
      if (!delivery) {
        return {
          data: null,
          state: 'error',
          error: 'Доставка не найдена'
        };
      }
      delivery.status = status;
      
      // Обновить статус заказа
      const order = this.orders.find(o => o.id === delivery.orderId);
      if (order) {
        if (status === 'IN_PROGRESS') {
          order.status = 'IN_PROGRESS';
        } else if (status === 'COMPLETED') {
          order.status = 'DELIVERED';
        }
      }
      
      return {
        data: delivery,
        state: 'success',
        error: null
      };
    } catch (error) {
      return {
        data: null,
        state: 'error',
        error: 'Ошибка при обновлении статуса доставки'
      };
    }
  }
}

export const dataService = new DataService();
