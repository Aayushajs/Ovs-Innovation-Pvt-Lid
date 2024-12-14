/**
 * The `vendorAuth` middleware function is used for vendor authentication by verifying a JWT token and
 * attaching the vendor object to the request for use in route handlers.
 * @param req - The `req` parameter in the `vendorAuth` middleware function stands for the request
 * object. It contains information about the HTTP request that is being made, such as the headers,
 * body, parameters, and cookies.
 * @param res - The `res` parameter in the `vendorAuth` middleware function stands for the response
 * object in Express.js. It is used to send responses back to the client making the HTTP request. In
 * the context of the provided code snippet, `res` is used to send HTTP responses with status codes and
 * messages
 * @param next - The `next` parameter in the `vendorAuth` middleware function is a callback function
 * that is used to pass control to the next middleware function in the stack. When called, it tells
 * Express to move on to the next middleware function or route handler in the chain.
 * @returns The `vendorAuth` middleware function is being returned. This middleware function is
 * responsible for authenticating vendors based on a JWT token stored in a cookie. If the token is
 * valid and the corresponding vendor is found, the vendor object is attached to the request object for
 * use in route handlers, and the middleware proceeds to the next middleware or route handler. If there
 * are any errors during the authentication process, appropriate
 */
import jwt from 'jsonwebtoken'; // Import jsonwebtoken package
import Vendor from '../models/Vendor.js'; // Replace with your actual Vendor model

const vendorAuth = async (req, res, next) => { // Middleware function for vendor authentication
  try {
    // Extract token from cookies
    const token = req.cookies.token; // Assuming the cookie is named 'token'

    if (!token) { // If token is not found
      return res.status(401).json({ message: 'Authorization token required.' }); // Return error response
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using JWT_SECRET

    // Find the vendor based on the decoded _id
    const vendor = await Vendor.findById(decoded._id); // Replace with your actual Vendor model

    if (!vendor) { // If vendor is not found
      return res.status(401).json({ message: 'Vendor not found.' }); // Return error response
    }

    // Attach the vendor to the request object for use in route handlers
    req.vendor = vendor; // Attach the vendor object to the request

    // Proceed to the next middleware or route handler
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error('Error in vendorAuth middleware:', error);
    res.status(401).json({ message: 'Invalid token or vendor not found.' });
  }
};

export default vendorAuth; // Export the vendorAuth middleware
