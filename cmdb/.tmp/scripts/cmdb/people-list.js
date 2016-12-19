'use strict';
// Constants
var CMDB_API = {
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addPeople', // 增
  delete: '/web/deletePeoples', // 删
  update: '/web/updatePeople', // 改
  column: '/web/people/column', // 查询条件
  query: '/web/people/query', // 查
  export: '/web/excel/download/people', // export
  import: '/web/excel/upload/people' // import
};
META['code'] = { label: '用户名', required: true, maxLength:30 };
META['name'] = { label: '姓名', maxLength:30 };
META['phone'] = { label: '电话', maxLength:30 };
META['mail'] = { label: '邮箱', maxLength:30 };
META['type'] = { label: '类型', type: 'select', options: [] };
META['password'] = { label: '密码', maxLength:30 };
META['password2'] = { label: '确认密码', maxLength:30 };
var EDIT_FIELDS = ['code', 'name', 'phone', 'mail', 'password', 'password2', 'status', 'type', 'description'];
SEARCH_TOOLS = [];

var selectAry = ['status', 'type'];
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
  queryDictionary('people');

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '人员'
    }]
  });
}
// Keep this function
$(function () {
  WUI.init({
    system: 'cmdb'
  });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjbWRiL3Blb3BsZS1saXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8vIENvbnN0YW50c1xudmFyIENNREJfQVBJID0ge1xuICBxdWVyeURpY3Rpb25hcnk6ICcvd2ViL3F1ZXJ5RGljdGlvbmFyeScsIC8vIOaVsOaNruWtl+WFuFxuICBhZGQ6ICcvd2ViL2FkZFBlb3BsZScsIC8vIOWinlxuICBkZWxldGU6ICcvd2ViL2RlbGV0ZVBlb3BsZXMnLCAvLyDliKBcbiAgdXBkYXRlOiAnL3dlYi91cGRhdGVQZW9wbGUnLCAvLyDmlLlcbiAgY29sdW1uOiAnL3dlYi9wZW9wbGUvY29sdW1uJywgLy8g5p+l6K+i5p2h5Lu2XG4gIHF1ZXJ5OiAnL3dlYi9wZW9wbGUvcXVlcnknLCAvLyDmn6VcbiAgZXhwb3J0OiAnL3dlYi9leGNlbC9kb3dubG9hZC9wZW9wbGUnLCAvLyBleHBvcnRcbiAgaW1wb3J0OiAnL3dlYi9leGNlbC91cGxvYWQvcGVvcGxlJyAvLyBpbXBvcnRcbn07XG5NRVRBWydjb2RlJ10gPSB7IGxhYmVsOiAn55So5oi35ZCNJywgcmVxdWlyZWQ6IHRydWUsIG1heExlbmd0aDozMCB9O1xuTUVUQVsnbmFtZSddID0geyBsYWJlbDogJ+Wnk+WQjScsIG1heExlbmd0aDozMCB9O1xuTUVUQVsncGhvbmUnXSA9IHsgbGFiZWw6ICfnlLXor50nLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ21haWwnXSA9IHsgbGFiZWw6ICfpgq7nrrEnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ3R5cGUnXSA9IHsgbGFiZWw6ICfnsbvlnosnLCB0eXBlOiAnc2VsZWN0Jywgb3B0aW9uczogW10gfTtcbk1FVEFbJ3Bhc3N3b3JkJ10gPSB7IGxhYmVsOiAn5a+G56CBJywgbWF4TGVuZ3RoOjMwIH07XG5NRVRBWydwYXNzd29yZDInXSA9IHsgbGFiZWw6ICfnoa7orqTlr4bnoIEnLCBtYXhMZW5ndGg6MzAgfTtcbnZhciBFRElUX0ZJRUxEUyA9IFsnY29kZScsICduYW1lJywgJ3Bob25lJywgJ21haWwnLCAncGFzc3dvcmQnLCAncGFzc3dvcmQyJywgJ3N0YXR1cycsICd0eXBlJywgJ2Rlc2NyaXB0aW9uJ107XG5TRUFSQ0hfVE9PTFMgPSBbXTtcblxudmFyIHNlbGVjdEFyeSA9IFsnc3RhdHVzJywgJ3R5cGUnXTtcbnZhciBjcmVhdGVEYXRhID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgLy8g5Yid5aeL5YyWc2VsZWN0XG4gICQuZWFjaChzZWxlY3RBcnksZnVuY3Rpb24oaSwgZSl7XG4gICAgZm9yKHZhciBqPTA7ajxNRVRBW2VdLm9wdGlvbnMubGVuZ3RoO2orKyl7XG4gICAgICBpZiAoTUVUQVtlXS5vcHRpb25zW2pdLmxhYmVsID09IGl0ZW1bZV0pIHtcbiAgICAgICAgTUVUQVtlXS5vcHRpb25zW2pdLnNlbGVjdCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBNRVRBW2VdLm9wdGlvbnNbal0uc2VsZWN0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBXVUkuTW9kYWxEaWFsb2cuY3JlYXRlKHtcbiAgICBidXR0b25IaWRlOiB0cnVlLFxuICB9KTtcblxuICBXVUkuZGF0YURpYWxvZy5jcmVhdGUoe1xuICAgICRlbDogJCgnLm1vZGFsLWJvZHknKSxcbiAgICBkaWFsb2dQb3A6dHJ1ZSxcbiAgICBtZXRhOiBNRVRBLFxuICAgIGxpc3Q6IGl0ZW0sXG4gICAgYnV0dG9uSGlkZTogZmFsc2UsXG4gICAgb25Db25maXJtOiBzdWJtaXREYXRhLmJpbmQobnVsbCwgaXRlbSksXG4gICAgZmllbGRzOiBFRElUX0ZJRUxEU1xuICB9KTtcbn07XG5xdWVyeURhdGEgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgX2JlZm9yZVNlbmQgPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwicGFnZU51bVwiLCBvcHRpb25zLmN1cnJlbnRQYWdlKTtcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJwYWdlTGltaXRcIiwgb3B0aW9ucy5wYWdlU2l6ZSk7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBnZXRDb29raWUoJ0NNREItVE9LRU4tVFlQRScpICsnICcrIGdldENvb2tpZSgnQ01EQi1UT0tFTicpKTtcbiAgfTtcbiAgXG4gIFdVSS5hamF4KHtcbiAgICB1cmw6IERPTUFJTi5DTURCICsgQ01EQl9BUEkucXVlcnksXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAganNvbkRhdGE6IHF1ZXJ5SnNvbigpLFxuICAgIGRpc2FibGVYU1M6IHRydWUsXG4gICAgYmVmb3JlU2VuZDogX2JlZm9yZVNlbmRcbiAgfSkudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgIFdVSS5EYXRhVGFibGUuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLmRhdGEtdGFibGUnKSxcbiAgICAgIG1ldGE6IE1FVEEsXG4gICAgICBmaWVsZHM6IFRBQkxFX0ZJRUxEUyxcbiAgICAgIGxpc3Q6IHJlc3AubGlzdCxcbiAgICAgIG9wZXJhdGlvbnM6IFt7XG4gICAgICAgIG5hbWU6ICfnvJbovpEnLFxuICAgICAgICBjYWxsYmFjazogY3JlYXRlRGF0YVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiAn5Yig6ZmkJyxcbiAgICAgICAgY2FsbGJhY2s6IGRlbGV0ZURhdGFcbiAgICAgIH1dLFxuICAgICAgZ3JvdXBzOiBbe1xuICAgICAgICBuYW1lOiAn5om56YeP5Yig6ZmkJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnYnRuIGJ0bi14cyBidG4tZGFuZ2VyJyxcbiAgICAgICAgaWQ6ICdidG4tZGFuZ2VyJyxcbiAgICAgICAgY2FsbGJhY2s6IGRlbGV0ZURhdGFcbiAgICAgIH1dXG4gICAgfSk7XG5cbiAgICBXVUkuRGF0YVBhZ2luYXRvci5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcuZGF0YS1wYWdpbmF0b3InKSxcbiAgICAgIGN1cnJlbnRQYWdlOiBvcHRpb25zLmN1cnJlbnRQYWdlIC0gMSxcbiAgICAgIHRvdGFsOiByZXNwLnRvdGFsQ291bnQsXG4gICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZSxcbiAgICAgIG9uU3dpdGNoUGFnZTogZnVuY3Rpb24gKGN1cnJlbnRQYWdlKSB7XG4gICAgICAgIHF1ZXJ5RGF0YSh7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IGN1cnJlbnRQYWdlICsgMSxcbiAgICAgICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vLyBMb2FkIFBhZ2VcbldVSS5yZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gbWV0YeeahOWFg+e0oOaVsOaNruWtl+WFuCA9PiBjbG91bW7mlbDmja4gPT4g5p+l6K+i5pWw5o2uXG4gIHF1ZXJ5RGljdGlvbmFyeSgncGVvcGxlJyk7XG5cbiAgLy8g6Z2i5YyF5bGRXG4gIFdVSS5Db250ZW50SGVhZGVyLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcuY29udGVudC1oZWFkZXInKSxcbiAgICBtZXRhOiBbe1xuICAgICAgbmFtZTogJ+S6uuWRmCdcbiAgICB9XVxuICB9KTtcbn1cbi8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdjbWRiJ1xuICB9KTtcbn0pO1xuIl0sImZpbGUiOiJjbWRiL3Blb3BsZS1saXN0LmpzIn0=
