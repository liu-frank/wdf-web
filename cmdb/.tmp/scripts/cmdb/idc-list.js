'use strict';
// Constants
var CMDB_API = {
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addRack', // 增
  delete: '/web/deleteRacks', // 删
  update: '/web/updateRack', // 改
  column: '/web/rack/column', // 查询条件
  query: '/web/rack/query', // 查
  export: '/web/excel/download/rack', // export
  import: '/web/excel/upload/rack' // import
};
META['code'] = { label: 'IDC_code', required: true, maxLength:30 };
var EDIT_FIELDS = ['code', 'location', 'rack_region', 'rack', 'status', 'computer_amount', 'description'];

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
  queryDictionary('rack');

  // 面包屑
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjbWRiL2lkYy1saXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8vIENvbnN0YW50c1xudmFyIENNREJfQVBJID0ge1xuICBxdWVyeURpY3Rpb25hcnk6ICcvd2ViL3F1ZXJ5RGljdGlvbmFyeScsIC8vIOaVsOaNruWtl+WFuFxuICBhZGQ6ICcvd2ViL2FkZFJhY2snLCAvLyDlop5cbiAgZGVsZXRlOiAnL3dlYi9kZWxldGVSYWNrcycsIC8vIOWIoFxuICB1cGRhdGU6ICcvd2ViL3VwZGF0ZVJhY2snLCAvLyDmlLlcbiAgY29sdW1uOiAnL3dlYi9yYWNrL2NvbHVtbicsIC8vIOafpeivouadoeS7tlxuICBxdWVyeTogJy93ZWIvcmFjay9xdWVyeScsIC8vIOafpVxuICBleHBvcnQ6ICcvd2ViL2V4Y2VsL2Rvd25sb2FkL3JhY2snLCAvLyBleHBvcnRcbiAgaW1wb3J0OiAnL3dlYi9leGNlbC91cGxvYWQvcmFjaycgLy8gaW1wb3J0XG59O1xuTUVUQVsnY29kZSddID0geyBsYWJlbDogJ0lEQ19jb2RlJywgcmVxdWlyZWQ6IHRydWUsIG1heExlbmd0aDozMCB9O1xudmFyIEVESVRfRklFTERTID0gWydjb2RlJywgJ2xvY2F0aW9uJywgJ3JhY2tfcmVnaW9uJywgJ3JhY2snLCAnc3RhdHVzJywgJ2NvbXB1dGVyX2Ftb3VudCcsICdkZXNjcmlwdGlvbiddO1xuXG52YXIgc2VsZWN0QXJ5ID0gWydzdGF0dXMnLCAnY29tcHV0ZXJfYW1vdW50J107XG52YXIgY3JlYXRlRGF0YSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIC8vIOWIneWni+WMlnNlbGVjdFxuICAkLmVhY2goc2VsZWN0QXJ5LGZ1bmN0aW9uKGksIGUpe1xuICAgIGZvcih2YXIgaj0wO2o8TUVUQVtlXS5vcHRpb25zLmxlbmd0aDtqKyspe1xuICAgICAgaWYgKE1FVEFbZV0ub3B0aW9uc1tqXS5sYWJlbCA9PSBpdGVtW2VdKSB7XG4gICAgICAgIE1FVEFbZV0ub3B0aW9uc1tqXS5zZWxlY3QgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgTUVUQVtlXS5vcHRpb25zW2pdLnNlbGVjdCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgV1VJLk1vZGFsRGlhbG9nLmNyZWF0ZSh7XG4gICAgYnV0dG9uSGlkZTogdHJ1ZSxcbiAgfSk7XG5cbiAgV1VJLmRhdGFEaWFsb2cuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JyksXG4gICAgZGlhbG9nUG9wOnRydWUsXG4gICAgbWV0YTogTUVUQSxcbiAgICBsaXN0OiBpdGVtLFxuICAgIGJ1dHRvbkhpZGU6IGZhbHNlLFxuICAgIG9uQ29uZmlybTogc3VibWl0RGF0YS5iaW5kKG51bGwsIGl0ZW0pLFxuICAgIGZpZWxkczogRURJVF9GSUVMRFNcbiAgfSk7XG59O1xuXG4vLyBMb2FkIFBhZ2VcbldVSS5yZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gbWV0YeeahOWFg+e0oOaVsOaNruWtl+WFuCA9PiBjbG91bW7mlbDmja4gPT4g5p+l6K+i5pWw5o2uXG4gIHF1ZXJ5RGljdGlvbmFyeSgncmFjaycpO1xuXG4gIC8vIOmdouWMheWxkVxuICBXVUkuQ29udGVudEhlYWRlci5jcmVhdGUoe1xuICAgICRlbDogJCgnLmNvbnRlbnQtaGVhZGVyJyksXG4gICAgbWV0YTogW3tcbiAgICAgIG5hbWU6ICfkvY3nva4nXG4gICAgfV1cbiAgfSk7XG59XG4vLyBLZWVwIHRoaXMgZnVuY3Rpb25cbiQoZnVuY3Rpb24gKCkge1xuICBXVUkuaW5pdCh7XG4gICAgc3lzdGVtOiAnY21kYidcbiAgfSk7XG59KTtcbiJdLCJmaWxlIjoiY21kYi9pZGMtbGlzdC5qcyJ9
