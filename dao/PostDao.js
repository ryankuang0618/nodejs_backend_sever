var config = require('../config/db');
const sql = require('mssql');


async function GetPostDataFromDB(){
    try{
        let pool = await sql.connect(config);
        let posts = await pool.request().query("SELECT * FROM Article");
        return posts.recordsets;

    }catch(error){

        console.log(error);
        return "failed";

    }
};

async function GetTopicDataFromDB(articles){
    try{
        let pool = await sql.connect(config);
        let req = await pool.request()
            .input('Article_Id', sql.Int, articles.getId())
            .query("SELECT Article.Article_title, Article.Article_content, Article.Article_time, Topic.Topic_title, Selection.Selection_Id, Selection.Selection_content, Selection.Selection_count  FROM Article JOIN Topic ON Article.Article_Id = Topic.Article_Id JOIN Selection ON Selection.Topic_Id = Topic.Topic_Id WHERE Topic.Article_Id = @Article_Id")
        console.log(req);
        return req.recordset;

    }catch(error){

        console.log(error);
        return "failed";

    }

};

async function InsertPostDataToDB(articles, topics, users, selectionArray){
    try{
        //console.log(selectionArray);
        let pool = await sql.connect(config);
        let req = await pool.request()
            .input('Article_title', sql.NVarChar, articles.getTitle())
            .input('Article_content', sql.NVarChar, articles.getContent())
            .input('Article_time', sql.NVarChar, articles.getTime())
            .input('User_Id', sql.Int, 1)
            .query("INSERT INTO Article (Article_title, Article_content, Article_time, User_Id) VALUES (@Article_title, @Article_content, @Article_time, @User_Id) SELECT SCOPE_IDENTITY() AS id;")
        let insertPostsNum = req.recordset[0].id;
        let req2 = await pool.request()
            .input('Topic_title', sql.NVarChar, topics.getTitle())
            .input('Article_Id', sql.Int, insertPostsNum)
            .query("INSERT INTO Topic (Topic_title, Article_Id) VALUES (@Topic_title, @Article_Id) SELECT SCOPE_IDENTITY() AS id;")
        let insertTopicNum = req2.recordset[0].id;
        for(let i = 0 ; i < selectionArray.length ; i++ ){
            let req3 = await pool.request()
                .input('Selection_content', sql.NVarChar, selectionArray[i].getContent())
                .input('Selection_count', sql.Int, 0)
                .input('User_Id', sql.Int, users.getId())
                .input('Topic_Id', sql.Int, insertTopicNum)
                .query("INSERT INTO Selection (Selection_content, Selection_count, User_Id, Topic_Id) VALUES (@Selection_content, @Selection_count, @User_Id, @Topic_Id)")
            console.log(req3);
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

module.exports ={
    GetPostDataFromDB : GetPostDataFromDB,
    InsertPostDataToDB : InsertPostDataToDB,
    UpdatePostDataToDB : UpdatePostDataToDB,
    DeletePostDataToDB : DeletePostDataToDB,
    GetTopicDataFromDB : GetTopicDataFromDB,
    InsertVoteCountToDB : InsertVoteCountToDB
}