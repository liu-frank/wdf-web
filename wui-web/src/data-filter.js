/**
 * Created by liukai on 16/8/18.
 */

'use strict';
var Handlebars = require('handlebars/runtime');
var templates = require('../templates/templates.js');

var create = function(options) {
  var $el = options.$el;
  var onFilter = options.onFilter;
  var addFunc = options.addFunc;
  var meta = options.meta;
  var fields = options.fields.map(function(field) {
    var target = $.extend({}, meta[field], {
      name: field
    });

    switch (target.type) {
      case 'text':
        target.text = true;
        break;
      case 'select':
        target.select = true;
        break;
      case 'number':
        target.number = true;
        break;
      default:
        target.text = true;
        break;
    }

    return target;
  });

  $el.html(Handlebars.templates['data-filter']({
    fields: fields,
    addButton: options.addButton ? options.addButton : false,
    queryButton : options.queryButton ? options.queryButton : false
  }));

  $el.find('.filter').click(function() {
    var paramArray = $el.find('form').serializeArray();
    var paramObj = {};

    paramArray.forEach(function(param) {
      paramObj[param.name] = param.value;
    });

    onFilter(paramObj);
  });

  $el.find('.add').click(function() {
    var paramArray = $el.find('form').serializeArray();
    var paramObj = {};

    paramArray.forEach(function(param) {
      paramObj[param.name] = param.value;
    });

    addFunc(paramObj);
  });
};

module.exports = {
  create: create
};



