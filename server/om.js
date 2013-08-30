(function() {
  var _ = require('underscore');

  var projectList;
  var processedPeople;
  var rolePersonId;

  module.exports.init = function init(pL, peopleById, rPI) {
    projectList = pL;
    rolePersonId = rPI;

    processedPeople = _
        .chain(peopleById)
        .select(function(person, idString) {
          return person.id != rolePersonId;
        })
        .map(function(person) {
          var formatted = {
	      id: person.id,
	      name: person.name,
	      initials: person.initials,
	      username: person.username,
	      active: !!person.active
	  };
	  if (person.email) { formatted.email = person.email; }

	  return formatted;
	})
        .value();
  };

  module.exports.respond = function respond(req, res, next) {
    res.send({
      projects: [],
      people: processedPeople
    });
  };
})();
