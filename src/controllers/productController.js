const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, products });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a product (for testing)
// @route   POST /api/products
exports.createProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock } = req.body;
        const product = await Product.create({ name, description, price, stock });
        res.status(201).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};