var config = require('../config/db');
const sql = require('mssql');

async function InsertUserData(users){
    try{
        //console.log(users);
        let pool = await sql.connect(config);
        let req = await pool.request()
            .input('User_Name', sql.NVarChar, users.getName())
            .input('User_email', sql.NVarChar, users.getEmail())
            .input('User_password', sql.NVarChar, users.getPassword())
            .query("INSERT INTO [User] (User_Name, User_email, User_password) VALUES (@User_Name, @User_email, @User_password)")
        console.dir(req);
        return 'success';
    }catch(err){
        console.log(err);
        return 'error';
    }
}
async function CheckLoginIsvaild(users){
    try{
        let pool = await sql.connect(config);
        let req = await pool.request()
            .input('User_email', sql.NVarChar, users.getEmail())
            .input('User_password', sql.NVarChar, users.getPassword())
            .query("SELECT * From [User] Where User_email = @User_email AND User_password = @User_password;")
        return req.recordsets;
        
    }catch(err){
        console.log(err);
        return 'error';
    }
}

module.exports ={
    InsertUserData : InsertUserData,
    CheckLoginIsvaild : CheckLoginIsvaild
}