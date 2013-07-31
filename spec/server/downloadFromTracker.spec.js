var downloadFromTracker = require('../../server/downloadFromTracker');

describe("downloadFromTracker", function() {
  describe("#generateListOfPeople(projectList) -> people", function() {
    it("works with an empty list", function() {
      expect(downloadFromTracker.generateListOfPeople([])).toEqual([]);
    });

    it("handles a typical project list", function() {
      var projectList = [
        {
          name: '',
          version: 42,
          stories: [
          ],
          memberships: [
          ]
        },
        {
        }
      ]
    });
  });
});
