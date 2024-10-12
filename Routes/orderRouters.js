const express = require("express");
const {
    uploadOrder,
    getOrderById,
} = require("../Controllers/OrderControllers");
const orderRoute = express.Router();
orderRoute.post("/", uploadOrder);
orderRoute.get("/:id", getOrderById);
module.exports = orderRoute;
