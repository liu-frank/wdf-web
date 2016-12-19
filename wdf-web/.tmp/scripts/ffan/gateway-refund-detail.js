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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmZmFuL2dhdGV3YXktcmVmdW5kLWRldGFpbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4vLyBDb25zdGFudHNcbnZhciBNRVRBID0ge1xuICBQV0lEOiB7IGxhYmVsOiAnUFdJRCcgfSxcbiAgdmlwTW9iaWxlOiB7IGxhYmVsOiAn5Lya5ZGY5omL5py65Y+3JyB9LFxuICBvcmRlck51bTogeyBsYWJlbDogJ+mAgOasvuWNleWPtycgfSxcbiAgb2xkT3JkZXJOdW06IHsgbGFiZWw6ICfljp/orqLljZXlj7cnIH0sXG4gIG9sZFBheVNlcTogeyBsYWJlbDogJ+WOn+aUr+S7mOa1geawtOWPtycgfSxcbiAgcmVmdW5kU2VxOiB7IGxhYmVsOiAn6YCA5qy+5rWB5rC05Y+3JyB9LFxuICByZWZ1bmRUaW1lOiB7IGxhYmVsOiAn6YCA5qy+5aSE55CG5pe26Ze0JyB9LFxuICBwYXlTb3VyY2U6IHsgbGFiZWw6ICfmlK/ku5jmnaXmupAnIH0sXG4gIHBheUNoYW5uZWw6IHsgbGFiZWw6ICfmlK/ku5jmuKDpgZMnIH0sXG4gIHBheVR5cGU6IHsgbGFiZWw6ICfmlK/ku5jmlrnlvI8nIH0sXG4gIHJlZnVuZFR5cGU6IHsgbGFiZWw6ICfpgIDmrL7nsbvlnosnIH0sXG4gIHJlZnVuZFN0YXR1czogeyBsYWJlbDogJ+mAgOasvueKtuaAgScgfSxcbiAgb3JkZXJBbW91bnQ6IHsgbGFiZWw6ICfljp/orqLljZXph5Hpop0o5YWDKScgfSxcbiAgcmVhbFBheUFtb3VudDogeyBsYWJlbDogJ+WunumZheaUr+S7mOmHkeminSjlhYMpJyB9LFxuICBwYXlCZW5lZml0OiB7IGxhYmVsOiAn5pSv5LuY5LyY5oOgKOWFgyknIH0sXG4gIHJlZnVuZEFtb3VudDogeyBsYWJlbDogJ+mAgOasvumHkeminSjlhYMpJyB9XG59O1xudmFyIElORk9fRklFTERTID0gW1xuICBbICdQV0lEJywgJ3ZpcE1vYmlsZScgXSxcbiAgWyAnb3JkZXJOdW0nLCAnb2xkT3JkZXJOdW0nLCAnb2xkUGF5U2VxJywgJ3JlZnVuZFNlcScsXG4gICAgJ3JlZnVuZFRpbWUnLCAncGF5U291cmNlJywgJ3BheUNoYW5uZWwnLCAncGF5VHlwZScsXG4gICAgJ3JlZnVuZFR5cGUnLCAncmVmdW5kU3RhdHVzJywgJ29yZGVyQW1vdW50JywgJ3BheUJlbmVmaXQnLFxuICAgICdyZWFsUGF5QW1vdW50JywgJ3JlZnVuZEFtb3VudCddXG5dO1xuLy8gQ2FsbGJhY2sgRnVuY3Rpb25zXG52YXIgc3VibWl0RGF0YSA9IGZ1bmN0aW9uIChpdGVtLCBldGFnKSB7XG4gIC8vV1VJLmFqYXgoe1xuICAvLyAgdXJsOiAnL3NhbXBsZS93ZWIvdjEvdXNlcnMvJyArIFdVSS5saW5rKCkuaWQsXG4gIC8vICBqc29uRGF0YTogJC5leHRlbmQoaXRlbSwge1xuICAvLyAgICBfZXRhZzogZXRhZ1xuICAvLyAgfSlcbiAgLy99KS5kb25lKGZ1bmN0aW9uICgpIHtcbiAgLy8gIFdVSS5hbGVydC5jcmVhdGUoe1xuICAvLyAgICBtZXNzYWdlOiAn5oiQ5YqfJyxcbiAgLy8gICAgc3VjY2VzczogdHJ1ZVxuICAvLyAgfSk7XG4gIC8vICAvKipcbiAgLy8gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gIC8vICAgIHdpbmRvdy5jbG9zZSgpO1xuICAvLyAgfSwgMjAwMCk7XG4gIC8vICAqL1xuICAvL30pO1xuICBjb25zb2xlLmxvZygnMjEzMjEzMScpO1xufTtcbnZhciBUQUJMRV9GSUVMRFMgPSBbJ2lkJywgJ25hbWUnLCAnZW1haWwnLCAnYWdlJ107XG52YXIgRklMVEVSX0ZJRUxEUyA9IFsncGhvbmUnXTtcbi8vIENhbGxiYWNrIGZ1bmN0aW9uc1xudmFyIGVkaXREYXRhID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgLy8gd2luZG93Lm9wZW4oJ2FsbG93YW5jZS1kZXRhaWwuaHRtbD9pZD0nICsgaXRlbS5pZCk7XG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2FsbG93YW5jZS1kZXRhaWwuaHRtbD9pZD0nICsgaXRlbS5pZDtcbn07XG5cbnZhciBxdWVyeURhdGEgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgZWRpdFJlc291cmNlID0gV1VJLmdldFJlc291cmNlKCcvZWRpdCcpO1xuXG4gIFdVSS5hamF4KHtcbiAgICB1cmw6ICcvYW1zL3YxL3BheW1lbnQvcXVlcnkvcmVmdW5kT3JkZXJMb2dMaXN0JyxcbiAgICBqc29uRGF0YToge1xuICAgICAgcmVmdW5kU2VxIDogV1VJLmxpbmsoKS5yZWZ1bmRTZXEsXG4gICAgICBvcmRlck51bTogV1VJLmxpbmsoKS5pZCxcbiAgICAgIHJlZnVuZElkOldVSS5saW5rKCkucmVmdW5kSWQsXG4gICAgICBwYWdlTnVtOiBvcHRpb25zLmN1cnJlbnRQYWdlLFxuICAgICAgcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemVcbiAgICB9XG4gIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICBXVUkuRGF0YVRhYmxlLmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJy5kYXRhLXRhYmxlJyksXG4gICAgICBtZXRhOiB7XG4gICAgICAgIG9wZXJhdGVUaW1lOiB7IGxhYmVsOiAn5pON5L2c5pe26Ze0JyB9LFxuICAgICAgICBvcGVyYXRlcjogeyBsYWJlbDogJ+aTjeS9nOaWuScgfSxcbiAgICAgICAgb3BlcmF0ZURlc2M6IHsgbGFiZWw6ICfmk43kvZzooYzkuLonIH0sXG4gICAgICAgIG9yZGVyU3RhdHVzOiB7IGxhYmVsOiAn6K6i5Y2V54q25oCBJyB9LFxuICAgICAgICByZW1hcms6IHsgbGFiZWw6ICflpIfms6gnIH1cbiAgICAgIH0sXG4gICAgICBmaWVsZHM6IFsnb3BlcmF0ZVRpbWUnLCAnb3BlcmF0ZXInLCAnb3BlcmF0ZURlc2MnLCAnb3JkZXJTdGF0dXMnLCAncmVtYXJrJ10sXG4gICAgICBsaXN0OiByZXNwLnJlZnVuZExvZ0xpc3RcbiAgICB9KTtcblxuICAgIFdVSS5EYXRhUGFnaW5hdG9yLmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJy5kYXRhLXBhZ2luYXRvcicpLFxuICAgICAgY3VycmVudFBhZ2U6IG9wdGlvbnMuY3VycmVudFBhZ2UsXG4gICAgICB0b3RhbDogcmVzcC50b3RhbCxcbiAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplLFxuICAgICAgb25Td2l0Y2hQYWdlOiBmdW5jdGlvbiAoY3VycmVudFBhZ2UpIHtcbiAgICAgICAgcXVlcnlEYXRhKHtcbiAgICAgICAgICBjdXJyZW50UGFnZTogY3VycmVudFBhZ2UsXG4gICAgICAgICAgcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcbi8vIExvYWQgUGFnZVxuV1VJLnJlYWR5ID0gZnVuY3Rpb24gKCkge1xuICBXVUkuQ29udGVudEhlYWRlci5jcmVhdGUoe1xuICAgICRlbDogJCgnLmNvbnRlbnQtaGVhZGVyJyksXG4gICAgbWV0YTogW3tcbiAgICAgIG5hbWU6ICfpppbpobUnLFxuICAgICAgdXJsOiAnL2FtcydcbiAgICB9LCB7XG4gICAgICBuYW1lOiAn6aOe5Yeh6YCa5Lia5YqhJ1xuICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICfmlK/ku5jnvZHlhbPpgIDmrL7orqLljZXmn6Xor6InLFxuICAgICAgICB1cmw6J2dhdGV3YXktcmVmdW5kLWxpc3QuaHRtbCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICfpgIDmrL7orqLljZXor6bmg4UnXG4gICAgICB9XG4gICAgXVxuICB9KTtcblxuICBXVUkuYWpheCh7XG4gICAgdXJsOiAnL2Ftcy92MS9wYXltZW50L3F1ZXJ5L3JlZnVuZE9yZGVyRGV0YWlsJyxcbiAgICBqc29uRGF0YToge1xuICAgICAgcmVmdW5kU2VxIDogV1VJLmxpbmsoKS5yZWZ1bmRTZXEsXG4gICAgICByZWZ1bmRJZDpXVUkubGluaygpLnJlZnVuZElkLFxuICAgICAgb3JkZXJOdW06IFdVSS5saW5rKCkuaWRcbiAgICB9XG4gIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3ApIHtcbiAgICB2YXIgdXNlciA9IHJlc3AuZGF0YTtcbiAgICB2YXIgZWRpdFJlc291cmNlID0gV1VJLmdldFJlc291cmNlKCcvZWRpdCcpO1xuXG4gICAgV1VJLkluZm9UYWJsZS5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcuaW5mby10YWJsZScpLFxuICAgICAgbWV0YTogTUVUQSxcbiAgICAgIGRhdGE6IHJlc3AucmVmdW5kT3JkZXJEZXRhaWwsXG4gICAgICBmaWVsZHM6IElORk9fRklFTERTXG4gICAgfSk7XG5cbiAgfSk7XG5cbiAgcXVlcnlEYXRhKHtcbiAgICBjdXJyZW50UGFnZTogMCxcbiAgICBwYWdlU2l6ZTogMjBcbiAgfSk7XG59O1xuLy8gS2VlcCB0aGlzIGZ1bmN0aW9uXG4kKGZ1bmN0aW9uICgpIHtcbiAgV1VJLmluaXQoe1xuICAgIHN5c3RlbTogJ2FtcydcbiAgfSk7XG59KTtcbiJdLCJmaWxlIjoiZmZhbi9nYXRld2F5LXJlZnVuZC1kZXRhaWwuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
