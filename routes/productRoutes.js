/* This code snippet is setting up routes for a product-related API using Express in a Node.js
application. Here's a breakdown of what each part is doing: */
import express from 'express';
import {
  addProduct,// function to add product
  getProducts, // function to get products
  updateProduct,// function to update product
  deleteProduct, // function to delete product
} from '../controllers/productController.js'; // Importing product controller functions
import vendorAuth from '../middlewares/authMiddleware.js'; // Importing vendorAuth middleware

const router = express.Router();// Create a new router instance

// Protect product routes with vendorAuth middleware
router.post('/add', vendorAuth, addProduct); // Add product
router.get('/getAll', vendorAuth, getProducts); // Get products
router.put('/updateProduct/:id', vendorAuth, updateProduct); // Update product
router.delete('/deleteProduct/:id', vendorAuth, deleteProduct); // Delete product

export default router; // Export the router to be used in other parts of the application
