const { Category } = require('../models');
const schema = require('./validations/validationCategory');

const createCategory = async (newCategory) => {
    const error = schema.validateCategory(newCategory);
    if (error.type) return error;
    const categoryId = await Category.create(newCategory);
    return { type: null, message: { id: categoryId.id, ...newCategory } };
};

const getAll = async () => {
    const categories = await Category.findAll();
    return categories;
};

const getById = async (id) => {
    const category = await Category.findByPk(id);
    if (!category) {
        return { type: 'INVALID_CATEGORY', message: 'Category does not exist' };
    }
    return { type: null, message: category };
};

module.exports = {
    createCategory,
    getAll,
    getById,
};