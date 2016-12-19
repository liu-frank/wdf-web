'use strict';
// Constants
var CMDB_API = {
  query: '/web/ex/getAllConfigurationDevicesByValue' // 查
};

META['table'] = { label: 'Table', maxLength: 200 };
META['tableDisplayName'] = { label: '配置项', maxLength: 200 };
META['code'] = { label: 'Code', maxLength: 200 };
META['rack_code'] = { label: 'IDC_code', maxLength: 200 };
META['environment'] = { label: '版本', maxLength: 200 };
META['computer_amount'] = { label: '规格（U）', maxLength: 200 };
META['cloud_type'] = { label: '类型', maxLength: 200 };
META['type'] = { label: '接口', maxLength: 200 };
META['insure'] = { label: '保障', maxLength: 200 };
META['net_type1'] = { label: 'type', maxLength: 200 };
META['net_type2'] = { label: 'type', maxLength: 200 };
META['net_type3'] = { label: 'type', maxLength: 200 };
META['net_type4'] = { label: 'type', maxLength: 200 };
META['net_type5'] = { label: 'type', maxLength: 200 };
META['net_type6'] = { label: 'type', maxLength: 200 };
META['net_type7'] = { label: 'type', maxLength: 200 };
META['net_type8'] = { label: 'type', maxLength: 200 };
META['net_type9'] = { label: 'type', maxLength: 200 };
META['os_family'] = { label: 'OS family', maxLength: 200 };
META['os_version'] = { label: 'OS version', maxLength: 200 };
META['status'] = { label: '状态', maxLength: 200 };
META['allocated'] = { label: '分配状态', maxLength: 200 };
META['purchase_time'] = { label: '采购时间', maxLength: 200 };
META['arrival_time'] = { label: '到货时间', maxLength: 200 };
META['stock_time'] = { label: '上线时间', maxLength: 200 };
META['maintain_time_begin'] = { label: '维保开始时间', maxLength: 200 };
META['maintain_time_end'] = { label: '维保结束时间', maxLength: 200 };
META['created_time'] = { label: '创建时间', maxLength: 200 };
META['updated_time'] = { label: '更新时间', maxLength: 200 };
META['alloc_deadline'] = { label: '分配截止时间', maxLength: 200 };

var TABLE_FIELDS = ['tableDisplayName', 'code', 'stock_time', 'status', 'description'];
// idc
var VIEW_FIELDS_IDC = ['code', 'location', 'rack_region', 'rack', 'status', 'computer_amount', 'description'];
// server
var VIEW_FIELDS_SERVER_BASIC = ['code', 'rack_code', 'serial_number', 'cloud_type', 'cpu', 'model', 'memory', 'raid', 'harddisk', 'computer_amount', 'u_amount', 'typical_case', 'manage_ip', 'hostname', 'optional'];
var VIEW_FIELDS_SERVER_NET = ['net_name1', 'net_type1', 'net_ip1', 'net_name2', 'net_type2', 'net_ip2', 'net_name3', 'net_type3', 'net_ip3', 'net_name4', 'net_type4', 'net_ip4', 'net_name5', 'net_type5', 'net_ip5', 'net_name6', 'net_type6', 'net_ip6', 'net_name7', 'net_type7', 'net_ip7', 'net_name8', 'net_type8', 'net_ip8', 'net_name9', 'net_type9', 'net_ip9'];
var VIEW_FIELDS_SERVER_OS = ['os_family', 'os_version'];
var VIEW_FIELDS_SERVER_OTHER = ['status', 'allocated', 'alloc_deadline', 'purchase_time', 'arrival_time', 'stock_time', 'maintain_time_begin', 'maintain_time_end', 'description'];
// vm
var VIEW_FIELDS_VM_BASIC = ['code', 'server_code', 'cpu', 'cloud_type', 'memory', 'harddisk', 'hostname', 'optional'];
var VIEW_FIELDS_VM_NET = ['net_name1', 'net_type1', 'net_ip1', 'net_name2', 'net_type2', 'net_ip2', 'net_name3', 'net_type3', 'net_ip3', 'net_name4', 'net_type4', 'net_ip4', 'net_name5', 'net_type5', 'net_ip5', 'net_name6', 'net_type6', 'net_ip6', 'net_name7', 'net_type7', 'net_ip7', 'net_name8', 'net_type8', 'net_ip8', 'net_name9', 'net_type9', 'net_ip9'];
var VIEW_FIELDS_VM_OS = ['os_family', 'os_version'];
var VIEW_FIELDS_VM_OTHER = ['status', 'allocated', 'alloc_deadline', 'stock_time', 'description'];
// device
var VIEW_FIELDS_DEVICE_BASIC = ['code', 'rack_code', 'model', 'cloud_type', 'serial_number', 'name', 'type', 'computer_amount', 'u_amount', 'manage_ip', 'optional'];
var VIEW_FIELDS_DEVICE_OTHER = ['purchase_time', 'arrival_time', 'stock_time', 'maintain_time_begin', 'maintain_time_end', 'status', 'description'];
// project
var VIEW_FIELDS_PROJECT = ['code', 'name', 'version', 'stock_time', 'insure', 'description'];

var viewData = function (item) {
  WUI.ModalDialog.create({
    buttonHide: true,
  });
  META['stock_time'].label = '上架时间';
  switch(item.table){
    case 'rack':
    WUI.dataDialog.create({
      $el: $('.modal-body'),
      meta: META,
      list: item,
      buttonHide: true,
      fields: VIEW_FIELDS_IDC
    });
    break;
    case 'server':
    $('.modal-body').append('<h4>基础信息</h6>');
    WUI.dataDialog.create({
      $el: $('.modal-body'),
      meta: META,
      list: item,
      buttonHide: true,
      fields: VIEW_FIELDS_SERVER_BASIC,
      htmlAppend: true
    });
    $('.modal-body').append('<h4>网络信息</h6>');
    WUI.dataDialog.create({
      $el: $('.modal-body'),
      meta: META,
      list: item,
      buttonHide: true,
      fields: VIEW_FIELDS_SERVER_NET,
      htmlAppend: true
    });
    $('.modal-body').append('<h4>OS信息</h6>');
    WUI.dataDialog.create({
      $el: $('.modal-body'),
      meta: META,
      list: item,
      buttonHide: true,
      fields: VIEW_FIELDS_SERVER_OS,
      htmlAppend: true
    });
    $('.modal-body').append('<h4>其他信息</h6>');
    WUI.dataDialog.create({
      $el: $('.modal-body'),
      meta: META,
      list: item,
      buttonHide: true,
      fields: VIEW_FIELDS_SERVER_OTHER,
      htmlAppend: true
    });
    break;
    case 'vm':
    $('.modal-body').append('<h4>基础信息</h6>');
    WUI.dataDialog.create({
      $el: $('.modal-body'),
      meta: META,
      list: item,
      buttonHide: true,
      fields: VIEW_FIELDS_VM_BASIC,
      htmlAppend: true
    });
    $('.modal-body').append('<h4>网络信息</h6>');
    WUI.dataDialog.create({
      $el: $('.modal-body'),
      meta: META,
      list: item,
      buttonHide: true,
      fields: VIEW_FIELDS_VM_NET,
      htmlAppend: true
    });
    $('.modal-body').append('<h4>OS信息</h6>');
    WUI.dataDialog.create({
      $el: $('.modal-body'),
      meta: META,
      list: item,
      buttonHide: true,
      fields: VIEW_FIELDS_VM_OS,
      htmlAppend: true
    });
    $('.modal-body').append('<h4>其他信息</h6>');
    WUI.dataDialog.create({
      $el: $('.modal-body'),
      meta: META,
      list: item,
      buttonHide: true,
      fields: VIEW_FIELDS_VM_OTHER,
      htmlAppend: true
    });
    break;
    case 'device':
    $('.modal-body').append('<h4>基础信息</h6>');
    WUI.dataDialog.create({
      $el: $('.modal-body'),
      meta: META,
      list: item,
      buttonHide: true,
      fields: VIEW_FIELDS_DEVICE_BASIC,
      htmlAppend: true
    });
    $('.modal-body').append('<h4>其他信息</h6>');
    WUI.dataDialog.create({
      $el: $('.modal-body'),
      meta: META,
      list: item,
      buttonHide: true,
      fields: VIEW_FIELDS_DEVICE_OTHER,
      htmlAppend: true
    });
    break;
    case 'project':
    META['stock_time'].label = '上线时间';
    WUI.dataDialog.create({
      $el: $('.modal-body'),
      meta: META,
      list: item,
      buttonHide: true,
      fields: VIEW_FIELDS_PROJECT
    });
    break;
  }

  $('.quick-query .modal-body input').prop('readonly',true);
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
  
  var _labels = [];
  $.each($('.quick-query-left input:checked'), function(i, e){
    var _this = $(this);
    var _Key = _this.parents('ul').prev('p').text();
    var _val = _this.parent().text();
    var _label = _Key + ' : ' + _val;
    _labels.push(_label);
  });
  var _value = $.trim($('input.data-search-des').val());
  var _appCode = $.trim($('input[name=code]').val());
  var _relationTypes = [];
  $.each($('input[name=status]:checked'), function(i, e){
    var _relationType = $(this).parent().text();
    _relationTypes.push(_relationType);
  });

  WUI.ajax({
    url: DOMAIN.CMDB + CMDB_API.query + '?value='+ _value +'&labels=' + _labels.join(',') +'&appCode=' + _appCode +'&relationTypes=' + _relationTypes.join(','),
    method: 'POST',
    beforeSend: _beforeSend
  }).then(function (resp) {
    WUI.DataTable.create({
      $el: $('.data-table'),
      meta: META,
      fields: TABLE_FIELDS,
      list: resp.list,
      operations: [{
        name: '查看详情',
        callback: viewData
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
var queryLabel = function(){
  WUI.ajax({
    url: DOMAIN.CMDB + '/web/label/ex/queryLabel',
    method: 'POST'
  }).then(function (resp) {
    var _rowHtml = [];
    _rowHtml.push('<h4>标签<span>清除全部</span></h4>');
    $.each(resp, function(i, e){
      _rowHtml.push('<p><span></span>'+ i +'</p>');
      _rowHtml.push('<ul>');
      $.each(e, function(j, f){
        _rowHtml.push('<li><label><input type="checkbox" />'+ f +'</label></li>');
      });
      _rowHtml.push('</ul>');
    });

    $('.quick-query-left').html(_rowHtml.join(''));

    $('.quick-query-left p').click(function(){
      var _this = $(this);
      if(_this.hasClass('active')){
        _this.removeClass('active');
      }else{
        _this.addClass('active');
      }
    });
    $('.quick-query-left > h4 span').click(function(){
      $('.quick-query-left input[type=checkbox]').prop('checked', false);
    });
  });
};

// Load Page
WUI.ready = function () {
  var _column = {"data":[{"paths":["rack"],"tableName":"rack","columnName":"code","displayName":"应用code","type":"String","dictionaryValues":[],"stick":true},{"paths":["rack"],"tableName":"rack","columnName":"status","displayName":"关联类型","type":"String","dictionaryValues":["包含","依赖"],"stick":true},{"paths":[],"tableName":"","columnName":"description","displayName":"所有","type":"String","dictionaryValues":[],"stick":true}]};
  SEARCH_SUBS['columns']['isShow'] = false;
  SEARCH_SUBS['operation']['isShow'] = false;
  WUI.DataSearch.create({
    $el: $('.content-wrapper .data-search'),
    meta: _column,
    searchSubs: SEARCH_SUBS ? SEARCH_SUBS : {},
    queryButton: '查询',
    onFilter: function (params) {
      queryData($.extend(params, {
        currentPage: 1,
        pageSize: PAGE_SIZE
      }));
    }
  });

  var _locationKey = decodeURI(WUI.link().key);
  if(_locationKey != 'undefined'){
    $('.data-search-des').val(_locationKey);
  }

  queryLabel();

  // 列表数据
  queryData({
    currentPage: 1,
    pageSize: PAGE_SIZE
  });

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '首页',
      url: '/cmdb/home.html'
    } , {
      name: '配置项查询'
    }]
  });
}
// Keep this function
$(function () {
  WUI.init({
    system: 'cmdb'
  });
});
