var fixtures = require('./fixtures');
var _ = require('underscore');


var downloadFromTracker = require('../../server/downloadFromTracker');


var listOfPeople;
describe("downloadFromTracker", function() {
  var collectedLogLines;
  beforeEach(function() {
    collectedLogLines = '';
    spyOn(console, 'log').andCallFake(function(message) {
      collectedLogLines += message;
      collectedLogLines += "\n";
    });
  });

  describe("#generateListOfPeople(projectList) -> peopleById", function() {
    it("works with an empty list", function() {
      expect(downloadFromTracker.generateListOfPeople([])).toEqual({});
    });

    it("logs the projects loaded from Tracker", function() {
      downloadFromTracker.generateListOfPeople(fixtures.projectListFixture());
      expect(collectedLogLines).toEqual(
"----------------------------------------------------\nReceived project 'Develop New Cruiser (White Star)' (id #17), 5 memberships\nReceived project 'Transport Babylon 4 Back in Time' (id #4), 4 memberships\n"
);
    });

    it("handles a typical project list", function() {
      var peopleById = downloadFromTracker.generateListOfPeople(fixtures.projectListFixture());
      var listOfPeople = _(peopleById).values();
      expect(listOfPeople.length)
        .toEqual(7);
      expect(_.chain(listOfPeople)
        .map(function(person) { return person.username; })
        .sort().value()
      ).toEqual([ 'Inesval', 'draal', 'jeff', 'jenimer', 'pairmatic42', 'ulkesh', 'zathras' ]);
    });
  });

  describe("#generateListOfPeople marking active vs. inactive", function() {
    var peopleById;
    beforeEach(function() {
      peopleById = downloadFromTracker.generateListOfPeople(fixtures.projectListFixture());
      listOfPeople = _(peopleById).values();
    });

    it("marks a person active when they're referenced as a story requestor", function() {
      expect(findPerson('Inesval').active).toEqual(true);
      expect(findPerson('Draal (The Great Machine)').active).toEqual(true);
    });

    it("marks a person active when they're referenced as a story owner", function() {
      expect(findPerson('Zathras').active).toEqual(true);
    });

    it("marks a person active when they're a comment author on a story", function() {
      expect(findPerson('Jenimer of the Grey').active).toEqual(true);
    });

    it("marks a person active when they're a comment author on an epic", function() {
      expect(findPerson("Entil'Zha Sinclair").active).toEqual(true);
    });

   describe("shouldn't fail or mark 'active' a non-member person", function() {
      it("who is a story requestor", function() {      expect(peopleById[42]).toBeUndefined(); });
      it("who is a story owner", function() {          expect(peopleById[43]).toBeUndefined(); });
      it("who is a commentor on a story", function() { expect(peopleById[44]).toBeUndefined(); });
      it("who is a commentor on an epic", function() { expect(peopleById[45]).toBeUndefined(); });
    });
  });

  describe("#logResults(peopleById) -> calls console.log() with output", function() {
    it("generates output for no people", function() {
      var peopleById = {};
      downloadFromTracker.logResults(peopleById);
      expect(collectedLogLines).toEqual(
"----------------------------------------------------\n0 unique members\n"
      );
    });

    it("generates output for one person", function() {
      var peopleById = {
          '10': {
              'membership_id': 1010,
              'role': 'member',
	      'active': false,
	      'id': 10,
	      'name': "PairMatic role user for Alpha's team",
	      'initials': 'apm',
	      'username': "alpha's pairmatic",
	      'email': 'alpha+pairmatic@example.com'
          }
      };

      downloadFromTracker.logResults(peopleById);

      expect(collectedLogLines).toEqual(
"----------------------------------------------------\n1 unique members\n        undefined:  (inactive) 10 PairMatic role user for Alpha's team\n"
      );
    });

    it("handles a typical project set's people", function() {
      var peopleById = downloadFromTracker.generateListOfPeople(fixtures.projectListFixture());

      downloadFromTracker.logResults(peopleById);

      expect(collectedLogLines).toEqual(
"----------------------------------------------------\nReceived project 'Develop New Cruiser (White Star)' (id #17), 5 memberships\nReceived project 'Transport Babylon 4 Back in Time' (id #4), 4 memberships\n----------------------------------------------------\n7 unique members\n    1371603291000:   (active)  26761 Draal (The Great Machine)\n    1371603291000:   (active)  25385 Inesval\n    1371603291000:   (active)  2766 Zathras\n    1371063921000:   (active)  27161 Jenimer of the Grey\n    1370203291000:   (active)  627431 Entil'Zha Sinclair\n    1371603291000:  (inactive) 627611 Ulkesh Naranek\n    0:  (inactive) 126765 Pairmatic Role User\n"
      );
    });
  });


  function findPerson(name) {
    return _(listOfPeople).detect(function(person) {
      return person.name == name;
    });
  }
});
