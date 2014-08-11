var config = require('../config');

module.exports = exports = function(server){
	
	console.log('Loading Static Server');
	exports.static(server);
};

/**
 * GET /*
 * Static web service for our Angular Frontend
 *
 * @param server - The Hapi Server
 */

exports.static = function(server){
	
    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: { 
                path: config.static, 
                listing: false, 
                index: true 
            }
        }
    })
};