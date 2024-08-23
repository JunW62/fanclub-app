const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Controller for user sign-up
exports.signup = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body to see the incoming data

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for user login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login Request Body:", req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "6h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: { id: user.id, email: user.email, name: user.name },
        });
      }
    );
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: "Server error" });
  }
};
