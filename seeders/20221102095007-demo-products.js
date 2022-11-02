'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'NZXT Function Mini TKL Mechanical Keyboard',
        price: 99.99,
        description: 'MECHANICAL KEYBOARD: The NZXT Function mechanical keyboard family combines a durable aluminum top plate with smooth, linear RGB switches, making it the perfect companion for PC gaming',
        img_product: '',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MSI Ventus GeForce RTX 3080 12GB GDDR6X PCI Express 4.0',
        price: 789.99,
        description: 'MECHANICAL KEYBOARD: The NZXT Function mechanical keyboard family combines a durable aluminum top plate with smooth, linear RGB switches, making it the perfect companion for PC gaming',
        img_product: '',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down(queryInterface, Sequelize) {}
};