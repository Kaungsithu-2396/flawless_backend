const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const verifyToken = asyncHandler(async (req, resp, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decode;
        } catch (error) {
            resp.status(401);
            throw new Error("unauthorized access");
        }
    } else {
        resp.status(401);
        throw new Error("You have no right to enter");
    }
    next();
});
module.exports = verifyToken;
