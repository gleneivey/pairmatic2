describe("App", function() {
  var subject, runWrapper;

  beforeEach(function() {
    spyOn(requirejs, 'config');
    spyOn(window, 'require').and.callFake(function(requireList, callback) {
      runWrapper = callback;
    });

    $('#jasmine_content').append('<div id="root"></div>');

    subject = new pairmatic.App();
  });

  it("can be instantiated", function() {
    expect(subject instanceof pairmatic.App).toBe(true);
  });

  it("performes require for rest of app, and sets callback invoking run()", function() {
    expect(window.require).toHaveBeenCalled();
    pairmatic.app = subject;

    spyOn(pairmatic.app, 'run');
    runWrapper();
    expect(pairmatic.app.run).toHaveBeenCalled();
  });

  describe("#run", function() {
    var pairingPageMockView;
    beforeEach(function() {
      pairingPageMockView = mockView(pairmatic.views, 'pairingPage');
      subject.run();
    });

    it("initializes DOM shortcuts in pairmatic namespace", function() {
      expect(typeof pairmatic.el).toEqual('object');
      expect(pairmatic.$el.get(0)).toBe(pairmatic.el);
      expect(typeof pairmatic.$).toEqual('function');
    });

    it("instantiates and renders the pairingPage view", function() {
      expect(pairingPageMockView).toHaveBeenCalled();
      expect(pairmatic.rootView.wasRendered).toBe(true);
      expect(pairmatic.rootView).toEqual(pairingPageMockView.viewInstance);
    });
  });

  function mockView(spyScope, spyClass) {
    var mockViewClass = spyOn(spyScope, spyClass);

    var fakeInstance = { wasRendered: false };
    fakeInstance.__proto__ = mockViewClass;
    mockViewClass.viewInstance = fakeInstance;

    mockViewClass.and.callFake(function() {
      return fakeInstance;
    });

    mockViewClass.render = function() {
      fakeInstance.wasRendered = true;
    };

    return mockViewClass;
  }
});
