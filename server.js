var mongoose = require('mongoose/');
var configurationSchema = mongoose.Schema({ apiToken: String });
var Configuration = mongoose.model('Configuration', configurationSchema);
var serverConfigurationData = null;

var config = require('./config');
mongoose.connect(config.mongoUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', getServerConfiguration);

function getServerConfiguration() {
  Configuration.findOne().exec(function(err, config) {
    serverConfigurationData = config;
  });
}




var restify = require('restify');
var server = restify.createServer();

function respond(req, res, next) { res.send('hello ' + req.params.name); }
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(80, function() {
  console.log('PairMatic %s listening at %s', server.name, server.url);
});
