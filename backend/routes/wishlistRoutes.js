const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  toggleWishlistItem,
} = require("../controllers/wishlistController");

// Get the wishlist for the logged-in user
router.get("/", auth, getWishlist);

// Add an item to the wishlist
router.post("/add", auth, addToWishlist);

// Remove an item from the wishlist
router.delete("/remove/:productId", auth, removeFromWishlist);

// Toggle an item in the wishlist (add if not present, remove if present)
router.post("/toggle", auth, toggleWishlistItem);

module.exports = router;
