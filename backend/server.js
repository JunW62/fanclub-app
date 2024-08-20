const express = require("express");
const connectDB = require("./db/conn");

const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
// app.use("/api", require("./routes/userRoutes.js"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
