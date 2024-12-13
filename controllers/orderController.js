import Order from '../models/Order.js';

// Get Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('product');
    const vendorOrders = orders.filter(
      (order) => order.product.vendor.toString() === req.vendor._id.toString()
    );

    res.json(vendorOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark Order as Shipped
export const markOrderAsShipped = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate('product');
    if (!order || order.product.vendor.toString() !== req.vendor._id.toString()) {
      return res.status(404).json({ message: 'Order not found or unauthorized.' });
    }

    order.status = 'shipped';
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
