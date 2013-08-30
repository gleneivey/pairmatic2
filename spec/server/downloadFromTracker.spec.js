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
      downloadFromTracker.generateListOfPeople(JSON.parse(JSON.stringify(projectList)));
      expect(collectedLogLines).toEqual(
"----------------------------------------------------\nReceived project 'Develop New Cruiser (White Star)' (id #17), 5 memberships\nReceived project 'Transport Babylon 4 Back in Time' (id #4), 4 memberships\n"
);
    });

    it("handles a typical project list", function() {
      var peopleById = downloadFromTracker.generateListOfPeople(JSON.parse(JSON.stringify(projectList)));
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
      peopleById = downloadFromTracker.generateListOfPeople(JSON.parse(JSON.stringify(projectList)));
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
    it("generates output for one person", function() {
      var peopleById = {};
      downloadFromTracker.logResults(peopleById);
      expect(collectedLogLines).toEqual(
"----------------------------------------------------\n0 unique members\n"
      );
    });

    it("generates output for one person", function() {
      var peopleById = {
          '10': {
              'role': 'member',
              'id': '1010',
              'person': {
		  'email': 'alpha+pairmatic@example.com',
		  'username': "alpha's pairmatic",
		  'initials': 'apm',
		  'name': "PairMatic role user for Alpha's team",
		  'kind': 'person',
		  'id': 10
              }
          }
      };

      downloadFromTracker.logResults(peopleById);

      expect(collectedLogLines).toEqual(
"----------------------------------------------------\n1 unique members\n        undefined:  (inactive) 10 PairMatic role user for Alpha's team\n"
      );
    });
  });


  function findPerson(name) {
    return _(listOfPeople).detect(function(person) {
      return person.name == name;
    });
  }

    //////////////////////////////////////////////////////////////////////

  var projectList = [
      {
        name: 'Develop New Cruiser (White Star)',
        id: 17,
        version: 420,
        epics: [
          {
            id: 4201,
            comments: [
              {
                id: 998,
                person_id: 45
              },
              {
                id: 1002,
                person_id: 627431
              }
            ]
          },
        ],
        stories: [
          {
            id: 4201,
            name: 'Weapons operator can fire main batteries without automated targeting',
            story_type: 'feature',
            current_state: 'unstarted',
            estimate: 1,
            requested_by_id: 25385,
            comments: []
          },
          {
            id: 4202,
            name: 'Hangar bay can recharge Nial fighters',
            story_type: 'feature',
            current_state: 'rejected',
            estimate: 3,
            requested_by_id: 25385,
            comments: [
              {
                id: 999,
                person_id: 44
              },
              {
                id: 1001,
                person_id: 27161
              }
            ]
          },
          {
            id: 4202,
            name: 'Prepare production jump-engine plans based on mini-jump prototype',
            story_type: 'feature',
            current_state: 'accepted',
            estimate: 2,
            requested_by_id: 25385,
            owned_by_id: 43,
            comments: []
          }
        ],
        memberships: [
          {
            id: 2551933,
            role: 'owner',
            last_viewed_at: 1371603291000,
            person: {
              kind: 'person',
              id: 627611,
              initials: 'u',
              username: 'ulkesh',
              name: 'Ulkesh Naranek'
            }
          },
          {
            id: 5293351,
            role: 'owner',
            last_viewed_at: 1371063921000,
            person: {
              kind: 'person',
              id: 27161,
              initials: 'jen',
              username: 'jenimer',
              name: 'Jenimer of the Grey'
            }
          },
          {
            id: 2733915,
            role: 'member',
            last_viewed_at: 1370203291000,
            person: {
              kind: 'person',
              id: 627431,
              initials: 'js',
              username: 'jeff',
              name: "Entil'Zha Sinclair"
            }
          },
          {
            id: 2551934,
            role: 'member',
            last_viewed_at: 1371603291000,
            person: {
              kind: 'person',
              id: 25385,
              initials: 'ine',
              username: 'Inesval',
              name: 'Inesval'
            }
          },
          {
            id: 2551955,
            role: 'viewer',
            last_viewed_at: 0,
            person: {
              kind: 'person',
              id: 126765,
              initials: 'pairmatic',
              username: 'pairmatic42',
              name: 'Pairmatic Role User'
            }
          }
        ]
      },
      {
        name: 'Transport Babylon 4 Back in Time',
        id: 4,
        version: 42,
        epics: [],
        stories: [
          {
            id: 421,
            name: 'Get time-stabilizers out of storage and refurbished',
            story_type: 'chore',
            current_state: 'started',
            requested_by_id: 26761,
            owned_by_id: 2766,
            comments: []
          },
          {
            id: 421,
            name: "Configure ship's stealth capabilities for boarding B4",
            story_type: 'chore',
            current_state: 'unstarted',
            requested_by_id: 42,
            comments: []
          }
        ],
        memberships: [
          {
            id: 2551932,
            role: 'member',
            last_viewed_at: 1371603288000,
            person: {
              kind: 'person',
              id: 627611,
              initials: 'u',
              username: 'ulkesh',
              name: 'Ulkesh Naranek'
            }
          },
          {
            id: 251930,
            role: 'owner',
            last_viewed_at: 1371603291000,
            person: {
              kind: 'person',
              id: 26761,
              initials: 'TGM',
              username: 'draal',
              name: 'Draal (The Great Machine)'
            }
          },
          {
            id: 251935,
            role: 'member',
            last_viewed_at: 1371603291000,
            person: {
              kind: 'person',
              id: 2766,
              initials: 'zathras',
              username: 'zathras',
              name: 'Zathras'
            }
          },
          {
            id: 2551944,
            role: 'viewer',
            last_viewed_at: 0,
            person: {
              kind: 'person',
              id: 126765,
              initials: 'pairmatic',
              username: 'pairmatic42',
              name: 'Pairmatic Role User'
            }
          }
        ]
      }
    ];
});
