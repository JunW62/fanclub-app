const Order = require("../models/order");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      user,
      items,
      totalPrice,
      shippingAddress,
      paymentMethod,
      paymentStatus,
    } = req.body;

    // Calculate total price from items if needed
    // const totalPrice = items.reduce((acc, item) => acc + item.total, 0);

    const newOrder = new Order({
      user,
      items,
      totalPrice,
      shippingAddress,
      paymentMethod,
      paymentStatus,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all orders for a user
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).populate("items.product");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
