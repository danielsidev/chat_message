let express         = require('express');
let router          = express();
let chatMessage = require('../controller/chat/ChatMessage'); 

    router.get('/rooms',function(req,res,next){    
        let message = new chatMessage();

        message.getChatRooms("rooms").then((response)=>{
          res.status(200).json(response);
        }).catch((error)=>{
          console.log("ERROR: "+JSON.stringify(error));
          res.status(400).json({error:error});
        });
     });

     router.get('/messages/:room',function(req,res,next){    
      let message = new chatMessage();
      let room = req.params.room;
      console.log("room:"+room);
      message.getChatMessages(room).then((response)=>{
        res.status(200).json(response);
      }).catch((error)=>{
        console.log("ERROR: "+JSON.stringify(error));
        res.status(400).json({error:error});
      });
   });

 module.exports=router;