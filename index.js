import express from "express"; // Importing Express framework
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interaction
import dotenv from "dotenv"; // Importing dotenv for environment variable management
import vendorRoutes from "./routes/vendorRoutes.js"; // Importing vendor routes
import productRoutes from "./routes/productRoutes.js"; // Importing product routes
import orderRoutes from "./routes/orderRoutes.js"; // Importing order routes
import cors from "cors"; // Importing CORS for handling cross-origin requests
import cookieParser from "cookie-parser"; // Importing cookie-parser for parsing cookies

dotenv.config(); // Loading environment variables from .env file
const app = express(); // Creating an Express application

// Cross-Origin Resource Sharing (CORS) configuration
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,POST,PATCH,DELETE,PUT,OPTIONS", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for parsing JSON bodies
app.use(express.json());

// Setting up routes
app.use("/api/vendors", vendorRoutes); // Vendor routes
app.use("/api/products", productRoutes); // Product routes
app.use("/api/orders", orderRoutes); // Order routes

const PORT = process.env.PORT || 5000; // Setting the port from environment or default to 5000
const DB_URI = process.env.MONGO_URI; // MongoDB URI from environment variables

// Connecting to MongoDB
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB"); // Log successful connection
    // Start the server
    app.listen(PORT, () =>
      console.log(`Server running on port http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log(err)); // Log any connection errors

//This code initializes an Express server with routes for vendors, products, and orders. It connects to a MongoDB database using Mongoose, utilizes dotenv for environment variables, and integrates middleware for CORS, cookie parsing, and JSON body parsing.
