/**
 * A Picker field that contains a tree panel on its popup, enabling selection of tree nodes.
 * 1.fn_getTreeNodes.jsp
 * 2.查询传递的参数,根据具体行为决定是selectedCode还是searchText
 */
Ext.define('Ext.ux.MyTreePicker', {
    extend: 'Ext.form.field.Picker',
    xtype: 'mytreepicker',
    alias: 'widget.mytreepicker',
    
    uses: [
        'Ext.tree.Panel'
    ],

    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',

    config: {
        /**
         * @cfg {Ext.data.TreeStore} store
         * A tree store that the tree picker will be bound to
         */
        store: null,

        /**
         * @cfg {String} displayField
         * The field inside the model that will be used as the node's text.
         * Defaults to the default value of {@link Ext.tree.Panel}'s `displayField` configuration.
         */
        displayField: null,

        /**
         * @cfg {Array} columns
         * An optional array of columns for multi-column trees
         */
        columns: null,

        /**
         * @cfg {Boolean} selectOnTab
         * Whether the Tab key should select the currently highlighted item. Defaults to `true`.
         */
        selectOnTab: true,

        /**
         * @cfg {Number} maxPickerHeight
         * The maximum height of the tree dropdown. Defaults to 300.
         */
        maxPickerHeight: 300,

        /**
         * @cfg {Number} minPickerHeight
         * The minimum height of the tree dropdown. Defaults to 100.
         */
        minPickerHeight: 100,
        
        //以下属性是自定义的
        
        valueField: null,//默认为displayField
        
        //查询匹配的字段名
        xsearchFields: ['id', 'text'],
        
        searchFields: [],
        
        queryDelay: 500,//查询延迟时间
        
        //执行查询前需要输入的最小字符数,打回车的情况除外
        minChars: 4,
        
        //记录调用setValue()方法设置的值
        xvalue: '',
        
        //根节点是否可见
        rootVisible: true,
        
        useArrows: true,
        
        //清空工具条
        clearbar: true,
        
        //是否只能选择叶子节点
        leafSelectOnly: false,
        
        //是否显示所有路径
        showFullPath: false,
        
        //是否支持多选
        multiSelect: false,//尚不支持多选
        
        selectOnFocus: true
    },
    
    //自定义set函数
    setSearchFields: function(fields){
    	var me = this;
    	if(Ext.isEmpty(me.searchFields)){
    		me.searchFields = new Array();//初始化时为空
    	}
    	if(!Ext.isEmpty(fields) && (Ext.typeOf(fields) == 'string' || Ext.typeOf(fields) == 'array')){
    		me.searchFields = Ext.Array.merge(me.searchFields, fields);
    	}
    },
    
    //editable: false,

    initComponent: function() {
        var me = this;
        me.callParent(arguments);

        me.addEvents(
            /**
             * @event select
             * Fires when a tree node is selected
             * @param {Ext.ux.TreePicker} picker        This tree picker
             * @param {Ext.data.Model} record           The selected record
             */
            'select'
        );

        me.mon(me.store, {
            scope: me,
            load: me.onLoad,
            beforeload: me.onBeforeLoad,
            update: me.onUpdate
        });
        
        //displayField的值默认为text
        if(Ext.isEmpty(me.valueField)){
        	me.displayField = 'text';
        }
        
        //valueField的值默认为displayField
        if(Ext.isEmpty(me.valueField)){
        	me.valueField = me.displayField;
        }
        
        //如果需要设置完整路径,则默认为不可编辑
    	if(me.showFullPath === true){
    		me.setEditable(false);
    	}
        
        me.doQueryTask = new Ext.util.DelayedTask(me.doRawQuery, me);//延迟执行查询
    },

    /**
     * Creates and returns the tree panel to be used as this field's picker.
     */
    createPicker: function() {
        var me = this,
            picker = new Ext.tree.Panel({
                shrinkWrapDock: 2,
                store: me.store,
                floating: true,
                displayField: me.displayField,
                columns: me.columns,
                minHeight: me.minPickerHeight,
                maxHeight: me.maxPickerHeight,
                manageHeight: true,//官方版本为false,导致树节点展开时可能被隐藏
                shadow: false,
                rootVisible: me.rootVisible,//me
                useArrows: me.useArrows,//me
                animate: false,//me
                emptyText: '找不到匹配的记录',//me
                autoScroll: true,
                listeners: {
                    scope: me,
                    itemclick: me.onItemClick
                },
                viewConfig: {
                    listeners: {
                        scope: me,
                        render: me.onViewRender
                    }
                }
            }),
            view = picker.getView();
        
        //me    
        if(me.clearbar){
        	var bbar = new Ext.toolbar.Toolbar({
        		dock: 'bottom',
        		items: ['->', {
	            	text: '清空',
	            	iconCls: 'deletefileIcon',
	            	handler: function(){
	            		me.clearValue();
	            	}
	            }]
        	});
        	picker.addDocked(bbar);
        }

        if (Ext.isIE9 && Ext.isStrict) {
            // In IE9 strict mode, the tree view grows by the height of the horizontal scroll bar when the items are highlighted or unhighlighted.
            // Also when items are collapsed or expanded the height of the view is off. Forcing a repaint fixes the problem.
            view.on({
                scope: me,
                highlightitem: me.repaintPickerView,
                unhighlightitem: me.repaintPickerView,
                afteritemexpand: me.repaintPickerView,
                afteritemcollapse: me.repaintPickerView
            });
        }
        return picker;
    },
    
    onViewRender: function(view){
        view.getEl().on('keypress', this.onPickerKeypress, this);
    },

    /**
     * repaints the tree view
     */
    repaintPickerView: function() {
        var style = this.picker.getView().getEl().dom.style;

        // can't use Element.repaint because it contains a setTimeout, which results in a flicker effect
        style.display = style.display;
    },

    /**
     * Aligns the picker to the input element
     */
    alignPicker: function() {
        var me = this,
            picker;

        if (me.isExpanded) {
            picker = me.getPicker();
            if (me.matchFieldWidth) {
                // Auto the height (it will be constrained by max height)
                picker.setWidth(me.bodyEl.getWidth());
            }
            if (picker.isFloating()) {
                me.doAlign();
            }
        }
    },

    /**
     * Handles a click even on a tree node
     * @private
     * @param {Ext.tree.View} view
     * @param {Ext.data.Model} record
     * @param {HTMLElement} node
     * @param {Number} rowIndex
     * @param {Ext.EventObject} e
     */
    onItemClick: function(view, record, node, rowIndex, e) {
        this.selectItem(record);
    },

    /**
     * Handles a keypress event on the picker element
     * @private
     * @param {Ext.EventObject} e
     * @param {HTMLElement} el
     */
    onPickerKeypress: function(e, el) {
        var key = e.getKey();

        if(key === e.ENTER || (key === e.TAB && this.selectOnTab)) {
            this.selectItem(this.picker.getSelectionModel().getSelection()[0]);
        }
    },

    /**
     * Changes the selection to a given record and closes the picker
     * @private
     * @param {Ext.data.Model} record
     */
    selectItem: function(record) {
        var me = this,
        	picker = me.getPicker();
        	
        //判断是否是叶子节点
        if(me.leafSelectOnly === true && !record.get('leaf')){
        	me.xclearValue();//清空
        }else{
			//me.setValue(record.getId());
			me.setValue(record.get(me.valueField));
        }
        
        //复选框打钩
        if(!Ext.isEmpty(record.get('checked'))){
        	if(picker){
        		var records = picker.getChecked();
        		Ext.each(records, function(item){
        			if(!Ext.isEmpty(item.get('checked'))){
        				item.set('checked', false);//单选
        			}
        		})
        	}
        	record.set('checked', true);
        	var pNode = record.parentNode;
        	while(!Ext.isEmpty(pNode)){
        		if(!Ext.isEmpty(pNode.get('checked'))){
    				pNode.set('checked', true);//选中父节点
    			}
    			pNode = pNode.parentNode;
        	}
        }
        
        me.collapse();//me.picker.hide();//官方给的隐藏下拉框语句,但是使treePanel的显示出现异常
        me.inputEl.focus();
        me.fireEvent('select', me, record);
    },

    /**
     * Runs when the picker is expanded.  Selects the appropriate tree node based on the value of the input element,
     * and focuses the picker so that keyboard navigation will work.
     * @private
     */
    onExpand: function() {
        var me = this,
            picker = me.picker,
            store = picker.store,
            value = me.value,
            node;

        
        if (value) {
            //node = store.getNodeById(value);
        	node = me.findRecord(value);
        }
        
        if (!node) {
            node = store.getRootNode();
        }
        
        picker.selectPath(node.getPath());

        Ext.defer(function() {
            picker.getView().focus();
        }, 1);
    },

    /**
     * Sets the specified value into the field
     * @param {Mixed} value
     * @param {Boolean} doQuery=true表示需要执行查询
     * @return {Ext.ux.TreePicker} this
     */
    setValue: function(value, doQuery) {
   	console.log('#0**'+this.name+'.setValue("'+value+'") me.xvalue=['+this.xvalue+']value=['+value+']doQuery=['+doQuery+']**');
        var me = this,
            record,
            searchFields = me.searchFields,
            records = me.getPicker().getSelectionModel().getSelection();
            
        if(!Ext.isEmpty(value)){	
        	value = Ext.String.trim(value);//去空格
        }

        me.value = value;

        if (me.store.loading) {
            // Called while the Store is loading. Ensure it is processed by the onLoad method.
            return me;
        }
        record = Ext.isEmpty(value) ? undefined : me.findRecord(value);

        // set the raw value to the record's display field if a record was found
        if(Ext.isEmpty(record)){
        	//xvalue类似combobox的lastquery
        	//查询匹配节点
        	//console.log('#1**开始查询1 me.xvalue=['+me.xvalue+']value=['+value+']doQuery=['+doQuery+']**');
        	if(doQuery === true){
				me.xvalue = undefined;        	
        	}
        	//console.log('#2**开始查询2 me.xvalue=['+me.xvalue+']value=['+value+']doQuery=['+doQuery+']**');
        	if(me.xvalue != value){
        		//console.log('#3**开始查询3 me.xvalue=['+me.xvalue+']value=['+value+']doQuery=['+doQuery+']**');
        		var xparams;
        		if(doQuery === true){
        			var sql = new Array();
        			Ext.each(searchFields, function(item){
        				sql.push(item + ' LIKE \'%' + value + '%\'');
        			});
        			
        			sql = sql.join(' OR ')
        			xparams = {'searchText': sql};//执行查询
        		}else{
        			xparams = {'selectedCode': value};//定位具体节点
        		}
        		//console.log('组件' + me.id +'的查询参数: '+Ext.JSON.encode(xparams));
        		//加载数据
        		me.store.load({
					params: xparams//传递查询参数
        		});
        		me.xvalue = value;
        	}
        	//数据库内找不到匹配的记录
        	else{
        		me.value = value;
        		me.setRawValue(value);
        	}
        }else{
        	me.value = record.get(me.valueField);//注意代码顺序
        	
        	//当组件处于展开状态时需定位到目标节点
        	if(me.isExpanded && !Ext.Array.contains(records, record)){
        		me.onExpand();//选择目标节点
        	}
        	
        	if(me.leafSelectOnly === true && !record.get('leaf')){
        		me.xclearValue();
        	}else{
        		if(me.showFullPath){
        			var rootText = me.store.getRootNode().raw.text;
        			me.setRawValue(record.getPath(me.displayField,"-").replace("-"+rootText+"-",""));
        		}else{
        			me.setRawValue(record.get(me.displayField));//得到匹配的树节点
        		}
        	}
        }

        return me;
    },
    
    //清空同时触发查询使返回所有数据
    clearValue: function(){
    	var me = this;
    	me.xvalue = undefined;//重新执行查询
		me.setValue('');
    },
    
    //清空
    xclearValue: function(){
    	var me = this;
    	me.xvalue = undefined;
    	me.value = '';
    	me.setRawValue('');
    },
    
    //自定义查询树节点函数
    //匹配的字段包括[me.searchFields, me.xsearchFields(id,text), me.valueField, me.displayField]
    findRecord: function(value){
    	var me = this,
    		searchFields = Ext.Array.merge(me.displayField, me.searchFields, me.xsearchFields),
    		root = me.store.getRootNode();
    		
    	if(Ext.isEmpty(value)){
    		return null;
    	}
    	
    	var childNode = root.findChild(me.valueField, value);
    	if(Ext.isEmpty(childNode)){
    		childNode = root.findChild(me.displayField, value);
    	}
    	
    	if(Ext.isEmpty(childNode)){
    		Ext.Array.each(me.xsearchFields, function(item){
    			childNode = root.findChild(item, value);
    			if(childNode){
    				return false;
    			}
    		});
    	}
    	
    	if(Ext.isEmpty(childNode)){
	    	childNode = root.findChildBy(function(node){
	    		var index;
	    		Ext.Array.each(searchFields, function(item){
	    			var nodevalue = node.data[item];
	    			index = -1;
	    			if(!Ext.isEmpty(nodevalue)){
	    				index = nodevalue.indexOf(value);//匹配关键字
	    				if(index >= 0){
	    					return false;
	    				}
	    			}
	    		});
	    		if(index >= 0){
	    			return true;
	    		}
	    	}, me, true);
    	}
    	return childNode;
    },
    
    getSubmitValue: function(){
        return this.value;    
    },

    /**
     * Returns the current data value of the field (the idProperty of the record)
     * @return {Number}
     */
    getValue: function() {
    	var me = this;
    	if(me.value == undefined){
    		me.value = '';
    	}
        return this.value;
    },

    /**
     * Handles the store's load event.
     * @private
     */
    onLoad: function(store, node, records) {
    	var me = this;
        var value = me.value;
		
        //根节点加载数据时才有可能是setValue()方法引发的数据加载,因此需要在加载完成后回调setValue()方法
        if(node.isRoot()){
	        if (value) {
	            me.setValue(value);
	        }else {
	        	me.setRawValue('');//清空
	        }
        }

        if(me.loadMask){
	       me.loadMask.hide();//隐藏loadMask
	    }
    },
    
    onBeforeLoad: function(){
    	var me = this;
    	me.loadMask = me.getPicker().view.setLoading('正在加载……');//显示loadMask
    },
    
    onUpdate: function(store, rec, type, modifiedFieldNames){
        var display = this.displayField;
        
        if (type === 'edit' && modifiedFieldNames && Ext.Array.contains(modifiedFieldNames, display) && this.value === rec.getId()) {
            this.setRawValue(rec.get(display));
        }
    },
    
    //添加监听事件//模仿combobox
    initEvents: function(){
    	var me = this;
    	me.callParent();
    	 
        if (!me.enableKeyEvents) {
            me.mon(me.inputEl, 'keyup', me.onKeyUp, me);
        }
        me.mon(me.inputEl, 'paste', me.onPaste, me);
    },
    
    //查询数据
    onKeyUp: function(e, t){
    	var me = this,
    		key = e.getKey(),
    		rawValue = me.getRawValue();
    	
    	if(!me.readOnly && !me.disabled && me.editable){
    		//if(rawValue.length >= me.minChars || key == Ext.EventObject.ENTER){
    		if(key == Ext.EventObject.ENTER){
    			me.doQueryTask.delay(me.queryDelay);
    		}
    	}
    	if (me.enableKeyEvents) {
            me.callParent(arguments);
        }
    },
    
    //查询数据
    onPaste: function(){
        var me = this;
        
        if (!me.readOnly && !me.disabled && me.editable) {
            me.doQueryTask.delay(me.queryDelay);
        }
    },
    
    //执行查询
    doRawQuery: function(){
    	var me = this;
    	me.setValue(me.getRawValue(), true);
    	me.expand();//展开树
    }
});
