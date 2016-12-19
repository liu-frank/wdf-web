'use strict';
// Constants
var CMDB_API = {
  table: 'dictionary', // 表名
  showCloumn: '/web/people/updatePeopleShowColumn', // 个人展示列
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/dictionary/ex/addOrUpdate', // 增
  delete: '/web/deleteDictionarys', // 删
  update: '/web/dictionary/ex/addOrUpdate', // 改
  column: '/web/dictionary/column', // 查询条件
  query: '/web/dictionary/query', // 查
  export: '/web/excel/download/dictionary', // export
  import: '/web/excel/upload/dictionary' // import
};
META['code'] = { label: '数据字典_code', required: true, maxLength: 200 };
META['content'] = { label: '值', maxLength: 200 };
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
    if(resp.errorCode != '500'){
      $('#myModal').modal('hide');
      queryData({
        currentPage: 1,
        pageSize: PAGE_SIZE
      });
    }
  }).fail(function(resp){
    $('#myModal').modal('hide');
  });
};
queryData = function (options, sort, column) {
  if (sort && column) {
    var _beforeSend = function(request) {
      request.setRequestHeader("pageNum", options.currentPage);
      request.setRequestHeader("pageLimit", options.pageSize);
      request.setRequestHeader("Authorization", getCookie('CMDB-TOKEN-TYPE') +' '+ getCookie('CMDB-TOKEN'));
      request.setRequestHeader("sortType", sort);
      request.setRequestHeader("sortColumn", column);
    };
  } else {
    var _beforeSend = function(request) {
      request.setRequestHeader("pageNum", options.currentPage);
      request.setRequestHeader("pageLimit", options.pageSize);
      request.setRequestHeader("Authorization", getCookie('CMDB-TOKEN-TYPE') +' '+ getCookie('CMDB-TOKEN'));
    };
  }
  
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
      }],
      cmdbSort: true,
      cmdbSortFun: queryDataSort
    });

    if (sort && column) {
      var _dom = $('.content-wrapper .data-table thead th');
      $.each(_dom, function(i, e){
        if ($(this).attr('data-column') == column) {
          $(this).addClass('cmdb-sort-'+ sort );
          $(this).append('<span></span>');

          return true;
        }
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
          }, sort, column);
        }
      });

    } else {

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
    }
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
      name: '首页',
      url: '/cmdb/home.html'
    } , {
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
