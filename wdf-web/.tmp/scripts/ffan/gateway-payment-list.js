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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmZmFuL2dhdGV3YXktcGF5bWVudC1saXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8vIENvbnN0YW50c1xudmFyIFBBR0VfU0laRSA9IDIwO1xudmFyIE1FVEEgPSB7XG4gIG91dE9yZGVyTnVtOiB7IGxhYmVsOiAn5aSW6YOo6K6i5Y2V5Y+3JyB9LFxuICBwYXlPcmRlck51bTogeyBsYWJlbDogJ+aUr+S7mOiuouWNleWPtycgfSxcbiAgcGF5SW5zdHJ1Y3Rpb246IHsgbGFiZWw6ICfmlK/ku5jmjIfku6Tlj7cnIH0sXG4gIFBXSUQ6IHsgbGFiZWw6ICdQV0lEJyB9LFxuICB2aXBNb2JpbGU6IHsgbGFiZWw6ICfkvJrlkZjmiYvmnLrlj7cnIH0sXG4gIG9yZGVyQW1vdW50OiB7IGxhYmVsOiAn6K6i5Y2V6YeR6aKdKOWFgyknIH0sXG4gIHBheUFtb3VudDogeyBsYWJlbDogJ+aUr+S7mOmHkeminSjlhYMpJyB9LFxuICBwYXlXYXk6IHsgbGFiZWw6ICfmlK/ku5jmlrnlvI8nIH0sXG4gIHBheUNoYW5uZWw6IHsgbGFiZWw6ICfmlK/ku5jmuKDpgZMnIH0sXG4gIGZyb21JbnZva2luZzogeyBsYWJlbDogJ+aUr+S7mOiwg+eUqOaWuScgfSxcbiAgaXNNZXJnZTogeyBsYWJlbDogJ+aYr+WQpuWQiOW5tuaUr+S7mCcgfSxcbiAgaW5zdHJ1Y3Rpb25TdGF0dXM6IHsgbGFiZWw6ICfmlK/ku5jnirbmgIEnIH0sXG4gIGluc3RydWN0aW9uQ3JlYXRlVGltZTogeyBsYWJlbDogJ+aUr+S7mOeUn+aIkOaXtumXtCcgfSxcbiAgc3RhdHVzQ2hhbmdlVGltZTogeyBsYWJlbDogJ+eKtuaAgeWPmOabtOaXtumXtCcgfSxcbiAgcGF5T3JkZXJDcmVhdGVUaW1lOiB7IHR5cGU6ICdkYXRlLXBpY2tlcicsIGxhYmVsOiAn5pSv5LuY6K6i5Y2V55Sf5oiQ5pel5pyfJyB9XG59O1xudmFyIFRBQkxFX0ZJRUxEUyA9IFtcbiAgJ291dE9yZGVyTnVtJywgJ3ZpcE1vYmlsZScsICdvcmRlckFtb3VudCcsICdpbnN0cnVjdGlvblN0YXR1cy9wYXlBbW91bnQnLFxuICAncGF5V2F5L3BheUNoYW5uZWwnLCAnaW5zdHJ1Y3Rpb25DcmVhdGVUaW1lJywgJ3N0YXR1c0NoYW5nZVRpbWUnXG5dO1xudmFyIEZJTFRFUl9GSUVMRFMgPSBbJ291dE9yZGVyTnVtJywgJ3BheU9yZGVyTnVtJywgJ3BheUluc3RydWN0aW9uJywgJ3BheU9yZGVyQ3JlYXRlVGltZSddO1xudmFyIEVESVRfRklFTERTID0gWyduYW1lJywgJ2FnZScsICdiaXJ0aGRheScsICdlbWFpbCcsICdzdGF0dXMnXTtcbi8vIENhbGxiYWNrIGZ1bmN0aW9uc1xudmFyIGNyZWF0ZURhdGEgPSBmdW5jdGlvbiAoaXRlbSkge1xuICBXVUkuTW9kYWxEaWFsb2cuY3JlYXRlKHtcbiAgICBvbkNvbmZpcm06IGZ1bmN0aW9uIChpdGVtSW5mbykge30sXG4gICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHt9XG4gIH0pO1xuXG4gV1VJLmRhdGFEaWFsb2cuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JyksXG4gICBkaWFsb2dQb3A6dHJ1ZSxcbiAgICBtZXRhOiBNRVRBLFxuICAgIGxpc3Q6IGl0ZW0sXG4gICAgYnV0dG9uSGlkZTogZmFsc2UsXG4gICAgZmllbGRzOiBFRElUX0ZJRUxEU1xuICB9KTtcbn07XG5cbnZhciBlZGl0RGF0YSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2dhdGV3YXktcGF5bWVudC1kZXRhaWwuaHRtbD9pZD0nICsgaXRlbS5wYXlPcmRlck51bSArICcmcGF5SWQ9JyArIGl0ZW0ucGF5SW5zdHJ1Y3Rpb247XG59O1xuXG52YXIgZGVsZXRlRGF0YSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIFdVSS5Nb2RhbERpYWxvZy5jcmVhdGUoe1xuICAgIG1lc3NhZ2U6ICcxMTExMScsXG4gICAgdGl0bGU6ICcyMjIyJyxcbiAgICBvbkNvbmZpcm06IGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJ2RlbGV0ZSBkYXRhJyk7IH1cbiAgfSk7XG59O1xuXG52YXIgYWN0aXZlRGF0YSA9IGZ1bmN0aW9uIChpdGVtcykge1xuICBjb25zb2xlLmxvZygnYWN0aXZlOiAnICsgaXRlbXMpO1xufTtcblxudmFyIGRlYWN0aXZlRGF0YSA9IGZ1bmN0aW9uIChpdGVtcykge1xuICBjb25zb2xlLmxvZygnZGVhY3RpdmU6ICcgKyBpdGVtcyk7XG59O1xuXG52YXIgcXVlcnlEYXRhID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdmFyIGVkaXRSZXNvdXJjZSA9IFdVSS5nZXRSZXNvdXJjZSgnL2VkaXQnKTtcbiAgdmFyIGRlbGV0ZVJlc291cmNlID0gV1VJLmdldFJlc291cmNlKCcvZGVsZXRlJyk7XG5cbiAgV1VJLmFqYXgoe1xuICAgIHVybDogJy9hbXMvdjEvcGF5bWVudC9xdWVyeS9wYXlHYXRld2F5T3JkZXJMaXN0JyxcbiAgICBqc29uRGF0YToge1xuICAgICAgb3V0T3JkZXJOdW06IG9wdGlvbnMub3V0T3JkZXJOdW0gfHwgJycsXG4gICAgICBwYXlPcmRlck51bTogb3B0aW9ucy5wYXlPcmRlck51bSB8fCAnJyxcbiAgICAgIHBheUluc3RydWN0aW9uOiBvcHRpb25zLnBheUluc3RydWN0aW9uIHx8ICcnLFxuICAgICAgdmlwTW9iaWxlOiBvcHRpb25zLnZpcE1vYmlsZSB8fCAnJyxcbiAgICAgIHBheU9yZGVyQ3JlYXRlVGltZTogb3B0aW9ucy5wYXlPcmRlckNyZWF0ZVRpbWUgfHwgJycsXG4gICAgICBwYWdlTnVtOiBvcHRpb25zLmN1cnJlbnRQYWdlLFxuICAgICAgcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemVcbiAgICB9XG4gIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICBXVUkuRGF0YVRhYmxlRXguY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLmRhdGEtdGFibGUnKSxcbiAgICAgIG1ldGE6IE1FVEEsXG4gICAgICBmaWVsZHM6IFRBQkxFX0ZJRUxEUyxcbiAgICAgIGxpc3Q6IHJlc3AucGF5R2F0ZXdheU9yZGVyTGlzdCxcbiAgICAgIG9wZXJhdGlvbnM6IFt7XG4gICAgICAgIG5hbWU6IGVkaXRSZXNvdXJjZSAmJiBlZGl0UmVzb3VyY2UucmVzb3VyY2VEaXNwbGF5TmFtZSB8fCAn5p+l55yLJyxcbiAgICAgICAgY2FsbGJhY2s6IGVkaXREYXRhXG4gICAgICB9XVxuICAgIH0pO1xuXG4gICAgV1VJLkRhdGFQYWdpbmF0b3IuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLmRhdGEtcGFnaW5hdG9yJyksXG4gICAgICBjdXJyZW50UGFnZTogb3B0aW9ucy5jdXJyZW50UGFnZSxcbiAgICAgIHRvdGFsOiByZXNwLnRvdGFsLFxuICAgICAgcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemUsXG4gICAgICBvblN3aXRjaFBhZ2U6IGZ1bmN0aW9uIChjdXJyZW50UGFnZSkge1xuICAgICAgICBxdWVyeURhdGEoe1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiBjdXJyZW50UGFnZSxcbiAgICAgICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuLy8gTG9hZCBQYWdlXG5XVUkucmVhZHkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBxdWVyeVJlc291cmNlID0gV1VJLmdldFJlc291cmNlKCcvcXVlcnknKTtcbiAgdmFyIGFkZFJlc291cmNlID0gV1VJLmdldFJlc291cmNlKCcvYWRkJyk7XG5cbiAgV1VJLkNvbnRlbnRIZWFkZXIuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5jb250ZW50LWhlYWRlcicpLFxuICAgIG1ldGE6IFt7XG4gICAgICBuYW1lOiAn6aaW6aG1JyxcbiAgICAgIHVybDogJy9hbXMnXG4gICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ+mjnuWHoemAmuS4muWKoSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICfmlK/ku5jnvZHlhbPmlK/ku5jorqLljZXmn6Xor6InXG4gICAgICB9XVxuICB9KTtcblxuICBXVUkuRGF0YUZpbHRlckV4LmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcuZGF0YS1maWx0ZXInKSxcbiAgICBtZXRhOiBNRVRBLFxuICAgIGZpZWxkczogRklMVEVSX0ZJRUxEUyxcbiAgICByaWdodEJ1dHRvbjoge1xuICAgICAgbmFtZTogcXVlcnlSZXNvdXJjZSAmJiBxdWVyeVJlc291cmNlLnJlc291cmNlRGlzcGxheU5hbWUgfHwgJ+afpeivoicsXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24ocGFyYW0pIHtcbiAgICAgICBjb25zb2xlLmxvZyhwYXJhbSk7XG4gICAgICAgIHF1ZXJ5RGF0YSgkLmV4dGVuZChwYXJhbSwge1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgICAgIHBhZ2VTaXplOiBQQUdFX1NJWkVcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICAvL2xlZnRCdXR0b246IHtcbiAgICAvLyAgbmFtZTogJ+WvvOWHukV4Y2VsJyxcbiAgICAvLyAgY2FsbGJhY2s6IGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgLy9cbiAgICAvLyAgfVxuICAgIC8vfVxuICB9KTtcblxuICBxdWVyeURhdGEoe1xuICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgIHBhZ2VTaXplOiAyMFxuICB9KTtcbn1cbiAgLy8gS2VlcCB0aGlzIGZ1bmN0aW9uXG4kKGZ1bmN0aW9uICgpIHtcbiAgV1VJLmluaXQoe1xuICAgIHN5c3RlbTogJ2FtcydcbiAgfSk7XG59KTtcbiJdLCJmaWxlIjoiZmZhbi9nYXRld2F5LXBheW1lbnQtbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
