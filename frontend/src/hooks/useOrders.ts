import { useState, useEffect } from 'react';
import { Order } from '../services/mockData';
import { dataService, ApiResponse } from '../services/dataService';

export interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

export const useOrders = (clientId?: string) => {
  const [state, setState] = useState<OrdersState>({
    orders: [],
    isLoading: false,
    error: null
  });

  // Загрузить заказы
  const loadOrders = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    let response: ApiResponse<Order[]>;
    if (clientId) {
      response = await dataService.getClientOrders(clientId);
    } else {
      response = await dataService.getOrders();
    }
    
    if (response.state === 'success' && response.data) {
      setState({
        orders: response.data,
        isLoading: false,
        error: null
      });
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error || 'Ошибка загрузки заказов'
      }));
    }
  };

  // Создать заказ
  const createOrder = async (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response: ApiResponse<Order> = await dataService.createOrder(orderData);
    
    if (response.state === 'success' && response.data) {
      setState(prev => ({
        orders: [...prev.orders, response.data!],
        isLoading: false,
        error: null
      }));
      return { success: true, order: response.data };
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error || 'Ошибка создания заказа'
      }));
      return { success: false, error: response.error };
    }
  };

  // Загрузить заказы при монтировании компонента
  useEffect(() => {
    loadOrders();
  }, [clientId]);

  return {
    ...state,
    loadOrders,
    createOrder
  };
};
