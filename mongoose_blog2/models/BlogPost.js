const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    titre: String,
    description: String,
    auteur:String,
    date: { type: Date, default: Date.now},
    image: String
});

module.exports = mongoose.model('BlogPost', blogSchema);