'use strict';
var t = WUI.t;
// Constants
var PAGE_SIZE = 20;
// For i18n
var META = {};
var TABLE_FIELDS = ['id', 'name', 'age', 'birthday', 'email', 'status'];
var FILTER_FIELDS = ['name', 'age', 'birthday', 'status'];
var EDIT_FIELDS = ['name', 'age', 'birthday', 'email', 'status'];

// Load Page
WUI.ready = function () {
  // For i18n
  META = {
    id: { label: t('用户ID') },
    name: { label: t('用户姓名'), required: true, maxLength: 20 },
    email: { label: 'Email', type: 'email', required: true, maxLength: 11 },
    age: { label: t('年龄'), required: true, type: 'number' },
    birthday: { label: t('生日'), type: 'date', format: 'YYYY-DD-MM' },
    status: {
      label: t('用户状态'),
      type: 'select',
      options: [{
        label: t('未开户'),
        value: 0
      }, {
        label: t('未激活'),
        value: 1
      }, {
        label: t('正常'),
        value: 2
      }, {
        label: t('已销户'),
        value: 3
      }]
    }
  };

  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: t('图片延迟加载页面')
    }]
  });

  $(".lazy").lazyload({
    effect : "fadeIn"
  });


}

// Keep this function
$(function () {
  WUI.init({
    system: 'sample',
    // locale: 'en'
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzYW1wbGUvbGF6eS1pbWFnZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG52YXIgdCA9IFdVSS50O1xuLy8gQ29uc3RhbnRzXG52YXIgUEFHRV9TSVpFID0gMjA7XG4vLyBGb3IgaTE4blxudmFyIE1FVEEgPSB7fTtcbnZhciBUQUJMRV9GSUVMRFMgPSBbJ2lkJywgJ25hbWUnLCAnYWdlJywgJ2JpcnRoZGF5JywgJ2VtYWlsJywgJ3N0YXR1cyddO1xudmFyIEZJTFRFUl9GSUVMRFMgPSBbJ25hbWUnLCAnYWdlJywgJ2JpcnRoZGF5JywgJ3N0YXR1cyddO1xudmFyIEVESVRfRklFTERTID0gWyduYW1lJywgJ2FnZScsICdiaXJ0aGRheScsICdlbWFpbCcsICdzdGF0dXMnXTtcblxuLy8gTG9hZCBQYWdlXG5XVUkucmVhZHkgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIEZvciBpMThuXG4gIE1FVEEgPSB7XG4gICAgaWQ6IHsgbGFiZWw6IHQoJ+eUqOaIt0lEJykgfSxcbiAgICBuYW1lOiB7IGxhYmVsOiB0KCfnlKjmiLflp5PlkI0nKSwgcmVxdWlyZWQ6IHRydWUsIG1heExlbmd0aDogMjAgfSxcbiAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJywgcmVxdWlyZWQ6IHRydWUsIG1heExlbmd0aDogMTEgfSxcbiAgICBhZ2U6IHsgbGFiZWw6IHQoJ+W5tOm+hCcpLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSxcbiAgICBiaXJ0aGRheTogeyBsYWJlbDogdCgn55Sf5pelJyksIHR5cGU6ICdkYXRlJywgZm9ybWF0OiAnWVlZWS1ERC1NTScgfSxcbiAgICBzdGF0dXM6IHtcbiAgICAgIGxhYmVsOiB0KCfnlKjmiLfnirbmgIEnKSxcbiAgICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgICAgb3B0aW9uczogW3tcbiAgICAgICAgbGFiZWw6IHQoJ+acquW8gOaItycpLFxuICAgICAgICB2YWx1ZTogMFxuICAgICAgfSwge1xuICAgICAgICBsYWJlbDogdCgn5pyq5r+A5rS7JyksXG4gICAgICAgIHZhbHVlOiAxXG4gICAgICB9LCB7XG4gICAgICAgIGxhYmVsOiB0KCfmraPluLgnKSxcbiAgICAgICAgdmFsdWU6IDJcbiAgICAgIH0sIHtcbiAgICAgICAgbGFiZWw6IHQoJ+W3sumUgOaItycpLFxuICAgICAgICB2YWx1ZTogM1xuICAgICAgfV1cbiAgICB9XG4gIH07XG5cbiAgV1VJLkNvbnRlbnRIZWFkZXIuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5jb250ZW50LWhlYWRlcicpLFxuICAgIG1ldGE6IFt7XG4gICAgICBuYW1lOiB0KCflm77niYflu7bov5/liqDovb3pobXpnaInKVxuICAgIH1dXG4gIH0pO1xuXG4gICQoXCIubGF6eVwiKS5sYXp5bG9hZCh7XG4gICAgZWZmZWN0IDogXCJmYWRlSW5cIlxuICB9KTtcblxuXG59XG5cbi8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdzYW1wbGUnLFxuICAgIC8vIGxvY2FsZTogJ2VuJ1xuICB9KTtcbn0pO1xuIl0sImZpbGUiOiJzYW1wbGUvbGF6eS1pbWFnZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
