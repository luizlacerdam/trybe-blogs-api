const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');

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
        return { type: 404, message: 'Post does not exist' };
    }
    return { type: null, message: post };
};

const createPost = async (newPost) => {
  const { id, post } = newPost;
  const categoryFind = await Promise.all(
    post.categoryIds.map((categoryId) => Category.findByPk(categoryId)),
);
  const isNull = categoryFind.some((category) => category === null);
  if (isNull) {
    return { type: 'MISSING_CATEGORY', message: 'one or more "categoryIds" not found' };
  }
  if (!post.title || !post.content || !post.categoryIds) {
    return { type: 'MISSING_FIELDS', message: 'Some required fields are missing' };
  }
  const newPostObject = { userId: id, ...post };
  const newPostCreated = await BlogPost.create(newPostObject);
  await post.categoryIds.map((category) => PostCategory
  .create({ postId: newPostCreated.dataValues.id, categoryId: category }));
  return { type: null, message: newPostCreated.dataValues };
};

const editPost = async (postObj) => {
  const { postId, newPost } = postObj;
  const getPost = await getById(postId);
  if (getPost.type) {
    return getPost;
  }
  console.log(getPost);
  if (postObj.userId !== getPost.message.dataValues.userId) {
    return { type: 401, message: 'Unauthorized user' };
  }
  if (postObj.newPost.content === '' || postObj.newPost.title === '') {
    return { type: 400, message: 'Some required fields are missing' };
  }
  await BlogPost.update({ ...newPost, updated: Date.now() }, { where: { id: postId } });
  const postUpdated = await getById(postId);
  return { type: null, message: postUpdated.message.dataValues };
};

const deletePost = async (postObj) => {
  const { userId, postId } = postObj;
  const getPost = await getById(+postId);
  if (getPost.type) {
    return getPost;
  }
  if (userId !== getPost.message.dataValues.userId) {
    return { type: 401, message: 'Unauthorized user' };
  }
  await BlogPost.destroy({ where: { id: postId } });
  return { type: null };
};

const postSearch = async (query) => {
  console.log(query);
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { type: null, message: posts };
};

module.exports = {
    getAll,
    getById,
    createPost,
    editPost,
    deletePost,
    postSearch,
};