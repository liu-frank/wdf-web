'use strict';
// Constants
var CMDB_API = {
  table: 'project', // 表名
  showCloumn: '/web/people/updatePeopleShowColumn', // 个人展示列
  relation: '/web/project/relation/query', // 关系查询
  relationDownload: '/web/project/relation/download', // 关系下载
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addProject', // 增
  delete: '/web/deleteProjects', // 删
  update: '/web/updateProject', // 改
  column: '/web/project/column', // 查询条件
  query: '/web/project/query', // 查
  export: '/web/excel/download/project', // export
  import: '/web/excel/upload/project' // import
};
META['code'] = { label: '应用_code', required: true, maxLength: 200 };
META['stock_time'] = { label: '上线时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 200 };
var EDIT_FIELDS = ['code', 'name', 'version', 'stock_time', 'insure', 'description'];

var selectAry = ['insure'];
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

// Load Page
WUI.ready = function () {
  // meta的元素数据字典 => cloumn数据 => 查询数据
  queryDictionary('project');

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '首页',
      url: '/cmdb/home.html'
    } , {
      name: '应用'
    }]
  });
}
// Keep this function
$(function () {
  WUI.init({
    system: 'cmdb'
  });
});
