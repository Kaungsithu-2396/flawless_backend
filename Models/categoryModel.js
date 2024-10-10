const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide the name"],
        unique: [true, "this item already exisits"],
    },
    categoryImage: {
        type: Object,
        required: [true, "no image attached"],
    },
});
const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
