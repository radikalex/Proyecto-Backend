'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Reviews", [
      {
        title: 'Pretty good',
        content: "Good keyboard quality, although key noise can be annoying",
        rating: 4,
        product_id: 1,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Just what I needed',
        review_img: 'reviews_images/default/review-rtx3088.jpg',
        content: "I was looking forward to having this graphics card, now I can play the games in ultra quality. Happy with the purchase!",
        rating: 5,
        product_id: 2,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'I recommend it',
        content: "I bought this laptop 2 weeks ago. I use it to teach my programming classes and it works great",
        rating: 4,
        product_id: 6,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Too exponsive',
        content: "Controller works fine but it's too expensive",
        rating: 3,
        product_id: 3,
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'I do not recommend it',
        content: "160 dollars to be able to have Windows 11 is too expensive, I hope they lower the price soon",
        rating: 2,
        product_id: 5,
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'You should buy it',
        content: "With this router I no longer have internet problems while playing online. It's expensive, but I recommend it",
        rating: 4,
        product_id: 4,
        user_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Maybe the motherboard is good but it came to me broken',
        content: "The motherboard arrived in bad condition. I have had to return it",
        rating: 1,
        product_id: 7,
        user_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Awful',
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
