'use strict';
// Constants
var PAGE_SIZE = 20;
var META = {
  PWID: { label: 'PWID'},
  mobile: { label: '手机号码', type: 'phone'},
  email: { label: 'Email', type: 'email' },
  accountName: { label: '姓名' },
  realNameLevel: { label: '实名等级' },
  accountResource: { label: '开户来源' },
  accountStatus: {
    label: '状态',
    options:[
      {
      label:'创建',
      value:'0'
      },
      {
        label:'正常',
        value:'1'
      },
      {
        label:'冻结',
        value:'2'
      },
      {
        label:'已合并',
        value:'8'
      },
      {
        label:'注销',
        value:'9'
      }
    ],
    type:'select'
  },
  openTime: {
    label: '开户时间'
  },
  status: {
    label: '状态',
    type: 'select',
    options: [{
      label: '正常',
      value: 0
    }]
  }
};
var TABLE_FIELDS = ['PWID', 'mobile', 'email', 'accountName', 'realNameLevel', 'accountResource', 'accountStatus', 'openTime'];
var FILTER_FIELDS = ['mobile'];
// Callback functions
var editData = function (item) {
  // window.open('allowance-detail.html?id=' + item.id);
  window.location.href = 'allowance-detail.html?id=' + item.PWID+'&phone=' + item.mobile;
};

var queryData = function (options) {
  var editResource = WUI.getResource('/detail');

 console.log( {
      currentPage: options.currentPage,
      pageSize: options.pageSize,
      mobile: options.mobile
    });

  WUI.ajax({
    url: '/ams/v1/pocketMoney/query/accountList',
    jsonData: {
      //pageNum: options.currentPage,
      //pageSize: options.pageSize,
      mobile: options.mobile
    }
  }).then(function (resp) {
    WUI.DataTable.create({
      $el: $('.data-table'),
      meta: META,
      fields: TABLE_FIELDS,
      list: resp.memberList,
      operations: [{
        name: editResource && editResource.resourceDisplayName,
        callback: editData
      }]
    });

    //WUI.DataPaginator.create({
    //  $el: $('.data-paginator'),
    //  currentPage: options.currentPage,
    //  total: resp.total,
    //  pageSize: options.pageSize,
    //  onSwitchPage: function (currentPage) {
    //    queryData({
    //      currentPage: currentPage,
    //      pageSize: options.pageSize
    //    });
    //  }
    //});
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
        name: '飞凡通账户查询'
      }]
  });

  WUI.DataFilterEx.create({
    $el: $('.data-filter'),
    meta: META,
    fields: FILTER_FIELDS,
    rightButton: {
      name: queryResource && queryResource.resourceDisplayName || '查询',
      callback: function(param) {
        queryData($.extend(param, {
          currentPage: 0,
          pageSize: PAGE_SIZE
        }));
      }
    }
  });

  //queryData({
  //  currentPage: 0,
  //  pageSize: 20
  //});
}
  // Keep this function
$(function () {
  WUI.init({
    system: 'ams'
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmZmFuL2FsbG93YW5jZS1saXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8vIENvbnN0YW50c1xudmFyIFBBR0VfU0laRSA9IDIwO1xudmFyIE1FVEEgPSB7XG4gIFBXSUQ6IHsgbGFiZWw6ICdQV0lEJ30sXG4gIG1vYmlsZTogeyBsYWJlbDogJ+aJi+acuuWPt+eggScsIHR5cGU6ICdwaG9uZSd9LFxuICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJyB9LFxuICBhY2NvdW50TmFtZTogeyBsYWJlbDogJ+Wnk+WQjScgfSxcbiAgcmVhbE5hbWVMZXZlbDogeyBsYWJlbDogJ+WunuWQjeetiee6pycgfSxcbiAgYWNjb3VudFJlc291cmNlOiB7IGxhYmVsOiAn5byA5oi35p2l5rqQJyB9LFxuICBhY2NvdW50U3RhdHVzOiB7XG4gICAgbGFiZWw6ICfnirbmgIEnLFxuICAgIG9wdGlvbnM6W1xuICAgICAge1xuICAgICAgbGFiZWw6J+WIm+W7uicsXG4gICAgICB2YWx1ZTonMCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOifmraPluLgnLFxuICAgICAgICB2YWx1ZTonMSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiflhrvnu5MnLFxuICAgICAgICB2YWx1ZTonMidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiflt7LlkIjlubYnLFxuICAgICAgICB2YWx1ZTonOCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOifms6jplIAnLFxuICAgICAgICB2YWx1ZTonOSdcbiAgICAgIH1cbiAgICBdLFxuICAgIHR5cGU6J3NlbGVjdCdcbiAgfSxcbiAgb3BlblRpbWU6IHtcbiAgICBsYWJlbDogJ+W8gOaIt+aXtumXtCdcbiAgfSxcbiAgc3RhdHVzOiB7XG4gICAgbGFiZWw6ICfnirbmgIEnLFxuICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgIG9wdGlvbnM6IFt7XG4gICAgICBsYWJlbDogJ+ato+W4uCcsXG4gICAgICB2YWx1ZTogMFxuICAgIH1dXG4gIH1cbn07XG52YXIgVEFCTEVfRklFTERTID0gWydQV0lEJywgJ21vYmlsZScsICdlbWFpbCcsICdhY2NvdW50TmFtZScsICdyZWFsTmFtZUxldmVsJywgJ2FjY291bnRSZXNvdXJjZScsICdhY2NvdW50U3RhdHVzJywgJ29wZW5UaW1lJ107XG52YXIgRklMVEVSX0ZJRUxEUyA9IFsnbW9iaWxlJ107XG4vLyBDYWxsYmFjayBmdW5jdGlvbnNcbnZhciBlZGl0RGF0YSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIC8vIHdpbmRvdy5vcGVuKCdhbGxvd2FuY2UtZGV0YWlsLmh0bWw/aWQ9JyArIGl0ZW0uaWQpO1xuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdhbGxvd2FuY2UtZGV0YWlsLmh0bWw/aWQ9JyArIGl0ZW0uUFdJRCsnJnBob25lPScgKyBpdGVtLm1vYmlsZTtcbn07XG5cbnZhciBxdWVyeURhdGEgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgZWRpdFJlc291cmNlID0gV1VJLmdldFJlc291cmNlKCcvZGV0YWlsJyk7XG5cbiBjb25zb2xlLmxvZygge1xuICAgICAgY3VycmVudFBhZ2U6IG9wdGlvbnMuY3VycmVudFBhZ2UsXG4gICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZSxcbiAgICAgIG1vYmlsZTogb3B0aW9ucy5tb2JpbGVcbiAgICB9KTtcblxuICBXVUkuYWpheCh7XG4gICAgdXJsOiAnL2Ftcy92MS9wb2NrZXRNb25leS9xdWVyeS9hY2NvdW50TGlzdCcsXG4gICAganNvbkRhdGE6IHtcbiAgICAgIC8vcGFnZU51bTogb3B0aW9ucy5jdXJyZW50UGFnZSxcbiAgICAgIC8vcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemUsXG4gICAgICBtb2JpbGU6IG9wdGlvbnMubW9iaWxlXG4gICAgfVxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgV1VJLkRhdGFUYWJsZS5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcuZGF0YS10YWJsZScpLFxuICAgICAgbWV0YTogTUVUQSxcbiAgICAgIGZpZWxkczogVEFCTEVfRklFTERTLFxuICAgICAgbGlzdDogcmVzcC5tZW1iZXJMaXN0LFxuICAgICAgb3BlcmF0aW9uczogW3tcbiAgICAgICAgbmFtZTogZWRpdFJlc291cmNlICYmIGVkaXRSZXNvdXJjZS5yZXNvdXJjZURpc3BsYXlOYW1lLFxuICAgICAgICBjYWxsYmFjazogZWRpdERhdGFcbiAgICAgIH1dXG4gICAgfSk7XG5cbiAgICAvL1dVSS5EYXRhUGFnaW5hdG9yLmNyZWF0ZSh7XG4gICAgLy8gICRlbDogJCgnLmRhdGEtcGFnaW5hdG9yJyksXG4gICAgLy8gIGN1cnJlbnRQYWdlOiBvcHRpb25zLmN1cnJlbnRQYWdlLFxuICAgIC8vICB0b3RhbDogcmVzcC50b3RhbCxcbiAgICAvLyAgcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemUsXG4gICAgLy8gIG9uU3dpdGNoUGFnZTogZnVuY3Rpb24gKGN1cnJlbnRQYWdlKSB7XG4gICAgLy8gICAgcXVlcnlEYXRhKHtcbiAgICAvLyAgICAgIGN1cnJlbnRQYWdlOiBjdXJyZW50UGFnZSxcbiAgICAvLyAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplXG4gICAgLy8gICAgfSk7XG4gICAgLy8gIH1cbiAgICAvL30pO1xuICB9KTtcbn07XG4vLyBMb2FkIFBhZ2VcbldVSS5yZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5UmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9xdWVyeScpO1xuICB2YXIgYWRkUmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9hZGQnKTtcblxuICBXVUkuQ29udGVudEhlYWRlci5jcmVhdGUoe1xuICAgICRlbDogJCgnLmNvbnRlbnQtaGVhZGVyJyksXG4gICAgbWV0YTogW3tcbiAgICAgIG5hbWU6ICfpppbpobUnLFxuICAgICAgdXJsOiAnL2FtcydcbiAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAn6aOe5Yeh6YCa5Lia5YqhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ+mjnuWHoemAmui0puaIt+afpeivoidcbiAgICAgIH1dXG4gIH0pO1xuXG4gIFdVSS5EYXRhRmlsdGVyRXguY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5kYXRhLWZpbHRlcicpLFxuICAgIG1ldGE6IE1FVEEsXG4gICAgZmllbGRzOiBGSUxURVJfRklFTERTLFxuICAgIHJpZ2h0QnV0dG9uOiB7XG4gICAgICBuYW1lOiBxdWVyeVJlc291cmNlICYmIHF1ZXJ5UmVzb3VyY2UucmVzb3VyY2VEaXNwbGF5TmFtZSB8fCAn5p+l6K+iJyxcbiAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihwYXJhbSkge1xuICAgICAgICBxdWVyeURhdGEoJC5leHRlbmQocGFyYW0sIHtcbiAgICAgICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgICAgICBwYWdlU2l6ZTogUEFHRV9TSVpFXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8vcXVlcnlEYXRhKHtcbiAgLy8gIGN1cnJlbnRQYWdlOiAwLFxuICAvLyAgcGFnZVNpemU6IDIwXG4gIC8vfSk7XG59XG4gIC8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdhbXMnXG4gIH0pO1xufSk7XG4iXSwiZmlsZSI6ImZmYW4vYWxsb3dhbmNlLWxpc3QuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
