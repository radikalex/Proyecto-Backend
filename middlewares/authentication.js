const { User, Token, Sequelize, Review } = require("../models");
const { Op } = Sequelize;
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findByPk(payload.id);
    const tokenFound = await Token.findOne({
      where: {
        [Op.and]: [{ UserId: user.id }, { token: token }],
      },
    });
    if (!tokenFound) {
      return res.status(401).send({ message: "You are not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error, message: "There was a problem with the token" });
  }
};

const isAdmin = async (req, res, next) => {
  const admins = ["admin", "superadmin"];
  if (!admins.includes(req.user.role)) {
    return res.status(403).send({
      message: "You do not have permissions to perform this operation",
    });
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if(!review)
      return res.status(404).send({ message: `No review with id ${req.params.id}` });
    if(review.user_id !== req.user.id)
      return res.status(403).send({ message: 'This review is not yours' });
  } catch (error) {
    console.error(error)
    return res.status(500).send({ error, message: 'There was a problem verifying the authorship of the review' })
  }
  next();
};


module.exports = { authentication, isAdmin, isReviewAuthor };
