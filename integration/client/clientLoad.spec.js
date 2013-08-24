var se = require ('./seHelper');

describe("Run in-browser checks on Google", function() {
  it("can do a web search through Google", function() {
    se.client.
        url("http://www.google.com/").
        waitFor("input[type=text]", 25000, function(wasFound) {
          expect(wasFound).not.toBeFalse();
        }).
        setValue("input[type=text]", "test").
        click("form button").
        waitFor("#rso", 25000).
        getText("#rso li cite", function(err, result) {
          expect(err).toBeNull();
          expect(result).toEqual("www.test.com/");
          se.sayDone();
        });

    se.waitsForDone();
  });
});
