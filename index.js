import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import vendorRoutes from './routes/vendorRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
 
dotenv.config();
const app = express();

// cross origin resource sharing
app.use(cors(
  {
    origin: '*', // allow all origins
    methods: 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  }
));
// Cookie parser
app.use(cookieParser());

// Middleware
app.use(express.json());

// Routes
app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGO_URI;

mongoose
  .connect(DB_URI,)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err));
