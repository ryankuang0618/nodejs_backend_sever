var Posts = require('../models/Posts');

exports.GetPostData = function(req, res) {
    const posts = new Posts();
    posts.setTitle(req.body.title);
    posts.setArticle(req.body.article);
    posts.setAuthor(req.body.author);
    res.json(posts);
};