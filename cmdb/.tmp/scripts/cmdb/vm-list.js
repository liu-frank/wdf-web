'use strict';
// Constants
var CMDB_API = {
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addVm', // 增
  delete: '/web/deleteVms', // 删
  update: '/web/updateVm', // 改
  column: '/web/vm/column', // 查询条件
  query: '/web/vm/query', // 查
  export: '/web/excel/download/vm', // export
  import: '/web/excel/upload/vm' // import
};
META['code'] = { label: '虚拟机_code', required: true, maxLength:30 };
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjbWRiL3ZtLWxpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLy8gQ29uc3RhbnRzXG52YXIgQ01EQl9BUEkgPSB7XG4gIHF1ZXJ5RGljdGlvbmFyeTogJy93ZWIvcXVlcnlEaWN0aW9uYXJ5JywgLy8g5pWw5o2u5a2X5YW4XG4gIGFkZDogJy93ZWIvYWRkVm0nLCAvLyDlop5cbiAgZGVsZXRlOiAnL3dlYi9kZWxldGVWbXMnLCAvLyDliKBcbiAgdXBkYXRlOiAnL3dlYi91cGRhdGVWbScsIC8vIOaUuVxuICBjb2x1bW46ICcvd2ViL3ZtL2NvbHVtbicsIC8vIOafpeivouadoeS7tlxuICBxdWVyeTogJy93ZWIvdm0vcXVlcnknLCAvLyDmn6VcbiAgZXhwb3J0OiAnL3dlYi9leGNlbC9kb3dubG9hZC92bScsIC8vIGV4cG9ydFxuICBpbXBvcnQ6ICcvd2ViL2V4Y2VsL3VwbG9hZC92bScgLy8gaW1wb3J0XG59O1xuTUVUQVsnY29kZSddID0geyBsYWJlbDogJ+iZmuaLn+acul9jb2RlJywgcmVxdWlyZWQ6IHRydWUsIG1heExlbmd0aDozMCB9O1xudmFyIEVESVRfRklFTERTX0JBU0lDID0gWydjb2RlJywgJ3NlcnZlcl9jb2RlJywgJ2NwdScsICdjbG91ZF90eXBlJywgJ21lbW9yeScsICdoYXJkZGlzaycsICdob3N0bmFtZScsICdvcHRpb25hbCddO1xudmFyIEVESVRfRklFTERTX05FVCA9IFsnbmV0X25hbWUxJywgJ25ldF90eXBlMScsICduZXRfaXAxJywgJ25ldF9uYW1lMicsICduZXRfdHlwZTInLCAnbmV0X2lwMicsICduZXRfbmFtZTMnLCAnbmV0X3R5cGUzJywgJ25ldF9pcDMnLCAnbmV0X25hbWU0JywgJ25ldF90eXBlNCcsICduZXRfaXA0JywgJ25ldF9uYW1lNScsICduZXRfdHlwZTUnLCAnbmV0X2lwNScsICduZXRfbmFtZTYnLCAnbmV0X3R5cGU2JywgJ25ldF9pcDYnLCAnbmV0X25hbWU3JywgJ25ldF90eXBlNycsICduZXRfaXA3JywgJ25ldF9uYW1lOCcsICduZXRfdHlwZTgnLCAnbmV0X2lwOCcsICduZXRfbmFtZTknLCAnbmV0X3R5cGU5JywgJ25ldF9pcDknXTtcbnZhciBFRElUX0ZJRUxEU19PUyA9IFsnb3NfZmFtaWx5JywgJ29zX3ZlcnNpb24nXTtcbnZhciBFRElUX0ZJRUxEU19PVEhFUiA9IFsnc3RhdHVzJywgJ2FsbG9jYXRlZCcsICdhbGxvY19kZWFkbGluZScsICdzdG9ja190aW1lJywgJ2Rlc2NyaXB0aW9uJ107XG5cbnZhciBzZWxlY3RBcnkgPSBbJ2Nsb3VkX3R5cGUnLCduZXRfdHlwZTEnLCduZXRfdHlwZTInLCduZXRfdHlwZTMnLCduZXRfdHlwZTQnLCduZXRfdHlwZTUnLCduZXRfdHlwZTYnLCduZXRfdHlwZTcnLCduZXRfdHlwZTgnLCduZXRfdHlwZTknLCdvc19mYW1pbHknLCdvc192ZXJzaW9uJywnYWxsb2NhdGVkJywnc3RhdHVzJ107XG52YXIgY3JlYXRlRGF0YSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIC8vIOWIneWni+WMlnNlbGVjdFxuICAkLmVhY2goc2VsZWN0QXJ5LGZ1bmN0aW9uKGksIGUpe1xuICAgIGZvcih2YXIgaj0wO2o8TUVUQVtlXS5vcHRpb25zLmxlbmd0aDtqKyspe1xuICAgICAgaWYgKE1FVEFbZV0ub3B0aW9uc1tqXS5sYWJlbCA9PSBpdGVtW2VdKSB7XG4gICAgICAgIE1FVEFbZV0ub3B0aW9uc1tqXS5zZWxlY3QgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgTUVUQVtlXS5vcHRpb25zW2pdLnNlbGVjdCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgV1VJLk1vZGFsRGlhbG9nLmNyZWF0ZSh7XG4gICAgb25Db25maXJtOiBzdWJtaXREYXRhLmJpbmQobnVsbCwgaXRlbSksXG4gIH0pO1xuXG4gICQoJy5tb2RhbC1ib2R5JykuYXBwZW5kKCc8aDQ+5Z+656GA5L+h5oGvPC9oNj4nKTtcbiAgV1VJLmRhdGFEaWFsb2cuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JyksXG4gICAgbWV0YTogTUVUQSxcbiAgICBsaXN0OiBpdGVtLFxuICAgIGJ1dHRvbkhpZGU6IHRydWUsXG4gICAgZmllbGRzOiBFRElUX0ZJRUxEU19CQVNJQyxcbiAgICBodG1sQXBwZW5kOiB0cnVlXG4gIH0pO1xuICAkKCcubW9kYWwtYm9keScpLmFwcGVuZCgnPGg0Pue9kee7nOS/oeaBrzwvaDY+Jyk7XG4gIFdVSS5kYXRhRGlhbG9nLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcubW9kYWwtYm9keScpLFxuICAgIG1ldGE6IE1FVEEsXG4gICAgbGlzdDogaXRlbSxcbiAgICBidXR0b25IaWRlOiB0cnVlLFxuICAgIGZpZWxkczogRURJVF9GSUVMRFNfTkVULFxuICAgIGh0bWxBcHBlbmQ6IHRydWVcbiAgfSk7XG4gICQoJy5tb2RhbC1ib2R5JykuYXBwZW5kKCc8aDQ+T1Pkv6Hmga88L2g2PicpO1xuICBXVUkuZGF0YURpYWxvZy5jcmVhdGUoe1xuICAgICRlbDogJCgnLm1vZGFsLWJvZHknKSxcbiAgICBtZXRhOiBNRVRBLFxuICAgIGxpc3Q6IGl0ZW0sXG4gICAgYnV0dG9uSGlkZTogdHJ1ZSxcbiAgICBmaWVsZHM6IEVESVRfRklFTERTX09TLFxuICAgIGh0bWxBcHBlbmQ6IHRydWVcbiAgfSk7XG4gICQoJy5tb2RhbC1ib2R5JykuYXBwZW5kKCc8aDQ+5YW25LuW5L+h5oGvPC9oNj4nKTtcbiAgV1VJLmRhdGFEaWFsb2cuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JyksXG4gICAgbWV0YTogTUVUQSxcbiAgICBsaXN0OiBpdGVtLFxuICAgIGJ1dHRvbkhpZGU6IHRydWUsXG4gICAgZmllbGRzOiBFRElUX0ZJRUxEU19PVEhFUixcbiAgICBodG1sQXBwZW5kOiB0cnVlXG4gIH0pO1xufTtcblxuLy8gTG9hZCBQYWdlXG5XVUkucmVhZHkgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIG1ldGHnmoTlhYPntKDmlbDmja7lrZflhbggPT4gY2xvdW1u5pWw5o2uID0+IOafpeivouaVsOaNrlxuICBxdWVyeURpY3Rpb25hcnkoJ3ZtJyk7XG5cbiAgLy8g6Z2i5YyF5bGRXG4gIFdVSS5Db250ZW50SGVhZGVyLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcuY29udGVudC1oZWFkZXInKSxcbiAgICBtZXRhOiBbe1xuICAgICAgbmFtZTogJ+iZmuaLn+acuidcbiAgICB9XVxuICB9KTtcbn1cbi8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdjbWRiJ1xuICB9KTtcbn0pO1xuIl0sImZpbGUiOiJjbWRiL3ZtLWxpc3QuanMifQ==
