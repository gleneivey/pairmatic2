(function() {
  var _ = require('underscore');

  var projectList;
  var processedPeople;
  var roleUserPersonId;

  module.exports.init = function init(pL, peopleById, rUPI) {
    projectList = pL;
    roleUserPersonId = rUPI;

    processedPeople = _
        .chain(peopleById)
        .select(function(person, idString) {
          return person.id != roleUserPersonId;
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
        .shuffle()
        .value();
  };

  module.exports.respond = function respond(req, res, next) {
    res.send({
      projects: [],
      people: processedPeople
    });
  };
})();
