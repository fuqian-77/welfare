	var scrollsize;	
	$(window).resize(function(){
		pmyGrid1=myTextGrid(pmyGrid1); //生成网格
		myLoadTextGridData(pmyGrid1);
		myCellFocus(pmyGrid1,0,0);
	});

	function myTextGrid(pmyGrid1){
		//单元格名称RiCj。e.g.  r1c0
		//标题：整行：hr_row,序号hr_rowno，复选框:hr_checkbox,各列hr_c0,1,2....
		if ($("#"+pmyGrid1.id+"_toplayout").length>0){
			$("#"+pmyGrid1.id+"_toplayout").remove();
		}
		if (pmyGrid1.headerheight==undefined) pmyGrid1.headerheight=pmyGrid1.rowheight;
		if (pmyGrid1.clickonselect==undefined) pmyGrid1.clickonselect=false;
		if (pmyGrid1.rownumberwidth==undefined) pmyGrid1.rownumberwidth=40;  //序号列宽度                   
		if (pmyGrid1.checkboxwidth==undefined) pmyGrid1.checkboxwidth=30;  //复选框列宽度                   
		pmyGrid1=myTextGridColumns(pmyGrid1);
		if (pmyGrid1.height==0) pmyGrid1.height=$('#'+pmyGrid1.parent).height()-60;
		if (pmyGrid1.width==0) pmyGrid1.width=$('#'+pmyGrid1.parent).width()-300;
		if (pmyGrid1.width==0){
			//for (j=0;j<pmyGrid1.columns.length;j++) pmyGrid1.width+=1*pmyGrid1.columns[j].length;
			//pmyGrid1.width+=90;
		}
		pmyGrid1.left=0;
		pmyGrid1.fixedwidth=0;
		pmyGrid1.keyfieldcol=-1;
		for (var j=0; j<pmyGrid1.columns.length; j++){
			if (pmyGrid1.columns[j].name==pmyGrid1.keyfield){
				pmyGrid1.fixedwidth=pmyGrid1.columns[j].length;
				pmyGrid1.keyfieldcol=j;
				break;
			}
		}	
		//屏幕分成上下两块
		str="<div id='"+pmyGrid1.id+"_toplayout' class='easyui-layout' data-options='fit:true' style='overflow:hidden;'></div>";
		$("#"+pmyGrid1.parent).append($(str));
		$("#"+pmyGrid1.id+"_toplayout").layout();
		$('#'+pmyGrid1.id+'_toplayout').layout('add',{ //分页工具栏
				id: pmyGrid1.id+"_bbar",
				region: 'south',
				split: false,
				border: 0,
				collapsible:false,
				height:32  //值太小时水平滚动条会不见的。
		});

		$('#'+pmyGrid1.id+'_toplayout').layout('add',{
			id: pmyGrid1.id+"_center",
			region: 'center',
			split: false,
			border: 1,
			title: pmyGrid1.title,
			collapsible:false
		});
		$("#"+pmyGrid1.id+"_center").panel();
		//上面屏幕分成上、左、右3块
		str="<div id='"+pmyGrid1.id+"_layout' class='easyui-layout' data-options='fit:true' style='overflow:hidden;'></div>";
		$("#"+pmyGrid1.id+"_center").append($(str));
		$("#"+pmyGrid1.id+"_layout").layout();
		$('#'+pmyGrid1.id+'_layout').layout('add',{
			id: pmyGrid1.id+"_leftpanel",
			region: 'west',
			split: false,
			border: 0,
			collapsible:false,
			width: 1*pmyGrid1.rownumberwidth+1*pmyGrid1.checkboxwidth+1*pmyGrid1.fixedwidth+2+2
		});
		$('#'+pmyGrid1.id+'_layout').layout('add',{
			id: pmyGrid1.id+"_toppanel",
			region: 'north',
			split: false,
			border: 0,
			collapsible:false,
			height: 1*pmyGrid1.headerheight+1+3
		});
		$('#'+pmyGrid1.id+'_layout').layout('add',{
			id: pmyGrid1.id+"_mainpanel",
			region: 'center',
			split: false,
			border: 0,
			collapsible:false
		});

		//上面屏幕分成左右2块
		str="<div id='"+pmyGrid1.id+"_headlayout' class='easyui-layout' data-options='fit:true' style='overflow:hidden;margin:0px 0px 0px 0px;'></div>";
		$("#"+pmyGrid1.id+"_toppanel").append($(str));
		$("#"+pmyGrid1.id+"_headlayout").layout();
		$('#'+pmyGrid1.id+'_headlayout').layout('add',{
			id: pmyGrid1.id+"_headpanel1",
			region: 'west',
			split: false,
			border: 0,
			collapsible:false,
			width: 1*pmyGrid1.left+1*pmyGrid1.rownumberwidth+1*pmyGrid1.checkboxwidth+1*pmyGrid1.fixedwidth+2+2
		});
		$('#'+pmyGrid1.id+'_headlayout').layout('add',{
			id: pmyGrid1.id+"_headpanel2",
			region: 'center',
			split: false,
			border: 0,
			collapsible:false
		});
		$('#'+pmyGrid1.id+'_headpanel1').panel({height:1*pmyGrid1.headerheight});
		$('#'+pmyGrid1.id+'_headpanel2').panel({height:1*pmyGrid1.headerheight});
		$("#"+pmyGrid1.id+"_leftpanel").panel();
		$("#"+pmyGrid1.id+"_bbar").panel();
		$("#"+pmyGrid1.id+"_bbar").css({overflow:'hidden', 'background-color':'#E0ECFF', 'border-width':'0px'});
		$("#"+pmyGrid1.id+"_mainpanel").panel();
		
		myForm(pmyGrid1.id,pmyGrid1.id+'_mainpanel','',0,0,0,0,'');
		myForm(pmyGrid1.id+'_fixedpanel',pmyGrid1.id+'_leftpanel','',0,0,0,0,'');
		myForm(pmyGrid1.id+'_hbar1',pmyGrid1.id+'_headpanel1','',0,0,0,0,'');
		myForm(pmyGrid1.id+'_hbar2',pmyGrid1.id+'_headpanel2','',0,0,0,0,'');

		$("#"+pmyGrid1.id).css({overflow:'auto','border-width':'0px','margin':'0px 0px 0px 0px'});
		//margin 2px两个panel之间合并
		$("#"+pmyGrid1.id+"_fixedpanel").css({"overflow-y":'hidden', 'border-width':'0px', 'margin':'0px 0px 0px 2px'});
		$("#"+pmyGrid1.id+"_hbar1").panel({height:1*pmyGrid1.headerheight+4});
		$("#"+pmyGrid1.id+"_hbar1").css({left:pmyGrid1.left+'px', overflow:'hidden', 'background-color':'#E0ECFF', margin:'2px 0px 0px 2px', 'border-width':'0px'});
		$("#"+pmyGrid1.id+"_hbar2").panel({height:1*pmyGrid1.headerheight+4});
		$("#"+pmyGrid1.id+"_hbar2").css({overflow:'hidden', margin:'2px 0px 0px 0px', 'border-width':'0px'});
		$("#"+pmyGrid1.id+"_headpanel1").css({overflow:'hidden'});
		$("#"+pmyGrid1.id+"_headpanel2").css({overflow:'hidden'});
		$('#'+pmyGrid1.id+'_headlayout').css({overflow:'hidden'});
		$('#'+pmyGrid1.id+'_leftpanel').css({overflow:'hidden'});
		$('#'+pmyGrid1.id+'_mainpanel').css({overflow:'hidden'});
		$('#'+pmyGrid1.id+'_layout').css({overflow:'hidden'});
		$('#'+pmyGrid1.id+'_toplayout').css({overflow:'hidden'});
		$('#'+pmyGrid1.parent).css({overflow:'hidden'});
		scrollsize=myGetBrowserScrollSize();		
		pmyGrid1=myCreateGridHeader(pmyGrid1);
		pmyGrid1.rowindex=0;
		pmyGrid1.colindex=0;
		var str='';
		var css='';
		var cmp='';
		myCreateGridRows(pmyGrid1,0,pmyGrid1.rows);  //生成每个单元格的div控件
		if (pmyGrid1.menu!=undefined && pmyGrid1.menu!=''){
			$("#"+pmyGrid1.parent).bind('contextmenu',function(e){
				e.preventDefault();
				$("#"+pmyGrid1.menu).menu('show',{
					left: e.pageX,
					top: e.pageY
				});			
			});
		}
		//设置滚动条联动
		//pmyGrid1.scroll=0;
		$("#"+pmyGrid1.id).scroll(function() {
			$("#"+pmyGrid1.id+"_fixedpanel").scrollTop($("#"+pmyGrid1.id).scrollTop());
			$("#"+pmyGrid1.id+"_hbar2").scrollLeft($("#"+pmyGrid1.id).scrollLeft());
		});
		$("#"+pmyGrid1.id+"_fixedpanel").scroll(function() {
			//$("#"+pmyGrid1.id).scrollTop($("#"+pmyGrid1.id+"_fixedpanel").scrollTop());
			$(this).scrollLeft(0);			
		});
		/*
		var lastScroll = 0;
		$('div').scroll(function(){
			var el = $(this),
			scroll = el.scrollTop(),
			round = lastScroll < scroll ? Math.ceil : Math.floor;
			lastScroll = round(scroll/16) * 16;
			el.scrollTop(lastScroll);
		});
		*/
		if (pmyGrid1.menu!=''){
			$("#"+pmyGrid1.id).bind('contextmenu',function(e){
				e.preventDefault();
				$("#"+pmyGrid1.menu).menu("show",{
					left: e.pageX,
					top: e.pageY
				});			
			});
		}
		pmyGrid1.deletedrows=''; //删除行的关键字值
		return pmyGrid1;
		//myBindKeyDownEvent(cmp);
	}
	
	function myGridKeyEvent(pmyGrid1,e,id){  //按键处理
		var key=e.which;
		console.log(e);
		var input=$("#"+id);
		var x=document.getElementById(id);
		var row0=row=input.attr('xrow');
		var col0=col=input.attr('xcol');
		//console.log(id+'--'+row+'---'+col);
		//console.log(key+'---'+id+'---'+$("#"+id).attr('xno'));
		//e.preventDefault();  //不能加，否则只读
		var xcmp=[];
		var xtype=[];
		var i=0;
		if (key==13 || key==40 || key==38  || key==35 || key==36){ //  || key==35 || key==36){  //38--up  40--down
			if (key==13){
				if (col<pmyGrid1.columns.length-1) col++;
				else{
					if (row<pmyGrid1.rows-1){
						row++;
					}
					col=0;
				}
			}else if (key==40){  //向下
				if (row<pmyGrid1.rows-1){
					row++;
				}else if (pmyGrid1.append=='auto'){
					row=pmyGrid1.rows;
					pmyGrid1=myAppendGridRow(pmyGrid1);
				}else{
					col=0;
				}
			}else if (key==38){  //向上
				if (row>0){
					row--;
				}else{
					col=0;
				}
			}else if (key==1136){  //home
				row=0;
				col=0;
			}else if (key==1135){  //end
				row=pmyGrid1.rows-1;
				col=pmyGrid1.columns.length-1;
			}
			myFocus('cell_tmp');
			myCellFocus(pmyGrid1,row,col);
			//pmyGrid1.rowindex=row;
			//pmyGrid1.colindex=col;
		}
		return pmyGrid1;
	}
	
	function myGridLocate(pmyGrid1,n){  //定位到某一行后选中checkbox
		$("#r"+n+"_checkbox").prop("checked", true);
		myCellFocus(pmyGrid1,n,0);		
		myGridCheckBoxChange(pmyGrid1,'r'+n+'c0',null);
		return pmyGrid1;
	}
	
	function myGridCheckBoxChange(pmyGrid1,id,e){ 
		//点中某个复选框后，取消其他复选框选中状态，聚焦到某一行
		if (pmyGrid1.select=='single'){
			if (id=='hr_checkbox'){  //总复选框
				$('#hr_checkbox').prop('checked',false);
			}else{
				mySetAllCheckbox(pmyGrid1,false);
				row=$("#"+id).attr('xrow');
				myCellFocus(pmyGrid1,row,0);
			}
		}else{  //多选
			if (id=='hr_checkbox'){  //总复选框
				var checked=$("#hr_checkbox").is(':checked');
				mySetAllCheckbox(pmyGrid1,checked);
			}else{ //其他复选框
				mySetMasterCheckbox(pmyGrid1);	
			}	
		}
		return pmyGrid1;
	}
	
	function mySetAllCheckbox(pmyGrid1,checked){ 
		//设置checkbox状态
		for (var i=0;i<pmyGrid1.rows;i++){
			id='r'+i+'_checkbox';
			$("#"+id).prop('checked',checked);
		}
		return pmyGrid1;
	}	

	function mySetMasterCheckbox(pmyGrid1){
		//标题checkbox状态设置
		if (pmyGrid1.select!='single'){
			var checked=0;
			var unchecked=0;
			for (var i=0;i<pmyGrid1.rows;i++){
				id='r'+i+'_checkbox';
				if ($("#"+id).is(':checked')) checked++;
				else unchecked++;
			}
			if (checked==pmyGrid1.rows) $("#hr_checkbox").prop('checked',true);
			else if (unchecked==pmyGrid1.rows) $("#hr_checkbox").prop('checked',false);
		}
		return pmyGrid1;
	}
	
	function myAppendGridRow(pmyGrid1){  //追加一行
		pmyGrid1=myCreateGridRows(pmyGrid1,pmyGrid1.rows,1);
		myCellFocus(pmyGrid1,pmyGrid1.rows,0);
		pmyGrid1.rows++;
		return pmyGrid1;
	}

	function myCreateGridRows(pmyGrid1,n0,n){ //新增一行rrrrrrr
		var str='';
		var css='';
		var str1='';
		var str2='';
		var keyfieldset='';
		var deltay=parseInt(pmyGrid1.rowheight/2-8-2);
		for (var i=n0; i<n0+n; i++){
			var row=i;
			if (i>n0) keyfieldset+=';';
			keyfieldset+='r_key'+i; //记录原关键字值
			var top=(pmyGrid1.rowheight+0)*(row)+0;
			//var top=(pmyGrid1.rowheight+0)*(row)+pmyGrid1.headerheight+pmyGrid1.top+1;
			var left=0;
			var id='r'+row;
			if (pmyGrid1.rownumber){
				str1+='<div id="'+id+'_rowno" class="textgrid" style="text-align:center; line-height:'+(pmyGrid1.rowheight)+'px; background-color:#F4F4F4; width:'+(pmyGrid1.rownumberwidth)+'px; height:'+pmyGrid1.rowheight+'px;">';
				//str1+='<a href="javascript:myGridLocate(pmyGrid1,'+i+')" id="'+id+'_btn" class="easyui-linkbutton" style="padding:0; margin:0;">'+(row*1+1)+'</a>';
				str1+=(row*1+1);
				str1+='</div>\n';
				css+='$("#'+id+'_rowno").css({position:"absolute",top:"'+(top)+'px",left:"'+(left)+'px"});';
				//css+='$("#'+id+'_btn").linkbutton({plain:true,width:'+(pmyGrid1.rownumberwidth)+', height:'+pmyGrid1.rowheight+'});\n';
			}
			if (pmyGrid1.checkbox){
				str1+='<div id="'+id+'_box" class="textgrid" style="padding:'+deltay+'px 0px '+deltay+'px 0px; text-align:center; height:'+(pmyGrid1.rowheight-2*deltay)+'px; width:'+(pmyGrid1.checkboxwidth)+'px;"><input type="checkbox" id="'+id+'_checkbox" style="height:16px;width:16px;"></div>\n';
				css+='$("#'+id+'_box").css({position:"absolute",top:"'+(top)+'px",left:"'+(left*1+pmyGrid1.rownumberwidth)+'px"});';
				css+='$("#'+id+'_checkbox").on("click", function(e) {	myGridCheckBoxChange(pmyGrid1,"'+id+'_checkbox",e);});';
				css+='$("#'+id+'_checkbox").attr("xrow",'+row+');\n';
			}
			left+=(pmyGrid1.rownumberwidth+pmyGrid1.checkboxwidth+1);
			if (pmyGrid1.keyfieldcol<0) left=0;
			for (var j=0; j<pmyGrid1.columns.length; j++){
				var id='r'+row+'c'+j;
				var type=pmyGrid1.columns[j].type;
				var w=(pmyGrid1.columns[j].length-9);
				var align=pmyGrid1.columns[j].align;
				//w=...-9;  //why???可能与padding或margin有关
				str2='<div id="'+id+'"  onclick="myCellFocus(pmyGrid1,'+row+','+j+')" class="textgrid" style="position:absolute; text-align:'+align+'; padding:0px 2px 0px 6px; line-height:'+(pmyGrid1.rowheight*1)+'px; height:'+(pmyGrid1.rowheight)+'px; width:'+(w)+'px; top:'+(top)+'px; left:'+(left)+'px;"></div>\n';
				css+='$("#'+id+'").attr("xtype","label");\n';
				css+='$("#'+id+'").attr("xcol",'+j+');\n';
				css+='$("#'+id+'").attr("xrow",'+row+');\n';
				//css+='$("#'+id+'").textbox("setBorder", false);\n';
				if (pmyGrid1.columns[j].name==pmyGrid1.keyfield){
					str1+=str2;
					left=0;
				}else{
					str+=str2;
					left+=1*pmyGrid1.columns[j].length;
				}
			}	
		}
		//console.log(str);
		$("#"+pmyGrid1.id).append($(str)); 
		$("#"+pmyGrid1.id+"_fixedpanel").append($(str1));
		eval(css);	
		myHiddenFields(keyfieldset);
		//判断是否存在滚动条sscroll
		//vs=$('#'+myGrid1.id).hasVScrollBar();
		//hs=$('#'+myGrid1.id).hasHScrollBar();
		vs=myhasVScrollBar(myGrid1.id);
		hs=myhasHScrollBar(myGrid1.id);
		//console.log(vs);
		//console.log(hs);
		var top=0;
		var left=1*(pmyGrid1.rownumberwidth+pmyGrid1.checkboxwidth+1)-2+2;
		if (pmyGrid1.keyfieldcol<0) left=0;  //?????
		for (j=0;j<pmyGrid1.columns.length;j++){
			if (pmyGrid1.columns[j].name==pmyGrid1.keyfield) left=0;
			else left+=1*pmyGrid1.columns[j].length;
		}
		var sw=0;
		var sh=0;
		var id='hr';
		 //在标题hbar2中添加一个小方块
		if (vs && hs){
			sw=scrollsize.width+2;
		}else if (hs){
			sw=2;
		}	
		if (sw>0){
			var str='<div id="'+id+'_rownox" class="textgrid" style="background-color:#F4F4F4; text-align:left; width:'+(sw)+'px; height:'+(pmyGrid1.headerheight)+'px;">';
			var css='$("#'+id+'_rownox").css({position:"absolute",top:"'+(top)+'px",left:"'+(left)+'px","border-width":"1px"});';
			$("#"+pmyGrid1.id+"_hbar2").append($(str));
			eval(css);
		}
		 //两个滚动条都存在时，在固定列数据网格fixedpanel底部添加一个小方块条
		if (hs && vs){
			sh=scrollsize.height;
			$("#"+pmyGrid1.id+"_fixedpanel").css({"overflow-x":'scroll'});
		}else{
			sh=0;
			$("#"+pmyGrid1.id+"_fixedpanel").css({"overflow-x":'hidden'});
		}
		//滚动条处理结束		
		return pmyGrid1;		
	}

	function myCreateGridHeader(pmyGrid1){  // hhhhhhhhheader
		//添加标题：外层hr_row,hr_box，hr_c0_div,1_div...
		//添加标题：内层hr_rowno,hr_btn,hr_checkbox,hr_c0,1,2...
		var top=pmyGrid1.top;
		var left=0;
		var deltay=parseInt(pmyGrid1.headerheight/2-8-2);
		var str='';
		var css='';
		var str1='';
		var str2='';
		var id='hr';
		if (pmyGrid1.rownumber){
			str1+='<div id="'+id+'_rowno" class="textgrid" style="background-color:#F4F4F4; text-align:left; width:'+(pmyGrid1.rownumberwidth)+'px; height:'+(pmyGrid1.headerheight)+'px;"></div>\n';
			css+='$("#'+id+'_rowno").css({position:"absolute",top:"'+(top)+'px",left:"'+(left)+'px"});';
		}
		if (pmyGrid1.checkbox){
			str1+='<div id="'+id+'_box" class="textgrid" style="padding:'+deltay+'px 0px '+deltay+'px 0px; text-align:center; height:'+(pmyGrid1.headerheight-2*deltay)+'px; width:'+(pmyGrid1.checkboxwidth)+'px;"><input type="checkbox" id="'+id+'_checkbox" style="height:16px;width:16px;"></div>\n';
			css+='$("#'+id+'_box").css({position:"absolute",top:"'+(top)+'px",left:"'+(left*1+pmyGrid1.rownumberwidth)+'px"});';
			css+='$("#'+id+'_checkbox").on("click", function(e) {	myGridCheckBoxChange(pmyGrid1,"'+id+'_checkbox",e);});';
			css+='$("#'+id+'_checkbox").attr("xrow",-1);\n';
		}
		
		left=1*(pmyGrid1.rownumberwidth+pmyGrid1.checkboxwidth+1)-2+2;
		if (pmyGrid1.keyfieldcol<0) left=0;
		for (j=0;j<pmyGrid1.columns.length;j++){
			id='hr_c'+j;
			str2='<div id="'+id+'" class="textgrid" style="text-align:center; line-height:'+pmyGrid1.headerheight+'px; position:absolute; background-color:#F4F4F4;';
			str2+='top:'+(top)+'px; left:'+(left)+'px;';
			str2+='height:'+(pmyGrid1.headerheight+0)+'px; width:'+(1*pmyGrid1.columns[j].length-1)+'px;">';
			//str2+='<a href="javascript:void(0)" id="'+id+'" class="easyui-linkbutton" style="padding:0; margin:0;">'+pmyGrid1.columns[j].title+'</a>';
			str2+=pmyGrid1.columns[j].title;
			str2+='</div>\n';
			//css+='$("#'+id+'").linkbutton({plain:true,width:'+(pmyGrid1.columns[j].length*1-4)+', height:'+(pmyGrid1.headerheight-0)+'});';
			css+='$("#'+id+'").attr("xcol",'+j+');\n';
			css+='$("#'+id+'").attr("xrow","0");\n';
			if (pmyGrid1.columns[j].name==pmyGrid1.keyfield){
				str1+=str2;
				left=0;
			}else{
				str+=str2;
				left+=1*pmyGrid1.columns[j].length;
			}
		}
		$("#"+pmyGrid1.id+"_hbar1").append($(str1));
		$("#"+pmyGrid1.id+"_hbar2").append($(str));
		eval(css);
		//创建可编辑控件ttttttttt
		str='';
		css='';
		//定义一个文本框，用来存储临时值。可编辑控件按键盘键时值不会提交，先聚焦到cell_tmp，再聚焦到原来控件，这样值就可以提交
		myTextField('cell_tmp',pmyGrid1.id,'',0,-10,-0,1,1,'',''); //要求该控件不可见，设置其top为-10
		var left=(pmyGrid1.rownumberwidth+pmyGrid1.checkboxwidth+1)-4;
		if (pmyGrid1.keyfieldcol<0) left=-4;
		var j=0;
		for (var j=0; j<pmyGrid1.columns.length; j++){
			if (pmyGrid1.columns[j].name==pmyGrid1.keyfield){
				parent=pmyGrid1.id+'_fixedpanel';
			}else{
				var parent=pmyGrid1.id;
			}
			var id='cell_'+j;
			var w=1*pmyGrid1.columns[j].length+1;
			var type=pmyGrid1.columns[j].type;
			//console.log(id+','+type);
			if (type=='n'){  //numberfield
				var len=eval('pmyGrid1.length_'+pmyGrid1.columns[j].name);
				if (len==undefined) len=12;
				var min=eval('pmyGrid1.min_'+pmyGrid1.columns[j].name);
				if (min==undefined) min=0;
				var max=eval('pmyGrid1.max_'+pmyGrid1.columns[j].name);
				if (max==undefined) max=0;
				myNumberField(id,parent,'',0,top,left,pmyGrid1.rowheight*1+1,w-4,len,pmyGrid1.columns[j].dec,0,min,max,'');
			}else if (type=='d'){  //datefield
				myDateField(id,parent,'',0,top,left,pmyGrid1.rowheight*1+1,w,'','');
			}else if (type=='b'){  //combobox
				var items=eval('pmyGrid1.items_'+pmyGrid1.columns[j].name);
				if (items==undefined) items='';
				if (items.substr(0,3)=='[@]'){  //可多选
					items=items.substring(3);
					//console.log(items);
					myComboField(id,parent,'',0,top,left,pmyGrid1.rowheight*1+1,w,items,'','checkbox');  //combobox
				}else{
					myComboField(id,parent,'',0,top,left,pmyGrid1.rowheight*1+1,w,items,'','');  //combobox
				}
			}else if (type=='x'){  //dbcombobox
				var style='';
				var sql=eval('pmyGrid1.sql_'+pmyGrid1.columns[j].name);
				if (sql==undefined) sql='';
				if (sql!='' && sql.substr(0,3)=='[@]'){
					style='checkbox';
					sql=sql.substring(3);
				}
				sql="select text as "+id+" from ("+sql+") as p";
				myDBComboField(id,parent,'',0,top,left,pmyGrid1.rowheight*1+1,w,sql,id,'',style);  //dbcombobox
			}else{
				myTextField(id,parent,'',0,top,left,pmyGrid1.rowheight*1+1,w,'');
			}
			if (pmyGrid1.columns[j].name==pmyGrid1.keyfield){
				left=-4;
			}else{
				left+=1*pmyGrid1.columns[j].length;
			}
			//事件begin//ffffffffffffocus
			css+='$("#'+id+'").textbox("textbox").bind("blur",function(e){';
			css+='var row=$("#'+id+'").attr("xrow");';
			css+='var col=$("#'+id+'").attr("xcol");';
			//css+='console.log(row+"----blur----"+col);';
			css+='if (row>=0 && col>=0) mySetRowValue(pmyGrid1,row,col);';
			css+='});\n';
			css+='$("#'+id+'").textbox("textbox").bind("focus",function(e){';
			css+='xrow=$("#'+id+'").attr("xrow");';
			css+='xcol=$("#'+id+'").attr("xcol");';
			css+='pmyGrid1.rowindex=xrow;';
			css+='pmyGrid1.colindex=xcol;';
			css+='if (xcol==0) $("#"+pmyGrid1.id).scrollLeft(0);'; //滚动条回到最左边
			if (pmyGrid1.clickonselect){
				if (pmyGrid1.select=='single'){
					css+='mySetAllCheckbox(pmyGrid1,false);';
				}
				css+='$("#r"+xrow+"_checkbox").prop("checked",true);';
				if (pmyGrid1.select!='single'){
					css+='mySetMasterCheckbox(pmyGrid1);';
				}
			}
			css+='});\n';
			//事件end
			//css+='$("#'+id+'").attr("xtype","gridtextbox");\n';
			css+='$("#'+id+'").attr("xcol",'+j+');\n';
			css+='$("#'+id+'").attr("xrow",-1);\n';
			css+='$("#'+id+'").textbox("textbox").bind("keydown",function(e){ myGridKeyEvent(pmyGrid1,e,"'+id+'"); });\n';
			//css+='$("#'+id+'").textbox("setBorder", false);\n';
		}
		$("#"+pmyGrid1.id).append($(str));
		eval(css);
		return pmyGrid1;		
	}
	
	function myInsertGridRow(pmyGrid1,row){
		pmyGrid1=myCreateGridRows(pmyGrid1,pmyGrid1.rows,1);
		pmyGrid1.rows++;
		for (var i=pmyGrid1.rows-1;i>=row;i--){
			var c1=$("#r"+i+'_checkbox');
			var c2=$("#r"+(i-1)+'_checkbox');
			c1.prop("checked", c2.is(':checked'));
			c1.prop("checked", c2.is(':checked'));
			c1.attr('xrow',i);
			c2.attr('xrow',i-1);
			mySetValue('r_key'+i,myGetValue('r_key'+(i-1)));
			for (j=0;j<pmyGrid1.columns.length;j++){
				c1='r'+i+'c'+j;
				c2='r'+(i-1)+'c'+j;
				if (i==row) mySetValue(c1,'');
				else mySetValue(c1,myGetValue(c2));
				$("#"+c1).attr('xrow',i);
				$("#"+c2).attr('xrow',i-1);
				$("#"+c1).attr('xcol',j);
				$("#"+c2).attr('xcol',j);
			}
		}
		mySetValue('r_key'+row,'');
		for (j=0;j<pmyGrid1.columns.length;j++){
			mySetValue('cell_'+j,'');
		}
		myCellFocus(pmyGrid1,row,0);
		return pmyGrid1;
	}
	
	function myDeleteGridRow(pmyGrid1,row){
		pmyGrid1.deletedrows+='	'+myGetValue('r_key'+row);  //tab分割
		var i=0;
		for (var i=row;i<pmyGrid1.rows-1;i++){
			var c1=$("#r"+i+'_checkbox');
			var c2=$("#r"+(i*1+1)+'_checkbox');
			c1.prop("checked", c2.is(':checked'));
			mySetValue('r_key'+i,myGetValue('r_key'+(i+1)));
			for (j=0;j<pmyGrid1.columns.length;j++){
				c1='r'+i+'c'+j;
				c2='r'+(i*1+1)+'c'+j;
				mySetValue(c1,myGetValue(c2));
			}
		}
		pmyGrid1.rows--;
		$('#r'+pmyGrid1.rows+'_rowno').remove();
		$('#r'+pmyGrid1.rows+'_box').remove();
		$('#r_key'+pmyGrid1.rows).remove();
		for (j=0;j<pmyGrid1.columns.length;j++){
			c1='r'+row+'c'+j;
			mySetValue('cell_'+j,myGetValue(c1));  //将当前行值赋值给可编辑控件
			$('#r'+pmyGrid1.rows+'c'+j).remove();  //删除最后一行的所有控件
		}
		if (row==pmyGrid1.rows) row--; 
		myCellFocus(pmyGrid1,row,0);
		return pmyGrid1;
	}

	function mySaveGridRows(pmyGrid1){  //ssssssssssave
		var sql='';
		var tmp=pmyGrid1.deletedrows.split('	');
		for (var i=1; i<tmp.length; i++){
			sql+="delete "+pmyGrid1.tablename+" where "+pmyGrid1.keyfield+"='"+tmp[i]+"'\n";
		}
		for (var i=0; i<pmyGrid1.rows; i++){
			var flag=0;
			var sql1="insert into "+pmyGrid1.tablename+"(";
			var sql2=" values(";
			var sql3="update "+pmyGrid1.tablename+" set ";
			for (j=0; j<pmyGrid1.columns.length; j++){
				var c1='r'+i+'c'+j;
				var v=myGetValue(c1);
				if (j>0){
					sql1+=',';
					sql2+=',';
					sql3+=',';
				}
				sql1+=pmyGrid1.columns[j].name;
				sql2+="'"+v+"'";
				sql3+=pmyGrid1.columns[j].name+"='"+v+"'";
				if (v!='')	flag=1;
			}
			if (flag>0){
				var keyvalue=myGetValue('r_key'+i);
				if (keyvalue=='') sql+=sql1+')'+sql2+')\n';
				else sql+=sql3+" where "+pmyGrid1.keyfield+"='"+keyvalue+"'\n";
				if (pmyGrid1.keyfieldcol>=0){
					//保存关键字列值
					mySetValue('r_key'+i,myGetValue('r'+i+'c'+pmyGrid1.keyfieldcol));
				}
			}
		}
		//console.log(sql);
		var result=myRunUpdateSql(sysdatabasestring, sql);
		myCellFocus(pmyGrid1,0,0);
		return pmyGrid1;
	}

	
	function myTextGridColumns(pmyGrid1){
		//[#230%n@r]资源名称/resourcename;
		var xcolumns=[];
		fieldset=pmyGrid1.gridfields;
		var xfields=fieldset.split(';');
		for (var i=0;i<xfields.length;i++){
			xcolumns[i]={};
			xcolumns[i].name='';
			xcolumns[i].title='';
			xcolumns[i].align='';
			xcolumns[i].type='c';
			xcolumns[i].length='100';
			xcolumns[i].dec='0';
			xcolumns[i].fixed=0;
			var s=xfields[i].toLowerCase();
			var p1=s.indexOf('[');
			var p2=s.indexOf(']');
			if (p1>=0 && p2>p1){
				var ss=s.substring(p1+1,p2);
				var x1=ss.indexOf('@');
				if (x1>=0){
					xcolumns[i].align=ss.substr(x1+1,1);
					ss=ss.replace('@'+xcolumns[i].align,'');  //删除该描述
				}
				var x2=ss.indexOf('%');
				if (x2>=0){
					xcolumns[i].type=ss.substr(x2+1,1);
					ss=ss.replace('%'+xcolumns[i].type,'');  //删除该描述
				}
				var x3=ss.indexOf('#');
				var s1='';
				var s2='';
				if (x3>=0)	s1=ss.substring(x3+1,255);
				else s1=ss;
				var x4=s1.indexOf(',');
				if (x4<0){
					xcolumns[i].length=s1;
				}else{
					xcolumns[i].length=s1.substring(0,x4);
					xcolumns[i].dec=s1.substr(x4+1,2);
				}
				s=s.substring(p2+1,255);
			}
			var x1=s.indexOf('/');
			if (x1>0){
				xcolumns[i].title=s.substring(0,x1);		
				xcolumns[i].name=s.substring(x1+1);		
			}else{
				xcolumns[i].title=s;		
				xcolumns[i].name=s;		
			}
			if (xcolumns[i].align=='' && xcolumns[i].type=='d') xcolumns[i].align='c'; 
			if (xcolumns[i].align=='' && xcolumns[i].type=='n') xcolumns[i].align='r'; 
			if (xcolumns[i].align=='' && xcolumns[i].type=='f') xcolumns[i].align='r'; 
			if (xcolumns[i].align=='c') xcolumns[i].align='center';
			else if (xcolumns[i].align=='r') xcolumns[i].align='right';
			else xcolumns[i].align='left';
		} //for
		//console.log(result);
		pmyGrid1.columns=xcolumns;
		return pmyGrid1; 
	}
	
	function myLoadTextGridData(pmyGrid1){   //lllllllload
		pmyGrid1.deletedrows='';
		$.ajax({     
			type: "Post",     
			url: "system/easyui_getGridData.jsp",     
			//contentType: "application/json; charset=utf-8",     
			//dataType: "json", 
			data: {
				database: sysdatabasestring, 
				selectsql: myToXcode(pmyGrid1.activesql),
				keyfield: pmyGrid1.keyfield,
				sortfield: pmyGrid1.sortfield,
				limit: pmyGrid1.pagesize,
				start: (pmyGrid1.pagenumber-1)*pmyGrid1.pagesize,
				summeryfields:''				
			}, 
			async: false, method: 'post',    
			success: function(data) {
				eval("var source="+data+";");
				var records=source.rows;
				for (var i=0; i<records.length; i++){
					if (i>=pmyGrid1.rows){
						myAppendGridRow(pmyGrid1);
						pmyGrid1.rowindex=0;
					} 
					for (j=0; j<pmyGrid1.columns.length; j++){
						c1='r'+i+'c'+j;
						c2=eval("records[i]."+pmyGrid1.columns[j].name);
						mySetValue(c1,c2);
					}
					mySetValue('r_key'+i,eval("records[i]."+pmyGrid1.keyfield));
				}
				while (i<pmyGrid1.rows){
					for (j=0; j<pmyGrid1.columns.length; j++){
						c1='r'+i+'c'+j;
						mySetValue(c1,'');
					}
					mySetValue('r_key'+i,'');
					i++;
				}
				if (pmyGrid1.rowindex<0 || pmyGrid1.rowindex>=pmyGrid1.rows){
					pmyGrid1.rowindex=0; 
				}
			} 
		});
		$('#cell_0').attr('xrow',-1);  //必须加，否则当前cell_*控件值会赋值给当前编辑行
		myCellFocus(pmyGrid1,pmyGrid1.rowindex,0);
		return pmyGrid1;
	}
	
	function myBlankTextGrid(pmyGrid1,n){
		if (n==0) n=pmyGrid1.rows;
		for (var i=0; i<pmyGrid1.rows && i<n; i++){
			for (j=0; j<pmyGrid1.columns.length; j++){
				c1='r'+i+'c'+j;
				mySetValue(c1,'');
			}
		}	
		while (i<pmyGrid1.rows){
			$('#r'+i+'_rowno').remove();
			$('#r'+i+'_box').remove();
			for (j=0;j<pmyGrid1.columns.length;j++){
				$('#r'+i+'c'+j+'_div').remove();
			}
			i++;
		}
		while (i<n){
			myAppendGridRow(pmyGrid1);		
			i++;			
		}
		pmyGrid1.rows=n;		
		myCellFocus(pmyGrid1,0,0);
		return pmyGrid1;
	}
	
	function mySetRowValue(pmyGrid1,row0,col0){
		if (row0>=0 && row0<pmyGrid1.rows){ //row0<0时不赋值
			if (col0>=0){  //单列赋值
				var id='cell_'+col0;
				mySetValue('r'+row0+'c'+col0,myGetValue(id));
			}else{ //整行赋值
				for (var j=0; j<pmyGrid1.columns.length; j++){
					var id='cell_'+j;
					mySetValue('r'+row0+'c'+j,myGetValue(id));
				}
			}	
		}
	}
	
	function myCellFocus(pmyGrid1,row,col){
		//console.log(row+'--focus---'+col);
		var row0=$("#cell_0").attr("xrow");
		var col0=$("#cell_0").attr("xcol");
		if (row0!=row && row>=0){  //rown0<0时不赋值
			var keyvalue=myGetValue("cell_"+col0);
			if (col0==pmyGrid1.keyfieldcol && keyvalue!=''){
				var flag=false;
				for (var i=0;i<pmyGrid1.rows;i++){
					if (myGetValue('r'+i+'c'+col0)==keyvalue && i!=row0){
						flag=true;
						break;
					}
				}
			}
			if (flag){
				//myFocus("cell_"+col0);
				col=col0;
				row=row0;
				var f='myFocus("cell_'+col0+'")';
				console.log(f);
				myMessage(pmyGrid1.columns[col0].title+'值重复！','error',0,f);
			}else{
				mySetRowValue(pmyGrid1,row0,-1);  //保存所有可编辑控件值到ricj
				var top=(pmyGrid1.rowheight+0)*(row);
				var left=pmyGrid1.left-4+(pmyGrid1.rownumberwidth+pmyGrid1.checkboxwidth+1);
				var css='';
				for (var j=0; j<pmyGrid1.columns.length; j++){ //将当前行值复制到可编辑控件
					var id='cell_'+j;
					var type=pmyGrid1.columns[j].type;
					css+='$("#'+id+'_div").css({top:"'+(top)+'px"});\n';
					css+='$("#'+id+'").attr("xrow",'+row+');\n';
					mySetValue(id,myGetValue('r'+row+'c'+j));
				}
				//console.log(css);
				eval(css);
			}	
		}
		if (row>=0 && col>=0){
			mySelectOnFocus();
			$("#cell_"+col).attr('xrow',row);
			$("#cell_"+col).attr('xcol',col);
			pmyGrid1.colindex=col;
			pmyGrid1.rowindex=row;
			if (col==0){
				$("#"+pmyGrid1.id).scrollLeft(0);  //滚动条回到最左边
			}
			myFocus('cell_'+col);
		}
		//选中固定列时设置右侧屏幕的滚动条位置，超过一页时生效
		if (col==0)	$("#"+pmyGrid1.id).scrollTop($("#"+pmyGrid1.id+"_fixedpanel").scrollTop());
		//console.log($("#"+pmyGrid1.id).scrollTop());
		return pmyGrid1;
	}

	function doGetCaretPosition (oField) {
		  // Initialize
		  var iCaretPos = 0;
		  // IE Support
		  if (document.selection) {
		    // Set focus on the element
		    oField.focus();
		    // To get cursor position, get empty selection range
		    var oSel = document.selection.createRange();
		    // Move selection start to 0 position
		    oSel.moveStart('character', -oField.value.length);
		    // The caret position is selection length
		    iCaretPos = oSel.text.length;
		  }
		  // Firefox support
		  else if (oField.selectionStart || oField.selectionStart == '0')
		    iCaretPos = oField.selectionStart;
		  // Return results
		  return iCaretPos;
		}
	
	function f1(el) {
	    var val = el.value;
	    return (val.slice(0, el.selectionStart).length);
	}   
	
	function myHideScrollbar(bars,flag){
		tmp=bars.split(';');
		for (var i=0; i<tmp.length; i++){
			$("#"+tmp[i]).css({overflow: flag});
		}
	}
	
	 
	function myGetScrollbarWidth() {
	    var outer = document.createElement("div");
	    outer.style.visibility = "hidden";
	    outer.style.width = "100px";
	    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
	    document.body.appendChild(outer);
	    var widthNoScroll = outer.offsetWidth;
	    // force scrollbars
	    outer.style.overflow = "scroll";
	    // add innerdiv
	    var inner = document.createElement("div");
	    inner.style.width = "100%";
	    outer.appendChild(inner);        
	    var widthWithScroll = inner.offsetWidth;
	    // remove divs
	    outer.parentNode.removeChild(outer);
	    return widthNoScroll - widthWithScroll;
	}
	
		
	function myhasVScrollBar(id){
		var delta=0;
		if ($("#"+id).get(0).scrollWidth+delta > $("#"+id).innerWidth()) delta=scrollsize.height;
		//console.log($("#"+id).get(0).scrollHeight+'---v>----'+$("#"+id).innerHeight());
        return $("#"+id).get(0).scrollHeight+delta > $("#"+id).innerHeight();		
	}

	function myhasHScrollBar(id){
        //console.log($("#"+id).get(0).scrollWidth+'---h>---'+$("#"+id).innerWidth());
        var delta=0;
        if ($("#"+id).get(0).scrollHeight>$("#"+id).innerHeight()) delta=scrollsize.width;
        return ($("#"+id).get(0).scrollWidth+delta > $("#"+id).innerWidth());
	}

	$.fn.hasVScrollBar = function() {
		var delta=0;
		if (this.get(0).scrollWidth+delta > this.innerWidth()) delta=scrollsize.height;
		//console.log(this.get(0).scrollHeight+'---v>----'+this.innerHeight());
        return this.get(0).scrollHeight+delta > this.innerHeight();
    }
	$.fn.hasHScrollBar = function() {
        //console.log(this.get(0).scrollWidth+'---h>---'+this.innerWidth());
        var delta=0;
        if (this.get(0).scrollHeight>this.innerHeight()) delta=scrollsize.width;
        return (this.get(0).scrollWidth+delta > this.innerWidth());
    }
	
	
	function xhasScroll(el, index, match) {
	    var $el = $(el),
	        sX = $el.css('overflow-x'),
	        sY = $el.css('overflow-y'),
	        hidden = 'hidden', // minifiers would like this better
	        visible = 'visible',
	        scroll = 'scroll',
	        axis = match[3]; // regex for filter -> 3 == args to selector

	    if (!axis) { // better check than undefined
	        //Check both x and y declarations
	        if (sX === sY && (sY === hidden || sY === visible)) { //same check but shorter syntax
	            return false;
	        }
	        if (sX === scroll || sY === scroll) { return true; }
	    } else if (axis === 'x') { // don't mix ifs and switches on the same variable
	        if (sX === hidden || sX === visible) { return false; }
	        if (sX === scroll) { return true; }
	    } else if (axis === 'y') {
	        if (sY === hidden || sY === visible) { return false; }
	        if (sY === scroll) { return true };
	    }
	    //Compare client and scroll dimensions to see if a scrollbar is needed
	    return $el.innerHeight() < el.scrollHeight || //make use of potential short circuit
	        $el.innerWidth() < el.scrollWidth; //innerHeight is the one you want
	}
	$.expr[':'].hasScroll = xhasScroll;
	