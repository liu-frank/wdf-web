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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmZmFuL2dhdGV3YXktcmVmdW5kLWxpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLy8gQ29uc3RhbnRzXG52YXIgUEFHRV9TSVpFID0gMjA7XG52YXIgTUVUQSA9IHtcbiAgb3JkZXJOdW06IHsgbGFiZWw6ICfpgIDmrL7ljZXlj7cnIH0sXG4gIG9sZE9yZGVyTnVtOiB7IGxhYmVsOiAn5Y6f6K6i5Y2V5Y+3JyB9LFxuICByZWZ1bmRTZXE6IHsgbGFiZWw6ICfpgIDmrL7mtYHmsLTlj7cnIH0sXG4gIHJlZnVuZFRpbWU6IHsgbGFiZWw6ICfpgIDmrL7lpITnkIbml7bpl7QnLCB0eXBlOiAnZGF0ZS1waWNrZXInfSxcbiAgUFdJRDogeyBsYWJlbDogJ1BXSUQnIH0sXG4gIHZpcE1vYmlsZTogeyBsYWJlbDogJ+S8muWRmOaJi+acuuWPtycgfSxcbiAgcGF5U291cmNlOiB7IGxhYmVsOiAn5pSv5LuY5p2l5rqQJyB9LFxuICBwYXlDaGFubmVsOiB7IGxhYmVsOiAn5pSv5LuY5rig6YGTJyB9LFxuICByZWZ1bmRUeXBlOiB7IGxhYmVsOiAn6YCA5qy+57G75Z6LJywgdHlwZTogJ3NlbGVjdCcsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAge2xhYmVsOiAn5YWo6YOoJywgdmFsdWU6ICcnfSxcbiAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ+S6pOaYk+mAgOasvicsIHZhbHVlOiAnMCd9LFxuICAgICAgICAgICAgICAgICAge2xhYmVsOiAn6ZW/5qy+6L2s6YCA5qy+JywgdmFsdWU6ICcxJ30sXG4gICAgICAgICAgICAgICAgICB7bGFiZWw6ICfmlK/ku5jnuqDplJnpgIDmrL4nLCB2YWx1ZTogJzInfVxuICAgICAgICAgICAgICAgIF0gfSxcbiAgcmVmdW5kU3RhdHVzOiB7IGxhYmVsOiAn6YCA5qy+54q25oCBJywgdHlwZTogJ3NlbGVjdCcsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAge2xhYmVsOiAn5YWo6YOoJywgdmFsdWU6ICcnfSxcbiAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ+mAgOasvuS4rScsIHZhbHVlOiAnMCd9LFxuICAgICAgICAgICAgICAgICAge2xhYmVsOiAn6YCA5qy+5oiQ5YqfJywgdmFsdWU6ICcxJ30sXG4gICAgICAgICAgICAgICAgICB7bGFiZWw6ICfpgIDmrL7lpLHotKUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ+W+heWuoeaguCcsIHZhbHVlOiAnMyd9LFxuICAgICAgICAgICAgICAgICAge2xhYmVsOiAn6amz5ZueJywgdmFsdWU6ICc0J30sXG4gICAgICAgICAgICAgICAgICB7bGFiZWw6ICfnur/kuIvpgIDmrL7miJDlip8nLCB2YWx1ZTogJzUnfSxcbiAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ+mAgOasvue7iOatouaIkOWKnycsIHZhbHVlOiAnNid9LFxuXG4gICAgICAgICAgICAgICAgXSB9LFxuICBvcmRlckFtb3VudDogeyBsYWJlbDogJ+iuouWNlemHkeminSjlhYMpJyB9LFxuICByZWZ1bmRBbW91bnQ6IHsgbGFiZWw6ICfpgIDmrL7ph5Hpop0o5YWDKScgfSxcbiAgcGF5VHlwZTogeyBsYWJlbDogJ+aUr+S7mOaWueW8jycgfVxufTtcbnZhciBUQUJMRV9GSUVMRFMgPSBbXG4gICdvcmRlck51bScsICdvbGRPcmRlck51bScsICd2aXBNb2JpbGUnLCAncmVmdW5kVHlwZS9yZWZ1bmRUaW1lJyxcbiAgJ3BheVNvdXJjZS9vcmRlckFtb3VudCcsICdyZWZ1bmRTdGF0dXMvcmVmdW5kQW1vdW50JywgJ3BheUNoYW5uZWwvcGF5VHlwZSdcbl07XG52YXIgRklMVEVSX0ZJRUxEUyA9IFtcbiAgJ29yZGVyTnVtJywgJ29sZE9yZGVyTnVtJywgJ3JlZnVuZFNlcScsICdyZWZ1bmRUaW1lJyxcbiAgJ3JlZnVuZFR5cGUnLCAncmVmdW5kU3RhdHVzJ1xuXTtcbi8vIENhbGxiYWNrIGZ1bmN0aW9uc1xudmFyIGNyZWF0ZURhdGEgPSBmdW5jdGlvbiAoaXRlbSkge1xuICBXVUkuTW9kYWxEaWFsb2cuY3JlYXRlKHtcbiAgICBvbkNvbmZpcm06IGZ1bmN0aW9uIChpdGVtSW5mbykge30sXG4gICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHt9XG4gIH0pO1xuXG4gV1VJLmRhdGFEaWFsb2cuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JyksXG4gICBkaWFsb2dQb3A6dHJ1ZSxcbiAgICBtZXRhOiBNRVRBLFxuICAgIGxpc3Q6IGl0ZW0sXG4gICAgYnV0dG9uSGlkZTogZmFsc2UsXG4gICAgZmllbGRzOiBFRElUX0ZJRUxEU1xuICB9KTtcbn07XG5cbnZhciBlZGl0RGF0YSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2dhdGV3YXktcmVmdW5kLWRldGFpbC5odG1sP2lkPScgKyBpdGVtLm9yZGVyTnVtICsgJyZyZWZ1bmRTZXE9JyArIGl0ZW0ucmVmdW5kU2VxICsgJyZyZWZ1bmRJZD0nICsgaXRlbS5yZWZ1bmRJZDtcbn07XG5cbnZhciBkZWxldGVEYXRhID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgV1VJLk1vZGFsRGlhbG9nLmNyZWF0ZSh7XG4gICAgbWVzc2FnZTogJzExMTExJyxcbiAgICB0aXRsZTogJzIyMjInLFxuICAgIG9uQ29uZmlybTogZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZygnZGVsZXRlIGRhdGEnKTsgfVxuICB9KTtcbn07XG5cbnZhciBhY3RpdmVEYXRhID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gIGNvbnNvbGUubG9nKCdhY3RpdmU6ICcgKyBpdGVtcyk7XG59O1xuXG52YXIgZGVhY3RpdmVEYXRhID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gIGNvbnNvbGUubG9nKCdkZWFjdGl2ZTogJyArIGl0ZW1zKTtcbn07XG5cbnZhciBxdWVyeURhdGEgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgZWRpdFJlc291cmNlID0gV1VJLmdldFJlc291cmNlKCcvZWRpdCcpO1xuICB2YXIgZGVsZXRlUmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9kZWxldGUnKTtcblxuICBXVUkuYWpheCh7XG4gICAgdXJsOiAnL2Ftcy92MS9wYXltZW50L3F1ZXJ5L3BheUdhdGV3YXlSZWZ1bmRPcmRlcicsXG4gICAganNvbkRhdGE6IHtcbiAgICAgIG9yZGVyTnVtOiBvcHRpb25zLm9yZGVyTnVtIHx8ICcnLFxuICAgICAgb2xkT3JkZXJOdW06IG9wdGlvbnMub2xkT3JkZXJOdW0gfHwgJycsXG4gICAgICByZWZ1bmRTZXE6IG9wdGlvbnMucmVmdW5kU2VxIHx8ICcnLFxuICAgICAgcmVmdW5kVGltZTogb3B0aW9ucy5yZWZ1bmRUaW1lIHx8ICcnLFxuICAgICAgcmVmdW5kVHlwZTogb3B0aW9ucy5yZWZ1bmRUeXBlIHx8ICcnLFxuICAgICAgcmVmdW5kU3RhdHVzOiBvcHRpb25zLnJlZnVuZFN0YXR1cyB8fCAnJyxcbiAgICAgIHZpcE1vYmlsZTogb3B0aW9ucy52aXBNb2JpbGUgfHwgJycsXG4gICAgICBwYWdlTnVtOiBvcHRpb25zLmN1cnJlbnRQYWdlLFxuICAgICAgcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemVcbiAgICB9XG4gIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICBXVUkuRGF0YVRhYmxlRXguY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLmRhdGEtdGFibGUnKSxcbiAgICAgIG1ldGE6IE1FVEEsXG4gICAgICBmaWVsZHM6IFRBQkxFX0ZJRUxEUyxcbiAgICAgIGxpc3Q6IHJlc3AucGF5R2F0ZXdheVJlZnVuZE9yZGVyTGlzdCxcbiAgICAgIG9wZXJhdGlvbnM6IFt7XG4gICAgICAgIG5hbWU6IGVkaXRSZXNvdXJjZSAmJiBlZGl0UmVzb3VyY2UucmVzb3VyY2VEaXNwbGF5TmFtZSB8fCAn5p+l55yLJyxcbiAgICAgICAgY2FsbGJhY2s6IGVkaXREYXRhXG4gICAgICB9XVxuICAgIH0pO1xuXG4gICAgV1VJLkRhdGFQYWdpbmF0b3IuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLmRhdGEtcGFnaW5hdG9yJyksXG4gICAgICBjdXJyZW50UGFnZTogb3B0aW9ucy5jdXJyZW50UGFnZSxcbiAgICAgIHRvdGFsOiByZXNwLnRvdGFsLFxuICAgICAgcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemUsXG4gICAgICBvblN3aXRjaFBhZ2U6IGZ1bmN0aW9uIChjdXJyZW50UGFnZSkge1xuICAgICAgICBxdWVyeURhdGEoe1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiBjdXJyZW50UGFnZSxcbiAgICAgICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuLy8gTG9hZCBQYWdlXG5XVUkucmVhZHkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBxdWVyeVJlc291cmNlID0gV1VJLmdldFJlc291cmNlKCcvcXVlcnknKTtcbiAgdmFyIGFkZFJlc291cmNlID0gV1VJLmdldFJlc291cmNlKCcvYWRkJyk7XG5cbiAgV1VJLkNvbnRlbnRIZWFkZXIuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5jb250ZW50LWhlYWRlcicpLFxuICAgIG1ldGE6IFt7XG4gICAgICBuYW1lOiAn6aaW6aG1JyxcbiAgICAgIHVybDogJy9hbXMnXG4gICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ+mjnuWHoemAmuS4muWKoSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICfmlK/ku5jnvZHlhbPpgIDmrL7orqLljZXmn6Xor6InXG4gICAgICB9XVxuICB9KTtcblxuICBXVUkuRGF0YUZpbHRlckV4LmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcuZGF0YS1maWx0ZXInKSxcbiAgICBtZXRhOiBNRVRBLFxuICAgIGZpZWxkczogRklMVEVSX0ZJRUxEUyxcbiAgICByaWdodEJ1dHRvbjoge1xuICAgICAgbmFtZTogcXVlcnlSZXNvdXJjZSAmJiBxdWVyeVJlc291cmNlLnJlc291cmNlRGlzcGxheU5hbWUgfHwgJ+afpeivoicsXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24ocGFyYW0pIHtcbiAgICAgICBjb25zb2xlLmxvZyhwYXJhbSk7XG4gICAgICAgIHF1ZXJ5RGF0YSgkLmV4dGVuZChwYXJhbSwge1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgICAgIHBhZ2VTaXplOiBQQUdFX1NJWkVcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy9sZWZ0QnV0dG9uOiB7XG4gICAgLy8gIG5hbWU6ICflr7zlh7pFeGNlbCcsXG4gICAgLy8gIGNhbGxiYWNrOiBmdW5jdGlvbihwYXJhbSkge1xuICAgIC8vXG4gICAgLy8gIH1cbiAgICAvL31cbiAgfSk7XG5cbiAgcXVlcnlEYXRhKHtcbiAgICBjdXJyZW50UGFnZTogMCxcbiAgICBwYWdlU2l6ZTogMjBcbiAgfSk7XG59XG4gIC8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdhbXMnXG4gIH0pO1xufSk7XG4iXSwiZmlsZSI6ImZmYW4vZ2F0ZXdheS1yZWZ1bmQtbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
