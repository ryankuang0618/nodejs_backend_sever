const express = require("express");
const server = express();
const bodyParser = require('body-parser');
const PORT = 3000;
server.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routers/PostService');

server.use('/posts',postsRoute);

//Iisten
server.listen(PORT,function(){
    console.log("Server is ready at " + PORT);
});