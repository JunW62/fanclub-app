const Wishlist = require("../models/wishlist");
const Product = require("../models/products");
const mongoose = require("mongoose");

// Get the wishlist for the logged-in user
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.json(wishlist.items);
  } catch (err) {
    console.error("Error fetching wishlist:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Add an item to the wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Ensure the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, items: [] });
    }

    // Check if the product is already in the wishlist
    const itemIndex = wishlist.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex === -1) {
      wishlist.items.push({ product: productId });
    } else {
      return res.status(200).json({ message: "Product already in wishlist" });
    }

    await wishlist.save();
    res.status(201).json({ message: "Product added to wishlist", wishlist });
  } catch (err) {
    console.error("Error adding to wishlist:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove an item from the wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate the product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Find the index of the product in the wishlist
    const itemIndex = wishlist.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    // Remove the product from the wishlist's items array
    wishlist.items.splice(itemIndex, 1);

    // Save the updated wishlist
    await wishlist.save();

    res.json({ message: "Product removed from wishlist", wishlist });
  } catch (err) {
    console.error("Error removing product from wishlist:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
