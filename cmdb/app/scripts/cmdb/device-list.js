'use strict';
// Constants
var CMDB_API = {
  table: 'device', // 表名
  showCloumn: '/web/people/updatePeopleShowColumn', // 个人展示列
  relation: '/web/device/relation/query', // 关系查询
  relationDownload: '/web/device/relation/download', // 关系下载
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addDevice', // 增
  delete: '/web/deleteDevices', // 删
  update: '/web/updateDevice', // 改
  column: '/web/device/column', // 查询条件
  query: '/web/device/query', // 查
  export: '/web/excel/download/device', // export
  import: '/web/excel/upload/device' // import
};
META['code'] = { label: '网络设备_code', required: true, maxLength: 200 };
var EDIT_FIELDS_BASIC = ['code', 'rack_code', 'model', 'cloud_type', 'serial_number', 'name', 'type', 'computer_amount', 'u_amount', 'manage_ip', 'optional'];
var EDIT_FIELDS_OTHER = ['purchase_time', 'arrival_time', 'stock_time', 'maintain_time_begin', 'maintain_time_end', 'status', 'description'];

var selectAry = ['rack_code', 'cloud_type', 'type', 'computer_amount', 'status'];
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
    queryDictionary('device');
  });

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '首页',
      url: '/cmdb/home.html'
    } , {
      name: '网络设备'
    }]
  });
}
// Keep this function
$(function () {
  WUI.init({
    system: 'cmdb'
  });
});
