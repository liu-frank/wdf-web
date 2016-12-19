'use strict';
// Constants
var CMDB_API = {
  table: 'vm', // 表名
  showCloumn: '/web/people/updatePeopleShowColumn', // 个人展示列
  relation: '/web/vm/relation/query', // 关系查询
  relationDownload: '/web/vm/relation/download', // 关系下载
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addVm', // 增
  delete: '/web/deleteVms', // 删
  update: '/web/updateVm', // 改
  column: '/web/vm/column', // 查询条件
  query: '/web/vm/query', // 查
  export: '/web/excel/download/vm', // export
  import: '/web/excel/upload/vm' // import
};
META['code'] = { label: '虚拟机_code', required: true, maxLength: 200 };
var EDIT_FIELDS_BASIC = ['code', 'server_code', 'cpu', 'cloud_type', 'memory', 'harddisk', 'hostname', 'optional'];
var EDIT_FIELDS_NET = ['net_name1', 'net_type1', 'net_ip1', 'net_name2', 'net_type2', 'net_ip2', 'net_name3', 'net_type3', 'net_ip3', 'net_name4', 'net_type4', 'net_ip4', 'net_name5', 'net_type5', 'net_ip5', 'net_name6', 'net_type6', 'net_ip6', 'net_name7', 'net_type7', 'net_ip7', 'net_name8', 'net_type8', 'net_ip8', 'net_name9', 'net_type9', 'net_ip9'];
var EDIT_FIELDS_OS = ['os_family', 'os_version'];
var EDIT_FIELDS_OTHER = ['status', 'allocated', 'alloc_deadline', 'stock_time', 'description'];

var selectAry = ['cloud_type','net_type1','net_type2','net_type3','net_type4','net_type5','net_type6','net_type7','net_type8','net_type9','os_family','os_version','allocated','status'];
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
  // meta的元素数据字典 => cloumn数据 => 查询数据
  queryDictionary('vm');

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '首页',
      url: '/cmdb/home.html'
    } , {
      name: '虚拟机'
    }]
  });
}
// Keep this function
$(function () {
  WUI.init({
    system: 'cmdb'
  });
});
