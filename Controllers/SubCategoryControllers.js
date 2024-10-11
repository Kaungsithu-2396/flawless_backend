const subCategoryModel = require("../Models/subCategoryModel");
const categoryModel = require("../Models/categoryModel");
const asyncHandler = require("express-async-handler");
// @desc GET GetAll SubCategory
// @route GET /api/subCategory
// @access Private
const getAllSubCategories = asyncHandler(async (req, resp) => {
    const subCategories = await subCategoryModel.find();
    resp.status(200).send({
        data: subCategories,
    });
});
// @desc POST Create SubCategory
// @route POST /api/subCategory
// @access Private
const createSubCategory = asyncHandler(async (req, resp) => {
    const { name, categoryID } = req.body;
    console.log(categoryID, name);
    if (!name || !categoryID) {
        resp.status(404);
        throw new Error("uncomplete data");
    }
    const isDuplicatedSubCategory = await subCategoryModel.find({ name });

    if (isDuplicatedSubCategory.length > 0) {
        resp.status(500);
        throw new Error("this item already exisits");
    }
    const isValidCategory = await categoryModel.findById(categoryID);

    if (!isValidCategory) {
        resp.status(404).send({
            message: "invalid category",
        });
    }
    const subCategory = new subCategoryModel({
        name,
        mainCategory: categoryID,
    });
    const newCategory = await subCategory.save();

    resp.status(201).send({
        message: "success",
        newCategory,
    });
});
// @desc GET  getSubCategoryAs Parent Category
// @route POST /api/subCategory/:id
// @access Private
const getSubCategoryAsParentCategory = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    console.log("Id", id);
    if (!id) {
        resp.status(404);
        throw new Error("invalid id");
    }
    const categoryUnderParentCategory = await subCategoryModel.find({
        mainCategory: id,
    });
    resp.status(200).send({
        count: categoryUnderParentCategory.length,
        data: categoryUnderParentCategory,
    });
});
// @desc PATCH  updatesubcategory
// @route PATCH /api/subCategory/:id
// @access Private
const updateSubCategory = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        resp.status(500);
        throw new Error("invalid id");
    }
    const isValidCategory = await subCategoryModel.findById(id);
    if (!isValidCategory) {
        resp.status(500);
        throw new Error("sub category not found");
    }
    const updatedSubCategory = await subCategoryModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );
    resp.status(200).send({
        message: "update success",
        data: updatedSubCategory,
    });
});
const deleteSubCategory = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        resp.status(500);
        throw new Error("invalid Id");
    }
    await subCategoryModel.findByIdAndDelete(id);
    resp.status(200).send({
        message: "delete success",
    });
});
// @desc GET  subCategory By ID
// @route GET /api/subCategory/:id
// @access Private
const getSubCategoryByID = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        resp.status(500);
        throw new Error("please provide the id");
    }
    const isValidSubCategory = await subCategoryModel.findById(id);
    if (!isValidSubCategory) {
        resp.status(404);
        throw new Error("no product found");
    }
    resp.status(200).send({
        message: "success",
        data: isValidSubCategory,
    });
});
module.exports = {
    createSubCategory,
    getSubCategoryAsParentCategory,
    updateSubCategory,
    deleteSubCategory,
    getAllSubCategories,
    getSubCategoryByID,
};
