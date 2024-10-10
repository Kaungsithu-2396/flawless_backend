const asyncHandler = require("express-async-handler");
//@desc POST logout
//@Route POST /api/login
//@Access PRIVATE
const logOutController = asyncHandler(async (req, resp) => {
    resp.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });
    resp.status(200).send({
        message: "logout successful",
    });
});
module.exports = { logOutController };
