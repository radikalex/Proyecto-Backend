const { Order, Sequelize } = require("../models/index");
const { Op } = Sequelize;

const OrderController = {
  async createOrder(req, res) {
    try {
      const order = await Order.create({ user_id: req.body.user_id });
      res.status(201).send({ msg: "Order created succesfully", order });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "An error occurred while creating the order", error });
    }
  },

  async getOrders(req, res) {
    try {
      const orders = await Order.findAll();
      res.status(200).send(orders);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error getting the orders", error });
    }
  },

};

module.exports = OrderController;
