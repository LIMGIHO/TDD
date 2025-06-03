const productModel = require("../models/Product")

exports.createProduct = async (req, res, next) => {
    try {
        const createdProduct = await productModel.create(req.body);
        // console.log(createdProduct)
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    }
}

exports.getProducts = async (req, res, next) => {
    try {
        const allProducts = await productModel.find({});
        res.status(200).json(allProducts);
    } catch (error) {
        next(error);
    }
    
}

exports.getProductById = async (req, res, next) => {
    try {
        const id = req.params.productId;
        const product = await productModel.findById(id);
        
        if (product)
            res.status(200).json(product);
        else res.status(404).send();
    } catch (error) {
        next(error);
    }
}

exports.findByIdAndUpdate = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const body = req.body;
    
        const updatedData = await productModel.findByIdAndUpdate(
            productId, body, {new:true}
        );
    
        let status = 200;
        if (!updatedData) status = 404;
    
        res.status(status).json(updatedData);
    } catch (error) {
        res.status(500);
        next(error);
    }
}