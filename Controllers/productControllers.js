const productModel = require("../Models/productModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinaryConfig");
const axios = require("axios");
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
    } = req.body;
    if (
        !name ||
        !price ||
        !productCode ||
        !stock ||
        !description ||
        !description ||
        !category ||
        !subCategory
    ) {
        resp.status(500);
        throw new Error("incomplete data");
    }
    if (!req.files || req.files.length === 0) {
        resp.status(404);
        throw new Error("file not found");
    }
    const uploadedImages = await Promise.all(
        req.files.map(async (image) => {
            const imgUploadResponse = await cloudinary.uploader.upload(
                image.path,
                {
                    upload_preset: "flawless_",
                    invalidate: true,
                },
                (err, result) => {
                    if (err) {
                        console.log(err);
                        resp.status(500).send({
                            message: "image upload fail",
                        });
                    }
                }
            );
            return {
                url: imgUploadResponse.secure_url,
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

    // try {
    //     const revalidateResp = await fetch(
    //         `${process.env.PRODUCTION_BASE_URL}/api/webhook`,
    //         {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 paths: [
    //                     "/product",
    //                     "/",
    //                     `/product/${newProduct.category}`,
    //                     `/product/${newProduct.category}/${newProduct.subCategory}`,
    //                 ],
    //             }),
    //         }
    //     );
    //     console.log(`${process.env.PRODUCTION_BASE_URL}/api/webhook`, "url");

    //     if (revalidateResp.status === 200) {
    //         console.log("revalidate success for creating product process");
    //     }
    // } catch (error) {
    //     console.log(error);
    // }

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
    // .skip(page * itemsPerPage)
    // .limit(itemsPerPage);
    resp.status(200).send({
        data: allProducts,
    });
});
// @desc GET get Paginated Product
// @route GET /api/product/allProduct
// @access Public
const paginatedProducts = asyncHandler(async (req, resp) => {
    const page = req.query.page || 0;
    const itemsPerPage = 12;
    const allProducts = await productModel
        .find()
        .skip(page * itemsPerPage)
        .limit(itemsPerPage);
    const totalItems = await productModel.find();
    resp.status(200).send({
        totalItems: totalItems.length,
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
    if (!specificProduct) {
        resp.status(404).send({
            message: "no product found",
        });
    }
    resp.status(200).send({
        data: specificProduct,
    });
});
const getFeaturedProduct = asyncHandler(async (req, resp) => {
    const data = await productModel.find().limit(6);
    resp.status(200).send({
        data,
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
        publicID,
    } = req.body;
    const publicIDCol = JSON.parse(publicID);

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
        if (subCategory) updatedProductData.subCategory = subCategory;

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (img, idx) => {
                try {
                    const uploadResp = await cloudinary.uploader.upload(
                        img.path,
                        {
                            public_id: publicIDCol[idx],
                            invalidate: true,
                            overwrite: true,
                        }
                    );

                    return {
                        url: uploadResp.secure_url,
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
        // try {
        //     const revalidateResp = await fetch(
        //         `${process.env.PRODUCTION_BASE_URL}/api/webhook`,
        //         {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify({
        //                 paths: [
        //                     "/product",
        //                     "/",
        //                     `/product/${product.category}`,
        //                     `/product/${product.category}/${product.subCategory}`,
        //                     `/product/${updatedProduct.category}`,
        //                     `/product/${updatedProduct.category}/${updatedProduct.subCategory}`,
        //                     `/detail/${id}`,
        //                 ],
        //             }),
        //         }
        //     );
        //     if (revalidateResp.status === 200) {
        //         console.log("revalidate success for updating process");
        //     }
        // } catch (error) {
        //     console.log(error);
        // }

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
// @desc GET get Product
// @route GET /api/product
// @access Public
const deleteProduct = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        resp.status(500);
        throw new Error("invalid id");
    }
    const isValidProduct = await productModel.findById(id);
    if (!isValidProduct) {
        resp.status(404);
        throw new Error("no proudct found");
    }
    const deleteProductImages = isValidProduct.productImageCol.map(
        async (el) => {
            try {
                const { url, publicID } = el;
                const deleteResp = await cloudinary.uploader.destroy(publicID);

                return {
                    message: "success",
                };
            } catch (error) {
                console.log(error);
                throw new Error("delete operation fail");
            }
        }
    );
    const deleteImages = await Promise.all(deleteProductImages);

    // await fetch(`${process.env.PRODUCTION_BASE_URL}/api/webhook`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         paths: [
    //             "/product",
    //             "/",
    //             `/product/${isValidProduct.category}`,
    //             `/product/${isValidProduct.category}/${isValidProduct.subCategory}`,
    //         ],
    //     }),
    // });
    await productModel.findByIdAndDelete(id);

    resp.status(200).send({
        message: "delete success",
    });
});
const getProductByProductGenre = asyncHandler(async (req, resp) => {
    const { category, subCategory } = req.query;
    let query = {};
    if (category) {
        query.category = category;
    }
    if (subCategory) {
        query.subCategory = subCategory;
    }
    const products = await productModel.find(query);
    resp.status(200).send({
        products,
    });
});

module.exports = {
    getProductByProductGenre,
    createProduct,
    getAllProduct,
    getSpecificProduct,
    updateProduct,
    deleteProduct,
    paginatedProducts,
    getFeaturedProduct,
};
