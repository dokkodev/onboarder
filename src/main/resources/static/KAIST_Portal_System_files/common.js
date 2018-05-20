var enotice_roll

// 통합검색
function search() {
	var lengKnd = $("#langKnd").val();
	var hint = portalPage.getMessageResource('ev.info.message.search.noinput');
	var keyword = $("#main_sch").val();
	var urlKo = "https://search.kaist.ac.kr/index.jsp?langCD=ko&searchTerm=";
	//var urlKo = "/demo/search/search.html?searchTerm=";
	var urlEn = "https://search.kaist.ac.kr/index.jsp?langCD=en&searchTerm=";
	//var urlEn = "/demo/search/search.html?searchTerm=";

	if (keyword == hint) {
		if (lengKnd == 'ko') {
			window.open(urlKo);
		} else {
			window.open(urlEn);
		}
	} else {
		if (lengKnd == 'ko') {
			window.open(urlKo + encodeURIComponent($('#main_sch').val()));
		} else {
			window.open(urlEn + encodeURIComponent($('#main_sch').val()));
		}
	}
}

// 인기검색어
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
				/*<li class="tnb_li2"><a class="gray" href="#">학부 학사</a></li>*/
				text = encodeURIComponent(this);
				html += "<li class=\"tnb_li2\">";
				html += "<a href=\"" + searchUrl + param + text + "\" target=\"_blank\" title=\"" + this + "\" class=\"gray\">";
				html += this;
				html += "</a>"
				html += "</li>";
			});
			
			$("#trendKey").append(html);
		}
	});
}

// 긴급공지
function fn_notice() {
	var once = getCookie("enotice");
	
	if (once != "1") {
		var html = "";
		$.ajax({
			url: "/kaist/mm/mainNoticeAlert/listForAjax.face",
			type:"POST",
			data:{
				boardId : 'alert'
			},
			dataType:"json", 
			success: function(obj) {
				if (obj.STATUS == "SUCCESS") {
					$(obj.DATA).each(function (index) {
						
						if ($("#langKnd").val() == "ko") {
							html += "<li >";
							html += "	<div class=\"text_cut mn_enotice_div5\" >";
							html += "		<span class=\"orange\">[알림]</span>";
							html += "		<a href=\"" + this.url + "\" target=\"_self\" title=\"" + this.bltnSubj + "\">";
							html += "			<span class=\"mn_enotice_span1\">" + this.bltnSubj + "</span>";
							html += "		</a>";
							html += "	</div>";
							html += "</li>";
						} else {
							html += "<li >";
							html += "	<div class=\"text_cut mn_enotice_div5\" >";
							html += "	<span class=\"orange\">[Notice]</span>";
							html += "	<a href=\"" + this.url + "\" target=\"_self\" title=\"" + this.bltnSubj + "\">";
							html += "		<span class=\"mn_enotice_span1\">" + this.bltnSubj + "</span>";
							html += "	</a>";
							html += "	</div>";
							html += "</li>";
						}
					});
		      		html += $("#noticeData").html();
		      		$("#noticeData").html(html);
		      		
		      		$('#mn_enotice').slideDown();
		      		
		      		var e_listcnt=$('.mn_enotice_ul1').children('li').length;
					var loofcnt=1;
					var playcnt=1;
					var listnum=0;
					var list_height=$('.mn_enotice_ul1 > li > div').height();
					
					if(e_listcnt > 2){ //리스트가 2개이상이면 롤링 작동
						enotice_roll = setInterval(function() {
						var top_move=(list_height*playcnt+loofcnt)*-1; //ul태그가 top으로 이동하는 거리
						var top_list=(list_height*e_listcnt+1)*loofcnt; //li태그 위치 조정 
						$('.mn_enotice_ul1').animate({top:top_move},function(){
							$('.mn_enotice_ul1').children('li').eq(listnum).css('top',top_list); //애니메이션 끝내고 상단에 있는 li태그 제일 밑으로 이동
							playcnt++;
							if(playcnt%e_listcnt==1){
								loofcnt++;
							}
							if(listnum == e_listcnt-1){
								listnum=0;
							}else{
								listnum++;
							}
							
							});
						}, 3000);  //롤링 속도
					}
				}
			},
			error : function () {
				//
			}
		});
	}
}

function fn_noticeClose(flag) {
	if (flag == 1) {
		setCookie("enotice","1",1);
	}
	$('#mn_enotice').slideUp();
//	$('#mnallmenu').css('top',$('#header').css('height'));
	clearInterval(enotice_roll);
}

// 로그를 남기며 해당 링크를 처리함.
function openLink(linkType, linkName, linkUrl, target) {
	addLinkLog(linkType, linkName, linkUrl);
	if (linkUrl.indexOf('/') == 0) {
	} else if (linkUrl.indexOf('http') != 0) {
		linkUrl = 'http://' + linkUrl;
	}
	target = target.replace(/\./gi, '_');
	window.open(linkUrl, target);
}

// 로그 기록
function addLinkLog(linkType, linkName, linkUrl) {
	var param = "linkType=" + encodeURIComponent(linkType) + "&linkName="
			+ encodeURIComponent(linkName) + "&linkUrl="
			+ encodeURIComponent(linkUrl);
	$.ajax({
		url : "/kaist/sm/linkLog/addForAjax.face",
		type : "POST",
		data : param,
		success : function(data) {
			// alert( data);
		}
	});
}

//사용자 그룹변경(사용자 체인지)
function changeGroup(groupId){
	window.location = "/user/changeGroup.face?changeGrId=" + groupId + "&dummy=" + Math.round(Math.random()* (new Date().getTime()));
	//if(parent) parent.location.href = "/user/changeUser.face?changeGrId=" + groupId + "&dummy=" + Math.round(Math.random()* (new Date().getTime()));
	//else location.href = "/user/changeUser.face?changeGrId=" + groupId + "&dummy=" + Math.round(Math.random()* (new Date().getTime()));
}

function fn_print(printId) {
	if (printId == null || printId == undefined) {
		printId = "print";
	}
	
	var printOpt = {
			mode : "popup"
			, retainAttr : ["id", "class", "style"]
			, popHt : 625
			, popWd : 780
			, popTitle : "PRINT" 
			, popClose : true
			, extraHead : document.domain == "kaist.ac.kr" ? "<script>document.domain=\"kaist.ac.kr\"<\/script>":"" 
	};
	// 인쇄시 무시할 내용은 hide 처리후 다시 show
	$(".ignorePrint").hide();
	// 인쇄시 숨겨져 있지만 출력해야할 경우 show 후 hide
	$(".printWrap").show();
	$("#" + printId).printArea(printOpt);
	$(".printWrap").hide();
	$(".ignorePrint").show();
}

// iframe을 사용하는 경우 자동 Resize
function resizeIframeBoard() {
	// iframe을 사용하는 경우 자동 Reize
	if (parent.window != null && parent.window != "undefined") {
		// 통합게시판에 iframe으로 추가된경우
		if (parent.autoresize_iframe_portlets != null && parent.autoresize_iframe_portlets != "undefined") {
			parent.autoresize_iframe_portlets();
		}
		// 연계게시판에 iframe으로 추가된경우
		if (parent.autoResize != null && parent.autoResize != "undefined") {
			parent.autoResize();
		}
	}
}
