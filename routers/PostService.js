const express = require('express');
var PostController = require('../controllers/PostController');
const router = express.Router();



router.get("/GetALLPostData", PostController.GetALLPostData);

router.get("/GetTopicData", PostController.GetTopicData);

router.get("/GetDataBase", PostController.GetDataBase);

router.get("/GetBoard", PostController.GetBoard);

router.get("/CheckIsableVote", PostController.CheckIsableVote);

router.get("/GetMyPost", PostController.GetMyPost);

router.post("/InsertPostData", PostController.InsertPostData);

router.post("/InsertVoteCount", PostController.InsertVoteCount);

router.post("/InsertComments", PostController.InsertComments);

router.post("/DeletePostData", PostController.DeletePostData);




module.exports = router;