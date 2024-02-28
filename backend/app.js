const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config")
const usersRouter = require("./controllers/users")
const eventsRouter = require("./controllers/events")

mongoose
  .connect(config.MONGODB_URI)
  .then((res) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);

module.exports = app;
