var se = require ('./seHelper');

describe("Client initial load", function() {
  it("shows lists of active and inactive users", function() {
    se.client
        .url("http://localhost:8889/")
        .getText("#activeUsers", function(err, result) {
          expect(err).toBeNull();
          expect(result).toEqual("");
        })
        .getText("#inactiveUsers", function(err, result) {
          expect(err).toBeNull();
          expect(result).toEqual("GEI-Pairmatic Testing-Owner1\nGEI-Pairmatic Testing-Owner2\nGEI-Pairmatic Testing-Member1\nGEI-Pairmatic Testing-Member2\nGEI-Pairmatic Testing-Viewer1");
          se.sayDone();
        });

    se.waitsForDone();
  });
});
