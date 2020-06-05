<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title></title>
	<script type="text/javascript" src ="../../Ext/fusionCharts/FusionCharts.js"></script><!--图表显示必须加载的文件 -->
	<script type="text/javascript" src ="../../js/index/majax.js"></script><!-- 用于进行ajax操作 -->
	<link rel="stylesheet" type="text/css" href="../../Ext/css/chartonestyle.css"/><!--样式 文件  -->
	<style type="text/css" media="screen">
		object.FusionCharts:focus, embed.FusionCharts:focus {outline: none}
		#SalesByYear {visibility:hidden}
		#TopEmployees {visibility:hidden}
		#SalesByCat {visibility:hidden}
		#SalesByProd {visibility:hidden}
	</style>
	<script type="text/javascript">		
		var empChartLoaded=false;
		var catChartLoaded=false;
		var prodChartLoaded=false;
		var cusChartLoaded = false;
		var cusChartPieLoaded = false;
		function FC_Rendered(DOMId){//更新图表是否加载  若已存在对应的id,则设置相应的变量值为true
			switch(DOMId){
				case "TopEmployees":
					empChartLoaded = true;
					break;
				case "SalesByCat":		
					catChartLoaded = true;
					break;
				case "SalesByProd":		
					prodChartLoaded = true;
					break;
				case "ProdSalesDetails":		
					cusChartLoaded = true;
					break;
				case "CustomerBySales":		
					cusChartPieLoaded = true;
					break;
			}
			return;
		}
		var majax = new Majax();
		function updateCharts(year){//根据选择的年份  更新图表数据
			if(year==''){//如果年份为空，代表是默认的 则通过调用 getSelecedYear方法获取年份
				year = getSelectedYear();
			}else{//若年份不为空，则循环遍历年份单选框组各选项的选中状态
				var i;//更新年份选择单选框.
				for (i=0; i<document.frmYr.Year.length; i++){//循环变量整个单选框group 并将匹配的年份选中 		
					if(parseInt(document.frmYr.Year[i].value,10)==year){
						document.frmYr.Year[i].checked = true;		
					}else{
						document.frmYr.Year[i].checked = false;
					}
				}	
			}	
			if (catChartLoaded){//如果产品类别图表已经加载    更新产品类别销售情况 
				var strURL = "../../getSalesByCategory.do?year="+year+"&status="+getAnimateStatus();
				strURL = strURL + "&currTime=" + getTimeForURL();
				strURL = escape(strURL);		
				var chartObj = FusionCharts("SalesByCat");	//获取相应的图表对象 并赋值
				chartObj.setXMLUrl(strURL);		
			}else{
				alert("Please wait for the charts to load");
				return;
	
			}
			if (empChartLoaded){//如果业务人员图表已经加载    更新相应年度的业务人员销售情况 
				var strURL = "../../getTopEmployee.do?year=" + year +"&count=5&status="+getAnimateStatus();	
				strURL = strURL+"&curTime="+getTimeForURL();
				
				majax.get(strURL,setTopEmployees);
			}else{
				alert("Please wait for the charts to load");
				return;
			}
		}
		function setTopEmployees(req){
			var text = req.responseText;
			var chartObj = getChartFromId("TopEmployees");//获取相应的图表对象 并赋值
			chartObj.setDataXML(text);
		}
		function updateProductChart(intYear, intMonth, intCatId,strCatName){//点击产品类别图表中的 列 更新|加载产品图表中的数据	
			var strURL = "../../getSalesByProd.do?year="+intYear +"&month="+intMonth+"&catId="+intCatId+"&catName="+strCatName+"&status="+getAnimateStatus();
			strURL = escape(strURL);
			var chartObj = FusionCharts("SalesByProd");
			chartObj.setXMLUrl(strURL);
		}
			
		function updateCustomerChart(intYear,intMonth,intProdId,strProdName){
			if(cusChartLoaded){
				var strURL = "../../getCustomerBySales.do?type=column&year="+intYear +"&month="+intMonth+"&prodId="+intProdId+"&prodName="+strProdName+"&status="+getAnimateStatus();
				strURL = escape(strURL);
				var chartObj = FusionCharts("ProdSalesDetails");
				chartObj.setXMLUrl(strURL);
			}else{
				alert("Please wait for the charts to load");
				return;
			}
			if(cusChartPieLoaded){
				var strURL = "../../getCustomerBySales.do?type=pie&year="+intYear +"&month="+intMonth+"&prodId="+intProdId+"&prodName="+strProdName+"&status="+getAnimateStatus();
				majax.get(strURL,setCusChartPies);
			}else{
				alert("Please wait for the charts to load");
				return;
			}
		}
		function setCusChartPies(req){
			var text = req.responseText;
			var chartObj = FusionCharts("CustomerBySales");
			chartObj.setDataXML(text);
		}
		
		function getTimeForURL(){//获取时间  用于每次加载数据   防止浏览器缓存
			var dt = new Date();
			var strOutput = "";
			strOutput = dt.getHours() + "_" + dt.getMinutes() + "_" + dt.getSeconds() + "_" + dt.getMilliseconds();
			return strOutput;
		}
		function openNewWindow(theURL,winName,features) {//弹出新的窗体显示对应的信息
			 window.open(theURL + "?year=" + getSelectedYear()+"&status="+getAnimateStatus(),winName,features);
		}

		function getSelectedYear(){//获取选择的年份
			var selYear;
			for (i=0; i<document.frmYr.Year.length; i++){
				if(document.frmYr.Year[i].checked){		
					selYear = document.frmYr.Year[i].value;
				}
			}
			return selYear;
		}
	
		function getAnimateStatus(){//获取是否有动画效果
			var status;
			for (i=0; i<document.frmYr.animate.length; i++){
				if(document.frmYr.animate[i].checked){		
					status = document.frmYr.animate[i].value;
				}
			}
			return status;
		}
	</script>

</head>

<body style="margin: 0 0 0 0;" bgcolor="#EEEEEE" ">
	<table width="960" align="center" cellpadding="0" cellspacing="0" border="0" background="images/PageBg.jpg">
	<form name="frmYr" action="" method="post" id="frmYr">
		<tr style="height: 30;"><td width="33"></td>
			<td height="22" colspan="2" align="center" bgcolor="#EEEEEE" valign="middle">
				<nobr>
					<span class="textbolddark">选择年份: </span>
						<input type='radio' name='Year' value='2008' checked/><span class='text'>2008</span>
						<input type='radio' name='Year' value='2009'/><span class='text'>2009</span>
						<input type='radio' name='Year' value='2010'/><span class='text'>2010</span>		
					<span class="textbolddark"><span class='text'>&nbsp;&nbsp;&nbsp;</span>动画效果: </span>
						<input type="radio" name="animate" value="1" checked/><span class="text">是</span>
						<input type="radio" name="animate" value="0"/><span class="text">否</span>
					<span class='text'>&nbsp;&nbsp;</span>
						<input type="button" class="button" value="Go" id="tijiao" onclick="javaScript:updateCharts('');" name="tijiao" />
				</nobr>	
			</td>
			<td width="37"></td>
		</tr>
	</form>	
		<tr>
			<td width="33"></td>
			<td height="1" colspan="2" bgcolor="#FFFFFF"></td>
			<td width="37"></td>
		</tr>
		<tr>
			<td width="33"></td>
			<td height="1" colspan="2" bgcolor="#EEEEEE"></td>
			<td width="37"></td>
		</tr>
		<tr>
			<td height="10" colspan="4"></td>
		</tr>
		<tr>
			<td width="33"></td>
			<td colspan="2"><a name='start' />
				<table width="875" align="center" cellspacing="0" cellpadding="0">
					<tr>
						<td align="left" width="500"><div id='SalesByYearDiv' align='center'></div></td>
						<td width="3"></td>
						<td valign="top" style="Border-left:#EEEEEE 1px solid;">		
							<table width="90%" align="right">
								<tr>
									<td><div id='TopEmployeesDiv' align='center'></div></td>
								</tr>
								<tr>
									<td valign="top">
										<table width="100%" align="center" cellpadding="0" cellspacing="0">
											<tr>
												<td background="../../Ext/images/orangeTab.gif" colspan="3" align="left" height="26" width="405">
													<span class="textBoldDark">&nbsp;&nbsp; 更多图表...</span>
												</td>
												<td></td>
											</tr>
											<tr>
												<td height="5"></td>
											</tr>
											<tr style="height: 27;">
												<td width="127" align="center" valign="bottom" height="27">
													<a href="#start"><img src="../../Ext/images/btnTopIndicators.jpg" border="0" onclick="openNewWindow('Chart_TopIndicators.jsp','chart_topI','status=yes,scrollbars=yes,resizable=yes,width=1000,height=700');" alt="My Top Selected Indicators in Charts" width="126" height="27" /></a>									
												</td>
												<td width="131" align="center" valign="bottom" height="27">
													<a href="#start"><img src="../../Ext/images/btnEmployee.jpg" border="0" onclick="openNewWindow('Chart_SalesByEmployee.jsp','chart_employee','status=yes,scrollbars=yes,resizable=yes,width=1000,height=700');" alt="Sales By Employee" width="126" height="27"/></a>									
												</td>
												<td align="left" valign="bottom" width="32%" height="27"></td>
												<td></td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<table width="875" height="10"><tr><td></td></tr></table>
				<table width="875" align="center" cellpadding="0" cellspacing="0" border="0" style="Border-top:#EEEEEE 1px solid;">
					<tr>
						<td align="left"><div id='SalesByCatDiv' align='center'></div></td>
					</tr>
				</table>

				<table width="875" height="10"><tr><td></td></tr></table>
				<table width="875" align="center" cellpadding="0" cellspacing="0" border="0" style="Border-top:#EEEEEE 1px solid;">
					<tr>
						<td align="left"><div id='SalesByProdDiv' align='center'></div>
							<script type="text/javascript"><!--	
								var chart_SalesByProd = new FusionCharts( { "swfUrl" : "../../Ext/fusionCharts/MSColumn3DLineDY.swf?ChartNoDataText=请在上图选择一个产品类别查看产品销售明细.", "width" : "875", "height" : "350", "renderAt" : "SalesByProdDiv", "dataFormat" : "xml", "id" : "SalesByProd", "wmode" : "opaque", "dataSource" : "<chart></chart>" } ).render();
								// -->
							</script>	
						</td>
					</tr>
				</table>
				<table width="875" height="10"><tr><td></td></tr></table>
				<table width="875" align="center" cellpadding="0" cellspacing="0" border="0" style="Border-top:#EEEEEE 1px solid;">
					<tr>
						<td width='440' align='center' style='BORDER-RIGHT:#EEEEEE 1px solid;'>
							<div id='ProdSalesDetailsDiv' align='center'></div>
							<script type="text/javascript"><!--	
								var chart_ProdSalesDetails = new FusionCharts( { "swfUrl" : "../../Ext/fusionCharts/MSColumn3DLineDY.swf?ChartNoDataText=请在上图中选择一产品.", "width" : "440", "height" : "350", "renderAt" : "ProdSalesDetailsDiv", "dataFormat" : "xml", "id" : "ProdSalesDetails", "wmode" : "opaque", "dataSource" : "<chart></chart>" } ).render();
						// --></script>	
						</td>
						<td width='440' align='center'>
							<div id='CustomerBySalesDiv' align='center'></div>
							<script type="text/javascript"><!--	
								var chart_CustomerBySales = new FusionCharts( { "swfUrl" : "../../Ext/fusionCharts/Pie3D.swf?ChartNoDataText=请在上图中选择一产品.", "width" : "435", "height" : "350", "renderAt" : "CustomerBySalesDiv", "dataFormat" : "xml", "id" : "CustomerBySales", "wmode" : "opaque", "dataSource" : "<chart></chart>" } ).render();
					// --></script>	
						</td>
					</tr>
				</table>
				<br>
			</td>
			<td width="37">&nbsp;</td>
		</tr>
		<tr>
			<td width="33"></td>
			<td height="1" colspan="2" style="background-color: #EEEEEE;"></td>
			<td width="37"></td>
		</tr>
		<tr>
			<td height="10" colspan="4"></td>	
		</tr>
		<tr>
			<td width="33"></td>
			<td colspan="2" align="center"></td>
			<td width="33"></td>
		</tr>
        <tr>
			<td width="33" height="10"></td>
			<td colspan="2" align="center" ></td>
			<td width="33"></td>
		</tr>
		<tr>
			<td width="33"></td>
			<td colspan="2" align="center"></td>
			<td width="33"></td>
		</tr>
		<tr>
			<td height="4" colspan="4"></td>	
		</tr>	
	</table>
</body>
</html>
<script type="text/javascript">
<!--
	initData();							
	function initData(){//初始化图表
		var url = "../../getInitChartDataByYear.do?year=&status=1&currentTime="+getTimeForURL();
		var empl_url ="../../getTopEmployee.do?year="+getSelectedYear()+"&status=1&currentTime="+getTimeForURL();
		var cate_url = "../../getSalesByCategory.do?year="+getSelectedYear()+"&status=1&currentTime="+getTimeForURL();
		var _majax = new Majax();
		_majax.get(url,setSalesByYear);
		_majax.get(empl_url,setTopEmployee);
		_majax.get(cate_url,setSalesByCategory);
	}
	function setSalesByYear(req){//各年度销售情况
		var text = req.responseText;
		var chart_SalesByYear = new FusionCharts( { "swfUrl" : "../../Ext/fusionCharts/MSColumn3DLineDY.swf", "width" : "450", "height" : "325", "renderAt" : "SalesByYearDiv", "wmode" : "opaque","dataFormat" : "xml", "id" : "SalesByYear", "dataSource" : ""+text+"" } ).render();
		
	}
	function setTopEmployee(req){//销售业绩位于前5的
		var emp_text = req.responseText;
		var chart_TopEmployees = new FusionCharts( { "swfUrl" : "../../Ext/fusionCharts/Pie2D.swf", "width" : "400", "height" : "262", "renderAt" : "TopEmployeesDiv","dataFormat" : "xml", "id" : "TopEmployees", "wmode" : "opaque", "dataSource" : ""+emp_text+"" } ).render();
	}
	function setSalesByCategory(req){//产品类别销售情况
		var cate_text = req.responseText;
		var chart_SalesByCat = new FusionCharts( { "swfUrl" : "../../Ext/fusionCharts/MSColumn3D.swf", "width" : "865", "height" : "350", "renderAt" : "SalesByCatDiv", "dataFormat" : "xml", "id" : "SalesByCat", "wmode" : "opaque", "dataSource" : ""+cate_text+"" } ).render();
	}
//-->
</script>
