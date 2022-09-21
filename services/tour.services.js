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

exports.updateProductService = async (productId, data) => {
  const product = await Product.findById(productId);
  const result = await product.set(data).save();
  return result;
};
exports.bulkUpdateProductService = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });
  // console.log(result);
  console.log(data.ids);
  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  Promise.all(products);
  const result = await Promise.all(products);
  console.log(result);

  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};
