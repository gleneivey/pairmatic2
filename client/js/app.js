
(function() {
  var exports = this;
  var pairmatic = _.namespace(exports, 'pairmatic');

  var $el = $('#root');
  _.extend(exports.pairmatic, {
      el: $el[0],
      $el: $el,
      $: function(selector) { return this.$el.find(selector); },
      initialize: function() {
        var root = new pairmatic.pairingPage({ el: pairmatic.$el });
        root.render();
        pairmatic.rootView = root;
      }
  });



  var views = [ 'views/pairingPage' ];

  requirejs.config({
      baseUrl: 'js',
      paths: {
        views: 'views'
      }
  });

  var requireds = ['templates'].concat(views);
  require(requireds, pairmatic.initialize);
}).call(this);
