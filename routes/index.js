let express   = require('express');
let appRouter = express(); 
let Chat  = require("./chat.router"); 
let Users  = require("./users.router"); 

appRouter.use('/chat',Chat);
appRouter.use('/users',Users);

module.exports = appRouter;