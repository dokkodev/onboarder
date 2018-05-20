/**
 * ezMark - A Simple Checkbox and Radio button Styling plugin. 
 * This plugin allows you to use a custom Image for Checkbox or Radio button. Its very simple, small and easy to use.
 * 
 * Copyright (c) Abdullah Rubiyath <http://www.itsalif.info/>.
 * Released under MIT License
 * 
 * Files with this plugin:
 * - jquery.ezmark.js
 * - ezmark.css
 * 
 * <usage>
 * At first, include both the css and js file at the top
 * 
 * Then, simply use: 
 * 	$('selector').ezMark([options]);
 *  
 * [options] accepts following JSON properties:
 *  checkboxCls - custom Checkbox Class
 *  checkedCls  - checkbox Checked State's Class
 *  radioCls    - custom radiobutton Class
 *  selectedCls - radiobutton's Selected State's Class
 *  
 * </usage>
 * 
 * View Documention/Demo here:
 * http://www.itsalif.info/content/ezmark-jquery-checkbox-radiobutton-plugin
 * 
 * @author Abdullah Rubiyath
 * @version 1.0
 * @date June 27, 2010
 */

(function($) {
  $.fn.ezMark = function(options) {
	options = options || {}; 
	var defaultOpt = { 
		checkboxCls   	: options.checkboxCls || 'ez-checkbox' , radioCls : options.radioCls || 'ez-radio' ,	
		checkedCls 		: options.checkedCls  || 'ez-checked'  , selectedCls : options.selectedCls || 'ez-selected' , 
		hideCls  	 	: 'ez-hide'
	};
    return this.each(function() {
    	var $this = $(this);
    	var wrapTag = $this.attr('type') == 'checkbox' ? '<div class="'+defaultOpt.checkboxCls+'">' : '<div class="'+defaultOpt.radioCls+'">';
    	// for checkbox
    	if( $this.attr('type') == 'checkbox') {
    		$this.addClass(defaultOpt.hideCls).wrap(wrapTag).change(function() {
    			if( $(this).is(':checked') ) { 
    				$(this).parent().addClass(defaultOpt.checkedCls); 
    			} 
    			else {	$(this).parent().removeClass(defaultOpt.checkedCls); 	}
    		});
    		
    		if( $this.is(':checked') ) {
				$this.parent().addClass(defaultOpt.checkedCls);    		
    		}
    	} 
    	else if( $this.attr('type') == 'radio') {

    		$this.addClass(defaultOpt.hideCls).wrap(wrapTag).change(function() {
    			// radio button may contain groups! - so check for group
   				$('input[name="'+$(this).attr('name')+'"]').each(function() {
   	    			if( $(this).is(':checked') ) { 
   	    				$(this).parent().addClass(defaultOpt.selectedCls); 
   	    			} else {
   	    				$(this).parent().removeClass(defaultOpt.selectedCls);     	    			
   	    			}
   				});
    		});
    		
    		if( $this.is(':checked') ) {
				$this.parent().addClass(defaultOpt.selectedCls);    		
    		}    		
    	}
    });
  }
})(jQuery);

/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) { 

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};



$(document).ready(function(){
	//그룹(신분) 체인지 셀렉트박스 값 지정
	//var $groupBox = $("#groupBox");
	//if($groupBox) $groupBox.val(groupPrincipalId);
	var firstTab = document.getElementById("firstTab");
	if(firstTab){
		//kaistMainTab(firstTab);
	}

	if ($('input[name="allMenuChk"]').length > 0) {
		
		$('input[name="allMenuChk"]').ezMark();
	}
	
	fn_workNotice();
	fn_trendKeyword();
	fn_visionCount();
	fn_pollCount();
});

//사용자 그룹변경(사용자 체인지)
function changeGroup(groupId){
	window.location = "/user/changeGroup.face?changeGrId=" + groupId + "&dummy=" + Math.round(Math.random()* (new Date().getTime()));
	//if(parent) parent.location.href = "/user/changeUser.face?changeGrId=" + groupId + "&dummy=" + Math.round(Math.random()* (new Date().getTime()));
	//else location.href = "/user/changeUser.face?changeGrId=" + groupId + "&dummy=" + Math.round(Math.random()* (new Date().getTime()));
}

//메인 탭공지 -  jquery visible IE 하위버전 호환성 이슈로 제거
function kaistMainTab(obj){
	var parentNodeId = obj.parentNode.id;
	var onNumber = parentNodeId.substr(1,parentNodeId.length);

	var mainUl = document.getElementById("mainUl");
	var childCount = mainUl.childNodes.length;
	var tabCount = 0;
	var locale = location.pathname;
	
	
	if ($("#isMyPage").val() == "true") {
		for(var i=0 ; i<childCount ; i++){
			if(mainUl.childNodes[i].nodeName == "LI") tabCount++;
		}
	
	    for (var i = 1 ; i < tabCount+1 ; i++){
			if(i == onNumber){
				document.getElementById('m'+i).className  = 'm1';
				document.getElementById('more'+i).style.display  = 'block';
			}else{
				document.getElementById('m'+i).className  = 'm2';
				document.getElementById('more'+i).style.display  = 'none';
			}
		}
	} else {
		var url = "";
		if (onNumber == 1) {
			if ($("#isMyPage").val() != null && $("#isMyPage").val() == "true") {
				url = "/portal";
			} else {
				url = "/portal/default/home/today.page";
			}
		} else if (onNumber == 2) {
			url = "/portal/default/home/notice.page";
		} else if (onNumber == 3) {
			url = "/portal/default/home/student.page";
		} else if (onNumber == 4) {
			url = "/portal/default/home/seminar.page";
		}
		location.href=url;
	}
}


//select
jQuery(function($){
	
	// Common
	var select_root = $('div.select');
	var select_value = $('.myValue');
	var select_a = $('div.select>ul>li>a');
	var select_input = $('div.select>ul>li>input[type=radio]');
	var select_label = $('div.select>ul>li>label');
	
	// Radio Default Value
	$('div.myValue').each(function(){
		var default_value = $(this).next('.iList').find('input[checked]').next('label').text();
		$(this).append(default_value);
	});
	
	// Line
	select_value.bind('focusin',function(){$(this).addClass('outLine');});
	select_value.bind('focusout',function(){$(this).removeClass('outLine');});
	select_input.bind('focusin',function(){$(this).parents('div.select').children('div.myValue').addClass('outLine');});
	select_input.bind('focusout',function(){$(this).parents('div.select').children('div.myValue').removeClass('outLine');});
	
	// Show
	function show_option(){
		$(this).parents('div.select:first').toggleClass('open');
	}
	
	// Hover
	function i_hover(){
		$(this).parents('ul:first').children('li').removeClass('hover');
		$(this).parents('li:first').toggleClass('hover');
	}
	
	// Hide
	function hide_option(){
		var t = $(this);
		setTimeout(function(){
			t.parents('div.select:first').removeClass('open');
		}, 1);
	}
	
	// Set Input
	function set_label(){
		var v = $(this).next('label').text();
		$(this).parents('ul:first').prev('.myValue').text('').append(v);
		$(this).parents('ul:first').prev('.myValue').addClass('selected');
	}
	
	// Set Anchor
	function set_anchor(){
		var v = $(this).text();
		$(this).parents('ul:first').prev('.myValue').text('').append(v);
		$(this).parents('ul:first').prev('.myValue').addClass('selected');
	}

	// Anchor Focus Out
	$('*:not("div.select a")').focus(function(){
		$('.aList').parent('.select').removeClass('open');
	});
	
	select_value.click(show_option);
	select_root.removeClass('open');
	select_root.mouseleave(function(event){ event.stopPropagation(); $(this).removeClass('open');});
	select_a.click(set_anchor).click(hide_option).focus(i_hover).hover(i_hover);
	select_input.change(set_label).focus(set_label);
	select_label.hover(i_hover).click(hide_option);
	
	// Form Reset
	$('input[type="reset"], button[type="reset"]').click(function(){
		$(this).parents('form:first').find('.myValue').each(function(){
			var origin = $(this).next('ul:first').find('li:first label').text();
			$(this).text(origin).removeClass('selected');
		});
	});
	
});

//main portNotice
jQuery(function($){
	var tab = $('.ptl_popup');
	tab.removeClass('js_off');
	tab.css('height', tab.find('>ul>li>div:visible').height());
	function onSelectTab(){
		var t = $(this);
		var myClass = t.parent('li').attr('class');
		t.parents('.ptl_popup:first').attr('class', 'ptl_popup '+myClass);
		tab.css('height', t.next('ul').height());
	}
	tab.find('>ul>li>a').click(onSelectTab).focus(onSelectTab);
});

//연결사이트 열기
function connectOpen() {
	$('#ptl_listA').toggle();
	
	if($("#ptl_listA").css("display") != "none") {
		conLoad(false);
	}
}

//바로가기 토글
function ptl_gopop() {
	if(document.getElementById('ptl_gopop').style.display=="none"||!document.getElementById('ptl_gopop').style.display)
		openptl_gopop();
	else
		closeptl_gopop();
}

// 바로가기 레이어팝업
function openptl_gopop(){
	$.ajax({
		url: "/link/quick/popUp.face",
		type:"POST",
		data:{
			__ajax_call__ : true
		}, 
		success: function(obj) {
			$("#popupQuickList").html('');
			
			var resultHtml = '';
			$(obj).find("info").find("link").each(function(index){
				if (index == 0 ) {
					resultHtml += "<ul>";
				} else if (index == 12) {
					resultHtml += "<ul>";
				}
				
				if($("#langKnd").val()=='ko') {
					if($(this).find('quickNShow').text()=='Y') {
						resultHtml += "<li><dt><a title='"+ $(this).find("tooltip").text() + "' href='#' onclick=\"openLink('Q', '" + $(this).find('linkNmKo').text() + "', '" + $(this).find('webUrlKo').text() + "', '" + $(this).find('target').text() + "')\">";
						resultHtml += $(this).find('linkNmKo').text() +  "</a></dt><dd class=\"tel\">"+ $(this).find("tooltip").text() + "</dd></li>";
					} else {
						resultHtml += "<li><dt>";
						resultHtml += $(this).find('linkNmKo').text() +  "<dt><dd>"+ $(this).find("tooltip").text() + "</dd></li>";
					}
				} else {
					if($(this).find('quickNShow').text()=='Y') {
						resultHtml += "<li><dt><a title='"+ $(this).find("rem").text() + "' href='#' onclick=\"openLink('Q', '" + $(this).find('linkNmEn').text() + "', '" + $(this).find('webUrlEn').text() + "', '" + $(this).find('target').text() + "')\">";
						resultHtml += $(this).find('linkNmEn').text() +  "</a></dt><dd class=\"tel\">"+ $(this).find("rem").text() + "</dd></li>";
					} else {
						resultHtml += "<li><dt>";
						resultHtml += $(this).find('linkNmEn').text() +  "</dt><dd>"+ $(this).find("rem").text() + "</dd></li>";
					}
				}
				
				if (index == 11 ) {
					resultHtml += "</ul>";
				} else if (this.length == index ) {
					resultHtml += "</ul>";
				}
			});
			$("#popupQuickList").html(resultHtml);
			$('#ptl_gopop').css('display', 'block');	
		}
	});
}

function closeptl_gopop(){
	$('#ptl_gopop').css('display', 'none');
}


// 연결사이트
function conLoad(reCache) {
	var now = new Date();  
	var pr = now.getSeconds();
	var linkiconPath = "/images/menu/";
	
	param = {
			dummy : pr
			, reCache : reCache
			, __ajax_call__ : true
	};

	$.ajax({
		url: "/link/con/conOpenlist.face",
		type:"POST",
		data:param,
		success: function(obj) {
			/*var resultHtml = '<ul class="list_all">';*/
			var resultHtml = '';
			
			var num=0;
			var remainder = 0;
			
			if($("#langKnd").val()=='ko') {
				resultHtml = '<div class="link_site"><ul><h3><span class="txt1">이용안내</span> 메뉴 앞에 있는 책갈피를 클릭하시면 <span class="txt">“주황색”</span>으로 활성화가 되고 북마크에 등록하실 수 있습니다.</h3>';
			} else {
				resultHtml = '<div class="link_site"><ul><h3><span class="txt1">Use guide</span> When you click a bookmark in front of the menu, you will be able to bookmark it enabled in the <span class=\"txt\">“orange color“</span>.</h3>';
			}
			
			$(obj).find("info").find("con").each(function(index){
				var childrenLength = $(this).children().length;
				
				if(index%3==0) {
					num = 0;
									
					if (remainder % 2 == 0) {
						resultHtml += '<li class="bg1">';
					} else {
						resultHtml += '<li class="bg2">';
					}
					
					remainder++;
 				}

				num = num + 1 ;
				
				if(num == 1) {
					if($("#langKnd").val()=='ko') {
						childrenLength  = childrenLength * 26;
					} else {
						childrenLength  = childrenLength * 32;
					}
					resultHtml += '<div class="list_all">'; 
					/*resultHtml += '<ul class="list_all">';*/
					resultHtml += "<ul><li class=\"chk\"><dl>";
				} else if(num==2) {
					/*resultHtml += '<ul class="list_all">';*/
					resultHtml += "<li class=\"chk\"><dl>";
				} else if(num==3) {
					/*resultHtml += '<ul class="list_all">';*/
					resultHtml += "<li class=\"chk\"><dl>";
				}
   
   
				if($("#langKnd").val()=='ko') {
					resultHtml += "<dt> " + $(this).find("cateNmKo").text() + " </dt>\n";
				} else {
					resultHtml += "<dt> " + $(this).find("cateNmEn").text() + " </dt>\n";
				}
				
				$(this).find("item").each(function(innerIndex) {
					var checked = "";
					
					if ($(this).find("fvId").text() != "") {
						checked = "checked=\"checked\"";
					}
   
					if($("#langKnd").val()=='ko') {
						resultHtml += "<dd>";
						resultHtml += "<input type=\"checkbox\" name=\"favChk\" id=\"" + $(this).find("linkId").text() + "\" " + checked + " favid=\"" + $(this).find("fvId").text() + "\" onclick=\"bookmarkforAjax('" + $(this).find("linkNmKo").text() + "', '" + $(this).find("webUrlKo").text() + "', '" + $(this).find("linkId").text() + "')\"><label for=\"" + $(this).find("linkId").text() + "\"><a href='#' onclick=\"openLink('L', '" +  $(this).find("linkNmKo").text() + "', '" + $(this).find("webUrlKo").text() + "', '" + $(this).find('target').text() + "')\">"  + $(this).find("linkNmKo").text() +  "</a></label>";
						resultHtml += "</dd>";
					} else {
						resultHtml += "<dd>";
						resultHtml += "<input type=\"checkbox\" name=\"favChk\" id=\"" + $(this).find("linkId").text() + "\" " + checked + " favid=\"" + $(this).find("fvId").text() + "\" onclick=\"bookmarkforAjax('" + $(this).find("linkNmEn").text() + "', '" + $(this).find("webUrlEn").text() + "', '" + $(this).find("linkId").text() + "')\"><label for=\"" + $(this).find("linkId").text() + "\"><a href='#' onclick=\"openLink('L', '" +  $(this).find("linkNmEn").text() + "', '" + $(this).find("webUrlEn").text() + "', '" + $(this).find('target').text() + "')\">"  + $(this).find("linkNmEn").text() +  "</a></label>";
						resultHtml += "</dd>";
					}
				});
				
				resultHtml += '</dl></li>';
				if(num==3) {	
					resultHtml += "</ul></div></li>\n";
				} 
				
			});
				
			if($("#langKnd").val()=='ko') {
				/*resultHtml += "<p><a href='/req/index.face' class='ptl_btn_mgra' style='position:absolute; bottom:0px; margin-left: 149px;'><span> 연결사이트 등록/신청 변경</span></a></p></div>\n";*/
			} else {
				/* resultHtml += "<p><a href='/req/index.face' class='ptl_btn_mgra' style='position:absolute; bottom:0px; margin-left: 65px;'><span> Linked Site Registration/Change Application </span></a></p></div>\n";*/
			}
			
			resultHtml += '</ul></div>';
			
			$("#ptl_listA").html(resultHtml);	
			
			/*$('.chk input').ezMark();*/
			$('input[name="favChk"]').ezMark();
			
	 	}
	});
}


function ChangeLayer(str) {
	var table_num = "2";//div 갯수지정
	for(i=1; i<=table_num; i++) {
		str1 = document.getElementById("tab0" + i );
		if(i == str){
			str1.style.display = "block";
		}
		else {
			str1.style.display = "none";
		}
	}
}

function fn_workNotice() {
	try {
		var once = $.cookie("workNotice");
		
		if (once != "1") {
			var html = "";
			$.ajax({
				url: "/main/work/listForAjax.face",
				type:"POST",
				data:{
					boardId : 'work_notice'
				},
				dataType:"json", 
				success: function(obj) {
					if (obj.length > 0) {
						$(obj).each(function (index) {
							if ($("#langKnd").val() == "ko") {
								html += "<li><span class=\"hd_notice\"><strong>작업공지알림</strong></span><a href=\"" + this.url + "\" target=\"_self\" class=\"ct_notice\">" + this.bltnSubj + "</a></li>";
							} else {
								html += "<li><span class=\"hd_notice\"><strong>Work Notice</strong></span><a href=\"" + this.url + "\" target=\"_self\" class=\"ct_notice\">" + this.bltnSubj + "</a></li>";
							}
						});
			      		
			      		if ($("#langKnd").val() == "ko") {
			      			html += "<a href=\"javascript:void(0);\" class=\"cl_notice1\" onclick=\"fn_workNoticeClose('true')\">오늘 하루 열지 않음</a>";
			      			html += "<a href=\"javascript:void(0);\" class=\"cl_notice2\"  onclick=\"fn_workNoticeClose('false')\" ><img src=\"/kaist/images/portal/ptl_main/btn_nclose.gif\" alt=\"닫기\"/>";
			      		} else {
			      			html += "<a href=\"javascript:void(0);\" class=\"cl_notice1\" onclick=\"fn_workNoticeClose('true')\">Do not open the today</a>";
			      			html += "<a href=\"javascript:void(0);\" class=\"cl_notice2\"  onclick=\"fn_workNoticeClose('false')\" ><img src=\"/kaist/images/portal/ptl_main/btn_nclose.gif\" alt=\"clsoe\"/>";
			      		}
						$("#lst_notice").html(html);
						
						if(obj.length > 2) {
							setInterval(function(){ em_notice () }, 3000);
						}
						$("#em_notice").slideDown();
					}
				},
				error : function () {
					//
				}
			});
		}
	} catch (e) {
		return;
	}
}

function em_notice(){
	$('#lst_notice li:first').slideUp( function () { $(this).appendTo($('#lst_notice')).slideDown(); });
}

function fn_workNoticeClose(once) {
	if (once == "true") {
		$.cookie("workNotice", "1",  {expires:1, path:'/'});
	}
	// 닫기
	$("#em_notice").slideUp();
}

function fn_showHotList() {
	fn_setHotList(false);
	$('#ptl_gopop2').css('display', 'table');
}

function fn_setHotList(reCache) {
	var langKnd = $("#langKnd").val();
	
	$.ajax({
		url: "/link/hot/mainHotListForAjax.face",
		type:"POST",
		data:{
			pType : "all"
			, reCache : reCache
			, __ajax_call__ : true
		}, 
		success: function(obj) {
			//<h2>이용안내</h2>
	    	//<h3>메뉴 앞에 있는 책갈피를 클릭하시면 <span class="txt">“주황색”</span>으로 활성화가 되고 나의즐겨찾기에 등록하실 수 있습니다.</h3>
			$("#hotList").html('');
			
			var resultHtml = '';
			
			if (langKnd == 'ko') {
				resultHtml += "<h2>이용안내</h2>";
				resultHtml += "<h3>메뉴 앞에 있는 책갈피를 클릭하시면 <span class=\"txt\">“주황색”</span>으로 활성화가 되고 북마크에 등록하실 수 있습니다.</h3>";
			} else {
				resultHtml += "<h2>Use guide</h2>";
				resultHtml += "<h3>When you click a bookmark in front of the menu, you will be able to bookmark it enabled in the <span class=\"txt2\">“orange color“</span>.</h3>";
			}
			
			$(obj).find("info").find("link").each(function(index){
				var checked = "";
				
				if (index == 0 ) {
					resultHtml += " <ul class=\"chk\">";
				} else if (index == 6) {
					resultHtml += " <ul class=\"chk\">";
				}
				
				if ($(this).find("fvId").text() != "") {
					checked = "checked=\"checked\"";
				}
				
				if($("#langKnd").val()=='ko') {
					resultHtml += "<li><input id=\"" + $(this).find("linkId").text() + "\" name=\"hotChk\" type=\"checkbox\" value=\"\" " + checked + " favid=\"" + $(this).find("fvId").text() + "\" onclick=\"bookmarkforAjax('" + $(this).find("linkNmKo").text() + "', '" + $(this).find("webUrlKo").text() + "', '" + $(this).find("linkId").text() + "')\"><a title='"+ $(this).find("tooltip").text() + "' href='#' onclick=\"openLink('Q', '" + $(this).find('linkNmKo').text() + "', '" + $(this).find('webUrlKo').text() + "', '" + $(this).find('target').text() + "')\">";
					resultHtml += $(this).find('linkNmKo').text() +  "</a></li>";
				} else {
					resultHtml += "<li><input id=\"" + $(this).find("linkId").text() + "\" name=\"hotChk\" type=\"checkbox\" value=\"\" " + checked + " favid=\"" + $(this).find("fvId").text() + "\" onclick=\"bookmarkforAjax('" + $(this).find("linkNmEn").text() + "', '" + $(this).find("webUrlEn").text() + "', '" + $(this).find("linkId").text() + "')\"><a title='"+ $(this).find("tooltip").text() + "' href='#' onclick=\"openLink('Q', '" + $(this).find('linkNmEn').text() + "', '" + $(this).find('webUrlEn').text() + "', '" + $(this).find('target').text() + "')\">";
					resultHtml += $(this).find('linkNmEn').text() +  "</a></li>";
				}
				
				if (index == 5 ) {
					resultHtml += "</ul>";
				} else if (this.length == index ) {
					resultHtml += "</ul>";
				}
			});
			$("#hotList").html(resultHtml);
			
			$('input[name="hotChk"]').ezMark();
		}
	});
}

function fn_closeHotList() {
	$('#ptl_gopop2').css('display', 'none');
}

function fn_showSiteMap() {
	var param = {
		pageNo : 0,
		fvType : "B",
		__ajax_call__ : true
	};
	$.ajax({
		url : "/mySetting/favorite/listForAjax.face"
		, type : "POST"
		, data : param
		, success : function (data) {
			$("input[name='allMenuChk']").removeClass("ez-checked");
			
			$(data).find("info").find("link").each( function(index) {
				// 북마크목록에서 동일한 linkId를 가질경우 체크처리
				// favId Attr에 favId를 추가시켜준다.
				var linkId = $(this).find('linkId').text();
				$("#" + linkId).attr("favId", $(this).find('fvId').text());
				$("#" + linkId).parent().addClass("ez-checked");
			});
		}
		, error : function () {
		}
	});
	$("#ptl_allmenu").toggle();
}

function fn_closeSiteMap() {
	$("#ptl_allmenu").hide();
}

function fn_mainTabAutoSelect(mainUrl) {
	var onNumber = 1;

	var mainUl = document.getElementById("mainUl");
	if (mainUl == null) {
		return;
	}
	var childCount = mainUl.childNodes.length;
	var tabCount = 0;
	
	if (mainUrl != null && mainUrl != "") {
		if (mainUrl.indexOf("seminar") > -1) {
			onNumber = 4;
		} else if (mainUrl.indexOf("student") > -1) {
			onNumber = 3;
		} else if (mainUrl.indexOf("notice") > -1) {
			onNumber = 2;
		} else {
			onNumber = 1;
		}
	}

	for(var i=0 ; i<childCount ; i++){
		if(mainUl.childNodes[i].nodeName == "LI") tabCount++;
	}

    for (var i = 1 ; i < tabCount+1 ; i++){
		if(i == onNumber){
			document.getElementById('m'+i).className  = 'm1';
			document.getElementById('more'+i).style.display  = 'block';
		}else{
			document.getElementById('m'+i).className  = 'm2';
			document.getElementById('more'+i).style.display  = 'none';
		}
	}
}


function fn_trendKeyword() {
	var searchUrl = "https://search.kaist.ac.kr/index.jsp?";
	var param = "langCD=" + $("#langKnd").val() + "&searchTarget=total&searchSubTarget=&searchTerm=";
	var text = "";
	
	$.ajax({ 
		url: "/main/trend/trendKeyword.face",
		type:"POST",
		dataType:"json",
		success: function(obj) {
			var html = "";
			$(obj).each(function (index) {
				text = encodeURIComponent(this);
				html += "<li>";
				html += "<a href=\"" + searchUrl + param + text + "\" target=\"_blank\" title=\"" + this + "\">";
				html += this;
				html += "</a>"
				html += "</li>";
			});
			
			$("#trendKey").append(html);
			var liWidth = 0;
			$("#trendKey > li").each(function (index) {
				liWidth += parseInt($(this).css("width"));
			});
			
			/*if (liWidth > parseInt($("#trendDiv").css("width"))) {
				setInterval(function(){ fn_trendKeyAnimation ('L') }, 3000);
			}*/
		}
	});
}

function fn_trendKeyAnimation(direction) {
	var width = 0;
	// animation
	if (direction == "R") {
		/*$('#trendKey li:last-child').prependTo('#trendKey');*/
		width = $('#trendKey li:last-child').width();
		$("#trendKey").animate({
            left: + width
        }, 400, function () {
        	$('#trendKey li:last-child').prependTo('#trendKey');
            $('#trendKey').css('left', '');
        });
	} else {
		width = $('#trendKey li:first-child').width();
		$("#trendKey").animate({
            left: - width
        }, 400, function () {
            $('#trendKey li:first-child').appendTo('#trendKey');
            $('#trendKey').css('left', '');
        });
	}
}

function fn_visionCount() {
	if( ! $("#visionCnt").length)  {
		return;
	}
	var url =  "https://board.kaist.ac.kr/kaist/bd/portalVisionBoard/countForJsonp.face";
	if( location.hostname!='portal.kaist.ac.kr') {
		url = "https://dboard.kaist.ac.kr/kaist/bd/portalVisionBoard/countForJsonp.face";
	}
	
	$.ajax({ 
		url: url,
		type:"POST",
		dataType:"jsonp",
		cache: false,
		crossDomain:true,
		xhrFields: {
			withCredentials: true
		},
		success: function(obj) {
			if (obj.STATUS == "SUCCESS") {
				$("#visionCnt").html(obj.DATA);
			}
		},
		error: function() {
			$("#visionCnt").html("N/A");
		}
	});
}

function fn_pollCount() {
	if( ! $("#visionCnt").length)  {
		return;
	}
	
	$.ajax({ 
		url: "/poll/countForAjax.do",
		type:"POST",
		dataType:"json",
		cache: false,
		success: function(obj) {
			if (obj.STATUS == "SUCCESS") {
				$("#pollCnt").html(obj.DATA);
			}
		},
		error: function() {
			$("#pollCnt").html("N/A");
		}
	});
}