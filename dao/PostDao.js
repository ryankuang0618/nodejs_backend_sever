var config = require('../config/db');
const sql = require('mssql');


async function GetPostDataFromDB(){
    try{
        let pool = await sql.connect(config);
        let posts = await pool.request().query("SELECT * FROM Article ORDER BY Article_Id DESC");
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

async function GetBoardFromDB(){
    try{
        let pool = await sql.connect(config);
        let boards = await pool.request().query("SELECT * FROM Board");
        console.log("success");
        return boards.recordsets[0];
    }catch(error){

        console.log(error);
        return "failed";

    }
}
GetBoardFromDB

async function GetTopicDataFromDB(articles){
    try{
        let pool = await sql.connect(config);
        let reqArticle = await pool.request()
                .input('Article_Id', sql.Int, articles.getId())
                .query("SELECT * FROM Article  WHERE Article_Id = @Article_Id")
        let reqUser = await pool.request()
            .input('User_Id', sql.Int, reqArticle.recordset[0].User_Id)
            .query("SELECT * FROM [User] WHERE User_Id = @User_Id")

        let reqTopicId = await pool.request()
            .input('Article_Id', sql.Int, articles.getId())
            .query("SELECT Topic_Id FROM Topic WHERE Article_Id = @Article_Id")
        let Vote = []
        for(let TopicId_count = 0; TopicId_count < reqTopicId.recordset.length; TopicId_count ++ ){
            let reqTopic = await pool.request()
                    .input('Article_Id', sql.Int, articles.getId())
                    .input('Topic_Id', sql.Int, reqTopicId.recordset[TopicId_count].Topic_Id)
                    .query("SELECT * FROM Topic WHERE Article_Id = @Article_Id AND Topic_Id = @Topic_Id")
            let SelectionArray = [];
            for(let t = 0 ; t < reqTopic.recordset.length ; t ++){
                let reqSelection = await pool.request()
                    .input('Topic_Id', sql.Int, reqTopicId.recordset[TopicId_count].Topic_Id)
                    .query("SELECT * FROM Selection WHERE Topic_Id = @Topic_Id")
                SelectionArray.push(reqSelection.recordset)
            }
            let VoteArray = {voteTitle:reqTopic.recordset[0], voteSelection:SelectionArray[0]};
            Vote.push(VoteArray);
        }
        
        let resArray = {Article : reqArticle.recordset[0], User:reqUser.recordset[0], Vote:Vote};
        return resArray;

    }catch(error){

        console.log(error);
        return "failed";

    }

};

async function InsertPostDataToDB(articles, users, voteArray, boards){
    try{
        //console.log(selectionArray);
        let pool = await sql.connect(config);
        let req = await pool.request()
            .input('Article_title', sql.NVarChar, articles.getTitle())
            .input('Article_content', sql.NVarChar, articles.getContent())
            .input('Article_time', sql.NVarChar, articles.getTime())
            .input('Board_name', sql.NVarChar, boards.getName())
            .input('User_Id', sql.Int, users.getId())
            .query("INSERT INTO Article (Article_title, Article_content, Article_time, User_Id, Board_name) VALUES (@Article_title, @Article_content, @Article_time, @User_Id, @Board_name) SELECT SCOPE_IDENTITY() AS id;")
        console.log(req)
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

module.exports ={
    GetPostDataFromDB : GetPostDataFromDB,
    InsertPostDataToDB : InsertPostDataToDB,
    UpdatePostDataToDB : UpdatePostDataToDB,
    DeletePostDataToDB : DeletePostDataToDB,
    GetTopicDataFromDB : GetTopicDataFromDB,
    InsertVoteCountToDB : InsertVoteCountToDB,
    GetDataBase : GetDataBase,
    GetBoardFromDB : GetBoardFromDB
}