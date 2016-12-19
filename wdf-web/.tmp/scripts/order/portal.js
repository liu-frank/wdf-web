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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJvcmRlci9wb3J0YWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5XVUkucmVhZHkgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciAkaWZyYW1lID0gJCgnaWZyYW1lJyk7XG5cdHZhciBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG5cdHZhciBpbm5lclVybCA9IHF1ZXJ5U3RyaW5nLnNsaWNlKCc/aW5uZXJVcmw9Jy5sZW5ndGgpO1xuXG5cdCRpZnJhbWVcblx0LmhlaWdodCgkKCcuY29udGVudC13cmFwcGVyJykuaGVpZ2h0KCkpXG5cdC5hdHRyKCdzcmMnLCBpbm5lclVybCk7XG5cblx0JCgnLnNpZGViYXItbWVudSBsaScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcblx0XHR2YXIgX3RoaXMgPSAkKHRoaXMpO1xuXHRcdGlmKF90aGlzLmhhc0NsYXNzKCdhY3RpdmUnKSl7XG5cdFx0XHRfdGhpcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHQkKCcuc2lkZWJhci1tZW51IGxpJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0X3RoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpLnBhcmVudHMoJ2xpJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0X3RoaXMucGFyZW50cygnLnRyZWV2aWV3LW1lbnUnKS5wcmV2KCdsaScpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR9XG5cblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0fSk7XG5cdCQuZWFjaCgkKCcuc2lkZWJhci1tZW51IGEnKSwgZnVuY3Rpb24oKXtcblx0XHR2YXIgX3RoaXMgPSAkKHRoaXMpO1xuXHRcdHZhciBfdXJsID0gX3RoaXMuYXR0cignaHJlZicpO1xuXHRcdGlmKF91cmwgIT0gJ2phdmFzY3JpcHQ6dm9pZCgwKTsnKXtcblx0XHRcdF90aGlzLmNoaWxkcmVuKCdpJykuaGlkZSgpO1xuXG5cdFx0XHR2YXIgX3VybElubmVyVXJsID0gX3VybC5zcGxpdCgnP2lubmVyVXJsPScpWzFdIHx8ICcnO1xuXHRcdFx0aWYoX3VybElubmVyVXJsID09IGRlY29kZVVSSShpbm5lclVybCkpe1xuXHRcdFx0XHRfdGhpcy5wYXJlbnRzKCdsaScpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0X3RoaXMucGFyZW50cygnLnRyZWV2aWV3LW1lbnUnKS5wcmV2KCdsaScpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufTtcblxuJChmdW5jdGlvbiAoKSB7XG5cdFdVSS5pbml0KHtcblx0XHRzeXN0ZW06ICdvcmRlcidcblx0fSk7XG59KTtcbiJdLCJmaWxlIjoib3JkZXIvcG9ydGFsLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
