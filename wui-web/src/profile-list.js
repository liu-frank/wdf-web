'use strict';
var Handlebars = require('handlebars/runtime');
var templates = require('../templates/templates.js');


var create = function(options) {
  var $el = options.$el;

  $el.html(Handlebars.templates['profile-list']({
    list: [{
      avatarUrl: '../images/sample/sample-page-avatar1.png'
    }, {
      avatarUrl: '../images/sample/sample-page-avatar2.png'
    }, {
      avatarUrl: '../images/sample/sample-page-avatar3.png'
    }, {
      avatarUrl: '../images/sample/sample-page-avatar4.png'
    }, {
      avatarUrl: '../images/sample/sample-page-avatar5.png'
    }]
  }));
};

module.exports = {
  create: create
};
