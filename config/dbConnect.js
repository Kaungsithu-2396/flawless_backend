function connectDB() {
    const mongoose = require("mongoose");
    const URL = process.env.DATABASE_URL;
    mongoose
        .connect(URL)
        .then((doc) => console.log("connection success"))
        .catch((error) => console.log(error));
}
module.exports = connectDB;
