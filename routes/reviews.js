const express = require("express");
const ReviewController = require("../controllers/ReviewController");
const router = express.Router();
const { authentication } = require("../middlewares/authentication");

router.post("/createreview", authentication, ReviewController.createreview);
router.get("/getReviews", ReviewController.getReviews);
router.put(
  "/updateReviewById/:id",
  authentication,
  ReviewController.updateReviewById
);
router.delete("/deleteReviewById/:id", ReviewController.deleteReviewById);

module.exports = router;
