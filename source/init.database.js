
// Copy and paste each block of sql code into mongodb terminal one by one. 
// Paste the next code block, only after the previous be execute.

//Conected in your mongoDB, make:

/** Create database Chat */
use chat;
/** Create the collection messages */
db.createCollection("sala", {autoIndexId : true});
db.createCollection("rooms", {autoIndexId : true});
db.createCollection("users", {autoIndexId : true});

/** Insert Data */
db.rooms.insert({"name":"sala"});
db.users.insertMany([
    {
        "_id" : ObjectId("5cbf920b4bc16c4f489f26f9"),
        "name" : "Daniel Siqueira",
        "room" : "sala",
        "status" : 0,
        "createAt" : ISODate("2019-04-25T01:56:23.222Z")
    }
    ,
    {
        "_id" : ObjectId("5cbf97864bc16c4f489f279d"),
        "name" : "Daniel Mendonça",
        "room" : "sala",
        "status" : 0,
        "createAt" : ISODate("2019-04-25T01:56:23.222Z")
    }
    ,
    {
        "name" : "Mariana Dias",
        "room" : "sala",
        "status" : 0,
        "createAt" : ISODate("2019-04-25T01:56:23.222Z")
    }
    ,
    {
     
        "name" : "Pedro",
        "room" : "sala",
        "status" : 0,
        "createAt" : ISODate("2019-04-25T01:56:23.222Z")
    }
    ,
    {
        
        "name" : "João",
        "room" : "sala",
        "status" : 0,
        "createAt" : ISODate("2019-04-25T02:17:29.720Z")
    }]);


