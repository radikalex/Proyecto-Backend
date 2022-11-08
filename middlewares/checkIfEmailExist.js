const { User } = require("../models/index");

const checkIfEmailExist = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      res.status(200).send({ ok:false, msg: "This email already exists" });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      message: "There was an error checking if the email exists",
    });
  }
};
module.exports = { checkIfEmailExist };
