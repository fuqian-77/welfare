	//2011333570227   570227    学生
	//F12是不显示pdf
	//.datagrid-row {height: 34px; }放在resource.jsp文件的head中
	var pmyTree1={};
	var pmyGrid1={};
	$(function(){
		document.onkeypress=myBanBackSpace;
		document.onkeydown=myBanBackSpace;
		pmyGrid1.parent='wineditpanel';	
		pmyGrid1.id='myGrid1';
		pmyGrid1.rowheight=32;
		pmyGrid1.headerheight=30;
		pmyGrid1.append='auto';
		pmyGrid1.gridfields='[#350]选项名称/description;[#300]助记码/pycode';
		pmyGrid1.rows=20;
		pmyGrid1.top=2;
		pmyGrid1.left=12;
		pmyGrid1.height=0;
		pmyGrid1.width=0;
		pmyGrid1.title='选项编辑';
		pmyGrid1.rownumber=true;
		pmyGrid1.checkbox=true;
		pmyGrid1.clickonselect=true;
		pmyGrid1.select='single';		
		pmyGrid1.pagesize=0;
		pmyGrid1.pagenumber=1;
		pmyGrid1.keyfield='id';
		pmyGrid1.sortfield='id,description';
		pmyGrid1.menu='myMenu3';
		pmyGrid1.staticsql="";
		pmyGrid1.active=pmyGrid1.staticsql;
		//定义树myTree1
		$("#treepanel").panel();
		pmyTree1.id='myTree1';
		pmyTree1.parent='treepanel';
		pmyTree1.keyfield='id';
		pmyTree1.sql="select '0' as id,'所有选项' as text,'' as parentnodeid,1 as isparentflag,1 as level,'' as ancester,-1 as sortflag \n"+
		"union all \n"+
		"select id,type,'0' as parentnodeid,0 as isparentflag,2 as level,'0#' as ancester,sortflag \n" +
		"from dictionary a where ID=(select MIN(id) from dictionary b where a.Type=b.Type)";
		//console.log(pmyTree1.sql);
		pmyTree1.title='选项分类';
		pmyTree1.sortfield='sortflag,text';
		pmyTree1.editable=false;
		pmyTree1.style='full';
		pmyTree1.line=true;
		pmyTree1.width=0;
		pmyTree1.height=0;
		pmyTree1.menu='';
		pmyTree1=myDBTree(pmyTree1);
		var tree1=$("#myTree1");
		$("#treepanel").panel({ title:'选项分类' });
		$("#treepanel").panel('doLayout');  //重新调整其中元素的大小
		myMenuItem('myMenu1','新增分类/popadd1/addIcon;修改分类/popedit1/editIcon;删除分类/popdelete1/deleteIcon;-;刷新/poprefresh1/refreshIcon','');
		myMenuItem('myMenu2','新增分类/popadd2/addIcon;修改分类/popedit2/editIcon;删除分类/popdelete2/deleteIcon;-;刷新/poprefresh2/refreshIcon','');
		myMenuItem('myMenu3','新增/popappend/addIcon;插入/popinsert/insertIcon;删除/popremove/deleteIcon;-;保存/popsubmit/saveIcon;-;重置/popreset/resetIcon','');
		myButtonGroup('treecmd','toolbar1','选项/cmdmenu/menuIcon/myMenu1;|',5,0,16,60);	
		myButtonGroup('formcmd','toolbar2','-;|保存/cmdsave/saveIcon;|重置/cmdreset/resetIcon;|刷新/cmdrefresh/refreshIcon;|',6,10,17,60);	
		var h=Math.max(200,$("#wineditpanel").height()-200-297);
		//myForm('myGrid1','wineditpanel','选项编辑',0,0,0,0,'');
		myWindow('myWin1','选项分类',0,0,135,450,'save;close','noclose');
		myTextField('type','myWin1','类别名称:',65,18,16,0,335,'');
		myHiddenFields('addoredit');
		//$("#myGrid1").css({'background':'#000'});
		$("#popappend").click(function(e){//新增明细记录
			myGridRowAppend(pmyGrid1);				
		});	
		$("#popinsert").click(function(e){//插入明细记录
			myGridRowInsert(pmyGrid1,pmyGrid1.rowindex);				
		});	
		$("#popremove").click(function(e){//删除明细记录
			myGridRowDelete(pmyGrid1,pmyGrid1.rowindex);				
		});	
		//刷新所有内容
		$("#poprefresh1,#poprefresh2,#cmdrefresh").click(function(e){
			pmyTree1=myDBTree(pmyTree1);
			var root=$("#myTree1").tree('getRoot');
			var nodes=$("#myTree1").tree('getChildren',root.target);
			if (nodes.length>0) $("#myTree1").tree('select',nodes[0].target);
		});
		//明细记录重置
		$("#cmdreset,#popreset").click(function(e){
			pmyGrid1.rowindex=0;
			mySelectOnFocus();
			var data=myLoadTextGridData(pmyGrid1);					
		});
		
		//删除类别
		$("#popdelete1,#popdelete2").click(function(e){
			node=$('#myTree1').tree('getSelected');
			if (node && node.id!='0'){
				msg='删除['+node.text+']及其所有选项。@n是否确定删除该类选项？';
				$.messager.confirm('系统提示', myConfirmMessage(msg), function(r){
					if (r){
						sql="delete dictionary where type='"+node.text+"'";
						var result=myRunUpdateSql(sysdatabasestring, sql);
					}
				});		
			}else{
				myMessage("请选择需要删除的选项类别！");
			}
		});
		//新增类别
		$("#popadd1,#popadd2").click(function(e){
			mySetValue('addoredit','add');
			$("#myWin1").window('open');
			$("#myWin1").window('setTitle','新增类别');
			mySetValue('type','');
			myFocus('type');
			pmyGrid1.rowindex=0;
		});
		//修改大类
		$("#popedit1,#popedit2").click(function(e){
			if (pmyTree1.selectednode!=null && pmyTree1.selectednode.id!='0'){
				mySetValue('addoredit','edit');
				$("#myWin1").window('open');
				$("#myWin1").window('setTitle','修改类别');
				mySetValue('type',pmyTree1.selectednode.text);
				myFocus('type');
			}
		});
		//保存大类
		$("#myWin1SaveBtn").click(function(e){
			//CancelBtn,CloseBtn,OkBtn,SaveBtn
			var v=myGetValue('type');
			var root=$("#myTree1").tree('getRoot');
			var addoredit=myGetValue('addoredit');
			if (addoredit=='add'){
				n=1;
				while (1){
					if ($("#myTree1").tree('find',n)==null) break;
					else n++;
				}
				if (v!=''){
					$('#myTree1').tree('append',{
						parent: root.target,
						data: [{id:n,text:v}]
					});
					node=$("#myTree1").tree('find',n);
					$('#myWin1').window('close');
					myBlankTextGrid(pmyGrid1,10);
					$('#myTree1').tree('select',node.target);
				}
			}else{
				sql="update dictionary set type='"+v+"' where type='"+pmyTree1.selectednode.text+"'";
				myRunUpdateSql(sysdatabasestring, sql);
				pmyTree1.selectednode.text=v;
				$('#myTree1').tree('update',pmyTree1.selectednode);
				$('#myWin1').window('close');
			}	
		});
		//关闭窗体
		$("#myWin1CloseBtn").click(function(e){
			$('#myWin1').window('close');
		});
		//保存明细记录sssssssssave	
		$("#popsubmit,#cmdsave").click(function(e){
			node=$('#myTree1').tree('getSelected');
			if (node && node.id!='0'){
				var sql="";
				var flag=0;
				for (var i=0; i<pmyGrid1.rows; i++){
					var c1='r'+i+'c0';
					var c2='r'+i+'c1';
					v1=myGetValue(c1);
					v2=myGetValue(c2);
					if (v1!=''){
						sql+="insert into dictionary (type,description,pycode) values('"+node.text+"','"+v1+"','"+v2+"')\n";
						flag++;
					}
					/*
					var flag=0;
					var sqlx="'"+node.text+"'"
					var sqly="type";
					for (j=0; j<pmyGrid1.columns.length; j++){
						var c1='r'+i+'c'+j;
						var v=myGetValue(c1);
						sqlx+=",'"+v+"'";
						sqly+=","+pmyGrid1.columns[j].name;
						if (v!='')	flag=1;
					}
					if (flag>0){
						sql+="insert into dictionary ("+sqly+") values("+sqlx+")\n";
					}
					*/
				}
				if (flag>0){
					sql="delete dictionary where type='"+node.text+"'\n"+sql;
					myMessage('['+node.text+']选项类别@n共'+flag+'条记录被保存！');
				}else{
					myMessage('无记录保存!@n选项类别['+node.text+']已被删除！');
				}
				//console.log(sql);
				var result=myRunUpdateSql(sysdatabasestring, sql);
			}	
		});		
		//定义右键菜单
		$("#treepanel").bind('contextmenu',function(e){
			e.preventDefault();
			$("#myMenu2").menu("show",{
				left: e.pageX,
				top: e.pageY
			});			
		});
		////定义右键菜单ttttttttttttttree
		$("#myTree1").tree({
			onContextMenu: function(e,node){
				e.preventDefault();
				$('#myTree1').tree('select', node.target);
				$("#myMenu2").menu("show",{
					left: e.pageX,
					top: e.pageY
				});			
			}
		});
		//初始化时展开知识类别树ccccccc
		pmyGrid1=myTextGrid(pmyGrid1); //生成网格
		myFocus('r0c0');
		var root = $("#myTree1").tree("getRoot");
		$("#myTree1").tree('expand', root.target);   //收缩父节点，与expand相反
		var nodes=$("#myTree1").tree('getChildren',root.target);
		if (nodes.length>0) $("#myTree1").tree('select',nodes[0].target);

	});  //endofjquery

	
	function myTreeEvents(id,e,node){
		//补充树事件代码
		e=e.toLowerCase();
		if (id=='myTree1' && e=='onselect'){ //提取数据库数据，生成网格
			if (node && node.id!='0'){
				pmyGrid1.staticsql="select id,Description,pycode from dictionary where Type='"+node.text+"'";
				pmyGrid1.activesql=pmyGrid1.staticsql;
				pmyGrid1.rowindex=0;
				mySelectOnFocus();
				myLoadTextGridData(pmyGrid1);					
			}
		}
	}
	
	
