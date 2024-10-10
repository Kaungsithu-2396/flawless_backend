const mongoose = require("mongoose");
const homeSchema = new mongoose.Schema({
    image: {
        type: Object,
        required: [true, "please provide the image"],
    },
});
const homeModel = mongoose.model("home", homeSchema);
module.exports = homeModel;
