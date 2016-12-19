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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmZmFuL2dhdGV3YXktcGF5bWVudC1kZXRhaWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLy8gQ29uc3RhbnRzXG52YXIgTUVUQSA9IHtcbiAgUFdJRDogeyBsYWJlbDogJ1BXSUQnIH0sXG4gIG91dE9yZGVyTnVtOiB7IGxhYmVsOiAn5aSW6YOo6K6i5Y2V5Y+3JyB9LFxuICBwYXlPcmRlck51bTogeyBsYWJlbDogJ+aUr+S7mOiuouWNleWPtycgfSxcbiAgcGF5T3JkZXJTdGF0dXM6IHsgbGFiZWw6ICfmlK/ku5jorqLljZXnirbmgIEnIH0sXG4gIE9yZGVyQ3JlYXRlVGltZTogeyBsYWJlbDogJ+aUr+S7mOiuouWNleeUn+aIkOaXtumXtCcgfSxcbiAgT3JkZXJTdGF0dXNDaGFuZ2VUaW1lOiB7IGxhYmVsOiAn5pSv5LuY6K6i5Y2V54q25oCB5Y+Y5pu05pe26Ze0JyB9LFxuICBpc01lcmdlOiB7IGxhYmVsOiAn5piv5ZCm5ZCI5bm25pSv5LuYJyB9LFxuICBwYXlJbnN0cnVjdGlvbjogeyBsYWJlbDogJ+aUr+S7mOaMh+S7pOWPtycgfSxcbiAgaW5zdHJ1Y3Rpb25TdGF0dXM6IHsgbGFiZWw6ICfmlK/ku5jmjIfku6TnirbmgIEnIH0sXG4gIGZmYW5JZDogeyBsYWJlbDogJ+mjnuWHoeS8muWRmElEJyB9LFxuICBtZXJjaGFudE5hbWU6IHsgbGFiZWw6ICfllYbmiLcnIH0sXG4gIHZpcE1vYmlsZTogeyBsYWJlbDogJ+S8muWRmOaJi+acuuWPtycgfSxcbiAgaW5zdHJ1Y3Rpb25DcmVhdGVUaW1lOiB7IGxhYmVsOiAn5pSv5LuY5oyH5Luk55Sf5oiQ5pe26Ze0JyB9LFxuICBpbnN0cnVjdGlvblN0YXR1c0NoYW5nZVRpbWU6IHsgbGFiZWw6ICfmlK/ku5jmjIfku6TnirbmgIHlj5jmm7Tml7bpl7QnIH0sXG4gIG9yZGVyQW1vdW50OiB7IGxhYmVsOiAn6K6i5Y2V6YeR6aKdKOWFgyknIH0sXG4gIHBheUFtb3VudDogeyBsYWJlbDogJ+aUr+S7mOmHkeminSjlhYMpJyB9LFxuICBwYXlXYXk6IHsgbGFiZWw6ICfmlK/ku5jmlrnlvI8nIH0sXG4gIHBheUNoYW5uZWw6IHsgbGFiZWw6ICfmlK/ku5jmuKDpgZMnIH0sXG4gIHBheUNoYW5uZWxSZXNwb25zZU51bTogeyBsYWJlbDogJ+aUr+S7mOa4oOmBk+WTjeW6lOWPtycgfSxcbiAgZnJvbUludm9raW5nOiB7IGxhYmVsOiAn5pSv5LuY6LCD55So5pa5JyB9LFxuICBvdXRsZXQ6IHsgbGFiZWw6ICfpl6jlupcnIH0sXG4gIGJ1c2luZXNzRGlzdHJpY3Q6IHsgbGFiZWw6ICfllYblnIgnIH1cbn07XG52YXIgSU5GT19GSUVMRFMgPSBbXG4gIFsgJ1BXSUQnLCAnZmZhbklkJywgJ3ZpcE1vYmlsZScgXSxcbiAgWyAncGF5T3JkZXJOdW0nLCAnb3V0T3JkZXJOdW0nLCAncGF5T3JkZXJTdGF0dXMnLCAncGF5V2F5JyxcbiAgICAnb3JkZXJBbW91bnQnLCAncGF5Q2hhbm5lbCcsICdwYXlBbW91bnQnLCAnaXNNZXJnZScsXG4gICAgJ2luc3RydWN0aW9uQ3JlYXRlVGltZScsICdpbnN0cnVjdGlvblN0YXR1c0NoYW5nZVRpbWUnLCAncGF5SW5zdHJ1Y3Rpb24nLCAnaW5zdHJ1Y3Rpb25DcmVhdGVUaW1lJyxcbiAgICAnaW5zdHJ1Y3Rpb25TdGF0dXMnLCAnZnJvbUludm9raW5nJywgJ2J1c2luZXNzRGlzdHJpY3QnLCAnb3V0bGV0JyxcbiAgICAnbWVyY2hhbnROYW1lJ11cbl07XG4vLyBDYWxsYmFjayBGdW5jdGlvbnNcbnZhciBzdWJtaXREYXRhID0gZnVuY3Rpb24gKGl0ZW0sIGV0YWcpIHtcbiAgLy9XVUkuYWpheCh7XG4gIC8vICB1cmw6ICcvc2FtcGxlL3dlYi92MS91c2Vycy8nICsgV1VJLmxpbmsoKS5pZCxcbiAgLy8gIGpzb25EYXRhOiAkLmV4dGVuZChpdGVtLCB7XG4gIC8vICAgIF9ldGFnOiBldGFnXG4gIC8vICB9KVxuICAvL30pLmRvbmUoZnVuY3Rpb24gKCkge1xuICAvLyAgV1VJLmFsZXJ0LmNyZWF0ZSh7XG4gIC8vICAgIG1lc3NhZ2U6ICfmiJDlip8nLFxuICAvLyAgICBzdWNjZXNzOiB0cnVlXG4gIC8vICB9KTtcbiAgLy8gIC8qKlxuICAvLyAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgLy8gICAgd2luZG93LmNsb3NlKCk7XG4gIC8vICB9LCAyMDAwKTtcbiAgLy8gICovXG4gIC8vfSk7XG4gIGNvbnNvbGUubG9nKCcyMTMyMTMxJyk7XG59O1xudmFyIFRBQkxFX0ZJRUxEUyA9IFsnaWQnLCAnbmFtZScsICdlbWFpbCcsICdhZ2UnXTtcbnZhciBGSUxURVJfRklFTERTID0gWydwaG9uZSddO1xuLy8gQ2FsbGJhY2sgZnVuY3Rpb25zXG52YXIgZWRpdERhdGEgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAvLyB3aW5kb3cub3BlbignYWxsb3dhbmNlLWRldGFpbC5odG1sP2lkPScgKyBpdGVtLmlkKTtcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnYWxsb3dhbmNlLWRldGFpbC5odG1sP2lkPScgKyBpdGVtLmlkO1xufTtcblxudmFyIHF1ZXJ5RGF0YSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBlZGl0UmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9lZGl0Jyk7XG5cbiAgV1VJLmFqYXgoe1xuICAgIHVybDogJy9hbXMvdjEvcGF5bWVudC9xdWVyeS9vcmRlckxvZ0xpc3QnLFxuICAgIGpzb25EYXRhOiB7XG4gICAgICBwYXlJbnN0cnVjdGlvbiA6IFdVSS5saW5rKCkucGF5SWQsXG4gICAgICBwYXlPcmRlck51bTogV1VJLmxpbmsoKS5pZCxcbiAgICAgIHBhZ2VOdW06IG9wdGlvbnMuY3VycmVudFBhZ2UsXG4gICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZVxuICAgIH1cbiAgfSkudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgIFdVSS5EYXRhVGFibGUuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLmRhdGEtdGFibGUnKSxcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgb3BlcmF0ZVRpbWU6IHsgbGFiZWw6ICfmk43kvZzml7bpl7QnIH0sXG4gICAgICAgIG9wZXJhdGVTb3VyY2U6IHsgbGFiZWw6ICfmk43kvZzmlrknIH0sXG4gICAgICAgIG9wZXJhdGVEZXNjOiB7IGxhYmVsOiAn5pON5L2c6KGM5Li6JyB9LFxuICAgICAgICBvcmRlclN0YXR1czogeyBsYWJlbDogJ+iuouWNleeKtuaAgScgfSxcbiAgICAgICAgcmVtYXJrOiB7IGxhYmVsOiAn5aSH5rOoJyB9XG4gICAgICB9LFxuICAgICAgZmllbGRzOiBbJ29wZXJhdGVUaW1lJywgJ29wZXJhdGVTb3VyY2UnLCAnb3BlcmF0ZURlc2MnLCAnb3JkZXJTdGF0dXMnLCAncmVtYXJrJ10sXG4gICAgICBsaXN0OiByZXNwLm9yZGVyU3RhdHVzTG9nTGlzdFxuICAgIH0pO1xuXG4gICAgV1VJLkRhdGFQYWdpbmF0b3IuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLmRhdGEtcGFnaW5hdG9yJyksXG4gICAgICBjdXJyZW50UGFnZTogb3B0aW9ucy5jdXJyZW50UGFnZSxcbiAgICAgIHRvdGFsOiByZXNwLnRvdGFsLFxuICAgICAgcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemUsXG4gICAgICBvblN3aXRjaFBhZ2U6IGZ1bmN0aW9uIChjdXJyZW50UGFnZSkge1xuICAgICAgICBxdWVyeURhdGEoe1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiBjdXJyZW50UGFnZSxcbiAgICAgICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuLy8gTG9hZCBQYWdlXG5XVUkucmVhZHkgPSBmdW5jdGlvbiAoKSB7XG4gIFdVSS5Db250ZW50SGVhZGVyLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcuY29udGVudC1oZWFkZXInKSxcbiAgICBtZXRhOiBbe1xuICAgICAgbmFtZTogJ+mmlumhtScsXG4gICAgICB1cmw6ICcvYW1zJ1xuICAgIH0sIHtcbiAgICAgIG5hbWU6ICfpo57lh6HpgJrkuJrliqEnXG4gICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ+aUr+S7mOe9keWFs+aUr+S7mOiuouWNleafpeivoicsXG4gICAgICAgIHVybDonZ2F0ZXdheS1wYXltZW50LWxpc3QuaHRtbCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICfmlK/ku5jorqLljZXor6bmg4UnXG4gICAgICB9XVxuICB9KTtcblxuICBXVUkuYWpheCh7XG4gICAgdXJsOiAnL2Ftcy92MS9wYXltZW50L3F1ZXJ5L3BheUdhdGV3YXlPcmRlckRldGFpbCcsXG4gICAganNvbkRhdGE6IHtcbiAgICAgIHBheUluc3RydWN0aW9uIDogV1VJLmxpbmsoKS5wYXlJZCxcbiAgICAgIHBheU9yZGVyTnVtOiBXVUkubGluaygpLmlkXG4gICAgfVxuICB9KS5kb25lKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgdmFyIHVzZXIgPSByZXNwLmRhdGE7XG4gICAgdmFyIGVkaXRSZXNvdXJjZSA9IFdVSS5nZXRSZXNvdXJjZSgnL2VkaXQnKTtcblxuICAgIFdVSS5JbmZvVGFibGUuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLmluZm8tdGFibGUnKSxcbiAgICAgIG1ldGE6IE1FVEEsXG4gICAgICBkYXRhOiByZXNwLnBheUdhdGV3YXlPcmRlckRldGFpbCxcbiAgICAgIGZpZWxkczogSU5GT19GSUVMRFNcbiAgICB9KTtcblxuICB9KTtcblxuICBxdWVyeURhdGEoe1xuICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgIHBhZ2VTaXplOiAyMFxuICB9KTtcbn07XG4vLyBLZWVwIHRoaXMgZnVuY3Rpb25cbiQoZnVuY3Rpb24gKCkge1xuICBXVUkuaW5pdCh7XG4gICAgc3lzdGVtOiAnYW1zJ1xuICB9KTtcbn0pO1xuIl0sImZpbGUiOiJmZmFuL2dhdGV3YXktcGF5bWVudC1kZXRhaWwuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
