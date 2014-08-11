

exports.init = function(server) {
  console.log('Loading routes');

  require('./contacts')(server);

  //Must be last route!
  //Loads the static web content.
  require('./static')(server);
};	