const { Review, User, Sequelize } = require("../models/index");

const ReviewController = {
  async createreview(req, res) {
    try {
      const review = await Review.create({ ...req.body, user_id: req.user.id });
      res.status(201).send({ msg: "Review created", review });
    } catch (error) {
      res
        .status(500)
        .send({ msg: "An error occurred while creating the review", error });
    }
  },

  async getReviews(req, res) {
    try {
      const reviews = await Review.findAll({
        attributes: {
          exclude: ["user_id", "createdAt", "updatedAt"],
        },
        include: { model: User, attributes: ["name"] },
      });
      res.status(200).send(reviews);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error getting the reviews", error });
    }
  },

  async updateReviewById(req, res) {
    try {
      await Review.update(
        {
          content: req.body.content,
          rating: req.body.rating,
          product_id: req.body.product_id,
          user_id: req.body.user_id,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send({ msg: "Review updated" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error updating the review", error });
    }
  },

  async deleteReviewById(req, res) {
    try {
      await Review.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ msg: "Review deleted" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error deleting the review", error });
    }
  },
};

module.exports = ReviewController;
