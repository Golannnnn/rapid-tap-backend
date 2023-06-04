const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

//TODO: needs to be tested with frontend
const auth = async (request, response, next) => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return response.status(401).json({ error: "token missing" });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token" });
  }

  const isExistingUser = await User.findById(decodedToken.id);

  if (!isExistingUser) {
    return response.status(401).json({ error: "user not found" });
  }

  request.userId = decodedToken.id;

  next();
};

module.exports = auth;
