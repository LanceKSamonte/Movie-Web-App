import express from "express";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();

// route to get reviews based on ID
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews);

// route to make a new review
router.route("/new").post(ReviewsCtrl.apiPostReview);

// route to get, update, or delete a review by ID
router.route("/:id").get(ReviewsCtrl.apiGetReview).put(ReviewsCtrl.apiUpdateReview).delete(ReviewsCtrl.apiDeleteReview)

export default router