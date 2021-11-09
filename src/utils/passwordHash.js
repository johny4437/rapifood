const bcrypt =  require('bcryptjs');
const { models } = require('mongoose');


function hashPassword (password) {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);

    return {
        hash
    }
}

function comparePassword (password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword
};