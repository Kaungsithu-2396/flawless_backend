const asyncHandler = require("express-async-handler");
const orderModel = require("../Models/orderModel");
const sendMail = require("../util/sendMail");
//@desc Upload Order
//@route POST /api/order
//@access PUBLIC
const uploadOrder = asyncHandler(async (req, resp) => {
    const {
        name,
        email,
        phone,
        zipCode,
        lineId,
        installmentPlan,
        address,
        message,
        order,
    } = req.body;
    if (
        !name ||
        !email ||
        !phone ||
        !zipCode ||
        !lineId ||
        !installmentPlan ||
        !address ||
        !order
    ) {
        resp.status(500);
        throw new Error("incomplete data");
    }
    const newData = await orderModel.create({
        name,
        email,
        phone,
        zipCode,
        lineId,
        installmentPlan,
        address,
        message,
        order,
    });
    if (!newData) {
        resp.status(500);
        throw new Error("data upload fail");
    }
    sendMail("Order Received",newData.email)
        .then(() => console.log("success"))
        .catch((err) => console.log(err));
    resp.status(201).send({
        message: "success",
        data: newData,
    });
});
//@detail get Get Order by id
//@route GET /api/checkout/:id
//@access PUBLIC
const getOrderById = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        resp.status(500);
        throw new Error("invalid id");
    }
    const specificOrder = await orderModel.findById(id);
    if (!specificOrder) {
        resp.status(404);
        throw new Error("no order found");
    }
    resp.status(200).send({
        data: specificOrder,
    });
});
module.exports = { uploadOrder, getOrderById };
