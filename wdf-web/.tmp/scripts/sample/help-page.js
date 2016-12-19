'use strict';
var t = WUI.t;
// Constants
var PAGE_SIZE = 20;
// For i18n
var META = {};
var TABLE_FIELDS = ['id', 'name', 'age', 'birthday', 'email', 'status'];
var FILTER_FIELDS = ['name', 'age', 'birthday', 'status'];
var EDIT_FIELDS = ['name', 'age', 'birthday', 'email', 'status'];
// Callback functions
var createData = function () {
  var createDialog = WUI.dataDialog.create({
    dialogPop: true,
    dialogPopTitle: '新增用户',
    meta: META,
    list: {},
    fields: EDIT_FIELDS,
    onConfirm: function (itemInfo) {
      console.log(itemInfo);
      createDialog.hide();
    }
  });
};

var editData = function (item) {
  window.open('detail-page.html?id=' + item.id);
};

var deleteData = function (item) {
  var confirmDialog = WUI.ModalDialog.create({
    title: t('请确认'),
    message: t('是否删除此用户数据？'),
    onConfirm: function () {
      confirmDialog.hide();
      console.log(item);
    }
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
    url: '/sample/web/v1/users',
    method: 'GET',
    jsonData: {
      currentPage: options.currentPage,
      pageSize: options.pageSize
    }
  }).then(function (resp) {
    WUI.DataTable.create({
      $el: $('.data-table'),
      meta: META,
      fields: TABLE_FIELDS,
      list: resp.list,
      operations: [{
        name: editResource && editResource.resourceDisplayName,
        callback: editData
      }, {
          name: deleteResource && deleteResource.resourceDisplayName,
          callback: deleteData
        }],
      groups: [{
        name: t('启用'),
        className: 'btn btn-xs btn-success',
        id: 'btn-success',
        callback: activeData
      }, {
          name: t('停用'),
          className: 'btn btn-xs btn-danger',
          id: 'btn-danger',
          callback: deactiveData
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
  // For i18n
  META = {
    id: { label: t('用户ID') },
    name: { label: t('用户姓名'), required: true, maxLength: 20 },
    email: { label: 'Email', type: 'email', required: true, maxLength: 11 },
    age: { label: t('年龄'), required: true, type: 'number' },
    birthday: { label: t('生日'), type: 'date', format: 'YYYY-DD-MM' },
    status: {
      label: t('用户状态'),
      type: 'select',
      options: [{
        label: t('未开户'),
        value: 0
      }, {
          label: t('未激活'),
          value: 1
        }, {
          label: t('正常'),
          value: 2
        }, {
          label: t('已销户'),
          value: 3
        }]
    }
  };
  var queryResource = WUI.getResource('/query');
  var addResource = WUI.getResource('/add');

  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: t('帮助页面')
    }]
  });

  WUI.DataFilter.create({
    $el: $('.data-filter'),
    meta: META,
    fields: FILTER_FIELDS,
    queryButton: queryResource && queryResource.resourceDisplayName,
    onFilter: function (params) {
      queryData($.extend(params, {
        currentPage: 0,
        pageSize: PAGE_SIZE
      }));
    },
    addButton: addResource && addResource.resourceDisplayName,
    addFunc: createData
  });

  queryData({
    currentPage: 0,
    pageSize: 20
  });

  WUI.HelpDialog.create({
    meta: [
      {
        element: ".content-header",
        title: "WUI Framework",
        content: "使用WUI.ContentHeader制作面包屑",
        placement: 'bottom',
        backdrop: true
      },
      {
        element: ".data-filter",
        title: "WUI Framework",
        content: "使用WUI.DataFilter制作过滤器",
        placement: 'bottom',
        backdrop: true
      }
    ]
  })

  //// Instance the tour
  //var tour = new Tour({
  //  steps: [
  //    {
  //      element: ".content-header",
  //      title: "WUI Framework",
  //      content: "使用WUI.ContentHeader制作面包屑",
  //      placement: 'bottom',
  //      backdrop: true
  //    },
  //    {
  //      element: ".data-filter",
  //      title: "WUI Framework",
  //      content: "使用WUI.DataFilter制作过滤器",
  //      placement: 'bottom',
  //      backdrop: true
  //    }
  //  ]
  //});
  //
  //// Initialize the tour
  //tour.init();
  //
  //// Start the tour
  //tour.start(true);
}

// Keep this function
$(function () {
  WUI.init({
    system: 'sample',
    locale: 'zh-CN'
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzYW1wbGUvaGVscC1wYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciB0ID0gV1VJLnQ7XG4vLyBDb25zdGFudHNcbnZhciBQQUdFX1NJWkUgPSAyMDtcbi8vIEZvciBpMThuXG52YXIgTUVUQSA9IHt9O1xudmFyIFRBQkxFX0ZJRUxEUyA9IFsnaWQnLCAnbmFtZScsICdhZ2UnLCAnYmlydGhkYXknLCAnZW1haWwnLCAnc3RhdHVzJ107XG52YXIgRklMVEVSX0ZJRUxEUyA9IFsnbmFtZScsICdhZ2UnLCAnYmlydGhkYXknLCAnc3RhdHVzJ107XG52YXIgRURJVF9GSUVMRFMgPSBbJ25hbWUnLCAnYWdlJywgJ2JpcnRoZGF5JywgJ2VtYWlsJywgJ3N0YXR1cyddO1xuLy8gQ2FsbGJhY2sgZnVuY3Rpb25zXG52YXIgY3JlYXRlRGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNyZWF0ZURpYWxvZyA9IFdVSS5kYXRhRGlhbG9nLmNyZWF0ZSh7XG4gICAgZGlhbG9nUG9wOiB0cnVlLFxuICAgIGRpYWxvZ1BvcFRpdGxlOiAn5paw5aKe55So5oi3JyxcbiAgICBtZXRhOiBNRVRBLFxuICAgIGxpc3Q6IHt9LFxuICAgIGZpZWxkczogRURJVF9GSUVMRFMsXG4gICAgb25Db25maXJtOiBmdW5jdGlvbiAoaXRlbUluZm8pIHtcbiAgICAgIGNvbnNvbGUubG9nKGl0ZW1JbmZvKTtcbiAgICAgIGNyZWF0ZURpYWxvZy5oaWRlKCk7XG4gICAgfVxuICB9KTtcbn07XG5cbnZhciBlZGl0RGF0YSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHdpbmRvdy5vcGVuKCdkZXRhaWwtcGFnZS5odG1sP2lkPScgKyBpdGVtLmlkKTtcbn07XG5cbnZhciBkZWxldGVEYXRhID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbmZpcm1EaWFsb2cgPSBXVUkuTW9kYWxEaWFsb2cuY3JlYXRlKHtcbiAgICB0aXRsZTogdCgn6K+356Gu6K6kJyksXG4gICAgbWVzc2FnZTogdCgn5piv5ZCm5Yig6Zmk5q2k55So5oi35pWw5o2u77yfJyksXG4gICAgb25Db25maXJtOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25maXJtRGlhbG9nLmhpZGUoKTtcbiAgICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG52YXIgYWN0aXZlRGF0YSA9IGZ1bmN0aW9uIChpdGVtcykge1xuICBjb25zb2xlLmxvZygnYWN0aXZlOiAnICsgaXRlbXMpO1xufTtcblxudmFyIGRlYWN0aXZlRGF0YSA9IGZ1bmN0aW9uIChpdGVtcykge1xuICBjb25zb2xlLmxvZygnZGVhY3RpdmU6ICcgKyBpdGVtcyk7XG59O1xuXG52YXIgcXVlcnlEYXRhID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdmFyIGVkaXRSZXNvdXJjZSA9IFdVSS5nZXRSZXNvdXJjZSgnL2VkaXQnKTtcbiAgdmFyIGRlbGV0ZVJlc291cmNlID0gV1VJLmdldFJlc291cmNlKCcvZGVsZXRlJyk7XG5cbiAgV1VJLmFqYXgoe1xuICAgIHVybDogJy9zYW1wbGUvd2ViL3YxL3VzZXJzJyxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIGpzb25EYXRhOiB7XG4gICAgICBjdXJyZW50UGFnZTogb3B0aW9ucy5jdXJyZW50UGFnZSxcbiAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplXG4gICAgfVxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgV1VJLkRhdGFUYWJsZS5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcuZGF0YS10YWJsZScpLFxuICAgICAgbWV0YTogTUVUQSxcbiAgICAgIGZpZWxkczogVEFCTEVfRklFTERTLFxuICAgICAgbGlzdDogcmVzcC5saXN0LFxuICAgICAgb3BlcmF0aW9uczogW3tcbiAgICAgICAgbmFtZTogZWRpdFJlc291cmNlICYmIGVkaXRSZXNvdXJjZS5yZXNvdXJjZURpc3BsYXlOYW1lLFxuICAgICAgICBjYWxsYmFjazogZWRpdERhdGFcbiAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiBkZWxldGVSZXNvdXJjZSAmJiBkZWxldGVSZXNvdXJjZS5yZXNvdXJjZURpc3BsYXlOYW1lLFxuICAgICAgICAgIGNhbGxiYWNrOiBkZWxldGVEYXRhXG4gICAgICAgIH1dLFxuICAgICAgZ3JvdXBzOiBbe1xuICAgICAgICBuYW1lOiB0KCflkK/nlKgnKSxcbiAgICAgICAgY2xhc3NOYW1lOiAnYnRuIGJ0bi14cyBidG4tc3VjY2VzcycsXG4gICAgICAgIGlkOiAnYnRuLXN1Y2Nlc3MnLFxuICAgICAgICBjYWxsYmFjazogYWN0aXZlRGF0YVxuICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6IHQoJ+WBnOeUqCcpLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ2J0biBidG4teHMgYnRuLWRhbmdlcicsXG4gICAgICAgICAgaWQ6ICdidG4tZGFuZ2VyJyxcbiAgICAgICAgICBjYWxsYmFjazogZGVhY3RpdmVEYXRhXG4gICAgICAgIH1dXG4gICAgfSk7XG5cbiAgICBXVUkuRGF0YVBhZ2luYXRvci5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcuZGF0YS1wYWdpbmF0b3InKSxcbiAgICAgIGN1cnJlbnRQYWdlOiBvcHRpb25zLmN1cnJlbnRQYWdlLFxuICAgICAgdG90YWw6IHJlc3AudG90YWwsXG4gICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZSxcbiAgICAgIG9uU3dpdGNoUGFnZTogZnVuY3Rpb24gKGN1cnJlbnRQYWdlKSB7XG4gICAgICAgIHF1ZXJ5RGF0YSh7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IGN1cnJlbnRQYWdlLFxuICAgICAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG4vLyBMb2FkIFBhZ2VcbldVSS5yZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gRm9yIGkxOG5cbiAgTUVUQSA9IHtcbiAgICBpZDogeyBsYWJlbDogdCgn55So5oi3SUQnKSB9LFxuICAgIG5hbWU6IHsgbGFiZWw6IHQoJ+eUqOaIt+Wnk+WQjScpLCByZXF1aXJlZDogdHJ1ZSwgbWF4TGVuZ3RoOiAyMCB9LFxuICAgIGVtYWlsOiB7IGxhYmVsOiAnRW1haWwnLCB0eXBlOiAnZW1haWwnLCByZXF1aXJlZDogdHJ1ZSwgbWF4TGVuZ3RoOiAxMSB9LFxuICAgIGFnZTogeyBsYWJlbDogdCgn5bm06b6EJyksIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9LFxuICAgIGJpcnRoZGF5OiB7IGxhYmVsOiB0KCfnlJ/ml6UnKSwgdHlwZTogJ2RhdGUnLCBmb3JtYXQ6ICdZWVlZLURELU1NJyB9LFxuICAgIHN0YXR1czoge1xuICAgICAgbGFiZWw6IHQoJ+eUqOaIt+eKtuaAgScpLFxuICAgICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgICBvcHRpb25zOiBbe1xuICAgICAgICBsYWJlbDogdCgn5pyq5byA5oi3JyksXG4gICAgICAgIHZhbHVlOiAwXG4gICAgICB9LCB7XG4gICAgICAgICAgbGFiZWw6IHQoJ+acqua/gOa0uycpLFxuICAgICAgICAgIHZhbHVlOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBsYWJlbDogdCgn5q2j5bi4JyksXG4gICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgIGxhYmVsOiB0KCflt7LplIDmiLcnKSxcbiAgICAgICAgICB2YWx1ZTogM1xuICAgICAgICB9XVxuICAgIH1cbiAgfTtcbiAgdmFyIHF1ZXJ5UmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9xdWVyeScpO1xuICB2YXIgYWRkUmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9hZGQnKTtcblxuICBXVUkuQ29udGVudEhlYWRlci5jcmVhdGUoe1xuICAgICRlbDogJCgnLmNvbnRlbnQtaGVhZGVyJyksXG4gICAgbWV0YTogW3tcbiAgICAgIG5hbWU6IHQoJ+W4ruWKqemhtemdoicpXG4gICAgfV1cbiAgfSk7XG5cbiAgV1VJLkRhdGFGaWx0ZXIuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5kYXRhLWZpbHRlcicpLFxuICAgIG1ldGE6IE1FVEEsXG4gICAgZmllbGRzOiBGSUxURVJfRklFTERTLFxuICAgIHF1ZXJ5QnV0dG9uOiBxdWVyeVJlc291cmNlICYmIHF1ZXJ5UmVzb3VyY2UucmVzb3VyY2VEaXNwbGF5TmFtZSxcbiAgICBvbkZpbHRlcjogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgcXVlcnlEYXRhKCQuZXh0ZW5kKHBhcmFtcywge1xuICAgICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgICAgcGFnZVNpemU6IFBBR0VfU0laRVxuICAgICAgfSkpO1xuICAgIH0sXG4gICAgYWRkQnV0dG9uOiBhZGRSZXNvdXJjZSAmJiBhZGRSZXNvdXJjZS5yZXNvdXJjZURpc3BsYXlOYW1lLFxuICAgIGFkZEZ1bmM6IGNyZWF0ZURhdGFcbiAgfSk7XG5cbiAgcXVlcnlEYXRhKHtcbiAgICBjdXJyZW50UGFnZTogMCxcbiAgICBwYWdlU2l6ZTogMjBcbiAgfSk7XG5cbiAgV1VJLkhlbHBEaWFsb2cuY3JlYXRlKHtcbiAgICBtZXRhOiBbXG4gICAgICB7XG4gICAgICAgIGVsZW1lbnQ6IFwiLmNvbnRlbnQtaGVhZGVyXCIsXG4gICAgICAgIHRpdGxlOiBcIldVSSBGcmFtZXdvcmtcIixcbiAgICAgICAgY29udGVudDogXCLkvb/nlKhXVUkuQ29udGVudEhlYWRlcuWItuS9nOmdouWMheWxkVwiLFxuICAgICAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgICAgICBiYWNrZHJvcDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZWxlbWVudDogXCIuZGF0YS1maWx0ZXJcIixcbiAgICAgICAgdGl0bGU6IFwiV1VJIEZyYW1ld29ya1wiLFxuICAgICAgICBjb250ZW50OiBcIuS9v+eUqFdVSS5EYXRhRmlsdGVy5Yi25L2c6L+H5ruk5ZmoXCIsXG4gICAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICAgIGJhY2tkcm9wOiB0cnVlXG4gICAgICB9XG4gICAgXVxuICB9KVxuXG4gIC8vLy8gSW5zdGFuY2UgdGhlIHRvdXJcbiAgLy92YXIgdG91ciA9IG5ldyBUb3VyKHtcbiAgLy8gIHN0ZXBzOiBbXG4gIC8vICAgIHtcbiAgLy8gICAgICBlbGVtZW50OiBcIi5jb250ZW50LWhlYWRlclwiLFxuICAvLyAgICAgIHRpdGxlOiBcIldVSSBGcmFtZXdvcmtcIixcbiAgLy8gICAgICBjb250ZW50OiBcIuS9v+eUqFdVSS5Db250ZW50SGVhZGVy5Yi25L2c6Z2i5YyF5bGRXCIsXG4gIC8vICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgLy8gICAgICBiYWNrZHJvcDogdHJ1ZVxuICAvLyAgICB9LFxuICAvLyAgICB7XG4gIC8vICAgICAgZWxlbWVudDogXCIuZGF0YS1maWx0ZXJcIixcbiAgLy8gICAgICB0aXRsZTogXCJXVUkgRnJhbWV3b3JrXCIsXG4gIC8vICAgICAgY29udGVudDogXCLkvb/nlKhXVUkuRGF0YUZpbHRlcuWItuS9nOi/h+a7pOWZqFwiLFxuICAvLyAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gIC8vICAgICAgYmFja2Ryb3A6IHRydWVcbiAgLy8gICAgfVxuICAvLyAgXVxuICAvL30pO1xuICAvL1xuICAvLy8vIEluaXRpYWxpemUgdGhlIHRvdXJcbiAgLy90b3VyLmluaXQoKTtcbiAgLy9cbiAgLy8vLyBTdGFydCB0aGUgdG91clxuICAvL3RvdXIuc3RhcnQodHJ1ZSk7XG59XG5cbi8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdzYW1wbGUnLFxuICAgIGxvY2FsZTogJ3poLUNOJ1xuICB9KTtcbn0pO1xuIl0sImZpbGUiOiJzYW1wbGUvaGVscC1wYWdlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
