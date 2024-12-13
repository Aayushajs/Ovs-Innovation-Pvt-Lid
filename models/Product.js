import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index to optimize search by vendor and name
productSchema.index({ vendor: 1, name: 1 });

const Product = mongoose.model('Product', productSchema);
export default Product;
