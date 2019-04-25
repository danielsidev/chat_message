let errorlog          = require('../../util/logger').errorlog;
let successlog        = require('../../util/logger').successlog;
let ChatDao      = require('../../model/dao/ChatDao');
let moment = require('moment');
    moment.locale('pt-br');  
let config = require('config');    
class ChatMessage extends ChatDao{
    constructor(){
        super();
    }

    getChatMessages(collection){
        return new Promise((resolve, reject)=>{
            let query = [{},{}];
            let now = moment().format('YYYY-MM-DDTHH:mm:ss')
            this.getMessageFind(collection, query).then((response) => {
                let messages = [];
                response.map((res) =>{
                    messages.push({
                                    "room":res.room,
                                    "name":res.name,
                                    "createAt":moment(res.createAt).format("DD/MM/YYYY HH:mm:ss"),
                                    "message":res.message
                                });
                });                
    successlog("ChatMessage:getChatMessages:"+now,config.get('api.messaging.get_message.success_get'));
                resolve(messages);
            
            }).catch((error)=>{
                console.log("ChatMessage:getChatMessages:ERROR: "+JSON.stringify(error));
                errorlog("ChatMessage:getChatMessages:"+now,JSON.stringify(error));
                reject(error);
            });
        });
    }
    checkChatUsers(room, name){
        return new Promise((resolve, reject)=>{
            let query = [{"room":room, "name":name},{}];
            let now = moment().format('YYYY-MM-DDTHH:mm:ss')
            this.getDataFind("users", query).then((response) => {       
                successlog("ChatMessage:getChatUsers:"+now,"Encontrou o usu[ario(a) com sucesso!");
                resolve(response);            
            }).catch((error)=>{
                console.log("ChatMessage:getChatUsers:ERROR: "+JSON.stringify(error));
                errorlog("ChatMessage:getChatUsers:"+now,JSON.stringify(error));
                reject(error);
            });
        });
    }

    getChatUsers(room){
        return new Promise((resolve, reject)=>{
            let query = [{"room":room},{}];
            let now = moment().format('YYYY-MM-DDTHH:mm:ss')
            this.getDataFind("users", query).then((response) => {    
                console.log("USERS: "+JSON.stringify(response));       
                successlog("ChatMessage:getChatUsers:"+now,"Retornou usuários com sucesso!");
                resolve(response);            
            }).catch((error)=>{
                console.log("ChatMessage:getChatUsers:ERROR: "+JSON.stringify(error));
                errorlog("ChatMessage:getChatUsers:"+now,JSON.stringify(error));
                reject(error);
            });
        });
    }
    getChatRooms(collection){
        return new Promise((resolve, reject)=>{
            let query = [{},{"name":1, "_id":0}];
            let now = moment().format('YYYY-MM-DDTHH:mm:ss')
            this.getMessageFind(collection, query).then((response) => {
    successlog("ChatMessage:getChatRooms:"+now,config.get('api.messaging.get_rooms.success_get'));
                resolve(response);            
            }).catch((error)=>{
                console.log("ChatMessage:getChatMessages:ERROR: "+JSON.stringify(error));
                errorlog("ChatMessage:getChatMessages:"+now,JSON.stringify(error));
                reject(error);
            });
        });
    }

    putMessageRoom(collection,query){
        let now = moment().format('YYYY-MM-DDTHH:mm:ss');
        
        query['createAt'] = new Date();
        this.putData(collection,query).then((response)=>{
            if(response){
        console.log("ChatMessage:putMessageRoom: "+config.get('api.messaging.put_message.success_put'));
        successlog("ChatMessage:putMessageRoom:"+now,config.get('api.messaging.put_message.success_put'));
            }else{
        console.error("ChatMessage:putMessageRoom: "+config.get('api.messaging.put_message.error_put'));
                errorlog("ChatMessage:putMessageRoom:"+now,JSON.stringify(error));
            }
        }).catch((error)=>{
            console.error("ChatMessage:putMessageRoom: "+JSON.stringify(error));
            errorlog("ChatMessage:putMessageRoom:"+now,JSON.stringify(error));
        });

    }

    putUserRoom(collection,query){
        let now = moment().format('YYYY-MM-DDTHH:mm:ss');
        
        query['createAt'] = new Date();
        this.putData(collection,query).then((response)=>{
            if(response){
        console.log("ChatMessage:putUserRoom: Entrou no chatcom sucesso! : "+now);
        successlog("ChatMessage:putUserRoom:"+now,"Entrou no chat com sucesso!");
            }else{
        console.error("ChatMessage:putUserRoom: "+"Não conseguiu entrar: "+now);
                errorlog("ChatMessage:putUserRoom:"+now,"Não conseguiu entrar.");
            }
        }).catch((error)=>{
            console.error("ChatMessage:putUserRoom: "+JSON.stringify(error));
            errorlog("ChatMessage:putUserRoom:"+now,JSON.stringify(error));

        });

    }


    updateUserRoom(collection,query){
        return new Promise((resolve, reject)=>{
        let now = moment().format('YYYY-MM-DDTHH:mm:ss');
        query['createAt'] = new Date();
        this.updateData(collection,query).then((response)=>{
            if(response){
        console.log("ChatMessage:putUserRoom: Atualizou com sucesso! : "+now);
        successlog("ChatMessage:putUserRoom:"+now,"Atualizou status com sucesso!");
            }else{
        console.error("ChatMessage:putUserRoom: "+"Não conseguiu atualizar: "+now);
                errorlog("ChatMessage:putUserRoom:"+now,"Não conseguiu atualizar.");
            }
            resolve("Atualizou com sucesso!");
        }).catch((error)=>{
            console.error("ChatMessage:putUserRoom: "+JSON.stringify(error));
            errorlog("ChatMessage:putUserRoom:"+now,JSON.stringify(error));
            reject("ERROR: Não atualizou!");
        });
    });
    }
}

module.exports = ChatMessage; 