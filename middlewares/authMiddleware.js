import jwt from 'jsonwebtoken';
import Vendor from '../models/Vendor.js'; // Replace with your actual Vendor model

const vendorAuth = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token; // Assuming the cookie is named 'token'

    if (!token) {
      return res.status(401).json({ message: 'Authorization token required.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the vendor based on the decoded _id
    const vendor = await Vendor.findById(decoded._id);

    if (!vendor) {
      return res.status(401).json({ message: 'Vendor not found.' });
    }

    // Attach the vendor to the request object for use in route handlers
    req.vendor = vendor;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error in vendorAuth middleware:', error);
    res.status(401).json({ message: 'Invalid token or vendor not found.' });
  }
};

export default vendorAuth;
