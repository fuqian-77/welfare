<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />	
  <title></title>
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionCharts.js"></script><!--图表显示必须加载的文件 -->
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionChartsSave.js"></script><!--图表显示必须加载的文件 -->
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionChartsExportComponent.js"></script>
</head>
<div id='myChart1Div' align='center'>myChart</div> 
</html>
<script type="text/javascript">
    var myChart;
    myChart = new FusionCharts("e:/2delphitemplate/system/charts/swf/mychart.swf", "myChart1","%width%","%height%","0","0");
    myChart.setDataURL("e:/2delphitemplate/system/charts/xml/mychart.xml");
    myChart.render("myChart1Div");
</script>


