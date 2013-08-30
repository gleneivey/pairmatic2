var _ = require('underscore');

        
var serverConfigurationData = null;
var projectList = [];
var peopleById = {};



        //// obtain initial data from Pivotal Tracker
var dFT = require('./server/downloadFromTracker');
var om = require('./server/om');

dFT.doit()
  .onFulfill(function(sCD, pL, pBI) {
    serverConfigurationData = sCD;
    projectList = pL;
    peopleById = pBI;
    om.init(projectList, peopleById);
    dFT.logResults(peopleById);
  });




        //// configure and start server
var restify = require('restify');
var server = restify.createServer();

om.init(projectList, peopleById);
server.get('/om', om.respond);
server.head('/om', om.respond);

server.get(/^\/.*$/, restify.serveStatic({
    directory: './client/',
    default: 'index.html'
}));

server.listen(8889, function() {
  console.log('PairMatic %s listening at %s', server.name, server.url);
});
