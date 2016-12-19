/**
 * Created by liukai on 16/8/18.
 */

'use strict';
var Handlebars = require('handlebars/runtime');
var templates = require('../templates/templates.js');

var tools = require('./wui-tools.js');
var create = function(options) {
  if($('#html-dialog')){
    $('#html-dialog').remove();
  };
  var message = options.message;
  var onConfirm = options.onConfirm;
  var cancelFunc = options.onCancel;

  var parentdiv=$('<div></div>');
  parentdiv.attr('id','html-dialog');
  parentdiv.appendTo('body');

  parentdiv.html(Handlebars.templates['modal-dialog']({
    message : message ? message : false,
    title : options.title ? options.title : false,
    onConfirm : onConfirm ? true : false,
    cancelFunc : cancelFunc ? true : false,
    buttonHide: options.buttonHide ? true : false,
  }));
  $('#myModal').modal('show');
  if(onConfirm) {
    $('#confirmButton').click(function () {
      onConfirm();
    });
  }
  if(cancelFunc) {
    $('#cancelButton').click(function () {
      cancelFunc();
    });
  }
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




