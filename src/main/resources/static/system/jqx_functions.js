//Project->Properties->javabuildpath+Libraries下，可以Add一个Jar到这个Project里。
//修改部署的文件路径，修改工种目录中的.project文件中的<name>项
//1. Eclipse-->Preferences..（MyEclipse--> Window -->Preferences:） 2. 在“type filter text“的框框里输入”ContentTypes;3. 点击右边的Text，选择Java Properties File，看一下 下面的两个选项  
//Project->Properties->javabuildpath+Libraries下，可以Add一个Jar到这个Project里。
//修改部署的文件路径，修改工种目录中的.project文件中的<name>项
//windows+preferences+general -> appearance -> colors and fonts 右边展开basic -> text font
pxmlfile='xml//resource.xml';
//pxmlfile='xml//resourcecategory.xml';
//pxmlfile='xml//km.xml';
sysdbname="emlab";  //数据库名称变量
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
//css
syslabel={};
systext={};
syslabel.fontname='宋体'; //label显示的字体
syslabel.topmargin=4;  //label与输入框的高度差
syslabel.align='left';  //label与text之间字体对齐
syslabel.fontsize=13;  //label字体大小
syslabel.fontbold=false;  //label字体是否加黑 
systext.fontname='Times New roman'; //输入框的字体
systext.height=22;  //输入框的默认高度
systext.rowheight=33;  //表单控件间的行距
sys.windowcon='movie.png';
//sys.theme={theme: "web"};  //样式
sys.theme={ theme: "arctic" };
//lllla
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
		if (syslabel.fontbold) str+='font-weight:bold; ';
		str+='font-size: '+syslabel.fontsize+'px; font-family: '+syslabel.fontname+'; TOP: '+top+'px; LEFT: '+left+'px; ';
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
	if (syslabel.fontbold) str+=', font-weight:bold';
	str+=', "font-size":'+syslabel.fontsize+', "font-family":"'+syslabel.fontname+'"';
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

//文本文字样式
function myLabelCss(top,left,height,width){
	var css='';
	var str='var css={position: "absolute"';
	if (syslabel.fontbold) str+=', font-weight:bold';
	str+=', "font-size":'+syslabel.fontsize+', "font-family":"'+syslabel.fontname+'"';
	if (top!=undefined && left!=undefined){
		str+=', "top":'+top+', "left":'+left;
		if (width!=undefined && width>0){
			str+=', "width": '+width;
		}
		if (height!=undefined && height>0){
			str+=', "height": '+height;
		}
		str+=', "z-index":2};\n';
	}else{
		str+="};\n";
	}
	//console.log(str);
	eval(str);
	return css;		
}

//定义控件位置样式CSS
function myTextCss(top,left,height,width){
	var str='';
	var css='';
	if (top!=undefined && left!=undefined){
		str='var css={position: "absolute",top:'+top+',left:'+left;
		if (width!=undefined && width>0){
			str+=', width: '+width;
		}
		if (height!=undefined && height>0){
			str+=', height: '+height;
		}
		str+=', "z-index":2};\n';
	}else{
		str+="\n";
	}
	eval(str);
	//console.log(str);
	return css;		
}

function myFieldLabel(id,parent,label,labelwidth,top,left){
	//定义控件中的label
	if (label!=undefined && label!=''){
		$("#"+parent).append("<label id='label"+id+"' align='"+syslabel.align+"'>"+label+"</label>");
		if (labelwidth>0){
			$("#label"+id).css(myLabelCss(top+syslabel.topmargin,left,0,labelwidth));
		}else{
			$("#label"+id).css(myLabelCss(top,1*left+2,0,label.length*syslabel.fontsize));
			top=1*(top+syslabel.fontsize+syslabel.topmargin); //换行显示文本
		}
	}else labelwidth=0;
}

//独立的label
function myLabelField(id,parent,label,top,left,height,width){
	if (parent=='') parent='document.body';
	if (width!=undefined && width>0){
		$("#"+parent).append("<label id='label"+id+"' align='left'>"+label+"</label>");
		$("#label"+id).css(myLabelCss(top,left,0,width));
	}else{
		$("#"+parent).append("<label id='label"+id+"' align='"+syslabel.align+"'>"+label+"</label>");
		$("#label"+id).css(myLabelCss(top,left,0,label.length*syslabel.fontsize+2));
	}
}

function myTextField(id,parent,label,labelwidth,top,left,height,width,value){
	var str='';
	if (parent=='') parent='document.body';
	if (height==0) height=systext.height;
	myFieldLabel(id,parent,label,labelwidth,top,left);
	$("#"+parent).append("<div id='"+id+"_div'><input type='text' id='"+id+"' /></div>");
	$("#"+id+"_div").css(myTextCss(top,1*(left+labelwidth),height,width));
	$("#"+id).jqxInput({height: height});
	$("#"+id).jqxInput({width: width});
	$("#"+id).jqxInput(sys.theme);
	if (value!=undefined && value!=''){  //设置初值
		$("#"+id).val(value);
	}
}

//textarea
function myTextareaField(id,parent,label,labelwidth,top,left,height,width,value){
	var str='';
	if (parent=='') parent='document.body';
	if (height==0) height=systext.height;
	myFieldLabel(id,parent,label,labelwidth,top,left);
	$("#"+parent).append("<div id='"+id+"_div'><textarea id='"+id+"'></textarea></div>");
	//$("#"+id+"_div").css(myTextCss(top,1*(left+labelwidth),height,width));
	$("#"+id).css(myTextCss(top,1*(left+labelwidth),height,width));
	$("#"+id).css({padding: "8px 8px 8px 8px"});
	//$("#"+id).jqxInput({height: height});
	//$("#"+id).jqxInput({width: width});
	//$("#"+id).jqxInput(sys.theme);
	if (value!=undefined && value!=''){  //设置初值
		$("#"+id).val(value);
	}
}

//定义date控件
function myDateField(id,parent,label,labelwidth,top,left,height,width,value){
	var str='';
	if (parent=='') parent='document.body';
	if (height==0) height=systext.height;
	myFieldLabel(id,parent,label,labelwidth,top,left);
	$("#"+parent).append("<div style='padding-left: 4px;' id='"+id+"'></div>");
	$("#"+id).css(myTextCss(top,1*(left+labelwidth),height,width));
	$.getScript('jqwidgets/scripts/globalization/globalize.culture.ja-JP.js', function() {
		$("#"+id).jqxDateTimeInput({animationType: 'none', culture: 'ja-JP', formatString: 'D', width: width, height: height});
	});
	$("#"+id).jqxDateTimeInput({width: width, height: height});
	$("#"+id).jqxDateTimeInput(sys.theme);
	if (value!=undefined && value!=''){  //设置初值
		$("#"+id).val(value);
	}
}

//定义decimal控件
function myDecimalField(id,parent,label,labelwidth,top,left,height,width,length,decimal,value,min,max){
	//输入两个-负号变成正数.bug可以输入汉字
	var str='';
	if (parent=='') parent='document.body';
	if (height==0) height=systext.height;
	myFieldLabel(id,parent,label,labelwidth,top,left);
	$("#"+parent).append("<div style='padding-right: 4px;' id='"+id+"' /></div>");
	$("#"+id).css(myTextCss(top,1*(left+labelwidth),height,width));
	$("#"+id).jqxNumberInput({ width: width, height: height, inputMode: 'simple', spinButtons: false});
	if (decimal!=undefined && decimal>=0){
		$("#"+id).jqxNumberInput({decimalDigits: decimal});
	}
	if (length!=undefined && length>0){
		if (decimal>0) $("#"+id).jqxNumberInput({digits:1*(length-decimal-1)});
		else $("#"+id).jqxNumberInput({digits: +length});
	}
	if (min!=undefined){
		$("#"+id).jqxNumberInput({min: +min});
	}
	if (value!=undefined && value!=''){  //设置初值
		$("#"+id).val(value);
	}
}

//定义decimal控件
function myNumericField(id,parent,label,labelwidth,top,left,height,width,length,decimal,value,min,max){
	//调用jquery/numeric.js第三方控件,独立样式，高度与jqx控件不一致
	if (parent=='') parent='document.body';
	if (height==0) height=systext.height;
	myFieldLabel(id,parent,label,labelwidth,top,left);
	$("#"+parent).append("<input type='text' id='"+id+"' />");
	$("#"+id).css(myTextCss(id,top,1*(left+labelwidth),height,width));
		if (value!=undefined && value!=''){  //设置初值
		$("#"+id).val(value);
	}
	$("#"+id).css("text-align","right"); //右对齐
	if (decimal!=undefined && decimal>0) {
		$("#"+id).numeric({ decimalPlaces: decimal});
	}else{
		$("#"+id).numeric({ decimal: false });
	}
	if (min!=undefined && min==0) $("#"+id).numeric({ negative: false });	
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
	return str;
}

//定义数组checkbox   cccccccheck
function myCheckBoxField(id,parent,label,labelwidth,top,left,rowheight,cols,items){
	//cols为列数，rowheight为行高,items=[c70]aaaa;[u80]bbbbbb;[80]ccccc   u-unchecked  ,c--checked
	//增加一个value值控件，名称为id+'_value' 
	if (parent=='') parent='document.body';
	if (label=='') labelwidth=0;
	if (rowheight<=0) rowheight=systext.rowheight;
	myFieldLabel(id,parent,label,labelwidth,top,left);
	$("#"+parent).append("<input hidden='true' type='text' id='"+id+"_hiddenfield'/>");
	var tmp=items.split(';');
	var r=0;  //记录行数
	var c=1   //记录列数
	var posx=0;
	var posy=0;
	var values='';
	for (var i=1;i<=tmp.length;i++){
		var index1=tmp[i-1].lastIndexOf('[');
		var index2=tmp[i-1].lastIndexOf(']');
		var checked='c';
		var width=0;
		var text=''
		if (index2>index1 && index1>=0){
			text=tmp[i-1].substr(index2+1);
			var checked=tmp[i-1].substr(index1+1,1);
			if (checked=='u' || checked=='c'){
				width=tmp[i-1].substring(index1+2,index2);
			}else{
				width=tmp[i-1].substring(index1+1,index2);
			}
			if (width=='') width='0';	
		}else{
			text=tmp[i-1];
		}
		if (checked=='u') checked='false';
		else checked='true';
		values+=';'+text;
		if (i==1 && tmp.length==1) var itemid=id;
		else itemid=id+i;
		$("#"+parent).append("<div id='"+itemid+"'>"+text+"</div>");
		$("#"+itemid).css(myTextCss(top+posy,left+labelwidth+1*posx,0,width));
		$("#"+itemid).jqxCheckBox({checked: checked});
		$("#"+itemid).jqxCheckBox(sys.theme);
		if (width==0) width=text.length*syslabel.fontsize+32;
		if (c>=cols){
			posx=0; c=1; posy+=rowheight;
		}else{
			posx+=1.0*width; c++;		
		}
	}
	$("#"+id+"_hiddenfield").val(values.substr(1));
	//onchange事件
	for (var i=1;i<=tmp.length;i++){
		if (i==1 && tmp.length==1) var itemid=id;
		else itemid=id+i;
		$("#"+itemid).on("change", function (event) {
			myCheckBoxChange(id,values.substr(1));
		});
	}	
}


//定义数组combo
function myComboField(id,parent,label,labelwidth,top,left,height,width,items,value,checkbox){
	if (parent=='') parent='document.body';
	if (label=='') labelwidth=0;
	if (height==0) height=systext.height;
	myFieldLabel(id,parent,label,labelwidth,top,left);	
	var str='var '+id+'source = new Array(';
	var tmp=items.split(';');
	for (var i=0;i<tmp.length;i++){
		if (i>0) str+=',';
		str+='"'+tmp[i]+'"';
	}
	str+=');';
	eval(str);
	$("#"+parent).append("<div style='padding-left: 4px;' id='"+id+"' /></div>");
	$("#"+id).css(myTextCss(top,1*(left+labelwidth),0,width));
	$("#"+id).jqxComboBox({animationType: 'none', source: eval(id+'source'), multiSelect: false, width: width, height: height, dropDownWidth: width+4, autoDropDownHeight: false});
	if (value!=undefined && value!=''){  //设置初值
		$("#"+id).jqxComboBox('selectItem',value);
	}else{
		$("#"+id).jqxComboBox('selectIndex',0);
	}
	if (checkbox!=undefined && checkbox){
		$("#"+id).jqxComboBox({checkboxes: true});
	}
	$("#"+id).jqxComboBox(sys.theme);	
}

function myDBComboFieldx(id,parent,label,labelwidth,top,left,height,width,sql,fields,masterfield){
	//source_id,dataAdapter_id
	if (parent=='') parent='document.body';
	if (label=='') labelwidth=0;
	if (height==0) height=systext.height;
	myFieldLabel(id,parent,label,labelwidth,top,left);	
	$("#"+parent).append("<div style='padding-left: 4px;' id='"+id+"' /></div>");
	$("#"+id).css(myTextCss(top,1*(left+labelwidth),0,width));
	$("#"+id).jqxComboBox({animationType: 'none', multiSelect: false, width: width, height: height, autoDropDownHeight: false});
	var str='';
	var tmp=fields.split(';');
	for (var i=0; tmp!='' && i<tmp.length; i++){
		if (tmp[i]!=id) str+=",{ name: '"+tmp[i]+"' }";
	}
	/*
	//设置数据源
	str+='var source_'+id+' = { datatype: "json", datafields: [';
	str+="{ name: '"+id+"' }";  //id为第一列
	str+='],';
	str+=' url: "system/jqx_getComboxData.jsp",async: false,';
	str+='data: { database:"'+sysdatabasestring+'",';
	if (masterfield!=='') str+='sqlString: ""}};\n';
	else str+='sqlString: "'+sql+'"}};\n';
	str+='var dataAdapter_'+id+' = new $.jqx.dataAdapter(source_'+id+');\n';
	eval(str);
	*/
	//myGetComboxData(id,sql);
	//console.log(str);
	//第一个是valuefield也是ID的值，第二个是displayfield
	var valuefield=id;
	if (tmp=='') var displayfield=valuefield;
	else displayfield=tmp[0];
	$("#"+id).jqxComboBox({
		//source: eval("dataAdapter_"+id),
		//remoteAutoComplete: true,  //
		selectedIndex: 0,
		displayMember: displayfield,
		valueMember: valuefield,
		//searchString: displayfield,
		dropDownWidth: width+4
	});	
	//$("#"+id).jqxComboBox('selectItem',value);
	//if (checkbox!=undefined && checkbox){
		//$("#"+id).jqxComboBox({checkboxes: true});
	//}
	$("#"+id).jqxComboBox(sys.theme);
	//自定义属性，记录sql语句和source数据源
	$("#"+id).attr('xsql',sql);
	//$("#"+id).attr('xsource',eval("source_"+id));
	//定义联动事件cascade
	if (masterfield!=undefined && masterfield!=''){
		var xfield=$("#"+masterfield).jqxComboBox('valueMember');
		var xvalue=$("#"+masterfield).jqxComboBox('selectItem','value');
		$("#"+masterfield).on('select', function (event) {
			if (event.args) {
				var item = event.args.item;
				//var index = args.index;
				if (item) {
					var xvalue = item.value;
					var sql=$("#"+id).attr('xsql');
					sql = "select * from ("+sql+") as p where "+masterfield+"='"+xvalue+"'";
					//console.log(sql);
					//eval("source_"+id+".data = { sqlString: sql };");
					//var dataAdapter1 = new $.jqx.dataAdapter(eval("source_"+id));
					//$("#"+id).jqxComboBox({source: dataAdapter1});
					//dataAdapter1.dataBind();
					//$("#"+id).jqxComboBox('selectIndex',0);
					myGetComboxData(id,sql);
				}
			}		
		});
	}else{
		myGetComboxData(id,sql);
	}
	//联动事件结束
	//return eval('source_'+id);
	//事件
}

//动态dddddddcombo
function myDBComboField(id,parent,label,labelwidth,top,left,height,width,sql,fields,masterfield){
	//定义控件.masterfield的值为联动控件的id，即valuefield
	if (parent=='') parent='document.body';
	if (label=='') labelwidth=0;
	if (height==0) height=systext.height;
	myFieldLabel(id,parent,label,labelwidth,top,left);	
	$("#"+parent).append("<div style='padding-left: 4px;' id='"+id+"' /></div>");
	$("#"+id).css(myTextCss(top,1*(left+labelwidth),0,width));
	$("#"+id).jqxComboBox({animationType: 'none', multiSelect: false, width: width, height: height, autoDropDownHeight: false});
	var str='';
	var tmp=fields.split(';');
	for (var i=0; tmp!='' && i<tmp.length; i++){
		if (tmp[i]!=id) str+=",{ name: '"+tmp[i]+"' }";
	}
	//第一个是valuefield也是ID的值，第二个是displayfield
	var valuefield=id;
	if (tmp=='') var displayfield=valuefield;
	else displayfield=tmp[0];
	$("#"+id).jqxComboBox({
		selectedIndex: 0,
		displayMember: displayfield,
		valueMember: valuefield,
		dropDownWidth: width+4
	});	
	//$("#"+id).jqxComboBox('selectItem',value);
	$("#"+id).jqxComboBox(sys.theme);
	//自定义属性，记录sql语句和source数据源
	$("#"+id).attr('xsql',sql);
	//定义联动事件cascade
	if (masterfield!=undefined && masterfield!=''){
		var xfield=$("#"+masterfield).jqxComboBox('valueMember');
		var xvalue=$("#"+masterfield).jqxComboBox('selectItem','value');
		$("#"+masterfield).on('select', function (event) {
			if (event.args) {
				var item = event.args.item;
				//var index = args.index;
				if (item) {
					var xvalue = item.value;
					var sql=$("#"+id).attr('xsql');
					if (xvalue!='')	sql = "select * from ("+sql+") as p where "+masterfield+"='"+xvalue+"'";
					myGetComboxData(id,sql);
				}
			}		
		});
		//必须加在后面，否
		$("#"+masterfield).jqxComboBox('selectedIndex',0);
	}else{
		myGetComboxData(id,sql);
	}
	//联动事件结束
}

//定义checkcombo
function myCheckComboField(id,parent,label,labelwidth,top,left,height,width,items,value){

}

//定义图片combo
function myImageComboField(id,parent,label,labelwidth,top,left,height,width,items,value){

}


//定义fileupload控件uuuuuupload
function myFileUpLoadField(id,parent,label,labelwidth,top,left,height,width){
	//hiddenfield存储上传的多个原始文件名称
	var str='';
	if (parent=='') parent='document.body';
	if (width==0) width=300;
	myFieldLabel(id,parent,label,labelwidth,top,left);	
	$("#"+parent).append("<div id='"+id+"'/></div>");
	//console.log(myTextCss(top,1*(left+labelwidth),height,width));
	$("#"+id).css(myTextCss(top,1*(left+labelwidth),height,width));
	$("#"+id).jqxFileUpload({ width: width, localization: { browseButton: '&nbsp;游览…&nbsp;', uploadButton: '&nbsp;全部上传&nbsp;', cancelButton:'&nbsp;全部删除&nbsp;', uploadFileTooltip: '上传文件', cancelFileTooltip: '删除文件' }});
	$("#"+id).jqxFileUpload(sys.theme);	
    $("#"+id).jqxFileUpload({ multipleFilesUpload: true, rtl: false, uploadUrl:'system/jqx_fileUpLoad.jsp?filename=', fileInputName:'fileToUpload' });
	$("#"+parent).append("<span style='overflow:auto; height:40px;' id='"+id+"_files'><div></div><div></div style='overflow:auto;'></span>");
	$("#"+id+"_files").css(myTextCss(top+40,1*(left+labelwidth),systext.rowheight-6,width-6));
	$("#"+id+"_files").jqxExpander({width: width});
	$("#"+id+"_files").jqxExpander(sys.theme);
	//设置上传文件下拉框及其事件
	var xid=id+'_files';
	$("#"+xid).attr('hidden', true);
	$('#'+id).on('uploadStart', function (event) {
		$('#'+xid).attr('hidden', true);
	    var filename = event.args.file;
	    var tid='';
		$('#'+id).jqxFileUpload({ uploadUrl: 'system/jqx_fileUpLoad.jsp?filename='+filename+'&filepath=mybase&targetname='+tid, fileInputName: 'fileToUpload' });
	});
	$('#'+id).on('uploadEnd', function (event) {
		$('#'+xid).attr('hidden', false);
		var filename = event.args.file;
		var flag=0;
		var content=$('#'+xid).jqxExpander('getContent');
		var items=$(content).find('li');
		var c = '<ul>';
		for (var i=0;i<items.length;i++){
			var text = $(content).find('li:eq(' + i + ')').text();
			if (text==filename){
				flag=1;
			}
			var item = '<li>' + text + '</li>';
			c+=item;
		}
		if (flag==0){
			//r item = $('<li>' + filename + '</li>');
			var item = '<li>' + filename + '</li>';
			c+=item;
			//item.appendTo(content);
			//var c=$(content);
		}
		c+='</ul>';
		$('#'+xid).jqxExpander('setContent', $(c));
		$('#'+xid).jqxExpander('setHeaderContent', '&nbsp;已上传文件');
	});	
	
	$('#filepath').on('select', function (event) {
		$('#filepath_files').attr('hidden', true);
	});
	$('#filepath').on('remove', function (event) {
		$('#filepath_files').attr('hidden', false);
	});	
	return str;
}

//定义编辑器
function myEditorField(id,parent,label,labelwidth,top,left,height,width,value){
	if (parent=='') parent='document.body';
	var str='';
	myFieldLabel(id,parent,label,labelwidth,top,left);	
	$("#"+parent).append("<div id='"+id+"_div'><textarea id='"+id+"'></textarea></div>");
	$("#"+id+"_div").css(myTextCss(top,1*(left+labelwidth),height,width));
	if (height>0) $("#"+id).jqxEditor({height: height});
	else $("#"+id).jqxEditor({height: '100%'});
	if (width>0) $("#"+id).jqxEditor({width: width});
	else $("#"+id).jqxEditor({width: '100%'});
	$("#"+id).jqxEditor(sys.theme);
	if (value!=undefined && value!=''){  //设置初值
		$("#"+id).val(value);
	}
	//编辑器本地化
	$("#"+id).jqxEditor({localization: {"bold": "加粗","italic": "斜体","underline": "下划线","format": "格式", "font": "字体","size": "字体大小", "color": "字体颜色", "background": "背景颜色",	"left": "左对齐", "center": "居中",	"right": "右对齐", 
	"outdent": "文字左移", "indent": "文字右移", "ul": "分段", "ol": "分级", "image": "插入图片", "link": "插入链接", "html": "html语言", "clean": "格式化" }});
}

//dbtree
function myDBTree(id,parent,title,top,left,height,width,sql,keyfield,sortfield,style){
	var str='';
	if (parent!=''){
		if (title!='') $("#"+parent).append("<div><div id='"+id+"'></div></div>");
		else $("#"+parent).append("<div id='"+id+"'></div>");
		if (height>0) $("#"+id).jqxTree({height: height});
		if (width>0) $("#"+id).jqxTree({width: width});
	}	
	if (top>0 && left>0) $("#"+id).css(myTextCss(top,left,height,width));
	$("#"+id).jqxTree({ animationShowDuration: 0, animationHideDuration: 0}); //必须加
	$("#"+id).jqxTree({ toggleIndicatorSize: 16 });
	$("#"+id).jqxTree(sys.theme);
	//$("#"+id).jqxTree({  height: '100%', width: '100%' }); 
	if (style.indexOf('checkbox')>=0) $("#"+id).jqxTree({ checkboxes: true, hasThreeStates: true });
	if (style.indexOf('full')>=0){ //一次性全部获取
		$.ajax({
			url: "system\\jqx_getAllTreeNodes.jsp",
			data: { database: sysdatabasestring, sqlString: sql, keyField:keyfield, sortField:sortfield, style:style }, 
			async: false,    
			success: function(data) {
				//console.log(data);     
				var source=eval(data);
				$('#'+id).jqxTree({ source: source });
			},     
			error: function(err) {     
				console.log(err);     
			}     
		});
	}else{
		sqlx="select * from ("+sql+") as p where parentnodeid=''";  //第一层	
		$.ajax({
			url: "system\\jqx_getChildNodes.jsp",
			data: { database: sysdatabasestring, sqlString: sqlx, keyField:keyfield, sortField:sortfield, style:style }, 
			async: false,    
			success: function(data) {
				//console.log(data);     
				var source=eval(data);
				$('#'+id).jqxTree({ source: source });
			},     
			error: function(err) {     
				console.log(err);     
			}     
		});

		str+="$('#"+id+"').on('expand', function (event) {\n";
		str+="var pitem = $('#"+id+"').jqxTree('getItem', event.args.element);\n";
		str+="var pvalue = pitem.value;\n";
		str+="var $element = $(event.args.element);\n";
		str+="var children = $element.find('ul:first').children();\n";
		str+="var item = $('#"+id+"').jqxTree('getItem', children[0]);\n";
		str+="var value= item.value.trim();\n";
		str+="if (value==''){\n"; //第一次点击后加载console.log(item.value);
		str+="$('#"+id+"').jqxTree('removeItem', item);\n";
		str+="var sqlx=\"select * from (\\\""+sql+"\\\") as p where parentnodeid='\"+pvalue+\"'\";\n";
		str+="$.ajax({\n";
		str+="url: 'system\\jqx_getChildNodes.jsp',\n";
		str+="data: { database: sysdatabasestring, sqlString: sqlx, keyField:'"+keyfield+"', sortField:'"+sortfield+"', style:'"+style+" },\n"; 
		str+="async: false,\n";    
		str+="success: function (data, status, xhr) {\n";
		str+="var items=eval(data);\n";
		str+="$('#"+id+"').jqxTree('addTo', items, $element[0]);\n";
		str+="}});\n";
		str+="}"; //if
		str+="});\n";	//expand
		$('#'+id).attr('xexpand',str);  //自己定义属性保存该事件的代码，暂时没有用到
		//定义点击展开事件
		$('#'+id).on('expand', function (event) {
			var pitem = $('#'+id).jqxTree('getItem', event.args.element);
			var label = pitem.label;
			var pvalue = pitem.value;
			var $element = $(event.args.element);
			//var loader = false;
			//var loaderItem = null;
			//找到第一个子节点，如果第一个子节点为空，则构造叶子结点
			var children = $element.find('ul:first').children();
			var item = $('#'+id).jqxTree('getItem', children[0]);
			var value= item.value.trim();
			if (value==''){ //第一次点击后加载console.log(item.value);
				$('#'+id).jqxTree('removeItem', item);
				var sqlx="select * from ("+sql+") as p where parentnodeid='"+pvalue+"'";
				//console.log(sqlx);
				$.ajax({
					url: "system\\jqx_getChildNodes.jsp",
					data: { database: sysdatabasestring, sqlString: sqlx, keyField:keyfield, sortField:sortfield, style:style }, 
					async: false,    
					success: function (data, status, xhr) {
						var items=eval(data);
						//var items = jQuery.parseJSON(data);
						$('#'+id).jqxTree('addTo', items, $element[0]);
						//$('#'+id).jqxTree('removeItem', loaderItem.element);
					}
				});
			} //if
		});	//expand
	}
	//选中第一个结点
	var target=$("#"+id).find('li:first')[0];
	if (target)	$("#"+id).jqxTree('selectItem', target);
	//删除所有结点
	//$('#'+id).find('ul:first')[0].innerHTML = '';
	//$('#'+id).jqxTree({ items: [] });
	//return str;	
}


//生成Tabs tttttttab
function myTabs(id,parent,title,items,top,left,height,width,style){
	//myDefineTabs('myTab','main','教师信息','基本信息;联系信息;研究方向;个人简历',10,100,400,500);
	//产生的tab的序号tab1,tab2...
	if (parent=='') parent='document.body';
	var str='';
	str='<div style=\\"overflow:auto; margin:0px 0px 0px 0px; padding:0px 0px 0px 0px;\\">';
	str+='<div id=\\"'+id+'\\" style=\\"overflow: hidden; margin:2px 0px 0px 0px; padding:0px 0px 0px 0px;\\">';
	str+="<ul>";
	var tmp=items.split(';');
	for (var i=0; i<tmp.length; i++){
		if (i==0) str+='<li style=\\"margin-left: 8px;\\">'+tmp[i]+'</li>';
		else str+='<li>'+tmp[i]+'</li>';
	}	
	str+='</ul>';
	for (var i=0; i<tmp.length; i++){
		str+='<div id=\\"'+id+1*(i+1)+'\\" style=\\"overflow: auto;\\" margin: 0px 0px 0px 0px; padding:0px 0px 0px 0px\'></div>';
	}	
	str+="</div>";
	str+="</div>";
	str='$("'+str+'").appendTo("#'+parent+'");\n';
	eval(str);
	$("#"+id).css(myTextCss(top,left,height,width));
	$("#"+id).jqxTabs({position: 'top',width: width, height: height});
	$("#"+id).jqxTabs({ showCloseButtons: false});
	if (style.indexOf('collapse')>=0) $("#"+id).jqxTabs({ showCloseButtons: false, collapsible: true});
	$("#"+id).jqxTabs(sys.theme);
	for (var i=0; i<tmp.length; i++){
		//增加一个fieldset在其中	
		var xid=id+'Panel'+1*(i+1);
		var pid=id+1*(i+1);
		 //groove/inset/ridge/ouset/double 
		$("<fieldset id='"+xid+"' style='margin:0px 0px 0px 0px; padding:0px 0px 0px 0px; border:0px groove'></fieldset>").appendTo("#"+pid);
		$("#"+xid).css(myTextCss(0,0,0,0));
		$("#"+xid).css(sys.theme);
		$("#"+xid).css({position: 'relative', width: 0, height: 0});
	}	
}

function myFormx(id,parent,title,items,top,left,height,width,style){
	var str='<div id=\''+id+'\'>';
	str+='<div>';
	str+='<div id=\''+id+'Window\' style=\'height: '+height+'px\'>';
	str+='<div>&nbsp;'+title+'</div>';
	str+='<div style=\'overflow: hidden; padding:2px 3px 2px 3px\'>';  //hidden必须加
	str+='<div id=\''+id+'Tab\' style=\'overflow:hidden; margin: 0px 0px 0px 0px; padding:0px 0px 0px 0px\'>';
	str+='<ul style=\'margin-left: 0px\'>';
	var tmp=items.split(';');
	for (var i=0; i<tmp.length; i++){
		if (i==0) str+='<li style=\'margin-left: 8px;\'>'+tmp[i]+'</li>';
		else str+='<li>'+tmp[i]+'</li>';
	}	
	str+='</ul>';
	for (var i=0; i<tmp.length; i++){
		//auto必须加? marquee  
		str+='<div id=\''+id+'Tab'+(i+1)+'\' style=\'overflow: auto; margin:0px 0px 0px 0px; padding:0px 0px 0px 0px;\'>';
		str+='<fieldset id=\''+id+'Panel'+(i+1)+'\' style=\' margin:0px 0px 0px 0px; padding:0px 0px 0px 0px; border:1px groove\'></fieldset>';
		str+='</div>';
	}	
	str+='</div></div></div></div></div>';
	str='$("'+str+'").appendTo("#'+parent+'");\n';
	str+='$("#'+id+'").jqxDocking({orientation: \'vertical\', width:'+width+',  mode: \'docked\', windowsMode: { '+id+'Window: \'docked\'}  });\n';
	if (style.indexOf('collapse')>=0) str+='$("#'+id+'").jqxDocking(\'showAllCollapseButtons\');\n';
	str+='$("#'+id+'").jqxDocking(\'hideAllCloseButtons\');\n';
	//固定窗体不拖动
	str+='$("#'+id+'").jqxDocking(\'pinWindow\', id+\'Window\');';
	//str+='$("#'+id+'").jqxDocking(\'move\', id+\'Window\', 100, 100);'; 
	//str+='$("#'+id+'").jqxDocking(\'setWindowPosition\', id+\'Window\', 100, 100);';
	str+='$("#'+id+'").css({ position:\'absolute\', top:'+top+', left:'+left+'});'; 
	str+='$("#'+id+'Tab").css({position: "relative",top:0, left:0, width: "100%", height: "100%", "z-index":2});\n';
	str+='$("#'+id+'Tab").jqxTabs();\n';
	for (var i=0; i<tmp.length; i++){
		str+='$("#'+id+'Panel'+(i+1)+'").css({position: \'relative\',top:0, left:0, height: \''+(height-72)+'px\', \'z-index\':2});\n';
	}
	//console.log(str);
	eval(str);
	return str;
}


//生成fieldset
function myFieldSet(id,parent,title,top,left,height,width){
	if (parent=='') parent='document.body';
	var str='';
	str='<fieldset id=\''+id+'\' style=\\"padding-left:15px; padding-right:0px; border:1px groove\\">';  //groove/inset/ridge/ouset/double
	if (title!='') str+='<legend>'+title+'</legend>';
	str+='</fieldset>';
	str='$("'+str+'").appendTo("#'+parent+'");\n';
	eval(str);
	$("#"+id).css(myTextCss(top,left,height,width));
	$("#"+id).css(sys.theme);
	$("#"+id).css({position: 'absolute'});
}

function myPanel(id,parent,top,left,height,width){
	//无形容器
	if (parent=='') parent='document.body';
	var str='';
	str='<fieldset id=\''+id+'\' style=\\" border:0px groove\\">';  //groove/inset/ridge/ouset/double
	str+='</fieldset>';
	str='$("'+str+'").appendTo("#'+parent+'");\n';
	eval(str);
	$("#"+id).css(myTextCss(top,left,height,width));
	$("#"+id).css(sys.theme);
	$("#"+id).css({position: 'absolute', width:0, height:0});
}

//生成panel
function myPanelx(id,parent,title,top,left,height,width){
	//myDefineTabs('myTab','main','教师信息','基本信息;联系信息;研究方向;个人简历',10,100,400,500);
	if (parent=='') parent='document.body';
	var str='';
	str+='$("#'+parent+'").append("<div style=\\"padding-left: 4px; border:0px\\" id=\\"'+id+'\\"+ \\"\\" /></div>");\n';
	str+='$("#'+id+'").css'+mySetTextCss(top,left,0,0)+'\n';
	str+='$("#'+id+'").jqxPanel({ width: '+width+', height:'+height+'});\n';
	str+='$("#'+id+'").css({position:\'relative\'});\n';
	str+='$("#'+id+'").jqxPanel(sys.theme);\n';
	//console.log(str);
	eval(str);
}

//生成button
function myButton(id,parent,text,top,left,height,width){
	if (parent=='') parent='document.body';
	//if (height==0) height=systext.height;
	var str='';
	$("#"+parent).append("<input type='button' value='"+text+"' id='"+id+"' />");
	$("#"+id).css(myTextCss(top,left,height,width));
	$("#"+id).jqxButton();
	$("#"+id).jqxButton(sys.theme);	
}	

//生成window窗体，可以关闭
function myWindowx(id,title,top,left,height,width,buttons,style){
	var str='$("#main").append(\'<div id="'+id+'" style="border-width:2px">'; //inset/ridge/ouset/double/groove
	str+='<div ><span><img src="system/images/'+sys.windowcon+'" alt="" style="margin-right:5px"/>'+title+'</span></div>';
	str+='<div></div>';
	str+='</div>\')\n';	
	str+='$("#'+id+'").jqxWindow({\n';
	//str+='title: \'&nbsp;'+title+'\'';
	//maxHeight: 400, maxWidth: 700, minHeight: 200, minWidth: 200';
	str+=' height: '+height+', width: '+width;
	//str+=',initContent: function () {\n';
	str+=', isModal: false, modalOpacity: 0.1';
	if (style.indexOf('resize')>=0)	str+=', resizable: true';
	else str+=', resizable: false';
	if (style.indexOf('drag')>=0) str+=', draggable: false';
	else str+=', draggable: true';
	if (style.indexOf('close')>=0) str+=', showCloseButton: false';
	if (style.indexOf('collapse')>=0) str+=', showCollapseButton: true';
	str+='});\n';
	if (top!=undefined && top>0)
	str+='$("#'+id+'").jqxWindow({ position: { y: '+top+' }});\n'; 
	if (left!=undefined && left>0)
	str+='$("#'+id+'").jqxWindow({ position: { x: '+left+' }});\n';
	//str+='$("#'+id+'").jqxWindow({ okButton: $("#okButton")});\n';
	str+='$("#'+id+'").jqxWindow(sys.theme);\n';
	if (buttons=='ok' || buttons=='okcancel' || buttons=='savecancel'){
		str+='$("#'+id+'").append("<input type=\'button\' value=\'确定\' id=\''+id+'OkBtn\' />");\n';
		if (buttons=='ok') str+='$("#'+id+'OkBtn").css'+mySetTextCss(height-35,width-70-12,0,70);
		else str+='$("#'+id+'OkBtn").css'+mySetTextCss(height-35,width-2*70-2-12,0,70);
		str+='$("#'+id+'OkBtn").jqxButton();\n';
	}
	if (buttons=='savecancel'){
		str+='$("#'+id+'").append("<input type=\'button\' value=\'保存\' id=\''+id+'SaveBtn\' />");\n';
		if (buttons=='ok') str+='$("#'+id+'SaveBtn").css'+mySetTextCss(height-35,width-70-12,0,70);
		else str+='$("#'+id+'OkBtn").css'+mySetTextCss(height-35,width-2*70-2-12,0,70);
		str+='$("#'+id+'OkBtn").jqxButton();\n';
	}
	if (buttons=='cancel' || buttons=='okcancel' || buttons=='savecancel'){
		str+='$("#'+id+'").append("<input type=\'button\' value=\'取消\' id=\''+id+'CancelBtn\' />");\n';
		str+='$("#'+id+'CancelBtn").css'+mySetTextCss(height-35,width-70-12,0,70);
		str+='$("#'+id+'CancelBtn").jqxButton();\n';
		str+='$("#'+id+'CancelBtn").on(\'click\', function () {\n';
		str+='$("#'+id+'").jqxWindow(\'close\');\n';		
		str+='});\n';
	}
	//console.log(str);
	eval(str);
}

//生成无法关闭的表单
function myForm(id,parent,title,tabs,top,left,height,width,style){
	//生成myFormWindow//主窗体, myFormPanel-外层fieldset，myForm-里层fieldset
	//用户可调用容器为myForm，myFormTab1,2,...
	var pid=id+'Window'  //主窗体
	var xid=id+'Panel';  //最底层子容器fieldset,不显示内容
	if (parent!=''){
		//窗体底部空8px,//inset/ridge/ouset/double/groove
		var str="<div id='"+pid+"' style='border-width:1px; padding:0px 0px 8px 0px;'><div>";
		str+="<span><img src='system/images/"+sys.windowcon+"' alt='' style='margin-right:5px' />"+title+"</span></div><div>";
		str+="<fieldset id='"+xid+"' style='margin:0px 0px 0px 0px; padding:0px 0px 0px 0px; border:0px groove'>";
		//tabs为空时生成一个绝对地址的fieldset
		str+="<fieldset id='"+id+"' style='margin:0px 0px 0px 0px; padding:0px 0px 0px 0px; border:0px groove'></fieldset></fieldset></div></div>";
		$("#"+parent).append(str);
		//console.log(str);	
	}
	$("#"+pid).jqxWindow({maxHeight: height, maxWidth: width, minHeight: height, minWidth: width});
	$("#"+pid).jqxWindow({ height: height, width: width, isModal: false, modalOpacity: 0.1, resizable: false, showCloseButton: false });
	if (style.indexOf("drag")>=0) $("#"+pid).jqxWindow({ draggable: true });
	else $("#"+pid).jqxWindow({ draggable: false });
	if (style.indexOf("collapse")>=0) $("#"+pid).jqxWindow({ showCollapseButton: true });
	if (top!=undefined && left!=undefined && top>0 && left>0){ 
		$("#"+pid).jqxWindow({ position: { y: top, left: left }});
	} 
	$("#"+pid).jqxWindow(sys.theme);
	//alert($("#"+pid).jqxWindow('maxHeight'));
	//设置底层的fieldset属性
	$("#"+xid).css(myTextCss(0,0,0,0));
	$("#"+xid).css(sys.theme);
	$("#"+xid).css({position: 'relative', width: 0, height: 0});
	$("#"+id).css(myTextCss(0,0,0,0));
	$("#"+id).css(sys.theme);
	$("#"+id).css({position: 'absolute', top:0, left:0, width: 0, height: 0});
	//生成带mytab的窗体
	if (tabs!=''){ 
		//一个myFormTab-Tab容器，多个myFormTab1,2,n，
		var xid1=id+'Tab';
		var xid2=id+'Panel';
		var str="<div style='overflow:auto; margin:0px 0px 0px 0px; padding:0px 0px 0px 0px;'>";
		str+="<div id='"+xid1+"' style='overflow: hidden; margin:2px 0px 0px 0px; padding:0px 0px 0px 0px;'>";
		str+="<ul>";
		var tmp=tabs.split(';');
		for (var i=0; i<tmp.length; i++){
			if (i==0) str+="<li style='margin-left: 8px;'>"+tmp[i]+"</li>";
			else str+='<li>'+tmp[i]+'</li>';
		}	
		str+='</ul>';
		for (var i=0; i<tmp.length; i++){
			//生成tabpanel
			str+="<div id='"+xid2+1*(i+1)+"' style='overflow: auto; margin: 0px 0px 0px 0px; padding:0px 0px 0px 0px\'></div>";
		}	
		str+="</div>";
		str+="</div>";
		//父类容器为myFormPanel-相对地址
		$("#"+pid).append(str);
		//str='$("'+str+'").appendTo("#'+pid+'");\n';
		$("#"+xid1).css(myTextCss(30,3,0,0));
		$("#"+xid1).jqxTabs({position:'top',width:(width-8), height:(height-30)});
		$("#"+xid1).jqxTabs(sys.theme);
		for (var i=0; i<tmp.length; i++){
			//增加一个fieldset在其中	
			var xid3=xid1+1*(i+1);
			var pid1=xid2+1*(i+1);
			 //groove/inset/ridge/ouset/double 
			$("<fieldset id='"+xid3+"' style='margin:0px 0px 0px 0px; padding:0px 0px 0px 0px; border:0px groove'></fieldset>").appendTo("#"+pid1);
			$("#"+xid3).css(myTextCss(0,0,0,0));
			$("#"+xid3).css(sys.theme);
			$("#"+xid3).css({position: 'relative', width: 0, height: 0});
		}
	}
}


//生成窗体modal
function myWindow(id,title,tabs,top,left,height,width,buttons,style){
	//生成myFormWindow//主窗体, myFormPanel-外层fieldset，myForm-里层fieldset
	//用户可调用容器为myWin，myWinTab1,2,...
	var pid=id+'Window';  //主窗体
	var xid=id+'Panel';  //最底层子容器fieldset
	//窗体底部空8px,//inset/ridge/ouset/double/groove
	var str="<div id='"+pid+"' style='border-width:2px; padding:0px 0px 8px 0px;'><div>";
	str+="<span><img src='system/images/"+sys.windowcon+"' alt='' style='margin-right:5px' />"+title+"</span></div><div>";
	str+="<fieldset id='"+xid+"' style='margin:0px 0px 0px 0px; padding:0px 0px 0px 0px; border:0px groove'>";
	//tabs为空时生成一个绝对地址的fieldset
	str+="<fieldset id='"+id+"' style='margin:0px 0px 0px 0px; padding:0px 0px 0px 0px; border:0px groove'></fieldset></fieldset></div></div>";
	$("#main").append(str);	
	$("#"+pid).jqxWindow({ isModal: false, height: height, width: width });
	if (style.indexOf('modal')>=0){
		$("#"+pid).jqxWindow({ isModal: true, modalOpacity: 0.1 });
	}
	if (style.indexOf('resize')>=0)	$("#"+pid).jqxWindow({ resizable: true });
	else $("#"+pid).jqxWindow({ resizable: false });
	if (style.indexOf('drag')>=0) $("#"+pid).jqxWindow({ draggable: false });
	else $("#"+pid).jqxWindow({ draggable: true });
	if (style.indexOf('close')>=0) $("#"+pid).jqxWindow({ showCloseButton: false });
	if (style.indexOf('collapse')>=0) $("#"+pid).jqxWindow({ showCollapseButton: true });
	if (top!=undefined && left!=undefined && top>0 && left>0){ 
		$("#"+pid).jqxWindow({ position: { y: top, left: left }});
	} 
	$("#"+pid).jqxWindow(sys.theme);
	//设置底层的fieldset属性
	$("#"+xid).css(myTextCss(0,0,0,0));
	$("#"+xid).css(sys.theme);
	$("#"+xid).css({position: 'relative', width: 0, height: 0});
	$("#"+id).css(myTextCss(0,0,0,0));
	$("#"+id).css(sys.theme);
	$("#"+id).css({position: 'absolute', top:0, left:0, width: 0, height: 0});
	if (tabs!='') var deltay=65;
	else var deltay=35;
	if (buttons=='ok' || buttons=='okcancel' || buttons=='savecancel'){
		$("#"+id).append("<input type='button' value='确定' id='"+id+"OkBtn' />");
		if (buttons=='ok') $("#"+id+"OkBtn").css(myTextCss(height-deltay,width-70-20,0,70));
		else $("#"+id+"OkBtn").css(myTextCss(height-deltay,width-2*70-20,0,70));
		$("#"+id+"OkBtn").jqxButton();
	}
	if (buttons=='savecancel'){
		$("#"+id).append("<input type='button' value='保存' id='"+id+"SaveBtn'/>");
		if (buttons=='ok') $("#"+id+"SaveBtn").css(myTextCss(height-deltay,width-70-20,0,70));
		else $("#"+id+"OkBtn").css(myTextCss(height-deltay,width-2*70-20,0,70));
		$("#"+id+"OkBtn").jqxButton();
	}
	if (buttons=='cancel' || buttons=='okcancel' || buttons=='savecancel'){
		$("#"+id).append("<input type='button' value='取消' id='"+id+"CancelBtn' />");
		$("#"+id+"CancelBtn").css(myTextCss(height-deltay,width-70-20,0,70));
		$("#"+id+"CancelBtn").jqxButton();
		$("#"+id+"CancelBtn").on('click', function () {
			$("#"+id).jqxWindow('close');		
		});
	}
	//生成带mytab的窗体
	if (tabs!=''){ 
		//一个myFormTab-Tab容器，多个myFormTab1,2,n，
		var xid1=id+'Tab';
		var xid2=id+'Panel';
		var str="<div style='overflow:auto; margin:0px 0px 0px 0px; padding:0px 0px 0px 0px;'>";
		str+="<div id='"+xid1+"' style='overflow: hidden; margin:2px 0px 0px 0px; padding:0px 0px 0px 0px;'>";
		str+="<ul>";
		var tmp=tabs.split(';');
		for (var i=0; i<tmp.length; i++){
			if (i==0) str+="<li style='margin-left: 8px;'>"+tmp[i]+"</li>";
			else str+='<li>'+tmp[i]+'</li>';
		}	
		str+='</ul>';
		for (var i=0; i<tmp.length; i++){
			//生成tabpanel
			str+="<div id='"+xid2+1*(i+1)+"' style='overflow: auto; margin: 0px 0px 0px 0px; padding:0px 0px 0px 0px\'></div>";
		}	
		str+="</div>";
		str+="</div>";
		//父类容器为myFormPanel-相对地址
		$("#"+pid).append(str);
		//str='$("'+str+'").appendTo("#'+pid+'");\n';
		$("#"+xid1).css(myTextCss(30,3,0,0));
		if (buttons!=''){
			$("#"+xid1).jqxTabs({position: 'top',width: (width-8), height: (height-80)});
		}else{
			$("#"+xid1).jqxTabs({position: 'top',width: (width-8), height: (height-30)});
		}
		$("#"+xid1).jqxTabs(sys.theme);
		for (var i=0; i<tmp.length; i++){
			//增加一个fieldset在其中	
			var xid3=xid1+1*(i+1);  //myFormTab1...
			var pid1=xid2+1*(i+1);
			 //groove/inset/ridge/ouset/double 
			$("<fieldset id='"+xid3+"' style='margin:0px 0px 0px 0px; padding:0px 0px 0px 0px; border:0px groove'></fieldset>").appendTo("#"+pid1);
			$("#"+xid3).css(myTextCss(0,0,0,0));
			$("#"+xid3).css(sys.theme);
			$("#"+xid3).css({position: 'relative', width: 0, height: 0});
		}
	}
		
}

function myGetComboxData(id,sql){  //从后台获取数据直接给客户端
	//console.log(id+'---'+sql)	
 	 $.ajax({     
		type: "Post",     
		url: "system/jqx_getComboxData.jsp",     
		//contentType: "application/json; charset=utf-8",     
		//dataType: "json", 
		data: {database: sysdatabasestring, sqlString: sql}, 
		async: false,    
		success: function(data) {     
			//返回的数据用data获取内容,直接复制到客户端数组source      
			//console.log(data);
			var source=eval(data); 
			$("#"+id).jqxComboBox({ source: source });
			$("#"+id).jqxComboBox('selectIndex',0);    
		},     
		error: function(err) {     
			alert(err);     
		}     
	}); 
}