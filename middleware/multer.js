const multer = require("multer");
const multerStorage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const uploadMulter = multer({ storage: multerStorage });
module.exports = uploadMulter;
