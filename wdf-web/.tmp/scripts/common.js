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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIERPTUFJTiA9ICcnO1xuXG52YXIgQVBJID0ge1xuICBTTUFSVF9ST1VUX0lORk86IERPTUFJTiArICcvdXBwL3dlYi92MS9yb3V0ZXMnLCAvLyDojrflj5blhajpg6jmmbrog73ot6/nlLHmjqXlj6NcbiAgU0VBUkNIX1NNQVJUX1JPVVQ6IERPTUFJTiArICcvdXBwL3dlYi92MS9mZWVSb3V0ZScsIC8v5p+l6K+i5LiA5p2h5pm66IO96Lev55SxXG4gIFNNQVJUX1JPVVQ6IERPTUFJTiArICcvdXBwL3dlYi92MS9yb3V0ZScsIC8v5pm66IO96Lev55SxXG4gIFNUQVRJQ19ST1VUX0lORk86IERPTUFJTiArICcvdXBwL3dlYi92MS9zdGF0aWNSb3V0ZXMnLCAvLyDojrflj5blhajpg6jpnZnmgIHot6/nlLHmjqXlj6NcbiAgU1RBVElDX1JPVVQ6IERPTUFJTiArICcvdXBwL3dlYi92MS9zdGF0aWNSb3V0ZScsIC8v6Z2Z5oCB6Lev55Sx5o6l5Y+jXG4gIEFMTF9UWVBFX0lORk86IERPTUFJTiArICcvdXBwL3dlYi92MS9hbGxDb2RldGFibGVzJywgLy/ojrflj5blhajpg6jnmoTnsbvlnovmjqXlj6NcbiAgUk9VVDogRE9NQUlOICsgJy91cHAvd2ViL3YxL3JvdXRlJywgLy/ot6/nlLFcbiAgQUNDT1VOVF9JTkZPOiBET01BSU4gKyAnL3VwcC93ZWIvdjEvYWNjb3VudHMnLCAvL+acrOaWuei0puaIt+S/oeaBr1xuICBDSEFOTkVMX0lORk86IERPTUFJTiArICcvdXBwL3dlYi92MS9jaGFubmVsQWJpbGl0eXMnLC8v5p+l6K+i6YCa6YGT5L+h5oGvXG4gIENIQU5ORUxfSVRFTTogRE9NQUlOICsgJy91cHAvd2ViL3YxL2NoYW5uZWxBYmlsaXR5JywvL+afpeivouWNleaMkemAmumBk+S/oeaBr1xuICBRVUVSWV9JTkZPX0NIQU5HRTogRE9NQUlOICsgJy91cHAvd2ViL3YxL3VwcFRvZG9zJywvL+afpeivouS/oeaBr+WPmOabtFxuICBRVUVSWV9JVEVNX0NIQU5ORUw6IERPTUFJTiArICcvdXBwL3dlYi92MS9tYWludGFpbkRldGFpbCcsIC8v5p+l6K+i5Y2V5p2h6YCa6YGT5L+h5oGvXG4gIFFVRVJZX0ZFRVNfSU5GTzogRE9NQUlOICsgJy91cHAvd2ViL3YxL2NoYW5uZWxGZWVzJywvL+afpeivouaJgOacieiuoei0ueS/oeaBr1xuICBRVUVSWV9GRUVfSVRFTTogRE9NQUlOICsgJy91cHAvd2ViL3YxL2NoYW5uZWxGZWUnLC8v5p+l6K+i5Y2V5Liq6K6h6LS55L+h5oGvXG4gIFNBVkVfQ0hBTkdFX0lORk86IERPTUFJTiArICcvdXBwL3dlYi92MS91cHBUb2RvJyAvL+S/neWtmOWuoeaguOS/oeaBr1xufTtcblxuQVBJLkRVTU1ZID0gJyc7XG5cbi8vdmFyIFdVSSA9IHdpbmRvdy5XVUkgfHwge307XG5cbldVSS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgLy8gaW5pdCBnbG9iYWwgY29uZmlnXG4gIFdVSS5jb25maWcgPSBXVUkuY29uZmlnIHx8IHt9O1xuICBXVUkuY29uZmlnLnN5c3RlbSA9IG9wdGlvbnMuc3lzdGVtO1xuICBXVUkuY29uZmlnLmxvY2FsZSA9IG9wdGlvbnMubG9jYWxlIHx8ICd6aC1DTic7XG5cbiAgdmFyIGluaXRTaXRlSGVhZGVyID0gZnVuY3Rpb24gKHJlc3ApIHtcbiAgICBXVUkuU2l0ZUhlYWRlci5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcubWFpbi1oZWFkZXInKSxcbiAgICAgIG5hbWU6IHJlc3AuYWFzVXNlclByaW5jaXBhbC5zc29Vc2VyTmFtZSxcbiAgICAgIHJvbGVzOiByZXNwLmFhc1VzZXJQcmluY2lwYWwuYWFzVXNlclJlc291cmNlcy5yb2xlcyA/IHJlc3AuYWFzVXNlclByaW5jaXBhbC5hYXNVc2VyUmVzb3VyY2VzLnJvbGVzWzBdLnJvbGVOYW1lIDogJycsXG4gICAgICBMaXN0IDogcmVzcC5hYXNVc2VyUHJpbmNpcGFsLmFhc1VzZXJSZXNvdXJjZXMucmVzb3VyY2VzLFxuICAgICAgc3NvIDogcmVzcC5hYXNVc2VyUHJpbmNpcGFsXG4gICAgfSlcbiAgfTtcblxuICB2YXIgZmlsdGVyTWVudXMgPSBmdW5jdGlvbihyZXNvdXJjZXMpIHtcbiAgICB2YXIgbWVudXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcmVzb3VyY2UgPSByZXNvdXJjZXNbaV07XG5cbiAgICAgIGlmIChyZXNvdXJjZS5yZXNvdXJjZVR5cGUgPT09ICdtZW51Jykge1xuICAgICAgICBpZiAocmVzb3VyY2UuaXNMZWFmID09PSAnMCcpIHtcbiAgICAgICAgICByZXNvdXJjZS5saW5rVXJsID0gJ2phdmFzY3JpcHQ6dm9pZCgwKTsnO1xuICAgICAgICAgIHJlc291cmNlLnN1YnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBtZW51cy5wdXNoKHJlc291cmNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWVudXM7XG4gIH07XG5cbiAgdmFyIGZpbmRQYXJlbnQgPSBmdW5jdGlvbiAocmVzb3VyY2UsIHJlc291cmNlcykge1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuXG4gICAgaWYgKHJlc291cmNlLnBhcmVudExldmVsU3RydWN0dXJlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocmVzb3VyY2VzW2ldLmxldmVsU3RydWN0dXJlID09PSByZXNvdXJjZS5wYXJlbnRMZXZlbFN0cnVjdHVyZSkge1xuICAgICAgICAgIHJlc3VsdCA9IHJlc291cmNlc1tpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB2YXIgaW5pdFNpdGVNZW51ID0gZnVuY3Rpb24gKHJlc3ApIHtcbiAgICB2YXIgbWVudXMgPSBbXTtcbiAgICB2YXIgbXVsdGlNZW51cyA9IGZhbHNlO1xuICAgIHZhciByZXNvdXJjZXMgPSByZXNwLmFhc1VzZXJQcmluY2lwYWwuYWFzVXNlclJlc291cmNlcy5yZXNvdXJjZXM7XG4gICAgLy8g6aaW6aG15piv5Li65a2Q57O757uf5Y2V54us5re75Yqg55qE77yM5rKh5pyJ5pS+5YWl5ZCO5Y+w5YGa566h55CGXG4gICAgdmFyIGlzSG9tZSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoV1VJLmNvbmZpZy5zeXN0ZW0gKyAnL2hvbWUuaHRtbCcpID49IDA7XG5cbiAgICBpZiAoV1VJLmNvbmZpZy5zeXN0ZW0gPT09ICdvcmRlcicpIHtcbiAgICAgIC8vIOW3peWNleezu+e7n+Wbm+e6p+iPnOWNlee7k+aehOWmgu+8mjEuMi4zLjQuNSAo56ys5LiA5L2N5Li65a2Q57O757ufKVxuICAgICAgbXVsdGlNZW51cyA9IHRydWU7XG4gICAgICB2YXIgbWVudVJlc291cmNlcyA9IGZpbHRlck1lbnVzKHJlc291cmNlcyk7XG5cbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBtZW51UmVzb3VyY2VzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB2YXIgbWVudVJlc291cmNlID0gbWVudVJlc291cmNlc1tpbmRleF07XG4gICAgICAgIHZhciBwYXJlbnQgPSBmaW5kUGFyZW50KG1lbnVSZXNvdXJjZSwgbWVudVJlc291cmNlcyk7XG5cbiAgICAgICAgaWYgKCFpc0hvbWUgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZihtZW51UmVzb3VyY2UubGlua1VyKSA+PSAwKSB7XG4gICAgICAgICAgbWVudVJlc291cmNlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICBwYXJlbnQuc3Vicy5wdXNoKG1lbnVSZXNvdXJjZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVudXMucHVzaChtZW51UmVzb3VyY2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOe7n+S4gOezu+e7n+S6jOe6p+iPnOWNlee7k+aehOWmgu+8mjEuMi4zICjnrKzkuIDkvY3kuLrlrZDns7vnu58pXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSByZXNvdXJjZXNbaV07XG4gICAgICAgIGlmIChyZXNvdXJjZS5saW5rVXJsICYmIHJlc291cmNlLmxpbmtVcmwuaW5kZXhPZigndHJhZGUtbW9uaXRvcicpID4gMCkge1xuICAgICAgICAgIHJlc291cmNlLm5ld1BhZ2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNvdXJjZS5yZXNvdXJjZVR5cGUgPT09ICdtZW51Jykge1xuICAgICAgICAgIHZhciBsaW5rVXJsID0gcmVzb3VyY2UubGlua1VybDtcbiAgICAgICAgICB2YXIgYWRkcmVzcyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgICAgaWYgKCFpc0hvbWUgJiYgYWRkcmVzcy5pbmRleE9mKGxpbmtVcmwpID49IDApIHtcbiAgICAgICAgICAgIHJlc291cmNlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICB9ZWxzZSBpZihsaW5rVXJsLmluZGV4T2YoJy9mZmFuLycpID49MCAmJiB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcvYW1zJykgPj0wICl7XG4gICAgICAgICAgICByZXNvdXJjZS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGxldmVsID0gcmVzb3VyY2UubGV2ZWxTdHJ1Y3R1cmUuc3BsaXQoJy4nKTtcblxuICAgICAgICAgIGlmIChsZXZlbFsxXSA9PT0gJzAnKSB7XG4gICAgICAgICAgICByZXNvdXJjZS5zdWJzID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzb3VyY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIHZhciBzdWIgPSByZXNvdXJjZXNbal07XG5cbiAgICAgICAgICAgICAgaWYgKHN1Yi5yZXNvdXJjZVR5cGUgPT09ICdtZW51JyAmJlxuICAgICAgICAgICAgICAgIHN1Yi5sZXZlbFN0cnVjdHVyZS5zcGxpdCgnLicpWzBdID09PSByZXNvdXJjZS5sZXZlbFN0cnVjdHVyZS5zcGxpdCgnLicpWzBdXG4gICAgICAgICAgICAgICAgJiYgc3ViLmxldmVsU3RydWN0dXJlLnNwbGl0KCcuJylbMl0gPT09JzAnICYmXG4gICAgICAgICAgICAgICAgc3ViLmxldmVsU3RydWN0dXJlLnNwbGl0KCcuJylbMV0gIT0gJzAnXG4gICAgICAgICAgICAgICkge1xuXG4gICAgICAgICAgICAgICAgc3ViLnN1YnMgPSBbXTtcbiAgICAgICAgICAgICAgICAvL2ZvciAodmFyIGsgPSAwOyBrIDwgcmVzb3VyY2VzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgLy8gIHZhciB0aGlyZCA9IHJlc291cmNlc1trXTtcbiAgICAgICAgICAgICAgICAvLyAgY29uc29sZS5sb2coJ3NzJyx0aGlyZClcbiAgICAgICAgICAgICAgICAvLyAgaWYgKHRoaXJkLnJlc291cmNlVHlwZSA9PT0gJ21lbnUnICYmXG4gICAgICAgICAgICAgICAgLy8gICAgdGhpcmQucGFyZW50TGV2ZWxTdHJ1Y3R1cmUgPT09IHN1Yi5sZXZlbFN0cnVjdHVyZSkge1xuICAgICAgICAgICAgICAgIC8vICAgIHN1Yi5pc0xlYWYgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vICAgIHN1Yi5zdWJzLnB1c2godGhpcmQpO1xuICAgICAgICAgICAgICAgIC8vICB9XG4gICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgLy8g5YW85a655paw6I+c5Y2V57uT5p6EXG4gICAgICAgICAgICAgICAgc3ViLmlzTGVhZiA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2Uuc3Vicy5wdXNoKHN1Yik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcxMjMnLHN1YilcbiAgICAgICAgICAgIG1lbnVzLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgICQoJy5tYWluLXNpZGViYXInKS5yZXBsYWNlV2l0aChXVUkudGVtcGxhdGVzWydzaXRlLW1lbnUnXSh7XG4gICAgICBtZW51czogbWVudXMsXG4gICAgICBpc0hvbWU6IGlzSG9tZSxcbiAgICAgIG11bHRpTWVudXM6IG11bHRpTWVudXNcbiAgICB9KSk7XG4gIH07XG5cbiAgdmFyIGluaXRDb25maWdJbmZvID0gJyc7XG5cbiAgdmFyIGluaXRTaXRlRm9vdGVyID0gZnVuY3Rpb24gKHJlc3ApIHtcbiAgICAkKCcubWFpbi1mb290ZXInKS5yZXBsYWNlV2l0aChXVUkudGVtcGxhdGVzWydzaXRlLWZvb3RlciddKHJlc3ApKTtcbiAgfTtcblxuICBXVUkuZ2V0UmVzb3VyY2UgPSBmdW5jdGlvbiAodXJsLCBhKSB7XG4gICAgdmFyIGxhID0gYSA/IGEgOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdXJsID0gbGEgKyB1cmw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0Q29uZmlnSW5mby5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIF9saW5rID0gaW5pdENvbmZpZ0luZm9baV0ubGlua1VybDtcbiAgICAgIGlmICh1cmwgPT0gX2xpbmspIHtcbiAgICAgICAgdmFyIGluZm8gPSBpbml0Q29uZmlnSW5mb1tpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluZm9cbiAgfVxuXG4gIHZhciBpbml0U3lzdGVtID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB1cmwgPSAnLycgKyBXVUkuY29uZmlnLnN5c3RlbSArICcvd2ViL3YxL3Nzby9nZXRSZXNvdXJjZXMnO1xuICAgIHZhciBkYXRhO1xuXG4gICAgaWYgKFdVSS5jb25maWcuc3lzdGVtID09PSAnYW1zJykge1xuICAgICAgdXJsID0gJy9hbXMvdjEvc3NvL2dldFJlc291cmNlcyc7XG4gICAgfSBlbHNlIGlmIChXVUkuY29uZmlnLnN5c3RlbSA9PT0gJ29yZGVyJykge1xuICAgICAgLy8g5bel5Y2V57O757uf6I635Y+W6I+c5Y2VXG4gICAgICB1cmwgPSAnL2FwcC1jb2Utb3JkZXJjZW50ZXIvb3JkZXJjZW50ZXIvdjEvc3NvL2dldFJlc291cmNlcyc7XG4gICAgfVxuXG4gICAgV1VJLmFqYXgoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgICBXVUkuY29uZmlnLnVzZXJOYW1lID0gcmVzcC5hYXNVc2VyUHJpbmNpcGFsLnNzb1VzZXJOYW1lLFxuICAgICAgICBpbml0U2l0ZUhlYWRlcihyZXNwKTtcbiAgICAgIGluaXRTaXRlTWVudShyZXNwKTtcbiAgICAgIGluaXRTaXRlRm9vdGVyKHJlc3ApO1xuICAgICAgaW5pdENvbmZpZ0luZm8gPSByZXNwLmFhc1VzZXJQcmluY2lwYWwuYWFzVXNlclJlc291cmNlcy5yZXNvdXJjZXM7XG4gICAgICAkLkFkbWluTFRFLmluaXQoKTtcbiAgICAgIFdVSS5yZWFkeSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGluaXRTeXN0ZW0ob3B0aW9ucyk7XG59O1xuXG5XVUkucmVhZHkgPSBXVUkucmVhZHkgfHwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1dVSTogUGxlYXNlIHByb3ZpZGUgV1VJLnJlYWR5IGZ1bmN0aW9uLicpO1xuICB9O1xuXG5XVUkudHlwZUl0ZW0gPSBmdW5jdGlvbiAoc3ViLCBpbmZvKSB7XG4gIHZhciBsaXN0ID0gW11cbiAgaW5mby5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5jb2RlVHlwZSA9PSBzdWIpIHtcbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH0pXG4gIHJldHVybiBsaXN0XG59XG4iXSwiZmlsZSI6ImNvbW1vbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
