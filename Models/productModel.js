const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide the name"],
        },
        productCode: {
            type: String,
            requred: [true, "please provide the product code"],
            unique: true,
        },
        stock: {
            type: Number,
            required: [true, "please provide the stock"],
            default: 1,
        },
        description: {
            type: String,
            default: "",
        },
        productImageCol: {
            type: [],
            required: [true, "please provide the valid image"],
        },
        category: {
            type: String,
            required: [true, "please provide the category"],
        },
        subCategory: {
            type: [],
            required: [true, "please provide the sub category"],
        },
        price: {
            type: Number,
            required: [true, "please provide the price"],
        },
    },
    {
        timestamps: true,
    }
);
const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
