require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute"); // Only use this one import
const { signup } = require("./Controllers/AuthController");
const { HoldingModel } = require("./model/HoldingModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel"); // Import the User model

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3000"], // Allow requests from frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/auth", authRoute); // Authentication routes

// Sample data endpoints
app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();
  res.send("Order saved!");
});

// DELETE route for selling (removing) the stock using uid
app.delete("/sell-stock/uid", async (req, res) => {
  const { uid } = req.params; // Stock UID from the URL parameter

  try {
    // Step 1: Remove the stock from the HoldingModel using the UID
    const holdingResult = await HoldingModel.findOneAndDelete({ uid });
    if (!holdingResult) {
      return res.status(404).json({ message: 'Stock not found in holdings!' });
    }

    // Step 2: Remove all related positions (if any) from PositionsModel using the UID
    await PositionsModel.deleteMany({ holdingId: uid });
    console.log('Related positions removed from PositionsModel.');

    // Step 3: Optionally remove all related orders (if any) from OrdersModel using the UID
    await OrdersModel.deleteMany({ holdingId: uid });
    console.log('Related orders removed from OrdersModel.');

    // Return success message
    res.status(200).json({ message: 'Stock sold and removed from all relevant collections!' });
  } catch (error) {
    console.error('Error selling stock:', error);
    res.status(500).json({ message: 'Error selling stock. Please try again later.', error: error.message });
  }
});

// Server Listener
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
