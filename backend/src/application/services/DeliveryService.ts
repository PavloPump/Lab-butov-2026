import { IDeliveryRepository } from '../../domain/repositories/IDeliveryRepository';
import { Delivery, DeliveryStatus } from '../../domain/entities/Delivery';

export class DeliveryService {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  async createDelivery(data: {
    orderId: string;
    driverId: string;
    estimatedArrival?: Date;
    notes?: string;
  }): Promise<Delivery> {
    return this.deliveryRepository.create({
      ...data,
      status: DeliveryStatus.SCHEDULED
    });
  }

  async getDeliveryById(id: string): Promise<Delivery | null> {
    return this.deliveryRepository.findById(id);
  }

  async getDeliveryByOrderId(orderId: string): Promise<Delivery | null> {
    return this.deliveryRepository.findByOrderId(orderId);
  }

  async getDeliveriesByDriver(driverId: string): Promise<Delivery[]> {
    return this.deliveryRepository.findByDriverId(driverId);
  }

  async updateDeliveryStatus(id: string, status: DeliveryStatus): Promise<Delivery> {
    return this.deliveryRepository.update(id, { status });
  }

  async updateLocation(id: string, location: string): Promise<Delivery> {
    return this.deliveryRepository.update(id, { currentLocation: location });
  }

  async updateDelivery(id: string, data: Partial<Delivery>): Promise<Delivery> {
    return this.deliveryRepository.update(id, data);
  }

  async deleteDelivery(id: string): Promise<void> {
    return this.deliveryRepository.delete(id);
  }

  async getDeliveriesByStatus(status: DeliveryStatus): Promise<Delivery[]> {
    return this.deliveryRepository.findByStatus(status);
  }

  async getAllDeliveries(): Promise<Delivery[]> {
    return this.deliveryRepository.findAll();
  }
}
