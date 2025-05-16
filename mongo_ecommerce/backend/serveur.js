const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('L\' API est en cours d\'exécution');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur ok sur ${PORT}`));
