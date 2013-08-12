var _ = require('underscore');

        
var serverConfigurationData = null;
var projectList = [];
var peopleById = {};



        //// obtain initial data from Pivotal Tracker
var dFT = require('./server/downloadFromTracker');
dFT.doit()
  .onFulfill(function(sCD, pL, pBI) {
    serverConfigurationData = sCD;
    projectList = pL;
    peopleById = pBI;
    dFT.logResults(peopleById);
  });




        //// configure and start server
var restify = require('restify');
var server = restify.createServer();

//server.get(/\/client\/.*/, restify.serveStatic({
//    directory: './client/'
//}));

function respond(req, res, next) { res.send('hello ' + req.params.name); }
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.get(/^\/.*$/, restify.serveStatic({
    directory: './client/',
    default: 'index.html'
}));

server.listen(8889, function() {
  console.log('PairMatic %s listening at %s', server.name, server.url);
});
