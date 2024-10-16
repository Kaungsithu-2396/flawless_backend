const express = require("express");
const {
    uploadHomePageImage,
    deleteHomePageImage,
    getAllHomePageImage,
} = require("../Controllers/homepageControllers");
const verifyToken = require("../middleware/verifyToken");
const homePageRoute = express.Router();
homePageRoute.get("/", getAllHomePageImage);
homePageRoute.post("/",  uploadHomePageImage);
homePageRoute.delete("/:id",  deleteHomePageImage);
module.exports = homePageRoute;
