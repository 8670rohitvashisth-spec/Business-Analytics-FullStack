const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
console.log("SERVER FILE LOADED");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const businessRoutes = require("./routes/businessRoutes");

dotenv.config();

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests. Please try again later."
});
app.use(helmet());
app.use(limiter);
app.use(cors({
  origin: "http://localhost:5173",
}));


app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Backend Running");
});
app.get("/token", (req, res) => {
  const token = jwt.sign(
    { user: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});
const PORT = process.env.PORT || 5000;
app.use("/api/businesses", businessRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});