"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: "user_id" });
      User.hasMany(models.Review, { foreignKey: "user_id" });
      User.belongsToMany(models.Product, {
        as: 'FavouriteProductsList',
        through: models.FavouriteProduct,
        foreignKey: "user_id",
        otherKey: "product_id",
      });
      User.belongsToMany(models.Review, {
        through: models.ReviewLike,
        foreignKey: "user_id",
        otherKey: "review_id",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
