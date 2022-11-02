const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const { authentication, isAdmin } = require("../middlewares/authentication");
const { checkIfEmailExist } = require("../middlewares/checkIfEmailExist");
const validateBodyParams = require("../middlewares/validateBodyParams");
const { check } = require('express-validator');


router.post(
  "/createUser",
  [
    check("name", "The name cant be empty.").notEmpty(),
    check("email", "The email cant be empty.").notEmpty(),
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

// router.post("/createProduct",  upload.single('img_product'),  [
//   check('name', 'The name cant be empty.').notEmpty(),
//   check('price', 'The price cant be empty.').notEmpty(),
//   check('description', 'The description cant be empty.').notEmpty(),
//   check('category_id', 'The category_id cant be empty.').notEmpty(),
//   check('img_product', 'The img_product cant be empty.').notEmpty(),
//   validateBodyParams
// ], ProductController.createProduct);

module.exports = router;
