const express = require("express");
const { signup, login } = require("../controllers/userController");
const auth = require("../middleware/auth");
const User = require("../models/user");

const router = express.Router();

// POST /api/users/signup
router.post("/signup", signup);

// POST /api/users/login
router.post("/login", login);

// GET /api/users/profile (Protected route-Private)
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error in /profile route:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
