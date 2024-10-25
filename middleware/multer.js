const multer = require("multer");
const multerStorage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const uploadMulter = multer({ storage: multerStorage });
const uploadCategory = multer({
    storage: multerStorage,
    limits: { fileSize: 8 * 1024 * 1024 },
});
module.exports = { uploadMulter, uploadCategory };
