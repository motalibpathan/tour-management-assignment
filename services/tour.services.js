const Tour = require("../models/Tour");

module.exports.getToursServices = async (filters, queries) => {
  const tours = await Tour.find()
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields);
  const totalTours = await Tour.countDocuments(filters);
  const pageCount = Math.ceil(totalTours / queries.limit);
  console.log(
    "🚀 ~ file: tour.services.js ~ line 15 ~ module.exports.getToursServices= ~ queries",
    queries
  );
  return { totalTours, tours, pageCount };
};

module.exports.addATourService = async (data) => {
  const tour = new Tour(data);
  const result = tour.save();
  return result;
};

module.exports.getTourByIdService = async (id) => {
  const tour = await Tour.findByIdAndUpdate(id, { $inc: { views: 1 } });
  return tour;
};

exports.updateTourByIdService = async (id, data) => {
  const result = Tour.findByIdAndUpdate(id, data, {
    runValidators: true,
  });
  return result;
};
