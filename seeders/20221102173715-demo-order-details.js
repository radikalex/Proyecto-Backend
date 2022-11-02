"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Order_details", [
      {
        amount: 1,
        order_id: 1,
        product_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        amount: 1,
        order_id: 2,
        product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        amount: 5,
        order_id: 3,
        product_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        amount: 2,
        order_id: 4,
        product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        amount: 7,
        order_id: 5,
        product_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        amount: 1,
        order_id: 6,
        product_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        amount: 1,
        order_id: 7,
        product_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        amount: 1,
        order_id: 8,
        product_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
