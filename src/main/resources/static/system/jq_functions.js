//http://www.gfsoso.net/ 
//http://www.guge.io/
//http://www.bootcss.com/p/bootstrap-datetimepicker/
//http://www.jeasyui.com/demo/main/
//http://www.oschina.net/project/tag/273/jquery/
//http://jqueryui.com/tabs/
//http://www.jeasyui.net/demo/380.html
//http://www.jeasyui.com/demo/main/index.php
//http://www.jqwidgets.com/jquery-widgets-demo/demos/jqxcombobox/index.htm
//http://www.jqwidgets.com/jquery-widgets-documentation/documentation/jqxcombobox/jquery-combobox-getting-started.htm
//修改部署的文件路径，修改工种目录中的.project文件中的<name>项
//1. Eclipse-->Preferences..（MyEclipse--> Window -->Preferences:） 2. 在“type filter text“的框框里输入”ContentTypes;3. 点击右边的Text，选择Java Properties File，看一下 下面的两个选项  
//Project->Properties->javabuildpath+Libraries下，可以Add一个Jar到这个Project里。
//修改部署的文件路径，修改工种目录中的.project文件中的<name>项
//windows+preferences+general -> appearance -> colors and fonts 右边展开basic -> text font
pxmlfile='xml//resource.xml';
//pxmlfile='xml//resourcecategory.xml';
//pxmlfile='xml//km.xml';
sysdbname="embase";  //数据库名称变量
sysuserid=1;    //用户编码变量
sysusaccount="admin";  //用户账号变量
sysusername="admin";   //用户名称变量
syspassword='';    //用户登录密码变量
syshostname='localhost';  //数据库服务器名称变量
syssqlpassword='sql2008';   //数据库服务器sa用户登录密码变量
syslogindate=new Date();   //系统登录日期变量
sysunittitle='';     //账套变量
sysdatabasestring=syshostname+'	'+syssqlpassword+'	'+sysdbname;  //数据库连接字符串:hostname+password+dbname
sysuserright='';   //用户操作权限变量
syschrtab=String.fromCharCode(9);   //tab键字符串execusql多条sql语句之间分割
rowHeight=32;
colWidth=8;
sysfontwidth=12;
syspath={};
sys={};
pmyWidth={};  //记录字段值的宽度
sys.browser=myCheckBrowser();  //游览器类别
sysdateformat='Y-n-j';  //日期控件的日期格式，不足0
sysfulldateformat='Y-m-d';  //日期控件的日期格式,补足0  
if (sys.browser=='firefox' ) sysdateformat='Y-m-d';  //补足0
else if (sys.browser=='ie')  sysdateformat='Y/m/d';
sys.labelfont='宋体'; //label显示的字体
sys.textfont='Times New roman'; //输入框的字体
sys.fontsize=13;  //label字体大小
sys.fontbold=false;  //label字体是否加黑 
sys.textheight=22;  //输入框的默认高度
sys.labeltopmargin=5;  //label与输入框的高度差
sys.theme={ theme: "bootstrap" };
sys.tab=String.fromCharCode(9);  //tab键
sys.ftab='['+String.fromCharCode(9)+']';  //tab键分隔各字段名称
sys.vtab='['+String.fromCharCode(9)+']';  //tab键分隔各字段值
sys.sqltab='@'+String.fromCharCode(9)+'@';  //sql语句之间tab键分隔
sys.gridcellpix=6;  //表格中每个字符的像素值
sys.treemenuwidth=190;
sys.urlpath="";  //工程路径
sys.project="";  //工程名称
url=window.location.pathname; //hostname; //href;
arrUrl=url.split("/");
if (arrUrl.length>1) sys.project=arrUrl[1];
sys.realpath='';
sys.path=url;
sys.userid=1;
sys.useraccount="admin",
sys.username="admin";
sys.userright='';
sys.urlright='';  //用户进入的程序链接名称，用于权限设置
sys.menuurl='';  //用户进入的程序链接名称，用于权限设置
sys.buttonright='';  //按钮权限
sys.screenwidth=window.screen.width;
sys.screenheight=window.screen.height;
sys.windowheight=sysGetWinHeight();
sys.windowwidth=sysGetWinWidth();
sys.menubutton=['addflag','updateflag','deleteflag','reviewflag','uploadflag','downloadflag','printflag'];
sys.chnnumber=['一','二','三','四','五','六','七','八','九','十'];
//控件
sys.cmp = [
		'textfield','combo','combofield','label','labelfield',
		'readonlyfield','displayfield','linkfield',
		'textpicker','gridpicker','treepicker','editbutton',
		'checkbox','memofield','memo',
		'sysuser','sysdate','sysusername','sysnumber',
		'fileupload','filedownload','filefield','imageupload',
		'datefield','password',
		'numberfield','decimalfield','rmb','rmbfield','totalfields','summaryfields',
		'spinfield',
		'report','footer',
		'groupbox','tab','form'
	];
//属性
sys.xattrs=['title','text','label','length','value','blanktext','minvalue','maxvalue','filename','datafields','nodefields','filterfields','sortfield','style','rmb','sumfields','avgfields','countfields','maxfields','minfields','summarycolumn',
'keyfield','lockedfields','decimal','sql','items','valuefields','labelwidth','masterfield','url','font','rule','rowheight','checkbox','modal','align','table',
'documentdate','reviewfields','format','titlerows','titlefont'];

//可编辑列数据类型
sys.editableColumnfields="/textfield/datefield/decimalfield/numberfield/combo/combofield/editbutton/";  
//上传后附件的存放路径
syspath.master="mybase//";
syspath.teachers="mybase//photos//teachers//";
syspath.students="mybase//photos//students//";
syspath.labs="mybase//labs//";
syspath.contacts="mybase//contacts//";  //存放联系人附件
syspath.employees="mybase//employees//";  //存放员工附件
syspath.products="mybase//products//";   //存放产品附件
syspath.activities="mybase//activities//";   //存放活动附件
syspath.services="mybase//services//";   //存放服务附件
syspath.customers="mybase//customers//";   //存放客户附件
syspath.collections="mybase//collections//";  //存放回笼单附件
syspath.orders="mybase//orders//";  //存放订单附件
syspath.faqs="mybase//faqs//";    //存放faq附件
syspath.troubles="mybase//troubles//";    //存放故障附件
syspath.invoices="mybase//invoices//";   //存放发票附件
syspath.resources="mybase//resources//";   //存放资源附件
sysfilenotfound="system//images//filenotfound.png";  
prowppx=26;
pcolppx=7;   
pgridrowheight=21;
pwinheight=600;
pwinwidth=800;
pitemsPerPage=20;  //grid中每页显示的记录数量
maxReturnNumber=20;  //一次从后台返回记录的数量，超过该值树中节点将分层获取。
//以下为函数
function myCheckBrowser(){
	//返回当前正在使用的游览器的类型
	var type=navigator.userAgent.toLowerCase();
	var browser=navigator.userAgent;
	if (type.indexOf('msie')>=0 && type.indexOf('opera')<0) {
		browser='ie';
	}else if (type.indexOf('firefox')>=0) {
		browser='firefox';
	}else if (type.indexOf('opera')>=0) {
		browser='opera';
	}else if (type.indexOf('chrome')>=0) {
		browser='chrome';
	}else if (type.indexOf('safari')>=0) {
		browser='safari';
	}
	return (browser);	 	
}

function sysGetWinWidth(){
	//获取窗口宽度。
	var winWidth = 0;
	if (window.innerWidth)//Internet Explorer,Chrome,Firefox,Opera,Safari;
		winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))//Internet Explorer 8,7,6,5
		winWidth = document.body.clientWidth;
	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
		winWidth = document.documentElement.clientWidth;
	}
	//winWidth=window.screen.width;
	return (winWidth);
}

function sysGetWinHeight(){
	//获取窗口高度。
	var winHeight = 0;
	if (window.innerHeight)
		winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;
	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
		winHeight = document.documentElement.clientHeight;
	}
	//winHeight=window.screen.height;
	return(winHeight);
}

//定义控件位置样式Style
function myDefineLabelStyle(top,left,height,width){
	var str='';
	if (top!=undefined && left!=undefined){
		str+='style=\\"';
		if (sys.fontbold) str+='font-weight:bold; ';
		str+='font-size: '+sys.fontsize+'px; font-family: '+sys.labelfont+'; TOP: '+top+'px; LEFT: '+left+'px; ';
		if (height!=undefined && height>0){
			str+=' HEIGHT: '+height+'px;';
		}	
		if (width!=undefined && width>0){
			str+=' WIDTH: '+width+'px;';
		}
		str+=' POSITION: absolute';
	}	
	return str; 
}

//定义控件位置样式CSS
function mySetLabelCss(top,left,height,width){
	var str='({position: "absolute"';
	if (sys.fontbold) str+=', font-weight:bold';
	str+=', "font-size":'+sys.fontsize+', "font-family":"'+sys.labelfont+'"';
	if (top!=undefined && left!=undefined){
		str+=', "top":'+top+', "left":'+left;
		if (width!=undefined && width>0){
			str+=', "width": '+width;
		}
		if (height!=undefined && height>0){
			str+=', "height": '+height;
		}
		str+=', "z-index":2});\n';
	}else{
		str+="\n";
	}
	//console.log(str);
	return str;		
}

//定义控件位置样式CSS
function mySetTextCss(top,left,height,width){
	var str='';
	if (top!=undefined && left!=undefined){
		//str='$("#'+id+'").css({"padding-left":4,"font-size":'+sys.fontsize+',"font-family":"'+sys.textfont+'", position: "absolute","top":'+top+',"left":'+left;
		//str='$("#'+id+'").css({position: "absolute","top":'+top+',"left":'+left;
		str='({position: "absolute","top":'+top+',"left":'+left;
		if (width!=undefined && width>0){
			str+=', "width": '+width;
		}
		if (height!=undefined && height>0){
			str+=', "height": '+height;
		}
		str+=', "z-index":2});\n';
	}else{
		str+="\n";
	}
	//console.log(str);
	return str;		
}

//定义控件位置样式CSS
function mySetNumericCss(id,top,left,height,width){
	var str='';
	if (top!=undefined && left!=undefined){
		str='$("#'+id+'").css({"padding-right":4,"padding-left":4,"padding-top":0,"padding-bottom":0, "position": "absolute","top":'+top+',"left":'+left;
		//str='$("#'+id+'").css({position: "absolute","top":'+top+',"left":'+left;
		if (width!=undefined && width>0){
			str+=', "width": '+width;
		}
		if (height!=undefined && height>0){
			str+=', "height": '+height;
		}
		str+=', "z-index":2});\n';
	}else{
		str+="\n";
	}
	//console.log(str);
	return str;		
}

//定义text控件
function myTextField(id,parent,label,labelwidth,top,left,height,width,value){
	if (parent=='') parent='document.body';
	//if (height==0) height=sys.textheight;
	var str='';
	if (label!=undefined && label!=''){
		str+='$("#'+parent+'").append("<label id=\'label'+id+'\' align=\'right\'>'+label+'</label>");\n';
		str+='$("#label'+id+'").css'+mySetLabelCss(top+sys.labeltopmargin*1.0,left,0,labelwidth);
		//+myDefineLabelStyle(top+sys.labeltopmargin,left,0,labelwidth)+'\'>'+label+'</label>");\n';
	}
	str+='$("#'+parent+'").append("<input class=\'input-xlarge\' type=\'text\' id=\''+id+'\' />");\n';
	str+='$("#'+id+'").css'+mySetTextCss(top,1.0*(left+labelwidth),height,width);
	if (value!=undefined && value!=''){  //设置初值
		str+='$("#'+id+'").val("'+value+'");\n';
	}
	console.log(str);
	eval(str);  //设置显示绝对位置
	return str;
}

//定义date控件
function myDateField(id,parent,label,labelwidth,top,left,height,width,value){
	if (parent=='') parent='document.body';
	//if (height==0) height=sys.textheight;
	var str='';
	if (label!=undefined && label!=''){
		str+='$("#'+parent+'").append("<label id=\'label'+id+'\' align=\'right\'>'+label+'</label>");\n';
		str+='$("#label'+id+'").css'+mySetLabelCss(top+sys.labeltopmargin*1.0,left,0,labelwidth);
		//+myDefineLabelStyle(top+sys.labeltopmargin,left,0,labelwidth)+'\'>'+label+'</label>");\n';
	}
	//str+='$("#'+parent+'").append("<input class=\'easyui-datebox\' type=\'text\' id=\''+id+'\' />");\n';
	str+='$("#'+parent+'").append("<input class=\'datepicker\' type=\'text\' id=\''+id+'\' />");\n';
	str+='$("#'+id+'").css'+mySetTextCss(top,1.0*(left+labelwidth),height,width);
	if (value!=undefined && value!=''){  //设置初值
		str+='$("#'+id+'").val("'+value+'");\n';
	}
	//str+="$.getScript('jquery/globalization/globalize.culture.ja-JP.js', function () {\n";
	//str+='$("#'+id+'").datepicker({culture: \"ja-JP\", formatString: \"D\", width: '+width+'}); \n';
	//str+="});\n";
	str+='$("#'+id+'").datepicker();\n';
	//str+='$("#'+id+'").datebox();\n';
	//str+='$("#'+id+'").datepicker({language: "zh-CN", autoclose: true, clearBtn: true, todayBtn: true, format: "yyyy-mm-dd"});\n';
	if (value!=undefined && value!=''){  //设置初值
		str+='$("#'+id+'").val("'+value+'");\n';
	}
	console.log(str);
	eval(str);  //设置显示绝对位置
	return str;
}

//定义label控件
function myLabelField(id,parent,label,top,left,height,width){
	if (parent=='') parent='document.body';
	var str='';
	if (width!=undefined && width>0){
		str+='$("#'+parent+'").append("<label id=\\"'+id+'\\" align=\\"left\\" '+myDefineLabelStyle(top,left,0,width)+'\\">'+label+'</label>");\n';
	}else{
		str+='$("#'+parent+'").append("<label id=\\"'+id+'\\" align=\\"left\\" '+myDefineLabelStyle(top,left,0,0)+'\\">'+label+'</label>");\n';
	}
	//console.log(str);
	eval(str);  //设置显示绝对位置
	return str;
}

//定义decimal控件
function myNumericField(id,parent,label,labelwidth,top,left,height,width,length,decimal,value,min,max){
	//调用jquery/numeric.js第三方控件,独立样式，高度与jqx控件不一致
	if (parent=='') parent='document.body';
	//if (height==0) height=sys.textheight-2;
	var str='';
	if (label!=undefined && label!=''){
		str+='$("#'+parent+'").append("<label id=\\"label'+id+'\\" align=\\"right\\" '+myDefineLabelStyle(top+sys.labeltopmargin,left,0,labelwidth)+'\\">'+label+'</label>");\n';
	}
	str+='$("#'+parent+'").append("<input type=\\"text\\" id=\\"'+id+'\\"+ \\"\\" />");\n';
	str+=mySetNumericCss(id,top,1.0*(left+labelwidth),height,width);
	if (value!=undefined && value!=''){  //设置初值
		str+='$("#'+id+'").val("'+value+'");\n';
	}
	str+='$("#'+id+'").css("text-align","right");\n'; //右对齐
	if (decimal!=undefined && decimal>0) {
		str+='$("#'+id+'").numeric({ decimalPlaces: '+decimal;
	}else{
		str+='$("#'+id+'").numeric({ decimal: false ';
	}
	if (min!=undefined && min==0) str+=', negative: false ';	
	str+=' });\n'
	/*
	$(".integer").numeric(false, function() { alert("Integers only"); this.value = ""; this.focus(); });
	$(".positive").numeric({ negative: false }, function() { alert("No negative values"); this.value = ""; this.focus(); });
	$(".positive-integer").numeric({ decimal: false, negative: false }, function() { alert("Positive integers only"); this.value = ""; this.focus(); });
    $(".decimal-2-places").numeric({ decimalPlaces: 2 });
	$("#remove").click(
		function(e)
		{
			e.preventDefault();
			$(".numeric,.integer,.positive,.positive-integer,.decimal-2-places").removeNumeric();
		}
	);
	*/
	//console.log(str);
	eval(str);  //设置显示绝对位置
	return str;
}

//定义数组combo
function myStaticComboField(id,parent,label,labelwidth,top,left,height,width,items,value,checkbox){
	if (parent=='') parent='document.body';
	//if (height==0) height=sys.textheight;
	//var gendersource=[{"id":1,"text":"男"},{"id":2,"text":"女"}];
	var str='var '+id+'source = [\n';
	var tmp=items.split(';');
	for (var i=0;i<tmp.length;i++){
		if (i>0) str+=',';
		str+='{"'+id+'":"'+tmp[i]+'"}';
	}
	str+='];\n';
	if (label!=undefined && label!=''){
		str+='$("#'+parent+'").append("<label id=\\"label'+id+'\\" align=\\"right\\" '+myDefineLabelStyle(top+sys.labeltopmargin,left,0,labelwidth)+'\\">'+label+'</label>");\n';
	}
	str+='$("#'+parent+'").append("<input id=\\"'+id+'\\"+ \\"\\" />");\n';
	str+=mySetTextCss(id,top,1.0*(left+labelwidth),0,width);
	str+='$("#'+id+'").combobox({';   
    str+="url:'combobox_data.json',";   
    str+="valueField:'"+id+"',";   
    str+="textField:'"+id+"'";   
	str+="});\n";
	
	console.log(str);
	eval(str);  //设置显示绝对位置
	return str;
}

//定义checkcombo
function myCheckComboField(id,parent,label,labelwidth,top,left,height,width,items,value){

}

//定义图片combo
function myImageComboField(id,parent,label,labelwidth,top,left,height,width,items,value){

}
//定义图片combo
function myDBComboField(id,parent,label,labelwidth,top,left,height,width,sql,field,value){

}

//定义编辑器
function myEditorField(id,parent,top,left,height,width,value){
	if (parent=='') parent='document.body';
	//if (height==0) height=sys.textheight;
	var str='';
	/*
	if (label!=undefined && label!=''){
		str+='$("#'+parent+'").append("<label id=\\"label'+id+'\\" align=\\"right\\" '+myDefineLabelStyle(top+sys.labeltopmargin,left,0,labelwidth)+'\\">'+label+'</label>");\n';
	}
	*/
	str+='$("#'+parent+'").append("<textarea id=\''+id+'\' />");\n';
	//
	str='<textarea id=\''+id+'\'></textarea>';
	str='$("'+str+'").appendTo("#'+parent+'");\n';
	str+=mySetTextCss(id,top,left,0,0);
	str+='$("#'+id+'").jqxEditor({height: '+height+'});\n';
	if (height>0) str+='$("#'+id+'").jqxEditor({height: '+height+'});\n';
	if (width>0) str+='$("#'+id+'").jqxEditor({width: '+width+'});\n';
	str+='$("#'+id+'").jqxEditor(sys.theme);\n';
	if (value!=undefined && value!=''){  //设置初值
		str+='$("#'+id+'").val("'+value+'");\n';
	}
	//编辑器本地化
	str+='$("#'+id+'").jqxEditor({localization: {"bold": "加粗",';
	str+='"italic": "斜体",';
	str+='"underline": "下划线",';
	str+='"format": "格式",';
	str+='"font": "字体",';
	str+='"size": "字体大小",';
	str+='	"color": "字体颜色",';
	str+='	"background": "背景颜色",';
	str+='	"left": "左对齐",';
	str+='	"center": "居中",';
	str+='	"right": "右对齐",';
	str+='	"outdent": "文字左移",';
	str+='	"indent": "文字右移",';
	str+='	"ul": "分段",';
	str+='	"ol": "分级",';
	str+='	"image": "插入图片",';
	str+='	"link": "插入链接",';
	str+='	"html": "html语言",';
	str+='	"clean": "格式化"';
	str+='}});';
	//console.log(str);
	eval(str);  //设置显示绝对位置
	return str;
}

//生成Tabs
function myDefineTabs(id,parent,title,items,top,left,height,width,collapsible){
	//myDefineTabs('myTab','main','教师信息','基本信息;联系信息;研究方向;个人简历',10,100,400,500);
	if (parent=='') parent='document.body';
	var str='';
	str='<div id=\\"'+id+'\\">';
	str+="<ul>";
	var tmp=items.split(';');
	for (var i=0; i<tmp.length; i++){
		if (i==0) str+='<li style=\\"margin-left: 4px;\\">'+tmp[i]+'</li>';
		else str+='<li>'+tmp[i]+'</li>';
	}	
	str+='</ul>';
	for (var i=0; i<tmp.length; i++){
		str+='<div id=\\"'+id+1*(i+1)+'\\"> </div>';
	}	
	str+="</div>";
	str='$("'+str+'").appendTo("#'+parent+'");\n';
	str+=mySetTextCss(id,top,left,0,0)+'\n';
	//str+='$("#'+id+'").tabs({position: \'top\',width: '+width+', height:'+height+'});\n';
	str+='$("#'+id+'").tabs();\n';
	//str+='$("#'+id+'").tabs(sys.theme);\n';
	if (collapsible!=undefined && collapsible){
		//str+='$("#'+id+'").jqxTabs({ showCloseButtons: false, collapsible: true});\n';
	}
	console.log(str);
	eval(str);
}

//生成Tabs
function myDefinePanel(id,parent,title,top,left,height,width){
	//myDefineTabs('myTab','main','教师信息','基本信息;联系信息;研究方向;个人简历',10,100,400,500);
	if (parent=='') parent='document.body';
	var str='';
	str+='$("#'+parent+'").append("<div style=\\"padding-left: 4px;\\" id=\\"'+id+'\\"+ \\"\\" /></div>");\n';
	str+=mySetTextCss(id,top,left,0,0)+'\n';
	str+='$("#'+id+'").jsPanel({ width: '+width+', height:'+height+'});\n';
	str+='$("#'+id+'").jsPanel(sys.theme);\n';
	//console.log(str);
	eval(str);
}


