"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.Order_detail, { foreignKey: "order_id" });
      Order.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Order.init(
    {
      date: DataTypes.DATE,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
