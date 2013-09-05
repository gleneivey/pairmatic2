(function() {
  var exports = this;
  exports.pairmatic = exports.pairmatic || {};
  var views = exports.pairmatic.views = exports.pairmatic.views || {};
  var models = exports.pairmatic.models = exports.pairmatic.models || {};

  function renderView() {
    var modelsJson = models.people.toJSON();
    this.$el.html( JST['client/js/templates/pairingPage.hbs']({
      activeUsers: _(modelsJson).select(function(personHash) {
            return personHash.active;
          }),
      inactiveUsers: _(modelsJson).select(function(personHash) {
            return !personHash.active;
          }),
    }) );
    return this;
  }

  var pairingPage = Backbone.View.extend({
    initialize: function() {
      var self = this;
      models.people.on('reset change', function() { renderView.call(self); });
    },

    render: renderView
  });

  views.pairingPage = pairingPage;
}).call(this);
