function myDisplayCustomer(keyvalue) { 
	var mydspCustomerWin=null;
	Ext.require(['Ext.form.*','Ext.tree.*','Ext.panel.*','Ext.tab.*','Ext.data.*','Ext.grid.*','Ext.toolbar.*','Ext.menu.*','Ext.Viewport']);
	Ext.onReady(function(){
		var rowHeight=28;  //form中控件之间的行距，为function全局变量
		var pCustomerFormCount=1;  //网页中表单的个数，名称规定由myCustomerForm开头
		var pOrderItemGridCount=1;
		var pmyCustomer={};
		//alert(9);
		pmyCustomer.keyfield='customerid';
		pmyCustomer.keyvalue=keyvalue;
		pmyCustomer.sql="select a.*,title,contactname,c.areaname as province,d.areaname as city,c.areaname+' '+d.areaname as provincecity from customers a"; 
		pmyCustomer.sql+=" left join contacts b on a.customerid=b.customerid and a.contactid=b.contactid";
		pmyCustomer.sql+=" left join areas c on a.provinceid=c.areaid";
		pmyCustomer.sql+=" left join areas d on a.cityid=d.areaid";
		pmyCustomer.sql+=" where a."+pmyCustomer.keyfield+"='"+pmyCustomer.keyvalue+"'";
		eval(myDefineForm('myCustomerForm1','center',0,0,60,false));
		eval(myDefineFieldSet('myCustomerForm1','customer_fieldset1','基本信息',8,10,335,450,75));
		eval(myDefineFieldSet('myCustomerForm1','customer_fieldset2','辅助信息',352,10,225,450,75));
		eval(myDefineFieldSet('myCustomerForm1','customer_fieldset3','开户银行',586,10,82,450,75));
		eval(myDefineFieldSet('myCustomerForm1','customer_fieldset4','增值税开票信息',680,10,140,450,75));
		eval(myDefineDisplayField('customer_fieldset1','customer_customerid','客户编码：',60,5,6));
		eval(myDefineDisplayField('customer_fieldset1','customer_pycode','助 记 码：',60,5+rowHeight*1,6));
		eval(myDefineDisplayField('customer_fieldset1','customer_customername','客户名称：',60,5+rowHeight*2,6));
		eval(myDefineDisplayField('customer_fieldset1','customer_province','所在省份：',60,5+rowHeight*3,6));
		eval(myDefineDisplayField('customer_fieldset1','customer_city','所在城市：',60,5+rowHeight*4,6));
		eval(myDefineDisplayField('customer_fieldset1','customer_address','详细地址：',60,5+rowHeight*5,6));
		eval(myDefineDisplayField('customer_fieldset1','customer_zip','邮政编码：',60,5+rowHeight*6,6));
		eval(myDefineDisplayField('customer_fieldset1','customer_phone','联系电话：',60,5+rowHeight*7,6));
		eval(myDefineDisplayField('customer_fieldset1','customer_fax','传真号码：',60,5+rowHeight*8,6));
		eval(myDefineDisplayField('customer_fieldset1','customer_email','电子邮件：',60,5+rowHeight*9,6));
		eval(myDefineDisplayField('customer_fieldset1','customer_homepage','网站主页：',60,5+rowHeight*10,6));
		eval(myDefineHiddenField('customer_fieldset1','customer_provinceid'));
		eval(myDefineHiddenField('customer_fieldset1','customer_cityid'));
		eval(myDefineDisplayField('customer_fieldset2','customer_industry','所属行业：',60,5+rowHeight*0,6));
		eval(myDefineDisplayField('customer_fieldset2','customer_type','客户类别：',60,5+rowHeight*1,6));
		eval(myDefineDisplayField('customer_fieldset2','customer_source','客户来源：',60,5+rowHeight*2,6));
		eval(myDefineDisplayField('customer_fieldset2','customer_status','客户状态：',60,5+rowHeight*3,6));
		eval(myDefineDisplayField('customer_fieldset2','customer_revenue','年销售额：', 60,5+rowHeight*4,6));
		eval(myDefineLabel('customer_fieldset2','customer_label1','(万元)',5+rowHeight*4+3,160));
		eval(myDefineDisplayField('customer_fieldset2','customer_employees','员工人数：',60,5+rowHeight*5,6));
		eval(myDefineDisplayField('customer_fieldset2','customer_stockno','股票代码：',60,5+rowHeight*6,6));
		eval(myDefineDisplayField('customer_fieldset3','customer_bank','开户银行：',60,5+rowHeight*0,10));
		eval(myDefineDisplayField('customer_fieldset3','customer_bankaccountno','银行帐号：',60,5+rowHeight*1,6));
		eval(myDefineDisplayField('customer_fieldset4','customer_vatinvoicetitle','开票名称：',60,5+rowHeight*0,6));
		eval(myDefineDisplayField('customer_fieldset4','customer_taxno','增值税号：',60,5+rowHeight*1,6));
		eval(myDefineDisplayField('customer_fieldset4','customer_vataccountphone','开户电话：',60,5+rowHeight*2,6));
		eval(myDefineDisplayField('customer_fieldset4','customer_vataccountaddress','开户地址：',60,5+rowHeight*3,6));
		eval(myDefineDisplayField('customer_fieldset4','customer_vatbank','开户银行：',60,5+rowHeight*4,6));
		eval(myDefineDisplayField('customer_fieldset4','customer_vatbankaccountno','银行账号：',0,5+rowHeight*5,6));
		//for (var i=1;i<=100;i++){
			//eval(myHLine('customer_fieldset1','aline'+i,rowHeight*1+6+i*2,0,1,600));
			//eval(myHLine('customer_fieldset1','bline'+i,0,1+6*i,200,1));
		//}
		Ext.Ajax.request({
			url:'system//fn_getOneRecord.jsp',
			params:{ sqlString:pmyCustomer.sql,keyField:pmyCustomer.keyfield },									
	     	method: 'POST',async:false,
			callback:function(options,success,response){
        		var result=Ext.decode(response.responseText);
				for (var i=1;i<=pCustomerFormCount;i++) {
					eval("var fields=myCustomerForm"+i+".getForm().getFields();");
					eval(myLoadResultValues(result,fields,'customer_'));  //控件以customer_开头
           		}
        	}
        });
        
        mydspCustomerWin=Ext.create('Ext.window.Window', {
			title:'&nbsp;客户详情',
			height:500,
			width:500,
			closeAction:'destroy',  //要用destroy不能用hide
			modal:true,resizable:true,layout:'border',
			items:[myCustomerForm1]
        }); 
        
		mydspCustomerWin.on('resize',function() {
			//Ext.getCmp('order_title').destroy();
			//eval(myDefineLabel('myCustomerForm1','order_title','销售订单',10,mydspCustomerWin.getWidth()/2-60,0,';24'));
		});

		mydspCustomerWin.on('show',function() {
		});
		
		mydspCustomerWin.show();        
	//extjs
	});
	return (mydspCustomerWin);
}
	
	
