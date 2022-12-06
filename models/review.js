"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Product, { foreignKey: "product_id" });
      Review.belongsTo(models.User, { foreignKey: "user_id" });
      Review.belongsToMany(models.User, {
        through: models.ReviewLike,
        foreignKey: "review_id",
        otherKey: "user_id",
      });
    }
  }
  Review.init(
    {
      content: DataTypes.STRING,
      title: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      review_img: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
