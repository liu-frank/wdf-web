'use strict';
// Constants
var CMDB_API = {
  table: 'people', // 表名
  showCloumn: '/web/people/updatePeopleShowColumn', // 个人展示列
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addPeople', // 增
  delete: '/web/deletePeoples', // 删
  update: '/web/updatePeople', // 改
  column: '/web/people/column', // 查询条件
  query: '/web/people/query', // 查
  export: '/web/excel/download/people', // export
  import: '/web/excel/upload/people' // import
};
META['code'] = { label: '用户名', required: true, maxLength: 200 };
META['name'] = { label: '姓名', maxLength: 200 };
META['phone'] = { label: '电话', maxLength: 200 };
META['mail'] = { label: '邮箱',type: 'email', maxLength: 200 };
META['type'] = { label: '类型', type: 'select', options: [] };
META['password'] = { label: '密码', required: true, maxLength: 200 };
META['password2'] = { label: '确认密码', required: true, maxLength: 200 };
var EDIT_FIELDS = ['code', 'name', 'phone', 'mail', 'password', 'password2', 'status', 'type', 'description'];

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

  if (!!item.code) {
    var _password = $('.modal-body input[name=password]').val();
    $('.modal-body input[name=password2]').val(_password);
  }
};
submitData = function(item){
  var _submitData = submitDataJson();
  if(_submitData['password'] != _submitData['password2']){
    $('#password2help').text('两次密码不相同，请确认...').show();

    return false;
  }else{
    delete _submitData['password2'];
  }

  var _url = CMDB_API.add;
  if(!!item.id){
    _url = CMDB_API.update;
    _submitData.id = item.id;
  }

  WUI.ajax({
    url: DOMAIN.CMDB + _url,
    method: 'POST',
    jsonData: _submitData
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
  queryDictionary('people');

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '首页',
      url: '/cmdb/home.html'
    } , {
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
