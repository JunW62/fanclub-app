const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

// Get the wishlist for the logged-in user
router.get("/", auth, getWishlist);

// Add an item to the wishlist
router.post("/", auth, addToWishlist);

// Remove an item from the wishlist
router.delete("/:id", auth, removeFromWishlist);

module.exports = router;
