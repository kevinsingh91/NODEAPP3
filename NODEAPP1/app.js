
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var routes = require('./routes');
var http = require('http');
var path = require('path');

//new db stuff
var mongoClient = require("mongodb").MongoClient;
var config = require('./config');
var TaskList = require('./routes/tasklist.js');
var TaskDao = require('./Models/TaskDAO.js');
var docDBUTIL = require('./Models/docDBUTIL.js');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/practicepage', routes.practicepage);


var server = http.createServer(app).listen(app.get('port'), function () {
       console.log('Express server listening on port ' + app.get('port'));
    });

var io = require('socket.io').listen(server);


io.on("connection",function (socket) {
    console.log('a new user connected');
    //one more event handler inside this function..
    socket.on("disconnect", function (socket) {
        console.log("user has disconnected.."); 
    });
    //one more event handler when client sends a message..
    socket.on("clientsent",function (msg , fn) {
        io.emit("serversent", msg);
        fn("success");   
    });
});


//here we declare a new ddb client
var taskDao = new TaskDao(mongoClient, config.path);

//this is not needed right now.. it contains component or controll specific code.. look at it later..
var taskList = new TaskList(taskDao);
taskDao.init(function (err) { 
if (err) {
        console.log("Problem Connecting to DB ::: " + err );
}
else {
        console("MDB connection successful !!");
}
});

app.get('/dbandsocket', taskList.showTasks.bind(taskList));



