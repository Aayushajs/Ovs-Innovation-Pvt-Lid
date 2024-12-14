/* This code snippet is defining a Mongoose schema for a Product model in a MongoDB database. Here's a
breakdown of what each part of the code is doing: */
import mongoose from 'mongoose'; // Importing Mongoose for MongoDB interaction

const productSchema = new mongoose.Schema({ // Defining the schema for the Product model
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId, // Referencing the Vendor model
    ref: 'Vendor',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
});

// Index to optimize search by vendor and name
productSchema.index({ vendor: 1, name: 1 }); // Creating an index on the vendor and name fields

const Product = mongoose.model('Product', productSchema); // Creating the Product model
export default Product; // Exporting the Product model for use in other parts of the application
