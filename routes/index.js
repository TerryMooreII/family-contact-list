exports.init = function(server) {
  console.log('Loading routes');

  require('./contacts')(server);
};	