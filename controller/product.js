const productModel = require("../models/Product")

exports.createProduct = (req, res, next) => {
    const createdProduct = productModel.create(req.body);

    return res.status(201).json(createdProduct);
}