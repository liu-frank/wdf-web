'use strict';
// Constants
var PAGE_SIZE = 20;
var META = {
  outOrderNum: { label: '外部订单号' },
  payOrderNum: { label: '支付订单号' },
  payInstruction: { label: '支付指令号' },
  PWID: { label: 'PWID' },
  vipMobile: { label: '会员手机号' },
  orderAmount: { label: '订单金额(元)' },
  payAmount: { label: '支付金额(元)' },
  payWay: { label: '支付方式' },
  payChannel: { label: '支付渠道' },
  fromInvoking: { label: '支付调用方' },
  isMerge: { label: '是否合并支付' },
  instructionStatus: { label: '支付状态' },
  instructionCreateTime: { label: '支付生成时间' },
  statusChangeTime: { label: '状态变更时间' },
  payOrderCreateTime: { type: 'date-picker', label: '支付订单生成日期' }
};
var TABLE_FIELDS = [
  'outOrderNum', 'vipMobile', 'orderAmount', 'instructionStatus/payAmount',
  'payWay/payChannel', 'instructionCreateTime', 'statusChangeTime'
];
var FILTER_FIELDS = ['outOrderNum', 'payOrderNum', 'payInstruction', 'payOrderCreateTime'];
var EDIT_FIELDS = ['name', 'age', 'birthday', 'email', 'status'];
// Callback functions
var createData = function (item) {
  WUI.ModalDialog.create({
    onConfirm: function (itemInfo) {},
    onCancel: function () {}
  });

 WUI.dataDialog.create({
    $el: $('.modal-body'),
   dialogPop:true,
    meta: META,
    list: item,
    buttonHide: false,
    fields: EDIT_FIELDS
  });
};

var editData = function (item) {
  window.location.href = 'gateway-payment-detail.html?id=' + item.payOrderNum + '&payId=' + item.payInstruction;
};

var deleteData = function (item) {
  WUI.ModalDialog.create({
    message: '11111',
    title: '2222',
    onConfirm: function () { console.log('delete data'); }
  });
};

var activeData = function (items) {
  console.log('active: ' + items);
};

var deactiveData = function (items) {
  console.log('deactive: ' + items);
};

var queryData = function (options) {
  var editResource = WUI.getResource('/edit');
  var deleteResource = WUI.getResource('/delete');

  WUI.ajax({
    url: '/ams/v1/payment/query/payGatewayOrderList',
    jsonData: {
      outOrderNum: options.outOrderNum || '',
      payOrderNum: options.payOrderNum || '',
      payInstruction: options.payInstruction || '',
      vipMobile: options.vipMobile || '',
      payOrderCreateTime: options.payOrderCreateTime || '',
      pageNum: options.currentPage,
      pageSize: options.pageSize
    }
  }).then(function (resp) {
    WUI.DataTableEx.create({
      $el: $('.data-table'),
      meta: META,
      fields: TABLE_FIELDS,
      list: resp.payGatewayOrderList,
      operations: [{
        name: editResource && editResource.resourceDisplayName || '查看',
        callback: editData
      }]
    });

    WUI.DataPaginator.create({
      $el: $('.data-paginator'),
      currentPage: options.currentPage,
      total: resp.total,
      pageSize: options.pageSize,
      onSwitchPage: function (currentPage) {
        queryData({
          currentPage: currentPage,
          pageSize: options.pageSize
        });
      }
    });
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
        name: '支付网关支付订单查询'
      }]
  });

  WUI.DataFilterEx.create({
    $el: $('.data-filter'),
    meta: META,
    fields: FILTER_FIELDS,
    rightButton: {
      name: queryResource && queryResource.resourceDisplayName || '查询',
      callback: function(param) {
       console.log(param);
        queryData($.extend(param, {
          currentPage: 0,
          pageSize: PAGE_SIZE
        }));
      }
    }
    //leftButton: {
    //  name: '导出Excel',
    //  callback: function(param) {
    //
    //  }
    //}
  });

  queryData({
    currentPage: 0,
    pageSize: 20
  });
}
  // Keep this function
$(function () {
  WUI.init({
    system: 'ams'
  });
});
