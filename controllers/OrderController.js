const { Order, Sequelize, Order_detail, Product } = require("../models/index");
const { Op } = Sequelize;

const OrderController = {
  async createOrder(req, res) {
    try {
      const order = await Order.create({
        date: req.body.date,
        user_id: req.body.user_id,
      });

      for (const product of req.body.products) {
        Order_detail.create({
          order_id: order.id,
          product_id: product.id,
          amount: product.amount,
        });
      }
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
      const orders = await Order.findAll({ include: [Product] });
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
