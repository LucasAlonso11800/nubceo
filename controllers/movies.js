const { default: mongoose } = require("mongoose");
const { Movie } = require("../models");

async function getMovies(
  actors,
  director,
  genre,
  year,
  title,
  sort,
  asc = false
) {
  try {
    const options = {};
    const sortOptions = {};

    if (director) {
      options.director = director;
    }
    if (genre) {
      options.genre = genre;
    }
    if (year) {
      options.year = year;
    }
    if (title) {
      options.title = { $regex: ".*" + title + "*." };
    }
    if (actors) {
      const actorsArray = actors.split(";");
      options.actors = {
        $in: actorsArray.map((a) => new mongoose.Types.ObjectId(a)),
      };
    }
    if (sort) {
      sortOptions[sort] = asc === "Y" ? 1 : -1;
    }
    const movies = await Movie.find(options)
      .sort(sortOptions)
      .populate("director")
      .populate("actors");

    return movies;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

module.exports = {
  getMovies,
};
