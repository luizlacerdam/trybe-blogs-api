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
    const post = await BlogPost.findByPk(id, {
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

const createPost = async (post) => {
  if (!post.title || !post.content || !post.categoryIds) {
    console.log('entrou');
    return { type: 'MISSING_FIELDS', message: 'Some required fields are missing' };
  }
  const newPostId = await BlogPost.create(post);
  return { type: null, message: { id: newPostId, ...post } };
};
module.exports = {
    getAll,
    getById,
    createPost,
};