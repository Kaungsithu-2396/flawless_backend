const express = require("express");
const dotenv = require("dotenv").config({ path: "./config.env" });
const errorHandler = require("./middleware/errorHandler");
const categoryRoutes = require("./Routes/categoryRoutes");
const subCategoryRoute = require("./Routes/subCategoryRoutes");
const contactRoute = require("./Routes/contactRoutes");
const adminRoute = require("./Routes/adminRoutes");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const connectDB = require("./config/dbConnect");
const productRoute = require("./Routes/productRoutes");
const homePageRoute = require("./Routes/homepageRoute");
const logOutRoute = require("./Routes/adminLogOutRoutes");
connectDB();
const app = express();
app.use(
    cors({
        origin: process.env.FE_BASE_URL,
        credentials: true,
    })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.get("/", (req, resp) => {
    resp.send("minglar par");
});
app.use("/api/category", categoryRoutes);
app.use("/api/subCategory", subCategoryRoute);
app.use("/api/product", productRoute);
app.use("/api/home", homePageRoute);
app.use("/api/contact", contactRoute);
app.use("/api/login", adminRoute);
app.use("/api/logout", logOutRoute);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`backend is running on ${PORT}`);
});
