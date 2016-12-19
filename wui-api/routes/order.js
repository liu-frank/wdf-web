var express = require('express');
var router = express.Router();
var faker = require('faker');
var TOTAL_COUNT = 130;
var users = [];
var currentTag = null;

function generateTag() {
  currentTag = Math.round(new Date().getTime() / 1000) + '';
  return currentTag;
}

function checkETag(tag) {
  if (currentTag === tag) {
    currentTag = null;
    return true;
  } else {
    return false;
  }
}

for (var id = 0; id < 20; id++) {
  users.push({
    id: id,
    name: faker.name.findName(),
    email: faker.internet.email(),
    age: Math.floor(Math.random() * 80),
    birthday: faker.date.past(),
    status: Math.floor(Math.random() * 4)
  });
}

router.get('/users', function (req, res, next) {
  res.send({
    respHeader: {
      respCode: 'AAS-10000'
    },
    list: users,
    total: TOTAL_COUNT
  });
});

router.get('/users/:id', function (req, res, next) {
  var user = users.filter(function (user) {
    return user.id + '' === req.params.id;
  })[0];
  res.set({
    ETag: generateTag()
  });
  console.log('send: ' + currentTag);
  res.send({
    respHeader: {
      respCode: 'AAS-10000'
    },
    data: user
  });
});

router.post('/users/:id', function (req, res, next) {
  var etag = req.body['_etag'];
  console.log('receive: ' + etag);
  if (checkETag(etag)) {
    res.send({
      respHeader: {
        respCode: 'AAS-10000'
      }
    });
  } else {
    res.send({
      respHeader: {
        respCode: 'AAS-10001',
        respMessage: 'Invaid ETag'
      }
    });
  }
});

router.post('/sso/getResources', function (req, res, next) {
  res.send({
    aasUserPrincipal: {
      aasUserResources: {
        resources: [{
          linkUrl: '/sample/list-page.html/query',
          resourceDisplayName: '查询',
          resourceType: 'button'
        }, {
          linkUrl: '/sample/list-page.html/add',
          resourceDisplayName: '新增',
          resourceType: 'button'
        }, {
          linkUrl: '/sample/list-page.html/edit',
          resourceDisplayName: '编辑',
          resourceType: 'button'
        }, {
          linkUrl: '/sample/list-page.html/delete',
          resourceDisplayName: '删除',
          resourceType: 'button'
        }, {
          linkUrl: '/sample/detail-page.html/edit',
          resourceDisplayName: '确认',
          resourceType: 'button'
        }, {
          levelStructure: '3.2.0.0.0',
          linkUrl: '/order/portal.html?innerUrl=http://10.15.188.191:3000/sample/home.html',
          resourceDisplayName: '一级页面',
          resourceType: 'menu',
          isLeaf: 1
        }, {
          levelStructure: '3.3.0.0.0',
          linkUrl: '/order',
          resourceDisplayName: '一级目录',
          resourceType: 'menu',
          isLeaf: 0
        }, {
          levelStructure: '3.3.1.0.0',
          linkUrl: '/order/portal.html?innerUrl=http://10.15.188.191:3000/sample/blank-page.html',
          parentLevelStructure: '3.3.0.0.0',
          resourceDisplayName: '二级页面',
          resourceType: 'menu',
          isLeaf: 1
        }, {
          levelStructure: '3.3.2.0.0',
          linkUrl: '/order/second',
          parentLevelStructure: '3.3.0.0.0',
          resourceDisplayName: '二级目录',
          resourceType: 'menu',
          isLeaf: 0
        }, {
          levelStructure: '3.3.2.1.0',
          linkUrl: '/order/portal.html?innerUrl=http://10.15.188.191:3000/sample/list-page.html',
          parentLevelStructure: '3.3.2.0.0',
          resourceDisplayName: '三级页面',
          resourceType: 'menu',
          isLeaf: 1
        }, {
          levelStructure: '3.3.2.2.0',
          linkUrl: '/order/third',
          parentLevelStructure: '3.3.2.0.0',
          resourceDisplayName: '三级目录',
          resourceType: 'menu',
          ifLeaf: 0
        }, {
          levelStructure: '3.3.2.2.1',
          linkUrl: '/order/portal.html?innerUrl=http://10.15.188.191:3000/sample/detail-page.html?id=0',
          parentLevelStructure: '3.3.2.2.0',
          resourceDisplayName: '四级页面',
          resourceType: 'menu',
          isLeaf: 1
        }],
        roles: [{
          roleName: 'Administrator'
        }]
      },
      ssoUserName: 'Cloud Mu'
    },
    respHeader: {
      respCode: 'AAS-10000'
    }
  });
});

module.exports = router;
