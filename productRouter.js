const express = require("express");
const Product = require("../models/productmodel");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
    try {
        if (req.query.category) {
            const products = await Product.find({ category: req.query.category });
            return res.json(products);
        }
        const allProducts = await Product.find();
        res.json(allProducts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

productRouter.get("/:id", async (req, res) => {
    try {
        const productById = await Product.findById(req.params.id);
        if (!productById) return res.status(404).json({ message: "Product not found" });
        res.json(productById);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

productRouter.post("/add", async (req, res) => {
    try {
        const { name, category, price, stock } = req.body;
        if (!name || !category || !price || !stock) {
            return res.status(400).json({ message: "PLEASE_FILL_ALL_FIELDS" });
        }
        const newProduct = new Product({ name, category, price, stock });
        await newProduct.save();
        res.json({ message: "PRODUCT_ADDED_SUCCESSFULLY" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = productRouter;
