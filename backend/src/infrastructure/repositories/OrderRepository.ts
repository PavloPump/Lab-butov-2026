import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order, OrderStatus } from '../../domain/entities/Order';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class OrderRepository implements IOrderRepository {
  async create(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const created = await prisma.order.create({
      data: order
    });
    return created as Order;
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { client: true, driver: true }
    });
    return order as Order | null;
  }

  async findByClientId(clientId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { clientId },
      include: { client: true, driver: true }
    });
    return orders as Order[];
  }

  async findByDriverId(driverId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { driverId },
      include: { client: true, driver: true }
    });
    return orders as Order[];
  }

  async update(id: string, data: Partial<Order>): Promise<Order> {
    const updated = await prisma.order.update({
      where: { id },
      data
    });
    return updated as Order;
  }

  async delete(id: string): Promise<void> {
    await prisma.order.delete({
      where: { id }
    });
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { status },
      include: { client: true, driver: true }
    });
    return orders as Order[];
  }

  async findAll(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      include: { client: true, driver: true }
    });
    return orders as Order[];
  }
}
