const express = require("express");
const toursController = require("../controllers/tours.controller");
const router = express.Router();

router
  .route("/tours")
  .get(toursController.getTours)
  .post(toursController.addATour);

router.route("/tours/:id").get(toursController.getTourById);

router.route("/tour/trending").get(toursController.getTrendingTours);

router.route("/tour/cheapest").get(toursController.getCheapestTour);

router.route("/tour/:id").patch(toursController.updateTourById);

module.exports = router;
