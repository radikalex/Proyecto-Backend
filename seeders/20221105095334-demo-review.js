'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Reviews", [
      {
        content: "Good keyboard quality, although key noise can be annoying",
        rating: 4,
        product_id: 1,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "I was looking forward to having this graphics card, now I can play the games in ultra quality. Happy with the purchase!",
        rating: 5,
        product_id: 2,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "I bought this laptop 2 weeks ago. I use it to teach my programming classes and it works great",
        rating: 4,
        product_id: 6,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "Controller works fine but it's too expensive",
        rating: 3,
        product_id: 3,
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "160 dollars to be able to have Windows 11 is too expensive, I hope they lower the price soon",
        rating: 2,
        product_id: 5,
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "With this router I no longer have internet problems while playing online. It's expensive, but I recommend it",
        rating: 4,
        product_id: 4,
        user_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "The motherboard arrived in bad condition. I have had to return it",
        rating: 1,
        product_id: 7,
        user_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "I was killed in a game while using this controller. It must be a problem with the controller, not mine. I can't fail",
        rating: 1,
        product_id: 3,
        user_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
  }
};
