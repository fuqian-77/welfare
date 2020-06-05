pinputtypes="/labelfield/keyfield/date/datefield/numberfield/combobox/combox/editbutton/summery/total/";
rowHeight=32;
colWidth=8;
String.prototype.myTrim=function(){
  return this.replace(/(^\s*)|(\s*$)/g,"");
};

function TField(page,name,spec,top,left,height,width,type,datafield,sql,style) {
    this.xpage=page,
    this.xname=name,
    this.xspec=spec,
    this.xtop=top,
    this.xleft=left,
    this.xheight=height,
    this.xwidth=width,
    this.xtype=type,
    this.xdatafield=datafield,
    this.xsql=sql,
    this.xstyle=style
};

function TGridField(name,spec,width,dec,type,align,style) {
    this.xname=name,
    this.xspec=spec,
    this.xwidth=width,
    this.xdec=dec,
    this.xtype=type,
    this.xalign=align,
    this.xstyle=style
};

function TTableField(name,datatype,computedcolumn,length,
  prec,dec,page,panel) {
  this.xname=name,
  this.xdatatype=datatype,
  this.xcomputedcolumn=computedcolumn,
  this.xlength=length,
  this.xprec=prec,
  this.xdec=dec,
  this.xpage=page,
  this.xpanel=panel
};

function TObject(xname,xtype,xlabel,xdatatype,xfidtype,xparent,xservicefile,xsql,
  xtablename,xtablespec,xdatafields,xstyle,xformat,xshorthandfield,xcontroltype,xtitle,
  xpage,xpanel,xlength,xfidlength,xdec,xtag,xgridpage,xleft,xtop,xheight,xwidth,
  xpagesize,xlabelwidth,xcomponent,xcommand,xhidden)
  {
  this.xname=xname,this.xtype=xtype,this.xlabel=xlabel,this.xdatatype=xdatatype,
  this.xfidtype=xfidtype,this.xparent=xparent,this.xservicefile=xservicefile,
  this.xtablename=xtablename,this.xtablespec=xtablespec,this.xdatafields=xdatafields,this.xstyle=xstyle,
  this.xformat=xformat,this.xshorthandfield=xshorthandfield,
  this.xcontroltype=xcontroltype,this.xpage=xpage,this.xpanel=xpanel,this.xlength=xlength,this.xfidlength=xfidlength,
  this.xdec=xdec,this.xtag=xtag,this.xgridpage=xgridpage,this.xleft=xleft,this.xtop=xtop,this.xheight=xheight,this.xwidth=xwidth,
  this.xpagesize=xpagesize,this.xtitle=xtitle,this.xsql=xsql,this.xlabelwidth=xlabelwidth,
  this.xcomponent=xcomponent,this.xcommand=xcommand,this.xhidden=xhidden
  };
  
function TTable(
  xtablename,xtablespec,xkeyfield,xmasterfield,xreftablename,xreftablespec,xrefkeyfield,xrefmasterfields,xrefdatafields,
  xtmps1,xtmps2,xtmps3,xtop,xleft,xHeight,xwidth,xpage,xgridpage,
  xtablefiddim,xreftablefiddim)
{
 this.xtablename=xtablename,
 this.xtablespec=xtablespec,
 this.xkeyfield=xkeyfield,xmasterfield=xmasterfield,
 this.xreftablename=xreftablename,
 this.xreftablespec=xreftablespec,
 this.xrefkeyfield=xrefkeyfield,
 this.xrefmasterfields=xrefmasterfields,
 this.xrefdatafields=xrefdatafields
 this.xtmps1=xtmps1,
 this.xtmps2=xtmps2,
 this.xtmps3=xtmps3,
 this.xleft=xleft,
 this.xtop=xtop,
 this.xheight=xheight,
 this.xwidth=xwidth,
 this.xpage=xpage,
 this.xgridpage=xgridpage,
 this.xtablefiddim=xtablefiddim,
 this.xreftablefiddim=xreftablefiddim
};

function TMessage(xname,xtype,xtag,xmessage)
{
this.xname=xname,
this.xtype=xtype,
this.xtag=xtag,
this.xmessage=xmessage
};

pckeyfield=pckeyspec='';
pcservicetype=pcservicefile='';
pctitle=pcwintitle='';
pcmtablespec=pcmtablename='';
pcrowheight=0;
pctitlerowheight=0;
pcfontheight=0;

pctreenodefield=pcmgridfield='';
pctreetablename='';
pctreesql='';
pctreedatafields='';
pctreefilterfields='';
pctreerows=15;
pctreekeyfield='';

pcgridtablename='';
pcgridsql='';
pcgriddatafields='';
pcgridfilterfields='';
pcmgridpagesize=0;
pcgridkeyfield='';

pcreplacedim=pcvalidruledim=pctotalfielddim=new Array(new TMessage());
pcdtablespec=pcdtablename=new Array();
pcreftablespec=pcdtablename=new Array();
pcpagetitledim=new Array();
pcpaneltitledim=new Array();
pcreplacedim[0]=new TMessage();
pcvalidruledim[0]=new TMessage();
pctotalfielddim[0]=new TMessage();  

pcdtablespec[0]=pcdtablename[0]='';
pcreftablespec[0]=pcdtablename[0]='';
pcpagetitledim[0]='';
pcobjects=new Array(new TObject());
pcobjects[0]=new TObject();
pcobjects[0].xname='';

function myLoadXML(filename) {
    var xmlDoc = null;  
	if(window.ActiveXObject){
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");  //Microsoft.XMLHTTP,
	    xmlDoc.async=false;
		xmlDoc.load(filename);
		myCompiler(xmlDoc);
	}else if (window.XMLHttpRequest) { //webkit,Geckos,Op内核的(document.implementation && document.implementation.createDocument)  
		var xmlhttp=new window.XMLHttpRequest();
		//var xmlhttp=new XMLHttpRequest();   
		xmlhttp.open("GET", filename, false);//类型,文件名,是否缓存  
		xmlhttp.send(null);  
		xmlDoc = xmlhttp.responseXML;
		//xmlDoc=document.implementation.createDocument("","",null);
	    //xmlDoc.async=false;
		//xmlDoc.load(filename);		
		myCompiler(xmlDoc,'UN');  
	}
}

function myCompiler(xmlDoc,browserType) {
    var xmlRoot=xmlDoc.documentElement;
    var n1=xmlRoot.childNodes.length;
    var c=c1=c2='';
	var n=x1=x2=0;
	pcservicetype=xmlRoot.attributes[0].nodeValue;
	pageno=1;
	panelno=1;
	var i=j=k=0;
	for (i=0; i<n1; i++){
		var cnode=xmlRoot.childNodes[i];
		var xnode=xmlRoot.childNodes;
		var s1=cnode.nodeName.toLowerCase();
		if (cnode.nodeType==1) {
		  	//alert(s1+','+cnode.nodeType);
			var n2=cnode.length;
      		var ctag=cnode.attributes;
	      	var xtagname=s1;
    	  	if (ctag!=null&&ctag.length==0) {
			  	var s2=cnode.childNodes[0].nodeValue;
    		  	if (s2==null) s2='';
	        	x1=s2.indexOf(':');
    	    	c='';
        		if (x1>=0) {
          			c=s2.substring(x1+1);
	          		s2=s2.substring(0,x1); 
    	    	}
        		else c=s2;
        		s2=s2.myTrim();
        		c=c.myTrim();
        		if (s1=='title') pctitle=s2;
	        	else if (s1=='replace')  { 
					n=pcreplacedim.length;
    	      		pcreplacedim[n]=new TMessage();
        	  		pcreplacedim[n].xname=s2;
          			pcreplacedim[n].xmessage=c;
        		}
        		else if (s1=='validation')  {
    	      		n=pcvalidruledim.length;
	          		pcvalidruledim[n]=new TMessage();
          			pcvalidruledim[n].xname=s2;
        	  		pcvalidruledim[n].xmessage=c;         
        		}
        		else if (s1=='totalfields')  {
	          		n=pctotalfielddim.length;
    	      		pctotalfielddim[n]=new TMessage();
        	  		pctotalfielddim[n].xname=s2;
          			pctotalfielddim[n].xmessage=c;
        		}
     		}else{
				var xtype='';
    	  		var xdatatype='';
      			var xname='';
      			var xlabel='';
	      		var xfontsize='';
    	  		var xfontname='';
      			var xfontstyle='';
      			var xstyle='';
    	  		var xformat='';
	      		var xshorthandfield='';
      			var xpos='';
		    	var xsize='';
			    var xreportmargin='';  //printer margin
    	  		var xparent='';
			    var xitems='';
				var xdatafields='';
				var xaliasnames='';
				var xindexfields='';
				var xfilterexp='';
      			var xtablename='';
      			var xtableid='';
	      		var xid='';
    	  		var xkeyfield='';
      			var xmasterfields='';
      			var xreffields='';
	      		var xtitlerowheight='';
			    var xrowheight='';
      			var xservicefile='';
      			var xkeyfield='';
      			var xaction='';
			    var xpage='';
    	  		var xpanel='';
    	  		var xvalue='';
      			var xleft=0;
      			var xwidth=0;
	      		var xpagesize=0;
    	  		var xtop=0;
      			var xheight=0;
      			var xlength=0;
      			var xlabelwidth=0;
	      		var xfidlength=0;
	      		var xhidden='';
    	  		var xtitle='';
      			var xfilterfields='';
      			var xdec=0;
	      		var xsql='';
    	  		var xsubtagname='';
    	  		var str=''; 
      			for (var j=0;j<ctag.length;j++) {
      				var s3=ctag[j].name;
      				var s4=ctag[j].value;
	      			s4=s4.replace(/(^\s*)|(\s*$)/g,"");
    	  			var s5=s4.toLowerCase();
				    if (s3=='name') xname=s5; 
      				else if (s3=='label') xlabel=s4;
      				else if (s3=='type') xtype=s5; 
	      			else if (s3=='datatype') xdatatype=s5;
    	  			else if (s3=='masterfields') xmasterfields=s5;
      				else if (s3=='referencefields') xreffields=s5;
      				else if (s3=='indexfields') xindexfields=s5;
      				else if (s3=='filter') xfilterexp=s5; 
	      			else if (s3=='style') xstyle=s5;
	      			else if (s3=='value') xvalue=s4;
    	  			else if (s3=='format') xformat=s4;
      				else if (s3=='shorthandfield') xshorthandfield=s5;
      				else if (s3=='pos') xpos=s4;
      				else if (s3=='size') xsize=s4;
	      			else if (s3=='pagemargin') xreportmargin=s4;
    	  			else if (s3=='fontsize') xfontsize=s4;
      				else if (s3=='fontname') xfontname=s5;
      				else if (s3=='fontstyle') xfontstyle=s5;
      				else if (s3=='page') xpage=s4;
	      			else if (s3=='panel') xpanel=s4;
    	  			else if (s3=='items') xitems=s4;
      				else if (s3=='aliasnames') aliasnames=s5;
      				else if (s3=='datafields') xdatafields=s5;
      				else if (s3=='filterfields') xfilterfields=s5;
      				else if (s3=='title') xtitle=s4;
	      			else if (s3=='sql') xsql=s4;
    	  			else if (s3=='action') xaction=s4;
      				else if (s3=='parent') xparent=s4;
      				else if (s3=='servicefile') xservicefile=s4;
      				else if (s3=='id') xid=s4;
	      			else if (s3=='table') xtablename=s4;
    	  			else if (s3=='tableid') xtableid=s4;
    	  			else if (s3=='hidden') xhidden=s4;    	  			
      				else if (s3=='keyfield') xkeyfield=s5;
      				else if (s3=='xlabelwidth') xlabelwidth=s4;
      				else if (s3=='titlerowheight') xtitlerowheight=s4;
      				else if (s3=='rowheight') xrowheight=s4;      
	      			else if (s3=='pagesize') xpagesize=parseInt(s4);      
    	 		} //for j
       			c=c1=c2='';
       			x1=x2=0;
	       		if (xpos!='') {
    	      		c=xpos;
        	  		x1=c.indexOf(',');
          			c1=c2='';
          			if (x1>=0) { 
	            		c1=c.substring(0,x1).myTrim(); 
    	        		c2=c.substring(x1+1).myTrim();
        	  		} else c1=c;
          			if ((c1!='')&&(parseFloat(c1)!='NaN')) xtop=parseFloat(c1);
          			if ((c2!='')&&(parseFloat(c2)!='NaN')) xleft=parseFloat(c2);
       			}   
	       		if (xsize!='') {
    	      		c=xsize;
        	  		x1=c.indexOf(',');
          			c1=c2='';
          			if (x1>=0) { 
            			c1=c.substring(0,x1).myTrim(); 
	            		c2=c.substring(x1+1).myTrim();
    	      		}
        	  		else c1=c;
          			if ((c1!='')&&(parseFloat(c1)!='NaN')) xheight=parseFloat(c1);
          			if ((c2!='')&&(parseFloat(c2)!='NaN')) xwidth=parseFloat(c2);
	       		}	
    		    //alert('tagname1='+s1+', width'+xwidth+', height='+xheight);
	
    	   		if (xrowheight!='')  pcrowheight=parseFloat(xrowheight);
       			if (xtitlerowheight!='') pctitlerowheight=parseFloat(xtitlerowheight);
       			if (xfontsize!='') pcfontheight=-parseInt(xfontsize)*4/3;
		        if (xwidth<=0) xwidth=14;
    		    if (xpagesize==0) xpagesize=16;
    	    	//开始分析标签
			    if (xtagname=='keyfield'&&xname!='')  { 
    	   			pckeyfield=xname; 
       				pckeyspec=xlabel;
     			}else if ((xtagname=='table')||(xtagname=='mastertable')) {
       				pcmtablename=xname;
	       			pcmtablespec=xlabel;
    	 		}else if (xtagname=='detailtable') {
       				pcdtablename[pcdtablename.length]=xtablename;
       				pcdtablespec[pcdtablespec.length]=xlabel;
	     		}else if (xtagname=='referencetable') {
    	   			pcreftablename[pcreftablename.length]=xtablename;
       				pcreftablespec[pcreftablespec.length]=xlabel;
     			}else if (xtagname=='treegrid' || xtagname=='tree') {
     				pctreetablename=xtablename;
	     			pctreesql=xsql;
    	 			pctreedatafields=xdatafields;
    	 			pctreefilterfields=xfilterfields;
    	 			pctreekeyfield=xkeyfield;
     			}else if (xtagname=='grid') {
     				pcgridtablename=xtablename;
     				pcgridsql=xsql;
     				pcgridkeyfield=xkeyfield;
	     			pcgriddatafields=xdatafields;
	     			pcgridfilterfields=xfilterfields;
    	 			pcgridpagesize=xpagesize;
      			}else if (xtagname=='page') {
         			if (parseInt(xname)!='NaN') pcpagetitledim[parseInt(xname)]=xtitle;
         			else pcpagetitledim[pcpagetitledim.length]=xtitle;
	     		}else if (xtagname=='panel') {
    	     		if (parseInt(xname)!='NaN') pcpaneltitledim[parseInt(xname)]=xtitle;
        	 		else pcpaneltitledim[pcpaneltitledim.length]=xtitle;
	     		}	
		        var n=pcobjects.length;
        		pcobjects[n]=new TObject();
        		if (parseInt(xpage)!='NaN') xpage=parseInt(xpage);
        		else xpage=0; 
        		if (parseInt(xpanel)!='NaN') xpanel=parseInt(xpanel);
        		else xpanel=0;
        		if (xpage==0&&xpanel==0) xpage=1;
    	    	if (parseInt(xlabelwidth)!='NaN') xlabelwidth=parseInt(xlabelwidth);
    	    	else xlabelwidth=9; 
    	    	
        		pcobjects[n].xpage=xpage;
        		pcobjects[n].xpanel=xpanel;
        		pcobjects[n].xlabelwidth=xlabelwidth;
    	    	pcobjects[n].xtype=xtagname;
        		pcobjects[n].xname=xname;
	        	pcobjects[n].xlabel=xlabel;
        		pcobjects[n].xtop=xtop;
        		pcobjects[n].xleft=xleft;
	        	pcobjects[n].xheight=xheight;
    	    	pcobjects[n].xwidth=xwidth;
    	    	pcobjects[n].xlabelwidth=xlabelwidth;
        		pcobjects[n].xdatatype=xdatatype;
        		pcobjects[n].xdatafields=xdatafields;
        		pcobjects[n].xfilterfields=xfilterfields;
	        	pcobjects[n].xitems=xitems;
    	    	pcobjects[n].xtablename=xtablename;
    	    	pcobjects[n].xsql=xsql;
        		pcobjects[n].xpagesize=xpagesize;
        		pcobjects[n].xstyle=xstyle;
        		pcobjects[n].xlabelwidth=xlabelwidth;
	        	pcobjects[n].xtitle=xtitle;
	        	
	        	//生成控件
	        	var xfielddim=xdatafields.spilt(';');
	        	var xaliasdim=xaliasnames.spilt(';');	        	
	        	if (xtype=='page') {
	        		str="var myForm"+pageno+"=Ext.create('Ext.form.Panel',{";
					str=str+"frame:false,bodyStyle:'padding:5 5 5 5',border:false,layout: 'absolute',";
					str=str+"width:"+xwidth*colWidth+",";
					str=str+"height:"+xheight*rowHeight+",";
					str=str+"minHeight:200,fieldDefaults:{";
					str=str+"labelAlign: 'right',";
        	    	str=str+"labelWidth: "+xlabelwidth+",";
            		str=str+"labelSeparator: '',";
            		str=str+"msgTarget: 'qtip' },";
	            	str=str+"items:[";
    	        	pageno=pageno+1;
	    	    	pcobjects[n].xcomponent=str;
	        	}else if (xtype=='panel') {
					str="{	xtype: 'fieldset',id:panel"+panelno+",title:'"+xtitle+"',";
					str=str+"x:"+xleft*colWidth+",y:"+xtop*rowHeight+",width:"+xwidth*colWidth+",height:"+xheight*rowHeight+",";
    	       		str=str+"layout: 'absolute', defaultType:'textfield',";
	            	str=str+"items:[";
            		pcobjects[n].xcomponent=str;
					panelno=panelno+1;
	        	}else if(xtype=='combobox'){
					if (xsql==''&& xtablename=='') {  //静态数据
						var xitemdim=xitems.spilt(';'); //取选项
						str="var "+xname+"Store=new Ext.data.SimpleStore ({";
						str=str+" fields: ['"+xfielddim[0]+"'],";
						str=str+" data: [";
						for (k=0;i<xitemdim.length;i++) {
							if (k>0) str=str+",";
							str=str+"['"+xitemdim[k]+"']"
						}						  
						str=str+"]});";
						pcobjects[n].xcommand=str;  //生成数据集命令
						str="{ xtype:'combobox',fieldLabel:'"+xlabel+"',store:"+xname+"Store,";
						str=str+"id:'"+xname+"',name:'"+xname+"',editable:false,triggerAction:'all',";
						str=str+"x:"+xleft*colWidth+",y:"+xtop*rowHeight+",width:"+xwidth*colWidth+",height:"+xheight*rowHeight+",";
						str=str+"displayField:'"+xname+"',valueField:'"+xname+"',mode:'local',";
						str=str+"forceSelection: true,resizable: false,value:'"+xvalue+"',";
	     				str=str+"listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); }";
   						if (xaliasdim.length>0) {
							str=str+",select: function(combo, record, index) {";
	     					for (k=0;k<xaliasdim.length;k++) {
	     						str=str+"Ext.getCmp('"+xliasdim[k]+"').setValue(Ext.getCmp('"+xliasdim[k]+"').getValue());";
	     					}
	     					str=str+"}";
						}
	     				str=str+"}}";     		
						pcobjects[n].xcomponent=str;  //生成控件
					}else{
						if (xsql=='') xsql='select * from '+xtablename;
						str=" var "+name+"Store=Ext.create('Ext.data.Store', {";
   						str=str+' 	fields: [';
   						str=str+" 		{type:'string',name:'id'},";
   						str=str+" 		{type:'string',name:'name'}";
   						str=str+' 	],';
   						str=str+' 	proxy: {';
    					str=str+"     	type: 'ajax',";
    					str=str+'      	extraParams:{sqlString:"'+xsql+'"},';
    					str=str+"      	url: 'fn_getComboxData.jsp',";
    					str=str+' 		reader: {';  
						str=str+" 			data:'totalCount',";  
  						str=str+" 			type: 'json',";  
  						str=str+" 			root: 'result'";  
  						str=str+' 		}'; 
  						str=str+' 	}';
    					str=str+' });';
    					pcobjects[n].xcommand=str;  //生成数据集命令
    					//生成控件
    					str="{ xtype:'combobox',fieldLabel:'"+xlabel+"',id:'"+xname+"',name:'"+xname+"',editable:false,store:"+xname+"Store,";
						str=str+"x:"+xleft*colWidth+",y:"+xtop*rowHeight+",width:"+xwidth*colWidth+",height:"+xheight*rowHeight+",";
						str=str+"lazyRender: false,mode: 'local',typeAhead: true,triggerAction: 'all',enableKeyEvents:true,selectOnTab:true,"; 
   						str=str+"displayField:'"+xname+"',valueField:'"+xname+"',"
   						if (xvalue!='') str=str+"'"+xvalue+"',";
				        str=str+"listeners:{ specialkey: function(field, e){  fnKeyEvent(field,e); }";
   						if (xaliasdim.length>0) {
							str=str+",select: function(combo, record, index) {";
							str=str+"	Ext.getCmp('"+xaliasdim[0]+"').setValue(record[0].get('"+xaliasdim[0]+"'));}";
						}
   						str=str+"}}";
   						pcobjects[n].xcomponent=str;  //生成控件
					}
	        	}else if (xtype=='checkbox'){ //combobox结束
	        		str="{xtype:'checkbox',boxLabel:'"+xlabel+"',id:'"+xname+"',name:'"+xname+"',inputValue:'"+xvalue+"',"; 
					str=str+"x:"+xleft*colWidth+",y:"+xtop*rowHeight+",width:"+xwidth*colWidth+",height:"+xheight*rowHeight+",";
					str=str+"checked:true";
					pcobjects[n].xcomponent=str;  //生成控件
	        	}else if (xtype=='radio'){
	        		str="xtype:'radiogroup',fieldLabel:'"+xlabel+"',id:'"+xname+"',name:'"+xname+"',";
					str=str+"x:"+xleft*colWidth+",y:"+xtop*rowHeight+",width:"+xwidth*colWidth+",height:"+xheight*rowHeight+",";
					str=str+"items: [";
					for (k=0;k<xitemdim.length;k++){
						if(k==0) str=str+"{boxLabel:'"+xitemdim[k]+"',name:'x"+xname+"',inputValue:"+(k+1)+",checked:true}";
						else str=str+",{boxLabel:'"+xitemdim[k]+"',name:'x"+xname+"',inputValue:"+(k+1)+"}";
					}
					str=str+"]";	
					pcobjects[n].xcomponent=str;  //生成控件
				}else if (xtype=='textfield' || xtype=='labeltext') {
					str="{xtype:'textfield',fieldLabel:'"+xlabel+"',id:'"+xname+"',name:'"+xname+"',";
					str=str+"x:"+xleft*colWidth+",y:"+xtop*rowHeight+",width:"+xwidth*colWidth+",height:"+xheight*rowHeight+",";
					if (xvalue!='') str=str+" value='"+xvalue+"',";
					str=str+" listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); }";
     				if (xaliasdim.length>0) {
     					str=str+",change:function(view,newV,oldV){";
     					for (k=0;k<xaliasdim.length;k++) {
     						str=str+"Ext.getCmp('"+xaliasdim[k]+"').setValue(newV);";
     					}
     					str=str+"}";
    				}	        	
					str=str+"}}";
					pcobjects[n].xcomponent=str;  //生成控件 
				}else if (xtype=='textarea' || xtype=='memo') {
					str="{xtype:'textarea',fieldLabel:'"+xlabel+"',id:'"+xname+"',name:'"+xname+"',";
					str=str+"x:"+xleft*colWidth+",y:"+xtop*rowHeight+",width:"+xwidth*colWidth+",height:"+xheight*rowHeight+",";
					str=str+"blankText:''";
					str=str+"}";
					pcobjects[n].xcomponent=str;  //生成控件 
				}else if (xtype=='date' || xtype=='datefield') {
					str="{xtype:'datefield',fieldLabel:'"+xlabel+"',id:'"+xname+"',name:'"+xname+"',";
					str=str+"x:"+xleft*colWidth+",y:"+xtop*rowHeight+",width:"+xwidth*colWidth+",height:"+xheight*rowHeight+",";
					if (xformat=='') str=str+"format:'Y-n-j',";
					else str=str+"format:'"+xformat+"',";
					if (xvalue!='') str=str+" value='"+xvalue+"',";
					str=str+"listeners:{specialkey: function(field, e){  fnKeyEvent(field,e); },";
     				if (xaliasdim.length>0) {
     					str=str+",change:function(view,newV,oldV){";
     					for (k=0;k<xaliasdim.length;k++) {
     						str=str+"Ext.getCmp('"+xaliasdim[k]+"').setValue(newV);";
     					}
     					str=str+"}";
    				}	        	
					str=str+"}}";
					pcobjects[n].xcomponent=str;  //生成控件 
				}else if (xtype=='fileupload') {
					str="{ xtype:'textfield',fieldLabel:'"+xlabel+"',id:'filesourcename',name:'filesourcename',";
					str=str+"x:"+xleft*colWidth+",y:"+xtop*rowHeight+",width:"+xwidth*colWidth+",";
					str=str+"readOnly:true}";
					str=str+",{xtype:'textfield',fieldLabel:'文件大小：',id:'filesizedesc',name:'filesizedesc',";
					str=str+"x:"+xleft*colWidth+",y:"+xtop*rowHeight+",width:"+xwidth*colWidth+",";
					str=str+"readOnly:true}";
					str=str+",{xtype:'textfield',hidden:true,id:'fileosname',name:'fileosname'}";
					str=str+",{xtype:'numberfield',hidden:true,id:'filesize',name:'filesize'}";
					str=str+",{xtype:'textfield',inputType:'file',fieldLabel: '选择文件：',id:'filename',name:'filename',";
		    		str=str+"x:"+xleft*colWidth+",y:"+xtop*rowHeight+",width:"+xwidth*colWidth+",";
		    		str=str+"buttonText:'浏览'}";
					str=str+",{xtype:'textfield',fieldLabel: '文件路径：',id:'filepath',name:'filepath',";
		    		str=str+"x:"+xleft*colWidth+",y:"+xtop*rowHeight+",width:"+xwidth*colWidth+",";
					str=str+"readOnly:true}";
					str=str+",{xtype: 'button',text:'上传',id: 'cmd4',name: 'cmd4',";
		    		str=str+"x:"+xleft*colWidth+",y:"+xtop*rowHeight+",width:"+xwidth*colWidth+",height:25,";
					str=str+"handler:function(){";
					str=str+"var xfilename=Ext.getCmp('filename').getValue();";
					str=str+"var xid=pResourcePath+'resources_'+Ext.getCmp('resourceid').getValue();";
					str=str+"var xfilesourcename=xfilename.substring(xfilename.lastIndexOf('\\')+1,xfilename.length);";
					str=str+"var xfileosname=xid+xfilesourcename.substring(xfilesourcename.lastIndexOf('.'),xfilesourcename.length);";
					str=str+"myForm2.submit({";  
                    str=str+"   	method:'post',";
					str=str+"	url: 'fn_upLoadFile.jsp?filename='+filename+'&id='+id,";  
					str=str+"	waitTitle : '系统提示',";
					str=str+"	waitMsg:'文件正在上传...',";
					str=str+"	success: function(form,action){";
					str=str+"	  	var xfilesize=action.result.filesize;";
					str=str+"	  	var ximagewidth=action.result.imagewidth;";
					str=str+"	  	var ximageheight=action.result.imageheight;";
					str=str+"		Ext.MessageBox.show({";
        		    str=str+"        	title: '系统提示', ";  
					str=str+"			msg: '文件上传成功!',"; 
	                str=str+"        	buttons: Ext.Msg.OK,";
    	            str=str+"        	autoShow:true,";	                        
					str=str+"			icon: Ext.MessageBox.INFO";   
					str=str+"		});";
					str=str+"		Ext.getCmp('filepath').setValue(xfilename);";
					str=str+"		Ext.getCmp('filesourcename').setValue(xfilesourcename);"; 	
					str=str+"		Ext.getCmp('fileosname').setValue(xfileosname);";
					str=str+"		Ext.getCmp('filesize').setValue(xfilesize);";
					str=str+"		Ext.getCmp('filesizedesc').setValue(myFileSize(xfilesize));";
					str=str+"	},";
					str=str+"	failure : function(form, action) {";
					str=str+"		var status = action.result.status;";
					str=str+"		Ext.MessageBox.show({";   
       		        str=str+"    		title: '系统警告',";   
                	str=str+"	        msg: status+'<br>文件上传失败！',"; 
					str=str+"			buttons: Ext.Msg.OK,";
   	                str=str+"    		autoShow:true,";	                        
		            str=str+"            icon: Ext.MessageBox.WARNING";   
   			        str=str+"       });";
					str=str+"		Ext.getCmp('filepath').setValue('');";
					str=str+"		Ext.getCmp('filesourcename').setValue('');"; 	
					str=str+"		Ext.getCmp('fileosname').setValue('');";
					str=str+"		Ext.getCmp('filesize').setValue('0 KB');";
					str=str+"		Ext.getCmp('filesizedesc').setValue('');";
					str=str+"	}";
					str=str+"});";
					str=str+"}";                          
					str=str+"}";
					pcobjects[n].xcomponent=str;  //生成控件
	        	}	
	        	
    	    	//alert(pcobjects[n].xname+','+pcobjects[n].xtype);
			}
		}  //type=1
	} //for i
  	if ((pcwintitle=='')&&(pctitle!='')) pcwintitle=pctitle;
  	if ((pctitle=='')&&(pcwintitle!='')) pctitle=pcwintitle;
	if (pckeyfield=='') {
		pckeyfield=pcobjects[1].xname;
    	pckeyspec=pcobjects[1].xlabel;
	}
};
  
 /*
var pcobjectnum=pcmgridtop=pcmgridleft=pcmgridHeight=pcmgridwidth=0;
var pcmgridfontHeight=-12;
var pcdgridtop=pcdgridleft=pcdgridHeight=pcdgridwidth=0;
var pctreeviewwidth=pctreeviewHeight=pctreeviewtop=pctreeviewleft=0
var pcrowHeight=pctitlerowHeight=pctitletag=0;
var pmaxwidth=pmaxtop=pminleft=pmaxgridwidth=pmaxgridtop=pmingridleft=0;
var pctreeviewkeyfield=pctreeviewdspfid=pcfilterexp=pctotalfields=pctreeviewfields=pcreplaceexp=pcvalidationexp='';
var pcmtablename=pcmtablespec=pcmtablestyle='';
var pckeyfield=pckeyfieldspec=pcmtablekeyfield=pcdtablekeyfield=pcmasterfields=pcindexfields=pcreffields='';
var pccheckkeyfield=pccheckdatefield=pcckeckfieldspec='';
var pcsqlstring=ccolumnheader=pcwintitle=pctitle=pcservicetype=pcsubservice='';
var pcmtablefiddim=pcdtablefiddim=new array(new TTableFields);
var pcdgridfiddim=pcmasterfiddim=pcindexfiddim=pcfilterdim=pcreplaceexpdim=pctotalfiddim=pcvalidationexpdim=pcreffiddim=new Array(new TGridField);
var pcEditbuttonfiddim,pcCheckbuttonfiddim=new Array();
//pcGrideditbuttondim,pcgridcomboboxdim:array of Tpcgrideditbuttons;
var pcBillcodedim=pcsumfiddim=pcgrandtotalfiddim=pcshorthandfiddim=new Array();

//  xpagetype,xdatatype,xfidtype,xstyle,xformat,xshorthandfield,xtype,xname,xxname,xlabel,xpos,xsize,xreportmargin,xitems,xdatafields,xmasterfields,xreffields:string;
//  xtable,xtableid,xkeyfield,xfontsize,xfontname,xfontstyle,xtitlerowHeight,xrowHeight,xid,xaction,xservicefile:string;
//  xleft,xxleft,xtop,xwidth,xHeight,xlength,xfidlength,xdec,xpage,xpanel,xgridpage:integer;
//  xtagname,xsubtagname,xtext,xparent,xtablename,xtablespec:string;
//  xfontHeight:integer;
//  xlineno:integer;   //xml����к�,���ڱ���
//  xfilterexp,xindexfields:string;
//  pcleftmargin,pctopmargin,pcrightmargin,pcbottommargin:real;  //for rpt_a
//  pnerror,pndbtext,pnclass,pnedit,pndbedit,pnlabel,pneditnum,pndbcombobox,pncombobox,pndate,pnmemo,pndbmemo,pnshape,pncheckbox,pndbimage:integer;
//  pngridpage,pnradio,pnimagefile,pnpage,pnpanel,pndatasource,pnadoquery,pneditbutton,pncheckbutton,pnimagebutton,pngrideditbutton,pngridcombobox,pnallnum,pnsumfid,pngrandtotalfid,pndetailtable:integer;
//  pntreeview,pnfilename,pnmgridfid,pndgridfid,pnmlistfid,pndlistfid,pntotalfid,pnreplacefid,pnindexfid,pnmasterfid,pnfilterfid,pnvalidatefid,pnreffid:integer;
//  pnbillcode,pnshorthandfield:integer;
var pcxmlfile=pcxmltext='';
var pcsysnumber=pcsysmaker=pcsyschecker=pcsysdate=pcsyspagenumber=pcgrandtotal='';
var pcclassdim=new Array(new TObjects);
var pcmgridfiddim=pcmlistfiddim=pcdlistfiddim=pctreeviewnodefiddim=new Array(new TGridField);
var pcdetailtable=new Array(new TTable);
var pcerror=new Array(new TError);
var pcdtablename=pcdtablespec='';
*/
 