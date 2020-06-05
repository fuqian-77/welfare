<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=GBK" />
  <title></title>
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionCharts.js"></script><!--图表显示必须加载的文件 -->
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionChartsSave.js"></script><!--图表显示必须加载的文件 -->
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionChartsExportComponent.js"></script>
</head>
  <body>
   <table width="875" align="center" cellpadding="0" cellspacing="0" border="0" style="Border-top:#EEEEEE 1px solid;">
     <tr>
	<td align="left"><div id='CategoryDiv' align='center'></div></td>
    </tr>
  </table>
  <table width="875" height="20"><tr><td></td></tr></table>
  <table width="875" align="center" cellpadding="0" cellspacing="0" border="0" style="Border-top:#EEEEEE 1px solid;">
    <tr>
     <td align="left">
       <div id='SalesByCategoryDiv' align='center'>
         <script type="text/javascript">
          var chart_SalesByProd = new FusionCharts( { "swfUrl" : "e:/2delphitemplate/system/charts/swf/Column3D.swf?ChartNoDataText=请在上图选择一个产品类别查看所有产品销售.", 
          "width" : "875", "height" : "350", "renderAt" : "SalesByCategoryDiv", "dataFormat" : "xml", "id" : "SalesByCategory", "wmode" : "opaque", 
          "dataSource" : "<chart></chart>" } ).render();
        </script>
      </div>	
    </td>
  </tr>
  </table>
  <table width="875" height="20"><tr><td></td></tr></table>
  <table width="875" align="center" cellpadding="0" cellspacing="0" border="0" style="Border-top:#EEEEEE 1px solid;">
    <tr>
     <td align="left">
	<div id='SalesByProdDiv' align='center'>
	  <script type="text/javascript">
	   var chart_SalesByProd = new FusionCharts( { "swfUrl" : "e:/2delphitemplate/system/charts/swf/MSColumn3DLineDY.swf?ChartNoDataText=请在上图选择一个产品查看产品销售明细.", 
           "width" : "875", "height" : "350", "renderAt" : "SalesByProdDiv", "dataFormat" : "xml", "id" : "SalesByProd", "wmode" : "opaque", 
           "dataSource" : "<chart></chart>" } ).render();
	  </script>
	</div>	
     </td>
  </tr>
</table>
</body>
<script type="text/javascript">
	initData();//初始化操作
	function initData(){
	var Category_Pie_Chart =new FusionCharts("e:/2delphitemplate/system/charts/swf/Pie3D.swf","category","750","350","0","0");
	Category_Pie_Chart.setDataURL("e:/2delphitemplate/system/charts/xml/category.xml");
	Category_Pie_Chart.render("CategoryDiv");
	}
       function updateChart(flag){
	var chartObj = FusionCharts("SalesByCategory"); 
 	chartObj.setDataURL("e:/2delphitemplate/system/charts/xml/category"+flag+".xml");
      }

      function updateProductChart(productId){
	var chartObj = FusionCharts("SalesByProd");
	chartObj.setDataURL("e:/2delphitemplate/system/charts/xml/product"+productId+".xml");
     }
</script>					
</html>
