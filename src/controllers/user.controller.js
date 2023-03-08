const { UserService } = require('../services');
const tokenGenerator = require('../utils/tokenGenerator');
// const errorMap = require('../utils/errorMap');

const createUser = async (req, res) => {
    try {
        const newUser = req.body;
        const userExist = await UserService.getByEmail(newUser.email);

        if (userExist) return res.status(409).json({ message: 'User already registered' });

        const { type, message } = await UserService.createUser(newUser);

        if (type) return res.status(400).json({ message });
        // console.log(message.id);
        const token = tokenGenerator({ data: { userId: message.id } });
        res.status(201).json({ token });
    } catch (error) {
        res
      .status(500)
      .json({ message: 'Erro ao salvar o usuário no banco', error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const users = await UserService.getAll();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getAll,
};