const express = require("express");
const {
    loginController,
    
} = require("../Controllers/adminLoginControllers");
const adminRoute = express.Router();
adminRoute.post("/", loginController);

module.exports = adminRoute;
