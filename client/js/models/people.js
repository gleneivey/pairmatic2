(function() {
  var exports = this;
  exports.pairmatic = exports.pairmatic || {};
  var models = exports.pairmatic.models = exports.pairmatic.models || {};

  var People = Backbone.Collection.extend({
    model: models.Person
  });

  models.People = People;
}).call(this);
