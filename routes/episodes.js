const express = require("express");
const router = express.Router();

const { getEpisode, createEpisode } = require("../controllers/episodes");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const episode = await getEpisode(id);
    return res.status(200).json(episode);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { title, tvShowId, season, length, date, directorId } = req.body;
  try {
    await createEpisode(title, tvShowId, season, length, date, directorId);
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
