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
    <td width="%width1%" height="%height1%" align="center"><div id="Pyramid1Div" align="center"></div></td>
    <td width="%width1%" height="%height1%" align="center"><div id="Pyramid2Div" align="center"></div></td>
  </tr>
    <td width="%width1%"  height="%height1%" align="center"><div id="Pyramid3Div" align="center"></div></td>
    <td width="%width1%"  height="%height1%" align="center"><div id="Pyramid4Div" align="center"></div></td>
  </tr>
</table>
</html>
<script type="text/javascript">
  var Pyramid_Chart;
  for(var i=1;i<=4;i++){
    Pyramid_Chart = new FusionCharts("e:/2delphitemplate/system/charts/swf/Pyramid.swf", "Pyramid"+i+"", "%width1%", "%height1%", "0", "0");
    Pyramid_Chart.setDataURL("e:/2delphitemplate/system/charts/xml/Pyramid"+i+".xml");
    Pyramid_Chart.render("Pyramid"+i+"Div");
    }
</script>
