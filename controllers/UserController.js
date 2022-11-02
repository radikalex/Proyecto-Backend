const { User, Sequelize, Token, Order, Product } = require("../models/index");
const { Op } = Sequelize;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

const UserController = {
  async createUser(req, res) {
    try {
      req.body.role = "user";
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({ ...req.body, password: password });
      res.status(201).send({ msg: "User created succesfully", user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "An error occurred while creating the user", error });
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      let token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res.send({ message: "Bienvenid@" + user.name, user, token });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error getting the users", error });
    }
  },

  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "hubo un problema al tratar de desconectarte" });
    }
  },

  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error getting the users", error });
    }
  },

  // Endpoint que nos traiga la información del usuario conectado
  // junto a los pedidos que tiene y los productos que contiene cada pedido

  async getUserWithOrderById(req, res) {
    try {
      const users = await User.findAll({
        include: [{ model: Order, include: [Product] }],
        where: {
          id: req.user.id,
        },
      });
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error getting user", error });
    }
  },

  async updateUserById(req, res) {
    try {
      await User.update(
        { name: req.body.name, password: req.body.password },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send({ msg: "User updated" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error updating the user", error });
    }
  },

  async deleteUserById(req, res) {
    try {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ msg: "User deleted" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error deleting the user", error });
    }
  },
};

module.exports = UserController;
