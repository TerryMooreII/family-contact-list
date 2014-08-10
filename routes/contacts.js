var Boom = require('boom');
var Joi = require('joi');
var Person = require('../models/person').Person;

module.exports = exports = function (server) {

    console.log('Loading contacts routes');
    exports.index(server);
    // exports.create(server);
     exports.getById(server);
    // exports.remove(server);
};


/**
 * GET /contacts
 * Gets all the contacts from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.index = function (server) {
    // GET /events
    server.route({
        method: 'GET',
        path: '/contacts',
        handler: function (request, reply) {
            Person.find({}, function (err, events) {
                if (!err) {
                    reply(events);
                } else {
                    reply(Boom.badImplementation(err)); 
                }
            });
        }
    });
};


/**
 * GET /contacts/{id}
 * Gets contact from MongoDb with specifed id and returns them.
 *
 * @param server - The Hapi Server
 */
exports.getById = function (server) {

    server.route({
        method: 'GET',
        path: '/contacts/{id}',
        config: {
            validate: {
                params: {
                    id: Joi.string().alphanum().min(5).required()
                }
            }
        },
        handler: function (request, reply) {
            Person.findById(request.params.id, function (err, event) {
                if (!err && event) {
                    reply(event);
                } else if (err) {
                    console.log(err);
                    reply(Boom.notFound());
                } else {
                    reply(Boom.notFound());
                }
            });
        }
    })
};