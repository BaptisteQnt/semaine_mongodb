const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');
const products = require('./data/products');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connexion MongoDB réussie');
    await Product.deleteMany(); // On vide la collection
    const insertedProducts = await Product.insertMany(products);
    console.log('Produits ajoutés avec succès !');
    process.exit();
  })
  .catch((err) => {
    console.error('Erreur :', err);
    process.exit(1);
  });
