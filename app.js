const express = require("express");
require("dotenv").config();
require("express-async-errors");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/users");
const scoresRouter = require("./controllers/scores");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/users", usersRouter);
app.use("/scores", scoresRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
