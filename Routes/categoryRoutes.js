const express = require("express");
const categoryRoutes = express.Router();
const { uploadCategory } = require("../middleware/multer");
const {
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require("../Controllers/CategoryControllers");
const verifyToken = require("../middleware/verifyToken");
categoryRoutes.post(
    "/",
    verifyToken,
    uploadCategory.single("image"),
    createCategory
);
categoryRoutes.get("/", getCategory);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.patch(
    "/:id",
    verifyToken,
    uploadCategory.single("image"),
    updateCategory
);
categoryRoutes.delete("/:id", verifyToken, deleteCategory);
module.exports = categoryRoutes;
