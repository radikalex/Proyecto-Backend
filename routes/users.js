const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const { authentication, isAdmin } = require("../middlewares/authentication");
const { checkIfEmailExist } = require("../middlewares/checkIfEmailExist");

router.post("/createUser", checkIfEmailExist, UserController.createUser);
router.get("/getUsers", UserController.getUsers);
router.put("/updateUserById/id/:id", UserController.updateUserById);
router.delete("/deleteUserById/id/:id", UserController.deleteUserById);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
