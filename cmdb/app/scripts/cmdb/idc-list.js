'use strict';
// Constants
var CMDB_API = {
  table: 'rack', // 表名
  showCloumn: '/web/people/updatePeopleShowColumn', // 个人展示列
  relation: '/web/rack/relation/query', // 关系查询
  relationDownload: '/web/rack/relation/download', // 关系下载
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addRack', // 增
  delete: '/web/deleteRacks', // 删
  update: '/web/updateRack', // 改
  column: '/web/rack/column', // 查询条件
  query: '/web/rack/query', // 查
  export: '/web/excel/download/rack', // export
  import: '/web/excel/upload/rack' // import
};
META['code'] = { label: 'IDC_code', required: true, maxLength: 200 };
var EDIT_FIELDS = ['code', 'location', 'rack_region', 'rack', 'status', 'computer_amount','stock_time', 'description'];

var selectAry = ['status', 'computer_amount'];
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

  WUI.dataDialog.create({
    $el: $('.modal-body'),
    meta: META,
    list: item,
    buttonHide: true,
    fields: EDIT_FIELDS,
    htmlAppend: true
  });
};

// Load Page
WUI.ready = function () {
  // meta的元素数据字典 => cloumn数据 => 查询数据
  queryDictionary('rack');

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '首页',
      url: '/cmdb/home.html'
    } , {
      name: '位置'
    }]
  });
}
// Keep this function
$(function () {
  WUI.init({
    system: 'cmdb'
  });
});
