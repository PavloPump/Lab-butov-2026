export interface CreateOrderDto {
  clientId: string;
  pickupAddress: string;
  deliveryAddress: string;
  cargoDescription: string;
  cargoWeight: number;
  cargoDimensions: string;
  estimatedDeliveryTime?: Date;
}

export interface UpdateOrderDto {
  driverId?: string;
  status?: string;
  pickupAddress?: string;
  deliveryAddress?: string;
  cargoDescription?: string;
  cargoWeight?: number;
  cargoDimensions?: string;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
}
