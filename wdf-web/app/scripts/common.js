var DOMAIN = '';

var API = {
  SMART_ROUT_INFO: DOMAIN + '/upp/web/v1/routes', // 获取全部智能路由接口
  SEARCH_SMART_ROUT: DOMAIN + '/upp/web/v1/feeRoute', //查询一条智能路由
  SMART_ROUT: DOMAIN + '/upp/web/v1/route', //智能路由
  STATIC_ROUT_INFO: DOMAIN + '/upp/web/v1/staticRoutes', // 获取全部静态路由接口
  STATIC_ROUT: DOMAIN + '/upp/web/v1/staticRoute', //静态路由接口
  ALL_TYPE_INFO: DOMAIN + '/upp/web/v1/allCodetables', //获取全部的类型接口
  ROUT: DOMAIN + '/upp/web/v1/route', //路由
  ACCOUNT_INFO: DOMAIN + '/upp/web/v1/accounts', //本方账户信息
  CHANNEL_INFO: DOMAIN + '/upp/web/v1/channelAbilitys',//查询通道信息
  CHANNEL_ITEM: DOMAIN + '/upp/web/v1/channelAbility',//查询单挑通道信息
  QUERY_INFO_CHANGE: DOMAIN + '/upp/web/v1/uppTodos',//查询信息变更
  QUERY_ITEM_CHANNEL: DOMAIN + '/upp/web/v1/maintainDetail', //查询单条通道信息
  QUERY_FEES_INFO: DOMAIN + '/upp/web/v1/channelFees',//查询所有计费信息
  QUERY_FEE_ITEM: DOMAIN + '/upp/web/v1/channelFee',//查询单个计费信息
  SAVE_CHANGE_INFO: DOMAIN + '/upp/web/v1/uppTodo' //保存审核信息
};

API.DUMMY = '';

//var WUI = window.WUI || {};

WUI.init = function (options) {
  // init global config
  WUI.config = WUI.config || {};
  WUI.config.system = options.system;
  WUI.config.locale = options.locale || 'zh-CN';

  var initSiteHeader = function (resp) {
    WUI.SiteHeader.create({
      $el: $('.main-header'),
      name: resp.aasUserPrincipal.ssoUserName,
      roles: resp.aasUserPrincipal.aasUserResources.roles ? resp.aasUserPrincipal.aasUserResources.roles[0].roleName : '',
      List : resp.aasUserPrincipal.aasUserResources.resources,
      sso : resp.aasUserPrincipal
    })
  };

  var filterMenus = function(resources) {
    var menus = [];

    for (var i = 0; i < resources.length; i++) {
      var resource = resources[i];

      if (resource.resourceType === 'menu') {
        if (resource.isLeaf === '0') {
          resource.linkUrl = 'javascript:void(0);';
          resource.subs = [];
        }
        menus.push(resource);
      }
    }

    return menus;
  };

  var findParent = function (resource, resources) {
    var result = null;

    if (resource.parentLevelStructure) {
      for (var i = 0; i < resources.length; i++) {
        if (resources[i].levelStructure === resource.parentLevelStructure) {
          result = resources[i];
          break;
        }
      }
    }

    return result;
  }

  var initSiteMenu = function (resp) {
    var menus = [];
    var multiMenus = false;
    var resources = resp.aasUserPrincipal.aasUserResources.resources;
    // 首页是为子系统单独添加的，没有放入后台做管理
    var isHome = window.location.href.indexOf(WUI.config.system + '/home.html') >= 0;

    if (WUI.config.system === 'order') {
      // 工单系统四级菜单结构如：1.2.3.4.5 (第一位为子系统)
      multiMenus = true;
      var menuResources = filterMenus(resources);

      for (var index = 0; index < menuResources.length; index++) {
        var menuResource = menuResources[index];
        var parent = findParent(menuResource, menuResources);

        if (!isHome && window.location.href.indexOf(menuResource.linkUr) >= 0) {
          menuResource.isActive = true;
        }

        if (parent) {
          parent.subs.push(menuResource);
        } else {
          menus.push(menuResource);
        }
      }
    } else {
      // 统一系统二级菜单结构如：1.2.3 (第一位为子系统)
      for (var i = 0; i < resources.length; i++) {
        var resource = resources[i];
        if (resource.linkUrl && resource.linkUrl.indexOf('trade-monitor') > 0) {
          resource.newPage = true;
        }
        if (resource.resourceType === 'menu') {
          var linkUrl = resource.linkUrl;
          var address = window.location.href;

          if (!isHome && address.indexOf(linkUrl) >= 0) {
            resource.isActive = true;
          }else if(linkUrl.indexOf('/ffan/') >=0 && window.location.href.indexOf('/ams') >=0 ){
            resource.isActive = true;
          }

          var level = resource.levelStructure.split('.');

          if (level[1] === '0') {
            resource.subs = [];

            for (var j = 0; j < resources.length; j++) {
              var sub = resources[j];

              if (sub.resourceType === 'menu' &&
                sub.levelStructure.split('.')[0] === resource.levelStructure.split('.')[0]
                && sub.levelStructure.split('.')[2] ==='0' &&
                sub.levelStructure.split('.')[1] != '0'
              ) {

                sub.subs = [];
                //for (var k = 0; k < resources.length; k++) {
                //  var third = resources[k];
                //  console.log('ss',third)
                //  if (third.resourceType === 'menu' &&
                //    third.parentLevelStructure === sub.levelStructure) {
                //    sub.isLeaf = true;
                //    sub.subs.push(third);
                //  }
                //}
                // 兼容新菜单结构
                sub.isLeaf = true;
                resource.subs.push(sub);
              }
            }
            console.log('123',sub)
            menus.push(resource);
          }
        }
      }
    }

    $('.main-sidebar').replaceWith(WUI.templates['site-menu']({
      menus: menus,
      isHome: isHome,
      multiMenus: multiMenus
    }));
  };

  var initConfigInfo = '';

  var initSiteFooter = function (resp) {
    $('.main-footer').replaceWith(WUI.templates['site-footer'](resp));
  };

  WUI.getResource = function (url, a) {
    var la = a ? a : window.location.pathname;
    url = la + url;
    for (var i = 0; i < initConfigInfo.length; i++) {
      var _link = initConfigInfo[i].linkUrl;
      if (url == _link) {
        var info = initConfigInfo[i];
      }
    }
    return info
  }

  var initSystem = function () {
    var url = '/' + WUI.config.system + '/web/v1/sso/getResources';
    var data;

    if (WUI.config.system === 'ams') {
      url = '/ams/v1/sso/getResources';
    } else if (WUI.config.system === 'order') {
      // 工单系统获取菜单
      url = '/app-coe-ordercenter/ordercenter/v1/sso/getResources';
    }

    WUI.ajax({
      url: url,
      method: 'POST',
      data: data
    }).done(function (resp) {
      WUI.config.userName = resp.aasUserPrincipal.ssoUserName,
        initSiteHeader(resp);
      initSiteMenu(resp);
      initSiteFooter(resp);
      initConfigInfo = resp.aasUserPrincipal.aasUserResources.resources;
      $.AdminLTE.init();
      WUI.ready();
    });
  };

  initSystem(options);
};

WUI.ready = WUI.ready || function () {
    console.error('WUI: Please provide WUI.ready function.');
  };

WUI.typeItem = function (sub, info) {
  var list = []
  info.map(function (item) {
    if (item.codeType == sub) {
      list.push(item);
    }
  })
  return list
}
