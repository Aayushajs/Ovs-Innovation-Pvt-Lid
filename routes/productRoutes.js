import express from 'express';
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import vendorAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect product routes with vendorAuth middleware
router.post('/add', vendorAuth, addProduct); // Add product
router.get('/getAll', vendorAuth, getProducts); // Get products
router.put('/updateProduct/:id', vendorAuth, updateProduct); // Update product
router.delete('/deleteProduct/:id', vendorAuth, deleteProduct); // Delete product

export default router;
