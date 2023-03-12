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
        return { type: 'INVALID_USER', message: 'Post does not exist' };
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
module.exports = {
    getAll,
    getById,
    createPost,
    editPost,
};