'use strict';
// Constants
var PAGE_SIZE = 20;
var META = {
  orderNum: { label: '交易单号' },
  merchantSeq: { label: '商户单号' },
  merchantName: { label: '商户名称' },
  outlet: { label: '门店' },
  PWID: { label: 'PWID' },
  vipMobile: { label: '会员手机号' },
  orderAmount: { label: '订单金额(元)' },
  benefitAmount: { label: '优惠金额(元)' },
  realPayAmount: { label: '实际支付金额(元)' },
  payChannel: { label: '支付渠道' },
  fromInvoking: { label: '支付调用方' },
  transStatus: { label: '交易状态' },
  errorMsg: { label: '错误信息' },
  orderCreateTime: { label: '订单创建时间', type: 'date-picker' }
};
var TABLE_FIELDS = [
  'orderCreateTime', 'outlet/orderNum', 'merchantName/merchantSeq', 'vipMobile/PWID',
  'transStatus/orderAmount', 'payChannel/benefitAmount', 'fromInvoking/realPayAmount',
  'errorMsg'
];
var FILTER_FIELDS = ['orderNum', 'merchantSeq', 'vipMobile', 'orderCreateTime'];

var queryData = function (options) {
  WUI.ajax({
    url: '/ams/v1/payment/query/paymentCodeOrder',
    jsonData: {
      orderNum: options.orderNum || '',
      merchantSeq: options.merchantSeq || '',
      vipMobile: options.vipMobile || '',
      orderCreateTime: options.orderCreateTime || '',
      pageNum: options.currentPage,
      pageSize: options.pageSize
    }
  }).then(function (resp) {
    WUI.DataTableEx.create({
      $el: $('.data-table'),
      meta: META,
      fields: TABLE_FIELDS,
      list: resp.paymentCodeOrderList
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
        name: '付款码支付订单查询'
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmZmFuL2NvZGUtcGF5bWVudC1saXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8vIENvbnN0YW50c1xudmFyIFBBR0VfU0laRSA9IDIwO1xudmFyIE1FVEEgPSB7XG4gIG9yZGVyTnVtOiB7IGxhYmVsOiAn5Lqk5piT5Y2V5Y+3JyB9LFxuICBtZXJjaGFudFNlcTogeyBsYWJlbDogJ+WVhuaIt+WNleWPtycgfSxcbiAgbWVyY2hhbnROYW1lOiB7IGxhYmVsOiAn5ZWG5oi35ZCN56ewJyB9LFxuICBvdXRsZXQ6IHsgbGFiZWw6ICfpl6jlupcnIH0sXG4gIFBXSUQ6IHsgbGFiZWw6ICdQV0lEJyB9LFxuICB2aXBNb2JpbGU6IHsgbGFiZWw6ICfkvJrlkZjmiYvmnLrlj7cnIH0sXG4gIG9yZGVyQW1vdW50OiB7IGxhYmVsOiAn6K6i5Y2V6YeR6aKdKOWFgyknIH0sXG4gIGJlbmVmaXRBbW91bnQ6IHsgbGFiZWw6ICfkvJjmg6Dph5Hpop0o5YWDKScgfSxcbiAgcmVhbFBheUFtb3VudDogeyBsYWJlbDogJ+WunumZheaUr+S7mOmHkeminSjlhYMpJyB9LFxuICBwYXlDaGFubmVsOiB7IGxhYmVsOiAn5pSv5LuY5rig6YGTJyB9LFxuICBmcm9tSW52b2tpbmc6IHsgbGFiZWw6ICfmlK/ku5josIPnlKjmlrknIH0sXG4gIHRyYW5zU3RhdHVzOiB7IGxhYmVsOiAn5Lqk5piT54q25oCBJyB9LFxuICBlcnJvck1zZzogeyBsYWJlbDogJ+mUmeivr+S/oeaBrycgfSxcbiAgb3JkZXJDcmVhdGVUaW1lOiB7IGxhYmVsOiAn6K6i5Y2V5Yib5bu65pe26Ze0JywgdHlwZTogJ2RhdGUtcGlja2VyJyB9XG59O1xudmFyIFRBQkxFX0ZJRUxEUyA9IFtcbiAgJ29yZGVyQ3JlYXRlVGltZScsICdvdXRsZXQvb3JkZXJOdW0nLCAnbWVyY2hhbnROYW1lL21lcmNoYW50U2VxJywgJ3ZpcE1vYmlsZS9QV0lEJyxcbiAgJ3RyYW5zU3RhdHVzL29yZGVyQW1vdW50JywgJ3BheUNoYW5uZWwvYmVuZWZpdEFtb3VudCcsICdmcm9tSW52b2tpbmcvcmVhbFBheUFtb3VudCcsXG4gICdlcnJvck1zZydcbl07XG52YXIgRklMVEVSX0ZJRUxEUyA9IFsnb3JkZXJOdW0nLCAnbWVyY2hhbnRTZXEnLCAndmlwTW9iaWxlJywgJ29yZGVyQ3JlYXRlVGltZSddO1xuXG52YXIgcXVlcnlEYXRhID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgV1VJLmFqYXgoe1xuICAgIHVybDogJy9hbXMvdjEvcGF5bWVudC9xdWVyeS9wYXltZW50Q29kZU9yZGVyJyxcbiAgICBqc29uRGF0YToge1xuICAgICAgb3JkZXJOdW06IG9wdGlvbnMub3JkZXJOdW0gfHwgJycsXG4gICAgICBtZXJjaGFudFNlcTogb3B0aW9ucy5tZXJjaGFudFNlcSB8fCAnJyxcbiAgICAgIHZpcE1vYmlsZTogb3B0aW9ucy52aXBNb2JpbGUgfHwgJycsXG4gICAgICBvcmRlckNyZWF0ZVRpbWU6IG9wdGlvbnMub3JkZXJDcmVhdGVUaW1lIHx8ICcnLFxuICAgICAgcGFnZU51bTogb3B0aW9ucy5jdXJyZW50UGFnZSxcbiAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplXG4gICAgfVxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgV1VJLkRhdGFUYWJsZUV4LmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJy5kYXRhLXRhYmxlJyksXG4gICAgICBtZXRhOiBNRVRBLFxuICAgICAgZmllbGRzOiBUQUJMRV9GSUVMRFMsXG4gICAgICBsaXN0OiByZXNwLnBheW1lbnRDb2RlT3JkZXJMaXN0XG4gICAgfSk7XG5cbiAgICBXVUkuRGF0YVBhZ2luYXRvci5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcuZGF0YS1wYWdpbmF0b3InKSxcbiAgICAgIGN1cnJlbnRQYWdlOiBvcHRpb25zLmN1cnJlbnRQYWdlLFxuICAgICAgdG90YWw6IHJlc3AudG90YWwsXG4gICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZSxcbiAgICAgIG9uU3dpdGNoUGFnZTogZnVuY3Rpb24gKGN1cnJlbnRQYWdlKSB7XG4gICAgICAgIHF1ZXJ5RGF0YSh7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IGN1cnJlbnRQYWdlLFxuICAgICAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG4vLyBMb2FkIFBhZ2VcbldVSS5yZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5UmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9xdWVyeScpO1xuICB2YXIgYWRkUmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9hZGQnKTtcblxuICBXVUkuQ29udGVudEhlYWRlci5jcmVhdGUoe1xuICAgICRlbDogJCgnLmNvbnRlbnQtaGVhZGVyJyksXG4gICAgbWV0YTogW3tcbiAgICAgIG5hbWU6ICfpppbpobUnLFxuICAgICAgdXJsOiAnL2FtcydcbiAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAn6aOe5Yeh6YCa5Lia5YqhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ+S7mOasvueggeaUr+S7mOiuouWNleafpeivoidcbiAgICAgIH1dXG4gIH0pO1xuXG4gIFdVSS5EYXRhRmlsdGVyRXguY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5kYXRhLWZpbHRlcicpLFxuICAgIG1ldGE6IE1FVEEsXG4gICAgZmllbGRzOiBGSUxURVJfRklFTERTLFxuICAgIHJpZ2h0QnV0dG9uOiB7XG4gICAgICBuYW1lOiBxdWVyeVJlc291cmNlICYmIHF1ZXJ5UmVzb3VyY2UucmVzb3VyY2VEaXNwbGF5TmFtZSB8fCAn5p+l6K+iJyxcbiAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihwYXJhbSkge1xuICAgICAgIGNvbnNvbGUubG9nKHBhcmFtKTtcbiAgICAgICAgcXVlcnlEYXRhKCQuZXh0ZW5kKHBhcmFtLCB7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICAgICAgcGFnZVNpemU6IFBBR0VfU0laRVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvL2xlZnRCdXR0b246IHtcbiAgICAvLyAgbmFtZTogJ+WvvOWHukV4Y2VsJyxcbiAgICAvLyAgY2FsbGJhY2s6IGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgLy9cbiAgICAvLyAgfVxuICAgIC8vfVxuICB9KTtcblxuICBxdWVyeURhdGEoe1xuICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgIHBhZ2VTaXplOiAyMFxuICB9KTtcbn1cbiAgLy8gS2VlcCB0aGlzIGZ1bmN0aW9uXG4kKGZ1bmN0aW9uICgpIHtcbiAgV1VJLmluaXQoe1xuICAgIHN5c3RlbTogJ2FtcydcbiAgfSk7XG59KTtcbiJdLCJmaWxlIjoiZmZhbi9jb2RlLXBheW1lbnQtbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
