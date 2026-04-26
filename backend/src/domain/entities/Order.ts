export enum OrderStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface Order {
  id: string;
  clientId: string;
  driverId?: string;
  status: OrderStatus;
  pickupAddress: string;
  deliveryAddress: string;
  cargoDescription: string;
  cargoWeight: number;
  cargoDimensions: string;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}
