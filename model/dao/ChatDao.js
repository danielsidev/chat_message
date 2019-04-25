
let MongoDb      = require('../connection/MongoDbClient');
let config       = require('config');
let mongoConfig  = config.get('api.mongodb.config');


class ChatDao extends MongoDb{
    constructor(){        
        super(mongoConfig);        
    }

    getMessageAggregate(query){
        return new Promise((resolve, reject)=>{
            let nameCollection = "messages";                   
               this.getConnectionAggregate(nameCollection, query).then((res) =>{
                    resolve(res);                
               }).catch((error)=>{
                    reject(error);
               });
        });
    }

    getMessageFind(nameCollection, query){/** query[0]=== query {"item":"value"} | query[1] === fields { fieldA:1, fieldB:1, fieldC:1 } */
        return new Promise((resolve, reject)=>{
            let nameCollectionDb = (nameCollection===null || nameCollection===undefined)?"messages":nameCollection;                   
               this.getConnection(nameCollectionDb, query).then((res) =>{
                    resolve(res);                
               }).catch((error)=>{
                    reject(error);
               });
        });
    }

    getDataFind(nameCollection, query){/** query[0]=== query {"item":"value"} | query[1] === fields { fieldA:1, fieldB:1, fieldC:1 } */
    return new Promise((resolve, reject)=>{
        let nameCollectionDb = (nameCollection===null || nameCollection===undefined)?"messages":nameCollection;                   
           this.getConnection(nameCollectionDb, query).then((res) =>{
                resolve(res);                
           }).catch((error)=>{
                reject(error);
           });
    });
}

    putData(nameCollection, query){
        return new Promise((resolve, reject)=>{
            let nameCollectionDb = (nameCollection===null || nameCollection===undefined)?"messages":nameCollection;                   
               this.putCollection(nameCollectionDb, query).then((res) =>{
                    resolve(res);                
               }).catch((error)=>{
                    reject(error);
               });
        });
    }

    updateData(nameCollection, query){
        return new Promise((resolve, reject)=>{
            let nameCollectionDb = nameCollection;                
               this.updateCollection(nameCollectionDb, query).then((res) =>{
                    resolve(res);                
               }).catch((error)=>{
                    reject(error);
               });
        });
    }

}

module.exports = ChatDao;