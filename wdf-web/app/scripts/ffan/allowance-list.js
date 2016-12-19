'use strict';
// Constants
var PAGE_SIZE = 20;
var META = {
  PWID: { label: 'PWID'},
  mobile: { label: '手机号码', type: 'phone'},
  email: { label: 'Email', type: 'email' },
  accountName: { label: '姓名' },
  realNameLevel: { label: '实名等级' },
  accountResource: { label: '开户来源' },
  accountStatus: {
    label: '状态',
    options:[
      {
      label:'创建',
      value:'0'
      },
      {
        label:'正常',
        value:'1'
      },
      {
        label:'冻结',
        value:'2'
      },
      {
        label:'已合并',
        value:'8'
      },
      {
        label:'注销',
        value:'9'
      }
    ],
    type:'select'
  },
  openTime: {
    label: '开户时间'
  },
  status: {
    label: '状态',
    type: 'select',
    options: [{
      label: '正常',
      value: 0
    }]
  }
};
var TABLE_FIELDS = ['PWID', 'mobile', 'email', 'accountName', 'realNameLevel', 'accountResource', 'accountStatus', 'openTime'];
var FILTER_FIELDS = ['mobile'];
// Callback functions
var editData = function (item) {
  // window.open('allowance-detail.html?id=' + item.id);
  window.location.href = 'allowance-detail.html?id=' + item.PWID+'&phone=' + item.mobile;
};

var queryData = function (options) {
  var editResource = WUI.getResource('/detail');

 console.log( {
      currentPage: options.currentPage,
      pageSize: options.pageSize,
      mobile: options.mobile
    });

  WUI.ajax({
    url: '/ams/v1/pocketMoney/query/accountList',
    jsonData: {
      //pageNum: options.currentPage,
      //pageSize: options.pageSize,
      mobile: options.mobile
    }
  }).then(function (resp) {
    WUI.DataTable.create({
      $el: $('.data-table'),
      meta: META,
      fields: TABLE_FIELDS,
      list: resp.memberList,
      operations: [{
        name: editResource && editResource.resourceDisplayName,
        callback: editData
      }]
    });

    //WUI.DataPaginator.create({
    //  $el: $('.data-paginator'),
    //  currentPage: options.currentPage,
    //  total: resp.total,
    //  pageSize: options.pageSize,
    //  onSwitchPage: function (currentPage) {
    //    queryData({
    //      currentPage: currentPage,
    //      pageSize: options.pageSize
    //    });
    //  }
    //});
  });
};
// Load Page
WUI.ready = function () {
  var queryResource = WUI.getResource('/query');
  var addResource = WUI.getResource('/add');

  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '首页',
      url: '/ams'
    },
      {
        name: '飞凡通业务'
      },
      {
        name: '飞凡通账户查询'
      }]
  });

  WUI.DataFilterEx.create({
    $el: $('.data-filter'),
    meta: META,
    fields: FILTER_FIELDS,
    rightButton: {
      name: queryResource && queryResource.resourceDisplayName || '查询',
      callback: function(param) {
        queryData($.extend(param, {
          currentPage: 0,
          pageSize: PAGE_SIZE
        }));
      }
    }
  });

  //queryData({
  //  currentPage: 0,
  //  pageSize: 20
  //});
}
  // Keep this function
$(function () {
  WUI.init({
    system: 'ams'
  });
});
