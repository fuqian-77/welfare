function myPrintVatInvoice(store,pageno){
	var recordsperpage=5
	var linesperpage=40;
	var xsql="select '' as c where 1=0";  //实际上不执行sql语句
	var k=1;
	var i=0;
	var qtysum=0;
	var amtsum=0;
	var taxsum=0;
	var amt=0;
	var tax=0;
	var xtotalrmbcells="";
	var xfootercells="";
	var xtitlerange="";
	var xregionrange=''; //"y1,x1,y2,x2";
	var xrecordcells='';
	var n=store.getCount();
	for (i=0;i<n;i++){
		var r=myItemGrid1.store.getAt(i);
		qtysum+=1*r.get('quantity');
		amtsum+=r.get('amt')*1.0;
		taxsum+=r.get('tax')*1.0;
	}	
	var rmb=myRmb(1.0*Ext.getCmp('amountsum').getValue());
	var i=(pageno-1)*recordsperpage;
	var x=0;
	var xtitlecells="<"+(2+x)+",10>"+"    NO."+Ext.getCmp('invoiceid').getValue();
	xtitlecells+=";<"+(3+x)+",13>"+Ext.util.Format.date(Ext.getCmp('invoicedate').getValue(),'Y年m月d日');
	if (Ext.getCmp('vatinvoicetitle').getValue()!=''){
		xtitlecells+=";<"+(4+x)+",4>"+Ext.getCmp('vatinvoicetitle').getValue();
	}else{
		xtitlecells+=";<"+(4+x)+",4>"+Ext.getCmp('customername').getValue();
	}
	xtitlecells+=";<"+(7+x)+",4>"+Ext.getCmp('taxno').getValue();
	xtitlecells+=";<"+(10+x)+",4>"+Ext.getCmp('vataccountaddress').getValue()+","+Ext.getCmp('vataccountphone').getValue();
	xtitlecells+=";<"+(13+x)+",4>"+Ext.getCmp('vatbank').getValue()+","+Ext.getCmp('vatbankaccountno').getValue();
	xtitlecells+=";<"+(32+x)+",10>"+"对应订单："+(Ext.getCmp('selectedorders').getValue()).replace(eval("/"+"'"+"/g"),"");
	xtitlecells+=";<"+(40+x)+",3>"+"收款人："+Ext.getCmp('collectorname').getValue();
	xtitlecells+=";<"+(40+x)+",5>"+"复核："+Ext.getCmp('reviewer').getValue();
	xtitlecells+=";<"+(40+x)+",8>"+"开票人："+Ext.getCmp('creator').getValue();
	if (k>1) xrecordcells+";";
	xrecordcells+=xtitlecells;
	for (var j=1;(j<=recordsperpage && i<n);j++){
		var r=store.getAt(i);
		var str1=r.get('productname');
		var price=r.get("unitprice");
		xrecordcells+=";<"+(x+j*2+16)+",2>"+str1;
		xrecordcells+=";<"+(x+j*2+16)+",5>"+r.get("quantityperunit");
		xrecordcells+=";<"+(x+j*2+16)+",7>"+r.get("unit");
		xrecordcells+=";<"+(x+j*2+16)+",8>"+r.get("quantity");
		xrecordcells+=";<"+(x+j*2+16)+",9>"+r.get("unitprice");
		xrecordcells+=";<"+(x+j*2+16)+",11>"+r.get("amt");
		xrecordcells+=";<"+(x+j*2+16)+",13>"+r.get("taxrate");
		xrecordcells+=";<"+(x+j*2+16)+",14>"+r.get("tax");
		i++;
		//输出合计
		xrecordcells+=";<"+(x+28)+",11>"+amtsum.toFixed(2);
		xrecordcells+=";<"+(x+28)+",14>"+taxsum.toFixed(2);
		xrecordcells+=";<"+(x+30)+",5>"+myRmb(amtsum+taxsum);
		xrecordcells+=";<"+(x+30)+",12>￥"+(amtsum+taxsum).toFixed(2)+" ";
		if (i>=n){
			var xtargetfilename=Ext.getCmp('invoiceid').getValue()+"发票.xls";
		}else{
			var xtargetfilename=Ext.getCmp('invoiceid').getValue()+"发票"+k+".xls";
		}
		//alert(xrecordcells);
	}
	//xregionrange="1,-1,"+linesperpage*(pageno-1)+",-1";
}

function myPrintStdInvoice(store,pageno){ 
	var xtemplate="TInvoice2.xls";
	var recordsperpage=12;
	var linesperpage=23;
	var xsql="select '' as c where 1=0";  //实际上不执行sql语句
	var k=1;
	var i=0;
	var qtysum=0;
	var amtsum=0;
	var taxsum=0;
	var amt=0;
	var tax=0;
	var xtotalrmbcells="";
	var n=store.getCount();
	var xfootercells="";
	var xtitlerange="";
	var xregionrange=''; //"y1,x1,y2,x2";
	var xrecordcells='';
	for (i=0;i<n;i++){
		var r=myItemGrid1.store.getAt(i);
		qtysum+=1*r.get('quantity');
		amtsum+=r.get('amt')*1.0;
		taxsum+=r.get('tax')*1.0;
	}	
	var rmb=myRmb(1.0*Ext.getCmp('amountsum').getValue());
	var i=(pageno-1)*recordsperpage;
	var x=0;
	var xtitlecells="<"+(3+x)+",6>"+Ext.getCmp('invoiceid').getValue();
	xtitlecells+=";<"+(5+x)+",6>"+Ext.util.Format.date(Ext.getCmp('invoicedate').getValue(),'Y年m月d日');
	xtitlecells+=";<"+(4+x)+",1>  购货单位："+Ext.getCmp('customername').getValue();
	//xtitlecells+=";<"+(32+x)+",10>"+"对应订单："+(Ext.getCmp('selectedorders').getValue()).replace(eval("/"+"'"+"/g"),"");
	xtitlecells+=";<"+(20+x)+",1>"+"收款人："+Ext.getCmp('collectorname').getValue();
	xtitlecells+=";<"+(20+x)+",2>"+"复核："+Ext.getCmp('reviewer').getValue();
	xtitlecells+=";<"+(20+x)+",4>"+"开票人："+Ext.getCmp('creator').getValue();
	xrecordcells=xtitlecells;
	for (var j=1;(j<=recordsperpage && i<n);j++){
		var r=store.getAt(i);
		var str1=r.get('productname');
		var price=r.get("unitprice");
		xrecordcells+=";<"+(x+j+6)+",1>"+str1;
		xrecordcells+=";<"+(x+j+6)+",2>"+r.get("quantityperunit");
		xrecordcells+=";<"+(x+j+6)+",3>"+r.get("unit");
		xrecordcells+=";<"+(x+j+6)+",4>"+r.get("quantity");
		xrecordcells+=";<"+(x+j+6)+",5>"+r.get("unitprice");
		xrecordcells+=";<"+(x+j+6)+",7>"+r.get("amount");
		i++;
	}
	xrecordcells+=";<"+(x+19)+",1>  合计人民币（大写）："+myRmb(amtsum+taxsum);
	xrecordcells+=";<"+(x+19)+",7>"+(amtsum+taxsum).toFixed(2)+" ";
	xregionrange=""; //"+linesperpage*(k-1)+",-1";
}
