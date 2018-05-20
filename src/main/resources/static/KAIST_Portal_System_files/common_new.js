//document.domain = "dit.ac.kr";

if ( ! window.enview )
    window.enview = new Object();
	
if ( ! window.enview.portal )
    window.enview.portal = new Object();
	
if ( ! window.enview.util )
    window.enview.util = new Object();
	
var portalPage = null;
var quickMenu = null;
var noticeManager = null;
var myPageTabPane = null;
var enviewMessageBox = null;

var ie5=document.all&&document.getElementById
var ns6=document.getElementById&&!document.all

function portalPageInitialize(version, isEditing, userId, pageInfo, decorations, langKnd, actionString, domainId) {
	var divElem = document.createElement('div');
	var html = "";
	html += "<div id=\"DebuggerDisplay\" style=\"width:100%; height:20px; display:none;\"></div>";
	html += "<div id=\"EnviewMessageBox\" title=\"Notice\" class=\"massagebox\" style=\"height:200px;display:none;\"></div>";
	//html += "<div id=\"Enview.Portal.PortletEditIconArea\" class=\"portlet-iconArea\" style=\"display:none;\"></div>";
	html += "<div id=\"Enview.Portal.ContextMenu\" style=\"display:none;\"></div>";
	html += "<div id=\"Enview.Portal.DialogBasePane\" style=\"display:none;\"></div>"; 
	
	divElem.innerHTML = html;
	document.body.appendChild( divElem );

	portalPage = new enview.portal.Page();
	portalPage.init( version, isEditing, userId, pageInfo, decorations, document.body, langKnd, domainId );
	document.body.scroll='auto';
	
	var iconArea = document.getElementById("Enview.Portal.IconArea");
	//alert("servlet=" + portalPage.getServletPath())
	/*
	if( portalPage.getServletPath() == "/contentonly" ) {
		//alert( portalPage.getTheme());
		var decoration = portalPage.getDecoration(); 
		html = portalPage.getMessageResource("ev.info.pageEditingPageTheme") + " : <select id='sitemanager.select_theme' name='layout' onchange='javascript:changeTheme(this);'>";
		for(var ix=0; ix<decoration.pages.length; ix++) {
			if( decoration.pages[ix].name == portalPage.getTheme() ) {
				html += "<option value='" + decoration.pages[ix].value + "' selected>" + decoration.pages[ix].name + "";
			}
			else {
				html += "<option value='" + decoration.pages[ix].value + "'>" + decoration.pages[ix].name + "";
			}
		}
		html += "</select>";
		
		html += "<img src='" + portalPage.getContextPath() + "/decorations/layout/images/magnifier.jpg' hspace='2' align='absmiddle' border='0' style='cursor:hand' title='Maximize Screen' onclick='javascript:parent.aPageManager.toggleMaximize()'>";
		//html += "<img src='" + portalPage.getContextPath() + "/decorations/layout/images/toggle.gif' hspace='2' align='absmiddle' border='0' style='cursor:hand' title='Minimize EditMode' onclick='javascript:portalPage.toggleDragMode()'>";
		html += "<img src='" + portalPage.getContextPath() + "/decorations/layout/images/save.jpg' hspace='2' align='absmiddle' border='0' style='cursor:hand' title='Save Page' onclick='javascript:portalPage.checkModified()'>";
		
		iconArea.innerHTML = html + "&nbsp;" + iconArea.innerHTML;
		document.getElementById("sitemanager.select_theme").value = pageInfo.evalTheme;
		iconArea.style.display = "";
	}
	else {
		iconArea.style.display = "none";
	}
	*/
	
	addMouseEvent();
}

function noticeInitialize(pageId) {
	noticeManager = new enview.portal.Notice();
	noticeManager.init(pageId);

}

function quickMenuInitialize(quickElement, left, top) {
	quickMenu = new enview.portal.QuickMenu();
	quickMenu.init(quickElement, left, top);
}

function tabInitialize()
{
	if(!document.getElementsByName) return false;
	if(!document.getElementById) return false;
	
	var divArray = document.getElementsByTagName( "DIV" );
	for(var i=0; i<divArray.length; i++)
	{
		//alert("node=" + divArray[i].className);
		if( divArray[i].className != "tab-main" ) continue;
		
		var subDivArray = divArray[i].getElementsByTagName("DIV");
		
		var tabHeaderArray = new Array();
		var tabContentArray = new Array();
		//alert("subDivArray.length=" + subDivArray.length);
		for(var j=0; j<subDivArray.length; j++)
		{
			if(subDivArray[j].className == "tab-header") {
				tabHeaderArray.push( subDivArray[j] );
				var id = subDivArray[j].id.substring( subDivArray[j].id.indexOf("-") + 1);
				//alert("id=" + id);
				tabContentArray.push( document.getElementById("TabContent-" + id) );
			}
		}
		
		for(var j=0; j<tabHeaderArray.length; j++)
		{
			var links = new Array();
			var lists = tabHeaderArray[j].getElementsByTagName("li");
			for(var k=0; k<lists.length; k++)
			{
				links[k] = lists[k].getElementsByTagName("a").item(0);
			}
			for(var k=0; k<links.length; k++)
			{
				links[k].parentNode.childArray = links;
				links[k].header = tabHeaderArray[k];
				links[k].content = tabContentArray[k];
				links[k].idx = k;
				if( j != k ) {
					links[k].onclick=function() {
						for(var m=0; m<this.parentNode.childArray.length; m++) {
							//alert("m=" + m + ", idx=" + this.idx + ", id=" + links[m].main.id);
							if( m == this.idx ) {
								this.parentNode.childArray[m].header.style.display="block";
								this.parentNode.childArray[m].content.style.display="block";
							}
							else {
								this.parentNode.childArray[m].header.style.display="none";
								this.parentNode.childArray[m].content.style.display="none";
							}
						}
						return false;
					}
				}
			}
			
			if( j == 0 ) {
				tabHeaderArray[j].style.display="block";
				tabContentArray[j].style.display="block";
			}
			else {
				tabHeaderArray[j].style.display="none";
				tabContentArray[j].style.display="none";
			}
		}
	}
}

function addMouseEvent() {
	if(navigator.userAgent.indexOf('Firefox') >= 0){  
		(
			function(){   
				var events = ["mousedown", "mouseover", "mouseout", "mousemove", "mousedrag", "click", "dblclick"];     
				for (var i = 0; i < events.length; i++){    
					window.addEventListener(events[i], function(e){ window.event = e; }, true); 
				}  
			}()
		); 
	};
}

function invokeEnviewNotice(contextPath, id, template, left, top, width, height, langKnd) {

	if( template == null || template.length==0 ) return;
	
	var enviewNotice = GetCookie( "ENVIEW_NOTICE_" + id );
	if( enviewNotice == "no" ) return;

	/*
	var width = "350";
	var height = "280";
	var left = (screen.width/2 - width/2);
	var top = (screen.height/2 - height/2);
	*/
	var newWindow = null;
	var url = contextPath + "/" + template + "?notice_id=" + id;
	if( langKnd != null && langKnd.length > 0 ) {
		url += "&langKnd=" + langKnd;
	}
	
	if (document.all)	// it is IE
	{
		var feature = "'titlebar=no,directories=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,left=" + left + ",top=" + top + ",width=" + width + ",height=" + height;
		newWindow = window.open(url, "NoticeWindow" + id, feature)
	}
	else {
		var feature = "titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,left=" + left + ",top=" + top + ",width=" + width + ",height=" + height;
		//var feature = "fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,	scrollbars=no,resizable=no,left=" + left + ",top=" + top + ",width=" + width + ",height=" + height;
		newWindow = window.open(url, "NoticeWindow" + id, feature)
		//newWindow = window.open("/enview/statics/templates/notice/notice03.jsp", "NoticeWindow" + id, feature)
	}
}

function help() {
	portalPage.showAbout();
	/*
	var url = "/enview/statics/help/about/about.html";
	var width = "300";
	var height = "240";
	if (document.all)	// it is IE
	{
		//window.showModelessDialog(url,"","dialogHeight:" + height + "; dialogWidth:" + width + "; resizable:no; scroll=no; status=no;");
		var left = (screen.width/2 - width/2);
		var top = (screen.height/2 - height/2);
		//alert("screen.width=" + screen.width + ", left=" + left + ", top=" + top);
		var feature = "'titlebar=no,directories=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,left=" + left + ",top=" + top + ",width=" + width + ",height=" + height;
		window.open(url, "HelpWindow", feature)
	}
	else {
		var left = (screen.width/2 - width/2);
		var top = (screen.height/2 - height/2);
		var feature = "titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,left=" + left + ",top=" + top + ",width=" + width + ",height=" + height;
		//var feature = "fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,	scrollbars=no,resizable=no,left=" + left + ",top=" + top + ",width=" + width + ",height=" + height;
		window.open(url, "HelpWindow", feature)
	}
	*/
}

function showModal(url, width, height) {
	if( !width ) {
		width = "400px";
	}
	if( !height ) {
		height = "200px";
	}
	
	window.showModalDialog(url,"","dialogHeight:200; dialogWidth:600");
	//window.showModalDialog(url,"","dialogHeight:" + width + "; dialogWidth:" + height + "");
}

function showModaless(url, width, height) {
	if( !width ) {
		width = "700";
	}
	if( !height ) {
		height = "600";
	}
	
	if (document.all)	// it is IE
	{
		//window.showModelessDialog(url,"","dialogHeight:" + height + "; dialogWidth:" + width + "; resizable:yes;");
		var left = (screen.width/2 - width/2);
		var top = (screen.height/2 - height/2);
		var feature = "titlebar=no,directories=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + left + ",top=" + top + ",width=" + width + ",height=" + height;
		window.open(url, "HelpWindow", feature)
	}
	else {
		var left = (screen.width/2 - width/2);
		var top = (screen.height/2 - height/2);
		var feature = "titlebar=no,directories=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + left + ",top=" + top + ",width=" + width + ",height=" + height;
		window.open(url, "HelpWindow", feature)
	}
}
function whenListMouseOver(obj) {
	//obj.setAttribute("oldBackground", obj.style.backgroundColor);
	//obj.style.backgroundColor='#F2F0FB';
	obj.setAttribute("oldBackClass", obj.getAttribute("class"));
	obj.setAttribute("oldBackClassName", obj.getAttribute("className"));
	obj.setAttribute("class", "mouseover");
	obj.setAttribute("className", "mouseover");
}
function whenListMouseOut(obj) {
	//obj.style.backgroundColor = obj.getAttribute("oldBackground");
	obj.setAttribute("class", obj.getAttribute("oldBackClass"));
	obj.setAttribute("className", obj.getAttribute("oldBackClassName"));
}
	
function whenSrchFocus( obj, lvS ) {
	if( obj.value == lvS ) obj.value = "";
}

function whenSrchBlur( obj, lvS ) {
	if( obj.value == "" ) obj.value = lvS;
}

function MM_swapImgRestore() { //v3.0
	var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
	var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.0
	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
	var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function SetCookie(name,value,expire,path) {
	/*
	var today = new Date();
	today.setDate( today.getDate() + parseInt( expire ) );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + '; path=' + ((!path) ? '':path);
	*/
	document.cookie = name + '=' + escape(value) + ((!expire) ? '':('; expires=' + expire.toGMTString())) + '; path=' + ((!path) ? '':path);
}

function GetCookie(name) {
	var value=null, search=name+"=";
	if (document.cookie.length > 0) {
		var offset = document.cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			var end = document.cookie.indexOf(";", offset);
			if (end == -1) end = document.cookie.length;
			value = unescape(document.cookie.substring(offset, end));
		}
	}
	return value;
}

function DeleteCookie(name,path) {
	var expireDate = new Date();

	expireDate.setDate( expireDate.getDate() - 1 );
	document.cookie = name + "= " + "; expires=" + expireDate.toGMTString() + "; path=" + path;
}

Number.prototype.to2 = function() { return (this > 9 ? "" : "0")+this; };
Date.MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
Date.DAYS   = ["Sun", "Mon", "Tue", "Wed", "Tur", "Fri", "Sat"];
Date.prototype.getDateString = function(dateFormat) {
  var result = "";
  
  dateFormat = dateFormat == 8 && "YYYY.MM.DD" ||
               dateFormat == 6 && "hh:mm:ss" ||
               dateFormat ||
               "YYYY.MM.DD hh:mm:ss";
  for (var i = 0; i < dateFormat.length; i++) {
    result += dateFormat.indexOf("YYYY", i) == i ? (i+=3, this.getFullYear()                     ) :
              dateFormat.indexOf("YY",   i) == i ? (i+=1, String(this.getFullYear()).substring(2)) :
              dateFormat.indexOf("MMM",  i) == i ? (i+=2, Date.MONTHS[this.getMonth()]           ) :
              dateFormat.indexOf("MM",   i) == i ? (i+=1, (this.getMonth()+1).to2()              ) :
              dateFormat.indexOf("M",    i) == i ? (      this.getMonth()+1                      ) :
              dateFormat.indexOf("DDD",  i) == i ? (i+=2, Date.DAYS[this.getDay()]               ) :
              dateFormat.indexOf("DD",   i) == i ? (i+=1, this.getDate().to2()                   ) :
              dateFormat.indexOf("D"   , i) == i ? (      this.getDate()                         ) :
              dateFormat.indexOf("hh",   i) == i ? (i+=1, this.getHours().to2()                  ) :
              dateFormat.indexOf("h",    i) == i ? (      this.getHours()                        ) :
              dateFormat.indexOf("mm",   i) == i ? (i+=1, this.getMinutes().to2()                ) :
              dateFormat.indexOf("m",    i) == i ? (      this.getMinutes()                      ) :
              dateFormat.indexOf("ss",   i) == i ? (i+=1, this.getSeconds().to2()                ) :
              dateFormat.indexOf("s",    i) == i ? (      this.getSeconds()                      ) :
                                                   (dateFormat.charAt(i)                         ) ;
  }
  return result;
};


function Map()
{
    this.keySet=new Object();
    this.values=new Object();
    this.size=0;
}
Map.prototype.put=function(key,value)
{
    if(!this.isValidKey(key))
    {
        throw new Error('Map put method called without specifying a valid key');
    }
    var index;
    if(this.containsKey(key))
    {
        for(var i=0;i<this.size;i++)
        {
            if(this.keySet[i]==key)
            {
                index=i;
                break;
            }
        }
    }
    else
    {
        index=this.size;
        this.keySet[index]=key;
        this.size++;
    }
    this.values[index]=value;
};
Map.prototype.getSize=function()
{
	return this.size;
}
Map.prototype.remove=function(key)
{
    if(!this.isValidKey(key))
    {
        throw new Error('Map remove method used with invalid key: '+key);
    }
    if(!this.containsKey(key))
    {
        return;
    }
    var index;
    for(var i=0;i<this.size;i++)
    {
        if(this.keySet[i]==key)
        {
            index=i;
            break;
        }
    }
    delete this.keySet[index];
    delete this.values[index];
    for(var i=index;i<this.size-1;i++)
    {
        this.keySet[i]=this.keySet[i+1];
        this.values[i]=this.values[i+1];
    }
    delete this.keySet[this.size-1];
    delete this.values[this.size-1];
    this.size--;
};
Map.prototype.removeAll=function()
{
	this.keySet=new Object();
    this.values=new Object();
    this.size=0;
}
Map.prototype.containsKey=function(key)
{
    if(this.get(key)!=null)
    {
        return true;
    }
    return false;
};
Map.prototype.getKeySet=function()
{
    return this.keySet;
};
Map.prototype.get=function(key)
{
    var value=null;
    if(!key)
    {
        return null;
    }
    for(var i=0;i<this.size;i++)
    {
        if(this.keySet[i]==key)
        {
            value=this.values[i];
            break;
        }
    }
    return value;
};
Map.prototype.isValidKey=function(key)
{
    if(key == null)
    {
        return false;
    }
    return true;
};

String.prototype.trim = function(str) {
  str = this != window?this:str;
  return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

 
String.prototype.parseJSON = function () {
    try {
        return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
                this.replace(/"(\\.|[^"\\])*"/g, ''))) &&
            eval('(' + this + ')');
    } catch (e) {
    	alert(e);
        return false;
    }
};

function JSONtoString(object) {
    var results = [];
    for (var property in object) {
        var value = object[property];
        if (value)
            results.push("\"" + property.toString() + '\": \"' + value + "\"");
        }
                 
        return '{' + results.join(', ') + '}';
}

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "am" : "pm";
            default: return $1;
        }
    });
};

function filterTag (s) {
    if (s == null) return;
	 
	s = s.replace("<", "&lt;");
	return s.replace(">", "&gt;");
 }
