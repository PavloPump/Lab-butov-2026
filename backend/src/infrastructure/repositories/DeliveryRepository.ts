import { IDeliveryRepository } from '../../domain/repositories/IDeliveryRepository';
import { Delivery, DeliveryStatus } from '../../domain/entities/Delivery';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DeliveryRepository implements IDeliveryRepository {
  async create(delivery: Omit<Delivery, 'id' | 'createdAt' | 'updatedAt'>): Promise<Delivery> {
    const created = await prisma.delivery.create({
      data: delivery
    });
    return created as Delivery;
  }

  async findById(id: string): Promise<Delivery | null> {
    const delivery = await prisma.delivery.findUnique({
      where: { id },
      include: { order: true, driver: true }
    });
    return delivery as Delivery | null;
  }

  async findByOrderId(orderId: string): Promise<Delivery | null> {
    const delivery = await prisma.delivery.findUnique({
      where: { orderId },
      include: { order: true, driver: true }
    });
    return delivery as Delivery | null;
  }

  async findByDriverId(driverId: string): Promise<Delivery[]> {
    const deliveries = await prisma.delivery.findMany({
      where: { driverId },
      include: { order: true, driver: true }
    });
    return deliveries as Delivery[];
  }

  async update(id: string, data: Partial<Delivery>): Promise<Delivery> {
    const updated = await prisma.delivery.update({
      where: { id },
      data
    });
    return updated as Delivery;
  }

  async delete(id: string): Promise<void> {
    await prisma.delivery.delete({
      where: { id }
    });
  }

  async findByStatus(status: DeliveryStatus): Promise<Delivery[]> {
    const deliveries = await prisma.delivery.findMany({
      where: { status },
      include: { order: true, driver: true }
    });
    return deliveries as Delivery[];
  }

  async findAll(): Promise<Delivery[]> {
    const deliveries = await prisma.delivery.findMany({
      include: { order: true, driver: true }
    });
    return deliveries as Delivery[];
  }
}
