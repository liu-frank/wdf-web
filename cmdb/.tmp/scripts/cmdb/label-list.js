'use strict';
// Constants
var CMDB_API = {
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addLabel', // 增
  delete: '/web/deleteLabels', // 删
  update: '/web/updateLabel', // 改
  column: '/web/label/column', // 查询条件
  query: '/web/label/query', // 查
  export: '/web/excel/download/label', // export
  import: '/web/excel/upload/label' // import
};
META['code'] = { label: '标签_code', required: true, maxLength:30 };
var EDIT_FIELDS = ['label_key', 'label_value', 'status', 'description'];

var selectAry = ['status'];
var createData = function (item) {
  // 初始化select
  $.each(selectAry,function(i, e){
    for(var j=0;j<META[e].options.length;j++){
      if (META[e].options[j].label == item[e]) {
        META[e].options[j].select = true;
      } else {
        META[e].options[j].select = false;
      }
    }
  });

  WUI.ModalDialog.create({
    buttonHide: true,
  });

  WUI.dataDialog.create({
    $el: $('.modal-body'),
    dialogPop:true,
    meta: META,
    list: item,
    buttonHide: false,
    onConfirm: submitData.bind(null, item),
    fields: EDIT_FIELDS
  });
};
queryData = function (options) {
  var _beforeSend = function(request) {
    request.setRequestHeader("pageNum", options.currentPage);
    request.setRequestHeader("pageLimit", options.pageSize);
    request.setRequestHeader("Authorization", getCookie('CMDB-TOKEN-TYPE') +' '+ getCookie('CMDB-TOKEN'));
  };
  
  WUI.ajax({
    url: DOMAIN.CMDB + CMDB_API.query,
    method: 'POST',
    jsonData: queryJson(),
    disableXSS: true,
    beforeSend: _beforeSend
  }).then(function (resp) {
    WUI.DataTable.create({
      $el: $('.data-table'),
      meta: META,
      fields: TABLE_FIELDS,
      list: resp.list,
      operations: [{
        name: '编辑',
        callback: createData
      }, {
        name: '删除',
        callback: deleteData
      }],
      groups: [{
        name: '批量删除',
        className: 'btn btn-xs btn-danger',
        id: 'btn-danger',
        callback: deleteData
      }]
    });

    WUI.DataPaginator.create({
      $el: $('.data-paginator'),
      currentPage: options.currentPage - 1,
      total: resp.totalCount,
      pageSize: options.pageSize,
      onSwitchPage: function (currentPage) {
        queryData({
          currentPage: currentPage + 1,
          pageSize: options.pageSize
        });
      }
    });
  });
};

// Load Page
WUI.ready = function () {
  // meta的元素数据字典 => cloumn数据 => 查询数据
  queryDictionary('label');

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '标签'
    }]
  });
}
// Keep this function
$(function () {
  WUI.init({
    system: 'cmdb'
  });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjbWRiL2xhYmVsLWxpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLy8gQ29uc3RhbnRzXG52YXIgQ01EQl9BUEkgPSB7XG4gIHF1ZXJ5RGljdGlvbmFyeTogJy93ZWIvcXVlcnlEaWN0aW9uYXJ5JywgLy8g5pWw5o2u5a2X5YW4XG4gIGFkZDogJy93ZWIvYWRkTGFiZWwnLCAvLyDlop5cbiAgZGVsZXRlOiAnL3dlYi9kZWxldGVMYWJlbHMnLCAvLyDliKBcbiAgdXBkYXRlOiAnL3dlYi91cGRhdGVMYWJlbCcsIC8vIOaUuVxuICBjb2x1bW46ICcvd2ViL2xhYmVsL2NvbHVtbicsIC8vIOafpeivouadoeS7tlxuICBxdWVyeTogJy93ZWIvbGFiZWwvcXVlcnknLCAvLyDmn6VcbiAgZXhwb3J0OiAnL3dlYi9leGNlbC9kb3dubG9hZC9sYWJlbCcsIC8vIGV4cG9ydFxuICBpbXBvcnQ6ICcvd2ViL2V4Y2VsL3VwbG9hZC9sYWJlbCcgLy8gaW1wb3J0XG59O1xuTUVUQVsnY29kZSddID0geyBsYWJlbDogJ+agh+etvl9jb2RlJywgcmVxdWlyZWQ6IHRydWUsIG1heExlbmd0aDozMCB9O1xudmFyIEVESVRfRklFTERTID0gWydsYWJlbF9rZXknLCAnbGFiZWxfdmFsdWUnLCAnc3RhdHVzJywgJ2Rlc2NyaXB0aW9uJ107XG5cbnZhciBzZWxlY3RBcnkgPSBbJ3N0YXR1cyddO1xudmFyIGNyZWF0ZURhdGEgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAvLyDliJ3lp4vljJZzZWxlY3RcbiAgJC5lYWNoKHNlbGVjdEFyeSxmdW5jdGlvbihpLCBlKXtcbiAgICBmb3IodmFyIGo9MDtqPE1FVEFbZV0ub3B0aW9ucy5sZW5ndGg7aisrKXtcbiAgICAgIGlmIChNRVRBW2VdLm9wdGlvbnNbal0ubGFiZWwgPT0gaXRlbVtlXSkge1xuICAgICAgICBNRVRBW2VdLm9wdGlvbnNbal0uc2VsZWN0ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE1FVEFbZV0ub3B0aW9uc1tqXS5zZWxlY3QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIFdVSS5Nb2RhbERpYWxvZy5jcmVhdGUoe1xuICAgIGJ1dHRvbkhpZGU6IHRydWUsXG4gIH0pO1xuXG4gIFdVSS5kYXRhRGlhbG9nLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcubW9kYWwtYm9keScpLFxuICAgIGRpYWxvZ1BvcDp0cnVlLFxuICAgIG1ldGE6IE1FVEEsXG4gICAgbGlzdDogaXRlbSxcbiAgICBidXR0b25IaWRlOiBmYWxzZSxcbiAgICBvbkNvbmZpcm06IHN1Ym1pdERhdGEuYmluZChudWxsLCBpdGVtKSxcbiAgICBmaWVsZHM6IEVESVRfRklFTERTXG4gIH0pO1xufTtcbnF1ZXJ5RGF0YSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBfYmVmb3JlU2VuZCA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJwYWdlTnVtXCIsIG9wdGlvbnMuY3VycmVudFBhZ2UpO1xuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcInBhZ2VMaW1pdFwiLCBvcHRpb25zLnBhZ2VTaXplKTtcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIGdldENvb2tpZSgnQ01EQi1UT0tFTi1UWVBFJykgKycgJysgZ2V0Q29va2llKCdDTURCLVRPS0VOJykpO1xuICB9O1xuICBcbiAgV1VJLmFqYXgoe1xuICAgIHVybDogRE9NQUlOLkNNREIgKyBDTURCX0FQSS5xdWVyeSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBqc29uRGF0YTogcXVlcnlKc29uKCksXG4gICAgZGlzYWJsZVhTUzogdHJ1ZSxcbiAgICBiZWZvcmVTZW5kOiBfYmVmb3JlU2VuZFxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgV1VJLkRhdGFUYWJsZS5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcuZGF0YS10YWJsZScpLFxuICAgICAgbWV0YTogTUVUQSxcbiAgICAgIGZpZWxkczogVEFCTEVfRklFTERTLFxuICAgICAgbGlzdDogcmVzcC5saXN0LFxuICAgICAgb3BlcmF0aW9uczogW3tcbiAgICAgICAgbmFtZTogJ+e8lui+kScsXG4gICAgICAgIGNhbGxiYWNrOiBjcmVhdGVEYXRhXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICfliKDpmaQnLFxuICAgICAgICBjYWxsYmFjazogZGVsZXRlRGF0YVxuICAgICAgfV0sXG4gICAgICBncm91cHM6IFt7XG4gICAgICAgIG5hbWU6ICfmibnph4/liKDpmaQnLFxuICAgICAgICBjbGFzc05hbWU6ICdidG4gYnRuLXhzIGJ0bi1kYW5nZXInLFxuICAgICAgICBpZDogJ2J0bi1kYW5nZXInLFxuICAgICAgICBjYWxsYmFjazogZGVsZXRlRGF0YVxuICAgICAgfV1cbiAgICB9KTtcblxuICAgIFdVSS5EYXRhUGFnaW5hdG9yLmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJy5kYXRhLXBhZ2luYXRvcicpLFxuICAgICAgY3VycmVudFBhZ2U6IG9wdGlvbnMuY3VycmVudFBhZ2UgLSAxLFxuICAgICAgdG90YWw6IHJlc3AudG90YWxDb3VudCxcbiAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplLFxuICAgICAgb25Td2l0Y2hQYWdlOiBmdW5jdGlvbiAoY3VycmVudFBhZ2UpIHtcbiAgICAgICAgcXVlcnlEYXRhKHtcbiAgICAgICAgICBjdXJyZW50UGFnZTogY3VycmVudFBhZ2UgKyAxLFxuICAgICAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbi8vIExvYWQgUGFnZVxuV1VJLnJlYWR5ID0gZnVuY3Rpb24gKCkge1xuICAvLyBtZXRh55qE5YWD57Sg5pWw5o2u5a2X5YW4ID0+IGNsb3VtbuaVsOaNriA9PiDmn6Xor6LmlbDmja5cbiAgcXVlcnlEaWN0aW9uYXJ5KCdsYWJlbCcpO1xuXG4gIC8vIOmdouWMheWxkVxuICBXVUkuQ29udGVudEhlYWRlci5jcmVhdGUoe1xuICAgICRlbDogJCgnLmNvbnRlbnQtaGVhZGVyJyksXG4gICAgbWV0YTogW3tcbiAgICAgIG5hbWU6ICfmoIfnrb4nXG4gICAgfV1cbiAgfSk7XG59XG4vLyBLZWVwIHRoaXMgZnVuY3Rpb25cbiQoZnVuY3Rpb24gKCkge1xuICBXVUkuaW5pdCh7XG4gICAgc3lzdGVtOiAnY21kYidcbiAgfSk7XG59KTtcbiJdLCJmaWxlIjoiY21kYi9sYWJlbC1saXN0LmpzIn0=
