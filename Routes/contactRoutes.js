const express = require("express");
const contactRoute = express.Router();
const {
    createContact,
    getAllContact,
    getSpecificContact,
} = require("../Controllers/contactControllers");
const verifyToken = require("../middleware/verifyToken");
contactRoute.post("/", createContact);
contactRoute.get("/", verifyToken, getAllContact);
contactRoute.get("/:id", verifyToken, getSpecificContact);
module.exports = contactRoute;
