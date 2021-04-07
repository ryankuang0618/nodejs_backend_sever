var config = require('../config/db');
const sql = require('mssql');

async function GetPostDataFromDB(){
    try{
        let pool = await sql.connect(config);
        let posts = await pool.request().query("SELECT * FROM POST");
        return posts.recordsets;

    }catch(error){
        console.log(error);
    }
}

module.exports ={
    GetPostDataFromDB : GetPostDataFromDB
}