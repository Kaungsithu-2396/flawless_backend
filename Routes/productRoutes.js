const express = require("express");
const productRoute = express.Router();
const {
    createProduct,
    getAllProduct,
    getSpecificProduct,
    updateProduct,
} = require("../Controllers/productControllers");
const verifyToken = require("../middleware/verifyToken");
productRoute.post("/", verifyToken, createProduct);
productRoute.get("/", getAllProduct);
productRoute.get("/:id", getSpecificProduct);
productRoute.patch("/:id", verifyToken, updateProduct);
module.exports = productRoute;
