'use strict';
// Constants
var PAGE_SIZE = 20;
var META = {
  orderNum: { label: '退款单号' },
  oldOrderNum: { label: '原订单号' },
  refundSeq: { label: '退款流水号' },
  refundTime: { label: '退款处理时间', type: 'date-picker'},
  PWID: { label: 'PWID' },
  vipMobile: { label: '会员手机号' },
  paySource: { label: '支付来源' },
  payChannel: { label: '支付渠道' },
  refundType: { label: '退款类型', type: 'select',
                options: [
                  {label: '全部', value: ''},
                  {label: '交易退款', value: '0'},
                  {label: '长款转退款', value: '1'},
                  {label: '支付纠错退款', value: '2'}
                ] },
  refundStatus: { label: '退款状态', type: 'select',
                options: [
                  {label: '全部', value: ''},
                  {label: '退款中', value: '0'},
                  {label: '退款成功', value: '1'},
                  {label: '退款失败', value: '2'},
                  {label: '待审核', value: '3'},
                  {label: '驳回', value: '4'},
                  {label: '线下退款成功', value: '5'},
                  {label: '退款终止成功', value: '6'},

                ] },
  orderAmount: { label: '订单金额(元)' },
  refundAmount: { label: '退款金额(元)' },
  payType: { label: '支付方式' }
};
var TABLE_FIELDS = [
  'orderNum', 'oldOrderNum', 'vipMobile', 'refundType/refundTime',
  'paySource/orderAmount', 'refundStatus/refundAmount', 'payChannel/payType'
];
var FILTER_FIELDS = [
  'orderNum', 'oldOrderNum', 'refundSeq', 'refundTime',
  'refundType', 'refundStatus'
];
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
  window.location.href = 'gateway-refund-detail.html?id=' + item.orderNum + '&refundSeq=' + item.refundSeq + '&refundId=' + item.refundId;
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
    url: '/ams/v1/payment/query/payGatewayRefundOrder',
    jsonData: {
      orderNum: options.orderNum || '',
      oldOrderNum: options.oldOrderNum || '',
      refundSeq: options.refundSeq || '',
      refundTime: options.refundTime || '',
      refundType: options.refundType || '',
      refundStatus: options.refundStatus || '',
      vipMobile: options.vipMobile || '',
      pageNum: options.currentPage,
      pageSize: options.pageSize
    }
  }).then(function (resp) {
    WUI.DataTableEx.create({
      $el: $('.data-table'),
      meta: META,
      fields: TABLE_FIELDS,
      list: resp.payGatewayRefundOrderList,
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
        name: '支付网关退款订单查询'
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
    },
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
