const { categorySchema } = require('./schemas');

const validateCategory = (category) => {
    const { error } = categorySchema.validate(category);
    if (error) return { type: 'INVALID_VALUE', message: error.message };
    return { type: null, message: '' };
};

module.exports = {
    validateCategory,
};