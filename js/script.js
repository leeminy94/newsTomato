
//////////////////////////////////////////////////////////////////////////////
/*
웹클리어 자바 스크립트

	웹클리어 (블로거 : 저스틴)
	pegasus79@naver.com
	http://www.justin.or.kr (제작자 홈페이지)
	http://webclear.co.kr (웹클리어 블로그)
*/

//////////////////////////////////////////////////////////////////////////////

//Flash Script
function FlashObject(swf, width, height, bgcolor, id, flashvars)
{
    var strFlashTag = new String();
    
    if (navigator.appName.indexOf("Microsoft") != -1)
    {
        strFlashTag += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
        strFlashTag += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=version=8,0,0,0" ';
        strFlashTag += 'id="' + id + '" width="' + width + '" height="' + height + '">';
        strFlashTag += '<param name="movie" value="' + swf + '"/>';
        
        if(flashvars != null) {strFlashTag += '<param name="flashvars" value="' + flashvars + '"/>'};
        strFlashTag += '<param name="quality" value="best"/>';
        strFlashTag += '<param name="bgcolor" value="' + bgcolor + '"/>';
        strFlashTag += '<param name="menu" value="false"/>';
        strFlashTag += '<param name="salign" value="LT"/>';
        strFlashTag += '<param name="scale" value="noscale"/>';
        strFlashTag += '<param name="wmode" value="transparent"/>';
        strFlashTag += '<param name="allowScriptAccess" value="always"/>';
        strFlashTag += '</object>';
    }
    else
    {
        strFlashTag += '<embed src="' + swf + '" ';
        strFlashTag += 'quality="best" ';
        strFlashTag += 'bgcolor="' + bgcolor + '" ';
        strFlashTag += 'width="' + width + '" ';
        strFlashTag += 'height="' + height + '" ';
        strFlashTag += 'menu="false" ';
        strFlashTag += 'scale="noscale" ';
        strFlashTag += 'id="' + id + '" ';
        strFlashTag += 'salign="LT" ';
        strFlashTag += 'wmode="transparent" ';
        strFlashTag += 'allowScriptAccess="always" ';
        if(flashvars != null) {strFlashTag += 'flashvars="' + flashvars + '" '};
        strFlashTag += 'type="application/x-shockwave-flash" ';
        strFlashTag += 'pluginspage="http://www.macromedia.com/go/getflashplayer">';
        strFlashTag += '</embed>';
    }

 document.write(strFlashTag);
}

function swfView(s, d, m, w, h){
	document.write("<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0\" width="+w+" height="+h+" id="+d+">");
	document.write("<param name='allowScriptAccess' value='always' />");
	document.write("<param name=wmode value="+m+" />");
	document.write("<param name=movie value="+s+" />");
	document.write("<param name=quality value=high />");
	document.write("<param name=menu value=false />");
	document.write("<embed src="+s+" quality=high wmode="+m+" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash\" width="+w+" height="+h+" id="+d+">");
	document.write("</embed>");
	document.write("</object>");
}

//Flash Script End

//////////////////////////////////////////////////////////////////////////////
//All Focus
function allblur() {
	for (i = 0; i < document.links.length; i++) {
	var obj = document.links[i];
	if(obj.addEventListener) obj.addEventListener("focus", oneblur, false);
	else if(obj.attachEvent) obj.attachEvent("onfocus", oneblur);
	}
}
function oneblur(e) {
	var evt = e ? e : window.event;
	if(evt.target) evt.target.blur();
	else if(evt.srcElement) evt.srcElement.blur();
}
//All Focus End

//////////////////////////////////////////////////////////////////////////////
//Menu Open/Close
function clickshow(num) {
    menu = document.getElementById("block"+num);
	if( menu != null && typeof menu != "undefined" )
		{
			if (menu.style.display=="block"){
			menu.style.display="none";//Close
		}
	else{
		menu.style.display="block";//Sub Menu Open
		}
	}

}


//Menu Open/Close End
function clickblock(num) {
    if (num != 4) {
        try {
            for (i = 1; i <= 100; i++) {
                var menu = eval("cblock" + i + ".style");

                if (num == i) { menu.display = "block"; }
                else { menu.display = "none"; }
            }
        }
        catch (exception) {
        }
    }
    else {
        $("cblock1").css("display", "none");
        $("cblock2").css("display", "none");
        
    }
}

//////////////////////////////////////////////////////////////////////////////
//Top MENU Script
function rollOverImg(obj, src) {
	obj.src = src;
}
var newSelected = "menu01";
function newList4(obj, imgSrc, act) {
    if (act == 'click') {
	
		rollOverImg(obj, imgSrc);
		document.getElementById("s_"+newSelected).style.display = 'none';
		document.getElementById(newSelected).src = "./images/" + newSelected + ".gif";
		document.getElementById("s_"+String(obj.id)).style.display = 'block';
		rollOverImg(obj, imgSrc);
		newSelected = String(obj.id);
	} else {
		if (String(obj.id) != newSelected) {
			rollOverImg(obj, imgSrc);
		}
	}
}


//On Hover Over
function megaHoverOver(){
    $(this).find(".sub").stop().fadeTo('fast', 1).show(); //Find sub and fade it in
    (function($) {
        //Function to calculate total width of all ul's
        jQuery.fn.calcSubWidth = function() {
            rowWidth = 0;
            //Calculate row
            $(this).find("ul").each(function() { //for each ul...
                rowWidth += $(this).width(); //Add each ul's width together
            });
        };
    })(jQuery); 

    if ( $(this).find(".row").length > 0 ) { //If row exists...
        var biggestRow = 0;	

        $(this).find(".row").each(function() {	//for each row...
            $(this).calcSubWidth(); //Call function to calculate width of all ul's
            //Find biggest row
            if(rowWidth > biggestRow) {
                biggestRow = rowWidth;
            }
        });

        $(this).find(".sub").css({'width' :biggestRow}); //Set width
        $(this).find(".row:last").css({'margin':'0'});  //Kill last row's margin

    } else { //If row does not exist...

        $(this).calcSubWidth();  //Call function to calculate width of all ul's
        $(this).find(".sub").css({'width' : rowWidth}); //Set Width
    }
}
//On Hover Out
function megaHoverOut(){
  $(this).find(".sub").stop().fadeTo('fast', 0, function() { //Fade to 0 opactiy
      $(this).hide();  //after fading, hide it
  });
}

//Set custom configurations
var config = {
     sensitivity: 2, // number = sensitivity threshold (must be 1 or higher)
     interval: 100, // number = milliseconds for onMouseOver polling interval
     over: megaHoverOver, // function = onMouseOver callback (REQUIRED)
     timeout: 500, // number = milliseconds delay before onMouseOut
     out: megaHoverOut // function = onMouseOut callback (REQUIRED)
};

// $("ul#topnav li .sub").css({'opacity':'0'}); //Fade sub nav to 0 opacity on default
// $("ul#topnav li").hoverIntent(config); //Trigger Hover intent with custom configurations

// MENU Jquery END

//////////////////////////////////////////////////////////////////////////////
// Button script
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr;
  for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
	var d=document;
	if(d.images){
		if(!d.MM_p) d.MM_p=new Array();
		var i,j=d.MM_p.length,a=MM_preloadImages.arguments;
		for(i=0; i<a.length; i++)
		if (a[i].indexOf("#")!=0){
			d.MM_p[j]=new Image;
			d.MM_p[j++].src=a[i];
		}
	}
}

function MM_findObj(n, d) { //v4.01
	var p,i,x;
	if(!d) d=document;
	if((p=n.indexOf("?"))>0&&parent.frames.length){
		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);
	}
	if(!(x=d[n])&&d.all) x=d.all[n];
	for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	if(!x && d.getElementById) x=d.getElementById(n);
	return x;
}

function MM_swapImage() { //v3.0
	var i,j=0,x,a=MM_swapImage.arguments;
	document.MM_sr=new Array;
	for(i=0;i<(a.length-2);i+=3)
	if ((x=MM_findObj(a[i]))!=null){
		document.MM_sr[j++]=x;
		if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];
	}
}

//////////////////////////////////////////////////////////////////////////////
// PNG Trans Start
function setPng24(obj) {
	obj.width=obj.height=1;
	obj.className=obj.className.replace(/\bpng24\b/i,'');
	obj.style.filter =
	"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
	obj.src='';
	return '';
}
// PNG Trans End

//////////////////////////////////////////////////////////////////////////////
// quick
var stmnLEFT = -20; // 왼쪽 여백 (메뉴가 왼쪽에서 400픽셀 떨어진 곳에 보여집니다) 
var stmnGAP1 = 150; // 위쪽 여백 (메뉴가 위에서 10픽셀 떨어진 곳에 보여집니다) 
var stmnGAP2 = 150; // 스크롤시 브라우저 위쪽과 떨어지는 거리 
var stmnBASE = 150; // 스크롤 시작위치 
var stmnActivateSpeed = 35; 
var stmnScrollSpeed = 20; 

var stmnTimer; 


function RefreshStaticMenu() { 
	var stmnStartPoint, stmnEndPoint; 
	
	stmnStartPoint = parseInt(document.getElementById('STATICMENU').style.top, 10); 
	stmnEndPoint = Math.max(document.documentElement.scrollTop, document.body.scrollTop) + stmnGAP2; 
	if (stmnEndPoint < stmnGAP1) stmnEndPoint = stmnGAP1; 
	
	if (stmnStartPoint != stmnEndPoint) { 
		stmnScrollAmount = Math.ceil( Math.abs( stmnEndPoint - stmnStartPoint ) / 15 ); 
		document.getElementById('STATICMENU').style.top = parseInt(document.getElementById('STATICMENU').style.top, 10) + ( ( stmnEndPoint<stmnStartPoint ) ? -stmnScrollAmount : stmnScrollAmount ) + 'px'; 
		stmnRefreshTimer = stmnScrollSpeed; 
	}
	
	stmnTimer = setTimeout("RefreshStaticMenu();", stmnActivateSpeed); 
} 


function InitializeStaticMenu() {
	document.getElementById('STATICMENU').style.left = stmnLEFT + 'px'; 
	document.getElementById('STATICMENU').style.top = document.body.scrollTop + stmnBASE + 'px'; 
	RefreshStaticMenu();
}
// quick END

//////////////////////////////////////////////////////////////////////////////
// Layer Popup
isIE=document.all;
isNN=!document.all&&document.getElementById;
isN4=document.layers;
isHot=false;

function ddInit(e){
	topDog=isIE ? "BODY" : "HTML";
	whichDog=isIE ? document.all.divpop : document.getElementById("divpop");
	whichDog=isIE ? document.all.divpop1 : document.getElementById("divpop1");
	hotDog=isIE ? event.srcElement : e.target;
	while (hotDog.id!="titleBar"&&hotDog.tagName!=topDog){
		hotDog=isIE ? hotDog.parentElement : hotDog.parentNode;
	}
	if (hotDog.id=="titleBar"){
	offsetx=isIE ? event.clientX : e.clientX;
	offsety=isIE ? event.clientY : e.clientY;
	nowX=parseInt(whichDog.style.left);
	nowY=parseInt(whichDog.style.top);
	ddEnabled=true;
	document.onmousemove=dd;
	}
}

function dd(e){
	if (!ddEnabled) return;
	whichDog.style.left=isIE ? nowX+event.clientX-offsetx : nowX+e.clientX-offsetx;
	whichDog.style.top=isIE ? nowY+event.clientY-offsety : nowY+e.clientY-offsety;
	return false;
}

function ddN4(whatDog){
	if (!isN4) return;
	N4=eval(whatDog);
	N4.captureEvents(Event.MOUSEDOWN|Event.MOUSEUP);
	N4.onmousedown=function(e){
		N4.captureEvents(Event.MOUSEMOVE);
		N4x=e.x;
		N4y=e.y;
	}
	N4.onmousemove=function(e){
		if (isHot){
		N4.moveBy(e.x-N4x,e.y-N4y);
		return false;
		}
	}
	N4.onmouseup=function(){
		N4.releaseEvents(Event.MOUSEMOVE);
	}
}

function hideMe(){
	if (isIE||isNN) whichDog.style.visibility="hidden";
	else if (isN4) document.divpop.visibility="hide";
	else if (isN4) document.divpop1.visibility="hide";
	else if (isN4) document.divpop2.visibility="hide";
}
function showMe(){
	if (isIE||isNN) whichDog.style.visibility="visible";
	else if (isN4) document.divpop.visibility="show";
	else if (isN4) document.divpop1.visibility="show";
	else if (isN4) document.divpop2.visibility="show";
}

document.onmousedown=ddInit;
document.onmouseup=Function("ddEnabled=false");

function joinin(){
	document.getElementById("divpop").style.display='inline'
}
function joinout(){
	document.getElementById("divpop1").style.display='inline'
}
function goods(){
	document.getElementById("divpop2").style.display='inline'
}


function close_Layer(){
	document.getElementById("divpop").style.display='none'
}
function close_Layer(){
	document.getElementById("divpop1").style.display='none'
}
function close_Layer(){
	document.getElementById("divpop2").style.display='none'
}
// Layer Popup


//////////////////////////////////////////////////////////////////////////////
// Top Menu
var channelMenu = "channelMenu1";
var channelMenuImg = "http://image.newstomato.com/images/top_menu01.gif";

function rollOverImg(obj, src) {
	obj.src = src;
}

function tabChannelMenu(obj, imgSrc, act) {
	document.getElementById("i" + channelMenu).style.display = 'none';
	document.getElementById(channelMenu).src = channelMenuImg;
	document.getElementById("i" + String(obj.id)).style.display = 'block';
	channelMenuImg = obj.src;
	rollOverImg(obj, imgSrc);
	channelMenu = String(obj.id);
}
// Top Menu


//////////////////////////////////////////////////////////////////////////////
// Text Size
function ResizeFont(num) {
	var content, fontSize, lineHeight, proc;
	content = document.getElementById("newsContentArea");

	fontSize = content.style.fontSize;
	fontSize = fontSize.replace("px", "");
	lineHeight = content.style.lineHeight;
	lineHeight = lineHeight.replace("px", "");

	proc = false;
	if (num > 0) {
		if (fontSize <= 18) {
			proc = true;
		}
	}
	else {
		if (fontSize > 12)
			proc = true;
	}

	if (proc) {
		fontSize = parseInt(fontSize) + parseInt(num);
		lineHeight = Math.round(1.4 * fontSize);
		content.style.fontSize = fontSize + "px";
		content.style.lineHeight = lineHeight + "px";
	}
}
// Text Size

//링크 자동걸리게
function autolink(id) {
    var container = document.getElementById(id);
    var doc = container.innerHTML;
    var regURL = new RegExp("(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)", "gi");
    var regEmail = new RegExp("([xA1-xFEa-z0-9_-]+@[xA1-xFEa-z0-9-]+\.[a-z0-9-]+)", "gi");
    container.innerHTML = doc.replace(regURL, "<a href='$1://$2' target='_blank'>$1://$2</a>").replace(regEmail, "<a href='mailto:$1'>$1</a>");
}