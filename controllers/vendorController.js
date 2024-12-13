import Vendor from '../models/Vendor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Vendor registration
export const registerVendor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new vendor
    const newVendor = new Vendor({
      name,
      email,
      password: hashedPassword,
    });

    await newVendor.save();

    res.status(201).json({ message: 'Vendor registered successfully.' });
    // Generate OTP
    const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
    const otp = generateOTP();
    //expayer OTP
    newVendor.otp = otp;
    await newVendor.save();
    console.log(otp);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Vendor login
// Vendor login
export const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if vendor exists
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: vendor._id }, process.env.JWT_SECRET, { expiresIn: '7 days' });

    // Set the token in a cookie
    res.cookie('token', token, {
      httpOnly: true,  // Ensures the cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production (HTTPS)
      maxAge: 7 * 24 * 60 * 60 * 1000,  // Set the expiration time (7 days)
      sameSite: 'Strict',  // Prevents cross-site request forgery (CSRF)
    });

    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
// Vendor OTP verification
export const verifyVendorOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if vendor exists
    const vendor = await Vendor.findOne ({ email });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found.' });
    }
    // Check if OTP is valid
    if (vendor.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }
    // Update vendor OTP to null
    vendor.otp = null;

    // Update vendor verification status
    vendor.isVerified = true;
    await vendor.save();
    res.status(200).json({ message: 'Vendor verified successfully.' });
  }
  catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
