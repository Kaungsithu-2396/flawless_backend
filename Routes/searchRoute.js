const express = require("express");
const searchRoute = express.Router();
const { searchController } = require("../Controllers/searchControllers");
searchRoute.get("/", searchController);
module.exports = { searchRoute };
