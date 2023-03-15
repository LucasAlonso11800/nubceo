const {
  validateString,
  validateNumber,
  validateTime,
} = require("../helpers/validateParams");
const Director = require("../models/Director");
const Episode = require("../models/Episode");
const TVShow = require("../models/TVShow");

async function getEpisode(id) {
  try {
    const episode = await Episode.findById(id);
    if (!episode) throw new Error("Episode not found");
    const director = await Director.findById(episode.directorId);
    return { ...episode.toObject(), director };
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

async function createEpisode(
  title,
  tvShowId,
  season,
  length,
  date,
  directorId
) {
  try {
    // Validations
    if (!validateString(title, true, 2, 40))
      throw new Error("Invalid value for title");

    const show = await TVShow.findById(tvShowId);
    if (!show) throw new Error("Show not found");

    if (!validateNumber(season, true, 0, 255))
      throw new Error("Invalid value for season");
    if (!validateTime(length)) throw new Error("Invalid value for length");
    if (!validateString(date)) throw new Error("Date is required");

    const director = await Director.findById(directorId);
    if (!director) throw new Error("Director not found");

    // Add episode to db
    const newEpisode = { title, tvShowId, season, length, date, directorId };
    await Episode.insertMany([newEpisode]);
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

module.exports = {
  getEpisode,
  createEpisode,
};