'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Computer Peripherals',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Components & Storage',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gaming',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Networking',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Software & Services',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Computer System',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {}
};