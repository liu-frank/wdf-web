'use strict';
// Constants
var CMDB_API = {
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/dictionary/ex/addOrUpdate', // 增
  delete: '/web/deleteDictionarys', // 删
  update: '/web/dictionary/ex/addOrUpdate', // 改
  column: '/web/dictionary/column', // 查询条件
  query: '/web/dictionary/query', // 查
  export: '/web/excel/download/dictionary', // export
  import: '/web/excel/upload/dictionary' // import
};
META['code'] = { label: '数据字典_code', required: true, maxLength:30 };
META['content'] = { label: '值', maxLength:30 };
META['table_name'] = { label: '大类', type: 'select', options: [] };
META['column_name'] = { label: '小类', type: 'select', options: [] };
var dictionaryJson = {};
var EDIT_FIELDS = ['code', 'table_name', 'column_name', 'content'];

var selectAry = ['table_name', 'column_name'];
var createData = function (item) {
  if(!!item.table_name){
    var _name = item.table_name;
    META['column_name'].options = [];
    $.each(dictionaryJson[_name], function(i, e){
      var _option = {
        label: e,
        value: e
      }
      META['column_name'].options.push(_option);
    });
  }else{
    var _name = META['table_name'].options[0].value;
    META['column_name'].options = [];
    $.each(dictionaryJson[_name], function(i, e){
      var _option = {
        label: e,
        value: e
      }
      META['column_name'].options.push(_option);
    });
  }
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
submitData = function(item){
  var _code = $.trim($('#html-dialog .modal-body input[name=code]').val());
  var _table = $('#html-dialog .modal-body select[name=table_name]').val();
  var _column = $('#html-dialog .modal-body select[name=column_name]').val();
  var _value = $.trim($('#html-dialog .modal-body input[name=content]').val());
  var _url = CMDB_API.add +'?table='+ _table +'&column='+ _column +'&value='+ _value +'&code='+ _code;
  if(!!item.id){
    _url = CMDB_API.update +'?table='+ _table +'&column='+ _column +'&value='+ _value +'&code='+ _code +'&id='+ item.id;
  }
  WUI.ajax({
    url: DOMAIN.CMDB + _url,
    method: 'POST'
  }).then(function (resp) {
    $('#html-dialog, .modal-backdrop').remove();
    $('body').removeClass('modal-open');
    queryData({
      currentPage: 1,
      pageSize: PAGE_SIZE
    });
  }).fail(function(resp){
    $('#html-dialog, .modal-backdrop').remove();
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
  WUI.ajax({
    url: DOMAIN.CMDB + '/web/dictionary/ex/allTables',
    method: 'POST'
  }).then(function (resp) {
    dictionaryJson = resp;
    $.each(resp, function(i){
      var _option = {
        label: i,
        value: i
      }
      META['table_name'].options.push(_option);
    });
  }).then(queryColumn);

  $(document).on('change', 'select[name=table_name]', function(){
    var _name = $(this).val();
    $('select[name=column_name]').empty();
    META['column_name'].options = [];
    var _rowHtml = [];
    $.each(dictionaryJson[_name], function(i, e){
      var _option = {
        label: e,
        value: e
      }
      META['column_name'].options.push(_option);
      _rowHtml.push('<option value="'+ e +'">'+ e +'</option>');
    });
    $('select[name=column_name]').html(_rowHtml.join(''));
  });

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '数据字典维护'
    }]
  });
}
// Keep this function
$(function () {
  WUI.init({
    system: 'cmdb'
  });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjbWRiL2RpY3Rpb25hcnktbGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4vLyBDb25zdGFudHNcbnZhciBDTURCX0FQSSA9IHtcbiAgcXVlcnlEaWN0aW9uYXJ5OiAnL3dlYi9xdWVyeURpY3Rpb25hcnknLCAvLyDmlbDmja7lrZflhbhcbiAgYWRkOiAnL3dlYi9kaWN0aW9uYXJ5L2V4L2FkZE9yVXBkYXRlJywgLy8g5aKeXG4gIGRlbGV0ZTogJy93ZWIvZGVsZXRlRGljdGlvbmFyeXMnLCAvLyDliKBcbiAgdXBkYXRlOiAnL3dlYi9kaWN0aW9uYXJ5L2V4L2FkZE9yVXBkYXRlJywgLy8g5pS5XG4gIGNvbHVtbjogJy93ZWIvZGljdGlvbmFyeS9jb2x1bW4nLCAvLyDmn6Xor6LmnaHku7ZcbiAgcXVlcnk6ICcvd2ViL2RpY3Rpb25hcnkvcXVlcnknLCAvLyDmn6VcbiAgZXhwb3J0OiAnL3dlYi9leGNlbC9kb3dubG9hZC9kaWN0aW9uYXJ5JywgLy8gZXhwb3J0XG4gIGltcG9ydDogJy93ZWIvZXhjZWwvdXBsb2FkL2RpY3Rpb25hcnknIC8vIGltcG9ydFxufTtcbk1FVEFbJ2NvZGUnXSA9IHsgbGFiZWw6ICfmlbDmja7lrZflhbhfY29kZScsIHJlcXVpcmVkOiB0cnVlLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ2NvbnRlbnQnXSA9IHsgbGFiZWw6ICflgLwnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ3RhYmxlX25hbWUnXSA9IHsgbGFiZWw6ICflpKfnsbsnLCB0eXBlOiAnc2VsZWN0Jywgb3B0aW9uczogW10gfTtcbk1FVEFbJ2NvbHVtbl9uYW1lJ10gPSB7IGxhYmVsOiAn5bCP57G7JywgdHlwZTogJ3NlbGVjdCcsIG9wdGlvbnM6IFtdIH07XG52YXIgZGljdGlvbmFyeUpzb24gPSB7fTtcbnZhciBFRElUX0ZJRUxEUyA9IFsnY29kZScsICd0YWJsZV9uYW1lJywgJ2NvbHVtbl9uYW1lJywgJ2NvbnRlbnQnXTtcblxudmFyIHNlbGVjdEFyeSA9IFsndGFibGVfbmFtZScsICdjb2x1bW5fbmFtZSddO1xudmFyIGNyZWF0ZURhdGEgPSBmdW5jdGlvbiAoaXRlbSkge1xuICBpZighIWl0ZW0udGFibGVfbmFtZSl7XG4gICAgdmFyIF9uYW1lID0gaXRlbS50YWJsZV9uYW1lO1xuICAgIE1FVEFbJ2NvbHVtbl9uYW1lJ10ub3B0aW9ucyA9IFtdO1xuICAgICQuZWFjaChkaWN0aW9uYXJ5SnNvbltfbmFtZV0sIGZ1bmN0aW9uKGksIGUpe1xuICAgICAgdmFyIF9vcHRpb24gPSB7XG4gICAgICAgIGxhYmVsOiBlLFxuICAgICAgICB2YWx1ZTogZVxuICAgICAgfVxuICAgICAgTUVUQVsnY29sdW1uX25hbWUnXS5vcHRpb25zLnB1c2goX29wdGlvbik7XG4gICAgfSk7XG4gIH1lbHNle1xuICAgIHZhciBfbmFtZSA9IE1FVEFbJ3RhYmxlX25hbWUnXS5vcHRpb25zWzBdLnZhbHVlO1xuICAgIE1FVEFbJ2NvbHVtbl9uYW1lJ10ub3B0aW9ucyA9IFtdO1xuICAgICQuZWFjaChkaWN0aW9uYXJ5SnNvbltfbmFtZV0sIGZ1bmN0aW9uKGksIGUpe1xuICAgICAgdmFyIF9vcHRpb24gPSB7XG4gICAgICAgIGxhYmVsOiBlLFxuICAgICAgICB2YWx1ZTogZVxuICAgICAgfVxuICAgICAgTUVUQVsnY29sdW1uX25hbWUnXS5vcHRpb25zLnB1c2goX29wdGlvbik7XG4gICAgfSk7XG4gIH1cbiAgLy8g5Yid5aeL5YyWc2VsZWN0XG4gICQuZWFjaChzZWxlY3RBcnksZnVuY3Rpb24oaSwgZSl7XG4gICAgZm9yKHZhciBqPTA7ajxNRVRBW2VdLm9wdGlvbnMubGVuZ3RoO2orKyl7XG4gICAgICBpZiAoTUVUQVtlXS5vcHRpb25zW2pdLmxhYmVsID09IGl0ZW1bZV0pIHtcbiAgICAgICAgTUVUQVtlXS5vcHRpb25zW2pdLnNlbGVjdCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBNRVRBW2VdLm9wdGlvbnNbal0uc2VsZWN0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBXVUkuTW9kYWxEaWFsb2cuY3JlYXRlKHtcbiAgICBidXR0b25IaWRlOiB0cnVlLFxuICB9KTtcblxuICBXVUkuZGF0YURpYWxvZy5jcmVhdGUoe1xuICAgICRlbDogJCgnLm1vZGFsLWJvZHknKSxcbiAgICBkaWFsb2dQb3A6dHJ1ZSxcbiAgICBtZXRhOiBNRVRBLFxuICAgIGxpc3Q6IGl0ZW0sXG4gICAgYnV0dG9uSGlkZTogZmFsc2UsXG4gICAgb25Db25maXJtOiBzdWJtaXREYXRhLmJpbmQobnVsbCwgaXRlbSksXG4gICAgZmllbGRzOiBFRElUX0ZJRUxEU1xuICB9KTtcbn07XG5zdWJtaXREYXRhID0gZnVuY3Rpb24oaXRlbSl7XG4gIHZhciBfY29kZSA9ICQudHJpbSgkKCcjaHRtbC1kaWFsb2cgLm1vZGFsLWJvZHkgaW5wdXRbbmFtZT1jb2RlXScpLnZhbCgpKTtcbiAgdmFyIF90YWJsZSA9ICQoJyNodG1sLWRpYWxvZyAubW9kYWwtYm9keSBzZWxlY3RbbmFtZT10YWJsZV9uYW1lXScpLnZhbCgpO1xuICB2YXIgX2NvbHVtbiA9ICQoJyNodG1sLWRpYWxvZyAubW9kYWwtYm9keSBzZWxlY3RbbmFtZT1jb2x1bW5fbmFtZV0nKS52YWwoKTtcbiAgdmFyIF92YWx1ZSA9ICQudHJpbSgkKCcjaHRtbC1kaWFsb2cgLm1vZGFsLWJvZHkgaW5wdXRbbmFtZT1jb250ZW50XScpLnZhbCgpKTtcbiAgdmFyIF91cmwgPSBDTURCX0FQSS5hZGQgKyc/dGFibGU9JysgX3RhYmxlICsnJmNvbHVtbj0nKyBfY29sdW1uICsnJnZhbHVlPScrIF92YWx1ZSArJyZjb2RlPScrIF9jb2RlO1xuICBpZighIWl0ZW0uaWQpe1xuICAgIF91cmwgPSBDTURCX0FQSS51cGRhdGUgKyc/dGFibGU9JysgX3RhYmxlICsnJmNvbHVtbj0nKyBfY29sdW1uICsnJnZhbHVlPScrIF92YWx1ZSArJyZjb2RlPScrIF9jb2RlICsnJmlkPScrIGl0ZW0uaWQ7XG4gIH1cbiAgV1VJLmFqYXgoe1xuICAgIHVybDogRE9NQUlOLkNNREIgKyBfdXJsLFxuICAgIG1ldGhvZDogJ1BPU1QnXG4gIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICAkKCcjaHRtbC1kaWFsb2csIC5tb2RhbC1iYWNrZHJvcCcpLnJlbW92ZSgpO1xuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpO1xuICAgIHF1ZXJ5RGF0YSh7XG4gICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgIHBhZ2VTaXplOiBQQUdFX1NJWkVcbiAgICB9KTtcbiAgfSkuZmFpbChmdW5jdGlvbihyZXNwKXtcbiAgICAkKCcjaHRtbC1kaWFsb2csIC5tb2RhbC1iYWNrZHJvcCcpLnJlbW92ZSgpO1xuICB9KTtcbn07XG5xdWVyeURhdGEgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgX2JlZm9yZVNlbmQgPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwicGFnZU51bVwiLCBvcHRpb25zLmN1cnJlbnRQYWdlKTtcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJwYWdlTGltaXRcIiwgb3B0aW9ucy5wYWdlU2l6ZSk7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBnZXRDb29raWUoJ0NNREItVE9LRU4tVFlQRScpICsnICcrIGdldENvb2tpZSgnQ01EQi1UT0tFTicpKTtcbiAgfTtcbiAgXG4gIFdVSS5hamF4KHtcbiAgICB1cmw6IERPTUFJTi5DTURCICsgQ01EQl9BUEkucXVlcnksXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAganNvbkRhdGE6IHF1ZXJ5SnNvbigpLFxuICAgIGRpc2FibGVYU1M6IHRydWUsXG4gICAgYmVmb3JlU2VuZDogX2JlZm9yZVNlbmRcbiAgfSkudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgIFdVSS5EYXRhVGFibGUuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLmRhdGEtdGFibGUnKSxcbiAgICAgIG1ldGE6IE1FVEEsXG4gICAgICBmaWVsZHM6IFRBQkxFX0ZJRUxEUyxcbiAgICAgIGxpc3Q6IHJlc3AubGlzdCxcbiAgICAgIG9wZXJhdGlvbnM6IFt7XG4gICAgICAgIG5hbWU6ICfnvJbovpEnLFxuICAgICAgICBjYWxsYmFjazogY3JlYXRlRGF0YVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiAn5Yig6ZmkJyxcbiAgICAgICAgY2FsbGJhY2s6IGRlbGV0ZURhdGFcbiAgICAgIH1dLFxuICAgICAgZ3JvdXBzOiBbe1xuICAgICAgICBuYW1lOiAn5om56YeP5Yig6ZmkJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnYnRuIGJ0bi14cyBidG4tZGFuZ2VyJyxcbiAgICAgICAgaWQ6ICdidG4tZGFuZ2VyJyxcbiAgICAgICAgY2FsbGJhY2s6IGRlbGV0ZURhdGFcbiAgICAgIH1dXG4gICAgfSk7XG5cbiAgICBXVUkuRGF0YVBhZ2luYXRvci5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcuZGF0YS1wYWdpbmF0b3InKSxcbiAgICAgIGN1cnJlbnRQYWdlOiBvcHRpb25zLmN1cnJlbnRQYWdlIC0gMSxcbiAgICAgIHRvdGFsOiByZXNwLnRvdGFsQ291bnQsXG4gICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZSxcbiAgICAgIG9uU3dpdGNoUGFnZTogZnVuY3Rpb24gKGN1cnJlbnRQYWdlKSB7XG4gICAgICAgIHF1ZXJ5RGF0YSh7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IGN1cnJlbnRQYWdlICsgMSxcbiAgICAgICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vLyBMb2FkIFBhZ2VcbldVSS5yZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gbWV0YeeahOWFg+e0oOaVsOaNruWtl+WFuCA9PiBjbG91bW7mlbDmja4gPT4g5p+l6K+i5pWw5o2uXG4gIFdVSS5hamF4KHtcbiAgICB1cmw6IERPTUFJTi5DTURCICsgJy93ZWIvZGljdGlvbmFyeS9leC9hbGxUYWJsZXMnLFxuICAgIG1ldGhvZDogJ1BPU1QnXG4gIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICBkaWN0aW9uYXJ5SnNvbiA9IHJlc3A7XG4gICAgJC5lYWNoKHJlc3AsIGZ1bmN0aW9uKGkpe1xuICAgICAgdmFyIF9vcHRpb24gPSB7XG4gICAgICAgIGxhYmVsOiBpLFxuICAgICAgICB2YWx1ZTogaVxuICAgICAgfVxuICAgICAgTUVUQVsndGFibGVfbmFtZSddLm9wdGlvbnMucHVzaChfb3B0aW9uKTtcbiAgICB9KTtcbiAgfSkudGhlbihxdWVyeUNvbHVtbik7XG5cbiAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICdzZWxlY3RbbmFtZT10YWJsZV9uYW1lXScsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIF9uYW1lID0gJCh0aGlzKS52YWwoKTtcbiAgICAkKCdzZWxlY3RbbmFtZT1jb2x1bW5fbmFtZV0nKS5lbXB0eSgpO1xuICAgIE1FVEFbJ2NvbHVtbl9uYW1lJ10ub3B0aW9ucyA9IFtdO1xuICAgIHZhciBfcm93SHRtbCA9IFtdO1xuICAgICQuZWFjaChkaWN0aW9uYXJ5SnNvbltfbmFtZV0sIGZ1bmN0aW9uKGksIGUpe1xuICAgICAgdmFyIF9vcHRpb24gPSB7XG4gICAgICAgIGxhYmVsOiBlLFxuICAgICAgICB2YWx1ZTogZVxuICAgICAgfVxuICAgICAgTUVUQVsnY29sdW1uX25hbWUnXS5vcHRpb25zLnB1c2goX29wdGlvbik7XG4gICAgICBfcm93SHRtbC5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJysgZSArJ1wiPicrIGUgKyc8L29wdGlvbj4nKTtcbiAgICB9KTtcbiAgICAkKCdzZWxlY3RbbmFtZT1jb2x1bW5fbmFtZV0nKS5odG1sKF9yb3dIdG1sLmpvaW4oJycpKTtcbiAgfSk7XG5cbiAgLy8g6Z2i5YyF5bGRXG4gIFdVSS5Db250ZW50SGVhZGVyLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcuY29udGVudC1oZWFkZXInKSxcbiAgICBtZXRhOiBbe1xuICAgICAgbmFtZTogJ+aVsOaNruWtl+WFuOe7tOaKpCdcbiAgICB9XVxuICB9KTtcbn1cbi8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdjbWRiJ1xuICB9KTtcbn0pO1xuIl0sImZpbGUiOiJjbWRiL2RpY3Rpb25hcnktbGlzdC5qcyJ9
