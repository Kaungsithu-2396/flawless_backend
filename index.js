const express = require("express");
const dotenv = require("dotenv").config({ path: "./config.env" });
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const categoryRoutes = require("./Routes/categoryRoutes");
const bodyParser = require("body-parser");
const subCategoryRoute = require("./Routes/subCategoryRoutes");
const contactRoute = require("./Routes/contactRoutes");
const adminRoute = require("./Routes/adminRoutes");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const connectDB = require("./config/dbConnect");
const productRoute = require("./Routes/productRoutes");
const homePageRoute = require("./Routes/homepageRoute");
const logOutRoute = require("./Routes/adminLogOutRoutes");
const orderRoute = require("./Routes/orderRouters");
const { searchRoute } = require("./Routes/searchRoute");
connectDB();
const app = express();
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.FE_BASE_URL, process.env.PRODUCTION_BASE_URL],
        default: process.env.FE_BASE_URL,
        credentials: true,
    })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.get("/", (req, resp) => {
    resp.send("Welcome to flawless server");
});
app.use("/api/category", categoryRoutes);
app.use("/api/subCategory", subCategoryRoute);
app.use("/api/product", productRoute);
app.use("/api/home", homePageRoute);
app.use("/api/contact", contactRoute);
app.use("/api/login", adminRoute);
app.use("/api/logout", logOutRoute);
app.use("/api/order", orderRoute);
app.use("/api/search", searchRoute);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`backend is running on ${PORT}`);
});
module.exports = app;
