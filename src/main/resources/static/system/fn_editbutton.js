Ext.define('Ext.ux.EditButton', {
	extend: 'Ext.form.field.Trigger',
	alias: 'widget.editbutton',
	requires: [
        'Ext.button.Button'
    ],
    //2014年7月30日
	//配置项
	buttonWidth: null,
	buttonText: '…',
	buttonMargin: 8,
	iconCls: '',
	
	//triggerBaseCls: Ext.baseCSSPrefix + 'form-trigger',
	triggerBaseCls: Ext.baseCSSPrefix + 'btn',
	childEls: ['buttonCell'],

	onRender: function(){
		var me = this,
			id = me.id;
			
		me.callParent(arguments);
		
		//在IE Trident内实现的Button的DOM结构异于其他浏览器,其按钮主体为<table>,而在Webkit和Gecko内核中则实现为<span>
		me.btn = Ext.create('Ext.button.Button', {
			renderTo: id + '-buttonCell',//关键
			id: id + '-button',
        	text: me.buttonText,
        	iconCls: me.iconCls,
        	width: me.buttonWidth,
        	cls: me.triggerBaseCls + ' ' + Ext.baseCSSPrefix + 'trigger-index-0 triggerCls',//按钮点击事件的选择器,
        	style: {
        		marginLeft: me.buttonMargin
        	}
        });
        
        //可编辑表格中的editbutton宽度为0px,因此需要生成一个临时按钮用于计算按钮宽度
        var btnWidth = me.btn.width || me.btn.getWidth();
        if(btnWidth <= 0){
        	var tempBtn = new Ext.button.Button({
    			renderTo: Ext.getBody(),
    			text: me.buttonText,
        		iconCls: me.iconCls
        	});
        	btnWidth = tempBtn.getWidth();
        	Ext.removeNode(tempBtn.getEl().dom);
        }
        
        //设置包含按钮的单元格宽度
        me.buttonCell.dom.style.width = me.btn.getEl().getMargin('lr') + btnWidth;
        if(Ext.isIE) {
            me.btn.getEl().repaint();
        }
	},
	
	//生成按钮的HTML源码,该函数将由父类的getSubTplMarkup函数调用
    getTriggerMarkup: function() {
    	var me = this;
    	var unselectableCls = Ext.dom.Element.unselectableCls;
    	
    	//td样式,选自Trigger源码内的getTriggerMarkup函数
    	var cls = [
    		me.extraTriggerCls,
			Ext.baseCSSPrefix + 'trigger-cell' ,
			unselectableCls
		];
		//onRender函数中生成按钮将作为该<TD>元素的子元素加入DOM树
        return '<td id="' + me.id + '-buttonCell" class="' + cls.join(' ') + '"></td>';
    },
    
    //覆盖父类方法,解决readOnly配置问题
    //父类方法定义了控件为readOnly时按钮不可见
	onTriggerWrapClick: function() {
        var me = this,
            targetEl, match,
            triggerClickMethod,
            event;

        event = arguments[me.triggerRepeater ? 1 : 0];
        if (event && !me.disabled) {
        //if (event && !me.readOnly && !me.disabled) {
                targetEl = event.getTarget('.' + me.triggerBaseCls, null);//HTMLElement
                match = targetEl && targetEl.className.match(me.triggerIndexRe);//正则/trigger-index-(\d+)/

            if (match) {
                triggerClickMethod = me['onTrigger' + (parseInt(match[1], 10) + 1) + 'Click'] || me.onTriggerClick;
                if (triggerClickMethod) {
                    triggerClickMethod.call(me, event);
                }
            }
        }
    },    
    
    //添加按钮事件
    onTriggerClick: function(){
    	var me = this;
    	this.fireEvent('click', me);//click
		Ext.callback(this.handler, me, [me]); //handler
    },
    
    //设置按钮文本
    //该方法还不完善,因为按钮的宽度需随文本调整,考虑到可编辑表格的特殊性,暂且搁置
    setButtonText: function(text){
    	text = text || '';
    	var me = this,
    		oldText = me.buttonText || '';
    		
    	if(text != oldText){
    		me.buttonText = text;
    		if(me.rendered){
    			me.btn.btnInnerEl.update(text || '&#160;');//改变InnerHTML
    			me.btn.setComponentCls();
    		}
    		me.updateLayout();
    	}
    	me.fireEvent('buttontextchange', me, oldText, text);
    	return me;
    },
    
    //设置按钮图标
    //该方法不完善,按钮宽度未动态改变
    setIconCls: function(cls){
		cls = cls || '';
        var me = this,
            btnIconEl = me.btn.btnIconEl,
            oldCls = me.iconCls || '';

        me.iconCls = cls;
        if (oldCls != cls) {
            if (btnIconEl) {
                // Remove the previous iconCls from the button
                btnIconEl.removeCls(oldCls);
                btnIconEl.addCls(cls);
                me.btn.setComponentCls();
                if (me.btn.didIconStateChange(oldCls, cls)) {
                	me.btn.updateLayout();
                    me.updateLayout();
                }
            }
            me.fireEvent('iconchange', me, oldCls, cls);
        }
        return me;    
    },
    
    //调整按钮左边距
    //注意边距不要超过组件宽度
    setButtonMargin: function(margin){
    	var me = this;
    	//me.btn.el.setStyle('marginLeft', margin);
    	var oldMargin = me.buttonMargin;
    	me.buttonMargin = margin;
    	if(me.rendered){
    		me.buttonCell.setWidth(me.buttonCell.getWidth() + margin - oldMargin);
    		me.btn.el.setStyle('marginLeft', margin);
    	}
    },
    
    setButtonWidth: function(width){
    	var me = this;
    	me.buttonWidth = width;
    	//无需考虑负数问题
    	if(me.rendered){
    		me.btn.setWidth(width);
    		me.buttonCell.dom.style.width = me.btn.getEl().getMargin('lr') + me.btn.getWidth();
    	}
    }
});