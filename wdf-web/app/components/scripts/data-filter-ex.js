'use script';

WUI.DataFilterEx = (function () {
  var create = function (options) {
    var $el = options.$el;
    var onFilter = options.onFilter;
    var addFunc = options.addFunc;
    var meta = options.meta;
    var fields = options.fields.map(function (field) {
      var target = $.extend({}, meta[field], {
        name: field
      });

      switch (target.type) {
        case 'text':
          target.text = true;
          break;
        case 'select':
          target.select = true;
          break;
        case 'number':
          target.number = true;
          break;
        case 'date-picker':
          target.datePicker = true;
          break;
        default:
          target.text = true;
          break;
      }

      return target;
    });
    var multiFields = [];
    var index = 0;
    var lineNum = 0;

    while (index < fields.length) {
      multiFields[lineNum] = [];
      var jndex = 0;

      while(jndex++ < 4 && index < fields.length) {
        multiFields[lineNum].push(fields[index++]);
      }
      lineNum++;
    }

    $el.html(WUI.templates['data-filter-ex']({
      firstFields: multiFields[0],
      secondFields: multiFields[1],
      leftButton: options.leftButton,
      rightButton: options.rightButton,
      addButton: options.addButton ? options.addButton : false,
      queryButton: options.queryButton ? options.queryButton : false
    }));

    $el.find('.filter').click(function () {
      var paramArray = $el.find('form').serializeArray();
      var paramObj = {};

      paramArray.forEach(function (param) {
        paramObj[param.name] = param.value;
      });

      onFilter(paramObj);
    });

    $el.find('.add').click(function () {
      var paramArray = $el.find('form').serializeArray();
      var paramObj = {};

      paramArray.forEach(function (param) {
        paramObj[param.name] = param.value;
      });

      addFunc(paramObj);
    });

    // EX
    // Operation
    options.leftButton && $el.find('#data-filter-left-button').click(function () {
      var paramArray = $el.find('form').serializeArray();
      var paramObj = {};

      paramArray.forEach(function (param) {
        paramObj[param.name] = param.value;
      });

      options.leftButton.callback(paramObj);
    });
    options.rightButton && $el.find('#data-filter-right-button').click(function () {
      var paramArray = $el.find('form').serializeArray();
      var paramObj = {};

      paramArray.forEach(function (param) {
        paramObj[param.name] = param.value;
      });

      options.rightButton.callback(paramObj);
    });
    // Expension
    var $expendFields = $el.find('#data-filter-expend').hide();
    var $closeButton = $el.find('#data-filter-close').hide();
    var $openButton = $el.find('#data-filter-open');

    $closeButton.click(function() {
      $expendFields.hide();
      $openButton.show();
      $closeButton.hide();
    });

    $openButton.click(function() {
      $expendFields.show();
      $openButton.hide();
      $closeButton.show();
    });

    $el.find('#data-filter-open').click(function() {
      $expendFields.show();
    });

    var $datePicker = $el.find('.date-picker');

    $datePicker.daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      autoUpdateInput: false,
      locale: {
        applyLabel: '确定',
        cancelLabel: '取消',
        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        format: 'YYYY-MM-DD',
        separator: ' - ',
        fromLabel: '起始',
        toLabel: '终止',
        customRangeLabel: '自定义',
        weekLabel: 'W',
        firstDay: 1
      }
    });

    $datePicker.on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('YYYY-MM-DD'));
    });

    $datePicker.on('cancel.daterangepicker', function() {
      $(this).val('');
    });
  };

  return {
    create: create
  };
})();
