(function() {
  var exports = this;
  exports.pairmatic = exports.pairmatic || {};
  var views = exports.pairmatic.views = exports.pairmatic.views || {};
  var models = exports.pairmatic.models = exports.pairmatic.models || {};

  function renderView() {
    var modelsJson = models.people.toJSON();
    this.$el.html( JST['client/js/templates/pairingPage.hbs']({
      activeUsers: _(modelsJson)
          .chain()
          .select(function(personHash) {
            return personHash.active;
          })
          .map(function(personHash) {
            personHash.email = hex_md5(personHash.email || '');
            return personHash;
          })
          .value(),
      inactiveUsers: _(modelsJson)
          .chain()
          .select(function(personHash) {
            return !personHash.active;
          })
          .map(function(personHash) {
            personHash.email = hex_md5(personHash.email || '');
            return personHash;
          })
          .value()
    }) );

   $('.avatar').draggable();    // TODO:  does this leak, or double-set event handlers, when we rerender?

    return this;
  }

  function toggleInactiveMenu(e) {
    $('#inactiveUsers').toggleClass("open closed");
  }

  var pairingPage = Backbone.View.extend({
    initialize: function() {
      var self = this;
      models.people.on('reset change', function() { renderView.call(self); });
    },

    events: {
      "click #inactiveMenu": toggleInactiveMenu
    },

    render: renderView
  });

  views.pairingPage = pairingPage;
}).call(this);
