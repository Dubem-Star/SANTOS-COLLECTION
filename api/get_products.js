const { Product } = require("../models");
const setCors = require("./cors");
const connectDB = require("./db");

module.exports = async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  await connectDB();

  console.log(req.body.message);
  res.json({ response: true });
};
