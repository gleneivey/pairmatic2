describe("People", function() {
  var subject;

  beforeEach(function() {
    subject = new pairmatic.models.People();
  });

  it("can be instantiated", function() {
    expect(subject instanceof pairmatic.models.People).toBe(true);
  });

  it("is a collection", function() {
    expect(subject instanceof Backbone.Collection).toBe(true);
  });

  it("contains 'Person' models", function() {
    expect(subject.model).toBe(pairmatic.models.Person);
  });
});
