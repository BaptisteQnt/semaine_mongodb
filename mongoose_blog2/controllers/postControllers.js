const BlogPost = require('../models/BlogPost');

exports.getAllPosts = async (req, res) => {
    const articles = await BlogPost.find().sort({ date: -1});
    const articleCount = await BlogPost.countDocuments();
    res.render('index', { articles, articleCount });
}

exports.showCreateForm = (req, res) => {
    res.render('create');
}

exports.storePost = async (req, res) => {
    let imagePath = '';

    if (req.files && req.files.image) {
        const image = req.files.image;
        const imageName = Date.now() + '-' + image.name;
        imagePath = '/uploads/' + imageName;

        await image.mv(__dirname + '/../public/' + imagePath);
    }

    await BlogPost.create({
        titre: req.body.titre,
        description: req.body.description,
        auteur: req.body.auteur,
        image: imagePath,
    });

    res.redirect('/');
};

exports.getPostById = async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('post', { post });
}