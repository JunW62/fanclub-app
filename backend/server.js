const express = require("express");
const connectDB = require("./db/conn");
const userRoutes = require("./routes/userRoutes.js");
const cors = require("cors");

const app = express();

// Connect to the database
connectDB();
// .then(async () => {
//   console.log("MongoDB connected successfully");

//   // Test by creating a new user
//   const newUser = new User({
//     name: "Test User",
//     email: "testuser@example.com",
//     password: "testpassword",
//   });

//   try {
//     const savedUser = await newUser.save();
//     console.log("New user created:", savedUser);
//   } catch (error) {
//     console.error("Error creating user:", error.message);
//   }
// })
// .catch((err) => {
//   console.error("Error connecting to MongoDB:", err.message);
// });

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from frontend
  })
);

//Routes;
app.use("/api/users", userRoutes);
app.use("/api", require("./routes/productRoutes.js"));

// app.get("/api/test", (req, res) => {
//   res.send("Proxy is working!");
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
