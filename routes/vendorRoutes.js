import express from "express"; // Import the Express library to create a router
import {
  registerVendor,
  loginVendor,
  verifyVendorOTP,
} from "../controllers/vendorController.js"; // Import the vendor controller functions

const router = express.Router(); // Create a new router instance

// Define a POST route for vendor registration, which uses the registerVendor function
router.post("/register", registerVendor);

// Define a POST route for vendor login, which uses the loginVendor function
router.post("/login", loginVendor);

// Define a POST route for OTP verification, which uses the verifyVendorOTP function
router.post("/verify", verifyVendorOTP); // New route for OTP verification

export default router; // Export the router to be used in other parts of the application

/*The code sets up an Express router to handle vendor operations like registration, login, and OTP verification.
 It imports functions from vendorController.js to manage these tasks. 
 Each route (/register, /login, /verify) is linked to a specific function (registerVendor, loginVendor, verifyVendorOTP) that processes the request.
 The router is then exported for use in the application.*/
