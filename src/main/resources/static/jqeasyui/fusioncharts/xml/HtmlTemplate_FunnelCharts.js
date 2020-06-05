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
    <td width="%width1%" height="%height1%" align="center"><div id="Funnel1Div" align="center"></div></td>
    <td width="%width1%" height="%height1%" align="center"><div id="Funnel2Div" align="center"></div></td>
  </tr>
  <tr>
    <td width="%width1%"  height="%height1%" align="center"><div id="Funnel3Div" align="center"></div></td>
    <td width="%width1%"  height="%height1%" align="center"><div id="Funnel4Div" align="center"></div></td>
  </tr>
</table>
</html>
<script type="text/javascript">
  var Funnel_Chart;
  for(var i=1;i<=4;i++){
    Funnel_Chart = new FusionCharts("e:/2delphitemplate/system/charts/swf/Funnel.swf", "Funnel"+i+"", "%width1%", "%height1%", "0", "0");
    Funnel_Chart.setDataURL("e:/2delphitemplate/system/charts/xml/Funnel"+i+".xml");
    Funnel_Chart.render("Funnel"+i+"Div");
    }
</script>
