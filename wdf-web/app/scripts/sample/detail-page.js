'use strict';
// Constants
var META = {
  id: { label: '用户ID' },
  name: { label: '用户姓名', readOnly:true, required: true, maxLength: 20 },
  email: { label: 'Email',  type: 'email', edit:true, voild:function(a){
    console.log(a);
    return '123';
  }, required: true, maxLength: 11 },
  age: { label: '年龄', required: true, type: 'number',maxLength: 11, voild:function(){return 'I am a very long tip long tip long tip long tip long tip long tip long tip long tip'} },
  birthday: { label: '生日', type: 'date', format: 'yyyy-MM-dd', maxLength:10, voild:function(){return 'I am a very long tip long tip long tip long tip long tip long tip long tip long tip'} },
  status: {
    label: '用户状态',
    type: 'select',
    options: [{
      label: '未开户',
      value: 0
    }, {
      label: '未激活',
      value: 1
    }, {
      label: '正常',
      value: 2
    }, {
      label: '已销户',
      value: 3
    }]
  }
};
var EDIT_FIELDS = ['age', 'birthday', 'name', 'email', 'status', 'birthday', 'name', 'email', 'status'];
// Callback Functions
var submitData = function (/*item, etag*/) {
  //WUI.ajax({
  //  url: '/sample/web/v1/users/' + WUI.link().id,
  //  jsonData: $.extend(item, {
  //    _etag: etag
  //  })
  //}).done(function () {
  //  WUI.alert.create({
  //    message: '成功',
  //    success: true
  //  });
  //  /**
  //  setTimeout(function() {
  //    window.close();
  //  }, 2000);
  //  */
  //});
  console.log('2132131');
};
// Load Page
WUI.ready = function () {
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '列表页面',
      url: 'list-page.html'
    }, {
      name: '编辑'
    }]
  });

  WUI.ajax({
    url: '/sample/web/v1/users/' + WUI.link().id,
    method: 'GET'
  }).done(function (resp) {
    var user = resp.data;
    var editResource = WUI.getResource('/edit');

    WUI.dataDialog.create({
      $el: $('#detail-info'),
      meta: META,
      list: user,
      fields: EDIT_FIELDS,
      confirmButton: editResource && editResource.resourceDisplayName,
      onConfirm: submitData.bind(null, user, resp.etag),
      onCancel: window.close
    });
  });
};
// Keep this function
$(function () {
  WUI.init({
    system: 'sample'
  });
});
