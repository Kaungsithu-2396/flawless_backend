const productModel = require("../Models/productModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinaryConfig");
// @desc POST  create Product
// @route POST /api/product
// @access Private
const createProduct = asyncHandler(async (req, resp) => {
    const {
        name,
        price,
        productCode,
        stock,
        description,
        category,
        subCategory,
        productImage,
    } = req.body;
    if (
        !name ||
        !price ||
        !productCode ||
        !stock ||
        !description ||
        !description ||
        !category ||
        !subCategory ||
        !productImage
    ) {
        resp.status(500);
        throw new Error("incomplete data");
    }
    const uploadedImages = await Promise.all(
        productImage.map(async (image) => {
            const imgUploadResponse = await cloudinary.uploader.upload(image, {
                upload_preset: "flawless_",
                invalidate: true,
            });
            return {
                url: imgUploadResponse.url,
                publicID: imgUploadResponse.public_id,
            };
        })
    );

    const newProduct = await productModel.create({
        name,
        price,
        productCode,
        stock,
        description,
        category,
        subCategory,
        productImageCol: uploadedImages,
    });
    resp.status(201).send({
        message: "success",
        data: newProduct,
    });
});
// @desc GET get Product
// @route GET /api/product
// @access Public
const getAllProduct = asyncHandler(async (req, resp) => {
    const allProducts = await productModel.find();
    resp.status(200).send({
        data: allProducts,
    });
});
// @desc GET get ProductById
// @route GET /api/product/:id
// @access Public
const getSpecificProduct = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        resp.status(500);
        throw new Error("invalid id");
    }
    const specificProduct = await productModel.findById(id);
    resp.status(200).send({
        data: specificProduct,
    });
});
// @desc PATCH update Product
// @route PATCH /api/product/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        name,
        price,
        productCode,
        stock,
        description,
        category,
        subCategory,
        productImages,
    } = req.body;

    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProductData = {};
        if (name) updatedProductData.name = name;
        if (price) updatedProductData.price = price;
        if (productCode) updatedProductData.productCode = productCode;
        if (stock) updatedProductData.stock = stock;
        if (description) updatedProductData.description = description;
        if (category) updatedProductData.category = category;
        if (subCategory && subCategory.length > 0)
            updatedProductData.subCategory = subCategory;

        if (productImages && productImages.length > 0) {
            const uploadPromises = productImages.map(async (img) => {
                try {
                    const { image, publicID } = img;
                    const uploadResp = await cloudinary.uploader.upload(image, {
                        public_id: publicID,
                        invalidate: true,
                        overwrite: true,
                    });

                    return {
                        url: uploadResp.url,
                        publicID: uploadResp.public_id,
                    };
                } catch (err) {
                    console.error("Error updating image:", err);
                    throw new Error(`Failed to update image: ${err.message}`);
                }
            });

            const updatedImages = await Promise.all(uploadPromises);
            updatedProductData.productImageCol = updatedImages;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            updatedProductData,
            {
                new: true,
            }
        );

        return res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({
            message: "Failed to update product",
            error: error.message,
        });
    }
});

module.exports = {
    createProduct,
    getAllProduct,
    getSpecificProduct,
    updateProduct,
};
