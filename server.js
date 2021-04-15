const express = require("express");
const server = express();
const bodyParser = require('body-parser');
const PORT = 3000;
server.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routers/PostService');
const usersRoute = require('./routers/UserService');

server.use('/posts',postsRoute);

server.use('/users',usersRoute);

//Iisten
server.listen(PORT,function(){
    console.log("Server is ready at " + PORT);
});