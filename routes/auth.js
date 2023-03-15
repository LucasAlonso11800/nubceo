const express = require("express");
const jwt = require("jsonwebtoken");
const { validateString } = require("../helpers/validateParams");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username } = req.body;
  //Create access token
  const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 60 * 15,
  });
  // Create refresh token with longer expiration
  const refreshToken = jwt.sign(
    { username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: 60 * 60 * 24 }
  );

  return res.json({ accessToken, refreshToken });
});

router.post("/refresh", (req, res) => {
  const { refreshToken, username } = req.body;
  const validParam = validateString(refreshToken);
  if (!validParam) res.send(400).json({ message: "Token required" });

  // Verifying refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    // Wrong Refresh Token
    if (err) return res.status(401).json({ message: "Unauthorized" });

    // Correct token we send a new access token
    const accessToken = jwt.sign(
      { username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 60 * 15 }
    );
    return res.json({ accessToken });
  });
});

module.exports = router;
