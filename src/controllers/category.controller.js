const { CategoryService } = require('../services');

const createCategory = async (req, res) => {
    try {
        const newCategory = req.body;
        const { type, message } = await CategoryService.createCategory(newCategory);
        if (type) return res.status(400).json({ message });
        res.status(201).json(message);
    } catch (error) {
        res
      .status(500)
      .json({ message: 'Erro ao salvar a categoria no banco', error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const categorias = await CategoryService.getAll();
        res.status(200).json(categorias);
    } catch (error) {
        res
        .status(500)
        .json({ message: 'Erro ao recuperar categorias no banco', error: error.message });
    }
};

module.exports = {
    createCategory,
    getAll,
};