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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmZmFuL2NvZGUtcmVmdW5kLWxpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLy8gQ29uc3RhbnRzXG52YXIgUEFHRV9TSVpFID0gMjA7XG52YXIgTUVUQSA9IHtcbiAgb3JkZXJOdW06IHsgbGFiZWw6ICfkuqTmmJPljZXlj7cnIH0sXG4gIHJlZnVuZE51bTogeyBsYWJlbDogJ+mAgOasvuWNleWPtycgfSxcbiAgbWVyY2hhbnROYW1lOiB7IGxhYmVsOiAn5ZWG5oi35ZCN56ewJyB9LFxuICBvdXRsZXQ6IHsgbGFiZWw6ICfpl6jlupcnIH0sXG4gIFBXSUQ6IHsgbGFiZWw6ICdQV0lEJyB9LFxuICB2aXBNb2JpbGU6IHsgbGFiZWw6ICfkvJrlkZjmiYvmnLrlj7cnIH0sXG4gIHBheUFtb3VudDogeyBsYWJlbDogJ+aUr+S7mOmHkeminSjlhYMpJyB9LFxuICByZWZ1bmRBbW91bnQ6IHsgbGFiZWw6ICfpgIDmrL7ph5Hpop0o5YWDKScgfSxcbiAgcmVmdW5kU3RhdHVzOiB7IGxhYmVsOiAn6YCA5qy+54q25oCBJyB9LFxuICBwYXlDaGFubmVsOiB7IGxhYmVsOiAn5pSv5LuY5rig6YGTJyB9LFxuICBmcm9tSW52b2tpbmc6IHsgbGFiZWw6ICfmlK/ku5josIPnlKjmlrknIH0sXG4gIHJlZnVuZFRpbWU6IHsgbGFiZWw6ICfpgIDmrL7lj5Hotbfml7bpl7QnLCB0eXBlOiAnZGF0ZS1waWNrZXInfVxufTtcbnZhciBUQUJMRV9GSUVMRFMgPSBbXG4gICdyZWZ1bmRUaW1lJywgJ291dGxldC9vcmRlck51bScsICdtZXJjaGFudE5hbWUvcmVmdW5kTnVtJywgJ3ZpcE1vYmlsZS9QV0lEJyxcbiAgJ3BheUNoYW5uZWwvcGF5QW1vdW50JywgJ3JlZnVuZFN0YXR1cy9yZWZ1bmRBbW91bnQnLCAnZnJvbUludm9raW5nJ1xuXTtcbnZhciBGSUxURVJfRklFTERTID0gWydvcmRlck51bScsICd2aXBNb2JpbGUnLCAncmVmdW5kVGltZSddO1xuXG52YXIgcXVlcnlEYXRhID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgV1VJLmFqYXgoe1xuICAgIHVybDogJy9hbXMvdjEvcGF5bWVudC9xdWVyeS9wYXltZW50Q29kZVJlZnVuZE9yZGVyJyxcbiAgICBqc29uRGF0YToge1xuICAgICAgcmVmdW5kTnVtOiBvcHRpb25zLnJlZnVuZE51bSB8fCAnJyxcbiAgICAgIG9yZGVyTnVtOiBvcHRpb25zLm9yZGVyTnVtIHx8ICcnLFxuICAgICAgdmlwTW9iaWxlOiBvcHRpb25zLnZpcE1vYmlsZSB8fCAnJyxcbiAgICAgIHJlZnVuZFRpbWU6IG9wdGlvbnMucmVmdW5kVGltZSB8fCAnJyxcbiAgICAgIHBhZ2VOdW06IG9wdGlvbnMuY3VycmVudFBhZ2UsXG4gICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZVxuICAgIH1cbiAgfSkudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgIFdVSS5EYXRhVGFibGVFeC5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcuZGF0YS10YWJsZScpLFxuICAgICAgbWV0YTogTUVUQSxcbiAgICAgIGZpZWxkczogVEFCTEVfRklFTERTLFxuICAgICAgbGlzdDogcmVzcC5wYXltZW50Q29kZVJlZnVuZE9yZGVyTGlzdFxuICAgIH0pO1xuXG4gICAgV1VJLkRhdGFQYWdpbmF0b3IuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLmRhdGEtcGFnaW5hdG9yJyksXG4gICAgICBjdXJyZW50UGFnZTogb3B0aW9ucy5jdXJyZW50UGFnZSxcbiAgICAgIHRvdGFsOiByZXNwLnRvdGFsLFxuICAgICAgcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemUsXG4gICAgICBvblN3aXRjaFBhZ2U6IGZ1bmN0aW9uIChjdXJyZW50UGFnZSkge1xuICAgICAgICBxdWVyeURhdGEoe1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiBjdXJyZW50UGFnZSxcbiAgICAgICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuLy8gTG9hZCBQYWdlXG5XVUkucmVhZHkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBxdWVyeVJlc291cmNlID0gV1VJLmdldFJlc291cmNlKCcvcXVlcnknKTtcbiAgdmFyIGFkZFJlc291cmNlID0gV1VJLmdldFJlc291cmNlKCcvYWRkJyk7XG5cbiAgV1VJLkNvbnRlbnRIZWFkZXIuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5jb250ZW50LWhlYWRlcicpLFxuICAgIG1ldGE6IFt7XG4gICAgICBuYW1lOiAn6aaW6aG1JyxcbiAgICAgIHVybDogJy9hbXMnXG4gICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ+mjnuWHoemAmuS4muWKoSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICfku5jmrL7noIHpgIDmrL7orqLljZXmn6Xor6InXG4gICAgICB9XVxuICB9KTtcblxuICBXVUkuRGF0YUZpbHRlckV4LmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcuZGF0YS1maWx0ZXInKSxcbiAgICBtZXRhOiBNRVRBLFxuICAgIGZpZWxkczogRklMVEVSX0ZJRUxEUyxcbiAgICByaWdodEJ1dHRvbjoge1xuICAgICAgbmFtZTogcXVlcnlSZXNvdXJjZSAmJiBxdWVyeVJlc291cmNlLnJlc291cmNlRGlzcGxheU5hbWUgfHwgJ+afpeivoicsXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24ocGFyYW0pIHtcbiAgICAgICBjb25zb2xlLmxvZyhwYXJhbSk7XG4gICAgICAgIHF1ZXJ5RGF0YSgkLmV4dGVuZChwYXJhbSwge1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgICAgIHBhZ2VTaXplOiBQQUdFX1NJWkVcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy9sZWZ0QnV0dG9uOiB7XG4gICAgLy8gIG5hbWU6ICflr7zlh7pFeGNlbCcsXG4gICAgLy8gIGNhbGxiYWNrOiBmdW5jdGlvbihwYXJhbSkge1xuICAgIC8vXG4gICAgLy8gIH1cbiAgICAvL31cbiAgfSk7XG5cbiAgcXVlcnlEYXRhKHtcbiAgICBjdXJyZW50UGFnZTogMCxcbiAgICBwYWdlU2l6ZTogMjBcbiAgfSk7XG59XG4gIC8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdhbXMnXG4gIH0pO1xufSk7XG4iXSwiZmlsZSI6ImZmYW4vY29kZS1yZWZ1bmQtbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
