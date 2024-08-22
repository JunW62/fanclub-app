const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String },
});

const sizeSchema = new mongoose.Schema({
  width: {
    type: String,
    set: (value) => `${value} mm`,
  },
  height: {
    type: String,
    set: (value) => `${value} mm`,
  },
  depth: {
    type: String,
    set: (value) => `${value} mm`,
  },
  diameter: {
    type: String,
    set: (value) => `${value} mm`,
  },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  imgUrls: [imageSchema],
  size: sizeSchema,
  material: { type: String },
  releaseDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
