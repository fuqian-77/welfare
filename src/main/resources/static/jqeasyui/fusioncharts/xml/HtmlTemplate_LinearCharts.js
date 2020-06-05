<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=GBK" />
   <title></title>
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionCharts.js"></script><!--图表显示必须加载的文件 -->
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionChartsSave.js"></script><!--图表显示必须加载的文件 -->
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionChartsExportComponent.js"></script>
</head>
<table width="%width%" align="center" cellpadding="0" cellspacing="0" border="0" >
  <tr>
    <td width="%width1%" height="30" align="center" >利润率(％)</td>
    <td width="%width1%" height="30" align="center">货款回笼率(％)</td>
  </tr>
  <tr>
    <td width="%width1%" height="%height1%" align="center"><div id="Linear1Div" align="center"></div></td>
    <td width="%width1%" height="%height1%" align="center"><div id="Linear2Div" align="center"></div></td>
  </tr>
  <tr>
    <td width="%width1%" height="30" align="center">销售额率(万元)</td>
    <td width="%width1%" height="30" align="center">平均发货天数</td>
  </tr>
  <tr>
    <td width="%width1%"  height="%height1%" align="center"><div id="Linear3Div" align="center"></div></td>
    <td width="%width1%"  height="%height1%" align="center"><div id="Linear4Div" align="center"></div></td>
  </tr>
  <tr>
    <td width="%width1%" height="30" align="center">应收账款率(％)</td>
    <td width="%width1%" height="30" align="center">发货准时率(％)</td>
  </tr>
  <tr>
    <td width="%width1%"  height="%height1%" align="center"><div id="Linear5Div" align="center"></div></td>
    <td width="%width1%"  height="%height1%" align="center"><div id="Linear6Div" align="center"></div></td>
  </tr>
</table>
</html>
<script type="text/javascript">
  var Linear_Chart;
  for(var i=1;i<=6;i++){
    Linear_Chart = new FusionCharts("e:/2delphitemplate/system/charts/swf/HLinearGauge.swf", "Linear"+i+"", "%width1%", "%height1%", "0", "0");
    Linear_Chart.setDataURL("e:/2delphitemplate/system/charts/xml/Linear"+i+".xml");
    Linear_Chart.render("Linear"+i+"Div");
    }
</script>
