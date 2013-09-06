describe("Om", function() {
  var subject;
  var fakeOm;

  beforeEach(function() {
    subject = new pairmatic.models.Om();
    fakeOm = { people: [
      { id: 1, name: 'alice', active: true },
      { id: 2, name: 'boyd', active: true },
      { id: 3, name: 'cathy', active: false },
      { id: 4, name: 'dave', active: false }
    ] };
  });

  it("can be instantiated", function() {
    expect(subject instanceof pairmatic.models.Om).toBe(true);
  });

  it("updates the global 'people' collection when it is reset", function() {
    subject.set(fakeOm);
    expect(pairmatic.models.people.pluck('name')).toEqual(['alice', 'boyd', 'cathy', 'dave']);
  });

  it("updates the global 'people' collection when om.people is set", function() {
    subject.set('people', fakeOm.people);
    expect(pairmatic.models.people.pluck('name')).toEqual(['alice', 'boyd', 'cathy', 'dave']);
  });
});
