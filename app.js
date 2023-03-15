const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

const episodesRoute = require('./routes/episodes');

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to mongo'))
.catch((err) => console.log('Error connecting to mongo'));

app.get("/ping", (req, res) => {
  return res.send("Pong")
});

app.get("/movie", (req, res) => {

});

// Routes
app.use('/episode', episodesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
