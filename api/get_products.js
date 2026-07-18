const { Product } = require("../models");
const setCors = require("./cors");
const connectDB = require("./db");

module.exports = async (req, res) => {
  try {
    setCors(res);

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    await connectDB();

    console.log(req.body.message);
    const products = await Product.find({});
    res.status(200).json({ status: true, data: products });
  } catch (e) {
    console.log("Error: ", e);
    res.status(400).json({ status: false, data: e });
  }
};
