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
