/**
 * Created by liukai on 16/8/18.
 */

'use strict';
var Handlebars = require('handlebars/runtime');
var templates = require('../templates/templates.js');

var tools = require('./wui-tools.js');
var modalDialog = require('./modal-dialog.js')
var create = function(options) {
  var meta = options.meta;
  var onConfirm = options.onConfirm;
  var cancelFunc = options.onCancel;
  var fields = options.fields.map(function(field) {
    var target = $.extend({}, meta[field], {
      name: field,
      value: options.list[field] ? options.list[field] : ''
    });
    if(target.formatDate){
      target.value = tools.getFormat(target.value,'yyyy-MM-dd HH:mm:ss');
    }
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

  if($('#html-dialog')){
      $('#html-dialog').html('');
  };
  modalDialog.create({
      title: dialogPopTitle ? dialogPopTitle : false
  });
  $('.modal-footer').remove();
  var parentdiv = $('.modal-body');

  parentdiv.html(Handlebars.templates['data-dialog']({
    fields: fields,
    onConfirm: options.onConfirm ? true : false,
    cancelFunc: cancelFunc ? true : false,
    textInfo: options.textInfo ? options.textInfo : false,
    textInfoShow:options.textInfoShow ? options.textInfoShow : false,
    confirmButton : options.confirmButton ? options.confirmButton : false,
    cancelButton : options.cancelButton ?  options.cancelButton : false
  }));

  $('#modal').click(function() {
    var paramArray = parentdiv.find('form').serializeArray();
    var paramObj = {};
    paramArray.forEach(function(param) {
      paramObj[param.name] = param.value;
    });
    onConfirm(paramObj);
    event.preventDefault();
  });
  if(cancelFunc) {
    $('#cancelButton').click(function () {
      event.preventDefault();
      var paramArray = parentdiv.find('form').serializeArray();
      var paramObj = {};
      paramArray.forEach(function (param) {
        paramObj[param.name] = param.value;
      });
      cancelFunc(paramObj);
    });
  }
  $('#myModal').modal('show');

  return({
    show:function(){
      $('#myModal').modal('show');
    },
    hide:function(){
      $('#myModal').modal('hide');
    }

  })
};

module.exports = {
  create: create
};





