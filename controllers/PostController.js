var Articles = require('../models/Articles');
var Topics = require('../models/Topics');
var Selections = require('../models/Selections');
var Users = require('../models/Users');
var PostDao = require('../dao/PostDao');

exports.GetALLPostData = function(req, res) {
    PostDao.GetPostDataFromDB().then(result =>{
        res.json(result);
    })
};

exports.GetTopicData = function(req, res) {
    const articles = new Articles();
    articles.setId(req.body.articleid);
    PostDao.GetTopicDataFromDB(articles).then(result =>{
        res.json(result);
    })
};

exports.InsertPostData = function(req, res) {
    const articles = new Articles();
    const topics = new Topics();
    const users = new Users();
    articles.setTitle(req.body.title);
    articles.setContent(req.body.content);
    articles.setTime(Date.now());
    topics.setTitle(req.body.topictitle);
    users.setId(req.body.userid);
    let selectionArray = [];
    for(let i = 0 ; i < req.body.selections.length; i++){
        
        const selections = new Selections();
        console.log(req.body.selections[i].selectioncontent)
        selections.setContent(req.body.selections[i].selectioncontent);
        selectionArray.push(selections)

    }

    PostDao.InsertPostDataToDB(articles, topics, users, selectionArray).then(result =>{

        res.end(result);

    });
};

exports.InsertVoteCount = function(req, res) {
    const selections = new Selections();
    selections.setId(req.body.selectionId);
    PostDao.InsertVoteCountToDB(selections).then(result =>{

        res.end(result);

    });
};