
var Hapi = require('hapi');
var config = require('./config.js')
var db = config.db;
var server = new Hapi.Server('localhost', 8000);
var routes = require('./routes');
var Mongoose = require('mongoose');

Mongoose.connect('mongodb://' 
	+ db.username + ':' 
	+ db.password + '@' 
	+ db.hostname + ':' 
	+ db.port + '/' 
	+ db.database);

routes.init(server);

server.start(function () {
    console.log('Server started at: ' + server.info.uri);
});