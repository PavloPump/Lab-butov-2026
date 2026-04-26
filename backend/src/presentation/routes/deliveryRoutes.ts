import { Router } from 'express';
import { DeliveryService } from '../../application/services/DeliveryService';
import { DeliveryRepository } from '../../infrastructure/repositories/DeliveryRepository';

const router = Router();
const deliveryService = new DeliveryService(new DeliveryRepository());

router.get('/', async (req, res) => {
  try {
    const deliveries = await deliveryService.getAllDeliveries();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const delivery = await deliveryService.getDeliveryById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
