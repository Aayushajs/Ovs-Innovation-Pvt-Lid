/**
 * The above functions handle vendor registration, login, and OTP verification using bcrypt for
 * password hashing and jwt for token generation.
 * @param req - `req` is the request object that represents the HTTP request made by the client to the
 * server. It contains information such as the request headers, body, parameters, and other details
 * sent by the client.
 * @param res - The `res` parameter in the functions `registerVendor`, `loginVendor`, and
 * `verifyVendorOTP` stands for the response object in Express.js. It is used to send responses back to
 * the client making the HTTP request. The responses can include status codes, JSON data, cookies, and
 * more
 * @returns The code snippet provided contains three functions: `registerVendor`, `loginVendor`, and
 * `verifyVendorOTP`, which are responsible for vendor registration, vendor login, and vendor OTP
 * verification, respectively.
 */
import Vendor from '../models/Vendor.js'; // Import the Vendor model to interact with the database
import bcrypt from 'bcryptjs'; // Import bcrypt for hashing passwords securely
import jwt from 'jsonwebtoken'; // Import jwt for creating JSON Web Tokens

// Vendor registration function
export const registerVendor = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Extract name, email, and password from the request body

    // Check if a vendor with the given email already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      // If vendor exists, send a 400 response with a message
      return res.status(400).json({ message: 'Vendor already exists.' });
    }

    // Generate a salt and hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new vendor instance with the provided details
    const newVendor = new Vendor({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new vendor to the database
    await newVendor.save();

    // Send a success response indicating the vendor was registered
    res.status(201).json({ message: 'Vendor registered successfully.' });

    // Generate a 6-digit OTP for verification
    const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
    const otp = generateOTP();

    // Assign the generated OTP to the vendor and save it
    newVendor.otp = otp;
    await newVendor.save();

    // Log the OTP to the console (for debugging or testing purposes)
    console.log(otp);
  } catch (error) {
    // If an error occurs, send a 500 response with an error message
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Vendor login function
export const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from the request body

    // Check if the vendor exists in the database
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      // If vendor does not exist, send a 404 response
      return res.status(404).json({ message: 'Vendor not found.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      // If passwords do not match, send a 401 response
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Generate a JWT token for the vendor
    const token = jwt.sign({ _id: vendor._id }, process.env.JWT_SECRET, { expiresIn: '7 days' });

    // Set the token in a cookie with security options
    res.cookie('token', token, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time (7 days)
      sameSite: 'Strict', // Protects against CSRF attacks
    });

    // Send a success response indicating login was successful
    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    // If an error occurs, send a 500 response with an error message
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Vendor OTP verification function
export const verifyVendorOTP = async (req, res) => {
  try {
    const { email, otp } = req.body; // Extract email and OTP from the request body

    // Check if the vendor exists in the database
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      // If vendor does not exist, send a 404 response
      return res.status(404).json({ message: 'Vendor not found.' });
    }

    // Check if the provided OTP matches the stored OTP
    if (vendor.otp !== otp) {
      // If OTPs do not match, send a 400 response
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // Set the vendor's OTP to null after successful verification
    vendor.otp = null;

    // Mark the vendor as verified
    vendor.isVerified = true;
    await vendor.save();

    // Send a success response indicating verification was successful
    res.status(200).json({ message: 'Vendor verified successfully.' });
  } catch (error) {
    // If an error occurs, send a 500 response with an error message
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

