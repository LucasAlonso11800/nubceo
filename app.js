const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const episodesRoute = require("./routes/episodes");
const moviesRoute = require("./routes/movies");
const authRoute = require("./routes/auth");
const checkAuth = require("./helpers/checkAuth");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

// DB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongo"))
  .catch((err) => console.log("Error connecting to mongo"));

// Ping endpoint
app.get("/ping", (req, res) => res.send("Pong"));

// Auth routes
app.use("/auth", authRoute);

// Check JWT middleware
app.use((req, res, next) => {
  const authorized = checkAuth(req.headers.authorization);
  if (!authorized) return res.status(401).json({ message: "Unauthorized" });
  next()
});

// Protected routes
app.use("/episode", episodesRoute);
app.use("/movie", moviesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
