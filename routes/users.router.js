let express         = require('express');
let router          = express();
let chatMessage = require('../controller/chat/ChatMessage'); 


     router.get('/:room',function(req,res,next){    
      let message = new chatMessage();
      let room = req.params.room;
      message.getChatUsers(room).then((response)=>{
        res.status(200).json(response);
      }).catch((error)=>{
        console.log("ERROR: "+JSON.stringify(error));
        res.status(400).json({error:error});
      });
   });

 module.exports=router;