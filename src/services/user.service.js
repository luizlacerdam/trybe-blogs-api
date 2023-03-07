const { User } = require('../models');
const schema = require('./validations/validationUser');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = (newUser) => {
    const error = schema.validateUser(newUser);
    if (error.type) return error;
    const userCreated = User.create(newUser);
    return { type: null, message: userCreated };
};
module.exports = {
    getByEmail,
    createUser,
};