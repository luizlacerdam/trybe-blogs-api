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

module.exports = {
    createCategory,
    getAll,
};