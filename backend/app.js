const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config")
const usersRouter = require("./controllers/users")
const eventsRouter = require("./controllers/events");
const { loginRouter } = require("./controllers/login");
const logoutRouter = require("./controllers/logout");

const middleware = require("./utils/middlewares");

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
app.use(middleware.requestLogger);

app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/login", loginRouter);

//! logout functionality is not completed, as of now.
app.use("/api/logout", logoutRouter);

module.exports = app;
