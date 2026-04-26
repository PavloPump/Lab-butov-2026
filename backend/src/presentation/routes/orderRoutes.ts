import { Router } from 'express';
import { OrderService } from '../../application/services/OrderService';
import { OrderRepository } from '../../infrastructure/repositories/OrderRepository';

const router = Router();
const orderService = new OrderService(new OrderRepository());

router.get('/', async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
