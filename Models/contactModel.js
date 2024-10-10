const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema([
    {
        name: {
            type: String,
            required: ["true", "please provide the name"],
        },
        email: {
            type: String,
            required: [true, "please provide the email"],
        },
        phoneNumber: {
            type: Number,
            required: [true, "please provide the phone number"],
        },
        message: {
            type: String,
            required: [true, "please provide the message"],
        },
    },
]);
const contactModel = mongoose.model("contact", contactSchema);
module.exports = contactModel;
