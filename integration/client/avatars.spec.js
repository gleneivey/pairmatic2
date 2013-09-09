var se = require ('./seHelper');

describe("Dragging member avatars", function() {
  it("can drag one member over another", function() {
    var source = '#imgpairMember2';
    var target = '#imgpairOwner1';
    var originalSourceLocation, originalTargetLocation;

    se.client
        .url("http://localhost:8889/")
        .waitFor('#inactiveMenuButton', 10000, function(err, result){})
        .getLocation(source, function(err, result) {
          expect(err).toBeNull();
          originalSourceLocation = result;
        })
        .getLocation(target, function(err, result) {
          expect(err).toBeNull();
          originalTargetLocation = result;
        })
        .dragAndDrop(source, target, function(err, result){})
        .getLocation(source, function(err, result) {
          expect(err).toBeNull();
          expect(result).not.toEqual(originalSourceLocation);
          expect(result).toEqual(originalTargetLocation);

          se.sayDone();
        });

    se.waitsForDone();
  });
});
