'use strict';
// Constants
var CMDB_API = {
  table: 'notifylabel', // 表名
  showCloumn: '/web/people/updatePeopleShowColumn', // 个人展示列
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/notify/adds', // 增
  delete: '/web/deleteNotifylabels', // 删
  // update: '/web/updateNotifylabel', // 改
  column: '/web/notifylabel/column', // 查询条件
  query: '/web/notifylabel/query', // 查
  export: '/web/excel/download/notifylabel', // export
  import: '/web/excel/upload/notifylabel' // import
};
META['code'] = { label: 'Code', required: true, maxLength: 200 };
META['name'] = { label: '标签通知名', maxLength: 200 };
META['notify'] = { label: '通知方式', maxLength: 200 };
META['label_key'] = { label: '标签key', maxLength: 200 };
META['label_value'] = { label: '标签值', maxLength: 200 };
META['people_name'] = { label: '负责人', maxLength: 200 };
var EDIT_FIELDS = ['code', 'name', 'description'];

var relationConfig1 = [];
var relationConfig2 = [];
var ori_code = '';
var createData = function (item) {
  ori_code = '';
  var isEdit = false;
  var init = function(){
    if (!!item.code) {
      isEdit = true;
    } else {
      isEdit = false;
    }

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

    var _rowHtmlNotify = [];
    _rowHtmlNotify.push('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 form-group notify-extend">');
    _rowHtmlNotify.push('  <div class="col-sm-3 form-group" style="padding:7px 0; margin-bottom:0;">');
    _rowHtmlNotify.push('    <span>通知</span>');
    _rowHtmlNotify.push('  </div>');
    _rowHtmlNotify.push('  <div class="col-sm-9 form-group" style="margin-bottom:0;">');
    _rowHtmlNotify.push('    <label><input type="checkbox" name="notify">邮件</label>');
    _rowHtmlNotify.push('    <label><input type="checkbox" name="notify">短信</label>');
    _rowHtmlNotify.push('    <label><input type="checkbox" name="notify">电话</label>');
    _rowHtmlNotify.push('  </div>');
    _rowHtmlNotify.push('</div>');
    $('.modal-body .row').append(_rowHtmlNotify.join(''));

    relationConfig1 = [];
    relationConfig2 = [];
    var _rowHtml = [];
    _rowHtml.push('<div class="row row-no relation-extend">');
    _rowHtml.push('  <div class="col-sm-4 col-xs-12 relation-from">');
    _rowHtml.push('    <div class="relation-pop">');
    _rowHtml.push('      <h4>From:</h4>');
    _rowHtml.push('      <div class="data-search data-search-config1"></div>');
    _rowHtml.push('      <div class="data-table"></div>');
    _rowHtml.push('      <div class="data-paginator"></div>');
    _rowHtml.push('    </div>');
    _rowHtml.push('  </div>');
    _rowHtml.push('  <div class="col-sm-2 col-xs-12 relation-result relation-result-from">');
    _rowHtml.push('    <div class="relation-pop">');
    _rowHtml.push('      <h4>已选择</h4>');
    _rowHtml.push('    </div>');
    _rowHtml.push('  </div>');
    _rowHtml.push('  <div class="col-sm-4 col-xs-12 relation-to">');
    _rowHtml.push('    <div class="relation-pop">');
    _rowHtml.push('      <h4>To:</h4>');
    _rowHtml.push('      <div class="data-search data-search-config2"></div>');
    _rowHtml.push('      <div class="data-table"></div>');
    _rowHtml.push('      <div class="data-paginator"></div>');
    _rowHtml.push('    </div>');
    _rowHtml.push('  </div>');
    _rowHtml.push('  <div class="col-sm-2 col-xs-12 relation-result relation-result-to">');
    _rowHtml.push('    <div class="relation-pop">');
    _rowHtml.push('      <h4>已选择</h4>');
    _rowHtml.push('      <ul style="display: block;"></ul>');
    _rowHtml.push('    </div>');
    _rowHtml.push('  </div>');
    _rowHtml.push('</div>');
    $('.modal-body .row').after(_rowHtml.join(''));
    $('.modal-body .relation-result').on('click', 'p', function(){
      var _this = $(this);
      if(_this.hasClass('active')){
        _this.removeClass('active');
      }else{
        _this.addClass('active');
      }
    });

    if (!isEdit) {
      createDataLabel();
      createDataPeople();
    } else {
      var _notify = item.notify.split(',');
      var _notifyDom = $('.notify-extend input[name=notify]');
      $.each(_notifyDom, function(i, e){
        $.each(_notify, function(j, f){
          if (_notifyDom.eq(i).parent().text() == f) {
            _notifyDom.eq(i).prop('checked', true);

            return false;
          }
        });
      });

      var _dataJson = {data: [{paths: ["notifylabel"], tableName: "notifylabel", columnName: "code", values: []}]};
      _dataJson['data'][0]['values'].push(item.code);
      WUI.ajax({
        url: DOMAIN.CMDB + CMDB_API.query,
        method: 'POST',
        jsonData: _dataJson,
        disableXSS: true,
      }).then(function (resp) {
        $.each(resp.list, function(i, e){
          var _dataFrom = {};
          var _dataTo = {};

          _dataFrom['label_id'] = e.label_id;
          _dataFrom['label_key'] = e.label_key;
          _dataFrom['label_value'] = e.label_value;
          _dataTo['people_id'] = e.people_id;
          _dataTo['people_name'] = e.people_name;

          var _hasThisLabel = false;
          $.each(relationConfig1, function(j, f){
            if (f['label_id'] == _dataFrom['label_id']) {
              _hasThisLabel = true;

              return false;
            }
          });
          if (!_hasThisLabel) {
            relationConfig1.push(_dataFrom);
          }
          var _hasThisPeople = false;
          $.each(relationConfig2, function(j, f){
            if (f['people_id'] == _dataTo['people_id']) {
              _hasThisPeople = true;

              return false;
            }
          });
          if (!_hasThisPeople) {
            relationConfig2.push(_dataTo);
          }
        });

        QueryDataConfig1Html(relationConfig1);
        QueryDataConfig2Html(relationConfig2);
      }).then(function(){
        createDataLabel();
        createDataPeople();
      });
    }
  };

  var createDataLabel = function(){
    WUI.ajax({
      url: DOMAIN.CMDB + '/web/label/column',
      method: 'POST',
    }).then(function (resp) {
      var _resp = resp;
      $.each(_resp.data, function(i, e){
        if (i > 1 && e.columnName != 'description') {
          e.stick = false;
        }
      });
      WUI.DataSearch.create({
        $el: $('.data-search.data-search-config1'),
        meta: _resp,
        queryButton: '查询',
        onFilter: function (params) {
          QueryDataConfig1($.extend(params, {
            currentPage: 1,
            pageSize: PAGE_SIZE_LABEL
          }));
        }
      });

      QueryDataConfig1({
        currentPage: 1,
        pageSize: PAGE_SIZE_LABEL
      });
    });
  };
  var createDataPeople = function(){
    WUI.ajax({
      url: DOMAIN.CMDB + '/web/people/column',
      method: 'POST',
    }).then(function (resp) {
      var _resp = resp;
      $.each(_resp.data, function(i, e){
        if (i > 1 && e.columnName != 'description') {
          e.stick = false;
        }
      });
      WUI.DataSearch.create({
        $el: $('.data-search.data-search-config2'),
        meta: _resp,
        queryButton: '查询',
        onFilter: function (params) {
          QueryDataConfig2($.extend(params, {
            currentPage: 1,
            pageSize: PAGE_SIZE_LABEL
          }));
        }
      });

      QueryDataConfig2({
        currentPage: 1,
        pageSize: PAGE_SIZE_LABEL
      });
    });    
  };

  init();
};
submitData = function(item){
  var isEdit = false;
  if (!!item.code) {
    isEdit = true;
  } else {
    isEdit = false;
  }

  var _submitData = submitDataJson();
  delete _submitData['notify'];

  var _notify = $('.notify-extend input[name=notify]');
  var notifyAry = [];
  $.each(_notify, function(i, e){
    var _this = $(this);
    if(_this.is(':checked')){
      notifyAry.push(_this.parent().text());
    }
  });
  if (notifyAry.length > 0) {
    _submitData['notify'] = notifyAry.join(',');
  }

  // 配置项From
  if (relationConfig1.length > 0) {
    _submitData['labelList'] = relationConfig1;
  } else {
    WUI.alert.create({
      message: '请至少选择一个From的配置项',
      fail: true
    });

    return false;
  }
  // 配置项To
  if (relationConfig2.length > 0) {
    _submitData['peopleList'] = relationConfig2;
  } else {
    WUI.alert.create({
      message: '请至少选择一个To的配置项',
      fail: true
    });

    return false;
  }

  if(!isEdit){
    
  }else{
    _submitData['ori_code'] = item.code;
  }

  WUI.ajax({
    url: DOMAIN.CMDB + CMDB_API.add,
    method: 'POST',
    disableXSS: true,
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
        name: '标签',
        className: 'btn btn-xs btn-success',
        id: 'btn-success',
        callback: labelData
      }, {
        name: '下载',
        className: 'btn btn-xs btn-warning',
        id: 'btn-warning',
        callback: downloadData
      }, {
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
var QueryDataConfig1 = function (options) {
  var _beforeSend = function(request) {
    request.setRequestHeader("pageNum", options.currentPage);
    request.setRequestHeader("pageLimit", options.pageSize);
    request.setRequestHeader("Authorization", getCookie('CMDB-TOKEN-TYPE') +' '+ getCookie('CMDB-TOKEN'));
  };

  WUI.ajax({
    url: DOMAIN.CMDB + '/web/label/query',
    method: 'POST',
    jsonData: queryJson(false, 'data-search-config1'),
    disableXSS: true,
    beforeSend: _beforeSend
  }).then(function (resp) {
    var _rowHtml = [];
    _rowHtml.push('<table class="table table-bordered table-hover text-center table-responsive table-striped" style="width:100%;">');
    _rowHtml.push('<thead><tr><th>选择</th><th>标签key</th><th>标签值</th></tr></thead>');
    _rowHtml.push('<tbody>');
    $.each(resp.list, function(i, e){
      _rowHtml.push('<tr>');
      _rowHtml.push('<td><input type="checkbox" data-id="'+ e.id +'"></td>');
      _rowHtml.push('<td>'+ e.label_key +'</td>');
      _rowHtml.push('<td>'+ e.label_value +'</td>');
      _rowHtml.push('</tr>');
    });
    _rowHtml.push('</tbody>');
    _rowHtml.push('</table>');
    $('.relation-from .data-table').html(_rowHtml.join(''));
    $.each($('.relation-from .data-table tbody tr'), function(i, e){
      var _this = $(this);
      var _id = _this.find('input').attr('data-id');
      var _name = _this.find('td').eq(1).text();
      var _code = _this.find('td').eq(2).text();
      $.each(relationConfig1, function(j, f){
        if (_id == f['label_id'] && _name == f['label_key'] && _code == f['label_value']) {
          _this.find('input').prop('checked', true);

          return true;
        }
      });
    });
    $('.relation-from .data-table input[type=checkbox]').click(function(){
      var _this = $(this);
      var _thisJson = {};
      _thisJson['label_id'] = _this.attr('data-id');
      _thisJson['label_key'] = _this.parent().parent().find('td').eq(1).text();
      _thisJson['label_value'] = _this.parent().parent().find('td').eq(2).text();
      if (_this.is(':checked')) {
        relationConfig1.push(_thisJson);
      } else {
        $.each(relationConfig1, function(i, e){
          if (e['label_id'] == _thisJson['label_id'] && e['label_key'] == _thisJson['label_key'] && e['label_value'] == _thisJson['label_value']) {
            relationConfig1.splice(i, 1);

            return false;
          }
        });
      }
      QueryDataConfig1Html(relationConfig1);
    });

    WUI.DataPaginatorCmdb.create({
      $el: $('.relation-from .data-paginator'),
      currentPage: options.currentPage - 1,
      total: resp.totalCount,
      pageSize: options.pageSize,
      onSwitchPage: function (currentPage) {
        QueryDataConfig1({
          currentPage: currentPage + 1,
          pageSize: options.pageSize
        });
      }
    });
  });
};
var QueryDataConfig1Html = function (data) {
  $('.relation-result-from .relation-pop').html('<h4>已选择</h4>');
  $.each(data, function(i, e){
    var _hasThisP = false;
    $.each($('.relation-result-from .relation-pop p'), function(j, f){
      if ($(this).text() == e['label_key']) {
        _hasThisP = true;
        $('.relation-result-from .relation-pop ul').eq(j).append('<li>'+ e['label_value'] +'</li>');
        $('.relation-result-from .relation-pop p').eq(j).addClass('active');

        return true;
      }
    });
    if (!_hasThisP) {
      $('.relation-result-from .relation-pop').append('<p class="active"><span></span>'+ e['label_key'] +'</p>');
      $('.relation-result-from .relation-pop').append('<ul><li>'+ e['label_value'] +'</li></ul>');
    }
  });
};
var QueryDataConfig2 = function (options) {
  var _beforeSend = function(request) {
    request.setRequestHeader("pageNum", options.currentPage);
    request.setRequestHeader("pageLimit", options.pageSize);
    request.setRequestHeader("Authorization", getCookie('CMDB-TOKEN-TYPE') +' '+ getCookie('CMDB-TOKEN'));
  };
  WUI.ajax({
    url: DOMAIN.CMDB + '/web/people/query',
    method: 'POST',
    jsonData: queryJson(false, 'data-search-config2'),
    disableXSS: true,
    beforeSend: _beforeSend
  }).then(function (resp) {
    var _rowHtml = [];
    _rowHtml.push('<table class="table table-bordered table-hover text-center table-responsive table-striped" style="width:100%;">');
    _rowHtml.push('<thead><tr><th>选择</th><th>用户名</th><th>姓名</th></tr></thead>');
    _rowHtml.push('<tbody>');
    $.each(resp.list, function(i, e){
      _rowHtml.push('<tr>');
      _rowHtml.push('<td><input type="checkbox" data-id="'+ e.id +'"></td>');
      _rowHtml.push('<td>'+ e.code +'</td>');
      _rowHtml.push('<td>'+ e.name +'</td>');
      _rowHtml.push('</tr>');
    });
    _rowHtml.push('</tbody>');
    _rowHtml.push('</table>');
    $('.relation-to .data-table').html(_rowHtml.join(''));
    $.each($('.relation-to .data-table tbody tr'), function(i, e){
      var _this = $(this);
      var _id = _this.find('input').attr('data-id');
      var _name = _this.find('td').eq(2).text();
      $.each(relationConfig2, function(j, f){
        if (_id == f['people_id'] && _name == f['people_name']) {
          _this.find('input').prop('checked', true);

          return true;
        }
      });
    });
    $('.relation-to .data-table input[type=checkbox]').click(function(){
      var _this = $(this);
      var _id = _this.attr('data-id');
      var _name = _this.parent().next().next().text();
      var _data = {
        "people_id": _id,
        "people_name": _name
      };
      if (_this.is(':checked')) {
        relationConfig2.push(_data);
      } else {
        $.each(relationConfig2, function(i, e){
          if (e.people_name == _name) {
            relationConfig2.splice(i, 1);

            return false;
          }
        });
      }
      QueryDataConfig2Html(relationConfig2);
    });

    WUI.DataPaginatorCmdb.create({
      $el: $('.relation-to .data-paginator'),
      currentPage: options.currentPage - 1,
      total: resp.totalCount,
      pageSize: options.pageSize,
      onSwitchPage: function (currentPage) {
        QueryDataConfig2({
          currentPage: currentPage + 1,
          pageSize: options.pageSize
        });
      }
    });
  });
};
var QueryDataConfig2Html = function (data) {
  $('.relation-result-to .relation-pop').html('<h4>已选择</h4><ul style="display: block;"></ul>');
  $.each(data, function(i, e){
    $('.relation-result-to .relation-pop ul').append('<li>'+ e['people_name'] +'</li>');
  });
};

// Load Page
WUI.ready = function () {
  // meta的元素数据字典 => cloumn数据 => 查询数据
  queryDictionary('notifylabel');

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '首页',
      url: '/cmdb/home.html'
    } , {
      name: '标签通知'
    }]
  });
}
// Keep this function
$(function () {
  WUI.init({
    system: 'cmdb'
  });
});
