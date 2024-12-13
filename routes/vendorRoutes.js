import express from 'express';
import { registerVendor, loginVendor,verifyVendorOTP } from '../controllers/vendorController.js';

const router = express.Router();

router.post('/register', registerVendor);
router.post('/login', loginVendor);
router.post('/verify', verifyVendorOTP); // New route for OTP verification

export default router;
