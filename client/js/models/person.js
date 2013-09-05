(function() {
  var exports = this;
  exports.pairmatic = exports.pairmatic || {};
  var models = exports.pairmatic.models = exports.pairmatic.models || {};

  var Person = Backbone.Model.extend({
    initialize: function() {
      ;
    }
  });

  models.Person = Person;
}).call(this);
