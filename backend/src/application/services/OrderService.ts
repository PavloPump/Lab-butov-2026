import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order, OrderStatus } from '../../domain/entities/Order';

export class OrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async createOrder(data: {
    clientId: string;
    pickupAddress: string;
    deliveryAddress: string;
    cargoDescription: string;
    cargoWeight: number;
    cargoDimensions: string;
    estimatedDeliveryTime?: Date;
  }): Promise<Order> {
    return this.orderRepository.create({
      ...data,
      status: OrderStatus.PENDING
    });
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async getOrdersByClient(clientId: string): Promise<Order[]> {
    return this.orderRepository.findByClientId(clientId);
  }

  async getOrdersByDriver(driverId: string): Promise<Order[]> {
    return this.orderRepository.findByDriverId(driverId);
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    return this.orderRepository.update(id, { status });
  }

  async assignDriver(orderId: string, driverId: string): Promise<Order> {
    return this.orderRepository.update(orderId, {
      driverId,
      status: OrderStatus.ASSIGNED
    });
  }

  async updateOrder(id: string, data: Partial<Order>): Promise<Order> {
    return this.orderRepository.update(id, data);
  }

  async deleteOrder(id: string): Promise<void> {
    return this.orderRepository.delete(id);
  }

  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    return this.orderRepository.findByStatus(status);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}
