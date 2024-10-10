const express = require("express");
const subCategoryRoute = express.Router();
const {
    createSubCategory,
    getSubCategoryAsParentCategory,
    updateSubCategory,
    deleteSubCategory,
    getAllSubCategories,
} = require("../Controllers/SubCategoryControllers");
const verifyToken = require("../middleware/verifyToken");
subCategoryRoute.post("/", verifyToken, createSubCategory);
subCategoryRoute.get("/", getAllSubCategories);
subCategoryRoute.get("/:id", verifyToken, getSubCategoryAsParentCategory);
subCategoryRoute.patch("/:id", verifyToken, updateSubCategory);
subCategoryRoute.delete("/:id", verifyToken, deleteSubCategory);
module.exports = subCategoryRoute;
