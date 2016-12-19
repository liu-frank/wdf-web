'use strict';
// Constants
var CMDB_API = {
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addServer', // 增
  delete: '/web/deleteServers', // 删
  update: '/web/updateServer', // 改
  column: '/web/server/column', // 查询条件
  query: '/web/server/query', // 查
  export: '/web/excel/download/server', // export
  import: '/web/excel/upload/server' // import
};
META['code'] = { label: '服务器_code', required: true, maxLength:30 };
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjbWRiL3NlcnZlLWxpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLy8gQ29uc3RhbnRzXG52YXIgQ01EQl9BUEkgPSB7XG4gIHF1ZXJ5RGljdGlvbmFyeTogJy93ZWIvcXVlcnlEaWN0aW9uYXJ5JywgLy8g5pWw5o2u5a2X5YW4XG4gIGFkZDogJy93ZWIvYWRkU2VydmVyJywgLy8g5aKeXG4gIGRlbGV0ZTogJy93ZWIvZGVsZXRlU2VydmVycycsIC8vIOWIoFxuICB1cGRhdGU6ICcvd2ViL3VwZGF0ZVNlcnZlcicsIC8vIOaUuVxuICBjb2x1bW46ICcvd2ViL3NlcnZlci9jb2x1bW4nLCAvLyDmn6Xor6LmnaHku7ZcbiAgcXVlcnk6ICcvd2ViL3NlcnZlci9xdWVyeScsIC8vIOafpVxuICBleHBvcnQ6ICcvd2ViL2V4Y2VsL2Rvd25sb2FkL3NlcnZlcicsIC8vIGV4cG9ydFxuICBpbXBvcnQ6ICcvd2ViL2V4Y2VsL3VwbG9hZC9zZXJ2ZXInIC8vIGltcG9ydFxufTtcbk1FVEFbJ2NvZGUnXSA9IHsgbGFiZWw6ICfmnI3liqHlmahfY29kZScsIHJlcXVpcmVkOiB0cnVlLCBtYXhMZW5ndGg6MzAgfTtcbnZhciBFRElUX0ZJRUxEU19CQVNJQyA9IFsnY29kZScsICdyYWNrX2NvZGUnLCAnc2VyaWFsX251bWJlcicsICdjbG91ZF90eXBlJywgJ2NwdScsICdtb2RlbCcsICdtZW1vcnknLCAncmFpZCcsICdoYXJkZGlzaycsICdjb21wdXRlcl9hbW91bnQnLCAndV9hbW91bnQnLCAndHlwaWNhbF9jYXNlJywgJ21hbmFnZV9pcCcsICdob3N0bmFtZScsICdvcHRpb25hbCddO1xudmFyIEVESVRfRklFTERTX05FVCA9IFsnbmV0X25hbWUxJywgJ25ldF90eXBlMScsICduZXRfaXAxJywgJ25ldF9uYW1lMicsICduZXRfdHlwZTInLCAnbmV0X2lwMicsICduZXRfbmFtZTMnLCAnbmV0X3R5cGUzJywgJ25ldF9pcDMnLCAnbmV0X25hbWU0JywgJ25ldF90eXBlNCcsICduZXRfaXA0JywgJ25ldF9uYW1lNScsICduZXRfdHlwZTUnLCAnbmV0X2lwNScsICduZXRfbmFtZTYnLCAnbmV0X3R5cGU2JywgJ25ldF9pcDYnLCAnbmV0X25hbWU3JywgJ25ldF90eXBlNycsICduZXRfaXA3JywgJ25ldF9uYW1lOCcsICduZXRfdHlwZTgnLCAnbmV0X2lwOCcsICduZXRfbmFtZTknLCAnbmV0X3R5cGU5JywgJ25ldF9pcDknXTtcbnZhciBFRElUX0ZJRUxEU19PUyA9IFsnb3NfZmFtaWx5JywgJ29zX3ZlcnNpb24nXTtcbnZhciBFRElUX0ZJRUxEU19PVEhFUiA9IFsnc3RhdHVzJywgJ2FsbG9jYXRlZCcsICdhbGxvY19kZWFkbGluZScsICdwdXJjaGFzZV90aW1lJywgJ2Fycml2YWxfdGltZScsICdzdG9ja190aW1lJywgJ21haW50YWluX3RpbWVfYmVnaW4nLCAnbWFpbnRhaW5fdGltZV9lbmQnLCAnZGVzY3JpcHRpb24nXTtcblxudmFyIHNlbGVjdEFyeSA9IFsncmFja19jb2RlJywnY2xvdWRfdHlwZScsJ2NvbXB1dGVyX2Ftb3VudCcsJ25ldF90eXBlMScsJ25ldF90eXBlMicsJ25ldF90eXBlMycsJ25ldF90eXBlNCcsJ25ldF90eXBlNScsJ25ldF90eXBlNicsJ25ldF90eXBlNycsJ25ldF90eXBlOCcsJ25ldF90eXBlOScsJ29zX2ZhbWlseScsJ29zX3ZlcnNpb24nLCdhbGxvY2F0ZWQnLCdzdGF0dXMnXTtcbnZhciBjcmVhdGVEYXRhID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgLy8g5Yid5aeL5YyWc2VsZWN0XG4gICQuZWFjaChzZWxlY3RBcnksZnVuY3Rpb24oaSwgZSl7XG4gICAgZm9yKHZhciBqPTA7ajxNRVRBW2VdLm9wdGlvbnMubGVuZ3RoO2orKyl7XG4gICAgICBpZiAoTUVUQVtlXS5vcHRpb25zW2pdLmxhYmVsID09IGl0ZW1bZV0pIHtcbiAgICAgICAgTUVUQVtlXS5vcHRpb25zW2pdLnNlbGVjdCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBNRVRBW2VdLm9wdGlvbnNbal0uc2VsZWN0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBXVUkuTW9kYWxEaWFsb2cuY3JlYXRlKHtcbiAgICBvbkNvbmZpcm06IHN1Ym1pdERhdGEuYmluZChudWxsLCBpdGVtKSxcbiAgfSk7XG5cbiAgJCgnLm1vZGFsLWJvZHknKS5hcHBlbmQoJzxoND7ln7rnoYDkv6Hmga88L2g2PicpO1xuICBXVUkuZGF0YURpYWxvZy5jcmVhdGUoe1xuICAgICRlbDogJCgnLm1vZGFsLWJvZHknKSxcbiAgICBtZXRhOiBNRVRBLFxuICAgIGxpc3Q6IGl0ZW0sXG4gICAgYnV0dG9uSGlkZTogdHJ1ZSxcbiAgICBmaWVsZHM6IEVESVRfRklFTERTX0JBU0lDLFxuICAgIGh0bWxBcHBlbmQ6IHRydWVcbiAgfSk7XG4gICQoJy5tb2RhbC1ib2R5JykuYXBwZW5kKCc8aDQ+572R57uc5L+h5oGvPC9oNj4nKTtcbiAgV1VJLmRhdGFEaWFsb2cuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JyksXG4gICAgbWV0YTogTUVUQSxcbiAgICBsaXN0OiBpdGVtLFxuICAgIGJ1dHRvbkhpZGU6IHRydWUsXG4gICAgZmllbGRzOiBFRElUX0ZJRUxEU19ORVQsXG4gICAgaHRtbEFwcGVuZDogdHJ1ZVxuICB9KTtcbiAgJCgnLm1vZGFsLWJvZHknKS5hcHBlbmQoJzxoND5PU+S/oeaBrzwvaDY+Jyk7XG4gIFdVSS5kYXRhRGlhbG9nLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcubW9kYWwtYm9keScpLFxuICAgIG1ldGE6IE1FVEEsXG4gICAgbGlzdDogaXRlbSxcbiAgICBidXR0b25IaWRlOiB0cnVlLFxuICAgIGZpZWxkczogRURJVF9GSUVMRFNfT1MsXG4gICAgaHRtbEFwcGVuZDogdHJ1ZVxuICB9KTtcbiAgJCgnLm1vZGFsLWJvZHknKS5hcHBlbmQoJzxoND7lhbbku5bkv6Hmga88L2g2PicpO1xuICBXVUkuZGF0YURpYWxvZy5jcmVhdGUoe1xuICAgICRlbDogJCgnLm1vZGFsLWJvZHknKSxcbiAgICBtZXRhOiBNRVRBLFxuICAgIGxpc3Q6IGl0ZW0sXG4gICAgYnV0dG9uSGlkZTogdHJ1ZSxcbiAgICBmaWVsZHM6IEVESVRfRklFTERTX09USEVSLFxuICAgIGh0bWxBcHBlbmQ6IHRydWVcbiAgfSk7XG59O1xuXG4vLyBMb2FkIFBhZ2VcbldVSS5yZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8g6LCD5Y+WSURD5YiX6KGo77yM5re75Yqg5Y+v6YCJSURDX2NvZGVcbiAgV1VJLmFqYXgoe1xuICAgIHVybDogRE9NQUlOLkNNREIgKyAnL3dlYi9yYWNrL3F1ZXJ5JyxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBqc29uRGF0YToge31cbiAgfSkudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgICQuZWFjaChyZXNwLmxpc3QsIGZ1bmN0aW9uKGksZSl7XG4gICAgICB2YXIgX29wdGlvbiA9IHtcbiAgICAgICAgbGFiZWw6IGUuY29kZSxcbiAgICAgICAgdmFsdWU6IGUuY29kZVxuICAgICAgfVxuICAgICAgTUVUQVsncmFja19jb2RlJ10ub3B0aW9ucy5wdXNoKF9vcHRpb24pO1xuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgcXVlcnlEaWN0aW9uYXJ5KCdzZXJ2ZXInKTtcbiAgfSk7XG5cbiAgLy8g6Z2i5YyF5bGRXG4gIFdVSS5Db250ZW50SGVhZGVyLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcuY29udGVudC1oZWFkZXInKSxcbiAgICBtZXRhOiBbe1xuICAgICAgbmFtZTogJ+acjeWKoeWZqCdcbiAgICB9XVxuICB9KTtcbn1cbi8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdjbWRiJ1xuICB9KTtcbn0pO1xuIl0sImZpbGUiOiJjbWRiL3NlcnZlLWxpc3QuanMifQ==
