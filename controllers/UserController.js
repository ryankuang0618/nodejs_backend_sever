var Users = require('../models/Users');
var UserDao = require('../dao/UserDao');

exports.InsertUserDataToDB = function(req, res) {
    const users = new Users();
    users.setName(req.body.name);
    users.setEmail(req.body.email);
    users.setPassword(req.body.password);
    users.setFirebaseToken(req.body.token);

    UserDao.InsertUserData(users).then(result =>{

        res.json(result);

    });
};

exports.CheckLoginIsvaild = function(req, res) {
    const users = new Users();
    users.setEmail(req.body.email);
    users.setPassword(req.body.password);
    users.setFirebaseToken(req.body.token);
    UserDao.CheckLoginIsvaild(users).then(result =>{
        
        res.send(result);

    });
};