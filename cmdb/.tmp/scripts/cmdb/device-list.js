'use strict';
// Constants
var CMDB_API = {
  queryDictionary: '/web/queryDictionary', // 数据字典
  add: '/web/addDevice', // 增
  delete: '/web/deleteDevices', // 删
  update: '/web/updateDevice', // 改
  column: '/web/device/column', // 查询条件
  query: '/web/device/query', // 查
  export: '/web/excel/download/device', // export
  import: '/web/excel/upload/device' // import
};
META['code'] = { label: '网络设备_code', required: true, maxLength:30 };
var EDIT_FIELDS_BASIC = ['code', 'rack_code', 'model', 'cloud_type', 'serial_number', 'name', 'type', 'computer_amount', 'manage_ip', 'optional'];
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjbWRiL2RldmljZS1saXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8vIENvbnN0YW50c1xudmFyIENNREJfQVBJID0ge1xuICBxdWVyeURpY3Rpb25hcnk6ICcvd2ViL3F1ZXJ5RGljdGlvbmFyeScsIC8vIOaVsOaNruWtl+WFuFxuICBhZGQ6ICcvd2ViL2FkZERldmljZScsIC8vIOWinlxuICBkZWxldGU6ICcvd2ViL2RlbGV0ZURldmljZXMnLCAvLyDliKBcbiAgdXBkYXRlOiAnL3dlYi91cGRhdGVEZXZpY2UnLCAvLyDmlLlcbiAgY29sdW1uOiAnL3dlYi9kZXZpY2UvY29sdW1uJywgLy8g5p+l6K+i5p2h5Lu2XG4gIHF1ZXJ5OiAnL3dlYi9kZXZpY2UvcXVlcnknLCAvLyDmn6VcbiAgZXhwb3J0OiAnL3dlYi9leGNlbC9kb3dubG9hZC9kZXZpY2UnLCAvLyBleHBvcnRcbiAgaW1wb3J0OiAnL3dlYi9leGNlbC91cGxvYWQvZGV2aWNlJyAvLyBpbXBvcnRcbn07XG5NRVRBWydjb2RlJ10gPSB7IGxhYmVsOiAn572R57uc6K6+5aSHX2NvZGUnLCByZXF1aXJlZDogdHJ1ZSwgbWF4TGVuZ3RoOjMwIH07XG52YXIgRURJVF9GSUVMRFNfQkFTSUMgPSBbJ2NvZGUnLCAncmFja19jb2RlJywgJ21vZGVsJywgJ2Nsb3VkX3R5cGUnLCAnc2VyaWFsX251bWJlcicsICduYW1lJywgJ3R5cGUnLCAnY29tcHV0ZXJfYW1vdW50JywgJ21hbmFnZV9pcCcsICdvcHRpb25hbCddO1xudmFyIEVESVRfRklFTERTX09USEVSID0gWydwdXJjaGFzZV90aW1lJywgJ2Fycml2YWxfdGltZScsICdzdG9ja190aW1lJywgJ21haW50YWluX3RpbWVfYmVnaW4nLCAnbWFpbnRhaW5fdGltZV9lbmQnLCAnc3RhdHVzJywgJ2Rlc2NyaXB0aW9uJ107XG5cbnZhciBzZWxlY3RBcnkgPSBbJ3JhY2tfY29kZScsICdjbG91ZF90eXBlJywgJ3R5cGUnLCAnY29tcHV0ZXJfYW1vdW50JywgJ3N0YXR1cyddO1xudmFyIGNyZWF0ZURhdGEgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAvLyDliJ3lp4vljJZzZWxlY3RcbiAgJC5lYWNoKHNlbGVjdEFyeSxmdW5jdGlvbihpLCBlKXtcbiAgICBmb3IodmFyIGo9MDtqPE1FVEFbZV0ub3B0aW9ucy5sZW5ndGg7aisrKXtcbiAgICAgIGlmIChNRVRBW2VdLm9wdGlvbnNbal0ubGFiZWwgPT0gaXRlbVtlXSkge1xuICAgICAgICBNRVRBW2VdLm9wdGlvbnNbal0uc2VsZWN0ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE1FVEFbZV0ub3B0aW9uc1tqXS5zZWxlY3QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIFdVSS5Nb2RhbERpYWxvZy5jcmVhdGUoe1xuICAgIG9uQ29uZmlybTogc3VibWl0RGF0YS5iaW5kKG51bGwsIGl0ZW0pLFxuICB9KTtcblxuICAkKCcubW9kYWwtYm9keScpLmFwcGVuZCgnPGg0PuWfuuehgOS/oeaBrzwvaDY+Jyk7XG4gIFdVSS5kYXRhRGlhbG9nLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcubW9kYWwtYm9keScpLFxuICAgIG1ldGE6IE1FVEEsXG4gICAgbGlzdDogaXRlbSxcbiAgICBidXR0b25IaWRlOiB0cnVlLFxuICAgIGZpZWxkczogRURJVF9GSUVMRFNfQkFTSUMsXG4gICAgaHRtbEFwcGVuZDogdHJ1ZVxuICB9KTtcbiAgJCgnLm1vZGFsLWJvZHknKS5hcHBlbmQoJzxoND7lhbbku5bkv6Hmga88L2g2PicpO1xuICBXVUkuZGF0YURpYWxvZy5jcmVhdGUoe1xuICAgICRlbDogJCgnLm1vZGFsLWJvZHknKSxcbiAgICBtZXRhOiBNRVRBLFxuICAgIGxpc3Q6IGl0ZW0sXG4gICAgYnV0dG9uSGlkZTogdHJ1ZSxcbiAgICBmaWVsZHM6IEVESVRfRklFTERTX09USEVSLFxuICAgIGh0bWxBcHBlbmQ6IHRydWVcbiAgfSk7XG59O1xuXG4vLyBMb2FkIFBhZ2VcbldVSS5yZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8g6LCD5Y+WSURD5YiX6KGo77yM5re75Yqg5Y+v6YCJSURDX2NvZGVcbiAgV1VJLmFqYXgoe1xuICAgIHVybDogRE9NQUlOLkNNREIgKyAnL3dlYi9yYWNrL3F1ZXJ5JyxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBqc29uRGF0YToge31cbiAgfSkudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgICQuZWFjaChyZXNwLmxpc3QsIGZ1bmN0aW9uKGksZSl7XG4gICAgICB2YXIgX29wdGlvbiA9IHtcbiAgICAgICAgbGFiZWw6IGUuY29kZSxcbiAgICAgICAgdmFsdWU6IGUuY29kZVxuICAgICAgfVxuICAgICAgTUVUQVsncmFja19jb2RlJ10ub3B0aW9ucy5wdXNoKF9vcHRpb24pO1xuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgcXVlcnlEaWN0aW9uYXJ5KCdkZXZpY2UnKTtcbiAgfSk7XG5cbiAgLy8g6Z2i5YyF5bGRXG4gIFdVSS5Db250ZW50SGVhZGVyLmNyZWF0ZSh7XG4gICAgJGVsOiAkKCcuY29udGVudC1oZWFkZXInKSxcbiAgICBtZXRhOiBbe1xuICAgICAgbmFtZTogJ+e9kee7nOiuvuWkhydcbiAgICB9XVxuICB9KTtcbn1cbi8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdjbWRiJ1xuICB9KTtcbn0pO1xuIl0sImZpbGUiOiJjbWRiL2RldmljZS1saXN0LmpzIn0=
