//Project->Properties->javabuildpath+Libraries下，可以Add一个Jar到这个Project里。
//修改部署的文件路径，修改工种目录中的.project文件中的<name>项 
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
sysdate=myGetDate("-");  //系统日期变量
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
sys.fontwidth=12;
sys.fontsize=9; 
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
function myDatabaseName(dbid){  
//输入一个账套编码，返回数据库的名称，账套为00时，数据库名称为embase。dbid为字符型
	if (dbid=='00') var dbname=sysdbname;  //下面也需要同步修改
	else var dbname=sysdbname+dbid;
	return (dbname);
}

function myInputCSS(name) {
	//生成一个控件的样式设置字符串。name为字符型
  	//return('Ext.util.CSS.createStyleSheet("#'+name+' input{font-family: 宋体; font-size: 12px; font-weight: bold; color: red;}");');
  	return('Ext.util.CSS.createStyleSheet("#'+name+' input{font-family: 宋体; font-size: 12px;}");');
};

function myGetFullDatePart(date) {
	//取一个字符串日期中的年月日值。date为字符型，id为year/month/day中的一个
	var xdate={};
	xdate.year=date.getFullYear()+'';
	xdate.month=date.getMonth()+1;
	xdate.day=date.getDay();
	if (xdate.month<10) xdate.month='0'+xdate.month;
	if (xdate.day<10) xdate.day='0'+xdate.day;
	return xdate;
};	

function myGetDatePart(id,date) {
	//取一个字符串日期中的年月日值。date为字符型，id为year/month/day中的一个
	id=id.toLowerCase();
	var str=date+"";
	index1=str.indexOf('-');
	if (index1<0) index1=str.indexOf('/');
	index2=str.indexOf('-',index1+1);
	if (index2<0) index2=str.indexOf('/',index1+1);
	if (index2>index1) {
		if (id=='year') return(str.substring(0,index1));
		else if (id=='month') return(str.substring(index1+1,index2));
		else if (id=='day') return(str.substring(index2+1));
	}
	/*
	if (id=='year') return(date.getFullYear());
	else if (id=='month') return(date.getMonth()+1);
	else if (id=='day') return(date.getDay());
	*/	
};	

function myDaysInaMonth(year,month) {
	//返回某年某月的最后一天的值。返回日期型变量值
	var xdate=new Date();
	xdate.setYear(year);
	xdate.setMonth(month);
	xdate.setDate(1);
	xdate.setDate(xdate.getDate()-1);
	return xdate.getDate();
};

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

String.prototype.toMyString=function(){
	//将字符串转换成本系统可以存储的格式。
	var s=''+this;  //转字符型
	s=s.replace(/(^\s*)|(\s*$)/g,"");  //去掉左边、右边所有空格
	s=s.replace(/\r\n/g,"\\n");    //替换和处理回车键   
	s=s.replace(/\n/g,"\\n");     //替换和处理回车键
	s=s.replace(/'/g,"''");       //处理单引号 /g表示全部替换
	return(s);
};

function myStrLength(str) {
	//求一个字符串的长度
    var w=str.replace(/[^\x00-\xff]/g,"**").length;
	return(w);
};

String.prototype.myLTrim=function(){
	//去掉一个字符串左边的空格。
	return this.replace(/(^\s*)/g,"");
};

String.prototype.myRTrim=function(){
	//去掉一个字符串右边的空格。
	return this.replace(/(\s*$)/g,"");
};

String.prototype.myTrim=function(){
	//去掉一个字符串左右两边的空格。
	return this.replace(/(^\s*)|(\s*$)/g,"");
};

function myFileSize(n){
	//将文件大小值转换为MB或KB。
	var s='';
	if (n<=0) return('0 KB');
	else {
		if (n>1024) {
			n1=n/1024;
			n1=parseInt(n1*100)/100;  //保留两位小数
			s=n1+' MB';
		}else{	
  			s=n+' KB';
  		}	
	  	return (s);
  	}	
};

function mySpace(n){
  //生成n个空格。
  var s='';
  for (var i=1;i<=n;i++) { s=s+'&nbsp;';}
  return (s);
};

function myRepeat(s,n){
  //某个字符串重复n次。
  var ss='';
  for (var i=1;i<=n;i++) { ss=ss+s;}
  return (ss);
};

function myLeft(mainStr,lngLen) {
	//从一个字符串的左部开始取规定长度的一个子字符串。
	if (lngLen>0) {return mainStr.substring(0,lngLen)}
	else{return ''}
}; 

function myRight(mainStr,lngLen) {
	//从一个字符串的右部开始取规定长度的一个子字符串。
	if (mainStr.length-lngLen>=0 && mainStr.length>=0 && mainStr.length-lngLen<=mainStr.length) {
  		return mainStr.substring(mainStr.length-lngLen,mainStr.length)}
	else{
		return ''
	}
};

function mySubstr(mainStr,starnum,endnum){
	//从一个字符串的之间某个位置开始取规定长度的一个子字符串。
  if (mainStr.length>=0){
  return mainStr.substr(starnum,endnum)
  }else{return ''}
 };

function myFormatedFloat(src, pos) { 
	//从数值型数据取规定位数的小数。  
	return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos); 
};

function myGetDate(xbar){
	//按指定分隔符取今天日期的字符串值。
	var today=new Date();
	if (xbar==undefined) xbar="-";
	return(today.getFullYear()+xbar+(today.getMonth()+1)+xbar+today.getDate());
};

function sysDisableBackSpace(){
	//禁止网页中的backspace键，返回该段程序的语句
	var str="function banBackSpace(e){";
    str+="var ev = e || window.event;";
    str+="var obj = ev.target || ev.srcElement;";
    str+="var t = obj.type || obj.getAttribute('type');";
    str+="var vReadOnly = obj.readOnly;";
    str+="var vDisabled = obj.disabled;";
    str+="vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;";
    str+="vDisabled = (vDisabled == undefined) ? true : vDisabled;";
    str+="var flag1= ev.keyCode == 8 && (t=='password' || t=='text' || t=='textarea')&& (vReadOnly==true || vDisabled==true);";
    str+="var flag2= ev.keyCode == 8 && t != 'password' && t != 'text' && t != 'textarea' ;";
    str+="var flag3= (ev.keyCode == 33 || ev.keyCode == 34) && t== 'textarea' ;";  //取消翻页键
    str+="if(flag2 || flag1 || flag3) return false;";
    //str+="if(flag1 || flag2) return false;";
	str+="}";
	str+="document.onkeypress=banBackSpace;";
	str+="document.onkeydown=banBackSpace;";
	return(str);
};

function sysSetMessageText() {
	//设置extjs中messagebox中的显示字符，将默认的英文修改为中文。
	Ext.require(['Ext.form.*','Ext.tree.*','Ext.panel.*','Ext.tab.*','Ext.data.*','Ext.grid.*','Ext.toolbar.*','Ext.menu.*','Ext.Viewport']);
	Ext.onReady(function(){
		Ext.QuickTips.init();
		Ext.form.Field.prototype.msgTarget='side';	//统一指定错误信息提示方式//'dtip','title','under'
		Ext.MessageBox.msgButtons[0].setText('确定');
		Ext.MessageBox.msgButtons[1].setText('是');
		Ext.MessageBox.msgButtons[2].setText('否');
		Ext.MessageBox.msgButtons[3].setText('取消');
	});	
};

function sysSetTreeStore(){
	//防止树控件重复点击的发生。返回该程序的语句
	var str="Ext.override(Ext.data.TreeStore,{"; 
	str+="load:function(options){"; 
	str+="options=options || {};"; 
	str+="options.params=options.params || {};"; 
	str+="var me=this,"; 
	str+="node=options.node || me.tree.getRootNode(),"; 
	str+="root;";
	str+="if (!node){"; 
	str+="node=me.setRootNode({"; 
	str+="expanded:true"; 
	str+="});";
	str+="}"; 
	str+="if (me.clearOnLoad){"; 
	str+="node.removeAll(false);"; 
	str+="}"; 
	str+="Ext.applyIf(options,{"; 
	str+="node:node"; 
	str+="});";
	str+="options.params[me.nodeParam]=node ? node.getId():'root';"; 
	str+="if (node){";
	str+="node.set('loading', true);"; 
	str+="}"; 
	str+="return me.callParent([options]);"; 
	str+="}"; 
	str+="});";
	return (str);
} 

function myGetStoreFields(store){  //返回store集中的字段名称
  //storefields
	return (store.model.getFields());
}

function myGetTreeStoreCount(myTree1){
	//treenode number
	var totalcount=myTree1.store.tree.flatten().length;
	return(totalcount);
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

function sysWait(message,winWidth,interval,duration){
	//在一个messagebox中显示信息提示，等候几秒钟时间后关闭显示框。
	var str="var progressBar=Ext.Msg.show({";
	str+="title:'系统提示',";
	str+="msg:\""+message+"\",";
	//str+="width:"+width+",";
	if (winWidth!=undefined && winWidth>0) str+="width:"+winWidth+",";
	str+="wait:true,";
	//str+="increment:10,";
	str+="waitConfig:{interval:"+interval+",duration:"+duration+",fn:function () {";
	str+="Ext.Msg.hide();"
	str+="}},closable:true";
	str+="});";
	//setTimeout(function () { progressBar.hide();},2000);
	return(str);
}

function sysError(message,winWidth,winHeight) {
	//在一个messagebox中显示错误性的提示信息。返回可执行的程序语句。
	var title='系统警告';
	var str="Ext.MessageBox.show({";   
	str=str+"title:'"+title+"',";   
	str+="msg:\""+message+"\",";
	str+="icon: Ext.MessageBox.ERROR,";
	str+="buttons: Ext.Msg.OK,";
	if (winWidth!=undefined && winWidth>0) str+="width:"+winWidth+",";
	if (winHeight!=undefined && winHeight>0) str+="height:"+winHeight+",";
	str+="frame:true,";
	str+="border:true,";
	str+="bodyStyle: 'background:#ffc; padding:10px,10px;'";
	str+="});";
	return(str); 
};

function sysWarn(message,winWidth,winHeight) {
	//在一个messagebox中显示警告性的提示信息。返回可执行的程序语句。
	var title='系统警告';
	//if (winWidth==undefined) winWidth=300;
	//if (winHeight==undefined) winHeight=140;
	//if (winWidth<=270)   winWidth=270;
	//if (winHeight<=140)  winHeight=140; 
	var str="Ext.MessageBox.show({";   
	str+="title: '"+title+"',";   
	str+="msg:\""+message+"\",";
	str+="icon:Ext.MessageBox.WARNING,";
	str+="buttons:Ext.Msg.OK,";
	//str+="width:"+winWidth+",";
	//str+="height:"+winHeight+",";
	if (winWidth!=undefined && winWidth>0) str+="width:"+winWidth+",";
	if (winHeight!=undefined && winHeight>0) str+="height:"+winHeight+",";
	str+="frame:true,";
	str+="border:true,";
	str+="bodyStyle: 'background:#ffc; padding:10px,10px;'";
	str+="});";
	return(str); 
};

function sysInfo(message,winWidth,winHeight) {
	//在一个messagebox中显示提示信息。返回可执行的程序语句。
	var title='系统提示';
	//if (winWidth==undefined) winWidth=300;
	//if (winHeight==undefined) winHeight=140;
	//if (winWidth<=270)   winWidth=270;
	//if (winHeight<=140)  winHeight=140; 
	var str="Ext.MessageBox.show({";   
	str+="title:\""+title+"\",";   
	str+="msg:\""+message+"\",";
	str+="icon:Ext.MessageBox.INFO,";
	str+="buttons:Ext.Msg.OK,";
	//str+="width:"+winWidth+",";
	if (winWidth!=undefined && winWidth>0) str+="width:"+winWidth+",";
	if (winHeight!=undefined && winHeight>0) str+="height:"+winHeight+",";
	str+="height:"+winHeight+",";
	str+="frame:true,";
	str+="border:true,";
	str+="bodyStyle: 'background:#ffc; padding:10px,10px;'";
	str+="});";
	return(str); 
};

function sysMessageBox(title,message,buttons,fn,winWidth,winHeight) {
	//在一个messagebox中显示对话框。返回可执行的程序语句。
	var resultStr='';
	if (title=='')  title='系统提示';
	buttons=buttons.toLowerCase();
	var icon='';
	if (buttons=='yesno' || buttons=='yesnocancel') icon='question';
	else if (buttons=='error') { buttons='ok'; icon='error'; } 
	else if (buttons=='warning') { buttons='ok';icon='warning'; } 
	else {
		buttons='ok';
		icon='info';
	} 
	if (winHeight<=140)  winHeight=140; 
	if (winWidth<=250)   winWidth=250;
	var str="Ext.MessageBox.show({";   
	str+="title: '"+title+"',";   
	str+="msg:\""+message+"\",";
	str+="icon: Ext.MessageBox."+icon.toUpperCase()+",";
	str+="buttons: Ext.Msg."+buttons.toUpperCase()+",";
	str+="width:"+winWidth+",";
	str+="height:"+winHeight+",";
	str+="frame:true,";
	str+="border:true,";
	str+="bodyStyle: 'background:#ffc; padding:10px,10px;'";
	if (fn!='') str+=",	fn: function(btn) { "+fn+"(btn);}";
	str+="});";
	return(str); 
};

function sysAlert(message,icon,winWidth,winHeight) {
	//在一个messagebox中显示提示货警告性信息。返回可执行的程序语句。
	icon=icon.toLowerCase();
	var buttons='ok';
	if (icon=='ok' || icon=='i') { 
		icon='info';
	}
	if (icon=='!') {
		icon='warning';
	}	 
	if (icon=='warning' || icon=='error') {
		title='系统警告';
	}else{ 
		title='系统提示';
	}	
	if (winWidth==undefined) winWidth=300;
	if (winHeight==undefined) winHeight=140;
	if (winWidth<=300)   winWidth=300;
	if (winHeight<=140)  winHeight=140; 
	var str="Ext.MessageBox.show({";   
	str+="title: '"+title+"',";   
	str+="msg:\""+message+"\",";
	str+="icon: Ext.MessageBox."+icon.toUpperCase()+",";
	str+="buttons: Ext.Msg."+buttons.toUpperCase()+",";
	str+="width:"+winWidth+",";
	str+="height:"+winHeight+",";
	str+="frame:true,";
	str+="border:true,";
	str+="bodyStyle: 'background:#ffc; padding:10px,10px;'";
	str+="});";
	return(str); 
};

function myAdjustImageSize(name,w,h,maxwidth,maxheight){
	//按图片原有比例调整（缩放）图片大小。返回可执行的程序语句。
	var hRatio; 
	var wRatio; 
	var Ratio = 1; 
	wRatio = maxwidth / w; 
	hRatio = maxheight / h; 
	if (maxwidth ==0 && maxheight==0){ 
		Ratio = 1; 
	}else if (maxwidth==0){// 
		if (hRatio<1) Ratio = hRatio; 
	}else if (maxheight==0){ 
		if (wRatio<1) Ratio = wRatio; 
	}else if (wRatio<1 || hRatio<1){ 
		Ratio = (wRatio<=hRatio?wRatio:hRatio); 
	} 
	if (Ratio<1){ 
		w = w * Ratio; 
		h = h * Ratio; 
	} 
	var str="Ext.getCmp('"+name+"').setWidth("+w+");"; 
	str+="Ext.getCmp('"+name+"').setHeight("+h+");";
	return(str); 
}; 

function myShowImage(name,filepath,bwidth,bheight) {  //显示图形，按比例缩放
	if (filepath!='' && myGetFileSize(filepath)>0){
		var str="var image=new Image();";
		str+="image.onerror=function() {";
		str+="if (Ext.getCmp('"+name+"')!=null) {";  //找不到图片文件时，不显示控件
		str+="Ext.getCmp('"+name+"').setVisible(false);";
		str+="}};";
		str+="image.onload=function() {";  //必须放在onload事件中
		str+="var awidth=image.width+0;";  
		str+="var aheight=image.height+0;";  
		str+="if (Ext.getCmp('"+name+"')!=null) {";
		str+="Ext.getCmp('"+name+"').setSrc('"+filepath+"');";
		str+="eval(myAdjustImageSize('"+name+"',awidth,aheight,"+bwidth+","+bheight+"));"; //高度宽度设置为变
		str+="};";
		str+="if (awidth>0) {";
		str+="Ext.getCmp('"+name+"').setVisible(true);";
		str+="}else{";
		str+="Ext.getCmp('"+name+"').setVisible(false);";
		str+="}};";
		str+="image.src='"+filepath+"';";  //必须写在onload之外
	}else{
		//var str="Ext.getCmp('"+name+"').setVisible(false);";
		var str="Ext.getCmp('"+name+"').setSrc(sysfilenotfound);";
	}
	return(str);		
};

function myComboxStore(storeName,querySQL) {
	var str=" var "+storeName+"=Ext.create('Ext.data.Store', {";
   	str+=' 	fields: [';
   	str+=" 		{type:'string',name:'id'},";
   	str+=" 		{type:'string',name:'name'}";
   	str+=' 	],';
   	str+=' 	proxy: {';
    str+="     	type: 'ajax',";
    str+='     	extraParams:{database:sysdatabasestring, sqlString:"'+querySQL+'"},';
    str+="     	url: 'system//fn_getComboxData.jsp',";
     str+="		actionMethods: { create: 'POST', read: 'POST',  update: 'POST', destroy: 'POST' },"; 
    str+=' 		reader: {';  
	str+=" 			data:'totalCount',";  
  	str+=" 			type: 'json',";  
  	str+=" 			root: 'result'";  
  	str+=' 		}'; 
  	str+=' 	}';
  	//str+=',  	listeners: {';
    //str+='		load: function() {';
	//str+='			Ext.get('+storeName+').setValue(Ext.get('+storeName+').getValue());';
	//str+='			}';
	//str+='		}';
    str+=' });';
    return (str); 
};

///ffffffff
function myAddWheretoSql(sql,wheresql){  //在select语句中加一个where条件
	var x1=(sql).lastIndexOf(' from ');
	var x2=(sql).lastIndexOf(')');
	var x3=(sql).lastIndexOf(' where ');
	if (x3>0 && x3>x2) sql+=" and "+wheresql
	else sql+=" where "+wheresql;
	return sql;
}

function myKeyEvent(field,e,mytab) {
	var xformid='';
	var xtabno=-1;
	var xnewtabno=-1;
	var xpagecount=0;
	var xfieldset=[];
	var xfieldid=field.id;
	var xtype=field.xtype;
	var xkey=e.getKey(); //key=e.keyCode;//通过控件名称查找，通过ID会出错
	if (xkey==40&&(xtype=='combobox'||xtype=='textareafield')) xkey=0;  //取消向下箭头
	var xparenttype=Ext.getClassName(mytab).toLowerCase();
	if (xparenttype=='ext.tab.panel') {
		xpagecount=mytab.items.items.length;
		//获取当前tab页面
		for( var i=0;i<xpagecount;i++ ){
			if(mytab.activeTab==mytab.items.items[i]){
    			xtabno=i; 
    			break;
    		}
    	}
    	xnewtabno=xtabno;
		if (xkey==33) xnewtabno=Math.max(0,xtabno-1);   //pageup
  		if (xkey==34) xnewtabno=Math.min(xpagecount-1,xtabno+1);  //pagedown
		if (xtabno!=xnewtabno && xnewtabno>=0 && xnewtabno<xpagecount && xpagecount>0) {
			mytab.setActiveTab(xnewtabno);  //定位到新一页
		}					
    	var panel=mytab.activeTab;
    	//获取当前form的名称
    	xparenttype=Ext.getClassName(panel).toLowerCase();
    	if (xparenttype=='ext.panel.panel') {
    		xformid=panel.items.items[0].id;
		}else if (xparenttype=='ext.form.panel') {
	    	xformid=panel.id;	
    	}
   	}else if (xparenttype=='ext.form.panel') {
		xformid=mytab.id;
    }
  	if (xformid!=''&&(xkey==13||xkey==40||xkey==38||xkey==33||xkey==34)) {
  		var v=Ext.getCmp(field.id).getValue();
		Ext.getCmp(field.id).setValue(v); //设置numberfield的值，否则按回车不显示新值  	
		var myform=Ext.getCmp(xformid);
		var xfielddim=myform.getForm().getFields();
		var xfieldno=-1;
		var xfieldcount=0;
		var xnewtabno=-1;
		var xnewfieldid=null;
		for (var j=0;j<xfielddim.length;j++) {
			var xtype=xfielddim.items[j].getXType().toLowerCase();
			if (xfielddim.items[j].isVisible() && !xfielddim.items[j].readOnly && xtype!='displayfield') {
				if (xfielddim.items[j].getId().toLowerCase()==xfieldid.toLowerCase()) {
					xfieldno=xfieldcount;
				}
				xfieldset[xfieldcount]=xfielddim.items[j].getId();
				xfieldcount=xfieldcount+1;
			}
		}	
		var n=xfieldno;
		if (xkey==13||xkey==40) n=Math.min(xfieldcount-1,n+1);  //向下
		else if (xkey==38) n=Math.max(0,n-1);   //向上
 		if (n>=0 && n<xfieldcount) {
			var xnewfieldid=Ext.getCmp(xfieldset[n]);		
		}
		if (xnewfieldid!=null) {
  			xtype=xnewfieldid.getXType().toLowerCase();
			if (xtype=='textareafield') {
	  			xnewfieldid.focus(false,100);  //id.focus().defer(100,x); //通过延时方式聚焦
	  		}else{
				xnewfieldid.focus(true,100); 
  			}
  		}	
  	}
};

function myKeyEvent1(field,e,myFields,pageCount,mytab){	//键盘处理函数
	var key=e.getKey(); //key=e.keyCode;//通过控件名称查找，通过ID会出错
	var xtype=field.xtype;
  	if (key==13||key==40||key==38||key==33||key==34) {
		var currentField=field.id; //e.target.name;  //获取当期控件的ID（非名称）
  		var tabNo=pageNo=fieldNo=i=j=-1;  //parseInt(currentField.substring(1,2));
		for (i=1;i<=pageCount;i++) {
		  	var xcom=myFields[i].toLowerCase().split(';');
	  		for (j=0;j<xcom.length;j++) {
				if (currentField.toLowerCase()==xcom[j]) {
	  				fieldNo=j+1;
		  			tabNo=i;
		  			pageNo=tabNo;
		  			break;
		  		}
			}
			if (tabNo>0) break;
		}		
		if (xtype=='textareafield') {  //处理textarea翻页乱页面问题
			if ((key==33 || key==34) && pageCount>1) {
				var tn=tabNo-1;
				if(tn<0) tn=pageCount;
				field.focus(false,100);
			}
			key=0;
		}else if (tabNo>0 && fieldNo>0) {  //找到控件
			var n=fieldNo;
			var xtype=field.xtype;
	  		var id=null;
			if (key==40&&(xtype=='combobox'||xtype=='textareafield')) key=0;
			if (key==13 || key==40) n=n+1;
			else if (key==38) n=Math.max(1,n-1);   //向上
			else if (key==33) tabNo=Math.max(1,tabNo-1);   //pageup
  			else if (key==34) tabNo=Math.min(pageCount,tabNo+1);  //pagedown
	  		//设置激活的tab
			//alert('n='+n+',tab='+tabNo+','+pageNo);
  			if (pageNo!=tabNo && tabNo<=pageCount) {
	  			if (mytab!='') {
	  				mytab.setActiveTab(tabNo-1);  //定位到新一页
	  			}	
		  		var ycom=myFields[tabNo].toLowerCase().split(';');
  				var nextField=ycom[0];
  				id=Ext.getCmp(nextField);
  			}else if (n!=fieldNo && n>0 && n<=xcom.length) {	
		  		//聚焦到新控件
				var nextField=xcom[n-1];
  				id=Ext.getCmp(nextField);
  			}	
			if (id!=null) {
		  		xtype=id.getXType().toLowerCase();
  				if (xtype=='combobox' || xtype=='textareafield') {
  					//通过延时方式聚焦
  					id.focus(true,100);  //id.focus().defer(100,x);
		  		}else{
  					id.focus(true,100); 
  				}
  			}
		}  //tab>0判断结束
	}  //key判断结束	
	return(tabNo+';'+nextField);	
};
 
function myFocusInTab(mytab) {  
	//tab控件页面切换时光标聚焦控制
   	var xtab=mytab.activeTab;
   	var xformid='';
   	//获取当前form的名称
	var xparenttype=Ext.getClassName(xtab).toLowerCase();
    if (xparenttype=='ext.panel.panel') {
    	xformid=xtab.items.items[0].id;
	}else if (Ext.getClassName(mytab).toLowerCase()=='ext.form.panel') {
	   	xformid=mytab.id;
    }
	var myform=Ext.getCmp(xformid);
	var xfielddim=myform.getForm().getFields();
	var xnewfieldid=null;
	for (var j=0;j<xfielddim.length;j++) {
		var xtype=xfielddim.items[j].getXType().toLowerCase();
		if (xfielddim.items[j].isVisible() && !xfielddim.items[j].readOnly && xtype!='displayfield') {
			xnewfieldid=xfielddim.items[j];
			break;
		}
	}
	if (xnewfieldid!=null) {
		var xtype=xnewfieldid.getXType().toLowerCase();
		if (xtype=='textareafield') {
			xnewfieldid.focus(false,100);  //id.focus().defer(100,x); //通过延时方式聚焦
	  	}else{
			xnewfieldid.focus(true,100); 
  		}
	}
};

function myDefineWindow(name,items,title,height,width,buttons){
	//定义window控件，参数依次为：控件名、子项控件、窗体标题、窗体高度、窗体宽度、窗体底部按钮类型。返回可执行的程序代码。
	var str="var "+name+"=Ext.create('Ext.window.Window', {"; 
	str+="title:'"+title+"',";
	str+="height:"+(height)+",";
	str+="width:"+(width)+",";
	str+="closeAction:'hide',";
	str+="modal:true,"
	str+="resizable:false,layout:'absolute'";
	if (items!=''){
		str+=",items:["+items+"]";
	}
	if (buttons=="okcancel"){
		str+=",buttons:[{ text:'确定',id:'"+name+"ok',height:25,handler: function() { fn"+name+"OkClick();} }";
		str+=",{text:'取消',id:'"+name+"cancel',height:25,handler: function(){ "+name+".hide(); }}";
		str+="]";		
	}
	str+="});";
	return(str);
}

function myDefineForm(name,region,height,width,labelwidth,frame){
	//定义form控件，参数依次为：控件名、布局位置、表单高度、宽度、fieldlabel的宽度、是否显示边框。返回可执行的程序代码。
	var str="var "+name+"=Ext.create('Ext.form.Panel',{";
	str+="id:'"+name+"',name:'"+name+"',";
	if (frame!=undefined && frame!='') str+="frame:"+frame+",";
	str+="region:'"+region+"',autoScroll:true,";
	if (height>0) str+="height:"+height+",";
	if (width>0) str+="width:"+width+",";
	str+="border:false,layout:'absolute',";
	str+="fieldDefaults:{enableKeyEvents:true,labelAlign:'left',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	str+="labelSeparator:'',xtype:'textfield',msgTarget:'qtip'";
	str+="}});";
	//console.info(str);
	return(str);
};

function myDefinePanel(name,title,item,height,width,collapsible,contextmenu){
	//定义panel控件，参数依次为：控件名、标题、子项控件、高度、宽度、是否可缩小、右键对应的菜单名。返回可执行的程序代码。
	var str="var "+name+"=Ext.create('Ext.panel.Panel',{";
	str+="id:'"+name+"',name:'"+name+"',";
	if (title!='') str+="title:'&nbsp;"+title+"',";  
	if (height>0) str+="height:"+height+",";
	if (width>0) str+="width:"+width+",";
	str+="containerScroll:true,";
	str+="collapsible:"+collapsible+",";
	str+="autoScroll:true,\n";	
	str+="frame:false,border:false,";
	str+="layout:'border',";
	str+="items:"+item;
	if (contextmenu!=undefined && contextmenu!=''){
		str+=",listeners:{";
		str+="render:function(p){";
		str+="p.getEl().on('contextmenu',function(e){";
		str+="e.preventDefault();";
		str+=contextmenu+".showAt(e.getXY());";
		str+="})";
		str+="}}";
	}	
	str+="});";
	//eval(str);
	return(str);
};

function myDefineTab(name,title,region,item,height,width,collapsible,contextmenu){
	//定义tab控件，参数依次为：控件名、标题、布局位置、子项控件、高度、宽度、是否可缩小、右键对应的菜单名。返回可执行的程序代码。
	var str="var "+name+"=Ext.create('Ext.tab.Panel',{\n";
	str+="id:'"+name+"',name:'"+name+"',\n";
	if (region!='') str+="region:'"+region+"',\n";
	if (title!=''){
		if (sys.browser=='ie') str+="title:'&nbsp;"+title+"',\n";
		else str+="title:'	"+title+"',\n";
	} 
	str+="split:true,\n"
	//str+="headerStyle : 'display: none',\n";  //
	if (height>0) str+="height:"+height+",\n";
	if (width>0)  str+="width:"+width+",\n";
	//str+="bodyBorder:true,frame:false,\n";
	str+="containerScroll:true,\n";
	str+="collapsible:"+collapsible+",\n";
	str+="pressed:true,activeTab:0,\n";
	str+="collapsible:"+collapsible+",\n";
	//str+="tabPosition:'bottom',\n";
	str+="enableTabScroll:true,\n";
	str+="layout:'border',\n";
	str+="items:"+item;
	if (contextmenu!=undefined && contextmenu!=''){
		str+=",listeners:{\n";
		str+="render:function(p){\n";
		str+="p.getEl().on('contextmenu',function(e){\n";
		str+="e.preventDefault();\n";
		str+=contextmenu+".showAt(e.getXY());\n";
		str+="})\n";
		str+="}}\n";
	}	
	str+="});\n";
	//console.info(str);
	return(str);
};

function myGetTabIndex(tab,tabPanel){
	var tabno=-1;
	for (var i=0;i<tabPanel.items.items.length;i++){
		if (tab==tabPanel.items.items[i]){
			tabno=i+1; 
	       	break;
		}
	}
	return (tabno);
}	       	

function myGetActiveTabIndex(tabPanel){
	var tabno=-1;
	for (var i=0;i<tabPanel.items.items.length;i++){
		if (tabPanel.activeTab==tabPanel.items.items[i]){
			tabno=i+1; 
	       	break;
		}
	}
	return (tabno);
}	       	


function myDefineTree(pmyTree) {  //ttttt树中选择节点，展开选中的节点
	//定义tree控件，参数依次为：控件名和控件对应的变量集的名称。返回可执行的程序代码。
	pmyTree=myGetGridColumn(pmyTree);
	pmyTree.fieldset='cid;text;isparentflag;parentnodeid;level;ancester;sortflag';
	if (pmyTree.sql!=undefined && pmyTree.sql!=''){
	 	var s=myGetSQLFields(pmyTree.sql,pmyTree.sysdatabasestring);
 	 	pmyTree.fieldset+=";"+s;
 	}
	pmyTree=myGetTreeNodeTextFields(pmyTree);
	if (pmyTree.fieldset!='') pmyTree.fieldset+=";"
	pmyTree.fieldset+=pmyTree.nodetextfieldset.fieldset;
	var str="var "+pmyTree.name+'Store'+"=Ext.create('Ext.data.TreeStore',{";
	str+="extend: 'Ext.data.Model',";
	str+="fields: ['cid','text','sysnumber','parentnodeid','isparentflag','level','ancester','sortflag'";
	if (pmyTree.fieldset!=''){
		var tmp=pmyTree.fieldset.split(';');
	    for (var i=0;i<tmp.length;i++){
	    	//if (i>0) str+=",";
	    	str+=",'"+tmp[i]+"'";
	    }
    }else{
	    for (var i=0;i<pmyTree.xfield.length;i++){
	    	//if (i>0) str+=",";
	    	str+=",'"+pmyTree.xfield[i]+"'";
	    }
    }
	str+="],";
	if (pmyTree.roottitle!=''){
		//sysnumber行号
		str+="root: {cid:'',sysnumber:0,text:'"+pmyTree.roottitle+"',id:'"+pmyTree.name+"root',leaf:false,iconCls:'folderopenIcon' },";
	}
	str+="proxy:{";
	str+="type:'ajax',";
	str+="actionMethods: { create: 'POST', read: 'POST',  update: 'POST', destroy: 'POST' }},"; 
	str+="listeners:{";
	if (pmyTree.events!=undefined && pmyTree.events.indexOf('storeload')>=0){
		str+="load:function(treestore,node,records){";
		str+="if ("+pmyTree.varname+".rootcode=='') {";
		str+="var root="+pmyTree.name+".store.getRootNode();";
		str+="var node=root.findChild('cid',"+pmyTree.varname+".rootcode,true);";
		str+="if(node!=null && node.parentNode!=root){";
		str+="var pNode=node.parentNode;";
		str+="for (; pNode != root; pNode=pNode.parentNode) {";
		str+="pNode.expand();";
		str+="}";
		str+=pmyTree.name+".getSelectionModel().select(node);";
		str+="}}}";
	}
	str+="}";	
	str+="});";
	//定义样式,增加树的表格线
	if (pmyTree.columncount>0){  
		if (pmyTree.rowheight==undefined) { pmyTree.rowheight=24 };
		str+="Ext.util.CSS.createStyleSheet('."+pmyTree.name+"CSS {height: "+pmyTree.rowheight+"px; vertical-align: middle;}', '"+pmyTree.name+"CSS');";
		str+="Ext.util.CSS.createStyleSheet('#"+pmyTree.name+" table{border-collapse: collapse; border: none}', '"+pmyTree.name+"CSS');";
		str+="Ext.util.CSS.createStyleSheet('#"+pmyTree.name+" table td{border: solid #ededed 1px; padding: 0 6px 0 6px;}', '"+pmyTree.name+"CSS');";
	}	
	//定义store结束,定义树开始	
	str+="var "+pmyTree.name+"=Ext.create('Ext.tree.Panel',{";
	str+="id:'"+pmyTree.name+"',name:'"+pmyTree.name+"',";
	if (pmyTree.region==undefined) pmyTree.region='center';
	if (pmyTree.region!='') str+="region:'"+pmyTree.region+"',";
    if (pmyTree.height!=undefined && pmyTree.height>0){ 
    	str+="height:"+pmyTree.height+",";       
    }
    if (pmyTree.width!=undefined && pmyTree.width>0){ 
    	str+="width:"+pmyTree.width+",";      
    }
	if (pmyTree.title!='') {
		str+="title:'"+pmyTree.title+"',";
		str+="collapsible:true,"; 	//str+="collapsed:true,";
	}else{	
		str+="collapsible:false,";
	}	
	if (pmyTree.roottitle!='') {
		str+="rootVisible:true,";
	}else{
		str+="rootVisible:false,";
	}
	str+="store:"+pmyTree.name+"Store,";
	str+="frame:true,";
	//str+="useArrows: true,";
	str+="expanded: false,"; 
	if (pmyTree.tbar!='') str+="tbar:"+pmyTree.tbar+",";
	if (pmyTree.bbar!='') str+="bbar:"+pmyTree.bbar+",";
	if (pmyTree.height>0) str+="height:"+pmyTree.height+",";
	if (pmyTree.width>0)  str+="width:"+pmyTree.width+",";
	if (pmyTree.singleexpand!=undefined && pmyTree.singleexpand!=''){
		str+="singleExpand:"+pmyTree.singleexpand+",";
	}
	str+="animate:false,";
	if (pmyTree.columncount>0){  
		str+="viewConfig: { getRowClass: function(record, rowIndex, rowParams, store){";
		str+="return '"+pmyTree.name+"CSS';}},";
		if (pmyTree.datafields!=''){
		//定义树中列treegrid类型
			str+="columns:[";
	    	var k=1;
	    	for (var i=0;i<pmyTree.xfield.length;i++){
	    		if (pmyTree.xshowtitle[i]){
		    		if (k>1) str+=",";
		  			//str+="{header: '<center><font style=\"font-family:宋体;\">"+pmyTree.xtitle[i]+"</center></font>',\n"; 
		  			str+="{header:'<font style=\"font-family:宋体;\">"+pmyTree.xtitle[i]+"</font>',\n"; 
					if (k==1) str+="xtype:'treecolumn',";			
		    		str+="sortable:false,";
			        str+="menuDisabled:true,";            	
					str+="enableColumnMove:false,";
					str+="enableColumnResize:false,";
			    	str+="width:"+pmyTree.xwidth[i]+",";
		    	    if (pmyTree.xalign[i]=='right') {
			    	   	str+="renderer:function(value){";
						str+="return '<div align=\"right\">'+value+'</div>';";
	    			   	str+="},";
					}
		    	    if (pmyTree.xalign[i]=='center') {
	   			    	str+="renderer:function(value){";
						str+="return '<div align=\"center\">'+value+'</div>';";
		        		str+="},";
			    	}	
					//str+="return '<div align=\""+pmyTree.xalign[i]+"\">'+value+'</div>';";
					//str+="return '<div align=\""+pmyTree.xalign[i]+"\"><font style=\"font-family:宋体;\">'+value+'</font></div>';\n";
			        str+="dataIndex:'"+pmyTree.xfield[i]+"'";
		    	    str+="}";
					k++;
				}
			}
			str+="],";
		}
	}
	//定义列结束
	str+="listeners:{";
	if (pmyTree.events!=undefined && pmyTree.events.indexOf('beforeload')>=0){
		str+="beforeload:function(store){";
		//str+="alert("+pmyTree.varname+".sql);";
		str+="var newparams={ database:sysdatabasestring, maxReturnNumber:maxReturnNumber,sqlString:"+pmyTree.varname+".sql,keyField:"+pmyTree.varname+".keyfield,rootCode:"+pmyTree.varname+".rootcode,selectedCode:"+pmyTree.varname+".selectedcode,searchText:"+pmyTree.varname+".searchtext };";
		str+="Ext.apply(store.proxy.extraParams,newparams);";
		str+="store.proxy.url='system//fn_getTreeNodes.jsp';";					
		str+="},";
	}

	if (pmyTree.contextmenu!=undefined && pmyTree.contextmenu!=''){
		str+="containercontextmenu:function(tree, e){";
	    str+="e.preventDefault();";
    	str+=pmyTree.contextmenu+".showAt(e.getXY());";
    	str+="},";
    	str+="itemcontextmenu:function(tree, record, item, index, e){";
    	str+="e.preventDefault();";
    	str+="tree.getSelectionModel().select(record);";
    	str+=pmyTree.contextmenu+".showAt(e.getXY());";
    	str+="},";
    }	
		
	if (pmyTree.events!=undefined && pmyTree.events.indexOf('treeload')>=0){
		str+="load:function(){";
		str+="var root="+pmyTree.name+".getRootNode();";
		//str+="var firstNode="+pmyTree.name+".store.getRootNode().getChildAt(0);";
		str+="var firstNode=null;";  //不选中第一个节点，原因：选中第一个节点时出错
		str+="var nodeId;";
		str+="if ("+pmyTree.varname+".selectedcode!=''){";
		//str+="alert("+pmyTree.varname+".selectedcode);";
		//str+="alert(root.childNodes.length);";
		str+="var node=root.findChild('cid',"+pmyTree.varname+".selectedcode,true);";
		str+="if(node!=null){";
		str+="var pNode=node.parentNode;";
		str+="for (; pNode!=root; pNode=pNode.parentNode) {";
		str+="if(pNode.get('cid')!=''){";
		str+="pNode.expand();";
		str+="}}";  //for
		str+="if (node.hasChildNodes()) node.expand();";
		str+=pmyTree.name+".getSelectionModel().select(node);";
		str+="}";	 //node!=null
		str+="}else if ("+pmyTree.varname+".rootcode!=''){";
		str+="var selectedNode=root.findChild('cid',"+pmyTree.varname+".rootcode,true);"; 
		str+="if (selectedNode!=null) {";
		str+=pmyTree.name+".getSelectionModel().select(selectedNode);";
		str+="}else{";
		str+="if (firstNode!=null)";
		str+=pmyTree.name+".getSelectionModel().select(firstNode);";
		str+="}";
		str+=pmyTree.varname+".selectedcode='';";
		str+="}";
	    str+="var records="+pmyTree.name+".getSelectionModel().getSelection();";
		str+="if(!records[0]){";
		str+="if ("+pmyTree.name+".rootVisible) {"+pmyTree.name+".getSelectionModel().select(root);}";
		str+="else {if (firstNode!=null) "+pmyTree.name+".getSelectionModel().select(firstNode);}";
		str+="}";
		str+="},";
	}
	//console.log(str);
	//鼠标事件
	str+="itemmouseenter:function(view, record, item, index, e){";
	//str+="var root="+pmyTree.name+".store.getRootNode();";
	if (pmyTree.roottitle!=''){ //有根节点时需要判断cid是否存在
		str+="if (index==0) "+pmyTree.varname+".rootcode='';";
		str+="else if (record) "+pmyTree.varname+".rootcode=record.raw.cid;";
	}else{
		str+=pmyTree.varname+".rootcode=record.raw.cid;";
	}
	str+=pmyTree.varname+".selectedcode='';";
	str+="}";	
	str+="}";
	str+="});";
	//console.info(str);
	return(str);
};

function xxmyDefineEditButton(mygrid,rowIndex,value) {  
	//定义grid行中edit和小按钮的渲染renderer事件
	var str="<table cellSpacing=0 cellPadding=0 border=0>";
	str+=" <tr style='font-size:8px;'><td>";
	str+=" <input type='text',name='edittext' id='edittext' value='"+value+"' ";
	str+=" style='width:120px;display:;border:0px solid #848284;margin:0px,0px,0px,0px;height:18px;'>" ;
	str+=" </td><td> ";
	str+=" <input type='button' style='height:18px;width:18px;display:;float:right;' id='editbtn' ";
	str+=" onclick=\"fn"+mygrid+"EditBtnClick('"+mygrid+"',"+rowIndex+",'"+value+"');\"";
	str+=" value='‥' /> ";
	str+=" </td></tr></table>";
	/*
	var str='<TABLE class="x-btn-wrap x-btn x-btn-text-icon" style="WIDTH:55px" cellSpacing=0 cellPadding=0 border=0>';  
	str+='<TBODY><TR><TD class=x-btn-left><I> </I></TD>';  
	str+='<TD class=x-btn-center><EM unselectable="on"><BUTTON id=editbtn onclick="fnShowRecordWin('+rowIndex+')">'+(rowIndex+1)+'</BUTTON></EM></TD>';  
	str+='<TD class=x-btn-right><I> </I></TD></TR></TBODY></TABLE>';
	*/  
	return str;
	}

function myDefineRowButton(mygrid,rowIndex,value) {  
	//定义grid行中小按钮的渲染renderer事件，用于tdocumentedit等，产生一个事件，如myitemgrid1btnclick
	var str=" <input type='button' style='height:18px;width:18px;display:;float:right;' id='editbtn'"+rowIndex;
	str+=" onclick=\"fn"+mygrid+"BtnClick('"+mygrid+"',"+rowIndex+",'"+value+"');\"";
	str+=" value='‥' /> ";
	return str;
}


function myDefineFieldSet(parent,name,title,top,left,height,width) {  //表单中定义fieldset
	//定义fieldset控件，参数依次为：父级控件、控件名、标题、起始位置Y坐标、起始位置X坐标、控件宽度。返回可执行的程序代码。
	var str="var "+name+"={xtype:'fieldset',";
	str+="id:'"+name+"',name:'"+name+"',";
	if (title!=''){
		str+="title:'&nbsp;"+title+"',";
	}
	if (height>0) str+="height:"+height+",";
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="defaults:{ labelAlign:'left',labelSeparator:'' },";	
	str+="layout:'absolute'";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}
	//eval(str);
	return(str);	
};

function myDefineFormGridPicker(parent,name,label,labelwidth,top,left,width,maxlength,blanktext,grid) {
	//ppppppp控件名称name,对应grid名称my+name+GridPicker
	if (grid.editmodel!='editable' && grid.editmodel!='validation'){
		var str=myDefineReadOnlyField(parent,name,label,labelwidth,top,left,width,'');	
	}else{
		var str=myDefineTextField(parent,name,label,labelwidth,top,left,width,maxlength,blanktext);
		if (grid.editmodel=='validation') str+="Ext.getCmp('"+name+"').validation=true;";
		else str+="Ext.getCmp('"+name+"').validation=false;";
	}	
	str+=myDefineButton(parent,name+'button','…',top+1,left+width+8,20,24,'');
	var gname="my"+name+"GridPicker";
	var pmyGrid={};
	pmyGrid=myGetGridAttrs(grid,pmyGrid);
	pmyGrid.name=gname;
	pmyGrid.varname='p'+gname;
	pmyGrid.parent=grid.parent;  //记录detailgrid名称
	pmyGrid.parenttype=grid.parenttype;
	if (grid.table!=undefined && grid.table!='' && (grid.sql==undefined || grid.sql=='')){
 		pmyGrid.sql="select * from "+grid.table;
 	}	
 	str+="var p"+gname+"={};\n";
	str+="p"+gname+".name='"+gname+"';\n";
	str+="p"+gname+".varname='p"+gname+"';\n";
	str+="p"+gname+'.sql="'+pmyGrid.sql+'";\n';
	str+="p"+gname+'.keyfield="'+pmyGrid.keyfield+'";\n';
	str+="p"+gname+'.sortfield="'+pmyGrid.sortfield+'";\n';
	str+="p"+gname+".showtitle='false';\n";
	str+=myDefineGrid(pmyGrid); //生成grid
	str+=myDefineGridSelWin(pmyGrid);
	str+="\n function fn"+pmyGrid.keyfield+"buttonClick(btn){\n";
	str+="var locatevalue=Ext.getCmp('"+pmyGrid.keyfield+"').getValue();\n";
	str+='var sql="select count(*)+1 as rowno from ('+pmyGrid.sql+') as p where '+pmyGrid.keyfield+"<'\"+locatevalue+\"'\"; \n"; 
	str+="Ext.Ajax.request({\n";
	str+="url:'system//fn_executeSql.jsp',\n";
	str+="params:{ database:sysdatabasestring, updateSql:'',selectSql:sql },\n";									
	str+="method: 'POST',async:false,\n";
	str+="callback:function(options,success,response){\n";
	str+="var rowno=Ext.decode(response.responseText).rowno;\n";
	str+="var xpagesize="+pmyGrid.name+".store.pageSize;\n";
	str+="if (xpagesize>0) var pageno=Math.floor((rowno-1)/xpagesize)+1;\n";
	str+="else var pageno=1;\n";
	str+=pmyGrid.varname+".index=rowno-xpagesize*(pageno-1)-1;\n";
	str+=pmyGrid.varname+".locatevalue='';\n";
	str+="var newparams={ database:sysdatabasestring, sqlString:"+pmyGrid.varname+".sql,keyField:"+pmyGrid.varname+".keyfield,sortField:"+pmyGrid.varname+".sortfield,limit:xpagesize,summaryFields:''};\n";
	str+="Ext.apply("+pmyGrid.name+".store.proxy.extraParams,newparams);\n";
	str+=pmyGrid.name+".store.loadPage(pageno);\n";
	str+=pmyGrid.name+"Win.show();\n";
	str+="}});\n"		
	str+="}\n";
	//blur验证数据
	var tmp=(pmyGrid.valuefields).split(';');
	var str1="Ext.getCmp('"+pmyGrid.keyfield+"').addListener('blur',function(field,e){\n";
	str1+="var flag=0;\n";
	str1+="if (field.value!=''){\n";
	str1+='var sql="select * from ('+pmyGrid.sql+') as p where '+pmyGrid.keyfield+'=\'"+field.value+"\'";\n';
	str1+="Ext.Ajax.request({\n";
	str1+="url:'system//fn_getOneRecord.jsp',\n";  
	str1+="params:{database:sysdatabasestring, keyField: '"+pmyGrid.keyfield+"',sqlString:sql},\n";
	str1+="method:'POST',async:false,\n";
	str1+="callback:function(options,success,response){\n";
	str1+="var result=Ext.decode(response.responseText);\n";	
	str1+="if (result.rowCount>0) {\n";
	str1+="flag=1;";
	for (var i=0;i<tmp.length;i++){
		if (tmp[i]!=''){
			str1+="Ext.getCmp('"+tmp[i]+"').setValue(result."+tmp[i]+");\n";
		}
	}	
	str1+="}else{";
	str1+="flag=-1;";
	str1+="}\n";
	str1+="}";  //callback
	str1+="});";  //ajax
	str1+="}";  //if keyvlue
	str1+="if (flag!=1){\n";
	for (var i=0;i<tmp.length;i++){
		if (tmp[i]!=''){
			str1+="Ext.getCmp('"+tmp[i]+"').setValue('');\n";
		}
	}
	str1+="}";
	str1+="if (flag==-1){\n";
	for (var i=0;i<tmp.length;i++){
		if (tmp[i]!='' && tmp[i]!=pmyGrid.keyfield){
			str1+="Ext.getCmp('"+tmp[i]+"').setValue('"+pmyGrid.keyspec+"输入错误！');\n";
		}
	}
	//str1+="eval(sysError('&nbsp;"+pmyGrid.keyspec+"输入错误，请重新输入！',0,0));\n";
	str1+="Ext.getCmp('"+pmyGrid.keyfield+"').focus(true,100);";
	str1+="}\n";  //flag
	str1+="});\n";
	str+=str1;
	//console.log(str1);
	return(str);
};


function myDefineColumnGridPicker(grid) {  //pppppick可编辑grid中选择数据
	//ppppppp控件名称name,对应grid名称my+name+GridPicker
	var gname="my"+grid.name+"ColumnGridPicker";
	var pmyGrid={};
	pmyGrid=myGetGridAttrs(grid,pmyGrid);
	pmyGrid.name=gname;
	pmyGrid.varname='p'+gname;
	pmyGrid.parent=grid.parent;  //记录detailgrid名称
	pmyGrid.parenttype=grid.parenttype;
 	if (grid.table!=undefined && grid.table!='' && (grid.sql==undefined || grid.sql=='')){
 		pmyGrid.sql="select * from "+grid.table;
 	}	
	var str="var p"+gname+"={};\n";
	str+="p"+gname+".name='"+gname+"';\n";
	str+="p"+gname+".varname='p"+gname+"';\n";
	str+="p"+gname+'.sql="'+pmyGrid.sql+'";\n';
	str+="p"+gname+'.keyfield="'+pmyGrid.keyfield+'";\n';
	str+="p"+gname+'.sortfield="'+pmyGrid.sortfield+'";\n';
	str+="p"+gname+".showtitle='false';\n";
	str+=myDefineGrid(pmyGrid); //生成grid
	str+=myDefineGridSelWin(pmyGrid);
	str+="function fn"+pmyGrid.keyfield+"ColumnClick(btn){\n";
	//错误:records[0]取得的值为旧的值
	str+="var records="+grid.parent+".getSelectionModel().getSelection();\n";
	str+="var locatevalue=records[0].get('"+pmyGrid.keyfield+"');\n";
	str+="Ext.getCmp('"+pmyGrid.name+"FilterText').setValue(locatevalue);\n";
	//str+="var xfilter=myGetFilterSql("+pmyGrid.name+"FilterCheckMenu,Ext.getCmp('"+pmyGrid.name+"FilterText').getValue());\n";
	str+='var sql="select count(*)+1 as rowno from ('+pmyGrid.sql+') as p where '+pmyGrid.keyfield+"<'\"+locatevalue+\"'\"; \n";
	//str+="if (xfilter!='') sql+=\" and \"+xfilter; \n"; 
	str+='sql+=sys.sqltab+" select count(*) as rowflag from ('+pmyGrid.sql+') as p where '+pmyGrid.keyfield+"='\"+locatevalue+\"'\"; \n";
	//str+="if (xfilter!='') sql+=\" and \"+xfilter; \n"; 
	//str+="alert(xfilter);\n";//

	str+="Ext.Ajax.request({\n";
	str+="url:'system//fn_executeSql.jsp',\n";
	str+="params:{ database:sysdatabasestring, updateSql:'',selectSql:sql },\n";									
	str+="method: 'POST',async:false,\n";
	str+="callback:function(options,success,response){\n";
	str+="var rowno=Ext.decode(response.responseText).rowno;\n";
	str+="var rowflag=Ext.decode(response.responseText).rowflag;\n";
	str+="var xpagesize="+pmyGrid.name+".store.pageSize;\n";
	str+="if (xpagesize>0) var pageno=Math.floor((rowno-1)/xpagesize)+1;\n";
	str+="else var pageno=1;\n";
	str+=pmyGrid.varname+".index=rowno-xpagesize*(pageno-1)-1;\n";
	str+=pmyGrid.varname+".locatevalue='';\n";
	str+="var sql="+pmyGrid.varname+".sql;\n";
	//str+="if (xfilter!='') sql=myAddWheretoSql(sql,xfilter);\n";  //select语句中增加一个where条件
	str+="var newparams={ database:sysdatabasestring, sqlString:sql,keyField:"+pmyGrid.varname+".keyfield,sortField:"+pmyGrid.varname+".sortfield,limit:xpagesize,summaryFields:'' };\n";
	str+="Ext.apply("+pmyGrid.name+".store.proxy.extraParams,newparams);\n";
	str+=pmyGrid.name+".store.loadPage(pageno);\n";
	str+=pmyGrid.name+"Win.show();\n";
	str+="}});\n"		
	str+="}\n";
	//console.log(str);
	//验证输入的值是否正确，在.sql中存在
	var str1=''; 
	str1+="function fn"+pmyGrid.keyfield+"ColumnCheck(kvalue,record){\n";
	str1+="p"+grid.parent+".error=0;";
	/*  //记录号index错位，指向新的记录
   	str1+="var record="+grid.parent+".store.getAt(p"+grid.parent+".index);";
	str1+="if (record){";
	str1+="var kvalue=record.get(field).myTrim();\n";
	*/
	str1+="var rowcount=-1;\n";
	str1+="if (kvalue!=''){\n";
	str1+='var sql="select * from ('+pmyGrid.sql+') as p where '+pmyGrid.keyfield+"='\"+kvalue+\"'\"; \n";
	str1+="Ext.Ajax.request({\n";
	str1+="url:'system/fn_getOneRecord.jsp',\n";
	str1+="params:{ databasestring: sysdatabasestring, sqlString:sql, keyField:'"+pmyGrid.keyfield+"'},\n";
	str1+="method: 'POST',async:false,\n";
	str1+="callback:function(options,success,response){\n";
	str1+="result=response.responseText;\n";
	str1+="rowcount=Ext.decode(result).rowCount;\n";
	if (grid.valuefields!=undefined && grid.valuefields!=''){
		var tmp=grid.valuefields.split(';');
		str1+="if (rowcount>0){\n";
		for (var j=0;j<tmp.length;j++){
			str1+="var v=Ext.decode(result)."+tmp[j]+";\n";
			str1+="if (v!=undefined) record.set('"+tmp[j]+"',v);\n";
		}
		str1+="}else{\n";
		for (var j=0;j<tmp.length;j++){
			//if (j==0) str1+="record.set('"+tmp[j]+"','"+pmyGrid.keyspec+"输入错误！');\n";
			//else
			 str1+="record.set('"+tmp[j]+"','');\n";
		}
		str1+="}\n";
	}
	str1+="}\n";  //callback
	str1+="});\n";  //ajax
	str1+="}else{\n";//if kvalue
	if (grid.valuefields!=undefined && grid.valuefields!=''){
		var tmp=grid.valuefields.split(';');
		for (var j=0;j<tmp.length;j++){
			str1+="record.set('"+tmp[j]+"','');\n";
		}
	}	
	str1+="}\n";  //kvalue=''
	//str1+="}\n";   //if record
	str1+="return (1-rowcount)";
	str1+="}\n";		
	str+=str1;
	//console.log(str1);
	return(str);
};

function myDefineTextField(parent,name,label,labelwidth,top,left,width,maxlength,blanktext) {
	//定义textfield控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度、最多可输入的字符数、为空时的提示信息。返回可执行的程序代码。
	if (labelwidth<=0) 
		labelwidth=label.length*sysfontwidth;
	if (label!='')
		var lmargin=(labelwidth-label.length*sysfontwidth)/(label.length-1);
	else 
		var lmargin=0;		
	var	str="var "+name+"={xtype:'textfield',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="xreadOnly:false,";  //自定义属性
	str+="fieldLabel:'"+label+"',";
	str+="labelSeparator:'',";	
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	//if (lmargin>0 && lmargin<10) str+="labelCls:'myCSS"+lmargin+"',";
	str+="cls:'myInputCSS',";
	//str+="labelCls:'myFieldCSS',";
	if (maxlength>0) str+="enforceMaxLength:true,maxLength:"+maxlength+",";
	if  (blanktext!='') str+="allowBlank:false,blankText:'"+blanktext+"',";
	else str+="allowBlank:true,";
	str+="listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); } }";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	return(str);
};

function myDefineDisplayField(parent,name,label,labelwidth,top,left,width) {
	//定义displayfield控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度。返回可执行的程序代码。
	var	str="var "+name+"={xtype:'displayfield',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="fieldLabel:'"+label+"',";
	str+="labelSeparator:'',";
	str+="fieldCls:'myDisplayFieldCSS',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+"";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	//str+=myInputCSS(name);
	//eval(str);
	return(str);	
};

function myDefinePasswordField(parent,name,label,labelwidth,top,left,width,maxlength,blanktext) {
	//定义password控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度、最多可输入的字符数、为空时的提示信息。返回可执行的程序代码。
	if (labelwidth<=0) 
		labelwidth=label.length*sysfontwidth;
	if (label!='')
		var lmargin=(labelwidth-label.length*sysfontwidth)/(label.length-1);
	else 
		var lmargin=0;		
	var	str="var "+name+"={xtype:'textfield',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="xreadOnly:false,";  //自定义属性
	str+="inputType:'password',";
	str+="fieldLabel:'"+label+"',";
	str+="labelSeparator:'',";	
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	//str+="cls:'myInputCSS',";
	if (maxlength>0) str+="enforceMaxLength:true,maxLength:"+maxlength+",";
	if  (blanktext!='') str+="allowBlank:false,blankText:'"+blanktext+"',";
	else str+="allowBlank:true,";
	str+="listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); } }";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	//eval(str);
	return(str);
};

function myDefineLinkField(parent,name,label,labelwidth,top,left,width,url) {
	//定义带超链接的displayfield控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度、最多可输入的字符数、超链接地址。返回可执行的程序代码。
	var	str="var "+name+"={xtype:'displayfield',";
	str+="fieldLabel:'"+label+"',";
	str+="labelSeparator:'',";	
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="fieldCls:'myUrlFieldCSS',";
	if (url!='') {
		str+="listeners:{";
		str+="render:function(){";
		str+="Ext.fly(this.el).on('click',";
		str+="function(e,t) {";
		str+=url;
		str+="});}},";
	}
	//if (url!='') str+=url+",";	
	str+="id:'"+name+"',name:'"+name+"'";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	return(str);	
};

function myDefineReadOnlyField(parent,name,label,labelwidth,top,left,width,value) {
	//定义只读的textfield控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度、超链接地址。返回可执行的程序代码。
	if (labelwidth<=0) labelwidth=label.length*sysfontwidth;
	var	str="var "+name+"={xtype:'textfield',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="fieldLabel:'"+label+"',";
	str+="labelSeparator:'',";	
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	if (value!='') str+="value:'"+value+"',";
	str+="cls:'myInputCSS',";
	str+="xreadOnly:true,";  //自定义属性
	str+="readOnly:true";
	str+="};";	
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	//console.info(str);
	return(str);
};

function myDefineMemoField(parent,name,label,labelwidth,top,left,height,width,maxlength,blanktext) {
	//定义textarea备注型控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件高度、控件宽度、最多可输入的字符数、为空时的提示信息。返回可执行的程序代码。
	var str="var "+name+"={xtype:'textarea',";
	str+="id:'"+name+"',name:'"+name+"',enableKeyEvents: true,";
	if (label!='') {
		str+="fieldLabel:'"+label+"',";
		str+="labelSeparator:'',";	
	}else{
		str+="hideLabel:true,";
	}
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	if (width>0) str+="width:"+width+",";
	if (height>0) str+="height:"+height+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="fieldCls:'myFieldCSS',";  
	if (maxlength>0) str+="enforceMaxLength:true,maxLength:"+maxlength+",";
	else if (maxlength<0) str+="readOnly:true,"; 
	if  (blanktext!='') str+="allowBlank:false,blankText:'"+blanktext+"'";
	else str+="allowBlank:true";
	//str+=",listeners:{specialkey: function(field, e){ if(e.getKey()==34 || e.getKey()==33) return false; } },";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	//str+=myInputCSS(name);
	return(str);
};

function myDefineHtmlEditor(parent,name,label,labelwidth,top,left,height,width,maxlength,blanktext) {
	//定义htmleditor控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件高度、控件宽度、最多可输入的字符数、为空时的提示信息。返回可执行的程序代码。
	var str="var "+name+"={xtype:'htmleditor',";
	str+="id:'"+name+"',name:'"+name+"',enableKeyEvents: true,";
	if (label!='') {
		str+="fieldLabel:'"+label+"',";
		str+="labelSeparator:'',";	
	}else{
		str+="hideLabel:true,";
	}
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	if (width>0) str+="width:"+width+",";
	if (height>0) str+="height:"+height+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="cls:'myFieldCSS',";  
	if (maxlength>0) str+="enforceMaxLength:true,maxLength:"+maxlength+",";
	else if (maxlength<0) str+="readOnly:true,"; 
	if  (blanktext!='') str+="allowBlank:false,blankText:'"+blanktext+"'";
	else str+="allowBlank:true";
	//str+=",listeners:{specialkey: function(field, e){ if(e.getKey()==34 || e.getKey()==33) return false; } },";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	//str+=myInputCSS(name);
	return(str);
};

function myDefineCheckField(parent,name,label,labelwidth,top,left,value) {
	//定义checkbox控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、选中状态。返回可执行的程序代码。
	var	str="var "+name+"={xtype:'checkbox',";
	str+="id:'"+name+"',name:'"+name+"',";
	//str+="fieldLabel:'"+label+"',";
	str+="hideLabel:true,";
	str+="boxLabel:'"+label+"',";
	str+="labelSeparator:'',";
	str+="cls:'myInputCSS',";
	if (value!='') str+="checked:"+value+",";	
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); } }";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	//eval(str);
	return(str);
};

function myDefineImageField(parent,name,filename,top,left,height,width) {
	//定义htmleditor控件，参数依次为：父级控件、控件名、图片对应的文件名和路径、起始位置Y坐标、起始位置X坐标、图片高度、图片宽度。返回可执行的程序代码。
	var	str="var "+name+"={xtype:'image',";
	str+="id:'"+name+"',name:'"+name+"',";
	if (width>0) str+="width:"+width+",";
	if (height>0) str+="height:"+height+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="src:'"+filename+"'";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	return(str);
};

function myVLine(parent,name,top,left,height,width) {
	//定义一条直线，参数依次为：父级控件、控件名、起始位置Y坐标、起始位置X坐标、直线高度、直线宽度。返回可执行的程序代码。
	var	str="var "+name+"={xtype:'image',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="width:"+width+",";
	str+="height:"+height+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="src:'system/images/vline.gif',";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	return(str);
};

function myHLine(parent,name,top,left,height,width) {
	//定义一条横线，参数依次为：父级控件、控件名、起始位置Y坐标、起始位置X坐标、横线高度、横线宽度。返回可执行的程序代码。
	var	str="var "+name+"={xtype:'image',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="width:"+width+",";
	str+="height:"+height+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="src:'system/images/hline.gif',";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	return(str);
};



function myDefineHiddenField(parent,name,type) {
	//定义hidden控件，参数依次为：父级控件、控件类别。返回可执行的程序代码。
	if (type==undefined || type=='') type='textfield';
	var	str="var "+name+"={xtype:'"+type+"',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="xreadOnly:true,";  //自定义属性
	str+="readOnly:true,";
	if (type=='datefield') str+="format:'"+sysdateformat+"',";
	str+="hidden:true";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	//eval(str);
	return(str);
};

function myDefineItemCombox(parent,name,label,labelwidth,top,left,width,items,fieldset,value) {
	//定义静态combo控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度、下拉框选项、对应的列名称集、初始值。返回可执行的程序代码。
	//支持多列，列之间用tab分隔
	var tmp1=fieldset.split(';');
	var str="var "+name+"Store=new Ext.data.SimpleStore ({";
	str+="fields:[";
	for (var i=0;i<tmp1.length;i++){
		if (i>0) str+=",";
		str+="'"+tmp1[i]+"'";
	}
	str+="],";
	var tmp1=items.split(';');
	str+="data:[";
	for (var i=0;i<tmp1.length;i++){
		var tmp2=tmp1[i].split('	');
		var str1='[';
		for (var j=0;j<tmp2.length;j++){
			if (j>0) str1+=',';
			str1+="'"+tmp2[j]+"'";
		}
		str1+="]";	
		if (i>0) str+=",";
		str+=str1;
	}	
	str+="]"	
	str+="});";
	str+="var "+name+"={";
	str+="xtype:'combobox',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="xreadOnly:false,";
	str+="fieldLabel:'"+label+"',";
	str+="labelSeparator:'',";
	str+="cls:'myFieldCSS',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	str+="store:"+name+"Store,"
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="xreadOnly:false,";
	str+="editable:false,";
	str+="triggerAction:'all',";
	str+="displayField:'"+name+"',";
	str+="valueField:'"+name+"',";
	str+="mode:'local',";
	//str+="forceSelection:true,";
	str+="resizable:false,";
	str+="value:'"+value+"',";
	str+="listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); }";
	//str+=",select:function(combo, record, index) { fnSelectCombo(combo,record,index); }";
	str+="}";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}
	//console.info(str);
	return(str);
};

function myDefineSimpleCombox(parent,name,label,labelwidth,top,left,width,items,fieldset,value) {
	//定义静态combo控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度、下拉框选项、对应的列名称集、初始值。返回可执行的程序代码。
	//支持多列，列之间用/分隔
	var tmp1=fieldset.split(';');
	var str="var "+name+"Store=new Ext.data.SimpleStore ({";
	str+="fields:[";
	for (var i=0;i<tmp1.length;i++){
		if (i>0) str+=",";
		str+="'"+tmp1[i]+"'";
	}
	str+="],";
	var tmp1=items.split(';');
	str+="data:[";
	for (var i=0;i<tmp1.length;i++){
		var tmp2=tmp1[i].split('/');
		var str1='[';
		for (var j=0;j<tmp2.length;j++){
			if (j>0) str1+=',';
			str1+="'"+tmp2[j]+"'";
		}
		str1+="]";	
		if (i>0) str+=",";
		str+=str1;
	}	
	str+="]"	
	str+="});";
	str+="var "+name+"={";
	str+="xtype:'combobox',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="xreadOnly:false,";
	str+="fieldLabel:'"+label+"',";
	str+="labelSeparator:'',";
	//str+="cls:'myInputCSS',";
	str+="cls:'myFieldCSS',";
	//str+="fieldCls:'myFieldCSS',";			
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	str+="store:"+name+"Store,"
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="xreadOnly:false,";
	str+="editable:false,";
	str+="triggerAction:'all',";
	str+="displayField:'"+name+"',";
	str+="valueField:'"+name+"',";
	str+="mode:'local',";
	//str+="forceSelection:true,";
	str+="resizable:false,";
	str+="value:'"+value+"',";
	str+="listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); }";
	str+=",beforeselect:function(combo, record, index) { fnSelectSimpleCombo(combo,record,index); }";
	//str+=",select:function(combo, record, index) { alert(99); }";
	str+="}";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};\n";
	}
	//str+="function fnSelectSimpleCombo(combo,record,index){ }\n";
	
	//str+=myInputCSS(name);
	//console.info(str);
	return(str);
};

function myDefineCombox(parent,name,label,labelwidth,top,left,width,sql,fieldset,value) {
	//定义动态combo控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度、selsect语句、对应的列名称集、初始值。返回可执行的程序代码。
	//选中事件名称fn"+name+"ComboSelect(combo,record,index);
	var tmp1=fieldset.split(';');
	var str="var "+name+"Store=Ext.create('Ext.data.Store',{";
	str+="fields:[";
	for (var i=0;i<tmp1.length;i++){
		if (i>0) str+=",";
		str+="{name:'"+tmp1[i]+"',type:'string'}";
	}
	str+="],";
    str+="proxy:{type:'ajax',";
    str+='extraParams:{database:sysdatabasestring, sqlString:"'+sql+'"},';
    str+="url:'system//fn_getComboxData.jsp',";
    str+="actionMethods: { create: 'POST', read: 'POST',  update: 'POST', destroy: 'POST' },\n"; 
    str+="reader: {data:'totalCount',type:'json',root:'result'";
  	str+="}},";
  	str+="listeners:{store:function(store){";
  	str+="if ("+name+".store.getTotalCount()>0)";
    //str+=name+".setValue("+name+"Store.getAt(0).data.Store);";
    str+=name+"}}";  	
    str+="});"; 
	str+="var "+name+"={";
	str+="xtype:'combobox',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="fieldLabel:'"+label+"',";
	str+="labelSeparator:'',";	
	str+="cls:'myFieldCSS',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	str+="store:"+name+"Store,"
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	//str+="enableKeyEvents:true,";
	str+="xreadOnly:false,";
	str+="editable:false,";
	str+="triggerAction:'all',";
	str+="displayField:'"+tmp1[0]+"',";
	str+="valueField:'"+tmp1[0]+"',";
	str+="mode:'local',";
	str+="resizable:false,lazyRender:false,";
	//str+="selectOnTab:true,";
	str+="value:'"+value+"',";
	str+="listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); }";
	//str+=",select:function(combo, record, index) { fnSelectCombo(combo,record,index); }";
	str+=",select:function(combo, record, index) { fn"+name+"ComboSelect(combo,record,index); }";
	str+="}";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}
	str+=myInputCSS(name);
	//eval(str);
	return(str);
};

function myDefineDateField(parent,name,label,labelwidth,top,left,width,blanktext,value,minv,maxv) {
	//定义datefield控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度、为空时的值、初始值、最小日期和最大日期。返回可执行的程序代码。
	var str='';
	str+="var "+name+"_xvalue={xtype:'textfield',";  //实际转换格式之后的值
	str+="id:'"+name+"_xvalue',name:'"+name+"_xvalue',";
	str+="hidden:true};";
	str+="var "+name+"={xtype:'datefield',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="fieldLabel:'"+label+"',";
	str+="labelSeparator:'', xreadonly:'false',";
	//str+="altFormats: 'Y年m月d日',";
	str+="altFormats: 'Y-m|Y-n|Y-n-j|Y-m-d|Y/n/j|Y/m/d|Y-m|Y-n|Y/d|Y/n|Y年n月j日|Y年m月d日|Y年m月|Y年n月',";
	if (maxv!=undefined && maxv!='') str+="maxValue:'"+maxv+"',";	
	if (minv!=undefined && minv!='') str+="minValue:'"+minv+"',";	
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+","; 
	str+="x:"+left+",";
	if  (blanktext!='') str+="allowBlank:false,blankText:'"+blanktext+"',";
	else str+="allowBlank:true,";
	str+="labelSeparator:'',";	
	if (value!='') str+="value:'"+value+"',";
	if (value.indexOf("年")>=0) str+="format:'Y年m月d日',";
	else str+="format:'"+sysdateformat+"',";
	str+="listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); }";
	str+=",change:function(field, nvalue){\n";
	str+="var value=Ext.util.Format.date(nvalue,sysfulldateformat);\n";
	str+="if (value=='' || value=='1900-01-01') value='null';\n";
	str+="Ext.getCmp('"+name+"_xvalue').setValue(value); }\n";
	str+="}\n";
	str+="};\n";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+=parent+".add("+name+"_xvalue);";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+");";
		str+="Ext.getCmp('"+parent+"').add("+name+"_xvalue);";
		str+="}\n";
	}
	//str+=myInputCSS(name);
	//console.log(str);
	return(str);
};

function myDefineTimeField(parent,name,label,labelwidth,top,left,width,value,minv,maxv,step){
	//定义timefield控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度、初始值、最小值、最大值、步长值。返回可执行的程序代码。
	if (step==undefined || step==0) step=30;
	var	str="var "+name+"={xtype:'timefield',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="fieldLabel:'"+label+"',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	if (width>0) str+="width:"+width+",";
	else str+="width:75,";
	str+="y:"+top+",";
	str+="x:"+left+",";
	if (maxv!='') str+="maxValue:'"+maxv+"',";	
	if (minv!='') str+="minValue:'"+minv+"',";
	//str+="maxValue:'01:00 AM',";	
	//str+="maxValue:'23:00 PM',format:'H:i',";	
	str+="format:'H:i',";	
    if(step>0) str+="increment:"+step+","
	if (value!='') str+="value:'"+value+"',";
	str+="labelSeparator:'',";
	str+="listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); } }";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	//console.info(str);
	return(str);
}
    
function myDefineIntField(parent,name,label,labelwidth,top,left,width,value,maxv,minv) {
	//定义整型变量控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度、初值、最大值、最小值。返回可执行的程序代码。
	var	str="var "+name+"={xtype:'numberfield',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="fieldCls:'field-align-right',";  //system/css/icon中的样式
	//str+="regex:/^[-+]?[\d]+$/,";
	str+="fieldLabel:'"+label+"',";
	str+='allowDecimal:false,';
	str+='decimalPrecision:0,';
	str+="hideTrigger: true,";  //去掉spinbutton	
	if (!isNaN(maxv)) str+='maxValue:'+maxv+',';	
	if (!isNaN(minv)) str+='minValue:'+minv+',';
	str+="nanText:'请输入有效整数',";	
	str+="spinDownEnabled:false,";	
	str+="spinUpEnabled:false,";	
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="labelSeparator:'',";	
	if (value!='') str+="value:'"+value+"',";
	str+="listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); } }";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	//eval(str);
	return(str);
};

function myDefineSpinField(parent,name,label,labelwidth,top,left,width,value,maxv,minv) {
	//定义整型spin控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度、初值、最大值、最小值。返回可执行的程序代码。
	minv=minv+'';  //转换数据类型
	maxv=maxv+'';
	var	str="var "+name+"={xtype:'numberfield',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="fieldCls:'field-align-right',";  //system/css/icon中的样式
	str+="fieldLabel:'"+label+"',";
	str+='allowDecimal:false,';
	str+='decimalPrecision:0,';
	//str+="grow:false,";  //按上下箭头不改变值	
	if (maxv!='' && !isNaN(maxv)) str+='maxValue:'+maxv+',';
	if (minv!='' && !isNaN(minv)) str+='minValue:'+minv+',';
	str+="nanText:'请输入有效数值型数据',";	
	str+="spinDownEnabled: true,";	
	str+="spinUpEnabled: true,";	
	str+="itemCls:'float-left', clearCls:'allow-float',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="labelSeparator:'',";	
	if (value!='') str+="value:"+value+",";
	str+="listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); } }";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	//console.info(str);
	return(str);
};

function myDefineDecimalField(parent,name,label,labelwidth,top,left,width,value,decimal,maxv,minv) {
	//定义浮点数值型变量控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度、初值、小数位数、最大值、最小值。返回可执行的程序代码。
	minv=minv+'';  //转换数据类型
	maxv=maxv+'';
	var	str="var "+name+"={xtype:'decimalfield',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="fieldCls:'field-align-right',";  //system/css/icon中的样式
	str+="fieldLabel:'"+label+"',";
	str+="xreadOnly:false,";  //自定义属性
	if (decimal==0){
		str+='allowDecimal:false,';
		str+='decimalPrecision:0,';
	}else{
		str+='decimalPrecision:'+decimal+',';
	}
	str+="hideTrigger:true,";  //去掉spinbutton
	str+="keyNavEnabled:false,";	
	str+="grow:false,";  //按上下箭头不改变值	
	if (maxv!='' && !isNaN(maxv)) str+='maxValue:'+maxv+',';
	if (minv!='' && !isNaN(minv)) str+='minValue:'+minv+',';
	str+="nanText:'请输入有效数值型数据',";	
	str+="spinDownEnabled:false,";	
	str+="spinUpEnabled:false,";	
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="labelSeparator:'',";	
	if (value!='') str+="value:'"+value+"',";
	str+="listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); } }";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	//console.info(str);
	return(str);
};

function myDefineFloatField(parent,name,label,labelwidth,top,left,width,dec,value,maxv,minv) {
	//定义浮点数值型变量控件，参数依次为：父级控件、控件名、fieldlabel标签、标签宽度、起始位置Y坐标、起始位置X坐标、控件宽度、初值、小数位数、最大值、最小值。返回可执行的程序代码。
	var	str="var "+name+"={xtype:'decimalfield',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="fieldCls:'field-align-right',";  //system/css/icon中的样式
	str+="fieldLabel:'"+label+"',";
	str+="labelSeparator:'',";
	//regex:/^\d$/,";
	if (dec<=0) {
		str+='allowDecimal:false,';
		str+='decimalPrecision:0,';
	}else{
		str+='allowDecimal:true,';
		str+="decimalPrecision:"+dec+",";
	}
	str+="hideTrigger: true,";  //去掉spinbutton	
	if (!isNaN(maxv)) str+='maxValue:'+maxv+',';	
	if (!isNaN(minv)) str+='minValue:'+minv+',';
	str+="nanText:'请输入有效整数',";	
	//str+="spinDownEnabled:false,";	
	//str+="spinUpEnabled:false,";	
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	str+="labelSeparator:'',";	
	if (value!='') str+="value:'"+value+"',";
	str+="listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); }";
	str+="}";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	//eval(str);
	return(str);
};

function myDefineLabel(parent,name,label,top,left,width,font) {
	//定义label标签控件，参数依次为：父级控件、控件名、fieldlabel标签、起始位置Y坐标、起始位置X坐标、控件宽度、字体。返回可执行的程序代码。
	if (width==undefined) width=0;
	if (font==undefined) font='';
	var fontname='';
	var fontsize='';
	var style='';	
	var	str="var "+name+"={xtype:'label',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="text:'"+label+"',";
	/*
	var tmp=font.split(";");
	if (tmp.length>0 && tmp[0]!='') style+='font-family: '+tmp[0];
	if (tmp.length>1 && tmp[1]>0) {
		if (style!='') style+=','; 
		style+=' font-size: '+tmp[1]+'px';
		alert(style);
	}
	*/	
	if (font!=''){
		str+="style:'font: "+font+"',";
		//if (style!='') str+="style:'font: normal 36px courier',";
	}
	if (width>0) str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+"";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	return(str);
};

function myDefineLabelField(parent,name,label,labelwidth,top,left,width,value,font) {
	//定义label标签控件，参数依次为：父级控件、控件名、fieldlabel标签、起始位置Y坐标、起始位置X坐标、控件宽度、字体。返回可执行的程序代码。
	var str=myDefineLabel(parent,name+'_x',label,top,left,0,font);
	str+=myDefineLabel(parent,name,value,top,left+labelwidth*1+2,width-labelwidth,font);
	return(str);
};

function myDefineButton(parent,name,label,top,left,height,width,event) {
	//定义button按钮控件，参数依次为：父级控件、控件名、按钮标题、起始位置Y坐标、起始位置X坐标、控件高度、控件宽度。返回可执行的程序代码。
	//控件默认事件名称为fn"+name+"Click(btn)
	var	str="var "+name+"={xtype:'button',";
	str+="id:'"+name+"',name:'"+name+"',";
	str+="text:'"+label+"',";
	str+="cls:'myBtnCSS',";
	if (height>0) 	str+="height:"+height+",";
	if (width>0) 	str+="width:"+width+",";
	str+="y:"+top+",";
	str+="x:"+left+",";
	if (event!=undefined && event!=''){
		str+="handler:function(btn) { "+event+"(btn); }";
	}else{
		str+="handler:function(btn) { fn"+name+"Click(btn); }";
	}	
	//str+="handler:function(btn) { fnButtonClick(btn); }";	
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){"; 
		str+=parent+".add("+name+");";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+")};";
	}	
	//eval(str);
	return(str);
};

function mySetFormReadOnly(myform,flag) {
	//将表单中的每个可编辑的控件设置为只读或非只读状态。返回可执行的程序代码。
	//xreadonly=true表示任何情况下该字段都不可以编辑
	var str="var xfield="+myform+".getForm().getFields();\n";
	str+="for (var j=0;j<xfield.length;j++) {\n";
	//str+="if (xfield.items[j].isVisible() && !xfield.items[j].xreadOnly) {\n";
	str+="if (!xfield.items[j].xreadOnly) {\n";
	str+="Ext.getCmp(xfield.items[j].getId()).setReadOnly("+flag+");\n";
	str+="}\n";
	str+="}\n";
	return(str);
};

function mySaveFormToRecord(fieldtext,fieldset,record) {  
	//输入一个字符集、字段级，将字段的值复制到客户端record记录中，字符之间以[@]分隔。
	var tmp=fieldset.split(';');
	for (var i=0;i<tmp.length;i++){
		var x1=fieldtext.indexOf(sys.ftab+tmp[i]+sys.ftab+':');
		var x2=fieldtext.indexOf(":"+sys.ftab,x1+tmp[i].length+7);
		if (x2>0 && x1>0){
			var xvalue=fieldtext.substring(x1+tmp[i].length+7,x2-0);
			record.set(tmp[i],xvalue);
		}
	}
	return(1);  
};


function myGetFormValues(pmyForm,v) {  //vvvvv  
	//输入pmyform，返回各个表单中其中的各个字段及其值，使用pmyForm.fieldset变量进行累加，以[@]分隔。
	//[tab]键分隔
	var str="pmyForm.fieldtext='';\n";
	for (var i=1;i<=pmyForm.pagecount;i++){
		str+="var xfid=myForm"+i+".getForm().getFields();\n";
		str+="for (var j=0;j<xfid.length;j++) {\n";
		str+="var xvalue=xfid.items[j].getValue()+'';\n";  //隐含转成字符型
		str+="if (xvalue=='null') xvalue='';\n";
		str+="var xtype=xfid.items[j].getXType().toLowerCase();\n"
		str+="if (xtype=='decimalfield' || xtype=='checkfield') {\n";  //数值型
		str+="if (xvalue=='' || xvalue=='null') { xvalue='0'; }\n";
		str+="}else if (xtype=='datefield') {\n";  //日期变量处理
		str+="xvalue=Ext.util.Format.date(xvalue,'"+sysdateformat+"');\n";
		str+="if (xvalue=='' || xvalue=='1900-01-01') { xvalue='null'; }\n";
		str+="}else if (xtype=='timefield') {\n";
		str+="xvalue=Ext.util.Format.date(xvalue,'H:i');\n";
		str+="if (xvalue=='') { xvalue='null'; }\n";
		str+="}else if (xfid.items[j].getId()=='fileosname') {\n";
		str+="}\n";		
		str+="xvalue=(''+xvalue).toMyString();\n";
		str+="pmyForm.fieldtext+=sys.ftab+xfid.items[j].getId()+sys.ftab+':'+xvalue+':'+sys.ftab;\n";
		str+="}\n";
		str+="pmyForm.fieldtext+=sys.ftab;\n";
	}	
	return(str);  //以[a]分隔
};


function myGetRecordValues(grid,record) {  //从grid记录中提取某一行各列的值vvvvv  
	//输入pmyform，返回各个表单中其中的各个字段及其值，使用pmyForm.fieldset变量进行累加，以[@]分隔。
	//[tab]键分隔
	fieldtext='';
	var fields=grid.getStore().model.getFields();
	for (var i=0;i<fields.length;i++){
		var xfid=grid.columns[i].dataIndex;
		var xtype=grid.columns[i].xtype;
		var xvalue=record.get(xfid);
		if (xvalue=='null') xvalue='';
		if (xtype=='decimalfield' || xtype=='checkfield') {
			if (xvalue=='' || xvalue=='null') xvalue='0';
		}else if (xtype=='datefield') {
			xvalue=Ext.util.Format.date(xvalue,sysdateformat);
			if (xvalue=='' || xvalue=='1900-01-01') xvalue='null';
		}else if (xtype=='timefield') {
			xvalue=Ext.util.Format.date(xvalue,'H:i');
			if (xvalue=='') xvalue='null';
		}	
		xvalue=(''+xvalue).toMyString();
		fieldtext+=sys.ftab+xfid+sys.ftab+':'+xvalue+':'+sys.ftab;
	}
	fieldtext+=sys.ftab;
	return(fieldtext);  //以[tab]分隔
};

function myGenInsertSqlbyRecord(xsysdatabasestring,table,xfields,record){  //从grid的record中取值生成面向table的insert语句
	if (xfields.length==0) xfields=myGetTableEditableFields(xsysdatabasestring,table);
	var sql1="insert into "+table+"("; 
	var sql2=""; 
	var sql='';
	k=0;
	var xfiddim=xfields.split(';');
	for (var i=0;i<xfiddim.length;i++){
		var tmp=xfiddim[i].split(':');
		var xtype=tmp[0];
		var f=tmp[1];
		var xvalue=record.get(f);
		if (xvalue!=undefined){
			if (xvalue=='null') xvalue='';
			if (xtype=='n' || xtype=='l') {  //decimal and checkbox
				if (xvalue=='' || xvalue=='null') xvalue='0';
			}else if (xtype=='d') {  //datefield
				xvalue=Ext.util.Format.date(xvalue,sysdateformat);
				if (xvalue=='' || xvalue=='1900-01-01') xvalue='null';
			}else if (xtype=='t') {  //timefield
				xvalue=Ext.util.Format.date(xvalue,'H:i');
				if (xvalue=='') xvalue='null';
			}
			xvalue=(''+xvalue).toMyString(); //转换类型
			if (k>0){
				sql1+=',';
				sql2+=',';
			}
			sql1+=f;
			sql2+="'"+xvalue+"'";
			k++;
		}		
	}
	sql=sql1+') values ('+sql2+')';
	//console.log(sql);
	return (sql);	
}


function mySaveStoreRecord(myform,record) {
	//将myform中的列值赋值到store对应的record中。
	if(record){
		var xfielddim=myform.getForm().getFields();
		for (var i=0;i<xfielddim.length;i++) {
			var f=xfielddim.items[i].getId();
			if (Ext.getCmp(f)!=null) {
				record.set(f,Ext.getCmp(f).getValue());
			}	
		}	
	}
	//return(record);			
};
		

function myLoadResultValues(result,fields,id) {
	//输入form中的fields，将json数据复制到form
	var str=''
	for (var j=0;j<fields.length;j++) {
		var xfid=fields.items[j].getId()+'';
		if (id!='' && xfid.indexOf(id)>=0) {
			var xid=xfid.substring(xfid.indexOf(id)+id.length);
		}else{
			var xid=xfid;
		}
		var xvalue=eval("result."+xid);
		if (xvalue!=undefined && xvalue.indexOf("'")>=0){
			xvalue=xvalue.replace("'","\\'");			
		}
		str+="Ext.getCmp('"+xfid+"').setValue('"+xvalue+"');";
	}	
	//console.info(str);
	return(str); 
};

function myAddHiddenFields(fieldset,myform){
	//添加fieldset中没有被定义的控件到myform中去。
	var str='';
	if (fieldset!='' && fieldset!=undefined){
		var xfiddim=fieldset.split(';');
		for (var i=0;i<xfiddim.length;i++){
			var f=xfiddim[i];
			var index=f.indexOf(':');  //去掉数据类型的标记
			if (index>=0) f=f.substring(0,index);
			if (Ext.getCmp(f)==null) {
				str+=myform+".add({xtype:'textfield',id:'"+f+"',name:'"+f+"',hidden:true,xreadOnly:true,value:''});";
			}
		}
	}
	return(str);
};

function myPKUniqueCheck(pt){	//后台验证数据，判断主码是否重复
	//后台验证数据，判断主码是否重复
	var xerror='';
	var sql="select pid=count(*) from "+pt.tablename+" where "+pt.keyfield+"='"+pt.keyvalue+"'";
	Ext.Ajax.request({
		url:'system//fn_executeSql.jsp',
		params:{ database:pt.sysdatabasestring, updateSql:'',selectSql:sql},									
   		method: 'POST',async:false,
		callback:function(options,success,response){
   			var pid=Ext.decode(response.responseText).pid;  //获取字段名及其值的集合，只有一行
   			if (pid>0) xerror+="<br>"+pt.keyspec+"<font color=blue>["+Ext.getCmp(pt.keyfield).getValue()+"]</font>值重复！";
   		}	 
	});
	return(xerror);
}

function myCheckPKValue(table,keyfield,keyvalue,keyspec,fieldset) {
	//输入一个表名、关键字、关键字值，判断记录是否存在，若存在，则将该记录中由fieldset指定的列进行赋值。返回可执行程序代码。
	var tmp=fieldset.split(';');
	if (keyvalue!=''){
		var str='var sql="select * from '+table+' where '+keyfield+"='"+keyvalue+"'\";";
		str+="Ext.Ajax.request({";
		str+="url:'system//fn_getOneRecord.jsp',";  
		str+="params:{database:sysdatabasestring, keyField:'"+keyfield+"',sqlString:sql},";
		str+="method:'POST',async:false,";
		str+="callback:function(options,success,response){";
		str+="var result=Ext.decode(response.responseText);";	
		str+="if (result.rowCount>0) {";
		for (var i=0;i<tmp.length;i++){
			if (tmp[i]!=''){
				str+="Ext.getCmp('"+tmp[i]+"').setValue(result."+tmp[i]+");";
			}
		}	
		str+="}else{";
		str+="Ext.getCmp('"+keyfield+"').focus();";
		for (var i=0;i<tmp.length;i++){
			if (tmp[i]!=''){
				str+="Ext.getCmp('"+tmp[i]+"').setValue('');";
			}
			str+="eval(sysError('&nbsp;"+keyspec+"输入错误，请重新输入！',290,240));";
		}	
		str+="}}";
		str+="});";
	}else{
		var str='';
		for (var i=0;i<tmp.length;i++){
			if (tmp[i]!=''){
				//str+="var xtype=Ext.getCmp('"+tmp[i]+"').getXType().toLowerCase();";
				str+="Ext.getCmp('"+tmp[i]+"').setValue('')";
			}	
		}	
	}		
	//console.info(str);
	return (str);
};

function myDefineSelectInTreeWin(mytree) {  
	//定义一个树和子窗体，双击树中的某个节点返回节点值。返回可执行程序代码。
	var str=myDefineCheckMenu(mytree.name+'FilterCheckMenu',mytree.filterfield);
	str+=myDefineTree('center',mytree);
	str+=mytree.name+".on('itemdblclick',function(view,record,item,index,event) {";
    str+="if(record.get('leaf')){";
    //str+="record.set('xtype','"+mytree.type+"');";
	str+=mytree.name+"Win.hide();";
    str+="fnSelectInTree('"+mytree.name+"',record);";
	str+="}";
	str+="});";
	str+="var "+mytree.name+"Win=Ext.create('Ext.window.Window', {"; 
	str+="title:'"+mytree.wintitle+"',";
	str+="height:"+(mytree.height+92)+",";
	str+="width:"+(mytree.width+12)+",";
	str+="closeAction:'hide',modal:true,resizable:true,layout:'absolute',";
	str+="tbar: ['-',";
	str+="{id:'"+mytree.name+"FilterText',xtype:'textfield',xreadOnly:false,width:"+Math.min(mytree.width-180,280)+",labelWidth:80,";
	str+="fieldLabel:'&nbsp;输入关键字：',labelSeparator:''},";
	str+="'-',{id:'"+mytree.name+"FilterMenu',text:'过滤列选择',";
	str+="menu:"+mytree.name+"FilterCheckMenu},'-',";
	str+="{xtype:'button',text:'过滤',width:55,iconCls:'searchIcon',";
	str+="handler:function(){";
	str+=mytree.varname+".searchtext=myGetFilterSql("+mytree.name+"FilterCheckMenu,Ext.getCmp('"+mytree.name+"FilterText').getValue());";
	str+=mytree.varname+".rootcode='';";
	str+=mytree.varname+".selectedcode='';";
	str+="var newparams={ database:sysdatabasestring, maxReturnNumber:maxReturnNumber,keyField:"+mytree.varname+".keyfield,sqlString:"+mytree.varname+".sql,searchText:"+mytree.varname+".searchtext,rootCode:"+mytree.varname+".rootcode,selectedCode:"+mytree.varname+".selectedcode };";
	str+="Ext.apply("+mytree.name+".store.proxy.extraParams,newparams);";
	str+=mytree.name+".store.load();";
	str+="}";
	str+="},'-','&nbsp;'],";
	str+="items:["+mytree.name+"],";
	str+="buttons:[{text:'确定',	height:25,handler:function(){";
	str+="var records="+mytree.name+".getSelectionModel().getSelection();";
	str+="if(records[0] && records[0].get('leaf')){";
    //str+="record.set('xtype','"+mytree.type+"');";
	str+=mytree.name+"Win.hide();";
    str+="fnSelectInTree('"+mytree.name+"',records[0]);";
	str+="}}";
	str+="},{";
	str+="text:'取消',";
	str+="height:25,handler:function(){";
	str+=mytree.name+"Win.hide();";
	str+="}	},'&nbsp;&nbsp;'],";
	str+="listeners:{";
	str+="show:function(){";
	str+="Ext.getCmp('"+mytree.name+"FilterText').setValue('');";
	str+=mytree.varname+".searchtext='';";
	str+=mytree.varname+".rootcode='';";
	//str+="mytree.selectedcode='"+locatevalue+"';";
	//str+=mytree.name+".store.load();"
	str+="}}";
	str+="});";
	//console.info(str);
	return(str);
};


function myDefineGridSelWin(mygrid) {  //wwwwww
	//定义一个grid和子窗体，双击grid中的某行返回该行的值。返回可执行程序代码。
	//其中调用主页中的函数fnselectingrid
	var mtitle='';
	if (mygrid.filterfields!=undefined){
		var pfid={};
		pfid.fields=mygrid.filterfields;
		pfid=myGetGridColumn(pfid);
		for (var i=0;i<pfid.xtitle.length;i++){
			if (pfid.xfield[i]!='sysrowno'){
				if (mtitle!='') mtitle+=';';
				mtitle=mtitle+pfid.xfield[i]+'/'+pfid.xtitle[i];
			}
		}
	}else{
		for (var i=0;i<mygrid.xtitle.length;i++){
			if (mygrid.xfield[i]!='sysrowno' && mygrid.xshowtitle[i]){
				if (mtitle!='') mtitle+=';';
				mtitle=mtitle+mygrid.xfield[i]+'/'+mygrid.xtitle[i];
			}
		}
	}
	//定义过滤栏	
	var str=myDefineCheckMenu(mygrid.name+'FilterCheckMenu',mtitle);
	//定义双击事件
	str+=mygrid.name+".on('itemdblclick',function(view,record,item,index,event) {\n";
	str+="var records="+mygrid.name+".getSelectionModel().getSelection();\n";
	str+="if (records[0]){\n";
	str+="if (records[0].get('isparentflag')==undefined || records[0].get('isparentflag')==0){\n";	
	str+=mygrid.name+"Win.hide();\n";
	var tmp=(mygrid.keyfield+';'+mygrid.valuefields).split(';');
	//将选中的记录数据填充到form控件或grid的record中
	if (mygrid.parenttype=='form'){
		for (var j=0;j<tmp.length;j++){
			str+="if (Ext.getCmp('"+tmp[j]+"')!=null) Ext.getCmp('"+tmp[j]+"').setValue(records[0].get('"+tmp[j]+"'));\n";
		}
		str+="Ext.getCmp('"+mygrid.keyfield+"').focus(true,100);\n";
	}else{
		str+="var _records="+mygrid.parent+".getSelectionModel().getSelection();\n";
		str+="if (_records[0]){\n";
		for (var j=0;j<tmp.length;j++){
			str+="_records[0].set('"+tmp[j]+"',records[0].get('"+tmp[j]+"'));\n";
		}
		str+="}\n";
	}
	str+="}else{\n";
	str+="eval(sysWarn('非最后一级分类，无法选择！',0,0));\n";
	str+="}}});\n";
	//600为一个grid的最小值wwwwww
	//str+="var gridw=Math.min("+mygrid.width+",Math.max(600,myGetGridWidth("+mygrid.name+")));";
	//str+=mygrid.name+".setWidth(gridw);"; 
	str+="var "+mygrid.name+"Win=Ext.create('Ext.window.Window', {\n";
	str+="title:'"+mygrid.title+"',\n";
	str+="height:"+(mygrid.height+93)+",\n";
	str+="width:"+(mygrid.width+12)+",\n";
	str+="closeAction:'hide',modal:true,resizable:true,layout:'absolute',\n";
	str+="tbar: [{xtype:'tbspacer',width:2},'-',\n";
	str+="{xtype:'textfield',xreadOnly:false,width:"+Math.min(mygrid.width-180,280)+",labelWidth:80,\n";
	str+="id:'"+mygrid.name+"FilterText',fieldLabel:'&nbsp;输入关键字：',labelSeparator:''},\n";
	str+="{xtype:'tbspacer',width:1},'-',{id:'"+mygrid.name+"FilterMenu',text:'选择过滤列',menu:"+mygrid.name+"FilterCheckMenu},'-',\n";
	str+="{xtype:'button',text:'过滤',width:55,iconCls:'searchIcon',\n";
	str+="handler:function(){\n";
	str+="var xfilter=myGetFilterSql("+mygrid.name+"FilterCheckMenu,Ext.getCmp('"+mygrid.name+"FilterText').getValue());\n";
	str+="if (xfilter!='') {\n";
	str+='var sql="select * from ("+'+mygrid.varname+'.sql+") as p where "+xfilter;\n';
	str+="}else{\n";	
	str+="var sql="+mygrid.varname+".sql;\n";
	str+="}\n";
 	str+=mygrid.varname+".locatevalue='';\n";
 	str+="var newparams={ database:sysdatabasestring, sqlString:sql,keyField:p"+mygrid.name+".keyfield,limit:"+mygrid.name+".store.pageSize,summaryFields:'' };\n";
	str+="Ext.apply("+mygrid.name+".store.proxy.extraParams,newparams);\n";
	str+=mygrid.name+".store.loadPage(1);\n";
	str+="}\n";
	str+="},'-','&nbsp;'],\n";
	str+="items:["+mygrid.name+"],\n";
	str+="buttons:[\n";
	str+="{text:'确定',height:25,handler:function(){\n";
	str+="var records="+mygrid.name+".getSelectionModel().getSelection();\n";
	str+="if (records[0]){\n";
	str+="if (records[0].get('isparentflag')==undefined || records[0].get('isparentflag')==0){\n";	
	str+=mygrid.name+"Win.hide();\n";
	var tmp=(mygrid.keyfield+';'+mygrid.valuefields).split(';');
	if (mygrid.parenttype=='form'){
		for (var j=0;j<tmp.length;j++){
			str+="if (Ext.getCmp('"+tmp[j]+"')!=null) Ext.getCmp('"+tmp[j]+"').setValue(records[0].get('"+tmp[j]+"'));\n";
		}
		str+=mygrid.name+"Win.hide();\n";
		str+="Ext.getCmp('"+mygrid.keyfield+"').focus(true,100);\n";
	}else{
		//str+="var _records="+mygrid.parent+".getSelectionModel().getSelection();\n";
		str+="var _record="+mygrid.parent+".store.getAt(p"+mygrid.parent+".index);\n";
		str+="if (_record){\n";
		for (var j=0;j<tmp.length;j++){
			str+="_record.set('"+tmp[j]+"',records[0].get('"+tmp[j]+"'));\n";
		}
		str+="}\n";
	}
	str+="}}}\n";
	str+="},{\n";
	str+="text:'取消',\n";
	str+="height:25,handler:function(){\n";
	str+=mygrid.name+"Win.hide();\n";
	str+="}	},'&nbsp;&nbsp;'],\n";
	str+="listeners:{\n";
	str+="show:function(){;\n";  //show
	str+="	Ext.getCmp('"+mygrid.name+"FilterText').setValue('');\n";
	str+="}\n";
	str+="}\n";
	str+="});\n";
	//onload事件
	str+=mygrid.name+".store.on('load',function(store){\n";
	str+="var index="+mygrid.varname+".index; \n";
   	str+="if ("+mygrid.varname+".locatevalue!='') {\n";
	str+="index="+mygrid.name+".store.findBy(function(record,id) {\n";
	str+="return record.get("+mygrid.varname+".keyfield)=="+mygrid.varname+".locatevalue;\n"; 
	str+="});} \n";
	str+="if (index<0) index=0;\n";
	str+="if ("+mygrid.name+".store.getCount()>0 && index<"+mygrid.name+".store.getCount()){\n";		
	str+="setTimeout(function(){\n";
	str+=mygrid.name+".getSelectionModel().select(index);\n";
	str+="},0);\n";
	str+="}});\n";
	//console.info(str);  //wwwww
	return(str);
};

function myDefineSelectInTreeGridWin(mytree,mygrid) {
	//定义一个树表格和子窗体控件，双击树中的某个节点返回节点值。返回可执行程序代码。
	//其中调用主页中的函数fnselectingrid
	var tmp1=mygrid.columnfield.split(';');
	var tmp2=mygrid.columntitle.split(';');
	var tmpstr='';
	for (var i=0;i<tmp1.length;i++){
		if (tmpstr!='') tmpstr=tmpstr+';';
		tmpstr+=tmp1[i]+"/"+tmp2[i];
	}
	var str="var treegridflag='grid';";
	str+=myDefineCheckMenu(mygrid.name+'FilterCheckMenu',tmpstr);
	str+=myDefineGrid(mygrid);
	str+=mygrid.name+".on('itemdblclick',function(view,record,item,index,event) {";
	str+="var records="+mygrid.name+".getSelectionModel().getSelection();";
	str+="if(records[0]){";
	str+="if(records[0].get('isparentflag')==undefined || records[0].get('isparentflag')==0){";	
	str+=mygrid.name+"TreeWin.hide();";
	str+="fnSelectInGrid('"+mygrid.name+"',records[0]);";
	str+="}else{";
	str+="eval(sysWarn('非最后一级分类，无法选中！',300,200));";
	str+="}}});";
	str+="var "+mygrid.name+"TreeWin=Ext.create('Ext.window.Window', {"; 
	str+="title:'"+mygrid.wintitle+"',";
	str+="height:"+(mygrid.height+93)+",";
	str+="width:"+(mygrid.width+12)+",";
	str+="closeAction:'hide',modal:true,resizable:true,layout:'absolute',";
	str+="tbar: ['-',";
	str+="{xtype:'textfield',xreadOnly:false,width:"+Math.min(mygrid.width-180,280)+",labelWidth:80,";
	str+="id:'"+mygrid.name+"FilterText',fieldLabel:'&nbsp;输入关键字：',labelSeparator:''},";
	str+="'&nbsp;','-',{id:'"+mygrid.name+"FilterMenu',text:'过滤列选择',menu:"+mygrid.name+"FilterCheckMenu},'-',";
	str+="{xtype:'button',text:'过滤',width:55,iconCls:'searchIcon',";
	str+="handler:function(){";
	str+="var xfilter=myGetFilterSql("+mygrid.name+"FilterCheckMenu,Ext.getCmp('"+mygrid.name+"FilterText').getValue());";
	str+="if (treegridflag=='grid'){";
	str+="if (xfilter!='') {";
	str+='var sql="select * from ("+'+mygrid.varname+'.sql+") as p where "+xfilter;';
	str+="}else{";	
	str+="var sql="+mygrid.varname+".sql;";
	str+="}";
 	str+=mygrid.varname+".locatevalue='';";
 	str+="var newparams={ database:sysdatabasestring, sqlString:sql,keyField:p"+mygrid.name+".keyfield,limit:"+mygrid.name+".store.pageSize,summaryFields:'' };";
	str+="Ext.apply("+mygrid.name+".store.proxy.extraParams,newparams);";
	str+=mygrid.name+".store.loadPage(1);";
	str+="}else{";
	str+=mytree.varname+".rootcode='';";
	str+=mytree.varname+".selectedcode='';";
	str+="var newparams={ database:sysdatabasestring, maxReturnNumber:maxReturnNumber,keyField:"+mytree.varname+".keyfield,sqlString:"+mytree.varname+".sql,searchText:"+mytree.varname+".searchtext,rootCode:"+mytree.varname+".rootcode,selectedCode:"+mytree.varname+".selectedcode };";
	str+="Ext.apply("+mytree.name+".store.proxy.extraParams,newparams);";
	str+=mytree.name+".store.load();";
	str+="}";
	str+="}";
	str+="},'-','&nbsp;','-',{xtype:'button',text:'切换',id:'treegridcmd',name:'treegridcmd',handler:function(){};}],";
	str+="items:["+mygrid.name+"],";
	str+="buttons:[{text:'确定',	height:25,handler:function(){";
	str+="if (treegridflag=='grid'){";
	str+="var records="+mygrid.name+".getSelectionModel().getSelection();";
	str+="if(records[0]){";
	str+="if(records[0].get('isparentflag')==undefined || records[0].get('isparentflag')==0){";	
	str+=mygrid.name+"TreeWin.hide();";
	str+="fnSelectInGrid('"+mygrid.name+"',records[0]);";  //调用选择程序
	str+="}}}else{";
	str+="var records="+mytree.name+".getSelectionModel().getSelection();";
	str+="if(records[0] && records[0].get('leaf')){";
	str+=mygrid.name+"TreeWin.hide();";
    str+="fnSelectInTree('"+mytree.name+"',records[0]);";
	str+="}";
	str+="}}";
	str+="},{";
	str+="text:'取消',";
	str+="height:25,handler:function(){";
	str+=mygrid.name+"TreeWin.hide();";
	str+="}	},'&nbsp;&nbsp;'],";
	str+="listeners:{";
	str+="show:function(){";
	str+="Ext.getCmp('"+mygrid.name+"FilterText').setValue('');";
	str+=mytree.varname+".searchtext='';";
	str+=mytree.varname+".rootcode='';";
	str+="}}";
	str+="});";
	//onload事件
	str+=mygrid.name+".store.on('load',function(store){";
	str+="var index=-1;";
   	str+="if ("+mygrid.varname+".locatevalue!='') {";
	str+="index="+mygrid.name+".store.findBy(function(record,id) {";
	str+="return record.get("+mygrid.varname+".keyfield)=="+mygrid.varname+".locatevalue;"; 
	str+="});";
	str+="if (index<0) index=0;";
	str+="if ("+mygrid.name+".store.getCount()>0 && index<"+mygrid.name+".store.getCount()){";		
	str+="setTimeout(function(){";
	str+=mygrid.name+".getSelectionModel().select(index);";
	str+="},0);";
	str+="}}});";	
	
	//定义树
	str+=myDefineCheckMenu(mytree.name+'FilterCheckMenu',mytree.filterfield);
	str+=myDefineTree('center',mytree);
	str+=mytree.name+".on('itemdblclick',function(view,record,item,index,event) {";
    str+="if(record.get('leaf')){";
	str+=mytree.name+"TreeWin.hide();";
    str+="fnSelectInTree('"+mytree.name+"',record);";
	str+="}";
	str+="});";
	//console.info(str);
	return(str);
};

function myShowGridSelWin(mygrid){
	var str="";
  	str+="if ("+mygrid.name+".store.pageSize>0){";
  	str+="var xid=Ext.getCmp('"+mygrid.keyfield+"').getValue();";
  	str+="var sql=\"select rowno=count(*)+1 from ("+mygrid.sql+") as p where "+mygrid.keyfield+"<'\"+xid+\"'\";";
	str+="Ext.Ajax.request({";
	str+="url:'system//fn_executeSql.jsp',";
	str+="params:{ database:sysdatabasestring, updateSql:'',selectSql:sql },";									
	str+="method: 'POST',async:false,";
	str+="callback:function(options,success,response){";
	str+="var rowno=Ext.decode(response.responseText).rowno;";
	str+="var xpagesize="+mygrid.name+".store.pageSize;";
	str+="var pageno=Math.floor((rowno-1)/xpagesize)+1;";
	str+=mygrid.varname+".locatevalue=Ext.getCmp("+mygrid.varname+".keyfield).getValue();";
	str+="var newparams={ database:sysdatabasestring, sqlString:"+mygrid.varname+".sql,keyField:"+mygrid.varname+".keyfield,sortField:"+mygrid.varname+".keyfield,limit:xpagesize,summaryFields:'' };";
	str+="Ext.apply("+mygrid.name+".store.proxy.extraParams,newparams);";
	str+=mygrid.name+".store.loadPage(pageno);";
	str+=mygrid.name+"Win.show();";
	str+="}";	
	str+="});";
	str+="}else{";		  	
	str+=mygrid.name+".store.loadPage(1);";
	str+=mygrid.name+"Win.show();";
	str+="}";
	//console.info(str);
	return(str);
}	  	

function myDefineMenu(name,menuset,iconCls) {  
	//定义menuitem菜单，参数依次为：控件名、菜单集变量名称、菜单按钮图标样式名称。返回可执行的程序代码。
	//可处理[]号province@provinceid/所在省份;@之后为关键字
	//-表示空行，*表示关键字为空
	//在调用的主页中包含一个fn*Click事件，跟踪用户选定哪个菜单条目
	var str='';
	var chr='';	
	var tmp=menuset.split(';');
	for (var i=0;i<tmp.length;i++){
		var str1=tmp[i];
		var index=str1.indexOf('/');
		if (index>=0) {
			var str3=str1.substring(index+1);
			str1=str1.substring(0,index);
		}else{
			var str3=str1;
		}
		var index1=str1.indexOf('@');
		if (index1>=0) {
			var str2=str1.substring(index1+1);
			str1=str1.substring(0,index1);	
		}else{
			var str2='';
		}
		if (str1=='-'){
			str+="var mn='-';";
		}else{		
			str+="var mn={xtype:'menuitem',text:'"+str3+"',id:'"+name+"_"+str1+"',";
			if (iconCls!=undefined && iconCls!=''){
				str+="iconCls:'"+iconCls+"',";
			}
			str+="index:'"+i+"',";  //自定义属性
			//str+="destroyMenu: false,"; 
			str+="textField:'"+str1+"',";  //自定义属性
			str+="keyField:'"+str2+"',";  //自定义属性
			str+="listeners:{click:function(item,e){";
		    str+="fn"+name+"Click(item,e);}";
	    	str+="}";
	    	str+="};";
	    }
	    str+=name+".push(mn);";
	}
	return(str);
};

function myDefineCheckMenu(name,menuset) {  //定义复选菜单
	//定义menucheck菜单，参数依次为：控件名、菜单集变量名称。返回可执行的程序代码。
	//alert(typeof name);
	var str="var "+name+"=[";
	var tmp=menuset.split(';');
	str+="{xtype:'menucheckitem',text:'全部',id:'"+name+"_all',xactive:1,pageindex:0,\n";
	str+="fieldname:'*',checked:true,checkedState:true,\n";
	str+="listeners:{checkchange:function(item,checked){\n";
	str+="for (var i=2;i<"+name+".length;i++){\n";
	str+="var id="+name+"[i].id;\n";
	str+="Ext.getCmp(id).setChecked(checked);\n";
	//str+="Ext.getCmp(id).checkedState=checked;";
	//str+=name+"[i].checkedState=checked;";
	str+="}\n";
	str+="}}},'-'\n";	
	var flag=0;
	for (var i=0;i<tmp.length;i++){
		var str1=tmp[i];
		var tmpx=str1.split(sys.tab);
		if (tmpx.length>1) var pageindex=tmpx[1];
		else var pageindex=0;
		str1=tmpx[0]; 
		var index=str1.indexOf('/');
		if (index>=0) {
			var str2=str1.substring(index+1);
			str1=str1.substring(0,index);
		}else{
			var str2=str1;
		}	
	    if (i>-1) str=str+',';
	    //fieldname、checkedState为自定义属性
		str+="{xtype:'menucheckitem',text:'"+str2+"',id:'"+name+"_"+str1+'_'+pageindex+"',\n";
		str+="pageindex:"+pageindex+",";  //自定义属性，记录checkmenu属于哪个tab
		if (pageindex<=1){
			str+="visible:true,xactive:1,";  //表示该菜单是否激活，在where考虑否
		}else{
			str+="visible:false,xactive:0,";
			flag=1;
		}
		str+="fieldname:'"+str1+"',checked:true\n";
		//str+=",listeners:{checkchange:function(item,checked){";
		//str+=name+"["+i+"].checkedState=checked;";
		//str+="}}";
		str+="}\n";
	}
	str+="];\n";
	//console.info(str);
	return(str);
};

function mysetCheckMenuVisible(myFilterCheckMenu,pageindex){  
	//显示pageindex对应tab页grid的checkmenu
	var str='';
	/*
	str+="for (var i=2;i<"+name+".length;i++){\n";
	str+="var cmp="+name+"[i];\n";
	str+="if (cmp.xactive==0) Ext.getCmp(cmp.id).setVisible(false);\n";
	str+="else Ext.getCmp(cmp.id).setVisible(true);\n";
	str+="}\n";
	*/
	for (var i=2;i<myFilterCheckMenu.length;i++){
		var cmp=myFilterCheckMenu[i];
		if (pageindex==cmp.pageindex){
			myFilterCheckMenu[i].xactive=1; 
			Ext.getCmp(cmp.id).setVisible(true);
		}else{
			myFilterCheckMenu[i].xactive=0; 
			Ext.getCmp(cmp.id).setVisible(false);
		}
	}
	return myFilterCheckMenu;
}	    
	
function myGetFilterSql(CheckMenu,filtertext){  //根据checkmenu生成过滤条件
	//输入一个菜单控件和文本过滤值，返回一个sql查询语句的where过滤条件。返回可执行程序代码。
	var sql='';
	filtertext=filtertext.replace("''","'");
	filtertext=filtertext.replace("'","''");
	if (filtertext!='') {
		for(var i=0;i<CheckMenu.length;i++){
			var id=CheckMenu[i].id;
			//console.log(i+'---'+CheckMenu[i].xactive);
			if (CheckMenu[i].xactive>0 && CheckMenu[i].fieldname!=undefined && CheckMenu[i].fieldname!='*' && CheckMenu[i].fieldname!='' && Ext.getCmp(id)!=null && Ext.getCmp(id).checked){  //fieldname为自定义属性; 
				if (sql!='') sql=sql+' or ';
				sql=sql+CheckMenu[i].fieldname+" like '%"+filtertext+"%'";
			}
		}	
	}
	if (sql!='') sql="("+sql+")";
	return(sql);
};

function myTestBlank(field,msg){
	//定义某个控件是否为空值，若为空，则返回msg对应的信息。返回可执行程序代码。
	var value=Ext.getCmp(field).getValue();
	if (Ext.getCmp(field).getXType().toLowerCase()=='datefield') {
		value=Ext.util.Format.date(value,sysdateformat);
	}	
	var	str='';
	if (value==''){ 
		var str="<br>"+msg+"为空！";
	}
	return(str);
};		

function myTestZero(field,msg){
	//定义某个控件是否为0，若为0，则返回msg对应的信息。返回可执行程序代码。
	var	str='';
	var value=Ext.getCmp(field).getValue();
	if (isNaN(value)) {
		str="<br>"+msg+"不是有效的数字！";
	}else if (Ext.getCmp(field).getValue()==0){ 
		var str="<br>"+msg+"为零！";
	}
	return(str);
};			

function myTestNeg(field,msg){
	//定义某个控件是否为负值，若为负值，则返回msg对应的信息。返回可执行程序代码。
	var	str='';
	var value=Ext.getCmp(field).getValue();
	if (isNaN(value)) {
		str="<br>"+msg+"不是有效的数字！";
	}else if (value<0){ 
		str="<br>"+msg+"小于零！";
	}
	return(str);
};			

function myTestNumber(field,msg){
	//定义某个控件是否为数字型值，若不是，则返回msg对应的信息。返回可执行程序代码。
	var value=Ext.getCmp(field).getValue();
	var str='';
	if (isNaN(value)) {
		str="<br>"+msg+"不是有效的数字！";
	}
	return(str);
};		

function myGetDateValue(field,format){
	//按format指定的格式提取日期控件的值。
	if (format==undefined) {
		format=sysdateformat;
	}
	if (Ext.getCmp(field)!=null){
		var v=Ext.getCmp(field).getValue();
	}else{
		v=field;
	}
	if (v!=''){
		v=Ext.util.Format.date(v,format);
	}else{
		v='';
	}
	return(v);
};

function mySetCmpReadOnly(fieldset,flag){  //设置按钮和菜单
	//将fieldset中指定的各个控件设置为只读或非只读状态。
	var tmp=fieldset.split(';');
	for (var i=0;i<tmp.length;i++){
		if (Ext.getCmp(tmp[i])!=null){
			Ext.getCmp(tmp[i]).setReadOnly(flag);
		}
	}		
};

function mySetCmpDisabled(fieldset,flag){  //设置按钮和菜单
	//将fieldset中指定的各个控件设置为活动或非活动状态。
	var tmp=fieldset.split(';');
	for (var i=0;i<tmp.length;i++){
		if (tmp[i]!='' && Ext.getCmp(tmp[i])!=null){
			Ext.getCmp(tmp[i]).setDisabled(flag);
			//设置权限,xaction为权限的类型
			if (Ext.getCmp(tmp[i]).xaction!=undefined){
				var str='var state=sys.'+Ext.getCmp(tmp[i]).xaction+'flag';
				eval(str);
				if (state!=undefined && state<=0){
					//Ext.getCmp(tmp[i]).setDisabled(true);
					Ext.getCmp(tmp[i]).setDisabled(flag);	//取消权限				
				}
			}			
		}
	}		
};

function mySetCmpVisible(fieldset,flag){  //设置按钮和菜单
	//将fieldset中指定的各个控件设置为可见或非可见状态。
	var tmp=fieldset.split(';');
	for (var i=0;i<tmp.length;i++){
		if (Ext.getCmp(tmp[i])!=null){
			Ext.getCmp(tmp[i]).setVisible(flag);
		}
	}		
};

function myCheckGridPKValue(tablename,keyfield,keyspec,keyvalue,mygrid,record,fieldset){
	//验证grid的单元格中编码是否输入正确,同步请求。获取主键值后，将数据库中值赋值到record中  
	var tmp=fieldset.split(";");
	if (keyvalue.myTrim()!=''){
		var sql="select * from "+tablename+" where "+keyfield+"='"+keyvalue+"'";
		var str="Ext.Ajax.request({";
		str+="url:'system//fn_getOneRecord.jsp',";  
		str+="params:{ database:sysdatabasestring, keyField:'"+keyfield+"',sqlString:\""+sql+"\""+" },";
		str+="method: 'POST',async:false,";
		str+="callback:function(options,success,response){";
		str+="var rowno=Ext.decode(response.responseText).rowCount;";
		str+="if (rowno>0) {";
		for (var i=0;i<tmp.length;i++){
			if (tmp[i]!=''){ 
				str+="record.set('"+tmp[i]+"',Ext.decode(response.responseText)."+tmp[i]+");";
			}
		}
		str+=mygrid.varname+".error=0;";
		str+="}else{";
		for (var i=0;i<tmp.length;i++){
			if (tmp[i]!=''){ 
				str+="record.set('"+tmp[i]+"','');";
			}
		}
		str+=mygrid.varname+".error=1;";
		//str+="var cellEditing="+mygrid.name+".plugins[0];";
		//str+="cellEditing.startEditByPosition({row:row,column:col});";
		str+=mygrid.name+"CellEditing.startEdit(row,col);";  //ext4.2方法						
		str+="eval(sysError('&nbsp;"+keyspec+"找不到，请重新输入！',290,220));";
		str+="}}});";
	}else{
		var str="";
		str+=mygrid.varname+".error=0;";
		for (var i=0;i<tmp.length;i++){
			str+="record.set('"+tmp[i]+"','');";
		}
	}
	return(str);	
};

function myRmb(amount){
	//输入一个数值，返回其对应的人民币大写值。根据您的教科书，自己改编?。
	var rmb='';
	if (amount<0) amount=-amount;
	var s=(1000000000000+amount).toFixed(2);
	var s1=s.substring(0,13);
	var s2=s.substring(14);
	var s11=s1.substring(1,5);  //-取亿的数量值，即0020
	var s12=s1.substring(5,9);  //--取万的数量值，即6058
	var s13=s1.substring(9,14); //--取万以下的数量值，即0096
	if (s11!='0000'){  //如果金额在“亿”部分中有值
		s11=s11.substring(0,1)+'仟'+s11.substring(1,2)+'佰'+s11.substring(2,3)+'拾'+s11.substring(3);
		s11=s11.replace('0仟','0');
		s11=s11.replace('0佰','0');
		s11=s11.replace('0拾','0');  //此时s11的值为：002拾0。
    	rmb=s11+'亿';   /* 此时rmb的值为：002拾0亿。*/
	}
	if (s12!='0000'){  //如果金额在“万”部分中有值
		s12=s12.substring(0,1)+'仟'+s12.substring(1,2)+'佰'+s12.substring(2,3)+'拾'+s12.substring(3);
		s12=s12.replace('0仟','0');
		s12=s12.replace('0佰','0');
		s12=s12.replace('0拾','0'); 
		rmb=rmb+s12+'万';
	}else{
		rmb=rmb+'0';	
	}
	if (s13!='0000'){  //如果金额在“万”以下部分中有值
		s13=s13.substring(0,1)+'仟'+s13.substring(1,2)+'佰'+s13.substring(2,3)+'拾'+s13.substring(3);
		s13=s13.replace('0仟','0');
		s13=s13.replace('0佰','0');
		s13=s13.replace('0拾','0'); 
		rmb=rmb+s13+'元';
	}else{
		rmb=rmb+'元';
	}
	while (rmb.indexOf('00')>=0) rmb=rmb.replace('00','0');
	if (amount>=1){
		rmb=rmb.replace('0亿','亿0');
		rmb=rmb.replace('0万','万0');
		rmb=rmb.replace('0元','元0');
	 }
	while (rmb.indexOf('00')>=0)  rmb=rmb.replace('00','0');
	if (rmb.substring(0,1)=='0' && amount>=1)  rmb=rmb.substring(1);
	if (myLeft(rmb,1)=='0' && amount>=1)  rmb=rmb.substring(1);
  	if (myLeft(s2,1)!='0') rmb=rmb+s2.substring(0,1)+'角';
  	if (myRight(s2,1)!='0'){ 
    	if (myLeft(s2,1)=='0') rmb=rmb+'0';
    	rmb=rmb+myRight(s2,1)+'分';
	}else{
		rmb=rmb+'整';
	}
	while (rmb.indexOf('0')>=0) rmb=rmb.replace('0','零');
	while (rmb.indexOf('1')>=0) rmb=rmb.replace('1','壹');
	while (rmb.indexOf('2')>=0) rmb=rmb.replace('2','贰');
	while (rmb.indexOf('3')>=0) rmb=rmb.replace('3','叁');
	while (rmb.indexOf('4')>=0) rmb=rmb.replace('4','肆');
	while (rmb.indexOf('5')>=0) rmb=rmb.replace('5','伍');
	while (rmb.indexOf('6')>=0) rmb=rmb.replace('6','陆');
	while (rmb.indexOf('7')>=0) rmb=rmb.replace('7','柒');
	while (rmb.indexOf('8')>=0) rmb=rmb.replace('8','捌');
	while (rmb.indexOf('9')>=0) rmb=rmb.replace('9','玖');
	return(rmb);
}

function myToRmb(num) {
	//输入一个数值，返回其对应的人民币大写值。网上下载的程序。
	var str1 = '零壹贰叁肆伍陆柒捌玖';  //0-9所对应的汉字
	var str2 = '万仟佰拾亿仟佰拾万仟佰拾元角分'; //数字位所对应的汉字
	var str3;    //从原num值中取出的值
	var str4;    //数字的字符串形式
	var str5='';  //人民币大写金额形式
	var i;    //循环变量
	var j;    //num的值乘以100的字符串长度
	var ch1;    //数字的汉语读法
	var ch2;    //数字位的汉字读法
	var nzero = 0;  //用来计算连续的零值是几个
	num = Math.abs(num).toFixed(2);  //将num取绝对值并四舍五入取2位小数
	str4 = (num * 100).toFixed(0).toString();  //将num乘100并转换成字符串形式
	j = str4.length;      //找出最高位
	if (j > 15){ return '溢出';}
	str2 = str2.substr(15-j);    //取出对应位数的str2的值。如：200.55,j为5所以str2=佰拾元角分
	//循环取出每一位需要转换的值
	for (i=0;i<j;i++){
		str3 = str4.substr(i,1);   //取出需转换的某一位的值
		if (i != (j-3) && i != (j-7) && i != (j-11) && i != (j-15)){    //当所取位数不为元、万、亿、万亿上的数字时
			if (str3 =='0'){
				ch1 ='';
				ch2 ='';
				nzero = nzero + 1;
			}else{
				if(str3 != '0' && nzero != 0){
					ch1 = '零' + str1.substr(str3*1,1);
					ch2 = str2.substr(i,1);
					nzero = 0;
				}else{
					ch1 = str1.substr(str3*1,1);
					ch2 = str2.substr(i,1);
					nzero = 0;
				}
			}
		}else{ //该位是万亿，亿，万，元位等关键位
			if (str3 != '0' && nzero != 0){
				ch1 = "零" + str1.substr(str3*1,1);
				ch2 = str2.substr(i,1);
				nzero = 0;
			}else{
				if (str3 != '0' && nzero == 0){
					ch1 = str1.substr(str3*1,1);
					ch2 = str2.substr(i,1);
					nzero = 0;
				}else{
					if (str3 == '0' && nzero >= 3){
						ch1 ='';
						ch2 ='';
						nzero = nzero + 1;
					}else{
						if (j >= 11){
							ch1 = '';
							nzero = nzero + 1;
						}else{
							ch1 = '';
							ch2 = str2.substr(i,1);
							nzero = nzero + 1;
						}
					}
				}
			}
		}
		if (i == (j-11) || i == (j-3)){  //如果该位是亿位或元位，则必须写上
			ch2 = str2.substr(i,1);
		}
		str5 = str5 + ch1 + ch2;
		if (i == j-1 && str3 == '0' ){   //最后一位（分）为0时，加上"整"
			str5 = str5 + '整';
		}
	}
	if (num == 0){
		str5 = '零元整';
	}
	return str5;
}

function myDefineFileField(parent,name,label,form,labelwidth,top,left,height,width,checkbox){
	//生成文件上传控件。生成4个控件filename-上传文件名,self-数据库保存的字段,id-服务器上传后的文件名,cmd-上传按钮,image-显示的图片
	var str="var "+name+"={";
	str+="xtype:'filefield',xreadOnly:true,fieldLabel:'选择文件：',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	str+="x:"+left+",y:"+top+",width:"+width+",";		
	str+="id:'"+name+"',";		
	str+="name:'"+name+"',";
	str+="buttonText:'&nbsp;浏览…&nbsp;',";
	str+="buttonMargin:8,"; 
	str+="listeners:{";
	str+="change:function(field){";
	str+="}}};";
	//定义按钮cmd
	str+="var "+name+"cmdup={xtype:'button',text:'上传',iconCls:'uploadIcon',xaction:'upload',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	str+="disabled:false,";
	str+="x:"+(left-1)+",y:"+top+"+rowHeight*2-2,width:58,height:24,";		
	str+="id:'"+name+"cmdup'"; 
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){";
		str+=parent+".add("+name+");";
		str+=parent+".add("+name+"cmdup);";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+");";	
		str+="Ext.getCmp('"+parent+"').add("+name+"cmdup);";	
		str+="}";
	}	
	return(str);	
};


function myDefineImageUpLoad(parent,name,filename,form,label,labelwidth,top,left,height,width,checkbox){
	//生成图片上传控件。生成4个控件filename-上传文件名,self-数据库保存的字段,id-服务器上传后的文件名,cmd-上传按钮,image-显示的图片
	var str="var "+name+"name={";
	//str+="xtype:'textfield',inputType:'file',"
	str+="xtype:'fileuploadfield',";  //ext4.2必须
	str+="xreadOnly:true,fieldLabel:'选择文件：',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	str+="x:"+left+",y:"+top+",";		
	if (width!=undefined && width>0) str+="width:"+width+",";		
	str+="id:'"+name+"name',";		
	str+="name:'"+name+"name',";
	str+="buttonText:'&nbsp;浏览…&nbsp;',";
	str+="buttonMargin:8,"; 
	str+="listeners:{";
	str+="change:function(field){";
	str+="}}};\n";
	//定义本身
	str+="var "+name+"={xtype:'textfield',xreadOnly:true,fieldLabel:'文件路径：',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	str+="x:"+left+",y:"+top+"+rowHeight*1,width:"+(width-7)+",";		
	str+="readOnly:true,hidden:true,";  //隐藏
	str+="listeners:{change:function(){";  //在change事件中显示图片
	str+="if (Ext.getCmp('"+name+"').getValue()=='' || sys.uploadflag<=0){";
	str+="Ext.getCmp('"+name+"icon').setDisabled(true);";
	str+="}else{";
	str+="Ext.getCmp('"+name+"icon').setDisabled(false);";
	str+="}";
	str+="eval(myShowImage('"+name+"image',Ext.getCmp('"+name+"').getValue(),"+(width-labelwidth-left-17)+","+height+"));";
	str+="}},";
	str+="id:'"+name+"',name:'"+name+"'};\n";
	//定义标识值控件
	str+="var "+name+"id={xtype:'textfield',hidden:true,";
	str+="xreadOnly:true,";  //自定义属性
	str+="id:'"+name+"id',name:'"+name+"id'};\n";
	//定义上传前源文件名
	str+="var "+filename+"={xtype:'textfield',fieldLabel:'"+label+"',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	str+="x:"+left+",y:"+top+"+rowHeight*1,width:"+(width-30)+",";		
	str+="readOnly:true,xreadOnly:true,";
	str+="id:'"+filename+"',name:'"+filename+"'};\n";
	//定义按钮cmd
	str+="var "+name+"cmdup={xtype:'button',text:'上传',iconCls:'uploadIcon',xaction:'upload',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	str+="disabled:true,";
	//str+="x:"+(left-1)+",y:"+top+"+rowHeight*2-2,width:"+(labelwidth-6)+",height:23,";		
	str+="x:"+(left-1)+",y:"+top+"+rowHeight*2-2,width:58,height:24,";		
	str+="id:'"+name+"cmdup',name:'"+name+"cmdup',\n"; 
	str+="handler:function(){";
	str+="var xfilename=Ext.getCmp('"+name+"name').getValue();";
	str+="var xid=Ext.getCmp('"+name+"id').getValue();"; //定义这个控件
	str+="var xsourcename=xfilename.substring(xfilename.lastIndexOf('\\\\')+1,xfilename.length);";
	str+="if (xfilename!=''){";
	str+=form+".submit({";
	str+="method:'post',async:false,";
	str+="url:'system//fn_fileUpLoad.jsp?filename='+xfilename+'&id='+xid,";  
	str+="waitTitle:'系统提示',waitMsg:'文件正在上传...',";
	str+="success:function(form,action){";
	str+="var result=action.result;";	
	str+="var xfilesize=result.filesize;";
	str+="var ximagewidth=result.imagewidth;";
	str+="var ximageheight=result.imageheight;";
	str+="var xfileext=result.fileext;";
	str+="Ext.getCmp('"+name+"').setValue(xid+'.'+xfileext);";
	str+="Ext.getCmp('"+filename+"').setValue(xsourcename);";
	str+="if (ximageheight>0 && ximagewidth>0){";
	str+="eval(myShowImage('"+name+"image',Ext.getCmp('"+name+"').getValue(),"+(width-labelwidth-left-17)+","+height+"));";
	//str+="console.log(myShowImage('"+name+"image',Ext.getCmp('"+name+"').getValue(),"+(width-labelwidth-left-17)+","+height+"));";
	str+="}";
	str+="eval(sysInfo('文件上传成功!',0,0));";
	str+="},";
	str+="failure:function(form, action) {";
	str+="var status = action.result.status;";
	str+="Ext.getCmp('"+name+"').setValue('');";
	str+="Ext.getCmp('"+filename+"').setValue('');";
	str+="Ext.getCmp('"+name+"image').setSrc(sysfilenotfound);";
	str+="sysError(status+'<br>文件上传失败！',0,0);"; 
	str+="}});";
	str+="}else{";
	str+="Ext.getCmp('"+name+"image').setSrc(sysfilenotfound);";
	str+="eval(sysWarn('没有选择上传的文件！',0,0));";
	str+="}}};\n";
	//定义按钮icon	
	str+="var "+name+"icon={xtype:'button',text:'',iconCls:'deletefileIcon',xaction:'upload',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	str+="x:"+(left+width-22)+",y:"+top+"+rowHeight*1,width:23,height:23,";		
	str+="id:'"+name+"icon',name:'"+name+"icon',"; 
	str+="handler:function(){";
	str+="Ext.getCmp('"+name+"').setValue('');";
	str+="Ext.getCmp('"+name+"image').setSrc(sysfilenotfound);";
	str+="Ext.getCmp('"+filename+"').setValue('');";
	str+="}};\n\n\n";	
	//定义图形
	str+="var "+name+"image={xtype:'image',hideLabel:true,\n";
	str+="x:"+(left*1.0+labelwidth*1.0+5)+",y:"+top+"+rowHeight*2,width:"+(width-labelwidth-left-31)+",height:"+height+",\n";		
	str+="id:'"+name+"image',name:'"+name+"image'\n";
	str+="};\n";
	checkbox=false;
	if (checkbox!='false'){
		//定义是否显示图片checkbox
		str+="var "+name+"checkbox={xtype:'checkbox',";
		str+="id:'"+name+"checkbox',name:'"+name+"checkbox',";
		str+="hideLabel:true,hidden:true,";
		str+="boxLabel:'显示图片',";
		str+="labelSeparator:'',";
		str+="checked:true,";	
		if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
		str+="y:"+top+"+rowHeight*3,";
		str+="x:"+left+"+2,";
		str+="listeners:{specialkey: function(field, e){ fnKeyEvent(field,e); },";
		str+="change:function(field){";
		str+="if (field.checked){";
		str+="Ext.getCmp('"+name+"image').setVisible(true);";
		str+="eval(myShowImage('"+name+"image',Ext.getCmp('"+name+"').getValue(),"+(width-labelwidth-left-17)+","+height+"));";
		str+="}else{ Ext.getCmp('"+name+"image').setVisible(false);}";
		str+="}}";
		str+="};\n";
	}
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){";
		str+=parent+".add("+name+");";
		str+=parent+".add("+name+"name);";
		str+=parent+".add("+name+"source);";
		str+=parent+".add("+name+"id);";
		str+=parent+".add("+name+"cmdup);";
		str+=parent+".add("+name+"icon);";
		str+=parent+".add("+name+"image);";
		if (checkbox!='false') str+=parent+".add("+name+"checkbox);";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+");";	
		str+="Ext.getCmp('"+parent+"').add("+name+"name);";	
		str+="Ext.getCmp('"+parent+"').add("+filename+");";	
		str+="Ext.getCmp('"+parent+"').add("+name+"id);";	
		str+="Ext.getCmp('"+parent+"').add("+name+"cmdup);";	
		str+="Ext.getCmp('"+parent+"').add("+name+"icon);";	
		str+="Ext.getCmp('"+parent+"').add("+name+"image);";
		if (checkbox!='false') str+="Ext.getCmp('"+parent+"').add("+name+"checkbox);";
		str+="}\n";
	}	
	//console.info(str);
	return(str);	
};

function myDefineFileUpLoad(parent,name,filename,form,label,labelwidth,top,left,height,width){
	//console.log(filename+'----'+form);
	//生成文件上传控件。生成5个控件name-上传文件名,self-数据库保存的字段,id-服务器上传后的文件名,cmd-上传按钮,desc-显示的图片
	var str="var "+name+"name={";  //上传文件
	str+="xtype:'fileuploadfield',fieldLabel:'选择文件：',labelSeparator:'',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	else str+="hideLabel:true,";
	str+="x:"+left+",y:"+top+",width:"+width+",";		
	str+="id:'"+name+"name',";		
	str+="name:'"+name+"name',";
	str+="xreadOnly:true,";  //自定义属性
	str+="buttonText:'浏览',buttonMargin:6,";
	str+="listeners:{";
	str+="change:function(field){";
	str+="}}};\n";
	//定义本身，文件路径
	str+="var "+name+"={xtype:'textfield',fieldLabel:'附件名称：',labelSeparator:'',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	else str+="hideLabel:true,";
	str+="x:"+left+",y:"+top+"+rowHeight*1,width:"+(width-30)+",";		
	str+="xreadOnly:true,";  //自定义属性
	str+="readOnly:true,hidden:true,";  //隐藏
	str+="listeners:{change:function(){";
	str+="if (Ext.getCmp('"+name+"').getValue()=='')";
	str+="Ext.getCmp('"+name+"icon').setDisabled(true);";
	str+="else Ext.getCmp('"+name+"icon').setDisabled(false);";
	str+="}},";
	str+="id:'"+name+"',name:'"+name+"'};\n";
	//定义目标文件标识值
	str+="var "+name+"id={xtype:'textfield',hidden:true,"; 
	str+="xreadOnly:true,";  //自定义属性
	str+="id:'"+name+"id',name:'"+name+"id'};\n";  //定义标识值控件
	//定义上传前源文件名
	str+="var "+filename+"={xtype:'textfield',fieldLabel:'"+label+"',labelSeparator:'',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	else str+="hideLabel:true,";
	str+="x:"+left+",y:"+top+"+rowHeight*1,width:"+(width-30)+",";		
	str+="readOnly:true,xreadOnly:true,";
	str+="id:'"+filename+"'};\n";
	//定义按钮cmd
	str+="var "+name+"cmdup={xtype:'button',text:'上传',iconCls:'uploadIcon',xaction:'upload',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	else str+="hideLabel:true,";
	//str+="x:"+(left+0)+",y:"+top+"+rowHeight*2-2,width:"+(labelwidth-6)+",height:23,";		
	str+="x:"+(left+0)+",y:"+top+"+rowHeight*2-2,width:58,height:24,";		
	str+="id:'"+name+"cmdup',name:'"+name+"cmdup',";
	str+="disabled:true,";
	str+="handler:function(){";
	str+="var xfilepathname=Ext.getCmp('"+name+"name').getValue();";
	str+="var xsourcename=xfilepathname.substring(xfilepathname.lastIndexOf('\\\\')+1,xfilepathname.length);";
	str+="var xid=Ext.getCmp('"+name+"id').getValue();"; //定义这个控件
	str+="if (xid==''){ ";
	str+="eval(sysWarn('缺少文件标识符，文件无法保存！',0,0));}";
	str+="else if (xfilepathname!=''){ ";
	str+=form+".submit({";
	str+="method:'post',async:false,";
	str+="url:'system//fn_fileUpLoad.jsp?filename='+xfilepathname+'&id='+xid,";  
	str+="waitTitle:'系统提示',waitMsg:'文件正在上传...',";
	str+="success:function(form,action){";
	str+="var result=action.result;";	
	str+="var xfilesize=result.filesize;";
	str+="var xfileext=result.fileext;";
	str+="Ext.getCmp('"+name+"').setValue(xid+'.'+xfileext);";
	str+="Ext.getCmp('"+filename+"').setValue(xsourcename);";
	str+="eval(sysInfo('文件上传成功!',0,0));";
	str+="},";
	str+="failure:function(form, action) {";
	str+="var status = action.result.status;";
	str+="Ext.getCmp('"+name+"').setValue('');";
	str+="Ext.getCmp('"+filename+"').setValue('');";
	str+="sysError(status+'<br>文件上传失败！',0,0);"; 
	str+="}});";
	str+="}else{";
	str+="eval(sysWarn('没有选择上传的文件！',0,0));";
	str+="}}};\n";
	//定义按钮icon	
	str+="var "+name+"icon={xtype:'button',text:'',iconCls:'deletefileIcon',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	else str+="hideLabel:true,";
	str+="x:"+(left+width-22)+",y:"+top+"+rowHeight*1,width:23,height:23,";		
	str+="id:'"+name+"icon',name:'"+name+"icon',"; 
	str+="handler:function(){";
	str+="Ext.getCmp('"+name+"').setValue('');";
	str+="Ext.getCmp('"+filename+"').setValue('');";
	str+="}};\n";
	//添加控件
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){";
		str+=parent+".add("+name+");\n";
		str+=parent+".add("+name+"name);\n";
		str+=parent+".add("+filename+");\n";
		str+=parent+".add("+name+"id);\n";
		str+=parent+".add("+name+"cmdup);\n";
		str+=parent+".add("+name+"icon);\n";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+");\n";	
		str+="Ext.getCmp('"+parent+"').add("+name+"name);\n";	
		str+="Ext.getCmp('"+parent+"').add("+filename+");\n";	
		str+="Ext.getCmp('"+parent+"').add("+name+"id);\n";	
		str+="Ext.getCmp('"+parent+"').add("+name+"cmdup);\n";	
		str+="Ext.getCmp('"+parent+"').add("+name+"icon);\n";	
		str+="}\n";
	}	
	//console.info(str);
	return(str);	
};

function myDefineFileDownLoad(parent,name,filename,form,label,labelwidth,top,left,height,width){
	//生成文件上传控件。生成3个控件name-上传文件名,self-数据库保存的字段,cmd-下载按钮
	var str="var "+filename+"={";  //上传文件
	str+="xtype:'textfield',fieldLabel:'"+label+"',labelSeparator:'',";
	str+="readOnly:true,";
	str+="xreadOnly:true,";  //自定义属性
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	else str+="hideLabel:true,";
	str+="x:"+left+",y:"+top+",width:"+(width-0)+",";		
	str+="id:'"+filename+"',";		
	str+="name:'"+filename+"'};\n";
	//定义本身，文件路径
	str+="var "+name+"={xtype:'textfield',fieldLabel:'附件名称：',labelSeparator:'',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	else str+="hideLabel:true,";
	str+="x:"+left+",y:"+top+"+rowHeight*1,width:"+(width-7)+",";		
	str+="readOnly:true,hidden:true,xreadOnly:true,";
	str+="listeners:{change: function(field){";  
	//设置cmd按钮disabled属性，当附件文件为空时，下载按钮失效。
	//str+="if (Ext.getCmp('"+name+"').getValue()=='' || sys.downloadflag<=0)";
	str+="if (Ext.getCmp('"+name+"').getValue()=='')";
	str+="Ext.getCmp('"+name+"cmddown').setDisabled(true);";
	str+="else Ext.getCmp('"+name+"cmddown').setDisabled(false);";
	str+="}},";	
	str+="id:'"+name+"',name:'"+name+"'};\n";
	//定义按钮
	str+="var "+name+"cmddown={xtype:'button',text:'下载',iconCls:'downloadIcon',xaction:'download',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	else str+="hideLabel:true,";
	str+="x:"+(left+0)+",y:"+top+"+rowHeight*1-2,width:58,height:24,";	//下一行	
	str+="id:'"+name+"cmddown',name:'"+name+"cmddown',";
	str+="disabled:true,";
	str+="handler:function(){";
	str+="var xsourcefilename=Ext.getCmp('"+name+"').getValue();";
	str+="var xtargetfilename=Ext.getCmp('"+filename+"').getValue();";
	str+="if (xsourcefilename!='' && myGetFileSize(xsourcefilename)>=0){"
	str+="var url='system//fn_fileDownLoad.jsp?path='+xsourcefilename+'&name='+xtargetfilename;";
	str+="if (xsourcefilename!=''){";
	str+="window.location.href=url;";
	str+="}";
	str+="}else{";
	str+="if (xsourcefilename!='') eval(sysError('下列文件找不到，下载失败！<br>['+xtargetfilename+']',0,0));";	
	str+="else eval(sysError('没有下载文件，下载失败！<br>',0,0));";	
	str+="}";
	str+="}";
	str+="};";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){";
		str+=parent+".add("+name+");";
		str+=parent+".add("+filename+");";
		str+=parent+".add("+name+"cmddown);";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+");";	
		str+="Ext.getCmp('"+parent+"').add("+filename+");";	
		str+="Ext.getCmp('"+parent+"').add("+name+"cmddown);";	
		str+="}";
	}	
	//console.info(str);
	return(str);	
};

function myDefineFileUpDownLoad(parent,name,filename,form,label,labelwidth,top,left,height,width){
	//生成文件上传及下载控件
	var str=myDefineFileUpLoad(parent,name,filename,form,label,labelwidth,top,left,height,width);
	//定义下载按钮
	str+="var "+name+"cmddown={xtype:'button',text:'下载',iconCls:'downloadIcon',xaction:'download',";
	if (labelwidth>0) str+="labelWidth:"+labelwidth+",";
	else str+="hideLabel:true,";
	str+="x:"+(left+58+12)+",y:"+top+"+rowHeight*2-2,width:58,height:24,";		
	str+="id:'"+name+"cmddown',name:'"+name+"cmddown',";
	str+="hidden:true,"; 
	str+="handler:function(){";
	str+="var xsourcefilename=Ext.getCmp('"+name+"').getValue();";
	str+="var xtargetfilename=Ext.getCmp('"+filename+"').getValue();";
	str+="if (xsourcefilename!='' && myGetFileSize(xsourcefilename)>=0){"
	str+="var url='system//fn_fileDownLoad.jsp?path='+xsourcefilename+'&name='+xtargetfilename;";
	str+="if (xsourcefilename!=''){";
	str+="window.location.href=url;";
	str+="}";
	str+="}else{";
	str+="if (xsourcefilename!='') eval(sysError('下列文件找不到，下载失败！<br>['+xtargetfilename+']',0,0));";	
	str+="else eval(sysError('没有下载文件，下载失败！<br>',0,0));";	
	str+="}";
	str+="}";
	str+="};";
	//增加filename的change事件，控制下载按钮。当附件文件为空时，下载按钮隐藏。
	str+="Ext.getCmp('"+name+"').addListener('change',function(){";
	//str+="if (Ext.getCmp('"+name+"').getValue()=='' || sys.downloadflag<=0)";
	str+="if (Ext.getCmp('"+name+"').getValue()=='')";
	str+="Ext.getCmp('"+name+"cmddown').setVisible(false);";
	str+="else Ext.getCmp('"+name+"cmddown').setVisible(true);";
	str+="});";
	if (parent!=''){
		str+="if (Ext.getClassName("+parent+")=='Ext.form.Panel'){";
		str+=parent+".add("+name+"cmddown);";
		str+="}else{"; 
		str+="Ext.getCmp('"+parent+"').add("+name+"cmddown);";	
		str+="}";
	}		
	//console.info(str);	
	return(str);	
};

function myGetFileSize(filename){
	var n=-1;
	Ext.require(['Ext.form.*','Ext.tree.*','Ext.panel.*','Ext.tab.*','Ext.data.*','Ext.grid.*','Ext.toolbar.*','Ext.menu.*','Ext.Viewport']);
	Ext.onReady(function(){
	Ext.Ajax.request({
		url:'system//fn_getFileSize.jsp',
		params:{ filename: filename },									
		method: 'POST',async:false,
	  		callback:function(options,success,response){
	  			var result=Ext.decode(response.responseText);	
	   			n=result.filesize;
	   		}
	   	});
   	});
   	return(n);
};

function myGetSQLFields(sql,xsysdatabasestring){
	//判断sql是否存在#sysdate等系统变量
	var fieldset='';
	if (sql!=undefined){
		sql=sql.replace('#sysdate',"'"+sysdate+"'");
		//console.log(sql);
		//alert(sql);
		Ext.Ajax.request({
			url:'system//fn_getSQLFields.jsp',
			params:{ database:xsysdatabasestring, sqlString:sql },
			method: 'POST',async:false,
	  		callback:function(options,success,response){
	  			var result=Ext.decode(response.responseText);	
		   		fieldset=result.fieldset;
		   	}
	  	});
  	}
   	return(fieldset);
};

function myGetTableEditableFields(xsysdatabasestring,tablename){  //获取一个表中可编辑的列名
	var fieldset='';
	Ext.Ajax.request({
		url:'system//fn_getEditableFields.jsp',  //获取可编辑列，计算列和identity除外
		params:{ database:xsysdatabasestring, tableName:tablename },									
			method: 'POST',async:false,
			callback:function(options,success,response){
        	fieldset=Ext.decode(response.responseText).fieldSet;  //获取字段名集合
        }	
	});	
   	return(fieldset);
};


function drawhline(from_x,to_x, y)
{
  for(var i=from_x;i<=to_x;i+=10) 
  {
    //设置div的背景
    var $divs = $("<div style='background-color: red;z-index: 2'></div>");
    //设置div的左侧位置
    $divs.css("left",i);
    //设置div的上方位置
    $divs.css("top",y);
    //设置div的高度
    $divs.css("height","5px");
    //设置div的宽度
    $divs.css("width","2px");
    //设置div的排板方式
    $divs.css("position","absolute");
    //把div追加到body上去
    $("body").append($divs);
  }
}

function drawvline(from_y,to_y, x)
{

  for(var i=from_y;i<=to_y;i+=10) 
  {
    var $divs = $("<div style='background-color: red;z-index: 2'></div>");
    $divs.css("left",x);
    $divs.css("top",i);
    $divs.css("height","2px");
    $divs.css("width","5px");
    $divs.css("position","absolute");
    $("body").append($divs);
  }
}


function myGetFromComboValue(field){  //从combo选项的名称中取编码的值
	var tmp=field.split('->');
	combofield=tmp[0];
	fieldset=tmp[1];
	var tmp=fieldset.split(';');
	//找到记录
	var str="var record="+combofield+".store.findRecord('"+combofield+"',Ext.getCmp('"+combofield+"').getValue());";
	str+="if (record){"
	for (var i=0;i<tmp.length;i++){
		str+="if (Ext.getCmp('"+tmp[i]+"').getValue()=='')";
		str+="Ext.getCmp('"+tmp[i]+"').setValue(record.get('"+tmp[i]+"'));";
	}
	str+="}";
	return(str);
}

function myTruncateGrid(grid){
	var str="for (var vj=0;vj<"+grid+".store.getTotalCount();vj++){";
	//str+="var record="+grid+".store.getAt(0);";
	//str+=grid+".store.remove(record);";
	str+=grid+".store.removeAt(0);";
	str+="}";
	return(str);
}
 
function myGenInsertSql(tablename,fieldset,fieldtext) {  //根据fieldset及其值求sql插入语句
	//根据fieldset字段集和fieldtext字符集，生成tablename表的insert语句
	var insertsql1='';
	var insertsql2='';
	var updatesql1='';
	var updatesql2='';
	var fielddim=fieldset.split(';');
	for (var i=0;i<fielddim.length;i++){
		var xfield=fielddim[i].substring(2,500);
		var xtype=fielddim[i].substring(0,1);
		var x1=fieldtext.indexOf(sys.ftab+xfield+sys.ftab+":");
		var x2=fieldtext.indexOf(":"+sys.ftab,x1+xfield.length+7);
		if (x1>=0&&x2>=x1) {
			if (!insertsql1=="") {
				insertsql1=insertsql1+",";
				insertsql2=insertsql2+",";
			}	
			var xvalue=fieldtext.substring(x1+xfield.length+7,x2-0);
			if ((isNaN(xvalue) || xvalue=='') && xtype=='n') xvalue='0';  //处理数值型数据
			if (xvalue=='' && (xtype=='d' || xtype=='t')) xvalue='null';
			insertsql1=insertsql1+xfield;
			if (xvalue=="null" || xvalue=="getdate()") {
				insertsql2=insertsql2+xvalue;
			}else{ 							
				insertsql2=insertsql2+"'"+xvalue+"'";
			}
		}	
	}
	var insertsql="insert into "+tablename+"("+insertsql1+")values("+insertsql2+")";
	//console.info(insertsql);
	return(insertsql);
}

function myGenUpdateSql(tablename,fieldset,fieldtext,keyfield,keyvalue) {
	//根据fieldset字段集和fieldtext字符集，生成tablename表中修改关键字值为keyvalue的update语句
	var updatesql1='';
	var fielddim=fieldset.split(';');
	for (var i=0;i<fielddim.length;i++){
		var xfield=fielddim[i].substring(2,500);
		var xtype=fielddim[i].substring(0,1);
		var x1=fieldtext.indexOf(sys.ftab+xfield+sys.ftab+":");
		var x2=fieldtext.indexOf(":"+sys.ftab,x1+xfield.length+7);
		if (x1>=0&&x2>=x1) {
			if (updatesql1!="") {
				updatesql1=updatesql1+",";							
			}	
			var xvalue=fieldtext.substring(x1+xfield.length+7,x2-0);
			if ((isNaN(xvalue) || xvalue=='') && xtype=='n') xvalue='0';  //处理数值型数据
			if (xvalue=='' && (xtype=='d' || xtype=='t')) xvalue='null';
			if (xvalue=="null" || xvalue=="getdate()") {
				updatesql1=updatesql1+xfield+"="+xvalue;
			}else{ 							
				updatesql1=updatesql1+xfield+"='"+xvalue+"'";
			}
		}	
	}
	var updatesql="update "+tablename+" set "+updatesql1+" where "+keyfield+"='"+keyvalue+"'";
	//console.info(updatesql);
	return(updatesql);
}  

function myGenVerificationSql(tablename,keyfield,keyvalue){
	var str="select "+keyfield+"=count(*) from "+tablename+" where "+keyfield+"='"+keyvalue+"'";
	return(str);
}

function mySumUpFields(table,keyfield,fields){
	var str1='';
	var str2='';
	var str3='';
	var str=''
	var tmp=fields.split(";");
	for (var i=0;i<tmp.length;i++){
		if (str1!='') str1+=",";
		str1+=tmp[i]+"=0";
		if (str2!='') str2+=",";
		str2+=tmp[i]+"=(select sum("+tmp[i]+") from "+table+" as a ";
		str2+="	where ancester like rtrim("+table+".ancester)+rtrim("+table+"."+keyfield+")+'#%'";
		str2+=" and IsParentFlag=0)";
		str3+=" update "+table+" set "+tmp[i]+"=0 where "+tmp[i]+" is null and isparentflag=0";
	}
	str='update '+table+' set '+str1+' where IsParentFlag=1 ';
	str+="update "+table+" set "+str2+" where IsParentFlag=1";
	str+=" "+str3;
	//console.info(str);
	return(str);
}

function myGetGridColWidth(mygrid){
	var result='';
	var tmp=mygrid.columnfield.split(';');
   	var tmp1=mygrid.columntitle.split(';');
   	var tmp2=mygrid.columnwidth.split(';');
	Ext.Ajax.request({
		url:'system//fn_getGridWidth.jsp',
		params:{ database:sysdatabasestring, sqlString:mygrid.sql,fieldSet:mygrid.columnfield },									
    	method: 'POST',async:false,
		callback:function(options,success,response){
			var gridwidth=Ext.decode(response.responseText).gridwidth;
			var width=gridwidth.split(';');
			for (var i=0;i<tmp.length && i<width.length;i++){
	    		width[i]=width[i]*sys.gridcellpix+8;
	    		var chr1='';
	    		var chr2=0;
		    	if (isNaN(tmp2[i])) {
		    		var chr1=tmp2[i].substring(0,1);
					if (chr1=='<' || chr1=='>') chr2=parseInt(tmp2[i].substring(1));
 					else chr2=parseInt(tmp2[i]);
 				}else{
  					chr2=parseInt(tmp2[i]);
  				}	
  				if (chr2==0) tmp2[i]=width[i]+4;  //如果没有定义长度，就按计算得到的赋值
  				else if (width[i]>0) {
   					if (chr1=='<') tmp2[i]=Math.min(width[i]+4,chr2);
   					else if (chr1=='>') tmp2[i]=Math.max(width[i]+4,chr2);
   				}
   				//按标题的汉字计算列宽度
				tmp2[i]=Math.max(tmp2[i],myStrLength(tmp1[i])*sys.gridcellpix+12);
   				if (result!='') result+=";";
   				result+=tmp2[i];
    		}
   		}
	});	
	return(mygrid.varname+".columnwidth='"+result+"';");
}	
 
function myGetColWidthx(tablename,sqlstring,fieldset){
	var str='';
	var tmp=fieldset.split(';');
	Ext.Ajax.request({
		url:'system//fn_getGridWidth.jsp',
		params:{ tableName:tablename,sqlString:sqlstring,fieldSet:fieldset },									
	    method: 'POST',async:false,
		callback:function(options,success,response){
			for (var i=0;i<tmp.length;i++){
				var w=eval("Ext.decode(response.responseText).sys_"+tmp[i]);
				if (w==undefined || w=='') w='0';
				str+="pmyWidth."+tmp[i]+"="+w+";";
			}	
		}	
	});
	return(str);	
}

function myGetColWidthFromTable(sysdatabasestring,fieldset){
	var fields='';
	var sql='';
	var tmp=fieldset.split(';');
	for (var i=0;i<tmp.length;i++){
		var tmp1=tmp[i].split(':'); //取第一个
		var table=tmp1[0];  //取表名
		var tmp2=tmp1[1].split(',');  //取字段
		for (var j=0;j<tmp2.length;j++){
			if (sql!='') sql+=sys.tab;
			//不能使用nvarchar和len函数.
			sql+=" select max(datalength(cast(rtrim("+tmp2[j]+") as varchar(500)))) as sys_"+tmp2[j]+" from "+table;
			if (fields!='') fields+=';';
			fields+=tmp2[j];  //记录所有字段，分号隔开
		}
	}
	str='';
	Ext.Ajax.request({
		url:'system//fn_executeSql.jsp',
		params:{ database:sysdatabasestring, updateSql:'', selectSql:sql },									
	    method: 'POST',async:false,
		callback:function(options,success,response){
			var tmp=fields.split(';');
			for (var i=0;i<tmp.length;i++){
				var w=eval("Ext.decode(response.responseText).sys_"+tmp[i]);
				if (w==undefined || w=='') w='0';
				str+=" pmyWidth."+tmp[i]+"="+w+";";
			}	
		}	
	});
	return(str);	
}

function myGetColWidthFromSql(sysdatabasestring,sql,fields){
	str='';
	var tmp=fields.split(';');
	Ext.Ajax.request({
		url:'system//fn_executeSql.jsp',
		params:{ database:sysdatabasestring, updateSql:'', selectSql:sql },									
	    method: 'POST',async:false,
		callback:function(options,success,response){
			for (var i=0;i<tmp.length;i++){
				var w=eval("Ext.decode(response.responseText)."+tmp[i]);
				if (w==undefined || w=='') w='0';
				str+=" pmyWidth."+tmp[i]+"="+w+";";
			}
		}	
	});
	return(str);	
}

function myGetGridWidth(mygrid){
	var i=0;
	var w=24+2;
	while (mygrid.columns[i]!=undefined){
		w+=mygrid.columns[i].width+0;
		i++;
	}
	return(w);
}

function myAdjustGridWidth(mygrid,width){
	return('');
}

function mySetGridWidth(mygrid,xwidth){  //获取一个grid所有列宽度之和
	var str="";
	str+="var i=0;";
	str+="var w=28;";
	str+="while ("+mygrid+".columns[i]!=undefined){";
	str+="w+="+mygrid+".columns[i].width+0;";
	str+="i++;";
	str+="}";	
	if (xwidth>0){
		str+=" w=Math.min(w,"+xwidth+");";
	}	
	str+=mygrid+".setWidth(w);";
	return(str);
}

function mySetRecordMoveBtn(mygrid,record){
	//控制toolbar中记录移动按钮rownext等按钮是否disabled
	//pProductInventory.jsp，pcustomeredit.jsp为原始程序
	var str="";	
	str+="Ext.getCmp('rowfirst').setDisabled(true);";
	str+="Ext.getCmp('rowprev').setDisabled(true);";
	str+="Ext.getCmp('rowlast').setDisabled(true);";
	str+="Ext.getCmp('rownext').setDisabled(true);";
	str+="if ("+record+"){";			
	str+="	if ("+record+".get('sysrowno')>1){";
	str+="		Ext.getCmp('rowfirst').setDisabled(false);";
	str+="		Ext.getCmp('rowprev').setDisabled(false);";
	str+="	}\n";
	str+="	if("+record+".get('sysrowno')<"+mygrid+".store.getTotalCount()){";
	str+="		Ext.getCmp('rowlast').setDisabled(false);";
	str+="		Ext.getCmp('rownext').setDisabled(false);";			
	str+="	}\n";
	str+="}";
	return (str);
}

function myGenBtnMoveRecord(){  //mmmmove
	//控制点击toolbar中rownext等按钮后记录移动情况
	//customeredit.jsp/pcollectionedit.jsp
	//pProductInventory.jsp，porderedit.jsp为原始程序
	var str="function myMoveRecord(id,pmygrid){\n";
	str+="var mygrid=eval(pmygrid.name);\n";
	str+="pmygrid.locatevalue='';\n";
	str+="if (mygrid.store.getCount()>0){\n";
	str+="var editable=false;\n";
	str+="if (pmygrid.style=='editable') editable=true;\n";
	str+="if (!editable){\n";  //非编辑情况下，计算当前行号，放在pmyGrid1.index中
	str+="var records=mygrid.getSelectionModel().getSelection();\n";
	str+="if(records[0]){\n";
	str+="pmygrid.index=mygrid.store.indexOf(records[0]);\n";
	str+="}else{\n";
	str+="pmygrid.index=-1;\n";
	str+="}\n";			
	str+="}\n";
	str+="var loadflag=0;\n";		
	str+="id=id.toLowerCase();\n";
	str+="var pageno=mygrid.store.currentPage;\n";
	str+="if (mygrid.store.pageSize==0) var pagecount=1;\n"; 
	str+="else var pagecount=Math.floor((mygrid.store.getTotalCount()-1)/mygrid.store.pageSize)+1;\n";
	str+="var rowcount=mygrid.store.getTotalCount();\n";		
	str+="if (id=='rowfirst') {\n";
	str+="if (pageno>1) {\n";
	str+="loadflag=1;\n";
	str+="mygrid.store.loadPage(1);\n";
	str+="}\n";
	str+="pmygrid.index=0;\n";
	str+="}else if (id=='rowlast') {\n";
	str+="var rowno=rowcount;\n";
	str+="if (mygrid.store.pageSize<=0){\n";
	str+="var n=1;\n";
	str+="mygrid.index=rowno;\n";
	str+="}else{\n";
	str+="var n=Math.floor((rowno-1)/mygrid.store.pageSize)+1;\n";
	str+="pmygrid.index=rowno-mygrid.store.pageSize*(n-1)-1;\n";
	str+="}\n";
	str+="if (pageno!=n) {\n";
	str+="loadflag=1;\n";				
	str+="mygrid.store.loadPage(n);\n";
	str+="}\n";
	str+="}else if (id=='rownext') {\n";
	str+="if (pmygrid.index>=0){\n";
	str+="var rowno=pmygrid.index+1;\n";
	str+="if (rowno>=mygrid.store.getCount() && pageno<pagecount) {\n";
	str+="pmygrid.index=0;\n";
	str+="rowno=0;\n";
	str+="loadflag=1;\n";
	str+="mygrid.store.loadPage(pageno+1);\n";
	str+="}	\n";
	str+="}else{\n";
	str+="rowno=0;\n";
	str+="}\n";
	str+="pmygrid.index=rowno;\n";
	str+="}else if (id=='rowprev') {\n";
	str+="if (pmygrid.index>=0){\n";
	str+="var rowno=pmygrid.index-1;\n";
	str+="}else{\n";
	str+="rowno=0;\n";
	str+="}\n";	
	str+="if (rowno<0 && pageno>1) {\n";
	str+="pmygrid.index=mygrid.store.pageSize-1;\n";
	str+="loadflag=1;\n";					
	str+="mygrid.store.loadPage(pageno-1);\n";
	str+="}\n";
	str+="if (rowno>=0) pmygrid.index=rowno;\n";			
	str+="}	\n";
	str+="if (editable){\n"
	str+="if (loadflag==0 && mygrid.store.getCount()>0 && pmygrid.index<mygrid.store.getCount()){\n";		
	str+="setTimeout(function(){\n";
	//str+="mygrid.plugins[0].startEditByPosition({row:pmygrid.index, column:pmygrid.column});\n";
	str+="pmygrid.cellediting.startEdit(pmygrid.index,pmygrid.column);\n";  //ext4.2方法		
	str+="},0);\n";
	str+="}\n";
	str+="}else{\n";
	str+="if (loadflag==0 && mygrid.store.getCount()>0 && pmygrid.index<mygrid.store.getCount()){\n";		
	str+="setTimeout(function(){\n";
	str+="mygrid.getSelectionModel().select(pmygrid.index);\n";
	str+="},0);\n";
	str+="}\n";	
	str+="}\n";	
	str+="}\n";
	str+="}\n";	
	//console.info(str);
	str+="function mySetMoveRecordBtn(mygrid,record){\n";
	str+="Ext.getCmp('rowfirst').setDisabled(true);";
	str+="Ext.getCmp('rowprev').setDisabled(true);";
	str+="Ext.getCmp('rowlast').setDisabled(true);";
	str+="Ext.getCmp('rownext').setDisabled(true);";
	str+="if (record){";			
	str+="	if (record.get('sysrowno')>1){";
	str+="		Ext.getCmp('rowfirst').setDisabled(false);";
	str+="		Ext.getCmp('rowprev').setDisabled(false);";
	str+="	}\n";
	str+="	if(record.get('sysrowno')<mygrid.store.getTotalCount()){";
	str+="		Ext.getCmp('rowlast').setDisabled(false);";
	str+="		Ext.getCmp('rownext').setDisabled(false);";			
	str+="	}\n";
	str+="}\n";
	str+="}\n";	
	return str
}

function myGetUserRight(account){
	//获取用户权限
	var sql="select '#'+RTRIM(a.menuid)+'#'+b.ancester+'@'+rightflag";
	//for (var i=0;i<sys.menubutton.length;i++){
	//	sql+="+cast("+sys.menubutton[i]+" as char(1))";
	//}
	sql+=" from sys_userright a ";
	sql+=" join sys_menu b on a.menuid=b.menuid ";
	sql+=" where account='"+account+"'";
	var str='';		
	Ext.Ajax.request({
		url:'system//fn_getOneStringData.jsp',
		params:{ database:sysdatabasestring, sqlString:sql },									
	    method: 'POST',async:false,
		callback:function(options,success,response){
			str=response.responseText.trim();
		}
	});
	return str
}
	
function myGetMenuRight(xuserright,xmenuurl){
	//求某个用户在其所有权限中查找某个菜单各个按钮的权限
	xmenuurl=xmenuurl.substring(1).toLowerCase();
	var index1=xuserright.indexOf('#'+xmenuurl+'#');
	var index2=xuserright.indexOf('@',index1+2);
	var index3=xuserright.indexOf('@',index2+2);
	if (index1>=0 && index2>index1 && index3>index2) {
		xurlright=xuserright.substring(index2+1,index3);
	}else{
		xurlright='';
	}
	var str='';
	for (var i=0;i<sys.menubutton.length;i++){
		if (xurlright=='') str+="sys."+sys.menubutton[i]+"=0;";
		else str+="sys."+sys.menubutton[i]+"="+xurlright.substring(i+1,i+2)+";";
	}	   
	if (xurlright=='') str+="sys.saveflag=0;";
	else str+="sys.saveflag="+xurlright.substring(0,1)+";";;
	return(str);
};

function myExportExcelReport(xsysdatabasestring,xtemplate,xsql,xtitlecells,xtitlerange,xfootercells,xregionrange,xtargetfilename){
	//?问号方式传递无法向后台传递带%的字符
	xtitlecells=xtitlecells.replace(eval("/"+"%"+"/g"),"％");
	xfootercells=xfootercells.replace(eval("/"+"%"+"/g"),"％");
	var filename="";
	Ext.Ajax.request({
		url:'system//fn_writeExcelTemplate.jsp?titleCells='+xtitlecells+'&footerCells='+xfootercells,
		params:{ database:xsysdatabasestring, template:xtemplate, sqlString:xsql, titleRange:xtitlerange, regionRange:xregionrange },									
		method: 'POST',async:false,
   		callback:function(options,success,response){
    		var s=response.responseText;
    		var index1=s.indexOf("filename:");
    		var index2=s.indexOf('"',index1+10);
    		filename=s.substring(index1+10,index2);
		}	
	});
	var xsourcefilename=filename;
	var url='system//fn_fileDownLoad.jsp?path='+xsourcefilename+'&name='+xtargetfilename;
	window.location.href=url;
	return(url);
}

function myGetFilePath(obj){
	var str=myCheckBrowser();
	if(obj){    
	    if (window.navigator.userAgent.indexOf("MSIE")>=1){    
			obj.select();
			return document.selection.createRange().text;    
      	}else if(window.navigator.userAgent.indexOf("Firefox")>=1){    
			if(obj.files){    
				return obj.files.item(0).getAsDataURL();    
			}    
			return obj.value;    
		}    
    	return obj.value;    
    }    
}

function myGetChartXMLHeader(title,xAxisName,yAxisName){
	//返回fusionchart图表文件的xml文件头
	var str="<chart caption=\""+title+"\" XAxisName=\""+xAxisName+"\" YAxisName=\""+yAxisName+"\"";
	str+=" numberPrefix=\"\" showValues=\"0\" formatNumberScale=\"0\" showAboutMenuItem=\"0\"";
	str+=" seriesNameInToolTip=\"1\" chartTopMargin=\"10\" chartBottomMargin=\"10\" chartLeftMargin=\"10\" chartRightMargin=\"30\"";
	str+=" baseFont=\"宋体\" baseFontSize=\"10\"";
	str+=" exportEnabled=\"1\" exportDialogMessage=\"正在导出,请稍候...\" exportFormats=\"JPEG=导出为JPG图片|PNG=导出为PNG图片|PDF=导出为PDF文件\"";
	str+=" exportDataMenuItemLabel=\"导出图片\" showExportDataMenuItem=\"1\" exportAtClient=\"1\"";
	str+=" useRoundEdges=\"1\" animation=\"0\" palette=\"2\"  >\n";
	return(str)
};	

function myGetChartXMLFooter(){
	//返回fusionchart图表文件的xml文件尾部
	var str=" <styles>\n";
	str+=" <definition>\n";
	str+=" <style type=\"font\" color=\"666666\" name=\"CaptionFont\" font=\"黑体\" size=\"16\" />\n";
	str+=" <style type=\"font\" name=\"SubCaptionFont\" font=\"宋体\" size=\"12\" bold=\"0\" />\n";
	str+=" </definition>\n";
	str+=" <application>\n";
	str+=" <apply toObject=\"caption\" styles=\"CaptionFont\" />\n";
	str+=" <apply toObject=\"SubCaption\" styles=\"SubCaptionFont\" />\n";
	str+=" </application>\n";
	str+=" </styles>\n";
	str+=" </chart>\n";
	return(str);
};
	
function myGenChartXML(xlabel,yvalue,xtitle,xtype,xstyle){
	var xcolor='';
	var xlabeldim=xlabel.split(";");  
	var yvaluedim=yvalue.split("@");
	var xcolordim=xcolor.split(";");  
	var xtitledim=xtitle.split(";");
	//xtype=1单维度  2-多维度  
	//开始取记录    
	var result="";
	if (xtype==2){
		result+=" <categories>\n";
		for (var i=0;i<xlabeldim.length;i++){
		    result+=" <category label=\""+xlabeldim[i]+"\"/>\n";
		}
		result+=" </categories>\n";
		//生成数据
		for (var i=0;i<yvaluedim.length;i++){
			if (xcolor!='' && xcolordim.length>i && !xcolordim[i].equals("")){
				result+="<dataset seriesName=\""+xtitledim[i]+"\" Dashed=\"0\" color=\""+xcolordim[i]+"\"";
 			}else{
				result+="<dataset seriesName=\""+xtitledim[i]+"\" Dashed=\"0\" color=\"\" ";
 			}
 			if (i==yvaluedim.length-1 && i>0 ){  //最后一个加这个属性
 				result+=" parentYAxis=\"S\"";
 			}
 			result+=" >\n";
			var ylabeldim=yvaluedim[i].split(";");
			for (var j=0;j<ylabeldim.length;j++){
				result+="<set value=\""+ylabeldim[j]+"\" />\n";			
			}
 			result+="</dataset>\n";
 		}
 	}else if (xtype==1){
 		var ylabeldim=yvaluedim[0].split(";");
		for (var i=0;i<xlabeldim.length;i++){
		    result+="<set label=\""+xlabeldim[i]+"\" value=\""+ylabeldim[i]+"\" ";
		    if (xstyle=='sliced'){
				result+=" issliced=\"1\" "; 		    
		    }
		    result+=" />\n";
		}
 	}
	//console.log(result);
 	return(result);	
}


function myGetGridColumn(pmyGrid){
	pmyGrid.xtitle=[];  //标题
    pmyGrid.xfield=[];  //字段名
    pmyGrid.xalign=[];  //对齐
    pmyGrid.xwidth=[];   //列宽度
    pmyGrid.xtype=[];   //数据类型
    pmyGrid.xlength=[];  //输入长度
    pmyGrid.xdec=[];    //小数位数
    pmyGrid.ytitle=[];  //多重标题中的第二层
    pmyGrid.xshowtitle=[];  //多重标题中的第二层
    pmyGrid.xstorefieldset=[];  //combo等store对应的fields集合
    pmyGrid.xstoreitemset=[];  //combo等store对应的fields集合
    pmyGrid.xstoresqlset=[];  //combo等store对应的fields集合
    pmyGrid.fieldset='';  //增加hidden字段
    pmyGrid.hiddenfieldset='';  //增加hidden字段
    pmyGrid.columncount=0;  //有标题列的个数
    var str='';
    if (pmyGrid.fields!=undefined && pmyGrid.fields!=''){
	    var tmp=pmyGrid.fields.split(';');
		for (var i=0;i<tmp.length;i++){
			var s1='';  //字段
			var s2='';  //列标题
			var s3='';  //对齐,默认为l-left
			var s4='0';  //列显示宽度,默认为70
			var s5='*';   //字段输入类型 s,n,c,d,r。*--非编辑状态
			var s6='';  //字段输入长度，默认为10
			var s7='0';   //字段小数位数，默认为0
			var s8='';    //第二层标题
			var s9='';    //combo之类的fieldset
			var s10='';   //combo之类的items
			var s11='';   //combo之类的sql
			var x1=tmp[i].indexOf('/');
			if (x1>=0){
				s1=tmp[i].substr(0,x1);  
				s2=tmp[i].substr(x1+1);
				pmyGrid.xshowtitle[i]=true;
			}else{
				s1=tmp[i];  
				s2='';
				if (pmyGrid.hiddenfieldset!='') pmyGrid.hiddenfieldset+=';';
	    		pmyGrid.hiddenfieldset+=s1;
				pmyGrid.xshowtitle[i]=false;
			}	
				//取对其方式
				if (s1.indexOf('[@c]')>=0) s3='c';
				else if (s1.indexOf('[@r]')>=0) s3='r';
				else if (s1.indexOf('[@l]')>=0) s3='l';
				else s3='';
				s1=s1.replace('[@c]','');
				s1=s1.replace('[@r]','');
				s1=s1.replace('[@l]','');
				//取字段类型、长度和小数位数
				var x2=s1.indexOf('[#');
				var x3=s1.indexOf(']',x2);
				if (x2>=0 && x3>x2){
					s5=s1.substr(x2+2,1); //type
					var fidlength=s1.substr(x2+3,x3-x2-3).split(','); //length+decimal
					if (fidlength.length>0) s6=fidlength[0];
					if (fidlength.length>1) s7=fidlength[1];
					if (isNaN(s7)) s7='0';
					s1=s1.substring(0,x2-1)+s1.substring(x3+1);  //去掉字符串
				}
				//取列宽度，可以省略
				var x3=s1.indexOf('[');
				var x4=s1.indexOf(']');
				if (x4>x3 && x3>=0){
					s4=s1.substr(x3+1,x4-x3-1);
					s1=s1.substr(x4+1);
				}
				if (s3=='c') s3='center';
				else if (s3=='r') s3='right';
				else if (s3=='l') s3='left';
				else {
					if (s5=='n' || s5=='nf') s3='right';
					else if (s5=='d' || s5=='df') s3='center';
					else if (s1=='sysrowno') s3='right';
					else s3='left';
				}
				s1=s1.toLowerCase();
				s5=s5.toLowerCase();
			    //多重标题处理开始
			    if (s2!='' && s2.indexOf('|')>=0){  //二重标题以|分隔
			    	s8=s2.substring(s2.indexOf('|')+1);	
			    	s2=s2.substring(0,s2.indexOf('|'));
			    }else{
			    	s8='';  //没有二层标题
			    }
			    //计算列宽度
			    if ((s5=='d' || s5=='df') && (s6=='')) s6='10'; //日期型变量
			    //console.log('s1---'+s1);
			    var w=0;
			    if (s1!=''){
			        var fiddim=s1.split('+');
			        //var fiddim=s1.split('->');
			    	//if (fiddim.length>1) eval("var w=pmyWidth."+fiddim[0]+";");  //数据表中的列长度
			    	//else eval("var w=pmyWidth."+s1+";");  //数据表中的列长度
			    }
	    		//console.log(s1+'---'+s4+'---'+s6);
		    	if (!isNaN(s6) && (isNaN(s4) || s4==0 )){
		    		s4=s6*sys.gridcellpix+12;
		    	}
				if (isNaN(s4)){  //[>70] or [<70]情况
		    		var c1=s4.substring(0,1);
		   			var c2=s4.substring(1);
		    		if (isNaN(c2) || c2=='') var c2=0;
		    		else var c2=parseInt(c2);
			    	if (w!=undefined && w>=0){
			    		w=w*sys.gridcellpix+12;  //
		    			if (c2<=0) s4=w;
		    			else if (c1=='>') s4=Math.max(w,c2);
				    	else if (c1=='<') s4=Math.min(w,c2);
				    }else s4=c2;
		    	}else{
			    	 s4=parseInt(s4);
		    		 if (w!=undefined && w>=0 && s4<=0){
		    			s4=w*sys.gridcellpix+12; //如果宽度为0，则按计算值赋值给该列
		    		}
		    	}
		    	if (isNaN(s6) && (isNaN(s4) || s4==0)) s4='70';
		    	//列宽度至少要大于列宽度+12个像素.myStrLength计算包含汉字的长度
		    	if (s8=='' && s2!=''){
			    	s4=Math.max(s4,myStrLength(s2)*sys.gridcellpix+12);
			    }else{
			    	s4=Math.max(s4,myStrLength(s8)*sys.gridcellpix+12);
			    }
		    	//console.log(s2+'---s6---'+s6+'---s4--'+s4);
			    if (!isNaN(s6) && s6!=''){  //根据字段输入长度调整列宽度
			    	//s4=Math.max(s4,s6*sys.gridcellpix+12);  
			    }
			    if (s2!='') pmyGrid.columncount++;
	
			if (s5=='n' || s5=='nf') pmyGrid.xtype[i]='decimalfield';
			else if (s5=='d' || s5=='df') pmyGrid.xtype[i]='datefield';
		    else if (s5=='c' || s5=='cf') pmyGrid.xtype[i]='combo';
		    else if (s5=='k' || s5=='kf') pmyGrid.xtype[i]='checkbox';
		    else if (s5=='a' || s5=='af') pmyGrid.xtype[i]='linkfield';
		    else if (s5=='g' || s5=='t') pmyGrid.xtype[i]='editbutton';
		    else if (s5!='*' && s5!=='')  pmyGrid.xtype[i]='textfield';
		    else pmyGrid.xtype[i]='*';  //非编辑状态
		    //处理combobox
	  		if (pmyGrid.xtype[i]=='combo' && pmyGrid.style=='editable'){
	  			//对应的事件统一为fnSelectColumnCombo，与列名无关，在id中判断列名
				var fiddim=s1.split('+');
				//var fiddim=s1.split('->');
				s1=fiddim[0];
				//定义combo列的数据集
	    		s9=s1;
				for (var j=1;j<fiddim.length;j++){
					s9+=";"+fiddim[j];			
				}
				eval("var s12=pmyGrid."+s1+"_valuefields");
				if (s12!=undefined && s12!=''){
					if (s9!='') s9+=';'
					s9+=";"+s12			
				}
				eval("var xsql=pmyGrid."+s1+"_sql");
				eval("var xitems=pmyGrid."+s1+"_items");
		    	if (pmyGrid.name!=undefined && pmyGrid.name.substring(0,10)=='myItemGrid'){
				  // console.log(s1+'---'+s2+'---'+s3+'---'+s4+'---'+s5+'---'+s6+'--s12='+s12);
		    	}
				if (xitems!=undefined && xitems!=''){ //静态combo
					s10=xitems;
					s11='';
				}else if (xsql!=undefined && xsql!=''){
		   			s11=xsql;
		   			s10='';
				}  		
	  		}
	  		//if (s1=='sysrowno') pmyGrid.xtype[i]='decimalfield';
		    pmyGrid.xfield[i]=s1;	    
		    pmyGrid.xtitle[i]=s2;	   
		    pmyGrid.xalign[i]=s3;	    
		    pmyGrid.xwidth[i]=1.0*s4;	    
		    pmyGrid.xlength[i]=1.0*s6;	    
		    pmyGrid.xdec[i]=1.0*s7;	    
		    pmyGrid.ytitle[i]=s8;
		    pmyGrid.xstorefieldset[i]=s9;  //combo等store对应的fields集合
		    pmyGrid.xstoreitemset[i]=s10;  //combo等store对应的items集合
	    	pmyGrid.xstoresqlset[i]=s11;  //combo等store对应的sql集合
	    	if (pmyGrid.fieldset!='') pmyGrid.fieldset+=';';
	    	pmyGrid.fieldset+=s1;
		    //console.log(s1+'--s5--'+s5);
		}
		if (pmyGrid.lockedfields==undefined) pmyGrid.lockedfields='';
		else pmyGrid.lockedfields=';'+pmyGrid.lockedfields+';';
	}	
	return pmyGrid;  
}

	

function myGridColumnKeyEvent(pmyGrid,field,key){ //可编辑grid键盘处理
	//columns[i].editor第一次输入时对的，后面就会变成null？why
	var grid=Ext.getCmp(pmyGrid.name);
	var cellediting=pmyGrid.cellediting;
	var maxcolno=grid.columns.length-pmyGrid.lockedcolumncount;
	var xerror=pmyGrid.error;
	//console.log('key--'+xerror+'---'+pmyGrid.index+'---'+pmyGrid.column);
	//pmyGrid.xrow=pmyGrid.index;
	//pmyGrid.xcol=pmyGrid.column;
	//if (pmyGrid.index>=0 && xerror!=undefined && xerror==0){
	if (pmyGrid.index>=0){
		var record = grid.store.getAt(pmyGrid.index);
		var xid=(field.getValue()+'').myTrim();
		if (key==37){
		}
		if (key==13){ 
	 		var i=pmyGrid.column+1; //找到下一个非只读列
		  	while (i<maxcolno){
		  		if (grid.columns[i+pmyGrid.lockedcolumncount].editable) break;
		  		i++;
		  	}
      		if (i<maxcolno){
				pmyGrid.column=i;
				cellediting.startEdit(pmyGrid.index, pmyGrid.column);  //ext4.2方法
	      	}else if (i>=maxcolno){  //换行，先利用到下一行，再找可编辑列
				if (pmyGrid.index<grid.store.getCount()-1){
					pmyGrid.column=0;
					pmyGrid.index=pmyGrid.index+1;
					cellediting.startEdit(pmyGrid.index, pmyGrid.column);  //ext4.2方法
	    	  		for (var j=0;j<maxcolno;j++){
				  		if (grid.columns[j+pmyGrid.lockedcolumncount].editable){
							break;
						}	
					}
					if (pmyGrid.column!=j){
						pmyGrid.column=j;
						cellediting.startEdit(pmyGrid.index, pmyGrid.column);  //ext4.2方法
					}
				}
				//console.log(grid.columns[j].editor);
			}
			//grid.plugins[0].startEditByPosition({row:pmyGrid.index, column:pmyGrid.column});
			cellediting.startEdit(pmyGrid.index, pmyGrid.column);  //ext4.2方法
		}else if (key==40){  //down
	       	var n=pmyGrid.index;
			if (n<grid.store.getCount()-1){
        		n++;
	        	pmyGrid.index=n;
				cellediting.startEdit(n, pmyGrid.column);  //ext4.2方法								
	        }	        	
		}else if (key==38){  //up
			var n=pmyGrid.index;
        	if (n>0){
        		n--;
	    	   	pmyGrid.index=n;
				cellediting.startEdit(n, pmyGrid.column);  //ext4.2方法								
   		    }		        	
		}	
	}
	//return (pmyGrid);
}
		

function myGetGridNodeTextFields(pmyGrid){
	var pfids={};
   	var nodetextfields='';
   	var nodetextfieldset='';
   	pfids.fields='';
   	var flag=0;
    if (pmyGrid.fields!=undefined && pmyGrid.fields!='') pfids.fields=pmyGrid.fields;
    else if (pmyGrid.nodefields!=undefined && pmyGrid.nodefields!='') pfids.fields=pmyGrid.nodefields;
    pfids=myGetGridColumn(pfids);
   	for (j=0;j<pfids.xfield.length;j++){
   		if (pfids.xfield[j]==pmyGrid.keyfield) flag=1;
    	if (nodetextfields!='') nodetextfields+=",";
    	if (nodetextfieldset!='') nodetextfieldset+=";";
   		nodetextfields+="cast("+pfids.xfield[j]+" as varchar(255)) as "+pfids.xfield[j];
   		nodetextfieldset+=pfids.xfield[j];
   	}
   	if (flag==0){  //如果datafields中不存在keyfield，则将keyfield加进去
   		if (nodetextfields!='') nodetextfields+=',';
    	if (nodetextfieldset!='') nodetextfieldset+=";";
   		nodetextfields+="cast("+pmyGrid.keyfield+" as varchar(255)) as "+pmyGrid.keyfield
		nodetextfieldset+=pmyGrid.keyfield;
   	}
   	pmyGrid.nodetextfields=nodetextfields;
   	pmyGrid.nodetextfieldset=nodetextfieldset;
   	return (pmyGrid);
}

function myGetTreeNodeTextFields(pmyTree){
	var pfids={};
	pfids.fields='';
   	var nodetextfields='';
   	var nodetextfieldset='',nodetextexpression='';
   	var flag=0;
	if (pmyTree.fields!=undefined && pmyTree.fields!='') pfids.fields=pmyTree.fields;
	else if (pmyTree.nodefields!=undefined && pmyTree.nodefields!='') pfids.fields=pmyTree.nodefields;
    pfids=myGetGridColumn(pfids);
   	for (j=0;j<pfids.xfield.length;j++){
		if (nodetextfields!='') nodetextfields+="+' '+";
    	if (nodetextfieldset!='') nodetextfieldset+=";";
    	if (nodetextexpression!='') nodetextexpression+="+' '+";
   		if (pfids.xfield[j]==pmyTree.keyfield) flag=1;
   		nodetextfields+="cast("+pfids.xfield[j]+" as varchar(255))"; 
   		nodetextfieldset+=pfids.xfield[j];
   		nodetextexpression+=pfids.xfield[j];
   	}
   	if (flag==0){  //如果datafields中不存在keyfield，则将keyfield加进去
    	if (nodetextfieldset!='') nodetextfieldset+=";";
		nodetextfieldset+=pmyTree.keyfield;
   	}
   	pmyTree.nodetextfields=nodetextfields;
   	pmyTree.nodetextfieldset=nodetextfieldset;
   	pmyTree.nodetextexpression=nodetextexpression;  //更新节点不刷新整个树时使用该值
   	return (pmyTree);
}

function myDefineGrid(pmyGrid) {  //ggggggcombo列没有处理
 	pmyGrid=myGetGridColumn(pmyGrid);  //解析列标题等信息
 	if (pmyGrid.sql!=''){
	 	var s=myGetSQLFields(pmyGrid.sql,pmyGrid.sysdatabasestring);
 	 	pmyGrid.fieldset=s;
 	 	//console.log(pmyGrid.sql+'----'+s);
 	 	//pmyGrid.fieldset+=';';
 	}
	pmyGrid=myGetGridNodeTextFields(pmyGrid);
	if (pmyGrid.fieldset!='') pmyGrid.fieldset+=";"
	pmyGrid.fieldset+=pmyGrid.nodetextfieldset.fieldset;
	if (pmyGrid.fieldset!='') pmyGrid.fieldset+=";"
 	pmyGrid.fieldset+='sys_keyvalues';  //记录本页关键字的值,放在第一行
	pmyGrid.createstr='';
	pmyGrid.replacecolumns='';
	pmyGrid.replacestr='';
	pmyGrid.eventstr=''
	pmyGrid.summaryfieldsql='';
	pmyGrid.sys_keyvalues='';
	pmyGrid.summaryfieldset='';
	pmyGrid.summary={};  //放sum计算的值，如pmyGrid.summary.amount=100
	var s=pmyGrid.sumfields+";"+pmyGrid.avgfields+";"+pmyGrid.countfields+";"+pmyGrid.maxfields+";"+pmyGrid.minfields;
	var flag=0;
	for (var i=0;i<pmyGrid.xfield.length;i++){
		if ((';'+s+';').indexOf(';'+pmyGrid.xfield[i]+';')>=0){
			pmyGrid.fieldset+=';sum_'+pmyGrid.xfield[i];
			flag=1;	
		}
	}
	if (flag==1){  //包含合计列,则求个数
		pmyGrid.fieldset+=';sum_'+pmyGrid.name.toLowerCase()+'_count';
		pmyGrid.summaryfieldsql+="count(*) as '"+pmyGrid.name.toLowerCase()+"_count'";  //记录总数，求平均值用。一定要加
	}
	if (pmyGrid.rmbfield!=''){  //汇总人民币大写合计项
		pmyGrid.fieldset+=';sum_rmb_'+pmyGrid.rmbfield;  //一定要加
		if (pmyGrid.summaryfieldsql!='') pmyGrid.summaryfieldsql+=',';
		pmyGrid.summaryfieldsql+="sum("+pmyGrid.rmbfield+") as 'rmb_"+pmyGrid.rmbfield+"'";
	}	
	//定义grid的store数据集
	var str='';
 	if (pmyGrid.tablename!=undefined && pmyGrid.tablename!='' && (pmyGrid.sql==undefined || pmyGrid.sql=='')){
 		pmyGrid.sql="select * from "+pmyGrid.tablename;
 		str+=pmyGrid.varname+".sql=\""+pmyGrid.sql+"\";\n";
 	}
 	if (pmyGrid.paramsql==undefined || pmyGrid.paramsql==''){
 		pmyGrid.paramsql=pmyGrid.sql;
 		str+=pmyGrid.varname+".paramsql="+pmyGrid.varname+".sql;\n";
 	}
 	//console.log(pmyGrid.name+'---paramsql='+pmyGrid.paramsql+'--\n-sql='+pmyGrid.sql);
	str+="var "+pmyGrid.name+"Store=Ext.create('Ext.data.JsonStore', {\n";
	str+="	extend:'Ext.data.Model',\n";
	str+="	idProperty:'"+pmyGrid.keyfield+"',\n";
    str+="	fields:['sysrowno','syscolwidth'";
	if (pmyGrid.fieldset!=''){
		var tmp=pmyGrid.fieldset.split(';');
	    for (var i=0;i<tmp.length;i++){
	    	str+=",'"+tmp[i]+"'";
	    }
    }else{
	    for (var i=0;i<pmyGrid.xfield.length;i++){
	    	str+=",'"+pmyGrid.xfield[i]+"'";
	    }
    }
    str+="\n	],\n";
    if (pmyGrid.pagesize>0){
    	str+="	pageSize:"+pmyGrid.pagesize+",\n";
    }  
    str+="	proxy:{\n";
	str+="		type:'ajax',\n";
    str+="		url:'system//fn_getGridData.jsp',\n";
    str+="		actionMethods: { create: 'POST', read: 'POST',  update: 'POST', destroy: 'POST' },\n"; 
    str+="		reader: {\n";
    str+="		type:'json',\n";
	str+="		root:'data',\n";
    str+="		totalProperty:'totalCount'\n";
    //str+="		messageProperty:'sysFields'\n";
    str+="		}\n";
    str+="	}\n";
    str+="});\n";
    if (pmyGrid.style=='editable') {
    	str+="var "+pmyGrid.name+"CellEditing=Ext.create('Ext.grid.plugin.CellEditing',{\n";
    	str+="	store: "+pmyGrid.name+"Store,";
    	str+="	lockableScope: 'normal',";   //否则出现lockable错误
    	str+="	xrow:-1,xcol:-1,";   //数据验证用
    	str+="	clicksToEdit: 1\n";
    	str+="});\n";
    	str+="var "+pmyGrid.name+"SelModel=Ext.create('Ext.selection.CellModel',{ mode:'cellmodel' });\n";
    }else if (pmyGrid.style=='multi'){
    	str+="var "+pmyGrid.name+"SelModel=Ext.create('Ext.selection.CheckboxModel',{ mode:'MULTI' });\n";    
 	}else if (pmyGrid.style=='single'){   
    	str+="var "+pmyGrid.name+"SelModel=Ext.create('Ext.selection.CheckboxModel',{ mode:'SINGLE' });\n";
    }else{
       	str+="var "+pmyGrid.name+"SelModel=Ext.create('Ext.selection.RowModel',{ mode:'SINGLE' });\n";    
    }
    //定义store结束
  //  console.log('store='+str);
    //定义其他数据集，如combo,对于combo列，先需要定义其store,sql语句在主程序的beforeload中定义
    for (var i=0;i<pmyGrid.xfield.length;i++){
    	if (pmyGrid.gridpickercolumns!=undefined && pmyGrid.gridpickercolumns.indexOf(';'+pmyGrid.name+'/'+pmyGrid.xfield[i]+';')>=0){
    		pmyGrid.xtype[i]='editbutton';
	    }
    	if (pmyGrid.treepickercolumns!=undefined && pmyGrid.treepickercolumns.indexOf(';'+pmyGrid.name+'/'+pmyGrid.xfield[i]+';')>=0){
    		pmyGrid.xtype[i]='editbutton';
	    }
    	if (pmyGrid.xtype[i]=='combo'){
			if (pmyGrid.xstoreitemset[i]!=undefined && pmyGrid.xstoreitemset[i]!='' ){ //静态数据集
			   	var str1="var "+pmyGrid.name+"ColumnStore_"+pmyGrid.xfield[i]+"=Ext.create('Ext.data.SimpleStore',{\n";
				str1+="	fields:[";
				var xfiddim=pmyGrid.xstorefieldset[i].split(';');
				str1+="'"+xfiddim[0]+"'";  //数据集中的字段名不加grid和column名，与数据库列名一致
				for (var j=1;j<xfiddim.length;j++){
					if (xfiddim[j]!='') str1+=",'"+xfiddim[j]+"'";			
				}
				str1+="],\n";
				str1+="	data:[";
				var xitemdim=pmyGrid.xstoreitemset[i].split(';');
				for (var j=0;j<xitemdim.length;j++){
					if (j>0) str1+=",";
					var xlistdim=xitemdim[j].split(';');
					str1+="['"+xlistdim[0]+"'";
					for (var k=1;k<xlistdim.length;k++){
						str1+=",'"+xlistdim[k]+"'";
					}
					str1+="]";
				}
				str1+="]\n});\n";
				str+=str1;
			}else if (pmyGrid.xstoresqlset[i]!=undefined && pmyGrid.xstoresqlset[i]!='' ){ //动态数据集	
				var str1="var "+pmyGrid.name+"ColumnStore_"+pmyGrid.xfield[i]+"=Ext.create('Ext.data.Store',{\n";
				str1+="	fields:[";
				var xfiddim=pmyGrid.xstorefieldset[i].split(';');
				str1+="'"+xfiddim[0]+"'";
				for (var j=1;j<xfiddim.length;j++){
					if (xfiddim[j]!='') str1+=",'"+xfiddim[j]+"'";			
				}
				str1+="	],\n";
			   	str1+="	proxy:{type:'ajax',\n";
				str1+="	url:'system//fn_getComboxData.jsp',\n";
			    str1+="	actionMethods: { create: 'POST', read: 'POST',  update: 'POST', destroy: 'POST' },\n"; 
			   	str1+="	reader: {data:'totalCount',type:'json',root:'result'\n";
				str1+="	}}\n";
				str1+="});\n";
				//console.log('master='+pmyGrid.xfield[i].masterfield);
				str1+=pmyGrid.name+"ColumnStore_"+pmyGrid.xfield[i]+".on('beforeload',function(store){\n";
				str1+="var newparams={ database:sysdatabasestring, sqlString:\""+pmyGrid.xstoresqlset[i]+"\" };\n"; 
				str1+="url: 'system//fn_getComboxData.jsp';\n";
				str1+="Ext.apply(store.proxy.extraParams,newparams);\n";
				str1+="});\n";
			//console.log(pmyGrid.xfield[i]+'--'+str1);
			str+=str1;
			}
		}
	}  //for store	
 	//定义pagingtoolbar
  	str+="var "+pmyGrid.name+"bbar=new Ext.PagingToolbar({\n";
   	//str+="bbar:new Ext.PagingToolbar({\n";  
    str+="	pageSize:"+pmyGrid.pagesize+",\n";  
    str+="	store:"+pmyGrid.name+"Store,\n";
    str+="	scrollbar:true, \n";
    str+="	defaults: { msgTarget:'qtip' },\n"; //ext4.2必须加		
	str+="	autoScroll:true,border:true,\n"; 	
    if (pmyGrid.pagingbar=='simple'){
	    str+="	displayInfo:false, \n";
	    str+="	beforePageText:'第',\n";  
    	str+="	afterPageText:'/{0}页'\n";  
    }else{  
	    str+="	displayInfo:true, \n";
		str+="	displayMsg:'当前{0}~{1}条/共{2}条记录',\n";
	    str+="	beforePageText:'第',\n";  
    	str+="	afterPageText:'页/共{0}页',\n";  
		str+="	emptyMsg:'没有记录',\n"; 
		str+="	firstText:'第一页',\n";
		str+="	prevText:'前一页',\n";
		str+="	nextText:'后一页',\n";
	    str+="	lastText:'最后一页',\n";
	    str+="	refreshText:'刷新当页记录',\n";
	    str+="	items:['-',{text:'每页显示'},{\n";
		str+="		xtype:'numberfield',\n";
		str+="		allowDecimals:false,\n";
		str+="		allowNegative:false,\n";
		str+="		id:'"+pmyGrid.name+"rowsperpage',\n";
		str+="		minValue:1,\n";
		str+="		maxValue:99999,\n";
		str+="		value:"+pmyGrid.pagesize+",\n";
		str+="		width:62,\n";		
		str+="		listeners:{\n";
		str+="			specialkey: function(field, e){\n";  
		str+="				if (e.getKey()==13) {\n";
		str+="					var n=Ext.getCmp('"+pmyGrid.name+"rowsperpage').getValue();\n";
		str+="					var xpagesize="+pmyGrid.name+".store.pageSize;\n"; 
		str+="					if (xpagesize!=n && n>0) {\n";
		str+="						"+pmyGrid.name+".store.pageSize=n;\n";
		//str+="alert("+pmyGrid.varname+".summaryfieldsql)\n";
		str+="						var newparams={ database:sysdatabasestring, sqlString:"+pmyGrid.varname+".paramsql,keyField:"+pmyGrid.varname+".keyfield,sortField:"+pmyGrid.varname+".sortfield,limit:"+pmyGrid.name+".store.pageSize,summaryFields:"+pmyGrid.varname+".summaryfieldsql };\n";
		str+="						Ext.apply("+pmyGrid.name+".store.proxy.extraParams,newparams);\n";
		str+="						"+pmyGrid.name+".store.loadPage(1);\n";
		str+="					}\n";  //!=
		str+="				}\n";  //==13
		str+="			}\n";  //listener
		str+="		}\n";  //listener
		str+="	},{text: '行' },'-']\n";
	}
    str+="});\n"; 
    str+=pmyGrid.varname+".pagingbar="+pmyGrid.name+"bbar;\n";
    //定义grid开始
    str+="var "+pmyGrid.name+"=Ext.create('Ext.grid.Panel', {\n";
    if (pmyGrid.region!=undefined && pmyGrid.region!=''){
    	str+="	region:'"+pmyGrid.region+"',\n";
    }
	str+="	layout:'fit', frame:true, \n";
	if (pmyGrid.showline==0) {
		str+="cls:'myGridUdfCSS',\n";
		str+="hideHeaders:true,\n";
	}else{
		str+="cls:'myGridCellCSS',\n";
	}
    if (pmyGrid.title!=undefined && pmyGrid.title!='' && pmyGrid.showtitle=='true') {
    	str+="	title:'"+pmyGrid.title+"',\n";
    }
    str+="	id:'"+pmyGrid.name+"',name:'"+pmyGrid.name+"',\n";
    //显示汇总行
    if (pmyGrid.sumfields!='' || pmyGrid.avgfields!='' || pmyGrid.countfields!='' || pmyGrid.maxfields!='' || pmyGrid.minfields!=''){
    	str+="	features: [{ ftype: 'summary' }],\n";  //汇总行
    }
 	//str+="viewConfig:{\n";
    //str+="getRowClass : function(record, rowIndex, p, store){\n"; 
	//str+="return 'pmyGridRowCSS';\n";  //定义整行的样式，修改字体为宋体
    //str+="}},\n";    
    str+="	border:false,\n";
    if (pmyGrid.height!=undefined && pmyGrid.height>0){ 
    	str+="	height:"+pmyGrid.height+",\n";       
    }
    if (pmyGrid.width!=undefined && pmyGrid.width>0){ 
    	str+="	width:"+pmyGrid.width+",\n";       
    }
    if (pmyGrid.pagesize>0){
    	str+="	bbar:"+pmyGrid.name+"bbar,\n";
    }
    str+="	store:"+pmyGrid.name+"Store,\n";
    if (pmyGrid.style=='editable') {
    	str+="	plugins: ["+pmyGrid.name+"CellEditing],\n";
		//str+="	plugins:[new Ext.grid.plugin.CellEditing({         clicksToEdit: 1        })],";
    }	
    if (pmyGrid.tbar!=undefined && pmyGrid.tbar!='') {
    	str+="	tbar:"+pmyGrid.tbar+",\n";
    }	
    if (pmyGrid.bbar!=undefined && pmyGrid.bbar!='') {
    	//str+="	bbar:"+pmyGrid.bbar+",\n";
    }	
    if (pmyGrid.fbar!=undefined && pmyGrid.fbar!='') {
    	str+="	fbar:"+pmyGrid.fbar+",\n";
    }
    if (pmyGrid.showline==0)   str+="	columnLines:false,\n";
	else str+="	columnLines:true,\n";
    if (pmyGrid.rowline!=undefined)     str+="	rowLines:false,\n";
	else str+="	rowLines:true,\n";
	if (pmyGrid.style!='') str+="	multiSelect:true,\n";
	else str+="	multiSelect:false,\n";
	//str+="	autoFitColumns:true,\n";
	str+="	enableColumnMove:false,\n";
	//str+="	enableColumnResize:false,\n";
	str+="	selModel:"+pmyGrid.name+"SelModel,\n";
	//字体加黑
	if (pmyGrid.highlightfield!=undefined && pmyGrid.highlightfield!=''){ 
		//str+="viewConfig : {forceFit:true,getRowClass:function(record, cellmeta, rowIndex,rowParams,store){\n"; 
		//str+="if(record.get('"+pmyGrid.highlightfield+"')==1){ return 'pmyGridRowCSS'; }else{ return '';}}},\n";
	}
	str+="	columns:[\n";  //定义列开始
	pmyGrid.starteditcolumn=0;
    var k=0;
    for (var i=0;i<pmyGrid.xfield.length;i++){
    	if (pmyGrid.xshowtitle[i]){
	    	if (k>0) str+=",";
	    	k++;
	    	//console.log(k+'---'+pmyGrid.xtitle[i]+'----'+ pmyGrid.xtype[i]);
		    if (pmyGrid.xfield[i]=='sysrowno') {
	  			str+="	{\n"
	  			str+="		header: '<center><font style=\"font-family:"+pmyGrid.titlefont+";\">"+pmyGrid.xtitle[i]+"</center></font>',\n"; 
				str+="		editable:false,\n";  //自定义属性
		  		str+="		width:"+pmyGrid.xwidth[i]+",\n";
		  		str+="		dataIndex:'"+pmyGrid.xfield[i]+"',\n";
				str+="		sortable:false,\n";
	        	str+="		menuDisabled:true,\n";
				if (pmyGrid.lockedfields.indexOf(';'+pmyGrid.xfield[i]+';')>=0){
					str+="locked:true,";
				}else{
					str+="locked:false,";
				}		    	
				//str+="		fixed:true,\n";  //列宽度不能拉开
				str+="		renderer: function(value,meta,record,rowIndex,colIndex,store,view){\n";
				str+="			var n=(store.currentPage-1)*store.pageSize+1+rowIndex;\n";
				str+="			return '<div align=\""+pmyGrid.xalign[i]+"\">'+ n+ '</div>';\n";
				str+="		}\n";			
				str+="	}\n";  			
			}else if (pmyGrid.xtype[i]=='button'){  //小按钮b
				str+="	{\n";
	  			str+="		header: '<center><font style=\"font-family:"+pmyGrid.titlefont+";\">"+pmyGrid.xtitle[i]+"</center></font>',\n"; 
				str+="		editable:false,\n";
	        	str+="		width:"+pmyGrid.xwidth[i]+",\n";
		        str+="		align:'center',\n";
				str+="		sortable:false,\n";
	        	str+="		menuDisabled:true,\n";            	
				//str+="		fixed:true,\n";  //列宽度不能拉开
				str+="		dataIndex:'"+pmyGrid.xfield[i]+"',\n";
				str+="		xtype:'actioncolumn',\n";
				str+="		items:[{id:'icbutton',icon:syspath.root+'/system/images/askme.gif',\n";
				//str+="		toolTip:'选择"+pmyGrid.keyspec+"',\n";
				str+="		handler: function(grid,rowIndex,colIndex) {\n";
				str+="			fn"+pmyGrid.xfield[i]+"Click('"+pmyGrid.name+"',rowIndex,colIndex);}}]\n";
				str+="	}\n";	
			}else if (pmyGrid.xtype[i]=='linkfield'){  //超链接下载
				var linkfile=pmyGrid.xfield[i].split('+');
				if (linkfile.length>1){
					var filepath=linkfile[0];
					var filename=linkfile[1];
				}else{
					var filepath=linkfile[0];
					var filename=linkfile[0];
				}
				pmyGrid.xfield[i]=filepath;
				str+="	{\n";
				//str+="		header:'"+pmyGrid.xtitle[i]+"',\n";
	  			str+="		header: '<center><font style=\"font-family:"+pmyGrid.titlefont+";\">"+pmyGrid.xtitle[i]+"</center></font>',\n"; 
				str+="		editable:false,\n";
	        	str+="		width:"+pmyGrid.xwidth[i]+",\n";
		        str+="		align:'center',\n";
				str+="		sortable:false,\n";
	        	str+="		menuDisabled:true,\n";            	
				//str+="		fixed:true,\n";  //列宽度不能拉开
				str+="		css:'myUrlFieldCSS',\n";
				str+="		dataIndex:'"+pmyGrid.xfield[i]+"',\n";
				/*
				str+="		listeners:{ click: function() {\n";			
				str+="		var records="+pmyGrid.name+".getSelectionModel().getSelection();\n";	
	  			str+="		var url=records[0].get('"+filepath+"');\n";
				str+="		window.location.href=url;\n";
				str+="		}},\n";
				*/
	  			str+="		renderer:function(value,metadata,record,rowIndex){\n";
	  			str+="			var xvalue1=record.get('"+filepath+"');\n";
	  			str+="			var xvalue2=record.get('"+filename+"');\n";
	 			//str+="			var f='<a href=\"'+xvalue1+'\">'+xvalue2+'</a>';\n";
	 			str+="			var f='<a href=\"'+xvalue1+'\" target=\"_blank\">'+xvalue2+'</a>';\n";
	 			//str+="			console.log(f);\n";
	 			str+="			return f;\n";    			
	  			str+="		}\n";		
				str+="	}\n";	
			}else if (pmyGrid.xtype[i]=='checkbox'){  //逻辑值图片--c
	  			str+="	{\n"; 
	  			str+="		header: '<center><font style=\"font-family:"+pmyGrid.titlefont+";\">"+pmyGrid.xtitle[i]+"</center></font>',\n"; 
	  			//str+="		text:'<center>"+pmyGrid.xtitle[i]+"</center>',\n"; 
				str+="		editable:true,\n";
		  		str+="		width:"+pmyGrid.xwidth[i]+",\n";
				str+="		sortable:false,\n";
	        	str+="		menuDisabled:true,\n";            	
				//str+="		fixed:true,\n";  //列宽度不能拉开
				str+="		dataIndex:'"+pmyGrid.xfield[i]+"',\n";			
	  			str+="		renderer:function(value,metadata,record,rowIndex){\n";
	 			str+="			if (value==1) var f=\"<div align='center\'><img src='../"+syspath.root+"/system/images/drop-yes.gif' /></div>\";\n";
	 			str+="			else var f=\"<div align='center\'><img src='../"+syspath.root+"/system/images/drop-no.gif' /></div>\";\n";
	 			str+="			return f;\n";    			
	  			str+="		}\n";
				str+="	}\n";  			
			}else if (pmyGrid.xtitle[i]!=''){  //一般类型的列
		        if (pmyGrid.ytitle[i]==''){  //没有二重标题
			        //str+="{text:'<center>"+pmyGrid.xtitle[i]+"</center>',\n";
	  				str+="{header:'<center><font style=\"font-family:"+pmyGrid.titlefont+";\">"+pmyGrid.xtitle[i]+"</center></font>',\n"; 
		        }else if((i>1 && pmyGrid.ytitle[i]!='' && pmyGrid.ytitle[i-1]=='')||(pmyGrid.ytitle[i]!='' && pmyGrid.xtitle[i]!=pmyGrid.xtitle[i-1])){
		        	//二重标题开始。或上一个一层标题与下一个一层标题不同。标题中再嵌入columns[{}]
			        //str+="{text:'<center>"+pmyGrid.xtitle[i]+"</center>',\n";
	  				str+="{header:'<center><font style=\"font-family:"+pmyGrid.titlefont+";\">"+pmyGrid.xtitle[i]+"</center></font>',\n"; 
		        	str+="columns: [\n";
		        }
		        if (pmyGrid.ytitle[i]!=''){
		        	//定义二层标题
			        //str+="{text:'<center>"+pmyGrid.ytitle[i]+"</center>',\n";
	  				str+="{header:'<center><font style=\"font-family:"+pmyGrid.titlefont+";\">"+pmyGrid.ytitle[i]+"</center></font>',\n"; 
		        }
	    	    str+="sortable:false,\n";
	        	str+="menuDisabled:true,\n";            	
				//str+="enableColumnMove:false,\n";
				//str+="enableColumnResize:false,\n";
	    	    str+="width:"+pmyGrid.xwidth[i]+",\n";
	    	    if (pmyGrid.style!='editable' && pmyGrid.xfield[i]==pmyGrid.keyfield){
	        		str+="locked:true,\n";  //extjs4.0这列固定,双击失效
	        	}else{
	        		str+="locked:false,\n";  //extjs4.0这列固定,双击失效
	        	}
	    	    if (pmyGrid.xwidth[i]<=0) str+="hidden:true,\n";
	    	   //if (pmyGrid.style!='editable' && pmyGrid.xtype[i]!='datefield'){
		        	str+="renderer:function(value,metadata,record,rowIndex){\n";
					if (pmyGrid.highlightfield!=undefined && pmyGrid.highlightfield!=''){
						str+="if (record.get('"+pmyGrid.highlightfield+"')==1)";
						str+="return '<div align="+pmyGrid.xalign[i]+"><font color=blue style=\"font-family:宋体;\"><b>'+value+'</b></font></div>';\n"
						str+="else return '<div align=\""+pmyGrid.xalign[i]+"\"><font style=\"font-family:宋体;\">'+value+'</font></div>';\n";
					}else{
						str+="return '<div align=\""+pmyGrid.xalign[i]+"\"><font style=\"font-family:宋体;\">'+value+'</font></div>';\n";
					}
					str+="},\n";
				//}
			    if (pmyGrid.xtype[i]=='datefield') {
			    	str+="format:'"+sysdateformat+"',\n";  //dddd
			    	str+="enableColumnMove:false,enableColumnResize:false,\n";
			    }else if (pmyGrid.xtype[i]=='combo') {
			    	//
			    }else if (pmyGrid.xtype[i]=='decimalfield' && pmyGrid.xdec[i]>0) {
					str+="format:'0.";
					for(var j=1;j<=pmyGrid.xdec[i];j++) str+='0';
					str+="',\n";
					
			    }else if (pmyGrid.xtype[i]=='decimalfield' && pmyGrid.xdec[i]<=0) {
					str+="format:'0',\n";
				}
				//eeeeeeeee			    	
		    	//定义可编辑grid中的控件
			    if (pmyGrid.style=='editable' && sys.editableColumnfields.indexOf(pmyGrid.xtype[i])>=0){ 
			    	//textfield/decimalfield/datefield/editbutton/combo
			    	if (pmyGrid.xtype[i]=='datefield'){ //ddddd日期型列需要添加xtype
			    		str+="xtype:'datecolumn',\n";
			    		//设置渲染及显示的格式
			    		//str+="renderer:Ext.util.Format.dateRenderer('"+sysdateformat+"'),\n";
			    		str+="renderer:function(value){\n";
			    		str+="var xvalue=Ext.util.Format.date(value, sysdateformat);\n";
			    		str+="return '<div align=\""+pmyGrid.xalign[i]+"\"><font style=\"font-family:宋体;\">'+xvalue+'</font></div>';\n";
			    		str+="},\n";
			    	}
			    	if (pmyGrid.xfield[i]=='sysrowno') str+="editable:false,\n";
			    	else str+="editable:true,\n";
			    	str+="editor:{\n";
					str+="xtype:'"+pmyGrid.xtype[i]+"',\n";
					str+="id:'"+pmyGrid.name+pmyGrid.xfield[i]+"Column',\n";
					str+="name:'"+pmyGrid.name+pmyGrid.xfield[i]+"Column',\n";
					if (pmyGrid.xlength[i]>0){
						str+="enforceMaxLength:true,maxLength:"+pmyGrid.xlength[i]+",";
					}	
					if (pmyGrid.xtype[i]=='editbutton'){
						str+="buttonText:'…',buttonMargin:4,readOnly: false,";
					}else if (pmyGrid.xtype[i]=='decimalfield'){
						str+="hideTrigger:true,step:0,\n";
						if (pmyGrid.xdec[i]==0) str+="allowDecimals:false,decimalPrecision:0,\n";
						else str+="allowDecimals:true,decimalPrecision:"+pmyGrid.xdec[i]+",\n";
					}else if (pmyGrid.xtype[i]=='datefield'){
				    	str+="format: '"+sysdateformat+"',\n";
				    	str+="submitFormat: 'c',\n";
					}else if (pmyGrid.xtype[i]=='combo'){
						//str+="id:'"+pmyGrid.name+pmyGrid.xfield[i]+"Column',\n";
						str+="cls:'myFieldCSS',\n";
						str+="store:"+pmyGrid.name+"ColumnStore_"+pmyGrid.xfield[i]+",\n";
						str+="xreadOnly:false,\n";
						str+="editable:false,\n";
						str+="triggerAction:'all',\n";
						str+="displayField:'"+pmyGrid.xfield[i]+"',\n";  //与数据库字段名一致
						str+="valueField:'"+pmyGrid.xfield[i]+"',\n";
						str+="mode:'local',\n";
						//str+="queryMode: 'remote',";
						str+="resizable:false,lazyRender:false,\n";
					}
					if (pmyGrid.xalign[i]=='right') str+="fieldCls:'field-align-right',\n";
		        	else if (pmyGrid.xalign[i]=='center') str+="fieldCls:'field-align-center',\n";
					var xflag=0;
					if (pmyGrid.keyevent!=undefined && pmyGrid.keyevent!=''){ 
						str+="listeners:{\n";
						str+="specialKey:function(field,e){ "+pmyGrid.keyevent+"("+pmyGrid.varname+",field,e.getKey()); }\n";
						xflag=1;
					}	
					if (pmyGrid.xtype[i]=='combo'){
						if (xflag==0) str+="listeners:{\n";
						else str+=",\n";
						//if (pmyGrid.keyevent!=undefined)
						str+="select:function(combo, record, index) { fnColumnComboSelect(combo,record,index);}\n";
						xflag=1;
					}
					if (pmyGrid.xtype[i]=='editbutton'){  //bbbbuuu
						//事件名称为fn+name+ColumnClick
						if (xflag==0) str+="listeners:{\n";
						else str+=",\n";
						str+="click:function(btn) { fn"+pmyGrid.xfield[i]+"ColumnClick(btn);}\n";
						//str+=",blur:function(field,ev,e) {console.log(field.id); "+pmyGrid.name+"CellEditing.startEdit(1,1); return false;}\n";	
						//str+="specialkey:function(field,ev,e) {"+pmyGrid.name+"CellEditing.startEdit(0,0);}";	
						//Ext.getCmp('myGrid').getPlugin().getEditor().cancelEdit()
						xflag=1;
					}	
					if (xflag==1) str+="},";  //添加listener
					str+="selectOnFocus: true\n";  //聚焦时自动选中
					str+="},\n";
				}else{  //值显示的列
					str+="editable:false,\n";
				}
				if (pmyGrid.lockedfields.indexOf(';'+pmyGrid.xfield[i]+';')>=0){
					str+="locked:true,";
				}else{
					str+="locked:false,";
				}
		        str+="xdec:"+pmyGrid.xdec[i]+",\n";  //小数位数,自定义属性
		        
		        //处理汇总行ssssssumtotal
				if ((';'+pmyGrid.sumfields+';').indexOf(';'+pmyGrid.xfield[i]+';')>=0){
					//alert(999);
		        	//str+="summaryType: 'sum',\n";
		        	if (pmyGrid.summaryfieldsql!='') pmyGrid.summaryfieldsql+=",";
					pmyGrid.summaryfieldsql+="sum("+pmyGrid.xfield[i]+") as '"+pmyGrid.xfield[i]+"'";
					if (pmyGrid.summaryfieldset!='') pmyGrid.summaryfieldset+=';';
					pmyGrid.summaryfieldset+=pmyGrid.xfield[i];
		        	str+="summaryType: function(records){ \n";
		        	//其它没有显示出来的页的值
		        	if (pmyGrid.totalstyle=='grandtotal'){
		        		str+="if (records[0]){\n";
						str+=pmyGrid.varname+".summary."+pmyGrid.xfield[i]+"=Number(records[0].get('sum_"+pmyGrid.xfield[i]+"'));\n";
						str+="var total="+pmyGrid.varname+".summary."+pmyGrid.xfield[i]+";\n";
						str+="}\n";
						str+="if (total==undefined) total=0;\n";
					}else{
						str+="var total=0;\n";
					}
		        	str+="for (var j=0; j < records.length; j++) {\n";
					str+="total = total + Number(records[j].get('"+pmyGrid.xfield[i]+"'));\n";
                    str+="}\n";
		        	str+="return '<div align=\""+pmyGrid.xalign[i]+"\"><font style=\"font-family:宋体;\">'+total.toFixed("+pmyGrid.xdec[i]+")+'</font></div>';\n";
		        	str+="},\n";		        	
					/*		        	
		        	str+="summaryRenderer: function(value){ \n";
		        	str+="var xvalue=value;\n";
		        	str+="if ("+pmyGrid.varname+".summary."+pmyGrid.xfield[i]+"!=undefined) ";
		        	str+="xvalue="+pmyGrid.varname+".summary."+pmyGrid.xfield[i]+";\n";
		        	str+="console.log('xvalue='+xvalue);\n";
		        	str+="return '<div align=\""+pmyGrid.xalign[i]+"\"><font style=\"font-family:宋体;\">'+xvalue+'</font></div>';\n";
					str+="},\n";
		        	*/
				}else if ((';'+pmyGrid.avgfields+';').indexOf(';'+pmyGrid.xfield[i]+';')>=0){
		        	//str+="summaryType: 'average',\n";
		        	if (pmyGrid.summaryfieldsql!='') pmyGrid.summaryfieldsql+=",";
					pmyGrid.summaryfieldsql+="sum("+pmyGrid.xfield[i]+") as '"+pmyGrid.xfield[i]+"'";
					if (pmyGrid.summaryfieldset!='') pmyGrid.summaryfieldset+=';';
					pmyGrid.summaryfieldset+=pmyGrid.xfield[i];
		        	str+="summaryType: function(records){ \n";
					if (pmyGrid.totalstyle=='grandtotal'){
		        		str+="if (records[0]){\n";
						str+=pmyGrid.varname+".summary."+pmyGrid.xfield[i]+"=Number(records[0].get('sum_"+pmyGrid.xfield[i]+"'));\n";
						str+=pmyGrid.varname+".summary."+pmyGrid.name.toLowerCase()+"_count=Number(records[0].get('sum_"+pmyGrid.name.toLowerCase()+"_count'));\n";
						str+="var total="+pmyGrid.varname+".summary."+pmyGrid.xfield[i]+";\n";
						str+="}\n";
						str+="if (total==undefined) total=0;\n";
						str+="var rowcount=rowcount+"+pmyGrid.varname+".summary."+pmyGrid.name.toLowerCase()+"_count;\n";
						str+="if (rowcount==undefined) rowcount=0;\n";
					}else{
						str+="var total=0,rowcount=0;\n";
					}
					str+="rowcount+=records.length;\n";
		        	str+="for (var j=0; j < records.length; j++) {\n";
					str+="total = total + Number(records[j].get('"+pmyGrid.xfield[i]+"'));\n";
					//增加其它页（没有显示出来页的值）
                    str+="}\n";
		        	//str+="console.log(total+'---'+rowcount);\n";
                    str+="if (rowcount>0) total=1.0*total/rowcount;else total=0;\n";
		        	str+="return '<div align=\""+pmyGrid.xalign[i]+"\"><font style=\"font-family:宋体;\">'+total.toFixed("+pmyGrid.xdec[i]+")+'</font></div>';\n";
		        	str+="},\n";		        	
				}else if ((';'+pmyGrid.countfields+';').indexOf(';'+pmyGrid.xfield[i]+';')>=0){
		        	//str+="summaryType: 'count',\n";
		        	if (pmyGrid.summaryfieldsql!='') pmyGrid.summaryfieldsql+=",";
					pmyGrid.summaryfieldsql+="count("+pmyGrid.xfield[i]+") as '"+pmyGrid.xfield[i]+"'";
					if (pmyGrid.summaryfieldset!='') pmyGrid.summaryfieldset+=';';
					pmyGrid.summaryfieldset+=pmyGrid.xfield[i];
		        	str+="summaryType: function(records){ \n";
					if (pmyGrid.totalstyle=='grandtotal'){
		        		str+="if (records[0]){\n";
						//计算其它页（没有显示出来页的值）
						str+=pmyGrid.varname+".summary."+pmyGrid.xfield[i]+"=Number(records[0].get('sum_"+pmyGrid.xfield[i]+"'));\n";
						str+="var rowcount="+pmyGrid.varname+".summary."+pmyGrid.xfield[i]+";\n";
						//str+="rowcount=rowcount+"+pmyGrid.varname+".summary."+pmyGrid.name.toLowerCase()+"_count;\n";
						str+="}\n";
						str+="if (rowcount==undefined) rowcount=0;\n";
					}else{
						str+="var rowcount=0;\n";
					}	
					//增加本页
					str+="rowcount+=records.length;\n";
		        	str+="return '<div align=\""+pmyGrid.xalign[i]+"\"><font style=\"font-family:宋体;\">'+rowcount.toFixed("+pmyGrid.xdec[i]+")+'</font></div>';\n";
		        	str+="},\n";						
				}else if ((';'+pmyGrid.maxfields+';').indexOf(';'+pmyGrid.xfield[i]+';')>=0){
		        	//str+="summaryType: 'max',\n";
		        	if (pmyGrid.summaryfieldsql!='') pmyGrid.summaryfieldsql+=",";
					pmyGrid.summaryfieldsql+="max("+pmyGrid.xfield[i]+") as '"+pmyGrid.xfield[i]+"'";
					if (pmyGrid.summaryfieldset!='') pmyGrid.summaryfieldset+=';';
					pmyGrid.summaryfieldset+=pmyGrid.xfield[i];
		        	str+="summaryType: function(records){ \n";
					if (pmyGrid.totalstyle=='grandtotal'){
		        		str+="if (records[0]){\n";
						//计算其它页（没有显示出来页的值）
						str+=pmyGrid.varname+".summary."+pmyGrid.xfield[i]+"=Number(records[0].get('sum_"+pmyGrid.xfield[i]+"'));\n";
						str+="}\n";
						str+="var rowcount="+pmyGrid.varname+".summary."+pmyGrid.name.toLowerCase()+"_count;\n";
						str+="if (rowcount!=undefined && rowcount>0) var maxv="+pmyGrid.varname+".summary."+pmyGrid.xfield[i]+";\n";
						str+="else var maxv;\n";
					}else{
						str+="var maxv;\n";
					}
		        	str+="for (var j=0; j < records.length; j++) {\n";
					str+="if (maxv==undefined) maxv=Number(records[j].get('"+pmyGrid.xfield[i]+"'));\n";
					str+="else maxv=Math.max(maxv,Number(records[j].get('"+pmyGrid.xfield[i]+"')));\n";
                    str+="}\n";
					str+="if (maxv==undefined) maxv=0;\n";
		        	str+="return '<div align=\""+pmyGrid.xalign[i]+"\"><font style=\"font-family:宋体;\">'+maxv.toFixed("+pmyGrid.xdec[i]+")+'</font></div>';\n";
		        	str+="},\n";						
				}else if ((';'+pmyGrid.minfields+';').indexOf(';'+pmyGrid.xfield[i]+';')>=0){
		        	//str+="summaryType: 'min',\n";
		        	if (pmyGrid.summaryfieldsql!='') pmyGrid.summaryfieldsql+=",";
					pmyGrid.summaryfieldsql+="min("+pmyGrid.xfield[i]+") as '"+pmyGrid.xfield[i]+"'";
					if (pmyGrid.summaryfieldset!='') pmyGrid.summaryfieldset+=';';
					pmyGrid.summaryfieldset+=pmyGrid.xfield[i];
		        	str+="summaryType: function(records){ \n";
					if (pmyGrid.totalstyle=='grandtotal'){
		        		str+="if (records[0]){\n";
						//计算其它页（没有显示出来页的值）
						str+=pmyGrid.varname+".summary."+pmyGrid.xfield[i]+"=Number(records[0].get('sum_"+pmyGrid.xfield[i]+"'));\n";
						str+="}\n";
						str+="var rowcount="+pmyGrid.varname+".summary."+pmyGrid.name.toLowerCase()+"_count;\n";
						str+="if (rowcount!=undefined && rowcount>0) var minv="+pmyGrid.varname+".summary."+pmyGrid.xfield[i]+";\n";
						str+="else var minv;\n";
					}else{
						str+="var minv;\n";
					}	
		        	str+="for (var j=0; j < records.length; j++) {\n";
					str+="if (minv==undefined) minv=Number(records[j].get('"+pmyGrid.xfield[i]+"'));\n";
					str+="else minv=Math.min(minv,Number(records[j].get('"+pmyGrid.xfield[i]+"')));\n";
					//增加其它页（没有显示出来页的值）
                    str+="}\n";
					str+="if (minv==undefined) minv=0;\n";
		        	str+="return '<div align=\""+pmyGrid.xalign[i]+"\"><font style=\"font-family:宋体;\">'+minv.toFixed("+pmyGrid.xdec[i]+")+'</font></div>';\n";
		        	str+="},\n";						
			    }else if (pmyGrid.summarycolumnfield==pmyGrid.xfield[i]){
					str+="summaryRenderer: function(value, summaryData, dataIndex) {\n";
					var n1=pmyGrid.summarycolumnlabel.indexOf('[@');
					var n2=pmyGrid.summarycolumnlabel.indexOf(']',n1+1);
					var ts2='';
					if (n2>n1){
						var ts1=pmyGrid.summarycolumnlabel.substring(n1,n2+1);
						if (ts1=='[@c]') ts2='center';
						else if (ts1=='[@r]') ts2='right';
						pmyGrid.summarycolumnlabel=pmyGrid.summarycolumnlabel.replace(ts1,'');
					}else{
						ts2=pmyGrid.xalign[i];
					}
					if (ts2=='') ts2='left';
					str+="return ('<b><"+ts2+">"+pmyGrid.summarycolumnlabel+"</"+ts2+"></b>');\n";
					//str+="return ('<b>"+pmyGrid.summarycolumnlabel+"</b>');\n";
    		        str+="},\n";		        	
			    } //处理汇总行结束			    
		        str+="dataIndex:'"+pmyGrid.xfield[i]+"'\n";
				if ((i<pmyGrid.xtitle.length-1 && pmyGrid.ytitle[i]!='' && pmyGrid.xtitle[i]!=pmyGrid.xtitle[i+1])||(pmyGrid.ytitle[i]!='' && i==pmyGrid.xtitle.length-1)){
					//二层次标题结束.
					str+="}]\n";
				}
	    	    str+="}\n";
			}
		}
	}	   
	//console.log("summaryfields="+ pmyGrid.summaryfieldset);
	str+="]\n";  //end of column
   	str+="});\n";
	pmyGrid.createstr+=str;
	//console.log(str);
	//grid本身定义结束
	//定义Grid的load事件
	str='';
	if (pmyGrid.contextmenu!=undefined && pmyGrid.contextmenu!=''){
		str+=pmyGrid.name+".on('containercontextmenu',function(grid, e){\n";  //定义右键   		
   		str+="e.preventDefault();\n";
   		str+=pmyGrid.contextmenu+".showAt(e.getXY());\n";
   		str+="});\n";
   		str+=pmyGrid.name+".on('itemcontextmenu',function(grid, record, item, index, e){\n";  //定义右键   		
   		str+="e.preventDefault();\n";
   		//str+="grid.getSelectionModel().select(record);\n";  //选中指定行号的记录   
   		str+=pmyGrid.contextmenu+".showAt(e.getXY());\n";
   		str+="});\n";
    }	
	str+=pmyGrid.name+".store.on('load',function(store){\n";
	str+=pmyGrid.varname+".error=0;\n";
	str+="var index=0;\n";
	str+="if ("+pmyGrid.varname+".index>=0 && "+pmyGrid.varname+".index<"+pmyGrid.name+".store.getCount()){\n";
	str+="index="+pmyGrid.varname+".index;\n";
	str+="}\n";				 	
	str+="if (index<0) index=0;\n";
	str+="//pmyGrid1.index=-1;\n";
	str+=pmyGrid.varname+".column=0;\n";
	if (pmyGrid.style=='editable'){
		str+="var record="+pmyGrid.name+".store.getAt(0);\n ";
		str+="if (record){\n";
		//取本页关键字值，放在第一行
		str+=pmyGrid.varname+".sys_keyvalues=record.get('sys_keyvalues');\n";
		str+="}\n";
		str+="for (var j=0;j<"+pmyGrid.name+".columns.length-"+pmyGrid.varname+".lockedcolumncount;j++){\n";
		str+="if ("+pmyGrid.name+".columns[j+"+pmyGrid.varname+".lockedcolumncount].editable){\n";
		str+=pmyGrid.varname+".column=j;\n";
		str+=pmyGrid.varname+".starteditcolumn=j;\n";
		str+="break;\n";
		str+="}\n";	
		str+="}\n";
		str+="if ("+pmyGrid.name+".store.getCount()>0 && index<"+pmyGrid.name+".store.getCount()){\n";
		str+=pmyGrid.varname+".index=index;\n";		
		str+=pmyGrid.name+"CellEditing.startEdit("+pmyGrid.varname+".index,"+pmyGrid.varname+".starteditcolumn);\n";
		//str+=pmyGrid.name+".getSelectionModel().setCurrentPosition({row: "+pmyGrid.varname+".index, column: "+pmyGrid.varname+".column});";
		//fnSumAmount(myGrid1.store);汇总数据
		str+="}\n";
		//str+=pmyGrid.varname+".xrow="+pmyGrid.varname+".index;\n";
		//str+=pmyGrid.varname+".xcol="+pmyGrid.varname+".column;\n";
	}else{
		str+=pmyGrid.varname+".starteditcolumn=0;\n";
		str+="if ("+pmyGrid.name+".store.getCount()>0 && index<"+pmyGrid.name+".store.getCount()){\n";		
		str+="	setTimeout(function(){\n";
		str+="var record="+pmyGrid.name+".getSelectionModel().select(index);\n";
		str+="	},10);\n";
		//str+="eval(mySetRecordMoveBtn('"+pmyGrid.name+"','record'));\n";
		str+="}\n";	
	}
	str+="});\n";
	//console.log('load='+str);				
	pmyGrid.createstr+=str;
	str='';
	//myGrid1.me.style=...存放不能用pmyGrid1描述的属性
	str+=pmyGrid.name+".me={};"+pmyGrid.name+".me.style="+pmyGrid.varname+".style;";
	str+=pmyGrid.name+".me.keyfield="+pmyGrid.varname+".keyfield;";
	if (pmyGrid.style=='editable'){
		str+=pmyGrid.varname+".cellediting="+pmyGrid.name+"CellEditing;\n";
		//定义beforeedit事件
		str+=pmyGrid.name+".on('beforeedit',function(editor, e) {\n";
		str+=pmyGrid.varname+".index=e.rowIdx;\n";
		str+=pmyGrid.varname+".column=e.colIdx;\n";
		str+="var rowflag=e.record.data.sysrowno;\n";
		//str+="//if (rowflag>0) myGrid1.columns[1].editable=false;\n";
		//str+="//else myGrid1.columns[1].editable=true;\n";
		str+="if (!"+pmyGrid.name+".columns[e.colIdx+"+pmyGrid.varname+".lockedcolumncount].editable) {\n";
		str+="e.cancel=true;\n";
		str+="}else{\n";
		str+="e.cancel=false;\n";
		str+="}\n";
		str+="var xrecord = editor.xrecord;\n"; 
		str+="var xcolumn = editor.xcolumn;\n";
		str+="if (!Ext.isEmpty(xrecord) && !Ext.isEmpty(xcolumn) && (xrecord != e.record || xcolumn != e.column)){\n";	
		str+="editor.cancelEdit();\n";
		str+="var fn = Ext.Function.createDelayed(function(){\n";
		str+="editor.startEdit(xrecord, xcolumn); //不用startEditByPosition()是以为fixed列的特殊性\n";
		str+="editor.xrecord = null;\n";
		str+="editor.xcolumn = null;\n";
		str+="}, 0);\n";
		str+="fn();\n";
		str+="}\n";
		//str+=pmyGrid.varname+".xrow="+pmyGrid.varname+".index;  //放在if error=1之后\n";
		//str+=pmyGrid.varname+".xcol="+pmyGrid.varname+".column;\n";
		str+="});\n";

		//可编辑表格在edit事件中实现数据替换与汇总replacedim
		str+=pmyGrid.name+".on('edit',function(editor, e){\n";
		str+="var field=e.field;\n";
		str+="var record=e.record;\n";
		//str+="e.record.commit();\n";  //速度减慢
		str+="var xrow = editor.xrow,xcolumn = editor.xcolumn;";
		for (var j=0;pmyGrid.replace!=undefined && j<pmyGrid.replace.length;j++){
			var s=pmyGrid.replace[j].xvalue;
			var x1=s.indexOf("=");
			var s1=s.substring(0,x1);
			var s2=s.substring(x1+1);
			var s3='';
			var x2=s2.indexOf("?");
			if (x2>=0){
				s3=s2.substring(x2+1);
				s2=s2.substring(0,x2);
			}
			str+="var rvalue="+myConvertExpression(s2,'record')+";\n";
			for (var k=0; k<pmyGrid.xfield.length; k++){
				if (pmyGrid.xfield[k]==s1 && pmyGrid.xtype[k]=='decimalfield'){
					str+="rvalue=rvalue.toFixed("+pmyGrid.xdec[k]+");";
					break;
				}
			}
			if (s3!=''){
				str+="if ("+myConvertExpression(s3,'record')+")\n";
			}
			str+="record.set('"+s1+"',rvalue);\n";
			for (k=0;k<pmyGrid.xfield.length;k++){
				if (pmyGrid.xfield[k]==s1) {
					//将对应列设置为只读
					pmyGrid.eventstr+=pmyGrid.name+".columns["+k+"].editable=false;\n";
				}
			}
		}
		str+="});";
		//console.log(str);
		
		//beforeselect事件
		str+=pmyGrid.name+".on('beforeselect',function(model, record, index, col){\n";
		str+="if (record) {  //判断是否有行被选中，必须要加\n";
		str+=pmyGrid.varname+".index=index;";
		str+=pmyGrid.varname+".column=col;";
	  	str+="}\n"; 
		str+="});\n";
		str+="	"+pmyGrid.varname+".error=0;\n";  //输入错误标记值 
		//str+="	"+pmyGrid.varname+".xrow=-1;\n";  //记录编辑前的行号 
		//str+="	"+pmyGrid.varname+".xcol=-1;\n";  //记录编辑前的列号 
	}	
	str+="	"+pmyGrid.varname+".lockedcolumncount=0;";
	str+="	for (var i=0;i<"+pmyGrid.name+".columns.length;i++){";
	str+="		if ("+pmyGrid.name+".columns[i].locked) "+pmyGrid.varname+".lockedcolumncount++;";
	str+="	}";	
	pmyGrid.createstr+=str;
	pmyGrid.createstr+=pmyGrid.eventstr; 
	//设置editable原始状态，将其保存在xeditable属性中.放在pmyGrid.eventstr执行之后
	str="for (var j=0;j<"+pmyGrid.name+".columns.length;j++){\n";
	str+=pmyGrid.name+".columns[j].xeditable="+pmyGrid.name+".columns[j].editable;\n";
	str+="}\n";
	pmyGrid.createstr+=str;
	//生成combo的fnSelectColumnCombo事件
	//console.log(pmyGrid.eventstr)
	return(pmyGrid.createstr);  //ggggggggg
};	

function myGetAttrs(pf){
	var p={};
	p.x=0;
	p.y=0;
	p.w=0;
	p.h=0;	
	if (pf!=undefined){
		//pos
		if (pf.pos!=undefined){
			if (typeof pf.pos != 'object'){
				var s=pf.pos;
			}else{
				var s=pf.pos[0].xvalue;
			}
			var x=s.indexOf(',');
			if (x>=0){
				var s1=s.substring(0,x);
				var s2=s.substring(x+1);
			}else{
				var s1=s;
				var s2='';
			}
			if (s1=='') s1='0';
			if (s2=='') s2='0';
			p.y=eval(s1);
			p.x=eval(s2);
		}	
		//size
		if (pf.size!=undefined){
			if (typeof pf.size != 'object'){
				var s=pf.size;
			}else{
				var s=pf.size[0].xvalue;
			}
			var x=s.indexOf(',');
			if (x>=0){
				var s1=s.substring(0,x);
				var s2=s.substring(x+1);
			}else{
				var s1=s;
				var s2='';
			}
			if (s1=='') s1='0';
			if (s2=='') s2='0';
			p.h=eval(s1);
			p.w=eval(s2);
		}
		//other single value
		for (var i=0;i<sys.xattrs.length;i++){
			var str="if (p."+sys.xattrs[i]+"==undefined) p."+sys.xattrs[i]+"='';";
			eval(str);
			var str="if (pf."+sys.xattrs[i]+"!=undefined){";
			str+="		if (typeof pf."+sys.xattrs[i]+" != 'object'){";
			str+="			p."+sys.xattrs[i]+"=pf."+sys.xattrs[i]+";";
			str+="		}else{";
			str+="			p."+sys.xattrs[i]+"=pf."+sys.xattrs[i]+"[0].xvalue;";
			str+="		}";	
			str+="	}";		
			eval(str);
			//console.log(str);
		}
	}
	return(p);
}	

function myGetOneAttr(pf,attr){
	var result='';
	var str="if (pf!=undefined && pf."+attr+"!=undefined){\n";
	str+="		if (typeof pf."+attr+" != 'object'){\n";
	str+="			result=pf."+attr+";\n";
	str+="		}else{\n";
	str+="			result=pf."+attr+"[0].xvalue;\n";
	str+="		}\n";	
	str+="	}\n";	
	eval(str);
	return result;
}
function myGetTwoAttrs(pf,attr){
	var result='';
	var resultx=[];
	var str="if (pf!=undefined && pf."+attr+"!=undefined){\n";
	str+="		if (typeof pf."+attr+" != 'object'){\n";
	str+="			result=pf."+attr+";\n";
	str+="		}else{\n";
	str+="			result=pf."+attr+"[0].xvalue;\n";
	str+="		}\n";	
	str+="	}\n";	
	eval(str);
	var resultx=result.split('/');
	return resultx;
}

function myGetPosSize(pf){
	var p={};
	p.x=0;
	p.y=0;
	p.w=0;
	p.h=0;	
	if (pf!=undefined){
		//pos
		if (pf.pos!=undefined){
			if (typeof pf.pos != 'object'){
				var s=pf.pos;
			}else{
				var s=pf.pos[0].xvalue;
			}
			var x=s.indexOf(',');
			if (x>=0){
				var s1=s.substring(0,x);
				var s2=s.substring(x+1);
			}else{
				var s1=s;
				var s2='';
			}
			if (s1=='') s1='0';
			if (s2=='') s2='0';
			p.y=eval(s1);
			p.x=eval(s2);
		}	
		//size
		if (pf.size!=undefined){
			if (typeof pf.size != 'object'){
				var s=pf.size;
			}else{
				var s=pf.size[0].xvalue;
			}
			var x=s.indexOf(',');
			if (x>=0){
				var s1=s.substring(0,x);
				var s2=s.substring(x+1);
			}else{
				var s1=s;
				var s2='';
			}
			if (s1=='') s1='0';
			if (s2=='') s2='0';
			p.h=eval(s1);
			p.w=eval(s2);
		}
	}
	return (p);
}	

function myFormReplaceValidation(pmyTable,pr,pv){  //rrrrrp替换表单中的数据和验证数据
	//数据验证的同时生成sql插入语句
	//数据替换
	var str='';
	for (var i=0; pr!=undefined && i<pr.length; i++){
		var x1=pr[i].xvalue.indexOf("=");
		var s1=pr[i].xvalue.substring(0,x1);
		var s2=pr[i].xvalue.substring(x1+1);
		var s3='';
		var x2=s2.indexOf("?");
		if (x2>=0){
			s3=s2.substring(x2+1);
			s2=s2.substring(0,x2);
		}
		str+="var rvalue="+myConvertExpression(s2,'cmp')+";\n";
		if (s3!=''){
			str+="if ("+myConvertExpression(s3,'cmp')+")\n"
		}
		str+="Ext.getCmp('"+s1+"').setValue(rvalue);\n";
	}
	//验证规则处理
	str+="pmyTable.error='';\n";
	str+="if (Ext.getCmp('"+pmyTable.keyfield+"').getValue()=='') pmyTable.error+='<br>"+pmyTable.keyspec+"（主键）不能为空值！';\n";
	//表单字段规则验证
	var tmp=pmyTable.fieldset.split(';');
	for (i=0;i<tmp.length;i++){
		str+="if (Ext.getCmp('"+tmp[i]+"')!=null){";
		str+="	if (!Ext.getCmp('"+tmp[i]+"').isValid()) ";
		str+="		pmyTable.error+='<br><font color=blue>['+Ext.getCmp('"+tmp[i]+"').getFieldLabel().replace('：','')+']</font>不符合规则！';\n";
		str+="}\n";
	}
	//自定义规则验证	
	for (var i=0; pv!=undefined && i<pv.length; i++){
		var rule=myGetOneAttr(pv[i],'rule');
		var title=myGetOneAttr(pv[i],'title');
		//console.log('formrule='+rule);
		if (rule!=''){
			str+="var flag=("+myConvertExpression(rule,'cmp')+");\n";
			str+='if (!flag) ';
			str+="pmyTable.error+='<br>"+title+"！';\n";
		}
	}	
	//console.log(str);			
	return(str);
}

function myGridReplaceValidationSql(xsysdatabasestring,grid,table,pr,pv,records){  //rrrrrp
	//替换表格中的数据和验证数据,生成insert语句
	var xfields=myGetTableEditableFields(xsysdatabasestring,table);
	var kfield=grid.me.keyfield;  //自定义属性
	//var mfield=grid.masterfield;  //主
	//var mvalue=grid.mastervalue;
	for (var i=0; pr!=undefined && i<pr.length; i++){
		var x1=pr[i].xvalue.indexOf("=");
		var s1=pr[i].xvalue.substring(0,x1);
		var s2=pr[i].xvalue.substring(x1+1);
		var s3='';
		var x2=s2.indexOf("?");
		if (x2>=0){
			s3=s2.substring(x2+1);
			s2=s2.substring(0,x2);
		}
		pr[i].x=myConvertExpression(s2,'record');
		pr[i].y=s1;
		pr[i].z=myConvertExpression(s3,'record');;  //条件
		//console.log(pr[i].y+'----'+pr[i].x+'----'+pr[i].z);
	}
	for (var i=0; pv!=undefined && i<pv.length; i++){
		var rule=myGetOneAttr(pv[i],'rule');
		pv[i].x=myConvertExpression(rule,'record');
		pv[i].t=myGetOneAttr(pv[i],'title');		
		//console.log(pv[i].t+'----'+pv[i].x);
	}
	var sql='';  
	var xmsg='';
	//取grid或records中记录
	if (records==undefined || (typeof records)!='object' || records==''){
		var records=grid.getStore().getRange(0,grid.getStore().getCount());
		var rowcount=records.length;
	}else{
		var rowcount=1;
	}
	var n=0;
	//for (var k=0;k<grid.getStore().getCount();k++){  //取记录
	for (var k=0;k<records.length;k++){  //取记录
		var xerror='';
       	//var record=grid.getStore().getAt(k);
       	var record=records[k];
       	//替换数据
       	for (var j=0; pr!=undefined && j<pr.length; j++){
			if (pr[j].z=='') record.set(pr[j].y,eval(pr[j].x));
			else if (eval(pr[j].z)) record.set(pr[j].y,eval(pr[j].x));
		}
		//验证数据,主码为可编辑列not identity
		var kflag=(xfields+';').indexOf(':'+kfield+';');
		//alert(kflag+'---'+kfield+'---'+record.get(kfield)+'---'+xfields);
       	if ((record.get(kfield)!='' && kflag>=0)||(kflag<0)){
	       	for (var j=0; pv!=undefined && j<pv.length; j++){
				var flag=eval(pv[j].x);
				if (!flag) xerror+="<br>第"+(k+1)+"行"+pv[j].t+'！';
			}
			//生成insert语句
	      	if (xerror==''){
	      		sql+=" "+myGenInsertSqlbyRecord(xsysdatabasestring,table,xfields,record)+"\n";
	      		n++;
	      	}
      	}else{
			xerror+="<br>警告：第"+(k+1)+"行空值无效已被过滤。";      	
      	}
      	xmsg+=xerror;
	}
	return(xmsg+sys.tab+sql+sys.tab+k+sys.tab+n);
	//返回内容：出错信息+sql语句+总行数+有效行数
}

function myCursorforSumup(table,keyfield,totalfields){
	var str='';
	var f='',f1='',f2='',f3='',f4='',f5='',f6='',f7='',f8='',f9='',f10='';
	var tmp=totalfields.split(';');
	var k=1;
	for (var i=0;i<tmp.length;i++){
		if (tmp[i]!=''){	
			if (f!='') {
				f+=',';f1+=',';f2+=',';f3+=',';f4+=',';
				f5+=',';f6+=',';f7+=',';f8+=',';f9+=',';
				f10+=',';
			}
			f+=tmp[i];
			f1+='x'+k+' real';
			f2+='0';
			f3+='@x'+k+' real';
			f4+='@y'+k+' real';
			f5+='@x'+k;
			f6+="@y"+k+"=x"+k;
			f7+=tmp[i]+"=@y"+k;
			f8+="x"+k+"=x"+k+"+@y"+k;
			f9+="x"+k+"=0";
			f10+="x"+k+"=x"+k+"+@x"+k;
			k++;
		}
	}
	str+="set nocount on\n";
	str+="declare @t1 table (\n";
	str+="id tinyint identity, "+f1+")\n";
	for (var i=1;i<=10;i++) str+="insert into @t1 values("+f2+")\n";
	str+="declare c1 cursor scroll for \n"; 
	str+="select "+keyfield+",isparentflag,level,"+f+" from "+table+" order by ancester+"+keyfield+"\n";
	str+=" open c1\n"; 
	str+=" declare @s1 varchar(255),@s2 int,@s3 int\n";
	str+=" declare "+f3;
	str+=" declare "+f4;
	str+=" fetch last from c1 into @s1,@s2,@s3,"+f5;
	str+=" while @@FETCH_STATUS=0\n";
	str+=" begin\n";
	str+="   if (@s2=1)\n";
	str+="   begin\n";
	str+="     select "+f6+" from @t1 where id=@s3+1\n";
	str+="     update "+table+" set "+f7+" where current of c1\n";
	str+="     update @t1 set "+f8+" where id=@s3\n";
	str+="     update @t1 set "+f9+" where id=@s3+1\n";  
	str+="   end\n"; 
	str+="   else update @t1 set "+f10+" where id=@s3\n";  
	str+="   fetch prior from c1 into @s1,@s2,@s3,"+f5;
	str+=" end\n";
	str+=" deallocate c1\n";
	return (str);
}

function myDefineRmbBar(parent,name,label,align,height,width){  //定义大写人民币金额控件
	if (label==undefined || label=='') label='人民币合计（大写）：';
	if (width==undefined || width==0) width=620;
	if (height==undefined || height==0) height=30;
	var str='';
	str+="var gridrmbbar_"+parent+"_"+name+"=Ext.create('Ext.form.Panel',{\n";
	str+="id:'gridrmbbar_"+parent+"_"+name+"',frame: true,\n";
    if (height!=undefined && height>0) str+="height: "+height+",\n";
    str+="layout: 'absolute',bodyStyle: 'padding: 5',\n";
	str+="fieldDefaults: {msgTarget:'qtip'},\n";
	str+="items:[{\n";
	str+="xtype: 'displayfield',labelSeparator: '',\n";
	if (label!='')	str+="fieldLabel: '"+label+"',\n";
	str+="id:'rmb_"+parent+"_"+name+"',\n";
	str+="labelWidth:"+(myStrLength(label)*sys.gridcellpix+12)+",";
	if (width!=undefined && width!=0) str+="width: "+(width-200)+",";
	str+="labelAlign:'right',align:'center',x:10,y:0\n";
	str+="},{\n";
	str+="xtype: 'displayfield',labelSeparator: '',	fieldLabel: '',	labelAlign: 'right',align:'center',\n";
	str+="labelWidth: 0,";
	str+="id:'amt_"+parent+"_"+name+"',\n";
	str+="x:"+(width-150)+",y:0,width:200\n";
	str+="}]\n";
	str+="});\n";
	return(str);
}

function mySumGrid(grid,fields){  //xxx将一个store中的多个列相加汇总
	var xfiddim=fields.split(';');
	for (var i=0;i<xfiddim.length;i++){
		eval("var _"+xfiddim[i]+"=0.00;");
	}
	var str="";
	str+="grid.store.each(function(record){";
	for (var i=0;i<xfiddim.length;i++){
		str+="_"+xfiddim[i]+"+=1.0*record.get('"+xfiddim[i]+"')";
	}
	str+="});\n";
	eval(str);
	var result=[];
	for (var i=0;i<xfiddim.length;i++){
		var xdec=0;
		for (j=0;j<grid.columns.length;j++){
			if (grid.columns[j].dataIndex==xfiddim[i]){
				xdec=grid.columns[j].xdec;
				break;
			}
		}
		result[i]=eval("1.0*_"+xfiddim[i]).toFixed(xdec);
	}
	return result;  //返回数组
}	

function mySumRmb(grid,field){  //汇总金额，返回人民币大写
	var result=[];
	var amt=0.0;
	var flag=0;
	style=grid.me.style;  //记录style属性
	if (style=='grandtotal' && grid.store.getCount()>0){
		var r=grid.store.getAt(0);
		//将其它没有显示出来页面的金额加在一起(放在第一行)
		if (r.get('sum_rmb_'+field)!=undefined) amt+=Number(r.get('sum_rmb_'+field));
	}	
	grid.store.each(function(record){
		amt+=Number(record.get(field));
	});
	if (amt>=0){
		result[0]='<b>&nbsp;'+myToRmb(amt.toFixed(2))+'<b>';
		result[1]='￥<b><u>'+amt.toFixed(2)+'&nbsp;</u></b>';
	}else{
		result[0]='<font color=red><b>&nbsp;'+myToRmb(amt.toFixed(2))+'<b></font>';
		result[1]='￥<font color=red><b><u>'+amt.toFixed(2)+'&nbsp;</u></b></font>';
	}
	return result;
}

function mySetSysVars(){  //记录保存前设置系统变量sysdate\sysuser
	var str='';
	//审核标记列的值不能自动修改
	str+="var xaddoredit=Ext.getCmp('addoredit').getValue();\n";
	str+="for (var j=0;pmyForm.sysdatedim!=undefined && j<pmyForm.sysdatedim.length; j++){\n";
	str+="if (pmyTable.document.reviewflag!='' && pmyTable.document.reviewflag!=p.xfielddim[pmyForm.sysdatedim[j]].name){\n";
	str+="if ((xaddoredit=='1' && p.xfielddim[pmyForm.sysdatedim[j]].value=='default') || (xaddoredit=='2' && p.xfielddim[pmyForm.sysdatedim[j]].value!='default')){\n";
	str+="Ext.getCmp(p.xfielddim[pmyForm.sysdatedim[j]].name).setValue(sysdate);\n";
	str+="}\n";
	str+="}\n";	
	str+="}\n";	
	str+="for (var j=0;pmyForm.sysuserdim!=undefined && j<pmyForm.sysuserdim.length; j++){\n";
	str+="if (pmyTable.document.reviewflag!='' && pmyTable.document.reviewflag!=p.xfielddim[pmyForm.sysuserdim[j]].name){\n";
	str+="if ((xaddoredit=='1' && p.xfielddim[pmyForm.sysuserdim[j]].value=='default') || (xaddoredit=='2' && p.xfielddim[pmyForm.sysuserdim[j]].value!='default')){\n";
	str+="Ext.getCmp(p.xfielddim[pmyForm.sysuserdim[j]].name).setValue(sysusername);\n";
	str+="}\n";	
	str+="}\n";
	str+="}\n";
	//console.log(str);
	return(str);
}
///-------------------------------
function myGetTableAttrs(pt,pmyTable){  //pt=p.table[0]获取数据表的各项设置
	pmyTable.tablename='';
  	pmyTable.tabletitle='';
  	pmyTable.keyfield='';
  	pmyTable.keyspec='';
	pmyTable.document={};   //单证变量
	pmyTable.document.datefield='';  //单据日期列
  	pmyTable.document.reviewfields='';  //审核标志列
	pmyTable.document.reviewflag='';  //审核标志列
  	//pmyTable.document.format='';  //订单电脑序号的格式
	pmyTable.tablename=myGetOneAttr(pt,'name');
	pmyTable.tabletitle=myGetOneAttr(pt,'title');
	if (pmyTable.tabletitle=='') pmyTable.tabletitle='记录';
	pmyTable.keyfield=myGetOneAttr(pt,'keyfield');
	pmyTable.sortfield=myGetOneAttr(pt,'sortfield');
	pmyTable.valuefields=myGetOneAttr(pt,'valuefields');
	//单证处理列
	pmyTable.document.datefield=myGetOneAttr(pt,'documentdate'); //单证日期
	pmyTable.document.reviewfields=myGetOneAttr(pt,'reviewfields');  //单证审核列
	pmyTable.document.reviewfielddim=[];
	if (pmyTable.document.reviewfields!=undefined && pmyTable.document.reviewfields!=''){
		pmyTable.document.reviewfielddim=pmyTable.document.reviewfields.split(';');
		pmyTable.document.reviewflag=pmyTable.document.reviewfielddim[0];
	} 
	if (pmyTable.tablename!='') pmyTable.fieldset=myGetSQLFields("select * from "+pmyTable.tablename,pmyTable.sysdatabasestring);  //表中所有列名，包括不可编辑的列
	var pfid={};
	pfid.fields=pmyTable.keyfield;
	pfid=myGetGridColumn(pfid);
	pmyTable.keyfield=pfid.xfield[0];
	pmyTable.keyspec=pfid.xtitle[0];
	pfid.fields=pmyTable.sortfield;
	pfid=myGetGridColumn(pfid);
	pmyTable.sortfield=pfid.xfield[0];
	if (pmyTable.sortfield=='') pmyTable.sortfield=pmyTable.keyfield;
	return pmyTable;
}

function myGetGridAttrs(pt,pmyGrid1){  //pt=p.grid[0]获取表格的各项设置
	pmyGrid1.title='记录列表';
	if (pmyGrid1.tablename==undefined) pmyGrid1.tablename='';
	if (pmyGrid1.tabletitle==undefined) pmyGrid1.tabletitle='';
	if (pmyGrid1.keyfield==undefined) pmyGrid1.keyfield='';
	if (pmyGrid1.sortfield==undefined) pmyGrid1.sortfield='';
	if (pmyGrid1.keyspec==undefined) pmyGrid1.keyspec='';	
	pmyGrid1.titlefont='宋体';	
	pmyGrid1.title=myGetOneAttr(pt,'title');
	pmyGrid1.tablename=myGetOneAttr(pt.table,'name');
	if (pmyGrid1.tablename==undefined || pmyGrid1.tablename==''){
		var xtable=myGetTwoAttrs(pt,'table');
		pmyGrid1.tablename=xtable[0];
		if (xtable.length>1) pmyGrid1.tabletitle=xtable[1];
		//console.log('tt---'+myGetOneAttr(pt,'table'));
	}
  	pmyGrid1.titlefont=myGetOneAttr(pt,'titlefont'); //标题字体名称
	pmyGrid1.align=myGetOneAttr(pt,'align');
	pmyGrid1.sql=myGetOneAttr(pt,'sql');
  	pmyGrid1.keyfield=myGetOneAttr(pt,'keyfield');//提取关键字
  	pmyGrid1.sortfield=myGetOneAttr(pt,'sortfield'); //提取排序列
  	pmyGrid1.valuefields=myGetOneAttr(pt,'valuefields'); //赋值列
  	pmyGrid1.totalfields=myGetOneAttr(pt,'totalfields'); //分级汇总列
	var pfid={};
	pfid.fields=pmyGrid1.keyfield;
	pfid=myGetGridColumn(pfid);  //分离关键字
	pmyGrid1.keyfield=pfid.xfield[0];
	pmyGrid1.keyspec=pfid.xtitle[0];
	pfid.fields=pmyGrid1.sortfield;  
	pfid=myGetGridColumn(pfid); //分离排序列
	pmyGrid1.sortfield=pfid.xfield[0];
  	pmyGrid1.lockedfields=myGetOneAttr(pt,'lockedfields');	//设置固定列		
  	if (pmyGrid1.lockedfields!='') pmyGrid1.lockedfields='sysrowno;'+pmyGrid1.lockedfields;
  	//else pmyGrid1.lockedfields='sysrowno';
	pmyGrid1.pagesize=myGetOneAttr(pt,'pagesize'); //提取grid行数
	if (pmyGrid1.pagesize=='') pmyGrid1.pagesize=0;
	pmyGrid1.style=myGetOneAttr(pt,'style'); //设置编辑模式
	if (pmyGrid1.style=='') pmyGrid1.style='single';
	pmyGrid1.fields=myGetOneAttr(pt,'datafields'); 	//提取列
	pmyGrid1.datafields=pmyGrid1.fields;  //????
	pmyGrid1.nodefields=myGetOneAttr(pt,'nodefields'); 	//提取列
	pmyGrid1.masterfield=myGetOneAttr(pt,'masterfield'); //提取masterfield列
	pmyGrid1.filterfields=myGetOneAttr(pt,'filterfields');  //提取过滤列
	if (pmyGrid1.filterfields=='') pmyGrid1.filterfields=pmyGrid1.datafields;
	//pmyGrid1.nodetextfields=myGetGridNodeTextFields(pmyGrid1);
	pmyGrid1=myGetGridNodeTextFields(pmyGrid1);
	//计算汇总列处理
	pmyGrid1.rmbfield='';
	pmyGrid1.sumfields='';
	pmyGrid1.avgfields='';
	pmyGrid1.countfields='';
	pmyGrid1.maxfields='';
	pmyGrid1.minfields='';
	pmyGrid1.totalstyle='grandtotal'; //汇总方式：每页小计还是全部合计
	pmyGrid1.rmbstyle='grandtotal';  //汇总方式：每页小计还是全部合计
	pmyGrid1.summarycolumn='';
	pmyGrid1.summarycolumnfield='';
	pmyGrid1.summarycolumnlabel='';  //合计
	pmyGrid1.sumfields=myGetOneAttr(pt,'sumfields'); //汇总列
	pmyGrid1.avgfields=myGetOneAttr(pt,'avgfields'); //平均列
	pmyGrid1.countfields=myGetOneAttr(pt,'countfields'); //个数列
	pmyGrid1.maxfields=myGetOneAttr(pt,'maxfields'); //最大值列
	pmyGrid1.minfields=myGetOneAttr(pt,'minfields'); //最小值列
	pmyGrid1.summarycolumn=myGetOneAttr(pt,'summarycolumn'); //汇总列及字符
	var tmp=pmyGrid1.summarycolumn.split('/');
	pmyGrid1.summarycolumnfield=tmp[0];
	if (tmp.length>1) pmyGrid1.summarycolumnlabel=tmp[1];  //合计
	pmyGrid1.locatevalue='';
	pmyGrid1.index=-1;
	pmyGrid1.column=-1;
	pmyGrid1.bbar='';
	pmyGrid1.tbar='';
	pmyGrid1.showline=9;
	pmyGrid1.pagingbar='';
	pmyGrid1.paramsql=pmyGrid1.sql;
	var ar=myGetPosSize(pt);  //提取大小 
	pmyGrid1.height=ar.h;
	pmyGrid1.width=ar.w;
	pmyGrid1.replace=pt.replace;
	pmyGrid1.validation=pt.validation;
	return pmyGrid1;	
}

function myGetReportAttrs(pt,pmyReport1){  //pt=p.report[0]获取报表的各项设置
	var ptemplate=pt.template[0];
	pmyReport1.titlecells='';
	pmyReport1.footercells='';
	pmyReport1.titlerange='';
	pmyReport1.sortfield='';
	pmyReport1.sql='';
	pmyReport1.sql=myGetOneAttr(pt,'sql');
	pmyReport1.sortfield=myGetOneAttr(pt,'sortfield');
	pmyReport1.titlerows=myGetOneAttr(ptemplate,'titlerows');
	pmyReport1.templatename=myGetOneAttr(ptemplate,'name');
	pmyReport1.targetname=myGetOneAttr(ptemplate,'filename');
	pmyReport1.templatetype=myGetOneAttr(ptemplate,'type');
	return pmyReport1;	
}

function myConvertExpression(exp,type){  //转换表达式，分表格record和表单form getcmp两种
	//<=100 !>100 a=b?c>100
	var flag='/*-+()=,!..><|& ';
	var str='';
	var x1=0;
	var x2=0;
	var s2=''
	var s1='';
	exp=exp.replace(/ and /g,' && ');
	exp=exp.replace(/ or /g,' || ');
	exp=exp.replace(/!>/g,'<=');
	exp=exp.replace(/!</g,'>=');
	for (var i=0;i<exp.length;i++){
		s1=exp.substr(i,1);
		if (flag.indexOf(s1)>=0){
			s2=exp.substring(x1,i);
			s3=s2.substr(0,1).toLowerCase();
			if (s1!='(' && s3>='a' && s3<='z'){
				if (type=='record')	str+="record.get('"+s2+"')";
				else str+="Ext.getCmp('"+s2+"').getValue()";
			}else str+=s2;
			str+=s1;
			x1=i+1;
		}
	}
	if (i>=exp.length && x1<i){
		s2=exp.substring(x1);
		s3=s2.substr(0,1).toLowerCase();
		if (s1!='(' && s3>='a' && s3<='z'){
			if (type=='record')	str+="record.get('"+s2+"')";
			else str+="Ext.getCmp('"+s2+"').getValue()";
		}else str+=s2;
	}	
	//console.log(str);
	return(str);
}

function myGetTreeAttrs(pd,pmyTree1){
	pmyTree1.title='记录';		
	pmyTree1.fields='';
	pmyTree1.align='center';
	if (pd!=undefined){
		pmyTree1.tablename='';
		pmyTree1.tabletitle='';
		pmyTree1.keyfield='';
		pmyTree1.sortfield='';
		pmyTree1.keyspec='';	
		pmyTree1.rowheight=24;
		pmyTree1.pagesize=0;
		pmyTree1.title=myGetOneAttr(pd,'title');
		var xtable=myGetTwoAttrs(pd,'table');
		pmyTree1.tablename=xtable[0];
		if (xtable.length>1) pmyTree1.tabletitle=xtable[1];
		//pmyTree1.tablename=myGetOneAttr(pd,'table');
		pmyTree1.fields=myGetOneAttr(pd,'datafields');  //表格显示模式
		pmyTree1.nodefields=myGetOneAttr(pd,'nodefields'); //节点显示模式
		pmyTree1.datafields=pmyTree1.fields; //节点显示模式
		pmyTree1.sql=myGetOneAttr(pd,'sql');
		pmyTree1.align=myGetOneAttr(pd,'align');
		pmyTree1.filterfields=myGetOneAttr(pd,'filterfields');
		pmyTree1.sortfield=myGetOneAttr(pd,'sortfield');
		pmyTree1.rowheight=myGetOneAttr(pd,'rowheight');
		pmyTree1.keyfield=myGetOneAttr(pd,'keyfield');
		pmyTree1.pagesize=myGetOneAttr(pd,'pagesize');
		var tmp=myGetPosSize(pd);
		pmyTree1.height=tmp.h;
		pmyTree1.width=tmp.w;
		var pfid={};
		pfid.fields=pmyTree1.keyfield;
		pfid=myGetGridColumn(pfid);
		pmyTree1.keyfield=pfid.xfield[0];
		pmyTree1.keyspec=pfid.xtitle[0];
		pfid.fields=pmyTree1.sortfield;
		pfid=myGetGridColumn(pfid);
		pmyTree1.sortfield=pfid.xfield[0];
		if (pmyTree1.sortfield=='') pmyTree1.sortfield=pmyTree1.keyfield;
	 	//pmyTree1.nodetextfields=myGetTreeNodeTextFields(pmyTree1);
	}
	//console.log(pmyTree1);
	return pmyTree1;
}

function myGetFormAttrs(p,pform){
	pform.tabstr='';  //返回命令行
	pform.groupboxstr='';  //返回命令行
	pform.fieldstr='';  //返回命令行
	pform.eventstr='';  //返回事件定义命令行
	pform.gridcmpstr='';  //返回非form下的其他控件
	pform.reportcmpstr='';  //返回非form下的其他控件
	pform.sql='';
	pform.height=0;
	pform.width=0;
	pform.pagecount=0
	pform.panels='';
	pform.title='记录详情';
	pform.modal='';
	pform.align='center';
	pform.filterfields='';
	pform.sql='';
	pform.hiddenfields='';	
	pform.rowheight=32;
	var pf=p.form[0];
	if (pf!=undefined){
		pform.title=myGetOneAttr(pf,'title');
		pform.modal=myGetOneAttr(pf,'modal');
		pform.align=myGetOneAttr(pf,'align');		
		pform.sql=myGetOneAttr(pf,'sql');
		pform.filterfields=myGetOneAttr(pf,'filterfields');
		var ar=myGetAttrs(pf);
		pform.height=ar.h;
		pform.width=ar.w;
		pform.labelwidth=ar.labelwidth;
		for (var i=0;i<p.xfielddim.length;i++){
			var pf=p.xfielddim[i];
			var xtype=pf.type.toLowerCase();
			//console.log('tabi='+i+'----'+xtype+'---'+pf.name+'---'+pf.parent);
			if (xtype=='tab'){
				if (typeof pf.name=='string') var xname=pf.name;
				else var xname=pf.attrs.name;
				var title='';
				//xname;以tab开头，将tab转换成myForm
				var xid='myForm'+xname.substring(3);  //表单名次改为myForm*
				if (pform.panels!='') pform.panels+=',';
				pform.panels+=xid+'Panel';
				var ar={};
				ar.h=0; ar.w=0; ar.labelwidth=0;
				if (pf.attrs!=undefined){ 
					if (pf.attrs.title!=undefined){
						if (typeof pf.attrs.title == 'object'){
							title=pf.attrs.title[0].xvalue;
						}else{
							title=pf.attrs.title;
						}	
					}
					ar=myGetAttrs(pf.attrs);
				}else{
					ar=myGetAttrs(pf);  //直接取值，用于mycompileform
				}
				pform.tabstr+='\n'+myDefineForm(xid,'center',ar.h,ar.w,ar.labelwidth,'false');
				pform.tabstr+='\n'+myDefinePanel(xid+'Panel',title,'['+xid+']',0,0,'false','');
				pform.pagecount++;				
			}
		}
		if (pform.pagecount==0){
			pform.tabstr+='\n'+myDefineForm('myForm1','center',pform.height,pform.width,pform.labelwidth,'false');
			pform.tabstr+='\n'+myDefinePanel('myForm1Panel',pform.title,'[myForm1]',0,0,'false','');
			pform.pagecount=1;
			pform.panels='myForm1Panel';
		}	
		//定义表单中的groupbox控件		
		for (var i=0;i<p.xfielddim.length;i++){
			var pf=p.xfielddim[i];
			var xtype=pf.type.toLowerCase();
			var title='';
			//console.log('groupcmpi='+i+'----'+xtype+'---'+pf.name+'---'+pf.parent);
			if (xtype=='groupbox'){
				//其parent值一定为tab*或form*
				if (pf.parent.substring(0,3)=='tab'){
					var xparent='myForm'+pf.parent.substring(3);
				}else{ //form*
					var xparent='myForm'+pf.parent.substring(4);
				}
				if (pf.name!=undefined) var xname=pf.name;
				else var xname=pf.attrs.name;
				//groupbox*转换成myfieldset*
				var xid='myFieldset'+xname.substring(8);
				eval("pform."+xid+"=xparent;"); //记录myFieldset*对应的form的名称
				if (pf.attrs.title!=undefined){
					if (typeof pf.attrs.title == 'object'){
						title=pf.attrs.title[0].xvalue;
					}else{
						title=pf.attrs.title;
					}	
				}
				var ar=myGetAttrs(pf.attrs);
				pform.groupboxstr+='\n'+myDefineFieldSet(xparent,xid,title,ar.y,ar.x,ar.h,ar.w,ar.labelwidth);
				//console.log(xparent+'---'+xtype+'----'+title+'---'+xid);
			}
		}
		pform.parentform=[];	
		pform.fileloadbutton='';  //上传控件按钮的设置
		pform.filedownloadsetbutton='';
		pform.columncombodim=[];
		pform.columntextpickerdim=[];
		//生成一般控件
		for (var i=0;i<p.xfielddim.length;i++){
			var pf=p.xfielddim[i];
			var xtype=pf.type.toLowerCase();
			var parent=pf.parent;  //其parent值为tab*,groupbox*
			if (pf.name!=undefined) var name=pf.name;
			else var name=pf.attrs.name;
			if (name!=undefined) name=name.toLowerCase();
			//console.log('cmpi='+i+'----'+xtype+'---'+pf.name+'---'+pf.parent);
			var form='myForm1';//控件所在的表单
			if (parent!=undefined && parent.substring(0,8)=='groupbox'){
				parent='myFieldset'+parent.substring(8);
				form=eval("pform."+parent);	
				//var c=Ext.getCmp(parent).ownerCt; //控件的父类容器
				//if (c!=undefined && c!=null) form=c.name;
				//console.log(name+'---'+form+'---'+parent); 
			}else if (parent!=undefined && parent.substring(0,4)=='form'){
				parent='myForm'+parent.substring(4);
				form=parent;
			}else if (parent!=undefined && parent.substring(0,3)=='tab'){
				parent='myForm'+parent.substring(3);
				form=parent;
			}else{
				form='';
			}
			//console.log(xtype+'---'+name+'---form---'+form);
			//console.log(pf);
			var ar={};
			if (pf.attrs==undefined){  //aaaaaa用于自编译的表单mycompileformfields
				ar=myGetPosSize(pf);  //取位置与大小参数
				for (var j=0;j<sys.xattrs.length;j++){
					var str="var "+sys.xattrs[j]+"='';"
					str+="if (pf."+sys.xattrs[j]+"!=undefined) "+sys.xattrs[j]+"=pf."+sys.xattrs[j]+";";
					eval(str);
					//console.log(str);
				}
			}else{
				ar=myGetAttrs(pf.attrs);
				//取属性
				for (var j=0;j<sys.xattrs.length;j++){
					var str="var "+sys.xattrs[j]+"='';"
					str+="if (ar."+sys.xattrs[j]+"!=undefined) "+sys.xattrs[j]+"=ar."+sys.xattrs[j]+";";
					eval(str);
					//console.log(str);
				}
			}
			//console.log('f===='+xtype+'---'+name+'---'+pf.pos+'---'+pf.size+'---'+pf.label);
			var top=ar.y;
			var left=ar.x;
			var height=ar.h;
			var width=ar.w;
			var maxlength=length;
			var fieldset=name;
			if (valuefields!=undefined){
				fieldset+=';'+valuefields;
			}
			if (form!=''){  //排除form之外的控件，如detailgrid标签之下的combo
				//处理系统变量
				if (value=='sysdate') value=sysdate;
				else if (value=='sysusername' || value=='sysuser') value=sysusername;
				//var font='';
				pform.fieldstr+='\n';
				if (xtype=='textfield' || xtype=='text' || xtype=='editfield'){
					pform.fieldstr+=myDefineTextField(parent,name,label,labelwidth,top,left,width,maxlength,blanktext);
					xtype='textfield';
				}else if (xtype=='keyfield'){
					pform.fieldstr+=myDefineTextField(parent,name,label,labelwidth,top,left,width,maxlength,blanktext);
					pform.keyfield=name;
					if (label!='') pform.keyspec=label;
					xtype='keyfield';
				}else if (xtype=='decimalfield' || xtype=='number' || xtype=='numberfield'){
					pform.fieldstr+=myDefineDecimalField(parent,name,label,labelwidth,top,left,width,value,decimal,maxvalue,minvalue);
					xtype='decimalfield';
				}else if (xtype=='spinfield' || xtype=='spinner'){
					pform.fieldstr+=myDefineSpinField(parent,name,label,labelwidth,top,left,width,value,maxv,minv);
					xtype='spinfield';
				}else if (xtype=='combo' || xtype=='combobox' || xtype=='combox'){
					xtype='combo';
					if (sql=='' && items!=''){
						pform.fieldstr+=myDefineSimpleCombox(parent,name,label,labelwidth,top,left,width,items,fieldset,value); 				
					}else if (sql!=''){
						pform.fieldstr+=myDefineCombox(parent,name,label,labelwidth,top,left,width,sql,fieldset,value);
						p.xfielddim[i].sql=sql;
						if (masterfield!=undefined && masterfield!='') p.xfielddim[i].masterfield=masterfield;
						if (valuefields!=undefined && valuefields!='') p.xfielddim[i].valuefields=valuefields;
					}
				}else if (xtype=='datefield' || xtype=='date'){
					pform.fieldstr+=myDefineDateField(parent,name,label,labelwidth,top,left,width,blanktext,value,minvalue,maxvalue);			
					xtype='datefield';
				}else if (xtype=='passwordfield' || xtype=='password'){
					pform.fieldstr+=myDefinePasswordField(parent,name,label,labelwidth,top,left,width,maxlength,blanktext);
					xtype='password';
				}else if (xtype=='textpicker'){  //form内
					pf.attrs.grid[0].keyfield=name+'/'+label.replace('：','').replace(':','').replace(' ','');
					pf.attrs.grid[0].valuefields=valuefields;
					pf.attrs.grid[0].parent=form;
					pf.attrs.grid[0].parenttype='form';  //grid行选中后赋值给表单控件
					pf.attrs.grid[0].editmodel=style;  //text是否只读
					p.xfielddim[i].grid=pf.attrs.grid[0];
					pform.fieldstr+=myDefineFormGridPicker(parent,name,label,labelwidth,top,left,width,maxlength,blanktext,pf.attrs.grid[0]);
					xtype='textpicker';
				}else if (xtype=='readonlyfield' || xtype=='readonly' || xtype=='displayfield'){
					pform.fieldstr+=myDefineReadOnlyField(parent,name,label,labelwidth,top,left,width,value);			
					xtype='readonlyfield';
				}else if (xtype=='memofield' || xtype=='memo'){
					pform.fieldstr+=myDefineMemoField(parent,name,label,labelwidth,top,left,height,width,maxlength,blanktext);
					xtype='memofield';
				}else if (xtype=='fileuploadfield' || xtype=='fileupload'){
					if (filename==undefined || filename=='') filename=name+'source';
					p.xfielddim[i].filename=filename;
					pform.fieldstr+=myDefineFileUpLoad(parent,name,filename,form,label,labelwidth,top,left,height,width);
					if (pform.fileloadbutton!='') pform.fileloadbutton+=';';
					pform.fileloadbutton+=name+'cmdup;'+name+'icon';
					xtype='fileupload';
				}else if (xtype=='filedownloadfield' || xtype=='filedownload'){
					if (filename==undefined || filename=='') filename=name+'source';
					p.xfielddim[i].filename=filename;
					pform.fieldstr+=myDefineFileDownLoad(parent,name,filename,form,label,labelwidth,top,left,height,width);
					//if (pform.fileloadbutton!='') pform.fileloadbutton+=';';
					//pform.fileloadbutton+=name+'cmddown;'+name+'icon';
					/*
					pform.filedownloadsetbutton+="if (Ext.getCmp('"+name+"').getValue()!=''){\n";
					pform.filedownloadsetbutton+="	if (Ext.getCmp('"+filename+"').getValue()==''){\n"; 
					pform.filedownloadsetbutton+="		Ext.getCmp('"+filename+"').setValue(substring(Ext.getCmp('"+name+"').getValue(),Ext.getCmp('"+name+"').getValue().lastIndexOf('/')+1));\n"; 
					pform.filedownloadsetbutton+="	}\n"; 
					pform.filedownloadsetbutton+="	Ext.getCmp('"+name+"cmddown').setDisabled(false);\n"; 
					pform.filedownloadsetbutton+="}else{\n"; 
					pform.filedownloadsetbutton+="	Ext.getCmp('"+name+"cmddown').setDisabled(true);\n"; 
					pform.filedownloadsetbutton+="}\n";
					*/ 
					xtype='filedownload';
				}else if (xtype=='fileloadfield' || xtype=='fileload'){
					if (filename==undefined || filename=='') filename=name+'source';
					p.xfielddim[i].filename=filename;
					pform.fieldstr+=myDefineFileUpDownLoad(parent,name,filename,form,label,labelwidth,top,left,height,width);
					if (pform.fileloadbutton!='') pform.fileloadbutton+=';';
					//pform.fileloadbutton+=name+'cmdup;'+name+'cmddown;'+name+'icon';
					xtype='fileload';
				}else if (xtype=='imageuploadfield' || xtype=='imageupload'){
					pform.fieldstr+=myDefineImageUpLoad(parent,name,filename,form,label,labelwidth,top,left,height,width,checkbox);
					if (pform.fileloadbutton!='') pform.fileloadbutton+=';';
					pform.fileloadbutton+=name+'cmdup;'+name+'icon';
					xtype='imageupload';
				}else if (xtype=='checkboxfield' || xtype=='checkbox'){
					pform.fieldstr+=myDefineCheckField(parent,name,label,labelwidth,top,left,value); 			
					xtype='checkbox';
				}else if (xtype=='linkfield' || xtype=='link'){
					pform.fieldstr+=myDefineLinkField(parent,name,label,labelwidth,top,left,width,url); 			
					xtype='linkfield';
				}else if (xtype=='imagefield' || xtype=='image'){
					pform.fieldstr+=myDefineImageField(parent,name,filename,top,left,height,width);
					xtype='image';
				}else if (xtype=='label'){
					pform.fieldstr+=myDefineLabel(parent,name,label,top,left,width,font);
				}else if (xtype=='labelfield'){
					pform.fieldstr+=myDefineLabelField(parent,name,label,labelwidth,top,left,width,value,font);
					pform.fieldstr+="Ext.getCmp('"+name+"').style={textDecoration:'underline'};";
				}else if (xtype=='button'){
					eval(myDefineButton(parent,name,label,top,left,height,width));
				}else if (xtype=='sysdate'){
					pform.fieldstr+=myDefineReadOnlyField(parent,name,label,labelwidth,top,left,width,'');
					if (value=='default') p.xfielddim[i].value=value;
					else p.xfielddim[i].value='';
				}else if (xtype=='sysuser' || xtype=='sysusername'){
					pform.fieldstr+=myDefineReadOnlyField(parent,name,label,labelwidth,top,left,width,'');
					if (value=='default') p.xfielddim[i].value=value;
					else p.xfielddim[i].value='';
					xtype='sysuser';
				}else if (xtype=='sysnumber'){  //ssss凭证自动产生的电脑序号
					pform.fieldstr+=myDefineReadOnlyField(parent,name,label,labelwidth,top,left,width,'');
					p.xfielddim[i].format=format;			
					p.xfielddim[i].style=style;			
					xtype='sysnumber';
					//定义日期事件
					var str="Ext.getCmp(pmyTable.document.datefield).on('blur',function(field){\n";
					str+="if ((Ext.getCmp('addoredit').getValue()=='1' || Ext.getCmp('"+name+"').getValue()=='') && Ext.getCmp(pmyTable.document.datefield).isValid()){\n";
					str+="var xcode=myGensysNumber(field.value,'"+format+"',pmyTable);\n";
					str+="Ext.getCmp('"+name+"').setValue(xcode);\n";
					str+="}\n";
					str+="});\n";
					str+="Ext.getCmp(pmyTable.document.datefield).on('specialkey',function(field,e){\n";
					str+="if (e.getKey()==13) {\n";
					str+="Ext.getCmp(pmyTable.document.datefield).fireEvent('blur',Ext.getCmp(pmyTable.document.datefield),field);\n";
					str+="}";
					str+="});\n";
					pform.eventstr+=str+"\n";
					//console.log(str);
				}else{
					xtype='';
				}
				if (xtype!=''){
					//用数组记录每个类型的个数，例如pform.combodim,pform.textfielddim...
					eval("if (pform."+xtype+"dim==undefined) pform."+xtype+"dim=[];");
					eval("pform."+xtype+"dim[pform."+xtype+"dim.length]=i;");
					p.xfielddim[i].type=xtype;
					pform.fieldstr+="\n";
				}				
				//console.log(xtype+'---'+pf.parent+'---'+parent+','+name+','+label+','+labelwidth+','+top+','+left+','+width+','+length+','+blanktext);
			}else{   //form==''form之外的控件
				//提取grid之下的combo,gridpicker等的属性
				var xtype=pf.type.toLowerCase();
				//console.log(pf);
				var xparent=pf.parent.toLowerCase();
				var index='';
				var xparenttype='';
				if (xparent.substring(0,4)=='grid'){
					index='pmyGrid'+xparent.substring(4);
					xparenttype='grid';
				}else if (xparent.substring(0,10)=='detailgrid'){
					index='pmyItemGrid'+xparent.substring(10);
					xparenttype='grid';
				}else if (xparent.substring(0,6)=='report'){
					index='pmyReport'+xparent.substring(6);
					xparenttype='report';
				}else if (xparent.substring(0,6)=='footer'){
					index='pmyFooter'+xparent.substring(6);
					xparenttype='footer';
				}
				//console.log(name+'---'+xtype+'---'+index);
				if (index!=''){	//存在grid之下的其他控件
					//console.log('index='+index+'--'+sql+'--'+items);
					if (xtype=='combo' && xparenttype=='grid'){
						if (sql!=undefined && sql!='') pform.gridcmpstr+=index+'.'+name+'_sql="'+sql+'";\n';
						if (items!=undefined && items!='') pform.gridcmpstr+=index+'.'+name+'_items="'+items+'"\n';
						if (valuefields!=undefined) pform.gridcmpstr+=index+'.'+name+'_valuefields="'+valuefields+'";\n';
						if (masterfield!=undefined && masterfield!='') p.xfielddim[i].masterfield=masterfield;
						if (valuefields!=undefined && valuefields!='') p.xfielddim[i].valuefields=valuefields;
						p.xfielddim[i].parent=index.substring(1);
						p.xfielddim[i].sql=sql;
						pform.columncombodim[pform.columncombodim.length]=i;
					}else if (xtype=='textpicker' && xparenttype=='grid'){  //grid内form之外
						pf.attrs.grid[0].keyfield=name+'/'+label.replace('：','').replace(':','').replace(' ','');
						pf.attrs.grid[0].valuefields=valuefields;
						pf.attrs.grid[0].parenttype='record';  //grid行选中后赋值给数据表中记录的列
						pf.attrs.grid[0].editmodel=style;  //text是否只读
						pf.attrs.grid[0].parent=index.substring(1);
						if (pf.attrs.grid[0].table!=undefined && pf.attrs.grid[0].table!='') pf.attrs.grid[0].tablename=table;
						pf.attrs.grid[0].name=name;
						p.xfielddim[i].grid=pf.attrs.grid[0];
						pform.fieldstr+=myDefineColumnGridPicker(pf.attrs.grid[0]);
						pform.columntextpickerdim[pform.columntextpickerdim.length]=i;
					}else if (xtype=='rmb' && xparenttype=='grid'){  //人民币大写，grid内form之外
						xparent=index.substring(1);
						pform.gridcmpstr+=myDefineRmbBar(xparent,name,align,height,width);
						pform.gridcmpstr+=index+".fbar='gridrmbbar_"+xparent+"_"+name+"';";  //显示在grid的fbar中
						//定义grid的edit事件，实时汇总数据
						var str='';					
						str+=xparent+".on('edit',function(editor, e){\n";
						str+="var field=e.field;\n";
						str+=xparent+".me.style="+index+".rmbstyle;\n";  //自定义属性
					    str+="var result=mySumRmb("+xparent+",'"+name+"');\n"
						str+="Ext.getCmp('rmb_"+xparent+"_"+name+"').setValue(result[0]);\n";
						str+="Ext.getCmp('amt_"+xparent+"_"+name+"').setValue(result[1]);\n";
						str+="});\n";
						//定义grid的load事件，表格加载时显示汇总数据
						str+=xparent+".store.on('load',function(store){\n";
						str+=xparent+".me.style="+index+".rmbstyle;\n";  //自定义属性
					    str+="var result=mySumRmb("+xparent+",'"+name+"');\n"
						str+="Ext.getCmp('rmb_"+xparent+"_"+name+"').setValue(result[0]);\n";
						str+="Ext.getCmp('amt_"+xparent+"_"+name+"').setValue(result[1]);\n";
						str+="});\n";
						pform.gridcmpstr+=index+".rmbfield='"+name+"';\n";  //汇总
						if (style=='') style='grandtotal';
						pform.gridcmpstr+=index+".rmbstyle='"+style+"';\n";  //汇总方式：单页合计还是全部合计
						pform.eventstr+=str;
						//console.log(str);
					}else if (xtype=='summaryfields' && xparenttype=='grid'){  //grid内form之外的分页汇总
						xparent=index.substring(1);
						pform.gridcmpstr+=index+".sumfields+=';"+sumfields+"';\n";
						pform.gridcmpstr+=index+".countfields+=';"+countfields+"';\n";
						pform.gridcmpstr+=index+".avgfields+=';"+avgfields+"';\n";
						pform.gridcmpstr+=index+".maxfields+=';"+maxfields+"';\n";
						pform.gridcmpstr+=index+".minfields+=';"+minfields+"';\n";
						if (style=='') style='grandtotal';
						pform.gridcmpstr+=index+".totalstyle='"+style+"';\n";  //汇总方式：单页合计还是全部合计
						if (label!='') pform.gridcmpstr+=index+".summarycolumnlabel='"+label+"';\n";
						if (name!='') pform.gridcmpstr+=index+".summarycolumnfield='"+name+"';\n";
					}else if (xtype=='totalfields' && xparenttype=='grid'){  //分级汇总的字段名
						//pform.gridcmpstr+=index+".totalfields='"+name+"'";
					}else if(xparenttype=='report' || xparenttype=='footer'){  //报表report/rrrrrrr
						var s1='';
						if (xtype=='sysdate'){
							s1="('"+format+"').replace('yyyy',sys.year).replace('mm',sys.month).replace('dd',sys.day)";
						}else if (xtype=='sysuser'){ 
							s1="sysusername";
						}else if (xtype=='syspageno'){
							if (format!='') s1="'"+format+"'";
							else s1="'第#pageno页共#pagecount页'";
						}else if (xtype=='label'){
							if (text!='') s1="'"+text+"'";
							else if (value!='') s1="'"+value+"'";
						}else if (xtype=='textfield'){
							s1="'"+label+"'+Ext.getCmp('"+name+"').getValue()";
						}
						if (s1!=''){
							if (xparenttype=='footer'){
								var s2='l';
								if (align=='right') s2='r';
								else if (align=='center') s2='c';
								pform.reportcmpstr+="if ("+index+".footercells!='')"+index+".footercells+=';';\n";
								pform.reportcmpstr+=" "+index+".footercells+='<"+s2+">'+"+s1+";\n";
							}else if (xparenttype=='report') {
								pform.reportcmpstr+="if ("+index+".titlecells!='')"+index+".titlecells+=';';\n";
								pform.reportcmpstr+=" "+index+".titlecells+='<"+top+','+left+">'+"+s1+";\n";
							}
						}
					}
				//console.log(pform.reportcmpstr);
				//console.log(pform.gridcmpstr);	
				}
			}
		}
		//特殊处理1. 提交附件fileload的id值设置
		pform.fileuploadsetid='';
		for (var j=0;pform.fileuploaddim!=undefined && j<pform.fileuploaddim.length;j++){
			var fn=p.xfielddim[pform.fileuploaddim[j]].name;
			pform.fileuploadsetid+="Ext.getCmp('"+fn+"id').setValue(xid);\n";
		}
		for (var j=0;pform.fileloaddim!=undefined && j<pform.fileloaddim.length;j++){
			var fn=p.xfielddim[pform.fileloaddim[j]].name;
			pform.fileuploadsetid+="Ext.getCmp('"+fn+"id').setValue(xid);\n";
		}
		for (var j=0;pform.imageuploaddim!=undefined && j<pform.imageuploaddim.length;j++){
			var fn=p.xfielddim[pform.imageuploaddim[j]].name;
			pform.fileuploadsetid+="Ext.getCmp('"+fn+"id').setValue(xid);\n";
		}
		if (pform.fileuploadsetid!=''){  //主键变化，上传文件名称设置
			var str='';
			str+="Ext.getCmp(pmyTable.keyfield).on('change',function(field){\n";
			str+="if (field.value!='') var str=\"var xid=syspath.\"+pmyTable.tablename+\"+'\"+pmyTable.tablename+\"_'+field.value;\";\n";
			str+="else var str=\"var xid=syspath.\"+pmyTable.tablename+\"+'\"+pmyTable.tablename+\"_0';\";\n";
			str+="eval(str);\n";
			str+=pform.fileuploadsetid+"\n";
			str+="});\n";
			pform.eventstr+=str+"\n";
			//console.log(str);
		}
		//console.log(pform.filedownloadsetbutton);
		//特殊处理2. form表单中的combobox联动处理,定义下拉框的联动效应事件
		for (var j=0;pform.combodim!=undefined && j<pform.combodim.length;j++){
			if (p.xfielddim[pform.combodim[j]].masterfield!=undefined && p.xfielddim[pform.combodim[j]].masterfield!=''){
				//var str="Ext.getCmp('"+p.xfielddim[pform.combodim[j]].masterfield+"').addListener('change',function(){\n";
				var str="Ext.getCmp('"+p.xfielddim[pform.combodim[j]].masterfield+"').on('change',function(field){\n";
				str+="if (Ext.getCmp('"+p.xfielddim[pform.combodim[j]].name+"').getValue()!='') Ext.getCmp('"+p.xfielddim[pform.combodim[j]].name+"').setValue('');\n";
				str+="});\n";
				str+=p.xfielddim[pform.combodim[j]].name+".store.addListener('beforeload',function(store){\n";
				str+="Ext.getCmp('"+p.xfielddim[pform.combodim[j]].name+"').clearValue();\n";
				str+="delete Ext.getCmp('"+p.xfielddim[pform.combodim[j]].name+"').lastQuery;\n";
				str+="var xid=Ext.getCmp('"+p.xfielddim[pform.combodim[j]].masterfield+"').getValue();\n";
				var s="select * from ("+p.xfielddim[pform.combodim[j]].sql+") as p where "+p.xfielddim[pform.combodim[j]].masterfield;
				str+='var sql="'+s+" = '\"+xid+\"'\";\n";
				str+="store.proxy.url='system//fn_getComboxData.jsp';\n";
				str+="var newparams={ database:sysdatabasestring, sqlString:sql };\n";
				str+="Ext.apply(store.proxy.extraParams,newparams);\n";
				str+="});\n";
				//console.log(str);
				pform.eventstr+=str+"\n";
			}	
		}
		//下拉框select选择事件，控件名称为name+ComboSelect
		var str='';
		for (var j=0;pform.combodim!=undefined && j<pform.combodim.length;j++){
			str+="function fn"+p.xfielddim[pform.combodim[j]].name+"ComboSelect(combo, records, index) {\n";
			str+="if (records[0]) {\n";
			if (p.xfielddim[pform.combodim[j]].valuefields!=undefined && p.xfielddim[pform.combodim[j]].valuefields!=''){
				var tmp=p.xfielddim[pform.combodim[j]].valuefields.split(';');
				for (k=0;k<tmp.length;k++){
					str+="Ext.getCmp('"+tmp[k]+"').setValue(records[0].get('"+tmp[k]+"'));";
				}
			}	
			str+="}}\n";
		}
		pform.eventstr+=str+"\n";
		//特殊处理3. 生成可编辑grid中的columncombo事件和联动效应，在store中添加事件，名称为grid.name+ColumnStore_+name
		for (var j=0;pform.columncombodim!=undefined && j<pform.columncombodim.length;j++){
			if (p.xfielddim[pform.columncombodim[j]].masterfield!=undefined && p.xfielddim[pform.columncombodim[j]].masterfield!=''){
				var str='';
				var xmasterfield=p.xfielddim[pform.columncombodim[j]].parent+p.xfielddim[pform.columncombodim[j]].masterfield+'Column';
				var xname=p.xfielddim[pform.columncombodim[j]].parent+p.xfielddim[pform.columncombodim[j]].name+'Column';
				var xstore=p.xfielddim[pform.columncombodim[j]].parent+'ColumnStore_'+p.xfielddim[pform.columncombodim[j]].name;
				var sql=p.xfielddim[pform.columncombodim[j]].sql;
				if (p.xfielddim[pform.columncombodim[j]].masterfield!=undefined && p.xfielddim[pform.columncombodim[j]].masterfield!=''){
					var str="Ext.getCmp('"+xmasterfield+"').on('change',function(field){\n";
					str+="var r="+p.xfielddim[pform.columncombodim[j]].parent+".store.getAt(p"+p.xfielddim[pform.columncombodim[j]].parent+".index);\n";
					str+="if (r) r.set('"+p.xfielddim[pform.columncombodim[j]].name+"','');\n";
					str+="});\n";
				}
				str+=xstore+".on('beforeload',function(store){\n";
				str+="delete Ext.getCmp('"+xname+"').lastQuery;\n";
				str+="var r="+p.xfielddim[pform.columncombodim[j]].parent+".store.getAt(p"+p.xfielddim[pform.columncombodim[j]].parent+".index);\n";
				str+="var xid=r.get('"+p.xfielddim[pform.columncombodim[j]].masterfield+"');";
				var s="select * from ("+p.xfielddim[pform.columncombodim[j]].sql+") as p where "+p.xfielddim[pform.columncombodim[j]].masterfield;
				str+='var sql="'+s+" = '\"+xid+\"'\";\n";
				//str+="console.log('sql='+sql);";
				str+="store.proxy.url='system//fn_getComboxData.jsp';\n";
				str+="var newparams={ database:sysdatabasestring, sqlString:sql };\n";
				str+="Ext.apply(store.proxy.extraParams,newparams);\n";
				str+="});\n";
				//console.log(str);
				pform.eventstr+=str+"\n";
			}	
		}
		//特殊处理4.生成可编辑grid中的columncombo下拉框选择事件,事件名称为fnColumnComboSelect
		//record[0]中的列名为数据库列名，不加myGrid1和Column标识
		var str='function fnColumnComboSelect(combo,records,index){\n';
		str+="if (records[0]) {\n";
		str+="var id=combo.id;\n";  //id为titleColumn
		for (var j=0;pform.columncombodim!=undefined && j<pform.columncombodim.length;j++){
			var xmasterfield=p.xfielddim[pform.columncombodim[j]].masterfield;
			var xname=p.xfielddim[pform.columncombodim[j]].parent+p.xfielddim[pform.columncombodim[j]].name+'Column';
			if (p.xfielddim[pform.columncombodim[j]].valuefields!=undefined && p.xfielddim[pform.columncombodim[j]].valuefields!=''){
				str+="if (id=='"+xname+"'){\n";
				str+="var r="+p.xfielddim[pform.columncombodim[j]].parent+".store.getAt(p"+p.xfielddim[pform.columncombodim[j]].parent+".index);\n";
				var tmp=p.xfielddim[pform.columncombodim[j]].valuefields.split(';');
				for (k=0;k<tmp.length;k++){
					var xfield=p.xfielddim[pform.columncombodim[j]].parent+tmp[k]+"Column";
					if (pform.hiddenfields!='') pform.hiddenfields+=';'
					pform.hiddenfields+=xfield;
					str+="Ext.getCmp('"+xfield+"').setValue(records[0].get('"+tmp[k]+"'));\n";
					str+="if (r) r.set('"+tmp[k]+"',records[0].get('"+tmp[k]+"'));\n";
				}
				str+="}\n";
			}
		}
		str+="}}\n";
		//console.log(str);
		pform.eventstr+=str+"\n";
		//特殊处理5.生成可编辑grid的数据替换、验证与汇总事件 		
		//将pform中的columntextpicker内容赋值到parent对应的pmyGrid*中去
		//alert(pform.columntextpickerdim[0]);
		//console.log(p.xfielddim[45].grid);
		pform.gridpickercolumns='';  //记录picker列，在生成grid时指定类型
		pform.treepickercolumns='';
		str='';
		for (var j=0;pform.columntextpickerdim!=undefined && j<pform.columntextpickerdim.length;j++){
			var grid=p.xfielddim[pform.columntextpickerdim[j]].grid;
			var parent=grid.parent;
			var field=grid.name;
			pform.gridpickercolumns+=';'+parent+'/'+field;
			str+=parent+".on('edit', function(editor, e, eOpts){\n";
			str+="var field = e.field;\n";
			str+="var record = e.record;\n";
			str+="p"+parent+".error = 0;\n"; //这里一定要写这句话，不然会导致死循环
			str+="if (field=='"+field+"'){\n";
			str+="p"+parent+".error = fn"+field+"ColumnCheck(e.value,e.record);\n";
			str+="}\n";
			//error为1时需重新定位到该单元格
			str+="if (p"+parent+".error == 1){\n";
			str+="editor.xrecord = e.record;\n";
			str+="editor.xcolumn = e.column;\n";
			str+="editor.startEdit(e.record, e.column);\n";
			str+="}\n";
			str+="});\n";					
		}
		//console.log(str);	
		pform.gridpickercolumns+=';';	
		pform.eventstr+=str+"\n";
		//the end		
		return pform;
	}	
}

function myConvertDate(value){
	var xvalue=Ext.util.Format.date(value, sysdateformat);
}

function mySetsysVarsReadOnly(flag){
	var str='';
	str+="if (pmyForm.sysnumberdim!=undefined && pmyForm.sysnumberdim.length>0){\n";
	str+="for (var j=0;j<pmyForm.sysnumberdim.length;j++){\n";
	str+="Ext.getCmp(p.xfielddim[pmyForm.sysnumberdim[j]].name).setReadOnly("+flag+");\n";
	str+="}\n";
	str+="}\n";
	return str;	
}

function myGensysNumber(value,format,pmyTable){  //根据日期和格式生成编码，如订单编码
	var xdate=myGetFullDatePart(value);
	var result=format;
	if (result.indexOf('mm')>=0){
		var sql="select count(*)+1 as rowno from "+pmyTable.tablename+" where month("+pmyTable.document.datefield+")="+xdate.month;
	}else if (result.indexOf('yyyy')>=0){
		var sql="select count(*)+1 as rowno from "+pmyTable.tablename+" where year("+pmyTable.document.datefield+")="+xdate.year;
	}else{
		var sql="select count(*)+1 as rowno from "+pmyTable.tablename;
	}	
	result=result.replace('yyyy',xdate.year+'');
	result=result.replace('mm',xdate.month+'');
	result=result.replace('dd',xdate.day+'');
	var rowno=0;
	Ext.Ajax.request({
		url:'system//fn_executeSql.jsp',
		params:{ database:pmyTable.sysdatabasestring, updateSql:'',selectSql:sql },									
		method: 'POST',async:false,
		callback:function(options,success,response){
			rowno=Ext.decode(response.responseText).rowno;
		}	 
	});
	var xcode=''+rowno;
	var x1=result.lastIndexOf('#');
	var n=0;
	for (var j=x1;result[j]=='#' && j>=0;j--){
		xcode='0'+xcode; n++;
	}
	xcode=result.substring(0,x1-n+1)+myRight(xcode,n)+result.substring(x1+1);
	console.log('result='+xcode);
	return xcode;
}

function myCompileFormFields(p){
	p.xfielddim=[];
	var pf=p.form[0];
	var pt=p.form[0].tab;
	var n=0,n1=0,n2=0;
	if (pt!=undefined){
		for (var i=0;i<pt.length;i++){
			//记录tab
			n1++;
			p.xfielddim[n]=pt[i];
			p.xfielddim[n].type='tab';
			p.xfielddim[n].name='tab'+n1;
			p.xfielddim[n].parent='form'+n1;
			n++;
			var pg=pt[i].groupbox;
			for (var j=0;pg!=undefined && j<pg.length;j++){
				//记录groupbox
				n2++;
				p.xfielddim[n]=pg[j];
				p.xfielddim[n].type='groupbox';
				p.xfielddim[n].name='groupbox'+n2;
				p.xfielddim[n].parent='tab'+n1;
				n++;
				var pm=pg[i].groupbox[j];
				//有tab也有groupbox的情况
				for (var k=0;k<sys.cmp.length;k++){
					var px=eval("pm."+sys.cmp[k]);
					p=myGetxfielddim(p,px,'groupbox'+n2,sys.cmp[k]);
				}
			}//groupbox
			//存在tab但没有groupbox的情况
			for (var k=0;k<sys.cmp.length;k++){
				var px=eval("pt[i]."+sys.cmp[k]);
				p=myGetxfielddim(p,px,'tab'+n1,sys.cmp[k]);
			}
		}  //tab结束for i
	}	
	//没有tab但有groupbox的情况
	var pg=p.form[0].groupbox;
	for (var j=0;pg!=undefined && j<pg.length;j++){
		if (n2==0) n2++;
		p.xfielddim[n]=pg[j];
		p.xfielddim[n].type='groupbox';
		p.xfielddim[n].name='groupbox'+n2;
		p.xfielddim[n].parent='';
		n++;
		for (var k=0;k<sys.cmp.length;k++){
			var px=eval("pg[k]."+sys.cmp[k]);
			p=myGetxfielddim(p,px,'groupbox'+n2,sys.cmp[k]);
		}
		n2++;
	}			
	//没有tab也没有groupbox的情况
	for (var k=0;k<sys.cmp.length;k++){
		if (n1==0) n1++;
		if (sys.cmp[k]!='tab' && sys.cmp[k]!='groupbox'){
			var px=eval("p.form[0]."+sys.cmp[k]);
			p=myGetxfielddim(p,px,'form'+n1,sys.cmp[k]);
		}		
	}
	return p;	
}

function myGetxfielddim(p,px,parent,type){
	if (px!=undefined){
		var n=p.xfielddim.length;
		for (var r=0;r<px.length;r++){
			p.xfielddim[n]=px[r];
			p.xfielddim[n].type=type; //sys.cmp[r];
			p.xfielddim[n].parent=parent;
			n++;
		}
	}
	return p;
}

function mySetupTree(name){
	//tree初始设置
	var str="";
	str+="p"+name+".sysdatabasestring=sysdatabasestring;\n"; //传递到fn_function.js
	str+="if (p"+name+".tablename=='' && pmyTable.tablename!='') p"+name+".tablename=pmyTable.tablename;\n";
	str+="if (p"+name+".tabletitle=='' && pmyTable.tabletitle!='') p"+name+".tabletitle=pmyTable.tabletitle;\n";
	str+="if (p"+name+".keyfield==undefined && pmyTable.keyfield!='') p"+name+".keyfield=pmyTable.keyfield;\n";
	str+="if (p"+name+".keyspec=='' && pmyTable.keyspec!='') p"+name+".keyspec=pmyTable.keyspec;\n";
	str+="if (p"+name+".sortfield==undefined && pmyTable.sortfield!='') p"+name+".sortfield=pmyTable.sortfield;\n";
	str+="if (p"+name+".sortfield=='') p"+name+".sortfield=p"+name+".keyfield;\n";
	str+="if (p"+name+".sql=='' && p"+name+".tablename!='')	p"+name+".sql='select * from '+p"+name+".tablename;\n";
	str+="p"+name+".selectedcode='';\n";
	str+="p"+name+".rootcode='';\n";
	str+="p"+name+".searchtext='';\n";
	str+="p"+name+".filterfield='';\n";
	str+="p"+name+".events='storeload;treeload;beforeload';\n";
	str+="p"+name+".parentvalue='';\n";
	str+="p"+name+".name='"+name+"';\n";
	str+="p"+name+".varname='p"+name+"';\n";
	str+="p"+name+".reloadflag=1;\n";
	str+="p"+name+".singleexpand='false';\n";
	str+="p"+name+".index='';\n";
	str+="p"+name+".title='';\n";
	str+="p"+name+".roottitle='';\n";
	str+="p"+name+".bbar='';\n";
	str+="p"+name+".tbar=''; \n";
	//str+="p"+name+".height=0;\n";
	//str+="p"+name+".width=0;\n";
	str+="p"+name+".rowheight=24;\n";	    
	str+="p"+name+".contextmenu='myContextMenu1';\n";
	//设置位置
	str+="p"+name+".region='west';\n";
	str+="if (p"+name+".align!=''){\n";
	str+="if (p"+name+".align=='left') {\n";
	str+="p"+name+".region='west';\n";
	str+="}else if (p"+name+".align=='right'){\n";
	str+="p"+name+".region='east';\n";
	str+="}else if (p"+name+".align=='top'){\n";
	str+="p"+name+".region='north';\n";
	str+="}else if (p"+name+".align=='bottom'){\n";
	str+="p"+name+".region='south';\n";
	str+="}\n";
	str+="}\n";
	return str;
}	

function mySetupGrid(name){
	//grid初始设置
	var str="";
	str+="p"+name+".sysdatabasestring=sysdatabasestring;\n"; //传递到fn_function.js
	str+="if (p"+name+".tablename=='' && pmyTable.tablename!='') p"+name+".tablename=pmyTable.tablename;\n";
	str+="if (p"+name+".tabletitle=='' && pmyTable.tabletitle!='') p"+name+".tabletitle=pmyTable.tabletitle;\n";
	str+="if (p"+name+".keyfield==undefined && pmyTable.keyfield!='') p"+name+".keyfield=pmyTable.keyfield;\n";
	str+="if (p"+name+".keyspec=='' && pmyTable.keyspec!='') p"+name+".keyspec=pmyTable.keyspec;\n";
	str+="if (p"+name+".sortfield==undefined && pmyTable.sortfield!='') p"+name+".sortfield=pmyTable.sortfield;\n";
	str+="if (p"+name+".sortfield=='') p"+name+".sortfield=p"+name+".keyfield;\n";
	str+="if (p"+name+".sql=='' && p"+name+".tablename!='')	p"+name+".sql='select * from '+p"+name+".tablename;\n";
	str+="p"+name+".index=-1;\n";
	str+="p"+name+".column=-1;\n";
	//str+="p"+name+".bbar='';\n";
	//str+="p"+name+".tbar='';\n";
	str+="p"+name+".varname='p"+name+"';\n";
	str+="p"+name+".name='myGrid1';\n";
	str+="p"+name+".region='center';\n";
	str+="p"+name+".locatekeyvalue='';\n";
	str+="p"+name+".bartitle=p"+name+".title;\n";
	str+="p"+name+".showtitle='false';\n";
	str+="p"+name+".paramsql=p"+name+".sql;\n";
	//设置位置
	str+="p"+name+".region='west';\n";
	str+="if (p"+name+".align!=''){\n";
	str+="if (p"+name+".align=='left') {\n";
	str+="p"+name+".region='west';\n";
	str+="}else if (p"+name+".align=='right'){\n";
	str+="p"+name+".region='east';\n";
	str+="}else if (p"+name+".align=='top'){\n";
	str+="p"+name+".region='north';\n";
	str+="}else if (p"+name+".align=='bottom'){\n";
	str+="p"+name+".region='south';\n";
	str+="}\n";
	str+="}\n";
	return str;
}

function mySetupDetailGrid(name){
	var str='';
	str+="p"+name+".flag=1;\n";
	str+="p"+name+".sysdatabasestring=sysdatabasestring;\n";
	str+="p"+name+".gridpickercolumns=pmyForm.gridpickercolumns;\n";
	str+="p"+name+".treepickercolumns=pmyForm.treepickercolumns;\n";
	str+="p"+name+".region='center';\n";
	str+="p"+name+".index=-1;\n";
	str+="p"+name+".column=-1;\n";
	str+="p"+name+".bartitle=p"+name+".title;\n";
	str+="p"+name+".showtitle='false';\n";
	//str+="p"+name+".bbar='';\n";
	//str+="p"+name+".tbar='';\n";
	str+="p"+name+".keyevent='myGridColumnKeyEvent';\n";
	str+="p"+name+".name='"+name+"';\n";
	str+="p"+name+".varname='p"+name+"';\n";
	return str;
}
