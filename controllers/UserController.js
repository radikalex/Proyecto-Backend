const { User, Sequelize, Token, Order, Product, FavouriteProduct, Review, ReviewLike } = require("../models/index");
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
      res.status(201).send({ ok:true, msg: "User created succesfully", user });
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
          .send({ ok: false, message: "Username or password incorrect" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ ok: false, message: "Username or password incorrect" });
      }
      let token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res.send({ ok: true, message: "Welcome " + user.name, user, token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "There was an error during login", error });
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
      res.send({ message: "Disconnected successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was an error during logout" });
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

  async getUserWithOrderById(req, res) {
    try {
      const users = await User.findOne({
        attributes: { exclude: ["password", "role", "createdAt", "updatedAt"] },
        include: [
          {
            model: Order,
            attributes: ["id", "date"],
            include: [
              {
                model: Product,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
          },
        ],
        where: {
          id: req.user.id,
        },
      });
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "There was an error getting user", error });
    }
  },

  async getInfoUser(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: {
          exclude: [ "password", "role", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: Order,
            attributes: ["id", "date"],
            include: [
              {
                model: Product,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
          },
          {
            model: Product,
            as: 'FavouriteProductsList',
            attributes: ["id", "name", "price", "img_product"]
          },
          {
            model: Review,
            as: 'ReviewsLiked',
            attributes: ["id"]
          },
        ],
      });
      res.send({msg: "This is the user logged" , user});
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error getting the user's info", error });
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

  async addFavouriteProduct(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: {
          exclude: [ "createdAt", "updatedAt"],
        },
        include: [
          {
            model: Product,
            as: 'FavouriteProductsList',
            Product: ["id"]
          }
        ],
      });
      const productIds = user.FavouriteProductsList.map( product => product.id )
      if(productIds.includes(req.body.product_id)) {
        res.send({msg: "You already have this product in your favourites list"});
      } else {
        await FavouriteProduct.create({user_id: req.user.id, product_id: req.body.product_id})
        res.send({msg: "Favourite product added"});
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error adding a product as favourite", error });
    }
  },

  async removeFavouriteProduct(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: {
          exclude: [ "createdAt", "updatedAt"],
        },
        include: [
          {
            model: Product,
            as: 'FavouriteProductsList',
            Product: ["id"]
          }
        ],
      });
      const productIds = user.FavouriteProductsList.map( product => product.id )
      if(!productIds.includes(req.body.product_id)) {
        res.send({msg: "You do not have this product in your favourites list"});
      } else {
        await FavouriteProduct.destroy({ 
          where: { 
            user_id: req.user.id, 
            product_id: req.body.product_id
          } 
        })
        res.send({msg: "Product removed from favourite list"});
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error removing favourite product", error });
    }
  },


  async giveLikeReview(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: {
          exclude: [ "createdAt", "updatedAt"],
        },
        include: [
          {
            model: Review,
            as: 'ReviewsLiked',
            Review: ["id"]
          }
        ],
      });
      const reviewsIds = user.ReviewsLiked.map( review => review.id )
      if(reviewsIds.includes(req.body.review_id)) {
        res.send({msg: "You had already liked this review"});
      } else {
        await ReviewLike.create({user_id: req.user.id, review_id: req.body.review_id})
        res.send({msg: "Succesful like to review"});
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error giving like to a review", error });
    }
  },

  async removeLikeReview(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: {
          exclude: [ "createdAt", "updatedAt"],
        },
        include: [
          {
            model: Review,
            as: 'ReviewsLiked',
            Review: ["id"]
          }
        ],
      });
      const reviewsIds = user.ReviewsLiked.map( review => review.id )
      if(!reviewsIds.includes(req.body.review_id)) {
        res.send({msg: "This review does not have your like"});
      } else {
        await ReviewLike.destroy({ 
          where: { 
            user_id: req.user.id, 
            review_id: req.body.review_id
          } 
        })
        res.send({msg: "Succesful remove like from a review"});
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error removing like from a review", error });
    }
  },
};

module.exports = UserController;
