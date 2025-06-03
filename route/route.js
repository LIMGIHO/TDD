const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

router.get("/", (req, res) => {
    res.send("Hello World");
});
router.post("/product", productController.createProduct)
router.get("/product", productController.getProducts)
router.get("/product/:productId", productController.getProductById);
router.put("/product/:productId", productController.findByIdAndUpdate);

module.exports = router;
