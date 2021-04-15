const express = require('express');
var PostController = require('../controllers/PostController');
var UserController = require('../controllers/UserController');
const router = express.Router();

router.get("/", function(req, res){
    res.send("Hello World !!!PDT!");
});

router.post("/GetALLPostData", PostController.GetALLPostData);

router.post("/InsertPostData", PostController.InsertPostData);



module.exports = router;