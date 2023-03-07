const { User } = require('../models');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = (displayName, email, password, image) => {
    const newUser = User.create({
        displayName,
        email,
        password,
        image,
    });
    return newUser;
};
module.exports = {
    getByEmail,
    createUser,
};