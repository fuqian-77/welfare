//xxxxxxxxxxxxxml1
function myXmlReader(xmlfile){
	//sysfields="textfield;keyfield;datefield;numberfield;editorfield;combofield;dbcombofield;checkfield;checkboxfield;spinnerfield;searchfield;timefield;filefield;hiddenfield";
	pservice={};
	pservice.xmldata=[];
	t1=myLocalTime().timeid;
	//控件名称标识
	$.ajax({     
		type: "Post",     
		url: "system/easyui_xmlreader.jsp",  
		data:{xmlfile:xmlfile},
		async: false, method: 'post', 
		error: function(err) {     
			console.log(err);
		},
		success: function(data) {    
			pservice.xmldata=eval(data);
			//eval("pservice.xmldata=data");  //原始返回数据
		}
	});
	//console.log(myLocalTime().timeid-t1);
	return pservice;
}

//xxxxxxxxxxxxxxml2
function myXmlNodeValue(node){
	//处理xml文件每个节点
	nodetype=node.nodetype;
	var top=0, left=0, width=0, height=0, labelwidth=-1; 
	var id='', name='', value=''; 
	var dec=0, max='', min='', increment=1;
	var pformid='', ptabid='', pfieldsetid='';
	//var rowheight=34, labelwidth=-1;
	if (node.labelwidth!=undefined && !isNaN(node.labelwidth)) labelwidth=node.labelwidth; 
	else labelwidth=pservice.labelwidth;
	if (nodetype=='tab' || nodetype=='form' || nodetype=='fieldset'){
		if (node.rowheight!=undefined && !isNaN(node.rowheight)){
			pservice.rowheight=1*node.rowheight;
			rowheight=pservice.rowheight;
		}	
		if (node.labelwidth!=undefined && !isNaN(node.labelwidth)){
			pservice.labelwidth=1*node.labelwidth;
		}
	}
	if (node.id==undefined && node.name!=undefined) node.id=node.name; //???
	//处理可能存在的控件起始坐标位置pos
	if (node.pos!=undefined && node.pos!=''){
		//console.log(node.id, node.pos);
		tmp=node.pos.split(',');
		if (tmp.length>0 && tmp[0]!=''){
			 if (isNaN(tmp[0])) tmp[0]=eval(tmp[0]);
			 top=tmp[0];
		}
		if (tmp.length>1 && tmp[1]!=''){
			 if (isNaN(tmp[1])) tmp[1]=eval(tmp[1]);
			 left=tmp[1];
		}
		if (tmp.length>2 && tmp[2]!=''){
			 if (isNaN(tmp[2])) tmp[2]=eval(tmp[2]);
			 labelwidth=tmp[2];
		}
	}
	//处理可能存在的控件宽度高度小数位数
	if (node.size!=undefined && node.size!=''){
		tmp=node.size.split(',');
		if (tmp.length>0 && tmp[0]!=''){
			 if (isNaN(tmp[0])) tmp[0]=eval(tmp[0]);
			 height=tmp[0];
		}
		if (tmp.length>1 && tmp[1]!=''){
			 if (isNaN(tmp[1])) tmp[1]=eval(tmp[1]);
			 width=tmp[1];
		}
		if (tmp.length>2 && tmp[2]!=''){
			 if (isNaN(tmp[2])) tmp[2]=eval(tmp[2]);
			 dec=tmp[2];  //小数位数
		}
	}
	//处理可能存在的控件最大值最小值和步长
	if (node.range!=undefined && node.range!=''){
		tmp=node.range.split(',');
		if (tmp.length>0 && tmp[0]!=''){
			 if (isNaN(tmp[0])) tmp[0]=eval(tmp[0]);
			 min=tmp[0];
		}
		if (tmp.length>1 && tmp[1]!=''){
			 if (isNaN(tmp[1])) tmp[1]=eval(tmp[1]);
			 max=tmp[1];
		}
		if (tmp.length>2 && tmp[2]!=''){
			 if (isNaN(tmp[2])) tmp[2]=eval(tmp[2]);
			 increment=tmp[2];
		}
	}
	if (isNaN(top) && top!='') top=eval(top);
	if (top==undefined || top=='') top=0;
	if (isNaN(height) && height!='') height=eval(height);
	if (height==undefined || height=='') height=0;
	if (isNaN(left) || left=='') top=0;
	if (isNaN(width) || width=='') width=0;
	if (isNaN(labelwidth)|| labelwidth=='') labelwidth=0;
	if (isNaN(min) && min!='') min='';
	if (isNaN(max) && max!='') max='';
	if (isNaN(increment) || increment=='') increment=1;
	//记录本次各个类型的节点值
	//node.parent=parent;
	node.top=1*top;
	node.left=1*left;
	node.height=1*height;
	node.width=1*width;
	node.labelwidth=1*labelwidth;
	node.dec=1*dec;
	node.max=max;
	node.min=min;
	node.increment=increment;
	if (node.top==undefined) node.top=-1;
	if (node.left==undefined) node.left=-1;
	if (node.height==undefined) node.height=0;
	if (node.width==undefined) node.width=0;
	if (node.labelwidth==undefined) node.labelwidth=0;
	if (node.value==undefined) node.value='';
	if (node.style==undefined) node.style='';
	if (node.label==undefined) node.label='';
	if (node.parent==undefined) node.parent='';
	if (node.nodeindex==undefined) node.nodeindex=-1;
	if (node.max==undefined) node.max='';
	if (node.min==undefined) node.min='';
	if (node.dec==undefined) node.dec=0;
	if (node.increment==undefined) node.increment=1;
	if (node.textfield==undefined) node.textfield=''; 
	if (node.masterfield==undefined) node.masterfield='';
	if (node.filtersql==undefined) node.filtersql='';
	if (node.field==undefined) node.field=node.id;  //???是否需要加载这里，还是加载hidden函数定义中
	if (node.style!='') node.style=node.style.toLowerCase();
	if (node.textfield!='') node.textfield=node.textfield.toLowerCase();
	if (node.field!=undefined) node.field=node.field.toLowerCase();
	if (node.masterfield!='') node.masterfield=node.masterfield.toLowerCase();
	node.label=(node.label).trim().replaceAll(' ','&nbsp;');
	return node;
}

//xxxxxxxxxxxxxml3
function mySetXmlNodes(pservice){
	t1=myLocalTime().timeid;
	//设置每个节点的id、父节点id、父节点node、子节点id（分好分隔）
	pservice.defaultid={};
	pservice.defaultid.grid='myGrid';
	pservice.defaultid.tree='myTree';
	pservice.defaultid.form='myForm';
	pservice.defaultid.tab='myTab';
	pservice.defaultid.fieldset='myFieldset';
	pservice.nodeidset={};   //节点名称集合pservice.nodeidset.rf1是否存在，不存在就使用这个名称作为id
	pservice.editforms=[];
	pservice.queryforms=[];
	//pservice.form=[];
	pservice.tree=[];
	pservice.grid=[];
	var n=0;
	for (var i=0; i<pservice.xmldata.length; i++){
		var node=pservice.xmldata[i];
		//node=myXmlNodeValue(node);
		var nodetype=node.nodetype.toLowerCase();
		var varnodeid='pservice.'+nodetype+'_id'; //记录本类别节点，为下次父节点服务
		var varnodeindex='pservice.'+nodetype+'_index'; //记录本类别节点的序号i
		var varpnodeid='pservice.'+node.parentnodetype+'_id';  //上次记录的当前类别父节点的id
		var varpnodeindex='pservice.'+node.parentnodetype+'_index';  //上次记录的当前类别父节点的序号i
		if (node.id==undefined || node.id==''){
			//设置node的id，如果原来为空的话
			vp='pservice.defaultid'+'.'+nodetype;
			if (eval(vp)==undefined) eval(vp+'=nodetype');  //e.g pservice.defaultid.combofield='combofield'
			var k=1;
			while (true){
				node.id=eval(vp)+k;
				v='pservice.nodeidset.'+node.id;
				//利用变量是否存在，判断id值有没有被用过。
				if (eval(v)==undefined){  
					eval(v+'=i');
					break; 	//if ($('#'+node.id).length==0) break;
				}else{
					k++;
				}
			}
		}
		//console.log(i,node.id,nodetype);
		if (nodetype=='service'){ //记录这个页面的标题
			pservice.master=node;  //记录根节点
		}else if (nodetype=='title'){ //记录这个页面的标题
			pservice.pagetitle=node.nodetext;  //pservice.title已被使用
		}else if (nodetype=='form'){
			if (node.target=='edit') pservice.editforms.push(node);
			else pservice.queryforms.push(node);
			//pservice.form.push(node);
		}else if (nodetype=='tab'){ //未处理
			if (node.parent==undefined || node.parent=='') node.parent=eval(varpnodeid);
			if (node.tabid==undefined){
				node.tabid=node.parent+'Tab'  //myForm1Tab.e.g
			}
			//父节点新增一个属性，记录其子节点tabs的id集合
			node.parentnodeindex=eval(varpnodeindex);
			pnode=pservice.xmldata[node.parentnodeindex];
			if (pnode.tabs==undefined || pnode.tabs=='') pnode.tabs=node.tabid;
			//else pnode.tabs+=';'+node.tabid;
			pservice.xmldata[node.parentnodeindex]=pnode;			
		}else if (nodetype=='fieldset'){
			if (node.parent==undefined || node.parent=='') node.parent=eval(varpnodeid);		
			//父节点新增一个属性，记录其子节点fieldset的id集合
			node.parentnodeindex=eval(varpnodeindex);
			pnode=pservice.xmldata[node.parentnodeindex];
			if (pnode.fieldset==undefined) pnode.fieldset=node.id;
			else pnode.fieldset+=';'+node.id;
			pservice.xmldata[node.parentnodeindex]=pnode;
		}else if (nodetype=='grid' || nodetype=='tree'){
			if (node.parent==undefined || node.parent=='') node.parent=eval(varpnodeid);
			eval('pservice.'+nodetype+'.push(node)');
		}else if (nodetype=='button' || nodetype=='line' || nodetype=='link' ){
			//与数据库列无关的控件
			if (node.parent==undefined || node.parent=='') node.parent=eval(varpnodeid);		
		}else if (nodetype=='hiddenfield'){  //表单控件
			node.parent='body';
		}else if (nodetype.substr(nodetype.length-5,5)=='field'){  //表单控件
			if (node.parent==undefined || node.parent=='') node.parent=eval(varpnodeid);
		}  //if *field
		//记录父节点的子节点，把子节点记录到父节点的xchildren属性上去。
		eval(varnodeid+"='"+node.id+"'");
		eval(varnodeindex+"="+i);  //序号
		pservice.xmldata[i]=node;
	} //for i=0...next node
	console.log('set',myLocalTime().timeid-t1);
	return pservice;
}

//xxxxxxxxxxxxxml4
function myGenFormFromXmlNodes(pservice){
	pservice.defaultid={};
	pservice.defaultid.grid='myGrid';
	pservice.defaultid.tree='myTree';
	pservice.defaultid.form='myForm';
	pservice.defaultid.tab='myTab';
	pservice.defaultid.fieldset='myFieldset';
	pservice.nodeidset={};   //节点名称集合pservice.nodeidset.rf1是否存在，不存在就使用这个名称作为id
	pservice.filefieldset='';  //存储所有上传文件的控件
	pservice.labelwidth=-1;
	pservice.rowheight=34;
	pservice.filepath='';
	pservice.filetag='';
	pservice.focusfields=[];
	pservice.master={};
	pservice.keydownfields='';
	//pservice.wineditpanel='';
	//pservice.winquerypanel='';
	pservice.editablefieldset=[];
	pservice.eventset=[];
	pservice.editforms=[];
	pservice.queryforms=[];
	pservice.tree=[];
	pservice.grid=[];
	pservice.attachment={}; //附件显示位置
	pservice.attachment.layout!='mainlayout';
	pservice.attachment.id='attachment';
	pservice.attachment.height=180;
	pservice.attachment.tabpanel='myQueryTab';
	pservice.attachment.title='';
	pservice.attachment.position='south';
	rowheight=pservice.rowheight;
	var n=0;
	for (var i=0; i<pservice.xmldata.length; i++){
		node=pservice.xmldata[i];
		//node=myXmlNodeValue(node);
		nodetype=node.nodetype.toLowerCase();
		varcount='pservice.'+nodetype+'_count';
		varnodeid='pservice.'+nodetype+'_id'; //记录本类别节点，为下次父节点服务
		varpnodeid='pservice.'+node.parentnodetype+'_id';  //上次记录的当前类别父节点的id
		if (node.id==undefined || node.id==''){
			//设置node的id，按变量是否存在来判断node.id是否可以用
			vp='pservice.defaultid'+'.'+nodetype;
			if (eval(vp)==undefined) eval(vp+'=nodetype');  //e.g pservice.defaultid.combofield='combofield'
			var k=1;
			while (true){
				node.id=eval(vp)+k;
				v='pservice.nodeidset.'+node.id;
				if (eval(v)==undefined){
					eval(v+'=i');  //pservice.nodeidset.labelfield1=4表明这个对象变量已经存在，以后不能再使用
					break; 	//if ($('#'+node.id).length==0) break;
				}else{
					k++;
				}
			}
		}
		if (nodetype!='service'){ 
			//每个类型的控件设立一个数组去存放，例如pservice.textfield[1]...[n];
			varp="pservice."+nodetype;
			if (eval(varp)==undefined) eval(varp+"=[];");
			n=eval(varp+".length");
			varp="pservice."+nodetype+"["+n+"]";
			if (eval(varp)==undefined) eval(varp+"=node;");
		}
		if (eval(varcount)==undefined) eval(varcount+'=1;'); //控件id自动命名用
		if (nodetype=='service'){ //记录这个页面的标题
			pservice.master=node;  //记录根节点
		}else if (nodetype=='title'){ //记录这个页面的标题
			pservice.pagetitle=node.nodetext;  //pservice.title已被使用
		}else if (nodetype=='form'){
			if ($('#'+node.id).length==0){
				if (node.modal=='window') myWindow(node);				
				else myForm(node);
			} 
			if (node.height>0) $('#'+node.id).panel({height: node.height});
			$('#'+node.id).css({overflow:'auto'});
			$('#'+node.id).attr('xtarget', node.target);  //表单的用途：编辑、查询或其他
			if (node.target=='edit') pservice.editforms.push(node);
			else pservice.queryforms.push(node);
		}else if (nodetype=='tab'){ //未处理
			if (node.parent==undefined || node.parent=='') node.parent=eval(varpnodeid);
			if (node.tabid==undefined){
				node.tabid=node.parent+'Tab'  //myForm1Tab.e.g
			}
			if ($('#'+node.tabid).length==0){ //tabs如果原来不存在的话
				myTab(node);
			}else if ($('#'+node.id).length==0){  //这名称id的选项卡不存在时才创建
				//tabs已存在的话，添加一个sheet
				$('#'+node.tabid).tabs('add',{
					title: (node.title!=undefined)?node.title:'',
					id: node.id, fit: true, closable: false, selected: false
				});
			}
			//记录父节点有没有tab出现过，只记录第一个tab
			if ($('#'+node.parent).attr('xtab')==undefined) $('#'+node.parent).attr('xtab',node.tabid);
			//else $('#'+node.parent).attr('xtab',$('#'+node.parent).attr('xtab')+';'+node.tabid);
			$('#'+node.tabid).tabs({fit:true});
			$('#'+node.tabid).tabs('select', 0);
			$('#'+node.id).css({overflow:'auto', position:'relative'});  //relative必须加
			$('#'+node.tabid).css({overflow:'hidden'});
			//console.log('p', node.id,node.parent,node.title);		
		}else if (nodetype=='fieldset'){
			if (node.parent==undefined || node.parent=='') node.parent=eval(varpnodeid);
			myFieldset(node);
			if ($('#'+node.parent).attr('xfieldset')==undefined) $('#'+node.parent).attr('xfieldset',node.id);
			else $('#'+node.parent).attr('xfieldset',$('#'+node.parent).attr('xfieldset')+';'+node.id);
			//console.log('p', node.id,node.parent);	
		}else if (nodetype=='attachment'){
			if (node.filepath!=undefined) pservice.attachment.filepath=node.filepath; 
			if (node.filetag!=undefined) pservice.attachment.filetag=node.filetag; 
			if (node.tagfield!=undefined) pservice.attachment.tagfield="attachmentfiletype";
			if (node.tabpanel!=undefined && node.tabpanel!='') pservice.attachment.tabpanel=node.tabpanel;
			if (node.height!=undefined && node.height>0) pservice.attachment.height=node.height;
			if (node.id!=undefined) pservice.attachment.panel=node.id;  //改属性
			if (node.parent!=undefined) pservice.attachment.layout=node.parent; //改属性
		}else if (nodetype=='table'){
			pservice.table[n].keyfieldid='';
			pservice.table[n].nodeindex=node.nodeindex;  //xml节点序号
			pservice.table[n].title=node.title;  //数据库中文含义
			pservice.table[n].keyfield=node.keyfield;  //表的主键
			pservice.table[n].keyspec=node.keyspec;  //主键的中文含义
			pservice.table[n].encryptfields=node.encryptfields;  //加密隐藏列，不编辑这些数据
			pservice.table[n].hiddenfields=node.hiddenfields;  //不需要虚拟化加密的隐藏列
			pservice.table[n].formfields=node.keyfield;  //表中所有在表单中出现过的列的集合*field
			pservice.table[n].fields=eval(node.fields);  //所有字段的集合，为虚拟名称的一个数组
			if (node.keydownfields!=undefined) pservice.table[n].keydownfields=node.keydownfields;  //键盘操作列,需要转换为idpservice.table[n].keydownfields
			else pservice.table[n].keydownfields='';
			if (node.attachmenttagfield!=undefined) pservice.table[n].attachmenttagfield=node.attachmenttagfield; 
			else pservice.table[n].attachmenttagfield='attachmentfiletype';
		}else if (nodetype=='sql' || nodetype=='js' || nodetype=='action'){
			//记录事件
			pservice.eventset.push(node);
			varp="pservice."+nodetype;
		}else if (nodetype=='tree' || nodetype=='grid'){
			varp="pservice."+nodetype;
		}else if (nodetype=='button' || nodetype=='line' || nodetype=='link' ){
			//与数据库列无关的控件
			if (node.parent==undefined || node.parent=='') node.parent=eval(varpnodeid);		
			if (nodetype=='button') myButton(node);
			else if (nodetype=='line') myLine(node);
			else if (nodetype=='link') myLink(node);
		}else if (nodetype.substr(nodetype.length-5,5)=='field'){  //表单控件
			if (node.parent==undefined || node.parent=='') node.parent=eval(varpnodeid);
			for (k=0; k<pservice.table.length; k++){
				//console.log('pk='+pservice.table[k].keyfield,node.id,node.field);
				if (node.field==pservice.table[k].keyfield){ //找到主键对应的表单控件id
					pservice.table[k].keyfieldid=node.id;
					break;
				}
			}
			//把所有的列都加到最后一个table的formfields中去，必要时用pservice.formfields替代
			pservice.table[pservice.table.length-1].formfields+=';'+node.id;
			if (nodetype=='textfield'){
				myTextField(node);
				pservice.table[pservice.table.length-1].keydownfields+=';'+node.id;
			}else if (nodetype=='datefield'){
				myDateField(node);
				pservice.table[pservice.table.length-1].keydownfields+=';'+node.id;
			}else if (nodetype=='numberfield'){
				myNumberField(node);
				pservice.table[pservice.table.length-1].keydownfields+=';'+node.id;
			}else if (nodetype=='spinnerfield'){
				mySpinnerField(node);
			}else if (nodetype=='editorfield'){
				myEditorField(node);
			}else if (nodetype=='imagefield'){
				myImageField(node);
			}else if (nodetype=='combofield'){
				myComboField(node);
				pservice.table[pservice.table.length-1].keydownfields+=';'+node.id;
			}else if (nodetype=='dbcombofield'){
				myDBComboField(node);
				pservice.table[pservice.table.length-1].keydownfields+=';'+node.id;
			}else if (nodetype=='checkboxfield'){
				myCheckBoxField(node);
			}else if (nodetype=='timefield'){
				myTimeField(node);
				pservice.table[pservice.table.length-1].keydownfields+=';'+node.id;
			}else if (nodetype=='searchfield'){
				mySearchField(node);
				pservice.table[pservice.table.length-1].keydownfields+=';'+node.id;
			}else if (nodetype=='hiddenfield'){  //隐藏列处理
				//console.log(1,node.id,node.field);
				if (node.id!=undefined && node.field==undefined) node.field=node.id;
				else if (node.field!=undefined && node.id==undefined) node.id=node.field;
				//console.log(2,node.id,node.field);
				myHiddenField(node);				
			}else if (nodetype=='labelfield'){
				myLabelField(node);
			}else if (nodetype=='filefield'){
				myFileField(node);
				if (pservice.filefieldset!='') pservice.filefieldset+=';';
				pservice.filefieldset+=node.id;
			}
			//console.log('x', node);		
			if (nodetype!='labelfield' && nodetype!='label' ){  //可编辑控件，记录其字段名所对应的控件id
				pservice.editablefieldset.push(node); //表单中可编辑的列
				if ((';'+node.style+';').indexOf(';focus;')>=0) pservice.focusfields.push(node.id); //表单中聚焦的列
				//通过对象变量形式，记录每个可编辑列对于的控件id。例如pmyTable.fieldmap.field3='textfield2'
				/*
				str="fieldmap."+node.field;
				if (eval(str)==undefined){
					eval(str+"='"+node.id+"';");  //虚拟列对应控件id，写法不太规范，但判断速度快
				}
				*/
				//在pmyTable.fields表的字段集合中找到这个列，把这个列的id设置为控件的id，在数据保存时要用到这个id
				for (var k=0; k<pservice.table[pservice.table.length-1].fields.length; k++){
					if (pservice.table[pservice.table.length-1].fields[k]['field']==node.field){
						//第一次找到才赋值
						if (pservice.table[pservice.table.length-1].fields[k]['id']==undefined){
							pservice.table[pservice.table.length-1].fields[k]['id']=node.id;
							//console.log(node.field,node.id,pservice.table[pservice.table.length-1].fields[k]['id']);
						}
						break;
					} 
				}
			}//if 可编辑控件
		}  //if *field
		//记录父节点的子节点，把子节点记录到父节点的xchildren属性上去。
		if (nodetype.substr(nodetype.length-5,5)=='field' || nodetype=='fieldset' || nodetype=='tab'){
			$('#'+node.id).attr('xfield',node.field);  //自定义属性，对应的列名
			if ($('#'+node.parent).length>0){
				if ($('#'+node.parent).attr('xchildren')==undefined) $('#'+node.parent).attr('xchildren',node.id);
				else $('#'+node.parent).attr('xchildren', $('#'+node.parent).attr('xchildren')+';'+node.id);
			}
		}
		eval(varnodeid+"='"+node.id+"'");
		//if (node.parent==undefined || node.parent=='') node.parent=eval(varpnodeid);
		pservice.xmldata[i]=node;
		//console.log('y', node);		
	} //for i=0...next node
	//console.log('event', pservice.eventset);
	if (pservice.filterbar!=undefined && pservice.filterbar.length>0){
		if (pservice.filterbar[0].label==undefined) pservice.filterbar[0].label='快速过滤:'; 
		if (pservice.filterbar[0].width<=0) pservice.filterbar[0].width=500; 
		//if (pservice.filterbar[0].labelwidth<=0 && pservice.filterbar[0].label!='') pservice.filterbar[0].labelwidth=65; 
	}	
	//处理每个table中的隐藏列和键盘控制列
	pservice.formfields='s_app';	
	for (var k=0; k<pservice.table.length; k++){
		//console.log(1,pservice.table[pservice.table.length-1]);
		if (pservice.table[k].attachmenttagfield==undefined && pservice.attachmenttagfield!='') pservice.table[k].attachmenttagfield=pservice.attachment.tagfield; 
		if (pservice.table[k].formfields!='') pservice.formfields+=';'+pservice.table[k].formfields;
		if (pservice.table[k].encryptfields!=undefined && pservice.table[k].encryptfields!='') pservice.formfields+=';'+pservice.table[k].encryptfields;
		if (pservice.table[k].hiddenfields!=undefined && pservice.table[k].hiddenfields!='') pservice.formfields+=';'+pservice.table[k].hiddenfields;
		if (pservice.table[pservice.table.length-1].keyfieldid==''){
			//如果主键在表单控件中没有出现过，则把主键加到formfields中，当做隐藏列处理，避免主键没有在表单中作为控件出现
			//myHiddenField(pmyTable.keyfield);  //主键列对于的id设为主键字段的名称
			pservice.table[pservice.table.length-1].formfields+=';'+pservice.table[pservice.table.length-1].keyfield;
			pservice.table[pservice.table.length-1].keyfieldid=pservice.table[pservice.table.length-1].keyfield;
		}
		if (pservice.table[k].keydownfields!=undefined && pservice.table[k].keydownfields!=''){
			if (pservice.keydownfields!='') pservice.keydownfields+=';'; 
			pservice.keydownfields+=pservice.table[k].keydownfields;
		}
	}
	if (pservice.editorfield!=null && pservice.editorfield.length>0){
		//添加editorfield的隐藏列
		var p={}; p.parent='main'; p.id='xdescription'; p.style='hide';
		myEditorField(p);	//myEditorField(['xdescription','main','',-1,-1,8,10,10,'','hide;readonly;autoheight']);
	}
	//在pmyTable.fields表的字段集合中找到这些隐藏列，把这个列的id设置为控件的id
	pservice.hiddenfieldset='';	
	var tmp=pservice.formfields.split(';');
	for (j=0; j<tmp.length; j++){
		if ($('#'+tmp[j]).length==0){
			//控件不存在的情况下，定义为隐藏控件，并且将其字段集合中的id值设置成与控件id值相同
			pservice.hiddenfieldset+=';'+tmp[j];
			for (var k=0; k<pservice.table[pservice.table.length-1].fields.length; k++){
				if (pservice.table[pservice.table.length-1].fields[k]['field']==tmp[j]){
					if (pservice.table[pservice.table.length-1].fields[k]['id']==undefined){
						pservice.table[pservice.table.length-1].fields[k]['id']=tmp[j];
					}
					break;
				} 
			}
		}
	}
	//定义隐藏列，作为变量用。已存在控件会不再定义而自动跳过。每个隐藏列其控件id值与field值相同
	myHiddenFields(pservice.hiddenfieldset); //pservice.formfields);  
	//console.log('hhiden',pservice.hiddenfieldset);
	//xml文件处理结束
	//
	return pservice;
}

function myGetFieldID(id){
	result='';
	if ($('#'+id).length>0){
		if ($('#'+id).attr('xfield')!=undefined) result=$('#'+id).attr('xfield');
	}
	return result;
}


function mySetXmlParams(str){
	//输入一个带js控件变量的字符串，找出其中参数
	var result='', s='';
	while (true){
		x1=str.indexOf('{');
		x2=str.indexOf('}', x1);
		if (x1>=0 && x2>1){
			tmp=str.substring(x1+1,x2).trim();  //找出参数
			if (tmp!='') value=myGetValue(tmp);  //参数替换成页面的控件中的值
			else value='';
			str=str.substring(0,x1)+value+str.substring(x2+1);
			if (s!='') s+=';';
			s+=tmp;
		}else{
			break;
		}	
	}
	result={'text':str, 'params':s};
	return result;
}

function myReplaceXmlParams(str){
	//输入一个带js控件变量的字符串，找出其中参数
	var result='', s='', stmt='', tmp='';
	var n=1;
	while (true){
		x1=str.indexOf('{');
		x2=str.indexOf('}', x1);
		if (x1>=0 && x2>1){
			tmp=str.substring(x1+1,x2).trim();  //找出参数
			//使用自定义变量替换传递过来的变量，咋地你变量名称不带sys.之类的，调用函数地方也自动改为这个变量
			tmp1='_sysparam'+n;  
			str=str.substring(0,x1)+tmp1+str.substring(x2+1);
			if (eval(tmp)!=undefined){
				var type=typeof(eval(tmp));
				if (type=='object'){//对象变量
					//console.log(tmp,$('#'+tmp).length, myGetValue(tmp));
					if ($('#'+tmp).length>0) stmt+="var "+tmp1+"='"+myGetValue(tmp)+"';\n"; //控件id
					else stmt+="var "+tmp1+"="+tmp+";\n";  //对象s={}之类或数组,不加var
				}else{
					stmt+="var "+tmp1+"='"+eval(tmp)+"';\n";  //一般非对象变量，以字符型为例
				}
			}else{
				//stmt+=stmt+="var "+tmp1+"='"+eval(tmp)+"';\n";  //一般非对象变量，一字符型为例
				stmt+=stmt+="var "+tmp1+"=undefined;\n";
			}
			n++;
			if (s!='') s+=';';
			s+=tmp1;
		}else{
			break;
		}	
	}
	result={'text':str, 'params':s, 'stmt':stmt};
	return result;
}

function myRunEvents(pservice, action){
	//需要考虑多个查询语句的合并
	var results=[];
	var errormsg=[];
	var errorid='';
	var checkflag=0;
	for (var i=0; i<pservice.eventset.length; i++){
		//处理一个事件
		node=pservice.eventset[i];
		nodetype=node.nodetype;
		if (node.event!=undefined && node.event==action){
			event=node.event.toLowerCase();
			if (nodetype=='action' || nodetype=='js' ){  //动作、事件标签，不含sql语句，在前台执行，可以带前台变量
				results=[{'error':'', 'fieldid':''}];
				if (node.function!=undefined){  //处理函数
					//执行userfunctions中指定的函数，通常返回一个sys.系统变量
					str=myReplaceXmlParams(node.function);
					//console.log(str);
					if (str.params!='') eval(str.stmt);
					s=eval(str.text);  //调用函数，有没有变量？
				}
				if (node.text!=undefined){  //直接执行语句，可以用sys.变量
					//str=mySetXmlParams(node.text);
					str=myReplaceXmlParams(node.text);
					if (str.params!='') eval(str.stmt);
					if (str.text!=undefined) eval(str.text);
				}
			}else if (nodetype=='sql'){ //数据库标签
				//console.log('sqlvlist---'+valuelist+'---'+node.params);
				var valuelist=myGetSqlParamValues(node.params);
				if (node.text!=undefined) records=myRunSqlByXmlNode(node.nodeindex, valuelist);
				else if (node.fucntion!=undefined) records=myRunSqlFunction(node.function, valuelist);
				else if (node.procedure!=undefined) records=myRunSqlProcedure(node.procedure, valuelist);
				if (records.length>0 && node.check!=undefined && node.check!=''){
					checkflag=1;
					//数据验证,输出验证结果
					vrule=node.check; //.toLowerCase();
					//将records中的json每个列的值取出来，例如rowcount,error的值，放到变量中_rowcount,_error
					$.each(records[0], function(id, value) {  //取json中每个列及其值
						eval("_"+id+"='"+value+"'");  //变量赋值
					});
					flag=eval(vrule);  //验证规则，xml文件规则的变量需要以下划线_开头
					if (flag){  //只能在查询结果为空时，才数据验证合格
						errormsg.push(mySetXmlParams(node.message).text);  //message可以带变量e.g {email}
						if (node.focus!=undefined && errorid=='') errorid=node.focus;   //出错后聚焦到某个列
					}
				}else{  //数据验证正确后，在数据保存之前触发
					results=records;
				}
			} //if nodetype=sql	
		}// if sql,sqlfunction,sqlprocedure
	} //for
	if (checkflag==1){  //按数据验证格式进行结果输出error财务信息，fieldid聚焦的列
		if (errormsg.length==0) results=[{'error':'', 'fieldid':''}];
		else results=[{'error':errormsg, 'fieldid':errorid}];
	}
	return results;
}

//-------------------------------------------------------//
//vvvvvvvvvvv
function myGetValue(id){	
	var value='';
	var input=$("#"+id);
	if (id!='' & id.substr(0,4)=='sys.'){ //系统变量,直接返回值
		if (id=='sys.datetime') value='getdate()';
		else if (id=='sys.timestamp') value=myLocalTime().timestamp; //年月日+时间标签		
		else if (id=='sys.dateid') value=myLocalTime().dateid; //年月日		
		else if (id=='sys.timeid') value=myLocalTime().timeid; //时间秒单位		
		else value=eval(id);
	}else if (input.length>0){
		var type=input.attr('type');
		if (type==undefined || type=='') type=input.attr('xtype');
		var hidden=input.attr('hidden');
		var parent=input.attr('xparent');
		var datatype=input.attr('xdatatype');
		if (datatype==undefined) datatype='';
		var flag=1;
		//if ($("#"+parent)!=undefined){
		 //	if ($("#"+parent).attr('type')!=undefined && $("#"+parent).attr('type')=='window') flag=0;
		//}   
		if (hidden=='hidden'){
			if (input.attr('xfixedvalueflag')==1){  //固定值
				value=input.attr('xfixedvalue');
			}else{
				value=input.val();
			}
		}else if (type=='text' && hidden!='hidden'){ //textbox
			value=input.textbox('getValue');
			if (datatype=='n' && (value=='' || isNaN(value))) value='0';
		}else if (type=='combo' || type=='combobox'){
			if (input.attr('xcheckbox')=='true') value=input.combobox('getValues');
			else value=input.combobox('getValue');
		}else if (type=='checkbox'){  //单个checkbox
			if (input.is(':checked')) value=1;
			else value=0;
		}else if (type=='radio'){  //radio
			value=$("input[id='"+id+"']:checked").val() ;
		}else if (type=='checkboxgroup'){  //checkbox组合
			var count=input.attr('xitemcount');
			var value='';
			for (var i=0;i<count;i++){
				if (i==1 && count==1) var itemid=id;
				else var itemid=id+(i+1);
				if ($('#'+itemid).is(':checked')) value+=';'+$('#'+itemid).attr('xtext');
			}
			value=value.substr(1);
		}else if (type=='label' || type=='labelfield'){ 
			value=input.html();
		}else if (type=='keditor'){
			//str="var editor_"+id+"=KindEditor.create('textarea[id=\""+id+"\"]');";
			str="value=window."+id+".html()";
			eval(str);			
			//value=value.replaceAll(String.fromCharCode(10),'');
		}else if (type=='image'){ //图形
			value=input.attr('src');
		}else if (type=='file' || type=='filefield' ){ //文件上传
			value=input.attr('xfileosname');  
		}else{
			value=input.val();			
		}			
	}
	value=''+value;
	//console.log(id,value);
	if (value!=undefined && value!='' && value.indexOf('{')>=0){
		//处理value中是否包含{ }变量问题
		var str=myReplaceXmlParams(value);
		console.log(id, value, str);
		if (str.params!=''){
			eval(str.stmt);
			var s=eval(str.text);  //调用函数，有没有变量？
			if (s!=undefined) value=s;
		}
	}
	if (value=='') value=' ';
	//alert(id+'---'+value);
	return trim(''+value);
}


function mySetValue(id, value){	 //sssssssssssetvalue
	var input = $("#"+id);
	if (input.length>0){
		value=value+"";  //转换类型
		if (value!='') value=value.replaceAll("<br>","\n");  //将<br>替换为回车,必须写，包括keditor
		var type=input.attr('type');
		if (type==undefined || type=='') var type=input.attr('xtype');
		var datatype=input.attr('xdatatype');
		if (datatype==undefined) datatype='';
		var hidden=input.attr('hidden');
		var parent=input.attr('xparent');
		if (hidden=='hidden'){
			//fixedvalue存在时，该控件的值
			if (input.attr('xfixedvalueflag')==1) input.val(input.attr('xfixedvalue'));
			else input.val(value);	
		}else if (type=='text' && hidden!='hidden'){
			if (datatype=='n' && (value=='' || isNaN(value))) value='0';
			input.textbox('setValue', value);
		}else if (type=='combobox' || type=='combo'){ //cccccccccccccccheckbox
			if (input.attr('xreset')==0) return; 
			//console.log(id,input.attr('xcheckbox'),input.attr('xismasterfield'));
			if (input.attr('xcheckbox')=='true'){  //带复选框
				//console.log(id,input.attr('xcheckbox'));
				jsondata=input.combobox('getData');
				opts=input.combobox('options');
				//console.log(jsondata,value);
				var values=','+value+',';
				$.each(jsondata, function(xid, xvalue) {  //取json中每个列及其值
					s=','+eval('xvalue.'+opts.valueField)+',';
					if (values.indexOf(s)>=0){  //value中存在这个选项时，选中选项
						//console.log(id+'_checkbox'+xvalue.sysrowno);
						input.combobox('select',eval('xvalue.'+opts.valueField));
						//$('#'+id+'_checkbox'+xvalue.sysrowno).prop("checked", true);
					}else{
						input.combobox('unselect',eval('xvalue.'+opts.valueField));
						//$('#'+id+'_checkbox'+xvalue.sysrowno).prop("checked", false);
					}
				});
				//console.log(opts.textField+'---'+opts.valueField+'---'+value);
			}else{  //nocheckbox
				if (input.attr('xismasterfield')=='true'){
					input.combobox('select',value); //触发其他联动下拉框的赋值事件
				}else{
					input.combobox('setValue',value);
				}
			}
		}else if (type=='checkbox'){  //单个checkbox
			var checked=true;
			if (value==0) checked=false;
			$("#"+id).prop("checked", checked);
		}else if (type=='radio'){  //多个无线按钮radio
			$("input[id='"+id+"'][value='"+value+"']").attr("checked",true); 
		}else if (type=='checkboxgroup'){  //checkbox组
			var count=input.attr('xitemcount');
			for (var i=0;i<count;i++){
				var checked=false;
				var item=$("#"+id+(i+1));
				if ((';'+value+';').indexOf(';'+item.attr('xtext')+';')>=0) var checked=true;
				else var checked=false;
				item.prop("checked",checked);
			}	
		}else if (type=='label' || type=='labelfield'){ 
			//赋值时重新计算字符串所占用的宽度像素
			if (input.attr('xwidth')<=0){
				w=myGetWidthOfText(value,syslabel.fontsize,syslabel.fontname)+10;
				input.css({width:w});  //设置字符宽度
			}
			var style=';'+input.attr('xstyle')+';';
			if (style.indexOf(';u;')>=0 && value!=''){
				value=value+'&nbsp;';
			}
			input.html(value);
		}else if (type=='file'){ 
			input.attr('xfilesourcename','');  
			input.attr('xfileosname','');  
			input.attr('xtargetfile','');  
			input.attr('xfilesize',0);  
			input.attr('xfilesizedesc','');  
			input.attr('xtargetpath','');  
			input.attr('xfileext','');
		}else if (type=='keditor'){  //kindeditor
			//value=replace92(value,'\\\\');  //使用函数替换强\替换成\\
			//value=myReplace(value,"'","\'");  //字体等中的单引号
			//str="window."+id+".html('"+value+"');"  //换行出现问题，不能用这种方法
			//value=value.replaceAll(String.fromCharCode(10),'');
			str="window."+id+".html(value);"
			eval(str);
		}else if (type=='image'){ //图形
			input.attr('src',value);
			input.attr('xfileosname', value);  //自定义属性，文件路径
			myResizeImage(id, value, input.attr('xheight'),input.attr('xwidth'));
		}else{
			input.val(value);			
		}			
	}
}

function mySetXmlDefaults(p){
	if (p.top==undefined) p.top=-1;
	if (p.left==undefined) p.left=-1;
	if (p.height==undefined) p.height=0;
	if (p.width==undefined) p.width=0;
	if (p.labelwidth==undefined) p.labelwidth=0;
	if (p.value==undefined) p.value='';
	if (p.style==undefined) p.style='';
	if (p.label==undefined) p.label='';
	if (p.parent==undefined) p.parent='';
	if (p.nodeindex==undefined) p.nodeindex=-1;
	if (p.max==undefined) p.max='';
	if (p.min==undefined) p.min='';
	if (p.dec==undefined) p.dec=0;
	if (p.increment==undefined) p.increment=1;
	return p;
}
