"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Orders", [
      {
        date: new Date(),
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: new Date(),
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: new Date(),
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: new Date(),
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: new Date(),
        user_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: new Date(),
        user_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: new Date(),
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: new Date(),
        user_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
