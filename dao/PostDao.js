var config = require('../config/db');
const sql = require('mssql');


async function GetPostDataFromDB(){
    try{
        let pool = await sql.connect(config);
        let posts = await pool.request().query("SELECT * FROM Article");
        return posts.recordsets[0];

    }catch(error){

        console.log(error);
        return "failed";

    }
};

async function GetDataBase(sqll){
    try{
        let pool = await sql.connect(config);
        let posts = await pool.request().query(sqll);
        console.log("success");
        return posts.recordsets;
    }catch(error){

        console.log(error);
        return "failed";

    }
}

async function GetTopicDataFromDB(articles){
    try{
        let pool = await sql.connect(config);
        let reqArticle = await pool.request()
                .input('Article_Id', sql.Int, articles.getId())
                .query("SELECT * FROM Article  WHERE Article_Id = @Article_Id")
        let reqUser = await pool.request()
            .input('User_Id', sql.Int, reqArticle.recordset[0].User_Id)
            .query("SELECT * FROM [User] WHERE User_Id = @User_Id")
        let reqTopic = await pool.request()
                .input('Article_Id', sql.Int, articles.getId())
                .query("SELECT * FROM Topic WHERE Article_Id = @Article_Id")
        let SelectionArray = [];
        for(let t = 0 ; t < reqTopic.recordset.length ; t ++){
            let reqSelection = await pool.request()
                .input('Topic_Id', sql.Int, reqTopic.recordset[t].Topic_Id)
                .query("SELECT * FROM Selection WHERE Topic_Id = @Topic_Id")
            SelectionArray.push(reqSelection.recordset)
        }
        let VoteArray = {voteTitle:reqTopic.recordset[0], voteSelection:SelectionArray[0]};
        let resArray = {Article : reqArticle.recordset[0], User:reqUser.recordset[0], Vote:VoteArray};
        return resArray;

    }catch(error){

        console.log(error);
        return "failed";

    }

};

async function InsertPostDataToDB(articles, users, voteArray){
    try{
        //console.log(selectionArray);
        let pool = await sql.connect(config);
        let req = await pool.request()
            .input('Article_title', sql.NVarChar, articles.getTitle())
            .input('Article_content', sql.NVarChar, articles.getContent())
            .input('Article_time', sql.NVarChar, articles.getTime())
            .input('User_Id', sql.Int, users.getId())
            .query("INSERT INTO Article (Article_title, Article_content, Article_time, User_Id) VALUES (@Article_title, @Article_content, @Article_time, @User_Id) SELECT SCOPE_IDENTITY() AS id;")
        let insertPostsNum = req.recordset[0].id;
        for(let t = 0 ; t < voteArray.length; t++){
            let req2 = await pool.request()
                .input('Topic_title', sql.NVarChar, voteArray[t].topic.getTitle())
                .input('Article_Id', sql.Int, insertPostsNum)
                .query("INSERT INTO Topic (Topic_title, Article_Id) VALUES (@Topic_title, @Article_Id) SELECT SCOPE_IDENTITY() AS id;")
            let insertTopicNum = req2.recordset[0].id;
            for(let i = 0 ; i < voteArray[t].selection.length ; i++ ){
                let req3 = await pool.request()
                    .input('Selection_content', sql.NVarChar, voteArray[t].selection[i].getContent())
                    .input('Selection_count', sql.Int, 0)
                    .input('User_Id', sql.Int, users.getId())
                    .input('Topic_Id', sql.Int, insertTopicNum)
                    .query("INSERT INTO Selection (Selection_content, Selection_count, User_Id, Topic_Id) VALUES (@Selection_content, @Selection_count, @User_Id, @Topic_Id)")
                console.log(req3);
            }
        }
        return 'success';
    }catch(err){
        console.log(err);

        return 'failed';
    }
    
};

async function InsertVoteCountToDB(selections){
    try{
        let pool = await sql.connect(config);
        let req = await pool.request()
            .input("Selection_Id", sql.Int, selections.getId())
            .query("Update Selection SET  Selection_count = Selection_count+1 WHERE Selection_Id = @Selection_Id")
            console.log(req);
        
        return 'success';
    }catch(err){
        console.log(err);

        return 'failed';
    }

}

async function UpdatePostDataToDB(){
    
};

async function DeletePostDataToDB(){
    
};

async function InsertCommentsToDB(comments,articles,users){
    try{
        let pool = await sql.connect(config);
        let req = await pool.request()
            .input("Comment_content", sql.NVarChar, comments.getContent())
            .input("Article_Id",sql.Int, articles.getId())
            .input("User_Id",sql.Int, users.getId())
            .query("Insert into Comment(Comment_content,User_Id,Article_Id) VALUES (@Comment_content, @User_Id, @Article_Id)  ")

        return 'seccess';

    }catch(err){
        console.log(err);
        return 'failed';
    }
};


module.exports ={
    GetPostDataFromDB : GetPostDataFromDB,
    InsertPostDataToDB : InsertPostDataToDB,
    UpdatePostDataToDB : UpdatePostDataToDB,
    DeletePostDataToDB : DeletePostDataToDB,
    GetTopicDataFromDB : GetTopicDataFromDB,
    InsertVoteCountToDB : InsertVoteCountToDB,
    GetDataBase : GetDataBase,
    InsertCommentsToDB :InsertCommentsToDB
}