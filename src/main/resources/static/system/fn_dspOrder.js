	function myDisplayOrder(keyvalue) {
	var mydspOrderWin=null;
	Ext.require(['Ext.form.*','Ext.tree.*','Ext.panel.*','Ext.tab.*','Ext.data.*','Ext.grid.*','Ext.toolbar.*','Ext.menu.*','Ext.Viewport']);
	Ext.onReady(function(){
		var maxReturnNumber=10;  //一次从后台返回记录的数量，超过该值，树中节点将分层获取。
		var rowHeight=28;  //form中控件之间的行距，为function全局变量
		var pOrderFormCount=1;  //网页中表单的个数，名称规定由myOrderForm开头
		var pOrderItemGridCount=1;
		var pmyOrder={};
		pmyOrder.keyfield='orderid';
		pmyOrder.keyvalue=keyvalue;
		pmyOrder.sql="select top 100 percent a.*,e.companyname,b.contactname,c.Employeename from orders a"; 
		pmyOrder.sql+=" left join contacts b on a.customerid=b.customerid and a.contactid=b.contactid";
		pmyOrder.sql+=" left join employees c on a.employeeid=c.employeeid";
		pmyOrder.sql+=" left join customers e on a.customerid=e.customerid";
		pmyOrder.sql+=" where a."+pmyOrder.keyfield+"='"+pmyOrder.keyvalue+"'";
		for (var i=1;i<=pOrderItemGridCount;i++) {
			var str="var pmyOrderItemGrid"+i+"={};pmyOrderItemGrid"+i+".flag=1;"; //生成明细记录的grid，可以有多个
			eval(str);
		}	
		pmyOrderItemGrid1.keyfield='productid';
		pmyOrderItemGrid1.keyspec='产品编码';
		pmyOrderItemGrid1.tablename='orderitems';
		pmyOrderItemGrid1.varname='pmyOrderItemGrid1';
		pmyOrderItemGrid1.name='myOrderItemGrid1';
		pmyOrderItemGrid1.title='订单明细';
		pmyOrderItemGrid1.keyvalue='';
		pmyOrderItemGrid1.index=-1;
		pmyOrderItemGrid1.column=-1;
		pmyOrderItemGrid1.pagesize=1000;   //一张订单最多1000条销售明细记录
		pmyOrderItemGrid1.readonly=1;  //所有myOrderItemGrid是否只读(1)
		pmyOrderItemGrid1.tbar=''; 
		pmyOrderItemGrid1.bbar="bbar";
		pmyOrderItemGrid1.editing=false;
		pmyOrderItemGrid1.sql="select a.*,b.productname,b.quantityperunit from orderitems as a";
		pmyOrderItemGrid1.sql=pmyOrderItemGrid1.sql+" left join products as b on a.productid=b.productid";
		pmyOrderItemGrid1.sql=pmyOrderItemGrid1.sql+" where a.orderid='"+pmyOrder.keyvalue+"'";
		pmyOrderItemGrid1.paramsql='';
		pmyOrderItemGrid1.fieldset='sysrowno;productid;productname;quantityperunit;quantity;unitprice;discount;amount';
		pmyOrderItemGrid1.columntitle='序号;产品编码;产品名称;规格型号;数量;单价;折扣率;金额';
		pmyOrderItemGrid1.columnfield='sysrowno;productid;productname;quantityperunit;quantity;unitprice;discount;amount';
		pmyOrderItemGrid1.columnwidth='55;110;180;170;70;80;70;95';
		pmyOrderItemGrid1.columnalign='r;l;l;l;r;r;r;r';
		pmyOrderItemGrid1.columntype='';
		eval(myDefineCheckMenu('myFilterCheckMenu','orderid/订单编号;orderdate/订单日期;requireddate/要货日期;customerid/客户编码;companyname/客户名称;contactname/联系人;employeename/员工姓名;invoiceid/发票号;invoicedate/发票日期;accountrequireddate/付款日期'));
		eval(myDefineForm('myOrderForm1','north',240,0,70,false));
		//eval(myDefineForm('myOrderForm2','center',60,0,70,false));
		eval(myDefineLabel('myOrderForm1','order_title','销售订单',10,340,0,';24'));
		eval(myDefineDisplayField('myOrderForm1','order_orderid','订单编号：',70,5+rowHeight*2,6,250));
		eval(myDefineDisplayField('myOrderForm1','order_orderdate','订单日期：',70,5+rowHeight*2,290,200));
		eval(myDefineDisplayField('myOrderForm1','order_customerid','客户编码：',70,5+rowHeight*3,6,250));
		eval(myDefineDisplayField('myOrderForm1','order_companyname','客户名称：',70,5+rowHeight*4,6,528));
		eval(myDefineDisplayField('myOrderForm1','order_requireddate','要货日期：',70,5+rowHeight*5,6,200));
		eval(myDefineDisplayField('myOrderForm1','order_accountrequireddate','付款日期：',70,5+rowHeight*5,290,200));
		eval(myDefineDisplayField('myOrderForm1','order_invoiceid','发票编号：',70,5+rowHeight*6,6,250));
		eval(myDefineDisplayField('myOrderForm1','order_invoicedate','发票日期：',70,5+rowHeight*6,290,200));
		eval(myDefineImageField('myOrderForm1','order_checkedimage','../crmlab/system/images/chnchecked.png',5+rowHeight*1+6,500,47,46));
		eval(myDefineDisplayField('myOrderForm1','order_contactname','联 系 人：',70,5+rowHeight*7,6,200));
		eval(myDefineDisplayField('myOrderForm1','order_employeename','经 办 人：',70,5+rowHeight*7,290,250));
		eval(myDefineHiddenField('myOrderForm1','order_operator',''));
		eval(myDefineHiddenField('myOrderForm1','order_reviewer',''));
		//eval(myDefineMemoField('myOrderForm1','order_notes','备  注：',70,6+rowHeight*6,4,100,528,-1,''));
		var notebar=['-',{
			xtype: 'displayfield',
			labelWidth:60,
			labelSeparator:'',
			fieldLabel:'制单人:',
			labelAlign:'right',
			id: 'order_operatorx',
			name: 'order_operatorx',
			width: 250
		},'->','-',{
			xtype: 'displayfield',
			labelWidth:60,
			fieldLabel:'审核人：',
			labelSeparator:'',
			labelAlign:'right',
			id: 'order_reviewerx',
			name:'order_reviewerx',
			width: 250
		},'-'];
		var sumbar=[{
			xtype: 'displayfield',
			labelWidth:130,
			fieldLabel:'合计人民币（大写）:',
			labelAlign:'right',
			labelSeparator:'',
			id: 'order_rmbsum',
			name: 'order_rmbsum',
			width:550
		},'->','-',{
			xtype: 'displayfield',
			fieldLabel:'￥',
			labelSeparator:'',
			labelWidth:20,
			labelAlign:'right',
			align:'right',
			id: 'order_amountsum',
			name: 'order_amountsum',
			width:180
		},'-'];
		var bbar={
			xtype:"container",
			border:false,
			items:[{
				xtype:"toolbar",
				items:[sumbar]
			},{
				xtype:"toolbar",
				items:[notebar]
			}]
		};
		
		//定义各个树和表格控件
		for (var i=1;i<=pOrderItemGridCount;i++) {
			var str="eval(myDefineGrid('center',pmyOrderItemGrid"+i+"))";
			eval(str);
		}
		/********************定义myOrderItemGrid1事件*************************/
		myOrderItemGrid1.store.on('load',function(store){  //加载时计算合计值
			var amount=0.00;
			var quantity=0.00;
			store.each(function(record){//循环遍历store的所有记录 ，获取记录属性status值为1的记录并选中
    	 		amount=amount+1.0*record.get('amount');
				quantity=quantity*1+1.0*record.get('quantity');
    	  	});
			Ext.getCmp('order_amountsum').setValue(amount.toFixed(2));
			Ext.getCmp('order_rmbsum').setValue(myRmb(amount));			
			Ext.getCmp('order_operatorx').setValue(Ext.getCmp('order_operator').getValue());
			Ext.getCmp('order_reviewerx').setValue(Ext.getCmp('order_reviewer').getValue());

    	});
		/**************************定义form1开始******************************/	
		var gridpanel=[];
		var str='';
		for (i=1;i<=pOrderItemGridCount;i++){
			eval("var xtitle=pmyOrderItemGrid"+i+".title;");
			str="var myGridPanel"+i+"=Ext.create('Ext.panel.Panel',{";
			str+="title:'&nbsp;"+xtitle+"',";
			str+="containerScroll:true,";
			str+="collapsible:true,";
			str+="  layout:'border',";
			str+="items:[myOrderItemGrid"+(i)+"]";
			str+="});";
			str+="gridpanel.push(myGridPanel"+i+");";
			eval(str);
		}	
		eval(myDefineTab('myOrderItemGridTab','','center','gridpanel',0,0,'false'));
		Ext.Ajax.request({
			url:'system/fn_getOneRecord.jsp',
			params:{ sqlString:pmyOrder.sql,keyField:pmyOrder.keyfield },									
	     	method: 'POST',async:false,
			callback:function(options,success,response){
        		var result=Ext.decode(response.responseText);
				for (var i=1;i<=pOrderFormCount;i++) {
					eval("var fields=myOrderForm"+i+".getForm().getFields();");
					eval(myLoadResultValues(result,fields,'order_'));  //控件以order_开头
           		}
           		if (Ext.getCmp('order_reviewer').getValue()!=''){
           			Ext.getCmp('order_checkedimage').setVisible(true);
           		}else{
					Ext.getCmp('order_checkedimage').setVisible(false);           	
           		}	
        	}
        });
        
        mydspOrderWin=Ext.create('Ext.window.Window', {
			title:'订单详情',
			height:550,
			width:800,
			closeAction:'destroy',  //要用destroy不能用hide
			modal:true,resizable:true,layout:'border',
			items:[myOrderForm1,myOrderItemGridTab]
        }); 
        
		mydspOrderWin.on('resize',function() {
			Ext.getCmp('order_title').destroy();
			eval(myDefineLabel('myOrderForm1','order_title','销售订单',10,mydspOrderWin.getWidth()/2-60,0,';24'));
		});

		mydspOrderWin.on('show',function() {
			for (var i=1;i<=pOrderItemGridCount;i++){
				var sql=eval("pmyOrderItemGrid"+i+".sql;");
				var xkeyfield=eval("pmyOrderItemGrid"+i+".keyfield;");
				var newparams={ sqlString:sql,keyField:xkeyfield,limit:myOrderItemGrid1.store.pageSize};
				var str="Ext.apply(myOrderItemGrid"+i+".store.proxy.extraParams,newparams);";
				str=str+"myOrderItemGrid"+i+"Store.load();";	
				eval(str);
			}	
		});
		mydspOrderWin.show();        
	//extjs
	});
	return (mydspOrderWin);
}
	
	
