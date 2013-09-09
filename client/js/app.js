(function() {
  var exports = this;
  var pairmatic = exports.pairmatic = exports.pairmatic || {};
  pairmatic.models = pairmatic.models || {};

  function App() {
    requirejs.config({
	baseUrl: 'js',
	paths: { views: 'views'	}
    });

    var models = [ 'models/om', 'models/person', 'models/people' ];
    var views  = [ 'views/pairingPage' ];

    var requireds = ['templates'].concat(models).concat(views);
    require(requireds, function(){
      pairmatic.app.run();
    });
  }

  _.extend(App.prototype, {
    run: function() {
      var $el = $('#root');
      _.extend(pairmatic, {
	  el: $el[0],
	  $el: $el,
	  $: function(selector) { return this.$el.find(selector); },
	  socket: io.connect('/')
      });

      pairmatic.models.people = new pairmatic.models.People();
      var om = pairmatic.models.om = new pairmatic.models.Om();

      var root = new pairmatic.views.pairingPage({ el: pairmatic.$el });
      root.render();
      pairmatic.rootView = root;

      om.fetch({reset: true});
    }
  });

  pairmatic.App = App;
}).call(this);
