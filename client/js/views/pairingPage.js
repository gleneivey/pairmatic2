
(function() {
  var exports = this;
  exports.pairmatic = exports.pairmatic || {};
  var pairmatic = exports.pairmatic;

  var pairingPage = Backbone.View.extend({
    events: {
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html( JST['client/js/templates/pairingPage.hbs']() );
      return this;
    }
  });

  pairmatic.pairingPage = pairingPage;
}).call(this);
