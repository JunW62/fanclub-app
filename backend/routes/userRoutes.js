const express = require("express");
const { signup, login } = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

// POST /api/users/signup
router.post("/signup", signup);

// POST /api/users/login
router.post("/login", login);

// GET /api/users/profile (Protected route)
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
