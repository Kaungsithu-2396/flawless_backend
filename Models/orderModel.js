const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide the name"],
        },
        email: {
            type: String,
            required: [true, "please provide the email"],
        },
        installmentPlan: {
            type: Boolean,
            required: [true, "please provide the installment plan"],
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
        lineId: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            default: "",
        },
        order: [
            {
                count: Number,
                description: String,
                mainCategory: String,
                name: String,
                price: Number,
                productCode: String,
                productImages: [String],
                stock: Number,
                subCategory: [
                    {
                        _id: String,
                        name: String,
                        mainCategory: String,
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
);
const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
