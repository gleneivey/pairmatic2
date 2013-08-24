jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000; // sometimes a little slow, esp. on startup


if (typeof client != "undefined") {
  throw "I thought require() took care of this?";
}

module.exports.client = client = null;
var latestWebdriverRequestDone = false;

var waitsForDone = function waitsForDone() {
  waitsFor(function() {
    var maybeTrue = latestWebdriverRequestDone;
    latestWebdriverRequestDone = false;
    return maybeTrue;
  });
};
module.exports.waitsForDone = waitsForDone;

var sayDone = function sayDone() {
  latestWebdriverRequestDone = true;
};
module.exports.sayDone = sayDone;

var runsAndWaits = function runsAndWaits(functionToRun) {
  runs(function() {
    latestWebdriverRequestDone = false;
    functionToRun();
  });
  waitsForDone();
};
module.exports.runsAndWaits = runsAndWaits;


var exec = require('child_process').exec;

describe('system initialization', function() {
  beforeAll(function() {
    var webdriverjs = require("webdriverjs");
    module.exports.client = client = webdriverjs.remote({logLevel: 'silent'});
    client.init();
  });

  afterAll(function() {
    client.end();
  });

  it("ensure beforeAll/afterAll runs", function() {});
});
