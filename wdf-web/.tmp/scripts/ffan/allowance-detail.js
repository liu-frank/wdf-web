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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmZmFuL2FsbG93YW5jZS1kZXRhaWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLy8gQ29uc3RhbnRzXG52YXIgTUVUQSA9IHtcbiAgUFdJRDogeyBsYWJlbDogJ1BXSUQnIH0sXG4gIG1vYmlsZTogeyBsYWJlbDogJ+i0puaIt+aJi+acuuWPtycgfSxcbiAgYWNjb3VudFN0YXR1czogeyBsYWJlbDogJ+i0puaIt+eKtuaAgScgLG9wdGlvbnM6IFtcbiAgICB7bGFiZWw6ICfliJvlu7onLCB2YWx1ZTogJzAnfSwgeyBsYWJlbDogJ+ato+W4uCcsIHZhbHVlOiAnMSd9LHsgbGFiZWw6ICflhrvnu5MnLCB2YWx1ZTogJzInfSx7IGxhYmVsOiAn5bey5ZCI5bm2JywgdmFsdWU6ICc4J30seyBsYWJlbDogJ+azqOmUgCcsIHZhbHVlOiAnOSd9XG4gIF0sXG4gIHR5cGU6J3NlbGVjdCdcbiAgfSxcbiAgYWNjb3VudFJlc291cmNlOiB7IGxhYmVsOiAn5byA5oi35p2l5rqQJyB9LFxuICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJyB9LFxuICByZWFsTmFtZUxldmVsOiB7IGxhYmVsOiAn5a6e5ZCN6K6k6K+B562J57qnJyB9LFxuICBpZFR5cGU6IHsgbGFiZWw6ICfor4Hku7bnsbvlnosnIH0sXG4gIGdlbmRlcjogeyBsYWJlbDogJ+aAp+WIqycgfSxcbiAgaWQ5OWJpbGw6IHsgbGFiZWw6ICflv6vpkrHkvJrlkZhJRCcgfSxcbiAgcGF5TW9iaWxlOiB7IGxhYmVsOiAn5pSv5LuY5omL5py65Y+3JyB9LFxuICBvcGVuVGltZTogeyBsYWJlbDogJ+W8gOaIt+aXtumXtCcgfSxcbiAgb3BlbkNoYW5uZWw6IHsgbGFiZWw6ICflvIDmiLfmuKDpgZMnIH0sXG4gIGFjY291bnROYW1lOiB7IGxhYmVsOiAn5aeT5ZCNJyB9LFxuICBhdXRoZW50aWNhdGlvblRpbWU6IHsgbGFiZWw6ICforqTor4Hml7bpl7QnIH0sXG4gIGlkTnVtYmVyOiB7IGxhYmVsOiAn6K+B5Lu25Y+356CBJyB9LFxuICBhY2NvdW50UmVnaW9uOiB7IGxhYmVsOiAn5Zyw5Yy6JyB9XG59O1xudmFyIFRBQkxFX0ZJRUxEUyA9IFsnaWQnLCAnbmFtZScsICdlbWFpbCcsICdhZ2UnXTtcbi8vIENhbGxiYWNrIGZ1bmN0aW9uc1xudmFyIGVkaXREYXRhID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgLy8gd2luZG93Lm9wZW4oJ2FsbG93YW5jZS1kZXRhaWwuaHRtbD9pZD0nICsgaXRlbS5pZCk7XG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2FsbG93YW5jZS1kZXRhaWwuaHRtbD9pZD0nICsgaXRlbS5pZDtcbn07XG4vLyBDYWxsYmFjayBGdW5jdGlvbnNcbnZhciBzdWJtaXREYXRhID0gZnVuY3Rpb24gKGl0ZW0sIGV0YWcpIHtcbiAgLy9XVUkuYWpheCh7XG4gIC8vICB1cmw6ICcvc2FtcGxlL3dlYi92MS91c2Vycy8nICsgV1VJLmxpbmsoKS5pZCxcbiAgLy8gIGpzb25EYXRhOiAkLmV4dGVuZChpdGVtLCB7XG4gIC8vICAgIF9ldGFnOiBldGFnXG4gIC8vICB9KVxuICAvL30pLmRvbmUoZnVuY3Rpb24gKCkge1xuICAvLyAgV1VJLmFsZXJ0LmNyZWF0ZSh7XG4gIC8vICAgIG1lc3NhZ2U6ICfmiJDlip8nLFxuICAvLyAgICBzdWNjZXNzOiB0cnVlXG4gIC8vICB9KTtcbiAgLy8gIC8qKlxuICAvLyAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgLy8gICAgd2luZG93LmNsb3NlKCk7XG4gIC8vICB9LCAyMDAwKTtcbiAgLy8gICovXG4gIC8vfSk7XG59O1xuXG52YXIgcXVlcnlBY291bnQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgZWRpdFJlc291cmNlID0gV1VJLmdldFJlc291cmNlKCcvZWRpdCcpO1xuXG4gIFdVSS5hamF4KHtcbiAgICB1cmw6ICcvYW1zL3YxL3BvY2tldE1vbmV5L3F1ZXJ5L2FjY291bnREZXRhaWxMaXN0JyxcbiAgICBqc29uRGF0YToge1xuICAgICAgbW9iaWxlOiBXVUkubGluaygpLnBob25lLFxuICAgICAgcGFnZU51bTogb3B0aW9ucy5jdXJyZW50UGFnZSxcbiAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplXG4gICAgfVxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgV1VJLkRhdGFUYWJsZS5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcjYWNjb3VudC10YWJsZScpLFxuICAgICAgbWV0YToge1xuICAgICAgICBhY2NvdW50SWQ6IHsgbGFiZWw6ICfkuJrliqHotKbmiLdJRCcgfSxcbiAgICAgICAgYml6TmFtZTogeyBsYWJlbDogJ+S4muWKoeWQjeensCcgfSxcbiAgICAgICAgYWNjb3VudFR5cGU6IHsgbGFiZWw6ICfotKbmiLfnsbvlnosnLFxuICAgICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICB7bGFiZWw6ICflgqjlgLzotKbmiLcnLCB2YWx1ZTogJzEnfSwgeyBsYWJlbDogJ+i1oOmAgei0puaItycsIHZhbHVlOiAnMid9XG4gICAgICAgICAgXSxcbiAgICAgICAgICB0eXBlOidzZWxlY3QnXG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnRCYWxhbmNlOiB7IGxhYmVsOiAn5b2T5YmN5L2Z6aKdJyB9LFxuICAgICAgICBmcm9tU291cmNlOiB7IGxhYmVsOiAn5p2l5rqQJyB9LFxuICAgICAgICBvcGVuVGltZTogeyBsYWJlbDogJ+W8gOmAmuaXtumXtCcgfSxcbiAgICAgICAgYWNjb3VudFN0YXR1czogeyBsYWJlbDogJ+eKtuaAgScsb3B0aW9uczogW1xuICAgICAgICAgIHtsYWJlbDogJ+ato+W4uCcsIHZhbHVlOiAnMCd9LCB7IGxhYmVsOiAn5Ya757uTJywgdmFsdWU6ICcxJ30seyBsYWJlbDogJ+WIoOmZpCcsIHZhbHVlOiAnLTEnfVxuICAgICAgICBdLFxuICAgICAgICAgIHR5cGU6J3NlbGVjdCd9LFxuICAgICAgICBiaXpUeXBlOiB7IGxhYmVsOiAn5Lia5Yqh57G75Z6LJywgb3B0aW9uczogW1xuICAgICAgICAgIHtsYWJlbDogJ+i0reeJqemHkScsIHZhbHVlOiAnMSd9LCB7IGxhYmVsOiAn5YKo5YC8JywgdmFsdWU6ICcyJ30sIHsgbGFiZWw6ICflv6vmmJPoirEnLCB2YWx1ZTogJzMnfVxuICAgICAgICBdLFxuICAgICAgICAgIHR5cGU6J3NlbGVjdCd9XG4gICAgICB9LFxuICAgICAgZmllbGRzOiBbJ2Jpek5hbWUnLCAnYWNjb3VudFR5cGUnLCAnY3VycmVudEJhbGFuY2UnLCAnZnJvbVNvdXJjZScsICdvcGVuVGltZScsICdhY2NvdW50U3RhdHVzJ10sXG4gICAgICBsaXN0OiByZXNwLmFjY291bnREZXRhaWxMaXN0LFxuICAgICAgb3BlcmF0aW9uczogW3tcbiAgICAgICAgbmFtZTogJ+afpeeci+ivpuaDhScsXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIHN3aXRjaChwYXJzZUludChpdGVtLmFjY291bnRUeXBlKSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuXG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpcm1EaWFsb2cgPSBXVUkuTW9kYWxEaWFsb2cuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6LSt54mp6YeR6LSm5oi36K+m5oOFJyxcbiAgICAgICAgICAgICAgICAgIG9uQ29uZmlybTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25maXJtRGlhbG9nLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBXVUkuSW5mb1RhYmxlLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JykuYWRkQ2xhc3MoJ2luZm8tdGFibGUnKSxcbiAgICAgICAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYml6TmFtZTogeyBsYWJlbDogJ+S4muWKoeWQjeensCcgfSxcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudFR5cGU6IHsgbGFiZWw6ICfotKbmiLfnsbvlnosnLFxuICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ+WCqOWAvOi0puaItycsIHZhbHVlOiAnMSd9LCB7IGxhYmVsOiAn6LWg6YCB6LSm5oi3JywgdmFsdWU6ICcyJ31cbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6J3NlbGVjdCd9LFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QmFsYW5jZTogeyBsYWJlbDogJ+W9k+WJjeS9meminSjlhYMpJyB9LFxuICAgICAgICAgICAgICAgICAgICBmcm9tU291cmNlOiB7IGxhYmVsOiAn5byA6YCa5p2l5rqQJyB9LFxuICAgICAgICAgICAgICAgICAgICBvcGVuVGltZTogeyBsYWJlbDogJ+W8gOmAmuaXtumXtCcgfSxcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudFN0YXR1czogeyBsYWJlbDogJ+i0puaIt+eKtuaAgScgLG9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICfmraPluLgnLCB2YWx1ZTogJzAnfSwgeyBsYWJlbDogJ+WGu+e7kycsIHZhbHVlOiAnMSd9LHsgbGFiZWw6ICfliKDpmaQnLCB2YWx1ZTogJy0xJ31cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOidzZWxlY3QnfSxcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lOiB7IGxhYmVsOiAn6LSm5oi35riF6Zu25pe26Ze0JyB9LFxuICAgICAgICAgICAgICAgICAgICBjbGVhck1vbmV5OiB7IGxhYmVsOiAn6LSm5oi35riF6Zu26YeR6aKdKOWFgyknIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBkYXRhOiBpdGVtLFxuICAgICAgICAgICAgICAgICAgZmllbGRzOiBbW1xuICAgICAgICAgICAgICAgICAgICAnYml6TmFtZScsICdhY2NvdW50VHlwZScsICdhY2NvdW50U3RhdHVzJywgJ2N1cnJlbnRCYWxhbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2Zyb21Tb3VyY2UnLCAnb3BlblRpbWUnLCAnY2xlYXJUaW1lJywgJ2NsZWFyTW9uZXknXG4gICAgICAgICAgICAgICAgICBdXVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuXG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpcm1EaWFsb2cgPSBXVUkuTW9kYWxEaWFsb2cuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5YKo5YC86LSm5oi36K+m5oOFJyxcbiAgICAgICAgICAgICAgICAgIG9uQ29uZmlybTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25maXJtRGlhbG9nLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBXVUkuSW5mb1RhYmxlLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JykuYWRkQ2xhc3MoJ2luZm8tdGFibGUnKSxcbiAgICAgICAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYml6TmFtZTogeyBsYWJlbDogJ+S4muWKoeWQjeensCcgfSxcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudFR5cGU6IHsgbGFiZWw6ICfotKbmiLfnsbvlnosnICxcbiAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICflgqjlgLzotKbmiLcnLCB2YWx1ZTogJzEnfSwgeyBsYWJlbDogJ+i1oOmAgei0puaItycsIHZhbHVlOiAnMid9XG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOidzZWxlY3QnfSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEJhbGFuY2U6IHsgbGFiZWw6ICflvZPliY3kvZnpop0o5YWDKScgfSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbVNvdXJjZTogeyBsYWJlbDogJ+W8gOmAmuadpea6kCcgfSxcbiAgICAgICAgICAgICAgICAgICAgb3BlblRpbWU6IHsgbGFiZWw6ICflvIDpgJrml7bpl7QnIH0sXG4gICAgICAgICAgICAgICAgICAgIGFjY291bnRTdGF0dXM6IHsgbGFiZWw6ICfotKbmiLfnirbmgIEnLG9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICfmraPluLgnLCB2YWx1ZTogJzAnfSwgeyBsYWJlbDogJ+WGu+e7kycsIHZhbHVlOiAnMSd9LHsgbGFiZWw6ICfliKDpmaQnLCB2YWx1ZTogJy0xJ31cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOidzZWxlY3QnfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IGl0ZW0sXG4gICAgICAgICAgICAgICAgICBmaWVsZHM6IFtbXG4gICAgICAgICAgICAgICAgICAgICdiaXpOYW1lJywgJ2FjY291bnRUeXBlJywgJ2FjY291bnRTdGF0dXMnLCAnY3VycmVudEJhbGFuY2UnLFxuICAgICAgICAgICAgICAgICAgICAnZnJvbVNvdXJjZScsICdvcGVuVGltZSdcbiAgICAgICAgICAgICAgICAgIF1dXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpcm1EaWFsb2cgPSBXVUkuTW9kYWxEaWFsb2cuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5b+r5piT6Iqx5biQ5oi36K+m5oOFJyxcbiAgICAgICAgICAgICAgICAgIG9uQ29uZmlybTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25maXJtRGlhbG9nLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBXVUkuSW5mb1RhYmxlLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAkZWw6ICQoJy5tb2RhbC1ib2R5JykuYWRkQ2xhc3MoJ2luZm8tdGFibGUnKSxcbiAgICAgICAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudElkOiB7IGxhYmVsOiAn6Zu26Iqx6ZKx6LSm5oi3SUQnIH0sXG4gICAgICAgICAgICAgICAgICAgIGFjY291bnRTdGF0dXM6IHsgbGFiZWw6ICfotKbmiLfnirbmgIEnLG9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICfmraPluLgnLCB2YWx1ZTogJzAnfSwgeyBsYWJlbDogJ+WGu+e7kycsIHZhbHVlOiAnMSd9LHsgbGFiZWw6ICfliKDpmaQnLCB2YWx1ZTogJy0xJ31cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOidzZWxlY3QnfSxcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlQcm9ncmVzczogeyBsYWJlbDogJ+eUs+ivt+i/m+W6picgfSxcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlUaW1lOiB7IGxhYmVsOiAn55Sz6K+35pe26Ze0JyB9LFxuICAgICAgICAgICAgICAgICAgICBhcHBseUFtb3VudDogeyBsYWJlbDogJ+eUs+ivt+mineW6pijlhYMpJyB9LFxuICAgICAgICAgICAgICAgICAgICB1c2FibGVBbW91bnQ6IHsgbGFiZWw6ICflj6/nlKjpop3luqYo5YWDKScgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVwYXltZW50OiB7IGxhYmVsOiAn5YWo6YOo5b6F6L+YKOWFgyknIH0sXG4gICAgICAgICAgICAgICAgICAgIGZyb3plblN0YXR1czogeyBsYWJlbDogJ+WGu+e7k+eKtuaAgScgfSxcbiAgICAgICAgICAgICAgICAgICAgZnJvemVuSW5mbzogeyBsYWJlbDogJ+WGu+e7k+S/oeaBr+aPkOekuicgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IGl0ZW0sXG4gICAgICAgICAgICAgICAgICBmaWVsZHM6IFtbXG4gICAgICAgICAgICAgICAgICAgICdhY2NvdW50SWQnLCAnYWNjb3VudFN0YXR1cycsICdmcm96ZW5TdGF0dXMnLCAnYXBwbHlQcm9ncmVzcycsXG4gICAgICAgICAgICAgICAgICAgICdhcHBseVRpbWUnLCAnYXBwbHlBbW91bnQnLCAndXNhYmxlQW1vdW50JywgJ3JlcGF5bWVudCcsICdmcm96ZW5JbmZvJ1xuICAgICAgICAgICAgICAgICAgXV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1dXG4gICAgfSk7XG4gIH0pO1xufTtcblxudmFyIHF1ZXJ5SGlzdG9yeSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBlZGl0UmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9lZGl0Jyk7XG4gIFdVSS5hamF4KHtcbiAgICB1cmw6ICcvYW1zL3YxL3BvY2tldE1vbmV5L3F1ZXJ5L2FjY291bnRPcGVyYXRlTG9nJyxcbiAgICBqc29uRGF0YToge1xuICAgICAgUFdJRDogV1VJLmxpbmsoKS5pZCxcbiAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplLFxuICAgICAgcGFnZU51bTogb3B0aW9ucy5jdXJyZW50UGFnZSxcbiAgICB9XG4gIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICBXVUkuRGF0YVRhYmxlLmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJyNoaXN0b3J5LXRhYmxlJyksXG4gICAgICBtZXRhOiB7XG4gICAgICAgIGNyZWF0ZVRpbWU6IHsgbGFiZWw6ICfml7bpl7QnLHR5cGU6J2RhdGUnIH0sXG4gICAgICAgIG9wZXJhdG9yOiB7IGxhYmVsOiAn5pON5L2c5Lq6JyB9LFxuICAgICAgICBXT1R5cGU6IHsgbGFiZWw6ICfmk43kvZzooYzkuLonLG9wdGlvbnM6IFtcbiAgICAgICAgICB7bGFiZWw6ICflhrvnu5MnLCB2YWx1ZTogJzkwJ30sIHsgbGFiZWw6ICfop6PlhrsnLCB2YWx1ZTogJzkxJ31dLFxuICAgICAgICAgIHR5cGU6J3NlbGVjdCd9LFxuICAgICAgICByZW1hcms6IHsgbGFiZWw6ICflpIfms6gnIH1cbiAgICAgIH0sXG4gICAgICBmaWVsZHM6IFsnY3JlYXRlVGltZScsICdvcGVyYXRvcicsICdXT1R5cGUnLCAncmVtYXJrJ10sXG4gICAgICBsaXN0OiByZXNwLmFjY291bnRPcGVyYXRlTG9nTGlzdFxuICAgIH0pO1xuXG4gICAgV1VJLkRhdGFQYWdpbmF0b3IuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnI2hpc3RvcnktcGFnaW5hdG9yJyksXG4gICAgICBjdXJyZW50UGFnZTogb3B0aW9ucy5jdXJyZW50UGFnZSxcbiAgICAgIHRvdGFsOiByZXNwLnRvdGFsTnVtLFxuICAgICAgcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemUsXG4gICAgICBvblN3aXRjaFBhZ2U6IGZ1bmN0aW9uIChjdXJyZW50UGFnZSkge1xuICAgICAgICBxdWVyeUhpc3Rvcnkoe1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiBjdXJyZW50UGFnZSxcbiAgICAgICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG52YXIgcXVlcnlDb3N0TGlzdCA9IGZ1bmN0aW9uKCl7XG4gIFdVSS5hamF4KHtcbiAgICB1cmw6ICcvYW1zL3YxL3BvY2tldE1vbmV5L3F1ZXJ5L3BheW1lbnRTZXRMaXN0JyxcbiAgICBqc29uRGF0YToge1xuICAgICAgbW9iaWxlOiBXVUkubGluaygpLnBob25lXG4gICAgfVxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgV1VJLkluZm9UYWJsZS5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcjcGF5bWVudC10YWJsZScpLFxuICAgICAgbWV0YToge3BheW1lbnRTZXQ6IHtsYWJlbDogJ+Wwj+mineWFjeWvhicsb3B0aW9uczogW1xuICAgICAgICB7bGFiZWw6ICflkKYnLCB2YWx1ZTogJzAnfSwgeyBsYWJlbDogJ+aYrycsIHZhbHVlOiAnMSd9XG4gICAgICBdfSwgYW1vdW50OiB7bGFiZWw6ICflhY3lr4bpop3luqYnfX0sXG4gICAgICBkYXRhOiByZXNwLnBheW1lbnRTZXRMaXN0LFxuICAgICAgZmllbGRzOiBbWydwYXltZW50U2V0JywgJ2Ftb3VudCddXVxuICAgIH0pO1xuICB9KVxufVxuXG52YXIgcXVlcnlUcmFkZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBlZGl0UmVzb3VyY2UgPSBXVUkuZ2V0UmVzb3VyY2UoJy9lZGl0Jyk7XG5cbiAgV1VJLmFqYXgoe1xuICAgIHVybDogJy9hbXMvdjEvcG9ja2V0TW9uZXkvcXVlcnkvdHJhbnNhY3Rpb25MaXN0JyxcbiAgICBqc29uRGF0YToge1xuICAgICAgbW9iaWxlOiBXVUkubGluaygpLnBob25lXG4gICAgfVxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgV1VJLkRhdGFUYWJsZUV4LmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJyN0cmFkZS10YWJsZScpLFxuICAgICAgbWV0YToge1xuICAgICAgICBvdXRPcmRlck51bTogeyBsYWJlbDogJ+WklumDqOiuouWNleWPtycgfSxcbiAgICAgICAgb3JkZXJOdW06IHsgbGFiZWw6ICfkuqTmmJPorqLljZXlj7cnIH0sXG4gICAgICAgIHRyYW5zVHlwZTogeyBsYWJlbDogJ+S6pOaYk+exu+WeiycgfSxcbiAgICAgICAgdHJhbnNEZXNjOiB7IGxhYmVsOiAn5Lqk5piT5pa55ZCRJ30sXG4gICAgICAgIHRyYW5zUmVzdWx0OiB7IGxhYmVsOiAn5Lqk5piT57uT5p6cJyB9LFxuICAgICAgICB0cmFuc0Ftb3VudDogeyBsYWJlbDogJ+S6pOaYk+mHkeminScgfSxcbiAgICAgICAgdHJhbnNUaW1lOiB7IGxhYmVsOiAn5Lqk5piT5pe26Ze0JyB9LFxuICAgICAgICB0b0Jhbms6IHsgbGFiZWw6ICfmtYHovazpk7booYwnIH0sXG4gICAgICAgIGNhcmRUeXBlOiB7IGxhYmVsOiAn5Y2h57G75Z6LJyB9LFxuICAgICAgICB0b0NhcmQ6IHsgbGFiZWw6ICfmtYHovazljaHlj7cnfSxcbiAgICAgICAgZmFpbFJlYXNvbjogeyBsYWJlbDogJ+Wksei0peWOn+WboCcgfVxuICAgICAgfSxcbiAgICAgIC8vIFRPRE86IE5lZWQgcHJvbXB0XG4gICAgICBmaWVsZHM6IFsnb3V0T3JkZXJOdW0nLCAnb3JkZXJOdW0nLCAndHJhbnNUeXBlJywgJ3RyYW5zRGVzYycsXG4gICAgICAgICAgICAgICAndHJhbnNSZXN1bHRAZmFpbFJlYXNvbicsICd0cmFuc0Ftb3VudCcsICd0cmFuc1RpbWUnLCAndG9CYW5rJyxcbiAgICAgICAgICAgICAgICdjYXJkVHlwZScsICd0b0NhcmQnXSxcbiAgICAgIGxpc3Q6IHJlc3AudHJhbnNhY3Rpb25MaXN0XG4gICAgfSk7XG5cbiAgICBXVUkuRGF0YVBhZ2luYXRvci5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcjdHJhZGUtcGFnaW5hdG9yJyksXG4gICAgICBjdXJyZW50UGFnZTogb3B0aW9ucy5jdXJyZW50UGFnZSxcbiAgICAgIHRvdGFsOiByZXNwLnRvdGFsLFxuICAgICAgcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemUsXG4gICAgICBvblN3aXRjaFBhZ2U6IGZ1bmN0aW9uIChjdXJyZW50UGFnZSkge1xuICAgICAgICBxdWVyeVRyYWRlKHtcbiAgICAgICAgICBjdXJyZW50UGFnZTogY3VycmVudFBhZ2UsXG4gICAgICAgICAgcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcbi8vIExvYWQgUGFnZVxuV1VJLnJlYWR5ID0gZnVuY3Rpb24gKCkge1xuICBXVUkuQ29udGVudEhlYWRlci5jcmVhdGUoe1xuICAgICRlbDogJCgnLmNvbnRlbnQtaGVhZGVyJyksXG4gICAgbWV0YTogW3tcbiAgICAgIG5hbWU6ICfpppbpobUnLFxuICAgICAgdXJsOiAnL2FtcydcbiAgICB9LCB7XG4gICAgICBuYW1lOiAn6aOe5Yeh6YCa5Lia5YqhJ1xuICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICfpo57lh6HpgJrotKbmiLfmn6Xor6InLFxuICAgICAgICB1cmw6J2FsbG93YW5jZS1saXN0Lmh0bWwnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAn6aOe5Yeh6YCa6LSm5oi36K+m5oOFJ1xuICAgICAgfV1cbiAgfSk7XG5cbiAgV1VJLmFqYXgoe1xuICAgIHVybDogJy9hbXMvdjEvcG9ja2V0TW9uZXkvcXVlcnkvYWNjb3VudEJhc2VJbmZvJyxcbiAgICBqc29uRGF0YToge1xuICAgICAgUFdJRDogV1VJLmxpbmsoKS5pZFxuICAgIH1cbiAgfSkuZG9uZShmdW5jdGlvbiAocmVzcCkge1xuICAgIHZhciB1c2VyID0gcmVzcC5tZW1iZXJCYXNlSW5mbztcbiAgICB2YXIgZnJlZXplID0gV1VJLmdldFJlc291cmNlKCcvZnJlZXplJyk7XG4gICAgdmFyIHVuZnJlZXplID0gV1VJLmdldFJlc291cmNlKCcvdW5mcmVlemUnKTtcbiAgICB2YXIgYWNjb3VudFN0YXR1cyA9IHJlc3AubWVtYmVyQmFzZUluZm8ucGF5QWNjb3VudFN0YXR1cztcbiAgICBzd2l0Y2gocGFyc2VJbnQoYWNjb3VudFN0YXR1cykpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgdmFyIGJ1dHRvbk5hbWUgPSBmcmVlemUgJiYgZnJlZXplLnJlc291cmNlRGlzcGxheU5hbWVcbiAgICAgICAgZnJlZXplID9cbiAgICAgICAgICAkKCcjYWNjb3VudEFjdGlvbicpLmh0bWwoJ+i0puaIt+WfuuacrOS/oeaBryA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCIgaWQ9XCJmcm96ZW4tYnV0dG9uXCI+JytidXR0b25OYW1lKyc8L2J1dHRvbj4nKVxuICAgICAgICAgIDpcbiAgICAgICAgICAkKCcjYWNjb3VudEFjdGlvbicpLmh0bWwoJ+i0puaIt+WfuuacrOS/oeaBrycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHZhciBidXR0b25OYW1lID0gdW5mcmVlemUgJiYgdW5mcmVlemUucmVzb3VyY2VEaXNwbGF5TmFtZVxuICAgICAgICB1bmZyZWV6ZSA/XG4gICAgICAgICAgICAkKCcjYWNjb3VudEFjdGlvbicpLmh0bWwoJ+i0puaIt+WfuuacrOS/oeaBryA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCIgaWQ9XCJmcm96ZW4tYnV0dG9uXCI+JytidXR0b25OYW1lKyc8L2J1dHRvbj4nKVxuICAgICAgICAgIDpcbiAgICAgICAgICAkKCcjYWNjb3VudEFjdGlvbicpLmh0bWwoJ+i0puaIt+WfuuacrOS/oeaBrycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgJCgnI2FjY291bnRBY3Rpb24nKS5odG1sKCfotKbmiLfln7rmnKzkv6Hmga8nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAkKCcjZnJvemVuLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHBhcnNlSW50KGFjY291bnRTdGF0dXMpID09IDApIHtcbiAgICAgICAgdmFyIFdPVHlwZSA9ICc5MCdcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAnPHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJvcGVyYXRpb25SZWFzb25cIiBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeWOn+WboFwiPjwvdGV4dGFyZWE+J1xuICAgICAgfWVsc2UgaWYocGFyc2VJbnQoYWNjb3VudFN0YXR1cykgPT0gMSl7XG4gICAgICAgIHZhciBXT1R5cGUgPSAnOTEnXG4gICAgICAgIHZhciBtZXNzYWdlID0gJzx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwib3BlcmF0aW9uUmVhc29uXCIgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXljp/lm6BcIj48L3RleHRhcmVhPidcbiAgICAgIH1cbiAgICAgIHZhciBwb3AgPSBXVUkuTW9kYWxEaWFsb2cuY3JlYXRlKHtcbiAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICBvbkNvbmZpcm06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwb3AuaGlkZSgpO1xuICAgICAgICAgIHZhciBvcGVyYXRpb25SZWFzb24gPSAkKCcjb3BlcmF0aW9uUmVhc29uJykudmFsKCk7XG4gICAgICAgICAgaWYob3BlcmF0aW9uUmVhc29uICE9ICcnKSB7XG4gICAgICAgICAgICBXVUkuYWpheCh7XG4gICAgICAgICAgICAgIHVybDogJy9hbXMvdjEvcG9ja2V0TW9uZXkvYWNjb3VudC9zdGF0dXNDaGFuZ2UnLFxuICAgICAgICAgICAgICBqc29uRGF0YToge1xuICAgICAgICAgICAgICAgIG1vYmlsZTogV1VJLmxpbmsoKS5waG9uZSxcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25SZWFzb246IG9wZXJhdGlvblJlYXNvbixcbiAgICAgICAgICAgICAgICBXT1R5cGU6IFdPVHlwZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgICAgICAgICAgIFdVSS5hbGVydC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICfmiJDlip8nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcG9wLmhpZGUoKTtcbiAgICAgICAgICAgIFdVSS5hbGVydC5jcmVhdGUoe1xuICAgICAgICAgICAgICBtZXNzYWdlOiAn6K+36L6T5YWl5Y6f5ZugJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIFdVSS5JbmZvVGFibGUuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnI2FjY291bnQtaW5mbycpLFxuICAgICAgbWV0YTogTUVUQSxcbiAgICAgIGRhdGE6IHVzZXIsXG4gICAgICBmaWVsZHM6IFtcbiAgICAgICAgWydQV0lEJywgJ2lkOTliaWxsJywgJ21vYmlsZScsICdlbWFpbCcsICdhY2NvdW50UmVnaW9uJywgJ2FjY291bnRTdGF0dXMnXSxcbiAgICAgICAgWydhY2NvdW50TmFtZScsICdnZW5kZXInLCAnaWRUeXBlJywgJ2lkTnVtYmVyJywgJ2F1dGhlbnRpY2F0aW9uVGltZScsICdyZWFsTmFtZUxldmVsJ10sXG4gICAgICAgIFsnb3BlblRpbWUnLCAnYWNjb3VudFJlc291cmNlJywgJ29wZW5DaGFubmVsJ11dXG4gICAgfSk7XG5cblxuXG4gICAgcXVlcnlBY291bnQoe1xuICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICBwYWdlU2l6ZTogMjBcbiAgICB9KTtcblxuICAgIHF1ZXJ5SGlzdG9yeSh7XG4gICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgIHBhZ2VTaXplOiAyMFxuICAgIH0pO1xuXG4gICAgcXVlcnlUcmFkZSh7XG4gICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgIHBhZ2VTaXplOiAxMFxuICAgIH0pO1xuXG4gICAgcXVlcnlDb3N0TGlzdCgpO1xuXG4gIH0pO1xufTtcbi8vIEtlZXAgdGhpcyBmdW5jdGlvblxuJChmdW5jdGlvbiAoKSB7XG4gIFdVSS5pbml0KHtcbiAgICBzeXN0ZW06ICdhbXMnXG4gIH0pO1xufSk7XG4iXSwiZmlsZSI6ImZmYW4vYWxsb3dhbmNlLWRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
