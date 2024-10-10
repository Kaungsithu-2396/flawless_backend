const bcrypt = require("bcrypt");
const createHashPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, 10);
    return hashPassword;
};
module.exports = { createHashPassword };
