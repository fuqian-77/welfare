Ext.onReady(function(){
	//用于避免多次重复加载树
    Ext.override(Ext.data.TreeStore, { 
		load: function(options) { 
			options = options || {}; 
			options.params = options.params || {}; 
			var me = this, 
			node = options.node || me.tree.getRootNode(), 
			root; 
			if (!node) { 
				node = me.setRootNode({ 
					expanded: true 
				}); 
			} 
			if (me.clearOnLoad) { 
				node.removeAll(false); 
			} 
			Ext.applyIf(options, { 
				node: node 
			}); 
			options.params[me.nodeParam] = node ? node.getId() : 'root'; 
			if (node) { 
				node.set('loading', true); 
			} 
			return me.callParent([options]); 
		} 
	});
})

function setBtnStatus(id){//该函数用于防止快速连续点击按钮 导致数据混乱
    var delayToChangeBtnStatus= new Ext.util.DelayedTask(function(){
    	Ext.getCmp(id).setDisabled(false);
    })
    Ext.getCmp(id).setDisabled(true);//按钮点击后设置极短的时间不可用，则通过延时函数执行 设置其可用
    delayToChangeBtnStatus.delay(300);
}

/**
 * 获取当前路径
 * 
 * @param {}
 *            msg
 */
function getRootPath(){    //http://localhost:8083/uimcardprj/share/meun.jsp    
	var curWwwPath=window.document.location.href;    // uimcardprj /meun.jsp    
	var pathName=window.document.location.pathname;    
	var pos=curWwwPath.indexOf(pathName);    //  http://localhost:8083    
	var localhostPaht=curWwwPath.substring(0,pos);    ///uimcardprj    
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
	return(localhostPaht+projectName);
}

/**
 * 显示请求等待进度条窗口
 * 
 * @param {}
 *            msg
 */
function showWaitMsg(msg) {
	Ext.MessageBox.show({
				title : '系统提示',
				msg : msg == null ? '正在处理数据,请稍候...' : msg,
				progressText : 'processing now,please wait...',
				width : 300,
				wait : true,
				waitConfig : {
					interval : 150
				}
	});
}

/**
 * 隐藏请求等待进度条窗口
 */
function hideWaitMsg() {
	Ext.MessageBox.hide();
}

/**
 * 将JS数组转换为JS字符串 表格复选框专用
 */
function jsArray2JsString(arrayChecked, id) {
	var strChecked = "";
	for (var i = 0; i < arrayChecked.length; i++) {
		strChecked = strChecked + arrayChecked[i].get(id) + ',';
	}
	return strChecked.substring(0, strChecked.length - 1)
}

/**
 * 清除Ext.Form表单元素
 */
function clearForm(pForm) {
	var formItems = pForm.items['items'];
	for (i = 0; i < formItems.length; i++) {
		element = formItems[i];
		element.setValue('');
		element.reset(); // 避免出现红色波浪线
	};
}

/**
 * 复制到剪贴板
 */
function copyToClipboard(txt) {
	if (window.clipboardData) {
		window.clipboardData.clearData();
		window.clipboardData.setData("Text", txt);
	} else if (navigator.userAgent.indexOf("Opera") != -1) {
		window.location = txt;
	} else if (window.netscape) {
		try {
			netscape.security.PrivilegeManager
					.enablePrivilege("UniversalXPConnect");
		} catch (e) {
			Ext.Msg
					.alert(
							'提示',
							"复制单元格操作被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'")
		}
		var clip = Components.classes['@mozilla.org/widget/clipboard;1']
				.createInstance(Components.interfaces.nsIClipboard);
		if (!clip)
			return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1']
				.createInstance(Components.interfaces.nsITransferable);
		if (!trans)
			return;
		trans.addDataFlavor('text/unicode');
		var str = new Object();
		var len = new Object();
		var str = Components.classes["@mozilla.org/supports-string;1"]
				.createInstance(Components.interfaces.nsISupportsString);
		var copytext = txt;
		str.data = copytext;
		trans.setTransferData("text/unicode", str, copytext.length * 2);
		var clipid = Components.interfaces.nsIClipboard;
		if (!clip)
			return false;
		clip.setData(trans, null, clipid.kGlobalClipboard);
		// Ext.Msg.alert('提示','单元格内容已成功复制到剪贴板!')
	}
}

// 这个可以验证15位和18位的身份证，并且包含生日和校验位的验证。
function isIdCardNo(num) {
	if (Ext.isEmpty(num))
		return false;
	num = num.toUpperCase();
	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
	if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
		Ext.MessageBox.alert('提示',
				'输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
		return false;
	}
	// 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	// 下面分别分析出生日期和校验位
	var len, re;
	len = num.length;
	if (len == 15) {
		re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
		var arrSplit = num.match(re);
		// 检查生日日期是否正确
		var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/'
				+ arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2]))
				&& ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
				&& (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			Ext.MessageBox.alert('提示', '输入的身份证号里出生日期不对！');
			return false;
		} else {
			// 将15位身份证转成18位
			// 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5,
					8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4',
					'3', '2');
			var nTemp = 0, i;
			num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			num += arrCh[nTemp % 11];
			return num;
		}
	}
	if (len == 18) {
		re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
		var arrSplit = num.match(re);
		// 检查生日日期是否正确
		var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/"
				+ arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2]))
				&& ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
				&& (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			// alert(dtmBirth.getYear());
			// alert(arrSplit[2]);
			Ext.MessageBox.alert('提示', '输入的身份证号里出生日期不对！');
			return false;
		} else {
			// 检验18位身份证的校验码是否正确。
			// 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			var valnum;
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5,
					8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4',
					'3', '2');
			var nTemp = 0, i;
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[nTemp % 11];
			if (valnum != num.substr(17, 1)) {
				Ext.MessageBox.alert('提示', '18位身份证的校验码不正确！应该为:' + valnum);
				return false;
			}
			return num;
		}
	}
	return false;
}


function showUppder(sum){//将数字金额转换为大写
	var s ="￥";//存放最终返回结果
	var m=0; //用于标记万元以下的是否有值
	if(sum==0){
		s+="零";	
	}else if(Math.floor((sum*100)/Math.pow(10,10))!=0){//判断是否过亿
		var num = Math.floor((sum*100)/Math.pow(10,10));//获取亿元单位的值
		s+=contactString(num,'亿');
		var wan_num = Math.floor((sum*100)%Math.pow(10,10)/Math.pow(10,6));//除去亿  获取万单位的值
		s+=contactString(wan_num,'万');
	}else if(Math.floor((sum*100)/Math.pow(10,6))!=0){//判断是否过万
		var wan_num = Math.floor((sum*100)/Math.pow(10,6));//获取万单位的值
		s+=contactString(wan_num,'万');
	}
	if(Math.floor((sum*100)%Math.pow(10,6)/Math.pow(10,2))!=0){
		var yuan_num = Math.floor((sum*100)%Math.pow(10,6)/Math.pow(10,2));//获取万单位的值
		s+=contactString(yuan_num,'');
	}
	if(Math.floor((sum*100)%Math.pow(10,2))!=0){//至少含有角|分中的一个单位有值
		if(Math.floor((sum*100)%Math.pow(10,6)/Math.pow(10,2))!=0){
			s+='元';
		}
		var jiao_num = Math.floor((sum*100)%Math.pow(10,2));//含角分
		if(Math.floor(jiao_num/10)!=0){//角单位含有值
			s+=checkUpper(Math.floor(jiao_num/10))+checkUnit(2);
			if(Math.floor(jiao_num%10)!=0){//分单位含有值
				s+=checkUpper(Math.floor(jiao_num%10))+checkUnit(1);
			}
		}else if(Math.floor(jiao_num%10)!=0){//角单位没有值 ，则在分之前加零
			s+='零'+checkUpper(Math.floor(jiao_num%10))+checkUnit(1);
		}
	}else{
		s+='元整';
	}
	return s;
}

function contactString(sum,unit){//组合字符串
	var isHasZero=0;
	var str='';
	var i =0;
	var length = sum.toString().length;//获取数值长度
	if(length==4){//当length为4，表示仟位上有值
		for(var n=length-1;n>=0;n--){//循环遍历
			if(n==0){
				if(Math.floor(sum%Math.pow(10,1))!=0){
					str+=checkUpper(Math.floor(sum%Math.pow(10,1)));
					i=1;
				}
			}else{
				if(Math.floor(sum%Math.pow(10,n+1)/Math.pow(10,n))!=0){
					if(isHasZero==1){
						str+='零';
						isHasZero=0;
					}
					str+=checkUpper(Math.floor(sum%Math.pow(10,n+1)/Math.pow(10,n)))+checkUnit(n+3);
					i=1;
				}else if(isHasZero==0){
					isHasZero=1;
				}
			}
		}
	}else if(length==1){//只有个位含有值
		if(Math.floor(sum%Math.pow(10,1))!=0){
			str+='零'+checkUpper(Math.floor(sum%Math.pow(10,1)));
			i=1;
		}
	}else{//其他情况
		for(var n=length-1;n>=0;n--){
			if(n==0){
				if(Math.floor(sum%Math.pow(10,1))!=0){
					str+=checkUpper(Math.floor(sum%Math.pow(10,1)));
					i=1;
				}
			}else{
				if(Math.floor(sum%Math.pow(10,n+1)/Math.pow(10,n))!=0){
					if(isHasZero==1){
						str+='零';
						isHasZero=0;
					}
					str+=checkUpper(Math.floor(sum%Math.pow(10,n+1)/Math.pow(10,n)))+checkUnit(n+3);
					i=1;
				}else if(isHasZero==0){
					isHasZero =1;
				}
			}
		}
	}
	if(i==1){
		str+=unit;
	}
	return str;		
}

function checkUnit(value){//替换单位值
   switch(value){
   	 case 1:
       return "分" ;
     case 2:
       return "角" ;
     case 3:
       return "元" ;
     case 4:
       return "拾" ;
     case 5:
       return "佰" ; 
     case 6:
       return "仟" ;
     case 7:
       return "万" ;
     case 8:
       return "亿" ; 
     default:
       return "" ;
   }
}

function checkUpper(value){//转换大写
		switch (value){
		    case 0:
		    	return "零" ;
			case 1 : 
				return "壹";
			case 2 : 
				return "贰";
			case 3 : 
				return "叁";
			case 4 : 
				return "肆";
			case 5 : 
				return "伍";
			case 6 : 
				return "陆";
			case 7 : 
				return "柒";
			case 8 : 
				return "捌";
			case 9 : 
				return "玖";
			default:
				return "零" ;
		}
}