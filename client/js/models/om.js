(function() {
  var exports = this;
  exports.pairmatic = exports.pairmatic || {};
  var models = exports.pairmatic.models = exports.pairmatic.models || {};

  function updateAssociatedCollectionsFromAttributeArrays() {
    models.people.reset(this.get('people'));
  }

  var Om = Backbone.Model.extend({
    initialize: function() {
      this.people = models.people;
      this.on('reset', updateAssociatedCollectionsFromAttributeArrays);
      this.on('change', updateAssociatedCollectionsFromAttributeArrays);
    },

    parse: function(response) {
      return response;
    },

    url: function() { return '/om'; }
  });

  models.Om = Om;
}).call(this);
