'use strict';
// Constants
var CMDB_API = {
  table: 'server', // 表名
  showCloumn: '/web/people/updatePeopleShowColumn', // 个人展示列
  relation: '/web/server/relation/query', // 关系查询
  relationDownload: '/web/server/relation/download', // 关系下载
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addServer', // 增
  delete: '/web/deleteServers', // 删
  update: '/web/updateServer', // 改
  column: '/web/server/column', // 查询条件
  query: '/web/server/query', // 查
  export: '/web/excel/download/server', // export
  import: '/web/excel/upload/server' // import
};
META['code'] = { label: '服务器_code', required: true, maxLength: 200 };
var EDIT_FIELDS_BASIC = ['code', 'rack_code', 'serial_number', 'cloud_type', 'cpu', 'model', 'memory', 'raid', 'harddisk', 'computer_amount', 'u_amount', 'typical_case', 'manage_ip', 'hostname', 'optional'];
var EDIT_FIELDS_NET = ['net_name1', 'net_type1', 'net_ip1', 'net_name2', 'net_type2', 'net_ip2', 'net_name3', 'net_type3', 'net_ip3', 'net_name4', 'net_type4', 'net_ip4', 'net_name5', 'net_type5', 'net_ip5', 'net_name6', 'net_type6', 'net_ip6', 'net_name7', 'net_type7', 'net_ip7', 'net_name8', 'net_type8', 'net_ip8', 'net_name9', 'net_type9', 'net_ip9'];
var EDIT_FIELDS_OS = ['os_family', 'os_version'];
var EDIT_FIELDS_OTHER = ['status', 'allocated', 'alloc_deadline', 'purchase_time', 'arrival_time', 'stock_time', 'maintain_time_begin', 'maintain_time_end', 'description'];

var selectAry = ['rack_code','cloud_type','computer_amount','net_type1','net_type2','net_type3','net_type4','net_type5','net_type6','net_type7','net_type8','net_type9','os_family','os_version','allocated','status'];
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
    onConfirm: submitData.bind(null, item),
  });

  $('.modal-body').append('<h4>基础信息</h6>');
  WUI.dataDialog.create({
    $el: $('.modal-body'),
    meta: META,
    list: item,
    buttonHide: true,
    fields: EDIT_FIELDS_BASIC,
    htmlAppend: true
  });
  $('.modal-body').append('<h4>网络信息</h6>');
  WUI.dataDialog.create({
    $el: $('.modal-body'),
    meta: META,
    list: item,
    buttonHide: true,
    fields: EDIT_FIELDS_NET,
    htmlAppend: true
  });
  $('.modal-body').append('<h4>OS信息</h6>');
  WUI.dataDialog.create({
    $el: $('.modal-body'),
    meta: META,
    list: item,
    buttonHide: true,
    fields: EDIT_FIELDS_OS,
    htmlAppend: true
  });
  $('.modal-body').append('<h4>其他信息</h6>');
  WUI.dataDialog.create({
    $el: $('.modal-body'),
    meta: META,
    list: item,
    buttonHide: true,
    fields: EDIT_FIELDS_OTHER,
    htmlAppend: true
  });
};

// Load Page
WUI.ready = function () {
  // 调取IDC列表，添加可选IDC_code
  WUI.ajax({
    url: DOMAIN.CMDB + '/web/rack/query',
    method: 'POST',
    jsonData: {}
  }).then(function (resp) {
    $.each(resp.list, function(i,e){
      var _option = {
        label: e.code,
        value: e.code
      }
      META['rack_code'].options.push(_option);
    });
  }).then(function(){
    queryDictionary('server');
  });

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '首页',
      url: '/cmdb/home.html'
    } , {
      name: '服务器'
    }]
  });
}
// Keep this function
$(function () {
  WUI.init({
    system: 'cmdb'
  });
});
