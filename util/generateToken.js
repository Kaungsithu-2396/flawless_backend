const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ path: "../config.env" });
const signToken = (role) => {
    return jwt.sign({ role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
};
module.exports = signToken;
