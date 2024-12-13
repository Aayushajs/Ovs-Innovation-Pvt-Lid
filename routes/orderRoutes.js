import express from 'express';
import { getOrders, markOrderAsShipped } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/Orders', authMiddleware, getOrders);
router.put('/Orders/:id', authMiddleware, markOrderAsShipped);

export default router;
