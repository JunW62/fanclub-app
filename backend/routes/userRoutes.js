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
    res.json({
      id: user._id,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
