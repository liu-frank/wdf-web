'use script';

WUI.InfoTable = (function() {
  var create = function(options) {
    var $el = options.$el;
    var meta = options.meta;
    var data = options.data;
    
    var fields = options.fields.map(function (line) {
      var newLine = line.map(function (field) {
        var label = meta[field].label;
        var value = data[field];
        
        if (meta[field].type === 'select') {
          value = meta[field].options.find(function (option) {
            return option.value === value;
          }).label;
        }

        return {
          label: label,
          value: value
        }
      });
      
      if (newLine.length % 2) {
        newLine.push({
          label: '',
          value: ''
        });
      }
      
      return newLine;
    });
    
    $el.html(WUI.templates['info-table']({
      fields: fields
    }));
  };

  return {
    create: create
  };
})();
