const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const { authentication, isAdmin } = require("../middlewares/authentication");
const { checkIfEmailExist } = require("../middlewares/checkIfEmailExist");
const validateBodyParams = require("../middlewares/validateBodyParams");
const { check } = require("express-validator");

router.post(
  "/createUser",
  [
    check("name", "The name cant be empty.").notEmpty(),
    check("email", "The email format is not valid.").isEmail(),
    check("password", "The password cant be empty.").notEmpty(),
    validateBodyParams,
  ],
  checkIfEmailExist,
  UserController.createUser
);
router.get("/getUsers", UserController.getUsers);
router.put("/updateUserById/id/:id", UserController.updateUserById);
router.delete("/deleteUserById/id/:id", UserController.deleteUserById);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);
router.post(
  "/getUserWithOrderById",
  authentication,
  UserController.getUserWithOrderById
);

module.exports = router;
