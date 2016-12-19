'use strict';
// Constants
var PAGE_SIZE = 20;
var META = {
  orderNum: { label: '交易单号' },
  refundNum: { label: '退款单号' },
  merchantName: { label: '商户名称' },
  outlet: { label: '门店' },
  PWID: { label: 'PWID' },
  vipMobile: { label: '会员手机号' },
  payAmount: { label: '支付金额(元)' },
  refundAmount: { label: '退款金额(元)' },
  refundStatus: { label: '退款状态' },
  payChannel: { label: '支付渠道' },
  fromInvoking: { label: '支付调用方' },
  refundTime: { label: '退款发起时间', type: 'date-picker'}
};
var TABLE_FIELDS = [
  'refundTime', 'outlet/orderNum', 'merchantName/refundNum', 'vipMobile/PWID',
  'payChannel/payAmount', 'refundStatus/refundAmount', 'fromInvoking'
];
var FILTER_FIELDS = ['orderNum', 'vipMobile', 'refundTime'];

var queryData = function (options) {
  WUI.ajax({
    url: '/ams/v1/payment/query/paymentCodeRefundOrder',
    jsonData: {
      refundNum: options.refundNum || '',
      orderNum: options.orderNum || '',
      vipMobile: options.vipMobile || '',
      refundTime: options.refundTime || '',
      pageNum: options.currentPage,
      pageSize: options.pageSize
    }
  }).then(function (resp) {
    WUI.DataTableEx.create({
      $el: $('.data-table'),
      meta: META,
      fields: TABLE_FIELDS,
      list: resp.paymentCodeRefundOrderList
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
        name: '付款码退款订单查询'
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
