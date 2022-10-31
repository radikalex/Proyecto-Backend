const { User, Sequelize } = require("../models/index");
const { Op } = Sequelize;

const UserController = {
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).send({ msg: "User created succesfully", user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "An error occurred while creating the user", error });
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
