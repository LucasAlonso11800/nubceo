const express = require("express");
const { getMovies } = require("../controllers/movies");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { actors, director, genre, year, title, sort, asc } = req.query;
    const movies = await getMovies(
        actors,
        director,
        genre,
        year,
        title,
        sort,
        asc
    );
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
