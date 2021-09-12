const express = require("express");
const server = express();
const bodyParser = require('body-parser');
const PORT = 8080;
var http = require('http').createServer(server);
var io = require('socket.io')(http);
server.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routers/PostService');
const usersRoute = require('./routers/UserService');
const notificationRoute = require('./routers/NotidicationService')

server.use('/api/PDT/posts',postsRoute);

server.use('/api/PDT/users',usersRoute);

server.use('/api/PDT/notifications',notificationRoute)

//Iisten
server.listen(PORT,function(){
    console.log("Server is ready at " + PORT);
});

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
    console.log('new client connected');
    socket.emit('connection', null);
});