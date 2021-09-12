const express = require('express');
var NotificationController = require('../controllers/NotificationController');
const router = express.Router();

router.get("/Notification", NotificationController.Notification);

module.exports = router;