(function($) {
	var placeholderfriend = {
		focus: function(s) {
			s = $(s).hide().prev().show().focus();
			var idValue = s.attr("id");
			if (idValue) {
				s.attr("id", idValue.replace("placeholderfriend", ""));
			}
			var clsValue = s.attr("class");
			if (clsValue) {
				s.attr("class", clsValue.replace("placeholderfriend", ""));
			}
		}
	}
  //判断是否支持placeholder
  function isPlaceholer() {
  	var input = document.createElement('input');
  	return "placeholder" in input;
  }
  //不支持的代码
  if (!isPlaceholer()) {
  	$(function() {
  		var form = $(this);
      //遍历所有文本框，添加placeholder模拟事件
      var elements = form.find("input[type='text'][placeholder]");
      elements.each(function() {
      	var s = $(this);
      	var pValue = s.attr("placeholder");
      	var sValue = s.val();
      	if (pValue) {
      		if (sValue == '') {
      			s.val(pValue);
      		}
      	}
      });
      elements.focus(function() {
      	var s = $(this);
      	var pValue = s.attr("placeholder");
      	var sValue = s.val();
      	if (sValue && pValue) {
      		if (sValue == pValue) {
      			s.val('');
      		}
      	}
      });
      elements.blur(function() {
      	var s = $(this);
      	var pValue = s.attr("placeholder");
      	var sValue = s.val();
      	if (!sValue) {
      		s.val(pValue);
      	}
      });
      //遍历所有密码框，添加placeholder模拟事件
      var elementsPass = form.find("input[type='password'][placeholder]");
      elementsPass.each(function(i) {
      	var s = $(this);
      	var pValue = s.attr("placeholder");
      	var sValue = s.val();
      	if (pValue) {
      		if (sValue == '') {
            //DOM不支持type的修改，需要复制密码框属性，生成新的DOM
            var html = this.outerHTML || "";
            html = html.replace(/\s*type=(['"])?password\1/gi, " type=text placeholderfriend")
            .replace(/\s*(?:value|on[a-z]+|name)(=(['"])?\S*\1)?/gi, " ")
            .replace(/\s*placeholderfriend/, " placeholderfriend value='" + pValue
            	+ "' " + "onfocus='placeholderfriendfocus(this);' ");
            var idValue = s.attr("id");
            if (idValue) {
            	s.attr("id", idValue + "placeholderfriend");
            }
            var clsValue = s.attr("class");
            if (clsValue) {
            	s.attr("class", clsValue + "placeholderfriend");
            }
            s.hide();
            s.after(html);
          }
        }
      });
      elementsPass.blur(function() {
      	var s = $(this);
      	var sValue = s.val();
      	if (sValue == '') {
      		var idValue = s.attr("id");
      		if (idValue) {
      			s.attr("id", idValue + "placeholderfriend");
      		}
      		var clsValue = s.attr("class");
      		if (clsValue) {
      			s.attr("class", clsValue + "placeholderfriend");
      		}
      		s.hide().next().show();
      	}
      });
    });
  }
  window.placeholderfriendfocus = placeholderfriend.focus;

  $('.submit-button').click(function(){
  	login();
  });

  $(document).keyup(function(event){
  	if(event.keyCode ==13){
  		login();
  	}
  });
})(jQuery);

var DOMAIN = {
	CMDB : ''
};
if (window.location.href.indexOf('127.0.0.1') == 7) {
	DOMAIN['CMDB'] = 'http://cmdb.api.dev.wanda.com';
}

function login(){
	var _username = $.trim($('#username-input').val());
	var _password = $.trim($('#password-input').val());

	if(!_username){
		$('.error-message').text('帐号不能为空，请输入').show();
	}else if(!_password){
		$('.error-message').text('密码不能为空，请输入').show();
	}else{
		$('.error-message').text('').hide();

		$.ajax({
			url: DOMAIN.CMDB + '/oauth/token?grant_type=password&username=cmdb&password=cmdb',
			contentType: "application/json",
			dataType: "json", 
			username: _username,
			password: _password,
			type: "POST"
		}).then(function (resp) {
			console.log(resp.expires_in + 10);
			setCookie('CMDB-TOKEN', resp.access_token, resp.expires_in + 10);
			setCookie('CMDB-TOKEN-TYPE', resp.token_type, resp.expires_in + 10);
			setCookie('CMDB-USERNAME', _username, resp.expires_in + 10);
			window.location.href = '/cmdb/home.html';
		}).fail(function(resp){
			$('.error-message').text('帐号或密码不正确，请确认').show();
		});
	}
}

function setCookie( name, value, expires, path, domain, secure ) {
	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires ) {
		expires = expires * 1000;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	document.cookie = name+'='+escape( value ) +
  ( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + 
  ( ( path ) ? ';path=' + path : '' ) +
  ( ( domain ) ? ';domain=' + domain : '' ) +
  ( ( secure ) ? ';secure' : '' );
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjbWRiL2xvZ2luLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XG5cdHZhciBwbGFjZWhvbGRlcmZyaWVuZCA9IHtcblx0XHRmb2N1czogZnVuY3Rpb24ocykge1xuXHRcdFx0cyA9ICQocykuaGlkZSgpLnByZXYoKS5zaG93KCkuZm9jdXMoKTtcblx0XHRcdHZhciBpZFZhbHVlID0gcy5hdHRyKFwiaWRcIik7XG5cdFx0XHRpZiAoaWRWYWx1ZSkge1xuXHRcdFx0XHRzLmF0dHIoXCJpZFwiLCBpZFZhbHVlLnJlcGxhY2UoXCJwbGFjZWhvbGRlcmZyaWVuZFwiLCBcIlwiKSk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgY2xzVmFsdWUgPSBzLmF0dHIoXCJjbGFzc1wiKTtcblx0XHRcdGlmIChjbHNWYWx1ZSkge1xuXHRcdFx0XHRzLmF0dHIoXCJjbGFzc1wiLCBjbHNWYWx1ZS5yZXBsYWNlKFwicGxhY2Vob2xkZXJmcmllbmRcIiwgXCJcIikpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuICAvL+WIpOaWreaYr+WQpuaUr+aMgXBsYWNlaG9sZGVyXG4gIGZ1bmN0aW9uIGlzUGxhY2Vob2xlcigpIHtcbiAgXHR2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBcdHJldHVybiBcInBsYWNlaG9sZGVyXCIgaW4gaW5wdXQ7XG4gIH1cbiAgLy/kuI3mlK/mjIHnmoTku6PnoIFcbiAgaWYgKCFpc1BsYWNlaG9sZXIoKSkge1xuICBcdCQoZnVuY3Rpb24oKSB7XG4gIFx0XHR2YXIgZm9ybSA9ICQodGhpcyk7XG4gICAgICAvL+mBjeWOhuaJgOacieaWh+acrOahhu+8jOa3u+WKoHBsYWNlaG9sZGVy5qih5ouf5LqL5Lu2XG4gICAgICB2YXIgZWxlbWVudHMgPSBmb3JtLmZpbmQoXCJpbnB1dFt0eXBlPSd0ZXh0J11bcGxhY2Vob2xkZXJdXCIpO1xuICAgICAgZWxlbWVudHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIFx0dmFyIHMgPSAkKHRoaXMpO1xuICAgICAgXHR2YXIgcFZhbHVlID0gcy5hdHRyKFwicGxhY2Vob2xkZXJcIik7XG4gICAgICBcdHZhciBzVmFsdWUgPSBzLnZhbCgpO1xuICAgICAgXHRpZiAocFZhbHVlKSB7XG4gICAgICBcdFx0aWYgKHNWYWx1ZSA9PSAnJykge1xuICAgICAgXHRcdFx0cy52YWwocFZhbHVlKTtcbiAgICAgIFx0XHR9XG4gICAgICBcdH1cbiAgICAgIH0pO1xuICAgICAgZWxlbWVudHMuZm9jdXMoZnVuY3Rpb24oKSB7XG4gICAgICBcdHZhciBzID0gJCh0aGlzKTtcbiAgICAgIFx0dmFyIHBWYWx1ZSA9IHMuYXR0cihcInBsYWNlaG9sZGVyXCIpO1xuICAgICAgXHR2YXIgc1ZhbHVlID0gcy52YWwoKTtcbiAgICAgIFx0aWYgKHNWYWx1ZSAmJiBwVmFsdWUpIHtcbiAgICAgIFx0XHRpZiAoc1ZhbHVlID09IHBWYWx1ZSkge1xuICAgICAgXHRcdFx0cy52YWwoJycpO1xuICAgICAgXHRcdH1cbiAgICAgIFx0fVxuICAgICAgfSk7XG4gICAgICBlbGVtZW50cy5ibHVyKGZ1bmN0aW9uKCkge1xuICAgICAgXHR2YXIgcyA9ICQodGhpcyk7XG4gICAgICBcdHZhciBwVmFsdWUgPSBzLmF0dHIoXCJwbGFjZWhvbGRlclwiKTtcbiAgICAgIFx0dmFyIHNWYWx1ZSA9IHMudmFsKCk7XG4gICAgICBcdGlmICghc1ZhbHVlKSB7XG4gICAgICBcdFx0cy52YWwocFZhbHVlKTtcbiAgICAgIFx0fVxuICAgICAgfSk7XG4gICAgICAvL+mBjeWOhuaJgOacieWvhueggeahhu+8jOa3u+WKoHBsYWNlaG9sZGVy5qih5ouf5LqL5Lu2XG4gICAgICB2YXIgZWxlbWVudHNQYXNzID0gZm9ybS5maW5kKFwiaW5wdXRbdHlwZT0ncGFzc3dvcmQnXVtwbGFjZWhvbGRlcl1cIik7XG4gICAgICBlbGVtZW50c1Bhc3MuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICBcdHZhciBzID0gJCh0aGlzKTtcbiAgICAgIFx0dmFyIHBWYWx1ZSA9IHMuYXR0cihcInBsYWNlaG9sZGVyXCIpO1xuICAgICAgXHR2YXIgc1ZhbHVlID0gcy52YWwoKTtcbiAgICAgIFx0aWYgKHBWYWx1ZSkge1xuICAgICAgXHRcdGlmIChzVmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgIC8vRE9N5LiN5pSv5oyBdHlwZeeahOS/ruaUue+8jOmcgOimgeWkjeWItuWvhueggeahhuWxnuaAp++8jOeUn+aIkOaWsOeahERPTVxuICAgICAgICAgICAgdmFyIGh0bWwgPSB0aGlzLm91dGVySFRNTCB8fCBcIlwiO1xuICAgICAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZSgvXFxzKnR5cGU9KFsnXCJdKT9wYXNzd29yZFxcMS9naSwgXCIgdHlwZT10ZXh0IHBsYWNlaG9sZGVyZnJpZW5kXCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxzKig/OnZhbHVlfG9uW2Etel0rfG5hbWUpKD0oWydcIl0pP1xcUypcXDEpPy9naSwgXCIgXCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxzKnBsYWNlaG9sZGVyZnJpZW5kLywgXCIgcGxhY2Vob2xkZXJmcmllbmQgdmFsdWU9J1wiICsgcFZhbHVlXG4gICAgICAgICAgICBcdCsgXCInIFwiICsgXCJvbmZvY3VzPSdwbGFjZWhvbGRlcmZyaWVuZGZvY3VzKHRoaXMpOycgXCIpO1xuICAgICAgICAgICAgdmFyIGlkVmFsdWUgPSBzLmF0dHIoXCJpZFwiKTtcbiAgICAgICAgICAgIGlmIChpZFZhbHVlKSB7XG4gICAgICAgICAgICBcdHMuYXR0cihcImlkXCIsIGlkVmFsdWUgKyBcInBsYWNlaG9sZGVyZnJpZW5kXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNsc1ZhbHVlID0gcy5hdHRyKFwiY2xhc3NcIik7XG4gICAgICAgICAgICBpZiAoY2xzVmFsdWUpIHtcbiAgICAgICAgICAgIFx0cy5hdHRyKFwiY2xhc3NcIiwgY2xzVmFsdWUgKyBcInBsYWNlaG9sZGVyZnJpZW5kXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5oaWRlKCk7XG4gICAgICAgICAgICBzLmFmdGVyKGh0bWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlbGVtZW50c1Bhc3MuYmx1cihmdW5jdGlvbigpIHtcbiAgICAgIFx0dmFyIHMgPSAkKHRoaXMpO1xuICAgICAgXHR2YXIgc1ZhbHVlID0gcy52YWwoKTtcbiAgICAgIFx0aWYgKHNWYWx1ZSA9PSAnJykge1xuICAgICAgXHRcdHZhciBpZFZhbHVlID0gcy5hdHRyKFwiaWRcIik7XG4gICAgICBcdFx0aWYgKGlkVmFsdWUpIHtcbiAgICAgIFx0XHRcdHMuYXR0cihcImlkXCIsIGlkVmFsdWUgKyBcInBsYWNlaG9sZGVyZnJpZW5kXCIpO1xuICAgICAgXHRcdH1cbiAgICAgIFx0XHR2YXIgY2xzVmFsdWUgPSBzLmF0dHIoXCJjbGFzc1wiKTtcbiAgICAgIFx0XHRpZiAoY2xzVmFsdWUpIHtcbiAgICAgIFx0XHRcdHMuYXR0cihcImNsYXNzXCIsIGNsc1ZhbHVlICsgXCJwbGFjZWhvbGRlcmZyaWVuZFwiKTtcbiAgICAgIFx0XHR9XG4gICAgICBcdFx0cy5oaWRlKCkubmV4dCgpLnNob3coKTtcbiAgICAgIFx0fVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgd2luZG93LnBsYWNlaG9sZGVyZnJpZW5kZm9jdXMgPSBwbGFjZWhvbGRlcmZyaWVuZC5mb2N1cztcblxuICAkKCcuc3VibWl0LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gIFx0bG9naW4oKTtcbiAgfSk7XG5cbiAgJChkb2N1bWVudCkua2V5dXAoZnVuY3Rpb24oZXZlbnQpe1xuICBcdGlmKGV2ZW50LmtleUNvZGUgPT0xMyl7XG4gIFx0XHRsb2dpbigpO1xuICBcdH1cbiAgfSk7XG59KShqUXVlcnkpO1xuXG52YXIgRE9NQUlOID0ge1xuXHRDTURCIDogJydcbn07XG5pZiAod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignMTI3LjAuMC4xJykgPT0gNykge1xuXHRET01BSU5bJ0NNREInXSA9ICdodHRwOi8vY21kYi5hcGkuZGV2LndhbmRhLmNvbSc7XG59XG5cbmZ1bmN0aW9uIGxvZ2luKCl7XG5cdHZhciBfdXNlcm5hbWUgPSAkLnRyaW0oJCgnI3VzZXJuYW1lLWlucHV0JykudmFsKCkpO1xuXHR2YXIgX3Bhc3N3b3JkID0gJC50cmltKCQoJyNwYXNzd29yZC1pbnB1dCcpLnZhbCgpKTtcblxuXHRpZighX3VzZXJuYW1lKXtcblx0XHQkKCcuZXJyb3ItbWVzc2FnZScpLnRleHQoJ+W4kOWPt+S4jeiDveS4uuepuu+8jOivt+i+k+WFpScpLnNob3coKTtcblx0fWVsc2UgaWYoIV9wYXNzd29yZCl7XG5cdFx0JCgnLmVycm9yLW1lc3NhZ2UnKS50ZXh0KCflr4bnoIHkuI3og73kuLrnqbrvvIzor7fovpPlhaUnKS5zaG93KCk7XG5cdH1lbHNle1xuXHRcdCQoJy5lcnJvci1tZXNzYWdlJykudGV4dCgnJykuaGlkZSgpO1xuXG5cdFx0JC5hamF4KHtcblx0XHRcdHVybDogRE9NQUlOLkNNREIgKyAnL29hdXRoL3Rva2VuP2dyYW50X3R5cGU9cGFzc3dvcmQmdXNlcm5hbWU9Y21kYiZwYXNzd29yZD1jbWRiJyxcblx0XHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHRcdGRhdGFUeXBlOiBcImpzb25cIiwgXG5cdFx0XHR1c2VybmFtZTogX3VzZXJuYW1lLFxuXHRcdFx0cGFzc3dvcmQ6IF9wYXNzd29yZCxcblx0XHRcdHR5cGU6IFwiUE9TVFwiXG5cdFx0fSkudGhlbihmdW5jdGlvbiAocmVzcCkge1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcC5leHBpcmVzX2luICsgMTApO1xuXHRcdFx0c2V0Q29va2llKCdDTURCLVRPS0VOJywgcmVzcC5hY2Nlc3NfdG9rZW4sIHJlc3AuZXhwaXJlc19pbiArIDEwKTtcblx0XHRcdHNldENvb2tpZSgnQ01EQi1UT0tFTi1UWVBFJywgcmVzcC50b2tlbl90eXBlLCByZXNwLmV4cGlyZXNfaW4gKyAxMCk7XG5cdFx0XHRzZXRDb29raWUoJ0NNREItVVNFUk5BTUUnLCBfdXNlcm5hbWUsIHJlc3AuZXhwaXJlc19pbiArIDEwKTtcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9jbWRiL2hvbWUuaHRtbCc7XG5cdFx0fSkuZmFpbChmdW5jdGlvbihyZXNwKXtcblx0XHRcdCQoJy5lcnJvci1tZXNzYWdlJykudGV4dCgn5biQ5Y+35oiW5a+G56CB5LiN5q2j56Gu77yM6K+356Gu6K6kJykuc2hvdygpO1xuXHRcdH0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHNldENvb2tpZSggbmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlICkge1xuXHR2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXHR0b2RheS5zZXRUaW1lKCB0b2RheS5nZXRUaW1lKCkgKTtcblx0aWYgKCBleHBpcmVzICkge1xuXHRcdGV4cGlyZXMgPSBleHBpcmVzICogMTAwMDtcblx0fVxuXHR2YXIgZXhwaXJlc19kYXRlID0gbmV3IERhdGUoIHRvZGF5LmdldFRpbWUoKSArIChleHBpcmVzKSApO1xuXHRkb2N1bWVudC5jb29raWUgPSBuYW1lKyc9Jytlc2NhcGUoIHZhbHVlICkgK1xuICAoICggZXhwaXJlcyApID8gJztleHBpcmVzPScrZXhwaXJlc19kYXRlLnRvR01UU3RyaW5nKCkgOiAnJyApICsgXG4gICggKCBwYXRoICkgPyAnO3BhdGg9JyArIHBhdGggOiAnJyApICtcbiAgKCAoIGRvbWFpbiApID8gJztkb21haW49JyArIGRvbWFpbiA6ICcnICkgK1xuICAoICggc2VjdXJlICkgPyAnO3NlY3VyZScgOiAnJyApO1xufVxuIl0sImZpbGUiOiJjbWRiL2xvZ2luLmpzIn0=
