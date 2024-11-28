const mongoose = require("mongoose");

// Define the schema
const HoldingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  avg: { type: Number, required: true },
  price: { type: Number, required: true },
  net: { type: String, required: true },
  day: { type: String, required: true },
  isLoss: { type: Boolean, default: false },
  // Optional: Adding reference to positions and orders
  positions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Position" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = { HoldingSchema };
