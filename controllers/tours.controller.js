const Tour = require("../models/Tour");
const {
  addATourService,
  getToursServices,
  getTourByIdService,
  updateTourByIdService,
} = require("../services/tour.services");

module.exports.getTours = async (req, res, next) => {
  try {
    const filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const tours = await getToursServices(filters, queries);

    res.status(200).json(tours);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Can not get data!",
      error: error.message,
    });
  }
};

module.exports.addATour = async (req, res, next) => {
  try {
    const result = await addATourService(req.body);

    res.status(200).json({
      status: "success",
      message: "Data inserted successful!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data is not inserted!",
      error: error.message,
    });
  }
};

exports.getTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tour = await getTourByIdService(id);
    res.send({
      status: "success",
      message: "successfully get tour!",
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Could not get tour!",
      error: error.message,
    });
  }
};

exports.updateTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tour = await updateTourByIdService(id, req.body, { new: true });
    res.status(200).json({
      status: "success",
      message: "successfully update tour!",
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Could not update tour!",
      error: error.message,
    });
  }
};

exports.getTrendingTours = async (req, res, next) => {
  try {
    const result = await Tour.find().sort({ views: -1 }).limit(3);
    res.status(200).json({
      status: "success",
      message: "successfully get trending tours!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Could not find trending tours!",
      error: error.message,
    });
  }
};
exports.getCheapestTour = async (req, res, next) => {
  try {
    const result = await Tour.find().sort({ price: 1 }).limit(3);
    res.status(200).json({
      status: "success",
      message: "successfully get cheapest tours!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Could not find cheapest tours!",
      error: error.message,
    });
  }
};
