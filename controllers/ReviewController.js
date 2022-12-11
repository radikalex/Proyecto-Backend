const { Review, User, Sequelize } = require("../models/index");
const { unlink } = require("fs/promises");
const path = require("path");

const ReviewController = {
  async createreview(req, res) {
    try {
      const reviews = await Review.findAll({ where: { product_id: req.body.product_id, user_id: req.user.id } })
      if(reviews.length > 0) {
        return res.status(400).send({ msg: "This product already has a review from you" })
      }
      const review = await Review.create({ ...req.body, user_id: req.user.id });
      res.status(201).send({ msg: "Review created", review });
    } catch (error) {
      res
        .status(500)
        .send({ msg: "An error occurred while creating the review", error });
    }
  },

  async getReviewById(req, res) {
    try {
      const review = await Review.findByPk(req.params.id);
      if(review)
        res.status(200).send({ msg: `This is the review with id ${req.params.id}`, review });
      else
        res.status(404).send({ msg: `Review with id ${req.params.id} not found` });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: `There was an error getting a review with id ${req.params.id}`, error });
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
      const review = await Review.findByPk(req.params.id);
      if (!review) {
        const dir = path.resolve("./images");
        if(req.body.review_img)
          await unlink(path.join(dir, req.body.review_img));
        return res
          .status(404)
          .send({ msg: `Error: No review with id ${req.params.id} found` });
      }

      if (
        (req.body.review_img || req.body.review_img === '') &&
        review.review_img &&
        review.review_img !== req.body.review_img &&
        !/default\/.*/gm.test(review.review_img)
      ) {
        const dir = path.resolve("./images");
        await unlink(path.join(dir, review.review_img));
      }

      console.log(req.body);

      await Review.update(
        {
          title: req.body.title,
          content: req.body.content,
          rating: req.body.rating,
          review_img: req.body.review_img,
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
      const review = await Review.findByPk(req.params.id);
      if (!review) {
        return res
          .status(404)
          .send({ msg: `Error: No review with id ${req.params.id} found` });
      }
      if (review.review_img && !/default\/.*/gm.test(review.review_img)) {
        const dir = path.resolve("./images");
        await unlink(path.join(dir, review.review_img));
      }
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
