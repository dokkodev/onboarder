if ( ! window.enview )
    window.enview = new Object();
	
if ( ! window.enview.portal )
    window.enview.portal = new Object();

enview.portal.PAGE_ID_NAME = "Enview_Page";
enview.portal.LAYOUT_ID_NAME = "Enview_Layout";
enview.portal.COLUMN_ID_NAME = "Enview_Column";
enview.portal.FRAGMENT_ID_NAME = "Enview_Fragment";
enview.portal.PORTLET_ID_NAME = "Enview_Portlet";
enview.portal.FRAGMENT_ID = "fid";
enview.portal.FRAGMENT_TYPE = "ftid";
enview.portal.LAYOUT = "layout";
enview.portal.PORTLET = "portlet";
//enview.portal.FRAGMENT_AREA_STYLE = "1px solid green";
enview.portal.DROP_AREA_STYLE = "1px dotted gray";
enview.portal.DRAG_AREA_STYLE = "1px solid blue";
enview.portal.FRAGMENT_AREA_STYLE = "1px dotted green";
//enview.portal.DROP_AREA_STYLE = "1px dotted red";
//enview.portal.DRAG_AREA_STYLE = "1px solid blue";
enview.portal.LAYOUT_UNIT = "%";
enview.portal.LAYOUT_MAX_SIZE = 1024;


enview.portal.Page = function()
{
	this.m_ajax = new enview.util.Ajax();
	this.m_enviewUtility = new enview.util.Utility();
	this.m_messageResource = new enview.portal.MessageResource();
	this.m_modelMap = new Map();

	//this.m_portletSelector = new enview.portal.PortletSelector();
	//this.m_portletEditor = new enview.portal.PortletEditor();
	//this.m_myPageEditor = new enview.portal.MyPageEditor();
	//this.m_aboutDlg = new enview.portal.About();
	
	this.m_emptyHandler = function()
	{
	  this.populate = function(data) 
	  { 
	  }
	  this.failure = function(msg)
	  {
		alert(msg);
	  }
	};  
	
	this.m_checkNoticeHandler = function()
	{
	  this.populate = function(data) 
	  { 
		var result = portalPage.m_ajax.retrieveElementValue("message", data);
		alert( result );
	  }
	  this.failure = function(msg)
	  {
		alert(msg);
	  }
	};  
}
enview.portal.Page.prototype =
{
	m_version : null,
	m_id : null,
	m_path : null,
	m_theme : null,
	m_themePath : null,
	m_rootLayout : null,
	m_userId : null,
	m_langKnd : "ko",
	m_domainId : "1",
	m_contextPath : null,
	m_servletPath : null,
	m_editMode : false,
	m_title : null,
	m_layout : null,
	m_messageResource : null,
	m_decoration : null,
	m_domElement : null,
	m_dragDropMgr : null,
	m_ajax : null,
	m_isDragMode : false,
	m_aboutDlg : null,
	m_tabPane : null,
	m_isPortletSelectorOn : false,
	m_isPortletEditorOn : false,
	m_enviewUtility : null,
	m_emptyHandler : null,
	m_checkNoticeHandler : null,
	m_currentZoomFactor : 100, // 현재비율
	m_maxZoomFactor : 200, // 최대비율(500으로하면 5배 커진다)
	m_minZoomFactor : 80, // 최소비율
	m_modelMap : null,
	m_modified : false,
	m_prevButtonArea : null,
	m_portletManager : null,
	m_principalId : null,
	m_groupPrincipalId : null,

	init : function( version, isEditing, userId, pageInfo, decorations, node, langKnd, domainId )
	{
		this.m_version = version;
		this.m_userId = userId;
		this.m_id = pageInfo.id;
		this.m_theme = pageInfo.theme;
		this.m_contextPath = pageInfo.contextPath;
		this.m_ajax.setContextPath( this.m_contextPath );
		this.m_servletPath = pageInfo.servletPath;
		this.m_themePath = pageInfo.themePath;
		this.m_path = pageInfo.path;
		this.m_title = pageInfo.title;
		this.m_layout = pageInfo.layout;
		this.m_decoration = decorations;
		this.m_langKnd = langKnd;
		this.m_domainId = domainId == null ? '1' : domainId;
		this.m_domElement = node;
		this.m_portletManager = new enview.portal.PortletManager();
		
		//alert(pageInfo.targetUrl);
		if( isEditing == "true" || this.m_servletPath == "/contentonly") {
			this.m_editMode = true;
			this.setEditMode(true);
		}
		else {
			this.m_editMode = false;
			this.setEditMode(false);
		}
		
		if( pageInfo.targetUrl != null && pageInfo.useIframe == "true" ) {
			var buff = "";
			buff += "<iframe name='" + "IframePortlet_" + pageInfo.id + "' ";
			buff += "id='IframePortlet_" + pageInfo.id + "' ";
			buff += "onload='iframe_autoresize(this)' ";
			buff += "src='" + pageInfo.targetUrl + "' ";
			buff += "scrolling='no' ";
			buff += "frameborder='0' ";
			buff += "style='width:100%;height:100%' ";
			buff += "></iframe>";
			var contentArea = document.getElementById("EnviewContentArea");
			contentArea.innerHTML = buff;
		}
	},
	setPrincipalId : function(principalId)
	{
		this.m_principalId = principalId;
	},
	getPrincipalId : function()
	{
		return this.m_principalId;
	},
	setGroupPrincipalId : function(principalId)
	{
		this.m_groupPrincipalId = principalId;
	},
	getGroupPrincipalId : function()
	{
		return this.m_groupPrincipalId;
	},
	getEditMode : function()
	{
		return this.m_editMode;
	},
	setEditMode : function(mode)
	{
		if( mode == true && this.m_rootLayout == null) {
			var data = this.m_portletManager.getPortletInfo();
			portalPage.initEditMode(data);
		}
		this.m_editMode = mode;
		this.changeMode(mode);
	},
	changeMode : function (editMode)
	{
		if( this.m_rootLayout != null ) {
			this.m_rootLayout.changeMode( editMode );
		}
	},
	initEditMode : function(fragment)
	{
		//this.m_dragDropMgr = new enview.util.DragDropMgr(this.m_domElement, "Enview_Fragment*,PortletSelector[*");
		//this.m_dragDropMgr = new enview.util.DragDropMgr(this.m_domElement, "Enview_Portlet_*,Enview_Layout_*,PortletSelector[*");
		this.m_dragDropMgr = new enview.util.DragDropMgr(this.m_domElement, "Enview_Portlet_*,Enview_Layout_*,PortletSelector[*");
		//this.m_dragDropMgr = new enview.util.DragDropMgr(this.m_domElement, "Enview_Portlet*,PortletSelector[*");
		this.m_dragDropMgr.attach();
		var node = document.getElementById("Enview_Layout_" + fragment.attribute.id);
		if( node ) {
			this.m_rootLayout = new enview.portal.Layout( this, node, fragment.attribute.columns, fragment.attribute.sizes );
			this.m_rootLayout.init( fragment );
			this.m_rootLayout.setRootLayout(true);
		}
		else {
			/*
			var portlet = $('.portlet');
			var iconArea = $('.portlet-title');
			
			portlet.hover(
				function(){ 
					prevArea = window.setTimeout(function() { 
						iconArea.css('position', 'absolute');
						iconArea.css('height', '0px');
						iconArea.css('width', (portlet.get(0).parentNode.offsetWidth - 10)+"px");
						iconArea.fadeIn(1000, function(){}); 
					}, 500);
				}, 
				function(){ 
					iconArea.css('display', 'none'); 
					window.clearTimeout(prevArea);
				}
			);
			*/
		}
	},
	checkModified : function()
	{
		if( this.m_modified == true ) {
			var ret = confirm( portalPage.getMessageResource('ev.info.modified') );
			if( ret == true ) {
				this.save();
			}
		}
	},
	save : function()
	{
		var fragmentInfo = "[";
		fragmentInfo += this.m_rootLayout.getFragmentInfo();
		fragmentInfo += "]";
		var param = "fragments=" + encodeURIComponent(fragmentInfo);
		//alert("final=" + fragmentInfo);
		
		//var ret = confirm("Are you sure ?");
		//if( ret == true ) {
			this.m_portletManager.savePortlet(param);
		//}
	},
	getVersion : function()
	{
		return this.m_version;
	},
	getUserId : function()
	{
		return this.m_userId;
	},
	getLangKnd : function()
	{
		return this.m_langKnd;
	},
	getDomainId : function()
	{
		return this.m_domainId;
	},
	getContextPath : function()
	{
		return this.m_contextPath;
	},
	getServletPath : function()
	{
		return this.m_servletPath;
	},
	getTitle : function()
	{
		return this.m_title;
	},
	setTitle : function(title)
	{
		this.m_title = title;
	},
	getLayout : function()
	{
		return this.m_layout;
	},
	getMessageResource : function( key )
	{
		return this.m_messageResource.getMessage(key);
	},
	getMessageResourceByParam : function()
	{
		var retMsg = null;
		var arr = arguments;
		//var regexp = /문자열/g;
		if( arr != null && arr.length>0 ) {
			retMsg = this.m_messageResource.getMessage( arr[0] );
			if( retMsg != null ) {
				for(var i=0; i<arr.length; i++) {
					var pattern = "{" + i + "}";
					retMsg = retMsg.replace(pattern, arr[i+1]);
				}
			}
		}
		
		return retMsg;
	},
	setMessageResource : function( key, val )
	{
		return this.m_messageResource.setMessage(key, val);
	},
	getDecoration : function()
	{
		return this.m_decoration;
	},
	getId : function()
	{
		return this.m_id;
	},
	getPath : function()
	{
		return this.m_path;
	},
	getTheme : function()
	{
		return this.m_theme;
	},
	getThemePath : function()
	{
		return this.m_themePath;
	},
	getType : function()
	{
		return enview.portal.PAGE_ID_NAME;
	},
	getDragDropMgr : function() 
	{ 
		return this.m_dragDropMgr; 
	},
	getUtility : function() 
	{ 
		return this.m_enviewUtility; 
	},
	getModelMap : function()
	{
		return this.m_modelMap;
	},
	getAjax : function()
	{
		return this.m_ajax;
	},
	getPortletManager : function()
	{
		return this.m_portletManager;
	},
	invokeAjax : function(action, names, values, handler, mimeType)
	{
		this.m_ajax.invoke(action, names, values, handler, mimeType);
	},
	toggleDragMode : function(isDragMode)
	{
		//this.m_isDragMode = (this.m_isDragMode == false) ? true : false;
		if( this.m_rootLayout != null ) {
			//this.m_rootLayout.toggleDragMode( isDragMode );
			
			var portlet = $('.portlet');
			var emptyPortlet = $('.portlet-empty');
			if( isDragMode == true ) {
				emptyPortlet.css('display', 'block');
				emptyPortlet.css('border', enview.portal.DROP_AREA_STYLE);
				portlet.css('border', enview.portal.DROP_AREA_STYLE);
			}
			else {
				emptyPortlet.css('display', 'none');
				portlet.css('border', '');
			}
		}
	},
	isDragMode : function()
	{
		return this.m_isDragMode;
	},
	setDragMode : function(mode)
	{
		this.m_isDragMode = mode;
	},
	getButtonArea : function()
	{
		return this.m_prevButtonArea;
	},
	setButtonArea : function(prevButtonArea)
	{
		this.m_prevButtonArea = prevButtonArea;
	},
	getPortletSelector : function()
	{
		if( portalPortletSelector == null ) {
			portalPortletSelector = this.m_portletManager.getPortletSelector();
		}
		return portalPortletSelector;
	},
	showPortletSelector : function(id, keyword)
	{
		var obj = this.m_modelMap.get( id );
		if( obj != null ) {
			if( portalPortletSelector == null ) {
				portalPortletSelector = this.m_portletManager.getPortletSelector();
			}
			portalPortletSelector.doShow(obj, keyword);
			this.m_dragDropMgr.setExceptDropArea( this.m_portletSelector );
		}
	},
	showPortletSelectorAll : function()
	{
		if( portalPortletSelector == null ) {
			portalPortletSelector = this.m_portletManager.getPortletSelector();
		}
		portalPortletSelector.doShow();
	},
	showPortletEditor : function(id)
	{
		var obj = this.m_modelMap.get( id );
		if( obj != null ) {
			if( obj.getType() == enview.portal.LAYOUT_ID_NAME ) {
				if( portalLayoutPortletEditor == null ) {
					portalLayoutPortletEditor = this.m_portletManager.getLayoutPortletEditor();
				}
				portalLayoutPortletEditor.show( obj );
			}
			else {
				if( portalPortletEditor == null ) {
					portalPortletEditor = this.m_portletManager.getPortletEditor();
				}
				portalPortletEditor.show( obj );
			}
		}
	},
	removePortlet : function(id)
	{
		if( confirm(this.m_messageResource.getMessage("ev.info.remove")) ) {
			var obj = this.m_modelMap.get( id );
			if( obj != null ) {
				obj.remove();
			}
		}
	},
	getGroupPageEditor : function()
	{
		if( portalGroupPageEditor == null ) {
			portalGroupPageEditor = this.m_portletManager.getGroupPagetEditor();
		}
		return portalGroupPageEditor;
	},
	getMyPageEditor : function()
	{
		if( portalMyPageEditor == null ) {
			portalMyPageEditor = this.m_portletManager.getMyPagetEditor();
		}
		return portalMyPageEditor;
	},
	showMyPageEditor : function(id, isCreate)
	{
		if( portalMyPageEditor == null ) {
			portalMyPageEditor = this.m_portletManager.getMyPagetEditor();
		}
		
		var elm = document.getElementById( "Enview.MyPage.TabHeader:" + id );
		if( isCreate ) {
			portalMyPageEditor.doCreate(id, elm);
		}
		else {
			portalMyPageEditor.doSelect(id, elm);
		}
		
		portalMyPageEditor.show(elm);
		document.getElementById("MyPageEditorDialog.SELECT_THEME").value = this.getTheme();
	},
	removeMyPage : function()
	{
		if( confirm(this.m_messageResource.getMessage("ev.info.remove")) ) {
			portalMyPageEditor.doRemove(this.m_userId);
		}
	},
	setDefaultMyPage : function()
	{
		portalMyPageEditor.setDefaultMyPage(this.m_userId, this.m_path);
	},
	setDefaultGroupPage : function()
	{
		portalMyPageEditor.setDefaultGroupPage(this.m_userId);
	},
	changeMaskPosition : function()
	{
		this.m_rootLayout.changeMaskPosition();
	},
	hideTabContextMenu : function()
	{
		if( myPageTabPane != null ) {
			myPageTabPane.m_contextMenu.hide();
		}
	},
	checkNotice : function(id)
	{
		var names = new Array();
		var values = new Array();
		var id = 0;
		names[id] = "method";
		values[id++] = "checknotice";
		names[id] = "noticeId";
		values[id++] = id;
		portalPage.invokeAjax("notice", names, values, new this.m_checkNoticeHandler(), "text/json"); 
	},
	closeNotice : function(id)
	{
		var names = new Array();
		var values = new Array();
		var id = 0;
		names[id] = "method";
		values[id++] = "closenotice";
		names[id] = "noticeId";
		values[id++] = id;
		portalPage.invokeAjax("notice", names, values, new this.m_emptyHandler(), "text/json"); 
	},
 	zoomIn : function() {
		if (this.m_currentZoomFactor < this.m_maxZoomFactor) {
			this.m_currentZoomFactor += 10; //25%씩 커진다.
		} else {
			return;
		}
		document.body.style.zoom = this.m_currentZoomFactor + "%";
	},
	zoomOut : function() {
		if (this.m_currentZoomFactor > this.m_minZoomFactor) {
			this.m_currentZoomFactor -= 10; //25%씩 작아진다.
		} else {
			return;
		}
		document.body.style.zoom = this.m_currentZoomFactor + "%";
	},
	showAbout : function()
	{
		if( this.m_aboutDlg == null ) {
			this.m_aboutDlg = new enview.portal.About();
			this.m_aboutDlg.init();
		}
		this.m_aboutDlg.doShow();
	},
	hideAbout : function()
	{
		this.m_aboutDlg.doHide();
	},
	setModified : function()
	{
		this.m_modified = true;
	}
}

enview.portal.Layout = function(parent, node, columns, sizes)
{
	this.m_parent = parent;
	this.m_domElement = node;
	if( node.id ) {
		this.m_id = node.id;
		this.m_fragmentId = node.id.substring(14);
		//alert("this.m_fragmentId=" + this.m_fragmentId);
		portalPage.m_modelMap.put(node.id, this);
	}

	this.m_domElement.setAttribute("dragCopy", "false");
	//this.m_domElement.style.border = "3 solid green";
	//alert("columns=" + columns + ", sizes=" + sizes);
	this.m_columns = columns;
	this.m_sizes = sizes;
	this.m_type = enview.portal.LAYOUT_ID_NAME;
	this.m_children = new Array();
}
enview.portal.Layout.prototype =
{
	m_id : null,
	m_parent : null,
	m_children : null,	// columns
	m_domElement : null,
	m_fragmentId : null,
	m_name : null,
	m_type : null,
	m_align : null,
	m_contentType : null,
	m_decorator : null,
	m_isRoot : false,
	m_columns : 0,
	m_sizes : null,
	m_columnUnit : "px",
	m_attribute : null,
	m_created : false,
	m_buttonArea : null,
	m_actionMask : 0,
	m_userMode : false,
	
	init : function (data)
	{
		if( data != null ) {
			this.m_attribute = data.attribute;
			this.m_fragmentId = this.m_attribute.id;
			this.m_id = "Enview_Layout_" + this.m_fragmentId;
			this.m_name = this.m_attribute.name;
			this.m_align = this.m_attribute.align;
			this.m_contentType = (data.attribute.contentType != "null") ? data.attribute.contentType : null;
			this.m_decorator = this.m_attribute.decorator;
			this.m_actionMask = data.attribute.actionMask;
			
			if( portalPage.getServletPath() == "/contentonly" || this.m_actionMask != 0 ) {
				if( this.m_parent.getType() == enview.portal.PAGE_ID_NAME ) {
					this.m_buttonArea = new enview.portal.PortletButtonArea(this, true);
					//var layoutButtonArea = document.getElementById("Enview_LayoutMask_" + this.m_fragmentId);
					//layoutButtonArea.style.backgroundColor = "#979faa";
					//layoutButtonArea.style.display = "";
					//layoutButtonArea.onmouseover = this.onMouseOver;
				}
				else {
					this.m_buttonArea = new enview.portal.PortletButtonArea(this, false);
					//var layoutButtonArea = document.getElementById("Enview_LayoutMask_" + this.m_fragmentId);
					//layoutButtonArea.style.backgroundColor = "#979faa";
					//layoutButtonArea.style.display = "";
					//layoutButtonArea.onmouseover = this.onMouseOver;
					//layoutButtonArea.onmouseout = this.onMouseOut;
				}
			}
			else {
				this.m_buttonArea = new enview.portal.PortletButtonArea(this, false);
			}
			
			if( data.column != null && data.column.length > 0 ) {
				//alert("data.column=" + data.column + ", data.column.length=" + data.column.length);
				for(var idx=0; idx<data.column.length; idx++) {
					var node = document.getElementById("Enview_Column_" + data.column[idx].attribute.id + "_" + data.column[idx].attribute.col);
					this.m_children[ idx ] = new enview.portal.Column( this, node, data.column[idx].attribute.columnSize );
					this.m_children[ idx ].init( data.column[idx] );
				}
			}
			else {
				//alert("this.m_sizes=" + this.m_sizes + ", this.m_columns=" + this.m_columns);
				var sizeArray = this.m_sizes.split(",");
				for(var idx=0; idx<this.m_columns; idx++) {
					var node = document.createElement('div');
					node.setAttribute("class", "portal-layout-cell");
					node.setAttribute("className", "portal-layout-cell");
					if( idx != (this.m_columns-1) ) {
						node.style.float = "left"
					}
					else {
						node.style.float = "right";
					}
					node.style.width = sizeArray[idx];
					this.m_domElement.appendChild( node );
					this.m_children[idx] = new enview.portal.Column(this, node, sizeArray[idx]);
					this.m_children[idx].init(null);
				}
			}
		}
		else {
			this.m_actionMask = 0x0000ffff;
			this.m_buttonArea = new enview.portal.PortletButtonArea(this, false);
			var layoutButtonArea = document.getElementById("Enview_LayoutMask_" + this.m_fragmentId);
			layoutButtonArea.style.backgroundColor = "#979faa";
			layoutButtonArea.style.display = "";
			//layoutButtonArea.onmouseover = this.onMouseOver;
			//layoutButtonArea.onmouseout = this.onMouseOut;
			
			var sizeArray = this.m_sizes.split(",");
			for(var idx=0; idx<this.m_columns; idx++) {
				var node = document.createElement('div');
				node.setAttribute("class", "portal-layout-cell");
				node.setAttribute("className", "portal-layout-cell");
				if( idx != (this.m_columns-1) ) {
					node.style.float = "left"
				}
				else {
					node.style.float = "right";
				}
				node.style.width = sizeArray[idx];
				this.m_domElement.appendChild( node );
				this.m_children[idx] = new enview.portal.Column(this, node, sizeArray[idx]);
				this.m_children[idx].init(null);
			}
		}
	},
	changeMode : function (editMode)
	{	
		if( editMode == true ) {
			//var layoutButtonArea = document.getElementById("Enview_LayoutMask_" + this.m_fragmentId);
			//layoutButtonArea.style.display = "";
			$('#LayoutEditIconArea_' + this.m_fragmentId).css('display', 'block');
			$('#Enview_Layout_' + this.m_fragmentId).css('display', 'block');
			this.m_buttonArea.setEnabled(true);
			this.m_buttonArea.doShow();
		}
		else {
			//var layoutButtonArea = document.getElementById("Enview_LayoutMask_" + this.m_fragmentId);
			//layoutButtonArea.style.display = "none";
			$('#LayoutEditIconArea_' + this.m_fragmentId).css('display', 'none');
			this.m_buttonArea.setEnabled(false);
			this.m_buttonArea.doHidden();
			
			var hasChildren = false;
			if( this.m_children != null ) {
				for(var idx=0; idx<this.m_children.length; idx++) {
					//alert("id=" + this.m_id + ",hasChildren=" + this.m_children[idx].hasChildren());
					var hasChild = this.m_children[idx].hasChildren();
					if( hasChild == true ) hasChildren = true;
				}
			}
			if( hasChildren == false ) {
				$('#Enview_Layout_' + this.m_fragmentId).css('display', 'none');
			}
		}
		
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				this.m_children[idx].changeMode( editMode );
			}
		}
	},
	getFragmentInfo : function(column, row)
	{
		var fragmentInfo = "{ \"fragment\" : {";
		if( this.m_parent != null && this.m_parent.getType() == enview.portal.PAGE_ID_NAME ) {
			fragmentInfo += "\"page_id\" : \"" + portalPage.getId() + "\",";
			fragmentInfo += "\"path\" : \"" + portalPage.getPath() + "\",";
		}
		else {
			fragmentInfo += "\"parent_id\" : \"" + this.m_parent.getParent().getFragmentId() + "\", ";
		}
		fragmentInfo += "\"fragment_id\" : \"" + this.m_fragmentId + "\", ";
		fragmentInfo += "\"name\" : \"" + this.m_name + "\", ";
		fragmentInfo += "\"align\" : \"" + this.m_align + "\", ";
		fragmentInfo += "\"content_type\" : \"" + this.m_contentType + "\", ";
		fragmentInfo += "\"action_mask\" : \"" + this.m_actionMask + "\", ";
		if( this.m_created == true ) {
			fragmentInfo += "\"created\" : \"true\", ";
		}
		else {
			fragmentInfo += "\"created\" : \"false\", ";
		}
		fragmentInfo += "\"type\" : \"layout\", ";
		if( column != null || row != null ) {
			fragmentInfo += "\"layout_row\" : \"" + row + "\", ";
			fragmentInfo += "\"layout_column\" : \"" + column + "\", ";
		}
		fragmentInfo += "\"layout_sizes\" : \"" + this.getColumnSizes();
		fragmentInfo += "\"}, ";
		fragmentInfo += "\"preference\" : {} }";
		
		//alert(fragmentInfo);
		
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				var subFrag = this.m_children[idx].getFragmentInfo( idx );
				//alert("subFrag=" + subFrag);
				if( subFrag != "" ) {
					fragmentInfo += "," + subFrag;
				}
			}
		}
		
		return fragmentInfo;
	},
	getChildObjectIds : function(childs)
	{
		//alert("layout=" + childs.getSize());
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				this.m_children[idx].getChildObjectIds(childs);
			}
		}
	},
	hasChildren : function()
	{
		var hasChildren = false;
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				//alert("inner layout id=" + this.m_id + ",hasChildren=" + this.m_children[idx].hasChildren());
				var hasChild = this.m_children[idx].hasChildren();
				if( hasChild == true ) hasChildren = true;
			}
		}
		
		return hasChildren;
	},
	getId : function()
	{
		return this.m_id;
	},
	getName : function()
	{
		return this.m_name;
	},
	setName : function(name)
	{
		this.m_name = name;
	},
	getAlign : function()
	{
		return this.m_align;
	},
	setAlign : function(align)
	{
		this.m_align = align;
	},
	getContentType : function()
	{
		return this.m_contentType;
	},
	setContentType : function(contentType)
	{
		this.m_contentType = contentType;
	},
	getParent : function()
	{
		return this.m_parent;
	},
	setParent : function(newParent)
	{
		this.m_parent = newParent;
	},
	getChildren : function()
	{
		return this.m_children;
	},
	getButtonArea : function()
	{
		return this.m_buttonArea;
	},
	getType : function()
	{
		return this.m_type;
	},
	getDomElement : function()
	{
		return this.m_domElement;
	},
	getFragmentId : function()
	{
		return this.m_fragmentId;
	},
	getDecorator : function()
	{
		return this.m_decorator;
	},
	getActionMask : function()
	{
		return this.m_actionMask;
	},
	setActionMask : function(actionMask)
	{
		this.m_actionMask = actionMask;
	},
	getButtonArea : function()
	{
		return this.m_buttonArea;
	},
	getUserMode : function()
	{
		return this.m_userMode;
	},
	setUserMode : function(mode)
	{
		this.m_userMode = mode;
	},
	setRootLayout : function( isRoot )
	{
		this.m_isRoot = isRoot;
	},
	isRootLayout : function()
	{
		return this.m_isRoot;
	},
	getColumnUnit : function()
	{
		return this.m_columnUnit;
	},
	getColumnSizes : function()
	{
		var sizeValues = "";
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				if( idx > 0 ) sizeValues += ",";
				sizeValues += this.m_children[idx].getColumnSize();
			}
		}
		
		return sizeValues;
	},
	getColumns : function()
	{
		var sizeValues = new Array();
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				var size = this.m_children[idx].getColumnSize();
				//alert("size=" +size);
				if( size.indexOf( "%" ) > -1 ) {
					this.m_columnUnit = "%";
					sizeValues[idx] = Math.round( size.substring(0, size.indexOf( "%" )) );
				}
				else if( size.indexOf( "px" ) > -1 ) {
					this.m_columnUnit = "px";
					sizeValues[idx] = Math.round( size.substring(0, size.indexOf( "px" )) );
				}
				else {
					sizeValues[idx] = Math.round( size );
				}
			}
		}
		
		return sizeValues;
	},
	setColumns : function(sizes)
	{
		var sizeValues = sizes.split(",");
		if(sizeValues.length != this.m_children.length) {
			alert("It must be same column number !!!");
			return;
		}
		
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				this.m_children[idx].setColumnSize( sizeValues[idx] + enview.portal.LAYOUT_UNIT );
			}
		}
	},
	getIndex : function(childObject)
	{
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				if( this.m_children[idx] == childObject )
					return idx;
			}
		}
		
		return 0;
	},
	getFirstChildObject : function()
	{
		var firstObject = null;
		if( this.m_children != null ) {
			//alert("this.m_children.length=" + this.m_children.length);
			for(var idx=0; idx<this.m_children.length; idx++) {
				if( this.m_children[idx] != null ) {
					firstObject = this.m_children[idx].getFirstChildObject();
					if( firstObject != null ) break;
				}
			}
		}
		
		return firstObject;
	},
	addColumn : function(columnObject)
	{
		if( this.m_children ) {
			this.m_children.push( columnObject );
		}
		else {
			this.m_children = new Array();
			this.m_children.push( columnObject );
		}
	},
	setCreated : function()
	{
		this.m_created = true;
	},
	cleanEmptyFragment : function()
	{
		for(var i=0; i<this.m_children.length; i++) {
			this.m_children[i].cleanEmptyFragment();
		}
	},
	changeMaskPosition : function()
	{
/*	
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				this.m_children[idx].changeMaskPosition();
			}
		}
*/
	},
	onMouseOver : function(a_event)
	{
		var evt = a_event==null ? event : a_event;
		var targetElt = portalPage.getDragDropMgr().getTarget ( evt );
		if(targetElt == null) return;
		
		var buttonAreaId = portalPage.getButtonArea();
		//alert("layout onMouseOver " + buttonAreaId + "," + targetElt.id);
		if( buttonAreaId != null && buttonAreaId == targetElt.id ) return;
/*		
		var dragObject = portalPage.getModelMap().get( targetElt.id );
		if( dragObject != null ) {
			if( buttonAreaId != null ) {
				var prevObject = portalPage.getModelMap().get( buttonAreaId );
				prevObject.getButtonArea().doHidden();
			}
			//alert(dragObject.m_id);
			var buttonArea = dragObject.getButtonArea();
			buttonArea.doShow();
			//portalPage.setButtonArea( targetElt.id );
		}
*/
	},
	onMouseOut : function(a_event)
	{
		var evt = a_event==null ? event : a_event;
		var targetElt = portalPage.getDragDropMgr().getTarget ( evt );
		if(targetElt == null) return;

		//var buttonAreaId = portalPage.getButtonArea();
		//alert("layout onMouseOut " + buttonAreaId + "," + targetElt.id);
		/*
		if( buttonAreaId != null && buttonAreaId == targetElt.id ) return;
		*/
/*		
		var dragObject = portalPage.getModelMap().get( targetElt.id );
		if( dragObject != null ) {
			var buttonArea = dragObject.getButtonArea();
			buttonArea.doHidden();
		}
		
		portalPage.setButtonArea(null);
*/
	},
	showDrag : function()
	{
		this.m_domElement.style.width = "100%";
		this.m_domElement.style.position = "relative";
		//this.m_domElement.style.position = "absolute";
		this.m_domElement.style.background = "#EEEEEE";
		//this.m_domElement.style.border = enview.portal.DRAG_AREA_STYLE;

		if (document.all) this.m_domElement.style.filter = "alpha(opacity=70)";
		else this.m_domElement.style.opacity = "0.7";
	},
	hideDrag : function()
	{
		this.m_domElement.style.zIndex = "1";
		this.m_domElement.style.background = "";
		//this.m_domElement.style.border = enview.portal.FRAGMENT_AREA_STYLE; 
		this.m_domElement.style.left = "0px";
		this.m_domElement.style.top = "0px";
		this.m_domElement.style.position = "";
		
		if (portalPage.getUtility().getIEVersionNumber()>5)
		{
			this.m_domElement.style.filter = "";
		}
		else
		{
			this.m_domElement.style.opacity = "";
			//this.m_domElement.className = "";
		}
	},
	toggleDragMode : function(isDragMode)
	{
		if( this.m_children != null ) {
			for(var idx=0; idx< this.m_children.length; idx++){
				this.m_children[idx].toggleDragMode( isDragMode );
			}
		}
	},
	disableDecorator : function()
	{
		//this.getButtonArea().getDomElement().style.position = "relative";
		this.getButtonArea().doHidden();
		//this.getButtonArea().setEnabled(false);
	},
	enableDecorator : function()
	{
		//this.getButtonArea().getDomElement().style.position = "absolute";
		this.getButtonArea().doShow();
		this.getButtonArea().setEnabled(true);
	},
	remove : function()
	{
		this.m_parent.remove( this );
	},
	changeLayout : function(name, layoutSize, align, contentType, actionMask, attribute)
	{
		portalPage.setModified();
		this.m_name = name;
		this.m_align = align;
		this.m_contentType = contentType;
		this.m_columns = attribute.columns;
		this.m_sizes = layoutSize;
		this.m_actionMask = actionMask;
		//alert( this.m_sizes );
		
		if( this.m_columns != this.m_children.length ) { 	// layout이 변경 된 경우
			if( this.m_columns > this.m_children.length ) { // 컬럼수를 늘린 경우
				var sizeArray = this.m_sizes.split(",");
				var i = 0;
				var prevElement = null;
				for( ; i<this.m_children.length; i++) {
					this.m_children[i].setColumnSize( sizeArray[i] );
					prevElement = this.m_children[i].getDomElement();
					prevElement.style.width = sizeArray[i];
					prevElement.style.float = "left"
				}
				
				var newIdx = this.m_children.length;
				for(i=newIdx; i<this.m_columns; i++) {
					var node = document.createElement('div');
					var now = new Date();
					node.setAttribute("id", "Enview_Column_" + now.getTime() + "_" + i);
					node.setAttribute("class", "column");
					node.setAttribute("className", "column");
					if( i != (this.m_columns-1) ) {
						node.style.float = "left"
					}
					else {
						node.style.float = "left";
					}
					node.style.width = sizeArray[i];
					
					//this.m_domElement.appendChild( node );
					this.m_domElement.insertBefore( node, prevElement );
					// 일단 기존 컬럼 앞으로 삽입한다.
					this.m_children[i] = new enview.portal.Column(this, node, sizeArray[i]);
					this.m_children[i].init(null);
				}
				
				// 기존 컬럼 앞으로 넣었기 때문에 다시 기존 컬럼을 첫번째 신규 컬럼 앞으로 이동하는 부분
				var node = this.m_children[newIdx].getDomElement();
				this.m_domElement.insertBefore( prevElement, node );
			}
			else { // 컬럼 수를 줄인 경우
				var sizeArray = this.m_sizes.split(",");
				var i=0;
				var lastColumnElement = null;
				for( ; i<this.m_columns; i++) {
					this.m_children[i].setColumnSize( sizeArray[i] );
					lastColumnElement = this.m_children[i].getDomElement();
					lastColumnElement.style.width = sizeArray[i];
					if( i != (this.m_columns-1) ) {
						lastColumnElement.style.float = "left"
					}
					else {
						lastColumnElement.style.float = "right";
					}
				}
				
				var lastObject = this.m_children[i-1];
				for(i=this.m_columns; i<this.m_children.length; i++) {
					var childLength = this.m_children[i].m_children.length;
					//alert("i=" + i + ", childLength=" + childLength);
					for(var j=0; j<childLength; j++) {
						//alert("j=" + j + ", " + this.m_children[i].m_children[j].m_id );
						if( lastObject.m_children[0].m_id == null ) {
							lastObject.cleanEmptyFragment();
							lastObject.m_children = new Array();
						}
						lastObject.m_children.push( this.m_children[i].m_children[j] );
						lastColumnElement.insertBefore( this.m_children[i].m_children[j].getDomElement() );
					}
				}
				
				// 기존 Object의 크기를 줄인 만큼 제거
				var diff = this.m_children.length - this.m_columns;
				this.m_children.splice(this.m_columns, diff);
			}
		}
		else { // 컬럼 크기가 변한 경우
			var sizeArray = this.m_sizes.split(",");
			//alert(this.m_sizes);
			for(var i=0; i<this.m_children.length; i++) {
				this.m_children[i].setColumnSize( sizeArray[i] );
			}
		}
		
		for(var i=0; i<this.m_children.length; i++) {
			this.m_children[i].changeMaskPosition();
		}
	}
}


enview.portal.Column = function(parent, node, columnSize)
{
	this.m_parent = parent;
	this.m_domElement = node;
	//node.style.border = "1px dotted red";
	//alert(parent.m_id + "," + node.id + "," + columnSize);
	if( node.id ) {
		portalPage.m_modelMap.put(node.id, this);
	}

	this.m_columnSize = columnSize;
	this.m_type = enview.portal.COLUMN_ID_NAME;
	this.m_children = new Array();
	
	//this.m_domElement.style.border = "thin dotted blue";
	//this.m_domElement.style.padding = "3px";
}
enview.portal.Column.prototype =
{
	m_id : null,
	m_parent : null,	// layout
	m_children : null,	// rows (layout or portlet)
	m_domElement : null,
	m_columnSize : null,
	m_type : null,
	m_droppableArea : null,
	m_createPortletHandler : null,
	m_getPortletContentHandler : null,
	m_refreshHandler : null,
	m_updateHandler : null,
	m_attribute : null,
	
	init : function (data)
	{
		var idx = 0;
		if( data != null ) {
			this.m_attribute = data.attribute;
			this.m_id = "Enview_Column_" + this.m_attribute.id + "_" + this.m_attribute.col;

			if( data.row.length > 0 ) {
				//alert(data.row.length + "," + data.row[0].attribute.type);
				for(; idx<data.row.length; idx++) {
					if( data.row[idx].attribute.type == "layout" ) {
						var node = document.getElementById("Enview_Layout_" + data.row[idx].attribute.id);
						this.m_children[ idx ] = new enview.portal.Layout(this, node, data.row[idx].attribute.columns, data.row[idx].attribute.sizes);
						this.m_children[ idx ].init( data.row[idx] );
					}
					else {
						//alert("Enview_Portlet_" + data.row[idx].attribute.id);
						var node = document.getElementById("Enview_Portlet_" + data.row[idx].attribute.id);
						this.m_children[ idx ] = new enview.portal.Portlet(this, node);
						this.m_children[ idx ].init( data.row[idx] );
					}
				}
			}
		}
		
		/*
		if( this.m_children.length == 0 ) {
			var tmpNode = document.createElement('br');
			tmpNode.style.clear = "both";
			this.m_domElement.appendChild( tmpNode );
		}
		*/
		
		var now = new Date();
		var id = Math.ceil(now.getTime() / 1000);
		var node = document.createElement('div');
		node.id = id;
		node.setAttribute("class", "portlet-empty");
		node.setAttribute("className", "portlet-empty");
		node.style.height = "25px";
		//node.style.border = "1px dotted red";
		this.m_domElement.appendChild( node );
		this.m_children[idx] = new enview.portal.Portlet(this, node);
	},
	changeMode : function (editMode)
	{
		var lastObject = this.m_children[ this.m_children.length - 1 ];
		var lastElem = lastObject.getDomElement();
		if( editMode == true ) {
			lastElem.style.display = "";
		}
		else {
			lastElem.style.display = "none";
		}
		
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				this.m_children[idx].changeMode( editMode );
			}
		}
	},
	getFragmentInfo : function( column )
	{
		var fragmentInfo = "";
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				if( this.m_children[idx].getId() == null ) continue;
				
				var tempInfo = this.m_children[idx].getFragmentInfo( column, idx );
				//alert("tempInfo=" + tempInfo);
				if( tempInfo != "" ) {
					if( idx > 0 ) fragmentInfo += ",";
					fragmentInfo += tempInfo
					//alert("column=" + column + ", row=" + idx + ", info=" + fragmentInfo);
				}
			}
		}
		
		//alert("fragmentInfo=" + fragmentInfo);
		
		return fragmentInfo;
	},
	getChildObjectIds : function(childs)
	{
		//alert("column=" + childs.getSize());
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				this.m_children[idx].getChildObjectIds(childs);
			}
		}
	},
	hasChildren : function()
	{
		var hasChildren = false;
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				var fid = this.m_children[idx].getFragmentId();
				if( fid == null || fid.length == 0 ) continue;
				//alert("column id=" + this.m_id + ", id=" + this.m_children[idx].getFragmentId());
				hasChildren = true;
			}
		}
		
		return hasChildren;
	},
	changeMaskPosition : function()
	{
/*		
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				this.m_children[idx].changeMaskPosition();
			}
		}
*/
	},
	getId : function()
	{
		return this.m_id;
	},
	getParent : function()
	{
		return this.m_parent;
	},
	getChildren : function()
	{
		return this.m_children;
	},
	getType : function()
	{
		return this.m_type;
	},
	getDomElement : function()
	{
		return this.m_domElement;
	},
	getColumnSize : function()
	{
		//return this.m_domElement.style.width;
		return this.m_columnSize;
	},
	setColumnSize : function(size)
	{
		this.m_columnSize = size;
		this.m_domElement.style.width = size;
		//var tdElem = document.getElementById("Enview_Layout_Td_" + this.m_attribute.id + "_" + this.m_attribute.col);
		//tdElem.width = size;
		//if( this.m_children != null ) {
		//	for(var idx=0; idx<this.m_children.length; idx++) {
		//		this.m_children[idx].getButtonArea().changeWidth();
		//	}
		//}
	},
	getFirstChildObject : function()
	{
		var firstObject = null;
		if( this.m_children != null ) {
			//alert("Column this.m_children.length=" + this.m_children.length);
			for(var idx=0; idx<this.m_children.length; idx++) {
				if( this.m_children[idx] != null ) {
					//alert("Column Obj=" + this.m_children[idx].getDomElement());
					return this.m_children[idx];
				}
			}
		}
		
		return firstObject;
	},
	insert : function( childObject, componentId, componentAppName, componentName, componentTitle, uniqueId, addValue1, addValue2, addValue3 )
	{
		portalPage.setModified();
		
		if( childObject != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				if(this.m_children[idx] == childObject) {
					break;
				}
			}
		}
		else {
			idx = 0;
			childObject = this.m_children[0];
		}
		//alert("componentId=" + componentId + ", componentAppName=" + componentAppName + ", componentName=" + componentName);
		//alert("idx=" + idx + "," + childObject.getDomElement().id);
		
		//var fragElement = document.createElement('div');
		//this.m_children.splice(idx, 0, new enview.portal.Fragment(this, fragElement));
		
		var i = 0;
		var names = new Array();
		var values = new Array();
		var createdObject = null;
		
		if( componentAppName == "enview-layouts" ) {
			var param = "action=editpage" + 
					"&method=getportletcontent" + 
					"&fragment_id=" + componentId + 
					"&app_name=" + componentAppName + 
					"&portlet_name=" + componentName;
		
			var currentObject = this;
			portalPage.m_ajax.send("POST", portalPage.getContextPath() + "/ajaxapi", param, false, {
				success: function(data) { 
					createdObject = currentObject.insertLayout(data, childObject, idx);
					//parentObject.insertPortlet(data, childObject, idx, id, title, app_name, portlet_name);
				}});
		}
		else {
			var param = "action=editpage" + 
					"&method=getportletcontent" + 
					"&fragment_id=" + componentId + 
					"&app_name=" + componentAppName + 
					"&portlet_name=" + componentName;
		
			var currentObject = this;
			portalPage.m_ajax.send("POST", portalPage.getContextPath() + "/ajaxapi", param, false, {
				success: function(data) { 
					createdObject = currentObject.insertPortlet(data, childObject, idx);
					//parentObject.insertPortlet(data, childObject, idx, id, title, app_name, portlet_name);
				}});
		}
		
		return createdObject;
	},
	insertLayout : function(xmlData, childObject, idx)
	{
		var rowData = portalPage.m_ajax.retrieveElementValue("attribute", xmlData);
		//alert(rowData);
		var data = eval( "(" + rowData + ")" );
		
		var now = new Date();
		var id = Math.ceil(now.getTime() / 1000);
		//var id = "" + now.getHours() + now.getMinutes() + now.getSeconds() + now.getMilliseconds();
		data.attribute["id"] = id;
		var columns = data.attribute["columns"];
		var sizes = data.attribute["sizes"];
		//alert("columns=" + columns + ", sizes=" + sizes);
		
		var layout = document.createElement('div');
		layout.id = "Enview_Layout_" + id;
		layout.setAttribute("ftid", "layout");
		layout.setAttribute("dragCopy", "false");
		layout.setAttribute("class", "portal-layout");
		layout.setAttribute("className", "portal-layout");
		
		layout.innerHTML = "<div id='LayoutEditIconArea_" + id + "' class='layout-icon-area'>" + 
			"<img id='zzzzzzz' src='" + portalPage.getContextPath() + "/decorations/layout/images/move.png' border='0' align='absmiddle' title='" + portalPage.getMessageResource("ev.info.icon.movePortlet") + "' style='border:none; cursor:hand;'/>" + 
			"<a class='portlet-action-button' onclick=\"javascript:portalPage.showPortletEditor('Enview_Layout_" + id + "');\"> " +
			"<img src='" + portalPage.getContextPath() + "/decorations/layout/images/edit.gif' border='0' align='absmiddle' title='" + portalPage.getMessageResource("ev.info.icon.editPortlet") + "' style='border:none; cursor:hand;'/> </a>" +
			"<a class='portlet-action-button' onclick=\"javascript:portalPage.showPortletSelector('Enview_Layout_" + id + "');\" > " +
			"<img src='" + portalPage.getContextPath() + "/decorations/layout/images/selectPortlet.png' border='0' align='absmiddle' title='" + portalPage.getMessageResource("ev.info.icon.addPortlet") + "' style='border:none; cursor:hand;'/> </a>" +
			"<a class='portlet-action-button' onclick=\"javascript:portalPage.removePortlet('Enview_Layout_" + id + "');\" > " +
			"<img src='" + portalPage.getContextPath() + "/decorations/layout/images/icon_del.gif' border='0' align='absmiddle' title='" + portalPage.getMessageResource("ev.info.icon.removePortlet") + "' style='border:none; cursor:hand;'/> </a>" +
			"</div>";
		
		this.m_domElement.insertBefore( layout, childObject.getDomElement() );
		//alert(childObject.getDomElement());
		
		var obj = new enview.portal.Layout(this, layout, data.attribute["columns"], data.attribute["sizes"]);
		obj.init(data);
		obj.setCreated();
		this.m_children.splice(idx, 0, obj);
		//obj.setParent( this );
		for(var idx=0; idx<this.m_children.length; idx++) {
			this.m_children[idx].changeMaskPosition();
		}
		
		return obj;
	},
	insertPortlet : function(xmlData, childObject, idx)
	{
		//alert(portalPage.m_ajax.retrieveElementValue("content", data));
		//alert(portalPage.m_ajax.retrieveElementValue("attribute", data));
		
		var rowData = portalPage.m_ajax.retrieveElementValue("attribute", xmlData);
		//alert(rowData);
		var data = eval( "(" + rowData + ")" );
		var content = portalPage.m_ajax.retrieveElementValue("content", xmlData);
		
		//alert("content=" + content + ", idx=" + idx + ", childObject=" + childObject.getDomElement().id);
		
		var now = new Date();
		var id = Math.ceil(now.getTime() / 1000);
		//var id = "" + now.getHours() + now.getMinutes() + now.getSeconds() + now.getMilliseconds();
		data.attribute["id"] = id;
		var titleshow = (data.preference["TITLE_SHOW"]) ? data.preference["TITLE_SHOW"] : "false";
		var style = (data.preference["STYLE"]) ? data.preference["STYLE"] : "";
		var title = (data.preference["TITLE"]) ? data.preference["TITLE"] : "";
		var moresrc = (data.preference["MORE_SRC"]) ? data.preference["MORE_SRC"] : "";
		var moretarget = (data.preference["MORE_TARGET"]) ? data.preference["MORE_TARGET"] : "";
		//alert("idx=" + idx + ", id=" + id + ", title=" + title + ", child=" + childObject.getDomElement() + ", content=" + content);
		
		var htmlStr = "";
		htmlStr += "<div id='Enview_PortletTitle_" + id + "' class='portlet-title'>";
		htmlStr += "<span id='PortletEditIconArea_" + id + "' class='portlet-icon-area'>";
		htmlStr += "<img id='zzzzzzz' src='" + portalPage.getContextPath() + "/decorations/layout/images/move.png' border='0' align='absmiddle' title='" + portalPage.getMessageResource("ev.info.icon.movePortlet") + "' style='border:none; cursor:hand;'/>";
		htmlStr += "<a class='portlet-action-button' onclick=\"javascript:portalPage.showPortletEditor('Enview_Portlet_" + id + "');\"> ";
		htmlStr += "<img src='" + portalPage.getContextPath() + "/decorations/layout/images/edit.gif' border='0' align='absmiddle' title='" + portalPage.getMessageResource("ev.info.icon.editPortlet") + "' style='border:none; cursor:hand;'/> </a>";
		htmlStr += "<a class='portlet-action-button' onclick=\"javascript:portalPage.removePortlet('Enview_Portlet_" + id + "');\" > ";
		htmlStr += "<img src='" + portalPage.getContextPath() + "/decorations/layout/images/icon_del.gif' border='0' align='absmiddle' title='" + portalPage.getMessageResource("ev.info.icon.removePortlet") + "' style='border:none; cursor:hand;'/> </a>";
		htmlStr += "</span>";
		htmlStr += "<span class='portlet-title-content'>" + title + "</span>";
		htmlStr += "</div>";
		htmlStr += "<div class='portlet-content'> ";
		htmlStr += content;
		htmlStr += "</div>";
		
		var portlet = document.createElement('div');
		portlet.id = "Enview_Portlet_" + id;
		portlet.setAttribute("ftid", "portlet");
		portlet.setAttribute("dragCopy", "false");
		portlet.setAttribute("class", "portlet");
		portlet.setAttribute("className", "portlet");
		if( style != null ) {
			portlet.setAttribute("style", style);
		}
		portlet.innerHTML = htmlStr;
		
		//alert("this.m_domElement=" + this.m_domElement.id + ", child=" + childObject.getDomElement().id);
		this.m_domElement.insertBefore( portlet, childObject.getDomElement() );
		
		var obj = new enview.portal.Portlet(this, portlet);
		obj.init(data);
		obj.setCreated();
		this.m_children.splice(idx, 0, obj);
		obj.setParent( this );
		for(var idx=0; idx<this.m_children.length; idx++) {
			this.m_children[idx].changeMaskPosition();
		}
		
		return obj;
	},
	change : function( childObject, dragObject )
	{
		portalPage.setModified();
		
		if( this.m_children != null ) {
			for(var idx=0; idx<this.m_children.length; idx++) {
				if(this.m_children[idx] == childObject) {
					break;
				}
			}
			
			//alert("dragObject=" + dragObject.getId() + ", childObject=" + childObject.getId());
			this.m_children.splice(idx, 0, dragObject);
			//alert("dragObject.getDomElement()=" + dragObject.getDomElement() + ", childObject.getDomElement()=" + childObject.getDomElement());
			try {
				this.m_domElement.insertBefore( dragObject.getDomElement(), childObject.getDomElement() );
			}
			catch(e) {
				alert(e);
			}
			
			dragObject.hideDrag(); 
			portalPage.changeMaskPosition();
			
			/*
			var titleArea = document.getElementById("Enview_PortletTitle_" + dragObject.getFragmentId());
			if( titleArea ) {
				titleArea.style.width = (titleArea.parentNode.offsetWidth - 10) + "px";
			}
			*/
		}
	},
	remove : function( childObject )
	{
		portalPage.setModified();
		this.m_domElement.removeChild( childObject.getDomElement() );
		this.removeElement( childObject );
		this.changeMaskPosition();
	},
	removeElement : function( childObject )
	{
		portalPage.setModified();
		if( this.m_children != null ) {
			//alert("this.m_children.length=" + this.m_children.length);
			//alert("child=" + this.m_domElement.innerHTML);
			for(var idx=0; idx<this.m_children.length; idx++) {
				//alert("nodeName=" + this.m_children[idx].nodeType);
				if(this.m_children[idx] == childObject) {
					break;
				}
			}
			this.m_children.splice( idx, 1 );
			//alert("idx=" + idx + ", this.m_children.length=" + this.m_children.length);
			if(this.m_children.length == 0) {
				var node = document.createElement('div');
				node.setAttribute("class", "portal-layout-cell");
				node.setAttribute("className", "portal-layout-cell");
				this.m_domElement.appendChild( node );
				this.m_children[0] = new enview.portal.Portlet(this, node);
				this.m_children[0].init(null);
			}
		}
	},
	getChildrenIds : function()
	{
		var ids = "";
		for(var idx=0; idx<this.m_children.length; idx++) {
			if( this.m_children[idx].getFragmentId() != null ) {
				ids += this.m_children[idx].getFragmentId() + ",";
			}
			else {
				ids += ",";
			}
		}
		
		return ids;
	},
	cleanEmptyFragment : function()
	{
		var lastObject = this.m_children[ this.m_children.length - 1 ];
		var lastElem = lastObject.getDomElement();
		//lastElem.removeNode(true);
		this.getDomElement().removeChild( lastElem );
	},
	removeDroppableArea : function()
	{
		portalPage.getDragDropMgr().removeDropArea( this.m_droppableArea );
	},
	onMouseOver : function(a_event)
	{
		//var evt = a_event==null ? event : a_event;
		//var targetElt = evt.srcElement ? evt.srcElement : evt.target;
		//targetElt.style.border = "2px dotted red";
	},
	onMouseOut : function(a_event)
	{
		//var evt = a_event==null ? event : a_event;
		//var targetElt = evt.srcElement ? evt.srcElement : evt.target;
		//targetElt.style.border = "";
	},
	toggleDragMode : function(isDragMode)
	{
		if( this.m_children != null ) {
			for(var idx=0; idx< this.m_children.length; idx++){
				this.m_children[idx].toggleDragMode( isDragMode );
			}
		}
	}
}

enview.portal.Portlet = function(parent, node)
{
	this.m_parent = parent;
	this.m_domElement = node;
	if( node.id ) {
		this.m_id = node.id;
		this.m_fragmentId = node.id.substring(15);
		portalPage.m_modelMap.put(node.id, this);
	}
	this.m_type = enview.portal.PORTLET_ID_NAME;
	this.m_droppableArea = portalPage.getDragDropMgr().addDropArea( this );
	
	this.m_domElement.setAttribute("dragCopy", "false");
	
	/*		
	var lists = this.m_domElement.getElementsByTagName("div");
	for(var k=0; k<lists.length; k++)
	{
		if(lists[k].className == "portlet-content") {
			lists[k].onmouseover = this.onMouseOver;
			lists[k].onmouseout = this.onMouseOut;
		}
	}
	*/
}
enview.portal.Portlet.prototype =
{
	m_id : null,
	m_parent : null,
	m_domElement : null,
	m_domHideElement : null,
	m_fragmentId : null,
	m_name : null,
	m_type : null,
	m_contentType : null,
	m_decorator : null,
	m_droppableArea : null,
	m_preference : null,
	m_created : false,
	m_buttonArea : null,
	m_actionMask : 0,
	m_userMode : false,
	
	init : function (data)
	{
		if( data != null ) {
			this.m_preference = data.preference;
			this.m_id = "Enview_Portlet_" + data.attribute.id;
			this.m_name = data.attribute.name;
			//alert(this.m_name);
			this.m_fragmentId = data.attribute.id;
			this.m_contentType = (data.attribute.contentType != "null") ? data.attribute.contentType : null;
			this.m_actionMask = data.attribute.actionMask;
			
			//alert("servletPath=" +portalPage.getServletPath() + ", actionMask=" + this.m_actionMask);
			if( portalPage.getServletPath() == "/contentonly" || this.m_actionMask != 0 ) {
				this.m_buttonArea = new enview.portal.PortletButtonArea(this, false);
				//this.m_domElement.onmouseover = this.onMouseOver;
				//this.m_domElement.onmouseout = this.onMouseOut;
			}
			
			this.changeMaskPosition();
		}
	},
	changeMode : function (editMode)
	{
		if( editMode == true ) {
			$('#Enview_PortletTitle_' + this.m_fragmentId).css('display', 'block');
			$('#PortletEditIconArea_' + this.m_fragmentId).css('display', 'block');
			
			if( this.m_buttonArea != null ) {
				this.m_buttonArea.setEnabled(true);
				//this.m_buttonArea.doShow();
			}
			if( this.m_domHideElement != null ) this.m_domHideElement.style.display = "";
		}
		else {
			//alert("this.m_preference=" + this.m_id + "," + this.m_preference);
			if( this.m_preference != null && (this.m_preference["TITLE-SHOW"] == null || this.m_preference["TITLE-SHOW"] == "false") ) {
				$('#Enview_PortletTitle_' + this.m_fragmentId).css('display', 'none');
			}
			$('#PortletEditIconArea_' + this.m_fragmentId).css('display', 'none');
			if( this.m_buttonArea != null ) {
				this.m_buttonArea.setEnabled(false);
				this.m_buttonArea.doHidden();
			}
			if( this.m_domHideElement != null ) this.m_domHideElement.style.display = "none";
		}
		//alert("editMode=" + editMode + ", this.m_buttonArea=" + this.m_buttonArea + ", mask=" + document.getElementById( "Enview_PortletMask_" + this.m_fragmentId ).style.display);
	},
	getFragmentInfo : function( column, row )
	{
		//alert(this.m_parent.getParent().getParent().getFragmentId());
		var fragmentInfo = "";
		if( this.m_fragmentId != null && this.m_fragmentId != "" ) {
			fragmentInfo += "{ \"fragment\" : {";
			fragmentInfo += "\"parent_id\" : \"" + this.m_parent.getParent().getFragmentId() + "\", ";
			fragmentInfo += "\"fragment_id\" : \"" + this.m_fragmentId + "\", ";
			fragmentInfo += "\"name\" : \"" + this.m_name + "\", ";
			if( this.m_created == true ) {
				fragmentInfo += "\"created\" : \"true\", ";
			}
			else {
				fragmentInfo += "\"created\" : \"false\", ";
			}
			fragmentInfo += "\"action_mask\" : \"" + this.m_actionMask + "\", ";
			fragmentInfo += "\"type\" : \"portlet\", ";
			if( this.m_contentType != null ) {
				fragmentInfo += "\"content_type\" : \"" + this.m_contentType + "\", ";
			}
			fragmentInfo += "\"layout_row\" : \"" + row + "\", ";
			fragmentInfo += "\"layout_column\" : \"" + column + "\" ";
			fragmentInfo += "}, ";
			fragmentInfo += "\"preference\" : ";
			fragmentInfo += JSONtoString(this.m_preference)
			fragmentInfo += "} ";
		}
		
		return fragmentInfo;
	},
	getChildObjectIds : function(childs)
	{
		if( this.m_id.indexOf("Enview_Portlet_") == 0 ) {
			childs.put(this.m_id, "true");
			//alert("portlet=" + childs.getSize());
		}
	},
	changeMaskPosition : function()
	{
		/*
		var pos = portalPage.getUtility().getAbsolutePosition(this.m_domElement);
		this.m_domHideElement = document.getElementById( "Enview_PortletMask_" + this.m_fragmentId );
		if( this.m_domHideElement != null ) {
			this.m_domHideElement.style.left = pos.m_x + 5;
			this.m_domHideElement.style.top = pos.m_y + 5;
			this.m_domHideElement.style.width = this.m_domElement.offsetWidth - 10;
			this.m_domHideElement.style.height = this.m_domElement.offsetHeight - 10;
			this.m_domHideElement.style.display = "";
		}
		*/
	},
	getId : function()
	{
		return this.m_id;
	},
	getName : function()
	{
		return this.m_name;
	},
	getParent : function()
	{
		return this.m_parent;
	},
	setParent : function(newParent)
	{
		this.m_parent = newParent;
	},
	getButtonArea : function()
	{
		return this.m_buttonArea;
	},
	getType : function()
	{
		return this.m_type;
	},
	getDomElement : function()
	{
		return this.m_domElement;
	},
	getFragmentId : function()
	{
		//alert("this.m_fragmentId=" + this.m_fragmentId);
		return this.m_fragmentId;
	},
	getDecorator : function()
	{
		return this.m_decorator;
	},
	getButtonArea : function()
	{
		return this.m_buttonArea;
	},
	getContentType : function()
	{
		return this.m_contentType;
	},
	getActionMask : function()
	{
		return this.m_actionMask;
	},
	setActionMask : function(actionMask)
	{
		this.m_actionMask = actionMask;
	},
	getUserMode : function()
	{
		return this.m_userMode;
	},
	setUserMode : function(mode)
	{
		this.m_userMode = mode;
	},
	remove : function()
	{
		this.m_parent.remove( this );
	},
	setCreated : function()
	{
		this.m_created = true;
	},
	onMouseOver : function(a_event)
	{
		var evt = a_event==null ? event : a_event;
		var targetElt = portalPage.getDragDropMgr().getTarget ( evt );
		if(targetElt == null) return;
		
		var buttonAreaId = portalPage.getButtonArea();
		//alert("onMouseOver " + buttonAreaId + "," + targetElt.id);
		if( buttonAreaId != null && buttonAreaId == targetElt.id ) return;
/*
		var obj = portalPage.getModelMap().get( targetElt.id );
		if( obj != null ) {
			if( buttonAreaId != null ) {
				var prevObject = portalPage.getModelMap().get( buttonAreaId );
				prevObject.getButtonArea().doHidden();
			}
			//alert(dragObject.m_id);
			var buttonArea = obj.getButtonArea();
			if( buttonArea != null ) {
				buttonArea.doShow();
				portalPage.setButtonArea( targetElt.id );
			}
		}
*/
		/*
		if (evt.preventDefault) {
			evt.preventDefault ();
			evt.stopPropagation ();
		} else {
			evt.cancelBubble = false;
			evt.returnValue = false;
		}
		*/
	},
	onMouseOut : function(a_event)
	{
		var evt = a_event==null ? event : a_event;
		var targetElt = portalPage.getDragDropMgr().getTarget ( evt );
		if(targetElt == null) return;

		var buttonAreaId = portalPage.getButtonArea();
		//alert("onMouseOut " + buttonAreaId + "," + targetElt.id);
		/*
		if( buttonAreaId != null && buttonAreaId == targetElt.id ) return;
		*/
/*		
		var obj = portalPage.getModelMap().get( targetElt.id );
		if( obj != null ) {
			var buttonArea = obj.getButtonArea();
			if( buttonArea != null ) {
				buttonArea.doHidden();
			}
		}
		
		portalPage.setButtonArea(null);
*/
		/*
		if (evt.preventDefault) {
			evt.preventDefault ();
			evt.stopPropagation ();
		} else {
			evt.cancelBubble = false;
			evt.returnValue = false;
		}
		*/
	},
	isInclude : function (a_x, a_y)
	{
		var result = false;
		//alert(this.m_id);
		//if( portalPage.isDragMode() == true ) {
		//	return this.m_parent.isInclude(a_x, a_y);
		//}
		//else {
			var pos = portalPage.getUtility().getAbsolutePosition2(this.m_domElement);
			result = (pos.m_x<a_x && a_x<(pos.m_x+this.m_domElement.offsetWidth) && pos.m_y<a_y && a_y<(pos.m_y+this.m_domElement.offsetHeight)) ? true : false;
		//}
		
		//if( result == true ) {
		//	alert("id=" + this.getId() + ", ax=" + a_x + ", ay=" + a_y + ", x=" + pos.m_x + ", y=" + pos.m_y + ", width=" + this.m_domElement.offsetWidth + ", height=" + this.m_domElement.offsetHeight);
		//}
		
		return result;
	},
	showArea : function()
	{
		//if( portalPage.isDragMode() == true ) {
		//	alert("dragMode is true");
		//	this.m_parent.showArea();
		//}
		//else {
			//alert(this.m_id);
			this.m_domElement.style.border = enview.portal.DROP_AREA_STYLE;
		//}
	},
	hideArea : function()
	{
		//if( portalPage.isDragMode() == true ) {
		//	this.m_parent.hideArea();
		//}
		//else {
			this.m_domElement.style.border = "";
		//}
	},
	showDrag : function()
	{
		this.m_domElement.style.width = "100%";
		this.m_domElement.style.position = "relative";
		//this.m_domElement.style.position = "absolute";
		this.m_domElement.style.background = "#EEEEEE";
		//this.m_domElement.style.border = enview.portal.DRAG_AREA_STYLE;

		//alert("before this.m_domElement.style.filter=" + this.m_domElement.style.filter);
		
		if (document.all) this.m_domElement.style.filter = "alpha(opacity=70)";
		else this.m_domElement.style.opacity = "0.7";
	},
	hideDrag : function()
	{
		this.m_domElement.style.zIndex = "1";
		this.m_domElement.style.background = "";
		//this.m_domElement.style.border = enview.portal.FRAGMENT_AREA_STYLE;
		this.m_domElement.style.left = "0px";
		this.m_domElement.style.top = "0px";
		this.m_domElement.style.position = "";
		
		if (portalPage.getUtility().getIEVersionNumber()>5)
		{
			this.m_domElement.style.filter = "";
		}
		else
		{
			this.m_domElement.style.opacity = "";
			//this.m_domElement.className = "";
		}
	},
	toggleDragMode : function(isDragMode)
	{
		var elem = document.getElementById("Enview_Portlet_Content_" + this.m_fragmentId);
		if( isDragMode == true ) {
			//if( elem != null ) {
			//	elem.style.display = "none";
			//}
			//this.m_domElement.style.display = "none";
			//this.m_domElement.style.height = "20px";
			this.m_domElement.style.border = enview.portal.DROP_AREA_STYLE;
		}
		else {
			//if( elem != null ) {
			//	elem.style.display = "";
			//}
			//this.m_domElement.style.display = "";
			//this.m_domElement.style.height = "";
			this.m_domElement.style.border = "";
		}
	},
	disableDecorator : function()
	{
		this.getButtonArea().doHidden();
		this.getButtonArea().setEnabled(false);
		if( this.m_domHideElement != null ) this.m_domHideElement.style.display = "none";
	},
	enableDecorator : function()
	{
		this.getButtonArea().setEnabled(true);
		if( this.m_domHideElement != null ) this.m_domHideElement.style.display = "";
	},
	changeDecorator : function()
	{
		portalPage.setModified();
		//alert("changeDecorator=" + this.m_preference["TITLE-SHOW"]);
		if( this.m_preference["TITLE-SHOW"] == "true" ) {
			var titleElem = document.getElementById("Enview_PortletTitle_" + this.m_fragmentId);
			//alert("Enview_PortletTitle_" + this.m_fragmentId + "," + titleElem);
			if( titleElem != null ) {
				titleElem.style.display = "";
			}
		}
		else {
			var titleElem = document.getElementById("Enview_PortletTitle_" + this.m_fragmentId);
			//alert("Enview_PortletTitle_" + this.m_fragmentId + "," + titleElem);
			if( titleElem != null ) {
				titleElem.style.display = "none";
			}
		}
	},
	bindHover : function()
	{
		/*
		var portlet = $('#Enview_Portlet_' + this.getFragmentId());
		var iFrame = $('#IframePortlet_' + this.getFragmentId());
		var iconArea = $('#Enview_PortletTitle_' + this.getFragmentId());
		
		portlet.hover(
			function(){ prevArea = window.setTimeout(function() { iconArea.fadeIn(1000, function(){}); }, 500); }, 
			function(){ iconArea.css('display', 'none'); window.clearTimeout(prevArea);	}
		);
		*/
	},
	unbindHover : function()
	{
		/*
		$("#Enview_Portlet_" + this.getFragmentId()).unbind('mouseenter mouseleave');
		*/
	}
}

enview.portal.PortletButtonArea = function(parent, fixed)
{
	this.m_parent = parent;
	this.m_fixed = fixed;
	var htmlStr = "";
	var parentElem = parent.getDomElement();
	var actionMask = parent.getActionMask();
	//alert("servletPath=" + portalPage.getServletPath()); 
	htmlStr = "";
	/*
	if( portalPage.getServletPath() == "/contentonly" ) {
		htmlStr += "<span style=\"text-align:right;\">";
		if( (actionMask & 0x00000010) == 0x00000010 ) {
			if( parent.getParent() != null && parent.getParent().getType() != enview.portal.PAGE_ID_NAME ) {
				htmlStr += "<img id=\"zzzzzzz\" src=\"" + portalPage.getContextPath() + "/decorations/layout/images/move.png\" border=\"0\" align=\"absmiddle\" title=\"" + portalPage.getMessageResource('ev.info.icon.movePortlet') + "\" style=\"border:none; cursor:hand;\"/>";
			}
		}
		if( (actionMask & 0x00000100) == 0x00000100 ) {
			htmlStr += "<a class=\"portlet-action-button\" onmousedown=\"javascript:portalPage.showPortletEditor('" + parent.m_id + "')\"> ";
			//htmlStr += "<img src=\"" + portalPage.getContextPath() + "/decorations/layout/images/config.png\" border=\"0\" align=\"absmiddle\" title=\"\" style=\"border:none; cursor:hand;\"/> </a>";
			htmlStr += "<img src=\"" + portalPage.getContextPath() + "/decorations/layout/images/edit.gif\" border=\"0\" align=\"absmiddle\" title=\"" + portalPage.getMessageResource('ev.info.icon.editPortlet') + "\" style=\"border:none; cursor:hand;\"/> </a>";
		}
		if( parent.getType() == enview.portal.LAYOUT_ID_NAME && ((actionMask & 0x00001000) == 0x00001000) ) {
			//alert(parent.getType());
			htmlStr += "<a class=\"portlet-action-button\" onmousedown=\"javascript:portalPage.showPortletSelector('" + parent.m_id + "');\" > ";
			htmlStr += "<img src=\"" + portalPage.getContextPath() + "/decorations/layout/images/selectPortlet.png\" border=\"0\" align=\"absmiddle\" title=\"" + portalPage.getMessageResource('ev.info.icon.addPortlet') + "\" style=\"border:none; cursor:hand;\"/> </a>";
		}
		if( (actionMask & 0x00000001) == 0x00000001 ) {
			if( parent.getParent() != null && parent.getParent().getType() != enview.portal.PAGE_ID_NAME ) {
				//alert(parent.getParent() + "," + parent.getParent().getType());
				htmlStr += "<a class=\"portlet-action-button\" onmousedown=\"javascript:portalPage.removePortlet('" + parent.m_id + "');\" > ";
				htmlStr += "<img src=\"" + portalPage.getContextPath() + "/decorations/layout/images/icon_del.gif\" border=\"0\" align=\"absmiddle\" title=\"" + portalPage.getMessageResource('ev.info.icon.removePortlet') + "\" style=\"border:none; cursor:hand;\"/> </a>";
				//alert(htmlStr);
			}
		}
		htmlStr += "</span>";
	
		var icon = document.getElementById("PortletEditIconArea_" + parent.getFragmentId());
		//alert("icon=" + icon);
		if( icon ) {
			icon.innerHTML += htmlStr
		
			parent.setUserMode(true);
			parent.bindHover();
			
			this.m_domElement = document.getElementById("Enview_PortletTitle_" + parent.getFragmentId());
			//var pos = portalPage.getUtility().getAbsolutePosition( this.m_domElement );
			var pos = portalPage.getUtility().getAbsolutePosition( parentElem );
			//alert(this.m_domElement.style.left + "," + this.m_domElement.style.top);

			this.m_domElement.style.width = (this.m_domElement.parentNode.offsetWidth - 10) + "px";
			//this.m_domElement.style.top = (position.top) + "px";
			//this.m_domElement.style.position = "absolute";
			//this.m_domElement.style.top -= 10 + "px";
			//this.m_domElement.style.height = "0px";
			this.m_domElement.style.border = "1px solid lightgray";
			
			
		}
	}
	*/
}
enview.portal.PortletButtonArea.prototype =
{
	m_parent : null,
	m_domElement : null,
	m_object : null,
	m_enabled : true,
	m_fixed : false,
	
	getDomElement : function()
	{
		return this.m_domElement;
	},
	getObject : function()
	{
		return this.m_object;
	},
	setObject : function(object)
	{
		//alert(object.m_id);
		this.m_object = object;
		//alert("before");
		//this.m_object.onmouseout = "";
		//alert("after");
	},
	setParent : function(parent)
	{
		this.m_parent = parent;
	},
	setEnabled : function(flag)
	{
		this.m_enabled = flag;
	},
	isEnabled : function()
	{
		return this.m_enabled;
	},
	doShow : function()
	{
		//document.getElementById('#Enview_Portlet_' + this.m_parent.getFragmentId()).style.display = "";
		//this.m_domElement.style.display = "";
	},
	doHidden: function()
	{
		//document.getElementById('#Enview_Portlet_' + this.m_parent.getFragmentId()).style.display = "";
		//this.m_domElement.style.display = "none";
		/*
		//alert("doHidden");
		if( portalPage.getEditMode() == false || this.m_fixed == false ) {
			var elem = this.m_domElement;
//			elem.style.display = "none";
		}
		*/
	},
	onMouseOver : function(a_event)
	{
		var evt = a_event==null ? event : a_event;
		var target = evt.srcElement ? evt.srcElement : evt.target;
		
		var targetElt = portalPage.getDragDropMgr().getTarget ( evt );
		if(targetElt == null) return;

		var buttonAreaId = portalPage.getButtonArea();
		//alert("onMouseOver " + buttonAreaId + "," + targetElt.id);
		if( buttonAreaId != null && buttonAreaId == targetElt.id ) return;
		
		var obj = portalPage.getModelMap().get( targetElt.id );
		if( obj != null ) {
			if( buttonAreaId != null ) {
				var prevObject = portalPage.getModelMap().get( buttonAreaId );
				prevObject.getButtonArea().doHidden();
			}
			//alert(obj.m_id);
			var buttonArea = obj.getButtonArea();
			buttonArea.doShow();
			portalPage.setButtonArea( targetElt.id );
		}
	},
	onMouseOut : function(a_event)
	{
		var evt = a_event==null ? event : a_event;
		var target = evt.srcElement ? evt.srcElement : evt.target;
	}
}
	
enview.portal.QuickMenu = function()
{
	
}
enview.portal.QuickMenu.prototype =
{
	m_domElement : null,
	m_stmnTimer : null,
	m_quickMenuLeft : 0, // 스크롤메뉴의 좌측 위치
	m_quickMenuTopMargin1 : 0, // 페이지 헤더부분의 여백
	m_quickMenuTopMargin2 : 0, // 스크롤시 브라우저 상단과 약간 띄움. 필요없으면 0으로 세팅
	m_quickMenuTopBase : 10, // 스크롤메뉴 초기 시작위치 (아무렇게나 해도 상관은 없지만 m_quickMenuTopMargin1과 약간 차이를 주는게 보기 좋음)
	m_quickMenuActivateSpeed : 500, // 움직임을 감지하는 속도 (숫자가 클수록 늦게 알아차림)
	m_quickMenuScrollSpeed : 10, // 스크롤되는 속도 (클수록 늦게 움직임)
	m_createHandler : null,
	m_removeHandler : null,
	m_retrieveHandler : null,
	
	init : function(quickElement, left, top)
	{
		//alert("quickElement=" + quickElement + ", left=" + left + ", top=" + top);
		this.m_domElement = document.getElementById(quickElement);
		
		if( left && top ) {
			this.m_quickMenuTopMargin2 = top + 25;
			this.m_domElement.style.left = left;
			this.m_domElement.style.top = this.m_quickMenuTopMargin2;
		}
		else {
			//this.m_domElement.style.left = 0;
			this.m_domElement.style.top = "10px";
			this.m_quickMenuTopMargin2 = 125;
		}
		
		this.m_domElement.style.position = "absolute";
		this.m_domElement.style.visibility = "visible";
		//this.m_domElement.style.z-index = "10";

		this.refreshQuickMenu();
		
		//this.doRetrieve();
	},
	
	refreshQuickMenu : function() {
	
		var top = 0;
		if( document.all ) { // IE
			//alert("document.documentElement.scrollTop=" + document.documentElement.scrollTop + ", document.body.scrollTop=" + document.body.scrollTop);
			
			top += (document.body.scrollTop == 0) ? document.documentElement.scrollTop : document.body.scrollTop; 
		}
		else {
			top += window.pageYOffset;
		}
		/*
		if( document.documentElement ) {
			
			top = document.documentElement.scrollTop;
		}
		else if( document.all ) { // IE
			top = document.body.scrollTop; 
		}
		else {
			top = window.pageYOffset;
		}
		*/
		//alert("scrollTop=" + top);
		
		var stmnStartPoint, stmnEndPoint, stmnRefreshTimer;
		stmnStartPoint = parseInt(this.m_domElement.style.top, 10);
		stmnEndPoint = parseInt(top + this.m_quickMenuTopMargin2, 10);  //document.body.scrollTop + this.m_quickMenuTopMargin2;
		//alert("scrollTop=" + document.body.scrollTop + ", stmnEndPoint=" + stmnEndPoint);
		if (stmnEndPoint < this.m_quickMenuTopMargin1) { 
			stmnEndPoint = this.m_quickMenuTopMargin1; 
		}

		// 무한 스크롤 다운 방지
		if(top > 50) { 
			stmnEndPoint = stmnEndPoint - 59; 
		}
		
		//alert("stmnStartPoint=" + stmnStartPoint + ", stmnEndPoint=" + stmnEndPoint);
		
		//alert("y=" + this.m_domElement.offsetTop);
		//this.m_domElement.style.top = "100px";
		//alert("y=" + this.m_domElement.offsetTop);

		stmnRefreshTimer = this.m_quickMenuActivateSpeed;
		if ( stmnStartPoint != stmnEndPoint ) {
			stmnScrollAmount = Math.ceil( Math.abs( stmnEndPoint - stmnStartPoint ) / 15 );
			//alert(this.m_domElement.style.top);
			var diff = ( stmnEndPoint < stmnStartPoint ) ? -stmnScrollAmount : stmnScrollAmount;
			//this.m_domElement.style.top = "100px";
			//alert(this.m_domElement.style.top);
			//this.m_domElement.style.top = parseInt(this.m_domElement.style.top, 10) + diff + "px";
			
			//this.m_domElement.style.top = parseInt(this.m_domElement.style.top, 10) + diff;
			this.m_domElement.style.top = new Number(this.m_domElement.offsetTop + diff) + "px";
			
			//alert("diff=" + this.m_domElement.offsetTop + diff + ", this.m_domElement.style.top=" + this.m_domElement.style.top);
			//alert("stmnScrollAmount=" + stmnScrollAmount + ", parseInt(this.m_domElement.style.top, 10)=" + parseInt(this.m_domElement.style.top, 10) + ", this.m_domElement.style.top=" + this.m_domElement.style.top);
			//alert("diff=" + diff + ", this.m_domElement.style.top=" + parseInt(this.m_domElement.style.top, 10)+diff);
			//alert(", stmnScrollAmount=" + ( stmnEndPoint<stmnStartPoint ) ? -stmnScrollAmount : stmnScrollAmount);
			stmnRefreshTimer = this.m_quickMenuScrollSpeed;
		}
		this.m_stmnTimer = setTimeout ("quickMenu.refreshQuickMenu();", stmnRefreshTimer);
	},

	doRetrieve : function()
	{
		if( "guest" == portalPage.getUserId() ) return;
		
		var param = "";
		portalPage.m_ajax.send("POST", portalPage.getContextPath() + "/userMenu/listQuickMenuForAjax.face", param, false, { success: function(data){ quickMenu.doRetrieveHandler(data) }});
	},
	doRetrieveHandler : function(resultObject)
	{
		var bodyElem = document.getElementById('Enview.Portal.UserQuickmenu');
	    var tr_tag = null;
	    var td_tag = null;

		for(; bodyElem.hasChildNodes(); )
			bodyElem.removeChild( bodyElem.childNodes[0] );
		
		var tmp = "";
		for(i=0; i<resultObject.Data.length; i++) {
			tmp += "<div>" + 
				   "<a href='" + portalPage.getContextPath() + "/portal" + resultObject.Data[ i ].url + "'>" +
			       "<img src='" + portalPage.getContextPath() + portalPage.getThemePath() + "/images/menu/" + resultObject.Data[ i ].name + ".gif' title='" + resultObject.Data[ i ].title + "'>" + 
				   "</a><img src='" + portalPage.getContextPath() + portalPage.getThemePath() + "/images/waste_bin.gif' align='absmiddle' title='" + portalPage.getMessageResource("ev.info.quick.remove") + "' onclick='javascript:quickMenu.doRemove(" + resultObject.Data[ i ].id + ")'>" + 
				   "</div>";
		}
		//alert( tmp );
		//this.m_domElement.innerHTML = tmp;
		bodyElem.innerHTML = tmp;
	},
	doCreate : function()
	{
		var param = "pageId=" + portalPage.getId();
		portalPage.m_ajax.send("POST", portalPage.getContextPath() + "/userMenu/addQuickMenuForAjax.face", param, false, { 
			success: function(data){ 
				//quickMenu.doRetrieve() 
				location.reload();
		}});
	},
	doRemove : function(id)
	{
		var param = "pageId=" + id;
		portalPage.m_ajax.send("POST", portalPage.getContextPath() + "/userMenu/removeQuickMenuForAjax.face", param, false, { 
			success: function(data){ 
				//quickMenu.doRetrieve() 
				location.reload();
		}});
	}
}

enview.portal.Notice = function()
{
	
}

enview.portal.Notice.prototype =
{
	m_domElement : null,
	m_createHandler : null,
	m_removeHandler : null,
	m_retrieveHandler : null,
	m_selectHandler : null,
	
	init : function(pageId)
	{
		this.doRetrieve(pageId);
	},
	doRetrieve : function(pageId)
	{
		var param = "pageId=" + pageId;
		portalPage.m_ajax.send("POST", portalPage.getContextPath() + "/notice/activeListForAjax.admin", param, false, { success: function(data){ noticeManager.doRetrieveHandler(data) }});
	},
	doRetrieveHandler : function(resultObject)
	{
		var notices = resultObject.getElementsByTagName("notice");
		//alert("notice size=" + notices.length);
		if (notices != null && notices.length > 0)
		{
			for (ix=0; ix < notices.length; ix++)
			{
				var emergency = portalPage.m_ajax.retrieveElementValue("emergency", notices[ix]);
				var noticeId = portalPage.m_ajax.retrieveElementValue("noticeId", notices[ix]);
				var title = portalPage.m_ajax.retrieveElementValue("title", notices[ix]);
				var content = portalPage.m_ajax.retrieveElementValue("content", notices[ix]);
				var template = portalPage.m_ajax.retrieveElementValue("template", notices[ix]);
				var layoutX = portalPage.m_ajax.retrieveElementValue("layoutX", notices[ix]);
				var layoutY = portalPage.m_ajax.retrieveElementValue("layoutY", notices[ix]);
				var layoutWidth = portalPage.m_ajax.retrieveElementValue("layoutWidth", notices[ix]);
				var layoutHeight = portalPage.m_ajax.retrieveElementValue("layoutHeight", notices[ix]);
			
				//alert("emergency=" + emergency);
				if( emergency == "true" ) {
					if( template != null && template.length > 0 ) {
						invokeEnviewNotice(portalPage.getContextPath(), noticeId, template, layoutX, layoutY, layoutWidth, layoutHeight);
					}
					else {
						var dialogTag = document.createElement("div");
						dialogTag.id = "Enview.Portal.Notice" + noticeId;
						dialogTag.setAttribute("class", "notice-infomation");
						dialogTag.setAttribute("className", "notice-infomation");
						dialogTag.style.zIndex = "10";
						dialogTag.style.left = layoutX + "px";
						dialogTag.style.top = layoutY + "px";
						dialogTag.style.width = layoutWidth + "px";
						dialogTag.style.height = layoutHeight + "px";
						 
						var dialogHtml = "";
						dialogHtml  ="<table width='100%' border='0' cellpadding='0' cellspacing='0' style='padding:1px; cursor: hand;'><tr><td colspan='2'>";
						dialogHtml += content;
						dialogHtml +="</td></tr><tr bgcolor='#8e8e8e' ><td align='left'><label>";
						dialogHtml +="<input type='checkbox' id='Enview.Portal.Notice.Checkbox" + noticeId + "'/></label>";
						dialogHtml +="<img src='" + portalPage.getContextPath() + "/statics/templates/notice/images/label01.gif' align='absmiddle'/></td>";
						dialogHtml +="<td align='right'>";
						dialogHtml +="<a href='javascript:noticeManager.close(" + noticeId + ")' onFocus='this.blur()'>";
						dialogHtml +="<img src='" + portalPage.getContextPath() + "/statics/templates/notice/images/btn_close.gif' border='0' align='absmiddle'/>";
						dialogHtml +="</a></td></tr></table>";
						
						dialogTag.innerHTML = dialogHtml;
						
						document.body.appendChild( dialogTag );
					}
				}
				else {
					alert(content);
				}
			}
		}
	},
	close : function(noticeId)
	{
		var isCloseToday = document.getElementById("Enview.Portal.Notice.Checkbox" + noticeId).checked;
		if( isCloseToday == true ) {
			var todayDate = new Date(); 
			todayDate.setDate( todayDate.getDate() + 1 ); 
			document.cookie = "ENVIEW_NOTICE_" + noticeId + "=" + escape( "no" ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
		}
		
		var dom = document.getElementById("Enview.Portal.Notice" + noticeId);
		if( dom ) {
			dom.style.display = "none";
		}
	}
}


enview.portal.About = function()
{
	
}
enview.portal.About.prototype =
{
	m_domElement: null,
	
	init: function ()
	{
		var x = 0;
		var y = 0;
		var width = 200;
		var height = 260;

		this.m_domElement = document.createElement("div");
		this.m_domElement.ch = true;
		this.m_domElement.id = "AboutDialog";
		this.m_domElement.title = "About Enview...";
		//this.m_domElement.setAttribute("class", "webpanel");
		//this.m_domElement.setAttribute("className", "webpanel");
		//this.m_domElement.style.width = width + "px"; 
		//this.m_domElement.style.height = height + "px";
		//this.m_domElement.style.position = "absolute";
		this.m_domElement.style.zIndex = "998";
		this.m_domElement.style.display = 'none';
		this.m_domElement.style.width = 223 + 'px';
				
		/*
		if (document.layers) { 
			x = screen.width / 2 - width / 2; 
			y = screen.height / 2 - height / 2; 
			//alert("document.layers screen.width=" + screen.width + ", screen.height=" + screen.height + ", x=" + x + ",y=" + y);
		}  
		else { 
			x = document.body.offsetWidth / 2 - width / 2; 
			y = document.body.offsetHeight / 2 - height / 2; 
			//x = screen.width / 2 - document.body.offsetWidth / 2; 
			//y = -75 + screen.height / 2 - document.body.offsetHeight / 2; 
			//alert("screen.width=" + screen.width + ", document.body.offsetWidth=" + document.body.offsetWidth + ", screen.height=" + screen.height + ", document.body.offsetHeight=" + document.body.offsetHeight + ", x=" + x + ",y=" + y);
		}  
 
		//var x = (window.width)/2 - 250;
		//var y = (window.height)/2 - 175;
		this.m_domElement.style.left = x + "px";
		this.m_domElement.style.top = y + "px";
		*/
		
		var version = portalPage.getMessageResource("ev.info.portalAboutVersion");
		var aboutContent = portalPage.getMessageResource("ev.info.portalAboutMessage");
		
		var dlgHtml = "";
		dlgHtml += "<table height='100%' style='margin:0; width: 180px;'><tr><td>";
		dlgHtml += "<table style='width: 100%;' border='0' cellspacing='0' cellpadding='0' background='" + portalPage.getContextPath() + "/decorations/layout/images/topimg_bg.jpg'>";
		dlgHtml += "<tr> ";
		dlgHtml += "<td ><img src='" + portalPage.getContextPath() + "/decorations/layout/images/logo.gif' width='200' height='52'></td>";
		dlgHtml += "<td>&nbsp;</td>";
		dlgHtml += "</tr>";
		dlgHtml += "</table></td></tr>";
		dlgHtml += "<tr><td><table class='webpanel' border='0' cellspacing='0' cellpadding='0' ";
		dlgHtml += "<tr><td>&nbsp;</td> </tr>";
		dlgHtml += "<tr> ";
		dlgHtml += "<td style='FONT-FAMILY: Verdana, Geneva, Arial, Helvetica, sans-serif; FONT-SIZE: 8pt; FONT-COLOR: #999999' align='left'>";
		dlgHtml += "<b>" + version + "</b>: " + portalPage.getVersion();
		dlgHtml += "</td>";
		dlgHtml += "</tr>";
		dlgHtml += "<tr> ";
		dlgHtml += "<td style='FONT-FAMILY: Verdana, Geneva, Arial, Helvetica, sans-serif; FONT-SIZE: 8pt; FONT-COLOR: #999999' align='left'>";
		dlgHtml += "</td>";
		dlgHtml += "</tr>";
		dlgHtml += "<tr> ";
		dlgHtml += "<td style='FONT-FAMILY: Verdana, Geneva, Arial, Helvetica, sans-serif; FONT-SIZE: 8pt; FONT-COLOR: #999999' align='left'>";
		dlgHtml += "<textarea id='Portal.Enview.About' cols='30' rows='7' style='overflow-y: auto; FONT-FAMILY: Verdana, Geneva, Arial, Helvetica, sans-serif; FONT-SIZE: 8pt; FONT-COLOR: #999999' readonly='true'></textarea>";
		dlgHtml += "</td>";
		dlgHtml += "</tr>";
		dlgHtml += "</table></td></tr>";
//		dlgHtml += "<tr><td><table width='100%' border='0' cellspacing='0' cellpadding='0' style='padding: 10px 15px 10px 15px;'>";
//		dlgHtml += "<tr> ";
//		dlgHtml += "<td align='right'>";
//		dlgHtml += "<img src='" + portalPage.getContextPath() + "/decorations/layout/images/button/" + portalPage.getLangKnd() + "/btn_close.gif' hspace='2' align='absmiddle' style='cursor:hand' onclick='portalPage.hideAbout();'>";
//		dlgHtml += "</td>";
//		dlgHtml += "</tr></table>";
		dlgHtml += "</td></tr>";
		dlgHtml += "</table>";
		
		this.m_domElement.innerHTML = dlgHtml;
		document.body.appendChild( this.m_domElement );
		
		document.getElementById("Portal.Enview.About").value = aboutContent;
		
		$("#AboutDialog").dialog({
			autoOpen: false,
			resizable: false,
			width:230, 
			height:450,
			modal: true
		});
	},
	
	doShow: function ()
	{
		this.m_domElement.style.display = "";
		$('#AboutDialog').dialog('open');
		/*
		if( !this.m_hiddenDIV ) {
			//this.m_hiddenDIV = document.createElement("div");
			this.m_hiddenDIV = document.getElementById("Enview.Portal.DialogBasePane");
			this.m_hiddenDIV.setAttribute("class", "veilDiv");
			this.m_hiddenDIV.setAttribute("className", "veilDiv");
			this.m_hiddenDIV.style.background = "#EEEEEE";
			this.m_hiddenDIV.style.border = "0";
			this.m_hiddenDIV.style.position = "absolute";
			this.m_hiddenDIV.style.top = "0px";
			this.m_hiddenDIV.style.left = "0px";
			this.m_hiddenDIV.style.zIndex = "990";
			if (document.all) this.m_hiddenDIV.style.filter = "alpha(opacity=30)";
			else this.m_hiddenDIV.style.opacity = "0.3";
			//document.body.appendChild( this.m_hiddenDIV );
		}
		this.m_hiddenDIV.style.display = "";
		if (document.all) this.m_hiddenDIV.style.width = document.body.scrollWidth;
		else this.m_hiddenDIV.style.width = document.width;
		if (document.all) this.m_hiddenDIV.style.height = document.body.scrollHeight;
		else this.m_hiddenDIV.style.height = document.height;
		
		if (document.all)	// it is IE
		{
			if (!this.m_domElement.overlap) {
				this.m_domElement.overlap = new Array ();
			}
		
			portalPage.getUtility().hideControl ("SELECT", this.m_domElement, null);
		}
		
		this.m_domElement.style.display='';
		*/
	},
	doHide : function()
	{
		if( this.m_domElement != null) {
			this.m_domElement.style.display = "none";
			
			if (document.all)	// it is IE
			{
				portalPage.getUtility().showControl ( this.m_domElement );
			}
			
			if( this.m_hiddenDIV ) {
				this.m_hiddenDIV.style.display = "none";
			}
		}
	}
}