const mongoose = require("mongoose");
const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide the name"],
    },
    mainCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
});

const subCategoryModel = mongoose.model("subCategory", subCategorySchema);
module.exports = subCategoryModel;
