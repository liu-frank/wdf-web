'use strict';
var t = WUI.t;
// Load Page
WUI.ready = function () {
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: t('树形页面')
    }]
  });

  //list tree data

  var defaultData = [
    {
      text: 'Parent 1',
      href: '#parent1',
      tags: ['4'],
      nodes: [
        {
          text: 'Child 1',
          href: '#child1',
          tags: ['2'],
          nodes: [
            {
              text: 'Grandchild 1',
              href: '#grandchild1',
              tags: ['0']
            },
            {
              text: 'Grandchild 2',
              href: '#grandchild2',
              tags: ['0']
            }
          ]
        },
        {
          text: 'Child 2',
          href: '#child2',
          tags: ['0']
        }
      ]
    },
    {
      text: 'Parent 2',
      href: '#parent2',
      tags: ['0']
    },
    {
      text: 'Parent 3',
      href: '#parent3',
      tags: ['0']
    },
    {
      text: 'Parent 4',
      href: '#parent4',
      tags: ['0']
    },
    {
      text: 'Parent 5',
      href: '#parent5'  ,
      tags: ['0']
    }
  ];
  $('#treeview1').treeview({
    data: defaultData
  });
  $('#treeview4').treeview({
    color: "#428bca",
    data: defaultData
  });

}

// Keep this function
$(function () {
  WUI.init({
    system: 'sample'
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzYW1wbGUvbGlzdC10cmVlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciB0ID0gV1VJLnQ7XG4vLyBMb2FkIFBhZ2VcbldVSS5yZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgV1VJLkNvbnRlbnRIZWFkZXIuY3JlYXRlKHtcbiAgICAkZWw6ICQoJy5jb250ZW50LWhlYWRlcicpLFxuICAgIG1ldGE6IFt7XG4gICAgICBuYW1lOiB0KCfmoJHlvaLpobXpnaInKVxuICAgIH1dXG4gIH0pO1xuXG4gIC8vbGlzdCB0cmVlIGRhdGFcblxuICB2YXIgZGVmYXVsdERhdGEgPSBbXG4gICAge1xuICAgICAgdGV4dDogJ1BhcmVudCAxJyxcbiAgICAgIGhyZWY6ICcjcGFyZW50MScsXG4gICAgICB0YWdzOiBbJzQnXSxcbiAgICAgIG5vZGVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnQ2hpbGQgMScsXG4gICAgICAgICAgaHJlZjogJyNjaGlsZDEnLFxuICAgICAgICAgIHRhZ3M6IFsnMiddLFxuICAgICAgICAgIG5vZGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdHcmFuZGNoaWxkIDEnLFxuICAgICAgICAgICAgICBocmVmOiAnI2dyYW5kY2hpbGQxJyxcbiAgICAgICAgICAgICAgdGFnczogWycwJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdHcmFuZGNoaWxkIDInLFxuICAgICAgICAgICAgICBocmVmOiAnI2dyYW5kY2hpbGQyJyxcbiAgICAgICAgICAgICAgdGFnczogWycwJ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnQ2hpbGQgMicsXG4gICAgICAgICAgaHJlZjogJyNjaGlsZDInLFxuICAgICAgICAgIHRhZ3M6IFsnMCddXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdQYXJlbnQgMicsXG4gICAgICBocmVmOiAnI3BhcmVudDInLFxuICAgICAgdGFnczogWycwJ11cbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdQYXJlbnQgMycsXG4gICAgICBocmVmOiAnI3BhcmVudDMnLFxuICAgICAgdGFnczogWycwJ11cbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdQYXJlbnQgNCcsXG4gICAgICBocmVmOiAnI3BhcmVudDQnLFxuICAgICAgdGFnczogWycwJ11cbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdQYXJlbnQgNScsXG4gICAgICBocmVmOiAnI3BhcmVudDUnICAsXG4gICAgICB0YWdzOiBbJzAnXVxuICAgIH1cbiAgXTtcbiAgJCgnI3RyZWV2aWV3MScpLnRyZWV2aWV3KHtcbiAgICBkYXRhOiBkZWZhdWx0RGF0YVxuICB9KTtcbiAgJCgnI3RyZWV2aWV3NCcpLnRyZWV2aWV3KHtcbiAgICBjb2xvcjogXCIjNDI4YmNhXCIsXG4gICAgZGF0YTogZGVmYXVsdERhdGFcbiAgfSk7XG5cbn1cblxuLy8gS2VlcCB0aGlzIGZ1bmN0aW9uXG4kKGZ1bmN0aW9uICgpIHtcbiAgV1VJLmluaXQoe1xuICAgIHN5c3RlbTogJ3NhbXBsZSdcbiAgfSk7XG59KTtcbiJdLCJmaWxlIjoic2FtcGxlL2xpc3QtdHJlZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
