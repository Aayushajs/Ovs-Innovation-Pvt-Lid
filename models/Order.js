/* This code snippet is defining a Mongoose schema for an order in a MongoDB database. Here's a
breakdown of what each part is doing: */
import mongoose from 'mongoose';// import mongoose

const orderSchema = new mongoose.Schema({
  product: { // define the product field
    type: mongoose.Schema.Types.ObjectId,// set the type to ObjectId
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'shipped'], // set the status field to only accept 'pending' or 'shipped'
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema); // create the Order model
export default Order;
