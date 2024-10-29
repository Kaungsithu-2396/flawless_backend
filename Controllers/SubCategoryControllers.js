const subCategoryModel = require("../Models/subCategoryModel");
const categoryModel = require("../Models/categoryModel");
const asyncHandler = require("express-async-handler");
const productModel = require("../Models/productModel");
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
    const respRevalidate = await fetch(
        `${process.env.PRODUCTION_BASE_URL}/api/revalidate?path=/product,/`
    );
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
    const { name } = req.body;
    if (!id) {
        resp.status(500);
        throw new Error("invalid id");
    }
    const isValidSubCategory = await subCategoryModel.findById(id);
    if (!isValidSubCategory) {
        resp.status(500);
        throw new Error("sub category not found");
    }
    const isProductExisitWithThisSubCategory = await productModel.find({
        subCategory: isValidSubCategory.name,
    });

    await productModel.updateMany(
        {
            subCategory: isValidSubCategory.name,
        },
        {
            $set: { subCategory: req.body.name },
        }
    );

    const updatedSubCategory = await subCategoryModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );
    const respRevalidate = await fetch(
        `${process.env.PRODUCTION_BASE_URL}/api/revalidate?path=/product,/`
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
    const isValidSubCategory = await subCategoryModel.findById(id);
    if (!isValidSubCategory) {
        resp.status(404);
        throw new Error("no sub category found");
    }
    const isItemExisitUnderSubCategory = await productModel.find({
        subCategory: isValidSubCategory.name,
    });
    if (isItemExisitUnderSubCategory.length !== 0) {
        resp.status(500);
        throw new Error("product with this subCategory exisit");
    }
    await subCategoryModel.findByIdAndDelete(id);
    const respRevalidate = await fetch(
        `${process.env.PRODUCTION_BASE_URL}/api/revalidate?path=/product,/`
    );
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
