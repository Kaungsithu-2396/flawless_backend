const express = require("express");
const { logOutController } = require("../Controllers/adminLogOutController");
const logOutRoute = express.Router();
logOutRoute.post("/", logOutController);
module.exports = logOutRoute;
