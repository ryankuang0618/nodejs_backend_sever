const express = require('express');
var PostController = require('../controllers/PostController');
const router = express.Router();



router.get("/", PostController.GetALLPostData);

router.post("/", PostController.InsertPostData);



module.exports = router;