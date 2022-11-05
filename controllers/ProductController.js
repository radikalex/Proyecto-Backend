const { Product, Category, Review, User, Sequelize } = require("../models/index");
const { Op } = Sequelize;
const { unlink } = require("fs/promises");
const path = require("path");

const ProductController = {
  async getProducts(req, res) {
    try {
      const products = await Product.findAll({
        attributes: {
          exclude: ["category_id", "createdAt", "updatedAt"],
        },
        include: [
          { model: Category, attributes: ["name"] },
          { model: Review, attributes: ["content", "rating"] },
        ],
      });
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
      const product = await Product.create(req.body);
      res.status(201).send({ msg: "Product added", product });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "An error occurred while creating the product", error });
    }
  },
  async updateProductById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (product) {
        await Product.update(
          {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            img_product: req.body.img_product,
            category_id: req.body.category_id,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        if (
          product.img_product !== req.body.img_product &&
          !/default\/.*/gm.test(product.img_product)
        ) {
          const dir = path.resolve("./product_images");
          await unlink(path.join(dir, product.img_product));
        }
        res.send({ msg: "Product updated" });
      } else {
        const dir = path.resolve("./product_images");
        await unlink(path.join(dir, req.body.img_product));
        res
          .status(404)
          .send({ msg: `Error: No product with id ${req.params.id} found` });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error updating the product", error });
    }
  },
  async deleteProductById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res
          .status(404)
          .send({ msg: `Error: No product with id ${req.params.id} found` });
      }
      if (!/default\/.*/gm.test(product.img_product)) {
        const dir = path.resolve("./product_images");
        await unlink(path.join(dir, product.img_product));
      }
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
      const product = await Product.findByPk(req.params.id, {
        attributes: {
          exclude: ["category_id", "createdAt", "updatedAt"],
        },
        include: [
          { model: Category, attributes: ["name"] },
          { model: Review, attributes: ["content", "rating"], include: [{ model: User, attributes: ["name"]}]},
        ],
      });
      if (!product)
        res
          .status(404)
          .send({ msg: `Error: No product with id ${req.params.id} found` });
      else res.send(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error getting a product by id", error });
    }
  },
  async getProductsByName(req, res) {
    try {
      const products = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${req.params.name}%`,
          },
        },
      });
      if (products.length > 0) 
        res.send({msg: `${products.length} ${products.length === 1 ? "product" : "products"} found with '${req.params.name}' in their name`,  results: products});
      else
        res.status(200).send({
          msg: `No products with '${req.params.name}' in their name`,
          results: []
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error getting a product by name", error });
    }
  },
  async getProductsByPrice(req, res) {
    try {
      const products = await Product.findAll({
        where: {
          price: req.params.price,
        },
      });
      if (products.length > 0) res.send(products);
      else
        res.status(200).send({
          msg: `No product with a price of '${req.params.price}'`,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error getting a product by price", error });
    }
  },
  async getProductsPriceDesc(req, res) {
    try {
      const product = await Product.findAll({
        order: [["price", "DESC"]],
      });
      res.send(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error getting a product by price", error });
    }
  },
  async getProductsQuery(req, res) {
    try {
      const products = await Product.findAll({
        include: [Review],
        where: {
          category_id: req.query.category,
          name: {
            [Op.like]: `%${req.query.name}%`,
          },
          price: {
            [Op.between]: [req.query.minPrice, req.query.maxPrice]
          }
        },
        order: req.query.priceOrder
      });
      res.send({msg: "Products found", results: products});
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error getting the products", error });
    }
  },
};



module.exports = ProductController;
