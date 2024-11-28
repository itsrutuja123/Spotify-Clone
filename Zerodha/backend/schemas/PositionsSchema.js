const mongoose = require("mongoose");

const PositionsSchema = new mongoose.Schema({
  holdingId: { type: mongoose.Schema.Types.ObjectId, ref: "Holding", required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  avg: { type: Number, required: true },
});

module.exports = { PositionsSchema };
