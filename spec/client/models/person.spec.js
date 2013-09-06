describe("Person", function() {
  var subject;

  beforeEach(function() {
    subject = new pairmatic.models.Person();
  });

  it("can be instantiated", function() {
    expect(subject instanceof pairmatic.models.Person).toBe(true);
  });
});
