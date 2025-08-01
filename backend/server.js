import express from "express";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authentication_route.js";
import productRoutes from "./routes/prodRoute.js";
import cors from "cors";
dotenv.config();

const app = express();

connectDB();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes); 
app.use("/api/products", productRoutes);

app.get("/dbcheck", async (req, res) => {
  const state = mongoose.connection.readyState;
  if (state === 1) {
    res.status(200).json({ connected: true, message: "Database is connected" });
  } else {
    res
      .status(500)
      .json({ connected: false, message: "Database is not connected" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is ready shh");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
