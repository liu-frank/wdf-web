'use script';

WUI.SampleComponent = (function() {
  var create = function(options) {
    var $el = options.$el;
    var component = {
      show: function() {
        $el.show();
      },
      hide: function() {
        $el.hide();
      }
    };

    $el.html(WUI.templates['sample-template']());

    return component;
  };

  return {
    create: create
  };
})();
