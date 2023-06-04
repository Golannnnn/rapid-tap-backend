const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("../utils/cloudinary");
require("dotenv").config();

usersRouter.post("/signup", async (request, response) => {
  const { email, nickname, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    nickname,
    password: passwordHash,
  });

  const savedUser = await user.save();

  const payload = {
    id: savedUser.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });

  response.status(201).json({ token: token, user: savedUser });
});

usersRouter.post("/login", async (request, response) => {
  const { name, password } = request.body;

  const existingUser = await User.findOne({
    $or: [{ email: name }, { nickname: name }],
  });

  if (!existingUser) {
    return response.status(401).json({ error: "invalid credentials" });
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return response.status(401).json({ error: "invalid credentials" });
  }

  const payload = {
    id: existingUser.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });

  response.status(200).json({ token: token, user: existingUser });
});

//TODO: add auth middleware to protect route
// make sure to send object in form data with key "picture" and key "nickname"
usersRouter.put(
  "/update/:id",
  upload.single("picture"),
  async (request, response) => {
    const { id } = request.params;
    const { nickname } = request.body;
    const { path } = request.file;

    const user = await User.findById(id);

    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }

    if (path) {
      user.picture = path;
    }

    user.nickname = nickname;
    await user.save();

    response.status(200).json({ message: "user updated" });
  }
);

module.exports = usersRouter;
