var Articles = require('../models/Articles');
var Topics = require('../models/Topics');
var Selections = require('../models/Selections');
var Users = require('../models/Users');
var Comments = require('../models/Comments');
var PostDao = require('../dao/PostDao');

exports.GetALLPostData = function(req, res) {
    PostDao.GetPostDataFromDB().then(result =>{
        res.json(result);
    })
};

exports.GetDataBase = function(req, res) {
    sql = req.body.sql;
    PostDao.GetDataBase(sql).then(result =>{
        res.json(result);
    })
};


exports.GetTopicData = function(req, res) {
    const articles = new Articles();
    articles.setId(req.query.articleid);
    PostDao.GetTopicDataFromDB(articles).then(result =>{
        res.json(result);
    })
};

exports.InsertPostData = function(req, res) {
    const articles = new Articles();
    const users = new Users();
    articles.setTitle(req.body.title);
    articles.setContent(req.body.content);
    articles.setTime(Date.now());
    users.setId(req.body.userid);
    let voteArray = [];
    let selectionArray = [];
    for(let t = 0 ; t < req.body.vote.length; t++){
        const topics = new Topics();
        topics.setTitle(req.body.vote[t].topictitle);
        for(let i = 0 ; i < req.body.vote[t].selections.length; i++){
            
            const selections = new Selections();
            selections.setContent(req.body.vote[t].selections[i].selectioncontent);
            selectionArray.push(selections)

        }
        let voteData = {topic: topics, selection: selectionArray}
        voteArray.push(voteData)
    }
    console.log(voteArray);

    PostDao.InsertPostDataToDB(articles,  users, voteArray).then(result =>{

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

exports.InsertComments = function(req, res) {
    const comments = new Comments();
    const articles = new Articles();
    const users = new Users();
    comments.setContent(req.body.commetContent);
    articles.setId(req.body.articleId);
    users.setId(req.body.userId);
    PostDao.InsertCommentsToDB(comments,articles,users).then(result =>{

        res.end(result);

    });
    

};