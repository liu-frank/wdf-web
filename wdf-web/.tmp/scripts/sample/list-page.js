'use strict';
// Constants
var PAGE_SIZE = 20;
var META = {
  id: { label: '用户ID' },
  name: { label: '用户姓名', required: true, maxLength: 20 },
  email: { label: 'Email', type: 'email', required: true, maxLength: 11 },
  age: { label: '年龄', required: true, type: 'number' },
  birthday: { label: '生日', type: 'date', format: 'yyyy-DD-MM' },
  status: {
    label: '用户状态',
    type: 'select',
    options: [{
      label: '未开户',
      value: 0
    }, {
      label: '未激活',
      value: 1
    }, {
      label: '正常',
      value: 2
    }, {
      label: '已销户',
      value: 3
    }]
  }
};
var TABLE_FIELDS = ['id', 'name', 'age', 'birthday', 'email', 'status'];
var FILTER_FIELDS = ['name', 'age', 'birthday', 'status'];
var EDIT_FIELDS = ['name', 'age', 'birthday', 'email', 'status'];
// Callback functions
var createData = function (item) {
  WUI.ModalDialog.create({
    onConfirm: function (/*itemInfo*/) {},
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
  window.open('detail-page.html?id=' + item.id);
};

var deleteData = function (item) {
  WUI.ModalDialog.create({
    message: '11111',
    title: '2222',
    onConfirm: function () { console.log('delete data', item); }
  });
};

var activeData = function (items) {
  console.log('active: ' + items);
};

var deactiveData = function (items) {
  console.log( items);
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
        name: '启用',
        className: 'btn btn-xs btn-success',
        id: 'btn-success',
        callback: activeData
      }, {
        name: '停用',
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
  var queryResource = WUI.getResource('/query');
  var addResource = WUI.getResource('/add');

  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '列表页面'
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
}
  // Keep this function
$(function () {
  WUI.init({
    system: 'sample'
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzYW1wbGUvbGlzdC1wYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8vIENvbnN0YW50c1xudmFyIFBBR0VfU0laRSA9IDIwO1xudmFyIE1FVEEgPSB7XG4gIGlkOiB7IGxhYmVsOiAn55So5oi3SUQnIH0sXG4gIG5hbWU6IHsgbGFiZWw6ICfnlKjmiLflp5PlkI0nLCByZXF1aXJlZDogdHJ1ZSwgbWF4TGVuZ3RoOiAyMCB9LFxuICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJywgcmVxdWlyZWQ6IHRydWUsIG1heExlbmd0aDogMTEgfSxcbiAgYWdlOiB7IGxhYmVsOiAn5bm06b6EJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0sXG4gIGJpcnRoZGF5OiB7IGxhYmVsOiAn55Sf5pelJywgdHlwZTogJ2RhdGUnLCBmb3JtYXQ6ICd5eXl5LURELU1NJyB9LFxuICBzdGF0dXM6IHtcbiAgICBsYWJlbDogJ+eUqOaIt+eKtuaAgScsXG4gICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgb3B0aW9uczogW3tcbiAgICAgIGxhYmVsOiAn5pyq5byA5oi3JyxcbiAgICAgIHZhbHVlOiAwXG4gICAgfSwge1xuICAgICAgbGFiZWw6ICfmnKrmv4DmtLsnLFxuICAgICAgdmFsdWU6IDFcbiAgICB9LCB7XG4gICAgICBsYWJlbDogJ+ato+W4uCcsXG4gICAgICB2YWx1ZTogMlxuICAgIH0sIHtcbiAgICAgIGxhYmVsOiAn5bey6ZSA5oi3JyxcbiAgICAgIHZhbHVlOiAzXG4gICAgfV1cbiAgfVxufTtcbnZhciBUQUJMRV9GSUVMRFMgPSBbJ2lkJywgJ25hbWUnLCAnYWdlJywgJ2JpcnRoZGF5JywgJ2VtYWlsJywgJ3N0YXR1cyddO1xudmFyIEZJTFRFUl9GSUVMRFMgPSBbJ25hbWUnLCAnYWdlJywgJ2JpcnRoZGF5JywgJ3N0YXR1cyddO1xudmFyIEVESVRfRklFTERTID0gWyduYW1lJywgJ2FnZScsICdiaXJ0aGRheScsICdlbWFpbCcsICdzdGF0dXMnXTtcbi8vIENhbGxiYWNrIGZ1bmN0aW9uc1xudmFyIGNyZWF0ZURhdGEgPSBmdW5jdGlvbiAoaXRlbSkge1xuICBXVUkuTW9kYWxEaWFsb2cuY3JlYXRlKHtcbiAgICBvbkNvbmZpcm06IGZ1bmN0aW9uICgvKml0ZW1JbmZvKi8pIHt9LFxuICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7fVxuICB9KTtcblxuIFdVSS5kYXRhRGlhbG9nLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcubW9kYWwtYm9keScpLFxuICAgZGlhbG9nUG9wOnRydWUsXG4gICAgbWV0YTogTUVUQSxcbiAgICBsaXN0OiBpdGVtLFxuICAgIGJ1dHRvbkhpZGU6IGZhbHNlLFxuICAgIGZpZWxkczogRURJVF9GSUVMRFNcbiAgfSk7XG59O1xuXG52YXIgZWRpdERhdGEgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB3aW5kb3cub3BlbignZGV0YWlsLXBhZ2UuaHRtbD9pZD0nICsgaXRlbS5pZCk7XG59O1xuXG52YXIgZGVsZXRlRGF0YSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIFdVSS5Nb2RhbERpYWxvZy5jcmVhdGUoe1xuICAgIG1lc3NhZ2U6ICcxMTExMScsXG4gICAgdGl0bGU6ICcyMjIyJyxcbiAgICBvbkNvbmZpcm06IGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJ2RlbGV0ZSBkYXRhJywgaXRlbSk7IH1cbiAgfSk7XG59O1xuXG52YXIgYWN0aXZlRGF0YSA9IGZ1bmN0aW9uIChpdGVtcykge1xuICBjb25zb2xlLmxvZygnYWN0aXZlOiAnICsgaXRlbXMpO1xufTtcblxudmFyIGRlYWN0aXZlRGF0YSA9IGZ1bmN0aW9uIChpdGVtcykge1xuICBjb25zb2xlLmxvZyggaXRlbXMpO1xufTtcblxudmFyIHF1ZXJ5RGF0YSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBlZGl0UmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9lZGl0Jyk7XG4gIHZhciBkZWxldGVSZXNvdXJjZSA9IFdVSS5nZXRSZXNvdXJjZSgnL2RlbGV0ZScpO1xuXG4gIFdVSS5hamF4KHtcbiAgICB1cmw6ICcvc2FtcGxlL3dlYi92MS91c2VycycsXG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBqc29uRGF0YToge1xuICAgICAgY3VycmVudFBhZ2U6IG9wdGlvbnMuY3VycmVudFBhZ2UsXG4gICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZVxuICAgIH1cbiAgfSkudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgIFdVSS5EYXRhVGFibGUuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLmRhdGEtdGFibGUnKSxcbiAgICAgIG1ldGE6IE1FVEEsXG4gICAgICBmaWVsZHM6IFRBQkxFX0ZJRUxEUyxcbiAgICAgIGxpc3Q6IHJlc3AubGlzdCxcbiAgICAgIG9wZXJhdGlvbnM6IFt7XG4gICAgICAgIG5hbWU6IGVkaXRSZXNvdXJjZSAmJiBlZGl0UmVzb3VyY2UucmVzb3VyY2VEaXNwbGF5TmFtZSxcbiAgICAgICAgY2FsbGJhY2s6IGVkaXREYXRhXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6IGRlbGV0ZVJlc291cmNlICYmIGRlbGV0ZVJlc291cmNlLnJlc291cmNlRGlzcGxheU5hbWUsXG4gICAgICAgIGNhbGxiYWNrOiBkZWxldGVEYXRhXG4gICAgICB9XSxcbiAgICAgIGdyb3VwczogW3tcbiAgICAgICAgbmFtZTogJ+WQr+eUqCcsXG4gICAgICAgIGNsYXNzTmFtZTogJ2J0biBidG4teHMgYnRuLXN1Y2Nlc3MnLFxuICAgICAgICBpZDogJ2J0bi1zdWNjZXNzJyxcbiAgICAgICAgY2FsbGJhY2s6IGFjdGl2ZURhdGFcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ+WBnOeUqCcsXG4gICAgICAgIGNsYXNzTmFtZTogJ2J0biBidG4teHMgYnRuLWRhbmdlcicsXG4gICAgICAgIGlkOiAnYnRuLWRhbmdlcicsXG4gICAgICAgIGNhbGxiYWNrOiBkZWFjdGl2ZURhdGFcbiAgICAgIH1dXG4gICAgfSk7XG5cbiAgICBXVUkuRGF0YVBhZ2luYXRvci5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcuZGF0YS1wYWdpbmF0b3InKSxcbiAgICAgIGN1cnJlbnRQYWdlOiBvcHRpb25zLmN1cnJlbnRQYWdlLFxuICAgICAgdG90YWw6IHJlc3AudG90YWwsXG4gICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZSxcbiAgICAgIG9uU3dpdGNoUGFnZTogZnVuY3Rpb24gKGN1cnJlbnRQYWdlKSB7XG4gICAgICAgIHF1ZXJ5RGF0YSh7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IGN1cnJlbnRQYWdlLFxuICAgICAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG4vLyBMb2FkIFBhZ2VcbldVSS5yZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5UmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9xdWVyeScpO1xuICB2YXIgYWRkUmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9hZGQnKTtcblxuICBXVUkuQ29udGVudEhlYWRlci5jcmVhdGUoe1xuICAgICRlbDogJCgnLmNvbnRlbnQtaGVhZGVyJyksXG4gICAgbWV0YTogW3tcbiAgICAgIG5hbWU6ICfliJfooajpobXpnaInXG4gICAgfV1cbiAgfSk7XG5cbiAgV1VJLkRhdGFGaWx0ZXIuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5kYXRhLWZpbHRlcicpLFxuICAgIG1ldGE6IE1FVEEsXG4gICAgZmllbGRzOiBGSUxURVJfRklFTERTLFxuICAgIHF1ZXJ5QnV0dG9uOiBxdWVyeVJlc291cmNlICYmIHF1ZXJ5UmVzb3VyY2UucmVzb3VyY2VEaXNwbGF5TmFtZSxcbiAgICBvbkZpbHRlcjogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgcXVlcnlEYXRhKCQuZXh0ZW5kKHBhcmFtcywge1xuICAgICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgICAgcGFnZVNpemU6IFBBR0VfU0laRVxuICAgICAgfSkpO1xuICAgIH0sXG4gICAgYWRkQnV0dG9uOiBhZGRSZXNvdXJjZSAmJiBhZGRSZXNvdXJjZS5yZXNvdXJjZURpc3BsYXlOYW1lLFxuICAgIGFkZEZ1bmM6IGNyZWF0ZURhdGFcbiAgfSk7XG5cbiAgcXVlcnlEYXRhKHtcbiAgICBjdXJyZW50UGFnZTogMCxcbiAgICBwYWdlU2l6ZTogMjBcbiAgfSk7XG59XG4gIC8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdzYW1wbGUnXG4gIH0pO1xufSk7XG4iXSwiZmlsZSI6InNhbXBsZS9saXN0LXBhZ2UuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
