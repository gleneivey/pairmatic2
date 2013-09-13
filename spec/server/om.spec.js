var fixtures = require('./fixtures');
var _ = require('underscore');


var om = require('../../server/om');


describe("om", function() {
  var responseMock, response, responseCount = 0;
  var request = null;
  var next = null;

  beforeEach(function() {
    responseMock = { send: function(resp){
      response = resp;
      responseCount++;
    } };
  });

  it("returns empty lists when there are no projects or people", function() {
    spyOn(responseMock, 'send');
    om.init([], {});

    om.respond(request, responseMock, next);

    expect(responseMock.send).toHaveBeenCalledWith({
      projects: [],
      people: []
    });
  });

  it("returns a list of people", function() {
    var listOfPeople = fixtures.listOfPeopleFixture();
    var peopleById = {};
    _(listOfPeople).each(function(person) {
      peopleById[person.id.toString()] = person;
    });

    om.init([], peopleById, 126765);
    om.respond(request, responseMock, next);
    expect(responseCount).toBe(1);

    var expectedPeople = _.chain(listOfPeople)
        .select(function(person) {
	  return person.role === 'owner' || person.role === 'member';
	})
        .select(function(person) {
          return person.username !== 'pairmatic42';  // server should exclude the role-user it is executing as
        })
        .map(function(person) {
	  var clone = JSON.parse(JSON.stringify(person));  // don't alter fakey-fixture
	  delete clone.membership_id;
	  delete clone.last_viewed_at;
	  delete clone.role;
          clone.active = !!clone.active;
	  return clone;
	})
        .value();

    expect(_(response).keys()).toEqual(['projects','people']);
    expect(response.projects).toEqual([]);

    expect(_(response.people).sortBy('id'))
        .toEqual(_(expectedPeople).sortBy('id'));
  });
});
