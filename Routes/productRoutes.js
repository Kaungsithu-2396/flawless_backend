const express = require("express");
const productRoute = express.Router();
const {
    createProduct,
    getAllProduct,
    getSpecificProduct,
    updateProduct,
    deleteProduct,
    getProductByProductGenre,
} = require("../Controllers/productControllers");
const verifyToken = require("../middleware/verifyToken");
productRoute.post("/", verifyToken, createProduct);
productRoute.get("/", getAllProduct);
productRoute.get("/genre", getProductByProductGenre);
productRoute.get("/:id", getSpecificProduct);
productRoute.patch("/:id", verifyToken, updateProduct);
productRoute.delete("/:id", verifyToken, deleteProduct);

module.exports = productRoute;
