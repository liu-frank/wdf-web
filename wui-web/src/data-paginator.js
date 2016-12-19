/**
 * Created by liukai on 16/8/18.
 */


'use strict';

var Handlebars = require('handlebars/runtime');
var templates = require('../templates/templates.js');


var calPaginators = function(totalPage, currentPage) {
  var paginators = [];
  var i;

  if (totalPage > 9) {
    if (currentPage < 5) {
      for (i = 0; i < 9; i++) {
        paginators.push(i + 1);
      }
    } else if (currentPage > (totalPage - 5)) {
      for (i = 0; i < 9; i++) {
        paginators.push(totalPage - 9 + i + 1);
      }
    } else {
      for (i = 0; i < 9; i++) {
        paginators.push(currentPage - 4 + i + 1);
      }
    }
  } else {
    for (i = 0; i < totalPage; i++) {
      paginators.push(i + 1);
    }
  }

  return paginators;
};

var create = function(options) {
  var $el = options.$el;
  var total = options.total;
  var currentPage = options.currentPage + 1;
  var pageSize = options.pageSize;
  var offset = currentPage * pageSize;
  var totalPage = (total % pageSize) ? (parseInt(total / pageSize, 10) + 1) :
    parseInt(total / pageSize, 10);
  var start = (currentPage - 1) * pageSize + 1;
  var end = offset > total ? total : offset;
  var onSwitchPage = options.onSwitchPage;

  $el.html(Handlebars.templates['data-paginator']({
    currentPage: currentPage,
    pageSize: pageSize,
    total: total,
    totalPage: totalPage,
    start: start,
    end: end,
    paginators: calPaginators(totalPage, currentPage)
  }));

  $el.find('.paginator').click(function() {
    var target = $(this).data('role');

    switch (target) {
      case 'first':
        if (currentPage !== 1) {
          onSwitchPage(0);
        }
        break;
      case 'last':
        if (currentPage !== totalPage) {
          onSwitchPage(totalPage - 1);
        }
        break;
      case 'prev':
        if (currentPage > 1) {
          onSwitchPage(currentPage - 2);
        }
        break;
      case 'next':
        if (currentPage < totalPage) {
          onSwitchPage(currentPage);
        }
        break;
      default:
        var targetPage = parseInt(target, 10);
        if (targetPage !== currentPage) {
          onSwitchPage(targetPage - 1);
        }
        break;
    }
  });
};

module.exports = {
  create: create
};



