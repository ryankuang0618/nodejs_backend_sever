const express = require('express');
var PostController = require('../controllers/PostController');
const router = express.Router();

router.get("/", function(req, res){
    res.send("Hello World");
});

router.post("/", PostController.GetPostData);

module.exports = router;