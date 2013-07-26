var restify = require('restify');
var server = restify.createServer();

function respond(req, res, next) { res.send('hello ' + req.params.name); }
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(80, function() {
  console.log('PairMatic %s listening at %s', server.name, server.url);
});
