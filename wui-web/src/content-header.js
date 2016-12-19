/**
 * Created by liukai on 16/8/24.
 */

'use strict';
var Handlebars = require('handlebars/runtime');
var templates = require('../templates/templates.js');

var create = function(options) {
  var $el = options.$el;
  var meta = options.meta;

  $el.html(Handlebars.templates['content-header']({
    home: WUI.t('首页') ,
    paths: meta
  }));

};

module.exports = {
  create: create
};




