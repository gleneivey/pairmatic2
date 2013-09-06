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

  it("should pass right active/inactive lists to template", function() {
    spyOn(JST, 'client/js/templates/pairingPage.hbs');
    var people = [
      { active: true,  name: 'one' },
      { active: false, name: 'two' },
      { active: false, name: 'three' },
      { active: true,  name: 'four' }
    ]

    pairmatic.models.people.reset(people);

    expect(JST['client/js/templates/pairingPage.hbs']).toHaveBeenCalledWith({
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
});
