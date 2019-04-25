const MongoClient = require('mongodb').MongoClient;
class MongoDbClient{
    constructor(Mongo){
       this.mongo = Mongo;
       this.rs  = (this.mongo.replicaSet) ? "?replicaSet="+this.mongo.replicaSet : "";
       this.data = (this.mongo.username && this.mongo.password)?'mongodb://'+this.mongo.username+':'+this.mongo.password+'@'+this.mongo.host.join(',')+':'+this.mongo.port+'/'+this.mongo.database+this.rs:'mongodb://'+this.mongo.host+':'+this.mongo.port+'/'+this.mongo.database;
       this.uri =this.data;
       this.options = {
            autoReconnect: true,
            poolSize: 20,
            keepAlive: 500000,
            connectTimeoutMS: 1200000,
            socketTimeoutMS: 12000000,
            readPreference: 'secondaryPreferred',
            replicaSet: this.mongo.replicaSet
        };   
      
    }

    getConnectionAggregate(collectionName, query){
        return new Promise((resolve, reject) =>{
            MongoClient.connect( this.uri, this.options, (err, db) => {
                if(err){
                 console.error("Can not connect: Error: "+err);
                 reject(err);
                }else{
                 console.log("Connected successfully to server");
                 let joinCollection  = db.collection(collectionName);
                 let cursor =     joinCollection.aggregate(query).toArray(function(err, docs) {
                     if(err){
                      db.close();
                      return {"error":err,"dados": null};
                     }else{
                      console.log("Found the following records");
                      db.close();
                      resolve(docs);
                     }
                    });
                }
              });
        });
        
    }

    getConnection(collectionName, query){ /** query[0]=== query {"item":"value"} | query[1] === fields { fieldA:1, fieldB:1, fieldC:1 } */
        return new Promise((resolve, reject) =>{
            MongoClient.connect( this.uri,  (err, db) => {
                if(err){
                 console.error("Can not connect: Error: "+err);
                 reject(err);
                }else{
                 console.log("Connected successfully to server");
                 db.collection(collectionName).find(query[0], query[1]).sort({"_id":-1}).toArray(function(err, docs) {
                     if(err){
                      db.close();
                      return {"error":err,"dados": null};
                     }else{
                      console.log("Found the following records");
                      db.close();
                      resolve(docs);
                     }
                    });
                }
              });
        });
        
    }

    putCollection(collectionName, query){
        return new Promise((resolve, reject) =>{
            MongoClient.connect( this.uri, this.options, (err, db) => {
                if(err){
                 console.error("Can not connect: Error: "+err);
                 reject(err);
                }else{
                 console.log("Connected successfully to server");
                    db.collection(collectionName).insert(query, (err, result) => { 
                        if(err){
                            console.log("INSERT ERROR: "+JSON.stringify(err));
                        db.close();
                        reject(err);                      
                        }else{
                        console.log("INSERT SUCCESS!");
                        db.close();
                        resolve(true);
                        }
                    });
                }
            });
        });
    }


    updateCollection(collectionName, query){
        return new Promise((resolve, reject) =>{
            MongoClient.connect( this.uri, this.options, (err, db) => {
                if(err){
                 console.error("Can not connect: Error: "+err);
                 reject(err);
                }else{
                 console.log("Irá atualizar: "+JSON.stringify(query));
                    db.collection(collectionName).updateOne(query[0], query[1], (err, result) => { 
                        if(err){
                            console.log("UPDATE ERROR: "+JSON.stringify(err));
                        db.close();
                        reject(err);                      
                        }else{
                        console.log("UPDATE SUCCESS!");
                        db.close();
                        resolve(true);
                        }
                    });
                }
            });
        });
    }

    closeConnection(){
        this.db.close();
    }



}

module.exports = MongoDbClient;