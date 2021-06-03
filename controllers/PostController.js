var Articles = require('../models/Articles');
var Topics = require('../models/Topics');
var Selections = require('../models/Selections');
var Users = require('../models/Users');
var Boards = require('../models/Boards');
var PostDao = require('../dao/PostDao');

Date.prototype.format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小時
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" +  k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +  o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

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
    articles.setId(req.query.articleId);
    PostDao.GetTopicDataFromDB(articles).then(result =>{
        res.json(result);
    })
};

exports.GetBoard = function(req, res) {
    PostDao.GetBoardFromDB().then(result =>{
        res.json(result);
    })
};

exports.CheckIsableVote = function(req, res){
    const users = new Users();
    const articles = new Articles();
    users.setId(req.query.userId);
    articles.setId(req.query.articleId);
    PostDao.CheckIsableVoteFromDB(users, articles).then(result =>{
        res.json(result);
    })
}

exports.InsertPostData = function(req, res) {
    const articles = new Articles();
    const users = new Users();
    const boards = new Boards();
    articles.setTitle(req.body.topicTitle);
    articles.setContent(req.body.topicContent);
    var time = new Date().format("yyyy-MM-dd hh:mm:ss");
    articles.setTime(time);
    boards.setName(req.body.Board_name);
    users.setId(req.body.userId);
    let voteArray = [];
    let selectionArray = [];
    for(let t = 0 ; t < req.body.vote.length; t++){
        const topics = new Topics();
        topics.setTitle(req.body.vote[t].voteTitle);
        for(let i = 0 ; i < req.body.vote[t].selections.length; i++){
            
            const selections = new Selections();
            selections.setContent(req.body.vote[t].selections[i].selectionContent);
            selectionArray.push(selections)

        }
        let voteData = {topic: topics, selection: selectionArray}
        voteArray.push(voteData)
    }
    PostDao.InsertPostDataToDB(articles,  users, voteArray, boards).then(result =>{

        res.end(result);

    });
};

exports.InsertVoteCount = function(req, res) {
    const selections = new Selections();
    const users = new Users();
    const articles = new Articles();
    users.setId(req.body.userId);
    articles.setId(req.body.articleId);
    selections.setId(req.body.selectionId);
    PostDao.InsertVoteCountToDB(selections, users, articles).then(result =>{

        res.end(result);

    });
};