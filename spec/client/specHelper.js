
function setupSpyOnJquery(targetSelector, callback) {
  var originalJqueryConstructor = window.$;
  spyOn(window, '$').and.callFake(function(currentSelector) {
    var newJQueryWrapper = originalJqueryConstructor.apply(this, arguments);
    if (currentSelector === targetSelector) {
      callback(newJQueryWrapper);
    }

    return newJQueryWrapper;
  });
}
