var mongoClient = require("mongodb").MongoClient;

function TaskList(taskDao) {
    this.taskDao = taskDao;
}

module.exports = TaskList;

TaskList.prototype = {
    showTasks: function (req, res) {
        var self = this;
    self.taskDao.showall( function (err, data) {
            if (err) {
                throw (err);
            }
            //res.send(data);
            res.render('dbandsocket', {
                title: 'MONGO says Hi.. ',
                users: data
                //users: [{name:"asdas",Rloe:"123"}, { name: "qweqw", Rloe: "234"}]
            });
        });
    }

};