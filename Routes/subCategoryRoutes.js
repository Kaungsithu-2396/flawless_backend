const express = require("express");
const subCategoryRoute = express.Router();
const {
    createSubCategory,
    getSubCategoryAsParentCategory,
    updateSubCategory,
    deleteSubCategory,
    getAllSubCategories,
    getSubCategoryByID,
} = require("../Controllers/SubCategoryControllers");
const verifyToken = require("../middleware/verifyToken");
subCategoryRoute.post("/", createSubCategory);
subCategoryRoute.get("/", getAllSubCategories);
subCategoryRoute.get("/:id", getSubCategoryAsParentCategory);
subCategoryRoute.get("/find/:id", getSubCategoryByID);
subCategoryRoute.patch("/:id", updateSubCategory);
subCategoryRoute.delete("/:id", deleteSubCategory);
module.exports = subCategoryRoute;
