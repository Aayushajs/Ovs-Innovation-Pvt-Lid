/* This code snippet is setting up a router using Express in a Node.js application. It imports
necessary functions and middleware from other files, such as `getOrders` and `markOrderAsShipped`
from the `orderController.js` file, and `authMiddleware` from the `authMiddleware.js` file. */
import express from 'express'; // Import the Express library to create a router
import { getOrders, markOrderAsShipped } from '../controllers/orderController.js'; // Import the order controller functions
import authMiddleware from '../middlewares/authMiddleware.js'; // Import the authMiddleware

const router = express.Router(); // Create a new router instance

router.get('/Orders', authMiddleware, getOrders); // Get all orders
router.put('/Orders/:id', authMiddleware, markOrderAsShipped); // Mark order as shipped

export default router; // Export the router as the default export
