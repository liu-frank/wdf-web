var express = require('express');
var router = express.Router();
var faker = require('faker');
var TOTAL_COUNT = 130;
var users = [];
var currentTag = null;

router.post('/sso/getResources', function (req, res, next) {
  res.send(
      {
        "aasUserPrincipal": {
          "aasUserResources": {
            "resources": [
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/pocketMoney/query/accountList",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "零花钱用户账户查询",
                "resourceId": "430",
                "resourceName": "queryAccountListApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/payment/query/payGatewayRefundOrder",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "支付网关退款订单查询",
                "resourceId": "441",
                "resourceName": "queryPayGatewayRefundOrderApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/pocketMoney/query/accountBaseInfo",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "零花钱账户基本信息",
                "resourceId": "431",
                "resourceName": "queryAccountBaseInfoApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/workOrder/edit/personalLog",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "",
                "resourceId": "56",
                "resourceName": "workOrdereditpersonalLogApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/payment/query/refundOrderDetail",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "支付网关退款订单详情",
                "resourceId": "442",
                "resourceName": "queryRefundOrderDetailApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/account/query/account",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "",
                "resourceId": "46",
                "resourceName": "accountqueryaccountApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/pocketMoney/query/accountOperateLog",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "零花钱账户操作日志",
                "resourceId": "432",
                "resourceName": "queryAccountOperateLogApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/payment/query/refundOrderLogList",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "支付网关退款订单日志",
                "resourceId": "443",
                "resourceName": "queryRefundOrderLogListApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/pocketMoney/query/accountDetailList",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "零花钱业务账户详细清单(账户详情)",
                "resourceId": "433",
                "resourceName": "queryAccountDetailListApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/account/WOStatus/ChangeApply",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "",
                "resourceId": "58",
                "resourceName": "accountWOStatusChangeApplyApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/payment/query/paymentCodeOrder",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "付款码支付订单查询",
                "resourceId": "444",
                "resourceName": "queryPaymentCodeOrderApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/account/query/accountFullInfo",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "",
                "resourceId": "48",
                "resourceName": "accountqueryaccountFullInfoApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/pocketMoney/query/shopAccount",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "零花钱业务账户详情-购物金",
                "resourceId": "434",
                "resourceName": "queryShopAccountApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/payment/query/paymentCodeRefundOrder",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "付款码退款订单查询",
                "resourceId": "445",
                "resourceName": "queryPaymentCodeRefundOrderApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/workOrder/update/woAcctStatusChangeFile",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "",
                "resourceId": "70",
                "resourceName": "workOrderupdatewoAcctStatusChangeFileApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/pocketMoney/query/corpusAccount",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "零花钱业务账户详情-储值账户(本金)",
                "resourceId": "435",
                "resourceName": "queryCorpusAccountApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/workOrder/upload/woacctstatuschangefile",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "",
                "resourceId": "71",
                "resourceName": "workOrderuploadwoacctstatuschangefileApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/workOrder/query/operationLog",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "",
                "resourceId": "50",
                "resourceName": "workOrderqueryoperationLogApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/pocketMoney/query/fastEasyPayAccount",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "零花钱业务账户详情-快易花账户",
                "resourceId": "436",
                "resourceName": "queryFastEasyPayAccountApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/workOrder/download/woAcctStatusChangeFile",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "",
                "resourceId": "72",
                "resourceName": "workOrderdownloadwoAcctStatusChangeFileApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/pocketMoney/query/transactionList",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "零花钱业务账户交易明细",
                "resourceId": "437",
                "resourceName": "queryTransactionListApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/payment/query/payGatewayOrderList",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "网关支付订单查询",
                "resourceId": "438",
                "resourceName": "queryPayGatewayOrderListApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/workOrder/query/personalLog",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "",
                "resourceId": "52",
                "resourceName": "workOrderquerypersonalLogApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/payment/query/payGatewayOrderDetail",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "支付网关支付订单详情（查看详情）",
                "resourceId": "439",
                "resourceName": "queryPayGatewayOrderDetailApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/payment/query/orderLogList",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "支付网关支付订单日志",
                "resourceId": "440",
                "resourceName": "queryOrderLogListApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/account/personal_data/reset",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "",
                "resourceId": "54",
                "resourceName": "accountpersonaldataresetApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/v1/account/WOStatus/ChangeAudit",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "",
                "resourceId": "65",
                "resourceName": "accountWOStatusChangeAuditApi",
                "resourceType": "api"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/member-info/query",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查询",
                "resourceId": "44",
                "resourceName": "memberinfoqueryB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/allowance-detail.html/freeze",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "冻结支付账户",
                "resourceId": "451",
                "resourceName": "allowanceDetailHtmlFreezeB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/code-payment-list.html/query",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查询",
                "resourceId": "462",
                "resourceName": "codePaymentListHtmlQueryB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/member-detail/changeNote",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "保存",
                "resourceId": "55",
                "resourceName": "memberdetailchangeNoteB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/status-change/deny",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "审核拒绝",
                "resourceId": "66",
                "resourceName": "statuschangedenyB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/member-info/modify",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查看详情",
                "resourceId": "45",
                "resourceName": "memberinfomodifyB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/allowance-detail.html/detail",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查看",
                "resourceId": "452",
                "resourceName": "allowanceDetailHtmlDetailB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/code-payment-list.html/export",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "导出",
                "resourceId": "463",
                "resourceName": "codePaymentListHtmlExportB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/code-payment-list.html/detail",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查看",
                "resourceId": "464",
                "resourceName": "codePaymentListHtmlDetailB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/member-detail/destroy",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "申请销户",
                "resourceId": "57",
                "resourceName": "memberdetaildestroyB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/status-batch/query",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查询",
                "resourceId": "68",
                "resourceName": "statusbatchqueryB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/gateway-payment-list.html/query",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查询",
                "resourceId": "454",
                "resourceName": "gatewayPaymentListHtmlQuery",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/status-batch/modify",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "上传变更数据",
                "resourceId": "69",
                "resourceName": "statusbatchmodifyB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/gateway-payment-list.html/export",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "导出",
                "resourceId": "455",
                "resourceName": "gatewayPaymentListHtmlExport",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/code-refund-list.html/query",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查询",
                "resourceId": "466",
                "resourceName": "codeRefundListHtmlQueryB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/member-detail/freeze",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "申请冻结",
                "resourceId": "59",
                "resourceName": "memberdetailfreezeB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/member-detail/operationLog",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查看备注记录",
                "resourceId": "49",
                "resourceName": "memberdetailoperationLogB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/gateway-payment-list.html/detail",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查看",
                "resourceId": "456",
                "resourceName": "gatewayPaymentListHtmlDetail",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/member-detail/unfreeze",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "申请解冻",
                "resourceId": "60",
                "resourceName": "memberdetailunfreezeB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/code-refund-list.html/export",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "导出",
                "resourceId": "467",
                "resourceName": "codeRefundListHtmlExportB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/code-refund-list.html/detail",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查看",
                "resourceId": "468",
                "resourceName": "codeRefundListHtmlDetailB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/allowance-list.html",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "飞凡通账户查询",
                "resourceId": "447",
                "resourceName": "allowanceListHtmlB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/member-detail/personalLog",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查看备注记录",
                "resourceId": "51",
                "resourceName": "memberdetailpersonalLogB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/gateway-refund-list.html/query",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查询",
                "resourceId": "458",
                "resourceName": "gatewayRefundListQueryB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/status-change/query",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查询",
                "resourceId": "62",
                "resourceName": "statuschangequeryB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/allowance-list.html/query",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查询",
                "resourceId": "448",
                "resourceName": "allowanceListHtmlQueryB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/gateway-refund-list.html/export",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "导出",
                "resourceId": "459",
                "resourceName": "gatewayRefundListExportB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/status-change/modify",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查看详情",
                "resourceId": "63",
                "resourceName": "statuschangemodifyB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/allowance-list.html/export",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "导出",
                "resourceId": "449",
                "resourceName": "allowanceListHtmlExportB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/operation-log/query",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查询",
                "resourceId": "74",
                "resourceName": "operationlogqueryB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/gateway-refund-list.html/detail",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查看",
                "resourceId": "460",
                "resourceName": "gatewayRefundListDetailB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/member-detail/changeName",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "修改别名",
                "resourceId": "53",
                "resourceName": "memberdetailchangeNameB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/status-change/accept",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "审核通过",
                "resourceId": "64",
                "resourceName": "statuschangeacceptB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ffan/allowance-list.html/detail",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查看",
                "resourceId": "450",
                "resourceName": "allowanceListHtmlDetailB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "",
                "linkUrl": "/ams/operation-log/modify",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "查看详情",
                "resourceId": "75",
                "resourceName": "operationlogmodifyB",
                "resourceType": "button"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "",
                "linkUrl": "/ams",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "运营系统",
                "resourceId": "470",
                "resourceName": "ams",
                "resourceType": "indexTitle"
              },
              {
                "description": "",
                "displayOrder": 2,
                "iconUrl": "",
                "levelStructure": "2.0.0",
                "linkUrl": "/ams",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "会员管理",
                "resourceId": "42",
                "resourceName": "amsM",
                "resourceType": "menu"
              },
              {
                "description": "",
                "displayOrder": 1,
                "iconUrl": "",
                "levelStructure": "2.1.0",
                "linkUrl": "/ams/member-info",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "会员信息列表",
                "resourceId": "43",
                "resourceName": "memberinfoM",
                "resourceType": "menu"
              },
              {
                "description": "",
                "displayOrder": 0,
                "iconUrl": "",
                "levelStructure": "2.1.1",
                "linkUrl": "/ams/member-detail",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "会员信息详情",
                "resourceId": "47",
                "resourceName": "memberdetailM",
                "resourceType": "menu"
              },
              {
                "description": "",
                "displayOrder": 2,
                "iconUrl": "",
                "levelStructure": "2.2.0",
                "linkUrl": "/ams/status-change",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "状态变更查询",
                "resourceId": "61",
                "resourceName": "statuschangeM",
                "resourceType": "menu"
              },
              {
                "description": "",
                "displayOrder": 3,
                "iconUrl": "",
                "levelStructure": "2.3.0",
                "linkUrl": "/ams/status-batch",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "批量状态变更",
                "resourceId": "67",
                "resourceName": "statusbatchM",
                "resourceType": "menu"
              },
              {
                "description": "",
                "displayOrder": 4,
                "iconUrl": "",
                "levelStructure": "2.4.0",
                "linkUrl": "/ams/operation-log",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "操作日志列表",
                "resourceId": "73",
                "resourceName": "operationlogM",
                "resourceType": "menu"
              },
              {
                "description": "",
                "displayOrder": 5,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "3.0.0",
                "linkUrl": "/ffan",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "飞凡通业务",
                "resourceId": "446",
                "resourceName": "ffanM",
                "resourceType": "menu"
              },
              {
                "description": "",
                "displayOrder": 1,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "3.1.0",
                "linkUrl": "/ffan/gateway-payment-list.html",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "支付网关支付订单查询",
                "resourceId": "453",
                "resourceName": "gatewayPaymentListHtml",
                "resourceType": "menu"
              },
              {
                "description": "",
                "displayOrder": 2,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "3.2.0",
                "linkUrl": "/ffan/gateway-refund-list.html",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "支付网关退款订单查询",
                "resourceId": "457",
                "resourceName": "gatewayRefundListM",
                "resourceType": "menu"
              },
              {
                "description": "",
                "displayOrder": 3,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "3.3.0",
                "linkUrl": "/ffan/code-payment-list.html",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "付款码支付订单查询",
                "resourceId": "461",
                "resourceName": "codePaymentListHtmlM",
                "resourceType": "menu"
              },
              {
                "description": "",
                "displayOrder": 4,
                "iconUrl": "",
                "isLeaf": "",
                "levelStructure": "3.4.0",
                "linkUrl": "/ffan/code-refund-list.html",
                "menuLevel": 0,
                "parentLevelStructure": "",
                "parentResourceid": "",
                "resourceDisplayName": "付款码退款订单查询",
                "resourceId": "465",
                "resourceName": "codeRefundListHtmlM",
                "resourceType": "menu"
              }
            ],
            "roles": [
              {
                "appID": "ams",
                "appRoleID": "2",
                "roleName": "运营平台管理员",
                "roleType": "1",
                "status": "0"
              }
            ]
          },
          "cacheKey": "",
          "currentUrl": "",
          "ssoLoginTime": "",
          "ssoTicket": "",
          "ssoUserEmail": "amsadmin@wanda.cn",
          "ssoUserId": "amsadmin",
          "ssoUserImAccount": "amsadmin",
          "ssoUserMobile": "13022225555",
          "ssoUserName": "运营平台管理员",
          "ssoUserOrgId": "104001001",
          "statusCode": "",
          "statusMessage": ""
        },
        "loginUrl": "/aas/v1/auth/loginurl?appId=ams&appSsoUrl=http://10.213.57.216:8083/ams/v1/sso/login?appHomeUrl=http://<ip>",
        "respHeader": {
          "respCode": "AAS-10000",
          "respMessage": "成功"
        }
      }
  );
});

router.post('/pocketMoney/query/accountList', function (req, res, next) {
  res.send({
    "respHeader": {
      "serviceName": null,
      "respMessage": "成功",
      "sessionId": null,
      "reqId": null,
      "respCode": "AAS-10000",
      "resMessageExt": null
    },
    total: 100,
    "accountList": [
    {
      "pwid": "432400",
      "mobile": "13012345678",
      "email": "123@qq.com",
      "accountName": "tom",
      "realNameLevel": "1",
      "AccountResource": "wd",
      "accountStatus": "1",
      "openTime": "20160101"
    }
    ]
  });
});

router.post('/pocketMoney/query/accountBaseInfo', function (req, res, next) {
  res.send({
    "respHeader": {
      "serviceName": null,
      "respMessage": "成功",
      "sessionId": null,
      "reqId": null,
      "respCode": "AAS-10000",
      "resMessageExt": null
    },
    "accountBaseInfo": {
      "accountStatus": "432400",
      "AccountResource": "13012345678",
      "email": "123@qq.com",
      "realNameLevel": "tom",
      "idType": "1",
      "gender": "wd",
      "id99bill": "1",
      "payMobile": "13012345678",
      "openTime": "20160101",
      "openChannel": "1",
      "accountName": "jfei",
      "authenticationTime": "20160101",
      "idNumber": "43534",
      "accountRegion": "qa",
      "PWID": "432400",
      "mobile": "13813813888"
    }
  });
});

router.post('/pocketMoney/query/accountOperateLog', function (req, res, next) {
  res.send({
    "respHeader": {
      "serviceName": null,
      "respMessage": "成功",
      "sessionId": null,
      "reqId": null,
      "respCode": "AAS-10000",
      "resMessageExt": null
    },
    "accountOperateLogList": [
    {
      "operateTime": "20161010",
      "operater": "tom",
      "operateDesc": "add",
      "operateRemark": "success"
    }
    ],
    total: 100
  });
});

router.post('/pocketMoney/query/accountDetailList', function (req, res, next) {
  res.send({
    "respHeader": {
      "serviceName": null,
      "respMessage": "成功",
      "sessionId": null,
      "reqId": null,
      "respCode": "AAS-10000",
      "resMessageExt": null
    },
    "accountDetailList": [
    {
      "accountId": "",
      "bizName": "购物金",
      "bizType": "1",
      "accountType": "",
      "currentBalance": "",
      "fromSource": "",
      "openTime": "",
      "accountStatus": ""
    },
    {
      "accountId": "",
      "bizName": "储值",
      "bizType": "2",
      "accountType": "",
      "currentBalance": "",
      "fromSource": "",
      "openTime": "",
      "accountStatus": ""
    },
    {
      "accountId": "",
      "bizName": "快易花",
      "bizType": "3",
      "accountType": "",
      "currentBalance": "",
      "fromSource": "",
      "openTime": "",
      "accountStatus": ""
    }
    ]
  });
});

router.post('/pocketMoney/query/shopAccount', function (req, res, next) {
  res.send({
    "respHeader": {
      "serviceName": null,
      "respMessage": "成功",
      "sessionId": null,
      "reqId": null,
      "respCode": "AAS-10000",
      "resMessageExt": null
    },
    "shopAccount": {
      "bizName": "",
      "accountType": "",
      "currentBalance": "",
      "fromSource": "",
      "openTime": "",
      "accountStatus": "",
      "clearTime": "",
      "clearMoney": ""
    }
  });
});

router.post('/pocketMoney/query/corpusAccount', function (req, res, next) {
  res.send({
    "respHeader": {
      "serviceName": null,
      "respMessage": "成功",
      "sessionId": null,
      "reqId": null,
      "respCode": "AAS-10000",
      "resMessageExt": null
    },
    "corpusAccount": {
      "bizName": "",
      "accountType": "",
      "currentBalance": "",
      "fromSource": "",
      "openTime": "",
      "accountStatus": ""
    }
  });
});

router.post('/pocketMoney/query/fastEasyPayAccount', function (req, res, next) {
  res.send({
    "respHeader": {
      "serviceName": null,
      "respMessage": "成功",
      "sessionId": null,
      "reqId": null,
      "respCode": "AAS-10000",
      "resMessageExt": null
    },
    "fastEasyPayAccount": {
      "accountId": "",
      "accountStatus": "",
      "applyProgress": "",
      "applyTime": "",
      "applyAmount": "",
      "usableAmount": "",
      "repayment": "",
      "frozenStatus": "",
      "frozenInfo": ""
    }
  });
});

router.post('/pocketMoney/query/transactionList', function (req, res, next) {
  res.send({
    "respHeader": {
      "serviceName": "AMS",
      "respMessage": "成功",
      "sessionId": "WDSSH001",
      "reqId": "PC0000011",
      "respCode": "AAS-10000",
      "resMessageExt": ""
    },
    "transactionList": [
    {
      "outOrderNum": "1",
      "orderNum": "1",
      "transType": "1",
      "transDesc": "1",
      "transResult": "1",
      "transAmount": "1",
      "transTime": "1",
      "toBank": "1",
      "cardType": "1",
      "toCard": "1",
      "failReason": "这是失败的原因"
    }
    ]
  });
});

router.post('/payment/query/payGatewayOrderList', function (req, res, next) {
  res.send({
    "respHeader": {
      "serviceName": "AMS",
      "respMessage": "成功",
      "sessionId": "WDSSH001",
      "reqId": "PC0000011",
      "respCode": "ASM-10000",
      "resMessageExt": ""
    },
    "payGatewayOrderList": [
    {
      "outOrderNum": "ABCDE",
      "payOrderNum": "1001",
      "payInstruction": "ABCDE",
      "PWID": "ABCDE",
      "vipMobile": "ABCDE",
      "orderAmount": "ABCDE",
      "payAmount": "ABCDE",
      "payWay": "ABCDE",
      "payChannel": "ABCDE",
      "fromInvoking": "ABCDE",
      "isMerge": "ABCDE",
      "instructionStatus": "ABCDE",
      "instructionCreateTime": "ABCDE",
      "statusChangeTime ": "ABCDE"
    }
    ],
    total: 100
  });
});

router.post('/payment/query/payGatewayOrderDetail', function (req, res, next) {
  res.send({
    "respHeader": {
      "serviceName": "AMS",
      "respMessage": "成功",
      "sessionId": "WDSSH001",
      "reqId": "PC0000011",
      "respCode": "ASM-10000",
      "resMessageExt": ""
    },
    "payGatewayOrderDetail": {
      "pwid": "",
      "outOrderNum": "",
      "payOrderNum": "",
      "payOrderStatus": "",
      "OrderCreateTime": "",
      "OrderStatusChangeTime": "",
      "isMerge": "",
      "payInstruction": "",
      "instructionStatus": "",
      "ffanId": "",
      "merchantName": "",
      "vipMobile": "",
      "instructionCreateTime": "",
      "instructionStatusChangeTime": "",
      "orderAmount": "",
      "payAmount": "",
      "payWay": "",
      "payChannel": "",
      "payChannelResponseNum": "",
      "fromInvoking": "",
      "outlet": "",
      "businessDistrict": ""
    }
  });
});

router.post('/payment/query/orderLogList', function (req, res, next) {
  res.send({
    "respHeader": {
        "serviceName": "AMS",
        "respMessage": "成功",
        "sessionId": "WDSSH001",
        "reqId": "PC0000011",
        "respCode": "ASM-10000",
        "resMessageExt": ""
    },
    "orderStatusLogList": [
        {
            "operateTime": "",
            "operateSource": "",
            "operateDesc": "",
            "orderStatus": "",
            "remark": ""
        }
    ],
    total: 100
  });
});

router.post('/payment/query/payGatewayRefundOrder', function (req, res, next) {
  res.send({
    "respHeader": {
        "serviceName": "AMS",
        "respMessage": "成功",
        "sessionId": "WDSSH001",
        "reqId": "PC0000011",
        "respCode": "ASM-10000",
        "resMessageExt": ""
    },
    "payGatewayRefundOrderList": [
        {
            "orderNum": "",
            "oldOrderNum": "",
            "refundSeq": "",
            "refundTime": "",
            "PWID": "",
            "vipMobile": "",
            "paySource": "",
            "payChannel": "",
            "refundType": "",
            "refundStatus": "",
            "orderAmount": "",
            "refundAmount": "",
            "payType": ""
        }
    ]
  });
});

router.post('/payment/query/refundOrderDetail', function (req, res, next) {
  res.send({
    "respHeader": {
        "serviceName": "AMS",
        "respMessage": "成功",
        "sessionId": "WDSSH001",
        "reqId": "PC0000011",
        "respCode": "ASM-10000",
        "resMessageExt": ""
    },
    "payGatewayRefundOrderList": {
        "pwid": "",
        "vipMobile": "",
        "orderNum": "",
        "oldOrderNum": "",
        "oldPaySeq": "",
        "refundSeq": "",
        "refundTime": "",
        "paySource": "",
        "payChannel": "",
        "payType": "",
        "refundType": "",
        "refundStatus": "",
        "orderAmount": "",
        "realPayAmount": "",
        "payBenefit": "",
        "refundAmount": ""
    }
  });
});

router.post('/payment/query/refundOrderLogList', function (req, res, next) {
  res.send({
    "respHeader": {
        "serviceName": null,
        "respMessage": "成功",
        "sessionId": null,
        "reqId": null,
        "respCode": "AAS-10000",
        "resMessageExt": null
    },
    "refundLogList": [
        {
            "operateTime": "",
            "operateSource": "",
            "operateDesc": "",
            "orderStatus": "",
            "remark": ""
        }
    ]
  });
});

router.post('/payment/query/paymentCodeOrder', function (req, res, next) {
  res.send({
    "respHeader": {
        "serviceName": null,
        "respMessage": "成功",
        "sessionId": null,
        "reqId": null,
        "respCode": "AAS-10000",
        "resMessageExt": null
    },
    "paymentCodeOrderList": [
        {
            "orderNum": "",
            "merchantSeq": "",
            "merchantName": "",
            "outlet": "",
            "PWID": "",
            "vipMobile": "",
            "orderAmount": "",
            "benefitAmount": "",
            "realPayAmount": "",
            "payChannel": "",
            "fromInvoking": "",
            "transStatus": "",
            "errorMsg": "",
            "orderCreateTime": ""
        }
    ]
});
});

router.post('/payment/query/paymentCodeRefundOrder', function (req, res, next) {
  res.send({
    "respHeader": {
        "serviceName": "AMS",
        "respMessage": "成功",
        "sessionId": "WDSSH001",
        "reqId": "PC0000011",
        "respCode": "ASM-10000",
        "resMessageExt": ""
    },
    "paymentCodeRefundOrderList": [
        {
            "orderNum": "",
            "refundNum": "",
            "merchantName": "",
            "outlet": "",
            "PWID": "",
            "vipMobile": "",
            "payAmount": "",
            "refundAmount": "",
            "refundStatus": "",
            "payChannel": "",
            "fromInvoking": "",
            "refundTime": ""
        }
    ]
});
});
module.exports = router;
