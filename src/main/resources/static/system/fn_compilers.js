//检测版本
//1.IE9+ Firefox Chrome Safari Opera
//2.IE8及之前版本

//2014年7月12日

/*
 * 用法
 * var xmlSrc = 'xml/pCustomerEdit.xml';
 * var myCompiler = new Compiler();
 * var p = myCompiler.compiler(xmlSrc);
 * 
 * <service type="documents">			(1)
 * 		<title>lx</title>				(2)
 * 		<form name="form1">				(3)
 * 			<groupbox name="gb1" title="xgb1"/>		(4)
 * 			<groupbox name="gb2"/>		(5)
 * 		</form>
 * 		<validation>val1>0</validation>	(6)
 * 		<validation>val2=1</validation>	(7)
 * </service>
 * 
 * 
 * 解析结果：
 * {
 * 		type: 'documents',				(1)
 * 		title: [{xvalue: 'lx'}],		(2)
 * 		form: [{
 * 			name: 'form1',				(3)
 * 			groupbox: [{
 * 				name: 'gb1',			(4)
 * 				title: 'xgb1'
 * 			}, {
 * 				name: 'gb2'				(5)
 * 			}]
 * 		}],
 * 		validation: [{
 * 			xvalue: 'val1>0'			(6)
 * 		}, {
 * 			xvalue: 'val2=2'			(7)
 * 		}],
 * 		xfielddim: [{
 * 			type: 'groupbox',
 * 			name: 'gb1',
 * 			parent: 'form1',
 * 			ancestor: 'form1',
 * 			attrs: {title: 'xgb1'}
 * 		}, {
 * 			type: 'groupbox',
 * 			name: 'gb2',
 * 			parent: 'form1',
 * 			ancestor: 'form1'
 * 		}]
 * }
 * 
 * 取值：
 * console.log(p.type);//取模板的类型,值为'documents'						(1)
 * console.log(p.title[0].xvalue);//取模板的标题,值为'lx'					(2)
 * console.log(p.form[0].name);//取表单名称,值为'form1'					(3)
 * console.log(p.form[0].groupbox[0].name);//取groupbox的名称, 值为'gb1'  (4)/(5)
 * console.log(p.validation[0].xvalue);//取validation的表达式,值为'val1>0'	(7)/(8)
 * 
 * 考虑的情况
 * 1.元素的属性值:tagName.attr
 * 2.元素的子标签
 * 		(1)子标签只有一个如:tagName.childTagName
 * 		(2)子标签有多个，如<groupbox>包含了多个<textfield>:tagName.childTagName[i]
 * 3.元素的文本节点值
 * 		(1)元素有同名的兄弟元素，如<validaton>:
 * 				validation[i].xvalue
 * 		(2)元素没有同名的兄弟元素，如<title>
 * 				title.xvalue
 * 
 * 判断JS类型
 * 1.Array
 * 		p.constructor == Array  or   p instanceof Array
 * 2.Object
 * 		p.constructor == Object
*/

//构造函数
function Compiler(){
	//this.cmp = '@textfield@combo@label@labelfield@readonlyfield@linkfield@buttonfield@checkbox@memofield@sysuser@sysdate@fileupload@filedownload@treepicker@datefield@numberfield@spinfield@checkbox@groupbox@',
	//需要存入xfielddim数组的对象集合
	this.cmp = [
		'textfield','combo','combofield','label','labelfield',
		'readonlyfield','displayfield','linkfield',
		'textpicker','gridpicker','treepicker','editbutton',
		'checkbox','memofield','memo',
		'sysuser','sysdate','sysusername','sysnumber','syspageno',
		'fileupload','filedownload','filefield','imageupload',
		'datefield','password',
		'numberfield','decimalfield','rmb','totalfields','summaryfields',
		'spinfield',
		'groupbox',
		'tab'
	];
	//需要记录序号的对象集合
	this.indexCmp = {
		'form': 0,//编号从1开始
		'tab': 0,
		'groupbox': 0,
		'grid': 0,
		'detailgrid': 0,
		'report':0,
		'footer':0
		
	};
	//数组对象
	this.xfielddim = [];
}

//程序入口函数
Compiler.prototype.compiler = function(xmlSrc){
	var me = this;//指Compiler类型的对象
	
	var xmldoc = null;
	try{
		xmldoc = me.fnParseXML(xmlSrc);
		if(typeof xmldoc.documentElement == 'undefined' || xmldoc.documentElement.nodeName.toUpperCase() != 'SERVICE'){
			throw Exception('Error3: No available DocumentElement.');
		}
		var obj = me.fnCapsulate(xmldoc);
		return obj;
	}catch(e){
		//alert(e.message);
		return false;
	}
}

//检测IE环境中有效的XML文档版本
//文档模式非严格模式适用
Compiler.prototype.fnCreateDocument = function(){
	try{
		if(typeof arguments.callee.activeXString != 'string'){
			var xmlVersions = [
				'MSXML2.DOMDocument.6.0',//JS可处理的最新版本
				'MSXML2.DOMDocument.3.0',//JS使用的最低建议版本
				'MSXML2.DOMDocument'//后备版本
			];	
			
			for(var i = 0, len = xmlVersions.length; i < len; i++){
				try{
					new ActiveXObject(xmlVersions[i]);
					arguments.callee.activeXString = xmlVersions[i];
					break;
				}catch(e){
					//继续循环
				}
			}
		}
		//console.log('ActiceXObject_XML');
		return new ActiveXObject(arguments.callee.activeXString);//返回ActiveXObject对象创建的Document实例
	}catch(e){
		//console.log('createDocument');
		try{
			return document.implementation.createDocument("","",null);
		}catch(e){
			throw new Error('ERROR0: No XML Document object available.');//抛出异常
		}
	}	
}

//创建XMLHttpRequest对象
Compiler.prototype.fnCreateXHR = function(){
	if(typeof XMLHttpRequest != 'undefined'){//for IE9+ firefox chrome etc
		//console.log('XHR');
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject != 'undefined'){//for IE8
		if(typeof arguments.callee.activeXString != 'string'){
			var versions = [
				'MSXML2.XMLHttp.6.0',//JS可处理的最新版本
				'MSXML2.XMLHttp.3.0',//JS使用的最低建议版本
				'MSXML2.XMLHttp'//后备版本
			];	
			
			for(var i = 0, len = versions.length; i < len; i++){
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				}catch(e){
					//继续循环
				}
			}
		}
		//console.log('ActiveXObject_XHR');
		return new ActiveXObject(arguments.callee.activeXString);//返回ActiveXObject对象创建的Document实例
	}else{
		throw new Error('ERROR0: No XHR object available.');//抛出异常
	}
}

//解析XML文件为DOM文档
//xmlSrc为文件的相对路径
Compiler.prototype.fnParseXML = function(xmlSrc){
	var me = this;
	
	var xmldoc = null;
	try{
		var xhr = me.fnCreateXHR();//该函数可能会抛出异常
		xhr.open('get', xmlSrc, false);//启动同步GET请求
		xhr.send(null);//发生请求	null表示请求主体发送的数据
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
			xmldoc = xhr.responseXML;//可能为空
		}
	}catch(e){
		try{
			xmldoc = me.fnCreateDocument();//可能会抛出异常
			xmldoc.async = false;//同步
			xmldoc.load(xmlSrc);//加载服务器端XML文件,可能抛出异常
			//检测异常
			//console.log(xmldoc.parseError)
			if(typeof xmldoc.parseError != 'undefined'){
				if(xmldoc.parseError != 0){
					throw new Error('Error1: Document<br/>' + '错误代码:' + xmldoc.parseError.errorCode + '<br/>' + '第' + xmldoc.parseError.line + '行 第' + xmldoc.parseError.linepos) + '个字符<br/>' + '错误原因:'+xmldoc.parseError.reason; 
				}
			}
		}catch(error){
			throw new Error(e.message + '<br/>' + error.message);//抛出异常
		}
	}
	if(xmldoc && xmldoc.nodeType == 9 && xmldoc.documentElement){
		var errors = xmldoc.getElementsByTagName('parsererror');
		if(errors.length > 0){
			throw new Error('Error2: XML Document object is undefined.<br/>错误类型：'+ errors[0].childNodes[0].nodeValue);		
		}else{
			return xmldoc;
		}
	}else{
		throw new Error('Error2: XML Document object is undefined.');
	}
}

//封装数据
Compiler.prototype.fnCapsulate = function(xmldoc){
	var me = this;
	
	var obj = new Object();
	var root = xmldoc.documentElement;//文档节点/根节点
	var rootAttrs = root.attributes;
	
	//读取模板特性
	//包括模板类型type
	var serviceAttrs = new Object(),
		attrName, attrValue;
	for(var i = 0; i < rootAttrs.length; i++){
		attrName = rootAttrs.item(i).nodeName.toLowerCase();
		attrValue = rootAttrs.item(i).value;  //nodeValue
		//specified属性表名该属性是用户指定的特性而非IE自动生成的
		if(rootAttrs.item(i).specified){
			if(Ext.isEmpty(serviceAttrs[attrName])){
				serviceAttrs[attrName] = attrValue;
			}else if(serviceAttrs[attrName] instanceof Array){
				//处理重复特性,实际上不允许存在重复特性
				var length = serviceAttrs[attrName].length;
				serviceAttrs[attrName][length] = attrValue;
			}else{
				//处理重复特性
				var tmp = serviceAttrs[attrName];
				serviceAttrs = new Array();
				serviceAttrs[0] = tmp;
				serviceAttrs[1] = attrValue;
			}
		}
	}
	
	obj['service'] = serviceAttrs;
	obj = Ext.Object.merge(obj, me.fnTraversal(xmldoc, root));//遍历DOM节点
	obj.xfielddim = me.xfielddim;//需要记录到数组中去的表单组件
	//console.log(me.xfielddim.length);
	//obj.config = fnTraversal(root);//遍历DOM节点
	return obj;
}

//遍历DOM节点
//深度优先
Compiler.prototype.fnTraversal = function(xmldoc, root){
	var me = this;//调用该函数的对象
	
	var obj = new Object();//存储遍历的结果
	
	//判断当前节点是否有根节点
	if(root.hasChildNodes() == false){
		return null;
	}
	
	//一致性检测
	var supportsTraversals = document.implementation.hasFeature('Traversal', '2.0');
	//能力检测
	var supportsTreeWalker = (typeof document.createTreeWalker == 'function');
	
	//非IE
	if(supportsTraversals && supportsTreeWalker){
		//console.log('非IE遍历');
		obj = me.fnTraversalNIE(xmldoc, root);
	}else{//IE
		//console.log('IE遍历');
		obj = me.fnTraversalIE(xmldoc, root);
	}
	return obj;
}

//非IE遍历DOM节点
Compiler.prototype.fnTraversalNIE = function(xmldoc, root){
	var me = this;
	var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null, false);//遍历元素节点
	var obj = new Object();//存储遍历的结果	
	var child = walker.firstChild();//第一个子节点
	
	while(child != null){
		var tagName = child.tagName.toLowerCase();//标签名、属性名
		var xfielddimFlag = me.cmp.indexOf(tagName) >= 0;//是否需要记录到xfielddim对象数组中去
		var xfielddimObj = new Object();
		var attrObj = new Object();//记录元素的属性
		
		//child = <TagName Attr1="value1" Attr2="value2">TextNode</TagName>
		
		//取元素的属性子节点AttrNodes
		var i, len;
		for(i = 0, len = child.attributes.length; i < len; i++){
			var attr = child.attributes[i];
			var attrName = attr.nodeName.toLowerCase();//Attr节点
			var attrValue = attr.value; //nodeValue;  
			if(attr.specified){
				attrObj[attrName] = attrValue;
			}
		}
		
		//取元素的文本子节点TextNodes
		child.normalize();//元素节点的文本子节点规范化处理
		var childTextWalker = document.createTreeWalker(child, NodeFilter.SHOW_TEXT, null, false);//遍历元素节点的文本子节点
		var childTextNode = childTextWalker.firstChild();
		if(childTextNode != null){
			var value = childTextNode.nodeValue;
			value = Ext.String.trim(value);//处理空白文本子节点
			if(value.length > 0){
				attrObj.xvalue = value;
			}
		}
		
		//记录表单元素序号
		if(!Ext.isEmpty(me.indexCmp[tagName])){
			var index = ++me.indexCmp[tagName];
			child.setAttribute('xindex', tagName + index);//记录序号,如form0,tab0,form0
		}
		
		//当前节点为非叶子节点,包含元素子节点ElementNode
		if(child.hasChildNodes()){
			var childObj = me.fnTraversalNIE(xmldoc, child);//迭代
			if(!fnObjIsEmpty(childObj)){
				attrObj = Ext.merge(attrObj, childObj);//合并属性解析值和子元素解析值
			}
		}
		
		if(typeof obj[tagName] == 'undefined'){
			obj[tagName] = new Array();
		}
		
		if(obj[tagName] instanceof Array){
			var length = obj[tagName].length;
			obj[tagName][length] = attrObj;//增加配置属性
		}else{
			obj[tagName] = attrObj;
		}
		
		if(xfielddimFlag){
			xfielddimObj.type = tagName;//组件类型
			
			//记录name
			var xname = child.getAttribute('name') || child.getAttribute('xindex');//属性名不区分大小写
			if(!Ext.isEmpty(xname)){
				xfielddimObj.name = xname;
			}
			//记录父元素序号parent
			var xparent = child.parentNode.getAttribute('xindex');
			if(!Ext.isEmpty(xparent)){
				xfielddimObj.parent = xparent;//记录父元素的xindex
			}
			
			//记录祖先节点ancestor
			var pNode = child.parentNode, topNode;
			while(!Ext.isEmpty(pNode) && pNode != xmldoc.documentElement){
				topNode = pNode;
				if(topNode.tagName.toLowerCase() == 'tab'){
					pNode = null;//结束循环
				}else{
					pNode = pNode.parentNode;
				}
			}
			var xancestor = topNode.getAttribute('name') || topNode.getAttribute('xindex');
			if(!Ext.isEmpty(xancestor)){
				xfielddimObj.ancestor = xancestor;
			}
			
			//记录attrs
			var xattrObj = Ext.clone(attrObj);//克隆JS对象
			//delete xattrObj.name;  //移除name属性
			if(!fnObjIsEmpty(xattrObj)){
				xfielddimObj.attrs = xattrObj;
			}
			
			me.xfielddim.push(xfielddimObj);
		}
		
		child = walker.nextSibling();//下一个子节点
	}
	return obj;
}

//IE遍历DOM节点
Compiler.prototype.fnTraversalIE = function(xmldoc, root){
	var me = this;
	var obj = new Object();//存储遍历的结果
	var child = root.firstChild;//文档节点的第一个子节点
	
	//遍历子节点
	while(child != null){
		if(child.nodeType == 1){//元素节点
			//标签值
			var tagName = child.tagName;
			if(Ext.typeOf(tagName) == 'string'){
				tagName = tagName.toLowerCase();
			}
			var xfielddimFlag = Ext.Array.indexOf(me.cmp, tagName) >= 0;//IE不支持JS的indexOf函数
			//console.log(xfielddimFlag + ':' +tagName + ':' + child.getAttribute('name'))
			var xfielddimObj = new Object();
			//var xattrObj = new Object();
			
			var attrObj = new Object();//特性
			
			child.normalize();//规范化文本子节点
			
			//读取当前元素属性值
			var i, len;
			for(i = 0, len = child.attributes.length; i < len; i++){
				var attr = child.attributes[i];
				var attrName = attr.nodeName.toLowerCase();//Attr节点
				var attrValue = attr.nodeValue;
				if(attr.specified){
					attrObj[attrName] = attrValue;
					//xattrObj = Ext.clone(attrObj);
				}
			}
			
			//记录表单元素序号
			if(!Ext.isEmpty(me.indexCmp[tagName])){
				var index = ++me.indexCmp[tagName];
				var xindex = tagName + index;
				child.setAttribute('xindex', xindex);
			}
			
			//遍历当前元素的文本子节点和元素子节点
			if(child.hasChildNodes()){
				var childObj = me.fnTraversalIE(xmldoc, child);//迭代
				
				if(!fnObjIsEmpty(childObj)){
					attrObj = Ext.merge(attrObj, childObj);//合并对象
				}
				
				var xchild = child.firstChild;
				
				while(xchild != null){
					//文本节点,对于元素之间的空格，除了IE9和之前版本,其他浏览器均会返回文本节点
					if(xchild.nodeType == 3){
						var str = xchild.nodeValue;
						str = Ext.String.trim(str);
						if(str.length > 0){//排除空白文本节点
							attrObj.xvalue = str;
							//xattrObj.xvalue = str;
						}
					}
					xchild = xchild.nextSibling;//兄弟节点
				}
			}
			
			if(xfielddimFlag){
				xfielddimObj.type = tagName;//组件类型
				
				//记录name
				var xname = child.getAttribute('name') || child.getAttribute('xindex');//属性名不区分大小写
				if(!Ext.isEmpty(xname)){
					xfielddimObj.name = xname;
				}
				
				//记录祖先节点ancestor
				var xparent = child.parentNode.getAttribute('xindex');
				if(!Ext.isEmpty(xparent)){
					xfielddimObj.parent = xparent;//记录父元素的xindex
				}
				
				//记录祖先节点ancestor
				var pNode = child.parentNode, topNode;
				while(!Ext.isEmpty(pNode) && pNode != xmldoc.documentElement){
					topNode = pNode;
					if(topNode.tagName.toLowerCase() == 'tab'){
						pNode = null;//结束循环
					}else{
						pNode = pNode.parentNode;
					}
				}
				var xancestor = topNode.getAttribute('name') || topNode.getAttribute('xindex');
				if(!Ext.isEmpty(xancestor)){
					xfielddimObj.ancestor = xancestor;
				}
				
				var xattrObj = Ext.clone(attrObj);//克隆JS对象
				//delete xattrObj.name;//移除name属性
				if(!fnObjIsEmpty(xattrObj)){
					xfielddimObj.attrs = xattrObj;
				}
				
				me.xfielddim.push(xfielddimObj);
			}
			
			if(!fnObjIsEmpty(attrObj)){
				if(typeof obj[tagName] == 'undefined'){//未定义
					obj[tagName] = new Array();
				}
				obj[tagName].push(attrObj);//增加配置属性
			}
		}
		child = child.nextSibling;//下一个兄弟节点
	}
	return obj;
}

/**************************************************功能函数**************************************************/
//检测对象是否为空对象,不包括任何可读属性
//Ext.isEmpty()不能判断看对象
function fnObjIsEmpty(obj){
	for(var p in obj){
		return false;
	}
	return true;
}

//清除字符串的空白
function trim(str){
	//浏览器能力检测
	if(typeof String.trim == 'function'){
		return str.trim();//ECMAScript5.0方法
	}else{
		var trimRegex = /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g;
		return str.replace(trimRegex, '');
	}
}

/**************************************************输出XML解析结果**************************************************/
//计算输出时的空白字符串长度
function fnCalculateBlank(level){
	var i, str = '';
	for(i = 0; i < level; i++){
		str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	}
	return str;
}

//输出Array对象
function fnArrayPrint(array, level){
	if(isNaN(level)){
		level = 0;
	}
	var blankText = fnCalculateBlank(level);
	if(!array instanceof Array){
		return;
	}
	var s = '[&nbsp;';
	var length = array.length, i;
	for(i = 0; i < length; i++){
		var str = null;	
		if(array[i] instanceof Array){
			str = arguments.callee.call(this, array[i], level + 1);//迭代
		}else if(typeof array[i] == 'object'){
			str = fnObjectPrint(array[i], level + 1);
		}else{
			str = array[i];
		}
		
		if(i+1 != length){
			s += str + ',&nbsp;';
		}else{
			s += str + '<br/>';
		}
	}
	s += blankText + ']';
	return s;
}

//输出Object
function fnObjectPrint(obj, level){
	if(isNaN(level)){
		level = 0;
	}
	
	var blankText = fnCalculateBlank(level);
	
	if(typeof obj != 'object'){
		return;
	}
	
	var a = '{<br/>';
	var array = new Array();
	
	for(var p in obj){
		var str = fnCalculateBlank(level+1) + '<font color="purple">' + p + ':</font>&nbsp;&nbsp;';
		if(obj[p] instanceof Array){
			str += fnArrayPrint(obj[p], level + 1);
		}else if(typeof obj[p] == 'object'){
			str += arguments.callee.call(this, obj[p], level + 1);//迭代
		}else{//String
			str += '"' + obj[p]+ '"';
		}
		array.push(str);
	}
	a += array.join(',<br/>');
	a += '<br/>' + blankText + '}';
	return a;
}
