const { Category, Sequelize } = require("../models/index");
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
          await Category.update({ name: req.body.name },
            {
              where: {
                id: req.params.id,
              },
            }
          );
          res.send({ msg: "Category updated" });
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .send({ msg: "There was an error updating the category", error });
        }
    },
    async deleteCategory(req, res) {
        try {
            await Category.destroy({
              where: {
                id: req.params.id,
              },
            });
            res.send({ msg: "Category deleted" });
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
            const category = await Category.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.params.name}%`,
                    },
                }
            });
            res.send(category);
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ msg: "There was an error getting a category by name", errpr });
        }
    }
};

module.exports = CategoryController;