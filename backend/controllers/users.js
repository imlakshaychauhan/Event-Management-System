const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  // .populate("myCreatedEvents")
  // .populate("eventsRegisteredTo");
  res.json(users);
});

usersRouter.post("/register", async (req, res) => {
  const { name, username, password } = req.body;

  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  await user.save();

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.status(201).json({
    name: user.name,
    username: user.username,
    token,
  });
});

usersRouter.get("/:username", async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username })
    .populate("myCreatedEvents")
    .populate("eventsRegisteredTo");

  if (!user) {
    return res.status(401).json({
      error: "user not found!",
    });
  }

  res.status(200).json(user);
});

module.exports = usersRouter;