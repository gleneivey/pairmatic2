var _ = require('underscore');
var request = require('request');

describe("server's '/om' endpoint", function() {
  it("should respond with the expected list of people", function(done) {
    var response_body = null;

    waits(10000);

    runs(function() {
      request("http://localhost:8889/om",
          function(error, response, body){
        response_body = body;
      });
    });

    waitsFor(function() {
      return (response_body !== null);
    }, 'No response from server under test', 250);

    runs(function() {
      var responseHash = JSON.parse(response_body);
      expect(responseHash.projects).toEqual([]);
      expect(_(responseHash.people).sortBy('id')).toEqual([
        { id: 1098130, name: 'GEI-Pairmatic Testing-Owner1', initials: 'PTO1', username: 'pairOwner1',
          active: true, email: 'gleneivey+pairmatic-owner1@gmail.com' },
        { id: 1098164, name: 'GEI-Pairmatic Testing-Owner2', initials: 'PTO2', username: 'pairOwner2',
          active: false, email: 'gleneivey+pairmatic-owner2@gmail.com' },
        { id: 1098168, name: 'GEI-Pairmatic Testing-Member1', initials: 'GT', username: 'pairMember1',
          active: true, email: 'gleneivey+pairmatic-member1@gmail.com' },
        { id: 1098170, name: 'GEI-Pairmatic Testing-Member2', initials: 'GT', username: 'pairMember2',
          active: true, email: 'gleneivey+pairmatic-member2@gmail.com' },
        { id: 1098198, name: 'GEI-Pairmatic Testing-Member3', initials: 'GT', username: 'pairMember3',
          active: true, email: 'gleneivey+pairmatic-member3@gmail.com' },
        { id: 1098200, name: 'GEI-Pairmatic Testing-Viewer1', initials: 'GT', username: 'pairViewer1',
          active: false, email: 'gleneivey+pairmatic-viewer1@gmail.com' }
      ]);
      done();
    });
  });
});
