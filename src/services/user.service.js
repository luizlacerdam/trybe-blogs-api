const { User } = require('../models');
const schema = require('./validations/validationUser');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = async (newUser) => {
    const error = schema.validateUser(newUser);
    if (error.type) return error;
    const userCreated = await User.create(newUser);
    // console.log({ id: userCreated.id, ...newUser });
    return { type: null, message: { id: userCreated.id, ...newUser } };
};

const getAll = async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return users;
};
module.exports = {
    getByEmail,
    createUser,
    getAll,
};