const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');
// const validatePost = require('./middlewares/validatePost');
const postRoutes  = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');

mongoose.connect('mongodb+srv://baptisteqnt:zbUZ6yV5CmXtl9zn@cluster0.rsqgo3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(fileUpload());
app.use(session({
    secret: 'monblogsecret',
    resave: false,
    saveUninitialized: true,
}));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.error = req.session.error || null;
    res.locals.success = req.session.success || null;
    res.locals.errors = req.session.errors || null;
  
    // Supprimer les messages de session après usage
    delete req.session.error;
    delete req.session.success;
    delete req.session.errors;
  
    next();
  });

app.use('/', postRoutes);
app.use('/', authRoutes);


app.listen(3000, () => {console.log('Serveur en ligne sur https://localhost:3000')});