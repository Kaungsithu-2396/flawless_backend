const express = require("express");
const {
    uploadHomePageImage,
    deleteHomePageImage,
    getAllHomePageImage,
} = require("../Controllers/homepageControllers");
const { uploadCategory } = require("../middleware/multer");
const verifyToken = require("../middleware/verifyToken");
const homePageRoute = express.Router();
homePageRoute.get("/", getAllHomePageImage);
homePageRoute.post(
    "/",
    verifyToken,
    uploadCategory.single("image"),
    uploadHomePageImage
);
homePageRoute.delete("/:id", deleteHomePageImage);
module.exports = homePageRoute;
