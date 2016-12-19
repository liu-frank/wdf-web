'use strict';
var Handlebars = require('handlebars/runtime');
var templates = require('../templates/templates.js');

var create = function(options) {
  var $el = options.$el;
  var meta = options.meta;

  $el.append(Handlebars.templates['data-search-extend'](meta));

  $el.find('.data-search-close > span').click(function(){
    var _this = $(this).parents('li');
    var _thisName = _this.find('input').attr('name');
    $el.parents('.data-search').find('.data-search-more input[name='+ _thisName +']').prop('checked',false);
    _this.remove();
  });

  if($el.find('li.active input[type=text]').length == 1){
    $el.find('li.active input[type=text]').focus();
  }

  $('.data-search .form-control-date').datetimepicker({
    language:  'zh-CN',
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    minView: 2,
    forceParse: 0
  }).on('hide', function(ev){
    var _this = $(this);
    var _thisDom = _this.parent().find('input[type=text]');
    _this.parents('li').find('p > span').text(_thisDom.eq(0).val() + ' ~ ' + _thisDom.eq(1).val());
  });
};

module.exports = {
  create: create
};



