const bcrypt = require("bcryptjs");


const beginHashOperation = (password) =>{
    let salt = bcrypt.genSaltSync(20);
    let hash = bcrypt.hashSync(password,salt);
    return hash;
}

module.exports = {
    beginHashOperation
}