

var config = require('./config.js');
var Hapi = require('hapi');
var Mongoose = require('mongoose');
var Good = require('good');
var routes = require('./routes');
var server = new Hapi.Server(config.server.hostname, config.server.port);


Mongoose.connect('mongodb://' 
	+ config.db.username + ':' 
	+ config.db.password + '@' 
	+ config.db.hostname + ':' 
	+ config.db.port + '/' 
	+ config.db.database);

routes.init(server);

server.pack.register(Good, function (err) {
    if (err) {
        throw err; 
    }


	server.start(function () {
	    console.log('Server started at: ' + server.info.uri);
	});
	
});