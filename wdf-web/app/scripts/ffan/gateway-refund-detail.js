'use strict';
// Constants
var META = {
  PWID: { label: 'PWID' },
  vipMobile: { label: '会员手机号' },
  orderNum: { label: '退款单号' },
  oldOrderNum: { label: '原订单号' },
  oldPaySeq: { label: '原支付流水号' },
  refundSeq: { label: '退款流水号' },
  refundTime: { label: '退款处理时间' },
  paySource: { label: '支付来源' },
  payChannel: { label: '支付渠道' },
  payType: { label: '支付方式' },
  refundType: { label: '退款类型' },
  refundStatus: { label: '退款状态' },
  orderAmount: { label: '原订单金额(元)' },
  realPayAmount: { label: '实际支付金额(元)' },
  payBenefit: { label: '支付优惠(元)' },
  refundAmount: { label: '退款金额(元)' }
};
var INFO_FIELDS = [
  [ 'PWID', 'vipMobile' ],
  [ 'orderNum', 'oldOrderNum', 'oldPaySeq', 'refundSeq',
    'refundTime', 'paySource', 'payChannel', 'payType',
    'refundType', 'refundStatus', 'orderAmount', 'payBenefit',
    'realPayAmount', 'refundAmount']
];
// Callback Functions
var submitData = function (item, etag) {
  //WUI.ajax({
  //  url: '/sample/web/v1/users/' + WUI.link().id,
  //  jsonData: $.extend(item, {
  //    _etag: etag
  //  })
  //}).done(function () {
  //  WUI.alert.create({
  //    message: '成功',
  //    success: true
  //  });
  //  /**
  //  setTimeout(function() {
  //    window.close();
  //  }, 2000);
  //  */
  //});
  console.log('2132131');
};
var TABLE_FIELDS = ['id', 'name', 'email', 'age'];
var FILTER_FIELDS = ['phone'];
// Callback functions
var editData = function (item) {
  // window.open('allowance-detail.html?id=' + item.id);
  window.location.href = 'allowance-detail.html?id=' + item.id;
};

var queryData = function (options) {
  var editResource = WUI.getResource('/edit');

  WUI.ajax({
    url: '/ams/v1/payment/query/refundOrderLogList',
    jsonData: {
      refundSeq : WUI.link().refundSeq,
      orderNum: WUI.link().id,
      refundId:WUI.link().refundId,
      pageNum: options.currentPage,
      pageSize: options.pageSize
    }
  }).then(function (resp) {
    WUI.DataTable.create({
      $el: $('.data-table'),
      meta: {
        operateTime: { label: '操作时间' },
        operater: { label: '操作方' },
        operateDesc: { label: '操作行为' },
        orderStatus: { label: '订单状态' },
        remark: { label: '备注' }
      },
      fields: ['operateTime', 'operater', 'operateDesc', 'orderStatus', 'remark'],
      list: resp.refundLogList
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
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '首页',
      url: '/ams'
    }, {
      name: '飞凡通业务'
    },
      {
        name: '支付网关退款订单查询',
        url:'gateway-refund-list.html'
      },
      {
        name: '退款订单详情'
      }
    ]
  });

  WUI.ajax({
    url: '/ams/v1/payment/query/refundOrderDetail',
    jsonData: {
      refundSeq : WUI.link().refundSeq,
      refundId:WUI.link().refundId,
      orderNum: WUI.link().id
    }
  }).done(function (resp) {
    var user = resp.data;
    var editResource = WUI.getResource('/edit');

    WUI.InfoTable.create({
      $el: $('.info-table'),
      meta: META,
      data: resp.refundOrderDetail,
      fields: INFO_FIELDS
    });

  });

  queryData({
    currentPage: 0,
    pageSize: 20
  });
};
// Keep this function
$(function () {
  WUI.init({
    system: 'ams'
  });
});
