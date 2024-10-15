const express = require("express");
const {
    uploadOrder,
    getOrderById,
    getAllOrders,
} = require("../Controllers/OrderControllers");
const orderRoute = express.Router();
orderRoute.post("/", uploadOrder);
orderRoute.get("/:id", getOrderById);
orderRoute.get("/", getAllOrders);
module.exports = orderRoute;
