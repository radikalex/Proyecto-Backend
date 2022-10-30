const { Product, Category, Sequelize } = require("../models/index");
const { Op } = Sequelize;

const ProductController = {
    async getProducts(req, res) {
        try {
            const products = await Product.findAll({ include: [Category]});
            res.status(200).send(products);
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ msg: "There was an error getting the products", error });
        }
    },
    async createProduct(req, res) {
        try {
            req.body.img_product = req.file.filename;
            const product = await Product.create(req.body);
            res.status(201).send({msg: "Product added", product})
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ msg: "An error occurred while creating the product", error });
        }
    },
    async updateProductById(req, res) {
        try {
            req.body.img_product = req.file.filename;
            await Product.update({ 
                name: req.body.name, 
                price: req.body.price, 
                description: req.body.description,
                img_product: req.body.img_product,
                category_id: req.body.category_id
            },
            {
              where: {
                id: req.params.id,
              },
            }
          );
          res.send({ msg: "Product updated" });
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .send({ msg: "There was an error updating the product", error });
        }
    },
    async deleteProduct(req, res) {
        try {
            await Product.destroy({
              where: {
                id: req.params.id,
              },
            });
            res.send({ msg: "Product deleted" });
          } catch (error) {
            console.error(error);
            res
              .status(500)
              .send({ msg: "There was an error deleting the product", error });
          }
    },
    async getProductById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            res.send(product);
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ msg: "There was an error getting a product by id", error });
        }
    },
    async getProductByName(req, res) {
        try {
            const product = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.params.name}%`,
                    },
                }
            });
            res.send(product);
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ msg: "There was an error getting a product by name", error });
        }
    }
};

module.exports = ProductController;