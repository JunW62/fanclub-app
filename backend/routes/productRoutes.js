const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// Create a new product
router.post("/products", productController.createProduct);

// Bulk upload products
router.post("/upload-products", productController.uploadProducts);

// Get all products
router.get("/products", productController.getProducts);

// Get a product by ID
router.get("/products/:id", productController.getProductById);

// Update a product by ID
router.put("/products/:id", productController.updateProduct);

// Delete a product by ID
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
