'use strict';
var Handlebars = require('handlebars/runtime');
var templates = require('../templates/templates.js');

var create = function(options) {
  var $el = options.$el;
  var onFilter = options.onFilter;
  var addFunc = options.addFunc;
  var searchTools = options.searchTools;
  var meta = options.meta;

  $el.html(Handlebars.templates['data-search']({
    searchTool: searchTools,
    data: meta.data,
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
  var _moreLen = $('.data-search-more .data-search-condition > label').length;
  if(_moreLen > 10){
    $('.data-search-more .data-search-condition').attr('style','overflow-y:scroll;');
  };

  $el.on('click','button',function(event){
    var _thisP = $(this).parent();
    if (_thisP.hasClass('active')) {
      _thisP.removeClass('active');
    }else{
      $el.find('li').removeClass('active');
      _thisP.addClass('active');
      if(_thisP.find('input[type=text]').length == '1'){
        _thisP.find('input[type=text]').focus();
      }
    }

    event.stopPropagation();
  });

  // 点击空白处收起弹出层，并阻止冒泡
  $('body').click(function(){
    $el.find('li').removeClass('active');
  });
  $el.on('click','ul:not(".data-tools") .data-search-condition',function(event){
    event.stopPropagation();
  });

  // 监控文本框输入
  $el.on('input','input[type=text]',function(){
    var _this = $(this);
    var _thisDom = _this.parent().find('input[type=text]');
    if(_thisDom.length == 2){
      _this.parents('li').find('p > span').text(_thisDom.eq(0).val() + ' ~ ' + _thisDom.eq(1).val());
    }else{
      _this.parents('li').find('p > span').text(_this.val());
    }
  });
  // 监控勾选框
  $el.on('click','li:not(".data-search-more") input[type=checkbox]',function(){
    var _this = $(this);
    var _thisP = _this.parents('.data-search-condition');
    var _thisName = _this.attr('name');
    var _thisALl = _thisP.find('input[type=checkbox][name='+_thisName+']');
    var _thisCheck = _thisP.find('input[type=checkbox][name='+_thisName+']:checked');
    var _thisHtml = '全部';
    if(_thisCheck.length == 0 || _thisCheck.length == _thisALl.length){
      _thisHtml = '全部';
    }else if(_thisCheck.length == 1){
      _thisHtml = _thisCheck.parent().text();
    }else{
      _thisHtml = _thisCheck.eq(0).parent().text();
      for(var i=1;i<_thisCheck.length;i++){
        _thisHtml += ',' + _thisCheck.eq(i).parent().text();
      }
    }

    _this.parents('li').find('p > span').text(_thisHtml);
  });
  // 勾选更多选项
  $el.find('li.data-search-more input[type=checkbox]').click(function(){
    var _this = $(this);
    var _thisName = _this.attr('name');
    if(_this.is(':checked')){
      for (var i = 0; i < meta.data.length; i++) {
        if (meta.data[i].columnName == _thisName) {
          var _nowJson = meta.data[i];
          var $elExtend = $el.find('.data-search-extend');
          WUI.DataSearchExtend.create({
            $el: $elExtend,
            meta: _nowJson
          });
          $el.find('.data-search-more').removeClass('active');

          return true;
        }
      }
    }else{
      $el.find('.data-search-extend input[name='+_thisName+']').parents('li').remove();
    }
  });

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



