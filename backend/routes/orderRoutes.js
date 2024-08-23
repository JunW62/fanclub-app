const express = require("express");
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");
const router = express.Router();

// Create a new order (requires authentication)
router.post("/orders", auth, orderController.createOrder);

// Get all orders for a specific user (requires authentication) - need the order id
router.get("/orders/user/:userId", auth, orderController.getOrdersByUser);

// Get a specific order by ID (requires authentication)
router.get("/orders/:orderId", auth, orderController.getOrderById);

module.exports = router;
