var mongoClient = require("mongodb").MongoClient;

//this part is for basic queries that can be reused all over app...

var DocDBUtils = {
    showallusers : function (collectionID, callback) {
        
        collectionID.find().toArray(function (err, data) {
            if (err) {
                callback(err,null);
            }
            else {
                //console.log(data);
                callback(null,data);
            }
        })

    }

};

module.exports = DocDBUtils;