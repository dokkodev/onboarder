if ( ! window.enview )
    window.enview = new Object();
if ( ! window.enview.portal )
    window.enview.portal = new Object();
enview.portal.MessageResource = function()
{
	this.init();
}
enview.portal.MessageResource.prototype =
{
	m_messageRes : null,
	init : function()
	{
		this.messageRes = new Map();
		this.messageRes.put("mm.info.input.param.1", "{0} 입력해 주세요.");
		this.messageRes.put("mm.info.jumin.invalid.0", "유효하지않은 주민등록번호입니다!!");
		this.messageRes.put("mm.info.jumin1.cant.char.0", "주민등록번호 앞부분에 잘못된 문자가 있습니다.");
		this.messageRes.put("mm.error.invalid.referer.0", "유효한 레퍼러가 아닙니다");
		this.messageRes.put("mm.info.jumin1.wrong.0", "주민등록번호 앞부분이 잘못되었습니다.");
		this.messageRes.put("mm.info.jumin2.cant.char.0", "주민등록번호 뒷부분에 잘못된 문자가 있습니다.");
		this.messageRes.put("mm.info.cant.hanguel.0", "한글은 입력할 수 없습니다.");
		this.messageRes.put("mm.info.cant.special.0", "잘못된 문자가 있습니다.\n특수문자는 입력할수 없습니다.");
		this.messageRes.put("mm.info.cant.whitespace.0", "공백이 올수 없습니다.");
		this.messageRes.put("mm.error.invalid.delete.0", "삭제 할 수 없는 데이터입니다.");
		this.messageRes.put("mm.error.invalid.insert.1", "데이터를 추가 할 수 없는 위치입니다.");
		this.messageRes.put("mm.info.input.0", "입력해 주세요.");
		this.messageRes.put("mm.info.limitByte.0", "입력은 {0}byte 까지입니다.");
		this.messageRes.put("mm.info.only.nnumber.0", "잘못된 숫자가 있습니다.\n자연수 이외 문자는 입력할수 없습니다.");
		this.messageRes.put("mm.info.only.number.0", "잘못된 숫자가 있습니다.\n숫자 이외 문자는 입력할수 없습니다.");
		this.messageRes.put("mm.info.select.0", "선택해 주십시오.");
		this.messageRes.put("mm.info.success.0", "정상적으로 처리되었습니다.");
		this.messageRes.put("mm.info.notExist.delFile.0", "삭제할 파일이 없습니다.");
		this.messageRes.put("mm.error.system.failure.0", "시스템 에러가 발생하였습니다<br>");
		this.messageRes.put("mm.error.invalid.page.nameupdate.0", "이름을 변경할수 없습니다. 하위 트리부터 변경 가능합니다.");
		this.messageRes.put("mm.error.invalid.update.0", "잘못된 변경 요청입니다.");
		this.messageRes.put("mm.info.common.success.0", "정상적으로 처리되었습니다.");
		this.messageRes.put("mm.info.mileSttg.0", "제한 횟수를 입력하시거나 마일리지 정책을 -없음-을 선택해 주십시오.");
		this.messageRes.put("mm.error.sql.badIntegrity.0", "무결성 제약 조건에 위배됩니다");
		this.messageRes.put("mm.error.sql.problem.0", "데이터 처리중 에러가 발생하였습니다<br>");
		this.messageRes.put("mm.info.move.success.0", "정상적으로 이동되었습니다.");
		this.messageRes.put("mm.error.invalid.delete.minPage.0", "마이페이지는 최소 1개여야 합니다.");
		this.messageRes.put("mm.error.link.insert.1", "서비스 코드가 중복됩니다 다시 입력해 주세요");




		if( typeof(window["initialize_ev"]) == "function" ) { initialize_ev(this); }
		if( typeof(window["initialize_ka"]) == "function" ) { initialize_ka(this); }
		if( typeof(window["initialize_hn"]) == "function" ) { initialize_hn(this); }
		if( typeof(window["initialize_cf"]) == "function" ) { initialize_cf(this); }
		if( typeof(window["initialize_eb"]) == "function" ) { initialize_eb(this); }
	},
	getMessage : function( key )
	{
		var msg =  this.messageRes.get( key + '.' + portalPage.getDomainId());
		if( msg==null) { return this.messageRes.get( key + '.0' ); } else { return msg;}
	},
	setMessage : function( key, val )
	{
		return this.messageRes.put( key, val );
	}
}
