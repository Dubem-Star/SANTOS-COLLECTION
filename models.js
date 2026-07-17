const mongoose = require("mongoose");
// const uuid = require("uuid");

const productSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  category: { type: String },
  price: { type: Number },
  stock: { type: String },
  sizes: [{ type: String }],
  desc: { type: String },
  color: [{ type: String }],
  img: [{ type: String }],
  backView: { type: String },
  tag: { type: String },
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
