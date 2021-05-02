const express = require('express');
var UserController = require('../controllers/UserController');
const router = express.Router();


router.post("/InsertUserData", UserController.InsertUserDataToDB);

router.post("/CheckLoginIsvaild", UserController.CheckLoginIsvaild);


module.exports = router;