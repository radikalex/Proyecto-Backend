const express = require("express");
const ReviewController = require("../controllers/ReviewController");
const router = express.Router();
const { authentication, isReviewAuthor } = require("../middlewares/authentication");
const { uploadReviewImages } = require("../middlewares/upload");

router.post("/createreview", authentication, uploadReviewImages.single('review_img'), ReviewController.createreview);
router.get("/getReviews", ReviewController.getReviews);
router.get("/getReviewById/:id", ReviewController.getReviewById);
router.put(
  "/updateReviewById/:id",
  authentication,
  isReviewAuthor,
  uploadReviewImages.single('review_img'),
  ReviewController.updateReviewById
);
router.delete("/deleteReviewById/:id", authentication, isReviewAuthor, ReviewController.deleteReviewById);

module.exports = router;
