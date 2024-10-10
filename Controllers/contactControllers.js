const asyncHandler = require("express-async-handler");
const contactModel = require("../Models/contactModel");
// @desc add Contact
// @route POST /api/contact
// @access Public
const createContact = asyncHandler(async (req, resp) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
        resp.status(500);
        throw new Error("incomplete data");
    }
    const newContact = await contactModel.create({
        name,
        email,
        phoneNumber: phone,
        message,
    });
    resp.status(201).send({
        message: "success",
        data: newContact,
    });
});
// @desc get Contact
// @route GET /api/contact
// @access Private
const getAllContact = asyncHandler(async (req, resp) => {
    const allContact = await contactModel.find();
    resp.status(200).send({
        count: allContact.length,
        data: allContact,
    });
});
// @desc get specific contact
// @route GET /api/contact/:id
// @access Private
const getSpecificContact = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        resp.status(500);
        throw new Error("invalid id");
    }
    const specificContact = await contactModel.findById(id);
    if (!specificContact) {
        resp.status(404);
        throw new Error("no product found");
    }
    resp.status(200).send({
        data: specificContact,
    });
});
module.exports = { createContact, getAllContact, getSpecificContact };
