COOKIE_NAME_BOOKMARK = "PMXY_BookMark";
COOKIE_VALUE_BOOKMARK = "true";
COOKIE_EXPIRE_DAYS = 100;
GAME_TITLE = "飘渺西游";
GAME_URL = window.location;
function addBookmark(){
	var _cookieValue = getCookie(COOKIE_NAME_BOOKMARK);
	if(_cookieValue != COOKIE_VALUE_BOOKMARK){

		AddFavorite(GAME_URL,GAME_TITLE);
	}
	setCookie(COOKIE_NAME_BOOKMARK,COOKIE_VALUE_BOOKMARK,100*24*24*60*1000);
}
function getCookie(pubname)
{
	if (document.cookie.length>0)
	{
		start=document.cookie.indexOf(pubname + "=");
		if (start!=-1)
		{
			start=start + pubname.length+1;
			end=document.cookie.indexOf(";",start);
			if (end==-1) end=document.cookie.length;
			return unescape(document.cookie.substring(start,end));
		}
	}
	return "";
}
function setCookie(cookNmae,cookValue,cookTime)
{
	var exdate=new Date();
	exdate.setTime(exdate.getTime() + cookTime);
	document.cookie=cookNmae+"=" +escape(cookValue)+";expires="+exdate.toGMTString();
}
function AddFavorite(url, title)
{
	if(document.all){
		try{
			window.external.addFavorite(url, title);
		}catch (e1){
			try{
				window.external.addToFavoritesBar(url, title);
			}catch (e2){
				return true;
			}
		}
	}else if(window.sidebar){
		window.sidebar.addPanel(title,url,"");
	}else{
		return true;
	}
}
window.onbeforeunload = addBookmark;
function navi(){
	var gnHTML = "";
	var gnBNR = "";
	gnHTML += '<style>body{background-color:#000;}body,ul,ol,li,p{margin:0;padding:0;}.cf:after{display:block; height:0; visibility:hidden; clear:both; content:".";}.cf{display:inline-block;}* html .cf{height:1em;}ol,ul,li{list-style:none;}.cf{display:block;}.bar .wan5dOpt .w5d, .bar ul.naviLink li, ul.set li{background:url(http://cdnimg.wan5d.com/wan5d/img/bar/navi.gif?201205302) no-repeat;}#barBg{width:100%; height:25px; background-color:#fff; overflow:hidden;}.bar{width:1000px; margin:0 auto;}.bar .wan5dOpt{float:left; text-align:left;}.bar .wan5dOpt .w5d{float:left; padding-left:40px; width:180px; height:25px; text-align:left;}.bar .wan5dOpt .w5d a{width:145px; height:25px; display:block; text-indent:-9999px; text-align:left;}.bar .wan5dOpt ul.set{float:left; color:#03A3D7; font-size:12px; line-height:28px; background-position:-233px 2px;}.bar .wan5dOpt ul.set li{float:left;padding-left:25px; width:70px; height:25px; display:inline; overflow:hidden;}.bar .wan5dOpt ul.set li.pmxy{background-position:-233px 2px;}.bar .wan5dOpt ul.set li.ntj{width:60px;background-position:-233px -23px;}.bar .wan5dOpt ul.set li.dfp{padding-left:28px; width:50px; background-position:-320px -23px;}.bar .wan5dOpt ul.set a{color:#9f9f9f; text-decoration:none;}.bar .wan5dOpt ul.set a:hover,.bar ul.naviLink li a:hover{color:#03A3D7; text-decoration:underline;}.bar .wan5dOpt ul.set a em{font-weight:normal; font-style:normal;color:#03A3D7;}.bar ul.naviLink{float:right; height:25px;}.bar ul.naviLink li{float:left; background-position:right -1px; display:inline-block;}.bar ul.naviLink li a{padding:0 9px 0 8px; font-size:12px; color:#666; line-height:28px; height:25px; display:inline-block;}.bar ul.naviLink li a{text-decoration:none;}.bar ul.naviLink li.bbs{background:none;}.bar ul.naviLink li.close{margin-left:30px; padding-left:16px; width:40px; font-size:12px; color:#000; line-height:28px; _line-height:28px; background-position:-440px 7px; cursor:pointer;}#bnrPhoto{margin:0 auto; width:1000px;}</style>';
	gnHTML += '<div id="barBg">';
	gnHTML += '	<div class="bar cf">';
	gnHTML += '		<ul class="naviLink cf">';
	gnHTML += '			<li><a href="http://pmxy.wan5d.com/" target="_blank">飘渺西游官网</a></li>';
	gnHTML += '			<li><a href="http://pay.wan5d.com?serverId=60" target="_blank" style="color: red;">充值中心</a></li>';
	gnHTML += '			<li><a href="http://s1.wan5d.com/QQ/" target="_blank">官方交流群</a></li>';
	gnHTML += '			<li><a href="http://s1.wan5d.com/WeChat/" target="_blank">游戏公众号</a></li>';
	gnHTML += '			<li><a href="http://pmxy.wan5d.com/html/zl/rwsx.html" target="_blank">游戏攻略</a></li>';
	gnHTML += '			<li><a href="http://pmxy.wan5d.com/html/zl/cwhd.html" target="_blank">绝世宠物</a></li>';
	gnHTML += '			<li><a href="#" onclick="AddFavorite(\''+GAME_URL+'\', \''+GAME_TITLE+'\');return false;">收藏</a></li>';
	gnHTML += '			<li class="bbs"><a href="http://www.wan5d.com/interface/shortcut.php?refer='+encodeURIComponent(GAME_URL)+'">设为桌面图标</a></li>';
	gnHTML += '			<li onclick="naviAction();" class="close">关闭</li>';
	gnHTML += '		</ul>';
	gnHTML += '	</div>';
	gnHTML += '</div>';
	$("body").prepend(gnHTML);
	
	gnBNR += '<div id="bnrPhoto"><iframe src="http://pmxy.wan5d.com//html/pmxybottom.html" scrolling="no" frameborder="0" width="1000" height="147"></iframe></div>';
	$("body").append(gnBNR);
}
function naviAction(){
	$("#barBg").slideToggle("fast");
	$("#bnrPhoto").slideToggle("fast");
}
$(document).ready(function(){
	navi();
});