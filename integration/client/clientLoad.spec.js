var se = require ('./seHelper');

describe("Client initial load", function() {
  it("shows fixed text", function() {
    se.client.
        url("http://localhost:8889/").
        getText("body", function(err, result) {
          expect(err).toBeNull();
          expect(result).toEqual("What ho! Content from a Handlebars template.");
          se.sayDone();
        });

    se.waitsForDone();
  });
});
