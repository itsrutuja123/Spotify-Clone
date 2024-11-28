const mongoose = require("mongoose");  // Import mongoose
const { Schema } = mongoose;  // Use Schema from the imported mongoose

const OrdersSchema = new Schema({
  name: String,
  avg: Number,
  price: Number,
  mode: String, // Mode will be buy or sell
  holdingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Holding", 
    required: true 
  },
});

module.exports = { OrdersSchema };
