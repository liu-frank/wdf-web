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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzYW1wbGUvZGV0YWlsLXBhZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLy8gQ29uc3RhbnRzXG52YXIgTUVUQSA9IHtcbiAgaWQ6IHsgbGFiZWw6ICfnlKjmiLdJRCcgfSxcbiAgbmFtZTogeyBsYWJlbDogJ+eUqOaIt+Wnk+WQjScsIHJlYWRPbmx5OnRydWUsIHJlcXVpcmVkOiB0cnVlLCBtYXhMZW5ndGg6IDIwIH0sXG4gIGVtYWlsOiB7IGxhYmVsOiAnRW1haWwnLCAgdHlwZTogJ2VtYWlsJywgZWRpdDp0cnVlLCB2b2lsZDpmdW5jdGlvbihhKXtcbiAgICBjb25zb2xlLmxvZyhhKTtcbiAgICByZXR1cm4gJzEyMyc7XG4gIH0sIHJlcXVpcmVkOiB0cnVlLCBtYXhMZW5ndGg6IDExIH0sXG4gIGFnZTogeyBsYWJlbDogJ+W5tOm+hCcsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyxtYXhMZW5ndGg6IDExLCB2b2lsZDpmdW5jdGlvbigpe3JldHVybiAnSSBhbSBhIHZlcnkgbG9uZyB0aXAgbG9uZyB0aXAgbG9uZyB0aXAgbG9uZyB0aXAgbG9uZyB0aXAgbG9uZyB0aXAgbG9uZyB0aXAgbG9uZyB0aXAnfSB9LFxuICBiaXJ0aGRheTogeyBsYWJlbDogJ+eUn+aXpScsIHR5cGU6ICdkYXRlJywgZm9ybWF0OiAneXl5eS1NTS1kZCcsIG1heExlbmd0aDoxMCwgdm9pbGQ6ZnVuY3Rpb24oKXtyZXR1cm4gJ0kgYW0gYSB2ZXJ5IGxvbmcgdGlwIGxvbmcgdGlwIGxvbmcgdGlwIGxvbmcgdGlwIGxvbmcgdGlwIGxvbmcgdGlwIGxvbmcgdGlwIGxvbmcgdGlwJ30gfSxcbiAgc3RhdHVzOiB7XG4gICAgbGFiZWw6ICfnlKjmiLfnirbmgIEnLFxuICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgIG9wdGlvbnM6IFt7XG4gICAgICBsYWJlbDogJ+acquW8gOaItycsXG4gICAgICB2YWx1ZTogMFxuICAgIH0sIHtcbiAgICAgIGxhYmVsOiAn5pyq5r+A5rS7JyxcbiAgICAgIHZhbHVlOiAxXG4gICAgfSwge1xuICAgICAgbGFiZWw6ICfmraPluLgnLFxuICAgICAgdmFsdWU6IDJcbiAgICB9LCB7XG4gICAgICBsYWJlbDogJ+W3sumUgOaItycsXG4gICAgICB2YWx1ZTogM1xuICAgIH1dXG4gIH1cbn07XG52YXIgRURJVF9GSUVMRFMgPSBbJ2FnZScsICdiaXJ0aGRheScsICduYW1lJywgJ2VtYWlsJywgJ3N0YXR1cycsICdiaXJ0aGRheScsICduYW1lJywgJ2VtYWlsJywgJ3N0YXR1cyddO1xuLy8gQ2FsbGJhY2sgRnVuY3Rpb25zXG52YXIgc3VibWl0RGF0YSA9IGZ1bmN0aW9uICgvKml0ZW0sIGV0YWcqLykge1xuICAvL1dVSS5hamF4KHtcbiAgLy8gIHVybDogJy9zYW1wbGUvd2ViL3YxL3VzZXJzLycgKyBXVUkubGluaygpLmlkLFxuICAvLyAganNvbkRhdGE6ICQuZXh0ZW5kKGl0ZW0sIHtcbiAgLy8gICAgX2V0YWc6IGV0YWdcbiAgLy8gIH0pXG4gIC8vfSkuZG9uZShmdW5jdGlvbiAoKSB7XG4gIC8vICBXVUkuYWxlcnQuY3JlYXRlKHtcbiAgLy8gICAgbWVzc2FnZTogJ+aIkOWKnycsXG4gIC8vICAgIHN1Y2Nlc3M6IHRydWVcbiAgLy8gIH0pO1xuICAvLyAgLyoqXG4gIC8vICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAvLyAgICB3aW5kb3cuY2xvc2UoKTtcbiAgLy8gIH0sIDIwMDApO1xuICAvLyAgKi9cbiAgLy99KTtcbiAgY29uc29sZS5sb2coJzIxMzIxMzEnKTtcbn07XG4vLyBMb2FkIFBhZ2VcbldVSS5yZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgV1VJLkNvbnRlbnRIZWFkZXIuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5jb250ZW50LWhlYWRlcicpLFxuICAgIG1ldGE6IFt7XG4gICAgICBuYW1lOiAn5YiX6KGo6aG16Z2iJyxcbiAgICAgIHVybDogJ2xpc3QtcGFnZS5odG1sJ1xuICAgIH0sIHtcbiAgICAgIG5hbWU6ICfnvJbovpEnXG4gICAgfV1cbiAgfSk7XG5cbiAgV1VJLmFqYXgoe1xuICAgIHVybDogJy9zYW1wbGUvd2ViL3YxL3VzZXJzLycgKyBXVUkubGluaygpLmlkLFxuICAgIG1ldGhvZDogJ0dFVCdcbiAgfSkuZG9uZShmdW5jdGlvbiAocmVzcCkge1xuICAgIHZhciB1c2VyID0gcmVzcC5kYXRhO1xuICAgIHZhciBlZGl0UmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9lZGl0Jyk7XG5cbiAgICBXVUkuZGF0YURpYWxvZy5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcjZGV0YWlsLWluZm8nKSxcbiAgICAgIG1ldGE6IE1FVEEsXG4gICAgICBsaXN0OiB1c2VyLFxuICAgICAgZmllbGRzOiBFRElUX0ZJRUxEUyxcbiAgICAgIGNvbmZpcm1CdXR0b246IGVkaXRSZXNvdXJjZSAmJiBlZGl0UmVzb3VyY2UucmVzb3VyY2VEaXNwbGF5TmFtZSxcbiAgICAgIG9uQ29uZmlybTogc3VibWl0RGF0YS5iaW5kKG51bGwsIHVzZXIsIHJlc3AuZXRhZyksXG4gICAgICBvbkNhbmNlbDogd2luZG93LmNsb3NlXG4gICAgfSk7XG4gIH0pO1xufTtcbi8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdzYW1wbGUnXG4gIH0pO1xufSk7XG4iXSwiZmlsZSI6InNhbXBsZS9kZXRhaWwtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
