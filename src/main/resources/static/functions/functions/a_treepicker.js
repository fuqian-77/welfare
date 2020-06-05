Ext.onReady(function(){
	var maxReturnNumber = 2372;//浏览器对返回的数据量有限制,超过一定数量则会出现Provisional headers are shown,例如areas表就不能全部一次性返回
	var maxReturnNumber1 = 20;
	//sysdatabasestring='< %=user.getDatabase() %>';//"localhost	19910101	crmlab"
  	var sysdatabasestring = "localhost	19910101	crmlab";//数据库
	var treeSQL = "select *, (rtrim(menuID) + \' \' + menuTitle) as nodetext from sys_menu";
	//var treeSQL = "select *, (rtrim(areaID) + \' \' + areaName) as nodetext, 1 as syschecked from areas where pycode like \'%z%\'";
	var comboTreeSQL1 = "select sysid,menuid,menutitle,servicefile,menuurl,parentnodeid,isparentflag,level,(rtrim(menuID) + \' \' + menuTitle) as nodetext from sys_menu";
	var comboTreeSQL2 = "select sysid,menuid,menutitle,servicefile,menuurl,parentnodeid,isparentflag,level,(rtrim(menuID) + \' \' + menuTitle) as nodetext, 0 as syschecked from sys_menu";
	var comboTreeSQL3 = "select areaid,areaname,parentnodeid,isparentflag,level,(rtrim(areaID) + \' \' + areaName) as nodetext from areas";
	pmyTree1={};
	pmyTree1.selectedcode='';
	pmyTree1.rootcode='';
	pmyTree1.searchtext='';
	pmyTree1.filterfield='';
	pmyTree1.events='storeload;treeload';
	pmyTree1.sql=''; 
	pmyTree1.parentvalue='';
	pmyTree1.keyfield='';  //初始设置为空
	pmyTree1.reloadflag=1;
	pmyTree1.singleexpand='true';
	pmyTree1.title='客户分组';
	pmyTree1.roottitle='全部客户';//根节点
	pmyTree1.tbar='';//treetbar
	pmyTree1.bbar='';
	pmyTree1.height=0;
	pmyTree1.width=200;
	pmyTree1.fieldset='cid;text;nodetext;level;sysnumber:int';//model:fields
	pmyTree1.name='myTree1';		
	pmyTree1.varname='pmyTree1';		
	pmyTree1.groupidset="province@provinceid/所在省份;city@cityid/所在城市;type/客户类别;industry/所属行业;source/客户来源;status/客户状态;-;*/取消分组";
	//eval(myDefineMenu('myGroupMenu',pmyTree1.groupidset,'menuitemIcon'));
	pmyTree1.groupid='';
	pmyTree1.groupfield=[];
	
	//TODO 1
	/**************************************************分层展开**************************************************/
	var myStore = Ext.create('Ext.data.TreeStore', {
		nodeParam: 'rootCode',//以参数名rootCode向后台传递节点id
		//autoLoad: true,
		fields: [
			{name: 'id', type: 'string', mapping: 'cid'},//重要
			{name: 'sysid', type: 'int'},
			{name: 'text', type: 'string'},//重要
			{name: 'menuid', type: 'string'},
			{name: 'menutitle', type: 'string'},
			{name: 'servicefile', type: 'string'},
			{name: 'menuurl', type: 'string'},
			{name: 'flag', type: 'string'},
			{name: 'isparentflag', type: 'int'},
			{name: 'parentnodeid', type: 'string'},
			{name: 'level', type: 'string'}
		],
		proxy: {
			type: 'ajax',
			url: 'system//fn_getTreeNodes.jsp',
			reader: {
				type: 'json'
			},
			actionMethods: {
                create: 'POST',
                read: 'POST', // by default GET
                update: 'POST',
                destroy: 'POST'
            }
		},
		root: {
			name: 'root',
			text: '根节点',
			expanded: true,
			id: ''
		},
		listeners: {
			beforeload: function(store){
				Ext.apply(store.proxy.extraParams, {
					database: sysdatabasestring,
					maxReturnNumber: maxReturnNumber1,
					tableName: 'sys_menu',
					keyField: 'menuID',
					sqlString: comboTreeSQL1,
					//rootCode: '',//nodeParam
					selectedCode: '',
					searchText: ''
				});			
			}
		}
	});
	
	var myTreePicker = Ext.create('Ext.ux.MyTreePicker', {
		id: 'myTreePicker',
		name: 'myTreePicker',
		fieldLabel: '1.分层展开',
		fieldStyle: {
			textDecoration: 'underline'
		},
		style: {
			textDecoration: 'underline'
		},
		width: 480,
		labelWidth: 65,
		labelSeparator: ':',
		displayField: 'text',//显示的文本
		valueField: 'id',//实际值
		searchFields: ['menuid', 'servicefile', 'nodetext'],//查询匹配的字段名,一定需要配置,用来产生searchText参数
		store: myStore,
		rootVisible: false
	});
	
	//TODO 2
	/**************************************************全部展开**************************************************/
	var xmyStore = Ext.create('Ext.data.TreeStore', {
		nodeParam: 'rootCode',//以参数名rootCode向后台传递节点id
		//autoLoad: true,
		fields: [
			{name: 'id', type: 'string', mapping: 'cid'},
			{name: 'sysid', type: 'int'},
			{name: 'text', type: 'string'},
			{name: 'menuid', type: 'string'},
			{name: 'menutitle', type: 'string'},
			{name: 'servicefile', type: 'string'},
			{name: 'menuurl', type: 'string'},
			{name: 'flag', type: 'string'},
			{name: 'isparentflag', type: 'int'},
			{name: 'parentnodeid', type: 'string'},
			{name: 'level', type: 'string'}
		],
		proxy: {
			type: 'ajax',
			url: 'system//fn_getTreeNodes.jsp',
			reader: {
				type: 'json'
			},
			actionMethods: {
                create: 'POST',
                read: 'POST', // by default GET
                update: 'POST',
                destroy: 'POST'
            }
		},
		root: {
			name: 'root',
			text: '根节点',
			expanded: true,
			id: ''
		},
		listeners: {
			beforeload: function(store){
				Ext.apply(store.proxy.extraParams, {
					database: sysdatabasestring,
					maxReturnNumber: maxReturnNumber,
					tableName: 'sys_menu',
					keyField: 'menuID',
					sqlString: comboTreeSQL1,
					//rootCode: '',//nodeParam
					selectedCode: '',
					searchText: ''
				});			
			}
		}
	});
	
	var xmyTreePicker = Ext.create('Ext.ux.MyTreePicker', {
		id: 'xmyTreePicker',
		name: 'xmyTreePicker',
		fieldLabel: '2.全部展开',
		width: 480,
		labelWidth: 65,
		labelSeparator: ':',
		displayField: 'text',//显示的文本
		store: xmyStore,
		rootVisible: false
	});
	
	//TODO 3
	/**************************************************分层展开+只允许选择叶子节点**************************************************/
	//config: 
	//1.leafSelectOnly: Boolean
	var lmyStore = Ext.create('Ext.data.TreeStore', {
		nodeParam: 'rootCode',//以参数名rootCode向后台传递节点id
		//autoLoad: true,
		fields: [
			{name: 'id', type: 'string', mapping: 'cid'},
			{name: 'sysid', type: 'int'},
			{name: 'text', type: 'string'},
			{name: 'menuid', type: 'string'},
			{name: 'menutitle', type: 'string'},
			{name: 'servicefile', type: 'string'},
			{name: 'menuurl', type: 'string'},
			{name: 'flag', type: 'string'},
			{name: 'isparentflag', type: 'int'},
			{name: 'parentnodeid', type: 'string'},
			{name: 'level', type: 'string'}
		],
		proxy: {
			type: 'ajax',
			url: 'system//fn_getTreeNodes.jsp',
			reader: {
				type: 'json'
			},
			actionMethods: {
                create: 'POST',
                read: 'POST', // by default GET
                update: 'POST',
                destroy: 'POST'
            }
		},
		root: {
			name: 'root',
			text: '根节点',
			expanded: true,
			id: ''
		},
		listeners: {
			beforeload: function(store){
				Ext.apply(store.proxy.extraParams, {
					database: sysdatabasestring,
					maxReturnNumber: maxReturnNumber1,
					tableName: 'sys_menu',
					keyField: 'menuID',
					sqlString: comboTreeSQL1,
					//rootCode: '',//nodeParam
					selectedCode: '',
					searchText: ''
				});			
			}
		}
	});
	
	var lmyTreePicker = Ext.create('Ext.ux.MyTreePicker', {
		id: 'lmyTreePicker',
		name: 'lmyTreePicker',
		fieldLabel: '3.分层展开+只允许选择叶子节点',
		width: 480,
		labelWidth: 180,
		labelSeparator: ':',
		displayField: 'text',//显示的文本
		store: lmyStore,
		rootVisible: false,
		leafSelectOnly: true//只能选中叶子节点
	});
	
	//TODO 4
	/**************************************************分层展开+复选框单选**************************************************/
	var cmyStore = Ext.create('Ext.data.TreeStore', {
		nodeParam: 'rootCode',//以参数名rootCode向后台传递节点id
		//autoLoad: true,
		fields: [
			{name: 'id', type: 'string', mapping: 'cid'},
			{name: 'sysid', type: 'int'},
			{name: 'text', type: 'string'},
			{name: 'menuid', type: 'string'},
			{name: 'menutitle', type: 'string'},
			{name: 'servicefile', type: 'string'},
			{name: 'menuurl', type: 'string'},
			{name: 'flag', type: 'string'},
			{name: 'isparentflag', type: 'int'},
			{name: 'parentnodeid', type: 'string'},
			{name: 'level', type: 'string'}
		],
		proxy: {
			type: 'ajax',
			url: 'system//fn_getTreeNodes.jsp',
			reader: {
				type: 'json'
			},
			actionMethods: {
                create: 'POST',
                read: 'POST', // by default GET
                update: 'POST',
                destroy: 'POST'
            }
		},
		root: {
			name: 'root',
			text: '根节点',
			expanded: true,
			id: ''
		},
		listeners: {
			beforeload: function(store){
				Ext.apply(store.proxy.extraParams, {
					database: sysdatabasestring,
					maxReturnNumber: maxReturnNumber1,
					tableName: 'sys_menu',
					keyField: 'menuID',
					sqlString: comboTreeSQL2,
					//rootCode: '',//nodeParam
					selectedCode: '',
					searchText: ''
				});			
			}
		}
	});
	
	var cmyTreePicker = Ext.create('Ext.ux.MyTreePicker', {
		id: 'cmyTreePicker',
		name: 'cmyTreePicker',
		fieldLabel: '4.分层展开+复选框单选',
		width: 480,
		labelWidth: 145,
		labelSeparator: ':',
		displayField: 'text',//显示的文本
		store: cmyStore,
		rootVisible: false
	});
	
	//TODO 5
	/**************************************************分层展开+全路径**************************************************/
	//显示完整路径
	//配置项：
	//showFullPath: Boolean
	var mcmyStore = Ext.create('Ext.data.TreeStore', {
		nodeParam: 'rootCode',//以参数名rootCode向后台传递节点id
		//autoLoad: true,
		fields: [
			{name: 'id', type: 'string', mapping: 'cid'},
			{name: 'sysid', type: 'int'},
			{name: 'text', type: 'string'},
			{name: 'areaname', type: 'string'},
			{name: 'areaid', type: 'string'},
			{name: 'flag', type: 'string'},
			{name: 'isparentflag', type: 'int'},
			{name: 'parentnodeid', type: 'string'},
			{name: 'level', type: 'string'}
		],
		proxy: {
			type: 'ajax',
			url: 'system//fn_getTreeNodes.jsp',
			reader: {
				type: 'json'
			},
			actionMethods: {
                create: 'POST',
                read: 'POST', // by default GET
                update: 'POST',
                destroy: 'POST'
            }
		},
		root: {
			name: 'root',
			text: '根节点',
			expanded: true,
			id: ''
		},
		listeners: {
			beforeload: function(store){
				Ext.apply(store.proxy.extraParams, {
					database: sysdatabasestring,
					maxReturnNumber: maxReturnNumber1,
					tableName: 'areas',
					keyField: 'areaID',
					sqlString: comboTreeSQL3,
					//rootCode: '',//nodeParam
					selectedCode: '',
					searchText: ''
				});			
			}
		}
	});
	
	var mcmyTreePicker = Ext.create('Ext.ux.MyTreePicker', {
		id: 'mcmyTreePicker',
		name: 'mcmyTreePicker',
		fieldLabel: '5.分层展开+全路径(只读)',
		width: 480,
		labelWidth: 145,
		labelSeparator: ':',
		displayField: 'text',//显示的文本
		store: mcmyStore,
		rootVisible: false,
		showFullPath: true//显示完整路径
	});
	
	//TODO form
	/**************************************************表单面板1**************************************************/
	var myForm = Ext.create('Ext.form.Panel', {
		title: 'TreePicker',
		region: 'center',
		padding: '0 5 0 5',
		bodyPadding: 5,
		items: [{
			xtype: 'fieldset',
			width: '100%',
			height: '100%',
			title: 'TreePicker测试',
			items: [
				myTreePicker, 
				xmyTreePicker, 
				lmyTreePicker,
				cmyTreePicker, 
				mcmyTreePicker,
				{
					xtype:'displayfield', 
					fieldStyle: {
						textDecoration: 'underline', 
						color: 'red'
					}, 
					fieldLabel: '注', 
					labelWidth: 12,
					value: '为简便起见，全路径的TreePicker是只读的'
				}
			]
		}]
	});
	
	/*myForm.getForm().setValues({
		myTreePicker: '0211', 
		xmyTreePicker: '0202',
		lmyTreePicker: '0203',
		cmyTreePicker: '0201', 
		mcmyTreePicker: '330782'
	});*/
	
	//测试点1
	/*setTimeout(function(){
		console.log('我给组件myTreePicker设置啦1！');
		myTreePicker.setValue('0201', true);//分层展开
		console.log('我给组件myTreePicker设置啦2！');
	}, 5000);*/
	//测试点2
	/*setTimeout(function(){
		console.log('我给组件myTreePicker设置啦1！');
		myTreePicker.setValue('1201');//分层展开
		console.log('我给组件myTreePicker设置啦2！');
	}, 10000);*/
	//测试点3
	/*setTimeout(function(){
		console.log('我给组件myTreePicker设置啦1！');
		myTreePicker.setValue('0202');//分层展开
		console.log('我给组件myTreePicker设置啦2！');
	}, 15000);*/
	
	myTreePicker.setValue('0201');//分层展开
	xmyTreePicker.setValue('订单查询');//全部加载//全部加载时可输入中文,分层加载时只支持已加载的节点使用setValue设中文
	lmyTreePicker.setValue('0203');//分层展开+只允许加载叶子节点
	cmyTreePicker.setValue('0101');//分层展开+复选框单选
	mcmyTreePicker.setValue('330782');//分层展开+全路径
	
	/**************************************************表单面板2**************************************************/
	var xmyForm = Ext.create('Ext.form.Panel', {
		title: '测试面板',
		region: 'south',
		bodyPadding: 5,
		height: 160,
		padding: '5 0 0',
		items: [{
			xtype: 'textfield',
			id: 'myValue',
			name: 'myValue',
			fieldLabel: 'Value值',
			labelWidth: 90,
			width: 480
		}, {
			xtype: 'textfield',
			id: 'myRawValue',
			name: 'myRawValue',
			fieldLabel: 'RawValue值',
			labelWidth: 90,
			width: 480
		}, {
			xtype: 'textfield',
			id: 'mysetValue',
			name: 'mysetValue',
			fieldLabel: '设值',
			labelWidth: 90,
			width: 480
		}],
		buttonAlign: 'left',
		buttons: [{
			xtype: 'button',
			text: '#1设值',
			style: {
				marginLeft: '2px'
			},
			handler: function(){
				var value = Ext.getCmp('mysetValue').getValue();
				myTreePicker.setValue(value);
			}
		}, {
			xtype: 'button',
			text: '#1取值',
			handler: function(){
				Ext.getCmp('myValue').setValue('[' + myTreePicker.getValue() + ']');
				Ext.getCmp('myRawValue').setValue('[' + myTreePicker.getRawValue() + ']');
			}
		}, {
			xtype: 'button',
			text: '#2取值',
			style: {
				marginLeft: '2px'
			},
			handler: function(){
				Ext.getCmp('myValue').setValue('[' + xmyTreePicker.getValue() + ']');
				Ext.getCmp('myRawValue').setValue('[' + xmyTreePicker.getRawValue() + ']');
			}
		}, {
			xtype: 'button',
			text: '#3取值',
			style: {
				marginLeft: '2px'
			},
			handler: function(){
				Ext.getCmp('myValue').setValue('[' + lmyTreePicker.getValue() + ']');
				Ext.getCmp('myRawValue').setValue('[' + lmyTreePicker.getRawValue() + ']');
			}
		}, {
			xtype: 'button',
			text: '#4取值',
			style: {
				marginLeft: '2px'
			},
			handler: function(){
				Ext.getCmp('myValue').setValue('[' + cmyTreePicker.getValue() + ']');
				Ext.getCmp('myRawValue').setValue('[' + cmyTreePicker.getRawValue() + ']');
			}
		}, {
			xtype: 'button',
			text: '#5取值',
			style: {
				marginLeft: '2px'
			},
			handler: function(){
				Ext.getCmp('myValue').setValue('[' + mcmyTreePicker.getValue() + ']');
				Ext.getCmp('myRawValue').setValue('[' + mcmyTreePicker.getRawValue() + ']');
			}
		}]
	});
	
	/**************************************************树面板**************************************************/
	var myTreeStore = Ext.create('Ext.data.TreeStore', {
		autoLoad: true,
		fields: [
			{name: 'id', type: 'string', mapping: 'cid'},
			{name: 'text', type: 'string'},
			{name: 'areaid', type: 'string'},
			{name: 'areaname', type: 'string'},
			{name: 'flag', type: 'string'},
			{name: 'isparentflag', type: 'int'},
			{name: 'parentnodeid', type: 'string'},
			{name: 'level', type: 'string'}
		],
		proxy: {
			type: 'ajax',
			url: 'system//fn_getTreeNodes.jsp',
			reader: {
				type: 'json'
			},
			actionMethods: {
                create: 'POST',
                read: 'POST', // by default GET
                update: 'POST',
                destroy: 'POST'
            }
		},
		root: {
			name: 'root',
			text: '根节点',
			expanded: true,
			id: ''
		},
		listeners: {
			beforeload: function(store){
				Ext.apply(store.proxy.extraParams, {
					database: sysdatabasestring,
					maxReturnNumber: maxReturnNumber,
					tableName: 'sys_menu',
					keyField: 'menuID',
					sqlString: treeSQL,
					selectedCode: '',
					searchText: ''
				});			
			}
		}
	});
	
	var myTreePanel = Ext.create('Ext.tree.Panel', {
		rootCode: '',//加载的节点
		selectedCode: '',//目标选择的节点
		title: '树面板',
		region: 'west',
		width: 200,
		store: myTreeStore,
		useArrows: true,
		listeners: {
			itemmouseenter:function(view, record, item, index, e){
				this.rootCode = record.data.cid;
				selectedCode = '';
			},
			itemclick: function(view,record,item,index,e){
				fnRunService(record);
			}
		}
	});
	
	var mainPanel = Ext.create('Ext.panel.Panel', {
		title: '主面板',
		region: 'east',
		width: 500,
		html: '<iframe name="mainframe" id="mainframe" width="100%" height="100%" frameborder="no" border="0" style="margin:0 auto; text-align:center"></iframe>'
	});
	
	Ext.create('Ext.Viewport', {
		layout: 'border',
		padding: 5,
		items: [myForm, myTreePanel, xmyForm, mainPanel]
	});
	
	
	function fnRunService(record){
		var isparentflag=record.get('isparentflag');
		var xmlSrc='xml/'+record.raw.servicefile;
		var url=record.raw.menuurl;
		//使用隐藏的表单域提交POST请求
		if (isparentflag==0 && xmlSrc!=''){
			var myCompiler = new Compiler();
			window.p = myCompiler.compiler(xmlSrc);
			if(p != false){
				var xtype=p.type+'.jsp';
				var queryStr = Ext.Object.toQueryString(p, true);//序列化
				var tmpformID = 'tmpform';
				var tmpform = Ext.get(tmpformID);
				if(Ext.isEmpty(tmpform)){
					tmpform = document.createElement('form');
					tmpform.setAttribute('id', tmpformID);
					tmpform.setAttribute('hidden', true);//隐藏表单
					tmpform.setAttribute('target', 'mainframe');
					tmpform.setAttribute('method', 'POST');
					var textfield = document.createElement('input');
					textfield.setAttribute('id', 'p');
					textfield.setAttribute('name', 'p');
					textfield.setAttribute('type', 'text');
					tmpform.appendChild(textfield);
					document.body.appendChild(tmpform);
					tmpform = Ext.get(tmpformID);
				}
				tmpform.dom.setAttribute('action', xtype);
				Ext.get('p').dom.value = queryStr;
				tmpform.dom.submit();//表单提交
				//Ext.get('mainframe').dom.src = xtype;
			}else{
				alert('发生错误啦，可能XML文件找不到!');
			}
		}	
	}	

});