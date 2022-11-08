const express = require("express");
const ProductController = require("../controllers/ProductController");
const upload = require("../middlewares/upload");
const router = express.Router()
const validateBodyParams = require("../middlewares/validateBodyParams");
const { check } = require('express-validator');
const { authentication, isAdmin } = require("../middlewares/authentication");
const { checkProductsQuery } = require("../middlewares/checkProductsQuery");

router.get("/getProducts", ProductController.getProducts);

router.post("/createProduct",  authentication, isAdmin, upload.single('img_product'),  [
    check('name', 'The name cant be empty.').notEmpty(),
    check('price', 'The price cant be empty.').notEmpty(),
    check('description', 'The description cant be empty.').notEmpty(),
    check('category_id', 'The category_id cant be empty.').notEmpty(),
    check('img_product', 'Please, select a valid file image.').notEmpty(),
    validateBodyParams
], ProductController.createProduct);

router.put("/updateProductById/id/:id", authentication, isAdmin, upload.single('img_product'), ProductController.updateProductById);

router.delete("/deleteProductById/id/:id", authentication, isAdmin, ProductController.deleteProductById);

router.get("/getProductById/id/:id", ProductController.getProductById);
router.get("/getProductsByName/name/:name", ProductController.getProductsByName);
router.get("/getProductsByPrice/price/:price", ProductController.getProductsByPrice);
router.get("/getProductsPriceDesc", ProductController.getProductsPriceDesc);
router.get("/getProductsQuery", checkProductsQuery, ProductController.getProductsQuery);

module.exports = router