describe("views.pairingPage", function() {
  var subject;

  beforeEach(function() {
    subject = new pairmatic.views.pairingPage();
  });

  it("uses the pairingPage template when rendered", function() {
    spyOn(JST, 'client/js/templates/pairingPage.hbs').and.callReturn('<div/>');

    var renderReturnValue = subject.render();

    expect(renderReturnValue).toBe(subject);
    expect(JST['client/js/templates/pairingPage.hbs']).toHaveBeenCalled();
  });

  it("should re-render when system state is updated", function() {
    var people = pairmatic.models.people;
    spyOn(people, 'toJSON').and.callReturn({});  // spy on this because render function is private
    people.trigger('reset');
    expect(people.toJSON).toHaveBeenCalled();
  });

  describe("values passed to template", function() {
    var capturedTemplateArgs;

    beforeEach(function() {
      spyOn(JST, 'client/js/templates/pairingPage.hbs').and.callFake(
          function(infoHash) { capturedTemplateArgs = infoHash; } );
    });

    it("should pass right active/inactive lists to template", function() {
      var people = [
	{ active: true,  name: 'one' },
	{ active: false, name: 'two' },
	{ active: false, name: 'three' },
	{ active: true,  name: 'four' }
      ]

      pairmatic.models.people.reset(people);

      // only assert against fields we sent in....
      capturedTemplateArgs.activeUsers =
          _(capturedTemplateArgs.activeUsers  ).map(function(personHash) {
              return { active: personHash.active, name: personHash.name }; });
      capturedTemplateArgs.inactiveUsers =
          _(capturedTemplateArgs.inactiveUsers).map(function(personHash) {
              return { active: personHash.active, name: personHash.name }; });

      expect(JST['client/js/templates/pairingPage.hbs']).toHaveBeenCalled();
      expect(capturedTemplateArgs).toEqual({
	activeUsers:   [
	  { active: true,  name: 'one' },
	  { active: true,  name: 'four' }
	],
	inactiveUsers: [
	  { active: false, name: 'two' },
	  { active: false, name: 'three' }
	]
      });
    });

    it("should send email addresses as their md5 hashes", function() {
      var people = [
	{ active: true,  name: 'one', email: 'one@example.com' },
	{ active: false, name: 'two', email: 'two@three.four' }
      ]

      pairmatic.models.people.reset(people);

      expect(JST['client/js/templates/pairingPage.hbs']).toHaveBeenCalledWith({
	activeUsers:   [{ active: true,  name: 'one', email: hex_md5('one@example.com') }],
	inactiveUsers: [{ active: false, name: 'two', email: hex_md5('two@three.four') }]
      });
    });
  });
});
