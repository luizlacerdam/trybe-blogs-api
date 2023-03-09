const { BlogPost, User, Category } = require('../models');

const getAll = async () => {
    const posts = await BlogPost.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'displayName', 'email', 'image'],
          },
          {
            model: Category,
            as: 'categories',
          },
        ],
      });
    return posts;
};

const getById = async (id) => {
    const post = await User.findByPk(id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'displayName', 'email', 'image'],
          },
          {
            model: Category,
            as: 'categories',
          },
        ],
      });
    if (!post) {
        return { type: 'INVALID_USER', message: 'Post does not exist' };
    }
    return { type: null, message: post };
};
module.exports = {
    getAll,
    getById,
};