const { Category } = require("../models/index");

const checkProductsQuery = async (req, res, next) => {

    if(!req.query.name) {
        req.query.name = "";
    }

    if(!req.query.category || req.query.category === "" || req.query.category === '0' ) {
        try {
            const categories = await Category.findAll();
            req.query.category = categories.map((category) => category.id);
        } catch (error) {
            res
                .status(500)
                .send({ msg: "There was an error with products query", error });
        }
    }

    if(!req.query.minPrice) {
        req.query.minPrice = "1";
    }

    if(!req.query.maxPrice) {
        req.query.maxPrice = "9999";
    }

    if(!req.query.priceOrder || (req.query.priceOrder.toLowerCase() !== "desc" && req.query.priceOrder.toLowerCase() !== "asc") ) {
        req.query.priceOrder = [];
    }
    else {
        req.query.priceOrder = [['price', req.query.priceOrder]];
    }

    next();
};

module.exports = { checkProductsQuery };
