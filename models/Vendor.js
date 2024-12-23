/* This code snippet is defining a Mongoose schema for a vendor in a Node.js application. Here's a
breakdown of what each part is doing: */
import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String, // Store the OTP
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false, // Defaults to not verified
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vendor = mongoose.model('Vendor', vendorSchema);
export default Vendor;
