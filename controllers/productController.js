import Product from '../models/Product.js';
 
// Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const product = new Product({
      name,
      price,
      stock,
      vendor: req.vendor._id, // Vendor is extracted from the token in middleware
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get Products (Paginated)
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const products = await Product.find({ vendor: req.vendor._id }) // Filter by vendor ID
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id, vendor: req.vendor._id }, // Ensure that the product belongs to the logged-in vendor
      { name, price, stock },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOneAndDelete({ _id: id, vendor: req.vendor._id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: error.message });
  }
};
