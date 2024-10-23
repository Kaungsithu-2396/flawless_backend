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
    paginatedProducts,
} = require("../Controllers/productControllers");
const verifyToken = require("../middleware/verifyToken");
productRoute.post(
    "/",
    verifyToken,
    uploadMulter.array("images", 3),
    createProduct
);
productRoute.get("/", getAllProduct);
productRoute.get("/allProduct", paginatedProducts);
productRoute.get("/genre", getProductByProductGenre);
productRoute.get("/:id", getSpecificProduct);
productRoute.patch(
    "/:id",
    verifyToken,
    uploadMulter.array("images", 3),
    updateProduct
);
productRoute.delete("/:id", verifyToken, deleteProduct);

module.exports = productRoute;
