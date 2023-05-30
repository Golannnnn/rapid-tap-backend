const scoresRouter = require("express").Router();
const Score = require("../models/score");
const User = require("../models/user");

scoresRouter.post("/add/:id", async (request, response) => {
  const { id } = request.params;
  const { score } = request.body;

  const isExistingUser = await User.findById(id);

  if (!isExistingUser) {
    return response.status(404).json({ error: "User not found" });
  }

  const newScore = new Score({
    score,
    user: id,
  });

  const savedScore = await newScore.save();

  response.status(201).json(savedScore);
});

scoresRouter.get("/history/:id", async (request, response) => {
  const { id } = request.params;

  const scores = await Score.find({ user: id }); // if user not found, returns empty array

  response.status(200).json(scores);
});

scoresRouter.get("/last/:id", async (request, response) => {
  const { id } = request.params;

  const lastScore = await Score.find({ user: id })
    .sort({ createdAt: -1 })
    .limit(1); // if user not found, returns empty array

  response.status(200).json(lastScore);
});

scoresRouter.get("/best/:id", async (request, response) => {
  const { id } = request.params;

  const bestScore = await Score.find({ user: id }).sort({ score: -1 }).limit(1); // if user not found, returns empty array

  response.status(200).json(bestScore);
});

scoresRouter.get("/all", async (request, response) => {
  const scores = await Score.find({});

  response.status(200).json(scores);
});

module.exports = scoresRouter;
