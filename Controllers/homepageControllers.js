const cloudinary = require("../config/cloudinaryConfig");
const homeModel = require("../Models/homepageCustomizeModel");
const asyncHandler = require("express-async-handler");
const productModel = require("../Models/productModel");

// @desc upload homepage image
// @route POST /api/home
// @access Private
const uploadHomePageImage = asyncHandler(async (req, resp) => {
    const { image } = req.body;
    if (!image) {
        resp.status(500);
        throw new Error("insufficient data providence");
    }
    const uploadImageResp = await cloudinary.uploader.upload(image, {
        upload_preset: "flawless_",
    });
    if (uploadImageResp) {
        const uploadHomePageImage = new homeModel({
            image: {
                url: uploadImageResp.secure_url,
                publicID: uploadImageResp.public_id,
            },
        });
        const newImage = await uploadHomePageImage.save();
        resp.status(201).send({
            status: "success",
            data: newImage,
        });
    } else {
        resp.status(500);
        throw new Error("image upload fail");
    }
});
// @desc DELETE homepage image
// @route DELETE /api/home/:id
// @access Private
const deleteHomePageImage = asyncHandler(async (req, resp) => {
    const { id } = req.params;

    if (!id) {
        resp.status(500);
        throw new Error("please provide id");
    }
    const verifyHomePageImage = await homeModel.findById(id);
    if (!verifyHomePageImage) {
        resp.status(404);
        throw new Error("no image found");
    }
    cloudinary.uploader
        .destroy(verifyHomePageImage.image.publicID)
        .then(() => console.log("success"))
        .catch((error) => console.log(error));
    const deleteResp = await homeModel.findByIdAndDelete(id);
    if (deleteResp) {
        resp.status(200).send({
            message: "delete success",
        });
    }
});
// @desc get homepage image
// @route GET /api/home
// @access Public
const getAllHomePageImage = asyncHandler(async (req, resp) => {
    const allImages = await homeModel.find();
    resp.status(200).send({
        message: "success",
        data: allImages,
    });
});
module.exports = {
    uploadHomePageImage,
    deleteHomePageImage,
    getAllHomePageImage,
};
