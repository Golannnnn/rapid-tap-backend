const scoresRouter = require("express").Router();

scoresRouter.post("/add/:id", async (request, response) => {
  const { id } = request.params;
  const { score } = request.body;

  //TODO: check if user exists
  //TODO: add score to user
  //TODO: return
});

scoresRouter.get("/history/:id", async (request, response) => {
  const { id } = request.params;

  //TODO: check if user exists
  //TODO: get score from user
  //TODO: return score
});

scoresRouter.get("/last/:id", async (request, response) => {
  const { id } = request.params;

  //TODO: check if user exists
  //TODO: get last score from user
  //TODO: return score
});

scoresRouter.get("/all", async (request, response) => {
  //TODO: get all scores from database
  //TODO: return scores
});

module.exports = scoresRouter;
