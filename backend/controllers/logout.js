const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const { getTokenFrom } = require("../utils/helpers");
const User = require("../models/user");

const logoutRouter = require("express").Router();

logoutRouter.post("/", async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req) , config.SECRET_KEY);
    console.log(decodedToken);
    const user = await User.findById(decodedToken.id);
    if(!user) {
        return res.status(401).json({
            error: "user not found!"
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, config.SECRET_KEY, {expiresIn: '1s' });

    res.status(200).json({
        username: user.username,
        name: user.name,
        token
    });
})

module.exports = logoutRouter;