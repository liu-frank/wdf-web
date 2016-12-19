'use strict';

var Handlebars = require('handlebars/runtime');
var templates = require('../templates/templates.js');

var create = function(options) {
  var $el = options.$el;
  var List = options.List;
  var sso = options.sso;
  var headList = []
  if (List) {
    List.map(function(item){
      if(item.resourceType == 'indexTitle'){
        var linkUrl = item.linkUrl.replace('<ticket>', sso.ssoTicket);
        linkUrl = linkUrl.replace('<userid>',sso.ssoUserId);
        var itemDir = {}
        itemDir['title'] = item.resourceDisplayName
        if(item.resourceDisplayName == '运营系统' && window.location.href.indexOf('/ffan/') > 0){
          itemDir['Active'] = true
        }else{
          itemDir['Active'] = window.location.href.indexOf(linkUrl) > 0 ? true : false
        }
        itemDir['Herf'] = linkUrl
        headList.push(itemDir);
      }
    });
  }

  $el.html(Handlebars.templates['site-header']({
    name:options.name,
    roles:options.roles,
    headList : headList,
    cmdbQuick : options.cmdbQuick
  }));

  $el.find('#change-password').click(function() {
    WUI.ajax({
      url: '/upp/web/v1/sso/getResetPassword'
    }).done(function(resp) {
      window.location.href = resp.resetPasswordUrl;
    });
  });

  $el.find('#logout').click(function() {
    if (WUI.config.system == 'cmdb') {
      delCookie('CMDB-TOKEN');
      delCookie('CMDB-TOKEN-TYPE');
      delCookie('CMDB-USERNAME');
      window.location.href = '/cmdb/login.html';
    } else if (WUI.config.system === 'order') {
      WUI.ajax({
        url: '/app-coe-ordercenter/ordercenter/v1/sso/logout'
      }).done(function(resp) {
        window.location.href = resp.loginUrl;
      });
    } else {
      WUI.ajax({
        url: '/' + WUI.config.system + '/v1/sso/logout'
      }).done(function(resp) {
        window.location.href = resp.loginUrl;
      });
    }
  });
};

module.exports = {
  create: create
};
