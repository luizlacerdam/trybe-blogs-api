/**
* @param {import('sequelize').DataTypes} DataTypes
* @param {import('sequelize').Sequelize } Sequelize
* @returns
*/

module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define(
        'PostCategory',
        {
            postId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'blog_posts',
                    key: 'id',
                }
            },
            categoryId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'categories',
                    key: 'id',
                }
            },
        },
        {
            timestamps: false,
            tableName: 'posts_categories',
            underscored: true,
        }
    );
    PostCategory.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
            as: 'blog_post',
            through: PostCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId',
        });
        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: PostCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId',
        });
    }
    return PostCategory;
}