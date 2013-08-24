var request = require('request');

describe("server's 'hello' endpoint", function() {
  it("should respond with 'hello world'", function(done) {
    var response_body = null;

    runs(function() {
      request("http://localhost:8889/hello/world",
          function(error, response, body){
        response_body = body;
      });
    });

    waitsFor(function() {
      return (response_body !== null);
    }, 'No response from server under test', 250);

    runs(function() {
      expect(response_body).toEqual('"hello world"');
      done();
    });
  });
});

