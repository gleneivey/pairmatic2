var _ = require('underscore');

        
var serverConfigurationData = null;
var projectList = [];
var peopleById = {};



        //// obtain initial data from Pivotal Tracker
require('./server/downloadFromTracker')
  .doit()
  .onFulfill(function(sCD, pL, pBI) {
    serverConfigurationData = sCD;
    projectList = pL;
    peopleById = pBI;
    logResults();
  });

var TOO_BIG_TO_BE_MILLIS = 100000000000000;
function logResults() {
  console.log("----------------------------------------------------");
  console.log(_(peopleById).keys().length + " unique members");
  var people = _(peopleById).values();
  _.chain(people)
      .sortBy(function(membership) {
        var baseline = membership.active ? TOO_BIG_TO_BE_MILLIS : 0;
        if (typeof membership.last_viewed_at === 'undefined') { return baseline; }
        return baseline + membership.last_viewed_at;
      })
      .reverse()
      .each(function(membership) {
        console.log("    " + membership.last_viewed_at + ":  " + membership.person.name +
          (membership.active ? " (active)" : " (inactive)")
        );
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
