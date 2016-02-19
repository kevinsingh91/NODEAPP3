var mongoClient = require("mongodb").MongoClient;
var docDBUTIL = require('./docDBUTIL.js');

function TaskDao(mongoDBClient, DBpath) {
    this.client = mongoDBClient;
    this.path = DBpath;
    
    this.database = null;
    this.collection = null;
}

module.exports = TaskDao;

TaskDao.prototype = {
    init: function (callback) {
        var self = this;
        self.client.connect(self.path, function (err, db) {
            
            if (err) {
                console.log("can not connect to db : " + err);
                callback(err,null);
            }
            else {
                console.log("Connection with db successful");
                self.database = db;
                self.collection = db.collection('Users');
            }
        });

    },

    showall: function (callback) {
        var self = this;
        docDBUTIL.showallusers(self.collection, function (err, data) {
        if (err) {
                callback(err,null);
        }
            else {
                callback(null,data)
            }
        });

    }
}