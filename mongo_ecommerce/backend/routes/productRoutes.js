const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// @desc    Get all products
// @route   GET /api/products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc    Get single product
// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Produit non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
