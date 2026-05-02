import { useState, useEffect } from 'react';
import { Order, Delivery } from '../services/mockData';
import { dataService, ApiResponse } from '../services/dataService';

export interface DriverState {
  availableOrders: Order[];
  myDeliveries: Delivery[];
  isLoading: boolean;
  error: string | null;
}

export const useDriver = (driverId?: string) => {
  const [state, setState] = useState<DriverState>({
    availableOrders: [],
    myDeliveries: [],
    isLoading: false,
    error: null
  });

  // Загрузить доступные заказы
  const loadAvailableOrders = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response: ApiResponse<Order[]> = await dataService.getAvailableOrders();
    
    if (response.state === 'success' && response.data) {
      setState(prev => ({
        ...prev,
        availableOrders: response.data!,
        isLoading: false,
        error: null
      }));
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error || 'Ошибка загрузки заказов'
      }));
    }
  };

  // Загрузить доставки водителя
  const loadMyDeliveries = async () => {
    if (!driverId) return;
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response: ApiResponse<Delivery[]> = await dataService.getDriverDeliveries(driverId);
    
    if (response.state === 'success' && response.data) {
      setState(prev => ({
        ...prev,
        myDeliveries: response.data!,
        isLoading: false,
        error: null
      }));
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error || 'Ошибка загрузки доставок'
      }));
    }
  };

  // Принять заказ
  const acceptOrder = async (orderId: string) => {
    if (!driverId) return { success: false, error: 'Не авторизован как водитель' };
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response: ApiResponse<Order> = await dataService.assignDriverToOrder(orderId, driverId);
    
    if (response.state === 'success') {
      // Обновить списки
      await loadAvailableOrders();
      await loadMyDeliveries();
      return { success: true };
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error || 'Ошибка принятия заказа'
      }));
      return { success: false, error: response.error };
    }
  };

  // Обновить статус доставки
  const updateDeliveryStatus = async (deliveryId: string, status: Delivery['status']) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response: ApiResponse<Delivery> = await dataService.updateDeliveryStatus(deliveryId, status);
    
    if (response.state === 'success') {
      await loadMyDeliveries();
      return { success: true };
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error || 'Ошибка обновления статуса'
      }));
      return { success: false, error: response.error };
    }
  };

  // Загрузить данные при монтировании компонента
  useEffect(() => {
    loadAvailableOrders();
    if (driverId) {
      loadMyDeliveries();
    }
  }, [driverId]);

  return {
    ...state,
    loadAvailableOrders,
    loadMyDeliveries,
    acceptOrder,
    updateDeliveryStatus
  };
};
