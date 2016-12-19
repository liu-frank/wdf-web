this["WUI"] = this["WUI"] || {};
this["WUI"]["templates"] = this["WUI"]["templates"] || {};
this["WUI"]["templates"]["input-table"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "  <div class=\"table-row\">\n    <span>\n      <select class=\"form-control card-type\">\n        <option value=\"0\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.cardType : depth0),0,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">全部</option>\n        <option value=\"1\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.cardType : depth0),1,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">本行同城</option>\n        <option value=\"1\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.cardType : depth0),2,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">本行异地</option>\n        <option value=\"2\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.cardType : depth0),3,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">他行</option>\n      </select>\n    </span>\n    <span>\n      <select class=\"form-control start-amount\">\n        <option value=\"0\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountStartSection : depth0),0,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">0</option>\n        <option value=\"1\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountStartSection : depth0),1,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">1000</option>\n        <option value=\"2\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountStartSection : depth0),2,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">5000</option>\n        <option value=\"3\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountStartSection : depth0),3,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">10000</option>\n        <option value=\"4\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountStartSection : depth0),4,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">30000</option>\n        <option value=\"5\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountStartSection : depth0),5,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">50000</option>\n        <option value=\"6\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountStartSection : depth0),6,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">100000</option>\n        <option value=\"7\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountStartSection : depth0),7,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">500000</option>\n        <option value=\"8\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountStartSection : depth0),8,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">1000000</option>\n      </select>\n    </span>\n    <span>\n      <select class=\"form-control end-amount\">\n        <option value=\"1\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountEndSection : depth0),1,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">1000</option>\n        <option value=\"2\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountEndSection : depth0),2,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">5000</option>\n        <option value=\"3\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountEndSection : depth0),3,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">10000</option>\n        <option value=\"4\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountEndSection : depth0),4,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">30000</option>\n        <option value=\"5\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountEndSection : depth0),5,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">50000</option>\n        <option value=\"6\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountEndSection : depth0),6,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">100000</option>\n        <option value=\"7\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountEndSection : depth0),7,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">500000</option>\n        <option value=\"8\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountEndSection : depth0),8,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">1000000</option>\n        <option value=\"9\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.amountEndSection : depth0),9,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">&infin;</option>\n      </select>\n    </span>\n    <span>\n      <select class=\"form-control charge-type\">\n        <option value=\"\">请选择</option>\n        <option value=\"0\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.feeType : depth0),0,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">手续费</option>\n        <option value=\"1\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.feeType : depth0),1,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">汇划费</option>\n      </select>\n    </span>\n    <span>\n      <select class=\"form-control charge-way\">\n        <option value=\"\">请选择</option>\n        <option value=\"0\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.caculateType : depth0),0,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">按笔收费</option>\n        <option value=\"1\" "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.caculateType : depth0),1,{"name":"equal","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">按比例收费</option>\n      </select>\n    </span>\n    <span>\n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.caculateType : depth0),"",{"name":"equal","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.caculateType : depth0),0,{"name":"equal","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.caculateType : depth0),1,{"name":"equal","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </span>\n    <span>\n      <input type=\"number\"\n             "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.caculateType : depth0),"",{"name":"equal","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n             "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.caculateType : depth0),0,{"name":"equal","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n             min=\"0\"\n             max=\"999.99\"\n             step=\"0.01\"\n             class=\"form-control start-fee\"\n             required\n             value=\""
    + alias3(((helper = (helper = helpers.minBypercent || (depth0 != null ? depth0.minBypercent : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"minBypercent","hash":{},"data":data}) : helper)))
    + "\" />\n    </span>\n    <span>\n      <input type=\"number\"\n             "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.caculateType : depth0),"",{"name":"equal","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n             "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.caculateType : depth0),0,{"name":"equal","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n             min=\"0\"\n             max=\"999.99\"\n             step=\"0.01\"\n             class=\"form-control end-fee\"\n             required\n             value=\""
    + alias3(((helper = (helper = helpers.maxBypercent || (depth0 != null ? depth0.maxBypercent : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"maxBypercent","hash":{},"data":data}) : helper)))
    + "\" />\n    </span>\n    <div class=\"delete-button\"></div>\n  </div>\n";
},"2":function(depth0,helpers,partials,data) {
    return "selected";
},"4":function(depth0,helpers,partials,data) {
    var helper;

  return "        <input type=\"number\"\n               disabled\n               min=\"0\"\n               max=\"999.99\"\n               step=\"0.01\"\n               class=\"form-control feeAmount\"\n               value=\""
    + this.escapeExpression(((helper = (helper = helpers.feeAmount || (depth0 != null ? depth0.feeAmount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"feeAmount","hash":{},"data":data}) : helper)))
    + "\" />\n";
},"6":function(depth0,helpers,partials,data) {
    var helper;

  return "        <input type=\"number\"\n               min=\"0\"\n               max=\"999.99\"\n               step=\"0.01\"\n               required\n               class=\"form-control feeAmount\"\n               value=\""
    + this.escapeExpression(((helper = (helper = helpers.feeAmount || (depth0 != null ? depth0.feeAmount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"feeAmount","hash":{},"data":data}) : helper)))
    + "\" />\n";
},"8":function(depth0,helpers,partials,data) {
    var helper;

  return "        <input type=\"number\"\n               min=\"0\"\n               max=\"100\"\n               step=\"0.00001\"\n               required\n               class=\"form-control feeAmount\"\n               value=\""
    + this.escapeExpression(((helper = (helper = helpers.feeAmount || (depth0 != null ? depth0.feeAmount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"feeAmount","hash":{},"data":data}) : helper)))
    + "\" />\n";
},"10":function(depth0,helpers,partials,data) {
    return "disabled";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"table-header\">\n  <span>交易卡种</span>\n  <span>交易金额起(元)</span>\n  <span>交易金额终(元)</span>\n  <span>计费类型</span>\n  <span>收费方式</span>\n  <span>费用(元)/费率(%)</span>\n  <span>按比最低收费(%)</span>\n  <span>按比最高收费(%)</span>\n</div>\n<div class=\"table-body\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});;
this["WUI"] = this["WUI"] || {};
this["WUI"]["templates"] = this["WUI"]["templates"] || {};
this["WUI"]["templates"]["monitor-table"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <tr>\n      <td>"
    + alias3(((helper = (helper = helpers.busTypeName || (depth0 != null ? depth0.busTypeName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"busTypeName","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + alias3(((helper = (helper = helpers.transName || (depth0 != null ? depth0.transName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"transName","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + alias3(((helper = (helper = helpers.channelPackageNo || (depth0 != null ? depth0.channelPackageNo : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"channelPackageNo","hash":{},"data":data}) : helper)))
    + " / "
    + alias3(((helper = (helper = helpers.transactionDate || (depth0 != null ? depth0.transactionDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"transactionDate","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + alias3(((helper = (helper = helpers.transStatusName || (depth0 != null ? depth0.transStatusName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"transStatusName","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + alias3(((helper = (helper = helpers.statusCode || (depth0 != null ? depth0.statusCode : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"statusCode","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.statusDesc || (depth0 != null ? depth0.statusDesc : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"statusDesc","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + alias3(((helper = (helper = helpers.payAmt || (depth0 != null ? depth0.payAmt : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"payAmt","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + alias3(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"accountName","hash":{},"data":data}) : helper)))
    + " / "
    + alias3(((helper = (helper = helpers.accountBranchName || (depth0 != null ? depth0.accountBranchName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"accountBranchName","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + alias3(((helper = (helper = helpers.oppAccNo || (depth0 != null ? depth0.oppAccNo : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"oppAccNo","hash":{},"data":data}) : helper)))
    + " / "
    + alias3(((helper = (helper = helpers.oppBranchName || (depth0 != null ? depth0.oppBranchName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"oppBranchName","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"monitor-table\">\n  <thead>\n    <tr>\n      <th>业务种类</th>\n      <th>交易名称</th>\n      <th>交易流水号 / 交易时间</th>\n      <th>交易状态</th>\n      <th>错误信息</th>\n      <th>交易金额</th>\n      <th>本方帐号 / 开户行</th>\n      <th>受理帐号 / 开户行</th>\n    </tr>\n  </thead>\n  <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </tbody>\n</table>\n";
},"useData":true});;
this["WUI"] = this["WUI"] || {};
this["WUI"]["templates"] = this["WUI"]["templates"] || {};
this["WUI"]["templates"]["sample-template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h1>Sample Template</h1>\n";
},"useData":true});;
this["WUI"] = this["WUI"] || {};
this["WUI"]["templates"] = this["WUI"]["templates"] || {};
this["WUI"]["templates"]["side-panel"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "      <li class=\""
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"2":function(depth0,helpers,partials,data) {
    return "active";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"profile-list\">\n</ul>\n<div class=\"menu-panel\">\n  <section class=\"main-menu\">\n    <h4>MENU</h4>\n    <ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.menus : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n  </section>\n  <section class=\"search-bar\">\n    <input placeholder=\"Search\" />\n  </section>\n  <section class=\"friend-list\">\n    <h4>FRIENDS</h4>\n    <ul>\n      <li>\n        Caroline\n      </li>\n      <li>\n        Claire\n      </li>\n      <li>\n        Lina\n      </li>\n      <li>\n        Jason\n      </li>\n      <li>\n        Dash\n      </li>\n      <li>\n        Jessica\n      </li>\n    </ul>\n  </section>\n</div>\n";
},"useData":true});;
this["WUI"] = this["WUI"] || {};
this["WUI"]["templates"] = this["WUI"]["templates"] || {};
this["WUI"]["templates"]["site-footer"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<footer class=\"main-footer\">\n  <div class=\"pull-right hidden-xs\">\n    Created with <b>wd-web</b>\n  </div>\n  <strong>Copyright &copy; 2016 <a href=\"http://wanda.cn\">Wanda Group</a>.</strong> All rights reserved.\n</footer>\n";
},"useData":true});;
this["WUI"] = this["WUI"] || {};
this["WUI"]["templates"] = this["WUI"]["templates"] || {};
this["WUI"]["templates"]["site-menu"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return " active ";
},"3":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "      <li class=\"treeview"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isActive : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n        <a "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.newPage : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n          "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isLeaf : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + ">\n          <i class=\"fa fa-circle\"></i> <span>"
    + this.escapeExpression(((helper = (helper = helpers.resourceDisplayName || (depth0 != null ? depth0.resourceDisplayName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"resourceDisplayName","hash":{},"data":data}) : helper)))
    + "</span>\n        </a>\n        <ul class=\"treeview-menu\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.subs : depth0),{"name":"each","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n      </li>\n";
},"4":function(depth0,helpers,partials,data) {
    return " target=\"_blank\" ";
},"6":function(depth0,helpers,partials,data) {
    var helper;

  return " href="
    + this.escapeExpression(((helper = (helper = helpers.linkUrl || (depth0 != null ? depth0.linkUrl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"linkUrl","hash":{},"data":data}) : helper)))
    + " ";
},"8":function(depth0,helpers,partials,data) {
    return " href=\"javascript:void(0)\" ";
},"10":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "          <li class=\""
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isActive : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n            <a "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.newPage : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n               "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isLeaf : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + ">\n              <i class=\"fa fa-circle-o\"></i> "
    + this.escapeExpression(((helper = (helper = helpers.resourceDisplayName || (depth0 != null ? depth0.resourceDisplayName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"resourceDisplayName","hash":{},"data":data}) : helper)))
    + "\n            </a>\n          </li>\n          <ul class=\"treeview-menu\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.subs : depth0),{"name":"each","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "          </ul>\n";
},"11":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "            <li class=\""
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isActive : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n              <a "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.newPage : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isLeaf : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + ">\n                <i class=\"fa fa-circle-o\"></i> "
    + this.escapeExpression(((helper = (helper = helpers.resourceDisplayName || (depth0 != null ? depth0.resourceDisplayName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"resourceDisplayName","hash":{},"data":data}) : helper)))
    + "\n              </a>\n            </li>\n            <ul class=\"treeview-menu\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.subs : depth0),{"name":"each","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "              <li class=\""
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isActive : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                <a "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.newPage : depth0),{"name":"if","hash":{},"fn":this.program(13, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " href="
    + alias3(((helper = (helper = helpers.linkUrl || (depth0 != null ? depth0.linkUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"linkUrl","hash":{},"data":data}) : helper)))
    + ">\n                  <i class=\"fa fa-circle-o\"></i> "
    + alias3(((helper = (helper = helpers.resourceDisplayName || (depth0 != null ? depth0.resourceDisplayName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"resourceDisplayName","hash":{},"data":data}) : helper)))
    + "\n                </a>\n              </li>\n";
},"13":function(depth0,helpers,partials,data) {
    return "target=\"_blank\"";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<aside class=\"main-sidebar\">\n  <section class=\"sidebar\">\n    <ul class=\"sidebar-menu\">\n      <!-- <li class=\"header\">统一运营平台</li> -->\n      <li class=\"treeview"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isHome : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n        <a href=\"home.html\">\n          <i class=\"fa fa-circle\"></i> <span>首页</span>\n        </a>\n      </li>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.menus : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n  </section>\n</aside>\n";
},"useData":true});;