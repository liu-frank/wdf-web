'use strict';
// Constants
var CMDB_API = {
  table: 'relation', // 表名
  showCloumn: '/web/people/updatePeopleShowColumn', // 个人展示列
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addRelationsCompact', // 增
  delete: '/web/deleteRelations', // 删
  update: '/web/updateRelationsCompact', // 改
  column: '/web/relation/column', // 查询条件
  query: '/web/relation/query', // 查
  export: '/web/excel/download/relation', // export
  import: '/web/excel/upload/relation' // import
};
META['code'] = { label: 'Code', maxLength: 200 };
META['tableDisplayName'] = { label: '配置项', maxLength: 200 };
META['name'] = { label: '关联名', required: true, maxLength: 200 };
META['configdata_code1'] = { label: '配置项code1', required: true, maxLength: 200, };
META['configdata_code2'] = { label: '配置项code2', required: true, maxLength: 200 };
META['type'] = { label: '关系', type: 'select', options: [] };
META['config_time'] = { label: '配置时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 200 };
var EDIT_FIELDS = ['name', 'type', 'config_time', 'description'];

var selectAry = ['type'];

var relationDataJson = [];
var relationConfig1 = {};
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

  var isEdit = false;
  if (!!item.id) {
    isEdit = true;
    EDIT_FIELDS = ['configdata_code1', 'name', 'type', 'config_time', 'description'];
  } else {
    isEdit = false;
    EDIT_FIELDS = ['name', 'type', 'config_time', 'description'];
  }

  WUI.dataDialog.create({
    $el: $('.modal-body'),
    dialogPop:true,
    meta: META,
    list: item,
    buttonHide: false,
    onConfirm: submitData.bind(null, item),
    fields: EDIT_FIELDS
  });

  $('.modal-body .row input[name=configdata_code1]').attr('readonly', true);

  relationDataJson = [];
  var _rowHtml = [];
  _rowHtml.push('<div class="row row-no relation-extend">');
  if (!isEdit) {
    _rowHtml.push('  <div class="col-sm-4 col-xs-12 relation-from">');
    _rowHtml.push('    <div class="relation-pop">');
    _rowHtml.push('      <h4>From:</h4>');
    _rowHtml.push('      <div class="data-search data-search-config1"></div>');
    _rowHtml.push('      <div class="data-table"></div>');
    _rowHtml.push('      <div class="data-paginator"></div>');
    _rowHtml.push('    </div>');
    _rowHtml.push('  </div>');
  }
  _rowHtml.push('  <div class="col-sm-5 col-xs-12 relation-to">');
  _rowHtml.push('    <div class="relation-pop">');
  _rowHtml.push('      <h4>To:</h4>');
  _rowHtml.push('      <div class="data-search data-search-config2"></div>');
  _rowHtml.push('      <div class="data-table"></div>');
  _rowHtml.push('      <div class="data-paginator"></div>');
  _rowHtml.push('    </div>');
  _rowHtml.push('  </div>');
  _rowHtml.push('  <div class="col-sm-3 col-xs-12 relation-result">');
  _rowHtml.push('    <div class="relation-pop">');
  _rowHtml.push('      <h4>已选择</h4>');
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

  var _relationColumn = {"data":[{"paths":["rack"],"tableName":"rack","columnName":"status","displayName":"配置项","type":"String","dictionaryValues":["位置","服务器","虚拟机","网络设备","应用"],"stick":true},{"paths":[],"tableName":"","columnName":"description","displayName":"查询","type":"String","dictionaryValues":[],"stick":true}]};
  if (!isEdit) {
    WUI.DataSearch.create({
      $el: $('.modal-body .data-search-config1'),
      meta: _relationColumn,
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
  }
  WUI.DataSearch.create({
    $el: $('.modal-body .data-search-config2'),
    meta: _relationColumn,
    queryButton: '查询',
    onFilter: function (params) {
      QueryDataConfig2($.extend(params, {
        currentPage: 1,
        pageSize: PAGE_SIZE_LABEL
      }));
    }
  });
  if (!isEdit) {
    QueryDataConfig2({
      currentPage: 1,
      pageSize: PAGE_SIZE_LABEL
    });
  } else {
    var _editJson = {};
    _editJson['config_name1'] = item.config_name1;
    _editJson['configdata_id1'] = item.configdata_id1;
    _editJson['name'] = item.name;
    _editJson['type'] = item.type;
    WUI.ajax({
      url: DOMAIN.CMDB + '/web/queryRelationsByCondition',
      method: 'POST',
      jsonData: _editJson
    }).then(function (resp) {
      relationDataJson = resp.configRelationTo;
      relationConfig1 = resp.configRelationFrom;
      QueryDataConfig2({
        currentPage: 1,
        pageSize: PAGE_SIZE_LABEL
      });

      queryDataConfigHtml(relationDataJson);
    });
  }
};
submitData = function(item){
  var isEdit = false;
  if (!!item.id) {
    isEdit = true;
  } else {
    isEdit = false;
  }

  var _submitData = submitDataJson();

  if (!!_submitData['config_time']) {
    _submitData['configTime'] = _submitData['config_time'];
    delete _submitData['config_time'];
  }
  if (!!_submitData['configdata_code1']) {
    delete _submitData['configdata_code1'];
  }

  if (!isEdit) {
    // 配置项from
    if ($('input[name=config_id1]').is(":checked")) {
      var _thisChecked = $('input[name=config_id1]:checked');
      var _configRelationFrom = {};
      _configRelationFrom['configId'] = _thisChecked.attr('data-id');
      _configRelationFrom['configName'] = nameToTable(_thisChecked.parent().next().text());
      _configRelationFrom['configCode'] = _thisChecked.parent().next().next().text();

      _submitData['configRelationFrom'] = _configRelationFrom;
    } else {
      WUI.alert.create({
        message: '请选择From的配置项',
        fail: true
      });

      return false;
    }
  } else {
    _submitData['configRelationFrom'] = relationConfig1;
  }

  // 配置项To
  if (relationDataJson.length > 0) {
    _submitData['configRelationTo'] = relationDataJson;
  } else {
    WUI.alert.create({
      message: '请至少选择一个To的配置项',
      fail: true
    });

    return false;
  }

  var _url = CMDB_API.add;
  if(!!item.id){
    _url = CMDB_API.update;
  }

  WUI.ajax({
    url: DOMAIN.CMDB + _url,
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
  var _value = $.trim($('.data-search-config1 .data-search-des').val());
  var _tablenames = [];
  var _tablenameDom = $('.data-search-config1 .data-search-checkbox input[type=checkbox]:checked');
  $.each(_tablenameDom, function(h, d){
    var _tablename = $(this).parent().text();
    switch(_tablename){
      case '位置':
      _tablenames.push('rack');
      break;
      case '服务器':
      _tablenames.push('server');
      break;
      case '虚拟机':
      _tablenames.push('vm');
      break;
      case '网络设备':
      _tablenames.push('device');
      break;
      case '应用':
      _tablenames.push('project');
      break;
    }
  });
  WUI.ajax({
    url: DOMAIN.CMDB + '/web/ex/getAllConfigurationDevicesByValue?value='+ _value +'&tablename=' + _tablenames.join(','),
    method: 'POST',
    beforeSend: _beforeSend
  }).then(function (resp) {
    var _rowHtml = [];
    _rowHtml.push('<table class="table table-bordered table-hover text-center table-responsive table-striped" style="width:100%;">');
    _rowHtml.push('<thead><tr><th>选择</th><th>配置项</th><th>Code</th></tr></thead>');
    _rowHtml.push('<tbody>');
    $.each(resp.list, function(i, e){
      _rowHtml.push('<tr>');
      _rowHtml.push('<td><input type="radio" data-id="'+ e.id +'" name="config_id1"></td>');
      _rowHtml.push('<td>'+ e.tableDisplayName +'</td>');
      _rowHtml.push('<td>'+ e.code +'</td>');
      _rowHtml.push('</tr>');
    });
    _rowHtml.push('</tbody>');
    _rowHtml.push('</table>');
    $('.relation-from .data-table').html(_rowHtml.join(''));

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
var QueryDataConfig2 = function (options) {
  var _beforeSend = function(request) {
    request.setRequestHeader("pageNum", options.currentPage);
    request.setRequestHeader("pageLimit", options.pageSize);
    request.setRequestHeader("Authorization", getCookie('CMDB-TOKEN-TYPE') +' '+ getCookie('CMDB-TOKEN'));
  };
  var _value = $.trim($('.data-search-config2 .data-search-des').val());
  var _tablenames = [];
  var _tablenameDom = $('.data-search-config2 .data-search-checkbox input[type=checkbox]:checked');
  $.each(_tablenameDom, function(h, d){
    var _tablename = $(this).parent().text();
    switch(_tablename){
      case '位置':
      _tablenames.push('rack');
      break;
      case '服务器':
      _tablenames.push('server');
      break;
      case '虚拟机':
      _tablenames.push('vm');
      break;
      case '网络设备':
      _tablenames.push('device');
      break;
      case '应用':
      _tablenames.push('project');
      break;
    }
  });
  WUI.ajax({
    url: DOMAIN.CMDB + '/web/ex/getAllConfigurationDevicesByValue?value='+ _value +'&tablename=' + _tablenames.join(','),
    method: 'POST',
    beforeSend: _beforeSend
  }).then(function (resp) {
    var _rowHtml = [];
    _rowHtml.push('<table class="table table-bordered table-hover text-center table-responsive table-striped" style="width:100%;">');
    _rowHtml.push('<thead><tr><th>选择</th><th>配置项</th><th>Code</th></tr></thead>');
    _rowHtml.push('<tbody>');
    $.each(resp.list, function(i, e){
      _rowHtml.push('<tr>');
      _rowHtml.push('<td><input type="checkbox" data-id="'+ e.id +'"></td>');
      _rowHtml.push('<td>'+ e.tableDisplayName +'</td>');
      _rowHtml.push('<td>'+ e.code +'</td>');
      _rowHtml.push('</tr>');
    });
    _rowHtml.push('</tbody>');
    _rowHtml.push('</table>');
    $('.relation-to .data-table').html(_rowHtml.join(''));
    $.each($('.relation-to .data-table tbody tr'), function(i, e){
      var _this = $(this);
      var _id = _this.find('input').attr('data-id');
      // var _name = _this.find('td').eq(1).text();
      var _code = _this.find('td').eq(2).text();
      $.each(relationDataJson, function(j, f){
        if (_id == f['configId'] && _code == f['configCode']) {
          _this.find('input').prop('checked', true);

          return true;
        }
      });
    });
    $('.relation-to .data-table input[type=checkbox]').click(function(){
      var _this = $(this);
      var _thisJson = {};
      _thisJson['configId'] = _this.attr('data-id');
      _thisJson['configName'] = nameToTable(_this.parent().parent().find('td').eq(1).text());
      // _thisJson['configName'] = _this.parent().parent().find('td').eq(1).text();
      _thisJson['configCode'] = _this.parent().parent().find('td').eq(2).text();
      if (_this.is(':checked')) {
        relationDataJson.push(_thisJson);
      } else {
        $.each(relationDataJson, function(i, e){
          if (e['configId'] == _thisJson['configId'] && e['configCode'] == _thisJson['configCode']) {
            relationDataJson.splice(i, 1);

            return false;
          }
        });
      }

      queryDataConfigHtml(relationDataJson);
      console.log('relationDataJson',relationDataJson);
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

// Load Page
WUI.ready = function () {
  // meta的元素数据字典 => cloumn数据 => 查询数据
  queryDictionary('relation');

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '首页',
      url: '/cmdb/home.html'
    } , {
      name: '关系'
    }]
  });
};
// Keep this function
$(function () {
  WUI.init({
    system: 'cmdb'
  });
});

function queryDataConfigHtml(data){
  $('.relation-result .relation-pop').html('<h4>已选择</h4>');
  $.each(data, function(i, e){
    var _hasThisP = false;
    $.each($('.relation-result .relation-pop p'), function(j, f){
      if ($(this).text() == tableToName(e['configName'])) {
        _hasThisP = true;
        $('.relation-result .relation-pop ul').eq(j).append('<li>'+ e['configCode'] +'</li>');
        $('.relation-result .relation-pop p').eq(j).addClass('active');

        return true;
      }
    });
    if (!_hasThisP) {
      $('.relation-result .relation-pop').append('<p class="active"><span></span>'+ tableToName(e['configName']) +'</p>');
      $('.relation-result .relation-pop').append('<ul><li>'+ e['configCode'] +'</li></ul>');
    }
  });
}
