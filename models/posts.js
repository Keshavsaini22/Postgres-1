'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {

    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    }
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Posts.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Posts',
  });
  return Posts;
};