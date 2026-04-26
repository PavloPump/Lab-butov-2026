export enum DeliveryStatus {
  SCHEDULED = 'SCHEDULED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface Delivery {
  id: string;
  orderId: string;
  driverId: string;
  status: DeliveryStatus;
  currentLocation?: string;
  estimatedArrival?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
