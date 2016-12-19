'use strict';
// Constants
var CMDB_API = {
  query: '/web/ex/getAllConfigurationDevicesByValue', // 查
  export: '/web/excel/download/rack', // export
};
SEARCH_TOOLS = [{
  label: '工具',
  options: [{
    rowHtml: '<a href="http://10.214.124.55/zabbix/" target="_blank">zabbix</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.53:8080/" target="_blank">Jira</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.53:8090/" target="_blank">Confluence</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.53/itop/" target="_blank">Itop</a>'
  }, {
    rowHtml: '<a href="http://10.214.66.75/" target="_blank">ELK</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.57/svnadmin/" target="_blank">Svn</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.57:8081/" target="_blank">GitLab</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.58:8080/" target="_blank">Jenkins</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.56:8081/nexus/" target="_blank">Nexus</a>'
  }, {
    rowHtml: '<a href="https://10.214.124.59/" target="_blank">Ansible</a>'
  }, {
    rowHtml: '<a href="https://10.214.124.59/" target="_blank">Ansible</a>'
  }]
}];
META['table'] = { label: 'Table', maxLength:30 };
META['tableDisplayName'] = { label: '配置项', maxLength:30 };
META['code'] = { label: 'Code', maxLength:30 };
META['rack_code'] = { label: 'IDC_code', maxLength:30 };
META['environment'] = { label: '版本', maxLength:30 };
META['computer_amount'] = { label: '规格（U）', maxLength:30 };
META['cloud_type'] = { label: '类型', maxLength:30 };
META['type'] = { label: '接口', maxLength:30 };
META['insure'] = { label: '保障', maxLength:30 };
META['net_type1'] = { label: 'type', maxLength:30 };
META['net_type2'] = { label: 'type', maxLength:30 };
META['net_type3'] = { label: 'type', maxLength:30 };
META['net_type4'] = { label: 'type', maxLength:30 };
META['net_type5'] = { label: 'type', maxLength:30 };
META['net_type6'] = { label: 'type', maxLength:30 };
META['net_type7'] = { label: 'type', maxLength:30 };
META['net_type8'] = { label: 'type', maxLength:30 };
META['net_type9'] = { label: 'type', maxLength:30 };
META['os_family'] = { label: 'OS family', maxLength:30 };
META['os_version'] = { label: 'OS version', maxLength:30 };
META['status'] = { label: '状态', maxLength:30 };
META['allocated'] = { label: '分配状态', maxLength:30 };
META['purchase_time'] = { label: '采购时间', maxLength:30 };
META['arrival_time'] = { label: '到货时间', maxLength:30 };
META['stock_time'] = { label: '上线时间', maxLength:30 };
META['maintain_time_begin'] = { label: '维保开始时间', maxLength:30 };
META['maintain_time_end'] = { label: '维保结束时间', maxLength:30 };
META['created_time'] = { label: '创建时间', maxLength:30 };
META['updated_time'] = { label: '更新时间', maxLength:30 };
META['alloc_deadline'] = { label: '分配截止时间', maxLength:30 };

var TABLE_FIELDS = ['tableDisplayName', 'code', 'stock_time', 'status'];
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
var VIEW_FIELDS_DEVICE_BASIC = ['code', 'rack_code', 'model', 'cloud_type', 'serial_number', 'name', 'type', 'computer_amount', 'manage_ip', 'optional'];
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
queryData = function (options) {
  var _beforeSend = function(request) {
    request.setRequestHeader("pageNum", options.currentPage);
    request.setRequestHeader("pageLimit", options.pageSize);
    request.setRequestHeader("Authorization", getCookie('CMDB-TOKEN-TYPE') +' '+ getCookie('CMDB-TOKEN'));
  };
  
  var _value = $.trim($('input.data-search-des').val());
  var _labels = [];
  $.each($('.quick-query-left input:checked'), function(i, e){
    var _this = $(this);
    var _Key = _this.parents('ul').prev('p').text();
    var _val = _this.parent().text();
    var _label = _Key + ' : ' + _val;
    _labels.push(_label);
  });

  WUI.ajax({
    url: DOMAIN.CMDB + CMDB_API.query + '?value='+ _value +'&labels=' + _labels.join(','),
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
  var _column = {"data":[{"paths":[],"tableName":"","columnName":"description","displayName":"快捷查询","type":"String","dictionaryValues":[],"stick":true}]}
  WUI.DataSearch.create({
    $el: $('.content-wrapper .data-search'),
    meta: _column,
    searchTools: SEARCH_TOOLS ? SEARCH_TOOLS : [],
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjbWRiL3F1aWNrLXF1ZXJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8vIENvbnN0YW50c1xudmFyIENNREJfQVBJID0ge1xuICBxdWVyeTogJy93ZWIvZXgvZ2V0QWxsQ29uZmlndXJhdGlvbkRldmljZXNCeVZhbHVlJywgLy8g5p+lXG4gIGV4cG9ydDogJy93ZWIvZXhjZWwvZG93bmxvYWQvcmFjaycsIC8vIGV4cG9ydFxufTtcblNFQVJDSF9UT09MUyA9IFt7XG4gIGxhYmVsOiAn5bel5YW3JyxcbiAgb3B0aW9uczogW3tcbiAgICByb3dIdG1sOiAnPGEgaHJlZj1cImh0dHA6Ly8xMC4yMTQuMTI0LjU1L3phYmJpeC9cIiB0YXJnZXQ9XCJfYmxhbmtcIj56YWJiaXg8L2E+J1xuICB9LCB7XG4gICAgcm93SHRtbDogJzxhIGhyZWY9XCJodHRwOi8vMTAuMjE0LjEyNC41Mzo4MDgwL1wiIHRhcmdldD1cIl9ibGFua1wiPkppcmE8L2E+J1xuICB9LCB7XG4gICAgcm93SHRtbDogJzxhIGhyZWY9XCJodHRwOi8vMTAuMjE0LjEyNC41Mzo4MDkwL1wiIHRhcmdldD1cIl9ibGFua1wiPkNvbmZsdWVuY2U8L2E+J1xuICB9LCB7XG4gICAgcm93SHRtbDogJzxhIGhyZWY9XCJodHRwOi8vMTAuMjE0LjEyNC41My9pdG9wL1wiIHRhcmdldD1cIl9ibGFua1wiPkl0b3A8L2E+J1xuICB9LCB7XG4gICAgcm93SHRtbDogJzxhIGhyZWY9XCJodHRwOi8vMTAuMjE0LjY2Ljc1L1wiIHRhcmdldD1cIl9ibGFua1wiPkVMSzwvYT4nXG4gIH0sIHtcbiAgICByb3dIdG1sOiAnPGEgaHJlZj1cImh0dHA6Ly8xMC4yMTQuMTI0LjU3L3N2bmFkbWluL1wiIHRhcmdldD1cIl9ibGFua1wiPlN2bjwvYT4nXG4gIH0sIHtcbiAgICByb3dIdG1sOiAnPGEgaHJlZj1cImh0dHA6Ly8xMC4yMTQuMTI0LjU3OjgwODEvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+R2l0TGFiPC9hPidcbiAgfSwge1xuICAgIHJvd0h0bWw6ICc8YSBocmVmPVwiaHR0cDovLzEwLjIxNC4xMjQuNTg6ODA4MC9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5KZW5raW5zPC9hPidcbiAgfSwge1xuICAgIHJvd0h0bWw6ICc8YSBocmVmPVwiaHR0cDovLzEwLjIxNC4xMjQuNTY6ODA4MS9uZXh1cy9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5OZXh1czwvYT4nXG4gIH0sIHtcbiAgICByb3dIdG1sOiAnPGEgaHJlZj1cImh0dHBzOi8vMTAuMjE0LjEyNC41OS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5BbnNpYmxlPC9hPidcbiAgfSwge1xuICAgIHJvd0h0bWw6ICc8YSBocmVmPVwiaHR0cHM6Ly8xMC4yMTQuMTI0LjU5L1wiIHRhcmdldD1cIl9ibGFua1wiPkFuc2libGU8L2E+J1xuICB9XVxufV07XG5NRVRBWyd0YWJsZSddID0geyBsYWJlbDogJ1RhYmxlJywgbWF4TGVuZ3RoOjMwIH07XG5NRVRBWyd0YWJsZURpc3BsYXlOYW1lJ10gPSB7IGxhYmVsOiAn6YWN572u6aG5JywgbWF4TGVuZ3RoOjMwIH07XG5NRVRBWydjb2RlJ10gPSB7IGxhYmVsOiAnQ29kZScsIG1heExlbmd0aDozMCB9O1xuTUVUQVsncmFja19jb2RlJ10gPSB7IGxhYmVsOiAnSURDX2NvZGUnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ2Vudmlyb25tZW50J10gPSB7IGxhYmVsOiAn54mI5pysJywgbWF4TGVuZ3RoOjMwIH07XG5NRVRBWydjb21wdXRlcl9hbW91bnQnXSA9IHsgbGFiZWw6ICfop4TmoLzvvIhV77yJJywgbWF4TGVuZ3RoOjMwIH07XG5NRVRBWydjbG91ZF90eXBlJ10gPSB7IGxhYmVsOiAn57G75Z6LJywgbWF4TGVuZ3RoOjMwIH07XG5NRVRBWyd0eXBlJ10gPSB7IGxhYmVsOiAn5o6l5Y+jJywgbWF4TGVuZ3RoOjMwIH07XG5NRVRBWydpbnN1cmUnXSA9IHsgbGFiZWw6ICfkv53pmpwnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ25ldF90eXBlMSddID0geyBsYWJlbDogJ3R5cGUnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ25ldF90eXBlMiddID0geyBsYWJlbDogJ3R5cGUnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ25ldF90eXBlMyddID0geyBsYWJlbDogJ3R5cGUnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ25ldF90eXBlNCddID0geyBsYWJlbDogJ3R5cGUnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ25ldF90eXBlNSddID0geyBsYWJlbDogJ3R5cGUnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ25ldF90eXBlNiddID0geyBsYWJlbDogJ3R5cGUnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ25ldF90eXBlNyddID0geyBsYWJlbDogJ3R5cGUnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ25ldF90eXBlOCddID0geyBsYWJlbDogJ3R5cGUnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ25ldF90eXBlOSddID0geyBsYWJlbDogJ3R5cGUnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ29zX2ZhbWlseSddID0geyBsYWJlbDogJ09TIGZhbWlseScsIG1heExlbmd0aDozMCB9O1xuTUVUQVsnb3NfdmVyc2lvbiddID0geyBsYWJlbDogJ09TIHZlcnNpb24nLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ3N0YXR1cyddID0geyBsYWJlbDogJ+eKtuaAgScsIG1heExlbmd0aDozMCB9O1xuTUVUQVsnYWxsb2NhdGVkJ10gPSB7IGxhYmVsOiAn5YiG6YWN54q25oCBJywgbWF4TGVuZ3RoOjMwIH07XG5NRVRBWydwdXJjaGFzZV90aW1lJ10gPSB7IGxhYmVsOiAn6YeH6LSt5pe26Ze0JywgbWF4TGVuZ3RoOjMwIH07XG5NRVRBWydhcnJpdmFsX3RpbWUnXSA9IHsgbGFiZWw6ICfliLDotKfml7bpl7QnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ3N0b2NrX3RpbWUnXSA9IHsgbGFiZWw6ICfkuIrnur/ml7bpl7QnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ21haW50YWluX3RpbWVfYmVnaW4nXSA9IHsgbGFiZWw6ICfnu7Tkv53lvIDlp4vml7bpl7QnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ21haW50YWluX3RpbWVfZW5kJ10gPSB7IGxhYmVsOiAn57u05L+d57uT5p2f5pe26Ze0JywgbWF4TGVuZ3RoOjMwIH07XG5NRVRBWydjcmVhdGVkX3RpbWUnXSA9IHsgbGFiZWw6ICfliJvlu7rml7bpl7QnLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ3VwZGF0ZWRfdGltZSddID0geyBsYWJlbDogJ+abtOaWsOaXtumXtCcsIG1heExlbmd0aDozMCB9O1xuTUVUQVsnYWxsb2NfZGVhZGxpbmUnXSA9IHsgbGFiZWw6ICfliIbphY3miKrmraLml7bpl7QnLCBtYXhMZW5ndGg6MzAgfTtcblxudmFyIFRBQkxFX0ZJRUxEUyA9IFsndGFibGVEaXNwbGF5TmFtZScsICdjb2RlJywgJ3N0b2NrX3RpbWUnLCAnc3RhdHVzJ107XG4vLyBpZGNcbnZhciBWSUVXX0ZJRUxEU19JREMgPSBbJ2NvZGUnLCAnbG9jYXRpb24nLCAncmFja19yZWdpb24nLCAncmFjaycsICdzdGF0dXMnLCAnY29tcHV0ZXJfYW1vdW50JywgJ2Rlc2NyaXB0aW9uJ107XG4vLyBzZXJ2ZXJcbnZhciBWSUVXX0ZJRUxEU19TRVJWRVJfQkFTSUMgPSBbJ2NvZGUnLCAncmFja19jb2RlJywgJ3NlcmlhbF9udW1iZXInLCAnY2xvdWRfdHlwZScsICdjcHUnLCAnbW9kZWwnLCAnbWVtb3J5JywgJ3JhaWQnLCAnaGFyZGRpc2snLCAnY29tcHV0ZXJfYW1vdW50JywgJ3VfYW1vdW50JywgJ3R5cGljYWxfY2FzZScsICdtYW5hZ2VfaXAnLCAnaG9zdG5hbWUnLCAnb3B0aW9uYWwnXTtcbnZhciBWSUVXX0ZJRUxEU19TRVJWRVJfTkVUID0gWyduZXRfbmFtZTEnLCAnbmV0X3R5cGUxJywgJ25ldF9pcDEnLCAnbmV0X25hbWUyJywgJ25ldF90eXBlMicsICduZXRfaXAyJywgJ25ldF9uYW1lMycsICduZXRfdHlwZTMnLCAnbmV0X2lwMycsICduZXRfbmFtZTQnLCAnbmV0X3R5cGU0JywgJ25ldF9pcDQnLCAnbmV0X25hbWU1JywgJ25ldF90eXBlNScsICduZXRfaXA1JywgJ25ldF9uYW1lNicsICduZXRfdHlwZTYnLCAnbmV0X2lwNicsICduZXRfbmFtZTcnLCAnbmV0X3R5cGU3JywgJ25ldF9pcDcnLCAnbmV0X25hbWU4JywgJ25ldF90eXBlOCcsICduZXRfaXA4JywgJ25ldF9uYW1lOScsICduZXRfdHlwZTknLCAnbmV0X2lwOSddO1xudmFyIFZJRVdfRklFTERTX1NFUlZFUl9PUyA9IFsnb3NfZmFtaWx5JywgJ29zX3ZlcnNpb24nXTtcbnZhciBWSUVXX0ZJRUxEU19TRVJWRVJfT1RIRVIgPSBbJ3N0YXR1cycsICdhbGxvY2F0ZWQnLCAnYWxsb2NfZGVhZGxpbmUnLCAncHVyY2hhc2VfdGltZScsICdhcnJpdmFsX3RpbWUnLCAnc3RvY2tfdGltZScsICdtYWludGFpbl90aW1lX2JlZ2luJywgJ21haW50YWluX3RpbWVfZW5kJywgJ2Rlc2NyaXB0aW9uJ107XG4vLyB2bVxudmFyIFZJRVdfRklFTERTX1ZNX0JBU0lDID0gWydjb2RlJywgJ3NlcnZlcl9jb2RlJywgJ2NwdScsICdjbG91ZF90eXBlJywgJ21lbW9yeScsICdoYXJkZGlzaycsICdob3N0bmFtZScsICdvcHRpb25hbCddO1xudmFyIFZJRVdfRklFTERTX1ZNX05FVCA9IFsnbmV0X25hbWUxJywgJ25ldF90eXBlMScsICduZXRfaXAxJywgJ25ldF9uYW1lMicsICduZXRfdHlwZTInLCAnbmV0X2lwMicsICduZXRfbmFtZTMnLCAnbmV0X3R5cGUzJywgJ25ldF9pcDMnLCAnbmV0X25hbWU0JywgJ25ldF90eXBlNCcsICduZXRfaXA0JywgJ25ldF9uYW1lNScsICduZXRfdHlwZTUnLCAnbmV0X2lwNScsICduZXRfbmFtZTYnLCAnbmV0X3R5cGU2JywgJ25ldF9pcDYnLCAnbmV0X25hbWU3JywgJ25ldF90eXBlNycsICduZXRfaXA3JywgJ25ldF9uYW1lOCcsICduZXRfdHlwZTgnLCAnbmV0X2lwOCcsICduZXRfbmFtZTknLCAnbmV0X3R5cGU5JywgJ25ldF9pcDknXTtcbnZhciBWSUVXX0ZJRUxEU19WTV9PUyA9IFsnb3NfZmFtaWx5JywgJ29zX3ZlcnNpb24nXTtcbnZhciBWSUVXX0ZJRUxEU19WTV9PVEhFUiA9IFsnc3RhdHVzJywgJ2FsbG9jYXRlZCcsICdhbGxvY19kZWFkbGluZScsICdzdG9ja190aW1lJywgJ2Rlc2NyaXB0aW9uJ107XG4vLyBkZXZpY2VcbnZhciBWSUVXX0ZJRUxEU19ERVZJQ0VfQkFTSUMgPSBbJ2NvZGUnLCAncmFja19jb2RlJywgJ21vZGVsJywgJ2Nsb3VkX3R5cGUnLCAnc2VyaWFsX251bWJlcicsICduYW1lJywgJ3R5cGUnLCAnY29tcHV0ZXJfYW1vdW50JywgJ21hbmFnZV9pcCcsICdvcHRpb25hbCddO1xudmFyIFZJRVdfRklFTERTX0RFVklDRV9PVEhFUiA9IFsncHVyY2hhc2VfdGltZScsICdhcnJpdmFsX3RpbWUnLCAnc3RvY2tfdGltZScsICdtYWludGFpbl90aW1lX2JlZ2luJywgJ21haW50YWluX3RpbWVfZW5kJywgJ3N0YXR1cycsICdkZXNjcmlwdGlvbiddO1xuLy8gcHJvamVjdFxudmFyIFZJRVdfRklFTERTX1BST0pFQ1QgPSBbJ2NvZGUnLCAnbmFtZScsICd2ZXJzaW9uJywgJ3N0b2NrX3RpbWUnLCAnaW5zdXJlJywgJ2Rlc2NyaXB0aW9uJ107XG5cbnZhciB2aWV3RGF0YSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIFdVSS5Nb2RhbERpYWxvZy5jcmVhdGUoe1xuICAgIGJ1dHRvbkhpZGU6IHRydWUsXG4gIH0pO1xuICBNRVRBWydzdG9ja190aW1lJ10ubGFiZWwgPSAn5LiK5p625pe26Ze0JztcbiAgc3dpdGNoKGl0ZW0udGFibGUpe1xuICAgIGNhc2UgJ3JhY2snOlxuICAgIFdVSS5kYXRhRGlhbG9nLmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JyksXG4gICAgICBtZXRhOiBNRVRBLFxuICAgICAgbGlzdDogaXRlbSxcbiAgICAgIGJ1dHRvbkhpZGU6IHRydWUsXG4gICAgICBmaWVsZHM6IFZJRVdfRklFTERTX0lEQ1xuICAgIH0pO1xuICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NlcnZlcic6XG4gICAgJCgnLm1vZGFsLWJvZHknKS5hcHBlbmQoJzxoND7ln7rnoYDkv6Hmga88L2g2PicpO1xuICAgIFdVSS5kYXRhRGlhbG9nLmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JyksXG4gICAgICBtZXRhOiBNRVRBLFxuICAgICAgbGlzdDogaXRlbSxcbiAgICAgIGJ1dHRvbkhpZGU6IHRydWUsXG4gICAgICBmaWVsZHM6IFZJRVdfRklFTERTX1NFUlZFUl9CQVNJQyxcbiAgICAgIGh0bWxBcHBlbmQ6IHRydWVcbiAgICB9KTtcbiAgICAkKCcubW9kYWwtYm9keScpLmFwcGVuZCgnPGg0Pue9kee7nOS/oeaBrzwvaDY+Jyk7XG4gICAgV1VJLmRhdGFEaWFsb2cuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLm1vZGFsLWJvZHknKSxcbiAgICAgIG1ldGE6IE1FVEEsXG4gICAgICBsaXN0OiBpdGVtLFxuICAgICAgYnV0dG9uSGlkZTogdHJ1ZSxcbiAgICAgIGZpZWxkczogVklFV19GSUVMRFNfU0VSVkVSX05FVCxcbiAgICAgIGh0bWxBcHBlbmQ6IHRydWVcbiAgICB9KTtcbiAgICAkKCcubW9kYWwtYm9keScpLmFwcGVuZCgnPGg0Pk9T5L+h5oGvPC9oNj4nKTtcbiAgICBXVUkuZGF0YURpYWxvZy5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcubW9kYWwtYm9keScpLFxuICAgICAgbWV0YTogTUVUQSxcbiAgICAgIGxpc3Q6IGl0ZW0sXG4gICAgICBidXR0b25IaWRlOiB0cnVlLFxuICAgICAgZmllbGRzOiBWSUVXX0ZJRUxEU19TRVJWRVJfT1MsXG4gICAgICBodG1sQXBwZW5kOiB0cnVlXG4gICAgfSk7XG4gICAgJCgnLm1vZGFsLWJvZHknKS5hcHBlbmQoJzxoND7lhbbku5bkv6Hmga88L2g2PicpO1xuICAgIFdVSS5kYXRhRGlhbG9nLmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JyksXG4gICAgICBtZXRhOiBNRVRBLFxuICAgICAgbGlzdDogaXRlbSxcbiAgICAgIGJ1dHRvbkhpZGU6IHRydWUsXG4gICAgICBmaWVsZHM6IFZJRVdfRklFTERTX1NFUlZFUl9PVEhFUixcbiAgICAgIGh0bWxBcHBlbmQ6IHRydWVcbiAgICB9KTtcbiAgICBicmVhaztcbiAgICBjYXNlICd2bSc6XG4gICAgJCgnLm1vZGFsLWJvZHknKS5hcHBlbmQoJzxoND7ln7rnoYDkv6Hmga88L2g2PicpO1xuICAgIFdVSS5kYXRhRGlhbG9nLmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JyksXG4gICAgICBtZXRhOiBNRVRBLFxuICAgICAgbGlzdDogaXRlbSxcbiAgICAgIGJ1dHRvbkhpZGU6IHRydWUsXG4gICAgICBmaWVsZHM6IFZJRVdfRklFTERTX1ZNX0JBU0lDLFxuICAgICAgaHRtbEFwcGVuZDogdHJ1ZVxuICAgIH0pO1xuICAgICQoJy5tb2RhbC1ib2R5JykuYXBwZW5kKCc8aDQ+572R57uc5L+h5oGvPC9oNj4nKTtcbiAgICBXVUkuZGF0YURpYWxvZy5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcubW9kYWwtYm9keScpLFxuICAgICAgbWV0YTogTUVUQSxcbiAgICAgIGxpc3Q6IGl0ZW0sXG4gICAgICBidXR0b25IaWRlOiB0cnVlLFxuICAgICAgZmllbGRzOiBWSUVXX0ZJRUxEU19WTV9ORVQsXG4gICAgICBodG1sQXBwZW5kOiB0cnVlXG4gICAgfSk7XG4gICAgJCgnLm1vZGFsLWJvZHknKS5hcHBlbmQoJzxoND5PU+S/oeaBrzwvaDY+Jyk7XG4gICAgV1VJLmRhdGFEaWFsb2cuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLm1vZGFsLWJvZHknKSxcbiAgICAgIG1ldGE6IE1FVEEsXG4gICAgICBsaXN0OiBpdGVtLFxuICAgICAgYnV0dG9uSGlkZTogdHJ1ZSxcbiAgICAgIGZpZWxkczogVklFV19GSUVMRFNfVk1fT1MsXG4gICAgICBodG1sQXBwZW5kOiB0cnVlXG4gICAgfSk7XG4gICAgJCgnLm1vZGFsLWJvZHknKS5hcHBlbmQoJzxoND7lhbbku5bkv6Hmga88L2g2PicpO1xuICAgIFdVSS5kYXRhRGlhbG9nLmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JyksXG4gICAgICBtZXRhOiBNRVRBLFxuICAgICAgbGlzdDogaXRlbSxcbiAgICAgIGJ1dHRvbkhpZGU6IHRydWUsXG4gICAgICBmaWVsZHM6IFZJRVdfRklFTERTX1ZNX09USEVSLFxuICAgICAgaHRtbEFwcGVuZDogdHJ1ZVxuICAgIH0pO1xuICAgIGJyZWFrO1xuICAgIGNhc2UgJ2RldmljZSc6XG4gICAgJCgnLm1vZGFsLWJvZHknKS5hcHBlbmQoJzxoND7ln7rnoYDkv6Hmga88L2g2PicpO1xuICAgIFdVSS5kYXRhRGlhbG9nLmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JyksXG4gICAgICBtZXRhOiBNRVRBLFxuICAgICAgbGlzdDogaXRlbSxcbiAgICAgIGJ1dHRvbkhpZGU6IHRydWUsXG4gICAgICBmaWVsZHM6IFZJRVdfRklFTERTX0RFVklDRV9CQVNJQyxcbiAgICAgIGh0bWxBcHBlbmQ6IHRydWVcbiAgICB9KTtcbiAgICAkKCcubW9kYWwtYm9keScpLmFwcGVuZCgnPGg0PuWFtuS7luS/oeaBrzwvaDY+Jyk7XG4gICAgV1VJLmRhdGFEaWFsb2cuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLm1vZGFsLWJvZHknKSxcbiAgICAgIG1ldGE6IE1FVEEsXG4gICAgICBsaXN0OiBpdGVtLFxuICAgICAgYnV0dG9uSGlkZTogdHJ1ZSxcbiAgICAgIGZpZWxkczogVklFV19GSUVMRFNfREVWSUNFX09USEVSLFxuICAgICAgaHRtbEFwcGVuZDogdHJ1ZVxuICAgIH0pO1xuICAgIGJyZWFrO1xuICAgIGNhc2UgJ3Byb2plY3QnOlxuICAgIE1FVEFbJ3N0b2NrX3RpbWUnXS5sYWJlbCA9ICfkuIrnur/ml7bpl7QnO1xuICAgIFdVSS5kYXRhRGlhbG9nLmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JyksXG4gICAgICBtZXRhOiBNRVRBLFxuICAgICAgbGlzdDogaXRlbSxcbiAgICAgIGJ1dHRvbkhpZGU6IHRydWUsXG4gICAgICBmaWVsZHM6IFZJRVdfRklFTERTX1BST0pFQ1RcbiAgICB9KTtcbiAgICBicmVhaztcbiAgfVxuXG4gICQoJy5xdWljay1xdWVyeSAubW9kYWwtYm9keSBpbnB1dCcpLnByb3AoJ3JlYWRvbmx5Jyx0cnVlKTtcbn07XG5xdWVyeURhdGEgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgX2JlZm9yZVNlbmQgPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwicGFnZU51bVwiLCBvcHRpb25zLmN1cnJlbnRQYWdlKTtcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJwYWdlTGltaXRcIiwgb3B0aW9ucy5wYWdlU2l6ZSk7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBnZXRDb29raWUoJ0NNREItVE9LRU4tVFlQRScpICsnICcrIGdldENvb2tpZSgnQ01EQi1UT0tFTicpKTtcbiAgfTtcbiAgXG4gIHZhciBfdmFsdWUgPSAkLnRyaW0oJCgnaW5wdXQuZGF0YS1zZWFyY2gtZGVzJykudmFsKCkpO1xuICB2YXIgX2xhYmVscyA9IFtdO1xuICAkLmVhY2goJCgnLnF1aWNrLXF1ZXJ5LWxlZnQgaW5wdXQ6Y2hlY2tlZCcpLCBmdW5jdGlvbihpLCBlKXtcbiAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xuICAgIHZhciBfS2V5ID0gX3RoaXMucGFyZW50cygndWwnKS5wcmV2KCdwJykudGV4dCgpO1xuICAgIHZhciBfdmFsID0gX3RoaXMucGFyZW50KCkudGV4dCgpO1xuICAgIHZhciBfbGFiZWwgPSBfS2V5ICsgJyA6ICcgKyBfdmFsO1xuICAgIF9sYWJlbHMucHVzaChfbGFiZWwpO1xuICB9KTtcblxuICBXVUkuYWpheCh7XG4gICAgdXJsOiBET01BSU4uQ01EQiArIENNREJfQVBJLnF1ZXJ5ICsgJz92YWx1ZT0nKyBfdmFsdWUgKycmbGFiZWxzPScgKyBfbGFiZWxzLmpvaW4oJywnKSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBiZWZvcmVTZW5kOiBfYmVmb3JlU2VuZFxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgV1VJLkRhdGFUYWJsZS5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcuZGF0YS10YWJsZScpLFxuICAgICAgbWV0YTogTUVUQSxcbiAgICAgIGZpZWxkczogVEFCTEVfRklFTERTLFxuICAgICAgbGlzdDogcmVzcC5saXN0LFxuICAgICAgb3BlcmF0aW9uczogW3tcbiAgICAgICAgbmFtZTogJ+afpeeci+ivpuaDhScsXG4gICAgICAgIGNhbGxiYWNrOiB2aWV3RGF0YVxuICAgICAgfV1cbiAgICB9KTtcblxuICAgIFdVSS5EYXRhUGFnaW5hdG9yLmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJy5kYXRhLXBhZ2luYXRvcicpLFxuICAgICAgY3VycmVudFBhZ2U6IG9wdGlvbnMuY3VycmVudFBhZ2UgLSAxLFxuICAgICAgdG90YWw6IHJlc3AudG90YWxDb3VudCxcbiAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplLFxuICAgICAgb25Td2l0Y2hQYWdlOiBmdW5jdGlvbiAoY3VycmVudFBhZ2UpIHtcbiAgICAgICAgcXVlcnlEYXRhKHtcbiAgICAgICAgICBjdXJyZW50UGFnZTogY3VycmVudFBhZ2UgKyAxLFxuICAgICAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG52YXIgcXVlcnlMYWJlbCA9IGZ1bmN0aW9uKCl7XG4gIFdVSS5hamF4KHtcbiAgICB1cmw6IERPTUFJTi5DTURCICsgJy93ZWIvbGFiZWwvZXgvcXVlcnlMYWJlbCcsXG4gICAgbWV0aG9kOiAnUE9TVCdcbiAgfSkudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgIHZhciBfcm93SHRtbCA9IFtdO1xuICAgIF9yb3dIdG1sLnB1c2goJzxoND7moIfnrb48c3Bhbj7muIXpmaTlhajpg6g8L3NwYW4+PC9oND4nKTtcbiAgICAkLmVhY2gocmVzcCwgZnVuY3Rpb24oaSwgZSl7XG4gICAgICBfcm93SHRtbC5wdXNoKCc8cD48c3Bhbj48L3NwYW4+JysgaSArJzwvcD4nKTtcbiAgICAgIF9yb3dIdG1sLnB1c2goJzx1bD4nKTtcbiAgICAgICQuZWFjaChlLCBmdW5jdGlvbihqLCBmKXtcbiAgICAgICAgX3Jvd0h0bWwucHVzaCgnPGxpPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgLz4nKyBmICsnPC9sYWJlbD48L2xpPicpO1xuICAgICAgfSk7XG4gICAgICBfcm93SHRtbC5wdXNoKCc8L3VsPicpO1xuICAgIH0pO1xuXG4gICAgJCgnLnF1aWNrLXF1ZXJ5LWxlZnQnKS5odG1sKF9yb3dIdG1sLmpvaW4oJycpKTtcblxuICAgICQoJy5xdWljay1xdWVyeS1sZWZ0IHAnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIF90aGlzID0gJCh0aGlzKTtcbiAgICAgIGlmKF90aGlzLmhhc0NsYXNzKCdhY3RpdmUnKSl7XG4gICAgICAgIF90aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBfdGhpcy5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgJCgnLnF1aWNrLXF1ZXJ5LWxlZnQgPiBoNCBzcGFuJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICQoJy5xdWljay1xdWVyeS1sZWZ0IGlucHV0W3R5cGU9Y2hlY2tib3hdJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vLyBMb2FkIFBhZ2VcbldVSS5yZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF9jb2x1bW4gPSB7XCJkYXRhXCI6W3tcInBhdGhzXCI6W10sXCJ0YWJsZU5hbWVcIjpcIlwiLFwiY29sdW1uTmFtZVwiOlwiZGVzY3JpcHRpb25cIixcImRpc3BsYXlOYW1lXCI6XCLlv6vmjbfmn6Xor6JcIixcInR5cGVcIjpcIlN0cmluZ1wiLFwiZGljdGlvbmFyeVZhbHVlc1wiOltdLFwic3RpY2tcIjp0cnVlfV19XG4gIFdVSS5EYXRhU2VhcmNoLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcuY29udGVudC13cmFwcGVyIC5kYXRhLXNlYXJjaCcpLFxuICAgIG1ldGE6IF9jb2x1bW4sXG4gICAgc2VhcmNoVG9vbHM6IFNFQVJDSF9UT09MUyA/IFNFQVJDSF9UT09MUyA6IFtdLFxuICAgIHF1ZXJ5QnV0dG9uOiAn5p+l6K+iJyxcbiAgICBvbkZpbHRlcjogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgcXVlcnlEYXRhKCQuZXh0ZW5kKHBhcmFtcywge1xuICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgcGFnZVNpemU6IFBBR0VfU0laRVxuICAgICAgfSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIF9sb2NhdGlvbktleSA9IGRlY29kZVVSSShXVUkubGluaygpLmtleSk7XG4gIGlmKF9sb2NhdGlvbktleSAhPSAndW5kZWZpbmVkJyl7XG4gICAgJCgnLmRhdGEtc2VhcmNoLWRlcycpLnZhbChfbG9jYXRpb25LZXkpO1xuICB9XG5cbiAgcXVlcnlMYWJlbCgpO1xuXG4gIC8vIOWIl+ihqOaVsOaNrlxuICBxdWVyeURhdGEoe1xuICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgIHBhZ2VTaXplOiBQQUdFX1NJWkVcbiAgfSk7XG5cbiAgLy8g6Z2i5YyF5bGRXG4gIFdVSS5Db250ZW50SGVhZGVyLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcuY29udGVudC1oZWFkZXInKSxcbiAgICBtZXRhOiBbe1xuICAgICAgbmFtZTogJ+mFjee9rumhueafpeivoidcbiAgICB9XVxuICB9KTtcbn1cbi8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdjbWRiJ1xuICB9KTtcbn0pO1xuIl0sImZpbGUiOiJjbWRiL3F1aWNrLXF1ZXJ5LmpzIn0=
