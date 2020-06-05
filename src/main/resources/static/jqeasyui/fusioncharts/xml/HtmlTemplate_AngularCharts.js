<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <title></title>
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionCharts.js"></script><!--图表显示必须加载的文件 -->
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionChartsSave.js"></script><!--图表显示必须加载的文件 -->
  <script type="text/javascript" src="e:/2delphitemplate/system/charts/fusionchart/FusionChartsExportComponent.js"></script>
</head>
<table width="%width%" align="center" cellpadding="0" cellspacing="0" border="0" >
  <tr>
    <td width="%width1%" height="%height1%" align="center"><div id="Angular1Div" align="center"></div></td>
    <td width="%width1%" height="%height1%"  align="center"><div id="Angular2Div" align="center"></div></td>
    <td width="%width1%"  height="%height1%" align="center"><div id="Angular3Div" align="center"></div></td>
  </tr>
  <tr>
    <td width="%width1%"  height="%height1%" align="center"><div id="Angular4Div" align="center"></div></td>
    <td width="%width1%"  height="%height1%" align="center"><div id="Angular5Div" align="center"></div></td>
    <td width="%width1%"  height="%height1%" align="center"><div id="Angular6Div" align="center"></div></td>
  </tr>
  <tr>
    <td width="%width1%"  height="%height1%" align="center"><div id="Angular7Div" align="center"></div></td>
    <td width="%width1%"  height="%height1%" align="center"><div id="Angular8Div" align="center"></div></td>
    <td width="%width1%"  height="%height1%" align="center"><div id="Angular9Div" align="center"></div></td>
  </tr>
  <tr>
    <td width="%width1%"  height="%height1%" align="center"><div id="Angular10Div" align="center"></div></td>
    <td width="%width1%"  height="%height1%" align="center"><div id="Angular11Div" align="center"></div></td>
    <td width="%width1%"  height="%height1%" align="center"><div id="Angular12Div" align="center"></div></td>
  </tr>
  <tr>
    <td width="%width1%"  height="%height1%" align="center"><div id="Angular13Div" align="center"></div></td>
    <td width="%width1%"  height="%height1%" align="center"><div id="Angular14Div" align="center"></div></td>
    <td width="%width1%"  height="%height1%" align="center"><div id="Angular15Div" align="center"></div></td>
  </tr>
</table>
</html>
<script type="text/javascript">
  var Angular_Chart;
  for(var i=1;i<=15;i++){
    Angular_Chart = new FusionCharts("e:/2delphitemplate/system/charts/swf/AngularGauge.swf", "Angular"+i+"", "%width1%", "%height1%", "0", "0");
    Angular_Chart.setDataURL("e:/2delphitemplate/system/charts/xml/Angular"+i+".xml");
    Angular_Chart.render("Angular"+i+"Div");
    }
</script>
