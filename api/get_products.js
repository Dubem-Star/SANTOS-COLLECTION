const { Product } = require("../models");
const setCors = require("./cors");
const connectDB = require("./db");

module.exports = async (req, res) => {
  setCors(res);
  await connectDB();

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  console.log(req.body.message);
  res.json({ response: true });
};
