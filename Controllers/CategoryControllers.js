const categoryModel = require("../Models/categoryModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinaryConfig");
const subCategoryModel = require("../Models/subCategoryModel");
const productModel = require("../Models/productModel");

// @desc update Category
// @route update /api/category/:id
// @access Private
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, image, publicID } = req.body;
    const existingCategory = await categoryModel.findById(id);
    try {
        if (!existingCategory) {
            res.status(500);
            throw new Error("no category found");
        }
        if (image) {
            // Upload new image to Cloudinary
            const uploadResp = await cloudinary.uploader.upload(image, {
                upload_preset: "flawless_",
                public_id: publicID,
                invalidate: true,
            });

            if (uploadResp) {
                const updatedCategoryData = {
                    name: name || existingCategory.name,
                    categoryImage: {
                        url: uploadResp.secure_url,
                        publicID: uploadResp.public_id,
                    },
                };
                if (name) {
                    await productModel.updateMany(
                        {
                            category: existingCategory.name,
                        },
                        { $set: { category: name } }
                    );
                }
                const updatedCategory = await categoryModel.findByIdAndUpdate(
                    id,
                    updatedCategoryData,
                    {
                        new: true,
                    }
                );

                return res.status(200).json({
                    message: "Category updated successfully",
                    data: updatedCategory,
                });
            }
        } else {
            const updateData = {};
            if (name) {
                updateData.name = name;
            }

            if (name) {
                await productModel.updateMany(
                    {
                        category: existingCategory.name,
                    },
                    { $set: { category: name } }
                );
            }

            const updatedCategory = await categoryModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );

            return res.status(200).json({
                message: "Category updated successfully",
                data: updatedCategory,
            });
        }
    } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({
            message: "Failed to update category",
            error: error.message,
        });
    }
});

const createCategory = asyncHandler(async (req, resp) => {
    const { name, categoryImage } = req.body;
    if (!name || !categoryImage) {
        resp.status(400);
        throw new Error("please provide the complete data");
    }
    if (categoryImage) {
        const uploadResp = await cloudinary.uploader.upload(categoryImage, {
            upload_preset: "flawless_",
        });

        if (uploadResp) {
            const category = new categoryModel({
                name,
                categoryImage: {
                    url: uploadResp.secure_url,
                    public_id: uploadResp.public_id,
                },
            });

            const newCategory = await category.save();
            resp.status(201).send({
                message: "success",
                data: newCategory,
            });
        }
    }
});
// @desc POST Category
// @route GET /api/category
// @access Public
const getCategory = asyncHandler(async (req, resp) => {
    const categories = await categoryModel.find();
    console.log(categories);
    resp.status(200).send({
        data: categories,
    });
});
// @desc GET Category By ID
// @route GET /api/category/:categoryID
// @access Public
const getCategoryById = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    console.log(id);
    if (!id) {
        resp.status(500);
        throw new Error("invalid id");
    }
    const categoryById = await categoryModel.findById(id);
    resp.status(200).send({
        data: categoryById,
    });
});
// @desc DELETE  delete Category By ID
// @route DELETE /api/category/:categoryID
// @access Private
const deleteCategory = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        resp.status(500);
        throw new Error("invalid id");
    }
    const isValidCategory = await categoryModel.findById(id);

    //verify any product exisit under the selected category to delete
    const isItemExisitUnderCategory = await productModel.find({
        category: isValidCategory.name,
    });
    if (isItemExisitUnderCategory.length !== 0) {
        resp.status(500);
        throw new Error(
            "Product with this category exisit. We cannot proceed these operation"
        );
    }

    //delete the storage of image from cloudinary
    await cloudinary.uploader.destroy(isValidCategory.categoryImage.public_id);

    //respective subcategories are also deleted
    subCategoryModel
        .deleteMany({ mainCategory: id })
        .then(() => {
            console.log("delete success");
        })
        .catch((error) => {
            console.log(error);
        });
    await categoryModel.findByIdAndDelete(id);
    resp.status(200).send({
        message: "delete success",
    });
});

module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
