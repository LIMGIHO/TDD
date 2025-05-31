const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

router.get("/", (req, res) => {
    res.send("Hello World");
});
router.get("/products", productController.hello)


module.exports = router;
