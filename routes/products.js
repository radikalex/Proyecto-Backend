const express = require("express");
const ProductController = require("../controllers/ProductController");
const upload = require("../middlewares/upload");
const router = express.Router()

router.get("/getProducts", ProductController.getProducts);
router.post("/createProduct", upload.single('img_file'), ProductController.createProduct);
router.put("/updateProductById/id/:id", upload.single('img_file'), ProductController.updateProductById);
router.delete("/deleteProductById/id/:id", ProductController.deleteProduct);
router.get("/getProductById/id/:id", ProductController.getProductById);
router.get("/getProductsByName/name/:name", ProductController.getProductsByName);
router.get("/getProductsByPrice/price/:price", ProductController.getProductsByPrice);
router.get("/getProductsPriceDesc", ProductController.getProductsPriceDesc);

module.exports = router