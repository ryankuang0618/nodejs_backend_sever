var Articles = require('../models/Articles');
var Users = require('../models/Users');
var PostDao = require('../dao/PostDao');

exports.GetALLPostData = function(req, res) {
    PostDao.GetPostDataFromDB().then(result =>{
        res.json(result);
    })
};

exports.InsertPostData = function(req, res) {
    const articles = new Articles();
    const users = new Users();
    articles.setTitle(req.body.title);
    articles.setContent(req.body.content);
    articles.setTime(req.body.time);
    PostDao.InsertPostDataToDB(articles).then(result =>{

        res.end(result);

    })
};