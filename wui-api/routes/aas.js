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
          levelStructure: '1.0.0',
          linkUrl: '/aas',
          resourceDisplayName: '权限管理',
          resourceType: 'menu'
        }, {
          levelStructure: '1.1.0',
          linkUrl: '/aas/account-management',
          parentLevelStructure: '1.0.0',
          resourceDisplayName: '用户管理',
          resourceType: 'menu'
        }, {
          levelStructure: '1.2.0',
          linkUrl: '/aas/role-management',
          parentLevelStructure: '1.0.0',
          resourceDisplayName: '角色管理',
          resourceType: 'menu'
        }, {
          levelStructure: '1.2.1',
          linkUrl: '/aas/role-detail',
          parentLevelStructure: '1.2.0',
          resourceDisplayName: '权限赋予',
          resourceType: 'menu'
        }, {
          levelStructure: '1.3.0',
          linkUrl: '/aas/resource-management',
          parentLevelStructure: '1.0.0',
          resourceDisplayName: '资源管理',
          resourceType: 'menu'
        }, {
          levelStructure: '1.3.1',
          linkUrl: '/aas/resource-detail',
          parentLevelStructure: '1.3.0',
          resourceDisplayName: '资源编辑',
          resourceType: 'menu'
        }, {
          levelStructure: '1.4.0',
          linkUrl: '/aas/group-management',
          parentLevelStructure: '1.0.0',
          resourceDisplayName: '用户组管理',
          resourceType: 'menu'
        }, {
          linkUrl: '/aas/account-management/query',
          resourceDisplayName: '查询',
          resourceType: 'button'
        }, {
          linkUrl: '/aas/account-management/add',
          resourceDisplayName: '新增',
          resourceType: 'button'
        }, {
          linkUrl: '/aas/account-management/modify',
          resourceDisplayName: '编辑',
          resourceType: 'button'
        }, {
          linkUrl: '/ffan/allowance-list.html/delete',
          resourceDisplayName: '删除',
          resourceType: 'button'
        }, {
          linkUrl: '/ffan/allowance-detail.html/edit',
          resourceDisplayName: '确认',
          resourceType: 'button'
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

var orgs = []

for (var i = 1; i <= 5; i++) {
  var company = {
    orgID: '1' + i + '000',
    orgName: '公司#' + i,
    parentOrgID: '1'
  };
  orgs.push(company);

  for (var j = 1; j <= 5; j++) {
    var level1 = {
      orgID: '1' + i + '' + j + '00',
      orgName: '一级部门#' + i + '' + j,
      parentOrgID: '1' + i + '000',
      company: '1' + i + '000'
    };
    orgs.push(level1);

    for (var k = 1; k <= 5; k++) {
      var level2 = {
        orgID: '1' + i + '' + j + '' + k + '0',
        orgName: '二级部门#' + i + '' + j + '' + k,
        parentOrgID: '1' + i + '' + j + '00',
        company: '1' + i + '000'
      };
      orgs.push(level2);

      for (var l = 1; l <= 5; l++) {
        var level3 = {
          orgID: '1' + i + '' + j + '' + k + '' + l,
          orgName: '三级部门#' + i + '' + j + '' + k + '' + l,
          parentOrgID: '1' + i + '' + j + '' + k + '0',
          company: '1' + i + '000'
        };
        orgs.push(level3);
      }
    }
  }
}

router.post('/org/highestorg/query', function (req, res, next) {
  res.send({
    respHeader: {
      respCode: 'AAS-10000'
    },
    orgList: orgs.filter(function(org) {
      return org.parentOrgID === '1'
    })
  });
});


router.post('/org/suborgs/query', function (req, res, next) {
  res.send({
    respHeader: {
      respCode: 'AAS-10000'
    },
    orgList: orgs.filter(function(org) {
      return org.company === req.body.orgID
    })
  });
});

router.post('/org/parentOrgs/query', function (req, res, next) {
  var orgList = [];

  orgList.unshift(orgs.find(function (org) { return org.orgID === req.body.orgID }));

  if (orgList[0].parentOrgID !== '1') {
    orgList.unshift(orgs.find(function (org) { return org.orgID === orgList[0].parentOrgID }))
  }

  if (orgList[0].parentOrgID !== '1') {
    orgList.unshift(orgs.find(function (org) { return org.orgID === orgList[0].parentOrgID }))
  }

  if (orgList[0].parentOrgID !== '1') {
    orgList.unshift(orgs.find(function (org) { return org.orgID === orgList[0].parentOrgID }))
  }

  res.send({
    respHeader: {
      respCode: 'AAS-10000'
    },
    orgList: orgList
  });
});

router.post('/role/query', function (req, res, next) {
  res.send({"respHeader":{"serviceName":null,"respMessage":"成功","sessionId":"1462461678582","reqId":"1476925423996","respCode":"AAS-10000","resMessageExt":null},"appRoleList":[{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"appRoleID":1,"appID":"aas","roleType":"0","roleName":"超级管理员","roleDesc":"拥有系统的所有权限，包括各子系统权限","status":"0","resourceIDList":null,"appName":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"appRoleID":2,"appID":"ams","roleType":"1","roleName":"运营平台管理员","roleDesc":"拥有运营平台所有权限","status":"0","resourceIDList":null,"appName":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"appRoleID":3,"appID":"ams","roleType":"2","roleName":"客服管理岗","roleDesc":"管理客服","status":"0","resourceIDList":null,"appName":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"appRoleID":4,"appID":"ams","roleType":"2","roleName":"客服操作岗","roleDesc":"处理会员问题","status":"0","resourceIDList":null,"appName":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"appRoleID":5,"appID":"ams","roleType":"2","roleName":"风控审核岗","roleDesc":"对客服提交的申请进行审核","status":"0","resourceIDList":null,"appName":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"appRoleID":6,"appID":"aas","roleType":"0","roleName":"测试权限","roleDesc":"测试权限","status":"0","resourceIDList":null,"appName":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"appRoleID":7,"appID":"aas","roleType":"0","roleName":"测试运营","roleDesc":"测试运营","status":"0","resourceIDList":null,"appName":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"appRoleID":8,"appID":"ams","roleType":"0","roleName":"hello","roleDesc":null,"status":"0","resourceIDList":null,"appName":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"appRoleID":9,"appID":"ordercenter","roleType":"0","roleName":"工单管理测试岗","roleDesc":"工单管理测试岗","status":"0","resourceIDList":null,"appName":null}]});
});

router.post('/user/query', function (req, res, next) {
  res.send({"respHeader":{"serviceName":null,"respMessage":"成功","sessionId":"1462461678582","reqId":"1476925424000","respCode":"AAS-10000","resMessageExt":null},"pageNum":0,"pageSize":20,"pages":0,"total":7,"userInfoList":[{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"userID":"u96619190596665442","userType":null,"userName":" 大神经","mobile":"13677777775","email":"15ad125@163.com","iMAccount":"dashen","reportTo":null,"loginPassword":null,"expireDate":null,"ruleID":"6.3","unlockTime":null,"isInitPassword":0,"status":"0","employeeType":null,"modifyPwdDiffDays":0,"pwdRuleValidateDays":0,"orgId":null,"orgName":null,"appRoleIDList":[2],"appLocalRoleIDList":null,"lastModifyPwdDate":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"userID":"u96619190596665441","userType":null,"userName":"运营用户1","mobile":"13166468882","email":"hello11@sina.com","iMAccount":"3333","reportTo":null,"loginPassword":null,"expireDate":null,"ruleID":"6.2","unlockTime":null,"isInitPassword":1,"status":"0","employeeType":null,"modifyPwdDiffDays":0,"pwdRuleValidateDays":0,"orgId":null,"orgName":null,"appRoleIDList":[2],"appLocalRoleIDList":null,"lastModifyPwdDate":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"userID":"u96619190596665440","userType":null,"userName":"运维用户2","mobile":"13166468881","email":"121231@sina.com","iMAccount":"4444","reportTo":null,"loginPassword":null,"expireDate":null,"ruleID":"6.2","unlockTime":null,"isInitPassword":1,"status":"0","employeeType":null,"modifyPwdDiffDays":0,"pwdRuleValidateDays":0,"orgId":null,"orgName":null,"appRoleIDList":[5],"appLocalRoleIDList":null,"lastModifyPwdDate":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"userID":"u96619190596665439","userType":null,"userName":"hello","mobile":"13166468886","email":"hello@sina.com","iMAccount":"2","reportTo":null,"loginPassword":null,"expireDate":null,"ruleID":"5.2","unlockTime":null,"isInitPassword":1,"status":"0","employeeType":null,"modifyPwdDiffDays":0,"pwdRuleValidateDays":0,"orgId":null,"orgName":null,"appRoleIDList":[4],"appLocalRoleIDList":null,"lastModifyPwdDate":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"userID":"u96619190596665438","userType":null,"userName":"1","mobile":"13000000001","email":"1@1.com","iMAccount":"1","reportTo":null,"loginPassword":null,"expireDate":null,"ruleID":"6.4","unlockTime":null,"isInitPassword":1,"status":"0","employeeType":null,"modifyPwdDiffDays":0,"pwdRuleValidateDays":0,"orgId":null,"orgName":null,"appRoleIDList":[1,2,8],"appLocalRoleIDList":null,"lastModifyPwdDate":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"userID":"u240905568485638144","userType":null,"userName":"corncandy","mobile":"13813813888","email":"corncandy@gmail.com","iMAccount":"corncandy","reportTo":null,"loginPassword":null,"expireDate":null,"ruleID":"1.2","unlockTime":null,"isInitPassword":1,"status":"0","employeeType":null,"modifyPwdDiffDays":0,"pwdRuleValidateDays":0,"orgId":null,"orgName":null,"appRoleIDList":[1,2,9],"appLocalRoleIDList":null,"lastModifyPwdDate":null},{"creator":null,"modifier":null,"createTime":null,"lastModifiTime":null,"userID":"admin","userType":"","userName":"朱红霞","mobile":"13000000000","email":"evilboyjava@163.com","iMAccount":"admin","reportTo":null,"loginPassword":null,"expireDate":null,"ruleID":"1.2","unlockTime":null,"isInitPassword":1,"status":"0","employeeType":null,"modifyPwdDiffDays":0,"pwdRuleValidateDays":0,"orgId":null,"orgName":null,"appRoleIDList":[1,2],"appLocalRoleIDList":null,"lastModifyPwdDate":null}]})
});

router.post('/user/upload', function (req, res, next) {
  res.send({
    respHeader: {
      respCode: 'AAS-10000'
    },
    woAcctStatusChangeFiles: [{
      fileID: 'file-1024'
    }],
    uploadTotal: 1000,
    effectiveNumber: 800
  });
});

router.get('/user/download', function (req, res, next) {
  res.send({
    respHeader: {
      respCode: 'AAS-10000'
    }
  });
});

router.post('/user/applyChange', function (req, res, next) {
  res.send({
    respHeader: {
      respCode: 'AAS-10000'
    }
  })
})

router.post('/user/get', function (req, res, next) {
  res.send({
    respHeader: {
      respCode: 'AAS-10000'
    },
    userInfoDTO: {
      "creator":null,
      "modifier":null,
      "createTime":null,
      "lastModifiTime":null,
      "userID":"u96619190596665442",
      "userType":null,
      "userName":"大神经",
      "mobile":"13677777775",
      "email":"15ad125@163.com",
      "iMAccount":"dashen",
      "reportTo":null,
      "loginPassword":null,
      "expireDate":null,
      "ruleID":"6.3",
      "unlockTime":null,
      "isInitPassword":0,
      "status":"0",
      "employeeType": 1,
      "sex": 1,
      "modifyPwdDiffDays":0,
      "pwdRuleValidateDays":0,
      "orgID": '11111',
      "orgName":null,
      "companyOrgID": '11000',
      "appRoleIDList":[2],
      "appLocalRoleIDList":null,
      "lastModifyPwdDate":null
    }
  })
})

router.post('/user/modify', function (req, res, next) {
  res.send({
    respHeader: {
      respCode: 'AAS-10000'
    }
  })
})

router.post('/user/add', function (req, res, next) {
  res.send({
    respHeader: {
      respCode: 'AAS-10000'
    }
  })
})

module.exports = router;
