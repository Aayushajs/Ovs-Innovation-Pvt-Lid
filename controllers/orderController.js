/**
 * The above functions handle retrieving orders for a specific vendor and marking an order as shipped
 * in a Node.js application using Express and Mongoose.
 * @param req - The `req` parameter in the code snippets you provided stands for the request object in
 * Express.js. It contains information about the HTTP request that triggered the function, such as
 * request parameters, headers, body, and user authentication details. In this context, `req` is used
 * to access data sent from
 * @param res - The `res` parameter in the code snippets you provided stands for the response object in
 * Express.js. It is used to send a response back to the client making the HTTP request. The response
 * object (`res`) has methods like `json()` to send JSON responses, `status()` to set the HTTP
 */
import Order from "../models/Order.js"; // import the Order model

// Get Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("product"); // find all orders and populate the product field
    const vendorOrders = orders.filter(
      // filter the orders to only include those from the current vendor
      (order) => order.product.vendor.toString() === req.vendor._id.toString() // compare the vendor ID from the order to the current vendor ID
    );

    res.json(vendorOrders); // send the filtered orders as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // handle any errors
  }
};

// Mark Order as Shipped
export const markOrderAsShipped = async (req, res) => {
  try {
    const { id } = req.params; // get the order ID from the request parameters

    const order = await Order.findById(id).populate("product"); // find the order by ID and populate the product field
    if (
      !order ||
      order.product.vendor.toString() !== req.vendor._id.toString()
    ) {
      // check if the order exists or if the vendor is authorized to update the order
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized." }); // send an error response if the order is not found or the vendor is unauthorized
    }

    order.status = "shipped";
    await order.save(); // update the order status to 'shipped'

    res.json(order); //   send the updated order as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // handle any errors
  }
};
