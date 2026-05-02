const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Users
  async getUsers() {
    return this.request('/users');
  }

  async getUserById(id: string) {
    return this.request(`/users/${id}`);
  }

  // Orders
  async getOrders() {
    return this.request('/orders');
  }

  async getOrderById(id: string) {
    return this.request(`/orders/${id}`);
  }

  async createOrder(data: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Deliveries
  async getDeliveries() {
    return this.request('/deliveries');
  }

  async getDeliveryById(id: string) {
    return this.request(`/deliveries/${id}`);
  }
}

export const apiService = new ApiService(API_BASE_URL);
