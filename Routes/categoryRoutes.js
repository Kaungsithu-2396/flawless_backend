const express = require("express");
const categoryRoutes = express.Router();
const {
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require("../Controllers/CategoryControllers");
const verifyToken = require("../middleware/verifyToken");
categoryRoutes.post("/", verifyToken, createCategory);
categoryRoutes.get("/", getCategory);
categoryRoutes.get("/:id", verifyToken, getCategoryById);
categoryRoutes.patch("/:id", verifyToken, updateCategory);
categoryRoutes.delete("/:id", verifyToken, deleteCategory);
module.exports = categoryRoutes;
