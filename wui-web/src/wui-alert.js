/**
 * Created by liukai on 16/8/15.
 */
var Handlebars = require('handlebars/runtime');
var templates = require('../templates/templates.js');


var create = function(options) {
  var message = options.message;
  var parentdiv=$('<div></div>');
  parentdiv.attr('id','alert-pop');
  parentdiv.appendTo('.main-header');

  parentdiv.html(Handlebars.templates['page-alert']({
    message: message,
    success: options.success ? true : false,
    fail: options.fail ? true : false
  }));

  setTimeout(function () {
    $('#alert-pop').remove();
  }, 2000);
};

module.exports = {
  create: create
};
