/**
* @param {import('sequelize').DataTypes} DataTypes
* @param {import('sequelize').Sequelize } Sequelize
* @returns
*/
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,

    },
        {
            timestamps: false,
            tableName: 'categories',
            underscored: true,
        });
    // User.associate = (models) => {
    //     User.hasMany(models.blo)
    // }
    return Category;
};