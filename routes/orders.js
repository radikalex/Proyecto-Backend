const express = require("express");
const OrderController = require("../controllers/OrderController");
const { authentication } = require("../middlewares/authentication");
const router = express.Router()

router.post("/createOrder", authentication, OrderController.createOrder);
router.get("/getOrders", OrderController.getOrders);


module.exports = router