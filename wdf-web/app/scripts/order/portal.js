'use strict';

WUI.ready = function () {
	var $iframe = $('iframe');
	var queryString = window.location.search;
	var innerUrl = queryString.slice('?innerUrl='.length);

	$iframe
	.height($('.content-wrapper').height())
	.attr('src', innerUrl);

	$('.sidebar-menu li').click(function(event){
		var _this = $(this);
		if(_this.hasClass('active')){
			_this.removeClass('active');
		}else{
			$('.sidebar-menu li').removeClass('active');
			_this.addClass('active').parents('li').addClass('active');
			_this.parents('.treeview-menu').prev('li').addClass('active');
		}

		event.stopPropagation();
	});
	$.each($('.sidebar-menu a'), function(){
		var _this = $(this);
		var _url = _this.attr('href');
		if(_url != 'javascript:void(0);'){
			_this.children('i').hide();

			var _urlInnerUrl = _url.split('?innerUrl=')[1] || '';
			if(_urlInnerUrl == decodeURI(innerUrl)){
				_this.parents('li').addClass('active');
				_this.parents('.treeview-menu').prev('li').addClass('active');
			}
		}
	});
};

$(function () {
	WUI.init({
		system: 'order'
	});
});
