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

const getById = async (id) => {
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!user) {
        return { type: 'INVALID_USER', message: 'User does not exist' };
    }
    return { type: null, message: user };
};

const deleteUser = async (userId) => {
    await User.destroy({ where: { id: userId } });
    return { type: null };
};
module.exports = {
    getByEmail,
    createUser,
    getAll,
    getById,
    deleteUser,
};