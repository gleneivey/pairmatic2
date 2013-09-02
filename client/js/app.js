(function() {
  var exports = this;
  exports.pairmatic = exports.pairmatic || {};
  var pairmatic = exports.pairmatic;

  function App() {
    requirejs.config({
	baseUrl: 'js',
	paths: { views: 'views'	}
    });

    var views = [ 'views/pairingPage' ];
    var requireds = ['templates'].concat(views);
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
      });

      var root = new pairmatic.pairingPage({ el: pairmatic.$el });
      root.render();
      pairmatic.rootView = root;
    }
  });

  pairmatic.App = App;
}).call(this);
