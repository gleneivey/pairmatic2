    //////// covered by unit tests ////////

var _ = require('underscore');


function generateListOfPeople(projectList) {
  var peopleById = extractPeopleFromProject(projectList);
  markPeopleActiveFromStoryData(peopleById, projectList);
  return peopleById;
}
module.exports.generateListOfPeople = generateListOfPeople;




function extractPeopleFromProject(projectList) {
  var people = {};

  console.log("----------------------------------------------------");
  _(projectList).each(function(project) {
    console.log("Received project '" + project.name + "', " + project.memberships.length + " memberships");

    _(project.memberships).each(function(membership) {
      if (typeof people[membership.person.id] === 'undefined') {
        people[membership.person.id] = membership;
      }
      else {
        if (people[membership.person.id].role == 'Viewer') {
          people[membership.person.id].role = membership.role;
        }
        if (people[membership.person.id].last_viewed_at < membership.last_viewed_at) {
          people[membership.person.id].last_viewed_at = membership.last_viewed_at;
        }
      }
    });
  });

  return people;
}

function markPeopleActiveFromStoryData(peopleById, projectList) {
  _(projectList).each(function(project) {
    _(project.stories).each(function(story) {
      if (peopleById[story.requested_by_id]) {
        peopleById[story.requested_by_id].active = true;
      }

      var owner_id = story.owned_by_id;
      if (owner_id && peopleById[owner_id]) {
        peopleById[owner_id].active = true;
      }

      _(story.comments).each(function(comment) {
        if (peopleById[comment.person_id]) {
          peopleById[comment.person_id].active = true;
        }
      });
    });
    _(project.epics).each(function(epic) {
      _(epic.comments).each(function(comment) {
        if (peopleById[comment.person_id]) {
          peopleById[comment.person_id].active = true;
        }
      });
    });
  });
}



    //////// covered only by integration tests ////////

var config = require('../config');

var https = require('https');
var mongoose = require('mongoose');
var Promise = require('mpromise');


var configurationSchema = mongoose.Schema({ apiToken: String });
var Configuration = mongoose.model('Configuration', configurationSchema);
var personSchema = mongoose.Schema({
    id: Integer,
    name: String,
    username: String,
    initials: String,
    email: String,
    autoState: String,
    explicitState: String
});
var Person = mongoose.model('Person', personSchema);


var downloadPromise = new Promise();

function initializeServer() {
  var serverConfigurationData;

  Configuration.findOne().exec()
    .then(function(config) { serverConfigurationData = config; })
    .then(function() {
      loadProjectsList(serverConfigurationData)
        .then(function(projectList) {
          downloadPromise.fulfill(
              serverConfigurationData,
              projectList,
              generateListOfPeople(projectList)
          );
        })

;
    });
}


function loadProjectsList(serverConfigurationData) {
  var promiseProjectList = new Promise();
  https.get(
      {
        hostname: 'www.pivotaltracker.com',
        path: '/services/v5/projects?date_format=millis&' +
            'fields=name,version,stories(name,story_type,current_state,owned_by_id,requested_by_id,estimate,comments(person_id)),' +
            'epics(comments(person_id)),memberships(person,role,last_viewed_at)',
        headers: {
            'X-TrackerToken': serverConfigurationData.apiToken
        }
      }, function(response) {
        var dataChunks = [];
        response
          .on('data', function(chunk) { dataChunks.push(chunk.toString()); })
          .on('end', function() {
            var body = dataChunks.join('');
            projectList = JSON.parse(body);
            promiseProjectList.fulfill(projectList);
          });
      }
  );

  return promiseProjectList;
}


function doit() {
  mongoose.connect(config.mongoUri);
  var db = mongoose.connection;
  db
    .on('error', console.error.bind(console, 'connection error:'))
    .once('open', initializeServer);

  return downloadPromise;
}

module.exports.doit = doit;
