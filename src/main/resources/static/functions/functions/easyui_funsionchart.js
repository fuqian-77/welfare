function myGetChartXMLHeader(pmyChart){
	//返回fusionchart图表文件的xml文件头
	var str="<chart caption=\""+pmyChart.title+"\" XAxisName=\""+pmyChart.xAxisName+"\" YAxisName=\""+pmyChart.yAxisName+"\"";
	str+="\n numberPrefix=\"\" showValues=\"0\" formatNumberScale=\"0\" showAboutMenuItem=\"0\"";
	str+="\n seriesNameInToolTip=\"1\" chartTopMargin=\"10\" chartBottomMargin=\"10\" chartLeftMargin=\"10\" chartRightMargin=\"10\"";
	str+="\n baseFont=\"宋体\" baseFontSize=\"10\"";
	str+="\n exportEnabled=\"1\" exportDialogMessage=\"正在导出,请稍候...\" exportFormats=\"JPEG=导出为JPG图片|PNG=导出为PNG图片|PDF=导出为PDF文件\"";
	str+="\n exportDataMenuItemLabel=\"导出图片\" showExportDataMenuItem=\"1\" exportAtClient=\"1\"";
	str+="\n useRoundEdges=\"1\" animation=\"0\" palette=\"2\" >";
	return(str);
};	

function myGetChartXMLFooter(pmyChart){
	//返回fusionchart图表文件的xml文件尾部
	var str="\n <styles>";
	str+="\n <definition>";
	str+="\n <style type=\"font\" color=\"666666\" name=\"CaptionFont\" font=\"黑体\" size=\"16\" />";
	str+="\n <style type=\"font\" name=\"SubCaptionFont\" font=\"宋体\" size=\"12\" bold=\"0\" />";
	str+="\n </definition>";
	str+="\n <application>";
	str+="\n <apply toObject=\"caption\" styles=\"CaptionFont\" />";
	str+="\n <apply toObject=\"SubCaption\" styles=\"SubCaptionFont\" />";
	str+="\n </application>";
	str+="\n </styles>";
	str+="\n </chart>";
	return(str);
};

function myGetFunnelXML(pmyChart){
	var xml='<chart caption="销售额排名前10名" decimals="0" numberPrefix="$" streamlinedData="0" bgColor="f7f2ea" borderColor="f7f2ea" chartLeftMargin="50" chartRightMargin="50" chartTopMargin="5" chartBottomMargin="5" baseFont="宋体" baseFontSize="12" exportEnabled="1" showAboutMenuItem="0" borderthickness="0" bgAlpha="100" >';
	for (var i=0;i<pmyChart.data.length;i++){
		var s1=eval('pmyChart.data['+i+'].'+pmyChart.labelfield);
		var s2=eval('pmyChart.data['+i+'].'+pmyChart.valuefield);
		xml+="<set label='"+eval('pmyChart.data['+i+'].'+pmyChart.labelfield)+"'";
		xml+=" value='"+eval('pmyChart.data['+i+'].'+pmyChart.valuefield)+"'";
		if (pmyChart.sliced){
			xml+=" issliced='1'"; 		    
	    }
	    xml+=' />\n';
	}
	xml+='\n</chart>';
	return xml;
}

function myGetAngularXML(pmyChart){
	var deltax=70+parseInt(pmyChart.radius-pmyChart.label.length*12/2);
	var deltay=parseInt(pmyChart.height/2)+25;
	pmyChart.xml='';
	pmyChart.xml+='<chart bgCOlor="FFFFFF" upperLimit="'+pmyChart.max+'" lowerLimit="'+pmyChart.min+'" showAboutMenuItem="0" baseFontColor="FFFFFF"'+  
	'\n majorTMNumber="9" majorTMColor="FFFFFF"  majorTMHeight="8" majorTMThickness="5" minorTMNumber="5" minorTMColor="FFFFFF"'+ 
	'\n	chartTopMargin="0" chartBottomMargin="0" minorTMHeight="3" minorTMThickness="2" pivotRadius="10" pivotBgColor="000000" pivotBorderColor="FFFFFF" '+
	'\n	pivotBorderThickness="2" hoverCapBorderColor="FFFFFF" toolTipBgColor="333333"  gaugeOuterRadius="110" '+
  	'\n	gaugeScaleAngle="300" gaugeAlpha="0" decimalPrecision="0" displayValueDistance="0" showColorRange="0"'+ 
  	'\n	placeValuesInside="1" pivotFillMix="" showPivotBorder="1" annRenderDelay="0">'+
	'\n	<dials>'+ 	
	'\n	<dial value="'+pmyChart.value+'" bgColor="000000" borderColor="FFFFFF" borderAlpha="100" baseWidth="4" topWidth="4" editMode="1" borderThickness="2"/>'+
	'\n	</dials>'+
  	'\n	<annotations>'+
	'\n	<annotationGroup xPos="'+parseInt(pmyChart.width/2)+'" yPos="'+parseInt(pmyChart.height/2)+'">'+
	'\n	<annotation type="circle" radius="'+pmyChart.radius+'" startAngle="0" endAngle="360" fillAsGradient="1" fillColor="4B4B4B, AAAAAA" fillAlpha="100,100"  fillRatio="95,5" />'+
	'\n	<annotation type="circle" xPos="0" yPos="0" radius="'+(pmyChart.radius-10)+'" startAngle="0" endAngle="360" showBorder="1" borderColor= "cccccc" fillAsGradient="1"  fillColor="ffffff, 000000"  fillAlpha="50,100"  fillRatio="1,99" />'+
	'\n	</annotationGroup>'+
	'\n	<annotationGroup xPos="'+deltax+'" yPos="'+deltay+'" showBelow="1">'+
	'\n	<annotation type="text" label="'+pmyChart.label+'" fontColor="FFFFFF" fontSize="12" isBold="0"/>'+
	'\n	</annotationGroup>'+
	'\n	</annotations>'+
	'\n</chart>';
	return (pmyChart.xml);	
}


//生成fusionchart的xml
function myGetChartXML(pmyChart){
	var data=pmyChart.data;
	pmyChart.drilldownfields=[];
	if (pmyChart.drilldown!=undefined && pmyChart.drilldown!=''){
	   	var x1=pmyChart.drilldown.indexOf('(');
	   	var x2=pmyChart.drilldown.indexOf(')');
	   	var s=pmyChart.drilldown.substring(x1+1,x2);
	   	var str='';  //参数值
	   	pmyChart.drilldownfields=s.split(',');  //分离参数
	   	pmyChart.drilldown=pmyChart.drilldown.substring(0,x1);
	}
	pmyChart.xml='';
	var xml='\n';
	if (pmyChart.type=='single' || pmyChart.type=='ss'){ //单序列
		for (var i=0;i<pmyChart.data.length;i++){
			var s1=eval('pmyChart.data['+i+'].'+pmyChart.labelfield);
			var s2=eval('pmyChart.data['+i+'].'+pmyChart.valuefield);
			xml+="<set label='"+eval('pmyChart.data['+i+'].'+pmyChart.labelfield)+"'";
			xml+=" value='"+eval('pmyChart.data['+i+'].'+pmyChart.valuefield)+"'";
			if (pmyChart.sliced){
				xml+=" issliced='1'"; 		    
		    }
		    //处理钻取的链接参数1
		    if (pmyChart.drilldown!=undefined && pmyChart.drilldown!=''){
		    	var pstr='';
		    	for (var m=0;m<pmyChart.drilldownfields.length;m++){
					var f=pmyChart.drilldownfields[m];
					if (f.substr(0,1)=='"' || f.substr(0,1)=="'") var v=eval(f);
					else var v=eval('pmyChart.data['+i+'].'+f);
					if (m>0) pstr+=',';
					if (v!=undefined) pstr+="\""+v+"\"";
					else pstr+="\""+f+"\"";
		    	}
		    	xml+=" link='javascript:"+pmyChart.drilldown+"("+pstr+")'";		    
		    	//xml+=" link='javascript:"+pmyChart.drilldown+"(\""+s1+"\")'";		    
		    }
		    xml+=' />\n';
		}
		pmyChart.xml=myGetChartXMLHeader(pmyChart);  //取xml的文件头部分
		pmyChart.xml+=xml;
		pmyChart.xml+=myGetChartXMLFooter(pmyChart);
	}else if (pmyChart.type=='multiple' || pmyChart.type=='ms'){  //多序列
		xml+="\n<categories>";
		for (var i=0;i<pmyChart.data.length;i++){
			var s1=eval('pmyChart.data['+i+'].'+pmyChart.labelfield);
			xml+="\n	<category label=\""+s1+"\" />";
		}	
		xml+="\n</categories>";
		var yfields=pmyChart.valuefield.split(';');
		var ylabels=pmyChart.yAxisName.split(';');
		//处理某个指标
		var xcolor=[]
		if (pmyChart.colorset!=undefined) xcolor=pmyChart.colorset.split(';');
		j=0;
		for (var k=0;k<yfields.length;k++){  //第一个序列指标
			xml+="\n<dataset seriesname=\""+ylabels[k]+"\"";
			if (k>0) xml+=" parentYAxis=\"S\"";
			xml+=" >";
			for (var i=0;i<pmyChart.data.length;i++){
				var s1=eval('pmyChart.data['+i+'].'+pmyChart.labelfield);
				var s2=eval('pmyChart.data['+i+'].'+yfields[k]);
				xml+="\n	<set ";
				if (xcolor.length>0){
					xml+=" color=\""+xcolor[j]+"\"";
					j++;
					if (j>=xcolor.length) j=0;
				}
				xml+=" value=\""+s2+"\"";

			    //处理钻取的链接参数2
			    if (pmyChart.drilldown!=undefined && pmyChart.drilldown!=''){
			    	var pstr='';
			    	for (var m=0;m<pmyChart.drilldownfields.length;m++){
						var f=pmyChart.drilldownfields[m];
						if (f.substr(0,1)=='"' || f.substr(0,1)=="'") var v=eval(f);
						else var v=eval('pmyChart.data['+i+'].'+f);
						if (m>0) pstr+=',';
						if (v!=undefined) pstr+="\""+v+"\"";
						else pstr+="\""+f+"\"";
			    	}
			    	xml+=" link='javascript:"+pmyChart.drilldown+"("+pstr+")'";		    
			    	//xml+=" link='javascript:"+pmyChart.drilldown+"(\""+s1+"\")'";		    
			    }
				xml+=" />";
			}
			xml+="\n</dataset>";
		}		
		pmyChart.xml=myGetChartXMLHeader(pmyChart);  //取xml的文件头部分
		pmyChart.xml+=xml;
		pmyChart.xml+='\n'+myGetChartXMLFooter(pmyChart);
	}else if (pmyChart.type=='angular'){
		pmyChart.xml=myGetAngularXML(pmyChart);
	}else if (pmyChart.type=='funnel'){
		pmyChart.xml=myGetFunnelXML(pmyChart);
	}
	return pmyChart;
}	

//显示fusionchart图表ffffffusion
function myShowFusionChart(pmyChart,swf,div){
	//Pyramid;仪表盘/AngularGauge;温度计/Thermometer
	var pw=$("#"+div).width();
	var ph=$("#"+div).height();
	var xwidth=0;
	var xheight=0;
	var charttype=[];
	charttype[1]=";MSSpline;MSColumn3D;MSColumn3DLineDY;MSSplineArea;MSLine;MSColumn2D;MSColumnLine3D;MSArea;";  //多序列
	charttype[1]+="Line;Column3D;Column2D;Area2D;";    //折线图、圆柱体、面积图
	charttype[2]=";MSBar3D;MSBar2D;Bar2D;";  //栏位图
	charttype[3]=";Doughnut3D;Doughnut2D;Pie3D;Pie2D;";    //圆饼图环形图
	charttype[4]=";Pyramid;";  
	charttype[5]=";funnel;";    //圆饼图环形图
	//ert(charttype.length);
	if (pmyChart.data!=undefined)var n=pmyChart.data.length;
	else var n=1;
	for (var i=1;i<charttype.length-1;i++) charttype[i]=charttype[i].toLowerCase();
	var xswf=";"+swf.toLowerCase()+";";
	if (charttype[1].indexOf(xswf)>=0){  //折线图圆柱图
		xwidth=Math.max(n*7*6+172,600);
		xheight=300;
	}else if (charttype[2].indexOf(xswf)>=0){  //栏位图
		xheight=Math.max(Math.min(280+n*12,700),450);
		xwidth=300;
	}else if (charttype[3].indexOf(xswf)>=0){  //圆饼图
		xwidth=Math.max(Math.min(300+n*20,600),400);
		xheight=Math.max(Math.min(200+n*10,400),300);
		if (pmyChart.width>0){
			xwidth=pmyChart.width;
			pw=xwidth;
		}
		if (pmyChart.height>0){
			xheight=pmyChart.height;
			ph=xheight;
		}
	}else if (charttype[4].indexOf(xswf)>=0){  //圆锥图
		xheight=Math.max(Math.min(350+n*12,700),450);
		xwidth=600;
	}
	
	if (pmyChart.width<=0 && xwidth<pw) xwidth='100%';
	else xwidth=Math.max(xwidth,pmyChart.width);
	if (pmyChart.height<=0 && xheight<ph) xheight='99%';
	else xheight=Math.max(xheight,pmyChart.height);
	//显示chart
	var chart = new FusionCharts("jqeasyui/fusioncharts/swf/"+swf+".swf","chartid_"+sys.fusionchartno,""+xwidth+"",""+xheight+"","0","1");
	//var chart = new FusionCharts("system/fusioncharts/swf/MSColumnLine3D.swf", "myChart1","748","400","0","0");
  	chart.setDataXML(pmyChart.xml);
	//chart.setDataURL("system/fusioncharts/xml/Bar2D.xml");
  	chart.render(div);
  	//pmyChart.chartno++;
  	sys.fusionchartno++;
  	return pmyChart;
}	
