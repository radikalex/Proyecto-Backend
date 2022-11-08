const express = require("express");
const OrderController = require("../controllers/OrderController");
const router = express.Router()

router.post("/createOrder", OrderController.createOrder);
router.get("/getOrders", OrderController.getOrders);


module.exports = router