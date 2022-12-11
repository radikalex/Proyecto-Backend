"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "Alex",
        email: "alex@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        user_img: "users_images/default/alex.png",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Federico",
        email: "federico@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        user_img: "users_images/default/fede.png",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sofia",
        email: "sofia@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        user_img: "users_images/default/sofia.png",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "German",
        email: "german@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        user_img: "users_images/default/german.png",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Miguel",
        email: "miguel@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        user_img: "users_images/default/miguel.png",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Daniel",
        email: "daniel@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        user_img: "users_images/default/dani.png",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
