const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const validateBodyParams = require("../middlewares/validateBodyParams");
const { check } = require('express-validator');
const router = express.Router()

router.post("/createCategory", [
    check('name', 'The name cant be empty.').notEmpty(),
    validateBodyParams
], CategoryController.createCategory);

router.get("/getCategories", CategoryController.getCategories);
router.put("/updateCategoryById/id/:id", CategoryController.updateCategoryById);
router.delete("/deleteCategoryById/id/:id", CategoryController.deleteCategoryById);
router.get("/getCategoryById/id/:id", CategoryController.getCategoryById);
router.get("/getCategoriesByName/name/:name", CategoryController.getCategoriesByName);
router.get("/getCategoriesProducts", CategoryController.getCategoriesProducts);


module.exports = router