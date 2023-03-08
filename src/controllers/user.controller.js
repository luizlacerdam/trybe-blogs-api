const { UserService } = require('../services');
// const errorMap = require('../utils/errorMap');

const createUser = async (req, res) => {
    const newUser = req.body;
    const userExist = await UserService.getByEmail(newUser.email);

    if (userExist) return res.status(409).json({ message: 'User already registered' });

    const { type, message } = await UserService.createUser(newUser);

    if (type) return res.status(400).json({ message });

    res.status(201).json(message);
};

module.exports = {
    createUser,
};