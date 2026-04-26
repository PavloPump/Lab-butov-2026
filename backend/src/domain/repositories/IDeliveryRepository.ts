import { Delivery, DeliveryStatus } from '../entities/Delivery';

export interface IDeliveryRepository {
  create(delivery: Omit<Delivery, 'id' | 'createdAt' | 'updatedAt'>): Promise<Delivery>;
  findById(id: string): Promise<Delivery | null>;
  findByOrderId(orderId: string): Promise<Delivery | null>;
  findByDriverId(driverId: string): Promise<Delivery[]>;
  update(id: string, data: Partial<Delivery>): Promise<Delivery>;
  delete(id: string): Promise<void>;
  findByStatus(status: DeliveryStatus): Promise<Delivery[]>;
  findAll(): Promise<Delivery[]>;
}
