'use strict';
// Constants
var META = {
  PWID: { label: 'PWID' },
  mobile: { label: '账户手机号' },
  accountStatus: { label: '账户状态' ,options: [
    {label: '创建', value: '0'}, { label: '正常', value: '1'},{ label: '冻结', value: '2'},{ label: '已合并', value: '8'},{ label: '注销', value: '9'}
  ],
  type:'select'
  },
  accountResource: { label: '开户来源' },
  email: { label: 'Email' },
  realNameLevel: { label: '实名认证等级' },
  idType: { label: '证件类型' },
  gender: { label: '性别' },
  id99bill: { label: '快钱会员ID' },
  payMobile: { label: '支付手机号' },
  openTime: { label: '开户时间' },
  openChannel: { label: '开户渠道' },
  accountName: { label: '姓名' },
  authenticationTime: { label: '认证时间' },
  idNumber: { label: '证件号码' },
  accountRegion: { label: '地区' }
};
var TABLE_FIELDS = ['id', 'name', 'email', 'age'];
// Callback functions
var editData = function (item) {
  // window.open('allowance-detail.html?id=' + item.id);
  window.location.href = 'allowance-detail.html?id=' + item.id;
};
// Callback Functions
var submitData = function (item, etag) {
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
};

var queryAcount = function (options) {
  var editResource = WUI.getResource('/edit');

  WUI.ajax({
    url: '/ams/v1/pocketMoney/query/accountDetailList',
    jsonData: {
      mobile: WUI.link().phone,
      pageNum: options.currentPage,
      pageSize: options.pageSize
    }
  }).then(function (resp) {
    WUI.DataTable.create({
      $el: $('#account-table'),
      meta: {
        accountId: { label: '业务账户ID' },
        bizName: { label: '业务名称' },
        accountType: { label: '账户类型',
          options: [
          {label: '储值账户', value: '1'}, { label: '赠送账户', value: '2'}
          ],
          type:'select'
        },
        currentBalance: { label: '当前余额' },
        fromSource: { label: '来源' },
        openTime: { label: '开通时间' },
        accountStatus: { label: '状态',options: [
          {label: '正常', value: '0'}, { label: '冻结', value: '1'},{ label: '删除', value: '-1'}
        ],
          type:'select'},
        bizType: { label: '业务类型', options: [
          {label: '购物金', value: '1'}, { label: '储值', value: '2'}, { label: '快易花', value: '3'}
        ],
          type:'select'}
      },
      fields: ['bizName', 'accountType', 'currentBalance', 'fromSource', 'openTime', 'accountStatus'],
      list: resp.accountDetailList,
      operations: [{
        name: '查看详情',
        callback: function (item) {
          switch(parseInt(item.accountType)) {
            case 1:

                var confirmDialog = WUI.ModalDialog.create({
                  title: '购物金账户详情',
                  onConfirm: function () {
                    confirmDialog.hide();
                  }
                });
                WUI.InfoTable.create({
                  $el: $('.modal-body').addClass('info-table'),
                  meta: {
                    bizName: { label: '业务名称' },
                    accountType: { label: '账户类型',
                      options: [
                        {label: '储值账户', value: '1'}, { label: '赠送账户', value: '2'}
                      ],
                      type:'select'},
                    currentBalance: { label: '当前余额(元)' },
                    fromSource: { label: '开通来源' },
                    openTime: { label: '开通时间' },
                    accountStatus: { label: '账户状态' ,options: [
                      {label: '正常', value: '0'}, { label: '冻结', value: '1'},{ label: '删除', value: '-1'}
                    ],
                      type:'select'},
                    clearTime: { label: '账户清零时间' },
                    clearMoney: { label: '账户清零金额(元)' }
                  },
                  data: item,
                  fields: [[
                    'bizName', 'accountType', 'accountStatus', 'currentBalance',
                    'fromSource', 'openTime', 'clearTime', 'clearMoney'
                  ]]
                });

              break;
            case 2:

                var confirmDialog = WUI.ModalDialog.create({
                  title: '储值账户详情',
                  onConfirm: function () {
                    confirmDialog.hide();
                  }
                });
                WUI.InfoTable.create({
                  $el: $('.modal-body').addClass('info-table'),
                  meta: {
                    bizName: { label: '业务名称' },
                    accountType: { label: '账户类型' ,
                      options: [
                        {label: '储值账户', value: '1'}, { label: '赠送账户', value: '2'}
                      ],
                      type:'select'},
                    currentBalance: { label: '当前余额(元)' },
                    fromSource: { label: '开通来源' },
                    openTime: { label: '开通时间' },
                    accountStatus: { label: '账户状态',options: [
                      {label: '正常', value: '0'}, { label: '冻结', value: '1'},{ label: '删除', value: '-1'}
                    ],
                      type:'select'}
                  },
                  data: item,
                  fields: [[
                    'bizName', 'accountType', 'accountStatus', 'currentBalance',
                    'fromSource', 'openTime'
                  ]]
                });

              break;
            case 3:
                var confirmDialog = WUI.ModalDialog.create({
                  title: '快易花帐户详情',
                  onConfirm: function () {
                    confirmDialog.hide();
                  }
                });
                WUI.InfoTable.create({
                  $el: $('.modal-body').addClass('info-table'),
                  meta: {
                    accountId: { label: '零花钱账户ID' },
                    accountStatus: { label: '账户状态',options: [
                      {label: '正常', value: '0'}, { label: '冻结', value: '1'},{ label: '删除', value: '-1'}
                    ],
                      type:'select'},
                    applyProgress: { label: '申请进度' },
                    applyTime: { label: '申请时间' },
                    applyAmount: { label: '申请额度(元)' },
                    usableAmount: { label: '可用额度(元)' },
                    repayment: { label: '全部待还(元)' },
                    frozenStatus: { label: '冻结状态' },
                    frozenInfo: { label: '冻结信息提示' }
                  },
                  data: item,
                  fields: [[
                    'accountId', 'accountStatus', 'frozenStatus', 'applyProgress',
                    'applyTime', 'applyAmount', 'usableAmount', 'repayment', 'frozenInfo'
                  ]]
                });
              break;
            default:
              break;
          }
        }
      }]
    });
  });
};

var queryHistory = function (options) {
  var editResource = WUI.getResource('/edit');
  WUI.ajax({
    url: '/ams/v1/pocketMoney/query/accountOperateLog',
    jsonData: {
      PWID: WUI.link().id,
      pageSize: options.pageSize,
      pageNum: options.currentPage,
    }
  }).then(function (resp) {
    WUI.DataTable.create({
      $el: $('#history-table'),
      meta: {
        createTime: { label: '时间',type:'date' },
        operator: { label: '操作人' },
        WOType: { label: '操作行为',options: [
          {label: '冻结', value: '90'}, { label: '解冻', value: '91'}],
          type:'select'},
        remark: { label: '备注' }
      },
      fields: ['createTime', 'operator', 'WOType', 'remark'],
      list: resp.accountOperateLogList
    });

    WUI.DataPaginator.create({
      $el: $('#history-paginator'),
      currentPage: options.currentPage,
      total: resp.totalNum,
      pageSize: options.pageSize,
      onSwitchPage: function (currentPage) {
        queryHistory({
          currentPage: currentPage,
          pageSize: options.pageSize
        });
      }
    });
  });
};

var queryCostList = function(){
  WUI.ajax({
    url: '/ams/v1/pocketMoney/query/paymentSetList',
    jsonData: {
      mobile: WUI.link().phone
    }
  }).then(function (resp) {
    WUI.InfoTable.create({
      $el: $('#payment-table'),
      meta: {paymentSet: {label: '小额免密',options: [
        {label: '否', value: '0'}, { label: '是', value: '1'}
      ]}, amount: {label: '免密额度'}},
      data: resp.paymentSetList,
      fields: [['paymentSet', 'amount']]
    });
  })
}

var queryTrade = function (options) {
  var editResource = WUI.getResource('/edit');

  WUI.ajax({
    url: '/ams/v1/pocketMoney/query/transactionList',
    jsonData: {
      mobile: WUI.link().phone
    }
  }).then(function (resp) {
    WUI.DataTableEx.create({
      $el: $('#trade-table'),
      meta: {
        outOrderNum: { label: '外部订单号' },
        orderNum: { label: '交易订单号' },
        transType: { label: '交易类型' },
        transDesc: { label: '交易方向'},
        transResult: { label: '交易结果' },
        transAmount: { label: '交易金额' },
        transTime: { label: '交易时间' },
        toBank: { label: '流转银行' },
        cardType: { label: '卡类型' },
        toCard: { label: '流转卡号'},
        failReason: { label: '失败原因' }
      },
      // TODO: Need prompt
      fields: ['outOrderNum', 'orderNum', 'transType', 'transDesc',
               'transResult@failReason', 'transAmount', 'transTime', 'toBank',
               'cardType', 'toCard'],
      list: resp.transactionList
    });

    WUI.DataPaginator.create({
      $el: $('#trade-paginator'),
      currentPage: options.currentPage,
      total: resp.total,
      pageSize: options.pageSize,
      onSwitchPage: function (currentPage) {
        queryTrade({
          currentPage: currentPage,
          pageSize: options.pageSize
        });
      }
    });
  });
};
// Load Page
WUI.ready = function () {
  WUI.ContentHeader.create({
    $el: $('.content-header'),
    meta: [{
      name: '首页',
      url: '/ams'
    }, {
      name: '飞凡通业务'
    },
      {
        name: '飞凡通账户查询',
        url:'allowance-list.html'
      },
      {
        name: '飞凡通账户详情'
      }]
  });

  WUI.ajax({
    url: '/ams/v1/pocketMoney/query/accountBaseInfo',
    jsonData: {
      PWID: WUI.link().id
    }
  }).done(function (resp) {
    var user = resp.memberBaseInfo;
    var freeze = WUI.getResource('/freeze');
    var unfreeze = WUI.getResource('/unfreeze');
    var accountStatus = resp.memberBaseInfo.payAccountStatus;
    switch(parseInt(accountStatus)) {
      case 0:
        var buttonName = freeze && freeze.resourceDisplayName
        freeze ?
          $('#accountAction').html('账户基本信息 <button class="btn btn-warning" id="frozen-button">'+buttonName+'</button>')
          :
          $('#accountAction').html('账户基本信息');
            break;
      case 1:
        var buttonName = unfreeze && unfreeze.resourceDisplayName
        unfreeze ?
            $('#accountAction').html('账户基本信息 <button class="btn btn-warning" id="frozen-button">'+buttonName+'</button>')
          :
          $('#accountAction').html('账户基本信息');
            break;
      default:
            $('#accountAction').html('账户基本信息');
            break;
    }
    $('#frozen-button').click(function() {
      if (parseInt(accountStatus) == 0) {
        var WOType = '90'
        var message = '<textarea class="form-control" id="operationReason" placeholder="请输入原因"></textarea>'
      }else if(parseInt(accountStatus) == 1){
        var WOType = '91'
        var message = '<textarea class="form-control" id="operationReason" placeholder="请输入原因"></textarea>'
      }
      var pop = WUI.ModalDialog.create({
        title: '提示',
        message: message,
        onConfirm: function () {
          pop.hide();
          var operationReason = $('#operationReason').val();
          if(operationReason != '') {
            WUI.ajax({
              url: '/ams/v1/pocketMoney/account/statusChange',
              jsonData: {
                mobile: WUI.link().phone,
                operationReason: operationReason,
                WOType: WOType
              }
            }).done(function (resp) {
              WUI.alert.create({
                message: '成功',
                success: true
              });
            })
          }else{
            pop.hide();
            WUI.alert.create({
              message: '请输入原因',
              success: false
            });
          }
        }
      });

    });

    WUI.InfoTable.create({
      $el: $('#account-info'),
      meta: META,
      data: user,
      fields: [
        ['PWID', 'id99bill', 'mobile', 'email', 'accountRegion', 'accountStatus'],
        ['accountName', 'gender', 'idType', 'idNumber', 'authenticationTime', 'realNameLevel'],
        ['openTime', 'accountResource', 'openChannel']]
    });



    queryAcount({
      currentPage: 0,
      pageSize: 20
    });

    queryHistory({
      currentPage: 0,
      pageSize: 20
    });

    queryTrade({
      currentPage: 0,
      pageSize: 10
    });

    queryCostList();

  });
};
// Keep this function
$(function () {
  WUI.init({
    system: 'ams'
  });
});
