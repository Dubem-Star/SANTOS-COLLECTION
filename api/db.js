require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongoose connected succefully");
  } catch (e) {
    console.error("Error connecting mongoose:", e);

    throw new Error("Unable to connect to the database");
  }
}

module.exports = connectDB;
