var se = require ('./seHelper');

describe("Client initial load", function() {
  it("shows lists of active and inactive users", function() {
    se.client
        .url("http://localhost:8889/")
        .waitFor('#inactiveMenuButton', 10000, function(err, result){})
        .click('#inactiveMenuButton', function(err, result){})
        .getText("#activeUsers", function(err, result) {
          expect(err).toBeNull();
          var actual = result.split("\n").sort();
          expect(actual).toEqual([
            "GEI-Pairmatic Testing-Member1",
            "GEI-Pairmatic Testing-Member2",
            "GEI-Pairmatic Testing-Member3",
            "GEI-Pairmatic Testing-Owner1"
          ]);
        })
        .getText("#inactiveUsers", function(err, result) {
          expect(err).toBeNull();
          result = result.split("\n");
          var actual = result.sort();
          expect(actual).toEqual([
            "GEI-Pairmatic Testing-Owner2",
            "GEI-Pairmatic Testing-Viewer1"
          ]);

          se.sayDone();
        });

    se.waitsForDone();
  });
});
