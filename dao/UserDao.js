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
            .query("SELECT Count(User_id) AS userCount From [User] Where User_email = @User_email AND User_password = @User_password;")
        if(req.recordsets[0][0].userCount > 0){
            return 'success';
        }else{
            return 'error';
        }
        
    }catch(err){
        console.log(err);
        return 'error';
    }
}

module.exports ={
    InsertUserData : InsertUserData,
    CheckLoginIsvaild : CheckLoginIsvaild
}