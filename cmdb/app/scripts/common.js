var PAGE_SIZE = 20;
var PAGE_SIZE_LABEL = 10;
var DOMAIN = {
  CMDB : ''
};
if (window.location.href.indexOf('127.0.0.1') == 7) {
  DOMAIN['CMDB'] = 'http://cmdb.api.dev.wanda.com';
}
var META = {
  id: { label: 'ID' },
  location: { label: 'IDC', maxLength: 200 },
  rack: { label: '机柜', maxLength: 200 },
  rack_region: { label: '区域', maxLength: 200 },
  serial_number: { label: 'SN', maxLength: 200 },
  cpu: { label: 'CPU', maxLength: 200 },
  model: { label: '型号', maxLength: 200 },
  memory: { label: '内存', maxLength: 200 },
  raid: { label: 'Raid 信息', maxLength: 200 },
  harddisk: { label: '硬盘', maxLength: 200 },
  manage_ip: { label: '管理IP', maxLength: 200 },
  vip: { label: 'VIP', maxLength: 200 },
  typical_case: { label: '典型配置', maxLength: 200 },
  name: { label: '名称', maxLength: 200 },
  optional: { label: '其他', maxLength: 200 },
  net_name1: { label: 'eth0', maxLength: 200 },
  net_ip1: { label: 'eth0IP', maxLength: 200 },
  net_name2: { label: 'eth1', maxLength: 200 },
  net_ip2: { label: 'eth1IP', maxLength: 200 },
  net_name3: { label: 'eth2', maxLength: 200 },
  net_ip3: { label: 'eth2IP', maxLength: 200 },
  net_name4: { label: 'eth3', maxLength: 200 },
  net_ip4: { label: 'eth3IP', maxLength: 200 },
  net_name5: { label: 'eth4', maxLength: 200 },
  net_ip5: { label: 'eth4IP', maxLength: 200 },
  net_name6: { label: 'eth5', maxLength: 200 },
  net_ip6: { label: 'eth5IP', maxLength: 200 },
  net_name7: { label: 'eth6', maxLength: 200 },
  net_ip7: { label: 'eth6IP', maxLength: 200 },
  net_name8: { label: 'eth7', maxLength: 200 },
  net_ip8: { label: 'eth7IP', maxLength: 200 },
  net_name9: { label: 'eth8', maxLength: 200 },
  net_ip9: { label: 'eth8IP', maxLength: 200 },
  server_code: { label: '服务器_code', maxLength: 200 },
  label_key: { label: '标签键', maxLength: 200 },
  label_value: { label: '标签值', maxLength: 200 },
  version: { label: '版本', maxLength: 200 },
  hostname: { label: '主机名', maxLength: 200 },
  u_amount: { label: 'U位', maxLength: 200 },
  rack_code: { label: 'IDC_code', type: 'select', options: [] },
  environment: { label: '版本', type: 'select', options: [] },
  computer_amount: { label: '规格（U）', type: 'select', options: [] },
  cloud_type: { label: '类型', type: 'select', options: [] },
  type: { label: '接口', type: 'select', options: [] },
  insure: { label: '保障', type: 'select', options: [] },
  net_type1: { label: 'type', type: 'select', options: [] },
  net_type2: { label: 'type', type: 'select', options: [] },
  net_type3: { label: 'type', type: 'select', options: [] },
  net_type4: { label: 'type', type: 'select', options: [] },
  net_type5: { label: 'type', type: 'select', options: [] },
  net_type6: { label: 'type', type: 'select', options: [] },
  net_type7: { label: 'type', type: 'select', options: [] },
  net_type8: { label: 'type', type: 'select', options: [] },
  net_type9: { label: 'type', type: 'select', options: [] },
  os_family: { label: 'OS family', type: 'select', options: [] },
  os_version: { label: 'OS version', type: 'select', options: [] },
  status: { label: '状态', type: 'select', options: [] },
  allocated: { label: '分配状态', type: 'select', options: [] },
  purchase_time: { label: '采购时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 200 },
  arrival_time: { label: '到货时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 200 },
  stock_time: { label: '上架时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 200 },
  maintain_time_begin: { label: '维保开始时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 200 },
  maintain_time_end: { label: '维保结束时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 200 },
  created_time: { label: '创建时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 200 },
  updated_time: { label: '更新时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 200 },
  alloc_deadline: { label: '分配截止时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 200 },
  description: { label: '描述', maxLength: 200 }
};

// CMDB 操作&工具，若不需要展示则内部js设置为空
var SEARCH_SUBS = {
  columns: {
    label: '列',
    isShow: true,
    options: []
  },
  operation: {
    label: '操作',
    isShow: true,
    options: [
    '<a href="javascript:void(0);" onclick="exportData();">导出</a>',
    '<a href="javascript:void(0);" style="position:relative;">导入<input type="file" accept=".xls" onChange="importData(this);" style="position:absolute;left:0;top:0;bottom:0;opacity:0;width:100%;" /></a>'
    ]
  },
  tools: {
    label: '工具',
    isShow: true,
    options: [
    '<a href="http://10.214.124.55/zabbix/" target="_blank">zabbix</a>',
    '<a href="http://10.214.124.53:8080/" target="_blank">Jira</a>',
    '<a href="http://10.214.124.53:8090/" target="_blank">Confluence</a>',
    '<a href="http://10.214.124.53/itop/" target="_blank">Itop</a>',
    '<a href="http://10.214.66.75/" target="_blank">ELK</a>',
    '<a href="http://10.214.124.57/svnadmin/" target="_blank">Svn</a>',
    '<a href="http://10.214.124.57:8081/" target="_blank">GitLab</a>',
    '<a href="http://10.214.124.58:8080/" target="_blank">Jenkins</a>',
    '<a href="http://10.214.124.56:8081/nexus/" target="_blank">Nexus</a>',
    '<a href="https://10.214.124.59/" target="_blank">Ansible</a>',
    ]
  }
};
// CMDB相关公用函数 start
var relationData = function (item) {
  var init = function(){
    WUI.ModalDialog.create({
      buttonHide: true,
    });

    var _rowHtml = [];
    _rowHtml.push('<div class="relation-view">');
    _rowHtml.push('  <div class="data-search"></div>');
    _rowHtml.push('  <div class="data-table"></div>');
    _rowHtml.push('  <div class="data-paginator"></div>');
    _rowHtml.push('</div>');
    $('.modal-body').html(_rowHtml.join(''));

    var _relationViewColumn = {"data":[{"paths":["rack"],"tableName":"rack","columnName":"status","displayName":"配置项","type":"String","dictionaryValues":["位置","服务器","虚拟机","网络设备","应用"],"stick":true},{"paths":["rack"],"tableName":"rack","columnName":"code","displayName":"code","type":"String","dictionaryValues":[],"stick":true},{"paths":["rack"],"tableName":"rack","columnName":"status","displayName":"关联类型","type":"String","dictionaryValues":["依赖","包含"],"stick":true},{"paths":["rack"],"tableName":"rack","columnName":"code","displayName":"关联名","type":"String","dictionaryValues":[],"stick":true},{"paths":["rack"],"tableName":"rack","columnName":"created_time","displayName":"关联时间","type":"Date","dictionaryValues":[],"stick":true},{"paths":[],"tableName":"","columnName":"description","displayName":"描述","type":"String","dictionaryValues":[],"stick":true}]};
    WUI.DataSearch.create({
      $el: $('.modal-body .relation-view .data-search'),
      meta: _relationViewColumn,
      queryButton: '查询',
      onFilter: function (params) {
        queryDataRelationView($.extend(params, {
          currentPage: 1,
          pageSize: PAGE_SIZE_LABEL
        }));
      },
      addButton: '导出',
      addFunc: exportDataRelationView
    });

    queryDataRelationView({
      currentPage: 1,
      pageSize: PAGE_SIZE_LABEL
    });
  };

  var META_RELATION = {
    configName: { label: '配置项', maxLength: 200 },
    code: { label: 'Code', maxLength: 200 },
    type: { label: '关系', maxLength: 200 },
    name: { label: '关联名', maxLength: 200 },
    time: { label: '关联时间', maxLength: 200 },
    description: { label: '描述', maxLength: 200 }
  };
  var queryDataRelationView = function(options){
    var _jsonData = queryDataRelationJson();

    var _beforeSend = function(request) {
      request.setRequestHeader("pageNum", options.currentPage);
      request.setRequestHeader("pageLimit", options.pageSize);
      request.setRequestHeader("Authorization", getCookie('CMDB-TOKEN-TYPE') +' '+ getCookie('CMDB-TOKEN'));
    };

    WUI.ajax({
      url: DOMAIN.CMDB + CMDB_API.relation,
      method: 'POST',
      jsonData: _jsonData,
      disableXSS: true,
      beforeSend: _beforeSend
    }).then(function (resp) {
      WUI.DataTable.create({
        $el: $('.modal-body .relation-view .data-table'),
        meta: META_RELATION,
        fields: ['configName', 'code', 'type', 'name', 'time', 'description'],
        list: resp.list,
        groups: [{
          name: '下载',
          className: 'btn btn-xs btn-warning',
          id: 'btn-warning',
          callback: downloadDataRelationView
        }]
      });

      WUI.DataPaginator.create({
        $el: $('.modal-body .relation-view .data-paginator'),
        currentPage: options.currentPage - 1,
        total: resp.totalCount,
        pageSize: options.pageSize,
        onSwitchPage: function (currentPage) {
          queryDataRelationView({
            currentPage: currentPage + 1,
            pageSize: options.pageSize
          });
        }
      });
    });
  };

  var exportDataRelationView = function(){
    var _jsonData = queryDataRelationJson();

    var form=$("<form>");
    form.attr("id","exportDataForm");
    form.attr("style","display:none");
    form.attr("target","_blank");
    form.attr("method","post");
    form.attr("action",DOMAIN.CMDB + CMDB_API.relationDownload);
    var input1=$("<input>");
    input1.attr("type","hidden");
    input1.attr("name","jsonString");
    input1.attr("value",JSON.stringify(_jsonData));
    $("body").append(form);
    form.append(input1);
    form.submit();
    $('#exportDataForm').remove();
  };
  var downloadDataRelationView = function(itemDownload){
    var _jsonData = {
      "baseId": item.id,
      "ids": []
    };
    $.each(itemDownload, function(i, e){
      _jsonData.ids.push(e.id);
    });

    var form=$("<form>");
    form.attr("id","exportDataForm");
    form.attr("style","display:none");
    form.attr("target","_blank");
    form.attr("method","post");
    form.attr("action",DOMAIN.CMDB + CMDB_API.relationDownload);
    var input1=$("<input>");
    input1.attr("type","hidden");
    input1.attr("name","jsonString");
    input1.attr("value",JSON.stringify(_jsonData));
    $("body").append(form);
    form.append(input1);
    form.submit();
    $('#exportDataForm').remove();
  };

  var queryDataRelationJson = function(){
    var _jsonData = {};
    _jsonData['baseId'] = item.id;

    var _dom = $('.relation-view ul.data-search-basic li');
    var _tableNameDom = _dom.eq(0).find('input[type=checkbox]:checked');
    var _tableNameAry = [];
    $.each(_tableNameDom, function(i, e){
      var _name = $(this).parent().text();
      switch(_name){
        case '位置':
        _tableNameAry.push('rack');
        break;
        case '服务器':
        _tableNameAry.push('server');
        break;
        case '虚拟机':
        _tableNameAry.push('vm');
        break;
        case '网络设备':
        _tableNameAry.push('device');
        break;
        case '应用':
        _tableNameAry.push('project');
        break;
      }
    });
    if (_tableNameAry.length != 0) {
      _jsonData['configName'] = _tableNameAry;
    }

    var _code = _dom.eq(1).find('input[type=text]');
    if ($.trim(_code.val())) {
      _jsonData['code'] = $.trim(_code.val());
    }

    var _typeDom = _dom.eq(2).find('input[type=checkbox]:checked');
    var _typeAry = [];
    $.each(_typeDom, function(i, e){
      _typeAry.push($(this).parent().text());
    });
    if (_typeAry.length != 0) {
      _jsonData['type'] = _typeAry;
    }

    var _name = _dom.eq(3).find('input[type=text]');
    if ($.trim(_name.val())) {
      _jsonData['name'] = $.trim(_name.val());
    }

    var _time = _dom.eq(4).find('input[type=text]');
    if ($.trim(_time.eq(0).val())) {
      _jsonData['timeFrom'] = $.trim(_time.eq(0).val());
    }
    if ($.trim(_time.eq(1).val())) {
      _jsonData['timeTo'] = $.trim(_time.eq(1).val());
    }

    var _descriptionDom = _dom.eq(5).find('input[type=text]');
    if ($.trim(_descriptionDom.val())) {
      _jsonData['description'] = $.trim(_descriptionDom.val());
    }

    return _jsonData;
  };

  init();
};
var submitDataJson = function(item){
  var _names = [];
  var _values = [];
  var _submitData = {};

  var _dom = $('#html-dialog .modal-body .row:not(".row-no")');
  $.each(_dom.find('input'), function(i,e){
    var _this = _dom.find('input').eq(i);
    if(!!$.trim(_this.val())){
      _names.push(_this.attr('name'));
      _values.push($.trim(_this.val()));
    }
  });
  $.each(_dom.find('select'), function(i,e){
    var _this = _dom.find('select').eq(i);
    if(!!$.trim(_this.val())){
      _names.push(_this.attr('name'));
      _values.push(_this.val());
    }
  });
  $.each(_dom.find('textarea'), function(i,e){
    _names.push(_dom.find('textarea').eq(i).attr('name'));
    _values.push(_dom.find('textarea').eq(i).val());
  });

  for (var i = 0; i < _names.length; i++) {
    _submitData[_names[i]] = _values[i];
  }

  return _submitData;
};
var submitData = function(item){
  var _submitData = submitDataJson();

  var _url = CMDB_API.add;
  if(!!item.id){
    _url = CMDB_API.update;
    _submitData.id = item.id;
  }

  WUI.ajax({
    url: DOMAIN.CMDB + _url,
    method: 'POST',
    jsonData: _submitData
  }).then(function (resp) {
    if(resp.errorCode != '500'){
      $('#myModal').modal('hide');
      queryData({
        currentPage: 1,
        pageSize: PAGE_SIZE
      });
    }
  }).fail(function(resp){
    $('#myModal').modal('hide');
  });
};
var deleteData = function (item) {
  var _jsonData = [];
  if(!!item.length){
    $.each(item, function(i,e){
      _jsonData.push(e.id);
    });
  }else{
    _jsonData.push(item.id);
  }

  var confirmDialog = WUI.ModalDialog.create({
    title: '请确认',
    message: '是否确定删除数据？',
    onConfirm: function () {
      WUI.ajax({
        url: DOMAIN.CMDB + CMDB_API.delete,
        method: 'POST',
        jsonData: _jsonData
      }).then(function (resp) {
        confirmDialog.hide();
        queryData({
          currentPage: 1,
          pageSize: PAGE_SIZE
        });
      });
    }
  });
};
var labelDataJson = {};
var labelDataHtml = function(data){
  var _rowHtml = [];
  _rowHtml.push('    <h4>已选择标签<span>清除全部</span></h4>');
  $.each(data, function(i) {
    _rowHtml.push('    <p class="active"><span></span>'+ i +'</p>');
    _rowHtml.push('    <ul>');
    for (var j = 0; j < data[i].length; j++) {
      _rowHtml.push('      <li>' + data[i][j] + '</li>');
    }
    _rowHtml.push('    </ul>');
  });

  $('.modal-body .data-label').html(_rowHtml.join(''));
  $('.modal-body .data-label p').click(function(){
    var _this = $(this);
    if(_this.hasClass('active')){
      _this.removeClass('active');
    }else{
      _this.addClass('active');
    }
  });
  $('.modal-body .data-label > h4 span').click(function(){
    labelDataJson = {};
    labelDataHtml(labelDataJson);
    $('.modal-body .data-table input[type=checkbox]').prop('checked', false);
  });
}
var labelColumnTableFields = [];
var labelData = function(item){
  // 获取当前ids已经打上的便签，拼装dom；然后在modal弹出层上ajax标签的colmun，再拉取列表
  var _table = item[0].table;
  var _ids = [];
  $.each(item, function(i,e){
    _ids.push(e.id);
  });

  WUI.ajax({
    url: DOMAIN.CMDB + '/web/label/ex/queryLabel?table=' + _table + '&ids=' + _ids.join(','),
    method: 'POST'
  }).then(function (resp) {
    labelDataJson = resp;
    WUI.ModalDialog.create({
      title: '标签',
      onConfirm: submitLabelData.bind(this, _table, _ids)
    });

    var _rowHtml = [];
    _rowHtml.push('<div class="row">');
    _rowHtml.push('  <div class="col-lg-9 col-md-9 col-sm-9 data-label-cont">');
    _rowHtml.push('    <div class="data-search"></div>');
    _rowHtml.push('    <div class="data-table"></div>');
    _rowHtml.push('    <div class="data-paginator"></div>');
    _rowHtml.push('  </div>');
    _rowHtml.push('  <div class="col-lg-3 col-md-3 col-sm-3 data-label">');
    _rowHtml.push('  </div>');
    _rowHtml.push('</div>');
    $('.modal-body').html(_rowHtml.join(''));
    labelDataHtml(labelDataJson);
  }).then(function(){
    WUI.ajax({
      url: DOMAIN.CMDB + '/web/label/column',
      method: 'POST',
    }).then(function (resp) {
      // 创建标签table的展示列
      labelColumnTableFields = [];
      $.each(resp.showColumnName, function(i, e){
        META[i].label = e;
        labelColumnTableFields.push(i);
      });
      WUI.DataSearch.create({
        $el: $('.modal-body .data-search'),
        meta: resp,
        queryButton: '查询',
        onFilter: function (params) {
          labelQueryData($.extend(params, {
            currentPage: 1,
            pageSize: PAGE_SIZE_LABEL
          }));
        }
      });
      labelQueryData({
        currentPage: 1,
        pageSize: PAGE_SIZE_LABEL
      });
    });
  });
};
var labelQueryData = function (options) {
  var _beforeSend = function(request) {
    request.setRequestHeader("pageNum", options.currentPage);
    request.setRequestHeader("pageLimit", options.pageSize);
    request.setRequestHeader("Authorization", getCookie('CMDB-TOKEN-TYPE') +' '+ getCookie('CMDB-TOKEN'));
  };
  
  WUI.ajax({
    url: DOMAIN.CMDB + '/web/label/query',
    method: 'POST',
    jsonData: queryJson(true),
    disableXSS: true,
    beforeSend: _beforeSend
  }).then(function (resp) {
    WUI.DataTable.create({
      $el: $('.modal-body .data-table'),
      meta: META,
      fields: labelColumnTableFields,
      list: resp.list,
      groups: [{
        name: '标签',
        className: 'btn btn-xs btn-success',
        callback: labelData
      }]
    });

    WUI.DataPaginator.create({
      $el: $('.modal-body .data-paginator'),
      currentPage: options.currentPage - 1,
      total: resp.totalCount,
      pageSize: options.pageSize,
      onSwitchPage: function (currentPage) {
        labelQueryData({
          currentPage: currentPage + 1,
          pageSize: options.pageSize
        });
      }
    });

    $.each($('.modal-body tbody tr'), function(i, e){
      var _this = $(this);
      var _key = _this.find('td').eq(1).text();
      var _value = _this.find('td').eq(2).text();
      if(!!labelDataJson[_key]){
        $.each(labelDataJson[_key], function(j, f){
          if(labelDataJson[_key][j] == _value){
            _this.find('input[type=checkbox]').prop('checked', true);
          }
        });
      }
    });
    // 标签系统checkbox框事件效果
    $('.modal-body .data-table input[type=checkbox]').click(function(){
      // console.log('变化前：', labelDataJson);
      var _this = $(this);
      var _thisP = _this.parents('tr');
      var _thisKey = _thisP.find('td').eq(1).text();
      var _thisValue = _thisP.find('td').eq(2).text();
      if(_this.is(':checked')){
        if (!!labelDataJson[_thisKey]) {
          var _hasValue = false;
          $.each(labelDataJson[_thisKey],function(i,e){
            if(_thisValue == e){
              _hasValue = true;

              return true;
            }
          });
          if(!_hasValue){
            labelDataJson[_thisKey].push(_thisValue);
          }
        }else{
          labelDataJson[_thisKey] = [_thisValue];
        }
      }else if(labelDataJson[_thisKey].length == 1){
        delete labelDataJson[_thisKey];
      }else{
        $.each(labelDataJson[_thisKey], function(i, e){
          if(_thisValue == e){
            labelDataJson[_thisKey].splice(i, 1);

            return true;
          }
        });
      }
      // console.log('变化后：', labelDataJson);
      // console.log('--------------------');
      labelDataHtml(labelDataJson);
    });
  });
};
var submitLabelData = function(table, ids){
  var _labels = [];
  $.each(labelDataJson, function(i, e){
    $.each(e, function(j, f){
      var _label = i + ':' + f;
      _labels.push(_label);
    });
  });

  WUI.ajax({
    url: DOMAIN.CMDB + '/web/label/ex/addLabel?table='+ table +'&ids='+ ids.join(',') +'&labels='+ _labels.join(','),
    method: 'POST'
  }).then(function (resp) {
    $('#myModal').modal('hide');
    $('body').removeClass('modal-open');
    WUI.alert.create({
      message: '标签修改成功',
      success: true
    });

    WUI.ajax({
      url: DOMAIN.CMDB + CMDB_API.column,
      method: 'POST',
    }).then(function (resp) {
      var _rowHtml = [];
      if(resp.data[0].dictionaryValues.length > 0){
        _rowHtml.push('<div class="data-search-condition data-search-checkbox">');
        $.each(resp.data[0].dictionaryValues, function(i, e){
          _rowHtml.push('<label><input type="checkbox" name="_label_">'+ e +'</label>');
        });
        _rowHtml.push('</div>');
      }else{
        _rowHtml.push('<div class="data-search-condition data-search-text">');
        _rowHtml.push('  <input class="form-control" type="text" name="_label_" placeholder="标签">');
        _rowHtml.push('</div>');
      }

      $('.data-search-basic li').eq(0).find('.data-search-condition').remove();
      $('.data-search-basic li').eq(0).append(_rowHtml.join('')).find('button > p > span').text('');

      queryData({
        currentPage: 1,
        pageSize: PAGE_SIZE
      });
    });
  }).fail(function(resp){
    $('#myModal').modal('hide');
  });
};
var queryJson = function(label, extend){
  var _jsonDataS = {"data": []};
  if (label) {
    var _this = $('.modal-body .data-search > ul:not(".data-tools") > li:not(".data-search-else")');
  } else if (extend) {
    var _this = $('.data-search.'+ extend +' > ul:not(".data-tools") > li:not(".data-search-else")');
  } else {
    var _this = $('.box > .data-search > ul:not(".data-tools") > li:not(".data-search-else")');
  }
  $.each(_this, function(i,e){
    var _jsonData = {
      "paths": [],
      "tableName": "",
      "columnName": ""
    };
    _jsonData.paths = _this.eq(i).attr('data-paths').split(',');
    _jsonData.tableName = _this.eq(i).attr('data-tableName');
    _jsonData.columnName = _this.eq(i).attr('data-columnName');

    // 三种查询条件，依次为输入框、选择框和范围，else为"描述"，内部if如果没有填值，跳出循环
    var _conditionType = _this.eq(i).find('.data-search-condition');
    if(_conditionType.hasClass('data-search-text')){
      var _thisDom = _conditionType.find('input');
      if(!$.trim(_thisDom.val())){
        return true;
      }
      _jsonData.value = $.trim(_thisDom.val());
    }else if(_conditionType.hasClass('data-search-checkbox')){
      var _thisDom = _conditionType.find('input:checked');
      if(!_thisDom.length){
        return true;
      }
      _jsonData.values = [];
      $.each(_thisDom,function(j,f){
        _jsonData.values.push(_thisDom.eq(j).parent().text());
      });
    }else if(_conditionType.hasClass('data-search-fromTo')){
      var _thisDom = _conditionType.find('input');
      if(!$.trim(_thisDom.eq(0).val()) && !$.trim(_thisDom.eq(1).val())){
        return true;
      }
      _jsonData.from = $.trim(_thisDom.eq(0).val());
      _jsonData.to = $.trim(_thisDom.eq(1).val());
    }else{
      var _thisDom = _this.eq(i).find('input');
      if(!$.trim(_thisDom.val())){
        return true;
      }
      _jsonData.value = $.trim(_thisDom.val());
    }

    _jsonDataS.data.push(_jsonData);
  });

  return _jsonDataS;
};
var TABLE_FIELDS = [];
var queryData = function (options, sort, column) {
  if (sort && column) {
    var _beforeSend = function(request) {
      request.setRequestHeader("pageNum", options.currentPage);
      request.setRequestHeader("pageLimit", options.pageSize);
      request.setRequestHeader("Authorization", getCookie('CMDB-TOKEN-TYPE') +' '+ getCookie('CMDB-TOKEN'));
      request.setRequestHeader("sortType", sort);
      request.setRequestHeader("sortColumn", column);
    };
  } else {
    var _beforeSend = function(request) {
      request.setRequestHeader("pageNum", options.currentPage);
      request.setRequestHeader("pageLimit", options.pageSize);
      request.setRequestHeader("Authorization", getCookie('CMDB-TOKEN-TYPE') +' '+ getCookie('CMDB-TOKEN'));
    };
  }
  
  WUI.ajax({
    url: DOMAIN.CMDB + CMDB_API.query,
    method: 'POST',
    jsonData: queryJson(),
    disableXSS: true,
    beforeSend: _beforeSend
  }).then(function (resp) {
    WUI.DataTable.create({
      $el: $('.data-table'),
      meta: META,
      fields: TABLE_FIELDS,
      list: resp.list,
      operations: [{
        name: '关系',
        callback: relationData
      }, {
        name: '编辑',
        callback: createData
      }, {
        name: '删除',
        callback: deleteData
      }],
      groups: [{
        name: '标签',
        className: 'btn btn-xs btn-success',
        id: 'btn-success',
        callback: labelData
      }, {
        name: '下载',
        className: 'btn btn-xs btn-warning',
        id: 'btn-warning',
        callback: downloadData
      }, {
        name: '批量删除',
        className: 'btn btn-xs btn-danger',
        id: 'btn-danger',
        callback: deleteData
      }],
      cmdbSort: true,
      cmdbSortFun: queryDataSort
    });

    if (sort && column) {
      var _dom = $('.content-wrapper .data-table thead th');
      $.each(_dom, function(i, e){
        if ($(this).attr('data-column') == column) {
          $(this).addClass('cmdb-sort-'+ sort );
          $(this).append('<span></span>');

          return true;
        }
      });

      WUI.DataPaginator.create({
        $el: $('.data-paginator'),
        currentPage: options.currentPage - 1,
        total: resp.totalCount,
        pageSize: options.pageSize,
        onSwitchPage: function (currentPage) {
          queryData({
            currentPage: currentPage + 1,
            pageSize: options.pageSize
          }, sort, column);
        }
      });

    } else {

      WUI.DataPaginator.create({
        $el: $('.data-paginator'),
        currentPage: options.currentPage - 1,
        total: resp.totalCount,
        pageSize: options.pageSize,
        onSwitchPage: function (currentPage) {
          queryData({
            currentPage: currentPage + 1,
            pageSize: options.pageSize
          });
        }
      });
    }
  });
};
var queryDataSort = function(sort, column){
  queryData({
    currentPage: 1,
    pageSize: PAGE_SIZE
  }, sort, column);
};
var downloadData = function(item){
  var _jsonData = {
    "data": [{
      "paths": [item[0].table],
      "tableName": item[0].table,
      "columnName": "id",
      "values": []
    }]
  };
  $.each(item, function(i, e){
    _jsonData.data[0].values.push(e.id);
  });
  var form=$("<form>");
  form.attr("id","exportDataForm");
  form.attr("style","display:none");
  form.attr("target","_blank");
  form.attr("method","post");
  form.attr("action",DOMAIN.CMDB + CMDB_API.export);
  var input1=$("<input>");
  input1.attr("type","hidden");
  input1.attr("name","jsonString");
  input1.attr("value",JSON.stringify(_jsonData));
  $("body").append(form);
  form.append(input1);
  form.submit();
  $('#exportDataForm').remove();
};
var exportData = function(){
  var form=$("<form>");
  form.attr("id","exportDataForm");
  form.attr("style","display:none");
  form.attr("target","_blank");
  form.attr("method","post");
  form.attr("action",DOMAIN.CMDB + CMDB_API.export);
  var input1=$("<input>");
  input1.attr("type","hidden");
  input1.attr("name","jsonString");
  input1.attr("value",JSON.stringify(queryJson()));
  $("body").append(form);
  form.append(input1);
  form.submit();
  $('#exportDataForm').remove();
};
var importData = function(e){
  WUI.loading.create();
  var file = e.files[0];
  var formData = new FormData();
  formData.append('file', file);

  $.ajax({
    url: DOMAIN.CMDB + CMDB_API.import,
    data: formData,
    method: 'POST',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    beforeSend: function(xhr){xhr.setRequestHeader("Authorization", getCookie('CMDB-TOKEN-TYPE') +' '+ getCookie('CMDB-TOKEN'));}
  }).then(function (resp) {
    $('#loadingPop').remove();
    importDataEmpty();

    if(resp.errorCode === '500'){
      WUI.alert.create({
        message: resp.message,
        fail: true
      });
    }else{
      WUI.alert.create({
        message: '导入成功',
        success: true
      });

      queryData({
        currentPage: 1,
        pageSize: PAGE_SIZE
      });
    }
  }).fail(function(resp){
    $('#loadingPop').remove();
    importDataEmpty();

    WUI.alert.create({
      message: '导入失败',
      fail: true
    });
  });

  var importDataEmpty = function(){
    if (e.outerHTML) {
      e.outerHTML = e.outerHTML;
    } else {
      e.value = "";
    }
  };
};
var queryDictionary = function(table_name){
  WUI.ajax({
    url: DOMAIN.CMDB + CMDB_API.queryDictionary,
    method: 'POST',
    jsonData: {
      "table_name": table_name
    }
  }).then(function (resp) {
    $.each(resp.list, function(i,e){
      var _option = {
        label: e.content,
        value: e.content
      }
      META[e.column_name].options.push(_option);
    });
  }).then(queryColumn);
};
var queryColumn = function(){
  WUI.ajax({
    url: DOMAIN.CMDB + CMDB_API.column,
    method: 'POST',
  }).then(function (resp) {
    // 创建展示列
    SEARCH_SUBS['columns']['options'] = resp.allColumnName;
    // 创建table的展示列
    TABLE_FIELDS = [];
    $.each(resp.showColumnName, function(i, e){
      console.log(i + e);
      if(!!META[i]){
        META[i].label = e;
      }else{
        META[i] = { label: '', maxLength: 200 };
        META[i].label = e;
      }
      TABLE_FIELDS.push(i);
    });
    console.log(TABLE_FIELDS);
    // 创建filter
    WUI.DataSearch.create({
      $el: $('.content-wrapper .data-search'),
      meta: resp,
      searchSubs: SEARCH_SUBS ? SEARCH_SUBS : {},
      columnConfirm: columnConfirm,
      queryButton: '查询',
      onFilter: function (params) {
        queryData($.extend(params, {
          currentPage: 1,
          pageSize: PAGE_SIZE
        }));
      },
      addButton: '新增',
      addFunc: createData
    });

    // 列表数据
    queryData({
      currentPage: 1,
      pageSize: PAGE_SIZE
    });
  });
};
var columnConfirm = function(){
  var _cloumns = [];
  $.each($('.data-tools-column-li input:checked'), function(i, e){
    var _this = $(this);
    _cloumns.push(_this.attr('name'));
  });

  WUI.ajax({
    url: DOMAIN.CMDB + CMDB_API.showCloumn + '?table='+ CMDB_API.table +'&columns=' + _cloumns.join(','),
    method: 'POST'
  }).then(function(){
    WUI.ajax({
      url: DOMAIN.CMDB + CMDB_API.column,
      method: 'POST',
    }).then(function (resp) {
      var _rowHtml = [];
      $.each(resp.allColumnName, function(i, e){
        var _checked = '';
        if (e.stick) {
          _checked = ' checked';
        }
        _rowHtml.push('<label><input type="checkbox" name="'+ e.columnName +'"'+ _checked +'>'+ e.columnDisplayName +'</label>');
      });
      $('.data-tools-column-li').html(_rowHtml.join(''));

      // 创建table的展示列
      TABLE_FIELDS = [];
      $.each(resp.showColumnName, function(i, e){
        if(!!META[i]){
          META[i].label = e;
        }else{
          META[i] = { label: '', maxLength: 200 };
          META[i].label = e;
        }
        TABLE_FIELDS.push(i);
      });
      // 列表数据
      queryData({
        currentPage: 1,
        pageSize: PAGE_SIZE
      });
    });
  });
};

var nameToTable = function(name){
  var _table = '';
  switch(name){
    case '位置':
    _table = 'rack';
    break;
    case '服务器':
    _table = 'server';
    break;
    case '虚拟机':
    _table = 'vm';
    break;
    case '网络设备':
    _table = 'device';
    break;
    case '应用':
    _table = 'project';
    break;
  }

  return _table;
};
var tableToName = function(table){
  var _name = '';
  switch(table){
    case 'rack':
    _name = '位置';
    break;
    case 'server':
    _name = '服务器';
    break;
    case 'vm':
    _name = '虚拟机';
    break;
    case 'device':
    _name = '网络设备';
    break;
    case 'project':
    _name = '应用';
    break;
  }

  return _name;
};
// CMDB相关公用函数 end

//var WUI = window.WUI || {};
WUI.init = function (options) {
  // init global config
  WUI.config = WUI.config || {};
  WUI.config.system = options.system;
  WUI.config.locale = options.locale || 'zh-CN';

  var initSiteHeader = function (resp) {
    WUI.SiteHeader.create({
      $el: $('.main-header'),
      name: resp.aasUserPrincipal.ssoUserName,
      roles: resp.aasUserPrincipal.aasUserResources.roles[0].roleName,
      cmdbQuick: true
    })
  };

  var filterMenus = function(resources) {
    var menus = [];

    for (var i = 0; i < resources.length; i++) {
      var resource = resources[i];

      if (resource.resourceType === 'menu') {
        if (!resource.isLeaf) {
          resource.subs = [];
        }
        menus.push(resource);
      }
    }

    return menus;
  };

  var findParent = function (resource, resources) {
    var result = null;

    if (resource.parentLevelStructure) {
      for (var i = 0; i < resources.length; i++) {
        if (resources[i].levelStructure === resource.parentLevelStructure) {
          result = resources[i];
          break;
        }
      }
    }

    return result;
  }

  var initSiteMenu = function (resp) {
    var menus = [];
    var resources = resp.aasUserPrincipal.aasUserResources.resources;
    // 首页是为子系统单独添加的，没有放入后台做管理
    var isHome = window.location.href.indexOf(WUI.config.system + '/home.html') >= 0;

    if (WUI.config.system === 'order') {
      // 工单系统四级菜单结构如：1.2.3.4.5 (第一位为子系统)
      var menuResources = filterMenus(resources);

      for (var index = 0; index < menuResources.length; index++) {
        var menuResource = menuResources[index];
        var parent = findParent(menuResource, menuResources);

        if (!isHome && window.location.href.indexOf(menuResource.linkUr) >= 0) {
          menuResource.isActive = true;
        }

        if (parent) {
          parent.subs.push(menuResource);
        } else {
          menus.push(menuResource);
        }
      }
    } else {
      // 统一系统二级菜单结构如：1.2.3 (第一位为子系统)
      for (var i = 0; i < resources.length; i++) {
        var resource = resources[i];
        if (resource.linkUrl && resource.linkUrl.indexOf('trade-monitor') > 0) {
          resource.newPage = true;
        }
        if (resource.resourceType === 'menu') {
          var linkUrl = resource.linkUrl;
          var address = window.location.href;

          if (!isHome && address.indexOf(linkUrl) >= 0) {
            resource.isActive = true;
          }

          var level = resource.levelStructure.split('.');

          if (level[1] === '0') {
            resource.subs = [];
            for (var j = 0; j < resources.length; j++) {
              var sub = resources[j];

              if (sub.resourceType === 'menu' &&
                sub.parentLevelStructure === resource.levelStructure) {
                sub.subs = [];
              for (var k = 0; k < resources.length; k++) {
                var third = resources[k];

                if (third.resourceType === 'menu' &&
                  third.parentLevelStructure === sub.levelStructure) {
                  sub.isLeaf = true;
                sub.subs.push(third);
              }
            }
                // 兼容新菜单结构
                sub.isLeaf = true;
                resource.subs.push(sub);
              }
            }
            menus.push(resource);
          }
        }
      }
    }

    var cmdbMenu = [{
      resourceDisplayName : 'CMDB',
      subs : [{
        resourceDisplayName :'配置项维护',
        subs:[{
          resourceDisplayName : '位置',
          linkUrl:'/cmdb/idc-list.html',
          isActive:window.location.href.indexOf('/cmdb/idc-list.html') > 1 ? true : false,
          isLeaf:true
        }, {
          resourceDisplayName : '服务器',
          linkUrl:'/cmdb/serve-list.html',
          isActive:window.location.href.indexOf('/cmdb/serve-list.html') > 1 ? true : false,
          isLeaf:true
        }, {
          resourceDisplayName : '虚拟机',
          linkUrl:'/cmdb/vm-list.html',
          isActive:window.location.href.indexOf('/cmdb/vm-list.html') > 1 ? true : false,
          isLeaf:true
        }, {
          resourceDisplayName : '网络设备',
          linkUrl:'/cmdb/device-list.html',
          isActive:window.location.href.indexOf('/cmdb/device-list.html') > 1 ? true : false,
          isLeaf:true
        }, {
          resourceDisplayName : '应用',
          linkUrl:'/cmdb/project-list.html',
          isActive:window.location.href.indexOf('/cmdb/project-list.html') > 1 ? true : false,
          isLeaf:true
        }, {
          resourceDisplayName : '关系',
          linkUrl:'/cmdb/relation-list.html',
          isActive:window.location.href.indexOf('/cmdb/relation-list.html') > 1 ? true : false,
          isLeaf:true
        }]
      // }, {
      //   resourceDisplayName :'IP规划管理',
      //   subs:[{
      //     resourceDisplayName : 'IP规划列表'
      //   }, {
      //     resourceDisplayName : 'IP使用'
      //   }]
    }, {
      resourceDisplayName :'配置项管理',
      subs:[{
        //   resourceDisplayName : '配置项管理',
        //   linkUrl:'/cmdb/relation-list.html',
        //   isActive:window.location.href.indexOf('/cmdb/relation-list.html') > 1 ? true : false,
        //   isLeaf:false
        // }, {
        //   resourceDisplayName : '配置项-标签配置',
        //   linkUrl:'/cmdb/configuration-list.html',
        //   isActive:window.location.href.indexOf('/cmdb/configuration-list.html') > 1 ? true : false,
        //   isLeaf:false
        // }, {
          resourceDisplayName : '配置项查询',
          linkUrl:'/cmdb/quick-query.html',
          isActive:window.location.href.indexOf('/cmdb/quick-query.html') > 1 ? true : false,
          isLeaf:true
        }]
      // }, {
      //   resourceDisplayName :'统计查询',
      //   subs:[{
      //     resourceDisplayName : '位子_机柜使用'
      //   }, {
      //     resourceDisplayName : '位子_设备分布'
      //   }, {
      //     resourceDisplayName : '位子_设备状态'
      //   }, {
      //     resourceDisplayName : '应用_分布'
      //   }, {
      //     resourceDisplayName : '维保查询'
      //   }, {
      //     resourceDisplayName : 'IP使用'
      //   }]
    }]
    // }, {
    //   resourceDisplayName : '变更管理'
  }, {
    resourceDisplayName : '通知管理',
    subs : [{
      resourceDisplayName :'标签',
      linkUrl:'/cmdb/notify-label.html',
      isActive:window.location.href.indexOf('/cmdb/notify-label.html') > 1 ? true : false,
      isLeaf:true
    }, {
      resourceDisplayName :'配置项',
      linkUrl:'/cmdb/notify-config.html',
      isActive:window.location.href.indexOf('/cmdb/notify-config.html') > 1 ? true : false,
      isLeaf:true
    }]
  }, {
    resourceDisplayName : '系统管理',
    subs : [{
      resourceDisplayName :'标签',
      linkUrl:'/cmdb/label-list.html',
      isActive:window.location.href.indexOf('/cmdb/label-list.html') > 1 ? true : false,
      isLeaf:true
    }, {
      resourceDisplayName :'数据字典',
      linkUrl:'/cmdb/dictionary-list.html',
      isActive:window.location.href.indexOf('/cmdb/dictionary-list.html') > 1 ? true : false,
      isLeaf:true
    }, {
      resourceDisplayName :'用户',
      linkUrl:'/cmdb/people-list.html',
      isActive:window.location.href.indexOf('/cmdb/people-list.html') > 1 ? true : false,
      isLeaf:true
      // }, {
      //   resourceDisplayName :'菜单管理'
      // }, {
      //   resourceDisplayName :'权限管理'
    }]
  }];

  $('.main-sidebar').replaceWith(WUI.templates['site-menu']({
    menus: cmdbMenu,
    isHome: isHome
  }));

  $('.sidebar-menu li').click(function(event){
    var _this = $(this);
    if(_this.hasClass('active')){
      _this.removeClass('active');
    }else{
      $('.sidebar-menu li').removeClass('active');
      _this.addClass('active').parents('li').addClass('active');
      _this.parents('.treeview-menu').prev().addClass('active');
    }

    event.stopPropagation();
  });
  var _locationUrl = window.location.href;
  var _locationHost = _locationUrl.split('/')[0] + '//' + _locationUrl.split('/')[2];
  var _locationHref = _locationUrl.slice(_locationHost.length).split('?')[0];
  $.each($('.sidebar-menu a'), function(){
    var _this = $(this);
    var _url = _this.attr('href');
    if(_url == _locationHref){
      _this.parents('li').addClass('active');
      _this.parents('.treeview-menu').prev('li').addClass('active');

      return false;
    }
  });
};

var initConfigInfo = '';

var initSiteFooter = function (resp) {
  $('.main-footer').replaceWith(WUI.templates['site-footer'](resp));
};

WUI.getResource = function (url, a) {
  var la = a ? a : window.location.pathname;
  url = la + url;
  for (var i = 0; i < initConfigInfo.length; i++) {
    var _link = initConfigInfo[i].linkUrl;
    if (url == _link) {
      var info = initConfigInfo[i];
    }
  }
  return info
}

var initSystem = function () {
    // WUI.ajax({
    //   url: '/' + WUI.config.system + '/web/v1/sso/getResources',
    //   method:'POST'
    // }).done(function(resp) {
      var resp = {
        "aasUserPrincipal":{
          "aasUserResources":{
            "resources":[],
            "roles":[{"roleName":"Administrator"}]
          },
          "ssoUserName": getCookie('CMDB-USERNAME')
        }
      };

      WUI.config.userName = resp.aasUserPrincipal.ssoUserName,
      initSiteHeader(resp);
      initSiteMenu(resp);
      initSiteFooter(resp);
      initConfigInfo = resp.aasUserPrincipal.aasUserResources.resources;
      $.AdminLTE.init();
      WUI.ready();

      $('.navbar-cmdb-quick input').focus();
      $('.navbar-cmdb-quick input').keyup(function(event){
        var _key = $.trim($(this).val());
        if(event.keyCode == 13){
          window.location.href = '/cmdb/quick-query.html?key=' + _key;
        }
      });
    // });
  };

  initSystem(options);
};

WUI.ready = WUI.ready || function () {
  console.error('WUI: Please provide WUI.ready function.');
};

WUI.typeItem = function (sub, info) {
  var list = []
  info.map(function (item) {
    if (item.codeType == sub) {
      list.push(item);
    }
  })
  return list
}

function getCookie( name ) {
  var start = document.cookie.indexOf( name + "=" );
  var len = start + name.length + 1;
  if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
    return null;
  }
  if ( start == -1 ) return null;
  var end = document.cookie.indexOf( ';', len );
  if ( end == -1 ) end = document.cookie.length;
  return unescape( document.cookie.substring( len, end ) );
}
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  document.cookie = name + "=; expires=" + exp.toGMTString();
}
