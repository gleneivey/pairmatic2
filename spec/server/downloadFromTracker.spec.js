var _ = require('underscore');


var downloadFromTracker = require('../../server/downloadFromTracker');

describe("downloadFromTracker", function() {
  describe("#generateListOfPeople(projectList) -> people", function() {
    it("works with an empty list", function() {
      expect(downloadFromTracker.generateListOfPeople([])).toEqual([]);
    });

    it("handles a typical project list", function() {
      var projectList = [
        {
          name: 'Develop New Cruiser (White Star)',
          version: 420,
          stories: [
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
	      id: 2551933,
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
	      id: 2551933,
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
          version: 42,
          stories: [
          ],
          memberships: [
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
      ]

      var totalNumberOfMemberships = 0;
      _(projectList).each(function(project) {
        totalNumberOfMemberships += project.memberships.length;
      });

      var listOfPeople = downloadFromTracker.generateListOfPeople(projectList);
      expect(listOfPeople.length)
        .toEqual(totalNumberOfMemberships - 1);
      expect(_.chain(listOfPeople).map(function(person) { return person.person.username; }).sort().value())
        .toEqual([ 'Inesval', 'draal', 'jeff', 'jenimer', 'pairmatic42', 'ulkesh', 'zathras' ]);
    });
  });
});
