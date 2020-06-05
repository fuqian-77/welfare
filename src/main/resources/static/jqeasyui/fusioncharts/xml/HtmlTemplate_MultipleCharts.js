<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />	
  <title></title>
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionCharts.js"></script><!--图表显示必须加载的文件 -->
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionChartsSave.js"></script><!--图表显示必须加载的文件 -->
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionChartsExportComponent.js"></script>
</head>
<table width="%width%" align="center" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td width="%width1%" height="%height1%" align="center" >
    <div id="mychart1Div" align="center">chart1</div>
    </td>
    <td width="%width1%" height="%height1%" align="center">
    <div id="mychart2Div" align="center">chart1</div>
    </td>
 </tr>
  <tr><td height="10"></td></tr>
  <tr>
    <td width="%width2%" height="%height2%" align="center">
    <div id="mychart3Div" align="center">chart2</div>
    </td>
    <td width="%width2%" height="%height2%" align="center">
    <div id="mychart4Div" align="center">chart2</div>
    </td>
 </tr>
  <tr><td height="10"></td></tr>
  <tr>
    <td width="%width3%" height="%height3%" align="center" >
    <div id="mychart5Div" align="center">chart3</div>
    </td>
    <td width="%width3%" height="%height3%" align="center">
    <div id="mychart6Div" align="center">chart3</div>
    </td>
 </tr>
  <tr><td height="10"></td></tr>
  <tr>
    <td width="%width4%" height="%height4%" align="center">
    <div id="mychart7Div" align="center">chart4</div>
    </td>
    <td width="%width4%" height="%height4%" align="center">
    <div id="mychart8Div" align="center">chart4</div>
    </td>
 </tr>
</table>
</html>
<script type="text/javascript">
    var myChart;
    myChart = new FusionCharts("e:/2delphitemplate/system/charts/swf/mychart1.swf", "myChart1","%width1%","%height1%","0","0");
    myChart.setDataURL("e:/2delphitemplate/system/charts/xml/mychart1.xml");
    myChart.render("myChart1Div");
    myChart = new FusionCharts("e:/2delphitemplate/system/charts/swf/mychart1.swf", "myChart2","%width1%","%height1%","0","0");
    myChart.setDataURL("e:/2delphitemplate/system/charts/xml/mychart2.xml");
    myChart.render("myChart2Div");

    myChart = new FusionCharts("e:/2delphitemplate/system/charts/swf/mychart2.swf", "myChart3","%width2%","%height2%","0","0");
    myChart.setDataURL("e:/2delphitemplate/system/charts/xml/mychart3.xml");
    myChart.render("myChart3Div");
    myChart = new FusionCharts("e:/2delphitemplate/system/charts/swf/mychart2.swf", "myChart4","%width2%","%height2%","0","0");
    myChart.setDataURL("e:/2delphitemplate/system/charts/xml/mychart4.xml");
    myChart.render("myChart4Div");

    myChart = new FusionCharts("e:/2delphitemplate/system/charts/swf/mychart3.swf", "myChart5","%width3%","%height3%","0","0");
    myChart.setDataURL("e:/2delphitemplate/system/charts/xml/mychart5.xml");
    myChart.render("myChart5Div");
    myChart = new FusionCharts("e:/2delphitemplate/system/charts/swf/mychart3.swf", "myChart6","%width3%","%height3%","0","0");
    myChart.setDataURL("e:/2delphitemplate/system/charts/xml/mychart6.xml");
    myChart.render("myChart6Div");

    myChart = new FusionCharts("e:/2delphitemplate/system/charts/swf/mychart4.swf", "myChart7","%width4%","%height4%","0","0");
    myChart.setDataURL("e:/2delphitemplate/system/charts/xml/mychart7.xml");
    myChart.render("myChart7Div");
    myChart = new FusionCharts("e:/2delphitemplate/system/charts/swf/mychart4.swf", "myChart8","%width4%","%height4%","0","0");
    myChart.setDataURL("e:/2delphitemplate/system/charts/xml/mychart8.xml");
    myChart.render("myChart8Div");
</script>


