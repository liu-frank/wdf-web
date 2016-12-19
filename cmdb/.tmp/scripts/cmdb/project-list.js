'use strict';
// Constants
var CMDB_API = {
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addProject', // 增
  delete: '/web/deleteProjects', // 删
  update: '/web/updateProject', // 改
  column: '/web/project/column', // 查询条件
  query: '/web/project/query', // 查
  export: '/web/excel/download/project', // export
  import: '/web/excel/upload/project' // import
};
META['code'] = { label: '应用_code', required: true, maxLength:30 };
META['stock_time'] = { label: '上线时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 30 };
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjbWRiL3Byb2plY3QtbGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4vLyBDb25zdGFudHNcbnZhciBDTURCX0FQSSA9IHtcbiAgcXVlcnlEaWN0aW9uYXJ5OiAnL3dlYi9xdWVyeURpY3Rpb25hcnknLCAvLyDmlbDmja7lrZflhbhcbiAgYWRkOiAnL3dlYi9hZGRQcm9qZWN0JywgLy8g5aKeXG4gIGRlbGV0ZTogJy93ZWIvZGVsZXRlUHJvamVjdHMnLCAvLyDliKBcbiAgdXBkYXRlOiAnL3dlYi91cGRhdGVQcm9qZWN0JywgLy8g5pS5XG4gIGNvbHVtbjogJy93ZWIvcHJvamVjdC9jb2x1bW4nLCAvLyDmn6Xor6LmnaHku7ZcbiAgcXVlcnk6ICcvd2ViL3Byb2plY3QvcXVlcnknLCAvLyDmn6VcbiAgZXhwb3J0OiAnL3dlYi9leGNlbC9kb3dubG9hZC9wcm9qZWN0JywgLy8gZXhwb3J0XG4gIGltcG9ydDogJy93ZWIvZXhjZWwvdXBsb2FkL3Byb2plY3QnIC8vIGltcG9ydFxufTtcbk1FVEFbJ2NvZGUnXSA9IHsgbGFiZWw6ICflupTnlKhfY29kZScsIHJlcXVpcmVkOiB0cnVlLCBtYXhMZW5ndGg6MzAgfTtcbk1FVEFbJ3N0b2NrX3RpbWUnXSA9IHsgbGFiZWw6ICfkuIrnur/ml7bpl7QnLCB0eXBlOiAnZGF0ZUNtZGInLCBmb3JtYXQ6ICd5eXl5LURELU1NJywgbWF4TGVuZ3RoOiAzMCB9O1xudmFyIEVESVRfRklFTERTID0gWydjb2RlJywgJ25hbWUnLCAndmVyc2lvbicsICdzdG9ja190aW1lJywgJ2luc3VyZScsICdkZXNjcmlwdGlvbiddO1xuXG52YXIgc2VsZWN0QXJ5ID0gWydpbnN1cmUnXTtcbnZhciBjcmVhdGVEYXRhID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgLy8g5Yid5aeL5YyWc2VsZWN0XG4gICQuZWFjaChzZWxlY3RBcnksZnVuY3Rpb24oaSwgZSl7XG4gICAgZm9yKHZhciBqPTA7ajxNRVRBW2VdLm9wdGlvbnMubGVuZ3RoO2orKyl7XG4gICAgICBpZiAoTUVUQVtlXS5vcHRpb25zW2pdLmxhYmVsID09IGl0ZW1bZV0pIHtcbiAgICAgICAgTUVUQVtlXS5vcHRpb25zW2pdLnNlbGVjdCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBNRVRBW2VdLm9wdGlvbnNbal0uc2VsZWN0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBXVUkuTW9kYWxEaWFsb2cuY3JlYXRlKHtcbiAgICBidXR0b25IaWRlOiB0cnVlLFxuICB9KTtcblxuICBXVUkuZGF0YURpYWxvZy5jcmVhdGUoe1xuICAgICRlbDogJCgnLm1vZGFsLWJvZHknKSxcbiAgICBkaWFsb2dQb3A6dHJ1ZSxcbiAgICBtZXRhOiBNRVRBLFxuICAgIGxpc3Q6IGl0ZW0sXG4gICAgYnV0dG9uSGlkZTogZmFsc2UsXG4gICAgb25Db25maXJtOiBzdWJtaXREYXRhLmJpbmQobnVsbCwgaXRlbSksXG4gICAgZmllbGRzOiBFRElUX0ZJRUxEU1xuICB9KTtcbn07XG5cbi8vIExvYWQgUGFnZVxuV1VJLnJlYWR5ID0gZnVuY3Rpb24gKCkge1xuICAvLyBtZXRh55qE5YWD57Sg5pWw5o2u5a2X5YW4ID0+IGNsb3VtbuaVsOaNriA9PiDmn6Xor6LmlbDmja5cbiAgcXVlcnlEaWN0aW9uYXJ5KCdwcm9qZWN0Jyk7XG5cbiAgLy8g6Z2i5YyF5bGRXG4gIFdVSS5Db250ZW50SGVhZGVyLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcuY29udGVudC1oZWFkZXInKSxcbiAgICBtZXRhOiBbe1xuICAgICAgbmFtZTogJ+W6lOeUqCdcbiAgICB9XVxuICB9KTtcbn1cbi8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdjbWRiJ1xuICB9KTtcbn0pO1xuIl0sImZpbGUiOiJjbWRiL3Byb2plY3QtbGlzdC5qcyJ9
