const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();

usersRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("myCreatedEvents").populate("eventsRegisteredTo");
    res.json(users);
})

usersRouter.post("/", async (req, res) => {
    const { name, username, password } = req.body;

    const salt = 10;
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        username,
        passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser);
})


module.exports = usersRouter