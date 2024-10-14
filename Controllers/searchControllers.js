const productModel = require("../Models/productModel");
const asyncHandler = require("express-async-handler");
const searchController = asyncHandler(async (req, resp) => {
    const { searchTerm } = req.query;
    const searchResult = await productModel.find({
        $or: [
            {
                productCode: { $regex: searchTerm, $options: "i" },
            },
            {
                name: { $regex: searchTerm, $options: "i" },
            },
        ],
    });
    console.log(searchResult);
    resp.status(200).send({
        data: searchResult,
    });
});
module.exports = { searchController };
