// ... enview utility objects
if ( ! window.enview )
    window.enview = new Object();
	
if ( ! window.enview.util )
    window.enview.util = new Object();
	
if ( ! window.enview.portal )
    window.enview.portal = new Object();

var ajaxInvokeReturnHandler = function()
{
  this.populate = function(data) 
  {

  }     
  this.failure = function(msg)
  {
	alert(msg);
  }
};
	
enview.util.Ajax = function()
{
	
}
enview.util.Ajax.prototype = 
{
	contextPath : null,
	
	m_isShowMsgbox : true,
	
	setContextPath : function(contextPath)
	{
		this.contextPath = contextPath;
	},
	invoke: function (action, names, values, handler, mimeType)
	{
		var host = document.location.protocol + "/" + "/" + document.location.host;
	    var requestUrl = host + this.contextPath + "/ajaxapi?action=" + action;
		var requestContent = "";
	    if (names != null)
	    {
	        for (var ix=0;  ix<names.length; ix++)
	        {
	            requestContent = requestContent + "&" + names[ix] + "=" + values[ix];
	        }    
	    }
		//alert("action=" + action + ", requestUrl=" + requestUrl + ", requestContent=" + requestContent);
		
		//alert("requestUrl=" + requestUrl);
	    //var mimeType = "text/json";
		this.bind({
	    //dojo.io.bind({
	      url: requestUrl,
		  content: requestContent,
	      mimetype: mimeType,
		  retrieveElementValue: this.retrieveElementValue,
	      load: function( type, data, evt )
	      {
			  //alert("data=" + data.Data);
	          handler.populate(data);                    
		  },    
		  error: function( type, error )
		  {
		      var msg = "Portal Communication Error: " + requestUrl + " type: " + type + ", error=" + error;
			  //msg =  "Portal Communication Error: " + requestUrl + " type: " + type + " errorCode:" + error.errorCode + " errorReason:" + error.reason;
		      //alert(msg);
		      handler.failure(msg);
		  },
		  logicError: function( type, error )
		  {
		      handler.failure(error);
		  }
	    }); 
		//index = this.tunnel.textTunnelMgr.getServerData("", formData, url, this, handler, errorHandler); 
	},
	
	invokeCommon: function (requestUrl, handler, mimeType)
	{
		var xmlHttp = null;
		
	    if (window.ActiveXObject) {
	        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	    } 
	    else if (window.XMLHttpRequest) {
	        xmlHttp = new XMLHttpRequest();
	    }
		
		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState == 4) {
		        if(xmlHttp.status == 200) {
					var contentType = xmlHttp.getResponseHeader("Content-Type");
					//alert("contentType=" + contentType);
					if( contentType.indexOf("text/json") > -1 ) {
						//alert("responseText=" + xmlHttp.responseText);
						var data = eval("("+xmlHttp.responseText+")");
						if( data.Status == "success" ) {
							handler.populate(data); //.parseJSON());
						}
						else {
							handler.failure(data.Reason);
						}
					}
					else if( contentType.indexOf("text/xml") > -1 ) {
						var status = retrieveElementValue("status", xmlHttp.responseXML);
						if( status == "success" ) {
							handler.populate(xmlHttp.responseXML);
						}
						else {
							var reason = retrieveElementValue("reason", xmlHttp.responseXML);
							handler.failure(reason);
						}
					}
					else {
						alert("Error ajax communication : " + xmlHttp.responseText );
						alert("url=" + url + ", content=" + content);
					}
				}
				else {
					handler.failure(xmlHttp.parseError);
				}
		    }
		}
		
		//xmlHttp.setRequestHeader("Cache-Control", "no-store, no-cache, must-revalidate"); // for realtime
		//xmlHttp.setRequestHeader("Pragma", "no-cache"); // HTTP/1.0
		//xmlHttp.setRequestHeader("Connection", "close");

	    xmlHttp.open("GET", requestUrl, true);
	    xmlHttp.send(null);
	},
	
	invokeRawData: function (requestUrl, handler)
	{
		var xmlHttp = null;
		
	    if (window.ActiveXObject) {
	        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	    } 
	    else if (window.XMLHttpRequest) {
	        xmlHttp = new XMLHttpRequest();
	    }
		
		//xmlHttp.setRequestHeader("Content-Type", "multipart/form-data"); //"application/x-www-form-urlencoded; charset=UTF-8");

		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState == 4) {
		        if(xmlHttp.status == 200) {
					var contentType = xmlHttp.getResponseHeader("Content-Type");
					handler.populate(xmlHttp.responseText);
				}
				else {
					handler.failure(xmlHttp.parseError);
				}
		    }
		}
		
	    xmlHttp.open("GET", requestUrl, true);
	    xmlHttp.send(null);
	},
	
	invokeRawDataByPost: function (requestUrl, content, handler)
	{
		var xmlHttp = null;
		
	    if (window.ActiveXObject) {
	        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	    } 
	    else if (window.XMLHttpRequest) {
	        xmlHttp = new XMLHttpRequest();
	    }
		
		//xmlHttp.setRequestHeader("Content-Type", "multipart/form-data"); //"application/x-www-form-urlencoded; charset=UTF-8");

		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState == 4) {
		        if(xmlHttp.status == 200) {
					var contentType = xmlHttp.getResponseHeader("Content-Type");
					handler.populate(xmlHttp.responseText);
				}
				else {
					handler.failure(xmlHttp.parseError);
				}
		    }
		}
		
		xmlHttp.open("POST", requestUrl, true);
		xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttp.send(content);
	},
	
	
	bind : function (request) 
	{
		var xmlHttp = null;
		
		var url = request["url"];
		var content = request["content"];
		var mimetype = request["mimetype"];
		var load = request["load"];
		var error = request["error"];
		var logicError = request["logicError"];
		var retrieveElementValue = request["retrieveElementValue"];
		
	    if (window.ActiveXObject) {
	        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	    } 
	    else if (window.XMLHttpRequest) {
	        xmlHttp = new XMLHttpRequest();
	    }
		
		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState == 4) {
		        if(xmlHttp.status == 200) {
					var redirectUrl = xmlHttp.getResponseHeader("enview.ajax.control");
					if( redirectUrl != null && redirectUrl.length>0 ) {
						//alert("redirectUrl=" + redirectUrl);
						window.location.href = redirectUrl;
					}
					else {
						//alert("Success ajax communication : " + xmlHttp.responseXML);
						var contentType = xmlHttp.getResponseHeader("Content-Type");
						//alert("contentType=" + contentType);
						if( contentType.indexOf("text/json") > -1 ) {
							var data = eval("("+xmlHttp.responseText+")");
							if( data.Status == "success" ) {
								load(xmlHttp.status, data); //.parseJSON());
							}
							else {
								logicError(status, data.Reason);
							}
						}
						else if( contentType.indexOf("text/xml") > -1 ) {
							var status = retrieveElementValue("status", xmlHttp.responseXML);
							if( status == "success" ) {
								load(xmlHttp.status, xmlHttp.responseXML);
							}
							else {
								var reason = retrieveElementValue("reason", xmlHttp.responseXML);
								logicError(status, reason);
							}
						}
						else {
							alert("Error ajax communication : " + xmlHttp.responseText );
							alert("url=" + url + ", content=" + content);
						}
					}
		        }
				else {
					alert("Error ajax communication : " + xmlHttp.status + ", message=" + xmlHttp.responseText);
					error(xmlHttp.status, xmlHttp.parseError);
				}
		    }
		}
		
	    xmlHttp.open("POST", url, true);
		xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttp.send(content);
	},
	    
	handleStateChange : function () 
	{
	    if(this.xmlHttp.readyState == 4) {
	        if(this.xmlHttp.status == 200) {
				alert("Success ajax communication !!!");
	            //document.getElementById("results").innerHTML = xmlHttp.responseText;
	        }
			else {
				alert("Error ajax communication : " + this.xmlHttp.status);
			}
	    }
	},
	
	retrieveElementValue : function (elementName, xml) 
	{
		try {
			var path = xml.getElementsByTagName(elementName);
			if (path != null)
			{    
				if (path.length > 0 && path[0].firstChild != null)
				{
					var value = path[0].firstChild.nodeValue;
					return value.trim();
				}
			}
		}
		catch(e) {
				alert(e);
		}
	    return "";
	},
	retrieveAttributeValue : function (elementName, attributeName, xml) 
	{
		try {
			var path = xml.getElementsByTagName(elementName);
			if (path != null && path.length > 0)
			{ 
				var namedItem = path[0].attributes.getNamedItem(attributeName);
				if (namedItem != null)
				{            
					return namedItem.value.trim();
				}
			}
		}
		catch(e) {
				alert(e);
		}
	    return "";
	},
	send : function(type, url, param, async, callback)
	{
		//param += "&__ajax_seed__=" + (new Date()).valueOf();
		$.ajax({
			type: type,
			url: url,
			data: param + "&__ajax_call__=true",
			async: async,
			complete: function(jqXHR, textStatus) {
				//alert("readyState=" + jqXHR.readyState + ", status=" + jqXHR.status + ", statusText=" + jqXHR.statusText + ", textStatus=" + textStatus);
				if (jqXHR.status == 200) { // success
					if( textStatus == "parsererror" ) {
						//alert("[ parsererror ] " + jqXHR.responseText );
						if(portalPage.m_ajax.m_isShowMsgbox){
							if( enviewMessageBox != null ) {
								//alert(jqXHR.responseText);
								enviewMessageBox.doShow(jqXHR.responseText, "parsererror", 400, 200, -1 ); 
							}
							else {
								//alert(jqXHR.responseText);
								enviewMessageBox = new enview.portal.MessageBox(400, 200, -1); 
								enviewMessageBox.doShow(jqXHR.responseText, "parsererror" ); 
							}
						}
					}					
					else {
						var redirectUrl = jqXHR.getResponseHeader("enview.ajax.control");
						if( redirectUrl != null && redirectUrl.length>0 ) {
							//alert("redirectUrl=" + redirectUrl);
							window.location.href = redirectUrl;
						}
						else {
							var contentType = jqXHR.getResponseHeader("Content-Type");
							//alert("contentType=" + contentType);
							if( contentType.indexOf("text/json") > -1 ) {
								//alert("諛붾낫??+jqXHR.responseText);
								var data = eval("("+jqXHR.responseText+")");
								if( data.Status ) {
									if( data.Status == "success" ) { callback.success( data ); }
									else { 
										if( callback.fail ) {
											callback.fail( data );
										}
										else {
											alert(data.Reason); 
										}
									}
								}
								else { callback.success( data ); }
							}
							else if( contentType.indexOf("text/xml") > -1 ) {
								callback.success( jqXHR.responseXML );
							}
							else {
								callback.success( jqXHR.responseText );
							}
						}
					}
				} 
				else if (jqXHR.status == 500) { // Internal Server Error
					//alert("[500 Error] " + jqXHR.responseText);
					if(portalPage.m_ajax.m_isShowMsgbox){
						if( enviewMessageBox != null ) {
							enviewMessageBox.doShow(jqXHR.responseText, "500 Error", 1000, 600, -1 ); 
						}
						else {
							enviewMessageBox = new enview.portal.MessageBox(1000, 600, -1); 
							enviewMessageBox.doShow(jqXHR.responseText, "500 Error" ); 
						}
					}
				} 				
				else if (jqXHR.status == 404) { // File Not found
					//alert("[404 Error] " + jqXHR.responseText);
					if(portalPage.m_ajax.m_isShowMsgbox){
						if( enviewMessageBox != null ) {
							enviewMessageBox.doShow(jqXHR.responseText, "404 Error", 1000, 600, -1 ); 
						}
						else {
							enviewMessageBox = new enview.portal.MessageBox(1000, 600, -1); 
							enviewMessageBox.doShow(jqXHR.responseText, "404 Error" ); 
						}
					}
				}
				else if (jqXHR.status == 403) { // forbidden
					var redirectUrl = jqXHR.getResponseHeader("enview.ajax.control");
					if( redirectUrl != null && redirectUrl.length>0 ) {
						//alert("redirectUrl=" + redirectUrl);
						window.location.href = redirectUrl;
					}
				}
			}
		});
	}
}

enview.util.CheckBoxUtil = function()
{

}
enview.util.CheckBoxUtil.prototype =
{
	unChkAll: function (f) {
	    //var f = document.forms[ formName ];
		//var f = obj.form;
		//alert(" form=" + f + ", f.elements=" + f.elements);
		//alert("f=" + f + ", f.elements=" + f.elements);
		if(f.elements != null) {
		    var loopCnt = f.elements.length;
			//alert("loopCnt=" + loopCnt);
		    for(i=0; i<loopCnt; i++) {
			//alert("f.elements[i].type=" + f.elements[i].type);
		        if(f.elements[i].type=="checkbox") {
		            f.elements[i].checked = false;
		        }
		    }
		}
	},

	chkAll: function (obj) {
		var f = obj.form;
		//alert("formName=" + formName + ", f=" + f + ", f.elements=" + f.elements);
	    var loopCnt = f.elements.length;
		if(f.elements != null) {
		    if(obj.checked) {
		        for(i=0; i<loopCnt; i++) {
		            if(f.elements[i].type=="checkbox") {
		                f.elements[i].checked = true;
		            }
		        }
		    } else {
		        for(i=0; i<loopCnt; i++) {
		            if(f.elements[i].type=="checkbox") {
		                f.elements[i].checked = false;
		            }
		        }
		    }
		}
	},

	getCheckedElements: function (f) {
	    //var f = document.forms[ formName ];
	    var loopCnt = f.elements.length;
	    var retValue = "";
	    for(i=0,j=0; i<loopCnt; i++) {
	    	var elem = f.elements[i];
	        if(f.elements[i].type=="checkbox" && f.elements[i].checked==true && f.elements[i].id!='delCheck') {
	            var tmp = f.elements[i].id.split("[");
	            var tmp2 = tmp[1].split("]");
				if(j > 0) {
					retValue += "," + tmp2[0];
				}
				else {
					retValue += tmp2[0];
				}
				j++;
	        }
	    }
	    
	    return retValue;
	},

	rowOver: function (obj) {
	 	//if (!ev) ev = window.event; 
	 	
	 	//var obj = ev.srcElement;
		//alert(obj.nodeName);
		//alert(obj);
		if(obj.nodeName=="SPAN") {
			obj = obj.parentNode.parentNode;
		}
		else if(obj.nodeName=="TD") {
			obj = obj.parentNode;
		}
		
	 	obj.style.cursor = 'pointer';
	 	obj.className = 'portlet-section-selected';
	},
	 
	rowOut: function (obj) {
	 	//if (!ev) ev = window.event; 
	 	
	 	//var obj = ev.srcElement;
	 	var no = 0;
		//alert(obj.nodeName);
		if(obj.nodeName=="SPAN") {
			obj = obj.parentNode.parentNode;
			no = obj.ch;
		}
		else if(obj.nodeName=="TD") {
			obj = obj.parentNode;
			no = obj.ch;
		}
		else if(obj.nodeName=="TR") {
			no = obj.getAttribute("ch");
		}
	 	//alert(no);
		//alert(obj.nodeName);
	 	
		if(no%2==0)
		   obj.className = 'portlet-section-body';
		else
		   obj.className = 'portlet-section-alternate';
	}
};

enview.util.DragMgr = function(a_controlObject, a_draggbleElt, a_draggbleId)
{
    // Reference to draggable element
	this.m_controlObject = a_controlObject;
    this.m_draggableElt = a_draggbleElt;
    this.m_draggbleIds = a_draggbleId.split(",");
    this.m_dragHeader = null;
    this.m_dragX = 0;
    this.m_dragY = 0;
    
    this.isStartDragging = false;
	
	this.m_debugger = new enview.util.Debugger( 'DebuggerDisplay' );
	//this.m_debugger.hide();
}

/**
 * Attach event handlers to the table element
 */
enview.util.DragMgr.prototype =
{
	m_controlObject : null,
	m_draggableElt : null,
    m_draggbleIds : null,
    m_dragHeader : null,
    m_dragX : 0,
    m_dragY : 0,
    isStartDragging : false,
	m_debugger : null,
	
	attach : function ()
	{
		alert("I'm ev Util.dragMngr.attach()::1");
	    
	    var thisObj = this;
	    this.m_draggableElt.onmousedown = function (event) { thisObj.onMouseDown(event); };
	    this.m_draggableElt.onmouseup = function (event) { thisObj.onMouseUp(event); };
	    this.m_draggableElt.onmousemove = function (event) { thisObj.onMouseMove(event); };

		alert("I'm ev Util.dragMngr.attach()::2");	    
	},

	handleEvent : function ( a_event )
	{
		if (a_event.type=="mousemove")
		{
			this.onMouseMove ( a_event );
		}
		else if (a_event.type=="mouseup")
		{
			this.onMouseUp ( a_event );
		}

	},

	getParentElt : function ( a_element, a_searchLevel )
	{
		if (!a_element.nodeName)
		{
			return null;
		}
		
		var findElt = null;
		var compareId = "";
		for(var i=0; i<this.m_draggbleIds.length; i++) {
			var po = this.m_draggbleIds[i].lastIndexOf("*");
			if(po > -1) {
				compareId = this.m_draggbleIds[i].substring(0, po);
				findElt = this.getParentEltInclude(a_element, compareId, a_searchLevel);
			}
			else {
				compareId = this.m_draggbleIds[i];
				findElt = this.getParentEltExactly(a_element, compareId, a_searchLevel);
			}
			
			if( findElt != null ) return findElt;
		}

		return null;
	},

	getParentEltExactly : function ( a_element, a_searchId, a_searchLevel )
	{
		var parentElt = a_element;
	    for(var idex=0; idex<a_searchLevel; idex++ )
	    {
			if( parentElt == null ) return null;
			
			if (parentElt.id == a_searchId)
	        {
	            return parentElt;
	        }
			
	        parentElt = parentElt.parentNode;
	    }
		
		return null;
	},

	getParentEltInclude : function ( a_element, a_searchId, a_searchLevel )
	{
		var parentElt = a_element;
	    for(var idex=0; idex<a_searchLevel; idex++ )
	    {
			if( parentElt == null ) return null;
			
			if (parentElt.id!=null && parentElt.id.indexOf(a_searchId) > -1)
	        {
	            return parentElt;
	        }
			
	        parentElt = parentElt.parentNode;
	    }
		
		return null;
	},

	getTarget : function (a_event)
	{
		var srcElem = a_event.srcElement ? a_event.srcElement : a_event.target;
		return this.getParentElt(srcElem, 10);
	},

	onMouseDown : function (a_event)
	{
		//alert(1);
		var evt = a_event==null ? event : a_event;
		
		if( evt.button!=0 && evt.button!=1) return;	// left mouse button click
		
		//alert("document.body.scrollTop=" + document.body.scrollTop);
		
	    var targetElt = this.getTarget ( evt );
		if(targetElt != null) {

			if( this.m_controlObject.clearTimer ) this.m_controlObject.clearTimer();
			else return;
			
			this.isStartDragging = true;
			this.m_dragHeader = targetElt;
			var pos = portalPage.getUtility().getAbsolutePosition ( this.m_dragHeader );
			this.m_dragHeader.style.zIndex = "999";
			this.m_dragX = evt.clientX - pos.m_x;
			this.m_dragY = evt.clientY - pos.m_y;
			/*
			if (portalPage.getUtility().getIEVersionNumber()>5)
			{
				this.m_dragHeader.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
				//this.m_dragHeader.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=65)";
			}
			else
			{
				this.m_dragHeader.style.opacity = "0.5";
				//this.m_dragHeader.style.opacity = "0.65";
				this.m_dragHeader.className = "header-drag";
			}
			*/
			this.m_debugger.printCoordinate(evt, this.m_dragHeader);
			
		    if (this.m_dragHeader.setCapture)
		    {
		    	this.m_dragHeader.setCapture ();
			}
			else
			{
				document.body.addEventListener ( "mousemove",this,true);
			}
		}
		else {
			return;
		}

		this.cancelEvent ( evt );
	},
	
	onMouseMove : function ( a_event )
	{
		var evt = a_event==null ? event : a_event;

		if (this.isStartDragging == false) return;
		
		/*
		if (document.all)	// it is IE
		{
			portalPage.getUtility().showControl (this.m_dragHeader);

			if (!this.m_dragHeader.overlap) {
				this.m_dragHeader.overlap = new Array ();
			}
		
			//portalPage.getUtility().hideControl ("IFRAME", dialogElem);
			//portalPage.getUtility().hideControl ("SELECT", this.m_dragHeader);
		}
		*/
		
		if( this.m_dragHeader ) {
			if (this.m_dragHeader.style.display=="none")
			{
				this.m_dragHeader.style.display = "";
			}
			
			this.m_dragHeader.style.left = evt.clientX - this.m_dragX  + "px";
			this.m_dragHeader.style.top = evt.clientY - this.m_dragY + "px";
			
			this.m_debugger.printCoordinate(evt, this.m_dragHeader);
		}

	    // Prevent text being selected when the header is dragged by the mouse
	    this.cancelEvent(evt);
	},

	onMouseUp : function ( a_event )
	{
		if( this.isStartDragging == false ) return;
		
		var evt = a_event==null ? event : a_event;
		if( evt.button!=0 && evt.button!=1) return;	// left mouse button click

	    if (this.m_dragHeader!=null)
	    {
	        if (this.m_dragHeader.releaseCapture)
	        {
	        	this.m_dragHeader.releaseCapture ();
			}
			else
			{
				document.body.removeEventListener ( "mousemove",this,true );
				document.body.removeEventListener ( "mouseup",this,true );
			}

	        this.m_dragHeader = null;
			if( this.m_controlObject.refreshPortletSelector ) {
				this.m_controlObject.refreshPortletSelector();
			}
	    }

		this.isStartDragging = false;
	},
	
	cancelEvent : function (a_event) {
		if (document.all) {	// it is IE
			a_event.cancelBubble = true;
			a_event.returnValue = false;
		} else {
			a_event.preventDefault ();
			a_event.stopPropagation ();
		}
	}
	/*
	cancelEvent : function (a_event) {
		if (a_event.preventDefault) {
			a_event.preventDefault ();
			a_event.stopPropagation ();
		} else {
			a_event.cancelBubble = false;
			a_event.returnValue = false;
		}
	}
	*/
};

enview.util.DragDropMgr = function(a_draggbleElt, a_draggbleId)
{
    // Reference to draggable element
    this.m_draggableElt = document.body;
    this.m_draggbleIds = a_draggbleId.split(",");
	this.m_dropAreas = new Array();

    this.m_dragHeader = null;
    this.m_dragX = 0;
    this.m_dragY = 0;
    
    this.isStartDragging = false;
	
	this.m_debugger = new enview.util.Debugger( 'DebuggerDisplay' );
	//this.m_debugger.show();
}

/**
 * Attach event handlers to the table element
 */
enview.util.DragDropMgr.prototype =
{
	m_draggableElt : null,
    m_draggbleIds : null,
	m_dropAreas : null,
	m_exceptDropArea : null,
	m_currentDropArea : null,
	m_dragObject : null,
    m_dragHeader : null,
    //m_dragIndex : 0,
	m_dragX : 0,
    m_dragY : 0,
    isStartDragging : false,
	m_debugger : null,
	m_dragObjectArea : null,
	m_dragChildMap : null,
	
	attach : function ()
	{
	    var thisObj = this;
	    //this.m_draggableElt.onclick = function (event) { thisObj.onClick(event); };
	    this.m_draggableElt.onmousedown = function (event) { thisObj.onMouseDown(event); };
	    this.m_draggableElt.onmouseup = function (event) { thisObj.onMouseUp(event); };
	    this.m_draggableElt.onmousemove = function (event) { thisObj.onMouseMove(event); };
	    //this.m_draggableElt.ondragstart = function (event) { thisObj.onDragStart(event); };
	    //this.m_draggableElt.ondrop = function (event) { thisObj.onDrop(event); };
		
		//$(window).scroll(function() {
			//if ($(window).scrollTop() == $(document).height() - $(window).height()) {
		//		alert('End of Window');
			//}
		//});​
		//window.onscroll = function(event) {  alert("scroll"); };
	},

	handleEvent : function ( a_event )
	{
		if (a_event.type=="mousemove")
		{
			this.onMouseMove ( a_event );
		}
		else if (a_event.type=="mouseup")
		{
			this.onMouseUp ( a_event );
		}

	},
	
	addDropArea : function (a_elt)
	{
		var dropArea = new enview.util.DroppableArea(a_elt);
		this.m_dropAreas.push( dropArea );
		
		//var dropElement = a_elt.getDomElement();
		//var pos = portalPage.getUtility().getAbsolutePosition2(dropElement);
		//alert("id=" + a_elt.getId() + ", x=" + pos.m_x + ", y=" + pos.m_y + ", width=" + dropElement.offsetWidth + ", height=" + dropElement.offsetHeight);
		
		return dropArea;
	},
	
	removeDropArea : function (obj)
	{
		for(var idx=0; idx<this.m_dropAreas.length; idx++) {
			if( this.m_dropAreas[idx] == obj ) {
				alert("found : length=" + this.m_dropAreas.length);
				this.m_dropAreas.splice( idx, 1 );
				alert("found : length=" + this.m_dropAreas.length);
			}
		}
	},
	
	setExceptDropArea : function (a_elt)
	{
		this.m_exceptDropArea = a_elt;
	},

	hasParentElt : function ( a_element,a_tag )
	{
	    return this.getParentElt(a_element,a_tag) != null;
	},

	getParentElt : function ( a_element, a_searchLevel )
	{
		//alert("a_element.nodeName=" + a_element.nodeName);
		if (!a_element.nodeName)
		{
			return null;
		}
		
		var findElt = null;
		var compareId = "";
		for(var i=0; i<this.m_draggbleIds.length; i++) {
			var po = this.m_draggbleIds[i].lastIndexOf("*");
			//alert("this.m_draggbleIds[i]=" + this.m_draggbleIds[i]);
			if(po > -1) {
				compareId = this.m_draggbleIds[i].substring(0, po);
				//alert("compareId=" + compareId);
				findElt = this.getParentEltInclude(a_element, compareId, a_searchLevel);
			}
			else {
				compareId = this.m_draggbleIds[i];
				findElt = this.getParentEltExactly(a_element, compareId, a_searchLevel);
			}
			
			if( findElt != null ) return findElt;
		}

		return null;
	},

	getParentEltExactly : function ( a_element, a_searchId, a_searchLevel )
	{
		var parentElt = a_element;
	    for(var idex=0; idex<a_searchLevel; idex++ )
	    {
			if( parentElt == null ) return null;
			
			if (parentElt.id == a_searchId)
	        {
	            return parentElt;
	        }
			
	        parentElt = parentElt.parentNode;
	    }
		
		return null;
	},

	getParentEltInclude : function ( a_element, a_searchId, a_searchLevel )
	{
		var parentElt = a_element;
	    for(var idex=0; idex<a_searchLevel; idex++ )
	    {
			//alert("parentElt=" + parentElt);
			if( parentElt == null ) return null;
			
			//alert("parentElt=" + parentElt.nodeName + ", id=" + parentElt.id + ", a_searchId=" + a_searchId);
			var id = parentElt.id;
			//alert("id="+ id);
			if (id != null && id.indexOf && id.indexOf(a_searchId) > -1)
	        {
				//alert("I'v got it [" + parentElt.id + "]");
	            return parentElt;
	        }
			
	        parentElt = parentElt.parentNode;
	    }
		
		return null;
	},

	getNextElt : function ( a_element,a_tag )
	{
		var node = a_element;

	    while (node!=null)
	    {
	        if (node.nodeName.toLowerCase()==a_tag.toLowerCase())
	        {
	            return node;
	        }
	        else
	        {
	            node = node.nextSibling;
	        }
	    }
	    return null;
	},

	getTarget : function (a_event)
	{
		var srcElem = a_event.srcElement ? a_event.srcElement : a_event.target;
		return this.getParentElt(srcElem, 6);
	},

	onMouseDown : function (a_event)
	{
		//alert("this.m_dropMgr=" + this.m_dropMgr);
		var evt = a_event==null ? event : a_event;
		var srcElem = evt.srcElement ? evt.srcElement : evt.target;
		if( srcElem.id != "zzzzzzz" ) {
			//alert(srcElem.id);
			return null;
		}
		/*
		if( evt.button!=0 && evt.button!=1) {
			var srcElem = evt.srcElement ? evt.srcElement : evt.target;
			//alert("srcElem.id=" + srcElem.parentNode.id);
			if( srcElem.parentNode.id && srcElem.parentNode.id.indexOf("Enview.Fragment")>-1 ) {
				portalPage.showPortletEditor(srcElem.parentNode.id, srcElem)
			}
			return;	// right mouse button click
		}
		*/
		
	    var targetElt = this.getTarget ( evt );
		
		//alert("targetElt=" + targetElt + ", " + targetElt.ch);
		if(targetElt == null) return;

		//portalPage.setDragMode(true);
		portalPage.toggleDragMode(true);
		this.isStartDragging = this.createDraggingHeader ( evt, targetElt );

		this.cancelEvent ( evt );
	},

	createDraggingHeader : function ( a_event, targetElt )
	{
		var evt = a_event==null ? event : a_event;
		if( evt.button!=0 && evt.button!=1) return;	// left mouse button click
		
		var pos = null;
		
		var dragCopy = targetElt.getAttribute("dragCopy");
		//alert("dragCopy=" + dragCopy + ", node=" + targetElt.nodeName + ", id=" + targetElt.id);
		if( dragCopy == null ) return;
		
		var b = document.getElementById("BODYELEMENT");
		//alert("dragCopy=" + dragCopy + ", event=" + evt.clientX + "," + evt.clientY + ", scrollTop=" + document.documentElement.scrollTop); //window.pageYOffset); //
		if( dragCopy == "true" ) {
			
			this.m_dragHeader = targetElt;
			//this.m_dragHeader = targetElt.cloneNode ( true );
			this.m_dragHeader.style.position = "relative";
			this.m_dragHeader.style.borderStyle = "solid";
			this.m_dragHeader.style.borderWidth = "1px";
			this.m_dragHeader.style.borderColor = "#0000FF";
			//this.m_dragHeader.style.width = "100px";
			//this.m_dragHeader.style.height = "50px";
			//this.m_dragIndex = this.dragItem.cellIndex;
			this.m_dragHeader.style.zIndex = "999";
			this.m_dragHeader.style.visibility="visible";
			this.m_dragHeader.style.background="#FFFFFF";
			
			/*
			// We hide the hide until it is being moved
			//this.m_dragHeader.style.display = "none";
			//targetElt.insertBefore ( this.m_dragHeader, null );
			//document.body.insertBefore ( this.m_dragHeader, null );
			//targetElt.style.display = 'none';
			
			this.m_dragHeader.style.position = "absolute";
			pos = portalPage.getUtility().getAbsolutePosition ( this.m_dragHeader );
			alert("m_orgX=" +this.m_orgX + ", m_orgY=" + this.m_orgY);
			this.m_dragHeader.style.position = "relative";


			//this.m_dragHeader.style.left = (pos.m_x - 0) + "px";
			//this.m_dragHeader.style.top = (pos.m_y - 20) + "px";
			//this.m_dragX = evt.clientX + 30; // - pos.m_x;
			//this.m_dragY = evt.clientY + 20; // - pos.m_y;
			*/
			this.m_dragX = evt.clientX;
			this.m_dragY = evt.clientY;
			this.m_dragHeader.style.left = "0px";
			this.m_dragHeader.style.top = "0px";
		}
		else {
			//this.m_dragObject = targetElt.getAttribute("model");
			this.m_dragObject = portalPage.getModelMap().get( targetElt.id );
			//alert(targetElt.id + "," + targetElt.nodeName + "," + this.m_dragObject.m_type);
			this.m_dragHeader = this.m_dragObject.getDomElement();
			//alert( this.m_dragHeader.getAttribute("class") );
			this.m_dragObject.showDrag();
			this.m_dragObject.disableDecorator();
			
			//alert(this.m_dragObject.m_id + "," + this.m_dragObject.getUserMode());
			if( this.m_dragObject.getUserMode() == true ) {
				this.m_dragObject.unbindHover();
				var buttonArea = this.m_dragObject.getButtonArea().getDomElement();
				buttonArea.style.display = "";
			}
			var pos = portalPage.getUtility().getAbsolutePosition ( this.m_dragHeader );
			//alert("m_orgX=" +pos.m_x + ", m_orgY=" + pos.m_y);
			this.m_dragX = pos.m_x + 10 ;
			this.m_dragY = pos.m_y + 10;
			
			//this.m_dragX = evt.clientX;
			//this.m_dragY = evt.clientY;
			
			//alert(this.m_dragObject.getId());
			var dragElement = this.m_dragObject.getDomElement();
			var pos = portalPage.getUtility().getAbsolutePosition2(dragElement);
			this.m_dragObjectArea = new enview.util.Rectangle(pos.m_x, pos.m_y, dragElement.offsetWidth, dragElement.offsetHeight);
			
			this.m_dragChildMap = new Map();
			this.m_dragObject.getChildObjectIds( this.m_dragChildMap );
			//alert("childSize=" + this.m_dragChildMap.getSize());
			//alert(this.m_dragObject.getId());
			//$("#" + this.m_dragObject.getId()).draggable({ scroll: true  });
		}
		
		//this.m_debugger.printCoordinate(evt, this.m_dragHeader);
		
	    if (this.m_dragHeader.setCapture)
	    {
	    	this.m_dragHeader.setCapture ();
		}
		else
		{
			document.body.addEventListener ( "mousemove",this,true);
			//this.m_dragHeader.addEventListener ( "mouseup",this,true);
			//document.body.addEventListener ( "mouseup",this,true);
		}
		
		return true;
	},

	onMouseMove : function ( a_event )
	{
	    var evt = a_event==null ? event : a_event;
		
		if (this.isStartDragging == false) return;
		if (this.m_dragHeader == null) return;
		
		/*
		if (document.all)	// it is IE
		{
			portalPage.getUtility().showControl (this.m_dragHeader);

			if (!this.m_dragHeader.overlap) {
				this.m_dragHeader.overlap = new Array ();
			}
		
			//utility.hideControl ("IFRAME", dialogElem);
			portalPage.getUtility().hideControl ("SELECT", this.m_dragHeader, portalPage.getPopupElement());
		}
		*/

	    if (this.m_dragHeader.style.display=="none")
	    {
	        this.m_dragHeader.style.display = "";
	    }
		
		this.drawDropArea( evt );
	    
	    //this.m_dragHeader.style.left = evt.clientX + "px";
		//this.m_dragHeader.style.top = evt.clientY + "px";
		this.m_dragHeader.style.left = evt.clientX - this.m_dragX  + "px";
		this.m_dragHeader.style.top = evt.clientY - this.m_dragY + "px";
		
		//this.m_dragHeader.style.pixelLeft = evt.clientX - this.m_dragX  + "px";
		//this.m_dragHeader.style.pixelTop = evt.clientY - this.m_dragY + "px";
		
		//this.m_debugger.printCoordinate(evt, this.m_dragHeader);

	    // Prevent text being selected when the header is dragged by the mouse
	    this.cancelEvent(evt);
	},

	
	onMouseUp : function ( a_event )
	{
		if( this.isStartDragging == false ) return;
		
		var evt = a_event==null ? event : a_event;
		if( evt.button!=0 && evt.button!=1) return;	// left mouse button click

	    if (this.m_dragHeader!=null)
	    {
	        //this.copyColumn ( this.m_dragIndex,this.m_thead.cellIndex );
			var dragCopy = this.m_dragHeader.getAttribute("dragCopy");
			if( dragCopy == null ) return;
			
			if( dragCopy == "true" ) {
				this.m_dragHeader.style.position = "";
				this.m_dragHeader.style.borderStyle = "none";
				if( this.m_currentDropArea != null ) {
					//alert("type=" + this.m_currentDropArea.getType());
					var id = this.m_dragHeader.getAttribute("portletId");
					var app = this.m_dragHeader.getAttribute("portletAppName");
					var name = this.m_dragHeader.getAttribute("portletName");
					var title = this.m_dragHeader.getAttribute("portletTitle");
					var uniqueId = this.m_dragHeader.getAttribute("uniqueId");
					var addValue1 = this.m_dragHeader.getAttribute("addValue1");
					var addValue2 = this.m_dragHeader.getAttribute("addValue2");
					var addValue3 = this.m_dragHeader.getAttribute("addValue3");
					this.m_currentDropArea.insert( id, app, name, title, uniqueId, addValue1, addValue2, addValue3 );
				}
			}
			else {
				this.m_dragObject.hideDrag();
				this.m_dragObject.enableDecorator();
				
				if( this.m_currentDropArea != null ) {
					this.m_currentDropArea.change( this.m_dragObject );
					portalPage.changeMaskPosition();
				}
				
				if (document.all)	// it is IE
				{
					if (this.m_dragHeader.overlap) {
						portalPage.getUtility().showControl( this.m_dragHeader );
					}
				}
			}
			
			if( this.m_currentDropArea != null ) {
				this.m_currentDropArea.hide();
				this.m_currentDropArea = null;
			}
			
			if (this.m_dragHeader.releaseCapture)
			{
				this.m_dragHeader.releaseCapture ();
			}
			else
			{
				document.body.removeEventListener ( "mousemove",this,true );
				document.body.removeEventListener ( "mouseup",this,true );
			}

	        this.m_dragHeader = null;
	    }

		this.isStartDragging = false;
		//portalPage.setDragMode(false);
		portalPage.toggleDragMode(false);
		if( this.m_dragObject.getUserMode() == true ) {
			this.m_dragObject.bindHover();
		}
	},

	drawDropArea : function (a_event)
	{
		var ax = a_event.clientX;
		var ay = a_event.clientY; // - document.body.scrollTop;
		var isFound = false;
		
		if( document.all ) { // IE
			//alert("document.documentElement.scrollTop=" + document.documentElement.scrollTop + ", document.body.scrollTop=" + document.body.scrollTop);
			
			ay += (document.body.scrollTop == 0) ? document.documentElement.scrollTop : document.body.scrollTop; 
		}
		else {
			ay += window.pageYOffset;
		}
		
		var pos = new enview.util.Point(ax, ay);
		if( this.m_dragObjectArea.isInclude(pos) ) {
			this.m_currentDropArea = null;
			return;
		}
		
		//alert("this.m_dropAreas.length=" + this.m_dropAreas.length);
		for(var idx=0; idx<this.m_dropAreas.length; idx++) {
			if( this.m_dragChildMap.containsKey(this.m_dropAreas[idx].getObject().getId()) == true ) {
				//alert("dragChildMap contain=" + this.m_dropAreas[idx].getObject().getId());
				continue;
			}
			
			if( this.m_dragHeader.id == this.m_dropAreas[idx].getObject().getId() ||
			   (this.m_exceptDropArea!=null && this.m_exceptDropArea.isInclude(ax, ay, this.m_dragObject) == true) ) {
			   //alert("dragHeader.id is equals");
				continue;
			}
				
			if( this.m_dropAreas[idx].isInclude(ax, ay, this.m_dragObject) == true ) {
				//alert("isFound true");
				isFound = true;
				break;
			}
		}
		
		if( isFound == true ) {
			//this.m_dropAreas[idx].show();
			if(this.m_currentDropArea!=null && this.m_currentDropArea!=this.m_dropAreas[idx]) {
				//this.m_currentDropArea.hide();
			}
			this.m_currentDropArea = this.m_dropAreas[idx];
			//alert("dropArea=" + this.m_currentDropArea.getObject().getId());
		}
		else if(this.m_currentDropArea != null) {
			//this.m_currentDropArea.hide();
			this.m_currentDropArea = null;
		}
	},

	cancelEvent : function (a_event) {
		if (document.all) {	// it is IE
			a_event.cancelBubble = true;
			a_event.returnValue = false;
		} else {
			a_event.preventDefault ();
			a_event.stopPropagation ();
		}
	}
	/*
	cancelEvent : function (a_event) {
		if (a_event.preventDefault) {
			a_event.preventDefault ();
			a_event.stopPropagation ();
		} else {
			a_event.cancelBubble = false;
			a_event.returnValue = false;
		}
	}
	*/
};

enview.util.DroppableArea = function(a_obj)
{
	this.m_object = a_obj;
	
	this.init();
}

enview.util.DroppableArea.prototype =
{
    m_object : null,
	m_area : null,
	m_isCurrent : false,
	
	init : function()
	{
		var elm = this.m_object.getDomElement();
		//alert("this.m_element.getType()=" + this.m_element.getType() + ", elm=" + elm);
		var pos = portalPage.getUtility().getAbsolutePosition2(elm);
		this.m_area = new enview.util.Rectangle(pos.m_x, pos.m_y, elm.offsetWidth, elm.offsetHeight);
	},
	getId : function() 
	{ 
		return this.m_object.getId(); 
	},
	getObject : function()
	{
		return this.m_object;
	},
	getDomElement : function()
	{
		return this.m_object.getDomElement();
	},
	setIsCurrent : function(isCurrent)
	{
		this.m_isCurrent = isCurrent;
	},
	isCurrent : function()
	{
		return this.m_isCurrent;
	},
	isInclude : function (a_x, a_y, dragObject)
	{
		var layoutType = this.m_object.getParent().getParent().getContentType();
		var dragType = dragObject.getContentType();
		//alert("layoutObj=" + layoutObj.getName());
		//alert("dragType=" + dragType + ", layoutType=" + layoutType + ", dragType == layoutType=" + (dragType==layoutType));
		if( dragType == null || dragType.length==0 || layoutType == null || layoutType.length==0 || dragType == layoutType ) {
			return this.m_object.isInclude(a_x, a_y);
		}
	},
	insert : function (id, app, name, title, uniqueId, addValue1, addValue2, addValue3)
	{
		this.m_object.getParent().insert( this.m_object, id, app, name, title, uniqueId, addValue1, addValue2, addValue3 );
		//this.m_object.getParent().insert( this.m_object.getParent(), id, app, name, title, uniqueId, addValue1, addValue2, addValue3 );
	},
	change : function (dragObject)
	{
		var dragParentObject = dragObject.getParent();
		dragParentObject.removeElement( dragObject );
		//alert("this.m_object.getParent()=" + this.m_object.getParent() + ", this.m_object.getParent().getParent()=" + this.m_object.getParent().getParent());
		this.m_object.getParent().change( this.m_object, dragObject );
		dragObject.setParent( this.m_object.getParent() );
	},
	show : function()
	{
		this.m_object.showArea();
	},
	hide : function()
	{
		this.m_object.hideArea();
	}
};

enview.util.Rectangle = function(a_x, a_y, a_width, a_height)
{
	this.m_left = a_x;
    this.m_top = a_y;
	this.m_width = a_width;
	this.m_height = a_height;
}

enview.util.Rectangle.prototype =
{
	m_left : null,
    m_top : null,
	m_width : null,
	m_height : null,
	
	isInclude : function (point)
	{
		return (this.m_left<=point.m_x && point.m_x<=(this.m_left+this.m_width) && this.m_top<=point.m_y && point.m_y<=(this.m_top+this.m_height))
	},
	change : function (l, t, w, h)
	{
		this.m_left = l;
	    this.m_top = t;
		this.m_width = w;
		this.m_height = h;
	}
};

enview.util.Point = function ( a_x,a_y )
{
	this.m_x = a_x;
	this.m_y = a_y;
}

enview.util.Point.prototype =
{
	m_x : null,
	m_y : null,
	
	getX : function() {
		return this.m_x;
	},
	getY : function() {
		return this.m_y;
	}
}

enview.util.Debugger = function (a_eltName) 
{
	this.m_debugger = document.getElementById( a_eltName );
}
enview.util.Debugger.prototype =
{
	show : function()
	{
		this.m_debugger.style.display = '';
	},
	
	hide : function()
	{
		this.m_debugger.style.display = 'none';
	},
	
	print : function (message)
	{
		this.m_debugger.innerHTML = message;
	},

	printCoordinate : function (evt, elt)
	{
		/*
		var pos = portalPage.getUtility().getAbsolutePosition ( elt );
		
		this.m_debugger.innerHTML = 
			"x=" + evt.clientX + ",y=" + evt.clientY + 
			", abs.x=" + pos.m_x + ",abs.y=" + pos.m_y + 
			", offsetLeft=" + elt.offsetLeft + ",offsetTop=" + elt.offsetTop +
			", offsetWidth=" + elt.offsetWidth + ",offsetHeight=" + elt.offsetHeight +
			", clientLeft=" + elt.clientLeft + ",clientTop=" + elt.clientTop +
			", clientWidth=" + elt.clientWidth + ",clientHeight=" + elt.clientHeight;
			", style.left=" + elt.style.left + ",style.top=" + elt.style.top;
		*/
	}
}

enview.util.Utility = function () {}
enview.util.Utility.prototype =
{
	
	getContextPath : function () 
	{
		//var offset = location.href.indexOf(location.host) + location.host.length;
		//return location.href.substring(offset,location.href.indexOf('/', offset+1));
		return portalPage.getContextPath();
	},
	getAbsolutePosition : function ( a_element )
	{
		var ay = 0;
		if( document.all ) { // IE
			ay += (document.body.scrollTop == 0) ? document.documentElement.scrollTop : document.body.scrollTop; 
		}
		else {
			ay += window.pageYOffset;
		}
		
	    var pos = new enview.util.Point ( 0,0 );

	    var elt = a_element;
	    while (elt.offsetParent!=null)
	    {
			//alert("parent type=" + elt.nodeName);
	        pos.m_x += elt.offsetLeft;
	        pos.m_y += elt.offsetTop;

	        elt = elt.offsetParent;
	    }
		
		pos.m_y -= ay;

	    return pos;
	},
	getAbsolutePosition2 : function ( a_element )
	{
	    var pos = new enview.util.Point ( 0,0 );

	    var elt = a_element;
	    while (elt.offsetParent!=null)
	    {
			//alert("parent type=" + elt.nodeName);
	        pos.m_x += elt.offsetLeft;
	        pos.m_y += elt.offsetTop;

	        elt = elt.offsetParent;
	    }
		
	    return pos;
	},
	hasSupport : function ()
	{
	    if (this.getIEVersionNumber()>5)
	    {
	        return true;
	    }

	    return (document.implementation!=null) && document.implementation.hasFeature ( "html","1.0" );
	},

	getIEVersionNumber : function ( ) 
	{
	    var ua = navigator.userAgent;
	    var MSIEOffset = ua.indexOf("MSIE ");
	    if (MSIEOffset == -1)
	    {
	        return 0;
	    }
	    else
	    {
	        return parseFloat(ua.substring(MSIEOffset + 5, ua.indexOf(";", MSIEOffset)));
	    }
	},
	
	findDomElements : function (resultArray, tagName, node)
	{
		if( node.hasChildNodes() == true ) {
			var child = null;
			var childrenCollection = node.childNodes;
			for(var idx=0; idx< childrenCollection.length; idx++){
				child = childrenCollection[idx];
				
				if( child.hasChildNodes() == true ) {
					this.findDomElements( resultArray, tagName, child );
				}
				
				if( child.tagName==tagName && resultArray!=null) {
					resultArray.push( child );
				}
			}
		}
	},
	
	hideControl : function (tagName, elm, popupElm)
	{
		for (var i = 0; i < document.all.tags(tagName).length; ++i)
		{
			var obj = document.all.tags(tagName)[i];
			
			/*
			if( popupElm!=null && popupElm.offsetWidth!=0 && popupElm.offsetHeight!=0 ) {
				if( this.isPopupControl(popupElm, obj) == true ) 
					continue;
			}
			*/
			
			if( obj != null && obj.style != null ) {
				obj.style.visibility = "hidden";
				elm.overlap[elm.overlap.length] = obj;
			}
			continue;
		}
	},
	/*
	hideControl : function (tagName, elm, popupElm)
	{
		var x = this.getX (elm);
		var y = this.getY (elm);
		var w = elm.offsetWidth;
		var h = elm.offsetHeight;
		
		//alert("x=" + x + ",y=" + y + ",w=" + w + ",h=" + h);

		var i;
		for (i = 0; i < document.all.tags(tagName).length; ++i)
		{
			var obj = document.all.tags(tagName)[i];
			
			if( popupElm!=null && popupElm.offsetWidth!=0 && popupElm.offsetHeight!=0 ) {
				if( this.isPopupControl(popupElm, obj) == true ) 
					continue;
			}
			
			if (!obj || !obj.offsetParent || obj.offsetWidth==0 || obj.offsetHeight==0)
				continue;
			
			if( this.isChildControl(elm, obj, popupElm) == true )
				continue;

			// check if the object and the subMenu overlap

			var ox = this.getX (obj);
			var oy = this.getY (obj);
			var ow = obj.offsetWidth;
			var oh = obj.offsetHeight;
			
			//alert("id=" + obj.id + ", ox=" + ox + ",oy=" + oy + ",ow=" + ow + ",oh=" + oh);

			if (ox > (x + w) || (ox + ow) < x)
				continue;
			if (oy > (y + h) || (oy + oh) < y)
				continue;

			// if object is already made hidden by a different
			// submenu then we dont want to put it on overlap list of
			// of a submenu a second time.
			// - bug fixed by Felix Zaslavskiy
			if(obj.style.visibility == "hidden")
				continue;

			//alert("elm.overlap=" + elm.overlap);
			//subMenu.cmOverlap.push (obj);
			elm.overlap[elm.overlap.length] = obj;
			obj.style.visibility = "hidden";
		}
		
		//alert("elm.overlap.length=" + elm.overlap.length);
	},
	*/
	
	isPopupControl : function (popupElm, obj)
	{
		//alert("popupElm.selectControl.length=" + popupElm.selectControl.length);
		if( popupElm.selectControl != null ) {
			for(var idx=0; idx<popupElm.selectControl.length; idx++) {
				if(popupElm.selectControl[idx] == obj)
					return true;
			}
		}
		
		return false;
	},
	
	isChildControl : function (parent, obj, popupElm)
	{
		var tmpObj = obj;
		while (tmpObj.offsetParent) {
			tmpObj = tmpObj.offsetParent;
			//alert("tmpObj.nodeName=" + tmpObj.nodeName);
			if(tmpObj == parent) {
				// check if popup element exist, hide
				if( popupElm!=null && popupElm.offsetWidth!=0 && popupElm.offsetHeight!=0 ) {
					x = this.getX (popupElm);
					y = this.getY (popupElm);
					w = popupElm.offsetWidth;
					h = popupElm.offsetHeight;
					
					ox = this.getX (tmpObj);
					oy = this.getY (tmpObj);
					ow = tmpObj.offsetWidth;
					oh = tmpObj.offsetHeight;
					
					//alert("x=" + x + ",y=" + y + ",w=" + w + ",h=" + h + " ox=" + ox + ",oy=" + oy + ",ow=" + ow + ",oh=" + oh);
					//(new enview.util.Debugger("DebuggerDisplay")).print("x=" + x + ",y=" + y + ",w=" + w + ",h=" + h + " ox=" + ox + ",oy=" + oy + ",ow=" + ow + ",oh=" + oh);
					
					if( x<(ox+ow) && ox<(x+w) && y<(oy+oh) && oy<(y+h) )
						return false;	// hide
				}		
				return true;	// show
			}
		}
		
		return false;
	},

	//
	// show the control hidden by the subMenu
	//
	showControl : function (elm)
	{
		if (elm.overlap)
		{
			var i;
			for (i = 0; i < elm.overlap.length; ++i)
				elm.overlap[i].style.visibility = "";
		}
		elm.overlap = null;
	},
	
	getX : function (obj)
	{
		var x = 0;

		do
		{
			x += obj.offsetLeft;
			obj = obj.offsetParent;
		}
		while (obj);
		return x;
	},

	getY : function (obj)
	{
		var y = 0;
		do
		{
			y += obj.offsetTop;
			obj = obj.offsetParent;
		}
		while (obj);
		return y;
	},
	// Save a value in a non-persistent cookie
	setCookie : function ( a_name,a_value )
	{
	    document.cookie = a_name + "=" + a_value;
	},
	// Get a value from a cookie
	getCookie : function ( a_name )
	{
	    var re = new RegExp( "(\;|^)[^;]*(" + a_name + ")\=([^;]*)(;|$)" );
	    var res = re.exec( document.cookie );
	    return res != null ? RegExp.$3 : null;
	},
	// Clear cookie (so the cookie is not sent to the server anymore)
	clearCookie : function ( a_name )
	{
	    var day = -1;

	    var expiryDate = new Date();
	    expiryDate.setTime( expiryDate.getTime() + day * 24 * 60 * 60 * 1000 );

	    var expires = "; expires=" + expiryDate.toGMTString();
	    document.cookie = a_name + "= " + expires;
	},
	getMaxHeight : function( elt )
	{
		var po = this.getAbsolutePosition( elt );
		if (document.all)	// it is IE
		{
			return (document.body.clientHeight - (po.getY()+45));
		}
		else {
			return (window.innerHeight - (po.getY()+45));
		}
	},
	getDialogPosition : function(width, height)
	{
		var pos = new enview.util.Point ( 0,0 );
		if (document.all)	// it is IE
		{
			pos.m_x = document.body.clientWidth;
			pos.m_y = document.body.clientHeight;
		}
		else {
			return (window.innerHeight - (po.getY()+45));
		}
		
		return pos;
	},
	setFieldFocus : function ( obj, lvS ) {
		if( obj.value == lvS ) obj.value = "";
	},
	setFieldBlur : function ( obj, lvS ) {
		if( obj.value == "" ) obj.value = lvS;
	},
	isAsciiCode : function ( a_event ) {
		var keyCode = 0;
		if (document.all)	// it is IE
		{
			keyCode = event.keyCode;
		}
		else {
			keyCode = a_event.which;
		}
		
		//alert("keyCode=" + keyCode);
		if( keyCode == 0 ) return false;
		
		if( keyCode==8 || keyCode==45 || keyCode==95 ||
			(48<=keyCode && keyCode<=57) || 
			(65<=keyCode && keyCode<=90) || 
			(97<=keyCode && keyCode<=122) ) {
			return true;
		}
		
		return false;
	},
	isDigit : function ( a_event ) {
		var keyCode = 0;
		if (document.all)	// it is IE
		{
			keyCode = event.keyCode;
		}
		else {
			keyCode = a_event.which;
		}
		
		if( keyCode == 0 ) return false;
		
		//alert("keyCode=" + keyCode);
		if( keyCode==8 || (48<=keyCode && keyCode<=57) ) {
			return true;
		}
		
		return false;
	},
	getFormData : function(dataStructure, form)
	{
		var param = "";
		var field = "";
		try {
			for(var i=0; i<dataStructure.length; i++) {
				field = form[dataStructure[i].fieldName];
				if (field.type == "select-one") {
					var si = field.selectedIndex;
					if (si >= 0) {
						value = field.options[si].value;
					}
				} 
				else if(field.type == "checkbox") {
					value = (field.checked) ? "true" : "false"
				}
				else {
					value = field.value;
				}
				param += dataStructure[i].fieldName + "=" + encodeURIComponent( value ) + "&";
			}
		}
		catch(e) {
			alert("getFormData [" + field + "] " + e.message);
		}
		return param;
		/*
		var param = "";
	    var value = "";
	    for (var i=0; i < form.elements.length; i++) {
			var field = form.elements[ i ];
			if (field.type == "select-one") {
				var si = field.selectedIndex;
				if (si >= 0) {
					value = field.options[si].value;
				}
			} 
			else if(field.type == "checkbox") {
				value = (field.checked) ? "true" : "false"
			}
			else {
				value = field.value;
			}
			
			param += field.name + "=" + encodeURIComponent( value ) + "&";
	    }
		return param;
		*/
	},
	setFormData : function(dataStructure, name, resultObject)
	{
		var field = "";
		try {
			var form = document.getElementById(name + "_EditForm");
			//alert("name=" + name + ", form=" + form);
			document.getElementById(name + "_isCreate").value = "false";
			//alert("dataStructure=" + dataStructure);
			for(var i=0; i<dataStructure.length; i++) {
				//alert("field=" + dataStructure[i].fieldName);
				field = form[dataStructure[i].fieldName];
				var value = eval("("+"resultObject." + dataStructure[i].fieldName + ")");
				if(field.type == "checkbox") {
					if( value == "true" ) {
						field.checked = true;
					}
					else {
						field.checked = false;
					}
				}
				else {
					field.value = value;
				}
			}
		}
		catch(e) {
			alert("setFormData [" + field + "] " + e.message);
		}
	},
	setFormDataFromXML : function(dataStructure, name, resultObject)
	{
		var field = "";
		try {
			var form = document.getElementById(name + "_EditForm");
			//alert("name=" + name + ", form=" + form);
			document.getElementById(name + "_isCreate").value = "false";
			//alert("dataStructure=" + dataStructure);
			for(var i=0; i<dataStructure.length; i++) {
				//alert("field=" + dataStructure[i].fieldName);
				field = form[dataStructure[i].fieldName];
				var value = portalPage.getAjax().retrieveElementValue(dataStructure[i].fieldName, resultObject)
				if(field.type == "checkbox") {
					if( value == "true" ) {
						field.checked = true;
					}
					else {
						field.checked = false;
					}
				}
				else {
					field.value = value;
				}
			}
		}
		catch(e) {
			alert("setFormDataFromXML [" + field + "] " + e.message);
		}
	},
	initFormData : function(dataStructure, name)
	{
		var field = "";
		try {
			var form = document.getElementById(name + "_EditForm");

			document.getElementById(name + "_isCreate").value = "true";
		
			for(var i=0; i<dataStructure.length; i++) {
				//alert("field=" + dataStructure[i].fieldName);
				field = form[dataStructure[i].fieldName];
				if(field.type == "checkbox") {
					field.checked = true;
				}
				else {
					field.value = "";
				}
			}
		}
		catch(e) {
			alert("initFormData [" + field + "] " + e.message);
		}
	},
	setListData : function(name, pkColumns, listColumns, contextPath, resultObject) 
	{
		var searchElem = document.getElementById(name + "_SearchForm");
		var listElem = document.getElementById(name + "_ListForm");
		var bodyElem = document.getElementById(name + "_ListBody");
		var iteratorElem = document.getElementById(name + "_PAGE_ITERATOR");
		var messageElem = document.getElementById(name + "_ListMessage");
		var selectFunc = new Function( "a" + name + ".doSelect(this)" );
	    var tr_tag = null;
	    var td_tag = null;

		(new enview.util.CheckBoxUtil()).unChkAll( listElem );
		for(; bodyElem.hasChildNodes(); )
			bodyElem.removeChild( bodyElem.childNodes[0] );

		var page_no = searchElem.elements[ "pageNo" ].value;
		var page_size = searchElem.elements[ "pageSize" ].value;
		
		for(var i=0; i<resultObject.Data.length; i++) {
			tr_tag = document.createElement('tr');
			tr_tag.id = name + "_ListForm:" + name + "[" + i + "]";
			tr_tag.onmouseover = new Function("whenListMouseOver(this)");
			tr_tag.onmouseout = new Function("whenListMouseOut(this)");
			tr_tag.setAttribute("ch", i);
			tr_tag.setAttribute("style", "cursor:pointer;");
			if( i % 2 == 0 ) {
				tr_tag.setAttribute("class", "even");
				tr_tag.setAttribute("className", "even");
			}
			else {
				tr_tag.setAttribute("class", "odd");
				tr_tag.setAttribute("className", "odd");
			}
			
			td_tag = document.createElement('td');
			td_tag.align = "center";
			td_tag.setAttribute("class", "webgridbody");
			td_tag.setAttribute("className", "webgridbody");
			td_tag.innerHTML = "<input type=\"checkbox\" id=\"" + name + "[" + i + "].checkRow\" class=\"webcheckbox\"/>";
			for(var j=0; j<pkColumns.length; j++) {
				td_tag.innerHTML += "<input type=\"hidden\" id=\"" + name + "[" + i + "]." + pkColumns[j] + "\" value=\"" + eval("("+"resultObject.Data[ i ]." + pkColumns[j] + ")") + "\"/>";
			}
			
			tr_tag.appendChild( td_tag );
			
			td_tag = document.createElement('td');
			td_tag.setAttribute("class", "webgridbody");
			td_tag.setAttribute("className", "webgridbody");
			td_tag.innerHTML = "<span>" + (((page_no-1) * page_size) + i + 1) + "</span>";
			tr_tag.appendChild( td_tag );
		
			for(var j=0; j<listColumns.length; j++) {
				td_tag = document.createElement('td');
				td_tag.setAttribute("class", "webgridbody");
				td_tag.setAttribute("className", "webgridbody");
				td_tag.onclick = selectFunc;
				td_tag.align = "left";
				td_tag.innerHTML += "<span class=\"webgridrowlabel\">&nbsp;" + eval("("+"resultObject.Data[ i ]." + listColumns[j] + ")") + "</span>";
				//alert(td_tag.innerHTML);
				tr_tag.appendChild( td_tag );
			}

			bodyElem.appendChild( tr_tag );
		}

		if( messageElem ) {
			if(resultObject.Data.length == 0) {
				messageElem.innerHTML = "" + portalPage.getMessageResource('ev.info.notFoundData') + "";
			}
			else {
				messageElem.innerHTML = "" + portalPage.getMessageResourceByParam('ev.info.resultSize', resultObject.TotalSize) + "";
			}
		}
		if( iteratorElem ) {
			var pageNo = searchElem.elements[ "pageNo" ].value;
			var pageSize = searchElem.elements[ "pageSize" ].value;
			var pageFunction = searchElem.elements[ "pageFunction" ].value;
			var formName = searchElem.elements[ "formName" ].value;
			iteratorElem.innerHTML = 
					(new enview.util.PageNavigationUtil()).getPageIteratorHtmlString(pageNo, pageSize, resultObject.TotalSize, formName, pageFunction, contextPath);
		}
	},
	setListDataKaistLink : function(name, pkColumns, listColumns, contextPath, resultObject) 
	{
		var searchElem = document.getElementById(name + "_SearchForm");
		var listElem = document.getElementById(name + "_ListForm");
		var bodyElem = document.getElementById(name + "_ListBody");
		var iteratorElem = document.getElementById(name + "_PAGE_ITERATOR");
		var messageElem = document.getElementById(name + "_ListMessage");
		var selectFunc = new Function( "a" + name + ".doSelect(this)" );
	    var tr_tag = null;
	    var td_tag = null;

		(new enview.util.CheckBoxUtil()).unChkAll( listElem );
		for(; bodyElem.hasChildNodes(); )
			bodyElem.removeChild( bodyElem.childNodes[0] );

		var page_no = searchElem.elements[ "pageNo" ].value;
		var page_size = searchElem.elements[ "pageSize" ].value;
		
		for(var i=0; i<resultObject.Data.length; i++) {
			tr_tag = document.createElement('tr');
			tr_tag.id = name + "_ListForm:" + name + "[" + i + "]";
			tr_tag.onmouseover = new Function("whenListMouseOver(this)");
			tr_tag.onmouseout = new Function("whenListMouseOut(this)");
			tr_tag.setAttribute("ch", i);
			tr_tag.setAttribute("style", "cursor:pointer;");
			if( i % 2 == 0 ) {
				tr_tag.setAttribute("class", "even");
				tr_tag.setAttribute("className", "even");
			}
			else {
				tr_tag.setAttribute("class", "odd");
				tr_tag.setAttribute("className", "odd");
			}
			
			td_tag = document.createElement('td');
			td_tag.align = "center";
			td_tag.setAttribute("class", "webgridbody");
			td_tag.setAttribute("className", "webgridbody");
			td_tag.innerHTML = "<input type=\"checkbox\" id=\"" + name + "[" + i + "].checkRow\" class=\"webcheckbox\"/>";
			for(var j=0; j<pkColumns.length; j++) {
				td_tag.innerHTML += "<input type=\"hidden\" id=\"" + name + "[" + i + "]." + pkColumns[j] + "\" value=\"" + eval("("+"resultObject.Data[ i ]." + pkColumns[j] + ")") + "\"/>";
			}
			
			tr_tag.appendChild( td_tag );
			
			td_tag = document.createElement('td');
			td_tag.setAttribute("class", "webgridbody");
			td_tag.setAttribute("className", "webgridbody");
			td_tag.innerHTML = "<span>" + (((page_no-1) * page_size) + i + 1) + "</span>";
			//tr_tag.appendChild( td_tag );
		
			for(var j=0; j<listColumns.length; j++) {
				td_tag = document.createElement('td');
				td_tag.setAttribute("class", "webgridbody");
				td_tag.setAttribute("className", "webgridbody");
				td_tag.onclick = selectFunc;
				td_tag.align = "left";
				td_tag.innerHTML += "<span class=\"webgridrowlabel\">&nbsp;" + eval("("+"resultObject.Data[ i ]." + listColumns[j] + ")") + "</span>";
				//alert(td_tag.innerHTML);
				tr_tag.appendChild( td_tag );
			}

			bodyElem.appendChild( tr_tag );
		}

		if( messageElem ) {
			if(resultObject.Data.length == 0) {
				messageElem.innerHTML = "" + portalPage.getMessageResource('ev.info.notFoundData') + "";
			}
			else {
				messageElem.innerHTML = "" + portalPage.getMessageResourceByParam('ev.info.resultSize', resultObject.TotalSize) + "";
			}
		}
		if( iteratorElem ) {
			var pageNo = searchElem.elements[ "pageNo" ].value;
			var pageSize = searchElem.elements[ "pageSize" ].value;
			var pageFunction = searchElem.elements[ "pageFunction" ].value;
			var formName = searchElem.elements[ "formName" ].value;
			iteratorElem.innerHTML = 
					(new enview.util.PageNavigationUtil()).getPageIteratorHtmlString(pageNo, pageSize, resultObject.TotalSize, formName, pageFunction, contextPath);
		}
	}
}


enview.util.PageNavigationUtil = function () {  }
enview.util.PageNavigationUtil.prototype =
{
	getPageIteratorHtmlString : function(pageNo, pageSize, totalCount, formName, scriptName, rootPath) 
	{
		var contextPath = portalPage.getContextPath();
		var PAGE_UNIT = 10;
		var FIRST_IMAGE = contextPath + "/images/bbs/bbs_first.gif";
		var PREVIOUS_IMAGE = contextPath + "/images/bbs/bbs_previous.gif";
		var NEXT_IMAGE = contextPath + "/images/bbs/bbs_next.gif";
		var LAST_IMAGE = contextPath + "/images/bbs/bbs_last.gif";
		var IMAGE_WIDTH = "13";
		var IMAGE_HEIGHT = "15";
		var STYLE_CLASS = "pageNavigation";
	
		var maxPage = Math.floor((totalCount - 1) / pageSize) + 1;
		pageNo = pageNo > maxPage ? maxPage : pageNo;
		var beginUnitPage = Math.floor(((pageNo - 1) / PAGE_UNIT)) * PAGE_UNIT + 1;
		var endUnitPage = beginUnitPage + (PAGE_UNIT - 1);
		
		//alert("totalCount=" + totalCount + ", maxPage=" + maxPage + ", pageNo=" + pageNo + ", beginUnitPage=" + beginUnitPage + ", endUnitPage=" + endUnitPage);

		var navigationHtml = "";
		
		navigationHtml += "<table border='0' cellspacing='0' cellpadding='0' class='" + STYLE_CLASS + "'><tr><td>";
		//if (pageNo >= PAGE_UNIT + 1)
		if ( pageNo != 1 )
		{
			navigationHtml +=
				"<a href=\"javascript:"
					//+ scriptName + "('" + formName + "'," + ((pageNo - PAGE_UNIT > 1) ? pageNo - PAGE_UNIT : 1) + ")"
					+ scriptName + "('" + formName + "', 1)"
					+ "\">";
			navigationHtml +=
				"<img src='"
					+ FIRST_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'/></a>&nbsp;";
		}
		else
		{
			navigationHtml +=
				"<img diabled='true' src='"
					+ FIRST_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'/>&nbsp;";
		}
		
		var prevUnitPage = Math.floor(((pageNo - 1) / PAGE_UNIT)) * PAGE_UNIT - PAGE_UNIT + 1; 
		if (pageNo > 1)
		//if (prevUnitPage >= 1)
		{
			var newNo = parseInt(pageNo) - 1;
			navigationHtml +=
				"<a href=\"javascript:"
					//+ scriptName + "('" + formName + "'," + prevUnitPage + ")"
					+ scriptName + "('" + formName + "'," + newNo + ")"
					+ "\">";
			navigationHtml += 
				"<img src='" 
					+ PREVIOUS_IMAGE 
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'/></a>&nbsp;&nbsp;&nbsp;";
		}
		else
		{
			navigationHtml +=
				"<img src='"
					+ PREVIOUS_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'/>&nbsp;&nbsp;&nbsp;";
		}
		if (totalCount == "0")
		{
			navigationHtml += "1&nbsp;&nbsp;&nbsp;";
		}
		else
		{
			var endp = (endUnitPage > maxPage) ? maxPage : endUnitPage;
			for (var i = beginUnitPage; i <= endp; i++)
			{
				if (i == pageNo)
				{
					navigationHtml += "<font color='#DF5D16'><strong>" + i + "</strong></font>&nbsp;&nbsp;&nbsp;";
				}
				else
				{
					navigationHtml +=
						"<a href=\"javascript:"
							+ scriptName + "('" + formName + "'," + i + ")"
							+ "\" class='webnavigation'>";
					navigationHtml += i + "</a>&nbsp;&nbsp;&nbsp;";
				}
			}
		}
		
		var nextUnitPage = Math.floor(((pageNo - 1) / PAGE_UNIT)) * PAGE_UNIT + PAGE_UNIT + 1;
		if (pageNo < maxPage)
		//if (nextUnitPage < maxPage)
		{
			var newNo = parseInt(pageNo) + 1;
			navigationHtml +=
				"<a href=\"javascript:"
					//+ scriptName + "('" + formName + "'," + nextUnitPage + ")"
					+ scriptName + "('" + formName + "'," + newNo + ")"
					+ "\">";
			navigationHtml +=
				"<img src='" 
					+ NEXT_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'/></a>&nbsp;";
		}
		else
		{
			navigationHtml +=
				"<img src='"
					+ NEXT_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'/>&nbsp;";
		}
		
		//if (endUnitPage <= maxPage)
		if( pageNo != maxPage )
		{
			//var pnpu = (pageNo + PAGE_UNIT < maxPage) ? pageNo + PAGE_UNIT : maxPage;
			var pnpu = maxPage;
			navigationHtml +=
				"<a href=\"javascript:"
					+ scriptName + "('" + formName + "'," + pnpu + ")"
					+ "\">";
			navigationHtml +=
				"<img src='"
					+ LAST_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'/></a>";
		}
		else
		{
			navigationHtml +=
				"<img src='"
					+ LAST_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'/></a>";
		}
		
		navigationHtml += "</td></tr></table>";
		
		return navigationHtml;
	}
	/*
	getPageIteratorHtmlString : function(pageNo, pageSize, totalCount, formName, scriptName, rootPath) 
	{
		var contextPath = (rootPath != null) ? rootPath : portalPage.getContextPath();
		var PAGE_UNIT = 5;
		var FIRST_IMAGE = contextPath + "/images/bbs/bbs_first.gif";
		var PREVIOUS_IMAGE = contextPath + "/images/bbs/bbs_previous.gif";
		var NEXT_IMAGE = contextPath + "/images/bbs/bbs_next.gif";
		var LAST_IMAGE = contextPath + "/images/bbs/bbs_last.gif";
		var IMAGE_WIDTH = "13";
		var IMAGE_HEIGHT = "15";
		var STYLE_CLASS = "pageNavigation";
	
		var maxPage = Math.floor((totalCount - 1) / pageSize) + 1;
		pageNo = pageNo > maxPage ? maxPage : pageNo;
		var beginUnitPage = Math.floor(((pageNo - 1) / PAGE_UNIT)) * PAGE_UNIT + 1;
		var endUnitPage = beginUnitPage + (PAGE_UNIT - 1);
		
		//alert("totalCount=" + totalCount + ", maxPage=" + maxPage + ", pageNo=" + pageNo + ", beginUnitPage=" + beginUnitPage + ", endUnitPage=" + endUnitPage);

		var navigationHtml = "";
		
		navigationHtml += "<table border='0' cellspacing='0' cellpadding='0' class='" + STYLE_CLASS + "'><tr><td>";
		//if (pageNo >= PAGE_UNIT + 1)
		if ( pageNo != 1 )
		{
			navigationHtml +=
				"<a href=\"javascript:"
					//+ scriptName + "('" + formName + "'," + ((pageNo - PAGE_UNIT > 1) ? pageNo - PAGE_UNIT : 1) + ")"
					+ scriptName + "('" + formName + "', 1)"
					+ "\">";
			navigationHtml +=
				"<img src='"
					+ FIRST_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'></a>&nbsp;";
		}
		else
		{
			navigationHtml +=
				"<img diabled src='"
					+ FIRST_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'>&nbsp;";
		}
		
		var prevUnitPage = Math.floor(((pageNo - 1) / PAGE_UNIT)) * PAGE_UNIT - PAGE_UNIT + 1; 
		if (pageNo > 1)
		//if (prevUnitPage >= 1)
		{
			var newNo = parseInt(pageNo) - 1;
			navigationHtml +=
				"<a href=\"javascript:"
					//+ scriptName + "('" + formName + "'," + prevUnitPage + ")"
					+ scriptName + "('" + formName + "'," + newNo + ")"
					+ "\">";
			navigationHtml += 
				"<img src='" 
					+ PREVIOUS_IMAGE 
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'></a>&nbsp;&nbsp;&nbsp;";
		}
		else
		{
			navigationHtml +=
				"<img src='"
					+ PREVIOUS_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'>&nbsp;&nbsp;&nbsp;";
		}
		if (totalCount == "0")
		{
			navigationHtml += "1&nbsp;&nbsp;&nbsp;";
		}
		else
		{
			var endp = (endUnitPage > maxPage) ? maxPage : endUnitPage;
			for (var i = beginUnitPage; i <= endp; i++)
			{
				if (i == pageNo)
				{
					navigationHtml += "<font color='#DF5D16'><strong>" + i + "</strong></font>&nbsp;&nbsp;&nbsp;";
				}
				else
				{
					navigationHtml +=
						"<a href=\"javascript:"
							+ scriptName + "('" + formName + "'," + i + ")"
							+ "\" class='webnavigation'>";
					navigationHtml += i + "</a>&nbsp;&nbsp;&nbsp;";
				}
			}
		}
		
		var nextUnitPage = Math.floor(((pageNo - 1) / PAGE_UNIT)) * PAGE_UNIT + PAGE_UNIT + 1;
		if (pageNo < maxPage)
		//if (nextUnitPage < maxPage)
		{
			var newNo = parseInt(pageNo) + 1;
			navigationHtml +=
				"<a href=\"javascript:"
					//+ scriptName + "('" + formName + "'," + nextUnitPage + ")"
					+ scriptName + "('" + formName + "'," + newNo + ")"
					+ "\">";
			navigationHtml +=
				"<img src='" 
					+ NEXT_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'></a>&nbsp;";
		}
		else
		{
			navigationHtml +=
				"<img src='"
					+ NEXT_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'>&nbsp;";
		}
		
		//if (endUnitPage <= maxPage)
		if( pageNo != maxPage )
		{
			//var pnpu = (pageNo + PAGE_UNIT < maxPage) ? pageNo + PAGE_UNIT : maxPage;
			var pnpu = maxPage;
			navigationHtml +=
				"<a href=\"javascript:"
					+ scriptName + "('" + formName + "'," + pnpu + ")"
					+ "\">";
			navigationHtml +=
				"<img src='"
					+ LAST_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'></a>";
		}
		else
		{
			navigationHtml +=
				"<img src='"
					+ LAST_IMAGE
					+ "' width='"
					+ IMAGE_WIDTH
					+ "' height='"
					+ IMAGE_HEIGHT
					+ "' border='0' align='absmiddle'></a>";
		}
		
		navigationHtml += "</td></tr></table>";
		
		return navigationHtml;
	}
	*/
}

enview.portal.MessageBox = function (width, height, hideSpeed)
{
	if(portalPage.m_ajax.m_isShowMsgbox){
		this.m_utility = new enview.util.Utility();
		this.m_width = width;
		this.m_height = height;
		this.m_hideSpeed = hideSpeed;

		var msgBox = document.getElementById("EnviewMessageBox");
		if( msgBox == null ) {
			var dialogTag = document.createElement("div");
			dialogTag.id = "EnviewMessageBox";
			dialogTag.title = "Notice";
			dialogTag.style.left = "0px";
			dialogTag.style.top = "0px";
			dialogTag.style.display = "none";
			dialogTag.style.zIndex = "999";
			document.body.appendChild( dialogTag );
		}
		// 2013.07.15 smna jquery 1.9이상에서 오류가 발생하여 삭제 
		//	$("#EnviewMessageBox").dialog("destroy");

		$("#EnviewMessageBox").dialog({
			autoOpen: false,
			resizable: true,
			//width:width+20, 
			//height:height+50,
			modal: true,
			buttons: {
				"Close": function() {
					$(this).dialog('close');
				}
			}
		});
		
		this.init();
	}
}

enview.portal.MessageBox.prototype =
{
	m_domElement: null,
	m_utility : null,
	m_width : 0,
	m_height : 0,
	m_hideSpeed : 1500,
	
	init : function()
	{
		/*
		this.m_domElement = document.createElement("div");
		this.m_domElement.setAttribute("class", "portlet-editor");
		this.m_domElement.setAttribute("className", "portlet-editor");
		this.m_domElement.style.display = "none";

		document.body.appendChild( this.m_domElement );
		*/
		
		this.m_domElement = document.getElementById( "EnviewMessageBox" );
	},
	
	doShow: function ( msg, title, w, h, speed )
	{
		if(portalPage.m_ajax.m_isShowMsgbox){
			var buff = "";
			if( title ) {
				buff = "<span><b><font size='2'>" + title + "</font></b></span><hr>";
			}
			
			this.m_domElement.innerHTML = buff + "<span><b><font size='2'>" + msg + "</font></b></span>";
			if( w != null && h != null ) {
				$('#EnviewMessageBox').dialog('option', 'width', w);
				$('#EnviewMessageBox').dialog('option', 'height', h);
				$('#EnviewMessageBox').dialog('open');
			}
			else {
				$('#EnviewMessageBox').dialog('option', 'width', this.m_width+20);
				$('#EnviewMessageBox').dialog('option', 'height', this.m_height+20);
				$('#EnviewMessageBox').dialog('open');
			}

			//alert("speed=" + speed);
			if( speed ) {
				if( speed != -1 )
					setTimeout("enviewMessageBox.doHide()",speed);
			}
			else {
				setTimeout("enviewMessageBox.doHide()",this.m_hideSpeed);
			}
		}
	},	
	
	doHide: function ()
	{
		if(portalPage.m_ajax.m_isShowMsgbox){
			$('#EnviewMessageBox').dialog('close');
			/*
			if (document.all)	// it is IE
			{
				this.m_utility.showControl ( this.m_domElement );
			}
			this.m_domElement.style.display = "none";
			*/
		}
	},
	
	getDomElement: function ()
	{
		return this.m_domElement;
	}
}


function charLen(ch) {
    if (ch == null || ch.length == 0) {
      return 0;
    }

    var charCode = ch.charCodeAt(0);

    if (charCode <= 0x00007F) {
      return 1;
    } else if (charCode <= 0x0007FF) {
      return 2;
    } else if (charCode <= 0x00FFFF) {
      return 3;
    } else {
      return 4;
    }
  }

  // 문자열을 UTF-8로 변환했을 경우 차지하게 되는 byte 수를 리턴한다.
  function strLen(str) {
    if (str == null || str.length == 0) {
      return 0;
    }
    var len = 0;

    for (var i = 0; i < str.length; i++) {
      len += charLen(str.charAt(i));
    }
    return len;
}
  
function checkLength( e, maxLen ) {
	var val = $(e).val();
	var len =  strLen( val);
	// 최대길이가 주어지지 않았으면 해당 input의 속성에서 읽어온다.
	if( maxLen == null) {
   		maxLen = $(e).prop("maxlength");
	}
	// 최대길이가 지정되지 않았으면 무조건 오류 없음
	if( maxLen==null) {
		return true;
	}
	if( len > maxLen) {
		$(e).focus();
		alert( "<util:message key='kaist.error.maxLen'/> " + len + "/" + maxLen);
		return false;
	}
	return true;  
}
