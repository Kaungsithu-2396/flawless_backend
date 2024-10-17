const express = require("express");
const uploadMulter = require("../middleware/multer");
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
productRoute.post("/", uploadMulter.array("images", 3), createProduct);
productRoute.get("/", getAllProduct);
productRoute.get("/genre", getProductByProductGenre);
productRoute.get("/:id", getSpecificProduct);
productRoute.patch("/:id", uploadMulter.array("images", 3), updateProduct);
productRoute.delete("/:id", deleteProduct);

module.exports = productRoute;
