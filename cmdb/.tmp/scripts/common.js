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
  location: { label: 'IDC', maxLength: 30 },
  rack: { label: '机柜', maxLength: 30 },
  rack_region: { label: '区域', maxLength: 30 },
  serial_number: { label: 'SN', maxLength: 30 },
  cpu: { label: 'CPU', maxLength: 30 },
  model: { label: '型号', maxLength: 30 },
  memory: { label: '内存', maxLength: 30 },
  raid: { label: 'Raid 信息', maxLength: 30 },
  harddisk: { label: '硬盘', maxLength: 30 },
  manage_ip: { label: '管理IP', maxLength: 30 },
  vip: { label: 'VIP', maxLength: 30 },
  typical_case: { label: '典型配置', maxLength: 30 },
  name: { label: '名称', maxLength: 30 },
  optional: { label: '其他', maxLength: 30 },
  net_name1: { label: 'eth0', maxLength: 30 },
  net_ip1: { label: 'eth0IP', maxLength: 30 },
  net_name2: { label: 'eth1', maxLength: 30 },
  net_ip2: { label: 'eth1IP', maxLength: 30 },
  net_name3: { label: 'eth2', maxLength: 30 },
  net_ip3: { label: 'eth2IP', maxLength: 30 },
  net_name4: { label: 'eth3', maxLength: 30 },
  net_ip4: { label: 'eth3IP', maxLength: 30 },
  net_name5: { label: 'eth4', maxLength: 30 },
  net_ip5: { label: 'eth4IP', maxLength: 30 },
  net_name6: { label: 'eth5', maxLength: 30 },
  net_ip6: { label: 'eth5IP', maxLength: 30 },
  net_name7: { label: 'eth6', maxLength: 30 },
  net_ip7: { label: 'eth6IP', maxLength: 30 },
  net_name8: { label: 'eth7', maxLength: 30 },
  net_ip8: { label: 'eth7IP', maxLength: 30 },
  net_name9: { label: 'eth8', maxLength: 30 },
  net_ip9: { label: 'eth8IP', maxLength: 30 },
  server_code: { label: '服务器_code', maxLength: 30 },
  label_key: { label: '标签键', maxLength: 30 },
  label_value: { label: '标签值', maxLength: 30 },
  version: { label: '版本', maxLength: 30 },
  hostname: { label: '主机名', maxLength: 30 },
  u_amount: { label: 'U位', maxLength: 30 },
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
  purchase_time: { label: '采购时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 30 },
  arrival_time: { label: '到货时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 30 },
  stock_time: { label: '上架时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 30 },
  maintain_time_begin: { label: '维保开始时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 30 },
  maintain_time_end: { label: '维保结束时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 30 },
  created_time: { label: '创建时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 30 },
  updated_time: { label: '更新时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 30 },
  alloc_deadline: { label: '分配截止时间', type: 'dateCmdb', format: 'yyyy-DD-MM', maxLength: 30 },
  description: { label: '描述', maxLength: 100 }
};

// CMDB 操作&工具，若不需要展示则内部js设置为空
var SEARCH_TOOLS = [{
  label: '操作',
  options: [{
    rowHtml: '<a href="javascript:void(0);" onclick="exportData();">导出</a>'
  }, {
    rowHtml: '<a href="javascript:void(0);" style="position:relative;">导入<input type="file" accept=".xls" onChange="importData(this);" style="position:absolute;left:0;top:0;bottom:0;opacity:0;width:100%;" /></a>'
  }]
},{
  label: '工具',
  options: [{
    rowHtml: '<a href="http://10.214.124.55/zabbix/" target="_blank">zabbix</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.53:8080/" target="_blank">Jira</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.53:8090/" target="_blank">Confluence</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.53/itop/" target="_blank">Itop</a>'
  }, {
    rowHtml: '<a href="http://10.214.66.75/" target="_blank">ELK</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.57/svnadmin/" target="_blank">Svn</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.57:8081/" target="_blank">GitLab</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.58:8080/" target="_blank">Jenkins</a>'
  }, {
    rowHtml: '<a href="http://10.214.124.56:8081/nexus/" target="_blank">Nexus</a>'
  }, {
    rowHtml: '<a href="https://10.214.124.59/" target="_blank">Ansible</a>'
  }]
}];
// CMDB相关公用函数 start
var relationData = function (item) {
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
var submitData = function(item){
  var _names = [];
  var _values = [];
  var _submitData = {};

  var _dom = $('#html-dialog .modal-body');
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
    // _names.push(_dom.find('select').eq(i).attr('name'));
    // _values.push(_dom.find('select').eq(i).val());
  });
  $.each(_dom.find('textarea'), function(i,e){
    _names.push(_dom.find('textarea').eq(i).attr('name'));
    _values.push(_dom.find('textarea').eq(i).val());
  });

  for (var i = 0; i < _names.length; i++) {
    _submitData[_names[i]] = _values[i];
  }

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
    $('#html-dialog, .modal-backdrop').remove();
    $('body').removeClass('modal-open');
    queryData({
      currentPage: 1,
      pageSize: PAGE_SIZE
    });
  }).fail(function(resp){
    $('#html-dialog, .modal-backdrop').remove();
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
    _rowHtml.push('  <div class="col-lg-9 col-md-9 col-sm-9">');
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
      labelColumnTableFields = resp.showColumnName;
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
    $('#html-dialog, .modal-backdrop').remove();
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
    $('#html-dialog, .modal-backdrop').remove();
  });
};
var queryJson = function(label){
  var _jsonDataS = {"data": []};
  if(label){
    var _this = $('.modal-body .data-search > ul:not(".data-tools") > li:not(".data-search-else")');
  }else{
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
var queryData = function (options) {
  var _beforeSend = function(request) {
    request.setRequestHeader("pageNum", options.currentPage);
    request.setRequestHeader("pageLimit", options.pageSize);
    request.setRequestHeader("Authorization", getCookie('CMDB-TOKEN-TYPE') +' '+ getCookie('CMDB-TOKEN'));
  };
  
  WUI.ajax({
    url: DOMAIN.CMDB + CMDB_API.query,
    method: 'POST',
    // jsonData: {},
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
      }]
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
        });
      }
    });
  });
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
    // 创建table的展示列
    TABLE_FIELDS = resp.showColumnName;
    // 创建filter
    WUI.DataSearch.create({
      $el: $('.content-wrapper .data-search'),
      meta: resp,
      searchTools: SEARCH_TOOLS ? SEARCH_TOOLS : [],
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
          resourceDisplayName : '关系'
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
      resourceDisplayName :'标签'
    }, {
      resourceDisplayName :'配置项'
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIFBBR0VfU0laRSA9IDIwO1xudmFyIFBBR0VfU0laRV9MQUJFTCA9IDEwO1xudmFyIERPTUFJTiA9IHtcbiAgQ01EQiA6ICcnXG59O1xuaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJzEyNy4wLjAuMScpID09IDcpIHtcbiAgRE9NQUlOWydDTURCJ10gPSAnaHR0cDovL2NtZGIuYXBpLmRldi53YW5kYS5jb20nO1xufVxudmFyIE1FVEEgPSB7XG4gIGlkOiB7IGxhYmVsOiAnSUQnIH0sXG4gIGxvY2F0aW9uOiB7IGxhYmVsOiAnSURDJywgbWF4TGVuZ3RoOiAzMCB9LFxuICByYWNrOiB7IGxhYmVsOiAn5py65p+cJywgbWF4TGVuZ3RoOiAzMCB9LFxuICByYWNrX3JlZ2lvbjogeyBsYWJlbDogJ+WMuuWfnycsIG1heExlbmd0aDogMzAgfSxcbiAgc2VyaWFsX251bWJlcjogeyBsYWJlbDogJ1NOJywgbWF4TGVuZ3RoOiAzMCB9LFxuICBjcHU6IHsgbGFiZWw6ICdDUFUnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG1vZGVsOiB7IGxhYmVsOiAn5Z6L5Y+3JywgbWF4TGVuZ3RoOiAzMCB9LFxuICBtZW1vcnk6IHsgbGFiZWw6ICflhoXlrZgnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIHJhaWQ6IHsgbGFiZWw6ICdSYWlkIOS/oeaBrycsIG1heExlbmd0aDogMzAgfSxcbiAgaGFyZGRpc2s6IHsgbGFiZWw6ICfnoaznm5gnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG1hbmFnZV9pcDogeyBsYWJlbDogJ+euoeeQhklQJywgbWF4TGVuZ3RoOiAzMCB9LFxuICB2aXA6IHsgbGFiZWw6ICdWSVAnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIHR5cGljYWxfY2FzZTogeyBsYWJlbDogJ+WFuOWei+mFjee9ricsIG1heExlbmd0aDogMzAgfSxcbiAgbmFtZTogeyBsYWJlbDogJ+WQjeensCcsIG1heExlbmd0aDogMzAgfSxcbiAgb3B0aW9uYWw6IHsgbGFiZWw6ICflhbbku5YnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9uYW1lMTogeyBsYWJlbDogJ2V0aDAnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9pcDE6IHsgbGFiZWw6ICdldGgwSVAnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9uYW1lMjogeyBsYWJlbDogJ2V0aDEnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9pcDI6IHsgbGFiZWw6ICdldGgxSVAnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9uYW1lMzogeyBsYWJlbDogJ2V0aDInLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9pcDM6IHsgbGFiZWw6ICdldGgySVAnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9uYW1lNDogeyBsYWJlbDogJ2V0aDMnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9pcDQ6IHsgbGFiZWw6ICdldGgzSVAnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9uYW1lNTogeyBsYWJlbDogJ2V0aDQnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9pcDU6IHsgbGFiZWw6ICdldGg0SVAnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9uYW1lNjogeyBsYWJlbDogJ2V0aDUnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9pcDY6IHsgbGFiZWw6ICdldGg1SVAnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9uYW1lNzogeyBsYWJlbDogJ2V0aDYnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9pcDc6IHsgbGFiZWw6ICdldGg2SVAnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9uYW1lODogeyBsYWJlbDogJ2V0aDcnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9pcDg6IHsgbGFiZWw6ICdldGg3SVAnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9uYW1lOTogeyBsYWJlbDogJ2V0aDgnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG5ldF9pcDk6IHsgbGFiZWw6ICdldGg4SVAnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIHNlcnZlcl9jb2RlOiB7IGxhYmVsOiAn5pyN5Yqh5ZmoX2NvZGUnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIGxhYmVsX2tleTogeyBsYWJlbDogJ+agh+etvumUricsIG1heExlbmd0aDogMzAgfSxcbiAgbGFiZWxfdmFsdWU6IHsgbGFiZWw6ICfmoIfnrb7lgLwnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIHZlcnNpb246IHsgbGFiZWw6ICfniYjmnKwnLCBtYXhMZW5ndGg6IDMwIH0sXG4gIGhvc3RuYW1lOiB7IGxhYmVsOiAn5Li75py65ZCNJywgbWF4TGVuZ3RoOiAzMCB9LFxuICB1X2Ftb3VudDogeyBsYWJlbDogJ1XkvY0nLCBtYXhMZW5ndGg6IDMwIH0sXG4gIHJhY2tfY29kZTogeyBsYWJlbDogJ0lEQ19jb2RlJywgdHlwZTogJ3NlbGVjdCcsIG9wdGlvbnM6IFtdIH0sXG4gIGVudmlyb25tZW50OiB7IGxhYmVsOiAn54mI5pysJywgdHlwZTogJ3NlbGVjdCcsIG9wdGlvbnM6IFtdIH0sXG4gIGNvbXB1dGVyX2Ftb3VudDogeyBsYWJlbDogJ+inhOagvO+8iFXvvIknLCB0eXBlOiAnc2VsZWN0Jywgb3B0aW9uczogW10gfSxcbiAgY2xvdWRfdHlwZTogeyBsYWJlbDogJ+exu+WeiycsIHR5cGU6ICdzZWxlY3QnLCBvcHRpb25zOiBbXSB9LFxuICB0eXBlOiB7IGxhYmVsOiAn5o6l5Y+jJywgdHlwZTogJ3NlbGVjdCcsIG9wdGlvbnM6IFtdIH0sXG4gIGluc3VyZTogeyBsYWJlbDogJ+S/nemanCcsIHR5cGU6ICdzZWxlY3QnLCBvcHRpb25zOiBbXSB9LFxuICBuZXRfdHlwZTE6IHsgbGFiZWw6ICd0eXBlJywgdHlwZTogJ3NlbGVjdCcsIG9wdGlvbnM6IFtdIH0sXG4gIG5ldF90eXBlMjogeyBsYWJlbDogJ3R5cGUnLCB0eXBlOiAnc2VsZWN0Jywgb3B0aW9uczogW10gfSxcbiAgbmV0X3R5cGUzOiB7IGxhYmVsOiAndHlwZScsIHR5cGU6ICdzZWxlY3QnLCBvcHRpb25zOiBbXSB9LFxuICBuZXRfdHlwZTQ6IHsgbGFiZWw6ICd0eXBlJywgdHlwZTogJ3NlbGVjdCcsIG9wdGlvbnM6IFtdIH0sXG4gIG5ldF90eXBlNTogeyBsYWJlbDogJ3R5cGUnLCB0eXBlOiAnc2VsZWN0Jywgb3B0aW9uczogW10gfSxcbiAgbmV0X3R5cGU2OiB7IGxhYmVsOiAndHlwZScsIHR5cGU6ICdzZWxlY3QnLCBvcHRpb25zOiBbXSB9LFxuICBuZXRfdHlwZTc6IHsgbGFiZWw6ICd0eXBlJywgdHlwZTogJ3NlbGVjdCcsIG9wdGlvbnM6IFtdIH0sXG4gIG5ldF90eXBlODogeyBsYWJlbDogJ3R5cGUnLCB0eXBlOiAnc2VsZWN0Jywgb3B0aW9uczogW10gfSxcbiAgbmV0X3R5cGU5OiB7IGxhYmVsOiAndHlwZScsIHR5cGU6ICdzZWxlY3QnLCBvcHRpb25zOiBbXSB9LFxuICBvc19mYW1pbHk6IHsgbGFiZWw6ICdPUyBmYW1pbHknLCB0eXBlOiAnc2VsZWN0Jywgb3B0aW9uczogW10gfSxcbiAgb3NfdmVyc2lvbjogeyBsYWJlbDogJ09TIHZlcnNpb24nLCB0eXBlOiAnc2VsZWN0Jywgb3B0aW9uczogW10gfSxcbiAgc3RhdHVzOiB7IGxhYmVsOiAn54q25oCBJywgdHlwZTogJ3NlbGVjdCcsIG9wdGlvbnM6IFtdIH0sXG4gIGFsbG9jYXRlZDogeyBsYWJlbDogJ+WIhumFjeeKtuaAgScsIHR5cGU6ICdzZWxlY3QnLCBvcHRpb25zOiBbXSB9LFxuICBwdXJjaGFzZV90aW1lOiB7IGxhYmVsOiAn6YeH6LSt5pe26Ze0JywgdHlwZTogJ2RhdGVDbWRiJywgZm9ybWF0OiAneXl5eS1ERC1NTScsIG1heExlbmd0aDogMzAgfSxcbiAgYXJyaXZhbF90aW1lOiB7IGxhYmVsOiAn5Yiw6LSn5pe26Ze0JywgdHlwZTogJ2RhdGVDbWRiJywgZm9ybWF0OiAneXl5eS1ERC1NTScsIG1heExlbmd0aDogMzAgfSxcbiAgc3RvY2tfdGltZTogeyBsYWJlbDogJ+S4iuaetuaXtumXtCcsIHR5cGU6ICdkYXRlQ21kYicsIGZvcm1hdDogJ3l5eXktREQtTU0nLCBtYXhMZW5ndGg6IDMwIH0sXG4gIG1haW50YWluX3RpbWVfYmVnaW46IHsgbGFiZWw6ICfnu7Tkv53lvIDlp4vml7bpl7QnLCB0eXBlOiAnZGF0ZUNtZGInLCBmb3JtYXQ6ICd5eXl5LURELU1NJywgbWF4TGVuZ3RoOiAzMCB9LFxuICBtYWludGFpbl90aW1lX2VuZDogeyBsYWJlbDogJ+e7tOS/nee7k+adn+aXtumXtCcsIHR5cGU6ICdkYXRlQ21kYicsIGZvcm1hdDogJ3l5eXktREQtTU0nLCBtYXhMZW5ndGg6IDMwIH0sXG4gIGNyZWF0ZWRfdGltZTogeyBsYWJlbDogJ+WIm+W7uuaXtumXtCcsIHR5cGU6ICdkYXRlQ21kYicsIGZvcm1hdDogJ3l5eXktREQtTU0nLCBtYXhMZW5ndGg6IDMwIH0sXG4gIHVwZGF0ZWRfdGltZTogeyBsYWJlbDogJ+abtOaWsOaXtumXtCcsIHR5cGU6ICdkYXRlQ21kYicsIGZvcm1hdDogJ3l5eXktREQtTU0nLCBtYXhMZW5ndGg6IDMwIH0sXG4gIGFsbG9jX2RlYWRsaW5lOiB7IGxhYmVsOiAn5YiG6YWN5oiq5q2i5pe26Ze0JywgdHlwZTogJ2RhdGVDbWRiJywgZm9ybWF0OiAneXl5eS1ERC1NTScsIG1heExlbmd0aDogMzAgfSxcbiAgZGVzY3JpcHRpb246IHsgbGFiZWw6ICfmj4/ov7AnLCBtYXhMZW5ndGg6IDEwMCB9XG59O1xuXG4vLyBDTURCIOaTjeS9nCblt6XlhbfvvIzoi6XkuI3pnIDopoHlsZXnpLrliJnlhoXpg6hqc+iuvue9ruS4uuepulxudmFyIFNFQVJDSF9UT09MUyA9IFt7XG4gIGxhYmVsOiAn5pON5L2cJyxcbiAgb3B0aW9uczogW3tcbiAgICByb3dIdG1sOiAnPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIiBvbmNsaWNrPVwiZXhwb3J0RGF0YSgpO1wiPuWvvOWHujwvYT4nXG4gIH0sIHtcbiAgICByb3dIdG1sOiAnPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO1wiPuWvvOWFpTxpbnB1dCB0eXBlPVwiZmlsZVwiIGFjY2VwdD1cIi54bHNcIiBvbkNoYW5nZT1cImltcG9ydERhdGEodGhpcyk7XCIgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7Ym90dG9tOjA7b3BhY2l0eTowO3dpZHRoOjEwMCU7XCIgLz48L2E+J1xuICB9XVxufSx7XG4gIGxhYmVsOiAn5bel5YW3JyxcbiAgb3B0aW9uczogW3tcbiAgICByb3dIdG1sOiAnPGEgaHJlZj1cImh0dHA6Ly8xMC4yMTQuMTI0LjU1L3phYmJpeC9cIiB0YXJnZXQ9XCJfYmxhbmtcIj56YWJiaXg8L2E+J1xuICB9LCB7XG4gICAgcm93SHRtbDogJzxhIGhyZWY9XCJodHRwOi8vMTAuMjE0LjEyNC41Mzo4MDgwL1wiIHRhcmdldD1cIl9ibGFua1wiPkppcmE8L2E+J1xuICB9LCB7XG4gICAgcm93SHRtbDogJzxhIGhyZWY9XCJodHRwOi8vMTAuMjE0LjEyNC41Mzo4MDkwL1wiIHRhcmdldD1cIl9ibGFua1wiPkNvbmZsdWVuY2U8L2E+J1xuICB9LCB7XG4gICAgcm93SHRtbDogJzxhIGhyZWY9XCJodHRwOi8vMTAuMjE0LjEyNC41My9pdG9wL1wiIHRhcmdldD1cIl9ibGFua1wiPkl0b3A8L2E+J1xuICB9LCB7XG4gICAgcm93SHRtbDogJzxhIGhyZWY9XCJodHRwOi8vMTAuMjE0LjY2Ljc1L1wiIHRhcmdldD1cIl9ibGFua1wiPkVMSzwvYT4nXG4gIH0sIHtcbiAgICByb3dIdG1sOiAnPGEgaHJlZj1cImh0dHA6Ly8xMC4yMTQuMTI0LjU3L3N2bmFkbWluL1wiIHRhcmdldD1cIl9ibGFua1wiPlN2bjwvYT4nXG4gIH0sIHtcbiAgICByb3dIdG1sOiAnPGEgaHJlZj1cImh0dHA6Ly8xMC4yMTQuMTI0LjU3OjgwODEvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+R2l0TGFiPC9hPidcbiAgfSwge1xuICAgIHJvd0h0bWw6ICc8YSBocmVmPVwiaHR0cDovLzEwLjIxNC4xMjQuNTg6ODA4MC9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5KZW5raW5zPC9hPidcbiAgfSwge1xuICAgIHJvd0h0bWw6ICc8YSBocmVmPVwiaHR0cDovLzEwLjIxNC4xMjQuNTY6ODA4MS9uZXh1cy9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5OZXh1czwvYT4nXG4gIH0sIHtcbiAgICByb3dIdG1sOiAnPGEgaHJlZj1cImh0dHBzOi8vMTAuMjE0LjEyNC41OS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5BbnNpYmxlPC9hPidcbiAgfV1cbn1dO1xuLy8gQ01EQuebuOWFs+WFrOeUqOWHveaVsCBzdGFydFxudmFyIHJlbGF0aW9uRGF0YSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBfanNvbkRhdGEgPSBbXTtcbiAgaWYoISFpdGVtLmxlbmd0aCl7XG4gICAgJC5lYWNoKGl0ZW0sIGZ1bmN0aW9uKGksZSl7XG4gICAgICBfanNvbkRhdGEucHVzaChlLmlkKTtcbiAgICB9KTtcbiAgfWVsc2V7XG4gICAgX2pzb25EYXRhLnB1c2goaXRlbS5pZCk7XG4gIH1cblxuICB2YXIgY29uZmlybURpYWxvZyA9IFdVSS5Nb2RhbERpYWxvZy5jcmVhdGUoe1xuICAgIHRpdGxlOiAn6K+356Gu6K6kJyxcbiAgICBtZXNzYWdlOiAn5piv5ZCm56Gu5a6a5Yig6Zmk5pWw5o2u77yfJyxcbiAgICBvbkNvbmZpcm06IGZ1bmN0aW9uICgpIHtcbiAgICAgIFdVSS5hamF4KHtcbiAgICAgICAgdXJsOiBET01BSU4uQ01EQiArIENNREJfQVBJLmRlbGV0ZSxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb25EYXRhOiBfanNvbkRhdGFcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICAgICAgY29uZmlybURpYWxvZy5oaWRlKCk7XG4gICAgICAgIHF1ZXJ5RGF0YSh7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgICAgcGFnZVNpemU6IFBBR0VfU0laRVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyIHN1Ym1pdERhdGEgPSBmdW5jdGlvbihpdGVtKXtcbiAgdmFyIF9uYW1lcyA9IFtdO1xuICB2YXIgX3ZhbHVlcyA9IFtdO1xuICB2YXIgX3N1Ym1pdERhdGEgPSB7fTtcblxuICB2YXIgX2RvbSA9ICQoJyNodG1sLWRpYWxvZyAubW9kYWwtYm9keScpO1xuICAkLmVhY2goX2RvbS5maW5kKCdpbnB1dCcpLCBmdW5jdGlvbihpLGUpe1xuICAgIHZhciBfdGhpcyA9IF9kb20uZmluZCgnaW5wdXQnKS5lcShpKTtcbiAgICBpZighISQudHJpbShfdGhpcy52YWwoKSkpe1xuICAgICAgX25hbWVzLnB1c2goX3RoaXMuYXR0cignbmFtZScpKTtcbiAgICAgIF92YWx1ZXMucHVzaCgkLnRyaW0oX3RoaXMudmFsKCkpKTtcbiAgICB9XG4gIH0pO1xuICAkLmVhY2goX2RvbS5maW5kKCdzZWxlY3QnKSwgZnVuY3Rpb24oaSxlKXtcbiAgICB2YXIgX3RoaXMgPSBfZG9tLmZpbmQoJ3NlbGVjdCcpLmVxKGkpO1xuICAgIGlmKCEhJC50cmltKF90aGlzLnZhbCgpKSl7XG4gICAgICBfbmFtZXMucHVzaChfdGhpcy5hdHRyKCduYW1lJykpO1xuICAgICAgX3ZhbHVlcy5wdXNoKF90aGlzLnZhbCgpKTtcbiAgICB9XG4gICAgLy8gX25hbWVzLnB1c2goX2RvbS5maW5kKCdzZWxlY3QnKS5lcShpKS5hdHRyKCduYW1lJykpO1xuICAgIC8vIF92YWx1ZXMucHVzaChfZG9tLmZpbmQoJ3NlbGVjdCcpLmVxKGkpLnZhbCgpKTtcbiAgfSk7XG4gICQuZWFjaChfZG9tLmZpbmQoJ3RleHRhcmVhJyksIGZ1bmN0aW9uKGksZSl7XG4gICAgX25hbWVzLnB1c2goX2RvbS5maW5kKCd0ZXh0YXJlYScpLmVxKGkpLmF0dHIoJ25hbWUnKSk7XG4gICAgX3ZhbHVlcy5wdXNoKF9kb20uZmluZCgndGV4dGFyZWEnKS5lcShpKS52YWwoKSk7XG4gIH0pO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgX25hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgX3N1Ym1pdERhdGFbX25hbWVzW2ldXSA9IF92YWx1ZXNbaV07XG4gIH1cblxuICB2YXIgX3VybCA9IENNREJfQVBJLmFkZDtcbiAgaWYoISFpdGVtLmlkKXtcbiAgICBfdXJsID0gQ01EQl9BUEkudXBkYXRlO1xuICAgIF9zdWJtaXREYXRhLmlkID0gaXRlbS5pZDtcbiAgfVxuXG4gIFdVSS5hamF4KHtcbiAgICB1cmw6IERPTUFJTi5DTURCICsgX3VybCxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBqc29uRGF0YTogX3N1Ym1pdERhdGFcbiAgfSkudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgICQoJyNodG1sLWRpYWxvZywgLm1vZGFsLWJhY2tkcm9wJykucmVtb3ZlKCk7XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XG4gICAgcXVlcnlEYXRhKHtcbiAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgcGFnZVNpemU6IFBBR0VfU0laRVxuICAgIH0pO1xuICB9KS5mYWlsKGZ1bmN0aW9uKHJlc3Ape1xuICAgICQoJyNodG1sLWRpYWxvZywgLm1vZGFsLWJhY2tkcm9wJykucmVtb3ZlKCk7XG4gIH0pO1xufTtcbnZhciBkZWxldGVEYXRhID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIF9qc29uRGF0YSA9IFtdO1xuICBpZighIWl0ZW0ubGVuZ3RoKXtcbiAgICAkLmVhY2goaXRlbSwgZnVuY3Rpb24oaSxlKXtcbiAgICAgIF9qc29uRGF0YS5wdXNoKGUuaWQpO1xuICAgIH0pO1xuICB9ZWxzZXtcbiAgICBfanNvbkRhdGEucHVzaChpdGVtLmlkKTtcbiAgfVxuXG4gIHZhciBjb25maXJtRGlhbG9nID0gV1VJLk1vZGFsRGlhbG9nLmNyZWF0ZSh7XG4gICAgdGl0bGU6ICfor7fnoa7orqQnLFxuICAgIG1lc3NhZ2U6ICfmmK/lkKbnoa7lrprliKDpmaTmlbDmja7vvJ8nLFxuICAgIG9uQ29uZmlybTogZnVuY3Rpb24gKCkge1xuICAgICAgV1VJLmFqYXgoe1xuICAgICAgICB1cmw6IERPTUFJTi5DTURCICsgQ01EQl9BUEkuZGVsZXRlLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbkRhdGE6IF9qc29uRGF0YVxuICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgICAgICBjb25maXJtRGlhbG9nLmhpZGUoKTtcbiAgICAgICAgcXVlcnlEYXRhKHtcbiAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICBwYWdlU2l6ZTogUEFHRV9TSVpFXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgbGFiZWxEYXRhSnNvbiA9IHt9O1xudmFyIGxhYmVsRGF0YUh0bWwgPSBmdW5jdGlvbihkYXRhKXtcbiAgdmFyIF9yb3dIdG1sID0gW107XG4gIF9yb3dIdG1sLnB1c2goJyAgICA8aDQ+5bey6YCJ5oup5qCH562+PHNwYW4+5riF6Zmk5YWo6YOoPC9zcGFuPjwvaDQ+Jyk7XG4gICQuZWFjaChkYXRhLCBmdW5jdGlvbihpKSB7XG4gICAgX3Jvd0h0bWwucHVzaCgnICAgIDxwIGNsYXNzPVwiYWN0aXZlXCI+PHNwYW4+PC9zcGFuPicrIGkgKyc8L3A+Jyk7XG4gICAgX3Jvd0h0bWwucHVzaCgnICAgIDx1bD4nKTtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIF9yb3dIdG1sLnB1c2goJyAgICAgIDxsaT4nICsgZGF0YVtpXVtqXSArICc8L2xpPicpO1xuICAgIH1cbiAgICBfcm93SHRtbC5wdXNoKCcgICAgPC91bD4nKTtcbiAgfSk7XG5cbiAgJCgnLm1vZGFsLWJvZHkgLmRhdGEtbGFiZWwnKS5odG1sKF9yb3dIdG1sLmpvaW4oJycpKTtcbiAgJCgnLm1vZGFsLWJvZHkgLmRhdGEtbGFiZWwgcCcpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgdmFyIF90aGlzID0gJCh0aGlzKTtcbiAgICBpZihfdGhpcy5oYXNDbGFzcygnYWN0aXZlJykpe1xuICAgICAgX3RoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1lbHNle1xuICAgICAgX3RoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cbiAgfSk7XG4gICQoJy5tb2RhbC1ib2R5IC5kYXRhLWxhYmVsID4gaDQgc3BhbicpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgbGFiZWxEYXRhSnNvbiA9IHt9O1xuICAgIGxhYmVsRGF0YUh0bWwobGFiZWxEYXRhSnNvbik7XG4gICAgJCgnLm1vZGFsLWJvZHkgLmRhdGEtdGFibGUgaW5wdXRbdHlwZT1jaGVja2JveF0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICB9KTtcbn1cbnZhciBsYWJlbENvbHVtblRhYmxlRmllbGRzID0gW107XG52YXIgbGFiZWxEYXRhID0gZnVuY3Rpb24oaXRlbSl7XG4gIC8vIOiOt+WPluW9k+WJjWlkc+W3sue7j+aJk+S4iueahOS+v+etvu+8jOaLvOijhWRvbe+8m+eEtuWQjuWcqG1vZGFs5by55Ye65bGC5LiKYWpheOagh+etvueahGNvbG11bu+8jOWGjeaLieWPluWIl+ihqFxuICB2YXIgX3RhYmxlID0gaXRlbVswXS50YWJsZTtcbiAgdmFyIF9pZHMgPSBbXTtcbiAgJC5lYWNoKGl0ZW0sIGZ1bmN0aW9uKGksZSl7XG4gICAgX2lkcy5wdXNoKGUuaWQpO1xuICB9KTtcblxuICBXVUkuYWpheCh7XG4gICAgdXJsOiBET01BSU4uQ01EQiArICcvd2ViL2xhYmVsL2V4L3F1ZXJ5TGFiZWw/dGFibGU9JyArIF90YWJsZSArICcmaWRzPScgKyBfaWRzLmpvaW4oJywnKSxcbiAgICBtZXRob2Q6ICdQT1NUJ1xuICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgbGFiZWxEYXRhSnNvbiA9IHJlc3A7XG4gICAgV1VJLk1vZGFsRGlhbG9nLmNyZWF0ZSh7XG4gICAgICB0aXRsZTogJ+agh+etvicsXG4gICAgICBvbkNvbmZpcm06IHN1Ym1pdExhYmVsRGF0YS5iaW5kKHRoaXMsIF90YWJsZSwgX2lkcylcbiAgICB9KTtcblxuICAgIHZhciBfcm93SHRtbCA9IFtdO1xuICAgIF9yb3dIdG1sLnB1c2goJzxkaXYgY2xhc3M9XCJyb3dcIj4nKTtcbiAgICBfcm93SHRtbC5wdXNoKCcgIDxkaXYgY2xhc3M9XCJjb2wtbGctOSBjb2wtbWQtOSBjb2wtc20tOVwiPicpO1xuICAgIF9yb3dIdG1sLnB1c2goJyAgICA8ZGl2IGNsYXNzPVwiZGF0YS1zZWFyY2hcIj48L2Rpdj4nKTtcbiAgICBfcm93SHRtbC5wdXNoKCcgICAgPGRpdiBjbGFzcz1cImRhdGEtdGFibGVcIj48L2Rpdj4nKTtcbiAgICBfcm93SHRtbC5wdXNoKCcgICAgPGRpdiBjbGFzcz1cImRhdGEtcGFnaW5hdG9yXCI+PC9kaXY+Jyk7XG4gICAgX3Jvd0h0bWwucHVzaCgnICA8L2Rpdj4nKTtcbiAgICBfcm93SHRtbC5wdXNoKCcgIDxkaXYgY2xhc3M9XCJjb2wtbGctMyBjb2wtbWQtMyBjb2wtc20tMyBkYXRhLWxhYmVsXCI+Jyk7XG4gICAgX3Jvd0h0bWwucHVzaCgnICA8L2Rpdj4nKTtcbiAgICBfcm93SHRtbC5wdXNoKCc8L2Rpdj4nKTtcbiAgICAkKCcubW9kYWwtYm9keScpLmh0bWwoX3Jvd0h0bWwuam9pbignJykpO1xuICAgIGxhYmVsRGF0YUh0bWwobGFiZWxEYXRhSnNvbik7XG4gIH0pLnRoZW4oZnVuY3Rpb24oKXtcbiAgICBXVUkuYWpheCh7XG4gICAgICB1cmw6IERPTUFJTi5DTURCICsgJy93ZWIvbGFiZWwvY29sdW1uJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICAgIC8vIOWIm+W7uuagh+etvnRhYmxl55qE5bGV56S65YiXXG4gICAgICBsYWJlbENvbHVtblRhYmxlRmllbGRzID0gcmVzcC5zaG93Q29sdW1uTmFtZTtcbiAgICAgIFdVSS5EYXRhU2VhcmNoLmNyZWF0ZSh7XG4gICAgICAgICRlbDogJCgnLm1vZGFsLWJvZHkgLmRhdGEtc2VhcmNoJyksXG4gICAgICAgIG1ldGE6IHJlc3AsXG4gICAgICAgIHF1ZXJ5QnV0dG9uOiAn5p+l6K+iJyxcbiAgICAgICAgb25GaWx0ZXI6IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICBsYWJlbFF1ZXJ5RGF0YSgkLmV4dGVuZChwYXJhbXMsIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICAgICAgcGFnZVNpemU6IFBBR0VfU0laRV9MQUJFTFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsYWJlbFF1ZXJ5RGF0YSh7XG4gICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICBwYWdlU2l6ZTogUEFHRV9TSVpFX0xBQkVMXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xudmFyIGxhYmVsUXVlcnlEYXRhID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdmFyIF9iZWZvcmVTZW5kID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcInBhZ2VOdW1cIiwgb3B0aW9ucy5jdXJyZW50UGFnZSk7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwicGFnZUxpbWl0XCIsIG9wdGlvbnMucGFnZVNpemUpO1xuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgZ2V0Q29va2llKCdDTURCLVRPS0VOLVRZUEUnKSArJyAnKyBnZXRDb29raWUoJ0NNREItVE9LRU4nKSk7XG4gIH07XG4gIFxuICBXVUkuYWpheCh7XG4gICAgdXJsOiBET01BSU4uQ01EQiArICcvd2ViL2xhYmVsL3F1ZXJ5JyxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBqc29uRGF0YTogcXVlcnlKc29uKHRydWUpLFxuICAgIGRpc2FibGVYU1M6IHRydWUsXG4gICAgYmVmb3JlU2VuZDogX2JlZm9yZVNlbmRcbiAgfSkudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgIFdVSS5EYXRhVGFibGUuY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLm1vZGFsLWJvZHkgLmRhdGEtdGFibGUnKSxcbiAgICAgIG1ldGE6IE1FVEEsXG4gICAgICBmaWVsZHM6IGxhYmVsQ29sdW1uVGFibGVGaWVsZHMsXG4gICAgICBsaXN0OiByZXNwLmxpc3QsXG4gICAgICBncm91cHM6IFt7XG4gICAgICAgIG5hbWU6ICfmoIfnrb4nLFxuICAgICAgICBjbGFzc05hbWU6ICdidG4gYnRuLXhzIGJ0bi1zdWNjZXNzJyxcbiAgICAgICAgY2FsbGJhY2s6IGxhYmVsRGF0YVxuICAgICAgfV1cbiAgICB9KTtcblxuICAgIFdVSS5EYXRhUGFnaW5hdG9yLmNyZWF0ZSh7XG4gICAgICAkZWw6ICQoJy5tb2RhbC1ib2R5IC5kYXRhLXBhZ2luYXRvcicpLFxuICAgICAgY3VycmVudFBhZ2U6IG9wdGlvbnMuY3VycmVudFBhZ2UgLSAxLFxuICAgICAgdG90YWw6IHJlc3AudG90YWxDb3VudCxcbiAgICAgIHBhZ2VTaXplOiBvcHRpb25zLnBhZ2VTaXplLFxuICAgICAgb25Td2l0Y2hQYWdlOiBmdW5jdGlvbiAoY3VycmVudFBhZ2UpIHtcbiAgICAgICAgbGFiZWxRdWVyeURhdGEoe1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiBjdXJyZW50UGFnZSArIDEsXG4gICAgICAgICAgcGFnZVNpemU6IG9wdGlvbnMucGFnZVNpemVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkLmVhY2goJCgnLm1vZGFsLWJvZHkgdGJvZHkgdHInKSwgZnVuY3Rpb24oaSwgZSl7XG4gICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xuICAgICAgdmFyIF9rZXkgPSBfdGhpcy5maW5kKCd0ZCcpLmVxKDEpLnRleHQoKTtcbiAgICAgIHZhciBfdmFsdWUgPSBfdGhpcy5maW5kKCd0ZCcpLmVxKDIpLnRleHQoKTtcbiAgICAgIGlmKCEhbGFiZWxEYXRhSnNvbltfa2V5XSl7XG4gICAgICAgICQuZWFjaChsYWJlbERhdGFKc29uW19rZXldLCBmdW5jdGlvbihqLCBmKXtcbiAgICAgICAgICBpZihsYWJlbERhdGFKc29uW19rZXldW2pdID09IF92YWx1ZSl7XG4gICAgICAgICAgICBfdGhpcy5maW5kKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIOagh+etvuezu+e7n2NoZWNrYm945qGG5LqL5Lu25pWI5p6cXG4gICAgJCgnLm1vZGFsLWJvZHkgLmRhdGEtdGFibGUgaW5wdXRbdHlwZT1jaGVja2JveF0nKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgLy8gY29uc29sZS5sb2coJ+WPmOWMluWJje+8micsIGxhYmVsRGF0YUpzb24pO1xuICAgICAgdmFyIF90aGlzID0gJCh0aGlzKTtcbiAgICAgIHZhciBfdGhpc1AgPSBfdGhpcy5wYXJlbnRzKCd0cicpO1xuICAgICAgdmFyIF90aGlzS2V5ID0gX3RoaXNQLmZpbmQoJ3RkJykuZXEoMSkudGV4dCgpO1xuICAgICAgdmFyIF90aGlzVmFsdWUgPSBfdGhpc1AuZmluZCgndGQnKS5lcSgyKS50ZXh0KCk7XG4gICAgICBpZihfdGhpcy5pcygnOmNoZWNrZWQnKSl7XG4gICAgICAgIGlmICghIWxhYmVsRGF0YUpzb25bX3RoaXNLZXldKSB7XG4gICAgICAgICAgdmFyIF9oYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICQuZWFjaChsYWJlbERhdGFKc29uW190aGlzS2V5XSxmdW5jdGlvbihpLGUpe1xuICAgICAgICAgICAgaWYoX3RoaXNWYWx1ZSA9PSBlKXtcbiAgICAgICAgICAgICAgX2hhc1ZhbHVlID0gdHJ1ZTtcblxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZighX2hhc1ZhbHVlKXtcbiAgICAgICAgICAgIGxhYmVsRGF0YUpzb25bX3RoaXNLZXldLnB1c2goX3RoaXNWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBsYWJlbERhdGFKc29uW190aGlzS2V5XSA9IFtfdGhpc1ZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgfWVsc2UgaWYobGFiZWxEYXRhSnNvbltfdGhpc0tleV0ubGVuZ3RoID09IDEpe1xuICAgICAgICBkZWxldGUgbGFiZWxEYXRhSnNvbltfdGhpc0tleV07XG4gICAgICB9ZWxzZXtcbiAgICAgICAgJC5lYWNoKGxhYmVsRGF0YUpzb25bX3RoaXNLZXldLCBmdW5jdGlvbihpLCBlKXtcbiAgICAgICAgICBpZihfdGhpc1ZhbHVlID09IGUpe1xuICAgICAgICAgICAgbGFiZWxEYXRhSnNvbltfdGhpc0tleV0uc3BsaWNlKGksIDEpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLy8gY29uc29sZS5sb2coJ+WPmOWMluWQju+8micsIGxhYmVsRGF0YUpzb24pO1xuICAgICAgLy8gY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG4gICAgICBsYWJlbERhdGFIdG1sKGxhYmVsRGF0YUpzb24pO1xuICAgIH0pO1xuICB9KTtcbn07XG52YXIgc3VibWl0TGFiZWxEYXRhID0gZnVuY3Rpb24odGFibGUsIGlkcyl7XG4gIHZhciBfbGFiZWxzID0gW107XG4gICQuZWFjaChsYWJlbERhdGFKc29uLCBmdW5jdGlvbihpLCBlKXtcbiAgICAkLmVhY2goZSwgZnVuY3Rpb24oaiwgZil7XG4gICAgICB2YXIgX2xhYmVsID0gaSArICc6JyArIGY7XG4gICAgICBfbGFiZWxzLnB1c2goX2xhYmVsKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgV1VJLmFqYXgoe1xuICAgIHVybDogRE9NQUlOLkNNREIgKyAnL3dlYi9sYWJlbC9leC9hZGRMYWJlbD90YWJsZT0nKyB0YWJsZSArJyZpZHM9JysgaWRzLmpvaW4oJywnKSArJyZsYWJlbHM9JysgX2xhYmVscy5qb2luKCcsJyksXG4gICAgbWV0aG9kOiAnUE9TVCdcbiAgfSkudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgICQoJyNodG1sLWRpYWxvZywgLm1vZGFsLWJhY2tkcm9wJykucmVtb3ZlKCk7XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XG4gICAgV1VJLmFsZXJ0LmNyZWF0ZSh7XG4gICAgICBtZXNzYWdlOiAn5qCH562+5L+u5pS55oiQ5YqfJyxcbiAgICAgIHN1Y2Nlc3M6IHRydWVcbiAgICB9KTtcblxuICAgIFdVSS5hamF4KHtcbiAgICAgIHVybDogRE9NQUlOLkNNREIgKyBDTURCX0FQSS5jb2x1bW4sXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgICB2YXIgX3Jvd0h0bWwgPSBbXTtcbiAgICAgIGlmKHJlc3AuZGF0YVswXS5kaWN0aW9uYXJ5VmFsdWVzLmxlbmd0aCA+IDApe1xuICAgICAgICBfcm93SHRtbC5wdXNoKCc8ZGl2IGNsYXNzPVwiZGF0YS1zZWFyY2gtY29uZGl0aW9uIGRhdGEtc2VhcmNoLWNoZWNrYm94XCI+Jyk7XG4gICAgICAgICQuZWFjaChyZXNwLmRhdGFbMF0uZGljdGlvbmFyeVZhbHVlcywgZnVuY3Rpb24oaSwgZSl7XG4gICAgICAgICAgX3Jvd0h0bWwucHVzaCgnPGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiX2xhYmVsX1wiPicrIGUgKyc8L2xhYmVsPicpO1xuICAgICAgICB9KTtcbiAgICAgICAgX3Jvd0h0bWwucHVzaCgnPC9kaXY+Jyk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgX3Jvd0h0bWwucHVzaCgnPGRpdiBjbGFzcz1cImRhdGEtc2VhcmNoLWNvbmRpdGlvbiBkYXRhLXNlYXJjaC10ZXh0XCI+Jyk7XG4gICAgICAgIF9yb3dIdG1sLnB1c2goJyAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiX2xhYmVsX1wiIHBsYWNlaG9sZGVyPVwi5qCH562+XCI+Jyk7XG4gICAgICAgIF9yb3dIdG1sLnB1c2goJzwvZGl2PicpO1xuICAgICAgfVxuXG4gICAgICAkKCcuZGF0YS1zZWFyY2gtYmFzaWMgbGknKS5lcSgwKS5maW5kKCcuZGF0YS1zZWFyY2gtY29uZGl0aW9uJykucmVtb3ZlKCk7XG4gICAgICAkKCcuZGF0YS1zZWFyY2gtYmFzaWMgbGknKS5lcSgwKS5hcHBlbmQoX3Jvd0h0bWwuam9pbignJykpLmZpbmQoJ2J1dHRvbiA+IHAgPiBzcGFuJykudGV4dCgnJyk7XG5cbiAgICAgIHF1ZXJ5RGF0YSh7XG4gICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICBwYWdlU2l6ZTogUEFHRV9TSVpFXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSkuZmFpbChmdW5jdGlvbihyZXNwKXtcbiAgICAkKCcjaHRtbC1kaWFsb2csIC5tb2RhbC1iYWNrZHJvcCcpLnJlbW92ZSgpO1xuICB9KTtcbn07XG52YXIgcXVlcnlKc29uID0gZnVuY3Rpb24obGFiZWwpe1xuICB2YXIgX2pzb25EYXRhUyA9IHtcImRhdGFcIjogW119O1xuICBpZihsYWJlbCl7XG4gICAgdmFyIF90aGlzID0gJCgnLm1vZGFsLWJvZHkgLmRhdGEtc2VhcmNoID4gdWw6bm90KFwiLmRhdGEtdG9vbHNcIikgPiBsaTpub3QoXCIuZGF0YS1zZWFyY2gtZWxzZVwiKScpO1xuICB9ZWxzZXtcbiAgICB2YXIgX3RoaXMgPSAkKCcuYm94ID4gLmRhdGEtc2VhcmNoID4gdWw6bm90KFwiLmRhdGEtdG9vbHNcIikgPiBsaTpub3QoXCIuZGF0YS1zZWFyY2gtZWxzZVwiKScpO1xuICB9XG4gICQuZWFjaChfdGhpcywgZnVuY3Rpb24oaSxlKXtcbiAgICB2YXIgX2pzb25EYXRhID0ge1xuICAgICAgXCJwYXRoc1wiOiBbXSxcbiAgICAgIFwidGFibGVOYW1lXCI6IFwiXCIsXG4gICAgICBcImNvbHVtbk5hbWVcIjogXCJcIlxuICAgIH07XG4gICAgX2pzb25EYXRhLnBhdGhzID0gX3RoaXMuZXEoaSkuYXR0cignZGF0YS1wYXRocycpLnNwbGl0KCcsJyk7XG4gICAgX2pzb25EYXRhLnRhYmxlTmFtZSA9IF90aGlzLmVxKGkpLmF0dHIoJ2RhdGEtdGFibGVOYW1lJyk7XG4gICAgX2pzb25EYXRhLmNvbHVtbk5hbWUgPSBfdGhpcy5lcShpKS5hdHRyKCdkYXRhLWNvbHVtbk5hbWUnKTtcblxuICAgIC8vIOS4ieenjeafpeivouadoeS7tu+8jOS+neasoeS4uui+k+WFpeahhuOAgemAieaLqeahhuWSjOiMg+WbtO+8jGVsc2XkuLpcIuaPj+i/sFwi77yM5YaF6YOoaWblpoLmnpzmsqHmnInloavlgLzvvIzot7Plh7rlvqrnjq9cbiAgICB2YXIgX2NvbmRpdGlvblR5cGUgPSBfdGhpcy5lcShpKS5maW5kKCcuZGF0YS1zZWFyY2gtY29uZGl0aW9uJyk7XG4gICAgaWYoX2NvbmRpdGlvblR5cGUuaGFzQ2xhc3MoJ2RhdGEtc2VhcmNoLXRleHQnKSl7XG4gICAgICB2YXIgX3RoaXNEb20gPSBfY29uZGl0aW9uVHlwZS5maW5kKCdpbnB1dCcpO1xuICAgICAgaWYoISQudHJpbShfdGhpc0RvbS52YWwoKSkpe1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIF9qc29uRGF0YS52YWx1ZSA9ICQudHJpbShfdGhpc0RvbS52YWwoKSk7XG4gICAgfWVsc2UgaWYoX2NvbmRpdGlvblR5cGUuaGFzQ2xhc3MoJ2RhdGEtc2VhcmNoLWNoZWNrYm94Jykpe1xuICAgICAgdmFyIF90aGlzRG9tID0gX2NvbmRpdGlvblR5cGUuZmluZCgnaW5wdXQ6Y2hlY2tlZCcpO1xuICAgICAgaWYoIV90aGlzRG9tLmxlbmd0aCl7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgX2pzb25EYXRhLnZhbHVlcyA9IFtdO1xuICAgICAgJC5lYWNoKF90aGlzRG9tLGZ1bmN0aW9uKGosZil7XG4gICAgICAgIF9qc29uRGF0YS52YWx1ZXMucHVzaChfdGhpc0RvbS5lcShqKS5wYXJlbnQoKS50ZXh0KCkpO1xuICAgICAgfSk7XG4gICAgfWVsc2UgaWYoX2NvbmRpdGlvblR5cGUuaGFzQ2xhc3MoJ2RhdGEtc2VhcmNoLWZyb21UbycpKXtcbiAgICAgIHZhciBfdGhpc0RvbSA9IF9jb25kaXRpb25UeXBlLmZpbmQoJ2lucHV0Jyk7XG4gICAgICBpZighJC50cmltKF90aGlzRG9tLmVxKDApLnZhbCgpKSAmJiAhJC50cmltKF90aGlzRG9tLmVxKDEpLnZhbCgpKSl7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgX2pzb25EYXRhLmZyb20gPSAkLnRyaW0oX3RoaXNEb20uZXEoMCkudmFsKCkpO1xuICAgICAgX2pzb25EYXRhLnRvID0gJC50cmltKF90aGlzRG9tLmVxKDEpLnZhbCgpKTtcbiAgICB9ZWxzZXtcbiAgICAgIHZhciBfdGhpc0RvbSA9IF90aGlzLmVxKGkpLmZpbmQoJ2lucHV0Jyk7XG4gICAgICBpZighJC50cmltKF90aGlzRG9tLnZhbCgpKSl7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgX2pzb25EYXRhLnZhbHVlID0gJC50cmltKF90aGlzRG9tLnZhbCgpKTtcbiAgICB9XG5cbiAgICBfanNvbkRhdGFTLmRhdGEucHVzaChfanNvbkRhdGEpO1xuICB9KTtcblxuICByZXR1cm4gX2pzb25EYXRhUztcbn07XG52YXIgVEFCTEVfRklFTERTID0gW107XG52YXIgcXVlcnlEYXRhID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdmFyIF9iZWZvcmVTZW5kID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcInBhZ2VOdW1cIiwgb3B0aW9ucy5jdXJyZW50UGFnZSk7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwicGFnZUxpbWl0XCIsIG9wdGlvbnMucGFnZVNpemUpO1xuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgZ2V0Q29va2llKCdDTURCLVRPS0VOLVRZUEUnKSArJyAnKyBnZXRDb29raWUoJ0NNREItVE9LRU4nKSk7XG4gIH07XG4gIFxuICBXVUkuYWpheCh7XG4gICAgdXJsOiBET01BSU4uQ01EQiArIENNREJfQVBJLnF1ZXJ5LFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIC8vIGpzb25EYXRhOiB7fSxcbiAgICBqc29uRGF0YTogcXVlcnlKc29uKCksXG4gICAgZGlzYWJsZVhTUzogdHJ1ZSxcbiAgICBiZWZvcmVTZW5kOiBfYmVmb3JlU2VuZFxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgV1VJLkRhdGFUYWJsZS5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcuZGF0YS10YWJsZScpLFxuICAgICAgbWV0YTogTUVUQSxcbiAgICAgIGZpZWxkczogVEFCTEVfRklFTERTLFxuICAgICAgbGlzdDogcmVzcC5saXN0LFxuICAgICAgb3BlcmF0aW9uczogW3tcbiAgICAgICAgbmFtZTogJ+WFs+ezuycsXG4gICAgICAgIGNhbGxiYWNrOiByZWxhdGlvbkRhdGFcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ+e8lui+kScsXG4gICAgICAgIGNhbGxiYWNrOiBjcmVhdGVEYXRhXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICfliKDpmaQnLFxuICAgICAgICBjYWxsYmFjazogZGVsZXRlRGF0YVxuICAgICAgfV0sXG4gICAgICBncm91cHM6IFt7XG4gICAgICAgIG5hbWU6ICfmoIfnrb4nLFxuICAgICAgICBjbGFzc05hbWU6ICdidG4gYnRuLXhzIGJ0bi1zdWNjZXNzJyxcbiAgICAgICAgaWQ6ICdidG4tc3VjY2VzcycsXG4gICAgICAgIGNhbGxiYWNrOiBsYWJlbERhdGFcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ+S4i+i9vScsXG4gICAgICAgIGNsYXNzTmFtZTogJ2J0biBidG4teHMgYnRuLXdhcm5pbmcnLFxuICAgICAgICBpZDogJ2J0bi13YXJuaW5nJyxcbiAgICAgICAgY2FsbGJhY2s6IGRvd25sb2FkRGF0YVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiAn5om56YeP5Yig6ZmkJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnYnRuIGJ0bi14cyBidG4tZGFuZ2VyJyxcbiAgICAgICAgaWQ6ICdidG4tZGFuZ2VyJyxcbiAgICAgICAgY2FsbGJhY2s6IGRlbGV0ZURhdGFcbiAgICAgIH1dXG4gICAgfSk7XG5cbiAgICBXVUkuRGF0YVBhZ2luYXRvci5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcuZGF0YS1wYWdpbmF0b3InKSxcbiAgICAgIGN1cnJlbnRQYWdlOiBvcHRpb25zLmN1cnJlbnRQYWdlIC0gMSxcbiAgICAgIHRvdGFsOiByZXNwLnRvdGFsQ291bnQsXG4gICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZSxcbiAgICAgIG9uU3dpdGNoUGFnZTogZnVuY3Rpb24gKGN1cnJlbnRQYWdlKSB7XG4gICAgICAgIHF1ZXJ5RGF0YSh7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IGN1cnJlbnRQYWdlICsgMSxcbiAgICAgICAgICBwYWdlU2l6ZTogb3B0aW9ucy5wYWdlU2l6ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xudmFyIGRvd25sb2FkRGF0YSA9IGZ1bmN0aW9uKGl0ZW0pe1xuICB2YXIgX2pzb25EYXRhID0ge1xuICAgIFwiZGF0YVwiOiBbe1xuICAgICAgXCJwYXRoc1wiOiBbaXRlbVswXS50YWJsZV0sXG4gICAgICBcInRhYmxlTmFtZVwiOiBpdGVtWzBdLnRhYmxlLFxuICAgICAgXCJjb2x1bW5OYW1lXCI6IFwiaWRcIixcbiAgICAgIFwidmFsdWVzXCI6IFtdXG4gICAgfV1cbiAgfTtcbiAgJC5lYWNoKGl0ZW0sIGZ1bmN0aW9uKGksIGUpe1xuICAgIF9qc29uRGF0YS5kYXRhWzBdLnZhbHVlcy5wdXNoKGUuaWQpO1xuICB9KTtcbiAgdmFyIGZvcm09JChcIjxmb3JtPlwiKTtcbiAgZm9ybS5hdHRyKFwiaWRcIixcImV4cG9ydERhdGFGb3JtXCIpO1xuICBmb3JtLmF0dHIoXCJzdHlsZVwiLFwiZGlzcGxheTpub25lXCIpO1xuICBmb3JtLmF0dHIoXCJ0YXJnZXRcIixcIl9ibGFua1wiKTtcbiAgZm9ybS5hdHRyKFwibWV0aG9kXCIsXCJwb3N0XCIpO1xuICBmb3JtLmF0dHIoXCJhY3Rpb25cIixET01BSU4uQ01EQiArIENNREJfQVBJLmV4cG9ydCk7XG4gIHZhciBpbnB1dDE9JChcIjxpbnB1dD5cIik7XG4gIGlucHV0MS5hdHRyKFwidHlwZVwiLFwiaGlkZGVuXCIpO1xuICBpbnB1dDEuYXR0cihcIm5hbWVcIixcImpzb25TdHJpbmdcIik7XG4gIGlucHV0MS5hdHRyKFwidmFsdWVcIixKU09OLnN0cmluZ2lmeShfanNvbkRhdGEpKTtcbiAgJChcImJvZHlcIikuYXBwZW5kKGZvcm0pO1xuICBmb3JtLmFwcGVuZChpbnB1dDEpO1xuICBmb3JtLnN1Ym1pdCgpO1xuICAkKCcjZXhwb3J0RGF0YUZvcm0nKS5yZW1vdmUoKTtcbn07XG52YXIgZXhwb3J0RGF0YSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBmb3JtPSQoXCI8Zm9ybT5cIik7XG4gIGZvcm0uYXR0cihcImlkXCIsXCJleHBvcnREYXRhRm9ybVwiKTtcbiAgZm9ybS5hdHRyKFwic3R5bGVcIixcImRpc3BsYXk6bm9uZVwiKTtcbiAgZm9ybS5hdHRyKFwidGFyZ2V0XCIsXCJfYmxhbmtcIik7XG4gIGZvcm0uYXR0cihcIm1ldGhvZFwiLFwicG9zdFwiKTtcbiAgZm9ybS5hdHRyKFwiYWN0aW9uXCIsRE9NQUlOLkNNREIgKyBDTURCX0FQSS5leHBvcnQpO1xuICB2YXIgaW5wdXQxPSQoXCI8aW5wdXQ+XCIpO1xuICBpbnB1dDEuYXR0cihcInR5cGVcIixcImhpZGRlblwiKTtcbiAgaW5wdXQxLmF0dHIoXCJuYW1lXCIsXCJqc29uU3RyaW5nXCIpO1xuICBpbnB1dDEuYXR0cihcInZhbHVlXCIsSlNPTi5zdHJpbmdpZnkocXVlcnlKc29uKCkpKTtcbiAgJChcImJvZHlcIikuYXBwZW5kKGZvcm0pO1xuICBmb3JtLmFwcGVuZChpbnB1dDEpO1xuICBmb3JtLnN1Ym1pdCgpO1xuICAkKCcjZXhwb3J0RGF0YUZvcm0nKS5yZW1vdmUoKTtcbn07XG52YXIgaW1wb3J0RGF0YSA9IGZ1bmN0aW9uKGUpe1xuICBXVUkubG9hZGluZy5jcmVhdGUoKTtcbiAgdmFyIGZpbGUgPSBlLmZpbGVzWzBdO1xuICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG5cbiAgJC5hamF4KHtcbiAgICB1cmw6IERPTUFJTi5DTURCICsgQ01EQl9BUEkuaW1wb3J0LFxuICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgY2FjaGU6IGZhbHNlLFxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgYmVmb3JlU2VuZDogZnVuY3Rpb24oeGhyKXt4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgZ2V0Q29va2llKCdDTURCLVRPS0VOLVRZUEUnKSArJyAnKyBnZXRDb29raWUoJ0NNREItVE9LRU4nKSk7fVxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgJCgnI2xvYWRpbmdQb3AnKS5yZW1vdmUoKTtcbiAgICBpbXBvcnREYXRhRW1wdHkoKTtcblxuICAgIGlmKHJlc3AuZXJyb3JDb2RlID09PSAnNTAwJyl7XG4gICAgICBXVUkuYWxlcnQuY3JlYXRlKHtcbiAgICAgICAgbWVzc2FnZTogcmVzcC5tZXNzYWdlLFxuICAgICAgICBmYWlsOiB0cnVlXG4gICAgICB9KTtcbiAgICB9ZWxzZXtcbiAgICAgIFdVSS5hbGVydC5jcmVhdGUoe1xuICAgICAgICBtZXNzYWdlOiAn5a+85YWl5oiQ5YqfJyxcbiAgICAgICAgc3VjY2VzczogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIHF1ZXJ5RGF0YSh7XG4gICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICBwYWdlU2l6ZTogUEFHRV9TSVpFXG4gICAgICB9KTtcbiAgICB9XG4gIH0pLmZhaWwoZnVuY3Rpb24ocmVzcCl7XG4gICAgJCgnI2xvYWRpbmdQb3AnKS5yZW1vdmUoKTtcbiAgICBpbXBvcnREYXRhRW1wdHkoKTtcblxuICAgIFdVSS5hbGVydC5jcmVhdGUoe1xuICAgICAgbWVzc2FnZTogJ+WvvOWFpeWksei0pScsXG4gICAgICBmYWlsOiB0cnVlXG4gICAgfSk7XG4gIH0pO1xuXG4gIHZhciBpbXBvcnREYXRhRW1wdHkgPSBmdW5jdGlvbigpe1xuICAgIGlmIChlLm91dGVySFRNTCkge1xuICAgICAgZS5vdXRlckhUTUwgPSBlLm91dGVySFRNTDtcbiAgICB9IGVsc2Uge1xuICAgICAgZS52YWx1ZSA9IFwiXCI7XG4gICAgfVxuICB9O1xufTtcbnZhciBxdWVyeURpY3Rpb25hcnkgPSBmdW5jdGlvbih0YWJsZV9uYW1lKXtcbiAgV1VJLmFqYXgoe1xuICAgIHVybDogRE9NQUlOLkNNREIgKyBDTURCX0FQSS5xdWVyeURpY3Rpb25hcnksXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAganNvbkRhdGE6IHtcbiAgICAgIFwidGFibGVfbmFtZVwiOiB0YWJsZV9uYW1lXG4gICAgfVxuICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgJC5lYWNoKHJlc3AubGlzdCwgZnVuY3Rpb24oaSxlKXtcbiAgICAgIHZhciBfb3B0aW9uID0ge1xuICAgICAgICBsYWJlbDogZS5jb250ZW50LFxuICAgICAgICB2YWx1ZTogZS5jb250ZW50XG4gICAgICB9XG4gICAgICBNRVRBW2UuY29sdW1uX25hbWVdLm9wdGlvbnMucHVzaChfb3B0aW9uKTtcbiAgICB9KTtcbiAgfSkudGhlbihxdWVyeUNvbHVtbik7XG59O1xudmFyIHF1ZXJ5Q29sdW1uID0gZnVuY3Rpb24oKXtcbiAgV1VJLmFqYXgoe1xuICAgIHVybDogRE9NQUlOLkNNREIgKyBDTURCX0FQSS5jb2x1bW4sXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICAvLyDliJvlu7p0YWJsZeeahOWxleekuuWIl1xuICAgIFRBQkxFX0ZJRUxEUyA9IHJlc3Auc2hvd0NvbHVtbk5hbWU7XG4gICAgLy8g5Yib5bu6ZmlsdGVyXG4gICAgV1VJLkRhdGFTZWFyY2guY3JlYXRlKHtcbiAgICAgICRlbDogJCgnLmNvbnRlbnQtd3JhcHBlciAuZGF0YS1zZWFyY2gnKSxcbiAgICAgIG1ldGE6IHJlc3AsXG4gICAgICBzZWFyY2hUb29sczogU0VBUkNIX1RPT0xTID8gU0VBUkNIX1RPT0xTIDogW10sXG4gICAgICBxdWVyeUJ1dHRvbjogJ+afpeivoicsXG4gICAgICBvbkZpbHRlcjogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICBxdWVyeURhdGEoJC5leHRlbmQocGFyYW1zLCB7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgICAgcGFnZVNpemU6IFBBR0VfU0laRVxuICAgICAgICB9KSk7XG4gICAgICB9LFxuICAgICAgYWRkQnV0dG9uOiAn5paw5aKeJyxcbiAgICAgIGFkZEZ1bmM6IGNyZWF0ZURhdGFcbiAgICB9KTtcblxuICAgIC8vIOWIl+ihqOaVsOaNrlxuICAgIHF1ZXJ5RGF0YSh7XG4gICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgIHBhZ2VTaXplOiBQQUdFX1NJWkVcbiAgICB9KTtcbiAgfSk7XG59O1xuLy8gQ01EQuebuOWFs+WFrOeUqOWHveaVsCBlbmRcblxuLy92YXIgV1VJID0gd2luZG93LldVSSB8fCB7fTtcbldVSS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgLy8gaW5pdCBnbG9iYWwgY29uZmlnXG4gIFdVSS5jb25maWcgPSBXVUkuY29uZmlnIHx8IHt9O1xuICBXVUkuY29uZmlnLnN5c3RlbSA9IG9wdGlvbnMuc3lzdGVtO1xuICBXVUkuY29uZmlnLmxvY2FsZSA9IG9wdGlvbnMubG9jYWxlIHx8ICd6aC1DTic7XG5cbiAgdmFyIGluaXRTaXRlSGVhZGVyID0gZnVuY3Rpb24gKHJlc3ApIHtcbiAgICBXVUkuU2l0ZUhlYWRlci5jcmVhdGUoe1xuICAgICAgJGVsOiAkKCcubWFpbi1oZWFkZXInKSxcbiAgICAgIG5hbWU6IHJlc3AuYWFzVXNlclByaW5jaXBhbC5zc29Vc2VyTmFtZSxcbiAgICAgIHJvbGVzOiByZXNwLmFhc1VzZXJQcmluY2lwYWwuYWFzVXNlclJlc291cmNlcy5yb2xlc1swXS5yb2xlTmFtZSxcbiAgICAgIGNtZGJRdWljazogdHJ1ZVxuICAgIH0pXG4gIH07XG5cbiAgdmFyIGZpbHRlck1lbnVzID0gZnVuY3Rpb24ocmVzb3VyY2VzKSB7XG4gICAgdmFyIG1lbnVzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHJlc291cmNlID0gcmVzb3VyY2VzW2ldO1xuXG4gICAgICBpZiAocmVzb3VyY2UucmVzb3VyY2VUeXBlID09PSAnbWVudScpIHtcbiAgICAgICAgaWYgKCFyZXNvdXJjZS5pc0xlYWYpIHtcbiAgICAgICAgICByZXNvdXJjZS5zdWJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgbWVudXMucHVzaChyZXNvdXJjZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbnVzO1xuICB9O1xuXG4gIHZhciBmaW5kUGFyZW50ID0gZnVuY3Rpb24gKHJlc291cmNlLCByZXNvdXJjZXMpIHtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcblxuICAgIGlmIChyZXNvdXJjZS5wYXJlbnRMZXZlbFN0cnVjdHVyZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHJlc291cmNlc1tpXS5sZXZlbFN0cnVjdHVyZSA9PT0gcmVzb3VyY2UucGFyZW50TGV2ZWxTdHJ1Y3R1cmUpIHtcbiAgICAgICAgICByZXN1bHQgPSByZXNvdXJjZXNbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIGluaXRTaXRlTWVudSA9IGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgdmFyIG1lbnVzID0gW107XG4gICAgdmFyIHJlc291cmNlcyA9IHJlc3AuYWFzVXNlclByaW5jaXBhbC5hYXNVc2VyUmVzb3VyY2VzLnJlc291cmNlcztcbiAgICAvLyDpppbpobXmmK/kuLrlrZDns7vnu5/ljZXni6zmt7vliqDnmoTvvIzmsqHmnInmlL7lhaXlkI7lj7DlgZrnrqHnkIZcbiAgICB2YXIgaXNIb21lID0gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZihXVUkuY29uZmlnLnN5c3RlbSArICcvaG9tZS5odG1sJykgPj0gMDtcblxuICAgIGlmIChXVUkuY29uZmlnLnN5c3RlbSA9PT0gJ29yZGVyJykge1xuICAgICAgLy8g5bel5Y2V57O757uf5Zub57qn6I+c5Y2V57uT5p6E5aaC77yaMS4yLjMuNC41ICjnrKzkuIDkvY3kuLrlrZDns7vnu58pXG4gICAgICB2YXIgbWVudVJlc291cmNlcyA9IGZpbHRlck1lbnVzKHJlc291cmNlcyk7XG5cbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBtZW51UmVzb3VyY2VzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB2YXIgbWVudVJlc291cmNlID0gbWVudVJlc291cmNlc1tpbmRleF07XG4gICAgICAgIHZhciBwYXJlbnQgPSBmaW5kUGFyZW50KG1lbnVSZXNvdXJjZSwgbWVudVJlc291cmNlcyk7XG5cbiAgICAgICAgaWYgKCFpc0hvbWUgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZihtZW51UmVzb3VyY2UubGlua1VyKSA+PSAwKSB7XG4gICAgICAgICAgbWVudVJlc291cmNlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICBwYXJlbnQuc3Vicy5wdXNoKG1lbnVSZXNvdXJjZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVudXMucHVzaChtZW51UmVzb3VyY2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOe7n+S4gOezu+e7n+S6jOe6p+iPnOWNlee7k+aehOWmgu+8mjEuMi4zICjnrKzkuIDkvY3kuLrlrZDns7vnu58pXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSByZXNvdXJjZXNbaV07XG4gICAgICAgIGlmIChyZXNvdXJjZS5saW5rVXJsICYmIHJlc291cmNlLmxpbmtVcmwuaW5kZXhPZigndHJhZGUtbW9uaXRvcicpID4gMCkge1xuICAgICAgICAgIHJlc291cmNlLm5ld1BhZ2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNvdXJjZS5yZXNvdXJjZVR5cGUgPT09ICdtZW51Jykge1xuICAgICAgICAgIHZhciBsaW5rVXJsID0gcmVzb3VyY2UubGlua1VybDtcbiAgICAgICAgICB2YXIgYWRkcmVzcyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgICAgaWYgKCFpc0hvbWUgJiYgYWRkcmVzcy5pbmRleE9mKGxpbmtVcmwpID49IDApIHtcbiAgICAgICAgICAgIHJlc291cmNlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbGV2ZWwgPSByZXNvdXJjZS5sZXZlbFN0cnVjdHVyZS5zcGxpdCgnLicpO1xuXG4gICAgICAgICAgaWYgKGxldmVsWzFdID09PSAnMCcpIHtcbiAgICAgICAgICAgIHJlc291cmNlLnN1YnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzb3VyY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIHZhciBzdWIgPSByZXNvdXJjZXNbal07XG5cbiAgICAgICAgICAgICAgaWYgKHN1Yi5yZXNvdXJjZVR5cGUgPT09ICdtZW51JyAmJlxuICAgICAgICAgICAgICAgIHN1Yi5wYXJlbnRMZXZlbFN0cnVjdHVyZSA9PT0gcmVzb3VyY2UubGV2ZWxTdHJ1Y3R1cmUpIHtcbiAgICAgICAgICAgICAgICBzdWIuc3VicyA9IFtdO1xuICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHJlc291cmNlcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIHZhciB0aGlyZCA9IHJlc291cmNlc1trXTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlyZC5yZXNvdXJjZVR5cGUgPT09ICdtZW51JyAmJlxuICAgICAgICAgICAgICAgICAgdGhpcmQucGFyZW50TGV2ZWxTdHJ1Y3R1cmUgPT09IHN1Yi5sZXZlbFN0cnVjdHVyZSkge1xuICAgICAgICAgICAgICAgICAgc3ViLmlzTGVhZiA9IHRydWU7XG4gICAgICAgICAgICAgICAgc3ViLnN1YnMucHVzaCh0aGlyZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDlhbzlrrnmlrDoj5zljZXnu5PmnoRcbiAgICAgICAgICAgICAgICBzdWIuaXNMZWFmID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXNvdXJjZS5zdWJzLnB1c2goc3ViKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWVudXMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNtZGJNZW51ID0gW3tcbiAgICAgIHJlc291cmNlRGlzcGxheU5hbWUgOiAnQ01EQicsXG4gICAgICBzdWJzIDogW3tcbiAgICAgICAgcmVzb3VyY2VEaXNwbGF5TmFtZSA6J+mFjee9rumhuee7tOaKpCcsXG4gICAgICAgIHN1YnM6W3tcbiAgICAgICAgICByZXNvdXJjZURpc3BsYXlOYW1lIDogJ+S9jee9ricsXG4gICAgICAgICAgbGlua1VybDonL2NtZGIvaWRjLWxpc3QuaHRtbCcsXG4gICAgICAgICAgaXNBY3RpdmU6d2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignL2NtZGIvaWRjLWxpc3QuaHRtbCcpID4gMSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICBpc0xlYWY6dHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgcmVzb3VyY2VEaXNwbGF5TmFtZSA6ICfmnI3liqHlmagnLFxuICAgICAgICAgIGxpbmtVcmw6Jy9jbWRiL3NlcnZlLWxpc3QuaHRtbCcsXG4gICAgICAgICAgaXNBY3RpdmU6d2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignL2NtZGIvc2VydmUtbGlzdC5odG1sJykgPiAxID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgIGlzTGVhZjp0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICByZXNvdXJjZURpc3BsYXlOYW1lIDogJ+iZmuaLn+acuicsXG4gICAgICAgICAgbGlua1VybDonL2NtZGIvdm0tbGlzdC5odG1sJyxcbiAgICAgICAgICBpc0FjdGl2ZTp3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcvY21kYi92bS1saXN0Lmh0bWwnKSA+IDEgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgaXNMZWFmOnRydWVcbiAgICAgICAgfSwge1xuICAgICAgICAgIHJlc291cmNlRGlzcGxheU5hbWUgOiAn572R57uc6K6+5aSHJyxcbiAgICAgICAgICBsaW5rVXJsOicvY21kYi9kZXZpY2UtbGlzdC5odG1sJyxcbiAgICAgICAgICBpc0FjdGl2ZTp3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcvY21kYi9kZXZpY2UtbGlzdC5odG1sJykgPiAxID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgIGlzTGVhZjp0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICByZXNvdXJjZURpc3BsYXlOYW1lIDogJ+W6lOeUqCcsXG4gICAgICAgICAgbGlua1VybDonL2NtZGIvcHJvamVjdC1saXN0Lmh0bWwnLFxuICAgICAgICAgIGlzQWN0aXZlOndpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJy9jbWRiL3Byb2plY3QtbGlzdC5odG1sJykgPiAxID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgIGlzTGVhZjp0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICByZXNvdXJjZURpc3BsYXlOYW1lIDogJ+WFs+ezuydcbiAgICAgICAgfV1cbiAgICAgIC8vIH0sIHtcbiAgICAgIC8vICAgcmVzb3VyY2VEaXNwbGF5TmFtZSA6J0lQ6KeE5YiS566h55CGJyxcbiAgICAgIC8vICAgc3Viczpbe1xuICAgICAgLy8gICAgIHJlc291cmNlRGlzcGxheU5hbWUgOiAnSVDop4TliJLliJfooagnXG4gICAgICAvLyAgIH0sIHtcbiAgICAgIC8vICAgICByZXNvdXJjZURpc3BsYXlOYW1lIDogJ0lQ5L2/55SoJ1xuICAgICAgLy8gICB9XVxuICAgIH0sIHtcbiAgICAgIHJlc291cmNlRGlzcGxheU5hbWUgOifphY3nva7pobnnrqHnkIYnLFxuICAgICAgc3Viczpbe1xuICAgICAgICAvLyAgIHJlc291cmNlRGlzcGxheU5hbWUgOiAn6YWN572u6aG5566h55CGJyxcbiAgICAgICAgLy8gICBsaW5rVXJsOicvY21kYi9yZWxhdGlvbi1saXN0Lmh0bWwnLFxuICAgICAgICAvLyAgIGlzQWN0aXZlOndpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJy9jbWRiL3JlbGF0aW9uLWxpc3QuaHRtbCcpID4gMSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgLy8gICBpc0xlYWY6ZmFsc2VcbiAgICAgICAgLy8gfSwge1xuICAgICAgICAvLyAgIHJlc291cmNlRGlzcGxheU5hbWUgOiAn6YWN572u6aG5Leagh+etvumFjee9ricsXG4gICAgICAgIC8vICAgbGlua1VybDonL2NtZGIvY29uZmlndXJhdGlvbi1saXN0Lmh0bWwnLFxuICAgICAgICAvLyAgIGlzQWN0aXZlOndpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJy9jbWRiL2NvbmZpZ3VyYXRpb24tbGlzdC5odG1sJykgPiAxID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAvLyAgIGlzTGVhZjpmYWxzZVxuICAgICAgICAvLyB9LCB7XG4gICAgICAgICAgcmVzb3VyY2VEaXNwbGF5TmFtZSA6ICfphY3nva7pobnmn6Xor6InLFxuICAgICAgICAgIGxpbmtVcmw6Jy9jbWRiL3F1aWNrLXF1ZXJ5Lmh0bWwnLFxuICAgICAgICAgIGlzQWN0aXZlOndpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJy9jbWRiL3F1aWNrLXF1ZXJ5Lmh0bWwnKSA+IDEgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgaXNMZWFmOnRydWVcbiAgICAgICAgfV1cbiAgICAgIC8vIH0sIHtcbiAgICAgIC8vICAgcmVzb3VyY2VEaXNwbGF5TmFtZSA6J+e7n+iuoeafpeivoicsXG4gICAgICAvLyAgIHN1YnM6W3tcbiAgICAgIC8vICAgICByZXNvdXJjZURpc3BsYXlOYW1lIDogJ+S9jeWtkF/mnLrmn5zkvb/nlKgnXG4gICAgICAvLyAgIH0sIHtcbiAgICAgIC8vICAgICByZXNvdXJjZURpc3BsYXlOYW1lIDogJ+S9jeWtkF/orr7lpIfliIbluIMnXG4gICAgICAvLyAgIH0sIHtcbiAgICAgIC8vICAgICByZXNvdXJjZURpc3BsYXlOYW1lIDogJ+S9jeWtkF/orr7lpIfnirbmgIEnXG4gICAgICAvLyAgIH0sIHtcbiAgICAgIC8vICAgICByZXNvdXJjZURpc3BsYXlOYW1lIDogJ+W6lOeUqF/liIbluIMnXG4gICAgICAvLyAgIH0sIHtcbiAgICAgIC8vICAgICByZXNvdXJjZURpc3BsYXlOYW1lIDogJ+e7tOS/neafpeivoidcbiAgICAgIC8vICAgfSwge1xuICAgICAgLy8gICAgIHJlc291cmNlRGlzcGxheU5hbWUgOiAnSVDkvb/nlKgnXG4gICAgICAvLyAgIH1dXG4gICAgfV1cbiAgICAvLyB9LCB7XG4gICAgLy8gICByZXNvdXJjZURpc3BsYXlOYW1lIDogJ+WPmOabtOeuoeeQhidcbiAgfSwge1xuICAgIHJlc291cmNlRGlzcGxheU5hbWUgOiAn6YCa55+l566h55CGJyxcbiAgICBzdWJzIDogW3tcbiAgICAgIHJlc291cmNlRGlzcGxheU5hbWUgOifmoIfnrb4nXG4gICAgfSwge1xuICAgICAgcmVzb3VyY2VEaXNwbGF5TmFtZSA6J+mFjee9rumhuSdcbiAgICB9XVxuICB9LCB7XG4gICAgcmVzb3VyY2VEaXNwbGF5TmFtZSA6ICfns7vnu5/nrqHnkIYnLFxuICAgIHN1YnMgOiBbe1xuICAgICAgcmVzb3VyY2VEaXNwbGF5TmFtZSA6J+agh+etvicsXG4gICAgICBsaW5rVXJsOicvY21kYi9sYWJlbC1saXN0Lmh0bWwnLFxuICAgICAgaXNBY3RpdmU6d2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignL2NtZGIvbGFiZWwtbGlzdC5odG1sJykgPiAxID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgaXNMZWFmOnRydWVcbiAgICB9LCB7XG4gICAgICByZXNvdXJjZURpc3BsYXlOYW1lIDon5pWw5o2u5a2X5YW4JyxcbiAgICAgIGxpbmtVcmw6Jy9jbWRiL2RpY3Rpb25hcnktbGlzdC5odG1sJyxcbiAgICAgIGlzQWN0aXZlOndpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJy9jbWRiL2RpY3Rpb25hcnktbGlzdC5odG1sJykgPiAxID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgaXNMZWFmOnRydWVcbiAgICB9LCB7XG4gICAgICByZXNvdXJjZURpc3BsYXlOYW1lIDon55So5oi3JyxcbiAgICAgIGxpbmtVcmw6Jy9jbWRiL3Blb3BsZS1saXN0Lmh0bWwnLFxuICAgICAgaXNBY3RpdmU6d2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignL2NtZGIvcGVvcGxlLWxpc3QuaHRtbCcpID4gMSA/IHRydWUgOiBmYWxzZSxcbiAgICAgIGlzTGVhZjp0cnVlXG4gICAgICAvLyB9LCB7XG4gICAgICAvLyAgIHJlc291cmNlRGlzcGxheU5hbWUgOifoj5zljZXnrqHnkIYnXG4gICAgICAvLyB9LCB7XG4gICAgICAvLyAgIHJlc291cmNlRGlzcGxheU5hbWUgOifmnYPpmZDnrqHnkIYnXG4gICAgfV1cbiAgfV07XG5cbiAgJCgnLm1haW4tc2lkZWJhcicpLnJlcGxhY2VXaXRoKFdVSS50ZW1wbGF0ZXNbJ3NpdGUtbWVudSddKHtcbiAgICBtZW51czogY21kYk1lbnUsXG4gICAgaXNIb21lOiBpc0hvbWVcbiAgfSkpO1xuXG4gICQoJy5zaWRlYmFyLW1lbnUgbGknKS5jbGljayhmdW5jdGlvbihldmVudCl7XG4gICAgdmFyIF90aGlzID0gJCh0aGlzKTtcbiAgICBpZihfdGhpcy5oYXNDbGFzcygnYWN0aXZlJykpe1xuICAgICAgX3RoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1lbHNle1xuICAgICAgJCgnLnNpZGViYXItbWVudSBsaScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgIF90aGlzLmFkZENsYXNzKCdhY3RpdmUnKS5wYXJlbnRzKCdsaScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIF90aGlzLnBhcmVudHMoJy50cmVldmlldy1tZW51JykucHJldigpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG4gIHZhciBfbG9jYXRpb25VcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgdmFyIF9sb2NhdGlvbkhvc3QgPSBfbG9jYXRpb25Vcmwuc3BsaXQoJy8nKVswXSArICcvLycgKyBfbG9jYXRpb25Vcmwuc3BsaXQoJy8nKVsyXTtcbiAgdmFyIF9sb2NhdGlvbkhyZWYgPSBfbG9jYXRpb25Vcmwuc2xpY2UoX2xvY2F0aW9uSG9zdC5sZW5ndGgpLnNwbGl0KCc/JylbMF07XG4gICQuZWFjaCgkKCcuc2lkZWJhci1tZW51IGEnKSwgZnVuY3Rpb24oKXtcbiAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xuICAgIHZhciBfdXJsID0gX3RoaXMuYXR0cignaHJlZicpO1xuICAgIGlmKF91cmwgPT0gX2xvY2F0aW9uSHJlZil7XG4gICAgICBfdGhpcy5wYXJlbnRzKCdsaScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIF90aGlzLnBhcmVudHMoJy50cmVldmlldy1tZW51JykucHJldignbGknKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xufTtcblxudmFyIGluaXRDb25maWdJbmZvID0gJyc7XG5cbnZhciBpbml0U2l0ZUZvb3RlciA9IGZ1bmN0aW9uIChyZXNwKSB7XG4gICQoJy5tYWluLWZvb3RlcicpLnJlcGxhY2VXaXRoKFdVSS50ZW1wbGF0ZXNbJ3NpdGUtZm9vdGVyJ10ocmVzcCkpO1xufTtcblxuV1VJLmdldFJlc291cmNlID0gZnVuY3Rpb24gKHVybCwgYSkge1xuICB2YXIgbGEgPSBhID8gYSA6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgdXJsID0gbGEgKyB1cmw7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdENvbmZpZ0luZm8ubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgX2xpbmsgPSBpbml0Q29uZmlnSW5mb1tpXS5saW5rVXJsO1xuICAgIGlmICh1cmwgPT0gX2xpbmspIHtcbiAgICAgIHZhciBpbmZvID0gaW5pdENvbmZpZ0luZm9baV07XG4gICAgfVxuICB9XG4gIHJldHVybiBpbmZvXG59XG5cbnZhciBpbml0U3lzdGVtID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFdVSS5hamF4KHtcbiAgICAvLyAgIHVybDogJy8nICsgV1VJLmNvbmZpZy5zeXN0ZW0gKyAnL3dlYi92MS9zc28vZ2V0UmVzb3VyY2VzJyxcbiAgICAvLyAgIG1ldGhvZDonUE9TVCdcbiAgICAvLyB9KS5kb25lKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgIHZhciByZXNwID0ge1xuICAgICAgICBcImFhc1VzZXJQcmluY2lwYWxcIjp7XG4gICAgICAgICAgXCJhYXNVc2VyUmVzb3VyY2VzXCI6e1xuICAgICAgICAgICAgXCJyZXNvdXJjZXNcIjpbXSxcbiAgICAgICAgICAgIFwicm9sZXNcIjpbe1wicm9sZU5hbWVcIjpcIkFkbWluaXN0cmF0b3JcIn1dXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNzb1VzZXJOYW1lXCI6IGdldENvb2tpZSgnQ01EQi1VU0VSTkFNRScpXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIFdVSS5jb25maWcudXNlck5hbWUgPSByZXNwLmFhc1VzZXJQcmluY2lwYWwuc3NvVXNlck5hbWUsXG4gICAgICBpbml0U2l0ZUhlYWRlcihyZXNwKTtcbiAgICAgIGluaXRTaXRlTWVudShyZXNwKTtcbiAgICAgIGluaXRTaXRlRm9vdGVyKHJlc3ApO1xuICAgICAgaW5pdENvbmZpZ0luZm8gPSByZXNwLmFhc1VzZXJQcmluY2lwYWwuYWFzVXNlclJlc291cmNlcy5yZXNvdXJjZXM7XG4gICAgICAkLkFkbWluTFRFLmluaXQoKTtcbiAgICAgIFdVSS5yZWFkeSgpO1xuXG4gICAgICAkKCcubmF2YmFyLWNtZGItcXVpY2sgaW5wdXQnKS5mb2N1cygpO1xuICAgICAgJCgnLm5hdmJhci1jbWRiLXF1aWNrIGlucHV0Jykua2V5dXAoZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICB2YXIgX2tleSA9ICQudHJpbSgkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgaWYoZXZlbnQua2V5Q29kZSA9PSAxMyl7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2NtZGIvcXVpY2stcXVlcnkuaHRtbD9rZXk9JyArIF9rZXk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIC8vIH0pO1xuICB9O1xuXG4gIGluaXRTeXN0ZW0ob3B0aW9ucyk7XG59O1xuXG5XVUkucmVhZHkgPSBXVUkucmVhZHkgfHwgZnVuY3Rpb24gKCkge1xuICBjb25zb2xlLmVycm9yKCdXVUk6IFBsZWFzZSBwcm92aWRlIFdVSS5yZWFkeSBmdW5jdGlvbi4nKTtcbn07XG5cbldVSS50eXBlSXRlbSA9IGZ1bmN0aW9uIChzdWIsIGluZm8pIHtcbiAgdmFyIGxpc3QgPSBbXVxuICBpbmZvLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgIGlmIChpdGVtLmNvZGVUeXBlID09IHN1Yikge1xuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfSlcbiAgcmV0dXJuIGxpc3Rcbn1cblxuZnVuY3Rpb24gZ2V0Q29va2llKCBuYW1lICkge1xuICB2YXIgc3RhcnQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZiggbmFtZSArIFwiPVwiICk7XG4gIHZhciBsZW4gPSBzdGFydCArIG5hbWUubGVuZ3RoICsgMTtcbiAgaWYgKCAoICFzdGFydCApICYmICggbmFtZSAhPSBkb2N1bWVudC5jb29raWUuc3Vic3RyaW5nKCAwLCBuYW1lLmxlbmd0aCApICkgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKCBzdGFydCA9PSAtMSApIHJldHVybiBudWxsO1xuICB2YXIgZW5kID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YoICc7JywgbGVuICk7XG4gIGlmICggZW5kID09IC0xICkgZW5kID0gZG9jdW1lbnQuY29va2llLmxlbmd0aDtcbiAgcmV0dXJuIHVuZXNjYXBlKCBkb2N1bWVudC5jb29raWUuc3Vic3RyaW5nKCBsZW4sIGVuZCApICk7XG59XG5mdW5jdGlvbiBkZWxDb29raWUobmFtZSkge1xuICB2YXIgZXhwID0gbmV3IERhdGUoKTtcbiAgZXhwLnNldFRpbWUoZXhwLmdldFRpbWUoKSAtIDEpO1xuICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9OyBleHBpcmVzPVwiICsgZXhwLnRvR01UU3RyaW5nKCk7XG59XG4iXSwiZmlsZSI6ImNvbW1vbi5qcyJ9
