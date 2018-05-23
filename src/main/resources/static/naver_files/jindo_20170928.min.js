var jindo=window.jindo||{};
jindo._p_={};
jindo._p_.jindoName="jindo";
if(window[jindo._p_.jindoName]){var __old_j=window[jindo._p_.jindoName];
for(var i in __old_j){jindo[i]=__old_j[i]
}}function _settingPolyfill(d,f,b,a,c){if(c||!d[f].prototype[b]){d[f].prototype[b]=a
}}function polyfillArray(a){function b(c){if(typeof c!=="function"){throw new TypeError("callback is not a function.")
}}_settingPolyfill(a,"Array","forEach",function(h,f){b(h);
var d=arguments.length>=2?f:void 0;
for(var g=0,c=this.length;
g<c;
g++){h.call(d,this[g],g,this)
}});
_settingPolyfill(a,"Array","every",function(h,f){b(h);
var d=arguments.length>=2?f:void 0;
for(var g=0,c=this.length;
g<c;
g++){if(!h.call(d,this[g],g,this)){return false
}}return true
})
}if(!window.__isPolyfillTestMode){polyfillArray(window)
}if(!Function.prototype.bind){Function.prototype.bind=function(c){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
}var a=Array.prototype.slice.call(arguments,1),f=this,d=function(){},b=function(){return f.apply(d.prototype&&this instanceof d&&c?this:c,a.concat(Array.prototype.slice.call(arguments)))
};
d.prototype=this.prototype;
b.prototype=new d();
return b
}}function polyfillTimer(d){var j=d.navigator.userAgent,q=/i(Pad|Phone|Pod)/.test(j),p;
if(q){var s=j.match(/OS\s(\d)/);
if(s){p=parseInt(s[1],10)
}}var n=d.requestAnimationFrame||d.webkitRequestAnimationFrame||d.mozRequestAnimationFrame||d.msRequestAnimationFrame,k=d.cancelAnimationFrame||d.webkitCancelAnimationFrame||d.mozCancelAnimationFrame||d.msCancelAnimationFrame;
if(n&&!k){var a={},g=n;
n=function(y){function w(){if(a[t]){y()
}}var t=g(w);
a[t]=true;
return t
};
k=function(t){delete a[t]
}}else{if(!(n&&k)){n=function(t){return d.setTimeout(t,16)
};
k=d.clearTimeout
}}d.requestAnimationFrame=n;
d.cancelAnimationFrame=k;
if(p>=6){d.requestAnimationFrame(function(){})
}if(p==6){var h={},c="setTimeout",f="clearTimeout",m="setInterval",b="clearInterval",r={setTimeout:d.setTimeout.bind(d),clearTimeout:d.clearTimeout.bind(d),setInterval:d.setInterval.bind(d),clearInterval:d.clearInterval.bind(d)};
[[c,f],[m,b]].forEach(function(t){d[t[0]]=(function(w,y){return function(B,z){var A={key:"",isCall:false,timerType:w,clearType:y,realCallback:B,callback:function(){var C=this.realCallback;
C();
if(this.timerType===c){this.isCall=true;
delete h[this.key]
}},delay:z,createdTime:d.Date.now()};
A.key=r[w](A.callback.bind(A),z);
h[A.key]=A;
return A.key
}})(t[0],t[1]);
d[t[1]]=(function(w){return function(y){if(y&&h[y]){r[w](h[y].key);
delete h[y]
}}
})(t[1])
});
function o(){var y=d.Date.now();
var w={},A;
for(var t in h){var z=h[t];
r[z.clearType](h[t].key);
delete h[t];
if(z.timerType==c){A=y-z.createdTime;
z.delay=(A>=z.delay)?0:z.delay-A
}if(!z.isCall){z.key=r[z.timerType](z.callback.bind(z),z.delay);
w[t]=z
}}h=w;
w=null
}d.addEventListener("scroll",function(t){o()
})
}return d
}if(!window.__isPolyfillTestMode){polyfillTimer(window)
}jindo._p_={};
jindo._p_.jindoName="jindo";
jindo._p_._j_ag=navigator.userAgent;
jindo._p_._JINDO_IS_FF=jindo._p_._j_ag.indexOf("Firefox")>-1;
jindo._p_._JINDO_IS_OP=jindo._p_._j_ag.indexOf("Opera")>-1;
jindo._p_._JINDO_IS_SP=jindo._p_._j_ag.indexOf("Safari")>-1;
jindo._p_._JINDO_IS_SF=jindo._p_._j_ag.indexOf("Apple")>-1;
jindo._p_._JINDO_IS_CH=jindo._p_._j_ag.indexOf("Chrome")>-1;
jindo._p_._JINDO_IS_WK=jindo._p_._j_ag.indexOf("WebKit")>-1;
jindo._p_._JINDO_IS_MO=/(iPad|Mobile|Android|Nokia|webOS|BlackBerry|Opera Mini)/.test(jindo._p_._j_ag);
jindo._p_.trim=function(c){var a="\\s|\\t|"+String.fromCharCode(12288),b=new RegExp(["^(?:",")+|(?:",")+$"].join(a),"g");
return c.replace(b,"")
};
jindo.$Jindo=function(){var a=arguments.callee;
var b=a._cached;
if(b){return b
}if(!(this instanceof a)){return new a()
}if(!b){a._cached=this
}this.version="2.10.0-MAIN"
};
jindo.$Jindo.VERSION="2.10.0-MAIN";
jindo._p_.addExtension=function(c,a,b){if(jindo[c][a]){jindo.$Jindo._warn(c+"."+a+" was overwrite.")
}else{if(/^x/.test(a)){jindo[c][a]=b
}else{jindo.$Jindo._warn("The Extension Method("+c+"."+a+") must be used with x prefix.")
}}};
jindo.$Jindo.compatible=function(){return false
};
jindo.$Jindo.mixin=function(d,a){g_checkVarType(arguments,{obj:["oDestination:Hash+","oSource:Hash+"]},"<static> $Jindo#mixin");
var c={};
for(var b in d){c[b]=d[b]
}for(b in a){if(a.hasOwnProperty(b)&&!jindo.$Jindo.isHash(a[b])){c[b]=a[b]
}}return c
};
jindo._p_._objToString=Object.prototype.toString;
jindo.$Error=function(b,a){this.message="\tmethod : "+a+"\n\tmessage : "+b;
this.type="Jindo Custom Error";
this.toString=function(){return this.message+"\n\t"+this.type
}};
jindo.$Except={CANNOT_USE_OPTION:"해당 옵션은 사용할 수 없습니다.",CANNOT_USE_HEADER:"type이 jsonp 또는 데스크탑 환경에서 CORS 호출시 XDomainRequest(IE8,9) 객체가 사용되는 경우 header메서드는 사용할 수 없습니다.",PARSE_ERROR:"파싱중 에러가 발생했습니다.",NOT_FOUND_ARGUMENT:"파라미터가 없습니다.",NOT_STANDARD_QUERY:"css셀렉터가 정상적이지 않습니다.",INVALID_DATE:"날짜 포멧이 아닙니다.",REQUIRE_AJAX:"가 없습니다.",NOT_FOUND_ELEMENT:"엘리먼트가 없습니다.",HAS_FUNCTION_FOR_GROUP:"그룹으로 지우지 않는 경우 detach할 함수가 있어야 합니다.",NONE_ELEMENT:"에 해당하는 엘리먼트가 없습니다.",NOT_SUPPORT_SELECTOR:"는 지원하지 않는 selector입니다.",NOT_SUPPORT_CORS:"현재 브라우저는 CORS를 지원하지 않습니다.",NOT_SUPPORT_METHOD:"desktop에서 지원하지 않는 메서드 입니다.",JSON_MUST_HAVE_ARRAY_HASH:"get메서드는 json타입이 hash나 array타입만 가능합니다.",MUST_APPEND_DOM:"document에 붙지 않은 엘리먼트를 기준 엘리먼트로 사용할 수 없습니다.",NOT_USE_CSS:"는 css를 사용 할수 없습니다.",NOT_WORK_DOMREADY:"domready이벤트는 iframe안에서 사용할 수 없습니다.",CANNOT_SET_OBJ_PROPERTY:"속성은 오브젝트입니다.\n클래스 속성이 오브젝트이면 모든 인스턴스가 공유하기 때문에 위험합니다.",NOT_FOUND_HANDLEBARS:"{{not_found_handlebars}}"};
jindo._p_._toArray=function(a){return Array.prototype.slice.apply(a)
};
try{Array.prototype.slice.apply(document.documentElement.childNodes)
}catch(e){jindo._p_._toArray=function(d){var c=[];
var b=d.length;
for(var a=0;
a<b;
a++){c.push(d[a])
}return c
}}jindo.$Jindo.isNumeric=function(a){return !isNaN(parseFloat(a))&&!jindo.$Jindo.isArray(a)&&isFinite(a)
};
(function(){var d={Element:1,Document:9};
for(var b in d){jindo.$Jindo["is"+b]=(function(g,f){return function(h){if(new RegExp(g).test(jindo._p_._objToString.call(h))){return true
}else{if(jindo._p_._objToString.call(h)=="[object Object]"&&h!==null&&h!==undefined&&h.nodeType==f){return true
}}return false
}})(b,d[b])
}var c=["Function","Array","String","Boolean","Date","RegExp"];
for(var b=0,a=c.length;
b<a;
b++){jindo.$Jindo["is"+c[b]]=(function(f){return function(g){return jindo._p_._objToString.call(g)=="[object "+f+"]"
}})(c[b])
}})();
jindo.$Jindo.isNode=function(b){try{return !!(b&&b.nodeType)
}catch(a){return false
}};
jindo.$Jindo.isHash=function(a){return jindo._p_._objToString.call(a)=="[object Object]"&&a!==null&&a!==undefined&&!!!a.nodeType&&!jindo.$Jindo.isWindow(a)
};
jindo.$Jindo.isNull=function(a){return a===null
};
jindo.$Jindo.isUndefined=function(a){return a===undefined
};
jindo.$Jindo.isWindow=function(a){return a&&(a==window.top||a==a.window)
};
jindo.$Jindo.Break=function(){if(!(this instanceof arguments.callee)){throw new arguments.callee
}};
jindo.$Jindo.Continue=function(){if(!(this instanceof arguments.callee)){throw new arguments.callee
}};
jindo.$Jindo._F=function(a){return a
};
jindo.$Jindo._warn=function(a){window.console&&((console.warn&&console.warn(a),true)||(console.log&&console.log(a),true))
};
jindo.$Jindo._maxWarn=function(a,b,c){if(a>b){jindo.$Jindo._warn("추가적인 파라미터가 있습니다. : "+c)
}};
jindo.$Jindo.checkVarType=function(h,o,b){var b=b||h.callee.name||"anonymous";
var w=jindo.$Jindo;
var D=w.compatible();
var d=h.callee["_checkVarType_"+D];
if(d){return d(h,o,b)
}var t=[];
t.push("var nArgsLen = aArgs.length;");
t.push("var $Jindo = "+jindo._p_.jindoName+".$Jindo;");
if(D){t.push("var nMatchScore;");
t.push("var nMaxMatchScore = -1;");
t.push("var oFinalRet = null;")
}var f=[];
var a=0;
for(var r in o){if(o.hasOwnProperty(r)){a=Math.max(o[r].length,a)
}}for(var r in o){if(o.hasOwnProperty(r)){var s=o[r];
var m=s.length;
var q=[];
var j=[];
var p=[];
if(!D){if(m<a){j.push("nArgsLen === "+m)
}else{j.push("nArgsLen >= "+m)
}}p.push("var oRet = new $Jindo._varTypeRetObj();");
var E=m;
for(var C=0;
C<m;
++C){/^([^:]+):([^\+]*)(\+?)$/.test(s[C]);
var k=RegExp.$1,y=RegExp.$2,c=RegExp.$3?true:false;
if(y==="Variant"){if(D){j.push(C+" in aArgs")
}p.push('oRet["'+k+'"] = aArgs['+C+"];");
E--
}else{if(w._varTypeList[y]){var A="tmp"+y+"_"+C;
q.push("var "+A+" = $Jindo._varTypeList."+y+"(aArgs["+C+"], "+c+");");
j.push(A+" !== "+jindo._p_.jindoName+".$Jindo.VARTYPE_NOT_MATCHED");
p.push('oRet["'+k+'"] = '+A+";")
}else{if(/^\$/.test(y)&&jindo[y]){var B="",g;
if(c){g=({$Fn:"Function",$S:"String",$A:"Array",$H:"Hash",$ElementList:"Array"})[y]||y.replace(/^\$/,"");
if(jindo.$Jindo["is"+g]){B=" || $Jindo.is"+g+"(vNativeArg_"+C+")"
}}j.push("(aArgs["+C+"] instanceof "+jindo._p_.jindoName+"."+y+B+")");
p.push('oRet["'+k+'"] = '+jindo._p_.jindoName+"."+y+"(aArgs["+C+"]);")
}else{if(jindo.$Jindo["is"+y]){var B="",n;
if(c){n=({Function:"$Fn",String:"$S",Array:"$A",Hash:"$H"})[y]||"$"+y;
if(jindo[n]){B=" || aArgs["+C+"] instanceof "+jindo._p_.jindoName+"."+n
}}j.push("($Jindo.is"+y+"(aArgs["+C+"])"+B+")");
p.push('oRet["'+k+'"] = vNativeArg_'+C+";")
}else{throw new Error("VarType("+y+") Not Found")
}}}}}p.push('oRet.__type = "'+r+'";');
if(D){p.push("nMatchScore = "+(m*1000+E*10)+" + (nArgsLen === "+m+" ? 1 : 0);");
p.push("if (nMatchScore > nMaxMatchScore) {");
p.push("	nMaxMatchScore = nMatchScore;");
p.push("	oFinalRet = oRet;");
p.push("}")
}else{p.push("return oRet;")
}f.push(q.join("\n"));
if(j.length){f.push("if ("+j.join(" && ")+") {")
}f.push(p.join("\n"));
if(j.length){f.push("}")
}}}t.push("	$Jindo._maxWarn(nArgsLen,"+a+',"'+b+'");');
for(var C=0;
C<a;
++C){var z="aArgs["+C+"]";
t.push(["var vNativeArg_",C," = ",z," && ",z,".$value ? ",z,".$value() : ",z+";"].join(""))
}if(!D){f.push("$Jindo.checkVarType._throwException(aArgs, oRules, sFuncName);")
}f.push("return oFinalRet;");
h.callee["_checkVarType_"+D]=d=new Function("aArgs,oRules,sFuncName",t.join("\n")+f.join("\n"));
return d(h,o,b)
};
var g_checkVarType=jindo.$Jindo.checkVarType;
jindo.$Jindo._varTypeRetObj=function(){};
jindo.$Jindo._varTypeRetObj.prototype.toString=function(){return this.__type
};
jindo.$Jindo.checkVarType._throwException=function(j,p,a){var d=function(w){for(var y in jindo){if(jindo.hasOwnProperty(y)){var s=jindo[y];
if(typeof s!=="function"){continue
}if(w instanceof s){return y
}}}var t=jindo.$Jindo;
for(var y in t){if(t.hasOwnProperty(y)){if(!/^is(.+)$/.test(y)){continue
}var z=RegExp.$1;
var r=t[y];
if(r(w)){return z
}}}return"Unknown"
};
var g=function(z,t,y){var r=["잘못된 파라미터입니다.",""];
if(z){r.push("호출한 형태 :");
r.push("\t"+z);
r.push("")
}if(t.length){r.push("사용 가능한 형태 :");
for(var s=0,w=t.length;
s<w;
s++){r.push("\t"+t[s])
}r.push("")
}if(y){r.push("매뉴얼 페이지 :");
r.push("\t"+y);
r.push("")
}r.unshift();
return r.join("\n")
};
var f=[];
for(var h=0,b=j.length;
h<b;
++h){try{f.push(d(j[h]))
}catch(m){f.push("Unknown")
}}var c=a+"("+f.join(", ")+")";
var k=[];
for(var q in p){if(p.hasOwnProperty(q)){var o=p[q];
k.push(""+a+"("+o.join(", ").replace(/(^|,\s)[^:]+:/g,"$1")+")")
}}var n;
if(/(\$\w+)#(\w+)?/.test(a)){n="http://jindo.dev.naver.com/docs/jindo/2.10.0-MAIN/desktop/ko/classes/jindo."+encodeURIComponent(RegExp.$1)+".html#method_"+RegExp.$2
}throw new TypeError(g(c,k,n))
};
jindo.$Jindo.varType=function(){var f=this.checkVarType(arguments,{s4str:["sTypeName:String+","fpFunc:Function+"],s4obj:["oTypeLists:Hash+"],g:["sTypeName:String+"]});
var c=jindo.$Jindo._denyTypeListComma;
switch(f+""){case"s4str":var d=","+f.sTypeName.replace(/\+$/,"")+",";
if(c.indexOf(d)>-1){throw new Error("Not allowed Variable Type")
}this._varTypeList[f.sTypeName]=f.fpFunc;
return this;
case"s4obj":var b=f.oTypeLists;
for(var a in b){if(b.hasOwnProperty(a)){fpFunc=b[a];
arguments.callee.call(this,a,fpFunc)
}}return this;
case"g":return this._varTypeList[f.sTypeName]
}};
jindo.$Jindo.VARTYPE_NOT_MATCHED={};
(function(){var c=jindo.$Jindo._varTypeList={};
var b=jindo.$Jindo;
var d=b.VARTYPE_NOT_MATCHED;
c.Numeric=function(g){if(b.isNumeric(g)){return g*1
}return d
};
c.Hash=function(h,g){if(g&&jindo.$H&&h instanceof jindo.$H){return h.$value()
}else{if(b.isHash(h)){return h
}}return d
};
c["$Class"]=function(h,g){if((!b.isFunction(h))||!h.extend){return d
}return h
};
var f=[];
for(var a in b){if(b.hasOwnProperty(a)){if(/^is(.+)$/.test(a)){f.push(RegExp.$1)
}}}b._denyTypeListComma=f.join(",");
b.varType("ArrayStyle",function(h,g){if(!h){return d
}if(/(Arguments|NodeList|HTMLCollection|global|Window)/.test(jindo._p_._objToString.call(h))||/Object/.test(jindo._p_._objToString.call(h))&&b.isNumeric(h.length)){return jindo._p_._toArray(h)
}return d
});
b.varType("Form",function(h,g){if(!h){return d
}if(g&&h.$value){h=h.$value()
}if(h.tagName&&h.tagName.toUpperCase()=="FORM"){return h
}return d
})
})();
jindo._p_._createEle=function(h,g,a,f){var c="R"+new Date().getTime()+parseInt(Math.random()*100000,10);
var d=a.createElement("div");
switch(h){case"select":case"table":case"dl":case"ul":case"fieldset":case"audio":d.innerHTML="<"+h+' class="'+c+'">'+g+"</"+h+">";
break;
case"thead":case"tbody":case"col":d.innerHTML="<table><"+h+' class="'+c+'">'+g+"</"+h+"></table>";
break;
case"tr":d.innerHTML='<table><tbody><tr class="'+c+'">'+g+"</tr></tbody></table>";
break;
default:d.innerHTML='<div class="'+c+'">'+g+"</div>"
}var b;
for(b=d.firstChild;
b;
b=b.firstChild){if(b.className==c){break
}}return f?b:b.childNodes
};
jindo.$=function(k){if(!arguments.length){throw new jindo.$Error(jindo.$Except.NOT_FOUND_ARGUMENT,"$")
}var j=[],o=arguments,n=o.length,h=o[n-1],m=document,c=null;
var d=/^<([a-z]+|h[1-5])>$/i;
var f=/^<([a-z]+|h[1-5])(\s+[^>]+)?>/i;
if(n>1&&typeof h!="string"&&h.body){o=Array.prototype.slice.apply(o,[0,n-1]);
m=h
}for(var g=0;
g<n;
g++){c=o[g]&&o[g].$value?o[g].$value():o[g];
if(jindo.$Jindo.isString(c)||jindo.$Jindo.isNumeric(c)){c+="";
c=c.replace(/^\s+|\s+$/g,"");
c=c.replace(/<!--(.|\n)*?-->/g,"");
if(c.indexOf("<")>-1){if(d.test(c)){c=m.createElement(RegExp.$1)
}else{if(f.test(c)){var b={thead:"table",tbody:"table",tr:"tbody",td:"tr",dt:"dl",dd:"dl",li:"ul",legend:"fieldset",option:"select",source:"audio"};
var r=RegExp.$1.toLowerCase();
var q=jindo._p_._createEle(b[r],c,m);
for(var g=0,a=q.length;
g<a;
g++){j.push(q[g])
}c=null
}}}else{c=m.getElementById(c)
}}if(c&&c.nodeType){j[j.length]=c
}}return j.length>1?j:(j[0]||null)
};
jindo.$Class=function(oDef){var oArgs=g_checkVarType(arguments,{"4obj":["oDef:Hash+"]},"$Class");
function typeClass(){var t=this;
var a=[];
var superFunc=function(m,superClass,func){if(m!="constructor"&&func.toString().indexOf("$super")>-1){var funcArg=func.toString().replace(/function\s*\(([^\)]*)[\w\W]*/g,"$1").split(",");
var funcStr=func.toString().replace(/function[^{]*{/,"").replace(/(\w|\.?)(this\.\$super|this)/g,function(m,m2,m3){if(!m2){return m3+".$super"
}return m
});
funcStr=funcStr.substr(0,funcStr.length-1);
func=superClass[m]=eval("false||function("+funcArg.join(",")+"){"+funcStr+"}")
}return function(){var f=this.$this[m];
var t=this.$this;
var r=(t[m]=func).apply(t,arguments);
t[m]=f;
return r
}};
while(t._$superClass!==undefined){t.$super=new Object;
t.$super.$this=this;
for(var x in t._$superClass.prototype){if(t._$superClass.prototype.hasOwnProperty(x)){if(this[x]===undefined&&x!="$init"){this[x]=t._$superClass.prototype[x]
}if(x!="constructor"&&x!="_$superClass"&&typeof t._$superClass.prototype[x]=="function"){t.$super[x]=superFunc(x,t._$superClass,t._$superClass.prototype[x])
}else{t.$super[x]=t._$superClass.prototype[x]
}}}if(typeof t.$super.$init=="function"){a[a.length]=t
}t=t.$super
}for(var i=a.length-1;
i>-1;
i--){a[i].$super.$init.apply(a[i].$super,arguments)
}if(this.$autoBind){for(var i in this){if(/^\_/.test(i)){this[i]=jindo.$Fn(this[i],this).bind()
}}}if(typeof this.$init=="function"){this.$init.apply(this,arguments)
}}if(oDef.$static!==undefined){var i=0,x;
for(x in oDef){if(oDef.hasOwnProperty(x)){x=="$static"||i++
}}for(x in oDef.$static){if(oDef.$static.hasOwnProperty(x)){typeClass[x]=oDef.$static[x]
}}if(!i){return oDef.$static
}delete oDef.$static
}typeClass.prototype=oDef;
typeClass.prototype.constructor=typeClass;
typeClass.prototype.kindOf=function(oClass){return jindo._p_._kindOf(this.constructor.prototype,oClass.prototype)
};
typeClass.extend=jindo.$Class.extend;
return typeClass
};
jindo._p_._kindOf=function(b,a){if(b!=a){if(b._$superClass){return jindo._p_._kindOf(b._$superClass.prototype,a)
}else{return false
}}else{return true
}};
jindo.$Class.extend=function(c){var d=g_checkVarType(arguments,{"4obj":["oDef:$Class"]},"<static> $Class#extend");
this.prototype._$superClass=c;
var b=c.prototype;
for(var f in b){if(jindo.$Jindo.isHash(b[f])){jindo.$Jindo._warn(jindo.$Except.CANNOT_SET_OBJ_PROPERTY)
}}for(var a in c){if(c.hasOwnProperty(a)){if(a=="prototype"){continue
}this[a]=c[a]
}}return this
};
jindo.VERSION="2.10.0-MAIN";
jindo.TYPE="mobile";
jindo.$$=jindo.cssquery=(function(){var z;
this._dummyWrap;
function h(){var B=z._dummyWrap;
if(!B){z._dummyWrap=B=document.createElement("div");
B.id="__jindo_cssquery_mockdiv";
B.style.cssText="display:none !important;";
B.className="This element is for jindo.$$.test";
document.body.insertBefore(B,document.body.firstChild)
}z._dummyWrap=B
}var k=1;
var A={};
function n(B){return/\[\s*(?:checked|selected|disabled)/.test(B)
}function y(C,B){return C.replace(/\,/gi,B)
}function m(B){return/^[~>+]/.test(B)
}function f(C){if(!C){return document
}var B;
C=C&&C.$value?C.$value():C;
if(jindo.$Jindo.isString(C)){C=document.getElementById(C)
}B=C.nodeType;
if(B!=1&&B!=9&&B!=10&&B!=11){C=C.ownerDocument||C.document
}return C||C.ownerDocument||C.document
}function s(B,D){var C,E;
if(/^\w+$/.test(B.id)){C="#"+B.id
}else{E="C"+new Date().getTime()+Math.floor(Math.random()*1000000);
B.setAttribute(D,E);
C="["+D+"="+E+"]"
}return C
}function j(D,C){var B={method:null,query:null};
if(/^\s*[a-z]+\s*$/i.test(D)){B.method="getElementsByTagName"
}else{if(/^\s*([#\.])([\w\-]+)\s*$/i.test(D)){B.method=RegExp.$1=="#"?"getElementById":"getElementsByClassName";
B.query=RegExp.$2
}}if(!document[B.method]||RegExp.$1=="#"&&!C){B.method=B.query=null
}return B
}function b(D){var G=[],F={},B,C,E;
for(E=0;
C=D[E];
E++){B=q(C);
if(F[B]){continue
}G.push(C);
F[B]=true
}return G
}function q(C){var B=C._cssquery_UID;
if(B&&A[B]==C){return B
}C._cssquery_UID=B=k++;
A[B]=C;
return B
}var d=/(.*?)\s*(![>+~]?)\s*(.*)/;
var c=/[!>~+\s]/;
var a=/(.*?)[!>~+\s]/;
function g(I){var G=[];
var D=I.match(d);
if(D){if(c.test(D[3])){var F;
var C=D[3].replace(a,function(J,K){F=K;
return jindo._p_.trim(J.replace(K,""))
});
G.push({left:D[1],com:D[2],right:jindo._p_.trim(F)});
var H=g(C);
for(var E=0,B=H.length;
E<B;
E++){G.push(H[E])
}}else{G.push({left:D[1],com:D[2],right:D[3]})
}}else{G.push({left:I,com:"",right:""})
}return G
}function t(I,H,D){var G=H;
if(H.nodeType==1){G=H.ownerDocument||H.document
}var F=g(I);
var B=[G];
for(var E=0,C=F.length;
E<C;
E++){B=p(F[E],B,D&&D.single&&(E==F.length-1))
}if(!B){return[]
}return b(B)
}function p(D,E,C){var B=D.com;
switch(B){case"!":case"!>":return o("parentNode",D,E,B=="!",C);
case"!~":case"!+":return o("previousElementSibling",D,E,B=="!~",C);
default:return w(D,E,C)
}}function o(H,J,E,F,B){var I=[];
var L=[];
if(J.left){for(var D=0,C=E.length;
D<C;
D++){I=I.concat(z(J.left,E[D]))
}}else{I=E
}var G;
var K=J.right;
for(var D=0,C=I.length;
D<C;
D++){G=I[D][H];
if(F){while(G){if(z.test(G,K)){L.push(G);
if(L.length>0&&B){break
}}G=G[H]
}}else{if(G&&z.test(G,K)){L.push(G)
}}if(L.length>0&&B){break
}}return L
}function w(F,G,E){var B=[];
for(var D=0,C=G.length;
D<C;
D++){B=B.concat(z(F.left,G[D]));
if(B.length>0&&E){break
}}return B
}var r=document.createElement("div");
z=function(M,B,N){var G=jindo.$Jindo.checkVarType(arguments,{"4str":["sQuery:String+"],"4var":["sQuery:String+","oParent:Variant"],"4var2":["sQuery:String+","oParent:Variant","oOptions:Variant"]},"cssquery"),I,H,R,F,L,D,O,C,E,Q,J="queryid";
B=f(B);
N=N&&N.$value?N.$value():N;
var P=/\[(.*?)=([\w\d]*)\]/g;
if(P.test(M)){M=M.replace(P,"[$1='$2']")
}if(n(M)){throw new jindo.$Error(jindo.$Except.NOT_SUPPORT_SELECTOR,(N&&N.single?"<static> cssquery.getSingle":"cssquery"))
}R=B.nodeType;
C=(B.tagName||"").toUpperCase();
Q=j(M,R==9);
if(Q.query){M=Q.query
}Q=Q.method;
if(R!==9&&C!="HTML"){if(R===11){B=B.cloneNode(true);
O=r.cloneNode(true);
O.appendChild(B);
B=O;
O=null
}if(!Q){D=s(B,J);
M=y(D+" "+M,", "+D+" ")
}if((E=B.parentNode)||C==="BODY"||jindo.$Element._contain((B.ownerDocument||B.document).body,B)){if(!Q){L=B;
B=E
}}else{if(!Q){O=r.cloneNode(true);
L=B;
O.appendChild(L);
B=O
}}}else{B=(B.ownerDocument||B.document||B);
if(m(M)){return[]
}}try{if(!/!=/.test(M)&&M.indexOf("!")>-1){H=t(M,B,N)
}else{if(N&&N.single){if(Q){H=B[Q](M);
H=[Q=="getElementById"?H:H[0]]
}else{H=[B.querySelector(M)]
}}else{if(Q){H=B[Q](M);
if(Q=="getElementById"){H=H?[H]:[]
}}else{H=B.querySelectorAll(M)
}H=jindo._p_._toArray(H)
}}}catch(K){throw K
}finally{if(F){L.removeAttribute(J);
O=null
}}return H
};
z.test=function(D,E){if(!z._dummyWrap){h()
}var B=false;
if(D.nodeType==1){var C=D.cloneNode(false);
z._dummyWrap.appendChild(C);
B=z.getSingle(E,z._dummyWrap)?true:false;
z._dummyWrap.innerHTML=""
}return B
};
z.useCache=function(B){};
z.clearCache=function(){};
z.release=function(){};
z.getSingle=function(D,C,B){return z(D,C,{single:true})[0]||null
};
z.extreme=function(B){};
z._makeQueryParseTree=g;
return z
})();
jindo.$Agent=function(){var a=arguments.callee;
var b=a._cached;
if(b){return b
}if(!(this instanceof a)){return new a
}if(!b){a._cached=this
}this._navigator=navigator;
this._dm=document.documentMode
};
jindo.$Agent.prototype.navigator=function(){var c={};
ver=-1,nativeVersion=-1,u=this._navigator.userAgent,v=this._navigator.vendor||"",dm=this._dm;
function a(g,f){return((f||"").indexOf(g)>-1)
}c.getName=function(){var g="";
for(var f in c){if(f!=="mobile"&&typeof c[f]=="boolean"&&c[f]&&c.hasOwnProperty(f)){g=f
}}return g
};
c.webkit=a("WebKit",u);
c.opera=(window.opera!==undefined)||a("Opera",u)||a("OPR",u);
c.chrome=c.webkit&&!c.opera&&a("Chrome",u)||a("CriOS",u);
c.firefox=a("Firefox",u);
c.mobile=(a("Mobile",u)||a("Android",u)||a("Nokia",u)||a("webOS",u)||a("Opera Mini",u)||a("BlackBerry",u)||(a("Windows",u)&&a("PPC",u))||a("Smartphone",u)||a("IEMobile",u))&&!a("iPad",u);
c.msafari=((!a("IEMobile",u)&&a("Mobile",u))||(a("iPad",u)&&a("Safari",u)))&&!c.chrome&&!c.opera&&!c.firefox;
c.mopera=a("Opera Mini",u);
c.mie=a("PPC",u)||a("Smartphone",u)||a("IEMobile",u);
try{if(c.mie){if(dm>0){ver=dm;
if(u.match(/(?:Trident)\/([\d.]+)/)){var d=parseInt(RegExp.$1,10);
if(d>3){nativeVersion=d+4
}}else{nativeVersion=ver
}}else{nativeVersion=ver=u.match(/(?:MSIE) ([\d.]+)/)[1]
}}else{if(c.msafari){ver=parseFloat(u.match(/Safari\/([\d.]+)/)[1]);
if(ver==100){ver=1.1
}else{if(u.match(/Version\/([\d.]+)/)){ver=RegExp.$1
}else{ver=[1,1.2,-1,1.3,2,3][Math.floor(ver/100)]
}}}else{if(c.mopera){ver=u.match(/(?:Opera\sMini)\/([\d.]+)/)[1]
}else{if(c.opera){ver=u.match(/(?:Version|OPR|Opera)[\/\s]?([\d.]+)(?!.*Version)/)[1]
}else{if(c.firefox){ver=u.match(/Firefox\/([\d.]+)/)[1]
}else{if(c.chrome){ver=u.match(/Chrome[ \/]([\d.]+)/)[1]
}}}}}}c.version=parseFloat(ver);
c.nativeVersion=parseFloat(nativeVersion);
if(isNaN(c.version)){c.version=-1
}}catch(b){c.version=-1
}this.navigator=function(){return c
};
return c
};
jindo.$Agent.prototype.os=function(){var d={},a=this._navigator.userAgent,c=this._navigator.platform,b=function(j,f){return(f.indexOf(j)>-1)
},g=null;
d.getName=function(){var f="";
for(x in d){if(d[x]===true&&d.hasOwnProperty(x)){f=x
}}return f
};
d.ipad=b("iPad",a);
d.iphone=b("iPhone",a)&&!d.ipad;
d.android=b("Android",a);
d.nokia=b("Nokia",a);
d.blackberry=b("BlackBerry",a);
d.mwin=b("PPC",a)||b("Smartphone",a)||b("IEMobile",a)||b("Windows Phone",a);
d.ios=d.ipad||d.iphone;
d.symbianos=b("SymbianOS",a);
d.version=null;
if(d.android){g=a.match(/Android ([\d|\.]+)/);
if(g!=null&&g[1]!=undefined){d.version=g[1]
}}else{if(d.ios){g=a.match(/(iPhone )?OS ([\d|_]+)/);
if(g!=null&&g[2]!=undefined){d.version=String(g[2]).split("_").join(".")
}}else{if(d.blackberry){g=a.match(/Version\/([\d|\.]+)/);
if(g==null){g=a.match(/BlackBerry\s?\d{4}\/([\d|\.]+)/)
}if(g!=null&&g[1]!=undefined){d.version=g[1]
}}else{if(d.symbianos){g=a.match(/SymbianOS\/(\d+.\w+)/);
if(g!=null&&g[1]!=undefined){d.version=g[1]
}}else{if(d.mwin){g=a.match(/Windows CE ([\d|\.]+)/);
if(g!=null&&g[1]!=undefined){d.version=g[1]
}if(!d.version&&(g=a.match(/Windows Phone (OS )?([\d|\.]+)/))){d.version=g[2]
}}}}}}this.os=function(){return d
};
return d
};
jindo.$A=function(f){var a=arguments.callee;
if(f instanceof a){return f
}if(!(this instanceof a)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$A");
return new a(f)
}catch(d){if(d instanceof TypeError){return null
}throw d
}}var c=g_checkVarType(arguments,{"4voi":[],"4arr":["aPram:Array+"],"4nul":["oNull:Null"],"4und":["oUndefined:Undefined"],arrt:["aPram:ArrayStyle"]},"$A");
if(c==null){f=[]
}switch(c+""){case"arrt":case"4arr":f=c.aPram;
break;
case"4nul":case"4und":case"4voi":f=[]
}this._array=[];
for(var b=0;
b<f.length;
b++){this._array[this._array.length]=f[b]
}};
jindo.$A.checkVarTypeObj={"4fun":["fCallback:Function+"],"4thi":["fCallback:Function+","oThis:Variant"]};
jindo.$A.prototype.toString=function(){return this._array.toString()
};
jindo.$A.prototype.get=function(a){g_checkVarType(arguments,{"4num":["nIndex:Numeric"]},"$A#get");
return this._array[a]
};
jindo.$A.prototype.set=function(a,b){g_checkVarType(arguments,{"4num":["nIndex:Numeric","vValue:Variant"]},"$A#set");
this._array[a]=b;
return this
};
jindo.$A.prototype.length=function(f,b){var d=g_checkVarType(arguments,{"4num":[jindo.$Jindo._F("nLen:Numeric")],sv:["nLen:Numeric","vValue:Variant"],"4voi":[]},"$A#length");
switch(d+""){case"4num":this._array.length=d.nLen;
return this;
case"sv":var a=this._array.length;
this._array.length=d.nLen;
for(var c=a;
c<f;
c++){this._array[c]=d.vValue
}return this;
case"4voi":return this._array.length
}};
jindo.$A.prototype.has=function(a){return(this.indexOf(a)>-1)
};
jindo.$A.prototype.indexOf=function(a){return this._array.indexOf(a)
};
jindo.$A.prototype.$value=function(){return this._array
};
jindo.$A.prototype.push=function(a){return this._array.push.apply(this._array,jindo._p_._toArray(arguments))
};
jindo.$A.prototype.pop=function(){return this._array.pop()
};
jindo.$A.prototype.shift=function(){return this._array.shift()
};
jindo.$A.prototype.unshift=function(a){this._array.unshift.apply(this._array,jindo._p_._toArray(arguments));
return this._array.length
};
jindo.$A.prototype.forEach=function(h,a){var c=g_checkVarType(arguments,jindo.$A.checkVarTypeObj,"$A#forEach");
var b=this;
function d(j,k,f){try{h.apply(a||b,jindo._p_._toArray(arguments))
}catch(m){if(!(m instanceof b.constructor.Continue)){throw m
}}}try{this._array.forEach(d)
}catch(g){if(!(g instanceof this.constructor.Break)){throw g
}}return this
};
jindo.$A.prototype.slice=function(c,d){var b=this._array.slice.call(this._array,c,d);
return jindo.$A(b)
};
jindo.$A.prototype.splice=function(b,d){var c=this._array.splice.apply(this._array,jindo._p_._toArray(arguments));
return jindo.$A(c)
};
jindo.$A.prototype.shuffle=function(){this._array.sort(function(d,c){return Math.random()>Math.random()?1:-1
});
return this
};
jindo.$A.prototype.reverse=function(){this._array.reverse();
return this
};
jindo.$A.prototype.empty=function(){this._array.length=0;
return this
};
jindo.$A.prototype.concat=function(d){var c=[];
if(!arguments.length){return this
}else{c=this._array.concat();
for(var b=0,a;
a=arguments[b];
b++){c=c.concat(a instanceof jindo.$A?a._array:a)
}return jindo.$A(c)
}};
jindo.$A.prototype.sort=function(a){var b=g_checkVarType(arguments,{"void":[],"4fp":["fpSort:Function+"]},"$A#sort");
if(a){this._array.sort(jindo.$Fn(b.fpSort,this).bind())
}else{this._array.sort()
}return this
};
jindo.$A.Break=jindo.$Jindo.Break;
jindo.$A.Continue=jindo.$Jindo.Continue;
jindo.$A.prototype.map=function(h,a){var c=g_checkVarType(arguments,jindo.$A.checkVarTypeObj,"$A#map");
if(c==null){return this
}var g=[];
var b=this;
function d(j,k,f){try{g.push(h.apply(a||this,jindo._p_._toArray(arguments)))
}catch(m){if(m instanceof b.constructor.Continue){g.push(j)
}else{throw m
}}}this.forEach(d);
return jindo.$A(g)
};
jindo.$A.prototype.filter=function(j,a){var c=g_checkVarType(arguments,jindo.$A.checkVarTypeObj,"$A#filter");
if(c==null){return this
}var g=[];
var b=this;
function d(k,m,f){try{if(j.apply(a||b,jindo._p_._toArray(arguments))){g.push(k)
}}catch(n){if(!(n instanceof b.constructor.Continue)){throw n
}}}try{this.forEach(d)
}catch(h){if(!(h instanceof this.constructor.Break)){throw h
}}return jindo.$A(g)
};
jindo.$A.prototype.every=function(b,a){g_checkVarType(arguments,jindo.$A.checkVarTypeObj,"$A#every");
return this._array.every(b,a||this)
};
jindo.$A.prototype.some=function(b,a){g_checkVarType(arguments,jindo.$A.checkVarTypeObj,"$A#some");
return this._array.some(b,a||this)
};
jindo.$A.prototype.refuse=function(c){var b=jindo.$A(jindo._p_._toArray(arguments));
return this.filter(function(a,d){return !(b.indexOf(a)>-1)
})
};
jindo.$A.prototype.unique=function(){var f=this._array,c=[],d=f.length;
var h,g;
for(h=0;
h<d;
h++){for(g=0;
g<c.length;
g++){if(f[h]==c[g]){break
}}if(g>=c.length){c[g]=f[h]
}}this._array=c;
return this
};
jindo.$Ajax=function(a,g){var m=arguments.callee;
if(!(this instanceof m)){try{jindo.$Jindo._maxWarn(arguments.length,2,"$Ajax");
return new m(a,g||{})
}catch(k){if(k instanceof TypeError){return null
}throw k
}}var b=jindo.$Ajax;
var d=g_checkVarType(arguments,{"4str":["sURL:String+"],"4obj":["sURL:String+","oOption:Hash+"]},"$Ajax");
if(d+""=="for_string"){d.oOption={}
}function j(){return new XMLHttpRequest()
}var h=location.toString();
var f="";
try{f=h.match(/^https?:\/\/([a-z0-9_\-\.]+)/i)[1]
}catch(k){}this._status=0;
this._url=d.sURL;
this._headers={};
this._options={type:"xhr",method:"post",proxy:"",timeout:0,onload:function(o){},onerror:null,ontimeout:function(o){},jsonp_charset:"utf-8",callbackid:"",callbackname:"",async:true,decode:true,postBody:false,withCredentials:false};
this._options=b._setProperties(d.oOption,this);
b._validationOption(this._options,"$Ajax");
if(b.CONFIG){this.option(b.CONFIG)
}var c=this._options;
c.type=c.type.toLowerCase();
c.method=c.method.toLowerCase();
if(window["__"+jindo._p_.jindoName+"_callback"]===undefined){window["__"+jindo._p_.jindoName+"_callback"]=[];
window["__"+jindo._p_.jindoName+"2_callback"]=[]
}var n=this;
switch(c.type){case"put":case"delete":case"get":case"post":c.method=c.type;
case"xhr":this._request=j();
break;
case"jsonp":if(!b.JSONPRequest){throw new ___error(jindo._p_.jindoName+".$Ajax.JSONPRequest"+___except.REQUIRE_AJAX,"$Ajax")
}this._request=new b.JSONPRequest(function(o,p){return n.option.apply(n,arguments)
})
}this._checkCORS(this._url,c.type,"")
};
jindo.$Ajax.prototype._checkCORS=function(b,c,a){this._bCORS=false;
if(/^http/.test(b)&&!new RegExp("^http://"+window.location.host,"i").test(b)&&c==="xhr"){if(!("withCredentials" in this._request)){throw new jindo.$Error(jindo.$Except.NOT_SUPPORT_CORS,"$Ajax"+a)
}this._bCORS=true
}};
jindo.$Ajax._setProperties=function(c,a){c=c||{};
var b;
if((c.type=="put"||c.type=="delete"||c.type=="get"||c.type=="post")&&!c.method){c.method=c.type;
b=c.type="xhr"
}b=c.type=(c.type||"xhr");
c.onload=jindo.$Fn(c.onload||function(){},a).bind();
c.ontimeout=jindo.$Fn(c.ontimeout||function(){},a).bind();
c.onerror=jindo.$Fn(c.onerror||function(){},a).bind();
c.method=c.method||"post";
if(b=="xhr"){c.async=c.async===undefined?true:c.async;
c.postBody=c.postBody===undefined?false:c.postBody;
c.withCredentials=c.withCredentials===undefined?false:c.withCredentials
}else{if(b=="jsonp"){c.method="get";
c.jsonp_charset=c.jsonp_charset||"utf-8";
c.callbackid=c.callbackid||"";
c.callbackname=c.callbackname||""
}}return c
};
jindo.$Ajax._validationOption=function(k,j){var d=jindo.$Error;
var c=jindo.$Except;
var a=k.type;
if(a==="jsonp"){if(k.method!=="get"){jindo.$Jindo._warn(c.CANNOT_USE_OPTION+"\n\t"+j+"-method="+k.method)
}}else{if(a==="flash"){if(!(k.method==="get"||k.method==="post")){jindo.$Jindo._warn(c.CANNOT_USE_OPTION+"\n\t"+j+"-method="+k.method)
}}}if(k.postBody){if(!(a==="xhr"&&(k.method!=="get"))){jindo.$Jindo._warn(c.CANNOT_USE_OPTION+"\n\t"+k.method+"-postBody="+k.postBody)
}}var b={xhr:"onload|timeout|ontimeout|onerror|async|method|postBody|type|withCredentials",jsonp:"onload|timeout|ontimeout|onerror|jsonp_charset|callbackid|callbackname|method|type"},m=[],h=0;
for(m[h++] in k){}var g=b[a]||"";
for(var h=0,f=m.length;
h<f;
h++){if(g.indexOf(m[h])==-1){jindo.$Jindo._warn(c.CANNOT_USE_OPTION+"\n\t"+a+"-"+m[h])
}}};
jindo.$Ajax.prototype._onload=function(){var a=this._request.status;
var b=this._request.readyState==4&&(a==200||a==0);
var c;
if(this._request.readyState==4){try{if((!b)&&jindo.$Jindo.isFunction(this._options.onerror)){this._options.onerror(new jindo.$Ajax.Response(this._request))
}else{c=this._options.onload(new jindo.$Ajax.Response(this._request))
}}finally{this._status--;
if(jindo.$Jindo.isFunction(this._oncompleted)){this._oncompleted(b,c)
}}}};
jindo.$Ajax.prototype.request=function(d){var b=jindo.$Jindo;
var j=b.checkVarType(arguments,{"4voi":[],"4obj":[b._F("oData:Hash+")],"4str":["sData:String+"]},"$Ajax#request");
this._status++;
var y=this;
var q=this._request;
var f=this._options;
var o,w,s=[],o="";
var g=null;
var c=this._url;
this._is_abort=false;
var p=f.type.toUpperCase();
var n=f.method.toUpperCase();
if(f.postBody&&p=="XHR"&&n!="GET"){if(j+""=="4str"){o=j.sData
}else{if(j+""=="4obj"){o=jindo.$Json(j.oData).toString()
}else{o=null
}}}else{switch(j+""){case"4voi":o=null;
break;
case"4obj":var d=j.oData;
for(var h in d){if(d.hasOwnProperty(h)){w=d[h];
if(b.isFunction(w)){w=w()
}if(b.isArray(w)||(jindo.$A&&w instanceof jindo.$A)){if(w instanceof jindo.$A){w=w._array
}for(var m=0;
m<w.length;
m++){s[s.length]=h+"="+encodeURIComponent(w[m])
}}else{s[s.length]=h+"="+encodeURIComponent(w)
}}}o=s.join("&")
}}if(o&&p=="XHR"&&n=="GET"){if(c.indexOf("?")==-1){c+="?"
}else{c+="&"
}c+=o;
o=null
}if(p=="XHR"){q.open(n,c,!!f.async)
}else{q.open(n,c)
}if(f.withCredentials){q.withCredentials=true
}if(p=="XHR"&&n=="POST"){q.setRequestHeader("If-Modified-Since","Thu, 1 Jan 1970 00:00:00 GMT")
}if(p=="XHR"){if(!this._headers["Content-Type"]){q.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8")
}if(!this._bCORS&&!this._headers["X-Requested-With"]){q.setRequestHeader("X-Requested-With","XMLHttpRequest")
}for(var r in this._headers){if(this._headers.hasOwnProperty(r)){if(typeof this._headers[r]=="function"){continue
}q.setRequestHeader(r,String(this._headers[r]))
}}}if(q.addEventListener){if(this._loadFunc){q.removeEventListener("load",this._loadFunc,false)
}if(this._errorFun){q.removeEventListener("error",this._errorFun,false)
}this._loadFunc=function(a){clearTimeout(g);
g=undefined;
y._onload()
};
this._errorFun=function(a){clearTimeout(g);
g=undefined;
y._options.onerror(new jindo.$Ajax.Response(y._request))
};
q.addEventListener("load",this._loadFunc,false);
q.addEventListener("error",this._errorFun,false)
}else{if(q.onload!==undefined){q.onload=function(a){if(q.readyState==4&&!y._is_abort){clearTimeout(g);
g=undefined;
y._onload()
}}
}else{q.onreadystatechange=function(a){if(q.readyState==4){clearTimeout(g);
g=undefined;
y._onload()
}}
}}if(f.timeout>0){if(this._timer){clearTimeout(this._timer)
}g=setTimeout(function(){y._is_abort=true;
if(y._interval){clearInterval(y._interval);
y._interval=undefined
}try{q.abort()
}catch(a){}f.ontimeout(q);
if(b.isFunction(y._oncompleted)){y._oncompleted(false)
}},f.timeout*1000);
this._timer=g
}this._test_url=c;
q.send(o);
return this
};
jindo.$Ajax.prototype.isIdle=function(){return this._status==0
};
jindo.$Ajax.prototype.abort=function(){try{if(this._interval){clearInterval(this._interval)
}if(this._timer){clearTimeout(this._timer)
}this._interval=undefined;
this._timer=undefined;
this._is_abort=true;
this._request.abort()
}finally{this._status--
}return this
};
jindo.$Ajax.prototype.url=function(b){var a=g_checkVarType(arguments,{g:[],s:["sURL:String+"]},"$Ajax#url");
switch(a+""){case"g":return this._url;
case"s":this._checkCORS(a.sURL,this._options.type,"#url");
this._url=a.sURL;
return this
}};
jindo.$Ajax.prototype.option=function(b,d){var c=g_checkVarType(arguments,{s4var:["sKey:String+","vValue:Variant"],s4obj:["oOption:Hash+"],g:["sKey:String+"]},"$Ajax#option");
switch(c+""){case"s4var":c.oOption={};
c.oOption[c.sKey]=c.vValue;
case"s4obj":var g=c.oOption;
try{for(var a in g){if(g.hasOwnProperty(a)){if(a==="onload"||a==="ontimeout"||a==="onerror"){this._options[a]=jindo.$Fn(g[a],this).bind()
}else{this._options[a]=g[a]
}}}}catch(f){}break;
case"g":return this._options[c.sKey]
}this._checkCORS(this._url,this._options.type,"#option");
jindo.$Ajax._validationOption(this._options,"$Ajax#option");
return this
};
jindo.$Ajax.prototype.header=function(b,d){if(this._options.type==="jsonp"){jindo.$Jindo._warn(jindo.$Except.CANNOT_USE_HEADER)
}var c=g_checkVarType(arguments,{s4str:["sKey:String+","sValue:String+"],s4obj:["oOption:Hash+"],g:["sKey:String+"]},"$Ajax#option");
switch(c+""){case"s4str":this._headers[c.sKey]=c.sValue;
break;
case"s4obj":var g=c.oOption;
try{for(var a in g){if(g.hasOwnProperty(a)){this._headers[a]=g[a]
}}}catch(f){}break;
case"g":return this._headers[c.sKey]
}return this
};
jindo.$Ajax.Response=function(a){this._response=a;
this._regSheild=/^for\(;;\);/
};
jindo.$Ajax.Response.prototype.xml=function(){return this._response.responseXML
};
jindo.$Ajax.Response.prototype.text=function(){return this._response.responseText.replace(this._regSheild,"")
};
jindo.$Ajax.Response.prototype.status=function(){var a=this._response.status;
return a==0?200:a
};
jindo.$Ajax.Response.prototype.readyState=function(){return this._response.readyState
};
jindo.$Ajax.Response.prototype.json=function(){if(this._response.responseJSON){return this._response.responseJSON
}else{if(this._response.responseText){try{return eval("("+this.text()+")")
}catch(e){throw new jindo.$Error(jindo.$Except.PARSE_ERROR,"$Ajax#json")
}}}return{}
};
jindo.$Ajax.Response.prototype.header=function(a){var b=g_checkVarType(arguments,{"4str":["name:String+"],"4voi":[]},"$Ajax.Response#header");
switch(b+""){case"4str":return this._response.getResponseHeader(a);
case"4voi":return this._response.getAllResponseHeaders()
}};
var klass=jindo.$Class;
jindo.$Ajax.RequestBase=klass({_respHeaderString:"",callbackid:"",callbackname:"",responseXML:null,responseJSON:null,responseText:"",status:404,readyState:0,$init:function(a){},onload:function(){},abort:function(){},open:function(){},send:function(){},setRequestHeader:function(a,b){g_checkVarType(arguments,{"4str":["sName:String+","sValue:String+"]},"$Ajax.RequestBase#setRequestHeader");
this._headers[a]=b
},getResponseHeader:function(a){g_checkVarType(arguments,{"4str":["sName:String+"]},"$Ajax.RequestBase#getResponseHeader");
return this._respHeaders[a]||""
},getAllResponseHeaders:function(){return this._respHeaderString
},_getCallbackInfo:function(){var b="";
if(this.option("callbackid")!=""){var a=0;
do{b="_"+this.option("callbackid")+"_"+a;
a++
}while(window["__"+jindo._p_.jindoName+"_callback"][b])
}else{do{b="_"+Math.floor(Math.random()*10000)
}while(window["__"+jindo._p_.jindoName+"_callback"][b])
}if(this.option("callbackname")==""){this.option("callbackname","_callback")
}return{callbackname:this.option("callbackname"),id:b,name:"window.__"+jindo._p_.jindoName+"_callback."+b}
}});
jindo.$Ajax.JSONPRequest=klass({_headers:{},_respHeaders:{},_script:null,_onerror:null,$init:function(a){this.option=a
},_callback:function(b){if(this._onerror){clearTimeout(this._onerror);
this._onerror=null
}var a=this;
this.responseJSON=b;
this.onload(this);
setTimeout(function(){a.abort()
},10)
},abort:function(){if(this._script){try{this._script.parentNode.removeChild(this._script)
}catch(a){}}},open:function(b,a){g_checkVarType(arguments,{"4str":["method:String+","url:String+"]},"$Ajax.JSONPRequest#open");
this.responseJSON=null;
this._url=a
},send:function(g){var f=g_checkVarType(arguments,{"4voi":[],"4nul":["data:Null"],"4str":["data:String+"]},"$Ajax.JSONPRequest#send");
var d=this;
var h=this._getCallbackInfo();
var c=document.getElementsByTagName("head")[0];
this._script=document.createElement("script");
this._script.type="text/javascript";
this._script.charset=this.option("jsonp_charset");
if(c){c.appendChild(this._script)
}else{if(document.body){document.body.appendChild(this._script)
}}window["__"+jindo._p_.jindoName+"_callback"][h.id]=function(j){try{d.readyState=4;
d.status=200;
d._callback(j)
}finally{delete window["__"+jindo._p_.jindoName+"_callback"][h.id];
delete window["__"+jindo._p_.jindoName+"2_callback"][h.id]
}};
window["__"+jindo._p_.jindoName+"2_callback"][h.id]=function(j){window["__"+jindo._p_.jindoName+"_callback"][h.id](j)
};
var b=function(){if(!d.responseJSON){d.readyState=4;
d.status=500;
d._onerror=setTimeout(function(){d._callback(null)
},200)
}};
this._script.onload=this._script.onerror=function(){b();
this.onerror=null;
this.onload=null
};
var a="&";
if(this._url.indexOf("?")==-1){a="?"
}switch(f+""){case"4voi":case"4nul":g="";
break;
case"4str":g="&"+g
}this._test_url=this._script.src=this._url+a+h.callbackname+"="+h.name+g
}}).extend(jindo.$Ajax.RequestBase);
jindo.$Ajax.Queue=function(b){var a=arguments.callee;
if(!(this instanceof a)){return new a(b||{})
}var c=g_checkVarType(arguments,{"4voi":[],"4obj":["option:Hash+"]},"$Ajax.Queue");
b=c.option;
this._options={async:false,useResultAsParam:false,stopOnFailure:false};
this.option(b);
this._queue=[]
};
jindo.$Ajax.Queue.prototype.option=function(b,d){var c=g_checkVarType(arguments,{s4str:["sKey:String+","sValue:Variant"],s4obj:["oOption:Hash+"],g:["sKey:String+"]},"$Ajax.Queue#option");
switch(c+""){case"s4str":this._options[c.sKey]=c.sValue;
break;
case"s4obj":var g=c.oOption;
try{for(var a in g){if(g.hasOwnProperty(a)){this._options[a]=g[a]
}}}catch(f){}break;
case"g":return this._options[c.sKey]
}return this
};
jindo.$Ajax.Queue.prototype.add=function(c,a){var b=g_checkVarType(arguments,{"4obj":["oAjax:Hash+"],"4obj2":["oAjax:Hash+","oPram:Hash+"]},"$Ajax.Queue");
switch(b+""){case"4obj2":a=b.oPram
}this._queue.push({obj:c,param:a});
return this
};
jindo.$Ajax.Queue.prototype.request=function(){this._requestAsync.apply(this,this.option("async")?[]:[0]);
return this
};
jindo.$Ajax.Queue.prototype._requestSync=function(f,d){var c=this;
var b=this._queue;
if(b.length>f+1){b[f].obj._oncompleted=function(j,k){if(!c.option("stopOnFailure")||j){c._requestSync(f+1,k)
}}
}var h=b[f].param||{};
if(this.option("useResultAsParam")&&d){try{for(var a in d){if(h[a]===undefined&&d.hasOwnProperty(a)){h[a]=d[a]
}}}catch(g){}}b[f].obj.request(h)
};
jindo.$Ajax.Queue.prototype._requestAsync=function(){for(var a=0;
a<this._queue.length;
a++){this._queue[a].obj.request(this._queue[a].param||{})
}};
jindo.$H=function(d){var a=arguments.callee;
if(d instanceof a){return d
}if(!(this instanceof a)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$H");
return new a(d||{})
}catch(f){if(f instanceof TypeError){return null
}throw f
}}var c=g_checkVarType(arguments,{"4obj":["oObj:Hash+"],"4vod":[]},"$H");
this._table={};
for(var b in d){if(d.hasOwnProperty(b)){this._table[b]=d[b]
}}};
jindo.$H.prototype.$value=function(){return this._table
};
jindo.$H.prototype.$=function(b,d){var c=g_checkVarType(arguments,{s4var:[jindo.$Jindo._F("key:String+"),"value:Variant"],s4var2:["key:Numeric","value:Variant"],g4str:["key:String+"],s4obj:["oObj:Hash+"],g4num:["key:Numeric"]},"$H#$");
switch(c+""){case"s4var":case"s4var2":this._table[b]=d;
return this;
case"s4obj":var f=c.oObj;
for(var a in f){if(f.hasOwnProperty(a)){this._table[a]=f[a]
}}return this;
default:return this._table[b]
}};
jindo.$H.prototype.length=function(){var b=0;
var c=this["__jindo_sorted_index"];
if(c){return c.length
}else{for(var a in this._table){if(this._table.hasOwnProperty(a)){if(Object.prototype[a]!==undefined&&Object.prototype[a]===this._table[a]){continue
}b++
}}}return b
};
jindo.$H.prototype.forEach=function(m,n){var c=g_checkVarType(arguments,{"4fun":["callback:Function+"],"4obj":["callback:Function+","thisObject:Variant"]},"$H#forEach");
var o=this._table;
var f=this.constructor;
var j=this["__jindo_sorted_index"];
if(j){for(var d=0,a=j.length;
d<a;
d++){try{var b=j[d];
m.call(n||this,o[b],b,o)
}catch(g){if(g instanceof f.Break){break
}if(g instanceof f.Continue){continue
}throw g
}}}else{for(var b in o){if(o.hasOwnProperty(b)){if(!o.propertyIsEnumerable(b)){continue
}try{m.call(n||this,o[b],b,o)
}catch(g){if(g instanceof f.Break){break
}if(g instanceof f.Continue){continue
}throw g
}}}}return this
};
jindo.$H.prototype.filter=function(m,b){var g=g_checkVarType(arguments,{"4fun":["callback:Function+"],"4obj":["callback:Function+","thisObject:Variant"]},"$H#filter");
var f=jindo.$H();
var d=this._table;
var c=this.constructor;
for(var a in d){if(d.hasOwnProperty(a)){if(!d.propertyIsEnumerable(a)){continue
}try{if(m.call(b||this,d[a],a,d)){f.add(a,d[a])
}}catch(j){if(j instanceof c.Break){break
}if(j instanceof c.Continue){continue
}throw j
}}}return f
};
jindo.$H.prototype.map=function(m,b){var g=g_checkVarType(arguments,{"4fun":["callback:Function+"],"4obj":["callback:Function+","thisObject:Variant"]},"$H#map");
var f=jindo.$H();
var d=this._table;
var c=this.constructor;
for(var a in d){if(d.hasOwnProperty(a)){if(!d.propertyIsEnumerable(a)){continue
}try{f.add(a,m.call(b||this,d[a],a,d))
}catch(j){if(j instanceof c.Break){break
}if(j instanceof c.Continue){f.add(a,d[a])
}else{throw j
}}}}return f
};
jindo.$H.prototype.add=function(a,c){var b=g_checkVarType(arguments,{"4str":["key:String+","value:Variant"],"4num":["key:Numeric","value:Variant"]},"$H#add");
var d=this["__jindo_sorted_index"];
if(d&&this._table[a]==undefined){this["__jindo_sorted_index"].push(a)
}this._table[a]=c;
return this
};
jindo.$H.prototype.remove=function(c){var d=g_checkVarType(arguments,{"4str":["key:String+"],"4num":["key:Numeric"]},"$H#remove");
if(this._table[c]===undefined){return null
}var h=this._table[c];
delete this._table[c];
var f=this["__jindo_sorted_index"];
if(f){var g=[];
for(var b=0,a=f.length;
b<a;
b++){if(f[b]!=c){g.push(f[b])
}}this["__jindo_sorted_index"]=g
}return h
};
jindo.$H.prototype.search=function(g){var f=g_checkVarType(arguments,{"4str":["value:Variant"]},"$H#search");
var a=false;
var d=this._table;
for(var c in d){if(d.hasOwnProperty(c)){if(!d.propertyIsEnumerable(c)){continue
}var b=d[c];
if(b===g){a=c;
break
}}}return a
};
jindo.$H.prototype.hasKey=function(a){var b=g_checkVarType(arguments,{"4str":["key:String+"],"4num":["key:Numeric"]},"$H#hasKey");
return this._table[a]!==undefined
};
jindo.$H.prototype.hasValue=function(b){var a=g_checkVarType(arguments,{"4str":["value:Variant"]},"$H#hasValue");
return(this.search(b)!==false)
};
jindo._p_.defaultSort=function(c,j,m){var h=[];
var f=c.fpSort;
for(var d in j._table){if(j._table.hasOwnProperty(d)){(function(o,n){h.push({key:o,val:n})
})(d,j._table[d])
}}if(c+""==="vo"){f=function(n,k){return n===k?0:n>k?1:-1
}}h.sort(function(n,k){return f.call(j,n[m],k[m])
});
var a=[];
for(var g=0,b=h.length;
g<b;
g++){a.push(h[g].key)
}return a
};
jindo.$H.prototype.sort=function(a){var b=g_checkVarType(arguments,{vo:[],"4fp":["fpSort:Function+"]},"$H#sort");
this["__jindo_sorted_index"]=jindo._p_.defaultSort(b,this,"val");
return this
};
jindo.$H.prototype.ksort=function(a){var b=g_checkVarType(arguments,{vo:[],"4fp":["fpSort:Function+"]},"$H#ksort");
this["__jindo_sorted_index"]=jindo._p_.defaultSort(b,this,"key");
return this
};
jindo.$H.prototype.keys=function(){var b=this["__jindo_sorted_index"];
if(!b){b=[];
for(var a in this._table){if(this._table.hasOwnProperty(a)){b.push(a)
}}}return b
};
jindo.$H.prototype.values=function(){var b=[];
for(var a in this._table){if(this._table.hasOwnProperty(a)){b[b.length]=this._table[a]
}}return b
};
jindo.$H.prototype.toQueryString=function(){var c=[],d=null,a=0;
for(var b in this._table){if(this._table.hasOwnProperty(b)){d=this._table[b];
if(jindo.$Jindo.isArray(d)){for(i=0;
i<d.length;
i++){c[c.length]=encodeURIComponent(b)+"[]="+encodeURIComponent(d[i]+"")
}}else{c[c.length]=encodeURIComponent(b)+"="+encodeURIComponent(this._table[b]+"")
}}}return c.join("&")
};
jindo.$H.prototype.empty=function(){this._table={};
delete this["__jindo_sorted_index"];
return this
};
jindo.$H.Break=jindo.$Jindo.Break;
jindo.$H.Continue=jindo.$Jindo.Continue;
jindo.$Json=function(b){var a=arguments.callee;
if(b instanceof a){return b
}if(!(this instanceof a)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$Json");
return new a(arguments.length?b:{})
}catch(c){if(c instanceof TypeError){return null
}throw c
}}g_checkVarType(arguments,{"4var":["oObject:Variant"]},"$Json");
this._object=b
};
jindo.$Json._oldMakeJSON=function(sObject,sType){try{if(jindo.$Jindo.isString(sObject)&&/^(?:\s*)[\{\[]/.test(sObject)){sObject=eval("("+sObject+")")
}else{return sObject
}}catch(e){throw new jindo.$Error(jindo.$Except.PARSE_ERROR,sType)
}return sObject
};
jindo.$Json.fromXML=function(a){var b=jindo.$Jindo;
var j=b.checkVarType(arguments,{"4str":["sXML:String+"]},"<static> $Json#fromXML");
var f={};
var p=/\s*<(\/?[\w:\-]+)((?:\s+[\w:\-]+\s*=\s*(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'))*)\s*((?:\/>)|(?:><\/\1>|\s*))|\s*<!\[CDATA\[([\w\W]*?)\]\]>\s*|\s*>?([^<]*)/ig;
var k=/^[0-9]+(?:\.[0-9]+)?$/;
var m={"&amp;":"&","&nbsp;":" ","&quot;":'"',"&lt;":"<","&gt;":">"};
var c={tags:["/"],stack:[f]};
var n=function(o){if(b.isUndefined(o)){return""
}return o.replace(/&[a-z]+;/g,function(q){return(b.isString(m[q]))?m[q]:q
})
};
var g=function(o,q){o.replace(/([\w\:\-]+)\s*=\s*(?:"((?:\\"|[^"])*)"|'((?:\\'|[^'])*)')/g,function(s,r,w,t){q[r]=n((w?w.replace(/\\"/g,'"'):undefined)||(t?t.replace(/\\'/g,"'"):undefined))
})
};
var d=function(r){for(var q in r){if(r.hasOwnProperty(q)){if(Object.prototype[q]){continue
}return false
}}return true
};
var h=function(A,z,w,t,s,r){var H,G="";
var F=c.stack.length-1;
if(b.isString(z)&&z){if(z.substr(0,1)!="/"){var E=(typeof w=="string"&&w);
var C=(typeof t=="string"&&t);
var y=(!E&&C)?"":{};
H=c.stack[F];
if(b.isUndefined(H[z])){H[z]=y;
H=c.stack[F+1]=H[z]
}else{if(H[z] instanceof Array){var B=H[z].length;
H[z][B]=y;
H=c.stack[F+1]=H[z][B]
}else{H[z]=[H[z],y];
H=c.stack[F+1]=H[z][1]
}}if(E){g(w,H)
}c.tags[F+1]=z;
if(C){c.tags.length--;
c.stack.length--
}}else{c.tags.length--;
c.stack.length--
}}else{if(b.isString(s)&&s){G=s
}else{if(b.isString(r)&&r){G=n(r)
}}}if(G.replace(/^\s+/g,"").length>0){var D=c.stack[F-1];
var I=c.tags[F];
if(k.test(G)){G=parseFloat(G)
}else{if(G=="true"){G=true
}else{if(G=="false"){G=false
}}}if(b.isUndefined(D)){return
}if(D[I] instanceof Array){var q=D[I];
if(b.isHash(q[q.length-1])&&!d(q[q.length-1])){q[q.length-1].$cdata=G;
q[q.length-1].toString=function(){return G
}}else{q[q.length-1]=G
}}else{if(b.isHash(D[I])&&!d(D[I])){D[I].$cdata=G;
D[I].toString=function(){return G
}}else{D[I]=G
}}}};
a=a.replace(/<(\?|\!-)[^>]*>/g,"");
a.replace(p,h);
return jindo.$Json(f)
};
jindo.$Json.prototype.get=function(h){var a=jindo.$Jindo;
var g=a.checkVarType(arguments,{"4str":["sPath:String+"]},"$Json#get");
var f=jindo.$Json._oldMakeJSON(this._object,"$Json#get");
if(!(a.isHash(f)||a.isArray(f))){throw new jindo.$Error(jindo.$Except.JSON_MUST_HAVE_ARRAY_HASH,"$Json#get")
}var b=h.split("/");
var w=/^([\w:\-]+)\[([0-9]+)\]$/;
var r=[[f]],t=r[0];
var n=b.length,d,s,c,k,q;
for(var m=0;
m<n;
m++){if(b[m]=="."||b[m]==""){continue
}if(b[m]==".."){r.length--
}else{c=[];
s=-1;
d=t.length;
if(d==0){return[]
}if(w.test(b[m])){s=+RegExp.$2
}for(k=0;
k<d;
k++){q=t[k][b[m]];
if(a.isUndefined(q)){continue
}if(a.isArray(q)){if(s>-1){if(s<q.length){c[c.length]=q[s]
}}else{c=c.concat(q)
}}else{if(s==-1){c[c.length]=q
}}}r[r.length]=c
}t=r[r.length-1]
}return t
};
jindo.$Json.prototype.toString=function(){return jindo.$Json._oldToString(this._object)
};
jindo.$Json._oldToString=function(a){var b=jindo.$Jindo;
var c={$:function(d){if(b.isNull(d)||!b.isString(d)&&d==Infinity){return"null"
}if(b.isFunction(d)){return undefined
}if(b.isUndefined(d)){return undefined
}if(b.isBoolean(d)){return d?"true":"false"
}if(b.isString(d)){return this.s(d)
}if(b.isNumeric(d)){return d
}if(b.isArray(d)){return this.a(d)
}if(b.isHash(d)){return this.o(d)
}if(b.isDate(d)){return d+""
}if(typeof d=="object"||b.isRegExp(d)){return"{}"
}if(isNaN(d)){return"null"
}},s:function(d){var f={'"':'\\"',"\\":"\\\\","\n":"\\n","\r":"\\r","\t":"\\t"};
var g=function(h){return(f[h]!==undefined)?f[h]:h
};
return'"'+d.replace(/[\\"'\n\r\t]/g,g)+'"'
},a:function(d){var g="[",j="",h=d.length;
for(var f=0;
f<h;
f++){if(b.isFunction(d[f])){continue
}g+=j+this.$(d[f]);
if(!j){j=","
}}return g+"]"
},o:function(g){g=jindo.$H(g).ksort().$value();
var f="{",h="";
for(var d in g){if(g.hasOwnProperty(d)){if(b.isUndefined(g[d])||b.isFunction(g[d])){continue
}f+=h+this.s(d)+":"+this.$(g[d]);
if(!h){h=","
}}}return f+"}"
}};
return c.$(a)
};
jindo.$Json.prototype.toXML=function(){var a=function(k,f){var j=function(n,m){return"<"+f+(m||"")+">"+n+"</"+f+">"
};
switch(typeof k){case"undefined":case"null":return j("");
case"number":return j(k);
case"string":if(k.indexOf("<")<0){return j(k.replace(/&/g,"&amp;"))
}else{return j("<![CDATA["+k+"]]>")
}case"boolean":return j(String(k));
case"object":var g="";
if(k instanceof Array){var d=k.length;
for(var h=0;
h<d;
h++){g+=a(k[h],f)
}}else{var c="";
for(var b in k){if(k.hasOwnProperty(b)){if(b=="$cdata"||typeof k[b]=="function"){continue
}g+=a(k[b],b)
}}if(f){g=j(g,c)
}}return g
}};
return a(jindo.$Json._oldMakeJSON(this._object,"$Json#toXML"),"")
};
jindo.$Json.prototype.toObject=function(){return jindo.$Json._oldMakeJSON(this._object,"$Json#toObject")
};
jindo.$Json.prototype.compare=function(a){var b=jindo.$Jindo;
var c=b.checkVarType(arguments,{"4obj":["oData:Hash+"],"4arr":["oData:Array+"]},"$Json#compare");
function d(h,m){if(b.isArray(h)){if(h.length!==m.length){return false
}for(var j=0,n=h.length;
j<n;
j++){if(!arguments.callee(h[j],m[j])){return false
}}return true
}else{if(b.isRegExp(h)||b.isFunction(h)||b.isDate(h)){return String(h)===String(m)
}else{if(typeof h==="number"&&isNaN(h)){return isNaN(m)
}else{if(b.isHash(h)){var n=0;
for(var g in h){n++
}for(var g in m){n--
}if(n!==0){return false
}for(var g in h){if(g in m===false||!arguments.callee(h[g],m[g])){return false
}}return true
}}}}return h===m
}try{return d(jindo.$Json._oldMakeJSON(this._object,"$Json#compare"),a)
}catch(f){return false
}};
jindo.$Json.prototype.$value=jindo.$Json.prototype.toObject;
jindo.$Cookie=function(){var a=arguments.callee;
var b=a._cached;
if(a._cached){return a._cached
}if(!(this instanceof a)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$Cookie");
return(arguments.length>0)?new a(arguments[0]):new a
}catch(d){if(d instanceof TypeError){return null
}throw d
}}if(!(this instanceof a)){return new a
}if(typeof jindo.$Jindo.isUndefined(a._cached)){a._cached=this
}var c=jindo.$Jindo.checkVarType(arguments,{"4voi":[],"4bln":["bURIComponent:Boolean"]},"$Cookie");
switch(c+""){case"4voi":this._bURIComponent=false;
break;
case"4bln":this._bURIComponent=c.bURIComponent;
break
}};
jindo.$Cookie.prototype.keys=function(){var c=document.cookie.split(";");
var f=/^\s+|\s+$/g;
var b=new Array;
for(var d=0;
d<c.length;
d++){b[b.length]=c[d].substr(0,c[d].indexOf("=")).replace(f,"")
}return b
};
jindo.$Cookie.prototype.get=function(h){var g=jindo.$Jindo.checkVarType(arguments,{"4str":["sName:String+"]},"$Cookie#get");
var b=document.cookie.split(/\s*;\s*/);
var d=new RegExp("^(\\s*"+h+"\\s*=)");
var f;
var a;
for(var c=0;
c<b.length;
c++){if(d.test(b[c])){f=b[c].substr(RegExp.$1.length);
if(this._bURIComponent&&jindo.$Jindo.isNull(f.match(/%u\w{4}/))){a=decodeURIComponent(f)
}else{a=unescape(f)
}return a
}}return null
};
jindo.$Cookie.prototype.set=function(f,j,h,k,d){var a=jindo.$Jindo;
var c=a.checkVarType(arguments,{"4str":["sName:String+","sValue:String+"],day_for_string:["sName:String+","sValue:String+","nDays:Numeric"],domain_for_string:["sName:String+","sValue:String+","nDays:Numeric","sDomain:String+"],path_for_string:["sName:String+","sValue:String+","nDays:Numeric","sDomain:String+","sPath:String+"],"4num":["sName:String+","sValue:Numeric"],day_for_num:["sName:String+","sValue:Numeric","nDays:Numeric"],domain_for_num:["sName:String+","sValue:Numeric","nDays:Numeric","sDomain:String+"],path_for_num:["sName:String+","sValue:Numeric","nDays:Numeric","sDomain:String+","sPath:String+"]},"$Cookie#set");
var g="";
var b;
if(c+""!=="4str"&&h!==0){g=";expires="+(new Date((new Date()).getTime()+h*1000*60*60*24)).toGMTString()
}if(a.isUndefined(k)){k=""
}if(a.isUndefined(d)){d="/"
}if(this._bURIComponent){b=encodeURIComponent(j)
}else{b=escape(j)
}document.cookie=f+"="+b+g+"; path="+d+(k?"; domain="+k:"");
return this
};
jindo.$Cookie.prototype.remove=function(f,j,d){var a=jindo.$Jindo;
var c=a.checkVarType(arguments,{"4str":["sName:String+"],domain_for_string:["sName:String+","sDomain:String+"],path_for_string:["sName:String+","sDomain:String+","sPath:String+"]},"$Cookie#remove");
var h=jindo._p_._toArray(arguments);
var k=[];
for(var g=0,b=h.length;
g<b;
g++){k.push(h[g]);
if(g==0){k.push("");
k.push(-1)
}}if(!a.isNull(this.get(f))){this.set.apply(this,k)
}return this
};
jindo.$Event=function(b){var a=arguments.callee;
if(b instanceof a){return b
}if(!(this instanceof a)){return new a(b)
}this._event=this._posEvent=b;
this._globalEvent=window.event;
this.type=b.type.toLowerCase();
if(this.type=="dommousescroll"){this.type="mousewheel"
}else{if(this.type=="domcontentloaded"){this.type="domready"
}}this.realType=this.type;
this.isTouch=false;
if(this.type.indexOf("touch")>-1){this._posEvent=b.changedTouches[0];
this.isTouch=true
}this.canceled=false;
this.element=b.target||b.srcElement;
this.srcElement=this.element;
this.currentElement=b.currentTarget;
this.relatedElement=null;
this.delegatedElement=null;
if(!jindo.$Jindo.isUndefined(b.relatedTarget)){this.relatedElement=b.relatedTarget
}else{if(b.fromElement&&b.toElement){this.relatedElement=b[(this.type=="mouseout")?"toElement":"fromElement"]
}}};
jindo._p_.customEvent={};
jindo._p_.customEventStore={};
jindo._p_.normalCustomEvent={};
jindo._p_.hasCustomEvent=function(a){return !!(jindo._p_.getCustomEvent(a)||jindo._p_.normalCustomEvent[a])
};
jindo._p_.getCustomEvent=function(a){return jindo._p_.customEvent[a]
};
jindo._p_.addCustomEventListener=function(c,f,d,b,a){if(!jindo._p_.customEventStore[f]){jindo._p_.customEventStore[f]={};
jindo._p_.customEventStore[f].ele=c
}if(!jindo._p_.customEventStore[f][d]){jindo._p_.customEventStore[f][d]={}
}if(!jindo._p_.customEventStore[f][d][b]){jindo._p_.customEventStore[f][d][b]={custom:a}
}};
jindo._p_.setCustomEventListener=function(f,d,c,b,a){jindo._p_.customEventStore[f][d][c].real_listener=b;
jindo._p_.customEventStore[f][d][c].wrap_listener=a
};
jindo._p_.getCustomEventListener=function(d,c,b){var a=jindo._p_.customEventStore[d];
if(a&&a[c]&&a[c][b]){return a[c][b]
}return{}
};
jindo._p_.getNormalEventListener=function(d,c,b){var a=jindo._p_.normalCustomEvent[c];
if(a&&a[d]&&a[d][b]){return a[d][b]
}return{}
};
jindo._p_.hasCustomEventListener=function(d,c,b){var a=jindo._p_.customEventStore[d];
if(a&&a[c]&&a[c][b]){return true
}return false
};
jindo.$Event.customEvent=function(f,b){var d=g_checkVarType(arguments,{s4str:["sName:String+"],s4obj:["sName:String+","oEvent:Hash+"]},"$Event.customEvent");
switch(d+""){case"s4str":if(jindo._p_.hasCustomEvent(f)){throw new jindo.$Error("The Custom Event Name have to unique.")
}else{jindo._p_.normalCustomEvent[f]={}
}return this;
case"s4obj":if(jindo._p_.hasCustomEvent(f)){throw new jindo.$Error("The Custom Event Name have to unique.")
}else{jindo._p_.normalCustomEvent[f]={};
jindo._p_.customEvent[f]=function(){this.name=f;
this.real_listener=[];
this.wrap_listener=[]
};
var a=jindo._p_.customEvent[f].prototype;
a.events=[];
for(var c in b){a[c]=b[c];
a.events.push(c)
}jindo._p_.customEvent[f].prototype.fireEvent=function(h){for(var j=0,g=this.wrap_listener.length;
j<g;
j++){this.wrap_listener[j](h)
}}
}return this
}};
jindo.$Event.prototype.mouse=function(){var c=this._event;
var b=this.element;
var d=0;
var a={};
if(c.wheelDelta){d=c.wheelDelta/120
}else{if(c.detail){d=-c.detail/3
}}a={delta:d};
this.mouse=function(){return a
};
return a
};
jindo.$Event.prototype.key=function(){var c=this._event;
var a=c.keyCode||c.charCode;
var b={keyCode:a,alt:c.altKey,ctrl:c.ctrlKey,meta:c.metaKey,shift:c.shiftKey,up:(a==38),down:(a==40),left:(a==37),right:(a==39),enter:(a==13),esc:(a==27)};
this.key=function(){return b
};
return b
};
jindo.$Event.prototype.pos=function(k){g_checkVarType(arguments,{voi:[],bol:["bGetOffset:Boolean"]});
var f=this._posEvent;
var d=(this.element.ownerDocument||document);
var a=d.body;
var j=d.documentElement;
var h=[a.scrollLeft||j.scrollLeft,a.scrollTop||j.scrollTop];
var c={clientX:f.clientX,clientY:f.clientY,pageX:"pageX" in f?f.pageX:f.clientX+h[0]-a.clientLeft,pageY:"pageY" in f?f.pageY:f.clientY+h[1]-a.clientTop,layerX:"offsetX" in f?f.offsetX:f.layerX-1,layerY:"offsetY" in f?f.offsetY:f.layerY-1};
if(k&&jindo.$Element){var g=jindo.$Element(this.element).offset();
c.offsetX=c.pageX-g.left;
c.offsetY=c.pageY-g.top
}return c
};
jindo.$Event.prototype.stop=function(f){g_checkVarType(arguments,{voi:[],num:["nCancel:Numeric"]});
f=f||jindo.$Event.CANCEL_ALL;
var g=(window.event&&window.event==this._globalEvent)?this._globalEvent:this._event;
var a=!!(f&jindo.$Event.CANCEL_BUBBLE);
var h=!!(f&jindo.$Event.CANCEL_DEFAULT);
var c=this.realType;
if(a&&(c==="focusin"||c==="focusout")){jindo.$Jindo._warn("The "+c+" event can't stop bubble.")
}this.canceled=true;
if(h){if(g.preventDefault!==undefined){g.preventDefault()
}}if(a){if(g.stopPropagation!==undefined){g.stopPropagation()
}}return this
};
jindo.$Event.prototype.stopDefault=function(){return this.stop(jindo.$Event.CANCEL_DEFAULT)
};
jindo.$Event.prototype.stopBubble=function(){return this.stop(jindo.$Event.CANCEL_BUBBLE)
};
jindo.$Event.CANCEL_BUBBLE=1;
jindo.$Event.CANCEL_DEFAULT=2;
jindo.$Event.CANCEL_ALL=3;
jindo.$Event.prototype.$value=function(){return this._event
};
(function(b){var d="Touch";
for(var c=0,a=b.length;
c<a;
c++){jindo.$Event.prototype[b[c]+d]=(function(f){return function(g){if(this.isTouch){var m=[];
var k=this._event[f+"es"];
var h=k.length;
var n;
for(var j=0;
j<h;
j++){n=k[j];
m.push({id:n.identifier,event:this,element:n.target,_posEvent:n,pos:jindo.$Event.prototype.pos})
}this[f]=function(o){var p=g_checkVarType(arguments,{"void":[],"4num":["nIndex:Numeric"]},"$Event#"+f);
if(p+""=="void"){return m
}return m[o]
}}else{this[f]=function(o){throw new jindo.$Error(jindo.$Except.NOT_SUPPORT_METHOD,"$Event#"+f)
}}return this[f].apply(this,jindo._p_._toArray(arguments))
}})(b[0]+d)
}})(["changed","target"]);
jindo.$Element=function(c){var a=arguments.callee;
if(c&&c instanceof a){return c
}if(!(this instanceof a)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$Element");
return new a(c)
}catch(f){if(f instanceof TypeError){return null
}throw f
}}var b=jindo.$Jindo;
var d=b.checkVarType(arguments,{"4str":["sID:String+"],"4nod":["oEle:Node"],"4doc":["oEle:Document+"],"4win":["oEle:Window+"]},"$Element");
switch(d+""){case"4str":c=jindo.$(c);
break;
default:c=d.oEle
}this._element=c;
if(this._element!=null){if(this._element.__jindo__id){this._key=this._element.__jindo__id
}else{this._element.__jindo__id=this._key=jindo._p_._makeRandom()
}this.tag=(this._element.tagName||"").toLowerCase()
}else{throw new TypeError("{not_found_element}")
}};
jindo._p_.NONE_GROUP="_jindo_event_none";
jindo._p_.splitEventSelector=function(d){var c=d.match(/^([a-z_]*)(.*)/i);
var b=jindo._p_.trim(c[1]);
var a=jindo._p_.trim(c[2].replace("@",""));
return{type:a?"delegate":"normal",event:b,selector:a}
};
jindo._p_._makeRandom=function(){return"e"+new Date().getTime()+parseInt(Math.random()*100000000,10)
};
jindo._p_.releaseEventHandlerForAllChildren=function(b){var d=b._element.all||b._element.getElementsByTagName("*"),a=d.length,f=null,c;
for(c=0;
c<a;
c++){f=d[c];
if(f.nodeType==1&&f.__jindo__id){jindo.$Element.eventManager.cleanUpUsingKey(f.__jindo__id,true)
}}d=f=null
};
jindo._p_.canUseClassList=function(){jindo._p_.canUseClassList=function(){return"classList" in document.body&&"classList" in document.createElementNS("http://www.w3.org/2000/svg","g")
};
return jindo._p_.canUseClassList()
};
jindo._p_.vendorPrefixObj={"-moz":"Moz","-ms":"ms","-o":"O","-webkit":"webkit"};
jindo._p_.cssNameToJavaScriptName=function(a){if(/^(\-(?:moz|ms|o|webkit))/.test(a)){var b=RegExp.$1;
a=a.replace(b,jindo._p_.vendorPrefixObj[b])
}return a.replace(/(:?-(\w))/g,function(d,d,c){return c.toUpperCase()
})
};
jindo._p_.getStyleIncludeVendorPrefix=function(g){var p=["Transition","Transform","Animation","Perspective"];
var o=["webkit","-","Moz","O","ms"];
var b="";
var n="";
var k="";
var q={};
var a=g||document.body.style;
for(var h=0,d=p.length;
h<d;
h++){b=p[h];
for(var f=0,c=o.length;
f<c;
f++){n=o[f];
k=n!="-"?(n+b):b.toLowerCase();
if(typeof a[k]!=="undefined"){q[b.toLowerCase()]=k;
break
}q[b.toLowerCase()]=false
}}if(g){return q
}jindo._p_.getStyleIncludeVendorPrefix=function(){return q
};
return jindo._p_.getStyleIncludeVendorPrefix()
};
jindo._p_.getTransformStringForValue=function(c){var b=jindo._p_.getStyleIncludeVendorPrefix(c);
var a=b.transform;
if(b.transform==="MozTransform"){a="-moz-transform"
}else{if(b.transform==="webkitTransform"){a="-webkit-transform"
}else{if(b.transform==="OTransform"){a="-o-transform"
}else{if(b.transform==="msTransform"){a="-ms-transform"
}}}}if(c){return a
}jindo._p_.getTransformStringForValue=function(){return a
};
return jindo._p_.getTransformStringForValue()
};
jindo._p_.setOpacity=function(a,b){a.offsetHeight;
a.style.opacity=b
};
jindo.$Element._eventBind=function(a,d,c,b){a.addEventListener(d,c,!!b)
};
jindo.$Element._unEventBind=function(a,c,b){a.removeEventListener(c,b,false)
};
jindo.$Element.prototype.$value=function(){return this._element
};
jindo.$Element.prototype.visible=function(a,c){var b=g_checkVarType(arguments,{g:[],s4bln:[jindo.$Jindo._F("bVisible:Boolean")],s4str:["bVisible:Boolean","sDisplay:String+"]},"$Element#visible");
switch(b+""){case"g":return(this._getCss(this._element,"display")!="none");
case"s4bln":this[a?"show":"hide"]();
return this;
case"s4str":this[a?"show":"hide"](c);
return this
}};
jindo.$Element.prototype.show=function(h){var g=g_checkVarType(arguments,{"4voi":[],"4str":["sDisplay:String+"]},"$Element#show");
var f=this._element.style;
var a="block";
var k={p:a,div:a,form:a,h1:a,h2:a,h3:a,h4:a,ol:a,ul:a,fieldset:a,td:"table-cell",th:"table-cell",li:"list-item",table:"table",thead:"table-header-group",tbody:"table-row-group",tfoot:"table-footer-group",tr:"table-row",col:"table-column",colgroup:"table-column-group",caption:"table-caption",dl:a,dt:a,dd:a};
try{switch(g+""){case"4voi":var d=k[this.tag];
f.display=d||"inline";
break;
case"4str":f.display=h
}}catch(j){f.display="block"
}return this
};
jindo.$Element.prototype.hide=function(){this._element.style.display="none";
return this
};
jindo.$Element.prototype.toggle=function(b){var a=g_checkVarType(arguments,{"4voi":[],"4str":["sDisplay:String+"]},"$Element#toggle");
this[this._getCss(this._element,"display")=="none"?"show":"hide"].apply(this,arguments);
return this
};
jindo.$Element.prototype.opacity=function(f){var d=g_checkVarType(arguments,{g:[],s:["nOpacity:Numeric"],str:["sOpacity:String"]},"$Element#opacity"),g=this._element,a=(this._getCss(g,"display")!="none"),c;
switch(d+""){case"g":a=(this._getCss(g,"display")!="none");
(c=g.style.opacity).length||(c=this._getCss(g,"opacity"));
c=parseFloat(c);
if(isNaN(c)){c=a?1:0
}return c;
case"s":f=d.nOpacity;
g.style.zoom=1;
f=Math.max(Math.min(f,1),0);
g.style.opacity=f;
return this;
case"str":if(f===""){g.style.zoom=g.style.opacity=""
}return this
}};
jindo._p_._revisionCSSAttr=function(b,c){var a=jindo.$Element.hook(b);
if(a){b=a
}else{b=jindo._p_.cssNameToJavaScriptName(b).replace(/^(animation|perspective|transform|transition)/i,function(d){return c[d.toLowerCase()]
})
}return b
};
jindo._p_.changeTransformValue=function(a,b){return(a+"").replace(/([\s|-]*)(?:transform)/,function(d,c){return jindo._p_.trim(c).length>0?d:c+jindo._p_.getTransformStringForValue(b)
})
};
jindo.$Element.prototype.css=function(h,s){var g=g_checkVarType(arguments,{g:["sName:String+"],s4str:[jindo.$Jindo._F("sName:String+"),jindo.$Jindo._F("vValue:String+")],s4num:["sName:String+","vValue:Numeric"],s4obj:["oObj:Hash+"]},"$Element#css");
var m=this._element;
switch(g+""){case"s4str":case"s4num":var j={};
h=jindo._p_._revisionCSSAttr(h,jindo._p_.getStyleIncludeVendorPrefix());
j[h]=s;
h=j;
break;
case"s4obj":h=g.oObj;
var j={};
var c=jindo._p_.getStyleIncludeVendorPrefix();
for(i in h){if(h.hasOwnProperty(i)){j[jindo._p_._revisionCSSAttr(i,c)]=h[i]
}}h=j;
break;
case"g":var c=jindo._p_.getStyleIncludeVendorPrefix();
h=jindo._p_._revisionCSSAttr(h,c);
var n=this._getCss;
if(h=="opacity"){return this.opacity()
}if(h=="padding"||h=="margin"){var p=n(m,h+"Top");
var r=n(m,h+"Right");
var b=n(m,h+"Bottom");
var d=n(m,h+"Left");
if((p==r)&&(b==d)){return p
}else{if(p==b){if(r==d){return p+" "+r
}else{return p+" "+r+" "+b+" "+d
}}else{return p+" "+r+" "+b+" "+d
}}}return n(m,h)
}var q,o;
for(var f in h){if(h.hasOwnProperty(f)){q=h[f];
if(!(jindo.$Jindo.isString(q)||jindo.$Jindo.isNumeric(q))){continue
}if(f=="opacity"){this.opacity(q);
continue
}if(f=="backgroundPositionX"||f=="backgroundPositionY"){var a=this.css("backgroundPosition").split(/\s+/);
q=f=="backgroundPositionX"?q+" "+a[1]:a[0]+" "+q;
this._setCss(m,"backgroundPosition",q)
}else{this._setCss(m,f,/transition/i.test(f)?jindo._p_.changeTransformValue(q):q)
}}}return this
};
jindo.$Element.prototype._getCss=function(g,f){try{if(f=="cssFloat"){f="float"
}var h=g.ownerDocument||g.document||document;
var a=g.style[f];
if(!g.style[f]){var b=h.defaultView.getComputedStyle(g,null);
f=f.replace(/([A-Z])/g,"-$1").replace(/^(webkit|ms)/g,"-$1").toLowerCase();
a=b.getPropertyValue(f);
a=a===undefined?b[f]:a
}if(f=="textDecoration"){a=a.replace(",","")
}return a
}catch(c){throw new jindo.$Error((g.tagName||"document")+jindo.$Except.NOT_USE_CSS,"$Element#css")
}};
jindo.$Element.prototype._setCss=function(c,b,a){if(("#top#left#right#bottom#").indexOf(b+"#")>0&&(typeof a=="number"||(/\d$/.test(a)))){c.style[b]=parseInt(a,10)+"px"
}else{c.style[b]=a
}};
jindo.$Element.prototype.attr=function(n,r){var g=g_checkVarType(arguments,{g:["sName:String+"],s4str:["sName:String+","vValue:String+"],s4num:["sName:String+","vValue:Numeric"],s4nul:["sName:String+","vValue:Null"],s4bln:["sName:String+","vValue:Boolean"],s4arr:["sName:String+","vValue:Array+"],s4obj:[jindo.$Jindo._F("oObj:Hash+")]},"$Element#attr");
var p=this._element,j=null,o,c,b,d,a,h;
switch(g+""){case"s4str":case"s4nul":case"s4num":case"s4bln":case"s4arr":var m={};
m[n]=r;
n=m;
break;
case"s4obj":n=g.oObj;
break;
case"g":if(n=="class"||n=="className"){return p.className
}else{if(n=="style"){return p.style.cssText
}else{if(n=="checked"||n=="disabled"){return !!p[n]
}else{if(n=="value"){if(this.tag=="button"){return p.getAttributeNode("value").value
}else{if(this.tag=="select"){if(p.multiple){for(o=0,c=p.options.length;
o<c;
o++){a=p.options[o];
if(a.selected){if(!j){j=[]
}r=a.value;
if(r==""){r=a.text
}j.push(r)
}}return j
}else{if(p.selectedIndex<0){return null
}r=p.options[p.selectedIndex].value;
return(r=="")?p.options[p.selectedIndex].text:r
}}else{return p.value
}}}else{if(n=="href"){return p.getAttribute(n,2)
}}}}}return p.getAttribute(n)
}d=function(s,z){var k=-1,t,y,w;
for(t=0,y=s.length;
t<y;
t++){w=s[t];
if(w.value===z||w.text===z){k=t;
break
}}return k
};
for(var f in n){if(n.hasOwnProperty(f)){var q=n[f];
if(jindo.$Jindo.isNull(q)){if(this.tag=="select"){if(p.multiple){for(o=0,c=p.options.length;
o<c;
o++){p.options[o].selected=false
}}else{p.selectedIndex=-1
}}else{p.removeAttribute(f)
}}else{if(f=="class"||f=="className"){p.className=q
}else{if(f=="style"){p.style.cssText=q
}else{if(f=="checked"||f=="disabled"){p[f]=q
}else{if(f=="value"){if(this.tag=="select"){if(p.multiple){if(jindo.$Jindo.isArray(q)){h=jindo.$A(q);
for(o=0,c=p.options.length;
o<c;
o++){a=p.options[o];
a.selected=h.has(a.value)||h.has(a.text)
}}else{p.selectedIndex=d(p.options,q)
}}else{p.selectedIndex=d(p.options,q)
}}else{p.value=q
}}else{p.setAttribute(f,q)
}}}}}}}return this
};
jindo.$Element.prototype.width=function(b){var c=g_checkVarType(arguments,{g:[],s:["nWidth:Numeric"]},"$Element#width");
switch(c+""){case"g":return this._element.offsetWidth;
case"s":b=c.nWidth;
var d=this._element;
d.style.width=b+"px";
var f=d.offsetWidth;
if(f!=b&&f!==0){var a=(b*2-f);
if(a>0){d.style.width=a+"px"
}}return this
}};
jindo.$Element.prototype.height=function(a){var b=g_checkVarType(arguments,{g:[],s:["nHeight:Numeric"]},"$Element#height");
switch(b+""){case"g":return this._element.offsetHeight;
case"s":a=b.nHeight;
var c=this._element;
c.style.height=a+"px";
var d=c.offsetHeight;
if(d!=a&&d!==0){var a=(a*2-d);
if(a>0){c.style.height=a+"px"
}}return this
}};
jindo.$Element.prototype.className=function(c){var a=g_checkVarType(arguments,{g:[],s:[jindo.$Jindo._F("sClass:String+")]},"$Element#className");
var b=this._element;
switch(a+""){case"g":return b.className;
case"s":b.className=c;
return this
}};
jindo.$Element.prototype.hasClass=function(b){var a=g_checkVarType;
if(jindo._p_.canUseClassList()){jindo.$Element.prototype.hasClass=function(d){var c=a(arguments,{"4str":["sClass:String+"]},"$Element#hasClass");
return this._element.classList.contains(d)
}}else{jindo.$Element.prototype.hasClass=function(d){var c=a(arguments,{"4str":["sClass:String+"]},"$Element#hasClass");
return(" "+this._element.className+" ").indexOf(" "+d+" ")>-1
}}return this.hasClass.apply(this,arguments)
};
jindo.$Element.prototype.addClass=function(a){if(this._element.classList){jindo.$Element.prototype.addClass=function(g){if(this._element==null){return this
}var f=g_checkVarType(arguments,{"4str":["sClass:String+"]},"$Element#addClass");
var d=(g+"").split(/\s+/);
var b=this._element.classList;
for(var c=d.length;
c--;
){d[c]!=""&&b.add(d[c])
}return this
}}else{jindo.$Element.prototype.addClass=function(j){var g=g_checkVarType(arguments,{"4str":["sClass:String+"]},"$Element#addClass");
var h=this._element;
var b=h.className;
var f=(j+"").split(" ");
var c;
for(var d=f.length-1;
d>=0;
d--){c=f[d];
if((" "+b+" ").indexOf(" "+c+" ")==-1){b=b+" "+c
}}h.className=b.replace(/\s+$/,"").replace(/^\s+/,"");
return this
}}return this.addClass.apply(this,arguments)
};
jindo.$Element.prototype.removeClass=function(a){if(this._element.classList){jindo.$Element.prototype.removeClass=function(g){var f=g_checkVarType(arguments,{"4str":["sClass:String+"]},"$Element#removeClass");
if(this._element==null){return this
}var b=this._element.classList;
var d=(g+"").split(" ");
for(var c=d.length;
c--;
){d[c]!=""&&b.remove(d[c])
}return this
}}else{jindo.$Element.prototype.removeClass=function(j){var g=g_checkVarType(arguments,{"4str":["sClass:String+"]},"$Element#removeClass");
var h=this._element;
var b=h.className;
var f=(j+"").split(" ");
var c;
for(var d=f.length-1;
d>=0;
d--){if(/\W/g.test(f[d])){f[d]=f[d].replace(/(\W)/g,"\\$1")
}b=(" "+b+" ").replace(new RegExp("\\s+"+f[d]+"(?=\\s+)","g")," ")
}h.className=b.replace(/\s+$/,"").replace(/^\s+/,"");
return this
}}return this.removeClass.apply(this,arguments)
};
jindo.$Element.prototype.toggleClass=function(c,b){var a=g_checkVarType;
if(jindo._p_.canUseClassList()){jindo.$Element.prototype.toggleClass=function(g,d){var f=a(arguments,{"4str":["sClass:String+"],"4str2":["sClass:String+","sClass2:String+"]},"$Element#toggleClass");
switch(f+""){case"4str":this._element.classList.toggle(g+"");
break;
case"4str2":g=g+"";
d=d+"";
if(this.hasClass(g)){this.removeClass(g);
this.addClass(d)
}else{this.addClass(g);
this.removeClass(d)
}}return this
}}else{jindo.$Element.prototype.toggleClass=function(g,d){var f=a(arguments,{"4str":["sClass:String+"],"4str2":["sClass:String+","sClass2:String+"]},"$Element#toggleClass");
d=d||"";
if(this.hasClass(g)){this.removeClass(g);
if(d){this.addClass(d)
}}else{this.addClass(g);
if(d){this.removeClass(d)
}}return this
}}return this.toggleClass.apply(this,arguments)
};
jindo.$Element.prototype.cssClass=function(f,b){var d=g_checkVarType(arguments,{g:["sClass:String+"],s4bln:["sClass:String+","bCondition:Boolean"],s4obj:["oObj:Hash+"]},"$Element#cssClass");
switch(d+""){case"g":return this.hasClass(d.sClass);
case"s4bln":if(d.bCondition){this.addClass(d.sClass)
}else{this.removeClass(d.sClass)
}return this;
case"s4obj":var g=this._element;
f=d.oObj;
var a=g.className;
for(var c in f){if(f.hasOwnProperty(c)){if(f[c]){if((" "+a+" ").indexOf(" "+c+" ")==-1){a=(a+" "+c).replace(/^\s+/,"")
}}else{if((" "+a+" ").indexOf(" "+c+" ")>-1){a=(" "+a+" ").replace(" "+c+" "," ").replace(/\s+$/,"").replace(/^\s+/,"")
}}}}g.className=a;
return this
}};
jindo.$Element.prototype.text=function(c){var d=g_checkVarType(arguments,{g:[],s4str:["sText:String+"],s4num:[jindo.$Jindo._F("sText:Numeric")],s4bln:["sText:Boolean"]},"$Element#text"),f=this._element,a=this.tag,h,b;
switch(d+""){case"g":h=(f.textContent!==undefined)?"textContent":"innerText";
if(a=="textarea"||a=="input"){h="value"
}return f[h];
case"s4str":case"s4num":case"s4bln":try{if(a=="textarea"||a=="input"){f.value=c+""
}else{var b=f.ownerDocument||f.document||document;
this.empty();
f.appendChild(b.createTextNode(c))
}}catch(g){return f.innerHTML=(c+"").replace(/&/g,"&amp;").replace(/</g,"&lt;")
}return this
}};
jindo.$Element.prototype.html=function(f){var d=g_checkVarType(arguments,{g:[],s4str:[jindo.$Jindo._F("sText:String+")],s4num:["sText:Numeric"],s4bln:["sText:Boolean"]},"$Element#html");
switch(d+""){case"g":return this._element.innerHTML;
case"s4str":case"s4num":case"s4bln":f+="";
var b=this._element,c;
if(this._element.tagName.toLowerCase()=="table"&&!f.match(/<tbody[^>]*>/i)&&f.match(/<(thead|tfoot|caption|colgroup|col|th|tr|td)[^>]*>(?:.*?)(<\/\1>)?/i)){var a=b.ownerDocument||b.document||document;
a.createDocumentFragment().appendChild(c=b.cloneNode(1));
c.innerHTML=f;
if(!c.getElementsByTagName("tbody").length){f=c.innerHTML=["<tbody>","</tbody>"].join(c.innerHTML)
}a=null
}b.innerHTML=f;
return this
}};
jindo.$Element.prototype.outerHTML=function(){var d=this._element;
d=jindo.$Jindo.isDocument(d)?d.documentElement:d;
if(d.outerHTML!==undefined){return d.outerHTML
}var a=d.ownerDocument||d.document||document;
var f=a.createElement("div");
var c=d.parentNode;
if(!c){return d.innerHTML
}c.insertBefore(f,d);
f.style.display="none";
f.appendChild(d);
var b=f.innerHTML;
c.insertBefore(d,f);
c.removeChild(f);
return b
};
jindo.$Element.prototype.toString=function(){return this.outerHTML()||"[object $Element]"
};
jindo.$Element.prototype.attach=function(g,f){var c=g_checkVarType(arguments,{"4str":["sEvent:String+","fpCallback:Function+"],"4obj":["hListener:Hash+"]},"$Element#attach");
var d,b;
switch(c+""){case"4str":d=jindo._p_.splitEventSelector(c.sEvent);
this._add(d.type,d.event,d.selector,f);
break;
case"4obj":b=c.hListener;
for(var a in b){this.attach(a,b[a])
}break
}return this
};
jindo.$Element.prototype.detach=function(g,f){var c=g_checkVarType(arguments,{"4str":["sEvent:String+","fpCallback:Function+"],"4obj":["hListener:Hash+"]},"$Element#detach");
var d,b;
switch(c+""){case"4str":d=jindo._p_.splitEventSelector(c.sEvent);
this._del(d.type,d.event,d.selector,f);
break;
case"4obj":b=c.hListener;
for(var a in b){this.detach(a,b[a])
}break
}return this
};
jindo.$Element.prototype.delegate=function(d,b,c){var a=g_checkVarType(arguments,{"4str":["sEvent:String+","vFilter:String+","fpCallback:Function+"],"4fun":["sEvent:String+","vFilter:Function+","fpCallback:Function+"]},"$Element#delegate");
return this._add("delegate",d,b,c)
};
jindo.$Element.prototype.undelegate=function(d,b,c){var a=g_checkVarType(arguments,{"4str":["sEvent:String+","vFilter:String+","fpCallback:Function+"],"4fun":["sEvent:String+","vFilter:Function+","fpCallback:Function+"],group_for_string:["sEvent:String+","vFilter:String+"],group_for_function:["sEvent:String+","vFilter:Function+"]},"$Element#undelegate");
return this._del("delegate",d,b,c)
};
jindo._p_.customEventAttach=function(a,b,f,c,d,j,n){if(!jindo._p_.hasCustomEventListener(j.__jindo__id,b,f)){var m=jindo._p_.getCustomEvent(b);
var k=new m();
var o=k.events;
k.real_listener.push(c);
k.wrap_listener.push(d);
for(var h=0,g=o.length;
h<g;
h++){k["_fp"+o[h]]=jindo.$Fn(k[o[h]],k).bind();
n(a,o[h],f,k["_fp"+o[h]])
}jindo._p_.addCustomEventListener(j,j.__jindo__id,b,f,k)
}else{var k=jindo._p_.getCustomEventListener(j.__jindo__id,b,f).custom;
if(k.real_listener){k.real_listener.push(c);
k.wrap_listener.push(d)
}}};
jindo._p_.normalCustomEventAttach=function(d,g,a,c,f,b){if(!jindo._p_.normalCustomEvent[g][a]){jindo._p_.normalCustomEvent[g][a]={};
jindo._p_.normalCustomEvent[g][a].ele=d;
jindo._p_.normalCustomEvent[g][a][c]={};
jindo._p_.normalCustomEvent[g][a][c].real_listener=[];
jindo._p_.normalCustomEvent[g][a][c].wrap_listener=[]
}jindo._p_.normalCustomEvent[g][a][c].real_listener.push(f);
jindo._p_.normalCustomEvent[g][a][c].wrap_listener.push(b)
};
jindo.$Element.prototype._add=function(a,c,g,f){var b=jindo.$Element.eventManager;
var j=c;
c=c.toLowerCase();
var m=b.splitGroup(c);
c=m.event;
var n=m.group;
var o=this._element;
var h=o.__jindo__id;
var k=o.ownerDocument||o.document||document;
if(jindo._p_.hasCustomEvent(c)){g=g||"_NONE_";
var d=jindo.$Fn(f,this).bind();
jindo._p_.normalCustomEventAttach(o,c,h,g,f,d);
if(jindo._p_.getCustomEvent(c)){jindo._p_.customEventAttach(a,c,g,f,d,o,jindo.$Fn(this._add,this).bind())
}}else{if(c=="domready"&&jindo.$Jindo.isWindow(o)){jindo.$Element(k).attach(c,f);
return this
}if(c=="load"&&o===k){jindo.$Element(window).attach(c,f);
return this
}c=b.revisionEvent(a,c,j);
f=b.revisionCallback(a,c,j,f);
if(!b.isInit(this._key)){b.init(this._key,o)
}if(!b.hasEvent(this._key,c,j)){b.initEvent(this,c,j,n)
}if(!b.hasGroup(this._key,c,n)){b.initGroup(this._key,c,n)
}b.addEventListener(this._key,c,n,a,g,f)
}return this
};
jindo._p_.customEventDetach=function(a,b,f,d,j,m){var c=jindo._p_.getCustomEventListener(j.__jindo__id,b,f);
var k=c.custom;
var n=k.events;
for(var h=0,g=n.length;
h<g;
h++){m(a,n[h],f,k["_fp"+n[h]])
}};
jindo.$Element.prototype._del=function(g,b,s,f){var a=jindo.$Element.eventManager;
var o=b;
b=b.toLowerCase();
var k=a.splitGroup(b);
b=k.event;
var q=k.group;
var t=this._element.ownerDocument||this._element.document||document;
if(jindo._p_.hasCustomEvent(b)){var j=this._element.__jindo__id;
s=s||"_NONE_";
var c=jindo._p_.getNormalEventListener(j,b,s);
var h=c.wrap_listener;
var m=c.real_listener;
var w=[];
var y=[];
for(var r=0,n=m.length;
r<n;
r++){if(m[r]!=f){w.push(h[r]);
y.push(m[r])
}}if(y.length==0){var p=jindo._p_.normalCustomEvent[b][j];
var d=0;
for(var r in p){if(r!=="ele"){d++;
break
}}if(d===0){delete jindo._p_.normalCustomEvent[b][j]
}else{delete jindo._p_.normalCustomEvent[b][j][s]
}}if(jindo._p_.customEvent[b]){jindo._p_.setCustomEventListener(j,b,s,y,w);
if(y.length==0){jindo._p_.customEventDetach(g,b,s,f,this._element,jindo.$Fn(this._del,this).bind());
delete jindo._p_.customEventStore[j][b][s]
}}}else{if(b=="domready"&&jindo.$Jindo.isWindow(this._element)){jindo.$Element(t).detach(b,f);
return this
}if(b=="load"&&this._element===t){jindo.$Element(window).detach(b,f);
return this
}b=a.revisionEvent(g,b,o);
if(q===jindo._p_.NONE_GROUP&&!jindo.$Jindo.isFunction(f)&&!s){throw new jindo.$Error(jindo.$Except.HAS_FUNCTION_FOR_GROUP,"$Element#"+(g=="normal"?"detach":"delegate"))
}a.removeEventListener(this._key,b,q,g,s,f)
}return this
};
jindo._p_.mouseTouchPointerEvent=function(b){var a={};
if(window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0){a={mousedown:"MSPointerDown",mouseup:"MSPointerUp",mousemove:"MSPointerMove",mouseover:"MSPointerOver",mouseout:"MSPointerOut",touchstart:"MSPointerDown",touchend:"MSPointerUp",touchmove:"MSPointerMove",pointerdown:"MSPointerDown",pointerup:"MSPointerUp",pointermove:"MSPointerMove",pointerover:"MSPointerOver",pointerout:"MSPointerOut",pointercancel:"MSPointerCancel"}
}else{if(jindo._p_._JINDO_IS_MO){a={mousedown:"touchstart",mouseup:"touchend",mousemove:"touchmove",pointerdown:"touchstart",pointerup:"touchend",pointermove:"touchmove"}
}}jindo._p_.mouseTouchPointerEvent=function(c){return a[c]?a[c]:c
};
return jindo._p_.mouseTouchPointerEvent(b)
};
jindo.$Element.eventManager=(function(){var a={};
function c(g,d,f){return function(){var h=jindo._p_._toArray(arguments);
if(f.length){h=f.concat(h)
}return g.apply(d,h)
}}var b={mousedown:"mousedown",mousemove:"mousemove",mouseup:"mouseup"};
return{revisionCallback:function(j,h,g,f){if(g=="mouseenter"||g=="mouseleave"){var d=jindo.$Element.eventManager._fireWhenElementBoundary(j,f);
d._origin_=f;
f=d
}return f
},_fireWhenElementBoundary:function(f,d){return function(g){var j=g.relatedElement?jindo.$Element(g.relatedElement):null;
var h=g.currentElement;
if(f=="delegate"){h=g.element
}if(j&&(j.isEqual(h)||j.isChildOf(h))){return
}d(g)
}},revisionEvent:function(k,j,h){if(/^ms/i.test(h)){return h
}var d=jindo.$Event.hook(j);
if(d){if(jindo.$Jindo.isFunction(d)){return jindo._p_.customEvent()
}else{return d
}}j=j.toLowerCase();
if(j=="domready"||j=="domcontentloaded"){j="DOMContentLoaded"
}else{if(j=="mousewheel"&&!jindo._p_._JINDO_IS_WK&&!jindo._p_._JINDO_IS_OP){j="DOMMouseScroll"
}else{if(j=="mouseenter"){j="mouseover"
}else{if(j=="mouseleave"){j="mouseout"
}else{if(j=="transitionend"||j=="transitionstart"){var g=j.replace("transition","");
var f=jindo._p_.getStyleIncludeVendorPrefix();
if(f.transition!="transition"){g=g.substr(0,1).toUpperCase()+g.substr(1)
}j=f.transition+g
}else{if(j=="animationstart"||j=="animationend"||j=="animationiteration"){var g=j.replace("animation","");
var f=jindo._p_.getStyleIncludeVendorPrefix();
if(f.animation!="animation"){g=g.substr(0,1).toUpperCase()+g.substr(1)
}j=f.animation+g
}else{if(j==="focusin"||j==="focusout"){j=j==="focusin"?"focus":"blur"
}}}}}}}return jindo._p_.mouseTouchPointerEvent(j)
},test:function(){return a
},isInit:function(d){return !!a[d]
},init:function(d,f){a[d]={ele:f,event:{}}
},getEventConfig:function(d){return a[d]
},hasEvent:function(d,h,g){try{return !!a[d]["event"][h]
}catch(f){return false
}},hasGroup:function(f,g,d){return !!a[f]["event"][g]["type"][d]
},createEvent:function(f,j,d,h){if(f.currentTarget===undefined){f.currentTarget=d
}var g=jindo.$Event(f);
if(!g.currentElement){g.currentElement=d
}g.realType=j;
g.delegatedElement=h;
return g
},initEvent:function(g,n,m,d){var j=g._key;
var f=a[j]["event"];
var h=this;
var k=c(function(r,E,q,A){A=A||window.event;
var y=A.target||A.srcElement;
var o=jindo.$Element.eventManager;
var w=o.getEventConfig((A.currentTarget||this._element).__jindo__id);
var J=w.event[r].type;
for(var H in J){if(J.hasOwnProperty(H)){var z=J[H].normal;
for(var F=0,C=z.length;
F<C;
F++){z[F].call(this,q.createEvent(A,E,this._element,null))
}var G=J[H].delegate;
var p;
var I;
for(var D in G){if(G.hasOwnProperty(D)){p=G[D].checker(y);
if(p[0]){I=G[D].callback;
var s;
for(var B=0,t=I.length;
B<t;
B++){s=q.createEvent(A,E,this._element,p[1]);
s.element=p[1];
I[B].call(this,s)
}}}}}}},g,[n,m,this]);
f[n]={listener:k,type:{}};
jindo.$Element._eventBind(g._element,n,k,(m==="focusin"||m==="focusout"))
},initGroup:function(f,h,d){var g=a[f]["event"][h]["type"];
g[d]={normal:[],delegate:{}}
},addEventListener:function(g,k,d,m,f,j){var h=a[g]["event"][k]["type"][d];
if(m==="normal"){h.normal.push(j)
}else{if(m==="delegate"){if(!this.hasDelegate(h,f)){this.initDelegate(a[g].ele,h,f)
}this.addDelegate(h,f,j)
}}},hasDelegate:function(f,d){return !!f.delegate[d]
},containsElement:function(d,k,j,g){if(d==k&&g){return jindo.$$.test(k,j)
}var m=jindo.$$(j,d);
for(var h=0,f=m.length;
h<f;
h++){if(m[h]==k){return true
}}return false
},initDelegate:function(d,g,f){var h;
if(jindo.$Jindo.isString(f)){h=c(function(k,q,j){var n=j;
var r=this.containsElement(k,j,q,true);
if(!r){var m=this._getParent(k,j);
for(var p=0,o=m.length;
p<o;
p++){n=m[p];
if(this.containsElement(k,n,q)){r=true;
break
}}}return[r,n]
},this,[d,f])
}else{h=c(function(k,q,j){var n=j;
var r=q(k,j);
if(!r){var m=this._getParent(k,j);
for(var p=0,o=m.length;
p<o;
p++){n=m[p];
if(q(k,n)){r=true;
break
}}}return[r,n]
},this,[d,f])
}g.delegate[f]={checker:h,callback:[]}
},addDelegate:function(g,d,f){g.delegate[d].callback.push(f)
},removeEventListener:function(q,f,r,d,j,g){var h;
try{h=a[q]["event"][f]["type"][r]
}catch(p){return
}var m=[];
var o;
if(d==="normal"){o=h.normal
}else{o=h.delegate[j].callback
}if(f==jindo._p_.NONE_GROUP||jindo.$Jindo.isFunction(g)){for(var n=0,k=o.length;
n<k;
n++){if((o[n]._origin_||o[n])!=g){m.push(o[n])
}}}if(d==="normal"){delete h.normal;
h.normal=m
}else{if(d==="delegate"){delete h.delegate[j].callback;
h.delegate[j].callback=m
}}this.cleanUp(q,f)
},cleanUpAll:function(){var d;
for(var f in a){if(a.hasOwnProperty(f)){this.cleanUpUsingKey(f,true)
}}},cleanUpUsingKey:function(g,f){var d;
if(!a[g]||!a[g].event){return
}d=a[g].event;
for(var h in d){if(d.hasOwnProperty(h)){this.cleanUp(g,h,f)
}}},cleanUp:function(t,d,w){var r;
try{r=a[t]["event"][d]["type"]
}catch(q){return
}var f;
var g=false;
if(!w){for(var n in r){if(r.hasOwnProperty(n)){f=r[n];
if(f.normal.length){g=true;
break
}var p=f.delegate;
for(var m in p){if(p.hasOwnProperty(m)){if(p[m].callback.length){g=true;
break
}}}if(g){break
}}}}if(!g){jindo.$Element._unEventBind(a[t].ele,d,a[t]["event"][d]["listener"]);
delete a[t]["event"][d];
var o=true;
var s=a[t]["event"];
for(var h in s){if(s.hasOwnProperty(h)){o=false;
break
}}if(o){delete a[t]
}}},splitGroup:function(f){var d=/\s*(.+?)\s*\(\s*(.*?)\s*\)/.exec(f);
if(d){return{event:d[1].toLowerCase(),group:d[2].toLowerCase()}
}else{return{event:f.toLowerCase(),group:jindo._p_.NONE_GROUP}
}},_getParent:function(h,d){var k=h;
var g=[],j=null;
var f=d.ownerDocument||d.document||document;
while(d.parentNode&&j!=k){j=d.parentNode;
if(j==f.documentElement){break
}g[g.length]=j;
d=j
}return g
}}
})();
jindo.$Element.prototype.appear=function(c,h){var f=g_checkVarType(arguments,{"4voi":[],"4num":["nDuration:Numeric"],"4fun":["nDuration:Numeric","fpCallback:Function+"]},"$Element#appear");
switch(f+""){case"4voi":c=0.3;
h=function(){};
break;
case"4num":c=f.nDuration;
h=function(){};
break;
case"4fun":c=f.nDuration;
h=f.fpCallback
}var j=this;
if(this.visible()){setTimeout(function(){h.call(j,j)
},16);
return this
}var k=this._element;
var g=jindo._p_.getStyleIncludeVendorPrefix();
var b=g.transition;
var d;
if(b=="transition"){d="end"
}else{d="End"
}var a=function(){j.show();
k.style[b+"Property"]="";
k.style[b+"Duration"]="";
k.style[b+"TimingFunction"]="";
k.style.opacity="";
h.call(j,j);
k.removeEventListener(b+d,arguments.callee,false)
};
if(!this.visible()){k.style.opacity=k.style.opacity||0;
j.show()
}k.addEventListener(b+d,a,false);
k.style[b+"Property"]="opacity";
k.style[b+"Duration"]=c+"s";
k.style[b+"TimingFunction"]="linear";
jindo._p_.setOpacity(k,"1");
return this
};
jindo.$Element.prototype.disappear=function(c,h){var f=g_checkVarType(arguments,{"4voi":[],"4num":["nDuration:Numeric"],"4fun":["nDuration:Numeric","fpCallback:Function+"]},"$Element#disappear");
switch(f+""){case"4voi":c=0.3;
h=function(){};
break;
case"4num":c=f.nDuration;
h=function(){};
break;
case"4fun":c=f.nDuration;
h=f.fpCallback
}var j=this;
if(!this.visible()){setTimeout(function(){h.call(j,j)
},16);
return this
}var k=this._element;
var g=jindo._p_.getStyleIncludeVendorPrefix();
var b=g.transition;
var d;
if(b=="transition"){d="end"
}else{d="End"
}var a=function(){j.hide();
k.style[b+"Property"]="";
k.style[b+"Duration"]="";
k.style[b+"TimingFunction"]="";
k.style.opacity="";
h.call(j,j);
k.removeEventListener(b+d,arguments.callee,false)
};
k.addEventListener(b+d,a,false);
k.style[b+"Property"]="opacity";
k.style[b+"Duration"]=c+"s";
k.style[b+"TimingFunction"]="linear";
jindo._p_.setOpacity(k,"0");
return this
};
jindo.$Element.prototype.offset=function(a,b){var c=g_checkVarType(arguments,{g:[],s:["nTop:Numeric","nLeft:Numeric"]},"$Element#offset");
switch(c+""){case"g":return this.offset_get();
case"s":return this.offset_set(c.nTop,c.nLeft)
}};
jindo.$Element.prototype.offset_set=function(f,g){var c=this._element;
var d=null;
if(isNaN(parseFloat(this._getCss(c,"top")))){c.style.top="0px"
}if(isNaN(parseFloat(this._getCss(c,"left")))){c.style.left="0px"
}var b=this.offset_get();
var a={top:f-b.top,left:g-b.left};
c.style.top=parseFloat(this._getCss(c,"top"))+a.top+"px";
c.style.left=parseFloat(this._getCss(c,"left"))+a.left+"px";
return this
};
jindo.$Element.prototype.offset_get=function(c,b){var j=this._element,d=null,p={left:0,top:0},q=j.ownerDocument||j.document||document,g=q.documentElement,h=q.body;
if(j.getBoundingClientRect){if(!d){var n=(window==top);
if(!n){try{n=(window.frameElement&&window.frameElement.frameBorder==1)
}catch(m){}}d={left:0,top:0}
}var k=j.getBoundingClientRect();
if(j!==g&&j!==h){p.left=k.left-d.left;
p.top=k.top-d.top;
p.left+=g.scrollLeft||h.scrollLeft;
p.top+=g.scrollTop||h.scrollTop
}}else{if(q.getBoxObjectFor){var k=q.getBoxObjectFor(j),a=q.getBoxObjectFor(g||h);
p.left=k.screenX-a.screenX;
p.top=k.screenY-a.screenY
}else{for(var f=j;
f;
f=f.offsetParent){p.left+=f.offsetLeft;
p.top+=f.offsetTop
}for(var f=j.parentNode;
f;
f=f.parentNode){if(f.tagName=="BODY"){break
}if(f.tagName=="TR"){p.top+=2
}p.left-=f.scrollLeft;
p.top-=f.scrollTop
}}}return p
};
jindo.$Element.prototype.evalScripts=function(sHTML){var oArgs=g_checkVarType(arguments,{"4str":["sHTML:String+"]},"$Element#evalScripts");
var aJS=[];
var leftScript="<script(\\s[^>]+)*>(.*?)</";
var rightScript="script>";
sHTML=sHTML.replace(new RegExp(leftScript+rightScript,"gi"),function(_1,_2,sPart){aJS.push(sPart);
return""
});
eval(aJS.join("\n"));
return this
};
jindo.$Element.prototype.clone=function(a){var b=g_checkVarType(arguments,{"default":[],set:["bDeep:Boolean"]},"$Element#clone");
if(b+""=="default"){a=true
}return jindo.$Element(this._element.cloneNode(a))
};
jindo.$Element._common=function(b,a){try{return jindo.$Element(b)._element
}catch(c){throw TypeError(c.message.replace(/\$Element/g,"$Element#"+a).replace(/Element\.html/g,"Element.html#"+a))
}};
jindo.$Element._prepend=function(c,b){var a=c.childNodes;
if(a.length>0){c.insertBefore(b,a[0])
}else{c.appendChild(b)
}};
jindo.$Element.prototype.append=function(a){this._element.appendChild(jindo.$Element._common(a,"append"));
return this
};
jindo.$Element.prototype.prepend=function(a){jindo.$Element._prepend(this._element,jindo.$Element._common(a,"prepend"));
return this
};
jindo.$Element.prototype.replace=function(c){c=jindo.$Element._common(c,"replace");
if(jindo.cssquery){jindo.cssquery.release()
}var d=this._element;
var b=d.parentNode;
if(b&&b.replaceChild){b.replaceChild(c,d);
return this
}var a=c;
b.insertBefore(a,d);
b.removeChild(d);
return this
};
jindo.$Element.prototype.appendTo=function(a){jindo.$Element._common(a,"appendTo").appendChild(this._element);
return this
};
jindo.$Element.prototype.prependTo=function(a){jindo.$Element._prepend(jindo.$Element._common(a,"prependTo"),this._element);
return this
};
jindo.$Element.prototype.before=function(a){var b=jindo.$Element._common(a,"before");
this._element.parentNode.insertBefore(b,this._element);
return this
};
jindo.$Element.prototype.after=function(a){a=jindo.$Element._common(a,"after");
this.before(a);
jindo.$Element(a).before(this);
return this
};
jindo.$Element.prototype.parent=function(d,c){var f=g_checkVarType(arguments,{"4voi":[],"4fun":["fpFunc:Function+"],"4nul":["fpFunc:Null"],for_function_number:["fpFunc:Function+","nLimit:Numeric"],for_null_number:["fpFunc:Null","nLimit:Numeric"]},"$Element#parent");
var h=this._element;
switch(f+""){case"4voi":return h.parentNode?jindo.$Element(h.parentNode):null;
case"4fun":case"4nul":c=-1;
break;
case"for_function_number":case"for_null_number":if(f.nLimit==0){c=-1
}}var b=[],g=null;
while(h.parentNode&&c--!=0){try{g=jindo.$Element(h.parentNode)
}catch(h){g=null
}if(h.parentNode==document.documentElement){break
}if(!d||(d&&d.call(this,g))){b[b.length]=g
}h=h.parentNode
}return b
};
jindo.$Element.prototype.child=function(q,h){var g=g_checkVarType(arguments,{"4voi":[],"4fun":["fpFunc:Function+"],"4nul":["fpFunc:Null"],for_function_number:["fpFunc:Function+","nLimit:Numeric"],for_null_number:["fpFunc:Null","nLimit:Numeric"]},"$Element#child");
var n=this._element;
var p=[],o=null,k=null;
switch(g+""){case"4voi":var b=n.childNodes;
var m=[];
for(var j=0,d=b.length;
j<d;
j++){if(b[j].nodeType==1){try{m.push(jindo.$Element(b[j]))
}catch(n){m.push(null)
}}}return m;
case"4fun":case"4nul":h=-1;
break;
case"for_function_number":case"for_null_number":if(g.nLimit==0){h=-1
}}(k=function(r,w,c){var f=null,t=null;
for(var a=0;
a<r.childNodes.length;
a++){f=r.childNodes[a];
if(f.nodeType!=1){continue
}try{t=jindo.$Element(r.childNodes[a])
}catch(s){t=null
}if(!q||(q&&q.call(c,t))){p[p.length]=t
}if(w!=0){k(r.childNodes[a],w-1)
}}})(n,h-1,this);
return p
};
jindo.$Element.prototype.prev=function(c){var d=g_checkVarType(arguments,{"4voi":[],"4fun":["fpFunc:Function+"],"4nul":["fpFunc:Null"]},"$Element#prev");
var f=this._element;
var b=[];
switch(d+""){case"4voi":if(!f){return null
}do{f=f.previousSibling;
if(!f||f.nodeType!=1){continue
}try{if(f==null){return null
}return jindo.$Element(f)
}catch(f){return null
}}while(f);
try{if(f==null){return null
}return jindo.$Element(f)
}catch(f){return null
}case"4fun":case"4nul":if(!f){return b
}do{f=f.previousSibling;
if(!f||f.nodeType!=1){continue
}if(!c||c.call(this,f)){try{if(f==null){b[b.length]=null
}else{b[b.length]=jindo.$Element(f)
}}catch(f){b[b.length]=null
}}}while(f);
try{return b
}catch(f){return null
}}};
jindo.$Element.prototype.next=function(c){var d=g_checkVarType(arguments,{"4voi":[],"4fun":["fpFunc:Function+"],"4nul":["fpFunc:Null"]},"$Element#next");
var f=this._element;
var b=[];
switch(d+""){case"4voi":if(!f){return null
}do{f=f.nextSibling;
if(!f||f.nodeType!=1){continue
}try{if(f==null){return null
}return jindo.$Element(f)
}catch(f){return null
}}while(f);
try{if(f==null){return null
}return jindo.$Element(f)
}catch(f){return null
}case"4fun":case"4nul":if(!f){return b
}do{f=f.nextSibling;
if(!f||f.nodeType!=1){continue
}if(!c||c.call(this,f)){try{if(f==null){b[b.length]=null
}else{b[b.length]=jindo.$Element(f)
}}catch(f){b[b.length]=null
}}}while(f);
try{return b
}catch(f){return null
}}};
jindo.$Element.prototype.first=function(){var a=this._element.firstElementChild||this._element.firstChild;
if(!a){return null
}while(a&&a.nodeType!=1){a=a.nextSibling
}try{return a?jindo.$Element(a):null
}catch(b){return null
}};
jindo.$Element.prototype.last=function(){var a=this._element.lastElementChild||this._element.lastChild;
if(!a){return null
}while(a&&a.nodeType!=1){a=a.previousSibling
}try{return a?jindo.$Element(a):null
}catch(b){return null
}};
jindo.$Element._contain=function(a,c){if(document.compareDocumentPosition){return !!(a.compareDocumentPosition(c)&16)
}else{var d=a;
var b=c;
while(d&&d.parentNode){d=d.parentNode;
if(d==b){return true
}}return false
}};
jindo.$Element.prototype.isChildOf=function(a){try{return jindo.$Element._contain(jindo.$Element(a)._element,this._element)
}catch(b){return false
}};
jindo.$Element.prototype.isParentOf=function(a){try{return jindo.$Element._contain(this._element,jindo.$Element(a)._element)
}catch(b){return false
}};
jindo.$Element.prototype.isEqual=function(a){try{return(this._element===jindo.$Element(a)._element)
}catch(b){return false
}};
jindo._p_.fireCustomEvent=function(p,b,o,c){var n=jindo._p_.normalCustomEvent[b];
var d,m;
for(var h in n){m=n[h];
d=m.ele;
var j;
for(var a in m){if(a==="_NONE_"){if(d==p||o.isChildOf(d)){j=m[a].wrap_listener;
for(var g=0,f=j.length;
g<f;
g++){j[g]()
}}}else{if(jindo.$Element.eventManager.containsElement(d,p,a,false)){j=m[a].wrap_listener;
for(var g=0,f=j.length;
g<f;
g++){j[g]()
}}}}}};
jindo.$Element.prototype.fireEvent=function(b,g){var f=g_checkVarType(arguments,{"4str":[jindo.$Jindo._F("sEvent:String+")],"4obj":["sEvent:String+","oProps:Hash+"]},"$Element#fireEvent");
var k=this._element;
var d=b;
b=jindo.$Element.eventManager.revisionEvent("",b,b);
if(jindo._p_.normalCustomEvent[b]){jindo._p_.fireCustomEvent(k,b,this,!!jindo._p_.normalCustomEvent[b]);
return this
}var a="HTMLEvents";
b=(b+"").toLowerCase();
if(b=="click"||b.indexOf("mouse")==0){a="MouseEvent"
}else{if(d.indexOf("wheel")>0){b="DOMMouseScroll";
a=jindo._p_._JINDO_IS_FF?"MouseEvent":"MouseWheelEvent"
}else{if(b.indexOf("key")==0){a="KeyboardEvent"
}else{if(b.indexOf("pointer")>0){a="MouseEvent";
b=d
}}}}var j;
switch(f+""){case"4obj":g=f.oProps;
g.button=0+(g.middle?1:0)+(g.right?2:0);
g.ctrl=g.ctrl||false;
g.alt=g.alt||false;
g.shift=g.shift||false;
g.meta=g.meta||false;
switch(a){case"MouseEvent":j=document.createEvent(a);
j.initMouseEvent(b,true,true,null,g.detail||0,g.screenX||0,g.screenY||0,g.clientX||0,g.clientY||0,g.ctrl,g.alt,g.shift,g.meta,g.button,g.relatedElement||null);
break;
case"KeyboardEvent":if(window.KeyEvent){j=document.createEvent("KeyEvents");
j.initKeyEvent(b,true,true,window,g.ctrl,g.alt,g.shift,g.meta,g.keyCode,g.keyCode)
}else{try{j=document.createEvent("Events")
}catch(h){j=document.createEvent("UIEvents")
}finally{j.initEvent(b,true,true);
j.ctrlKey=g.ctrl;
j.altKey=g.alt;
j.shiftKey=g.shift;
j.metaKey=g.meta;
j.keyCode=g.keyCode;
j.which=g.keyCode
}}break;
default:j=document.createEvent(a);
j.initEvent(b,true,true)
}break;
case"4str":j=document.createEvent(a);
j.initEvent(b,true,true)
}var c=this._element;
if(jindo.$Jindo.isWindow(c)&&/(iPhone|iPad|iPod).*OS\s+([0-9\.]+)/.test(jindo._p_._j_ag)&&parseFloat(RegExp.$2)<4){c=c.document
}c.dispatchEvent(j);
return this
};
jindo.$Element.prototype.empty=function(){if(jindo.cssquery){jindo.cssquery.release()
}this.html("");
return this
};
jindo.$Element.prototype.remove=function(b){if(jindo.cssquery){jindo.cssquery.release()
}var a=jindo.$Element;
a(a._common(b,"remove")).leave();
return this
};
jindo.$Element.prototype.leave=function(){var a=this._element;
if(a.parentNode){if(jindo.cssquery){jindo.cssquery.release()
}a.parentNode.removeChild(a)
}if(this._element.__jindo__id){jindo.$Element.eventManager.cleanUpUsingKey(this._element.__jindo__id,true)
}return this
};
jindo.$Element.prototype.wrap=function(b){var a=this._element;
b=jindo.$Element._common(b,"wrap");
if(a.parentNode){a.parentNode.insertBefore(b,a)
}b.appendChild(a);
return this
};
jindo.$Element.prototype.ellipsis=function(k){var g=g_checkVarType(arguments,{"4voi":[],"4str":["stringTail:String+"]},"$Element#ellipsis");
k=k||"...";
var b=this.text();
var a=b.length;
var j=parseInt(this._getCss(this._element,"paddingTop"),10)+parseInt(this._getCss(this._element,"paddingBottom"),10);
var d=this._element.offsetHeight-j;
var c=0;
var f=this.text("A")._element.offsetHeight-j;
if(d<f*1.5){this.text(b);
return this
}d=f;
while(d<f*1.5){c+=Math.max(Math.ceil((a-c)/2),1);
d=this.text(b.substring(0,c)+k)._element.offsetHeight-j
}while(d>f*1.5){c--;
d=this.text(b.substring(0,c)+k)._element.offsetHeight-j
}return this
};
jindo.$Element.prototype.indexOf=function(d){try{var f=jindo.$Element(d)._element;
var h=this._element.childNodes;
var g=0;
var a=h.length;
for(var b=0;
b<a;
b++){if(h[b].nodeType!=1){continue
}if(h[b]===f){return g
}g++
}}catch(f){}return -1
};
jindo.$Element.prototype.queryAll=function(g){var c=g_checkVarType(arguments,{"4str":["sSelector:String+"]},"$Element#queryAll");
var f=jindo.cssquery(g,this._element);
var d=[];
for(var b=0,a=f.length;
b<a;
b++){d.push(jindo.$Element(f[b]))
}return d
};
jindo.$Element.prototype.query=function(c){var a=g_checkVarType(arguments,{"4str":["sSelector:String+"]},"$Element#query");
var b=jindo.cssquery.getSingle(c,this._element);
return b===null?b:jindo.$Element(b)
};
jindo.$Element.prototype.test=function(b){var a=g_checkVarType(arguments,{"4str":["sSelector:String+"]},"$Element#test");
return jindo.cssquery.test(this._element,b)
};
jindo.$Element.prototype.xpathAll=function(b){var d=g_checkVarType(arguments,{"4str":["sXPath:String+"]},"$Element#xpathAll");
var g=jindo.cssquery.xpath(b,this._element);
var f=[];
for(var c=0,a=g.length;
c<a;
c++){f.push(jindo.$Element(g[c]))
}return f
};
jindo.$Element.insertAdjacentHTML=function(c,p,w,f,h,j){var a=[p];
a.callee=arguments.callee;
var A=g_checkVarType(a,{"4str":["sHTML:String+"]},"$Element#"+j);
var q=c._element;
p=p+"";
if(q.insertAdjacentHTML&&!(/^<(option|tr|td|th|col)(?:.*?)>/.test(jindo._p_.trim(p).toLowerCase()))){q.insertAdjacentHTML(w,p)
}else{var z=q.ownerDocument||q.document||document;
var b=z.createDocumentFragment();
var y;
var m=jindo._p_.trim(p);
var g={option:"select",tr:"tbody",thead:"table",tbody:"table",col:"table",td:"tr",th:"tr",div:"div"};
var o=/^\<(option|tr|thead|tbody|td|th|col)(?:.*?)\>/i.exec(m);
var r=o===null?"div":o[1].toLowerCase();
var n=g[r];
y=jindo._p_._createEle(n,m,z,true);
var d=y.getElementsByTagName("script");
for(var t=0,s=d.length;
t<s;
t++){d[t].parentNode.removeChild(d[t])
}if(q.tagName.toLowerCase()=="table"&&!q.getElementsByTagName("tbody").length&&!m.match(/<tbody[^>]*>/i)){var B=z.createElement("tbody"),k=m.match(/^<t(head|foot)[^>]*>/i);
if(!k){b.appendChild(B);
b=B
}}while(y[f]){b.appendChild(y[f])
}k&&b.appendChild(B);
h(b.cloneNode(true))
}return c
};
jindo.$Element.prototype.appendHTML=function(a){return jindo.$Element.insertAdjacentHTML(this,a,"beforeEnd","firstChild",jindo.$Fn(function(b){var g=this._element;
if(g.tagName.toLowerCase()==="table"){var d=g.childNodes;
for(var f=0,c=d.length;
f<c;
f++){if(d[f].nodeType==1){g=d[f];
break
}}}g.appendChild(b)
},this).bind(),"appendHTML")
};
jindo.$Element.prototype.prependHTML=function(b){var a=jindo.$Element;
return a.insertAdjacentHTML(this,b,"afterBegin","firstChild",jindo.$Fn(function(c){var h=this._element;
if(h.tagName.toLowerCase()==="table"){var f=h.childNodes;
for(var g=0,d=f.length;
g<d;
g++){if(f[g].nodeType==1){h=f[g];
break
}}}a._prepend(h,c)
},this).bind(),"prependHTML")
};
jindo.$Element.prototype.beforeHTML=function(a){return jindo.$Element.insertAdjacentHTML(this,a,"beforeBegin","firstChild",jindo.$Fn(function(b){this._element.parentNode.insertBefore(b,this._element)
},this).bind(),"beforeHTML")
};
jindo.$Element.prototype.afterHTML=function(a){return jindo.$Element.insertAdjacentHTML(this,a,"afterEnd","firstChild",jindo.$Fn(function(b){this._element.parentNode.insertBefore(b,this._element.nextSibling)
},this).bind(),"afterHTML")
};
jindo.$Element.prototype.hasEventListener=function(g){var c=g_checkVarType(arguments,{"4str":["sEvent:String+"]},"$Element#hasEventListener"),a,b=false,f=c.sEvent.toLowerCase();
if(this._key){a=this._element.ownerDocument||this._element.document||document;
if(f=="load"&&this._element===a){b=jindo.$Element(window).hasEventListener(c.sEvent)
}else{if(f=="domready"&&jindo.$Jindo.isWindow(this._element)){b=jindo.$Element(a).hasEventListener(c.sEvent)
}else{var d=jindo.$Element.eventManager.revisionEvent("",g);
b=!!jindo.$Element.eventManager.hasEvent(this._key,d,c.sEvent)
}}return b
}return false
};
jindo.$Element.prototype.preventTapHighlight=function(c){if(jindo._p_._JINDO_IS_MO){var b="no_tap_highlight"+new Date().getTime();
var f=document.createElement("style");
var d=document.getElementsByTagName("html")[0];
f.type="text/css";
d.insertBefore(f,d.firstChild);
var a=f.sheet||f.styleSheet;
a.insertRule("."+b+" { -webkit-tap-highlight-color: rgba(0,0,0,0); }",0);
a.insertRule("."+b+" * { -webkit-tap-highlight-color: rgba(0,0,0,.25); }",0);
jindo.$Element.prototype.preventTapHighlight=function(g){return this[g?"addClass":"removeClass"](b)
}}else{jindo.$Element.prototype.preventTapHighlight=function(g){return this
}}return this.preventTapHighlight.apply(this,jindo._p_._toArray(arguments))
};
jindo.$Element.prototype.data=function(sKey,vValue){var oType={g:["sKey:String+"],s4var:["sKey:String+","vValue:Variant"],s4obj:["oObj:Hash+"]};
var jindoKey="_jindo";
function toCamelCase(name){return name.replace(/\-(.)/g,function(_,a){return a.toUpperCase()
})
}function toDash(name){return name.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()
})
}if(document.body.dataset){jindo.$Element.prototype.data=function(sKey,vValue){var sToStr,oArgs=g_checkVarType(arguments,oType,"$Element#data");
var isNull=jindo.$Jindo.isNull;
switch(oArgs+""){case"g":sKey=toCamelCase(sKey);
var isMakeFromJindo=this._element.dataset[sKey+jindoKey];
var sDateSet=this._element.dataset[sKey];
if(sDateSet){if(isMakeFromJindo){return window.JSON.parse(sDateSet)
}return sDateSet
}return null;
case"s4var":var oData;
if(isNull(vValue)){sKey=toCamelCase(sKey);
delete this._element.dataset[sKey];
delete this._element.dataset[sKey+jindoKey];
return this
}else{oData={};
oData[sKey]=vValue;
sKey=oData
}case"s4obj":var sChange;
for(var i in sKey){sChange=toCamelCase(i);
if(isNull(sKey[i])){delete this._element.dataset[sChange];
delete this._element.dataset[sChange+jindoKey]
}else{sToStr=jindo.$Json._oldToString(sKey[i]);
if(sToStr!=null){this._element.dataset[sChange]=sToStr;
this._element.dataset[sChange+jindoKey]="jindo"
}}}return this
}}
}else{jindo.$Element.prototype.data=function(sKey,vValue){var sToStr,oArgs=g_checkVarType(arguments,oType,"$Element#data");
var isNull=jindo.$Jindo.isNull;
switch(oArgs+""){case"g":sKey=toDash(sKey);
var isMakeFromJindo=this._element.getAttribute("data-"+sKey+jindoKey);
var sVal=this._element.getAttribute("data-"+sKey);
if(isMakeFromJindo){return(sVal!=null)?eval("("+sVal+")"):null
}else{return sVal
}case"s4var":var oData;
if(isNull(vValue)){sKey=toDash(sKey);
this._element.removeAttribute("data-"+sKey);
this._element.removeAttribute("data-"+sKey+jindoKey);
return this
}else{oData={};
oData[sKey]=vValue;
sKey=oData
}case"s4obj":var sChange;
for(var i in sKey){sChange=toDash(i);
if(isNull(sKey[i])){this._element.removeAttribute("data-"+sChange);
this._element.removeAttribute("data-"+sChange+jindoKey)
}else{sToStr=jindo.$Json._oldToString(sKey[i]);
if(sToStr!=null){this._element.setAttribute("data-"+sChange,sToStr);
this._element.setAttribute("data-"+sChange+jindoKey,"jindo")
}}}return this
}}
}return this.data.apply(this,jindo._p_._toArray(arguments))
};
jindo.$Fn=function(func,thisObject){var cl=arguments.callee;
if(func instanceof cl){return func
}if(!(this instanceof cl)){try{jindo.$Jindo._maxWarn(arguments.length,2,"$Fn");
return new cl(func,thisObject)
}catch(e){if(e instanceof TypeError){return null
}throw e
}}var oArgs=g_checkVarType(arguments,{"4fun":["func:Function+"],"4fun2":["func:Function+","thisObject:Variant"],"4str":["func:String+","thisObject:String+"]},"$Fn");
this._tmpElm=null;
this._key=null;
switch(oArgs+""){case"4str":this._func=eval("false||function("+func+"){"+thisObject+"}");
break;
case"4fun":case"4fun2":this._func=func;
this._this=thisObject
}};
jindo.$Fn._commonPram=function(b,a){return g_checkVarType(b,{"4ele":["eElement:Element+","sEvent:String+"],"4ele2":["eElement:Element+","sEvent:String+","bUseCapture:Boolean"],"4str":["eElement:String+","sEvent:String+"],"4str2":["eElement:String+","sEvent:String+","bUseCapture:Boolean"],"4arr":["aElement:Array+","sEvent:String+"],"4arr2":["aElement:Array+","sEvent:String+","bUseCapture:Boolean"],"4doc":["eElement:Document+","sEvent:String+"],"4win":["eElement:Window+","sEvent:String+"],"4doc2":["eElement:Document+","sEvent:String+","bUseCapture:Boolean"],"4win2":["eElement:Window+","sEvent:String+","bUseCapture:Boolean"]},a)
};
jindo.$Fn.prototype.$value=function(){return this._func
};
jindo.$Fn.prototype.bind=function(){var d=jindo._p_._toArray(arguments);
var h=this._func;
var g=this._this||this;
var c;
if(h.bind){d.unshift(g);
c=Function.prototype.bind.apply(h,d)
}else{c=function(){var a=jindo._p_._toArray(arguments);
if(d.length){a=d.concat(a)
}return h.apply(g,a)
}}return c
};
jindo.$Fn.prototype.attach=function(d,b,h){var g=jindo.$Fn._commonPram(arguments,"$Fn#attach");
var m=null,f,k=b,c=d,a=jindo._p_._j_ag;
if(h!==true){h=false
}this._bUseCapture=h;
switch(g+""){case"4arr":case"4arr2":var c=g.aElement;
var k=g.sEvent;
for(var j=0,f=c.length;
j<f;
j++){this.attach(c[j],k,!!h)
}return this
}m=this._bind=this._bind?this._bind:this.bind();
jindo.$Element(c).attach(k,m);
return this
};
jindo.$Fn.prototype.detach=function(d,b,h){var g=jindo.$Fn._commonPram(arguments,"$Fn#detach");
var m=null,f,c=d,k=b,a=jindo._p_._j_ag;
switch(g+""){case"4arr":case"4arr2":var c=g.aElement;
var k=g.sEvent;
for(var j=0,f=c.length;
j<f;
j++){this.detach(c[j],k,!!h)
}return this
}m=this._bind=this._bind?this._bind:this.bind();
jindo.$Element(g.eElement).detach(g.sEvent,m);
return this
};
jindo.$Fn.prototype.delay=function(a,b){var c=g_checkVarType(arguments,{"4num":["nSec:Numeric"],"4arr":["nSec:Numeric","args:Array+"]},"$Fn#delay");
switch(c+""){case"4num":b=b||[];
break;
case"4arr":b=c.args
}this._delayKey=setTimeout(this.bind.apply(this,b),a*1000);
return this
};
jindo.$Fn.prototype.setInterval=function(a,b){var c=g_checkVarType(arguments,{"4num":["nSec:Numeric"],"4arr":["nSec:Numeric","args:Array+"]},"$Fn#setInterval");
switch(c+""){case"4num":b=b||[];
break;
case"4arr":b=c.args
}this._repeatKey=setInterval(this.bind.apply(this,b),a*1000);
return this
};
jindo.$Fn.prototype.repeat=jindo.$Fn.prototype.setInterval;
jindo.$Fn.prototype.stopDelay=function(){if(this._delayKey!==undefined){window.clearTimeout(this._delayKey);
delete this._delayKey
}return this
};
jindo.$Fn.prototype.stopRepeat=function(){if(this._repeatKey!==undefined){window.clearInterval(this._repeatKey);
delete this._repeatKey
}return this
};
jindo.$ElementList=function(d){var b=arguments.callee;
if(d instanceof b){return d
}if(!(this instanceof b)){try{return new b(d)
}catch(g){if(g instanceof TypeError){return null
}throw g
}}var f=g_checkVarType(arguments,{"4arr":["aEle:Array+"],"4str":["sCssQuery:String+"],"4nul":["oEle:Null"],"4und":["oEle:Undefined"]},"$ElementList");
switch(f+""){case"4arr":d=f.aEle;
break;
case"4str":d=jindo.cssquery(f.sCssQuery);
break;
case"4nul":case"4und":d=[]
}this._elements=[];
for(var c=0,a=d.length;
c<a;
c++){this._elements.push(jindo.$Element(d[c]))
}};
(function(g){var f=["show","hide","toggle","addClass","removeClass","toggleClass","fireEvent","leave","empty","className","width","height","text","html","css","attr"];
for(var d=0,a=f.length;
d<a;
d++){var c=f[d];
if(jindo.$Element.prototype[c]){g[f[d]]=(function(h){return function(){try{var r=[];
for(var q=0,o=arguments.length;
q<o;
q++){r.push(arguments[q])
}for(var p=0,t=this._elements.length;
p<t;
p++){this._elements[p][h].apply(this._elements[p],r)
}return this
}catch(s){throw TypeError(s.message.replace(/\$Element/g,"$Elementlist#"+h).replace(/Element\.html/g,"Elementlist.html#"+h))
}}
})(f[d])
}}var b=["appear","disappear"];
for(var d=0,a=b.length;
d<a;
d++){if(jindo.$Element.prototype[c]){g[b[d]]=(function(h){return function(q,r){try{var n=this;
for(var o=0,k=this._elements.length;
o<k;
o++){if(o==k-1){this._elements[o][h](q,function(){r&&r(n)
})
}else{this._elements[o][h](q)
}}return this
}catch(p){throw TypeError(p.message.replace(/\$Element/g,"$Elementlist#"+h).replace(/Element\.html/g,"Elementlist.html#"+h))
}}
})(b[d])
}}})(jindo.$ElementList.prototype);
jindo.$ElementList.prototype.get=function(a){var b=g_checkVarType(arguments,{"4num":["nIdx:Numeric"]},"$ElementList#get");
return this._elements[a]
};
jindo.$ElementList.prototype.getFirst=function(){return this._elements[0]
};
jindo.$ElementList.prototype.getLast=function(){return this._elements[Math.max(this._elements.length-1,0)]
};
jindo.$ElementList.prototype.length=function(c,a){var b=g_checkVarType(arguments,{"4voi":[],"4num":[jindo.$Jindo._F("nLen:Numeric")],"4var":["nLen:Numeric","oValue:Variant"]},"$ElementList#length");
var f=jindo.$A(this._elements);
try{return f.length.apply(f,jindo._p_._toArray(arguments))
}catch(d){throw TypeError(d.message.replace(/\$A/g,"$Elementlist#length").replace(/A\.html/g,"Elementlist.html#length"))
}};
jindo.$ElementList.prototype.$value=function(){return this._elements
};
jindo.$S=function(d){var a=arguments.callee;
if(d instanceof a){return d
}if(!(this instanceof a)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$Json");
return new a(d||"")
}catch(c){if(c instanceof TypeError){return null
}throw c
}}var b=g_checkVarType(arguments,{nul:["nul:Null"],unde:["unde:Undefined"],"4var":["str:Variant"]},"$S");
switch(b+""){case"nul":case"unde":this._str="";
break;
case"4var":this._str=(b.str).toString();
break
}};
jindo.$S.prototype.$value=function(){return this._str
};
jindo.$S.prototype.toString=jindo.$S.prototype.$value;
jindo.$S.prototype.trim=function(){if("".trim){jindo.$S.prototype.trim=function(){return jindo.$S(this._str.trim())
}}else{jindo.$S.prototype.trim=function(){return jindo._p_.trim(this._str)
}}return jindo.$S(this.trim())
};
jindo.$S.prototype.escapeHTML=function(){var b={'"':"quot","&":"amp","<":"lt",">":"gt","'":"#39"};
var a=this._str.replace(/[<>&"']/g,function(c){return b[c]?"&"+b[c]+";":c
});
return jindo.$S(a)
};
jindo.$S.prototype.stripTags=function(){return jindo.$S(this._str.replace(/<\/?(?:h[1-5]|[a-z]+(?:\:[a-z]+)?)[^>]*>/ig,""))
};
jindo.$S.prototype.times=function(b){var a=g_checkVarType(arguments,{"4str":["nTimes:Numeric"]},"$S#times");
if(!a){return this
}return jindo.$S(Array(a.nTimes+1).join(this._str))
};
jindo.$S.prototype.unescapeHTML=function(){var b={quot:'"',amp:"&",lt:"<",gt:">","#39":"'"};
var a=this._str.replace(/&([a-z]+|#[0-9]+);/g,function(d,c){return b[c]?b[c]:d
});
return jindo.$S(a)
};
jindo.$S.prototype.escape=function(){var a=this._str.replace(/([\u0080-\uFFFF]+)|[\n\r\t"'\\]/g,function(d,c,b){if(c){return escape(c).replace(/%/g,"\\")
}return(b={"\n":"\\n","\r":"\\r","\t":"\\t"})[d]?b[d]:"\\"+d
});
return jindo.$S(a)
};
jindo.$S.prototype.bytes=function(c){var d=g_checkVarType(arguments,{"4voi":[],"4num":["nConfig:Numeric"],"4obj":["nConfig:Hash+"]},"$S#bytes");
var a=0,k=0,f=0,h=this._str.length;
var b=((document.charset||document.characterSet||document.defaultCharset)+"");
var j,g;
switch(d+""){case"4voi":j=false;
break;
case"4num":j=true;
g=c;
break;
case"4obj":b=c.charset||b;
g=c.size||false;
j=!!g;
break
}if(b.toLowerCase()=="utf-8"){for(f=0;
f<h;
f++){a=this._str.charCodeAt(f);
if(a<128){k+=1
}else{if(a<2048){k+=2
}else{if(a<65536){k+=3
}else{k+=4
}}}if(j&&k>g){this._str=this._str.substr(0,f);
break
}}}else{for(f=0;
f<h;
f++){k+=(this._str.charCodeAt(f)>128)?2:1;
if(j&&k>g){this._str=this._str.substr(0,f);
break
}}}return j?this:k
};
jindo.$S.prototype.parseString=function(){if(this._str==""){return{}
}var h=this._str.split(/&/g),j,c,g,a={},d=false;
for(var b=0;
b<h.length;
b++){c=h[b].substring(0,j=h[b].indexOf("=")),d=false;
try{g=decodeURIComponent(h[b].substring(j+1))
}catch(f){d=true;
g=decodeURIComponent(unescape(h[b].substring(j+1)))
}if(c.substr(c.length-2,2)=="[]"){c=c.substring(0,c.length-2);
if(jindo.$Jindo.isUndefined(a[c])){a[c]=[]
}a[c][a[c].length]=d?escape(g):g
}else{a[c]=d?escape(g):g
}}return a
};
jindo.$S.prototype.escapeRegex=function(){var a=this._str;
var b=/([\?\.\*\+\-\/\(\)\{\}\[\]\:\!\^\$\\\|])/g;
return jindo.$S(a.replace(b,"\\$1"))
};
jindo.$S.prototype.format=function(){var b=arguments;
var a=0;
var c=this._str.replace(/%([ 0])?(-)?([1-9][0-9]*)?([bcdsoxX])/g,function(m,k,h,g,d){var f=b[a++];
var j="",n="";
g=g?+g:0;
if(d=="s"){j=f+""
}else{if(" bcdoxX".indexOf(d)>0){if(!jindo.$Jindo.isNumeric(f)){return""
}j=(d=="c")?String.fromCharCode(f):f.toString(({b:2,d:10,o:8,x:16,X:16})[d]);
if(" X".indexOf(d)>0){j=j.toUpperCase()
}}}if(j.length<g){n=jindo.$S(k||" ").times(g-j.length)._str
}(h=="-")?(j+=n):(j=n+j);
return j
});
return jindo.$S(c)
};
jindo.$Document=function(b){var a=arguments.callee;
if(b instanceof a){return b
}if(!(this instanceof a)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$Document");
return new a(b||document)
}catch(d){if(d instanceof TypeError){return null
}throw d
}}var c=g_checkVarType(arguments,{"4doc":["oDocument:Document+"]},"$Document");
if(c==null){this._doc=document
}else{this._doc=b
}this._docKey="documentElement"
};
(function(){var c=jindo.cssquery;
var b={query:c.getSingle,queryAll:c,xpathAll:c.xpath};
for(var a in b){jindo.$Document.prototype[a]=(function(f,d){return function(h){var g=g_checkVarType(arguments,{"4str":["sQuery:String+"]},"$Document#"+f);
return d(h,this._doc)
}})(a,b[a])
}})();
jindo.$Document.prototype.$value=function(){return this._doc
};
jindo.$Document.prototype.scrollSize=function(){var a=this._doc[jindo._p_._JINDO_IS_WK?"body":this._docKey];
return{width:Math.max(a.scrollWidth,a.clientWidth),height:Math.max(a.scrollHeight,a.clientHeight)}
};
jindo.$Document.prototype.scrollPosition=function(){var a=this._doc[jindo._p_._JINDO_IS_WK?"body":this._docKey];
return{left:a.scrollLeft||window.pageXOffset||window.scrollX||0,top:a.scrollTop||window.pageYOffset||window.scrollY||0}
};
jindo.$Document.prototype.clientSize=function(){var a=this._doc[this._docKey];
var b=jindo._p_._JINDO_IS_SP&&!jindo._p_._JINDO_IS_CH;
return(b)?{width:window.innerWidth,height:window.innerHeight}:{width:a.clientWidth,height:a.clientHeight}
};
jindo.$Form=function(b){var a=arguments.callee;
if(b instanceof a){return b
}if(!(this instanceof a)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$Form");
return new a(b)
}catch(d){if(d instanceof TypeError){return null
}throw d
}}var c=g_checkVarType(arguments,{"4str":["oForm:String+"],"4ele":["oForm:Element+"]},"$Form+");
switch(c+""){case"4str":b=jindo.$(b);
break
}if(!(b.tagName&&b.tagName.toUpperCase()=="FORM")){throw TypeError("only form")
}this._form=b
};
jindo.$Form.prototype.$value=function(){return this._form
};
jindo.$Form.prototype.serialize=function(){var b=this;
var f={};
var d=arguments.length;
var h=function(m,k){if(!m.disabled){var j=b.value(k);
if(j!==undefined){f[k]=j
}}};
if(d==0){var a=this._form.elements.length;
for(var c=0;
c<a;
c++){var g=this._form.elements[c];
if(g.name){h(g,g.name)
}}}else{for(var c=0;
c<d;
c++){h(this.element(arguments[c]),arguments[c])
}}return jindo.$H(f).toQueryString()
};
jindo.$Form.prototype.element=function(b){var a=g_checkVarType(arguments,{"4voi":[],"4str":[jindo.$Jindo._F("sKey:String+")]},"$Form#element");
switch(a+""){case"4voi":return jindo._p_._toArray(this._form.elements);
case"4str":return this._form.elements[b+""]
}};
jindo.$Form.prototype.enable=function(j){var g=g_checkVarType(arguments,{s4bln:["sName:String+","bEnable:Boolean"],s4obj:["oObj:Hash+"],g:[jindo.$Jindo._F("sName:String+")]},"$Form#enable");
switch(g+""){case"s4bln":var f=this._form[j];
if(!f){return this
}f=f.nodeType==1?[f]:f;
var d=g.bEnable;
for(var c=0;
c<f.length;
c++){f[c].disabled=!d
}return this;
case"s4obj":j=g.oObj;
var b=this;
for(var a in j){if(j.hasOwnProperty(a)){b.enable(a,j[a])
}}return this;
case"g":var f=this._form[j];
if(!f){return this
}f=f.nodeType==1?[f]:f;
var h=true;
for(var c=0;
c<f.length;
c++){if(f[c].disabled){h=false;
break
}}return h
}};
jindo.$Form.prototype.value=function(p){var g=g_checkVarType(arguments,{s4str:["sKey:String+","vValue:Variant"],s4obj:[jindo.$Jindo._F("oObj:Hash+")],g:["sKey:String+"]},"$Form#value");
if(g+""=="s4obj"){var r=this;
p=g.oObj;
for(var h in p){if(p.hasOwnProperty(h)){r.value(h,p[h])
}}return this
}var b=this._form[p];
if(!b){throw new jindo.$Error(p+jindo.$Except.NONE_ELEMENT,"$Form#value")
}b=b.nodeType==1?[b]:b;
switch(g+""){case"s4str":var d=g.vValue;
var q=b.length;
for(var j=0;
j<q;
j++){var c=b[j];
switch(c.type){case"radio":c.checked=(c.value==d);
break;
case"checkbox":if(d.constructor==Array){c.checked=jindo.$A(d).has(c.value)
}else{c.checked=(c.value==d)
}break;
case"select-one":var a=-1;
for(var j=0,m=c.options.length;
j<m;
j++){if(c.options[j].value==d){a=j
}}c.selectedIndex=a;
break;
case"select-multiple":var a=-1;
if(d.constructor==Array){var n=jindo.$A(d);
for(var j=0,m=c.options.length;
j<m;
j++){c.options[j].selected=n.has(c.options[j].value)
}}else{for(var j=0,m=c.options.length;
j<m;
j++){if(c.options[j].value==d){a=j
}}c.selectedIndex=a
}break;
default:c.value=d
}}return this;
case"g":var f=[];
var q=b.length;
for(var j=0;
j<q;
j++){var c=b[j];
switch(c.type){case"radio":case"checkbox":if(c.checked){f.push(c.value)
}break;
case"select-one":if(c.selectedIndex!=-1){f.push(c.options[c.selectedIndex].value)
}break;
case"select-multiple":if(c.selectedIndex!=-1){for(var j=0,m=c.options.length;
j<m;
j++){if(c.options[j].selected){f.push(c.options[j].value)
}}}break;
default:f.push(c.value)
}}return f.length>1?f:f[0]
}};
jindo.$Form.prototype.submit=function(c,b){var a=g_checkVarType(arguments,{voi:[],"4str":["sTargetName:String+"],"4fun":["fValidation:Function+"],"4fun2":["sTargetName:String+","fValidation:Function+"]},"$Form#submit");
var d=null;
switch(a+""){case"4str":d=this._form.target;
this._form.target=a.sTargetName;
break;
case"4fun":case"4fun2":if(!a.fValidation.call(this,this._form)){return this
}if(a+""=="4fun2"){d=this._form.target;
this._form.target=a.sTargetName
}}this._form.submit();
if(!jindo.$Jindo.isNull(d)){this._form.target=d
}return this
};
jindo.$Form.prototype.reset=function(b){var a=g_checkVarType(arguments,{"4voi":[],"4fun":["fValidation:Function+"]},"$Form#reset");
if(a+""=="4fun"){if(!b.call(this,this._form)){return this
}}this._form.reset();
return this
};
jindo.$Template=function(j,h){var g=null,a="",b=arguments.callee,c;
if(j instanceof b){return j
}if(!(this instanceof b)){try{jindo.$Jindo._maxWarn(arguments.length,2,"$Template");
return new b(j||"",h||"default")
}catch(f){if(f instanceof TypeError){return null
}throw f
}}var d=g_checkVarType(arguments,{"4str":["str:String+"],"4ele":["ele:Element+"],"4str3":["str:String+","sEngineName:String+"],"4ele3":["ele:Element+","sEngineName:String+"]},"$Template");
if((g=document.getElementById(j)||j)&&g.tagName&&(a=g.tagName.toUpperCase())&&(a=="TEXTAREA"||(a=="SCRIPT"&&g.getAttribute("type")=="text/template"))){j=(g.value||g.innerHTML).replace(/^\s+|\s+$/g,"")
}this._str=j+"";
c="default";
switch(d+""){case"4str3":case"4ele3":c=d.sEngineName;
break
}this._compiler=jindo.$Template.getEngine(c)
};
jindo.$Template._aEngines={};
jindo.$Template._cache={};
jindo.$Template.splitter=/(?!\\)[\{\}]/g;
jindo.$Template.pattern=/^(?:if (.+)|elseif (.+)|for (?:(.+)\:)?(.+) in (.+)|(else)|\/(if|for)|=(.+)|js (.+)|set (.+)|gset (.+))$/;
jindo.$Template.addEngine=function(c,b){var a=g_checkVarType(arguments,{"4fun":["sEngineName:String+","fEngine:Function+"]},"$Template#addEngine");
jindo.$Template._aEngines[a.sEngineName]=a.fEngine
};
jindo.$Template.getEngine=function(b){var a=g_checkVarType(arguments,{"4str":["sEngineName:String+"]},"$Template#getEngine");
return jindo.$Template._aEngines[a.sEngineName]
};
jindo.$Template.prototype.process=function(c){var b=g_checkVarType(arguments,{"4obj":["data:Hash+"],"4voi":[]},"$Template#process"),a;
if(jindo.$Template._cache&&jindo.$Template._cache[this._str]){a=jindo.$Template._cache[this._str];
return a(b+""=="for_void"?"":b.data)
}jindo.$Template._cache[this._str]=a=this._compiler(this._str);
return a(b+""=="for_void"?"":b.data)
};
jindo.$Template.addEngine("default",function(g){var d=[];
var a=false;
function c(h){return h.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n")
}d.push("var $RET$ = [];");
d.push('var $SCOPE$ = $ARG$ && typeof $ARG$ === "object" ? $ARG$ : {};');
d.push("with ($SCOPE$) {");
var f=0;
do{a=false;
g=g.replace(/^[^{]+/,function(h){a=d.push('$RET$.push("'+c(h)+'");');
return""
});
g=g.replace(/^{=([^}]+)}/,function(j,h){a=d.push("$RET$.push("+h+");");
return""
});
g=g.replace(/^{js\s+([^}]+)}/,function(j,h){h=h.replace(/(=(?:[a-zA-Z_][\w\.]*)+)/g,function(k){return k.replace("=","")
});
a=d.push("$RET$.push("+h+");");
return""
});
g=g.replace(/^{(g)?set\s+([^=]+)=([^}]+)}/,function(j,h,k,m){a=d.push((h?"var ":"$SCOPE$.")+k+"="+m.replace(/\(=/g,"(")+";");
return""
});
g=g.replace(/^{for\s+([^:}]+)(:([^\s]+))?\s+in\s+([^}]+)}/,function(h,k,h,n,m){if(!n){n=k;
k="$NULL$"+f
}var j="$I$"+f;
var o="$CB$"+f;
f++;
d.push("(function("+o+") {");
d.push("if (jindo.$Jindo.isArray("+m+")) {");
d.push("for (var "+j+" = 0; "+j+" < "+m+".length; "+j+"++) {");
d.push(o+"("+j+", "+m+"["+j+"]);");
d.push("}");
d.push("} else {");
d.push("for (var "+j+" in "+m+") if ("+m+".hasOwnProperty("+j+")) { ");
d.push(o+"("+j+", "+m+"["+j+"]);");
d.push("}");
d.push("}");
d.push("})(function("+k+", "+n+") {");
a=true;
return""
});
g=g.replace(/^{\/for}/,function(h){a=d.push("});");
return""
});
g=g.replace(/^{(else)?if\s+([^}]+)}/,function(j,h,k){a=d.push((h?"} else ":"")+"if ("+k+") {");
return""
});
g=g.replace(/^{else}/,function(h){a=d.push("} else {");
return""
});
g=g.replace(/^{\/if}/,function(h){a=d.push("}");
return""
})
}while(a);
d.push("}");
d.push('return $RET$.join("");');
var b=new Function("$ARG$",d.join("\n").replace(/\r/g,""));
return b
});
jindo.$Template.addEngine("micro",function(a){return new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+a.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');")
});
jindo.$Template.addEngine("handlebars",function(a){if(typeof Handlebars=="undefined"){throw new jindo.$Error(jindo.$Except.NOT_FOUND_HANDLEBARS,"$Template#process")
}return Handlebars.compile(a)
});
jindo.$Template.addEngine("simple",function(a){return function(b){return a.replace(/\{\{([^{}]*)\}\}/g,function(d,c){return(typeof b[c]=="undefined")?"":b[c]
})
}});
jindo.$Date=function(b){var j=arguments,n="";
var k=arguments.callee;
if(b&&b instanceof k){return b
}if(!(this instanceof k)){var h="";
for(var f=0,c=j.length;
f<c;
f++){h+="a["+f+"],"
}var m=new Function("cl","a","return new cl("+h.replace(/,$/,"")+");");
try{jindo.$Jindo._maxWarn(arguments.length,7,"$Date");
return m(k,j)
}catch(g){if(g instanceof TypeError){return null
}throw g
}}var d=g_checkVarType(arguments,{"4voi":[],"4str":["src:String+"],"4num":["src:Numeric"],"4dat":["src:Date+"],"4num2":["src:Numeric","src:Numeric"],"4num3":["src:Numeric","src:Numeric","src:Numeric"],"4num4":["src:Numeric","src:Numeric","src:Numeric","src:Numeric"],"4num5":["src:Numeric","src:Numeric","src:Numeric","src:Numeric","src:Numeric"],"4num6":["src:Numeric","src:Numeric","src:Numeric","src:Numeric","src:Numeric","src:Numeric"],"4num7":["src:Numeric","src:Numeric","src:Numeric","src:Numeric","src:Numeric","src:Numeric","src:Numeric"]},"$Date");
switch(d+""){case"4voi":this._date=new Date;
break;
case"4num":this._date=new Date(b*1);
break;
case"4str":if(/(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d)))/.test(b)){this._date=jindo.$Date._makeISO(b)
}else{this._date=k.parse(b)
}break;
case"4dat":(this._date=new Date).setTime(b.getTime());
this._date.setMilliseconds(b.getMilliseconds());
break;
case"4num2":case"4num3":case"4num4":case"4num5":case"4num6":case"4num7":for(var f=0;
f<7;
f++){if(!jindo.$Jindo.isNumeric(j[f])){j[f]=1
}}this._date=new Date(j[0],j[1],j[2],j[3],j[4],j[5],j[6])
}this._names={};
for(var f in jindo.$Date.names){if(jindo.$Date.names.hasOwnProperty(f)){this._names[f]=jindo.$Date.names[f]
}}};
jindo.$Date._makeISO=function(d){var b=d.match(/(\d{4})(?:-?(\d\d)(?:-?(\d\d)(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|(?:([-+])(\d\d)(?::?(\d\d))?)?)?)?)?)?/);
var a=parseInt(b[4]||0,10);
var c=parseInt(b[5]||0,10);
if(b[8]=="Z"){a+=jindo.$Date.utc
}else{if(b[9]=="+"||b[9]=="-"){a+=(jindo.$Date.utc-parseInt(b[9]+b[10],10));
c+=parseInt(b[9]+b[11],10)
}}return new Date(b[1]||0,parseInt(b[2]||0,10)-1,b[3]||0,a,c,b[6]||0,b[7]||0)
};
jindo.$Date._paramCheck=function(a,b){return g_checkVarType(a,{s:["nParm:Numeric"],g:[]},"$Date#"+b)
};
jindo.$Date.names={month:["January","Febrary","March","April","May","June","July","August","September","October","Novermber","December"],s_month:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],day:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],s_day:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ampm:["AM","PM"]};
jindo.$Date.utc=9;
jindo.$Date.now=function(){if(Date.now){this.now=function(){return Date.now()
}}else{this.now=function(){return +new Date()
}}return this.now()
};
jindo.$Date.prototype.name=function(b,d){var c=g_checkVarType(arguments,{s4str:["sKey:String+","aValue:Array+"],s4obj:["oObject:Hash+"],g:["sKey:String+"]},"$Date#name");
switch(c+""){case"s4str":this._names[b]=d;
break;
case"s4obj":b=c.oObject;
for(var a in b){if(b.hasOwnProperty(a)){this._names[a]=b[a]
}}break;
case"g":return this._names[b]
}return this
};
jindo.$Date.parse=function(b){var c=g_checkVarType(arguments,{"4str":["sKey:String+"]},"$Date#parse");
var a=new Date(Date.parse(b));
if(isNaN(a)||a=="Invalid Date"){throw new jindo.$Error(jindo.$Except.INVALID_DATE,"$Date#parse")
}return a
};
jindo.$Date.prototype.$value=function(){return this._date
};
jindo.$Date.prototype.format=function(f){var c=g_checkVarType(arguments,{"4str":["sFormat:String+"]},"$Date#format");
f=c.sFormat;
var h={};
var g=this._date;
var b=this._names;
var a=this;
return(f||"").replace(/[a-z]/ig,function j(d){if(h[d]!==undefined){return h[d]
}switch(d){case"d":case"j":h.j=g.getDate();
h.d=(h.j>9?"":"0")+h.j;
return h[d];
case"l":case"D":case"w":case"N":h.w=g.getDay();
h.N=h.w?h.w:7;
h.D=b.s_day[h.w];
h.l=b.day[h.w];
return h[d];
case"S":return(!!(h.S=["st","nd","rd"][g.getDate()]))?h.S:(h.S="th");
case"z":h.z=Math.floor((g.getTime()-(new Date(g.getFullYear(),0,1)).getTime())/(3600*24*1000));
return h.z;
case"m":case"n":h.n=g.getMonth()+1;
h.m=(h.n>9?"":"0")+h.n;
return h[d];
case"L":h.L=a.isLeapYear();
return h.L;
case"o":case"Y":case"y":h.o=h.Y=g.getFullYear();
h.y=(h.o+"").substr(2);
return h[d];
case"a":case"A":case"g":case"G":case"h":case"H":h.G=g.getHours();
h.g=(h.g=h.G%12)?h.g:12;
h.A=h.G<12?b.ampm[0]:b.ampm[1];
h.a=h.A.toLowerCase();
h.H=(h.G>9?"":"0")+h.G;
h.h=(h.g>9?"":"0")+h.g;
return h[d];
case"i":h.i=(((h.i=g.getMinutes())>9)?"":"0")+h.i;
return h.i;
case"s":h.s=(((h.s=g.getSeconds())>9)?"":"0")+h.s;
return h.s;
case"u":h.u=g.getMilliseconds();
return h.u;
case"U":h.U=a.time();
return h.U;
default:return d
}})
};
jindo.$Date.prototype.time=function(a){var b=jindo.$Date._paramCheck(arguments,"time");
a=b.nParm;
switch(b+""){case"s":this._date.setTime(a);
return this;
case"g":return this._date.getTime()
}};
jindo.$Date.prototype.year=function(a){var b=jindo.$Date._paramCheck(arguments,"year");
a=b.nParm;
switch(b+""){case"s":this._date.setFullYear(a);
return this;
case"g":return this._date.getFullYear()
}};
jindo.$Date.prototype.month=function(a){var b=jindo.$Date._paramCheck(arguments,"month");
a=b.nParm;
switch(b+""){case"s":this._date.setMonth(a);
return this;
case"g":return this._date.getMonth()
}};
jindo.$Date.prototype.date=function(a){var b=jindo.$Date._paramCheck(arguments,"date");
a=b.nParm;
switch(b+""){case"s":this._date.setDate(a);
return this;
case"g":return this._date.getDate()
}};
jindo.$Date.prototype.day=function(){return this._date.getDay()
};
jindo.$Date.prototype.hours=function(b){var a=jindo.$Date._paramCheck(arguments,"hours");
b=a.nParm;
switch(a+""){case"s":this._date.setHours(b);
return this;
case"g":return this._date.getHours()
}};
jindo.$Date.prototype.minutes=function(a){var b=jindo.$Date._paramCheck(arguments,"minutes");
a=b.nParm;
switch(b+""){case"s":this._date.setMinutes(a);
return this;
case"g":return this._date.getMinutes()
}};
jindo.$Date.prototype.seconds=function(a){var b=jindo.$Date._paramCheck(arguments,"seconds");
a=b.nParm;
switch(b+""){case"s":this._date.setSeconds(a);
return this;
case"g":return this._date.getSeconds()
}};
jindo.$Date.prototype.isLeapYear=function(){var a=this._date.getFullYear();
return !(a%4)&&!!(a%100)||!(a%400)
};
jindo.$Date.prototype.compare=function(b,c){var a=g_checkVarType(arguments,{"4dat":["oDate:Date+"],"4str":["oDate:Date+","sType:String+"]},"$Date#compare");
b=a.oDate;
c=a.sType;
if(!c){return b-this._date
}else{if(c==="s"){return Math.floor(b/1000)-Math.floor(this._date/1000)
}else{if(c==="i"){return Math.floor(Math.floor(b/1000)/60)-Math.floor(Math.floor(this._date/1000)/60)
}else{if(c==="h"){return Math.floor(Math.floor(Math.floor(b/1000)/60)/60)-Math.floor(Math.floor(Math.floor(this._date/1000)/60)/60)
}else{if(c==="d"){return Math.floor(Math.floor(Math.floor(Math.floor(b/1000)/60)/60)/24)-Math.floor(Math.floor(Math.floor(Math.floor(this._date/1000)/60)/60)/24)
}else{if(c==="m"){return b.getMonth()-this._date.getMonth()
}else{if(c==="y"){return b.getFullYear()-this._date.getFullYear()
}}}}}}}};
var aClass=["$Agent","$Ajax","$A","$Cookie","$Date","$Document","$Element","$ElementList","$Event","$Form","$Fn","$H","$Json","$S","$Template"];
var sClass,oClass;
for(var i=0,l=aClass.length;
i<l;
i++){sClass=aClass[i];
oClass=jindo[sClass];
if(oClass){oClass.addExtension=(function(a){return function(c,b){jindo._p_.addExtension(a,c,b);
return this
}})(sClass)
}}var hooks=["$Element","$Event"];
for(var i=0,l=hooks.length;
i<l;
i++){var _className=hooks[i];
if(jindo[_className]){jindo[_className].hook=(function(b){var a={};
return function(h,f){var g=jindo.$Jindo.checkVarType(arguments,{g:["sName:String+"],s4var:["sName:String+","vRevisionKey:Variant"],s4obj:["oObj:Hash+"]},"jindo."+b+".hook");
switch(g+""){case"g":return a[g.sName.toLowerCase()];
case"s4var":if(f==null){delete a[g.sName.toLowerCase()]
}else{a[g.sName.toLowerCase()]=f
}return this;
case"s4obj":var c=g.oObj;
for(var d in c){a[d.toLowerCase()]=c[d]
}return this
}}
})(_className)
}}if(!jindo.$Jindo.isUndefined(window)&&!(jindo._p_._j_ag.indexOf("IEMobile")==-1&&jindo._p_._j_ag.indexOf("Mobile")>-1&&jindo._p_._JINDO_IS_SP)){(new jindo.$Element(window)).attach("unload",function(a){jindo.$Element.eventManager.cleanUpAll()
})
}if(typeof define==="function"&&define.amd&&define.amd.jindo){define("jindo",[],function(){return jindo
})
}if(typeof window!="undefined"){for(prop in jindo){if(jindo.hasOwnProperty(prop)){window[prop]=jindo[prop]
}}}var raf=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame,caf=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.msCancelAnimationFrame;
if(raf&&!caf){var keyInfo={},oldraf=raf;
raf=function(a){function b(){keyInfo[c]&&a()
}var c=oldraf(b);
return keyInfo[c]=!0,c
},caf=function(a){delete keyInfo[a]
}}else{raf&&caf||(raf=function(a){return window.setTimeout(a,16)
},caf=window.clearTimeout)
}window.requestAnimationFrame=raf,window.cancelAnimationFrame=caf,jindo.m=function(){function _initTouchEventName(){"ontouchstart" in window?(_htTouchEventName.start="touchstart",_htTouchEventName.move="touchmove",_htTouchEventName.end="touchend",_htTouchEventName.cancel="touchcancel"):window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0&&(_htTouchEventName.start="MSPointerDown",_htTouchEventName.move="MSPointerMove",_htTouchEventName.end="MSPointerUp",_htTouchEventName.cancel="MSPointerCancel")
}function _getOrientationChangeEvt(){var t="onorientationchange" in window?"orientationchange":"resize";
return _htOsInfo.android&&"2.1"===_htOsInfo.version&&(t="resize"),t
}function _getVertical(){var t=null,e=_getOrientationChangeEvt();
if("resize"===e){var n=document.documentElement.clientWidth;
t=-1==_nPreWidth?n<document.documentElement.clientHeight:_nPreWidth>n?!0:n==_nPreWidth?_isVertical:!1,_nPreWidth=n
}else{var i=window.orientation;
0===i||180==i?t=!0:(90==i||-90==i)&&(t=!1)
}return t
}function _attachEvent(){jindo.$Fn(_onOrientationChange,this).attach(window,_getOrientationChangeEvt()).attach(window,"load"),jindo.$Fn(_onPageshow,this).attach(window,"pageshow")
}function _initDeviceInfo(){function t(t,e){return(e||"").indexOf(t)>-1
}_setOsInfo(),_setBrowserInfo();
var e=navigator.userAgent;
_htDeviceInfo={iphone:_htOsInfo.iphone,ipad:_htOsInfo.ipad,android:_htOsInfo.android,win:t("Windows Phone",e),galaxyTab:/SHW-M180/.test(e),galaxyTab2:/SHW-M380/.test(e),galaxyS:/SHW-M110/.test(e),galaxyS2:/SHW-M250|GT-I9100/.test(e),galaxyS2LTE:/SHV-E110/.test(e),galaxyS3:/SHV-E210|SHW-M440|GT-I9300/.test(e),galaxyNote:/SHV-E160/.test(e),galaxyNote2:/SHV-E250/.test(e),galaxyNexus:/Galaxy Nexus/.test(e),optimusLte2:/LG-F160/.test(e),optimusVu:/LG-F100/.test(e),optimusLte:/LG-LU6200|LG-SU640|LG-F120K'/.test(e),galaxyS4:/SHV-E300|GT-I9500|GT-I9505|SGH-M919|SPH-L720|SGH-I337|SCH-I545/.test(e),bChrome:_htBrowserInfo.chrome,bSBrowser:_htBrowserInfo.bSBrowser,bInapp:!1,version:_htOsInfo.version,browserVersion:_htBrowserInfo.version};
for(var n in _htDeviceInfo){"boolean"==typeof _htDeviceInfo[n]&&_htDeviceInfo[n]&&_htDeviceInfo.hasOwnProperty(n)&&"b"!==n[0]&&(_htDeviceInfo.name=n)
}_htDeviceInfo.samsung=/GT-|SCH-|SHV-|SHW-|SPH|SWT-|SGH-|EK-|Galaxy Nexus|SAMSUNG/.test(e),_htDeviceInfo.lg=/LG-/.test(e),_htDeviceInfo.pantech=/IM-/.test(e),_htDeviceInfo.iphone||_htDeviceInfo.ipad?t("Safari",e)||(_htDeviceInfo.bInapp=!0):_htDeviceInfo.android&&(e=e.toLowerCase(),(t("inapp",e)||t("app",e.replace("applewebkit","")))&&(_htDeviceInfo.bInapp=!0))
}function _setOsInfo(){_htOsInfo=jindo.$Agent().os(),_isInapp(),_htOsInfo.version=_htOsInfo.version||_getOsVersion(),_htOsInfo.ios="undefined"==typeof _htOsInfo.ios?_htOsInfo.ipad||_htOsInfo.iphone:_htOsInfo.ios
}function _setBrowserInfo(){_htBrowserInfo=jindo.$Agent().navigator(),_htOsInfo.ios&&/CriOS/.test(navigator.userAgent)&&(_htBrowserInfo.chrome=!0),"undefined"==typeof _htBrowserInfo.firefox&&(_htBrowserInfo.firefox=/Firefox/.test(navigator.userAgent)),_isSBrowser(),_updateUnderVersion()
}function _updateUnderVersion(){_htBrowserInfo.msafari&&_htBrowserInfo.chrome?_htBrowserInfo.version=parseFloat(_htOsInfo.ios?navigator.userAgent.match(/CriOS[ \/]([0-9.]+)/)[1]:navigator.userAgent.match(/Chrome[ \/]([0-9.]+)/)[1]):_htBrowserInfo.firefox&&(_htBrowserInfo.version=parseFloat(navigator.userAgent.match(/Firefox[ \/]([0-9.]+)/)[1]))
}function _isInapp(){var t=navigator.userAgent;
_htOsInfo.bInapp=!1,_htOsInfo.ios?-1==t.indexOf("Safari")&&(_htOsInfo.bInapp=!0):_htOsInfo.android&&(t=t.toLowerCase(),(-1!=t.indexOf("inapp")||-1!=t.replace("applewebkit","").indexOf("app"))&&(_htOsInfo.bInapp=!0))
}function _isSBrowser(){_htBrowserInfo.bSBrowser=!1;
var t=navigator.userAgent,e=t.match(/(SAMSUNG|Chrome)/gi)||"";
e.length>1&&(_htBrowserInfo.bSBrowser=!0)
}function _getOsVersion(){if(!_htOsInfo.version){var t,e=navigator.userAgent,n="";
return _htOsInfo.iphone||_htOsInfo.ipad?(t=e.match(/OS\s([\d|\_]+\s)/i),null!==t&&t.length>1&&(n=t[1])):_htOsInfo.android?(t=e.match(/Android\s([^\;]*)/i),null!==t&&t.length>1&&(n=t[1])):_htOsInfo.mwin&&(t=e.match(/Windows Phone\s([^\;]*)/i),null!==t&&t.length>1&&(n=t[1])),n.replace(/\_/g,".").replace(/\s/g,"")
}}function _onOrientationChange(t){if("load"===t.type){return _nPreWidth=document.documentElement.clientWidth,void (_isVertical=_htOsInfo.bInapp||!_htOsInfo.iphone&&!_htOsInfo.ipad&&"resize"===_getOrientationChangeEvt()?_nPreWidth>document.documentElement.clientHeight?!1:!0:_getVertical())
}if("resize"===_getOrientationChangeEvt()){setTimeout(function(){_orientationChange(t)
},0)
}else{var e=jindo.$Document().clientSize().width,n=300;
if(_htDeviceInfo.android){if("orientationchange"==t.type&&e==_nPreWidth){return setTimeout(function(){_onOrientationChange(t)
},500),!1
}_nPreWidth=e
}clearTimeout(_nRotateTimer),_nRotateTimer=setTimeout(function(){_orientationChange(t)
},n)
}}function _orientationChange(t){var e=_isVertical;
_isVertical=_getVertical(),(jindo.$Agent().navigator().mobile||jindo.$Agent().os().ipad)&&e!==_isVertical&&(t.sType="rotate",t.isVertical=_isVertical,_fireEvent("mobilerotate",t))
}function _onPageshow(t){_isVertical=_getVertical(),t.sType="pageShow",setTimeout(function(){_fireEvent("mobilePageshow",t)
},300)
}function _getTranslateOffsetFromCSSMatrix(t){var e=new WebKitCSSMatrix(window.getComputedStyle(t).webkitTransform);
return{top:e.m42,left:e.m41}
}function _fireEvent(t,e){if(_htHandler[t]){for(var n=_htHandler[t].concat(),i=0,s=n.length;
s>i;
i++){n[i].call(this,e)
}}}function _getTranslateOffsetFromStyle(t){var e=0,n=0,i=[],s=[],o=t.style[""==jindo.m.getCssPrefix()?"transform":jindo.m.getCssPrefix()+"Transform"];
if(o&&o.length>0){if(/translate[XY]/.test(o)){var h=o.match(/translateX\(([-0-9px]*)\)/),r=o.match(/translateY\(([-0-9px]*)\)/);
s.push(h&&h.length>1?h[1]:"0px"),s.push(r&&r.length>1?r[1]:"0px"),i[1]=s.join(",")
}else{i=o.match(/translate.{0,2}\((.*)\)/)
}if(i&&i.length>1){var a=i[1].split(",");
a&&a.length>1&&(e=parseInt(a[1],10),n=parseInt(a[0],10))
}}return{top:e,left:n}
}var _isVertical=null,_nPreWidth=-1,_nRotateTimer=null,_htHandler={},_htDeviceInfo={},_htAddPatch={},_htOsInfo={},_htBrowserInfo={},_htTouchEventName={start:"mousedown",move:"mousemove",end:"mouseup",cancel:null},_htDeviceList={galaxyTab:["SHW-M180"],galaxyTab2:["SHW-M380"],galaxyS:["SHW-M110"],galaxyS2:["SHW-M250","GT-I9100"],galaxyS2LTE:["SHV-E110"],galaxyS3:["SHV-E210","SHW-M440","GT-I9300"],galaxyNote:["SHV-E160"],galaxyNote2:["SHV-E250"],galaxyNexus:["Galaxy Nexus"],optimusLte2:["LG-F160"],optimusVu:["LG-F100"],optimusLte:["LG-LU6200","LG-SU640","LG-F120K"]},__M__={MOVETYPE:{0:"hScroll",1:"vScroll",2:"dScroll",3:"tap",4:"longTap",5:"doubleTap",6:"pinch",7:"rotate",8:"pinch-rotate"},KITKAT_HIGHLIGHT_CLASS:"_jmc_no_tap_highlight_",KITKAT_HIGHLIGHT_ID:"_jmc_no_tap_highlight_tag_",sVersion:"unknown",$init:function(){_initDeviceInfo(),_initTouchEventName(),_attachEvent();
var t=jindo.$(this.KITKAT_HIGHLIGHT_ID);
if(!t){t=document.createElement("style");
var e=document.getElementsByTagName("html")[0];
t.type="text/css",t.id=this.KITKAT_HIGHLIGHT_ID,e.insertBefore(t,e.firstChild);
var n=t.sheet||t.styleSheet;
n.insertRule("."+this.KITKAT_HIGHLIGHT_CLASS+" { -webkit-tap-highlight-color: rgba(0,0,0,0); }",0),n.insertRule("."+this.KITKAT_HIGHLIGHT_CLASS+" * { -webkit-tap-highlight-color: rgba(0,0,0,0); }",0)
}},bindRotate:function(t){var e=_htHandler.mobilerotate;
"undefined"==typeof e&&(e=_htHandler.mobilerotate=[]),e.push(t)
},unbindRotate:function(t){var e=_htHandler.mobilerotate;
if(e){for(var n,i=0;
n=e[i];
i++){if(n===t){e.splice(i,1);
break
}}}},bindPageshow:function(t){var e=_htHandler.mobilePageshow;
"undefined"==typeof e&&(e=_htHandler.mobilePageshow=[]),e.push(t)
},unbindPageshow:function(t){var e=_htHandler.mobilePageshow;
if(e){for(var n,i=0;
n=e[i];
i++){if(n===t){e.splice(i,1);
break
}}}},getDeviceInfo:function(){return _htDeviceInfo
},getOsInfo:function(){return _htOsInfo
},getBrowserInfo:function(){return _htBrowserInfo
},isVertical:function(){return null===_isVertical?_isVertical=_getVertical():_isVertical
},getNodeElement:function(t){for(;
1!=t.nodeType;
){t=t.parentNode
}return t
},getTranslateOffset:function(t){t=jindo.$Element(t);
var e,n=t.$value();
return e=_htOsInfo.android&&3===parseInt(_htOsInfo.version,10)?_getTranslateOffsetFromStyle(n):"WebKitCSSMatrix" in window&&"m11" in new WebKitCSSMatrix?_getTranslateOffsetFromCSSMatrix(n):_getTranslateOffsetFromStyle(n)
},getStyleOffset:function(t){var e=parseInt(t.css("left"),10),n=parseInt(t.css("top"),10);
return e=isNaN(e)?0:e,n=isNaN(n)?0:n,{left:e,top:n}
},attachTransitionEnd:function(t,e){var n=+jindo.$Jindo().version.replace(/[a-z.]/gi,"");
if(n>230){t._jindo_fn_=jindo.$Fn(e,this).attach(t,"transitionend")
}else{var i=("ms"===this.getCssPrefix()?"MS":this.getCssPrefix())+"TransitionEnd";
t.addEventListener(i,e,!1)
}},detachTransitionEnd:function(t,e){var n=+jindo.$Jindo().version.replace(/[a-z.]/gi,"");
if(n>230){t._jindo_fn_&&(t._jindo_fn_.detach(t,"transitionend"),delete t._jindo_fn_)
}else{var i=("ms"===this.getCssPrefix()?"MS":this.getCssPrefix())+"TransitionEnd";
t.removeEventListener(i,e,!1)
}},_attachFakeJindo:function(t,e,n){var i=+jindo.$Jindo().version.replace(/[a-z.]/gi,""),s=null;
return s=230>i&&"undefined"!=typeof _notSupport?_notSupport.$Fn(e).attach(t,n):jindo.$Fn(e).attach(t,n)
},_getTouchEventName:function(){return _htTouchEventName
},getCssPrefix:function(){var t="";
return"undefined"!=typeof document.body.style.webkitTransition?t="webkit":"undefined"!=typeof document.body.style.transition||("undefined"!=typeof document.body.style.MozTransition?t="Moz":"undefined"!=typeof document.body.style.OTransition?t="O":"undefined"!=typeof document.body.style.msTransition&&(t="ms")),jindo.m.getCssPrefix=function(){return t
},t
},getClosest:function(t,e){var n,i=jindo.$Element(e),s=/<\/?(?:h[1-5]|[a-z]+(?:\:[a-z]+)?)[^>]*>/gi;
return s.test(t)?"<"+e.tagName.toUpperCase()+">"==t.toUpperCase()?n=e:(n=i.parent(function(e){return"<"+e.$value().tagName.toUpperCase()+">"==t.toUpperCase()?e:void 0
}),n=n.length?n[0].$value():!1):(0==t.indexOf(".")&&(t=t.substring(1,t.length)),i.hasClass(t)?n=e:(n=i.parent(function(e){return e.hasClass(t)?e:void 0
}),n=n.length?n[0].$value():!1)),n
},useCss3d:function(){if(_htAddPatch.useCss3d&&"function"==typeof _htAddPatch.useCss3d){switch(_htAddPatch.useCss3d()){case -1:return !1;
case 1:return !0
}}var t=!1;
if(_htBrowserInfo.chrome&&_htBrowserInfo.version<"25"&&!_htBrowserInfo.bSBrowser){return t
}if(_htOsInfo.ios){t=!0
}else{if(_htBrowserInfo.firefox){t=!0
}else{if(_htOsInfo.android){var e=navigator.userAgent.match(/\(.*\)/);
e instanceof Array&&e.length>0&&(e=e[0]),_htOsInfo.version>="4.1.0"?t=/EK-GN120|SM-G386F/.test(e)?!1:!0:(_htOsInfo.version>="4.0"&&(t=!0),_htOsInfo.version>="4.0.3"&&/SHW-|SHV-|GT-|SCH-|SGH-|SPH-|LG-F160|LG-F100|LG-F180|LG-F200|EK-|IM-A|LG-F240|LG-F260/.test(e)&&!/SHW-M420|SHW-M200|GT-S7562/.test(e)&&(t=!0))
}}}return t
},patch:function(t){return _htAddPatch.ver=t,this
},_checkPatchVersion:function(){var t=jindo.m.Component.VERSION.split("."),e=t.slice(0,3).join(".");
return _htAddPatch.ver>=e?!0:!1
},add:function(t){if(this._checkPatchVersion()){for(var e in t){_htAddPatch[e]=t[e]
}}return this
},getDeviceName:function(){if(_htAddPatch.getDeviceName&&"function"==typeof _htAddPatch.getDeviceName&&_htAddPatch.getDeviceName()){return _htAddPatch.getDeviceName()
}var sUserAgent=navigator.userAgent;
for(var i in _htDeviceList){if(eval("/"+_htDeviceList[i].join("|")+"/").test(sUserAgent)){return i
}}var htInfo=jindo.$Agent().os();
for(var x in htInfo){if(htInfo[x]===!0&&htInfo.hasOwnProperty(x)){return x
}}},useFixed:function(){if(_htAddPatch.useFixed&&"function"==typeof _htAddPatch.useFixed){switch(_htAddPatch.useFixed()){case -1:return !1;
case 1:return !0
}}var t=!1;
return(_htBrowserInfo.chrome||_htBrowserInfo.firefox||_htOsInfo.android&&parseInt(_htOsInfo.version,10)>=3||_htOsInfo.ios&&parseInt(_htOsInfo.version,10)>=5||_htOsInfo.mwin&&parseInt(_htOsInfo.version,10)>=8)&&(t=!0),t
},useTimingFunction:function(){if(_htAddPatch.useTimingFunction&&"function"==typeof _htAddPatch.useTimingFunction&&_htAddPatch.useTimingFunction()){switch(_htAddPatch.useTimingFunction()){case -1:return !1;
case 1:return !0
}}var t=this.useCss3d();
return _htOsInfo.android?t=!1:_htOsInfo.ios&&parseInt(_htOsInfo.version,10)>=6&&(t=!1),t
},_cacheMaxClientSize:{},_fullSizeCheckElement:null,_allEventStop:function(t,e){this._htEvent||(this._htEvent={}),"detach"==e?(this._htEvent.touchstart.detach(document.body,"touchstart").detach(document.body,"touchmove"),this._htEvent={}):this._htEvent.touchstart||"attach"!=e||(this._htEvent.touchstart=jindo.$Fn(t,this).attach(document.body,"touchstart").attach(document.body,"touchmove"))
},_stopDefault:function(t){t.stop()
},_hasOrientation:void 0!==window.orientation,_maxClientSize:function(t,e){var n=this.getOsInfo();
this._allEventStop(this._stopDefault,"attach"),this._fullSizeCheckElement||(this._fullSizeCheckElement=document.createElement("div"));
var i=n.android?500:100;
i=e?1:i;
var s;
this._hasOrientation&&(s=Math.abs(window.orientation/90)%2,i=void 0!==this._cacheMaxClientSize[s]?0:i);
var o=this;
document.body.scrollTop<=1?(document.body.appendChild(o._fullSizeCheckElement),o._fullSizeCheckElement.style.cssText="position:absolute; top: 0px; width:100%;height:"+parseInt(window.innerHeight+200,10)+"px;",window.scrollTo(0,1),setTimeout(function(){o._checkSize(o._hasOrientation,o._cacheMaxClientSize,s,t,o,i)
},i)):(this._fullSizeCheckElement.style.height=window.innerHeight+"px",this._checkSize(this._hasOrientation,this._cacheMaxClientSize,s,t,o,i))
},_checkSize:function(t,e,n,i,s,o){var h=this.getOsInfo(),r=this.getBrowserInfo();
this._allEventStop(this._stopDefault,"attach");
var a;
t&&e[n]?a=e[n]:(s._fullSizeCheckElement.style.cssText="position:absolute; top: 0px; width:100%;height:"+window.innerHeight+"px;overflow:hidden",a=r.mobile||h.ipad?{width:window.innerWidth,height:window.innerHeight}:{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight},t&&(e[n]=a)),i.call(s,a);
var l=this;
this._allEventStop(this._stopDefault,"detach"),0===o?this._fullSizeCheckElement.style.height="0px":setTimeout(function(){l._fullSizeCheckElement.style.height="0px"
},o)
},hasOffsetBug:function(){if(_htAddPatch.hasOffsetBug&&"function"==typeof _htAddPatch.hasOffsetBug){switch(_htAddPatch.hasOffsetBug()){case -1:return !1;
case 1:return !0
}}var t=!1;
return t=_htOsInfo.android?_htBrowserInfo.chrome||_htBrowserInfo.firefox?!1:_htOsInfo.version<"4"?!0:!1:!1
},hasClickBug:function(){if(_htAddPatch.hasClickBug&&"function"==typeof _htAddPatch.hasClickBug){switch(_htAddPatch.hasClickBug()){case -1:return !1;
case 1:return !0
}}return _htOsInfo.ios||window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0||!1
},_getTranslate:function(t,e,n){return n="undefined"==typeof n?!0:n,"translate"+(n?"3d(":"(")+t+","+e+(n?",0)":")")
},_toPrefixStr:function(t){return t.length<=0?t:(t=""==this.getCssPrefix()?t.charAt(0).toLowerCase()+t.substr(1):t.charAt(0).toUpperCase()+t.substr(1),this.getCssPrefix()+t)
},_hasJindoOffsetBug:function(){return !(jindo.$Element.prototype.offset_get&&-1==jindo.$Element.prototype.offset_get.toString().indexOf("fpSafari"))
},_hasKitkatHighlightBug:function(){if(_htAddPatch._hasKitkatHighlightBug&&"function"==typeof _htAddPatch._hasKitkatHighlightBug){switch(_htAddPatch._hasKitkatHighlightBug()){case -1:return !1;
case 1:return !0
}}return _htBrowserInfo.chrome&&!_htBrowserInfo.bSBrowser&&_htBrowserInfo.version<35
}};
return __M__._isUseFixed=__M__.useFixed,__M__._isUseTimingFunction=__M__.useTimingFunction,__M__._isUseCss3d=__M__.useCss3d,__M__.getCssOffset=__M__.getTranslateOffset,__M__.$init(),__M__
}(),"mixin" in jindo.$Jindo||(jindo.$Jindo.mixin=function(b,c){var d={};
for(var a in b){d[a]=b[a]
}for(a in c){c.hasOwnProperty(a)&&"undefined"!=typeof c[a]&&(d[a]=c[a])
}return d
}),jindo.m.Component=jindo.$Class({_htEventHandler:null,_htOption:null,$init:function(){this._htEventHandler={},this._htOption={},this._htOption._htSetter={},this.constructor.$count=(this.constructor.$count||0)+1
},option:function(b,d){switch(typeof b){case"undefined":var f={};
for(var a in this._htOption){"htCustomEventHandler"!=a&&"_htSetter"!=a&&(f[a]=this._htOption[a])
}return f;
case"string":if("undefined"==typeof d){return this._htOption[b]
}if("htCustomEventHandler"==b){if("undefined"!=typeof this._htOption[b]){return this
}this.attach(d)
}this._htOption[b]=d,"function"==typeof this._htOption._htSetter[b]&&this._htOption._htSetter[b](d);
break;
case"object":for(var c in b){if("htCustomEventHandler"==c){if("undefined"!=typeof this._htOption[c]){continue
}this.attach(b[c])
}"_htSetter"!==c&&(this._htOption[c]=b[c]),"function"==typeof this._htOption._htSetter[c]&&this._htOption._htSetter[c](b[c])
}}return this
},optionSetter:function(a,b){switch(typeof a){case"undefined":return this._htOption._htSetter;
case"string":if("undefined"==typeof b){return this._htOption._htSetter[a]
}this._htOption._htSetter[a]=jindo.$Fn(b,this).bind();
break;
case"object":for(var c in a){this._htOption._htSetter[c]=jindo.$Fn(a[c],this).bind()
}}return this
},fireEvent:function(p,k){k=k||{};
var d=this["on"+p],g=this._htEventHandler[p]||[],q="function"==typeof d,c=g.length>0;
if(!q&&!c){return !0
}g=g.concat(),k.sType=p,"undefined"==typeof k._aExtend&&(k._aExtend=[],k.stop=function(){k._aExtend.length>0&&(k._aExtend[k._aExtend.length-1].bCanceled=!0)
}),k._aExtend.push({sType:p,bCanceled:!1});
var j,b,m=[k];
for(j=2,b=arguments.length;
b>j;
j++){m.push(arguments[j])
}if(q&&d.apply(this,m),c){var f;
for(j=0,f;
f=g[j];
j++){f.apply(this,m)
}}return !k._aExtend.pop().bCanceled
},attach:function(a,b){if(1==arguments.length){return jindo.$H(arguments[0]).forEach(jindo.$Fn(function(d,f){this.attach(f,d)
},this).bind()),this
}var c=this._htEventHandler[a];
return"undefined"==typeof c&&(c=this._htEventHandler[a]=[]),c.push(b),this
},detach:function(b,d){if(1==arguments.length){return jindo.$H(arguments[0]).forEach(jindo.$Fn(function(g,h){this.detach(h,g)
},this).bind()),this
}var f=this._htEventHandler[b];
if(f){for(var a,c=0;
a=f[c];
c++){if(a===d){f=f.splice(c,1);
break
}}}return this
},detachAll:function(a){var b=this._htEventHandler;
if(arguments.length){return"undefined"==typeof b[a]?this:(delete b[a],this)
}for(var c in b){delete b[c]
}return this
}}),jindo.m.Component.factory=function(b,d){var g,a=[];
"undefined"==typeof d&&(d={});
for(var c,f=0;
c=b[f];
f++){g=new this(c,d),a[a.length]=g
}return a
},jindo.m.Component.getInstance=function(){throw new Error("JC 1.11.0 or JMC 1.13.0 later, getInstance method of Component is not longer supported.")
},jindo.m.Component.VERSION="1.15.0-MAIN",jindo.m.AjaxHistory=jindo.$Class({bHashEvent:!1,bPushState:!1,_nIntervalId:0,_htLastState:{},$init:function(a){this.option({nCheckInterval:100,bUseHash:!1}),this.option(a||{})
},initialize:function(){this._initVar(),this._attachEvent();
var a=this._getHash();
return a?(this._htLastState=this._getDecodedData(a),this.fireEvent("change",{bLoad:!0,htHistoryData:this._htLastState})):this.fireEvent("load"),this
},_initVar:function(){var a=jindo.m.getDeviceInfo();
this.bHashEvent="onhashchange" in window,this.bPushState="undefined"!=typeof window.history&&"undefined"!=typeof window.history.pushState&&"undefined"!=typeof window.history.replaceState&&!((a.iphone||a.ipad)&&parseFloat(a.version,10)<4.3),this._nIntervalId=0,this._oAgent=jindo.$Agent().navigator(),this._bAndroid=a.android,this.option("bUseHash")&&(this.bPushState=!1)
},_attachEvent:function(){this._htEvent={},this.bPushState?this._htEvent.popstate={ref:jindo.$Fn(this._onPopState,this).attach(window,"popstate"),el:window}:this.bHashEvent?this._htEvent.hashchange={ref:jindo.$Fn(this._onHashChange,this).attach(window,"hashchange"),el:window}:(clearInterval(this._nIntervalId),this._nIntervalId=setInterval(jindo.$Fn(this._onHashChange,this).bind(),this.option("nCheckInterval")))
},_onPopState:function(a){var b=a.$value().state;
if(b){var c=this._cloneObject(b);
this._compareData(c,this._htLastState)||(this._htLastState=c,this._onChange())
}},_onHashChange:function(){var a=this._getDecodedData(this._getHash());
this._compareData(a,this._htLastState)||(this._htLastState=a,this._onChange())
},_onChange:function(){this.fireEvent("change",{bLoad:!1,htHistoryData:this._htLastState})
},addHistory:function(b,d){if("undefined"==typeof d&&(d=!1),b&&"object"==typeof b&&jindo.$H(b).length()>0){var f=this._cloneObject(b);
if(this._compareData(f,this._htLastState)){return
}this._htLastState=f;
var a=this._getEncodedData(this._htLastState);
if(this.bPushState){d?this._replaceState(this._htLastState):this._pushState(this._htLastState)
}else{var c=this;
this._bAndroid?setTimeout(function(){c._setHash(a)
},0):this._setHash(a)
}}},_replaceState:function(a){history.replaceState(a,document.title,location.href)
},_pushState:function(a){history.pushState(a,document.title,location.href)
},_setHash:function(a){location.hash=a
},_compareData:function(a,b){if(a&&b){if(jindo.$H(a).length()==jindo.$H(b).length()){for(var c in a){if("object"==typeof a[c]){if(!arguments.callee(a[c],b[c])){return !1
}}else{if(a[c]!=b[c]){return !1
}}}return !0
}return !1
}return !1
},_getEncodedData:function(a){return a?encodeURIComponent("object"==typeof JSON&&"function"==typeof JSON.stringify?JSON.stringify(a):jindo.$Json(a).toString()):""
},_getDecodedData:function(a){try{if(a){var b=decodeURIComponent(a);
return"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(b):jindo.$Json(b).toObject()
}}catch(c){}return{}
},_cloneObject:function(a){var b,c;
return a?(b=jindo.$Json(a).toString(),c=jindo.$Json(b).toObject()):c={},c
},_getHash:function(){return this._oAgent.firefox?encodeURIComponent(location.hash.substring(1)):location.hash.substring(1)
},_detachEvent:function(){for(var a in this._htEvent){var b=this._htEvent[a];
b.ref.detach(b.el,a)
}this._htEvent=null
},destroy:function(){this._detachEvent(),clearInterval(this._nIntervalId),this._nIntervalId=null
}}).extend(jindo.m.Component),jindo.m.UIComponent=jindo.$Class({$init:function(){this._bIsActivating=!1
},isActivating:function(){return this._bIsActivating
},activate:function(){return this.isActivating()?this:(this._bIsActivating=!0,arguments.length>0?this._onActivate.apply(this,arguments):this._onActivate(),this)
},deactivate:function(){return this.isActivating()?(this._bIsActivating=!1,arguments.length>0?this._onDeactivate.apply(this,arguments):this._onDeactivate(),this):this
}}).extend(jindo.m.Component),jindo.m.Effect=function(A){if(this instanceof arguments.callee){throw new Error("You can't create a instance of this")
}var q=/^(\-?[0-9\.]+)(%|\w+)?$/,g=/^rgb\(([0-9]+)\s?,\s?([0-9]+)\s?,\s?([0-9]+)\)$/i,k=/^rgba\(([0-9]+)\s?,\s?([0-9]+)\s?,\s?([0-9]+),\s?([0-9\.]+)\)$/i,B=/^hsl\(([0-9\.]+)\s?,\s?([0-9\.]+)%\s?,\s?([0-9\.]+)%\)$/i,d=/^hsla\(([0-9\.]+)\s?,\s?([0-9\.]+)%\s?,\s?([0-9\.]+)%,\s?([0-9\.]+)\)$/i,m=/^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,b=/^#([0-9A-F])([0-9A-F])([0-9A-F])$/i,y=function(h){var f,c=h;
if(q.test(h)){c=parseFloat(h),f=RegExp.$2||""
}else{if(g.test(h)){c=[parseInt(RegExp.$1,10),parseInt(RegExp.$2,10),parseInt(RegExp.$3,10),1],f="color"
}else{if(k.test(h)){c=[parseInt(RegExp.$1,10),parseInt(RegExp.$2,10),parseInt(RegExp.$3,10),parseFloat(RegExp.$4,10)],f="color"
}else{if(B.test(h)){c=z(parseFloat(RegExp.$1,10),parseFloat(RegExp.$2,10)/100,parseFloat(RegExp.$3,10)/100,1),c.push(1),f="color"
}else{if(d.test(h)){c=z(parseFloat(RegExp.$1,10),parseFloat(RegExp.$2,10)/100,parseFloat(RegExp.$3,10)/100,1),c.push(parseFloat(RegExp.$4,10)),f="color"
}else{if(!m.test(h=h.replace(b,"#$1$1$2$2$3$3"))){throw new Error("unit error ("+h+")")
}c=[parseInt(RegExp.$1,16),parseInt(RegExp.$2,16),parseInt(RegExp.$3,16),1],f="color"
}}}}}return{nValue:c,sUnit:f}
},j=function(a){var c=[];
return a.replace(/([^\s]+\([^\)]*\)|[^\s]+)\s?/g,function(f,h){c.push(h)
}),c
},p=function(c){for(var h=j(c?c+"":"0"),o=[],a=0,f=h.length;
f>a;
a++){o.push(y(h[a]))
}return o
},w=function(a){return"object"==typeof a?{nValue:a.nValue,sUnit:a.sUnit}:a
},z=function(I,G,C){var E,J,f,F=(1-Math.abs(2*C-1))*G,c=I/60,H=F*(1-Math.abs(c%2-1));
void 0===I||isNaN(I)||null===I?E=J=f=0:c>=0&&1>c?(E=F,J=H,f=0):c>=1&&2>c?(E=H,J=F,f=0):c>=2&&3>c?(E=0,J=F,f=H):c>=3&&4>c?(E=0,J=H,f=F):c>=4&&5>c?(E=H,J=0,f=F):c>=5&&6>c&&(E=F,J=0,f=H);
var D=C-F/2;
return[Math.round(255*(E+D)),Math.round(255*(J+D)),Math.round(255*(f+D))]
};
return function(r,C){var a,f,t=function(){var s=!1;
if(c.start!==r&&(a=p(c.start),r=c.start,s=!0),c.end!==C&&(f=p(c.end),C=c.end,s=!0),s){var E,D,n=Math.max(a.length,f.length);
if(a.length!==f.length&&n>1){switch(a.length){case 1:a[1]=w(a[2]=w(a[3]=w(a[0])));
break;
case 2:a[2]=w(a[0]),a[3]=w(a[1]);
break;
case 3:a[3]=w(a[1])
}switch(f.length){case 1:f[1]=f[2]=f[3]=f[0];
break;
case 2:f[2]=f[0],f[3]=f[1];
break;
case 3:f[3]=f[1]
}}for(var h=0;
n>h;
h++){if(E=a[h],D=f[h],0===E.nValue?E.sUnit=D.sUnit:0===D.nValue&&(D.sUnit=E.sUnit),E.sUnit!=D.sUnit){throw new Error("unit error ("+r+" ~ "+C+")")
}}}},c=function(I){var D=[];
t();
for(var G,o,L,F,H,K=0,O=Math.max(a.length,f.length);
O>K;
K++){G=a[K],o=f[K],L=G.nValue,F=o.nValue,H=G.sUnit;
var N=A(I),J=function(h,P,Q){return(P-h)*N+h+(Q||0)
};
if("color"!=H){D.push(J(L,F,H))
}else{var E=J(L[3],F[3],0);
if(1===E){var s=Math.max(0,Math.min(255,Math.round(J(L[0],F[0],0))))<<16;
s|=Math.max(0,Math.min(255,Math.round(J(L[1],F[1],0))))<<8,s|=Math.max(0,Math.min(255,Math.round(J(L[2],F[2],0)))),s=s.toString(16).toUpperCase();
for(var M=0;
6-s.length;
M++){s="0"+s
}D.push("#"+s)
}else{D.push("rgba("+[Math.round(J(L[0],F[0],0)),Math.round(J(L[1],F[1],0)),Math.round(J(L[2],F[2],0)),J(L[3],F[3],0)].join(",")+")")
}}}return D.join(" ")
};
switch(arguments.length){case 0:break;
case 1:C=r||"0",r="0",c.setStart=function(h){this.start=h
}}return c.start=r,c.end=C,c.effectConstructor=arguments.callee,r=C=null,arguments.length>1&&t(),c
}},jindo.m.Effect.linear=jindo.m.Effect(function(a){return a
}),jindo.m.Effect.linear.toString=function(){return"linear"
},jindo.m.Effect.easeInSine=jindo.m.Effect(function(a){return 1==a?1:-Math.cos(a*(Math.PI/2))+1
}),jindo.m.Effect.easeOutSine=jindo.m.Effect(function(a){return Math.sin(a*(Math.PI/2))
}),jindo.m.Effect.easeInOutSine=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeInSine(0,1)(2*a):0.5*jindo.m.Effect.easeOutSine(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeOutInSine=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeOutSine(0,1)(2*a):0.5*jindo.m.Effect.easeInSine(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeInQuad=jindo.m.Effect(function(a){return a*a
}),jindo.m.Effect.easeOutQuad=jindo.m.Effect(function(a){return -(a*(a-2))
}),jindo.m.Effect.easeInOutQuad=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeInQuad(0,1)(2*a):0.5*jindo.m.Effect.easeOutQuad(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeOutInQuad=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeOutQuad(0,1)(2*a):0.5*jindo.m.Effect.easeInQuad(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeInCubic=jindo.m.Effect(function(a){return Math.pow(a,3)
}),jindo.m.Effect.easeOutCubic=jindo.m.Effect(function(a){return Math.pow(a-1,3)+1
}),jindo.m.Effect.easeInOutCubic=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeIn(0,1)(2*a):0.5*jindo.m.Effect.easeOut(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeOutInCubic=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeOut(0,1)(2*a):0.5*jindo.m.Effect.easeIn(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeInQuart=jindo.m.Effect(function(a){return Math.pow(a,4)
}),jindo.m.Effect.easeOutQuart=jindo.m.Effect(function(a){return -(Math.pow(a-1,4)-1)
}),jindo.m.Effect.easeInOutQuart=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeInQuart(0,1)(2*a):0.5*jindo.m.Effect.easeOutQuart(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeOutInQuart=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeOutQuart(0,1)(2*a):0.5*jindo.m.Effect.easeInQuart(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeInQuint=jindo.m.Effect(function(a){return Math.pow(a,5)
}),jindo.m.Effect.easeOutQuint=jindo.m.Effect(function(a){return Math.pow(a-1,5)+1
}),jindo.m.Effect.easeInOutQuint=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeInQuint(0,1)(2*a):0.5*jindo.m.Effect.easeOutQuint(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeOutInQuint=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeOutQuint(0,1)(2*a):0.5*jindo.m.Effect.easeInQuint(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeInCircle=jindo.m.Effect(function(a){return -(Math.sqrt(1-a*a)-1)
}),jindo.m.Effect.easeOutCircle=jindo.m.Effect(function(a){return Math.sqrt(1-(a-1)*(a-1))
}),jindo.m.Effect.easeInOutCircle=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeInCircle(0,1)(2*a):0.5*jindo.m.Effect.easeOutCircle(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeOutInCircle=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeOutCircle(0,1)(2*a):0.5*jindo.m.Effect.easeInCircle(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeInBack=jindo.m.Effect(function(a){var b=1.70158;
return 1==a?1:a/1*(a/1)*((1+b)*a-b)
}),jindo.m.Effect.easeOutBack=jindo.m.Effect(function(a){var b=1.70158;
return 0===a?0:(a=a/1-1)*a*((b+1)*a+b)+1
}),jindo.m.Effect.easeInOutBack=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeInBack(0,1)(2*a):0.5*jindo.m.Effect.easeOutBack(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeInElastic=jindo.m.Effect(function(b){var c,d=0,a=0;
return 0===b?0:1==(b/=1)?1:(d||(d=0.3),!a||1>a?(a=1,c=d/4):c=d/(2*Math.PI)*Math.asin(1/a),-(a*Math.pow(2,10*(b-=1))*Math.sin(2*(b-1)*Math.PI/d)))
}),jindo.m.Effect.easeOutElastic=jindo.m.Effect(function(b){var c,d=0,a=0;
return 0===b?0:1==(b/=1)?1:(d||(d=0.3),!a||1>a?(a=1,c=d/4):c=d/(2*Math.PI)*Math.asin(1/a),a*Math.pow(2,-10*b)*Math.sin(2*(b-c)*Math.PI/d)+1)
}),jindo.m.Effect.easeInOutElastic=jindo.m.Effect(function(b){var c,d=0,a=0;
return 0===b?0:2==(b/=0.5)?1:(d||(d=0.3*1.5),!a||1>a?(a=1,c=d/4):c=d/(2*Math.PI)*Math.asin(1/a),1>b?-0.5*a*Math.pow(2,10*(b-=1))*Math.sin(2*(b-c)*Math.PI/d):a*Math.pow(2,-10*(b-=1))*Math.sin(2*(b-c)*Math.PI/d)*0.5+1)
}),jindo.m.Effect.easeOutBounce=jindo.m.Effect(function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+0.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375
}),jindo.m.Effect.easeInBounce=jindo.m.Effect(function(a){return 1-jindo.m.Effect.easeOutBounce(0,1)(1-a)
}),jindo.m.Effect.easeInOutBounce=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeInBounce(0,1)(2*a):0.5*jindo.m.Effect.easeOutBounce(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeInExpo=jindo.m.Effect(function(a){return 0===a?0:Math.pow(2,10*(a-1))
}),jindo.m.Effect.easeOutExpo=jindo.m.Effect(function(a){return 1==a?1:-Math.pow(2,-10*a/1)+1
}),jindo.m.Effect.easeInOutExpo=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeInExpo(0,1)(2*a):0.5*jindo.m.Effect.easeOutExpo(0,1)(2*a-1)+0.5
}),jindo.m.Effect.easeOutInExpo=jindo.m.Effect(function(a){return 0.5>a?0.5*jindo.m.Effect.easeOutExpo(0,1)(2*a):0.5*jindo.m.Effect.easeInExpo(0,1)(2*a-1)+0.5
}),jindo.m.Effect._cubicBezier=function(b,c,d,a){return function(z){function j(f){return((q*f+n)*f+k)*f
}function m(f){return((p*f+w)*f+y)*f
}function g(f){return(3*q*f+2*n)*f+k
}function t(A,D){var E,r,C,B,o,f;
for(C=A,f=0;
8>f;
f++){if(B=j(C)-A,Math.abs(B)<D){return C
}if(o=g(C),Math.abs(o)<0.000001){break
}C-=B/o
}if(E=0,r=1,C=A,E>C){return E
}if(C>r){return r
}for(;
r>E;
){if(B=j(C),Math.abs(B-A)<D){return C
}A>B?E=C:r=C,C=0.5*(r-E)+E
}return C
}var k=3*b,n=3*(d-b)-k,q=1-k-n,y=3*c,w=3*(a-c)-y,p=1-y-w;
return m(t(z,0.005))
}},jindo.m.Effect.cubicBezier=function(b,d,g,a){var c=jindo.m.Effect(jindo.m.Effect._cubicBezier(b,d,g,a)),f="cubic-bezier("+[b,d,g,a].join(",")+")";
return c.toString=function(){return f
},c
},jindo.m.Effect.cubicEase=jindo.m.Effect.cubicBezier(0.25,0.1,0.25,1),jindo.m.Effect.cubicEaseIn=jindo.m.Effect.cubicBezier(0.42,0,1,1),jindo.m.Effect.cubicEaseOut=jindo.m.Effect.cubicBezier(0,0,0.58,1),jindo.m.Effect.cubicEaseInOut=jindo.m.Effect.cubicBezier(0.42,0,0.58,1),jindo.m.Effect.cubicEaseOutIn=jindo.m.Effect.cubicBezier(0,0.42,1,0.58),jindo.m.Effect.overphase=jindo.m.Effect(function(a){return a/=0.652785,(Math.sqrt((2-a)*a)+0.1*a).toFixed(5)
}),jindo.m.Effect.sinusoidal=jindo.m.Effect(function(a){return -Math.cos(a*Math.PI)/2+0.5
}),jindo.m.Effect.mirror=jindo.m.Effect(function(a){return jindo.m.Effect.sinusoidal(0,1)(0.5>a?2*a:1-2*(a-0.5))
}),jindo.m.Effect.pulse=function(a){return jindo.m.Effect(function(b){return -Math.cos(b*(a-0.5)*2*Math.PI)/2+0.5
})
},jindo.m.Effect.wave=function(a,b){return jindo.m.Effect(function(c){return(b||1)*Math.sin(360*a*c*Math.PI/180).toFixed(5)
})
},jindo.m.Effect.stepStart=jindo.m.Effect(function(a){return 0===a?0:1
}),jindo.m.Effect.stepEnd=jindo.m.Effect(function(a){return 1===a?1:0
}),jindo.m.Effect.easeIn=jindo.m.Effect.easeInCubic,jindo.m.Effect.easeOut=jindo.m.Effect.easeOutCubic,jindo.m.Effect.easeInOut=jindo.m.Effect.easeInOutCubic,jindo.m.Effect.easeOutIn=jindo.m.Effect.easeOutInCubic,jindo.m.Effect.bounce=jindo.m.Effect.easeOutBounce,jindo.m.Effect.elastic=jindo.m.Effect.easeInElastic,jindo.m.Morph=jindo.$Class({$init:function(b){this.option({fEffect:jindo.m.Effect.linear,bUseTransition:!0}).option(b);
var d=document.body.style;
this._bTransitionSupport="transition" in d||"webkitTransition" in d||"MozTransition" in d||"OTransition" in d||"msTransition" in d;
var f=jindo.$Agent(),a=f.os(),c=f.navigator();
this._bHasTransformRenderBug=a.ios&&5===parseInt(a.version,10)&&c.msafari,this._aQueue=[],this._aIngItem=null,this._oTimer=null,this._bPlaying=null,this._nPtr=0,this._nPausePassed=0,this._aRepeat=[],this._sTransitionEnd="webkitTransition" in d&&"webkitTransitionEnd"||"transition" in d&&"transitionend"||"MozTransition" in d&&"transitionend"||"OTransition" in d&&"oTransitionEnd"||"msTransition" in d&&"MSTransitionEnd"
},pushAnimate:function(a,b){if(b&&!(b instanceof Array)){throw Error("aLists should be a instance of Array")
}return b=[].concat(b),b.duration=a,this._aQueue.push(b),this
},pushKeyframe:function(a,b){return this._aQueue.push({action:"keyframe",args:{duration:a,keyframe:b}}),this
},pushWait:function(){for(var a=0,b=arguments.length;
b>a;
a++){var c=arguments[a];
c instanceof this.constructor?this._aQueue.push(c):this.pushAnimate(c,[])
}return this
},pushCall:function(a){return this._aQueue.push(a),this
},pushRepeatStart:function(a){"undefined"==typeof a&&(a=1);
var b="L"+Math.round((new Date).getTime()*Math.random());
return this._aRepeat.push(b),this._pushLabel(b,a),this
},_pushLabel:function(a,b){return"undefined"==typeof b&&(b=1/0),this._aQueue.push({action:"label",args:{label:a,times:b}}),this
},pushRepeatEnd:function(){var a=this,b=this._aRepeat.pop(),c=function(){var f=a._getLabelIndex(b);
if(-1===f){throw"Repeat calls don't matched."
}var d=this._aQueue[f];
d.args.count=d.args.count||0,++d.args.count<d.args.times&&a._goto(f+1)
};
return c.__repeat_end=b,this.pushCall(c),this
},_waitMorph:function(a){var b=this;
if(!a.isPlaying()){return !0
}var c=function(){a.detach("end",c).detach("pause",c),b._flushQueue()
};
return a.attach("end",c).attach("pause",c),!1
},_getLabelIndex:function(b){for(var c=null,d=0,a=this._aQueue.length;
a>d;
d++){if(c=this._aQueue[d],"label"===c.action&&c.args.label===b){return d
}}return -1
},_getRepeatEndIndex:function(b,d){for(var f=null,a=d||0,c=this._aQueue.length;
c>a;
a++){if(f=this._aQueue[a],f instanceof Function&&f.__repeat_end===b){return a
}}return -1
},_flushQueue:function(){var m,j,d,f,p,c=this;
do{if(m=!1,j=this._aIngItem=this._aQueue[this._nPtr],!j){return this._bPlaying=!1,void (j||this.fireEvent("end"))
}if(this._nPtr++,j instanceof Function){j.call(this),m=!0
}else{if(j instanceof this.constructor){m=this._waitMorph(j)
}else{if("number"!=typeof j){if("label"!==j.action){if("goto"!==j.action){if("keyframe"!==j.action){if(p=this._aCompiledItem,f=this._nPausePassed){for(var g=0,b=p.length;
b>g;
g++){p[g].sTimingFunc=""
}p.allCSS=!1
}else{p=this._aCompiledItem=this._compileItem(j)
}0!==p.length?(m=p.duration<0,m?this._processItem(1,!0):(this._playItem(f),this._nPausePassed=0)):setTimeout(function(){c._flushQueue()
},p.duration)
}else{if(d=j.args.keyframe,f=this._nPausePassed,p=this._aCompiledItem=j.args,m=p.duration<0){this._processKeyframe(1,d);
continue
}this._playKeyframe(f,d),this._nPausePassed=0
}}else{this._goto(j.args.label),m=!0
}}else{if(delete j.args.count,j.args.times<1){var k=this._getRepeatEndIndex(j.args.label,this._nPtr);
k>-1&&this._goto(k+1)
}m=!0
}}else{setTimeout(function(){c._flushQueue()
},j)
}}}}while(m)
},_playKeyframe:function(b,d){var g=this;
this._nStart=(new Date).getTime()-b;
var a=this._aCompiledItem,c=a.duration;
!function f(){g._oTimer=g._requestAnimationFrame(function(){var j=g._nStart;
if(null!==g._oTimer){g._oTimer=null;
var h=Math.min(1,Math.max(0,((new Date).getTime()-j)/c));
d.frame(h),1>h?f():(g.fireEvent("timerEnd"),g._flushQueue())
}})
}()
},_playItem:function(a){var b=this;
this._nStart=(new Date).getTime()-a,this._nIng=2,a||this._processItem(0,!0,3,!0);
var c=this._aCompiledItem;
c.allCSS?this._nIng--:this._animationLoop(!0),function(){var g=b._processItem(1,!0,1).transitionCache;
if(!g||0===c.duration){return void (0===--b._nIng&&b._flushQueue())
}for(var f=null,k=g.length,n=0;
k>n;
n++){f=g[n];
break
}var j=function(p){for(var h,o=[];
h=g.pop();
){h.css(b._getCSSKey("transitionDuration"),"0.0001ms"),o.push(h)
}g=null,(window.requestAnimationFrame||window.setTimeout)(function(){for(;
h=o.pop();
){h.css(b._getCSSKey("transitionDuration"),"0"),h.css(b._getCSSKey("transitionProperty"),"none")
}o=null
},0),b.fireEvent("transitionEnd"),0!==--b._nIng||p||b._requestAnimationFrame(function(){b._flushQueue()
})
};
if(!f){return void j()
}var m=f.$value(),d=function(h){m.removeEventListener(b._sTransitionEnd,b._fpOnTransitionEnd,!0),b._fpOnTransitionEnd=null,j(h===!0)
};
b._fpOnTransitionEnd=function(h){d(h)
},m.addEventListener(b._sTransitionEnd,b._fpOnTransitionEnd,!0)
}()
},_animationLoop:function(a){var b=this;
this._oTimer=this._requestAnimationFrame(function(){var f=b._nStart,c=b._aCompiledItem.duration;
if(null!==b._oTimer){b._oTimer=null;
var d=Math.min(1,Math.max(0,((new Date).getTime()-f)/c));
b._processItem(d,a,2),1>d?b._animationLoop():(b.fireEvent("timerEnd"),0===--b._nIng&&b._flushQueue())
}})
},_processKeyframe:function(a,b){b.preprocess().frame(a)
},_processItem:function(y,L,D,H){var z={normalPropsToPause:[],transitionCache:[]},C=z.normalPropsToPause,I=z.transitionCache,A=this._aCompiledItem,P=A.duration;
0===P?P=1:0>P&&(P=0);
var G,K,N,q,Q,M,F=this._bHasTransformRenderBug;
if(D=D||3,this.fireEvent("beforeProgress",{nRate:y})){for(var B,k,J=[],w=0;
k=A[w];
w++){G=k.oObj,K=k.welObj,N=k.oProps;
var j=k.sTimingFunc;
j&&1&D&&(K&&K.$value().clientHeight,"@transition" in N||H||("@transitionProperty" in N||K.css(this._getCSSKey("transitionProperty"),"all"),"@transitionDuration" in N||K.css(this._getCSSKey("transitionDuration"),(P/1000).toFixed(3)+"s"),"@transitionTimingFunction" in N||K.css(this._getCSSKey("transitionTimingFunction"),j)),I.push(K)),B={},J.push(G,B),H&&1===y&&"@transform" in N&&/AppleWebKit\/534\.30/.test(navigator.userAgent)&&(K.css(this._getCSSKey("transform"),""),G.clientHeight);
for(var O in N){if(N.hasOwnProperty(O)){if(q=N[O],M=/^@(.*)$/.test(O)&&RegExp.$1,Q=j&&M?1:2,!(D&Q)){continue
}if("function"==typeof q){q=q(y)
}else{if(!L){continue
}}M?(/transition/.test(O)&&(q=this._getCSSVal(q)),F&&"@transform"===O&&("@left" in N||"@top" in N)&&G.clientHeight,K.css(this._getCSSKey(M),q)):H?C.push([G,O,q]):G[O]=q,B[O]=q
}}}return this.fireEvent("progress",{aLists:J,nRate:y}),z
}},_compileItem:function(y){var L=0==y.length,D=[];
D.duration=y.duration;
for(var H,z,C,I,A,P,G,K,N=this.option("fEffect"),q=0,Q=y.length;
Q>q;
q+=2){var M=null;
H=y[q],z=jindo.$Element(H),C=y[q+1],P={};
var F=!1;
for(var B in C){if(C.hasOwnProperty(B)){var k,J;
if(A=C[B],G=/^@(.*)$/.test(B),K=RegExp.$1,A instanceof Array?(I=A[0],A=A[1]):I=G?z.css(this._getCSSKey(K)):H[B],I=0===I?I:I||"",k="function"==typeof A?A.effectConstructor:N,J=this._getEffectCSS(k)||"",/^@transform$/.test(B)){if("function"==typeof A&&(A=A.end),P[B]=this._getTransformFunction(I,A,k,H),jindo.m){var w=jindo.m.getOsInfo();
(/matrix/.test(I)||/matrix/.test(A))&&w.android&&parseFloat(w.version)<3&&(J="")
}}else{var j=/^(#|rgb|hsl|[+\-]?[0-9])/;
"function"==typeof A?("setStart" in A&&A.setStart(I),P[B]=A):P[B]=j.test(I)&&j.test(A)?k(I,A):A
}var O=P[B];
if("function"==typeof O&&O(0)===O(1)){delete P[B];
continue
}G?null===M?M=J:M!==J&&(M=""):J="",L=L||!J,F=!0
}}z.visible()||(M=null,L=!0),F&&D.push({oObj:H,welObj:z,oProps:P,sTimingFunc:M})
}return D.allCSS=!L,D
},play:function(){return this._bPlaying||(this._bPlaying=!0,this.fireEvent("play"),this._flushQueue()),this
},reset:function(){return this._goto(0)
},pause:function(b){if(!this._bPlaying){return this
}this._cancelAnimationFrame(this._oTimer),this._oTimer=null;
var g=this._aCompiledItem,k=g.duration;
if("undefined"==typeof b){var a=(new Date).getTime()-this._nStart;
b=a/k
}b=Math.max(0,Math.min(1,b));
var d=null;
if(g.keyframe?this._processKeyframe(b,g.keyframe):d=this._processItem(b,!0,3,!0).normalPropsToPause,this._nPtr--,this._nPausePassed=Math.round(k*b),this._fpOnTransitionEnd&&this._fpOnTransitionEnd(!0),d){for(var j=0,c=d.length;
c>j;
j++){var f=d[j];
f[0][f[1]]=f[2]
}}return this._bPlaying=!1,this.fireEvent("pause"),this
},_goto:function(a){var b=a;
if("number"==typeof a){a=a||0
}else{if(a=this._getLabelIndex(b),-1===a){throw"Label not found"
}a++
}return this._nPtr=a,this._nPausePassed=0,this
},isPlaying:function(){return this._bPlaying||!1
},clear:function(){return this._aQueue.length=0,this._aRepeat.length=0,this._nPtr=0,this._nPausePassed=0,this
},_getPointer:function(){return this._nPtr
},_oProperPrefix:{},_getProperPrefix:function(b){var g=this._oProperPrefix;
if(b in g){return g[b]
}for(var k,a,d=document.body.style,j=["webkit","","Moz","O","ms"],c=0,f=j.length;
f>c;
c++){if(k=j[c],a=k+(k?b.replace(/^[a-z]/,function(h){return h.toUpperCase()
}):b),a in d){return g[b]=k
}}return g[b]=""
},_getCSSKey:function(b){var c=this,d="",a=b.replace(/^(\-(webkit|o|moz|ms)\-)?([a-z]+)/,function(g,f,h,j){return d=h||c._getProperPrefix(j),d&&(j=j.replace(/^[a-z]/,function(k){return k.toUpperCase()
})),j
}).replace(/\-(\w)/g,function(f,g){return g.toUpperCase()
});
return({o:"O",moz:"Moz",webkit:"Webkit"}[d]||d)+a
},_getCSSVal:function(a){var b=this,c=a.replace(/(^|\s)(\-(webkit|moz|o|ms)\-)?([a-z]+)/g,function(f,j,d,g,h){return g=g||b._getProperPrefix(h),j+(g&&"-"+g+"-")+h
});
return c
},_parseTransformText:function(a){a=a||"";
var b={};
return a.replace(/([\w\-]+)\(([^\)]*)\)/g,function(d,g,c){var f=c.split(/\s*,\s*/);
switch(g){case"translate3d":case"scale3d":case"skew3d":g=g.replace(/3d$/,""),b[g+"Z"]=f[2];
case"translate":case"scale":case"skew":b[g+"X"]=f[0],"undefined"==typeof f[1]?"scale"===g&&(b[g+"Y"]=f[0]):b[g+"Y"]=f[1];
break;
default:b[g]=f.join(",")
}}),b
},_getMatrixObj:function(B,q){B=B.replace(/\b(translate(3d)?)\(\s*([^,]+)\s*,\s*([^,\)]+)/g,function(c,r,a,f,h){return/%$/.test(f)&&(f=parseFloat(f)/100*q.offsetWidth+"px"),/%$/.test(h)&&(h=parseFloat(h)/100*q.offsetHeight+"px"),r+"("+f+","+h
}).replace(/\b(translate([XY]))\(\s*([^\)]+)/g,function(c,h,a,f){return"X"===a&&/%$/.test(f)?f=parseFloat(f)/100*q.offsetWidth+"px":"Y"===a&&/%$/.test(f)&&(f=parseFloat(f)/100*q.offsetHeight+"px"),h+"("+f
});
var g,k=window.WebKitCSSMatrix||window.MSCSSMatrix||window.OCSSMatrix||window.MozCSSMatrix||window.CSSMatrix;
if(k){g=function(a){return new k(a).toString()
}}else{var C="M"+Math.round((new Date).getTime()*Math.random()),d=jindo.$Agent().navigator(),m=d.firefox?"moz":d.ie?"ms":"o",b="-"+m+"-transform",y=document.createElement("style");
y.type="text/css";
var j=document.getElementsByTagName("html")[0];
j.insertBefore(y,j.firstChild);
var p=y.sheet||y.styleSheet,w=document.createElement("div");
w.id=C;
var A=window.getComputedStyle(w,null);
g=function(a){var c=null;
return p.insertRule("#"+C+" { "+b+": "+a+" !important; }",0),document.body.insertBefore(w,document.body.firstChild),c=A.getPropertyValue(b),document.body.removeChild(w),p.deleteRule(0),c
}}var z=g(B);
return/^([^\(]+)\(([^\)]*)\)$/.test(z)?{key:RegExp.$1,val:RegExp.$2.replace(/\s*,\s*/g," ")}:{key:"matrix",val:"1 0 0 1 0 0"}
},_convertMatrix3d:function(a){if("matrix3d"===a.key){return a
}var b=a.val.split(" ");
return a.key="matrix3d",b.splice(2,0,"0"),b.splice(3,0,"0"),b.splice(6,0,"0"),b.splice(7,0,"0"),b.splice(8,0,"0"),b.splice(9,0,"0"),b.splice(10,0,"1"),b.splice(11,0,"0"),b.splice(14,0,"0"),b.splice(15,0,"1"),a.val=b.join(" "),a
},_getTransformFunction:function(m,j,d,f){var p,c,g;
if(/matrix/.test(m+j)){return c=this._getMatrixObj(m,f),g=this._getMatrixObj(j,f),c.key!==g.key&&(c=this._convertMatrix3d(c),g=this._convertMatrix3d(g)),d=d(c.val,g.val),function(a){return 1===a?j:c.key+"("+d(a).replace(/ /g,",")+")"
}}c=this._parseTransformText(m),g=this._parseTransformText(j);
var b={};
for(p in c){c.hasOwnProperty(p)&&(b[p]=d(c[p],g[p]||(/^scale/.test(p)?1:0)))
}for(p in g){!g.hasOwnProperty(p)||p in c||(b[p]=d(c[p]||(/^scale/.test(p)?1:0),g[p]))
}var k=function(a){var h=[];
for(var o in b){b.hasOwnProperty(o)&&h.push(o+"("+b[o](a)+")")
}return h.join(" ")
};
return k
},_getEffectCSS:function(a){var b=this.option("bUseTransition")&&this._bTransitionSupport;
if(!b){return null
}if(this._htEventHandler.progress&&this._htEventHandler.progress.length||this._htEventHandler.beforeProgress&&this._htEventHandler.beforeProgress.length){return null
}switch(a){case jindo.m.Effect.linear:return"linear";
case jindo.m.Effect.cubicEase:return"ease";
case jindo.m.Effect.cubicEaseIn:return"ease-in";
case jindo.m.Effect.cubicEaseOut:return"ease-out";
case jindo.m.Effect.cubicEaseInOut:return"ease-in-out";
default:if(a.cubicBezier&&Math.max.apply(Math,a.cubicBezier)<=1&&Math.min.apply(Math,a.cubicBezier)>=0){return"cubic-bezier("+a.cubicBezier.join(",")+")"
}}return null
},_requestAnimationFrame:function(b){var c,d=this,a=function(){c===d._oLastRAF&&(d._oLastRAF=null,b())
};
return c=window.requestAnimationFrame?requestAnimationFrame(a):setTimeout(a,1000/60),this._oLastRAF=c
},_cancelAnimationFrame:function(a){var b;
return b=window.cancelAnimationFrame?cancelAnimationFrame(a):clearTimeout(a),this._oLastRAF=null,b
}}).extend(jindo.m.Component),jindo.m.Animation=jindo.$Class({$init:function(a){this.option({bUseH:!0,bHasOffsetBug:!1,fEffect:jindo.m.Effect.cubicEaseOut,bUseCss3d:jindo.m.useCss3d(),bUseTimingFunction:jindo.m.useTimingFunction()}),this.option(a||{}),this._initVar()
},_initVar:function(){this.sCssPrefix=jindo.m.getCssPrefix(),this._htTans=this.option("bUseCss3d")?{open:"3d(",end:",0)"}:{open:"(",end:")"},this._oMorph=new jindo.m.Morph({fEffect:this.option("fEffect"),bUseTransition:this.option("bUseTimingFunction")}).attach({end:jindo.$Fn(function(a){this._oMorph.clear(),this.fireEvent("end",a)
},this).bind()}),this._welTarget=null
},setStyle:function(){},move:function(){},getTarget:function(a){return a?this._welTarget:this._welTarget.$value()
},p:function(a){return jindo.m._toPrefixStr(a)
},getTranslate:function(a,b){return"translate"+this._htTans.open+a+","+b+this._htTans.end
},toCss:function(b){var d,f,a,c={};
for(d in b){f=d,/^@/.test(d)&&(d.match(/^(@\w)/),a=RegExp.$1,/transition|transform/.test(f)?(f=""==this.sCssPrefix?d.replace(a,a.toLowerCase()):d.replace(a,a.toUpperCase()),f=f.replace("@",this.sCssPrefix)):f=f.replace("@","")),c[f]=b[d]
}return c
},isPlaying:function(){return this._oMorph.isPlaying()
},stop:function(a){"undefined"==typeof a&&(a=0),this._oMorph.pause(a).clear()
},destroy:function(){this._oMorph.detachAll("end")
}}).extend(jindo.m.UIComponent),jindo.m.LayerEffect=jindo.$Class({$init:function(a,b){this.option({nDuration:250,fEffect:jindo.m.Effect.linear,bActivateOnload:!0}),this._initVar(),!arguments[0]||"string"!=typeof arguments[0]&&1!=arguments[0].nodeType?this.option(arguments[0]||{}):(this.setLayer(a),this.option(b||{})),this._initTransition(),this.option("bActivateOnload")&&this.activate()
},_htEffect:{expand:"jindo.m.ExpandEffect",contract:"jindo.m.ContractEffect",fade:"jindo.m.FadeEffect",pop:"jindo.m.PopEffect",slide:"jindo.m.SlideEffect",flip:"jindo.m.FlipEffect"},_initVar:function(){this._htEffectInstance={},this._htLayerInfo={},this._htWElement={},this._htCurrentTask={},this.bAndroid=jindo.m.getDeviceInfo().android,this.sClassHighligting="_effct_hide_highlighting_tmp"
},_initTransition:function(){this._oMorph=new jindo.m.Morph({fEffect:this.option("fEffect")||(this.option("sEffect")?this._getEffect(this.option("sEffect")):null),bUseTransition:jindo.m.useTimingFunction()})
},_getEffect:function(a){var b=jindo.m.Effect.cubicEaseInOut;
switch(a){case"linear":b=jindo.m.Effect.linear;
break;
case"ease":b=jindo.m.Effect.cubicEase;
break;
case"ease-in":b=jindo.m.Effect.cubicEaseIn;
break;
case"ease-out":b=jindo.m.Effect.cubicEaseOut;
break;
case"ease-in-out":b=jindo.m.Effect.cubicEaseInOut
}return b
},_createEffect:function(sType){if(this._htEffect[sType]&&!this._htEffectInstance[sType]){try{this._htEffectInstance[sType]=eval("new "+this._htEffect[sType]+"()")
}catch(e){}this._htEffectInstance[sType].setLayerInfo(this._htLayerInfo)
}},_createFunc:function(){for(var a=["slide","pop","flip","fade","expand","contract"],b=0,c=a.length;
c>b;
b++){this[a[b]]=function(d){return function(g){var h=d;
if("string"==typeof arguments[0]||1==arguments[0].nodeType){this.setLayer(arguments[0]);
var f=arguments[2]||{};
f.sDirection=arguments[1],this._run(h,f)
}else{this._run(h,g)
}}
}(a[b])
}},isPlaying:function(){return this._oMorph.isPlaying()
},_fireCustomEvent:function(a,b){return this.fireEvent(a,b)
},_run:function(b,g){if(this._isAvailableEffect()){this._createEffect(b),"undefined"==typeof g&&(g={});
var k=this._htEffectInstance[b],a=this.getLayer(),d="undefined"==typeof g.nDuration?this.option("nDuration"):parseInt(g.nDuration,10),j=k.getBeforeCommand(a,g),c=k.getCommand(a,g);
if(this._htCurrentTask=g,this._htCurrentTask.elLayer=a,this._htCurrentTask.sTaskName=c.sTaskName,this._htCurrentTask.nDuration=d,this._fireCustomEvent("beforeEffect",{elLayer:a,sEffect:c.sTaskName,nDuration:d})){j&&this._oMorph.pushAnimate(-1,[this.getLayer(),j.htStyle]);
var f=this;
g.sEffect&&this._oMorph.pushCall(function(){this.option({fEffect:f._getEffect(g.sEffect)})
}),d=0==d?-1:d,this._oMorph.pushAnimate(d,[this.getLayer(),c.htStyle]),c.fCallback&&("function"==typeof c.fCallback?this._oMorph.pushCall(function(){c.fCallback()
}):"object"==typeof c.fCallback&&this._oMorph.pushAnimate(-1,[this.getLayer(),c.fCallback.htStyle||{}])),this._oMorph.play()
}}},setLayer:function(a){this._htWElement.el=jindo.$(a),this._htWElement.wel=jindo.$Element(this._htWElement.el);
var b;
if(this.bAndroid&&(b=jindo.$$.getSingle("."+this.sClassHighligting,this._htWElement.el),!b)){var c='<a href="javascript:void(0)" style="position:absolute" class="'+this.sClassHighligting+'"></a>';
b=jindo.$(c),this._htWElement.wel.append(b),b.style.opacity="0",b.style.width=0,b.style.height=0,b.style.left="-1000px",b.style.top="-1000px"
}this.setSize()
},stop:function(a){"undefined"==typeof a&&(a=!0),this._oMorph&&this._oMorph.pause(a)
},clearEffect:function(a){this._oMorph&&(this.stop(a),this._oMorph.clear())
},getLayer:function(){return this._htWElement.el
},setSize:function(){var a=this._htWElement.el.cloneNode(!0),b=jindo.$Element(a);
b.opacity(0),this._htWElement.wel.after(b),b.show(),this._htLayerInfo.nWidth=this._htWElement.wel.width(),this._htLayerInfo.nHeight=this._htWElement.wel.height(),b.css({position:"absolute",top:"0px",left:"0px"}),this._htLayerInfo.nMarginLeft=parseInt(b.css("marginLeft"),10),this._htLayerInfo.nMarginTop=parseInt(b.css("marginTop"),10),this._htLayerInfo.nMarginLeft=isNaN(this._htLayerInfo.nMarginLeft)?0:this._htLayerInfo.nMarginLeft,this._htLayerInfo.nMarginTop=isNaN(this._htLayerInfo.nMarginTop)?0:this._htLayerInfo.nMarginTop,this._htLayerInfo.nOpacity=this._htWElement.wel.opacity(),this._htLayerInfo.sPosition=this._htWElement.wel.css("position");
var c=this._htWElement.wel.css("display");
c="none"===c||0===c.length?"block":c,this._htLayerInfo.sDisplay=c,this._htLayerInfo.sClassHighligting=this.sClassHighligting,b.leave(),this._setEffectLayerInfo()
},_setEffectLayerInfo:function(){for(var a in this._htEffectInstance){this._htEffectInstance[a].setLayerInfo(this._htLayerInfo)
}},_onTransitionEnd:function(){this._htCurrentTask&&this._fireCustomEvent("afterEffect",{elLayer:this._htCurrentTask.elLayer,sEffect:this._htCurrentTask.sTaskName,nDuration:this._htCurrentTask.nDuration})
},_onTransitionStop:function(a){a.sTaskName&&this._fireCustomEvent("stop",{elLayer:this._htCurrentTask.elLayer,sEffect:this._htCurrentTask.sTaskName,nDuration:this._htCurrentTask.nDuration})
},_isAvailableEffect:function(){return this.isActivating()
},_onActivate:function(){this._attachEvent(),this._createFunc()
},_onDeactivate:function(){this._detachEvent()
},_attachEvent:function(){this._htEvent={},this._htEvent.end=jindo.$Fn(this._onTransitionEnd,this).bind(),this._htEvent.stop=jindo.$Fn(this._onTransitionStop,this).bind(),this._oMorph&&this._oMorph.attach({end:this._htEvent.end,stop:this._htEvent.stop})
},_detachEvent:function(){this._htEvent=null
},destroy:function(){this.deactivate();
for(var a in this._htWElement){this._htWElement[a]=null
}this._htWElement=null
}}).extend(jindo.m.UIComponent),jindo.m._Effect_=jindo.$Class({$init:function(){this._sCssPrefix=jindo.m.getCssPrefix();
var a=jindo.m.getDeviceInfo();
this.bIos=a.iphone||a.ipad,this.bIos3=a.iphone&&a.version.length>0&&"3"==a.version.substring(0,1),this.bAndroid=a.android,this.bAndroid3Up=a.android&&a.version.length>0&&a.version.substring(0,1)>="3",this.bAndroid2_1=a.android&&a.version.length>0&&"2.1"===a.version,this.sTranOpen=this.bIos?"translate3d(":"translate(",this.sTranEnd=this.bIos?",0px)":")",this._initVar()
},_initVar:function(){this._htLayerInfo={}
},setLayerInfo:function(a){this._htLayerInfo={};
for(var b in a){this._htLayerInfo[b]=a[b]
}},getTranslateStyle:function(b,c){var d=c||{};
for(var a in b){d["@"+a]=b[a]
}return d
},getTransitionTask:function(){return null
},getBeforeCommand:function(){return null
},getCommand:function(){return null
}}),jindo.m.FadeEffect=jindo.$Class({sEffectName:"fade",getCommand:function(b,f){f.htTo||(f.htTo={}),f.nDistance&&(f.htTo.opacity=f.nDistance);
var j=f.sDirection?f.sDirection:"in",a=f.htTo||{},d="in"==j?1:0;
a.opacity="undefined"!=typeof a.opacity?a.opacity:d;
var g={};
"out"==j&&(g.htStyle={},g.htStyle["@display"]="none",g.htStyle["@opacity"]=this._htLayerInfo.nOpacity);
var c={};
return this.getTranslateStyle(a,c),{sTaskName:this.sEffectName+"-"+j,htStyle:c,fCallback:g}
},getBeforeCommand:function(b,d){var g=d.sDirection?d.sDirection:"in",a=d.htFrom||{},c="in"==g?0:1;
a.display=this._htLayerInfo.sDisplay,a.opacity="undefined"==typeof a.opacity?c:a.opacity;
var f={};
return this.getTranslateStyle(a,f),{htStyle:f,htTransform:{}}
}}).extend(jindo.m._Effect_),jindo.m.Touch=jindo.$Class({$init:function(a,b){this._el=jindo.$(a);
var c={nMomentumDuration:350,nMoveThreshold:7,nSlopeThreshold:25,nLongTapDuration:1000,nDoubleTapDuration:400,nTapThreshold:6,nPinchThreshold:0.1,nRotateThreshold:5,nEndEventThreshold:0,bActivateOnload:!0,bVertical:!0,bHorizental:!1};
this.option(c),this.option(b||{}),this._initVariable(),this._setSlope(),this.option("bActivateOnload")&&this.activate()
},_initVariable:function(){if(this._hasTouchEvent=!1,this._htEventName=jindo.m._getTouchEventName(),this._htEventName.start.indexOf("touch")>-1){this._hasTouchEvent=!0
}else{if(this._htEventName.start.indexOf("MSPointer")>-1&&"undefined"!=typeof this._el.style.msTouchAction){var a="none";
this.option("bHorizental")&&!this.option("bVertical")&&(a="pan-y"),this.option("bVertical")&&!this.option("bHorizental")&&(a="pan-x"),this._el.style.msTouchAction=a
}}this._radianToDegree=180/Math.PI,this._htMoveInfo={nStartX:0,nStartY:0,nBeforeX:0,nBeforeY:0,nStartTime:0,nBeforeTime:0,nStartDistance:0,nBeforeDistance:0,nStartAngle:0,nLastAngle:0},this.nStart=0,this.bMove=!1,this.nMoveType=-1,this.htEndInfo={},this._nVSlope=0,this._nHSlope=0,this.bSetSlope=!1
},_attachEvents:function(){this._htEvent={};
this._hasTouchEvent;
this._htEvent[this._htEventName.start]={fn:jindo.$Fn(this._onStart,this).bind(),el:this._el},this._htEvent[this._htEventName.move]={fn:jindo.$Fn(this._onMove,this).bind(),el:this._el},this._htEvent[this._htEventName.end]={fn:jindo.$Fn(this._onEnd,this).bind(),el:this._el},this._htEvent.rotate=jindo.$Fn(this._onResize,this).bind(),jindo.m.bindRotate(this._htEvent.rotate),this._htEventName.cancel&&(this._htEvent[this._htEventName.cancel]={fn:jindo.$Fn(this._onCancel,this).bind(),el:this._el});
for(var a in this._htEvent){this._htEvent[a].fn&&(this._htEvent[a].ref=jindo.m._attachFakeJindo(this._htEvent[a].el,this._htEvent[a].fn,a))
}},_detachEvents:function(){for(var a in this._htEvent){var b=this._htEvent[a];
b.ref&&b.ref.detach(b.el,a)
}jindo.m.unbindRotate(this._htEvent.rotate),this._htEvent=null
},_onCancel:function(a){this._onEnd(a)
},_onStart:function(a){var b=this._getTouchInfo(a);
if(this.nStart=b.length,!(b.length>1)){this.bMove&&this._resetTouchInfo();
var c={element:b[0].el,nX:b[0].nX,nY:b[0].nY,oEvent:a};
this._fireCustomEvent("touchStart",c)&&(this._htMoveInfo.nStartX=b[0].nX,this._htMoveInfo.nBeforeX=b[0].nX,this._htMoveInfo.nStartY=b[0].nY,this._htMoveInfo.nBeforeY=b[0].nY,this._htMoveInfo.nStartTime=b[0].nTime,this._htMoveInfo.aStartInfo=b,this._startLongTapTimer(b,a))
}},_onMove:function(b){if(!(this.nStart<=0)){this.bMove=!0;
var d=this._getTouchInfo(b),f=this._getCustomEventParam(d,!1);
if(1===d.length){if(this.nMoveType<0||3==this.nMoveType||4==this.nMoveType){var a=this._getMoveType(d);
(4!=this.nMoveType||3!=a)&&(this.nMoveType=a)
}}else{8!==this.nMoveType&&(this.nMoveType=this._getMoveType(d))
}f=this._getCustomEventParam(d,!1),"undefined"!=typeof this._nLongTapTimer&&3!=this.nMoveType&&this._deleteLongTapTimer(),f.oEvent=b;
var c=0;
if(c=0==this.nMoveType?Math.abs(f.nVectorX):1==this.nMoveType?Math.abs(f.nVectorY):Math.abs(f.nVectorX)+Math.abs(f.nVectorY),!(c<this.option("nMoveThreshold"))){if(!this.fireEvent("touchMove",f)){return void (this.nStart=0)
}this._htMoveInfo.nBeforeX=d[0].nX,this._htMoveInfo.nBeforeY=d[0].nY,this._htMoveInfo.nBeforeTime=d[0].nTime
}}},_onEnd:function(b){var d=this._getTouchInfo(b);
if(this.nStart-=d.length,!(this.nStart>0)){var f=this;
this._deleteLongTapTimer(),this._deleteEndEventTimer(),this.bMove||4==this.nMoveType||(this.nMoveType=3),this._isDblTap(d[0].nX,d[0].nY,d[0].nTime)&&(clearTimeout(this._nTapTimer),delete this._nTapTimer,this.nMoveType=5);
var a=this._getCustomEventParam(d,!0);
a.oEvent=b;
var c=a.sMoveType;
"undefined"!=typeof this._htEventHandler[jindo.m.MOVETYPE[5]]&&this._htEventHandler[jindo.m.MOVETYPE[5]].length>0&&3==this.nMoveType?this._nTapTimer=setTimeout(function(){f.fireEvent("touchEnd",a),f._fireCustomEvent(c,a),delete f._nTapTimer
},this.option("nDoubleTapDuration")):(this.fireEvent("touchEnd",a),4!=this.nMoveType&&(8===this.nMoveType?(a.sMoveType=jindo.m.MOVETYPE[6],this._fireCustomEvent(jindo.m.MOVETYPE[6],a),a.sMoveType=jindo.m.MOVETYPE[7],this._fireCustomEvent(jindo.m.MOVETYPE[7],a)):setTimeout(function(){f._fireCustomEvent(c,a)
},0))),this._updateTouchEndInfo(d),this._resetTouchInfo()
}},_startEndEventTimer:function(a){var b=this;
this._nEndEventTimer=setTimeout(function(){b._onEnd(a),delete b._nEndEventTimer
},b.option("nEndEventThreshold"))
},_deleteEndEventTimer:function(){"undefined"!=typeof this._nEndEventTimer&&(clearTimeout(this._nEndEventTimer),delete this._nEndEventTimer)
},_fireCustomEvent:function(a,b){return this.fireEvent(a,b)
},_getCustomEventParam:function(j,F){var z=jindo.m.MOVETYPE[this.nMoveType],C=j[0].nTime-this._htMoveInfo.nStartTime,k=0,y=0,D=0,q=0,I=0,B=0,E=0,H=0;
E=1===this.nMoveType?0:j[0].nX-this._htMoveInfo.nStartX,H=0===this.nMoveType?0:j[0].nY-this._htMoveInfo.nStartY,k=j[0].nX-this._htMoveInfo.nBeforeX,y=j[0].nY-this._htMoveInfo.nBeforeY,!F||0!=this.nMoveType&&1!=this.nMoveType&&2!=this.nMoveType||C<=this.option("nMomentumDuration")&&(I=Math.abs(E)/C,D=I*I/2,B=Math.abs(H)/C,q=B*B/2);
var g={element:j[0].el,nX:j[0].nX,nY:j[0].nY,nVectorX:k,nVectorY:y,nDistanceX:E,nDistanceY:H,sMoveType:z,nStartX:this._htMoveInfo.nStartX,nStartY:this._htMoveInfo.nStartY,nStartTimeStamp:this._htMoveInfo.nStartTime};
if((j.length>1||this.nMoveType>=6)&&(g.nScale=this._getScale(j),g.nRotation=this._getRotation(j),null===g.nScale&&(g.nScale=this._htMoveInfo.nBeforeScale),null===g.nRotation&&(g.nRotation=this._htMoveInfo.nBeforeRotation)),j.length>=1){for(var J=[],G=[],A=[],w=0,b=j.length;
b>w;
w++){J.push(j[w].nX),G.push(j[w].nY),A.push(j[w].el)
}g.aX=J,g.aY=G,g.aElement=A
}return F&&(g.nMomentumX=D,g.nMomentumY=q,g.nSpeedX=I,g.nSpeedY=B,g.nDuration=C),g
},_updateTouchEndInfo:function(a){this.htEndInfo={element:a[0].el,time:a[0].nTime,movetype:this.nMoveType,nX:a[0].nX,nY:a[0].nY}
},_deleteLongTapTimer:function(){"undefined"!=typeof this._nLongTapTimer&&(clearTimeout(this._nLongTapTimer),delete this._nLongTapTimer)
},_startLongTapTimer:function(a,b){var c=this;
"undefined"!=typeof this._htEventHandler[jindo.m.MOVETYPE[4]]&&this._htEventHandler[jindo.m.MOVETYPE[4]].length>0&&(c._nLongTapTimer=setTimeout(function(){c.fireEvent("longTap",{element:a[0].el,oEvent:b,nX:a[0].nX,nY:a[0].nY}),delete c._nLongTapTimer,c.nMoveType=4
},c.option("nLongTapDuration")))
},_onResize:function(){this._setSlope()
},_isDblTap:function(a,b){if("undefined"!=typeof this._nTapTimer&&3==this.nMoveType){var c=this.option("nTapThreshold");
if(Math.abs(this.htEndInfo.nX-a)<=c&&Math.abs(this.htEndInfo.nY-b)<=c){return !0
}}return !1
},_setSlope:function(){this.bSetSlope||(this._nHSlope=1*(window.innerHeight/2/window.innerWidth).toFixed(2),this._nVSlope=1*(window.innerHeight/(window.innerWidth/2)).toFixed(2))
},setSlope:function(a,b){this._nHSlope=b,this._nVSlope=a,this.bSetSlope=!0
},getSlope:function(){return{nVSlope:this._nVSlope,nHSlope:this._nHSlope}
},_resetTouchInfo:function(){for(var a in this._htMoveInfo){this._htMoveInfo[a]=0
}this._deleteLongTapTimer(),this.nStart=0,this.bMove=!1,this.nMoveType=-1
},_getMoveTypeBySingle:function(b,g){var k=this.nMoveType,a=Math.abs(this._htMoveInfo.nStartX-b),d=Math.abs(this._htMoveInfo.nStartY-g),j=a+d,c=this.option("nTapThreshold");
if(k=c>=a&&c>=d?3:-1,this.option("nSlopeThreshold")<=j){var f=parseFloat((d/a).toFixed(2),10);
k=-1===this._nHSlope&&-1===this._nVSlope?2:f<=this._nHSlope?0:f>=this._nVSlope?1:2
}return k
},_getMoveTypeByMulti:function(){var a=-1;
return(6===this.nMoveType||Math.abs(1-this._htMoveInfo.nBeforeScale)>=this.option("nPinchThreshold"))&&(a=6),(7===this.nMoveType||Math.abs(0-this._htMoveInfo.nBeforeRotation)>=this.option("nRotateThreshold"))&&(a=6===a?8:7),-1===a?this.nMoveType:a
},_getScale:function(a){var b=-1,c=this._getDistance(a);
return 0>=c?null:(0===this._htMoveInfo.nStartDistance?(b=1,this._htMoveInfo.nStartDistance=c):b=c/this._htMoveInfo.nStartDistance,this._htMoveInfo.nBeforeScale=b,b)
},_getRotation:function(a){var b=-1,c=this._getAngle(a);
return null===c?null:(0===this._htMoveInfo.nStartAngle?(this._htMoveInfo.nStartAngle=c,b=0):b=c-this._htMoveInfo.nStartAngle,this._htMoveInfo.nLastAngle=c,this._htMoveInfo.nBeforeRotation=b,b)
},_getMoveType:function(a){var b=this.nMoveType;
return 1===a.length?b=this._getMoveTypeBySingle(a[0].nX,a[0].nY):2===a.length&&(b=this._getMoveTypeByMulti(a)),b
},_getDistance:function(a){return 1===a.length?-1:Math.sqrt(Math.pow(Math.abs(a[0].nX-a[1].nX),2)+Math.pow(Math.abs(a[0].nY-a[1].nY),2))
},_getAngle:function(b){if(1===b.length){return null
}var f=b[0].nX-b[1].nX,j=b[0].nY-b[1].nY,a=Math.atan2(j,f)*this._radianToDegree;
if(null!==this._htMoveInfo.nLastAngle){var d=Math.abs(this._htMoveInfo.nLastAngle-a),g=a+360,c=a-360;
Math.abs(g-this._htMoveInfo.nLastAngle)<d?a=g:Math.abs(c-this._htMoveInfo.nLastAngle)<d&&(a=c)
}return a
},_getTouchInfo:function(b){var d=[],g=b.$value().timeStamp;
if(this._hasTouchEvent){var a=b.$value().touches;
a=a.length>1?a:b.$value().changedTouches;
for(var c=0,f=a.length;
f>c;
c++){d.push({el:jindo.m.getNodeElement(a[c].target),nX:a[c].pageX,nY:a[c].pageY,nTime:g})
}}else{d.push({el:b.element,nX:b.pos().pageX,nY:b.pos().pageY,nTime:g})
}return d
},getBaseElement:function(){return this._el
},_onDeactivate:function(){this._detachEvents()
},_onActivate:function(){this._attachEvents()
},destroy:function(){var a;
this.deactivate(),this._el=null;
for(a in this._htMoveInfo){this._htMoveInfo[a]=null
}this._htMoveInfo=null;
for(a in this.htEndInfo){this.htEndInfo[a]=null
}this.htEndInfo=null,this.nStart=0,this.bMove=null,this.nMoveType=null,this._nVSlope=null,this._nHSlope=null,this.bSetSlope=null
}}).extend(jindo.m.UIComponent),jindo.m.SwipeCommon=jindo.$Class({$init:function(){this.option({bActivateOnload:!0,bUseHighlight:!0,bUseDiagonalTouch:!0,bUseMomentum:!0,nDeceleration:0.0006,bAutoResize:!0,fEffect:jindo.m.Effect.cubicEaseOut,bUseCss3d:jindo.m.useCss3d(),bUseTimingFunction:jindo.m.useTimingFunction(),nZIndex:2000})
},_getAnimationOption:function(a){return jindo.$Jindo.mixin({bUseH:this._bUseH,bHasOffsetBug:this._hasOffsetBug(),fEffect:this.option("fEffect"),bUseCss3d:this.option("bUseCss3d"),bUseTimingFunction:this.option("bUseTimingFunction")},a||{})
},_initVar:function(){this._htWElement={},this._bUseH=!1,this._bUseV=!1,this._nX=0,this._nY=0,this._bUseDiagonalTouch=this.option("bUseDiagonalTouch"),this._bClickBug=jindo.m.hasClickBug(),this._htOffsetBug={hasBug:jindo.m.hasOffsetBug()&&this.option("bUseHighlight"),timer:-1,elDummyTag:null},this._htSize={viewWidth:0,viewHeight:0,contWidth:0,contHeight:0,maxX:0,maxY:0},this._isStop=!1,this._oTouch=null,this._oAnimation=null
},_setWrapperElement:function(a){this._htWElement.view=jindo.$Element(a),this._htWElement.base=jindo.$Element(this._htWElement.view.query("."+this.option("sClassPrefix")+"base")),this._htWElement.container=this._htWElement.base?this._htWElement.base.query("."+this.option("sClassPrefix")+"container"):this._htWElement.view.query("."+this.option("sClassPrefix")+"container")||this._htWElement.view.first(),this._htWElement.container=jindo.$Element(this._htWElement.container),this._htWElement.view.css({overflow:"hidden",zIndex:this.option("nZIndex")}),this._htWElement.base&&this._htWElement.base.css({position:"relavite"}),this._htWElement.container.css({left:"0px",top:"0px"}),this._createOffsetBugDummyTag()
},_onActivate:function(){this._oTouch||(this._oTouch=new jindo.m.Touch(this._htWElement.view.$value(),{nMoveThreshold:0,nUseDiagonal:0,bVertical:this.bUseH,bHorizental:!this.bUseH,nMomentumDuration:200,nTapThreshold:1,nSlopeThreshold:5,nEndEventThreshold:jindo.m.getDeviceInfo().win8?100:0,bActivateOnload:!1})),this._attachEvent(),this._attachAniEvent(),this._oTouch.activate()
},_onDeactivate:function(){this._detachEvent(),this._detachAniEvent(),this._oTouch.deactivate(),this._oAnimation&&this._oAnimation.deactivate()
},_attachEvent:function(){this._htEvent={},this._htEvent.touchStart=jindo.$Fn(this._onStart,this).bind(),this._htEvent.touchMove=jindo.$Fn(this._onMove,this).bind(),this._htEvent.touchEnd=jindo.$Fn(this._onEnd,this).bind(),this._oTouch.attach({touchStart:this._htEvent.touchStart,touchMove:this._htEvent.touchMove,touchEnd:this._htEvent.touchEnd}),this.option("bAutoResize")&&(this._htEvent.resize=jindo.$Fn(this._onResize,this).bind(),jindo.m.bindRotate(this._htEvent.resize),jindo.m.bindPageshow(this._htEvent.resize))
},_detachEvent:function(){this._oTouch.detachAll(),this.option("bAutoResize")&&(jindo.m.unbindRotate(this._htEvent.resize),jindo.m.unbindPageshow(this._htEvent.resize))
},_getX:function(a){return a>=0?0:a<=this._htSize.maxX?this._htSize.maxX:a
},_getY:function(a){return a>=0?0:a<=this._htSize.maxY?this._htSize.maxY:a
},_attachAniEvent:function(){this._oAnimation&&(this._htEvent.endAni=jindo.$Fn(this._onEndAniImpl,this).bind(),this._oAnimation.attach({end:this._htEvent.endAni}))
},_detachAniEvent:function(){this._oAnimation&&this._oAnimation.detachAll()
},set:function(){var a=Array.prototype.slice.apply(arguments);
return a.length>=1&&(this._oAnimation=a.shift(),this._oAnimation.setStyle(a),this._attachAniEvent()),this._oAnimation
},getAnimation:function(){return this._oAnimation
},isPlaying:function(){return this._oAnimation?this._oAnimation.isPlaying():!1
},isAnimating:this.isPlaying,refresh:function(){},resize:function(){var b=this._htWElement.view,d=this._htWElement.container,g=parseInt(b.css("borderLeftWidth"),10),a=parseInt(b.css("borderRightWidth"),10),c=parseInt(b.css("borderTopWidth"),10),f=parseInt(b.css("borderBottomWidth"),10);
g=isNaN(g)?0:g,a=isNaN(a)?0:a,c=isNaN(c)?0:c,f=isNaN(f)?0:f,this._htSize.viewWidth=b.width()-g-a,this._htSize.viewHeight=b.height()-c-f,this._htSize.contWidth=d.width(),this._htSize.contHeight=d.height()
},_calcMomentum:function(p,k,d,g,q,c){var j=this.option("nDeceleration"),b=d/j,m=0,f=0;
return p>0&&b>g?(f=c/(6/(b/k*j)),g+=f,k=k*g/b,b=g):0>p&&b>q&&(f=c/(6/(b/k*j)),q+=f,k=k*q/b,b=q),b*=0>p?-1:1,m=k/j,{nDist:b,nTime:Math.round(m)}
},_onStart:function(a){return this.isPlaying()?void a.oEvent.stop():(this._clearOffsetBug(),void (this.fireEvent("beforeTouchStart",a)?(this._isStop=!1,this._startImpl(a),this.fireEvent("touchStart",jindo.$Jindo.mixin(a,{}))||a.stop()):a.stop()))
},_onMove:function(a){if(this._clearOffsetBug(),this._bClickBug&&this._htWElement.container.css("pointerEvents","none"),this.fireEvent("beforeTouchMove",a)){var b=this._preventSystemEvent(a);
b&&!this.isPlaying()&&this._moveImpl(a),b||this.fireEvent("scroll");
var c=jindo.$Jindo.mixin(a,{});
c.bPreventDefaultEvent=b,this.fireEvent("touchMove",c)||a.stop()
}else{a.stop()
}},_onEnd:function(a){this.isPlaying()||(this._isStop||this._clearOffsetBug(),this.fireEvent("beforeTouchEnd",a)?(a.sMoveType===jindo.m.MOVETYPE[3]||a.sMoveType===jindo.m.MOVETYPE[4]||a.sMoveType===jindo.m.MOVETYPE[5]?this._isStop?a.oEvent.stop(jindo.$Event.CANCEL_ALL):this._tapImpl&&this._tapImpl():this._endImpl(a),this.fireEvent("touchEnd",jindo.$Jindo.mixin(a,{}))||a.stop()):a.stop(),this._bClickBug&&this._htWElement.container.css("pointerEvents","auto"))
},_preventSystemEvent:function(a){var b=a.oEvent;
return a.sMoveType===jindo.m.MOVETYPE[0]?this._bUseH?(b.stop(),!0):!1:a.sMoveType===jindo.m.MOVETYPE[1]?this._bUseV?(b.stop(),!0):!1:a.sMoveType===jindo.m.MOVETYPE[2]?this._bUseDiagonalTouch?(b.stop(),!0):!1:a.sMoveType===jindo.m.MOVETYPE[6]||a.sMoveType===jindo.m.MOVETYPE[7]||a.sMoveType===jindo.m.MOVETYPE[8]?(b.stop(),!0):(b.stop(),!0)
},_onResize:function(a){"rotate"===a.sType?this.fireEvent("rotate",{isVertical:a.isVertical})&&this._resizeImpl(a):this._resizeImpl(a)
},_getMomentumData:function(b,d,g){var a={nDist:0,nTime:0},c={nDist:0,nTime:0},f={momentumX:b.nMomentumX,momentumY:b.nMomentumY,distanceX:b.nDistanceX,distanceY:b.nDistanceY,x:this._nX,y:this._nY,nextX:this._nX,nextY:this._nY};
return this.option("bUseMomentum")&&(b.nMomentumX&&b.nMomentumX>d||b.nMomentumY&&b.nMomentumY>d)?(this._bUseH&&(a=this._calcMomentum(b.nDistanceX,b.nSpeedX,b.nMomentumX,-this._nX,-this._htSize.maxX+this._nX,g?this._htSize.viewWidth:0)),this._bUseV&&(c=this._calcMomentum(b.nDistanceY,b.nSpeedY,b.nMomentumY,-this._nY,-this._htSize.maxY+this._nY,g?this._htSize.viewHeight:0)),f.nextX=this._nX+a.nDist,f.nextY=this._nY+c.nDist,f.duration=Math.max(Math.max(a.nTime,c.nTime),10),f.duration=jindo.m.getOsInfo().android?0.7*f.duration:f.duration):f.duration=0,f
},_makeStylePos:function(b){var d=this.getAnimation(),f=jindo.m.getTranslateOffset(b),a=jindo.m.getStyleOffset(b),c={top:f.top+a.top+"px",left:f.left+a.left+"px"};
c[d.p("Transform")]=d.getTranslate("0px","0px"),b.css(c),this._htOffsetBug.elDummyTag.focus()
},_createOffsetBugDummyTag:function(){this._hasOffsetBug()&&(this._htOffsetBug.elDummyTag=jindo.$$.getSingle("._offsetbug_dummy_atag_",this._htWElement.view.$value()),this._htOffsetBug.elDummyTag||(this._htOffsetBug.elDummyTag=jindo.$("<a href='javascript:void(0);' style='position:absolute;height:0px;width:0px;' class='_offsetbug_dummy_atag_'></a>"),this._htWElement.view.append(this._htOffsetBug.elDummyTag)))
},_clearOffsetBug:function(){this._hasOffsetBug()&&(clearTimeout(this._htOffsetBug.timer),this._htOffsetBug.timer=-1)
},_fixOffsetBugImpl:function(){if(this._hasOffsetBug()){var a=this,b=this.getAnimation().getTarget(!0);
this._clearOffsetBug(),this._htOffsetBug.timer=setTimeout(function(){b&&a._makeStylePos(b)
},200)
}},_hasOffsetBug:function(){return this._htOffsetBug.hasBug
},destroy:function(){var a;
this.deactivate();
for(a in this._htWElement){this._htWElement[a]=null
}this._htWElement=null;
for(a in this._htEvent){this._htEvent[a]=null
}this._htEvent=null,this._oTouch&&this._oTouch.destroy(),this._oAnimation&&this._oAnimation.destroy()
}}).extend(jindo.m.UIComponent),jindo.m.Flick=jindo.$Class({$init:function(){this.option({bHorizontal:!0,sClassPrefix:"flick-",sContentClass:"ct",bUseCircular:!1,nTotalContents:3,nFlickThreshold:40,nDuration:100,nBounceDuration:100,fpPanelEffect:jindo.m.Effect.cubicEaseIn,nDefaultIndex:0,bFitContentSize:!0,nDeceleration:0.001,bUseMomentum:!1})
},_initVar:function(){jindo.m.SwipeCommon.prototype._initVar.apply(this),this._bUseH=this.option("bHorizontal"),this._bUseV=!this._bUseH,this._bUseCircular=this.option("bUseCircular"),this._nContentIndex=0,this._welElement=null,this._aPos=[],this._nRange=null,this._nDefaultPanel=3,this._hasKitkatHighlightBug=jindo.m._hasKitkatHighlightBug(),this._nKitkatHighlightBug=-1
},_setWrapperElement:function(a){jindo.m.SwipeCommon.prototype._setWrapperElement.call(this,a);
var b=this.option("bHorizontal")?"height":"width";
this._htWElement.aPanel=this._htWElement.container.queryAll("."+this.option("sClassPrefix")+this.option("sContentClass"));
var c=jindo.$A(this._htWElement.aPanel);
this._bUseCircular||(c=c.filter(function(d){return jindo.$Element(d).visible()
})),this._htWElement.container.css({position:"relative"}).css(b,"100%"),this._htWElement.aPanel=c.forEach(function(f,g,d){d[g]=jindo.$Element(f).css(b,"100%")
}).$value()
},_checkIndex:function(a){var b=!0,c=this.getTotalContents()-1;
return(isNaN(1*a)||0>a)&&(b=!1),a>c&&(b=!1),b
},_refreshPanelInfo:function(){var b=0;
this._aPos=[0];
for(var c=0,d=this._bUseH?"width":"height",a=this.getTotalContents();
a>c;
c++){b-=null!=this._nRange?this._nRange:this._htWElement.aPanel[c][d](),this._aPos.push(b)
}},_onActivate:function(){jindo.m.SwipeCommon.prototype._onActivate.apply(this)
},_onDeactivate:function(){jindo.m.SwipeCommon.prototype._onDeactivate.apply(this)
},set:function(){if(!this._oAnimation){jindo.m.SwipeCommon.prototype.set.apply(this,Array.prototype.slice.apply(arguments)),this._bUseCircular?this.option("nTotalContents",parseInt(this.option("nTotalContents"),10)):this.option("nTotalContents",this._htWElement.aPanel.length);
var a=this.option("nDefaultIndex");
this._checkIndex(a)||(a=0),this.resize(),this.refresh(a)
}return this._oAnimation
},refresh:function(a,b,c){jindo.m.SwipeCommon.prototype.refresh.call(this),a="undefined"==typeof a?this.getContentIndex():a,this._hasKitkatHighlightBug&&this._htWElement.container.addClass(jindo.m.KITKAT_HIGHLIGHT_CLASS),this._moveTo(a,{duration:0,fireEvent:b,fireMoveEvent:c,corrupt:!0})
},resize:function(){jindo.m.SwipeCommon.prototype.resize.call(this),this.option("bFitContentSize")||this._bUseCircular?(this._nRange=this._bUseH?this._htSize.viewWidth:this._htSize.viewHeight,0==this._nRange&&(this._nRange=this._htWElement.view[this._bUseH?"width":"height"]())):this._nRange=null,this._refreshPanelInfo(),null!=this._nRange&&(this._bUseH?(this._htSize.maxX=(this.option("nTotalContents")-1)*-this._nRange,this._nX=this._aPos[this.getContentIndex()]):(this._htSize.maxY=(this.option("nTotalContents")-1)*-this._nRange,this._nY=this._aPos[this.getContentIndex()]))
},getElement:function(){var a=this.getContentIndex();
return this._bUseCircular?this._welElement?this._welElement:(a%=this._nDefaultPanel,this._htWElement.aPanel[a]):this._htWElement.aPanel[a]
},getNextElement:function(){var a;
return this._bUseCircular?(a=this._getIndexByElement(this.getElement()),a=((a+1)%this._nDefaultPanel>this._nDefaultPanel-1?0:a+1)%this._nDefaultPanel):a=this.getNextIndex(),this._htWElement.aPanel[a]
},getPrevElement:function(){var a;
return this._bUseCircular?(a=this._getIndexByElement(this.getElement()),a=0>a-1?this._nDefaultPanel-1:a-1):a=this.getPrevIndex(),this._htWElement.aPanel[a]
},_getIndexByElement:function(a){var b=-1;
return jindo.$A(this._htWElement.aPanel).forEach(function(d,c){d.isEqual(a)&&(b=c)
}),b
},getContentIndex:function(){return parseInt(this._nContentIndex,10)
},getNextIndex:function(){var a=this.getContentIndex()+1,b=this.getTotalContents()-1;
return this._bUseCircular&&a>b&&(a=0),Math.min(b,a)
},getPrevIndex:function(){var a=this.getContentIndex()-1;
return this._bUseCircular&&0>a&&(a=this.getTotalContents()-1),Math.max(0,a)
},getTotalContents:function(){return this._bUseCircular?this.option("nTotalContents"):this._htWElement.aPanel.length
},setTotalContents:function(a){isNaN(a)||1>a||(a=parseInt(a,10),this.getContentIndex()+1>a&&this._moveTo(a-1,{duration:0,fireEvent:!0,fireMoveEvent:!0}),this.option("nTotalContents",a),this.resize())
},getTotalPanels:function(){return this._htWElement.aPanel.length
},getPanels:function(){return this._htWElement.aPanel
},moveTo:function(a,b){return a!=this.getContentIndex()?this._moveTo(a,{duration:b}):void 0
},_moveTo:function(b,g){if(!(null==this._nRange&&this._aPos.indexOf(this._bUseH?this._htSize.maxX:this._htSize.maxY)<b)){var k={duration:"undefined"==typeof g.duration?this.option("nDuration"):g.duration,fireEvent:"undefined"==typeof g.fireEvent?!0:g.fireEvent,fireMoveEvent:"undefined"==typeof g.fireMoveEvent?!1:g.fireMoveEvent,corrupt:"undefined"==typeof g.corrupt?!1:g.corrupt,direct:"undefined"==typeof g.direct?!1:g.direct};
if(!(this.isPlaying()||isNaN(b)||0>b||b>=this.getTotalContents())){var a=this._bUseH?this._nX:this._nY,d=this._getPos(b);
if(this._bUseCircular){var j=this._posToIndex(a),c=this.getTotalContents();
0==j&&b==c-1?this.option("nTotalContents")>=3&&(d=this._nRange):j==c-1&&0==b&&(d=this._getPos(j)-this._nRange)
}if(a!=d){this._move(a,d,{duration:k.duration,contentsNextIndex:b,fireEvent:k.fireEvent,fireMoveEvent:k.fireMoveEvent,corrupt:k.corrupt,direct:g.direct})
}else{if(0===k.duration&&k.fireEvent){if(k.fireMoveEvent){this._fireMoveEvent(b)&&this._fireMoveEvent()
}else{var f={next:null,moveCount:0,corrupt:k.corrupt,contentsNextIndex:b};
this._fireFlickingEvent("beforeFlicking",f)&&(this._fireFlickingEvent("flicking",f),this._fireFlickingEvent("afterFlicking",f))
}}}}}},moveNext:function(a){var b={duration:a,direct:!1};
if(this._bUseCircular&&this.option("nTotalContents")<3){var c=this.getContentIndex();
this._bUseH?this._nX=0==c?1:this._nX-1:this._nY=0==c?1:this._nY-1,b.direct=!0
}this._moveTo(this.getNextIndex(),b)
},movePrev:function(a){var b={duration:a,direct:!1};
if(this._bUseCircular&&this.option("nTotalContents")<3){var c=this.getContentIndex();
b.direct=!0,this._bUseH?this._nX=0==c?this._aPos[this.getTotalContents()-1]-1:this._nX+1:this._nY=0==c?this._aPos[this.getTotalContents()-1]-1:this._nY+1,this._moveTo(this.getNextIndex(),b)
}else{this._moveTo(this.getPrevIndex(),b)
}},_startImpl:function(){this.isPlaying()||(this._nPosToIndex=this._posToIndex(this._bUseH?this._nX:this._nY))
},_moveImpl:function(b){var d=this._bUseH?b.nVectorX:b.nVectorY,g=this._bUseH?b.nDistanceX:b.nDistanceY,a=0>g,c=this._bUseH?this._nX:this._nY,f=a?this.getNextIndex():this.getPrevIndex();
return c+=this._bUseCircular?d:f==this.getContentIndex()?d/2:d,this._nX=this._bUseH?c:0,this._nY=this._bUseV?c:0,b.bNext=a,this._moveAfterCall&&this._moveAfterCall(b),a
},_endImpl:function(p){var k=null,d=(this._bUseH?p.nDistanceX:p.nDistanceY)<0,g=this.getContentIndex(),q=d?this.getNextIndex():this.getPrevIndex(),c=this._getPos(g),j=Math.abs((this._bUseH?this._nX:this._nY)-c),b=g===q||j<parseInt(this.option("nFlickThreshold"),10)||this._aPos.indexOf(this._bUseH?this._htSize.maxX:this._htSize.maxY)<q;
if(0!=j){if(b){this._restore()
}else{if(k=this._getMomentumData(p,1.5),0===k.duration||d&&g===this.getTotalContents()-1||!d&&0===g){var m=this._bUseH?this._nX:this._nY;
(d&&m<this._aPos[q]||!d&&m>this._aPos[q])&&(this._bUseCircular&&this.option("nTotalContents")<3?0!=g||1!=q||d||(this._bUseH?this._nX=this._aPos[this.getTotalContents()-1]-1:this._nY=this._aPos[this.getTotalContents()-1]-1):this._setCurrentPos(g,d)),this._moveTo(null==this._nRange?this._getNextIndexByView(g,d):q,{duration:this.option("nDuration"),direct:!0})
}else{var f=this._posToIndex(this._bUseH?k.nextX:k.nextY);
f==g?this._restore():(this._bUseCircular?(g+=d?1:-1,this._setCurrentPos(g,d)):this._setCurrentPos(g,d),this._moveTo(f,{duration:k.duration}))
}}}},_getNextIndexByView:function(a,b){return b?this.getNextIndex():this.getPrevIndex()
},_setCurrentPos:function(a){this._bUseH?this._nX=this._aPos[a]:this._nY=this._aPos[a]
},_resizeImpl:function(){this.resize()
},_restore:function(){if(this._bUseH||this._bUseV){var a,b,c=this._getPos(this.getContentIndex());
a=jindo.m.getTranslateOffset(jindo.m.CoverFlicking&&this instanceof jindo.m.CoverFlicking?this.getElement(this.getContentIndex()):this._htWElement.container),b=this._bUseH?a.left:a.top,c!==b&&this._move(b,c,{duration:this.option("nBounceDuration"),restore:!0})
}},_getRevisionNo:function(a){var b=this.getTotalContents();
return 0>a?a+=b:a>b-1&&(a%=b),a
},_fireCustomBeforeEvent:function(a){if(a.restore){if(!this._fireRestoreEvent("beforeRestore",a)){return !1
}}else{if(a.fireMoveEvent){if(0==a.moveIndex&&!this._fireMoveEvent(a.contentsNextIndex)){return !1
}}else{if(!this._fireFlickingEvent("beforeFlicking",a)){return !1
}}}return !0
},_setPanelEndInfo:function(a){a.restore?(this._nX=this._bUseH?this._getPos(a.no):0,this._nY=this._bUseV?this._getPos(a.no):0):(a.no=this._getRevisionNo(a.no),this._updateFlickInfo(a.no,a.next?this.getNextElement():this.getPrevElement()))
},_fireCustomEvent:function(a){a.restore?this._fireRestoreEvent("restore",a):a.fireMoveEvent?(0===a.duration||a.moveCount==a.moveIndex+1)&&this._fireMoveEvent():(this._fireFlickingEvent("flicking",a),this._fireFlickingEvent("afterFlicking",a))
},_fireFlickingEvent:function(b,c){if("undefined"==typeof this._htEventHandler[b]){return !0
}var d={nContentsIndex:this.getContentIndex(),bNext:c.next};
/before/.test(b)&&(d.nContentsNextIndex=c.direct||0===c.duration&&c.moveCount>1?c.contentsNextIndex:c.next?this.getNextIndex():this.getPrevIndex()),d.nMoveMargin=c.moveMargin,d.nMoveCount=c.moveCount,d.bCorrupt=c.corrupt,d[this._bUseH?"bLeft":"bTop"]=d.bNext;
var a=this.fireEvent(b,d);
return c.moveMargin=d.nMoveMargin,a
},_fireRestoreEvent:function(a){return this.fireEvent(a,{nContentsIndex:this.getContentIndex()})
},_fireMoveEvent:function(a){return"undefined"==typeof a?this.fireEvent("move",{nContentsIndex:this.getContentIndex()}):this.fireEvent("beforeMove",{nContentsIndex:this.getContentIndex(),nContentsNextIndex:a})
},_updateFlickInfo:function(a,b){this._nContentIndex="undefined"==typeof a?this.getContentIndex():a,b="undefined"==typeof b?this.getElement():b,this._nX=this._bUseH?this._getPos(this._nContentIndex):0,this._nY=this._bUseV?this._getPos(this._nContentIndex):0,this._welElement=b
},_onEndAniImpl:function(){this._bUseCircular
},_makeOption:function(a){var b=jindo.$Jindo.mixin({duration:0,restore:!1,fireEvent:!0,fireMoveEvent:!1,moveCount:1,moveIndex:0,corrupt:!1,moveMargin:0,useCircular:this._bUseCircular,range:this._nRange},a||{});
return b.restore&&(b.moveCount=0),b.moveCount>1&&0===b.duration&&(b.corrupt=!0),b.direct=b.direct||jindo.m.SlideFlicking&&this instanceof jindo.m.SlideFlicking&&"undefined"==typeof this._htEventHandler.beforeFlicking&&"undefined"==typeof this._htEventHandler.flicking&&"undefined"==typeof this._htEventHandler.afterFlicking,b
},_moveWithEvent:function(b,d,f){var a=this,c={};
return f.no=this._posToIndex(b),c=jindo.$Jindo.mixin(f,{}),!c.fireMoveEvent&&c.moveCount>1&&(c.contentsNextIndex=c.no),a._panelEndBeforeCall&&a._panelEndBeforeCall(c),this._oAnimation._oMorph.pushCall(function(){if(c.fireEvent&&!a._fireCustomBeforeEvent(c)){this.clear(),a._restore()
}else{try{var g=parseInt(this._parseTransformText(this._aQueue[1][1]["@transform"]).translateX);
g+=c.next?-c.moveMargin:c.moveMargin,this._aQueue[1][1]["@transform"]=a._getTranslate(g+"px")
}catch(h){}}}),this._oAnimation.move(this._bUseH?b:0,this._bUseV?b:0,d,c),this._oAnimation._oMorph.pushCall(function(){a._setPanelEndInfo(c),a._panelEndAfterCall&&a._panelEndAfterCall(c),c.fireEvent&&a._fireCustomEvent(c)
}),this._oAnimation._oMorph
},_move:function(w,p,d){if(!this._bUseCircular){var j=this._bUseH?this._htSize.maxX:this._htSize.maxY;
p=j>p?j:p
}if(w!==p){this._clearOffsetBug();
var y=w>p,c=this._getStepCount(w,p);
if(d=d||{},d.moveCount=c,d.next=y,d=this._makeOption(d),d.restore){return void this._moveWithEvent(p,d.duration,d).play()
}if(0==d.duration){this._moveWithEvent(p,0,d).play()
}else{if(d.direct){this._moveWithEvent(p,d.duration,d).play()
}else{for(var k=0,b=w,q=0,g=this.option("fpPanelEffect")(0,d.duration),m=0;
c>m;
m++){d.moveIndex=m,q=this._getPanelEndPos(b,p,y),k=g((m+1)/c)-g(m/c),this._moveWithEvent(q,k,d),b=q
}}this._oAnimation._oMorph.play()
}}},_getPos:function(a){return 0>a||a>=this._aPos.length?(console.error("wrong index",a),0):this._aPos[a]
},_isPosPoint:function(a){return -1!=this._aPos.indexOf(a)
},_getStepCount:function(b,d){var g=b>d,a=this._posToIndex(b),c=this._posToIndex(d),f=Math.abs(c-a);
return g||this._isPosPoint(b)||!this._isPosPoint(d)||f++,f
},_posToIndex:function(b){for(var d,f=0,a=-1,c=this._aPos.length;
c>f;
f++){if(d=this._aPos[f],!(d>b)){if(b==d){a++;
break
}break
}a++
}return a
},_getPanelEndPos:function(b,d,f){var a,c=this._posToIndex(b);
return !f&&!this._isPosPoint(b)&&c++,c+=f?1:-1,a=this._bUseCircular&&0>c?b+d:this._getPos(c),null==this._nRange&&f&&(a=d>a?d:a),a
},_getTranslate:function(a){return this._oAnimation.getTranslate(this._bUseH?a:0,this._bUseV?a:0)
},_tapImpl:function(){if(this._hasKitkatHighlightBug){this._htWElement.container.removeClass(jindo.m.KITKAT_HIGHLIGHT_CLASS),this._htWElement.container._element.clientHeight;
var a=this;
clearTimeout(this._nKitkatHighlightBug),this._nKitkatHighlightBug=setTimeout(function(){a._htWElement.container.addClass(jindo.m.KITKAT_HIGHLIGHT_CLASS)
},200)
}},destroy:function(){jindo.m.SwipeCommon.prototype.destroy.apply(this)
}}).extend(jindo.m.SwipeCommon),jindo.m.LayerPosition=jindo.$Class({$init:function(a,b,c){arguments.length<3&&(!b||b&&!b.nodeType&&"string"!=typeof b)?(this._setBaseLayer(document.body),c=b||{},b=a):this._setBaseLayer(a),this.option({bActivateOnload:!0,bAutoReposition:!0,sPosition:"center",nLeftMargin:0,nRightMargin:0,nTopMargin:0,nBottomMargin:0,bUseFixed:!0}),this.option(c||{}),this._initVar(),this._setWrapperElement(b),this.option("bActivateOnload")&&this.activate()
},isUseFixed:function(){return this._bUseFixedProperty
},_onActivate:function(){this._isVertical=jindo.m.isVertical(),this.option("bAutoReposition")&&this._attachEvent(),this.setPosition()
},_onDeactivate:function(){this.option("bAutoReposition")&&this._detachEvent()
},_initVar:function(){var a=this.option("nLeftMargin"),b=this.option("nTopMargin");
this._htMargin={nLeft:a,nRight:this.option("nRightMargin"),nTop:b,nBottom:this.option("nBottomMargin")},this._sPosition=this.option("sPosition"),this._htOldPosition={nTop:null,nLeft:null,nBottom:null},this._htPosition={nTop:null,nLeft:null,nBottom:null},this._bUseFixedProperty=this.option("bAutoReposition")&&this.option("bUseFixed")&&jindo.m._isUseFixed(),this._isVertical=null,this._hasOrientationChange=jindo.m.getDeviceInfo().ipad||jindo.m.getDeviceInfo().iphone||jindo.m.getDeviceInfo().bChrome,this._nPreWidth=-1
},getPosition:function(){return this._sPosition
},getMargin:function(){return this._htMargin
},getLayer:function(){return this._htWElement.element.$value()
},getCurrentPosition:function(){return this._htPosition
},_setWrapperElement:function(a){this._htWElement={},this.setLayer(a)
},setLayer:function(a){return this._htWElement.element=jindo.$Element(a),this._bUseFixedProperty?this._htWElement.element.css("position","fixed"):this._htWElement.element.css("position","absolute"),this._htWElement.element.parent().isEqual(document.body)||this._htWElement.element.appendTo(document.body),this
},top:function(a){this.setPosition("top",a)
},bottom:function(a){this.setPosition("bottom",a)
},center:function(a){this.setPosition("center",a)
},all:function(a){this.setPosition("all",a)
},_fixedLayerSize:function(b,d){var g=parseInt(this._htMargin.nLeft,10),a=parseInt(this._htMargin.nTop,10),c={"padding-top":parseInt(this._htWElement.element.css("padding-top"),10),"padding-bottom":parseInt(this._htWElement.element.css("padding-bottom"),10),"padding-left":parseInt(this._htWElement.element.css("padding-left"),10),"padding-right":parseInt(this._htWElement.element.css("padding-right"),10)},f={"border-top-width":parseInt(this._htWElement.element.css("border-top-width"),10),"border-bottom-width":parseInt(this._htWElement.element.css("border-bottom-width"),10),"border-left-width":parseInt(this._htWElement.element.css("border-left-width"),10),"border-right-width":parseInt(this._htWElement.element.css("border-right-width"),10)};
return b-=c["padding-left"]+c["padding-right"]+f["border-left-width"]+f["border-right-width"]+g+parseInt(this._htMargin.nRight,10),d-=c["padding-top"]+c["padding-bottom"]+f["border-top-width"]+f["border-bottom-width"]+a+parseInt(this._htMargin.nBottom,10),this._htWElement.element.css({width:b+"px",height:d+"px"}),{nTop:a,nLeft:g}
},_setBaseLayer:function(a){return this._wel=this._el=jindo.$(a),this._el&&(this._wel=jindo.$Element(a)),this
},getBaseLayer:function(){return this._el
},_getPosition:function(){var p,k=this.getBaseLayer(),d=jindo.$Element(k),g=this.getLayer(),q=d.offset(),c=k.offsetWidth,j=k.offsetHeight,b=g.offsetWidth,m=g.offsetHeight,f={nTop:q.top,nLeft:q.left};
if(k==document.body&&(p=jindo.$Document().clientSize(),c=p.width,j=p.height),b+=parseInt(this._htWElement.element.css("marginLeft"),10)+parseInt(this._htWElement.element.css("marginRight"),10)||0,m+=parseInt(this._htWElement.element.css("marginTop"),10)+parseInt(this._htWElement.element.css("marginBottom"),10)||0,"all"===this._sPosition){q=this._fixedLayerSize(c,j)
}else{switch(q.nLeft=f.nLeft+parseInt((c-b)/2,10)+parseInt(this._htMargin.nLeft,10),this._sPosition){case"top":q.nTop=f.nTop+parseInt(this._htMargin.nTop,10);
break;
case"center":q.nTop=f.nTop+parseInt((j-m)/2,10)+parseInt(this._htMargin.nTop,10);
break;
case"bottom":q.nTop=f.nTop+parseInt(j-m,10)-parseInt(this._htMargin.nBottom,10)
}this._bUseFixedProperty||(q=this._adjustScrollPosition(q))
}return q
},_adjustScrollPosition:function(a){var b=jindo.$Document().scrollPosition();
return a.nTop+=b.top,a.nLeft+=b.left,a
},setPosition:function(a,b){if(this.isActivating()&&(this._htMargin=b||this._htMargin,this._sPosition=a||this._sPosition,this._fireEvent("beforePosition"))){var c=this._htWElement.element.visible();
c||this._htWElement.element.css({left:"-9999px"}).show(),this._htOldPosition=this._htPosition,this._htPosition=this._getPosition(),c||this._htWElement.element.hide(),c&&this._htOldPosition.nLeft===this._htPosition.nLeft&&this._htOldPosition.nTop===this._htPosition.nTop&&this._htOldPosition.nBottom===this._htPosition.nBottom||("undefined"==typeof this._htPosition.nTop?this._htWElement.element.$value().style.top=null:"undefined"==typeof this._htPosition.nBottom&&(this._htWElement.element.$value().style.bottom=null),this._htWElement.element.css({left:this._htPosition.nLeft+"px",top:this._htPosition.nTop+"px",bottom:this._htPosition.nBottom+"px"})),this._fireEvent("position")
}},_attachEvent:function(){this._htEvent={},this._htEvent.actionEvent=jindo.$Fn(this._onEvent,this),this._htEvent.pageShow=jindo.$Fn(this._onPageShow,this).bind(),this._bUseFixedProperty?this._htEvent.actionEvent.attach(window,"resize"):this._htEvent.actionEvent.attach(window,"scroll").attach(window,"resize"),jindo.m.bindPageshow(this._htEvent.pageShow),this._hasOrientationChange&&(this._htEvent.rotate=jindo.$Fn(this._onOrientationChange,this).attach(window,"orientationchange"))
},_detachEvent:function(){this._htEvent.actionEvent.detach(window,"scroll").detach(window,"resize"),jindo.m.unbindPageshow(this._htEvent.pageShow),this._hasOrientationChange&&this._htEvent.rotate.detach(window,"orientationchange"),this._htEvent=null
},_onEvent:function(){jindo.m._isUseFixed()&&jindo.m.getDeviceInfo().android&&this._htWElement.element.css("left",this._htWElement.element.css("left")),this._htWElement.element.visible()&&this.setPosition()
},_onOrientationChange:function(){if(this._htWElement.element.visible()){var a=this;
window.innerWidth<this._htWElement.element.width()?(this._nPreWidth=this._htWElement.element.width(),this._htWElement.element.width(window.innerWidth)):-1!==this._nPreWidth&&this._htWElement.element.width(this._nPreWidth),this._htWElement.element.hide(),this.setPosition(),jindo.m.getDeviceInfo().android&&!jindo.m.getDeviceInfo().bChrome?this._htWElement.element.show():setTimeout(function(){a.setPosition(),a._htWElement.element.show()
},10)
}},_onPageShow:function(){this.isActivating()&&this.setPosition()
},_fireEvent:function(a){return this.fireEvent(a,{elLayer:this.getLayer(),htMargin:this.getMargin(),htPosition:this.getCurrentPosition()})
},destroy:function(){this.deactivate();
for(var a in this._htWElement){this._htWElement[a]=null
}delete this._htWElement,delete this._htMargin,delete this._sPosition,delete this._htPosition,delete this._htOldPosition,delete this._bUseFixedProperty
}}).extend(jindo.m.UIComponent),jindo.m.ScrollEnd=jindo.$Class({$init:function(a){this._initVar(),this._setWrapperElement(a),this._attachEvent()
},_initVar:function(){this._nType=this._getDetectType(),this._bIOS=jindo.m.getDeviceInfo().iphone||jindo.m.getDeviceInfo().ipad,2===this._nType&&(this._nScrollTimer=-1),this._isTouched=!1,this._isMoved=!1,this._nObserver=null,this._nScrollEndTimer=null,this._nPreLeft=null,this._nPreTop=null,this._bMoveIOS=0
},_getDetectType:function(){var a=0;
return jindo.m.getDeviceInfo().android?a=parseInt(jindo.m.getDeviceInfo().version,10)>=3?2:1:jindo.m.getDeviceInfo().win&&parseInt(jindo.m.getDeviceInfo().version,10)>=8&&(a=2),a
},_setWrapperElement:function(){this._htElement={},this._htElement.body=document.body
},_attachEvent:function(){this._htEvent={},this._htEvent.event_scroll={ref:jindo.$Fn(this._onScroll,this).attach(window,"scroll"),el:window},0==this._nType&&this._bIOS&&(this._htEvent.event_touchmove={ref:jindo.$Fn(this._onMoveForIOS,this).attach(this._htElement.body,"touchmove"),el:this._htElement.body}),1==this._nType&&(this._htEvent.event_touchstart={ref:jindo.$Fn(this._onStartForAndroid,this).attach(this._htElement.body,"touchstart"),el:this._htElement.body},this._htEvent.event_touchmove={ref:jindo.$Fn(this._onMoveForAndroid,this).attach(this._htElement.body,"touchmove"),el:this._htElement.body},this._htEvent.event_touchend={ref:jindo.$Fn(this._onEndForAndroid,this).attach(this._htElement.body,"touchend"),el:this._htElement.body})
},_onMoveForIOS:function(){this._bMoveIOS=0
},_detachEvent:function(){for(var a in this._htEvent){var b=this._htEvent[a];
b.ref.detach(b.el,a.substring(a.lastIndexOf("_")))
}},_startObserver:function(){var a=this;
this._stopObserver(),this._nObserver=setInterval(function(){a._observe()
},100)
},_observe:function(){this._isTouched||this._nPreTop!==window.pageYOffset||this._nPreLeft!==window.pageXOffset?(this._nPreTop=window.pageYOffset,this._nPreLeft=window.pageXOffset):(this._stopObserver(),this._fireEventScrollEnd())
},_stopObserver:function(){clearInterval(this._nObserver),this._nObserver=null
},_onScroll:function(){switch(this._nType){case 0:if(this._bIOS&&this._bMoveIOS>0){return !1
}this._fireEventScrollEnd(),this._bMoveIOS++;
break;
case 1:this._startObserver();
break;
case 2:var a=this;
clearTimeout(this._nScrollTimer),this._nScrollTimer=setTimeout(function(){a._fireEventScrollEnd()
},350)
}},_onStartForAndroid:function(){this._isTouched=!0,this._isMoved=!1,this._nPreTop=null,this._nPreLeft=null
},_onMoveForAndroid:function(){this._isMoved=!0
},_onEndForAndroid:function(){this._isTouched=!1,this._isMoved&&this._startObserver()
},_fireEventScrollEnd:function(){this.fireEvent("scrollEnd",{nTop:window.pageYOffset,nLeft:window.pageXOffset})
},_fireEventScrollEndForAndroid:function(){var a=this;
clearTimeout(this._nScrollEndTimer),this._nScrollEndTimer=setTimeout(function(){a._fireEventScrollEnd()
},500)
},destroy:function(){this._detachEvent(),this._nType=-1,this._isTouched=null,this._isMoved=null,this._nObserver=null,this._nPreLeft=null,this._nPreTop=null
}}).extend(jindo.m.Component),jindo.m.SlideEffect=jindo.$Class({sEffectName:"slide",getCommand:function(H,B){B.nDistance&&(B.nSize=B.nDistance);
var k,y,I,j=B.sDirection?B.sDirection:"left",z=jindo.m.getCssOffset(H),b=z.left,E=z.top;
if(k="undefined"!=typeof B.nSize?B.nSize:this._htLayerInfo.nWidth,y="undefined"!=typeof B.nSize?B.nSize:this._htLayerInfo.nHeight,("up"==j||"down"==j)&&(E+="up"==j?-1*y:y),("left"==j||"right"==j)&&(b+="left"==j?-1*k:k),"undefined"!=typeof B.elBaseLayer){b=0,E=0;
var w=jindo.$Element(B.elBaseLayer);
I=jindo.$Element(H),y="undefined"!=typeof B.nSize?B.nSize:w.height(),k="undefined"!=typeof B.nSize?B.nSize:w.width(),("up"==j||"down"==j)&&(E="down"==j?-1*y:y),("left"==j||"right"==j)&&(b="left"==j?k:-1*k),b=-1*b,E=-1*E
}var A=this._htLayerInfo.sPosition,D=this.bAndroid,G=this.bAndroid3Up,F=this._htLayerInfo.sClassHighligting,C=this.bAndroid2_1;
I=jindo.$Element(H);
var q=B.htTo||{};
q.transform=this.sTranOpen+b+"px, "+E+"px"+this.sTranEnd;
var g={};
return this.getTranslateStyle(q,g),{sTaskName:this.sEffectName+"-"+j,htStyle:g,fCallback:function(){var d=jindo.m.getCssOffset(H),m=1*I.css("top").replace("px",""),a=1*I.css("left").replace("px","");
m=isNaN(m)?0:m,a=isNaN(a)?0:a,"relative"==A?I.css("position","relative"):I.css("position","absolute");
var f=jindo.m.getCssPrefix();
if(I.css(f+"Transform",""),G&&I.offset(),I.$value().style.top=parseInt(m+d.top,10)+"px",I.$value().style.left=parseInt(d.left+a,10)+"px",D&&!G){var c=jindo.$$.getSingle("."+F,I.$value());
c&&(C?setTimeout(function(){c.focus()
},5):c.focus())
}}}
},getBeforeCommand:function(z,q){var g=q.sDirection?q.sDirection:"left",k=q.htFrom||{},A=jindo.$Element(z);
if("undefined"!=typeof q.elBaseLayer){var d=jindo.$Element(q.elBaseLayer);
if(!d.isParentOf(A)){d.append(A);
var m=A.css("position");
"relative"!=m&&"absolute"!=m&&A.css("position","absolute"),A.css("opacity",0)
}var b=0,y=0,j=d.height(),p=d.width();
("up"==g||"down"==g)&&(y="down"==g?-1*j:j),("left"==g||"right"==g)&&(b="left"==g?p:-1*p),d.css("overflow","hidden"),k.left=b+"px",k.top=y+"px",k.opacity=this._htLayerInfo.nOpacity
}var w={};
return this.getTranslateStyle(k,w),{htStyle:w}
}}).extend(jindo.m._Effect_),jindo.m.FloatingLayer=jindo.$Class({$init:function(a,b){this.option({bActivateOnload:!0,sPosition:"bottom",sDirection:"up",nSlideDuration:500,sSlideTimingFunction:"ease-in-out",nFadeInDuration:0,sFadeInTimingFunction:"ease-in-out",nFadeOutDuration:200,sFadeOutTimingFunction:"ease-in-out",bUseHideUI:!0,bUseFixed:!1,nTimeout:-1}),this.option(b||{}),this._initVar(),this._setWrapperElement(a),this.option("bActivateOnload")&&this.activate()
},_initVar:function(){this._oFloatingEffect=null,this._oFadeinEffect=null,this._oLayerPosition=null,this._oScrollEnd=null,this._nTimeoutTimer=-1,this._isFixed=!1,this._isLayerOn=!1,this._isMoving=!1
},_setWrapperElement:function(a){this._htWElement={},this._htWElement.element=jindo.$Element(a),this._htWElement.viewElement=jindo.$Element(this._createView())
},_initComponent:function(){var a=this,b=this._htWElement.element.$value();
this._oLayerPosition=new jindo.m.LayerPosition(this._htWElement.viewElement,{sPosition:this.option("sPosition"),bActivateOnload:!1,bUseFixed:this.option("bUseFixed"),bAutoReposition:!0}),this._oFloatingEffect=new jindo.m.LayerEffect(b),this.option("bUseHideUI")&&0!==this.option("nFadeInDuration")&&(this._oFadeinEffect=new jindo.m.LayerEffect(this._htWElement.viewElement.$value(),{nDuration:this.option("nFadeInDuration")}).attach("afterEffect",function(){a._startHideTimer()
})),this._isFixed=this._oLayerPosition.isUseFixed(),this._oScrollEnd=new jindo.m.ScrollEnd
},getLayer:function(){return this._htWElement.element.$value()
},_createView:function(){var b=this._htWElement.element.visible(),d="_"+Math.floor(10000*Math.random()),f=jindo.$Element("<div class='_floatingLayer_view_divtag"+d+"' style='display:none;'>"),a="",c="";
return b||this._htWElement.element.css({left:"-9999px"}).show(),a=-1!=this._htWElement.element.css("width").indexOf("%")?this._htWElement.element.css("width"):this._htWElement.element.width()+"px",c=-1!=this._htWElement.element.css("height").indexOf("%")?this._htWElement.element.css("height"):this._htWElement.element.height()+"px",f.css({width:a,height:c,zIndex:2050}),b||this._htWElement.element.hide(),f
},resize:function(a,b){this._htWElement.viewElement.css({width:a+"px",height:b+"px"}),this._oLayerPosition.setPosition()
},show:function(){this._fireEvent("beforeShow")&&(this._oLayerPosition.isActivating()||this._oLayerPosition.activate(),this._setFloatingEffect(!0),this._htWElement.element.show(),this._htWElement.viewElement.show(),this._oFloatingEffect.slide({sDirection:this.option("sDirection"),nDuration:this.option("nSlideDuration"),sTransitionTimingFunction:this.option("sSlideTimingFunction"),elBaseLayer:this._htWElement.viewElement.$value()}))
},hide:function(){this._fireEvent("beforeHide")&&(this._stopHideTimer(),this._oLayerPosition.isActivating()&&this._oLayerPosition.deactivate(),this._detachFloatingEvent(),this._setFloatingEffect(!1),0!==this.option("nFadeOutDuration")?this._oFloatingEffect.fade({sDirection:"out",nDuration:this.option("nFadeOutDuration"),sTransitionTimingFunction:this.option("sFadeOutTimingFunction")}):(this._htWElement.viewElement.hide(),this._fireEvent("hide")))
},_fireEvent:function(a){return this.fireEvent(a,{welLayer:this._htWElement.element})
},_startHideTimer:function(){if(this.option("nTimeout")>-1){var a=this;
this._stopHideTimer(),this._nTimeoutTimer=setTimeout(function(){a.hide()
},this.option("nTimeout"))
}},_stopHideTimer:function(){clearTimeout(this._nTimeoutTimer),this._nTimeoutTimer=-1
},_onTouchStart:function(a){this._initFloatingData(),this._isLayer(a.element)?(this._isLayerOn=!0,this._htWElement.viewElement.show()):(this._htWElement.viewElement.hide(),this._htWElement.viewElement.css("left",this._htWElement.viewElement.css("left")+"px"))
},_onScrollEnd:function(){this.option("bUseHideUI")?this._isFixed?this._startHideTimer():this._runFadeIn():(this._oLayerPosition.setPosition(),this._startHideTimer())
},_onTouchMove:function(){this._isMoving=!0
},_onTouchEnd:function(){return this._isLayerOn?void this._oLayerPosition.setPosition():void (this._isMoving||this._runFadeIn())
},_runFadeIn:function(){this._htWElement.viewElement.visible()||(this._isLayerOn?this._startHideTimer():this._fadeIn())
},_fadeIn:function(){this._oLayerPosition.setPosition(),this._oFadeinEffect?(this._oFadeinEffect.clearEffect(!0),this._oFadeinEffect.fade({sDirection:"in",sTransitionTimingFunction:this.option("sFadeInTimingFunction")})):(this._htWElement.viewElement.show(),this._startHideTimer())
},_isLayer:function(a){return a&&(this._htWElement.element.isEqual(a)||this._htWElement.viewElement.isEqual(a)||this._htWElement.viewElement.isParentOf(a))?!0:!1
},_initFloatingData:function(){this._stopHideTimer(),this._oFloatingEffect&&0!==this.option("nFadeOutDuration")&&this._oFloatingEffect.clearEffect(!0),this._oFadeinEffect&&this._oFadeinEffect.clearEffect(!0),this._isMoving=!1,this._isLayerOn=!1
},_onActivate:function(){this._initComponent()
},_onDeactivate:function(){this._detachEvent(),this._oFadeinEffect&&(this._oFadeinEffect.detachAll("afterEffect"),this._oFadeinEffect.destroy()),this._oFloatingEffect.destroy(),this._oScrollEnd.destroy(),this._oLayerPosition.destroy(),this._htWElement.element.appendTo(document.body),this._htWElement.viewElement.leave()
},_attachFloatingEvent:function(){if(this._htEvent={},this.option("bUseHideUI")&&!this._isFixed){var a=jindo.m._getTouchEventName();
this._htEvent[a.start]={el:document.body,fn:jindo.$Fn(this._onTouchStart,this).bind()},this._htEvent[a.move]={el:document.body,fn:jindo.$Fn(this._onTouchMove,this).bind()},this._htEvent[a.end]={el:document.body,fn:jindo.$Fn(this._onTouchEnd,this).bind()},a.cancel&&(this._htEvent[a.cancel]={el:document.body,fn:jindo.$Fn(this._onTouchEnd,this).bind()});
for(var b in this._htEvent){this._htEvent[b].fn&&(this._htEvent[b].ref=jindo.m._attachFakeJindo(this._htEvent[b].el,this._htEvent[b].fn,b))
}}this._oScrollEnd.attach("scrollEnd",jindo.$Fn(this._onScrollEnd,this).bind())
},_detachEvent:function(){this._detachFloatingEvent()
},_setFloatingEffect:function(a){var b=this;
this._oFloatingEffect.detachAll("afterEffect"),this._oFloatingEffect.clearEffect(!0),this._oFadeinEffect&&this._oFadeinEffect.clearEffect(!0),a?this._oFloatingEffect.attach("afterEffect",function(){b._attachFloatingEvent(),b._startHideTimer(),b._fireEvent("show")
}):0!==this.option("nFadeOutDuration")&&this._oFloatingEffect.attach("afterEffect",function(){b._htWElement.viewElement.hide(),b._fireEvent("hide")
})
},_detachFloatingEvent:function(){for(var a in this._htEvent){var b=this._htEvent[a];
b.ref&&b.ref.detach(b.el,a)
}this._oScrollEnd.detachAll("scrollEnd"),this._htEvent=null
},destroy:function(){this.deactivate();
for(var a in this._htWElement){this._htWElement[a]=null
}delete this._htWElement,this._initFloatingData()
}}).extend(jindo.m.UIComponent),jindo.m.Scroll=jindo.$Class({$init:function(a,b){this.option({bActivateOnload:!0,bUseHScroll:!1,bUseVScroll:!0,bUseMomentum:!0,nDeceleration:0.0006,nOffsetTop:0,nOffsetBottom:0,nHeight:0,nWidth:0,bUseBounce:!0,bUseHighlight:!0,sClassPrefix:"scroll_",bUseCss3d:jindo.m.useCss3d(!0),bUseTimingFunction:jindo.m.useTimingFunction(!0),bAutoResize:!1,bUseDiagonalTouch:!0,fEffect:jindo.m.Effect.cubicBezier(0.18,0.35,0.56,1),nZIndex:2000,sListElement:"",nRatio:1.5,bUseScrollbar:!0,nScrollbarHideThreshold:0,bUseFixedScrollbar:!1,sScrollbarBorder:"1px solid white",sScrollbarColor:"#8e8e8e",bUseScrollBarRadius:!0,bUsePullDown:!1,bUsePullUp:!1,fnPullDownIdle:null,fnPullDownBeforeUpdate:null,fnPullDownUpdating:null,fnPullUpIdle:null,fnPullUpBeforeUpdate:null,fnPullUpUpdating:null}),this.option(b||{}),this._initVar(),this._setWrapperElement(a),this.option("bActivateOnload")&&this.activate()
},$static:{SCROLLBAR_CLASS:"__scroll_for_scrollbar__"},_initVar:function(){this.isPositionBug=jindo.m.hasOffsetBug(),this.isClickBug=jindo.m.hasClickBug(),this.nVersion=parseFloat(jindo.m.getDeviceInfo().version.substr(0,3)),this.sCssPrefix=jindo.m.getCssPrefix(),this._bUseCss3d=this.option("bUseCss3d"),this.nWrapperW=null,this.nWrapperH=null,this.nScrollW=null,this.nScrollH=null,this.nMaxScrollLeft=null,this.nMaxScrollTop=null,this.nMinScrollTop=0,this.bUseHScroll=null,this.bUseVScroll=null,this.bUseHighlight=this.option("bUseHighlight"),this._nPropHScroll=null,this._nPropVScroll=null,this._nLeft=0,this._nTop=0,this._aAni=[],this._htTimer={ani:-1,fixed:-1,touch:-1,scrollbar:-1},this._htPlugin={dynamic:{},pull:{}},this._oTouch=null,this._isAnimating=!1,this._isControling=!1,this._isStop=!1,this._hasJindoOffsetBug=jindo.m._hasJindoOffsetBug(),this.option("sListElement")&&this.option("bUseTimingFunction",!1),this.bUseHighlight&&(this._hasKitkatHighlightBug=jindo.m._hasKitkatHighlightBug(),this._nHightlightBug=-1,this.isPositionBug&&(this._elDummyTag=null)),this._nUpdater=-1,this._oMoveData={nLeft:0,nTop:0}
},getCurrentPos:function(){return{nTop:this._nTop,nLeft:this._nLeft}
},setLayer:function(a){this._htWElement.wrapper=jindo.$Element(a),this._htWElement.wrapper.css({overflow:"hidden",zIndex:this.option("nZIndex")}),"static"==this._htWElement.wrapper.css("position")&&this._htWElement.wrapper.css("position","relative"),this.bUseHighlight||this._htWElement.wrapper.css(jindo.m._toPrefixStr("TapHighlightColor"),"rgba(0,0,0,0)"),this.setScroller()
},setScroller:function(){this._htWElement.scroller=this._htWElement.wrapper.first(),this._htWElement.scroller.css({position:"absolute",zIndex:1,left:0,top:0}),this._htWElement.scroller.css(jindo.m._toPrefixStr("TransitionProperty"),""==this.sCssPrefix?"transform":"-"+this.sCssPrefix+"-transform").css(this.sCssPrefix+"Transform",jindo.m._getTranslate(0,0,this._bUseCss3d)),this.option("bUseTimingFunction")&&this._htWElement.scroller.css(jindo.m._toPrefixStr("TransitionTimingFunction"),this.option("fEffect").toString()),this.isPositionBug&&this.bUseHighlight&&this.nVersion<3&&(this._elDummyTag=this._htWElement.scroller.query("._scroller_dummy_atag_"),this._elDummyTag?this._elDummyTag=this._elDummyTag.$value():(this._elDummyTag=jindo.$("<a href='javascript:void(0);' style='position:absolute;height:0px;width:0px;' class='_scroller_dummy_atag_'></a>"),this._htWElement.scroller.append(this._elDummyTag)))
},width:function(a){return a?(this.option("nWidth",a),void this.refresh()):this.option("nWidth")?parseInt(this.option("nWidth"),10):this._htWElement.wrapper.width()
},height:function(a){return a?(this.option("nHeight",a),void this.refresh()):this.option("nHeight")?parseInt(this.option("nHeight"),10):this._htWElement.wrapper.height()
},_setWrapperElement:function(a){this._htWElement={},this.setLayer(a)
},hasHScroll:function(){return this.bUseHScroll
},hasVScroll:function(){return this.bUseVScroll
},_createDynamicPlugin:function(a){var b={nRatio:this.option("nRatio"),sListElement:this.option("sListElement"),sDirection:a};
this._inst("dynamic")?this._inst("dynamic").option(b):this._htPlugin.dynamic.o=new jindo.m.DynamicPlugin(this._htWElement.wrapper,b),this._inst("dynamic").refresh("V"==a?this._nTop:this._nLeft),this.option("bUseTimingFunction",!1),this._htPlugin.dynamic.bUse=!0
},_refreshDynamicPlugin:function(){if(this._htPlugin.dynamic.bUse=!1,this.option("sListElement")&&(!this.bUseVScroll||!this.bUseHScroll)){var a=2*this.option("nRatio");
this.bUseVScroll&&this.nScrollH>this.nWrapperH*a?this._createDynamicPlugin("V"):this.bUseHScroll&&this.nScrollW>this.nWrapperW*a&&this._createDynamicPlugin("H")
}},_refreshPullPlugin:function(){return this._htPlugin.pull.bUse=this.option("bUsePullDown")||this.option("bUsePullUp"),this._isUse("pull")?(this._inst("pull")||(this._htPlugin.pull.o=new jindo.m.PullPlugin(this)),this._inst("pull").refresh(),!0):!1
},refresh:function(b){if(this.isActivating()){this._hasKitkatHighlightBug&&this._htWElement.wrapper.addClass(jindo.m.KITKAT_HIGHLIGHT_CLASS),this.option("nWidth")&&this._htWElement.wrapper.width(parseInt(this.option("nWidth"),10)),this.option("nHeight")&&this._htWElement.wrapper.height(parseInt(this.option("nHeight"),10));
var d=parseInt(this._htWElement.wrapper.css("border-left-width"),10),f=parseInt(this._htWElement.wrapper.css("border-right-width"),10),a=parseInt(this._htWElement.wrapper.css("border-top-width"),10),c=parseInt(this._htWElement.wrapper.css("border-bottom-width"),10);
d=isNaN(d)?0:d,f=isNaN(f)?0:f,a=isNaN(a)?0:a,c=isNaN(c)?0:c,this.nWrapperW=this._htWElement.wrapper.width()-d-f,this.nWrapperH=this._htWElement.wrapper.height()-a-c,this._refreshPullPlugin()||(this.nScrollW=this._htWElement.scroller.width(),this.nScrollH=this._htWElement.scroller.height()-this.option("nOffsetBottom"),this.nMinScrollTop=-this.option("nOffsetTop"),this.nMaxScrollTop=this.nWrapperH-this.nScrollH),this.nMaxScrollLeft=this.nWrapperW-this.nScrollW,this.bUseHScroll=this.option("bUseHScroll")&&this.nWrapperW<=this.nScrollW,this.bUseVScroll=this.option("bUseVScroll")&&this.nWrapperH<=this.nScrollH,this.bUseHScroll&&!this.bUseVScroll&&(this._htWElement.scroller.$value().style.height="100%"),!this.bUseHScroll&&this.bUseVScroll&&(this._htWElement.scroller.$value().style.width="100%"),this._refreshDynamicPlugin(),this.option("bUseScrollbar")&&(this._refreshScroll("V"),this._refreshScroll("H")),!this.bUseHScroll&&!this.bUseVScroll&&this._fixPositionBug(),!b&&this.restorePos(0)
}},_setPos:function(b,d){var f;
b=this.bUseHScroll?parseInt(b,10):0,d=this.bUseVScroll?parseInt(d,10):0,this._isUse("dynamic")&&(f=this._checkDirection(b,d));
var a={nLeft:this._nLeft,nTop:this._nTop,nNextLeft:b,nNextTop:d,nVectorX:b-this._nLeft,nVectorY:d-this._nTop,nMaxScrollLeft:this.nMaxScrollLeft,nMaxScrollTop:this.nMaxScrollTop};
if(this.fireEvent("beforePosition",a)){if(this._isControling=!0,this._nLeft=b=a.nNextLeft,this._nTop=d=a.nNextTop,this._isUse("dynamic")&&this._inst("dynamic").updateListStatus(f,this.bUseVScroll?this._nTop:this._nLeft),this.bUseHighlight&&this.isPositionBug){var c=this.getStyleOffset(this._htWElement.scroller);
b-=c.left,d-=c.top
}this._htWElement.scroller.css(jindo.m._toPrefixStr("Transform"),jindo.m._getTranslate(b+"px",d+"px",this._bUseCss3d)),this.option("bUseScrollbar")&&(this._setScrollBarPos("V",this._nTop),this._setScrollBarPos("H",this._nLeft)),this._oMoveData={nLeft:this._nLeft,nTop:this._nTop},this.fireEvent("position",{nLeft:this._nLeft,nTop:this._nTop,nMaxScrollLeft:this.nMaxScrollLeft,nMaxScrollTop:this.nMaxScrollTop})
}else{this._isAnimating=!1
}},_isUse:function(a){return this._htPlugin[a].bUse
},_inst:function(a){return this._htPlugin[a].o
},_checkDirection:function(b,d){var f,a=this.bUseVScroll?this._nTop:this._nLeft,c=this.bUseVScroll?d:b;
return f=a>c?"forward":"backward"
},restorePos:function(a){var b=this.getPosLeft(this._nLeft),c=this.getPosTop(this._nTop);
return b===this._nLeft&&c===this._nTop?(this._isControling=!1,this._isStop=!1,this._fireAfterScroll(),void this._fixPositionBug()):void this._scrollTo(b,c,a)
},_getMomentum:function(p,k,d,g,q,c){var j=this.option("nDeceleration"),b=d/j,m=0,f=0;
return 0>p&&b>q?(f=g/(6/(b/k*j)),q+=f,k=k*q/b,b=q):p>0&&b>c&&(f=g/(6/(b/k*j)),c+=f,k=k*c/b,b=c),b*=p>0?-1:1,m=k/j,{nDist:b,nTime:Math.round(m)}
},_stop:function(){this.option("bUseTimingFunction")?(jindo.m.detachTransitionEnd(this._htWElement.scroller.$value(),this._htEvent.TransitionEnd),this._transitionTime(0)):(cancelAnimationFrame(this._htTimer.ani),this._stopUpdater()),this._setPos(this._nLeft,this._nTop),this._aAni=[],this._isAnimating=!1,this._isStop=!0
},_scrollTo:function(a,b,c){this._stop(),a=this.bUseHScroll?a:0,b=this.bUseVScroll?b:0,this._aAni.push({nLeft:a,nTop:b,nDuration:c||0}),this._animate()
},scrollTo:function(a,b,c){c=c||0,a=-Math.abs(a),b=-Math.abs(b),b+=this.getTop(),this._scrollTo(a>=this.getLeft()?this.getLeft():a<=this.getRight()?this.getRight():a,b>=this.getTop()?this.getTop():b<=this.getBottom()?this.getBottom():b,c)
},getRight:function(){return this.nMaxScrollLeft
},getLeft:function(){return 0
},getBottom:function(){return this.nMaxScrollTop
},getTop:function(){return this.nMinScrollTop
},isMoving:function(){return this._isControling
},_animate:function(){var b,f=this;
if(!this._isAnimating){if(!this._aAni.length){return void this.restorePos(300)
}do{if(b=this._aAni.shift(),!b){return
}}while(b.nLeft==this._nLeft&&b.nTop==this._nTop);
if(0==b.nDuration){this.option("bUseTimingFunction")&&this._transitionTime(0),this._setPos(b.nLeft,b.nTop),this._animate()
}else{if(this._isAnimating=!0,this.option("bUseTimingFunction")){this._transitionTime(b.nDuration),this._setPos(b.nLeft,b.nTop),this._isAnimating=!1,jindo.m.attachTransitionEnd(this._htWElement.scroller.$value(),this._htEvent.TransitionEnd)
}else{f._startUpdater();
var j,a=(new Date).getTime(),d=this.bUseHScroll?this.option("fEffect")(this._nLeft,b.nLeft):null,g=this.bUseVScroll?this.option("fEffect")(this._nTop,b.nTop):null;
!function c(){return j=(new Date).getTime(),j>=a+b.nDuration?(f._stopUpdater(),f._setPos(b.nLeft,b.nTop),f._isAnimating=!1,void f._animate()):(j=(j-a)/b.nDuration,f._oMoveData={nLeft:d&&d(j),nTop:g&&g(j)},void (f._isAnimating?f._htTimer.ani=requestAnimationFrame(c):f._stopUpdater()))
}()
}}}},_onRotate:function(a){this.fireEvent("rotate",{isVertical:a.isVertical})&&this.refresh()
},_transitionTime:function(a){a+="ms",this._htWElement.scroller.css(jindo.m._toPrefixStr("TransitionDuration"),a),this.option("bUseScrollbar")&&this._setScrollbarDuration(a)
},_setScrollbarDuration:function(a){this.bUseHScroll&&this._htWElement.HscrollbarIndicator&&this._htWElement.HscrollbarIndicator.css(jindo.m._toPrefixStr("TransitionDuration"),a),this.bUseVScroll&&this._htWElement.VscrollbarIndicator&&this._htWElement.VscrollbarIndicator.css(jindo.m._toPrefixStr("TransitionDuration"),a)
},_stopScroll:function(){var b,c,d=jindo.m.getTranslateOffset(this._htWElement.scroller.$value()),a={left:0,top:0};
this.isPositionBug&&this.bUseHighlight&&(a=this.getStyleOffset(this._htWElement.scroller)),c=d.left+a.left,b=d.top+a.top,this.option("bUseFixedScrollbar")||(this._hideScrollBar("V"),this._hideScrollBar("H")),this._stopUpdater(),this._stop(),this._setPos(this.getPosLeft(c),this.getPosTop(b)),this._isControling=!1,this._fireAfterScroll(),this._fixPositionBug()
},getStyleOffset:function(a){var b=parseInt(a.css("left"),10),c=parseInt(a.css("top"),10);
return b=isNaN(b)?0:b,c=isNaN(c)?0:c,{left:b,top:c}
},getPosLeft:function(a){return this.bUseHScroll?a>=0?0:a<=this.nMaxScrollLeft?this.nMaxScrollLeft:a:0
},getPosTop:function(a){return this.bUseVScroll?a>=this.nMinScrollTop?this.nMinScrollTop:a<=this.nMaxScrollTop?this.nMaxScrollTop:a:0
},_hideScrollBar:function(a){if(this._htWElement){var b=this._htWElement[a+"scrollbar"],c="H"===a?this.bUseHScroll:this.bUseVScroll;
c&&b&&(b.hide(),b.css("left",b.css("left")+"px"),this.isPositionBug&&this.bUseHighlight&&this.makeStylePos(this._htWElement[a+"scrollbarIndicator"]))
}},_fireAfterScroll:function(){if(this.option("bUseScrollbar")){var a=this;
this._htTimer.scrollbar=setTimeout(function(){a.option("bUseFixedScrollbar")||(a._hideScrollBar("V"),a._hideScrollBar("H"))
},this.option("nScrollbarHideThreshold"))
}this._fireEvent("afterScroll")
},_fireEvent:function(a){return this.fireEvent(a,this._getNowPosition())
},_fireTouchEvent:function(a,b){return this.fireEvent(a,this._getNowPosition(b))
},_getNowPosition:function(a){return{nLeft:this._nLeft,nTop:this._nTop,nMaxScrollLeft:this.nMaxScrollLeft,nMaxScrollTop:this.nMaxScrollTop,oEvent:a||{}}
},setUsePullDown:function(a){this._isUse("pull")&&(this.option("bUsePullDown",a),this.refresh())
},setUsePullUp:function(a){this._isUse("pull")&&(this.option("bUsePullUp",a),this.refresh())
},_onUpdater:function(){(this._oMoveData.nLeft!=this._nLeft||this._oMoveData.nTop!=this._nTop)&&this._setPos(this._oMoveData.nLeft,this._oMoveData.nTop),this._startUpdater()
},_startUpdater:function(){this._stopUpdater(),this._nUpdater=window.requestAnimationFrame(this._htEvent.updater)
},_stopUpdater:function(){window.cancelAnimationFrame(this._nUpdater),this._nUpdater=-1
},_onStart:function(a){this._clearPositionBug(),this._isStop=!1,this._fireTouchEvent("beforeTouchStart",a)?(this.option("bUseTimingFunction")&&this._transitionTime(0),this._isAnimating&&this._stopScroll()&&(this._isAnimating=!1),this._isControling=!0,this._fireTouchEvent("touchStart",a)||a.stop()):a.stop()
},_onMove:function(b){var d=0,f=0;
if(this._clearTouchEnd(),this._clearPositionBug(),this.isClickBug&&this._htWElement.scroller.css("pointerEvents","none"),this._fireTouchEvent("beforeTouchMove",b)){this._isUse("pull")&&this._inst("pull").touchMoveForUpdate(b,this.nMaxScrollTop);
var a=b.oEvent;
if(b.sMoveType===jindo.m.MOVETYPE[0]){if(!this.bUseHScroll){return !0
}if(!this.option("bUseBounce")&&(this._nLeft>=0&&b.nVectorX>0||this._nLeft<=this.nMaxScrollLeft&&b.nVectorX<0)){return void this._forceRestore(b)
}a.stop(jindo.$Event.CANCEL_ALL)
}else{if(b.sMoveType===jindo.m.MOVETYPE[1]){if(!this.bUseVScroll){return !0
}if(!this.option("bUseBounce")&&(this._nTop>=this.nMinScrollTop&&b.nVectorY>0||this._nTop<=this.nMaxScrollTop&&b.nVectorY<0)){return void this._forceRestore(b)
}a.stop(jindo.$Event.CANCEL_ALL)
}else{if(b.sMoveType!==jindo.m.MOVETYPE[2]){return a.stop(jindo.$Event.CANCEL_ALL),!0
}if(!this.option("bUseDiagonalTouch")){return
}a.stop(jindo.$Event.CANCEL_ALL)
}}if(this.option("bUseBounce")){this.bUseHScroll&&(d=this._nLeft+(this._nLeft>=0||this._nLeft<=this.nMaxScrollLeft?b.nVectorX/2:b.nVectorX)),this.bUseVScroll&&(f=this._nTop+(this._nTop>=this.nMinScrollTop||this._nTop<=this.nMaxScrollTop?b.nVectorY/2:b.nVectorY));
var c=this;
this._htTimer.touch=setTimeout(function(){c._forceRestore(b)
},500)
}else{d=this.getPosLeft(this._nLeft+b.nVectorX),f=this.getPosTop(this._nTop+b.nVectorY)
}this._setPos(d,f),this._fireTouchEvent("touchMove",b)||b.stop()
}else{b.stop()
}},_onEnd:function(a){this._isUse("pull")&&this._inst("pull").pullUploading(),this._fireTouchEvent("beforeTouchEnd",a)?(this._clearPositionBug(),this._clearTouchEnd(),a.sMoveType===jindo.m.MOVETYPE[0]||a.sMoveType===jindo.m.MOVETYPE[1]||a.sMoveType===jindo.m.MOVETYPE[2]?(this._endForScroll(a),this.nVersion<4.1&&a.oEvent.stop(jindo.$Event.CANCEL_DEFAULT)):(this._isControling=!1,this._isStop||this._tapHighlight()),this._fireTouchEvent("touchEnd",a)||a.stop()):a.stop(),this.isClickBug&&this._htWElement.scroller.css("pointerEvents","auto")
},_tapHighlight:function(){if(this._hasKitkatHighlightBug){this._htWElement.wrapper.removeClass(jindo.m.KITKAT_HIGHLIGHT_CLASS),this._htWElement.wrapper._element.clientHeight;
var a=this;
clearTimeout(this._nHightlightBug),this._nHightlightBug=setTimeout(function(){a._htWElement.wrapper.addClass(jindo.m.KITKAT_HIGHLIGHT_CLASS)
},200)
}},_forceRestore:function(a){a.nMomentumX=a.nMomentumY=null,this._endForScroll(a),this._clearPositionBug(),this._clearTouchEnd()
},_endForScroll:function(b){clearTimeout(this._nFixedDubbleEndBugTimer);
var c={nDist:0,nTime:0},d={nDist:0,nTime:0},a={nMomentumX:b.nMomentumX,nMomentumY:b.nMomentumY,nDistanceX:b.nDistanceX,nDistanceY:b.nDistanceY,nLeft:this._nLeft,nTop:this._nTop,nMaxScrollLeft:this.nMaxScrollLeft,nMaxScrollTop:this.nMaxScrollTop};
this.option("bUseMomentum")&&(b.nMomentumX||b.nMomentumY)?(this.bUseHScroll&&(c=this._getMomentum(-b.nDistanceX,b.nSpeedX,b.nMomentumX,this.nWrapperW,-this._nLeft,-this.nMaxScrollLeft+this._nLeft)),this.bUseVScroll&&(d=this._getMomentum(-b.nDistanceY,b.nSpeedY,b.nMomentumY,this.nWrapperH,-this._nTop,-this.nMaxScrollTop+this._nTop)),a.nNextLeft=this._nLeft+c.nDist,a.nNextTop=this._nTop+d.nDist,a.nTime=Math.max(Math.max(c.nTime,d.nTime),10),this.fireEvent("beforeScroll",a)&&(this.option("bUseBounce")?this._scrollTo(a.nNextLeft,a.nNextTop,a.nTime):this._scrollTo(this.getPosLeft(a.nNextLeft),this.getPosTop(a.nNextTop),a.nTime))):(a.nNextLeft=this._nLeft,a.nNextTop=this._nTop,a.nTime=0,this.fireEvent("beforeScroll",a)&&(this._nLeft!==a.nNextLeft||this._nTop!==a.nNextTop?this._scrollTo(a.nNextLeft,a.nNextTop,a.nTime):this.restorePos(300)))
},_onTransitionEnd:function(){jindo.m.detachTransitionEnd(this._htWElement.scroller.$value(),this._htEvent.TransitionEnd),this._animate()
},_onDocumentStart:function(a){if(this._htWElement.wrapper.visible()){if(this._htWElement.wrapper.isChildOf(a.element)){return !0
}this._isAnimating&&this._isControling&&this._stopScroll()
}},_onActivate:function(){this._oTouch?this._oTouch.activate():this._oTouch=new jindo.m.Touch(this._htWElement.wrapper.$value(),{nMoveThreshold:0,nMomentumDuration:jindo.m.getDeviceInfo().android?500:200,nUseDiagonal:0,nTapThreshold:1,nSlopeThreshold:5,nEndEventThreshold:jindo.m.getDeviceInfo().win8?100:0,bHorizental:this.option("bUseHScroll"),bVertical:this.option("bUseVScroll")}),this._attachEvent(),this.refresh()
},_onDeactivate:function(){this._detachEvent(),this._oTouch.deactivate()
},_attachEvent:function(){this._htEvent={},this._htEvent.touchStart=jindo.$Fn(this._onStart,this).bind(),this._htEvent.touchMove=jindo.$Fn(this._onMove,this).bind(),this._htEvent.touchEnd=jindo.$Fn(this._onEnd,this).bind(),this._htEvent.TransitionEnd=jindo.$Fn(this._onTransitionEnd,this).bind(),this._htEvent.document=jindo.$Fn(this._onDocumentStart,this).attach(document,"touchstart"),this._oTouch.attach({touchStart:this._htEvent.touchStart,touchMove:this._htEvent.touchMove,touchEnd:this._htEvent.touchEnd}),this.option("bAutoResize")&&(this._htEvent.rotate=jindo.$Fn(this._onRotate,this).bind(),jindo.m.bindRotate(this._htEvent.rotate)),this.option("bUseTimingFunction")||(this._htEvent.updater=jindo.$Fn(this._onUpdater,this).bind())
},_fixPositionBug:function(){if(this.isPositionBug&&this.bUseHighlight){var a=this;
this._clearPositionBug(),this._htTimer.fixed=setTimeout(function(){a._htWElement&&a._htWElement.scroller&&(a.makeStylePos(a._htWElement.scroller),a.nVersion<=3&&a._elDummyTag.focus())
},200)
}},makeStylePos:function(b){var c=b.$value(),d=jindo.m.getTranslateOffset(c),a=b.offset();
c.style[jindo.m._toPrefixStr("Transform")]=this.nVersion>=4?jindo.m._getTranslate(0,0,this._bUseCss3d):null,c.style[jindo.m._toPrefixStr("TransitionDuration")]=null,this._hasJindoOffsetBug?b.offset(d.top+a.top,d.left+a.left):b.offset(a.top,a.left)
},_clearPositionBug:function(){this.isPositionBug&&this.bUseHighlight&&(clearTimeout(this._htTimer.fixed),this._htTimer.fixed=-1)
},_clearTouchEnd:function(){clearTimeout(this._htTimer.touch),this._htTimer.touch=-1
},_detachEvent:function(){jindo.m.detachTransitionEnd(this._htWElement.scroller.$value(),this._htEvent.TransitionEnd),this._htEvent.document.detach(document,"touchstart"),this.option("bAutoResize")&&jindo.m.unbindRotate(this._htEvent.rotate),this._oTouch.detachAll(),this._elDummyTag&&this._htWElement.scroller.remove(this._elDummyTag),this.option("bUseTimingFunction")||this._stopUpdater()
},_createScroll:function(b){if("H"===b?this.bUseHScroll:this.bUseVScroll){var c,d=this._htWElement.wrapper,a=jindo.$Element(d.query("div."+jindo.m.Scroll.SCROLLBAR_CLASS));
a&&(d.remove(a),a=this._htWElement[b+"scrollbar"]=this._htWElement[b+"scrollbarIndicator"]=null),a=this._createScrollbar(b),c=this._createScrollbarIndicator(b),this._htWElement[b+"scrollbar"]=a,this._htWElement[b+"scrollbarIndicator"]=c,a.append(c),d.append(a)
}},_createScrollbar:function(a){var b=jindo.$Element("<div class='"+jindo.m.Scroll.SCROLLBAR_CLASS+"'>");
return b.css({position:"absolute",zIndex:100,bottom:"H"===a?"1px":(this.bUseHScroll?"7":"2")+"px",right:"H"===a?(this.bUseVScroll?"7":"2")+"px":"1px",pointerEvents:"none"}),this.option("bUseFixedScrollbar")?b.show():b.hide(),b.css("H"===a?{height:"5px",left:"2px"}:{width:"5px",top:"2px"}),b
},_createScrollbarIndicator:function(a){var b=jindo.$Element("<div>").css({position:"absolute",zIndex:100,border:this.option("sScrollbarBorder"),pointerEvents:"none",left:0,top:0,backgroundColor:this.option("sScrollbarColor")});
return jindo.m.getOsInfo().ios&&this.option("bUseScrollBarRadius")&&b.css(jindo.m._toPrefixStr("BorderRadius"),"12px"),b.css(jindo.m._toPrefixStr("TransitionProperty"),""==this.sCssPrefix?"transform":"-"+this.sCssPrefix+"-transform").css(jindo.m._toPrefixStr("Transform"),jindo.m._getTranslate(0,0,this._bUseCss3d)),this.option("bUseTimingFunction")&&b.css(jindo.m._toPrefixStr("TransitionTimingFunction"),this.option("fEffect").toString()),"H"===a?b.height(5):b.width(5),b
},_refreshScroll:function(b){if("H"===b){if(!this.bUseHScroll||this.nWrapperW==this.nScrollW){return
}}else{if(!this.bUseVScroll||this.nWrapperH==this.nScrollH){return
}}this._htWElement[b+"scrollbar"]||this._createScroll(b);
var c=this._htWElement[b+"scrollbar"],d=this._htWElement[b+"scrollbarIndicator"],a=0;
"H"===b?(a=Math.max(Math.round(Math.pow(this.nWrapperW,2)/this.nScrollW),8),this._nPropHScroll=(this.nWrapperW-a)/this.nMaxScrollLeft,c.width(this.nWrapperW),d.width(isNaN(a)?0:a)):(a=Math.max(Math.round(Math.pow(this.nWrapperH,2)/this.nScrollH),8),this._nPropVScroll=(this.nWrapperH-a)/this.nMaxScrollTop,c.height(this.nWrapperH),d.height(isNaN(a)?0:a))
},_setScrollBarPos:function(b,d){if("H"===b?this.bUseHScroll:this.bUseVScroll){var f=this._htWElement[b+"scrollbarIndicator"],a=this._htWElement[b+"scrollbar"];
if(f&&a&&(d=this["_nProp"+b+"Scroll"]*d,this.option("bUseFixedScrollbar")||!a||a.visible()||(a.show(),this.option("bUseTimingFunction")&&a.$value().clientHeight),f)){if(this.isPositionBug&&this.bUseHighlight){var c=parseInt(f.css("H"===b?"left":"top"),10);
d-=isNaN(c)?0:c
}f.css(jindo.m._toPrefixStr("Transform"),jindo.m._getTranslate("H"==b?d+"px":0,"H"==b?0:d+"px",this._bUseCss3d))
}}},destroy:function(){this.deactivate(),this.detachAll();
for(var a in this._htWElement){this._htWElement[a]=null
}this._htWElement=null,this._oTouch.destroy(),delete this._oTouch
}}).extend(jindo.m.UIComponent),jindo.m.Slide=jindo.$Class({$init:function(a){this.option({}),this.option(a||{})
},setStyle:function(a){var b={};
return b[this.p("TransitionProperty")]=""==this.sCssPrefix?"tranform":"-"+this.sCssPrefix+"-transform",b[this.p("TransitionDuration")]="0ms",b[this.p("Transform")]=this.getTranslate(0,0),this._welTarget=a[0].css(b),this.fireEvent("set",{css:b}),b
},move:function(b,f,j,a){a=a||{};
var d,g=this.getTarget(!0);
if(a.useCircular){this.option("bUseH")?b=this._getPos(b,a):f=this._getPos(f,a)
}else{if(this.option("bHasOffsetBug")){var c=jindo.m.getStyleOffset(g);
b-=c.left,f-=c.top
}}return d={"@transitionProperty":""==this.sCssPrefix?"tranform":"-"+this.sCssPrefix+"-transform","@transform":this.getTranslate(b+"px",f+"px")},j?this._oMorph.pushAnimate(j,[g,d]):g.css(this.toCss(d)),this._oMorph
},_getPos:function(b,d){var g=b,a=d.next,c=d.range;
if(d.restore){g=0
}else{if(0!=d.duration&&b%c===0){g=a?-c:c
}else{if("undefined"!=typeof d.startIndex){var f=-1*parseInt(g/c,10);
a=f==d.startIndex||f>d.startIndex?!0:!1,g=g%c+(a?-1:1)*Math.abs(f-d.startIndex)*c
}else{g=g%c+(a?0:2*c),g%=c
}}}return g
}}).extend(jindo.m.Animation),jindo.m.SlideFlicking=jindo.$Class({$init:function(a,b){this.option(b||{}),this._initVar(),this._oDocFragment=document.createDocumentFragment(),this._setWrapperElement(a),this.option("bActivateOnload")&&this.activate()
},_onActivate:function(){jindo.m.Flick.prototype._onActivate.apply(this);
var a=this;
this.set(new jindo.m.Slide(this._getAnimationOption()).attach({set:function(b){a._setStyle(b.css)
}}),this._htWElement.container)
},_setStyle:function(b){var d={},f=0,a=this._bUseH?"width":"height",c=this._bUseH?"left":"top";
jindo.$Jindo.mixin(d,b),this._bUseCircular&&(d[a]="100%",d[c]="-100%",b.position="absolute",b[a]="100%",b.left=0,b.top=0),this._bUseH&&(d.clear="both",b["float"]="left"),this._htWElement.container.css(d),jindo.$A(this._htWElement.aPanel).forEach(function(h,g){this._bUseCircular&&(f=(g+1)%this._nDefaultPanel*100+"%",this._hasOffsetBug()?b[c]=f:b[jindo.m._toPrefixStr("Transform")]=this._getTranslate(f)),h.css(b)
},this)
},resize:function(){jindo.m.Flick.prototype.resize.call(this);
var a=this._bUseH?"width":"height",b=this._htWElement.view[a]();
if(!this._bUseCircular){if(this._htWElement.container.css(a,-this._aPos[this._aPos.length-1]+"px"),this.option("bFitContentSize")){jindo.$A(this._htWElement.aPanel).forEach(function(d){d.css(a,b+"px")
})
}else{var c=this._aPos[this._aPos.length-1]+b;
0>c&&(jindo.$A(this._aPos).forEach(function(d,f){c>d&&(this._aPos.length=f,jindo.$A.Break())
},this),this._aPos.push(c),this._bUseH?this._htSize.maxX=c:this._htSize.maxY=c,this._aPos.length<=this.getContentIndex()&&(this._nContentIndex=this._aPos.length-1))
}this._updateFlickInfo(),this._oAnimation.move(this._nX,this._nY)
}},_restorePanel:function(b){b=b||this.getElement();
var d=this._getIndexByElement(b),g=this._hasOffsetBug()?this._bUseH?"left":"top":jindo.m._toPrefixStr("Transform"),a=(0>d-1?this._nDefaultPanel-1:d-1)%this._nDefaultPanel,c=((d+1)%this._nDefaultPanel>this._nDefaultPanel-1?0:d+1)%this._nDefaultPanel,f=d%this._nDefaultPanel;
this._welElement=this._htWElement.aPanel[f],this._htWElement.container.css(jindo.m._toPrefixStr("Transform"),this._getTranslate(0)),this._welElement.css(g,this._getPosValue("100%")).css("zIndex",10),this._htWElement.aPanel[a].css(g,this._getPosValue("0%")).css("zIndex",1),this._htWElement.aPanel[c].css(g,this._getPosValue("200%")).css("zIndex",1),jindo.m.getOsInfo().ios&&this._bUseCircular&&(this._oDocFragment.appendChild(this._htWElement.aPanel[a].$value()),this._oDocFragment.appendChild(this._htWElement.aPanel[c].$value()),this._htWElement.container.$value().appendChild(this._oDocFragment))
},_getPosValue:function(a){return this._hasOffsetBug()?a:this._getTranslate(a)
},_panelEndAfterCall:function(){this._bUseCircular&&this._restorePanel()
},_moveAfterCall:function(a){this._oAnimation.move(this._nX,this._nY,0,this._makeOption({next:a.bNext}))
},_onEndAniImpl:function(){jindo.m.Flick.prototype._onEndAniImpl.apply(this),this._bUseCircular||this._fixOffsetBugImpl()
},destroy:function(){jindo.m.Flick.prototype.destroy.apply(this)
}}).extend(jindo.m.Flick);
jindo.m.ScrollEnd=jindo.$Class({$init:function(a){this._initVar(),this._setWrapperElement(a),this._attachEvent()
},_initVar:function(){this._bIOS=jindo.m.getOsInfo().ios,this._nType=this._getDetectType(),this._isTouched=!1,this._isMoved=!1,this._nObserver=null,this._nScrollEndTimer=null,this._nPreLeft=null,this._nPreTop=null,this._bMoveIOS=!1,this._bFireOrientationchange=!1
},_getDetectType:function(){var a=0,b=jindo.m.getOsInfo(),c=jindo.m.getBrowserInfo();
return b.android?a=!c.bSBrowser&&c.chrome?3:parseInt(b.version,10)>=3?2:1:jindo.m.getDeviceInfo().win?parseInt(b.version,10)>=8&&(a=2):this._bIOS&&parseInt(b.version,10)>=8&&(a=2),a
},_setWrapperElement:function(){this._htElement={},this._htElement.body=document.body
},_attachEvent:function(){this._htEvent={},this._htEvent.event_scroll={ref:jindo.$Fn(this._onScroll,this).attach(window,"scroll"),el:window},0==this._nType&&this._bIOS&&parseInt(jindo.m.getOsInfo().version,10)<=7&&(this._htEvent.event_touchmove={ref:jindo.$Fn(this._onMoveForIOS,this).attach(this._htElement.body,"touchmove"),el:this._htElement.body}),1==this._nType&&(this._htEvent.event_touchstart={ref:jindo.$Fn(this._onStartForAndroid,this).attach(this._htElement.body,"touchstart"),el:this._htElement.body},this._htEvent.event_touchmove={ref:jindo.$Fn(this._onMoveForAndroid,this).attach(this._htElement.body,"touchmove"),el:this._htElement.body},this._htEvent.event_touchend={ref:jindo.$Fn(this._onEndForAndroid,this).attach(this._htElement.body,"touchend"),el:this._htElement.body}),3==this._nType&&(this._htEvent.event_orientationchange={ref:jindo.$Fn(this._onRotateForChrome,this).attach(window,"orientationchange"),el:window})
},_onRotateForChrome:function(){document.body.offsetHeight>window.innerHeight&&(this._bFireOrientationchange=!0)
},_onMoveForIOS:function(){this._bMoveIOS=!1
},_detachEvent:function(){for(var a in this._htEvent){var b=this._htEvent[a];
b.ref.detach(b.el,a.substring(a.lastIndexOf("_")))
}},_startObserver:function(){var a=this;
this._stopObserver(),this._nObserver=setInterval(function(){a._observe()
},100)
},_observe:function(){this._isTouched||this._nPreTop!==window.pageYOffset||this._nPreLeft!==window.pageXOffset?(this._nPreTop=window.pageYOffset,this._nPreLeft=window.pageXOffset):(this._stopObserver(),this._fireEventScrollEnd())
},_stopObserver:function(){clearInterval(this._nObserver),this._nObserver=null
},_onScroll:function(){switch(this._nType){case 0:if(this._bIOS&&this._bMoveIOS){return !1
}this._fireEventScrollEnd(),this._bMoveIOS=!0;
break;
case 1:this._startObserver();
break;
case 2:this._fireEventScrollEndForAndroid();
break;
case 3:this._bFireOrientationchange?this._bFireOrientationchange=!1:this._fireEventScrollEnd()
}},_onStartForAndroid:function(){this._isTouched=!0,this._isMoved=!1,this._nPreTop=null,this._nPreLeft=null
},_onMoveForAndroid:function(){this._isMoved=!0
},_onEndForAndroid:function(){this._isTouched=!1,this._isMoved&&this._startObserver()
},_fireEventScrollEnd:function(){this.fireEvent("scrollEnd",{nTop:window.pageYOffset,nLeft:window.pageXOffset})
},_fireEventScrollEndForAndroid:function(){var a=this;
clearTimeout(this._nScrollEndTimer),this._nScrollEndTimer=setTimeout(function(){a._fireEventScrollEnd()
},500)
},destroy:function(){this._detachEvent(),this._nType=-1,this._isTouched=null,this._isMoved=null,this._nObserver=null,this._nPreLeft=null,this._nPreTop=null
}}).extend(jindo.m.Component);
jindo.m.DragArea=jindo.$Class({$init:function(a,b){this.option({sClassPrefix:"drag-",bFlowOut:!1,nThreshold:10,nMoveThreshold:3,bActivateOnload:!0}),this.option(b||{}),this._initVar(),this._setWrapperElement(a),this._initTouch(),this._setAnchorElement(),this.option("bActivateOnload")&&this.activate()
},_initVar:function(){this._oTouch=null,this._sDragClass="."+this.option("sClassPrefix")+"dragging",this._sHandleClass="."+this.option("sClassPrefix")+"handle",this._htInfo={elDrag:null,elHandle:null,nStartX:null,nStartY:null,nX:null,nY:null,bDragStart:!1,nCount:0,bPrepared:!1},this._htTans=jindo.m.useCss3d()?{open:"3d(",end:",0)"}:{open:"(",end:")"},this._sCssUserSelect="-"+jindo.m.getCssPrefix()+"-user-select";
var a=jindo.m.getDeviceInfo();
this._isIos=a.iphone||a.ipad,this._aAnchor=null,this._fnDummyFnc=function(){return !1
},this._bBlocked=!1;
var b=parseFloat(a.version,10);
this._bTouchStop=!1,this._bTouchStop=a.android&&(2.1==b||b>=3),this._bTouchStop||(this._bTouchStop=a.iphone&&b>=3&&4>b),this._baseOffset={}
},_setWrapperElement:function(a){this._htWElement={},a=jindo.$(a),this._htWElement.base=jindo.$Element(a),this._htWElement.base.css("position","relative"),this._sCssUserSelectValue=this._htWElement.base.css(this._sCssUserSelect)
},_initTouch:function(){this._oTouch||(this._oTouch=new jindo.m.Touch(this._htWElement.base.$value(),{nUseDiagonal:1,nSlopeThreshold:1,nMoveThreshold:this.option("nMoveThreshold"),bActivateOnload:!1}),this._oTouch.setSlope(-1,-1))
},_getDragElement:function(b){if(jindo.$$.test(b,"input[type=text], textarea, select")){return null
}var d=function(g,h){return h?g===document||g===h?!0:jindo.$Element(g).isParentOf(h):!1
},f=jindo.$$.test(b,this._sDragClass)?b:jindo.m.getClosest(this._sDragClass,b);
d(this._htWElement.base,f)||(f=null);
var a=null;
if(f){try{a=jindo.$$.getSingle(this._sHandleClass,f)
}catch(c){}a&&(d(a,b)||(f=null))
}return{elDrag:f,elHandle:a}
},_getParentOffset:function(){var a=this._htWElement.base.$value(),b=this._htWElement.base.offset();
return{left:b.left,top:b.top,width:a.offsetWidth,height:a.offsetHeight}
},_onStart:function(b){if(this.isActivating()&&!this._htInfo.bPrepared){this._initInfo();
var c=this._getDragElement(b.element,this._sHandleClass);
if(c.elDrag){var d={elHandle:c.elHandle,elDrag:c.elDrag,oEvent:b.oEvent};
if(this.fireEvent("handleDown",d)){this._bTouchStop&&b.oEvent.stop(),this._htInfo.bPrepared=!0,this._clearAnchor(),this._htInfo.welDrag=jindo.$Element(d.elDrag),this._htInfo.elHandle=d.elHandle,this._baseOffset=this._getParentOffset();
var a=this._htInfo.welDrag.offset();
this._htInfo.nStartX=a.left,this._htInfo.nStartY=a.top,this._htInfo.welDrag.css(jindo.m.getCssPrefix()+"Transition","-webkit-transform 0ms"),this._htInfo.welDrag.css(jindo.m.getCssPrefix()+"Transform","translate"+this._htTans.open+(a.left-this._baseOffset.left)+"px,"+(a.top-this._baseOffset.top)+"px"+this._htTans.end),this._htInfo.welDrag.css({position:"absolute",left:0,top:0}),this._htInfo.nX=this._htInfo.nStartX,this._htInfo.nY=this._htInfo.nStartY,this._oTouch.attach({touchMove:this._htEvent.touchMove,touchEnd:this._htEvent.touchEnd}),this._htWElement.base.css(this._sCssUserSelect,"none")
}}}},_onMove:function(b){if(b.oEvent.stop(),this._htInfo.bPrepared){var f=b.nDistanceX,g=b.nDistanceY;
if(!(Math.abs(f)+Math.abs(g)<this.option("nThreshold"))){var a={nX:this._htInfo.nStartX+f,nY:this._htInfo.nStartY+g};
if(!this.option("bFlowOut")){var d=this._onReCalculateOffset(this._htInfo.welDrag.$value(),a.nX,a.nY);
a.nX=d.nX,a.nY=d.nY
}var c={nX:a.nX,nY:a.nY,elDrag:this._htInfo.welDrag.$value(),elHandle:this._htInfo.elHandle,nGapX:f,nGapY:g,nDragCount:this._htInfo.nCount,nTouchX:b.nX,nTouchY:b.nY};
if(!this._htInfo.bDragStart&&!this.fireEvent("dragStart",c)){return void (this._htInfo.bPrepared=!1)
}this._htInfo.bDragStart=!0,this.fireEvent("beforeDrag",c)&&(this._htInfo.welDrag.css(jindo.m.getCssPrefix()+"Transform","translate"+this._htTans.open+(c.nX-this._baseOffset.left)+"px,"+(c.nY-this._baseOffset.top)+"px"+this._htTans.end),this._htInfo.nX=c.nX,this._htInfo.nY=c.nY,this._htInfo.nCount++,this.fireEvent("drag",c))
}}},_onReCalculateOffset:function(b,f,j){var a=this._baseOffset,d={nWidth:b.offsetWidth,nHeight:b.offsetHeight},c=Math.max(f,a.left);
c=Math.min(c,a.left+a.width-d.nWidth);
var g=Math.max(j,a.top);
return g=Math.min(g,a.top+a.height-d.nHeight),{nX:c,nY:g}
},_onEnd:function(a){if(this._htInfo.bPrepared){if(this._stopDrag(!1),this._htInfo.welDrag.css(jindo.m.getCssPrefix()+"Transform",""),this._htInfo.welDrag.css(jindo.m.getCssPrefix()+"Transition",""),this._htInfo.welDrag.css({position:"",left:"",top:""}),(a.sMoveType===jindo.m.MOVETYPE[3]||a.sMoveType===jindo.m.MOVETYPE[4])&&this._restoreAnchor(),this._htInfo.welDrag){var b={elDrag:this._htInfo.welDrag.$value(),elHandle:this._htInfo.elHandle};
this.fireEvent("handleUp",b)
}this._initInfo()
}},isDragging:function(){return this._htInfo.bDragStart
},stopDragging:function(){this._stopDrag(!0)
},_stopDrag:function(a){if("undefined"==typeof a&&(a=!1),this._oTouch.detach({touchMove:this._htEvent.touchMove,touchEnd:this._htEvent.touchEnd}),this._htWElement.base.css(this._sCssUserSelect,this._sCssUserSelectValue?this._sCssUserSelectValue:""),this.isDragging()){var b={nX:parseInt(this._htInfo.welDrag.css("left"),10)||0,nY:parseInt(this._htInfo.welDrag.css("top"),10)||0,elDrag:this._htInfo.welDrag.$value(),elHandle:this._htInfo.elHandle,bInterupted:a};
this.fireEvent("dragEnd",b),this._htInfo.bDragStart=!1
}},_setAnchorElement:function(){this._isIos&&(this._aAnchor=jindo.$$("A",this._htWElement.base.$value()))
},_clearAnchor:function(){if(this._aAnchor&&!this._bBlocked){for(var b=null,d=0,f=this._aAnchor.length;
f>d;
d++){this._fnDummyFnc!==this._aAnchor[d].onclick&&(this._aAnchor[d]._onclick=this._aAnchor[d].onclick),this._aAnchor[d].onclick=this._fnDummyFnc,b=this._aAnchor[d].___listeners___||[];
for(var a=0,c=b.length;
c>a;
a++){___Old__removeEventListener___.call(this._aAnchor[d],"click",b[a].listener,b[a].useCapture)
}}this._bBlocked=!0
}},_restoreAnchor:function(){if(this._aAnchor&&this._bBlocked){for(var b=null,d=0,f=this._aAnchor.length;
f>d;
d++){this._aAnchor[d].onclick=this._fnDummyFnc!==this._aAnchor[d]._onclick?this._aAnchor[d]._onclick:null,b=this._aAnchor[d].___listeners___||[];
for(var a=0,c=b.length;
c>a;
a++){___Old__addEventListener___.call(this._aAnchor[d],"click",b[a].listener,b[a].useCapture)
}}this._bBlocked=!1
}},_initInfo:function(){this._htInfo.welDrag=null,this._htInfo.elHandle=null,this._htInfo.nStartX=null,this._htInfo.nStartY=null,this._htInfo.nX=null,this._htInfo.nY=null,this._htInfo.bDragStart=!1,this._htInfo.bPrepared=!1,this._htInfo.nCount=0
},_onActivate:function(){this._attachEvent(),this._oTouch.activate()
},_onDeactivate:function(){this._detachEvent(),this._oTouch.deactivate()
},_attachEvent:function(){this._htEvent={},this._htEvent.touchMove=jindo.$Fn(this._onMove,this).bind(),this._htEvent.touchEnd=jindo.$Fn(this._onEnd,this).bind(),this._htEvent.touchStart=jindo.$Fn(this._onStart,this).bind(),this._oTouch.attach("touchStart",this._htEvent.touchStart)
},_detachEvent:function(){this._oTouch.detachAll();
for(var a in this._htEvent){this._htEvent[a]=null
}this._htEvent=null
},destroy:function(){this.deactivate();
for(var a in this._htWElement){this._htWElement[a]=null
}for(a in this._htInfo){this._htInfo[a]=null
}this._htWElement=null,this._htInfo=null,this._isIos=null,this._aAnchor=null,this._fnDummyFnc=null,this._bBlocked=null,this._bTouchStop=null
}}).extend(jindo.m.UIComponent),jindo.m.DropArea=jindo.$Class({$init:function(a,b){this.option({sClassPrefix:"drop-",oDragInstance:null,bActivateOnload:!0,bUseTouchPoint:!1}),this.option(b||{}),this._initVar(),this._setWrapperElement(a),this.option("bActivateOnload")&&this.activate()
},_initVar:function(){this._waOveredDroppableElement=jindo.$A([]),this._sEvent="ontouchstart" in window?"touchmove":"mousemove",this._sDropClassName="."+this.option("sClassPrefix")+"area",this._aItem=null,this._aItemRect=null,this._elHandle=null,this._elDragging=null;
var a=jindo.m.getDeviceInfo();
this._bReCalculateOffset=(a.iphone||a.ipad)&&a.bInapp?!1:!0
},_setWrapperElement:function(a){this._htWElement={},a=jindo.$(a),this._htWElement.base=jindo.$Element(a)
},_getRectInfo:function(b){var c=jindo.$Element(b).offset(),d=0,a=0;
return this._bReCalculateOffset&&jindo.$Element(b).parent(function(f){var g=jindo.m.getCssOffset(f.$value());
d+=g.left,a+=g.top
}),{nLeft:c.left+d,nTop:c.top+a,nRight:c.left+d+b.offsetWidth,nBottom:c.top+a+b.offsetHeight}
},_reCalculate:function(){var b=this._htWElement.base.$value(),c=jindo.$$(this._sDropClassName,b);
b.tagName&&jindo.$$.test(b,this._sDropClassName)&&c.push(b),this._aItem=c,this._aItemRect=[];
for(var d,a=0;
d=c[a];
a++){this._aItemRect.push(this._getRectInfo(d))
}},_findDroppableElement:function(a){var b=jindo.$$.test(a,this._sDropClassName)?a:jindo.m.getClosest(this._sDropClassName,a);
return this._isChildOfDropArea(a)||(b=null),b
},_isChildOfDropArea:function(a){return this._el===document||this._el===a?!0:this._htWElement.base.isParentOf(a)
},_isDropMove:function(q,k,d,g){var w,j,c,m=this._aItem,f=this._aItemRect;
if(this.option("bUseTouchPoint")){for(w=0;
(j=f[w])&&(c=m[w]);
w++){j.nLeft<=q&&q<=j.nRight&&j.nTop<=k&&k<=j.nBottom?(this._addOveredDroppableElement(c),this._fireMoveEvent(c,j,{nX:q,nY:k})):this._removeOveredDroppableElement(c)
}}else{for(w=0;
(j=f[w])&&(c=m[w]);
w++){var b=this._checkOverArea({nMin:j.nLeft,nMax:j.nRight},{nMin:q,nMax:d}),p=this._checkOverArea({nMin:j.nTop,nMax:j.nBottom},{nMin:k,nMax:g});
b&&p?(this._addOveredDroppableElement(c),this._fireMoveEvent(c,j,{nX:q,nY:k})):this._removeOveredDroppableElement(c)
}}},_checkOverArea:function(a,b){if(b.nMin<a.nMin){if(b.nMax>a.nMin){return !0
}}else{if(b.nMin<a.nMax){return !0
}}return !1
},_fireMoveEvent:function(b,d,f){var a=(f.nX-d.nLeft)/(d.nRight-d.nLeft),c=(f.nY-d.nTop)/(d.nBottom-d.nTop);
this.fireEvent("move",{elHandle:this._elHandle,elDrag:this._elDragging,elDrop:b,nRatioX:a,nRatioY:c})
},_addOveredDroppableElement:function(a){-1==this._waOveredDroppableElement.indexOf(a)&&(this._waOveredDroppableElement.push(a),this.fireEvent("over",{elHandle:this._elHandle,elDrag:this._elDragging,elDrop:a}))
},_removeOveredDroppableElement:function(a){var b=this._waOveredDroppableElement.indexOf(a);
-1!=b&&(this._waOveredDroppableElement.splice(b,1),this.fireEvent("out",{elHandle:this._elHandle,elDrag:this._elDragging,elDrop:a}))
},_clearOveredDroppableElement:function(){for(var a;
a=this._waOveredDroppableElement.$value()[0];
){this._waOveredDroppableElement.splice(0,1),this.fireEvent("drop",{elHandle:this._elHandle,elDrag:this._elDragging,elDrop:a})
}},getOveredLists:function(){return this._waOveredDroppableElement?this._waOveredDroppableElement.$value():[]
},_onActivate:function(){if(this._attachEvent(),this.option("oDragInstance")){var a=this.option("oDragInstance"),b=this;
a.attach({handleDown:function(c){b._elHandle=c.elHandle,b._elDragging=c.elDrag,b._waOveredDroppableElement.empty(),b.fireEvent(c.sType,c)
},dragStart:function(c){b.fireEvent(c.sType,c)?b._reCalculate():c.stop()
},beforeDrag:function(c){b.fireEvent(c.sType,c)
},drag:function(g){b._elDragging=g.elDrag;
var p=jindo.$Element(g.elDrag),f=0,k=0;
b._bReCalculateOffset&&p.parent(function(h){var n=jindo.m.getCssOffset(h.$value());
f+=n.left,k+=n.top
});
var j=(b.option("bUseTouchPoint")?g.nTouchY:g.nY)+k,m=(b.option("bUseTouchPoint")?g.nTouchX:g.nX)+f,d=m+p.width(),c=j+p.height();
b._isDropMove(m,j,d,c),b.fireEvent(g.sType,g)
},dragEnd:function(d){var f={};
f.aElDrop=b.getOveredLists().concat();
for(var c in d){f[c]=d[c]
}b._clearOveredDroppableElement(),b.fireEvent(d.sType,f)
},handleUp:function(){b.fireEvent("handleUp",{elHandle:b._elHandle,elDrag:b._elDragging}),b._elHandle=null,b._elDragging=null
}})
}},_onDeactivate:function(){if(this._detachEvent(),this.option("oDragInstance")){var a=this.option("oDragInstance");
a.detachAll()
}},_attachEvent:function(){this._htEvent={}
},_detachEvent:function(){this._htEvent=null
},destroy:function(){this.deactivate();
for(var a in this._htWElement){this._htWElement[a]=null
}this._htWElement=null
}}).extend(jindo.m.UIComponent);
if(jindo&&jindo.$Element&&!jindo.$Element.prototype.preventTapHighlight){jindo.$Element.prototype.preventTapHighlight=function(){if(/(iPhone|iPod|Mobile|Tizen|Android|Nokia|webOS|BlackBerry|Opera Mobi|Opera Mini)/.test(navigator.userAgent)){var b="no_tap_highlight"+new Date().getTime();
var d=document.createElement("style");
var c=document.getElementsByTagName("html")[0];
d.type="text/css";
c.insertBefore(d,c.firstChild);
var a=d.sheet||d.styleSheet;
a.insertRule("."+b+" { -webkit-tap-highlight-color: rgba(0,0,0,0); }",0);
a.insertRule("."+b+" * { -webkit-tap-highlight-color: rgba(0,0,0,.25); }",0);
jindo.$Element.prototype.preventTapHighlight=function(f){return this[f?"addClass":"removeClass"](b)
}}else{jindo.$Element.prototype.preventTapHighlight=function(){return this
}}return this.preventTapHighlight.apply(this,arguments)
}}!(function(h){if(!h.jindo){return
}var g=h.jindo,f,b,j;
if(g.$Element.prototype.attach){f=g.$Element.eventManager;
b=f.test();
j="_jindo_event_none";
for(var a in b){if(b[a].ele===window&&(b=b[a].event.unload)){b=b.type[j].normal;
for(var d=0,c;
c=b[d];
d++){if(~c.toString().indexOf("$Element.eventManager.cleanUpAll")){f.removeEventListener(a,"unload",j,"normal","",c);
break
}}break
}}}else{if(f=g.$Fn.gc.pool["$0"]){b=f._events[0];
if(b.element===window&&b.event==="unload"){f.detach(b.element,b.event)
}}}})(window);
(function(d,a,n){var k=a.performance,j=a.history,o=a.location,p=a.JSON||{stringify:function(r){return d.$Json(r).toString()
},parse:function(r){return d.$Json(r).toObject()
}},m="___persist___",f="KEY"+m,q=(k&&k.navigation&&(k.navigation.type===(k.navigation.TYPE_BACK_FORWARD||2))),b="replaceState" in j&&"state" in j,h=(function(){var t="__tmp__"+m;
var y=["sessionStorage","localStorage"];
for(var s in y){var r=y[s];
if(!(r in a)){continue
}var z=a[r];
try{z.setItem(t,m)
}catch(w){z=null
}if(z&&z.getItem(t)===m){return z
}}return null
})();
if(!b&&!h){return
}function c(){console.warn("window.history or session/localStorage has no valid format data to be handled in persist.")
}function g(r){if(h){if(r){h.setItem(o.href+m,p.stringify(r))
}else{h.removeItem(o.href+m)
}}else{try{j.replaceState(r===null?null:p.stringify(r),n.title,o.href)
}catch(s){console.warn(s.message)
}}a[m]=r?true:null
}!q&&g(null);
a.Persist=d.$Class({$init:function(){this._isPersisted=a[m]===true;
!q&&this._reset();
d.$Fn(this._onPageShow,this).attach(a,"pageshow")
},_onPageShow:function(r){this._isPersisted=this._isPersisted||(r.$value()&&r.$value().persisted);
if(!this._isPersisted&&q){this.fireEvent("persist",{state:this._getStateByKey(f)})
}else{this._reset()
}},_reset:function(){this._setState(null)
},_getState:function(){var t;
var r=h?h.getItem(o.href+m):j.state;
var s=typeof r==="string"&&r.length>0&&r!=="null";
var y;
try{t=p.parse(r);
y=!(typeof t!=="object"||t instanceof Array);
if(!s||!y){throw new Error()
}}catch(w){c();
t={}
}return t
},_getStateByKey:function(s){var r=this._getState()[s];
if(r==="null"||typeof r==="undefined"){r=null
}return r
},_setState:g,_setStateByKey:function(s,t){var r=this._getState();
r[s]=t;
this._setState(r)
},persist:function(t){var r,s;
if(typeof t==="string"){r=t;
s=arguments.length===2?arguments[1]:null
}else{r=f;
s=arguments.length===1?t:null
}if(s){this._setStateByKey(r,s)
}return this._getStateByKey(r)
}}).extend(d.m.Component);
a.Persist.isNeeded=function(){var s=d.$Agent().os();
var r=true;
if(s.ios===true||(s.android===true&&parseFloat(s.version)<4.4)){r=false
}a.Persist.isNeeded=function(){return r
};
return r
}}(jindo,window,document));
(function(a){a.createNamespace=function(j){var f=j.split(".");
var h=window;
var d=null;
for(var c=0,b=f.length;
c<b;
c++){var g=f[c];
if(typeof h[g]!=="object"){h[g]={}
}h=h[g];
if(b===(c+1)){d=h
}}return d
}})($);