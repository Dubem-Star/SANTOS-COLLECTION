const mongoose = require("mongoose");
// const uuid = require("uuid");

const productSchema = new mongoose.Schema({
  id: { Type: String },
  name: { Type: String },
  category: { Type: String },
  price: { Type: Number },
  stock: { Type: String },
  sizes: [{ Type: String }],
  desc: { Type: String },
  color: [{ Type: String }],
  img: [{ Type: String }],
  backView: { Type: String },
  tag: { Type: String },
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
