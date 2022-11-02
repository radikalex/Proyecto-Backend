const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const router = express.Router()


router.post("/createCategory", CategoryController.createCategory);
router.get("/getCategories", CategoryController.getCategories);
router.put("/updateCategoryById/id/:id", CategoryController.updateCategoryById);
router.delete("/deleteCategoryById/id/:id", CategoryController.deleteCategory);
router.get("/getCategoryById/id/:id", CategoryController.getCategoryById);
router.get("/getCategoriesByName/name/:name", CategoryController.getCategoriesByName);


module.exports = router