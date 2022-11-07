const { Category, Product, Sequelize } = require("../models/index");
const { Op } = Sequelize;
const CategoryController = {
    async getCategories(req, res) {
        try {
            const categories = await Category.findAll();
            res.status(200).send(categories);
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ msg: "There was an error getting the categories", error });
        }
    },
    async createCategory(req, res) {
        try {
            const category = await Category.create(req.body);
            res.status(201).send({msg: "Category added", category})
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ msg: "An error occurred while creating the category", error });
        }
    },
    async updateCategoryById(req, res) {
        try {
            const category = await Category.findByPk(req.params.id);
            if(category) {
                await Category.update({ name: req.body.name },
                {
                    where: {
                        id: req.params.id,
                    },
                });
                res.send({ msg: "Category updated" });
            }
            else {
                res.status(404).send({msg: `Error: No category with id ${req.params.id} found`});
            }
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ msg: "There was an error updating the category", error });
        }
    },
    async deleteCategoryById(req, res) {
        try {
            const rows = await Category.destroy({
              where: {
                id: req.params.id,
              },
            });
            if(rows)
                res.send({ msg: "Category deleted" });
            else
                res.status(404).send({msg: `Error: No category with id ${req.params.id} found`});
          } catch (error) {
            console.error(error);
            res
              .status(500)
              .send({ msg: "There was an error deleting the category", error });
          }
    },
    async getCategoryById(req, res) {
        try {
            const category = await Category.findByPk(req.params.id);
            if(!category)
                res.status(404).send({msg: `Error: No category with id ${req.params.id} found`});
            else
                res.send(category);
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ msg: "There was an error getting a category by id", error });
        }
    },
    async getCategoriesByName(req, res) {
        try {
            const categories = await Category.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.params.name}%`,
                    },
                }
            });
            if(categories.length > 0)
                res.send(categories);
            else 
                res.status(404).send({msg: `Error: No categories with '${req.params.name}' in their name`});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ msg: "There was an error getting a category by name", errpr });
        }
    },
    async getCategoriesProducts(req, res) {
        try {
            const categories = await Category.findAll({ include: [Product]});
            res.status(200).send(categories);
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ msg: "There was an error getting the categories with their products", error });
        }
    }
};

module.exports = CategoryController;