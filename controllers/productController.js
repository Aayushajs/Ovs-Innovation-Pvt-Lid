/**
 * The above JavaScript code defines functions for adding, getting, updating, and deleting products in
 * a database with error handling.
 * @param req - `req` is an object representing the HTTP request that comes from the client to the
 * server. It contains information such as the request headers, body, parameters, query strings, and
 * more. In the context of the provided code snippets, `req` is used to extract data from the request
 * body and URL parameters.`
 * @param res - The `res` parameter in the functions refers to the response object in Express.js. It is
 * used to send a response back to the client making the request. The response object (`res`) has
 * methods like `json()` to send JSON responses, `status()` to set the HTTP status code of the
 */
import Product from '../models/Product.js'; // Import the Product model to interact with the database
 
// Add Product
export const addProduct = async (req, res) => { // Add a new product
  try { // Try block to handle any errors that may occur
    const { name, price, stock } = req.body; // Extract name, price, and stock from the request body

    const product = new Product({ // Create a new product instance with the provided details
      name,
      price,
      stock,
      vendor: req.vendor._id, // Vendor is extracted from the token in middleware
    });

    await product.save(); // Save the product to the database
    res.status(201).json(product); // Send a success response with the saved product
  } catch (error) { // Catch any errors that occur during the process
    console.error("Error adding product:", error); // Log the error to the console
    res.status(500).json({ message: error.message }); // Send a 500 response with the error message
  }
};

// Get Products (Paginated)
export const getProducts = async (req, res) => { // Get all products for the logged-in vendor
  try {
    const { page = 1, limit = 10 } = req.query; // Extract page and limit query parameters

    const products = await Product.find({ vendor: req.vendor._id }) // Filter by vendor ID
      .skip((page - 1) * limit) // Skip records based on page number
      .limit(Number(limit)); // Limit the number of records per page

    res.json(products); // Send the products as a JSON response
  } catch (error) { // Catch any errors that occur during the process
    console.error("Error getting products:", error); // Log the error to the console
    res.status(500).json({ message: error.message }); // Send a 500 response with the error message
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the URL parameters
    const { name, price, stock } = req.body; // Extract name, price, and stock from the request body

    const product = await Product.findOneAndUpdate(
      { _id: id, vendor: req.vendor._id }, // Ensure that the product belongs to the logged-in vendor
      { name, price, stock }, // Update the product details
      { new: true } // Return the updated product
    );

    if (!product) { // If the product is not found
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(product); // Send the updated product as a JSON response
  } catch (error) {
    console.error("Error updating product:", error); // Log the error to the console
    res.status(500).json({ message: error.message }); // Send a 500 response with the error message
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the URL parameters

    const product = await Product.findOneAndDelete({ _id: id, vendor: req.vendor._id }); // Find and delete the product

    if (!product) { // If the product is not found
      return res.status(404).json({ message: 'Product not found.' }); // Send a 404 response
    }

    res.json({ message: 'Product deleted successfully.' }); // Send a success response
  } catch (error) { // Catch any errors that occur during the process
    console.error("Error deleting product:", error); // Log the error to the console
    res.status(500).json({ message: error.message }); // Send a 500 response with the error message
  }
};
