const jwt = require("jsonwebtoken");

function checkAuth(authHeader) {
  if (!authHeader) return false;
  const token = authHeader.split("Bearer ")[1];
  if (!token) return false;

  let response = true;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      console.log(err);
      response = false;
    }
  });
  return response;
}

module.exports = checkAuth;
