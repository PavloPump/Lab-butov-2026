// Mock данные для демонстрации работы приложения
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'CLIENT' | 'DRIVER' | 'ADMIN';
}

export interface Order {
  id: string;
  clientId: string;
  driverId?: string;
  from: string;
  to: string;
  weight: number;
  dimensions: string;
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'DELIVERED';
  createdAt: string;
}

export interface Delivery {
  id: string;
  orderId: string;
  driverId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  currentLocation?: string;
  estimatedArrival?: string;
}

// Mock данные пользователей
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    role: 'CLIENT'
  },
  {
    id: '2',
    name: 'Петр Петров',
    email: 'petr@example.com',
    phone: '+7 (999) 234-56-78',
    role: 'DRIVER'
  }
];

// Mock данные заказов
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    clientId: '1',
    driverId: '2',
    from: 'Москва',
    to: 'Санкт-Петербург',
    weight: 500,
    dimensions: '2x1.5x1',
    status: 'IN_PROGRESS',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'ORD-002',
    clientId: '1',
    from: 'Казань',
    to: 'Нижний Новгород',
    weight: 300,
    dimensions: '1.5x1x0.8',
    status: 'PENDING',
    createdAt: '2024-01-16T14:30:00Z'
  },
  {
    id: 'ORD-003',
    clientId: '1',
    from: 'Новосибирск',
    to: 'Омск',
    weight: 500,
    dimensions: '2x1.5x1',
    status: 'PENDING',
    createdAt: '2024-01-17T09:15:00Z'
  }
];

// Mock данные доставок
export const mockDeliveries: Delivery[] = [
  {
    id: 'DEL-001',
    orderId: 'ORD-001',
    driverId: '2',
    status: 'IN_PROGRESS',
    currentLocation: 'Тверь',
    estimatedArrival: '2024-01-15T18:00:00Z'
  }
];
