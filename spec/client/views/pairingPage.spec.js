describe("views.pairingPage", function() {
  var subject;

  beforeEach(function() {
    subject = new pairmatic.views.pairingPage();
  });

  it("uses the pairingPage template when rendered", function() {
    spyOn(JST, 'client/js/templates/pairingPage.hbs').and.callReturn('<div/>');

    var renderReturnValue =
        subject.render();

    expect(renderReturnValue).toBe(subject);
    expect(JST['client/js/templates/pairingPage.hbs']).toHaveBeenCalled();
  });

  it("should re-render when system state is updated", function() {
    spyOn(subject, 'render');
    
  });
});
