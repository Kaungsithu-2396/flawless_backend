const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const signToken = require("../util/generateToken");
const dotenv = require("dotenv").config({
    path: "../config.env",
});
const { createHashPassword } = require("../util/hashPassword");
const adminPassword = process.env.ADMIN_PASSWORD;
const adminEmail = process.env.ADMIN_EMAIL;
const hashPassword = createHashPassword(adminPassword);

//@desc POST login
//@Route POST /api/login
//@Access PRIVATE
const loginController = asyncHandler(async (req, resp) => {
    console.log("mingalar par");
    const { email, password } = req.body;
    if (!email || !password) {
        resp.status(404);
        throw new Error("Insufficient data provided");
    }
    const isValidUser = await bcrypt.compare(password, hashPassword);
    if (!isValidUser) {
        resp.status(401);
        throw new Error("Password or email incorrect");
    }
    if (isValidUser) {
        const token = signToken("admin");
        resp.cookie("token", token, {
            httpOnly: true,
            secure: false,

            path: "/",
        });
        resp.send({
            message: "success",
        });
    }
});

module.exports = {
    loginController,
};
