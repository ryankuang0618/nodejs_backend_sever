var Posts = require('../models/Posts');
var PostDao = require('../dao/PostDao');

exports.GetPostData = function(req, res) {
    const posts = new Posts();
    posts.setTitle(req.body.title);
    posts.setArticle(req.body.article);
    posts.setAuthor(req.body.author);
    res.json(posts);
};
exports.GetDBData = function(req, res) {
    PostDao.GetPostDataFromDB().then(result =>{
        res.json(result);
    })
};