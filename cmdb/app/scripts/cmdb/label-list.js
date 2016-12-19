'use strict';
// Constants
var CMDB_API = {
  table: 'label', // 表名
  showCloumn: '/web/people/updatePeopleShowColumn', // 个人展示列
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addLabel', // 增
  delete: '/web/deleteLabels', // 删
  update: '/web/updateLabel', // 改
  column: '/web/label/column', // 查询条件
  query: '/web/label/query', // 查
  export: '/web/excel/download/label', // export
  import: '/web/excel/upload/label' // import
};
META['code'] = { label: '标签_code', required: true, maxLength: 200 };
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
  queryDictionary('label');

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '首页',
      url: '/cmdb/home.html'
    } , {
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
