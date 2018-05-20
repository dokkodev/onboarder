var portal_ssoSetting_url = "https://iam.kaist.ac.kr/iamps/commonLink.do?MenuListFlag=9010000&locale=ko&site=portal";
var portal_apiDoc_url = "https://portal.kaist.ac.kr/docs/";
var getOrgPerson_url = "/orgChart/getPersonXml.face";

// 팝업
function windowOpen(val, width, height, ViewType) {
	var url = "";
	var popOption = "";
	if (ViewType == 'P') {
		popOption = "width=" + width + ", height=" + height
				+ ", resizable=no, scrollbars=yes, status=no;";
	} else {
		popOption = "";
	}

	if (val == "apiDoc") {
		url = portal_apiDoc_url;
	} else if (val == "ssoSetting") {
		url = portal_ssoSetting_url;
	}

	window.open(url, "", popOption);
}
// 검색
function fastSearch(type) {
	if ($("#ptl_searchForm2").val().split(" ").join("") == "") {
		var msg = portalPage.getMessageResource('ev.info.message.search.noinput');
		alert(msg);
		return;
	}
	if ($("#ptl_searchForm2").val().length < 2) {
		if ($("#langKnd").val() == 'ko') {
			alert("최소 2글자 이상 입력하여야 합니다.");
		} else {
			alert("Two or more characters are required.");
		}
		return;
	}
	
	if (type == 'person') {
		var url = "/personSearch/personSearch.face";
		
		window.open('', 'personSearch','width=765,height=900,scrollbars=1,resizable=1');
		
		$('#ptlSearchForm2H').val($("#ptl_searchForm2").val());
		$('#findForm').attr("action", url);
		$('#findForm').attr("target", "personSearch");
		$('#findForm').submit();
		
		return;
	} else if (type == 'book') {
		var langKnd = $("#langKnd").val();
		var url = "https://search.kaist.ac.kr/index.jsp?langCD=" + langKnd
					+ "&searchTerm="
					+ encodeURIComponent($('#ptl_searchForm2').val())
					+ "&searchTarget=library&searchSubTarget=book";
		var val = "";
		window.open(url, val);
		
		return;
	}
}

function keyupEvent() {
	$("#ptlSearchForm2H").val($("#ptl_searchForm2").val());
	if (event.keyCode == 13) {
		fastSearch('person');
	}
}

// 개인정보 영역 조회
function countUpdates() {
	$("#refresh_Btn").hide();
	setTimeout("refresh_Btn_Show()", 10000);

	if (!$('#email_Url').hasClass('noPermission'))
		emailCountUpdate();
	if (!$('#wf_Url').hasClass('noPermission'))
		wfCountUpdate();
	if (!$('#erp_Url').hasClass('noPermission'))
		erpCountUpdate();
	if (!$('#lib_Url').hasClass('noPermission'))
		libCountUpdate();
	if (!$('#urs_Url').hasClass('noPermission'))
		ursCountUpdate();
	reqCountUpdate();
	// 비전보드
	try {
		fn_visionCount();
	} catch (e) {
	}
	// 설문
	try {
		fn_pollCount();
	} catch (e) {
		
	}
}

// 이메일
function emailCountUpdate() {
	$.ajax({
		url : "/personArea/countUpdate.face",
		type : "POST",
		timeout : 4000,
		data : "reqType=EMA", // REQ_TYPE
		dataType : "json",
		success : function(data) {
			$("#email_Url").text(data.result);
			/*$(".emailUrl").attr("href", data.webUrl);*/
		},
		error : function(data) {
			$("#email_Url").text(data.result);
		}
	});
}

// 전자문서
function wfCountUpdate() {
	$.ajax({
		url : "/personArea/countUpdate.face",
		type : "POST",
		timeout : 4000,
		data : "reqType=WF", // REQ_TYPE
		dataType : "json",
		success : function(json) {
			$("#wf_Url").text(json.result);
			/*$(".workFlowUrl").attr("href", json.webUrl);*/
		},
		error : function(json) {
			$("#wf_Url").text(json.result);
		}
	});
}

// ERP
function erpCountUpdate() {
	$.ajax({
		url : "/personArea/countUpdate.face",
		type : "POST",
		timeout : 4000,
		data : "reqType=ERP", // REQ_TYPE
		dataType : "json",
		success : function(data) {
			$("#erp_Url").text(data.result);
//			$(".erpUrl").attr("href", data.webUrl);
		}, error : function(data) {
			$("#erp_Url").text(data.result);
		}
	});
}

// 도서관
function libCountUpdate() {
	$.ajax({
		url : "/personArea/countUpdate.face",
		type : "POST",
		timeout : 4000,
		data : "reqType=LIB", // REQ_TYPE
		dataType : "json",
		success : function(data) {
			$("#lib_Url").text(data.result);
			/*$(".libUrl").attr("href", data.webUrl);*/
		},
		error : function(data) {
			$("#lib_Url").text(data.result);
		}
	});
}

// 문의/신청
function reqCountUpdate() {
	$.ajax({
		url : "/personArea/countUpdate.face",
		type : "POST",
		timeout : 4000,
		data : "reqType=REQ",
		dataType : "json",
		success : function(data) {
			$("#req_Url").text(data.result);
			/*$(".reqUrl").attr("href", data.webUrl);*/
		},
		error : function(data) {
			$("#req_Url").text(data.result);
		}
	});
}

//문의/신청
function ursCountUpdate() {
	$.ajax({
		url : "/personArea/countUpdate.face",
		type : "POST",
		timeout : 4000,
		data : "reqType=URS",
		dataType : "json",
		success : function(data) {
			$("#urs_Url").text(data.result);
			/*$(".reqUrl").attr("href", data.webUrl);*/
		},
		error : function(data) {
			$("#urs_Url").text(data.result);
		}
	});
}

// 보안설정_securityConf
function securityUpdate() {
	var phdnFlg_data = $("#phdnFlg_data").val();
	var ghdnFlg_data = $("#ghdnFlg_data").val();
	var param = "phdnFlg=" + phdnFlg_data + "&ghdnFlg=" + ghdnFlg_data;

	$.ajax({
		url : "/mySetting/security/updateForAjax.face",
		type : "POST",
		data : param,
		success : function(data) {
			var msg = portalPage.getMessageResource('ev.info.message.mysetting.save');
//			alert(msg);
		}
	});
}

function toggleBtn(flg, one, two, data_input) {
	if (flg == "Y") {
		$("#" + data_input).val('Y');
		$("#" + one).removeClass("ptl_off").addClass("ptl_on");
		$("#" + two).removeClass("ptl_on").addClass("ptl_off");
	} else {
		$("#" + data_input).val('N');
		$("#" + two).removeClass("ptl_on").addClass("ptl_off");
		$("#" + one).removeClass("ptl_off").addClass("ptl_on");
	}
}

function refresh_Btn_Show() {
	$("#refresh_Btn").show();
}

// 메인바로가기 설정오더링
function find() {
	var param = "userQuickOrd=" + "/";
	$('#sortable li input').each(function(i) {
		param += $(this).val() + "/";
	});
	$.ajax({
		url : "/link/quick/orderUpdate.face",
		type : "POST",
		data : param,
		success : function(data) {
			var msg = portalPage
					.getMessageResource('ev.info.message.mysetting.save');
			alert(msg);
		}
	});
}

// 포탈안내
function homeHelp() {
	parent.location.href('/');
}
function reloadHelp(url) {
	parent.location.href(url);
}
function helpDown(url) {
	window
			.open(url, '',
					'left=20,top=20,width=900,height=1000,toolbar=0,resizable=0,scrollbars=1,');
}

// myFav
function favAddforAjax() {
	var favoriteNm = $("#favoriteNm").val();
	var favoriteUrl = $("#favoriteUrl").val();

	if (favoriteNm == "" && favoriteUrl == "" || favoriteNm == ""
			|| favoriteUrl == "") {
		var msg = portalPage
				.getMessageResource('ev.info.message.mysetting.notvalue');
		alert(msg);
		return;
	}

	/* var param = "fvNm=" + favoriteNm + "&fvUrl=" + favoriteUrl; */
	var param = {
		fvNm : favoriteNm,
		fvUrl : favoriteUrl,
		fvType : "F",
		__ajax_call__ : true
	}
	$.ajax({
		url : "/mySetting/favorite/addForAjax.face",
		type : "POST",
		data : param,
		success : function(data) {
			$("#favoriteNm").val('');
			$("#favoriteUrl").val('');

			window.location.reload();
		}
	});
}

// myFav
function bookmarkforAjax(nm, url, linkId) {
	var fvId = $("#" + linkId).attr("favid");

	if ($("#" + linkId).attr("checked") != "" && (fvId != "" || fvId == null)) {
		var param = {
			fvId : fvId,
			fvType : "B",
			__ajax_call__ : true
		}

		$.ajax({
			url : "/mySetting/favorite/removeForAjax.face",
			type : "POST",
			data : param,
			success : function(data) {
				initLinkMenu('B');
				conLoad("true");
				fn_setHotList("true");
			}
		});
	} else {
		var param = {
			fvNm : nm,
			fvUrl : url,
			linkId : linkId,
			fvType : "B",
			__ajax_call__ : true
		}

		$.ajax({
			url : "/mySetting/favorite/addForAjax.face",
			type : "POST",
			data : param,
			success : function(data) {
				initLinkMenu('B');
				conLoad("true");
				fn_setHotList("true");
			}
		});
	}
}

// myFav checkNumber
function checkNumber() {
	var objEv = event.srcElement;
	var numPattern = /([^0-9])/;
	var numPattern = objEv.value.match(numPattern);
	if (numPattern != null) {
		var msg = portalPage
				.getMessageResource('ev.info.message.mysetting.checknum');
		alert(msg);
		objEv.value = "";
		objEv.focus();
		return false;
	}
}

// myFav
function favRemoveForAjax(obj, type) {
	if (type == null || type == "") {
		type = "F";
	}

	var msg = portalPage.getMessageResource('ev.info.message.mysetting.del');
	var ret = confirm(msg);
	if (ret) {
		var favoriteId = obj;
		var favoriteUrl = $("#favoriteUrl").val();
		/* var param = "fvId=" + favoriteId; */
		var param = {
			fvId : favoriteId,
			fvType : type,
			__ajax_call__ : true
		};

		$.ajax({
			url : "/mySetting/favorite/removeForAjax.face",
			type : "POST",
			data : param,
			success : function(data) {
				conLoad("true");
				window.location.reload();
			}
		});
	}
}

// myFav
function favUpdateForAjax(type) {
	var fav_cnt = parseInt($("#fav_cnt").val());
	var fav_sortOrder = ",";
	var fav_id = ",";
	var fav_nm = ",";
	var fav_url = ",";

	if (type == null || type == "") {
		type = "F";
	}

	for ( var i = 0; i < fav_cnt; i++) {
		fav_sortOrder += document.getElementById('LinkManager[' + i	+ '].sortOrder').value	+ ",";
		fav_id += document.getElementById('LinkManager[' + i + '].fvId').value + ",";
		if( type=='F') {
			fav_nm += document.getElementById('LinkManager[' + i + '].fvNm').value + ",";
			fav_url += document.getElementById('LinkManager[' + i + '].fvUrl').value +  ",";
		}
	}

	param = {
		fvUpdSort : fav_sortOrder,
		fvUpdId : fav_id,
		fvUpdNm : fav_nm,
		fvUpdUrl : fav_url,
		fvType : type,
		__ajax_call__ : true
	};
	

	$.ajax({
		url : "/mySetting/favorite/updateForAjax.face",
		type : "POST",
		data : param,
		success : function(data) {
			var msg = portalPage.getMessageResource('ev.info.message.mysetting.save');
			alert(msg);
			window.location.reload();
		}
	});
}

// quickEditorInit
function quickEditorInit() {
	var msg = portalPage.getMessageResource('ev.info.message.mysetting.init');
	if (!confirm(msg))
		return;

	$.ajax({
		url : "/mySetting/quickEdir/quickEditorInit.face",
		type : "POST",
		success : function(data) {
			window.location.reload();
		}
	});
}


// 이미지 없을시 처리
function imageError(element, linkType) {
	element.onerror = '';
	if (linkType != null) {
		if (linkType == 'Q') {
			element.src = '/kaist/images/portal/noImg/noImgQ.png';
		} else if (linkType == 'H') {
			element.src = '/kaist/images/portal/noImg/noImgH.png';
		} else if (linkType == 'C') {
			element.src = '/kaist/images/portal/noImg/noImgC.png';
		}
	} else {
		element.src = '/kaist/images/portal/noImg/noImg.png';
	}
}
function initLinkMenu(linkType) { 
	pageLinkMenu(linkType, 1)
}

function getLinkPagingHtml( linkType, pageNo, totalPages ) {
	numHtml = "";
	if( pageNo==1) {
		numHtml += "<a href='javascript:' class='ptl_parv'><img src='/kaist/images/portal/ptl_main/btn_parv.gif' alt='이전' /></a>";
	} else {
		numHtml += "<a href=\"javascript:pageLinkMenu('" + linkType + "', " + (pageNo-1) + " );\" class='ptl_parv'><img src='/kaist/images/portal/ptl_main/btn_parv.gif' alt='이전' /></a>";
		
	}
	numHtml += "<label id='preText_" + linkType + "'>"	+ pageNo + "</label>/";
	numHtml += "<label id='nextText_" + linkType + "'>"+ totalPages + "</label>";
	numHtml += "<input type='hidden' id='pre_" + linkType + "' value='" + pageNo + "'/>";
	numHtml += "<input type='hidden' id='next_"+ linkType + "' value='"+ totalPages + "'/>";
	
	if( pageNo>=totalPages) {
		numHtml += "<a href=\"javascript:;\" class='ptl_next'><img src='/kaist/images/portal/ptl_main/btn_next.gif' alt='다음' /></a>";
	} else {
		numHtml += "<a href=\"javascript:pageLinkMenu('" + linkType + "', " + (pageNo+1) + ");\" class='ptl_next'><img src='/kaist/images/portal/ptl_main/btn_next.gif' alt='다음' /></a>";
	}
	return numHtml;
}

// MenuAjax(메인화면로 들어왔을때 ajax호출 hot, quick, fav)
function pageLinkMenu(linkType, pageNo) {
	
	if( pageNo==null) {
		pageNo = 1;
	}
	var linkiconPath = "/images/menu/";

	if (linkType == 'Q') {
		/* var param = "currentPage=" + 1; */
		var param = {
			currentPage : pageNo,
			pageSize : 12,
			__ajax_call__ : true
		}
		$.ajax({
			url : "/link/quick/mainQucikListForAjax.face",
			type : "POST",
			data : param,
			success : function(obj) {
				var len = $(obj).find("info").find("link").length;
				if (len == 0) {
					var ret = portalPage.getMessageResource('ev.info.message.quicklink.empty');
					$("#info_Q").html("<br><br><br>" + ret);
					return;
				}
				$("#ptl_Qot_info").html('');
				var resultHtml = '';
				var numHtml = '';
				var invalidIpMessage = portalPage.getMessageResource('ev.info.message.quicklink.invalid.ip');
				if( invalidIpMessage==null) {
					invalidIpMessage = 'Invalid ip address';
				}
				$(obj).find("info").find("link").each( function( index ) {
					// 한글
					if ( $("#langKnd").val() == 'ko' ) {
						if ( $(this).find('quickNShow').text() == 'Y' ) {
							resultHtml += "<li>"; 
							resultHtml += "<a href='#' onclick=\"openLink('Q', '" + $(this).find('linkNmKo').text() + "', '" + $(this).find('webUrlKo').text() + "', '" + $(this).find('target').text() + "')\"";
							resultHtml += "style='text-decoration: none;  text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' title='" + $(this).find("tooltip").text() + "' >";
							resultHtml += $(this).find('linkNmKo').text() + "</a></li>";
						} else if ( $(this).find('quickNShow').text() == 'X' ) {
							resultHtml += "<li>"; 
							resultHtml += "<a href='#' onclick=\"alert('" + invalidIpMessage + "')\"";
//							resultHtml += "<li><a title='" + $(this).find("tooltip").text() + "' ";
							resultHtml += "style='text-decoration: none; color: #707070;text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' title='" + invalidIpMessage + "' >";
							resultHtml += $(this).find('linkNmKo').text() + "</a></li>";
						} else {
							 // TODO <<< IAM 권한 추가 완료시 삭제 >>> KARA, AUDIT 만 권한체크 삭제
						   if ($(this).find('webUrlKo').text().indexOf("https://karasso.") > -1 || $(this).find('webUrlKo').text().indexOf("https://auditsys.") > -1) {
							   resultHtml += "<li>"; 
								resultHtml += "<a href='#' onclick=\"openLink('Q', '" + $(this).find('linkNmKo').text() + "', '" + $(this).find('webUrlKo').text() + "', '" + $(this).find('target').text() + "')\"";
								resultHtml += "style='text-decoration: none;  text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' title='" + $(this).find("tooltip").text() + "' >";
								resultHtml += $(this).find('linkNmKo').text() + "</a></li>";
						   } else {
							   resultHtml += "<li><a title='" + $(this).find("tooltip").text() + "' ";
								resultHtml += "href='#' style='text-decoration: none; color: #c0c0c0; text-overflow:ellipsis; overflow:hidden; display: block; white-space: nowrap;cursor:default;'>";
								resultHtml += $(this).find('linkNmKo').text() + "</a></li>";   
						   }
						}
					} else {
						if ($(this).find('quickNShow').text() == 'Y') {
							resultHtml += "<li><a href='#' onclick=\"openLink('Q', '" + $(this).find('linkNmEn').text() + "', '" + $(this).find('webUrlEn').text() + "', '" + $(this).find('target').text() + "')\"";
							resultHtml += "style='text-decoration: none; text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' title='"	+ $(this).find("rem").text() + "' >";
							resultHtml += $(this).find('linkNmEn').text() + "</a></li>";
						} else if ( $(this).find('quickNShow').text() == 'X' ) {
							resultHtml += "<li>"; 
							resultHtml += "<a href='#' onclick=\"alert('" + invalidIpMessage + "')\"";
							resultHtml += "style='text-decoration: none; text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' title='"	+ invalidIpMessage + "' >";
							resultHtml += $(this).find('linkNmEn').text() + "</a></li>";
						} else {
							 // TODO <<< IAM 권한 추가 완료시 삭제 >>> KARA, AUDIT 만 권한체크 삭제
							 if ($(this).find('webUrlEn').text().indexOf("https://karasso.") > -1 || $(this).find('webUrlEn').text().indexOf("https://auditsys.") > -1) {
								 resultHtml += "<li><a href='#' onclick=\"openLink('Q', '" + $(this).find('linkNmEn').text() + "', '" + $(this).find('webUrlEn').text() + "', '" + $(this).find('target').text() + "')\"";
									resultHtml += "style='text-decoration: none; text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' title='"	+ $(this).find("rem").text() + "' >";
									resultHtml += $(this).find('linkNmEn').text() + "</a></li>";
							   } else {
								   resultHtml += "<li><a title='" + $(this).find("rem").text()	+ "'href='#' style='text-decoration: none; color: #c0c0c0; text-overflow:ellipsis; overflow:hidden; display: block; white-space: nowrap;cursor:default;'>";
									resultHtml += $(this).find('linkNmEn').text() + "</a></li>";
							   }
							
						}
					}
					// 마지막일 경우(1/2 페이지 표시)
					if (len - 1 == index) {
						var totalPages = parseInt($(this).find("CurrentEndPage").text());
						numHtml = getLinkPagingHtml( linkType, pageNo, totalPages);
					}
				});
				$("#info_Q").html(resultHtml);
				$("#num_Q").html(numHtml);
			}
		});
	} else if (linkType == 'H') {
		var param = "currentPage=" + pageNo;
		$.ajax({
			url : "/link/hot/mainHotListForAjax.face",
			type : "POST",
			data : param,
			success : function(obj) {
				$("#ptl_hot_info").html('');
				var resultHtml = '';
				var numHtml = '';
				var len = $(obj).find("info").find("link").length;
				if (len == 0) {
					var ret = portalPage.getMessageResource('ev.info.message.hotlink.empty');
					$("#info_H").html("<br><br><br><center>" + ret + "</center>");
					return;
				}
				$(obj).find("info").find("link").each( function(index) {
					if ($("#langKnd").val() == 'ko') {
						resultHtml += "<li><a style='text-decoration: none; text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' href='#' onclick=\"openLink('H', '"
							+ $(this).find('linkNmKo').text() + "', '" + $(this).find('webUrlKo').text() + "', '" + $(this).find('target').text() + "')\"" 
							+ "style='text-decoration: none; text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' title='" + $(this).find("tooltip").text() + "' >";
						resultHtml += $(this).find('linkNmKo').text() + "</a></li>";
					} else {
						resultHtml += "<li><a style='text-decoration: none; text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' href='#' onclick=\"openLink('H', '"
							+ $(this).find('linkNmEn').text()+ "', '"+ $(this).find('webUrlEn').text()+ "', '"+ $(this).find('target').text() + "')\"" 
							+ "style='text-decoration: none; text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' title='"+ $(this).find(	"tooltip").text() + "' >";
						resultHtml += $(this).find('linkNmEn').text() + "</a></li>";
					}
					// 마지막일 경우(1/2 페이지 표시)
					if (len - 1 == index) {
						var totalPages = parseInt($(this).find("CurrentEndPage").text());
						numHtml = getLinkPagingHtml( linkType, pageNo, totalPages);
					}
				});
				$("#info_H").html(resultHtml);
				$("#num_H").html(numHtml);
			}
		});
	} else if (linkType == 'F') {
		/* var param = "currentPage=" + 1; */
		var param = {
			pageNo : pageNo,
			pageSize : 6,
			fvType : "F",
			__ajax_call__ : true
		};
		$.ajax({
			url : "/mySetting/favorite/listForAjax.face",
			type : "POST",
			data : param,
			success : function(obj) {
				$("#ptl_Fot_info").html('');

				var resultHtml = '';
				var numHtml = '';
				var len = $(obj).find("info").find("link").length;
				if (len == 0) {
					var noListMsg = portalPage
							.getMessageResource('ev.info.message.fav.empty');
					$("#info_F").html("<br><br>" + noListMsg);
					return;
				}
				$(obj).find("info").find("link").each( function(index) {
					resultHtml += "<li><a style='text-decoration: none; text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' href=\"javascript:openLink('F', '"
							+ $(this).find('linkNmKo').text() + "', '" + $(this).find('webUrlKo').text() + "', '" + $(this).find('target').text() + "')\"" 
							+ " style='text-decoration: none; text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' title='" + $(this).find("tooltip").text() + "' >";
					resultHtml += $(this).find(	'linkNmKo').text()+ "</a></li>";
					if (len - 1 == index) {
						var totalPages = parseInt($(this).find("totalPages").text());
						numHtml = getLinkPagingHtml( linkType, pageNo, totalPages);
					}
				});
				$("#info_F").html(resultHtml);
				$("#num_F").html(numHtml);
			}
		});
	} else if (linkType == 'B') {
		var param = {
			pageNo : pageNo,
			pageSize : 6,
			fvType : "B",
			__ajax_call__ : true
		};
		
		$.ajax({
			url : "/mySetting/favorite/listForAjax.face",
			type : "POST",
			data : param,
			dataType:"xml",
			success : function(obj) {
				$("#ptl_Bot_info").html('');

				var resultHtml = '';
				var numHtml = '';
				var len = $(obj).find("info").find("link").length;
				if (len == null || len == 0) {
					var noListMsg = portalPage.getMessageResource('ev.info.message.book.empty');
					$("#info_B").html("<br><br>" + noListMsg);
					$("#num_B").html(numHtml);
					return;
				}
				
				var target = "_blank";
				$(obj).find("info").find("link").each( function(index) {
					if (($(this).find('webUrlKo').text()).indexOf("/portal/default") > -1) {
						target = "_self";
					} else {
						target = "_blank";
					}
					
					resultHtml += "<li><a style='text-decoration: none; text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' href=\"javascript:openLink('B', '" + $(this).find('linkNmKo').text() + "', '" + $(this).find('webUrlKo').text() + "', '" + target + "')\" style='text-decoration: none; text-overflow: ellipsis;  display: block; overflow: hidden; white-space: nowrap;' title='" + $(this).find("tooltip").text() + "' >";
					resultHtml += $(this).find('linkNmKo').text() + "</a></li>";
					
					if (len - 1 == index) {
						var totalPages = parseInt($(this).find("totalPages").text());
						numHtml = getLinkPagingHtml( linkType, pageNo, totalPages);
					}
				});
				$("#info_B").html(resultHtml);
				$("#num_B").html(numHtml);
			},
			error : function (jqXHR, textStatus, errorThrown ) {
				//alert(errorThrown);
			}
		});
	}
}
// 페이징 엔보드에서 가져와서 커스터마이징 - gjrjf
function paging(pageNum, total, size, method, pageCount) { // 현재페이지, 토탈 카운트,
															// 한페이지에 보이는 로우 수,
															// 써치 메소드, 하단 페이지
															// 카운트 갯수
	var currentPage = Number(pageNum);
	var totalCount = Number(total);
	var totalPage = Math.ceil(totalCount / size);
	var setSize = Number(size);
	var setPageSize = Number(pageCount); // 하단에 보이는 페이지숫자 갯수
	var startPage;
	var endPage;
	var cursor;
	var curList = "";
	var prevSet = "";
	var nextSet = "";
	var firstP = "";
	var lastP = "";

	moduloCP = (currentPage - 1) % setPageSize / setPageSize;
	startPage = Math.ceil((((currentPage - 1) / setPageSize) - moduloCP))
			* setPageSize + 1;
	moduloSP = ((startPage - 1) + setPageSize) % setPageSize / setPageSize;
	endPage = Math
			.ceil(((((startPage - 1) + setPageSize) / setPageSize) - moduloSP))
			* setPageSize;

	if (totalPage <= endPage)
		endPage = totalPage;

	if (currentPage > setPageSize) {
		firstP = "<a class='la_prev' style=cursor:pointer onclick=javascript:"
				+ method + "('1', '" + size + "', '" + pageCount
				+ "');><img src='images/btn_left_last.gif' alt='맨앞으로'/></a>  ";
		cursor = startPage - 1;
		prevSet = "<a class='prev' style=cursor:pointer onclick=javascript:"
				+ method + "('" + cursor + "', '" + size + "', '" + pageCount
				+ "');><img src='images/btn_left.gif' alt='앞으로'/></a>  ";
	} else {
		firstP = "";
		prevSet = "";
	}

	cursor = startPage;
	curList += "<span class='page_num'>";
	while (cursor <= endPage) {
		if (cursor == currentPage) {
			if (cursor == endPage) {
				curList += "<strong> " + currentPage + " </strong>";
			} else {
				curList += "<strong> " + currentPage + " </strong> | ";
			}
		} else {
			if (cursor == endPage) {
				curList += "<a style=cursor:pointer onclick=javascript:"
						+ method + "('" + cursor + "', '" + size + "', '"
						+ pageCount + "');>" + cursor + "</a>";
			} else {
				curList += "<a style=cursor:pointer onclick=javascript:"
						+ method + "('" + cursor + "', '" + size + "', '"
						+ pageCount + "');>" + cursor + "</a> | ";
			}
		}
		cursor++;
	}

	curList += '</span>';

	if (totalPage > endPage) {
		lastP = "<a class='la_next' style=cursor:pointer onclick=javascript:"
				+ method + "('" + totalPage + "', '" + size + "', '"
				+ pageCount
				+ "');><img src='images/btn_right_last.gif' alt='맨뒤로'/></a>";
		cursor = endPage + 1;
		nextSet = "<a class='next'  style=cursor:pointer onclick=javascript:"
				+ method + "('" + cursor + "', '" + size + "', '" + pageCount
				+ "');><img src='images/btn_right.gif' alt='뒤로'/></a>  ";
	} else {
		lastP = "";
		nextSet = "";
	}
	curList = firstP + " " + prevSet + "  " + curList + "  " + nextSet + " "
			+ lastP;
	return curList;
}

function toggleGroupList(targetId) {
	var $groupName = $('#' + targetId);
	var $groupList = $('#groupList');

	if ($groupList.css('display') != '' && $groupList.css('display') == 'none') {
		$groupList.css('display', 'block');
	} else {
		$groupList.css('display', 'none');
		$groupList.unbind('mouseout.groupList');
	}
	$groupList.offset({
		top : $groupName.offset().top + 16,
		left : $groupName.offset().left
	});
}

// 통합검색
function search() {
	var lengKnd = $("#langKnd").val();
	var hint = portalPage.getMessageResource('ev.info.message.search.noinput');
	var keyword = $("#ptl_searchForm").val();
	var urlKo = "https://search.kaist.ac.kr/index.jsp?langCD=ko&searchTerm=";
	var urlEn = "https://search.kaist.ac.kr/index.jsp?langCD=en&searchTerm=";

	if (keyword == hint) {
		if (lengKnd == 'ko') {
			window.open(urlKo);
		} else {
			window.open(urlEn);
		}
	} else {
		if (lengKnd == 'ko') {
			window.open(urlKo + encodeURIComponent($('#ptl_searchForm').val()));
		} else {
			window.open(urlEn + encodeURIComponent($('#ptl_searchForm').val()));
		}
	}
}

function openCourceTimetable() {
	var win = window
			.open('/timeTable/list/list.face?menuType=Cou', 'courceTimeTable',
					'left=20,top=20,width=900,height=1000,toolbar=0,resizable=0,scrollbars=1');
	if (win != null) {
		win.focus();
	}
	return false;
}

function openLectureTimetable() {
	var win = window
			.open('/timeTable/list/list.face?menuType=Lec', 'lectureTimeTable',
					'left=20,top=20,width=900,height=1000,toolbar=0,resizable=0,scrollbars=1');
	if (win != null) {
		win.focus();
	}
	return false;
}

function refreshCourceTimetable() {
	$
			.ajax({
				url : '/timeTable/list/listForPortlet.face?menuType=Cou&flag=refresh&time='
						+ (new Date()).getTime(),
				success : function(data) {
					$('#divCourceTimetable').parent().html(data);
				}
			});
	return false;
}

function refreshLectureTimetable() {
	$
			.ajax({
				url : '/timeTable/list/listForPortlet.face?menuType=Lec&flag=refresh&time='
						+ (new Date()).getTime(),
				success : function(data) {
					$('#divLectureTimetable').parent().html(data);
				}
			});
	return false;
}

function chkByte(objname, maxSize) {
	var objstr = objname.value; // 입력된 문자열을 담을 변수
	var objstrlen = objstr.length; // 전체길이
	// 변수초기화
	var maxlen = maxSize; // 제한할 글자수 최대크기
	var i = 0; // for문에 사용
	var bytesize = 0; // 바이트크기
	var strlen = 0; // 입력된 문자열의 크기
	var onechar = ""; // char단위로 추출시 필요한 변수
	var objstr2 = ""; // 허용된 글자수까지만 포함한 최종문자열
	// 입력된 문자열의 총바이트수 구하기
	for (i = 0; i < objstrlen; i++) {
		onechar = objstr.charAt(i); // 한글자추출
		if (escape(onechar).length > 4) {
			bytesize += 2; // 한글이면 2를 더한다.
		} else {
			bytesize++; // 그밗의 경우는 1을 더한다.
		}
		if (bytesize <= maxlen) { // 전체 크기가 maxlen를 넘지않으면
			strlen = i + 1; // 1씩 증가
		}
	}
	// 대값을 초과하면
	if (bytesize > maxlen) {
		alert("최대 입력할수 있는 글자수를 초과하였습니다.");
		objstr2 = objstr.substr(0, strlen);
		objname.value = objstr2;
	}
	objname.focus();
}

function openLink(linkType, linkName, linkUrl, target) {
	addLinkLog(linkType, linkName, linkUrl);

//	2014.12.22 - 기능 사용안함	
//	if (linkType == 'Q') {
//		// 퀵링크인 경우 포털SSO를 거쳐서 이동하도록 링크 수정
//		var ssoLink = 'https://portalsso.kaist.ac.kr/login.ps?returnURL=';
//		var returnUrl = '';
//		if (linkUrl.indexOf('http://') == 0) {
//			returnUrl = linkUrl.substring('http://'.length);
//		} else if (linkUrl.indexOf('https://') == 0) {
//			returnUrl = linkUrl.substring('https://'.length);
//		}
//		if (returnUrl != '') {
//			linkUrl = ssoLink + encodeURIComponent(returnUrl);
//		}
//	}
	if (linkUrl.indexOf('/') == 0) {
	} else if (linkUrl.indexOf('http') != 0) {
		linkUrl = 'http://' + linkUrl;
	}
	window.open(linkUrl, target);
}

function addLinkLog(linkType, linkName, linkUrl) {
	var param = "linkType=" + encodeURIComponent(linkType) + "&linkName="
			+ encodeURIComponent(linkName) + "&linkUrl="
			+ encodeURIComponent(linkUrl);
	$.ajax({
		url : "/link/log/addForAjax.face",
		type : "POST",
		data : param,
		success : function(data) {
			// alert( data);
		}
	});
}

function fn_securityChange(id) {
	$("#" + id + "On").toggleClass("on");
	$("#" + id + "Off").toggleClass("on");
	
	var flag = "N";
	
	if ($("#" + id + "On").hasClass("on")) {
		flag = "Y";
	} else {
		flag = "N";
	}
	
	if (id == "phone") {
		$("#phdnFlg_data").val(flag);
	} else if (id == "pic") {
		$("#ghdnFlg_data").val(flag);
	}
}

function fn_campusUpdate() {
	var url = "/mySetting/updateCampus.face";
	var camp = $("input[name='favCampus']:checked").val();
	var param = {
			favCampus : camp
	};
	
	$.ajax({
		url : url,
		type : "POST",
		data : param,
		success : function(data) {
			if (data.Status == "ok") {
				var msg = portalPage.getMessageResource('ev.info.message.mysetting.save');
				alert(msg);
			}
		}
	});
}

function fn_calendarUpdate() {
	var url = "/mySetting/updateCalendar.face";
	
	var cal = "";
	$("input[name='favCalendar']:checked").each( function() {
		if( cal != '') {
			cal += ',';
		}
		cal += $(this).val();
	});
	
	var param = {
			favCalendar : cal
	};
	$.ajax({
		url : url,
		type : "POST",
		data : param,
		success : function(data) {
			if (data.Status == "ok") {
				var msg = portalPage.getMessageResource('ev.info.message.mysetting.save');
//				alert(msg);
			}
		}
	});
}


function fn_mysettingsUpdate() {
	securityUpdate();
	fn_calendarUpdate();
	fn_campusUpdate();
}

function fn_mainUpdate() {
	var url = "/mySetting/updateMain.face";
	var main = $("input[name='favMain']:checked").val();
	var param = {
			favMain : main
	};
	$.ajax({
		url : url,
		type : "POST",
		data : param,
		success : function(data) {
		}
	});
	if( main.indexOf('/user/')==-1) {
		$(".ptl_contents_portlets").css('display', 'none');
	} else {
		$(".ptl_contents_portlets").css('display', '');
	}
}

function fn_msgSubsList() {
	$.ajax({ 
		url: "/mySetting/msgSubscribe/listForAjax.face",
		type:"POST",
		dataType:"json",
		success: function(obj) {
			var data = obj.data;
			var status = obj.status;
			var langKnd = obj.langKnd;
			var html = "";
			
			if (status == "ERROR") {
				if (langKnd == "ko") {
					alert("PUSH 알림를 이용할 수 없습니다.");  
				} else {
					alert("KAIST push service is not available");
				}
				return;
			} else {
				$(data).each(function (index) {
					// 분류리스트
					var notiList = this.noticeList;
					var titleKo = this.cateKorName;
					var titleEn = this.cateEngName;
					var cateId = this.cateId;
					
					html = "<h4>*";
					if (langKnd == "ko") {
						html += titleKo;
					} else {
						html += titleEn;
					}
					html += "</h4>";
					/* html += "<p>" + + "</p>"; */
					/* html += "<p>“오늘의 공지사항”,”오늘의 게시글”은 가상의 통합 게시판으로 푸시 알림 설정을 별도로 지원하지 않습니다.</p>";
					if (cateId.indexOf("P") > -1) {
						html += "<p>“오늘의 공지사항”,”오늘의 게시글”은 가상의 통합 게시판으로 푸시 알림 설정을 별도로 지원하지 않습니다.</p>";
					} else {
						html += "<p></p>";
					}*/
					html += "<table summary=\"\">";
					html += "<caption></caption>";
					html += "<colgroup><col width=\"35%\"><col><col width=\"35%\"><col></colgroup>";
					html += "<tbody>";
					
					$(notiList).each(function (index) {
						
						
						if (((index+1) % 2) != 0 ) {
							html += "<tr>";
							html += "<th scope=\"row\">";
							if (langKnd == "ko") {
								html += this.notiKorName;
							} else {
								html += this.notiEngName;
							}
							html += "</th>";
							html += "<td>";
							html += "	<div class=\"bt_nf\">";
							html += "		<a href=\"javascript:fn_msgSubsRegSet('" + this.notiCode + "','Y')\" ";
							if(this.notiRegFlg == 'Y') {
								html += "class='on'";
							}
							html += " id=\"" + this.notiCode + "On\">ON</a>";
							
							html += "		<a href=\"javascript:fn_msgSubsRegSet('" + this.notiCode + "','N')\" ";
							if(this.notiRegFlg == 'N') {
								html += "class='on'";
							}
							html += " id=\"" + this.notiCode + "Off\">OFF</a>";
							html += "	</div>";
							html += "</td>";
							if (index == notiList.length) {
								html += "</tr>";
							}
						} else if (((index+1) % 2) == 0 ) {
							html += "<th scope=\"row\">";
							if (langKnd == "ko") {
								html += this.notiKorName;
							} else {
								html += this.notiEngName;
							}
							html += "</th>";
							html += "<td>";
							html += "	<div class=\"bt_nf\">";
							html += "		<a href=\"javascript:fn_msgSubsRegSet('" + this.notiCode + "','Y')\" ";
							if(this.notiRegFlg == 'Y') {
								html += "class='on'";
							}
							html += " id=\"" + this.notiCode + "On\">ON</a>";
							
							html += "		<a href=\"javascript:fn_msgSubsRegSet('" + this.notiCode + "','N')\" ";
							if(this.notiRegFlg == 'N') {
								html += "class='on'";
							}
							html += " id=\"" + this.notiCode + "Off\">OFF</a>";
							html += "	</div>";
							html += "</td>";
							html += "</tr>";
						}
					});
					html += "</tbody>";
					html += "</table>";
					
					
					$("#push_o_list").append(html);
				});
			}
		}
	});
}

function fn_msgSubsRegSet(id, regYn) {
	var param = {
		notiCode : id,
		notiRegFlg : regYn
	};
	
	$("#" + id + "On").toggleClass("on");
	$("#" + id + "Off").toggleClass("on");
	
	$.ajax({ 
		url: "/mySetting/msgSubscribe/setRegFlgForAjax.face",
		type:"POST",
		dataType:"json",
		data:param,
		success: function(obj) {
			var data = obj.data;
			var status = obj.status;
			var langKnd = obj.langKnd;
			
			if (status == "ERROR") {
				if (langKnd == "ko") {
					alert("알리미 서비스를 이용할 수 없습니다.");  
				} else {
					alert("KAIST push service is not available");
				}
				return;
			} else {
				
			}
		}
	});
}
