var Boom = require('boom');
var Joi = require('joi');
var Person = require('../models/person').Person;

module.exports = exports = function (server) {

    console.log('Loading contacts routes');
    exports.index(server);
    exports.create(server);
    exports.getById(server);
    exports.delete(server);
    exports.update(server);
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


/**
 * DELETE /contacts/{id}
 * Deletes contact from MongoDb with specifed id and returns null.
 *
 * @param server - The Hapi Server
 */
exports.delete = function (server) {

    server.route({
        method: 'DELETE',
        path: '/contacts/{id}',
        config: {
            validate: {
                params: {
                    id: Joi.string().alphanum().min(5).required()
                }
            }
        },
        handler: function (request, reply) {
            Person.findById(request.params.id, function (err, person) {
                 if(!err && person) {
                    person.remove();
                    reply('success');
                } else if(!err) {
                    // Couldn't find the object.
                    reply(Boom.notFound());
                } else {
                    console.log(err);
                    reply(Boom.badRequest("Could not delete contact"));
                }
            });
        }
    })
};

/**
 * POST /new
 * Creates a new person in the datastore.
 *
 * @param server - The Hapi Serve
 */
exports.create = function (server) {
    var person;

    server.route({
        method: 'POST',
        path: '/contacts',
        handler: function (request, reply) {

            person = new Person(request.payload);
           
            person.save(function (err) {
                if (!err) {
                    reply(person).created('/contacts/' + person._id);    // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
    });
};

/**
 * PUT /contacts/{id}
 * Updates a person in the datastore by id.
 *
 * @param server - The Hapi Serve
 */
exports.update = function (server) {
    var person;

    server.route({
        method: 'PUT',
        path: '/contacts/{id}',
        config: {
            validate: {
                params: {
                    id: Joi.string().alphanum().min(5).required()
                }
            }
        },
        handler: function (request, reply) {
            Person.findByIdAndUpdate(request.params.id, request.payload, function (err, person) {
                if (!err) {
                  reply(person).created('/contacts/' + person._id);
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
    });
};


/**
 * Formats an error message that is returned from Mongoose.
 *
 * @param err The error object
 * @returns {string} The error message string.
 */
function getErrorMessageFrom(err) {
    var errorMessage = '';

    if (err.errors) {
        for (var prop in err.errors) {
            if(err.errors.hasOwnProperty(prop)) {
                errorMessage += err.errors[prop].message + ' '
            }
        }
    } else {
        errorMessage = err.message;
    }
    return errorMessage;
}