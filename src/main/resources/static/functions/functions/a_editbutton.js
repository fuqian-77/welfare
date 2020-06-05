Ext.onReady(function(){
	
	var rowHeight = 32;
	
	var myform1 = Ext.create('Ext.form.Panel', {
		id: 'myform1',
		name: 'myform1',
		flex: 1,
		bodyPadding: 5,
		layout: 'fit',
		items: [{
			xtype: 'fieldset',
			title: '基本信息',
			layout: 'absolute',
			defaults: {
				labelAlign: 'right',
				labelSeparator: '：'
			},
			items: [{
				xtype: 'editbutton',
				fieldLabel: 'editButton',
				id: 'editbutton1',
				labelWidth: 80,
				value: '利涉大川',
				width: 360,
				readOnly: true,//只读
				buttonText: '利涉大川',//button文字
				//buttonWidth: 24,//button宽度,宽度会随按钮文本长度自动调整,不用刻意设
				//buttonMargin: 8, //按钮和文本框之间的间距,默认为8px
				x: 8,
				y: 8,
				listeners: {
					click: function(editButton){
						Ext.MessageBox.show({
							title: '利涉大川', 
							msg: '请输入产品编码',
							prompt: true,
							value: '元亨，利涉大川；先甲三日，后甲三日',
							buttons: Ext.MessageBox.OKCANCEL,
							fn: function(btnID, text){
								if(btnID == 'ok'){
									editButton.setValue(text);
								}
							}
						});
					},
					blur: function(field){
						var value = field.getValue();
						if(Ext.isEmpty(value)){
							return false;
						}
					}
				}
			}, {
				xtype: 'editbutton',
				fieldLabel: 'editButton',
				id: 'editbutton2',
				labelWidth: 80,
				width: 360,
				x: 8,
				y: 8 + rowHeight,
				handler: function(editbtn){//button事件
					Ext.MessageBox.alert(editbtn.getValue(), '春生夏长 秋收冬藏');
				}
			}, {
				xtype: 'editbutton',
				fieldLabel: 'editButton',
				id: 'editbutton3',
				labelWidth: 80,
				value: '凤鸣岐山',
				width: 360,
				buttonText: '',
				iconCls: 'saveIcon',
				x: 8,
				y: 8 + rowHeight * 2,
				listeners: {
					click: function(){
						mywindow1.show();
					}
				}
			}, {
				xtype: 'triggerfield',
				fieldLabel: 'triggerfield',
				id: 'mytriggerfield1',
				labelWidth: 80,
				width: 360,
				x: 8,
				y: 8 + rowHeight * 3
			}, {
				xtype: 'triggerfield',
				fieldLabel: 'triggerfield',
				id: 'mytriggerfield2',
				labelWidth: 80,
				readOnly: true,
				width: 360,
				x: 8,
				y: 8 + rowHeight * 4
			}, {
				xtype: 'button',
				id: 'mybutton1',
				text: '测试',
				iconCls: 'saveIcon',
				width: 100,
				x: 8,
				y: 8 + rowHeight * 5,
				handler: function(btn){
					myFormWin.show();
				}
			}]
		}]
	});
	
	Ext.getCmp('editbutton2').setValue('元亨利贞');
	
	var myFormWin = Ext.create('Ext.window.Window', {
		title: '测试第一个EditButton',
		width: 420,
		height: 220,
		closeAction: 'hide',
		bodyPadding: '10 0 10 20',
		html: "#1.调整组件宽度</br>" +
				"	Ext.getCmp('editbutton1').setWidth(500);</br>" +
				"#2.调整按钮图标(有缺陷)</br>" +
				"	Ext.getCmp('editbutton1').setIconCls('saveIcon');</br>" +
				"#3.调整按钮边距</br>" +
				"	Ext.getCmp('editbutton1').setButtonMargin(18);</br>" +
				"#4.调整按钮宽度(有缺陷)</br>" +
				"	Ext.getCmp('editbutton1').setButtonWidth(180);</br>" +
				"#5.调整按钮文本(有缺陷)</br>" +
				"	Ext.getCmp('editbutton1').setButtonText('千江有水千江月');</br>",
		buttonAlign: 'left',
		buttons: [{
			text: '#1',
			handler: function(){
				Ext.getCmp('editbutton1').setWidth(500);
			}
		}, {
			text: '#2',
			handler: function(){
				Ext.getCmp('editbutton1').setIconCls('saveIcon');
			}
		}, {
			text: '#3',
			handler: function(){
				Ext.getCmp('editbutton1').setButtonMargin(18);
			}
		}, {
			text: '#4',
			handler: function(){
				Ext.getCmp('editbutton1').setButtonWidth(180);
			}
		}, {
			text: '#5',
			handler: function(){
				Ext.getCmp('editbutton1').setButtonText('千江有水千江月');
			}
		}]
	});
	
	var mydata = [
		{id: 1, str1: '春江潮水连海平', str2: '海上明月共潮生'},
		{id: 2, str1: '滟滟随波千万里', str2: '何处春江无月明'},
		{id: 3, str1: '江流宛转绕芳甸', str2: '月照花林皆似霰'},
		{id: 4, str1: '空里流霜不觉飞', str2: '汀上白沙看不见'},
		{id: 6, str1: '江天一色无纤尘', str2: '皎皎空中孤月轮'},
		{id: 6, str1: '江畔何人初见月', str2: '江月何年初照人'},
		{id: 7, str1: '人生代代无穷已', str2: '江月年年只相似'},
		{id: 8, str1: '不知江月待何人', str2: '但见长江送流水'},
		{id: 9, str1: '白云一片去悠悠', str2: '青枫浦上不胜愁'},
		{id: 10, str1: '谁家今夜扁舟子', str2: '何处相思明月楼'},
		{id: 11, str1: '可怜楼上月徘徊', str2: '应照离人妆镜台'},
		{id: 12, str1: '玉户帘中卷不去', str2: '捣衣砧上拂还来'},
		{id: 13, str1: '此时相望不相闻', str2: '愿逐月华流照君'},
		{id: 14, str1: '鸿雁长飞光不度', str2: '鱼龙潜跃水成文'},
		{id: 15, str1: '昨夜闲潭梦落花', str2: '可怜春半不还家'},
		{id: 16, str1: '江水流春去欲尽', str2: '江畔落月复西斜'},
		{id: 17, str1: '斜月沉沉藏海雾', str2: '碣石潇湘无限路'},
		{id: 18, str1: '不知乘月几人归', str2: '落月摇情满江树'}
	]
	
	var mygrid1 = Ext.create('Ext.grid.Panel', {
		id: 'mygrid1',
		name: 'mygrid1',
		title: '可编辑表格',
		padding: '5 0 0',
		selType: 'cellmodel',
		plugins: [{
			ptype: 'cellediting',
			clicksToEdit: 2,
			xrow: -1,
			xcolumn: -1,
			listeners: {
				beforeedit: function(editor, e, eOpts){
					var xrow = editor.xrow,
						xcolumn = editor.xcolumn;
						
					console.log('*1开始编辑：('+e.value+'){'+xrow+','+this.xcolumn+'};{'+e.rowIdx+','+e.colIdx+'}');
					if(xrow != -1 && xcolumn != -1 && (xrow != e.rowIdx || xcolumn != e.colIdx)){
						console.log('*1.1开始编辑：需取消编辑');
						editor.cancelEdit();//触发canceledit事件
						//editor.completeEdit();//触发edit事件
						//延时执行
						var fn = Ext.Function.createDelayed(function(){
							editor.startEditByPosition({row: xrow, column: xcolumn});
							console.log('*1.2开始编辑：编辑目标单元格');
						}, 10);
						fn();
						//editor.getCmp().getSelectionModel().setCurrentPosition({row: xrow, column: xcolumn});
						//return false;
					}
				},
				edit: function(editor, e, eOpts){
					//当为空时不允许离开
					var xrow = editor.xrow,
						xcolumn = editor.xcolumn;
						
					console.log('*2结束编辑：('+e.value+'){'+xrow+','+xcolumn+'};{'+e.rowIdx+','+e.colIdx+'}');
					if(Ext.isEmpty(e.value)){
						console.log('*2.1开始编辑：需继续编辑');
						editor.xcolumn = e.colIdx;
						editor.xrow = e.rowIdx;
						editor.startEdit(e.record, e.column);
					}
				}
			}
		}],
		columnLines: true,
		flex: 1,
		store: new Ext.data.Store({fields: ['id', 'str1', 'str2'], data: mydata}),
		columns: {
			defaults: {
				align: 'center',
				menuDisabled: true,
				sortable: false
			},
			items: [{
				dataIndex: 'id',
				header: '序号',
				width: 90,
				editor: {
					xtype: 'triggerfield'
				}
			}, {
				dataIndex: 'str1',
				header: '上句',
				flex: 1,
				field: {
					xtype: 'editbutton',
					buttonMargin: 0,
					buttonText: '一个超长的按钮',
					buttonWidth: 160,
					selectOnFocus: true,
					handler: function(editbtn){
						Ext.MessageBox.alert('按钮事件', this.getValue());
						editbtn.setButtonText('按钮文本变化测试1按钮文本变化测试1按钮文本变化测试1');
					}
				}
			}, {
				dataIndex: 'str2',
				header: '下句',
				flex: 1,
				editor: {
					xtype: 'editbutton',
					selectOnFocus: true,
					listeners: {
						click: function(editbtn){
							var editbtnHeight = editbtn.getHeight();
							var winHeight =  mywindow1.height;
							var height = editbtn.getY() + editbtnHeight + winHeight;
							var bodyHeight = Ext.getBody().getHeight();
							var y = height > bodyHeight ? (editbtn.getY() - winHeight) : (height - winHeight);
							mywindow1.showAt({x: editbtn.getX(), y: y});
						}
					}
				}
			}]
		}
	});
	
	mywindow1 = Ext.create('Ext.window.Window', {
		title: '产品编码',
		width: 300,
		height: 200,
		closeAction: 'hide',//重要
		modal: true,
		layout: 'fit',
		bodyPadding: 5,
		items: [{
			xtype: 'grid',
			store: new Ext.data.Store({fields: ['id', 'str1', 'str2'], data: mydata}),
			columns: {
				defaults: {menuDisabled: true, sortable: false},
				columnLines: true,
				items: [
					{header: '序号', dataIndex: 'id', align: 'center', width: 35},
					{header: '上句', dataIndex: 'str1', flex: 1},
					{header: '下句', dataIndex: 'str2', flex: 1}
				]
			}
		}]
	});
	
	var mypanel1 = Ext.create('Ext.panel.Panel', {
		title: '基本信息',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items:[myform1, mygrid1]
	});
	
	var mytabpanel1 = Ext.create('Ext.tab.Panel', {
		region: 'center',
		frame: true,
		items: [mypanel1]
	});
	
	Ext.create('Ext.Viewport', {
		layout: 'border',
		padding: 5,
		items: [mytabpanel1]
	});
});