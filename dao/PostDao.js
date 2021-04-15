var config = require('../config/db');
const sql = require('mssql');


async function GetPostDataFromDB(){
    try{
        let pool = await sql.connect(config);
        let posts = await pool.request().query("SELECT * FROM Article");
        return posts.recordsets;

    }catch(error){
        console.log(error);
    }
};

async function InsertPostDataToDB(articles){
    try{
        //console.log(articles);
        let pool = await sql.connect(config);
        let req = await pool.request()
            .input('Article_title', sql.NVarChar, articles.getTitle())
            .input('Article_content', sql.NVarChar, articles.getContent())
            .input('Article_time', sql.NVarChar, articles.getTime())
            .input('User_Id', sql.Int, 1)
            .query("INSERT INTO Article (Article_title, Article_content, Article_time, User_Id) VALUES (@Article_title, @Article_content, @Article_time, @User_Id) SELECT SCOPE_IDENTITY() AS id;")
        console.log(req);
        return 'success';
    }catch(err){
        console.log(err);

        return 'error';
    }
    
};

async function UpdatePostDataToDB(){
    
};

async function DeletePostDataToDB(){
    
};

module.exports ={
    GetPostDataFromDB : GetPostDataFromDB,
    InsertPostDataToDB : InsertPostDataToDB,
    UpdatePostDataToDB : UpdatePostDataToDB,
    DeletePostDataToDB : DeletePostDataToDB
}