var _ = require('underscore');

        
var serverConfigurationData = null;
var projectList = [];
var people = {};



        //// obtain initial data from Pivotal Tracker
require('./server/downloadFromTracker')
  .doit()
  .onFulfill(function(sCD, pL, p) {
    serverConfigurationData = sCD;
    projectList = pL;
    people = p;
    logResults();
  });

function logResults() {
  console.log("----------------------------------------------------");
  console.log(people.length + " unique members");
  _(people).each(function(membership) {
    console.log("    " + membership.last_viewed_at + ":  " + membership.person.name);
  });
}



        //// configure and start server
var restify = require('restify');
var server = restify.createServer();

function respond(req, res, next) { res.send('hello ' + req.params.name); }
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8889, function() {
  console.log('PairMatic %s listening at %s', server.name, server.url);
});
