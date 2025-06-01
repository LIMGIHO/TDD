const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

router.get("/", (req, res) => {
    res.send("Hello World");
});
router.post("/product", productController.createProduct)


module.exports = router;
