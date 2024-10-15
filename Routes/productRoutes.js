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
productRoute.post(
    "/",
    verifyToken,
    uploadMulter.array("images", 3),
    createProduct
);
productRoute.get("/", getAllProduct);
productRoute.get("/genre", getProductByProductGenre);
productRoute.get("/:id", getSpecificProduct);
productRoute.patch(
    "/:id",
    uploadMulter.array("images", 3),
    verifyToken,
    updateProduct
);
productRoute.delete("/:id", verifyToken, deleteProduct);

module.exports = productRoute;
