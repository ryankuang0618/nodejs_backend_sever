var config = require('../config/db');
const sql = require('mssql');

async function InsertUserData(users){
    try{
        const admin = require('firebase-admin');
        const serviceAccount = require('/Users/howardchen/Documents/GitLab/backend_server/serviceAccountKey.json');
        admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
        });
        const uid = 'some-uid';
        const additionalClaims = { 
            premiumAccount: true
        };
        admin
            .auth()
            .createCustomToken(uid, additionalClaims)
            .then((customToken) => {
                users.setFirebaseToken(customToken);
                console.log(users.getFirebaseToken());
            })
            
        //console.log(users);
        let pool = await sql.connect(config);
        let req = await pool.request()
            .input('User_Name', sql.NVarChar, users.getName())
            .input('User_email', sql.NVarChar, users.getEmail())
            .input('User_password', sql.NVarChar, users.getPassword())
            .input('User_token', sql.NVarChar, users.getFirebaseToken())
            .query("INSERT INTO [User] (User_Name, User_email, User_password,User_token) VALUES (@User_Name, @User_email, @User_password, @User_token)")
        console.dir(req);
        return 'success';
    }catch(err){
        console.log(err);
        return 'failed';
    }
}

async function CheckLoginIsvaild(users){
    try{
        let pool = await sql.connect(config);
        let req = await pool.request()
            .input('User_email', sql.NVarChar, users.getEmail())
            .input('User_password', sql.NVarChar, users.getPassword())
            .query("SELECT * From [User] Where User_email = @User_email AND User_password = @User_password;")
        if(req.rowsAffected[0] == 0){
            return 'failed';
        }else{
            return req.recordsets[0][0];
        }
        
    }catch(err){
        console.log(err);
        return 'failed';
    }
}

module.exports ={
    InsertUserData : InsertUserData,
    CheckLoginIsvaild : CheckLoginIsvaild
}