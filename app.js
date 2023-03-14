const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

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
.catch(() => console.log('Error connecting to mongo'));

app.get("/movie", (req, res) => {

});

app.get("/episode/:id", (req, res) => {
  const { id } = req.params;
});

app.post("/episode", (req, res) => {
  const { name } = req.body;
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
