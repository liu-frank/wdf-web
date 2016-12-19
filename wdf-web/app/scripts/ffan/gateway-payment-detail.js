'use strict';
// Constants
var META = {
  PWID: { label: 'PWID' },
  outOrderNum: { label: '外部订单号' },
  payOrderNum: { label: '支付订单号' },
  payOrderStatus: { label: '支付订单状态' },
  OrderCreateTime: { label: '支付订单生成时间' },
  OrderStatusChangeTime: { label: '支付订单状态变更时间' },
  isMerge: { label: '是否合并支付' },
  payInstruction: { label: '支付指令号' },
  instructionStatus: { label: '支付指令状态' },
  ffanId: { label: '飞凡会员ID' },
  merchantName: { label: '商户' },
  vipMobile: { label: '会员手机号' },
  instructionCreateTime: { label: '支付指令生成时间' },
  instructionStatusChangeTime: { label: '支付指令状态变更时间' },
  orderAmount: { label: '订单金额(元)' },
  payAmount: { label: '支付金额(元)' },
  payWay: { label: '支付方式' },
  payChannel: { label: '支付渠道' },
  payChannelResponseNum: { label: '支付渠道响应号' },
  fromInvoking: { label: '支付调用方' },
  outlet: { label: '门店' },
  businessDistrict: { label: '商圈' }
};
var INFO_FIELDS = [
  [ 'PWID', 'ffanId', 'vipMobile' ],
  [ 'payOrderNum', 'outOrderNum', 'payOrderStatus', 'payWay',
    'orderAmount', 'payChannel', 'payAmount', 'isMerge',
    'instructionCreateTime', 'instructionStatusChangeTime', 'payInstruction', 'instructionCreateTime',
    'instructionStatus', 'fromInvoking', 'businessDistrict', 'outlet',
    'merchantName']
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
    url: '/ams/v1/payment/query/orderLogList',
    jsonData: {
      payInstruction : WUI.link().payId,
      payOrderNum: WUI.link().id,
      pageNum: options.currentPage,
      pageSize: options.pageSize
    }
  }).then(function (resp) {
    WUI.DataTable.create({
      $el: $('.data-table'),
      meta: {
        operateTime: { label: '操作时间' },
        operateSource: { label: '操作方' },
        operateDesc: { label: '操作行为' },
        orderStatus: { label: '订单状态' },
        remark: { label: '备注' }
      },
      fields: ['operateTime', 'operateSource', 'operateDesc', 'orderStatus', 'remark'],
      list: resp.orderStatusLogList
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
        name: '支付网关支付订单查询',
        url:'gateway-payment-list.html'
      },
      {
        name: '支付订单详情'
      }]
  });

  WUI.ajax({
    url: '/ams/v1/payment/query/payGatewayOrderDetail',
    jsonData: {
      payInstruction : WUI.link().payId,
      payOrderNum: WUI.link().id
    }
  }).done(function (resp) {
    var user = resp.data;
    var editResource = WUI.getResource('/edit');

    WUI.InfoTable.create({
      $el: $('.info-table'),
      meta: META,
      data: resp.payGatewayOrderDetail,
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
