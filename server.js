
 let express		   = require('express');
 let bodyParser   = require('body-parser');
 let app			     = express();
 let helmet       = require('helmet'); 
 let compression  = require('compression');
 let cors 				 = require('cors');
 let Routes       = require('./routes/index');
 let errorlog     = require('./util/logger').errorlog;
 process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
 app.use(cors());
 app.use('/public', express.static(__dirname + '/public'));
 app.use(compression());
 app.use(helmet());
 app.set('views', __dirname + '/views');
 app.engine('html', require('ejs').renderFile);
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(bodyParser.json());
 /******* Start - Routes *******/
 app.use(function(err, req, res, next) {
   errorlog("ERROR 500 ",err);
   res.status(500).send('internal server error');
 });
 app.use('/api/v1',Routes);
 app.get('/',(req,res) => res.render('index.html'));
 /************** SockeIO */
let http = require('http');
let chatMessage = require("./controller/chat/ChatMessage");
const server = http.createServer(app);
const io = require('socket.io')(server, {
  path: '/test',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on('connection', function(socket){
  console.log('an user connected');
    socket.on('chat_connect', function(user){
      let message = new chatMessage();
          message.checkChatUsers(user.room, user.name).then((res)=>{
            console.log("USER LOGIN: "+JSON.stringify(res));
            if(res.length === 0){
              message.putUserRoom("users",user);
              io.sockets.emit('chat_connect', res.name);
            }else{
              let query = [{"name":user.name, "room":user.room}, {"$set": {"status":1}}];
              message.updateUserRoom("users", query).then((response)=>{
                io.sockets.emit('chat_connect', res.name);
              }).catch((error)=>{
                    console.log("ERROR: "+error);
              });
            }
          
          }).catch((error)=>{
            console.log("ERROR: "+JSON.stringify(error));
          });
    });

    socket.on('chat_message', function(msg){
      console.log("CHAT_MESSAGE: Uma mensagem foi enviada: "+JSON.stringify(msg));
      socket.join(msg.room);       
      let message = new chatMessage();
          message.putMessageRoom(msg.room,msg);
          message.getChatMessages(msg.room).then((res)=>{
           io.sockets.emit('chat_message', res);
           //io.to(msg.room).emit('chat_message', res); 
          }).catch((error)=>{
            console.log("ERROR: "+JSON.stringify(error));
          });
    });

    socket.on('change_room', function(data){
      console.log("Change Room: "+data.room);
      socket.join(data.room); 
      let message = new chatMessage();
          message.getChatMessages(data.room).then((res)=>{
          // io.sockets.emit('chat_message', res);
            io.to(data.room).emit('chat_message', res); 
          }).catch((error)=>{
            console.log("ERROR: "+JSON.stringify(error));
          });
    });

    socket.on('chat_exit', function(user){
      console.log("Exit Room: "+user.room);
      socket.leave(user.room, () => {
        let rooms = Object.keys(socket.rooms);
        console.log(rooms);       
      });      
      let message = new chatMessage();
          let query = [{"name":user.name, "room":user.room}, {"$set": {status:0}}];
            message.updateUserRoom("users", query).then((response)=>{
              console.log("EXIT: "+JSON.stringify(response));
              io.sockets.emit('chat_connect', response);
            }).catch((error)=>{
                  console.log("ERROR: "+error);
            });

    });
  
  socket.on('disconnect', function(){
  console.log('user disconnected');
  });

});




server.listen(3009,function(){
  	console.log("Aplicação iniciada na porta: http://localhost:3009");
    console.log("Ambiente: "+process.env.NODE_ENV);
  });
