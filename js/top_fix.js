var JS_DIR = '';
var video_dir = '';
var MAIN_MB_DV_C = '00';


window.LIB_NAME="bnui";
window.LIB_DIV_DEBUG=false;
window.IS_DEBUG=location.href.indexOf("jsdebug=true")>=0;
window.IS_APP=location.href.indexOf("app=true")>=0;
(function($){
	var LIB_NAME=window.LIB_NAME||"bnui";
	if(window[LIB_NAME]){
		return
	}
	if(!$){throw new Error("This library requires jQuery")
}
var context=window,
$root=$(document.documentElement).addClass("js"),
tmpInput=document.createElement("input"),
isTouch=("ontouchstart" in context),
isMobile=("orientation" in context)||isTouch||window.IS_MOBILE===true,
supportPlaceholder=("placeholder" in tmpInput);
isTouch&&$root.addClass("touch");
isMobile&&$root.addClass("mobile");
if(typeof Function.prototype.bind==="undefined"){
	Function.prototype.bind=function(){
		var fn=this,args=arraySlice.call(arguments),object=args.shift();
		return function(context){
			var local_args=args.concat(arraySlice.call(arguments));
			if(this!==window){
				local_args.push(this)
			}
			return fn.apply(object,local_args)
		}
	}
}

var core=context[LIB_NAME]||(context[LIB_NAME]={});
var doc=document,arrayProto=Array.prototype,objectProto=Object.prototype,toString=objectProto.toString,hasOwn=objectProto.hasOwnProperty,arraySlice=arrayProto.slice,isPlainObject=(toString.call(null)==="[object Object]")?function(value){return value!==null&&value!==undefined&&toString.call(value)==="[object Object]"&&value.ownerDocument===undefined}:function(value){return toString.call(value)==="[object Object]"},isType=function(value,typeName){},
isArray=function(obj){},
isFunction=function(obj){},
each=function(obj,iterater,ctx){
	if(!obj){return obj}
	var i=0,len=0,isArr=isArray(obj);
	if(isArr){
		for(i=0,len=obj.length;i<len;i++){
			if(iterater.call(ctx||obj,obj[i],i,obj)===false){
				break
			}
		}
	}else{
		for(i in obj){
			if(hasOwn.call(obj,i)){
				if(iterater.call(ctx||obj,obj[i],i,obj)===false){break}
			}
		}
	}
	return obj
},
eachReverse=function(obj,iterater,ctx){},
extend=function(deep,obj){
	var args;
	if(deep===true){args=arraySlice.call(arguments,2)}
	else{
		args=arraySlice.call(arguments,1);
		obj=deep;
		deep=false
	}
	each(args,function(source){
		if(!source){return}
		each(source,function(val,key){
			var isArr=isArray(val);
			if(deep&&(isArr||isPlainObject(val))){
				obj[key]||(obj[key]=isArr?[]:{});
				obj[key]=extend(deep,obj[key],val)
			}else{
				obj[key]=val
			}
		})
	});
	return obj
},
clone=function(obj){};
extend(core,{
	name:LIB_NAME,debug:false,each:each,eachReverse:eachReverse,extend:extend,clone:clone,emptyFn:function(){},
	tmpInput:tmpInput,tmpNode:doc.createElement("div"),is:isType,type:isType,isEmpty:function(value,allowEmptyString){
		return(value===null)||(value===undefined)||(value===0)||(core.is(value,"string")&&!allowEmptyString?value==="":false)||(core.is(value,"array")&&value.length===0)||(core.is(value,"object")&&!core.object.hasItems(value))
	},
	addon:function(name,object,isExecFn){
		if(typeof name!=="string"){object=name;name=""}
		var root=core,names=name?name.replace(/^_core\.?/,"").split("."):[],ln=names.length-1,leaf=names[ln];
		if(isExecFn!==false&&typeof object==="function"&&!hasOwn.call(object,"superclass")){
			object=object.call(root)
		}
		for(var i=0;i<ln;i++){
			root=root[names[i]]||(root[names[i]]={}
		)}
		return(leaf&&(root[leaf]?extend(root[leaf],object):(root[leaf]=object)))||extend(root,object),object
	}
});

core.addon("css3",function(){
	var _tmpDiv=core.tmpNode,_prefixes=["Webkit","Moz","O","ms",""],_style=_tmpDiv.style,_noReg=/^([0-9]+)[px]+$/,_vendor=(function(){
		var vendors=["t","webkitT","MozT","msT","OT"],transform,i=0,l=vendors.length;
		for(;i<l;i++){
			if(vendors[i]+"ransitionDuration" in _style&&vendors[i]+"ransform" in _style){
				return vendors[i].substr(0,vendors[i].length-1)
			}
		}
		return false
	})(),
	string=core.string;
	function prefixStyle(name,isHyppen){
		if(_vendor===false){return isHyppen?name.toLowerCase():name}
		if(_vendor===""){return isHyppen?name.toLowerCase():name}
		if(isHyppen){
			return"-"+_vendor.toLowerCase()+"-"+name[0].toLowerCase()+string.dasherize(name.substr(1))
		}return
		_vendor+string.capitalize(name)
	}return{
		support:_vendor!==false,support3D:(function(){
			var body=doc.body,docEl=doc.documentElement,docOverflow;
			if(!body){
				body=doc.createElement("body");
				body.fake=true;
				body.style.background="";
				body.style.overflow="hidden";
				body.style.padding="0 0 0 0";
				docEl.appendChild(body)}
				docOverflow=docEl.style.overflow;
				docEl.style.overflow="hidden";
				var parent=doc.createElement("div"),
				div=doc.createElement("div"),cssTranslate3dSupported;
				div.style.position="absolute";
				parent.appendChild(div);
				body.appendChild(parent);
				div.style[prefixStyle("transform")]="translate3d(20px, 0, 0)";
				cssTranslate3dSupported=($(div).position().left-div.offsetLeft==20);
				if(body.fake){
					body.parentNode.removeChild(body);
					docEl.offsetHeight;
					body=null
				}else{
					parent.parentNode.removeChild(parent)
				}
				docEl.style.overflow=docOverflow;
				return cssTranslate3dSupported
			})(),
			prefix:prefixStyle
		}
	}
);
core.addon({
	browser:(function(){
		var detect={},win=context,na=win.navigator,ua=na.userAgent,lua=ua.toLowerCase(),match;
		detect.placeholder=supportPlaceholder;
		detect.isStrict=(typeof context=="undefined");
		detect.isAndroid=lua.indexOf("android")!==-1;
		detect.isBadAndroid=/Android /.test(na.appVersion)&&!(/Chrome\/\d/.test(na.appVersion));
		detect.isOpera=!!(win.opera&&win.opera.buildNumber);
		detect.isWebKit=/WebKit/.test(ua);
		detect.isTouch=!!("ontouchstart" in window);
		match=/(msie) ([\w.]+)/.exec(lua)||/(trident)(?:.*rv.?([\w.]+))?/.exec(lua)||["",null,-1];
		detect.isIE=!detect.isWebKit&&!detect.isOpera&&match[1]!==null;
		detect.version=detect.ieVersion=parseInt(match[2],10);
		detect.isOldIE=detect.isIE&&detect.version<9;
		detect.isWin=(na.appVersion.indexOf("Win")!=-1);
		detect.isMac=(ua.indexOf("Mac")!==-1);
		detect.isLinux=(na.appVersion.indexOf("Linux")!=-1);
		detect.is64Bit=(lua.indexOf("wow64")>-1||(na.platform==="Win64"&&lua.indexOf("x64")>-1));
		detect.isChrome=(ua.indexOf("Chrome")!==-1);
		detect.isGecko=(ua.indexOf("Firefox")!==-1);
		detect.isAir=((/adobeair/i).test(ua));
		detect.isIOS=/(iPad|iPhone)/.test(ua);
		detect.isSafari=!detect.isChrome&&(/Safari/).test(ua);
		detect.isIETri4=(detect.isIE&&ua.indexOf("Trident/4.0")!==-1);
		detect.msPointer=!!(na.msPointerEnabled&&na.msMaxTouchPoints&&!win.PointerEvent);
		detect.pointer=!!((win.PointerEvent&&na.pointerEnabled&&na.maxTouchPoints)||detect.msPointer);
		if(detect.isAndroid){
			detect.androidVersion=function(){
				var v=ua.match(/[a|A]ndroid[^\d]*(\d+).?(\d+)?.?(\d+)?/);
				if(!v){return -1}
				return[parseInt(v[1]|0,10),parseInt(v[2]|0,10),parseInt(v[3]|0,10)]
			}()
		}else{
			if(detect.isIOS){
				detect.iosVersion=function(){
					var v=ua.match(/OS (\d+)_?(\d+)?_?(\d+)?/);
					return[parseInt(v[1]|0,10),parseInt(v[2]|0,10),parseInt(v[3]|0,10)]
				}()
			}
		}
		detect.isMobile=isMobile||detect.isIOS||detect.isAndroid;
		return detect
	}()),
	delayRun:function(fn,time,scope){},
	lpad:function(val,len,str){
		var v=new String(val),n=(len||2)-v.length,s=str||"0",p="",i;
		for(i=0;i<n;i+=1){p+=s}
		return p+v
	}
});
})(jQuery);






/*!
 * @author bnui.ui.js
 * @email comahead@vi-nyl.com
 * @create 2014-12-02
 * @license MIT License
 */

(function(e,c){
	window.IS_MOBILE=window.IS_MOBILE||!!~location.href.indexOf("css=mobile");
	var a=e(window),d=e("body"),j=d[0].className,f=!!~j.indexOf("pc_response")||!!~j.indexOf("pc_body");
	c.consts={MOBILE_SIZE:768,M_HEADER_HEIGHT:44,P_HEADER_HEIGHT:56};
	c.isMobileMode=c.isMobileSize=function(k){
		if(f){return false}
		if(k===undefined){k=a.width()}
		return window.IS_MOBILE===true||k<=c.consts.MOBILE_SIZE
	};
	c.addon("GlobalUIs",function(){
		var l=e(document);
		var k={
			init:function(){
				var m=this;
				if(m._inited){return}
				m._header();
			},
			_header:function(){
				var H=this,r,G,s=e("#htop"),B=e("#wrap"),m=e("#contents"),q=s.find(".top_fix"),C=e(".top_fix"),v=false,E=false,I=e(".btn_fix");
				var n=C.height();
				var o=C.outerHeight(true);
				a.on("scroll.globalheader",r=function(O){
					var N=a.scrollTop(),M=false;
					var K=c.isMobileMode()?o:o;
					if(c.isMobileMode()){
						M=N>(C.is(".visible")?K:0)
					}else{
						M=N>(C.is(".on")?K:0)
					}if(M&&!E){
						s.css({left:-a.scrollLeft(),width:e("#wrap").width()})
					}else{
						s.css({left:"",width:""})
					}
					s.not(".opened").toggleClass("fixed",M);
					if(M){
						if(c.isMobileMode()){}
						if(C.is(".visible")){
							var L=o+e(".htop_wrap").outerHeight()
						}else{
							var L=e(".htop_wrap").outerHeight()
						}
					}else{}
				})
			},
		};
		return k
	});
	e(function(){c.GlobalUIs.init()});
})(jQuery,window[LIB_NAME]);

