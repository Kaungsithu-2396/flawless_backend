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
categoryRoutes.post("/", createCategory);
categoryRoutes.get("/", getCategory);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.patch("/:id", updateCategory);
categoryRoutes.delete("/:id", deleteCategory);
module.exports = categoryRoutes;
