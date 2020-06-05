//编辑树，表中包含identity列-sysid，orderno为排序列，关键字的值计算机自动生成为与sysid相同
	function myUpdateNode(tree1,field,value){
		var roots=tree1.tree('getRoots');
		for (var i=0; i<roots.length; i++){
			var cnodes=tree1.tree('getChildren',roots[i].target);
			eval('roots[i].'+field+'="'+value+'";');
			tree1.tree('update',roots[i]);
			for (var j=0; j<cnodes.length; j++){
				eval('cnodes[j].'+field+'="'+value+'";');
				tree1.tree('update',cnodes[j]);
			}
		}
		return tree1;
	}

	function mySaveNodes(pmyTree1){
		date1=myLocalTime('sec');
		if (pmyTree1.identityfield==undefined) pmyTree1.identityfield='sysid';
		fieldset=myEditableFields(pmyTree1.tablename);
		var n=1;
		var sql='delete '+pmyTree1.tablename;
		sql+=" where "+pmyTree1.identityfield+" in (select "+pmyTree1.identityfield+" from ("+pmyTree1.sql+") as p)\n";
		myRunUpdateSql('',sql);
		sql='';
		sqlx=fieldset[0].insertsql+" \n";
		var roots=$('#'+pmyTree1.id).tree('getRoots');
		for (var i=0; i<roots.length; i++){
			var cnodes=$('#'+pmyTree1.id).tree('getChildren',roots[i].target);
			if (roots[i].id!='*' && roots[i].id!=''){
				eval("roots[i]."+pmyTree1.keyfield+"=n;");
				roots[i].orderno=n;
				roots[i].id=n;
				roots[i].level=1;
				roots[i].parentnodeid='';
				roots[i].ancester='';
				if (cnodes.length>0) roots[i].isparentflag=1;
				else roots[i].isparentflag=0;
				$('#'+pmyTree1.id).tree('update',roots[i]);
				str=fieldset[0].insertsql+'values('+mySqlFromRecord(fieldset,roots[i]).insertsql+')';  //tab
				//myRunUpdateSql('',str);
				sql+='	'+str+' \n';
				if (n>1) sqlx+='\n union all ';
				sqlx+='select '+mySqlFromRecord(fieldset,roots[i]).insertsql+' ';
				if (n==1) pmyTree1.total=roots[i].total;
				n++;
			}else{
				roots[i].level=0;
				roots[i].parentnodeid='';
				roots[i].ancester='';
				$('#'+pmyTree1.id).tree('update',roots[i]);
				//alert('root');
			}
			for (var j=0; j<cnodes.length; j++){
				pnode=$('#'+pmyTree1.id).tree('getParent',cnodes[j].target);
				if (pnode.id=='*') pid='';
				else pid=pnode.id
				if ($('#'+pmyTree1.id).tree('isLeaf',cnodes[j].target)) cnodes[j].isparentflag=0;
				else cnodes[j].isparentflag=1;
				eval("cnodes[j]."+pmyTree1.keyfield+"=n;");
				cnodes[j].id=n;
				cnodes[j].orderno=n;
				cnodes[j].level=1*pnode.level+1;
				cnodes[j].parentnodeid=pid;
				if (pnode.ancester!='') cnodes[j].ancester=pnode.ancester+'';
				else cnodes[j].ancester='';
				if (pid!='') cnodes[j].ancester+=pid+'#';
				$('#'+pmyTree1.id).tree('update',cnodes[j]);
				//if (n==1) pmyTree1.total=cnodes[i].total;
				str=fieldset[0].insertsql+'values('+mySqlFromRecord(fieldset,cnodes[j]).insertsql+')'; //tab
				//myRunUpdateSql('',str);
				sql+='	'+str+' \n';
				if (n>1) sqlx+='\n union all ';
				sqlx+='select '+mySqlFromRecord(fieldset,cnodes[j]).insertsql+'	';
				n++;
			}
		}
		pmyTree1.lastnode=null;
		
		//var sql='delete '+pmyTree1.tablename+" where "+pmyTree1.identityfield+" in (select "+pmyTree1.identityfield+" from ("+pmyTree1.sql+") as p)\n";
		myRunUpdateSql('',sql);
		//myRunUpdateSql('',sqlx);
		//console.log(sqlx);
		date2=myLocalTime('sec');
		console.log(date2-date1);
		myMessageShow('数据已经保存成功！');
		
		return pmyTree1;
	}

	function myDeleteNode(pmyTree1){
		//删除目录节点ddddddddddddddddddelete
		if (pmyTree1.identityfield==undefined) pmyTree1.identityfield='sysid';
		tree1=$('#'+pmyTree1.id);
		var node=$('#'+pmyTree1.id).tree('getSelected');
		pmyTree1.lastnode=null;
		if (node==null && node.id=='*') return pmyTree1;
		//sysid=node.sysid;
		sysid=eval("node."+pmyTree1.identityfield);
		var orderno=node.orderno;
		var msg='['+node.text+']@n@n是否确定删除';
		if (node.isparentflag==1) msg+='这级目录？';
		else msg+='这个目录？';
		$.messager.confirm({
			title:'系统提示',
			msg:myConfirmMessage(msg),
			width:350,
			//height:180,
			fn:function(r){
				if (r){
					//找删除后聚焦的其他节点
					var newnode=myFindTreeNode(pmyTree1.id,node); //找兄弟节点
					if (newnode.nextnode!=null) var node1=newnode.nextnode;
					else if (newnode.priornode!=null) var node1=newnode.priornode;
					else{  //没有兄弟节点，将光标聚焦到父节点，并将父节点改为叶子节点
						var node1=newnode.parentnode;
						if (node1!=null){
							node1.isparentflag=0;
							$('#'+pmyTree1.id).tree('update',node1);
						}
					}
					$('#'+pmyTree1.id).tree('remove',node.target); //删除树中这个节点
					//选中聚焦新节点
					if (node1!=null) $('#'+pmyTree1.id).tree('select',node1.target);
					//myScrolltoNode('myTree1',node1);
				}	
			}
		});
		return pmyTree1;
	}
		
	//移动节点mmmmmmmmmmmmmmove
	function myMoveTreeNode(pmyTree1,eid){
		//eid==up/down
		if (pmyTree1.identityfield==undefined) pmyTree1.identityfield='sysid';
		tree1=$('#'+pmyTree1.id);
		pmyTree1.lastnode=null;
		var node1=tree1.tree('getSelected');
		var pnode=tree1.tree('getParent',node1.target);  //父节点
		console.log(pnode);
		if (node1.id=='*' || pnode==null) return pmyTree1;
		var node2=null;
		var cnodes=tree1.tree('getChildren',pnode.target);
		console.log(cnodes);
		var bnodes=[];
		//取兄弟节点
		for (var i=0;i<cnodes.length;i++){
			if (cnodes[i].level==node1.level) bnodes.push(cnodes[i]);
		}
		console.log(bnodes);
		for (var i=0;i<bnodes.length;i++){//找到前一个或后一个兄弟
			console.log(bnodes[i].id,node1.id);
			if (bnodes[i].id==node1.id){
				if (i>0 && eid=='up'){
					node2=bnodes[i-1];		
				}else if (i<bnodes.length-1 && eid=='down'){
					node2=bnodes[i+1];		
				}
				break;
			}
		}
		if (node2!=null){ //找到兄弟节点
			var id1=node1.id;
			var id2=node2.id;
			var cnodes1=tree1.tree('getChildren',node1.target);
			var cnodes2=tree1.tree('getChildren',node2.target);
			if (eid=='up'){
				//将node2插入到node1之前
				var xdata1=tree1.tree('getData',node1.target);
				tree1.tree('remove',node1.target);
				tree1.tree('insert',{  //插入节点
					before:node2.target,
					data:xdata1
				});
				//重新加载节点node1及其子节点，cnodes2不变
				//node1=tree1.tree('find',id1);
				//var cnodes1=tree1.tree('getChildren',node1.target);
			}else if (eid=='down'){
				//将node2插入到node1之前
				var xdata2=tree1.tree('getData',node2.target);
				tree1.tree('remove',node2.target);
				tree1.tree('insert',{  //插入节点
					before:node1.target,
					data:xdata2
				});
				//重新加载节点node2及其子节点，cnodes1不变
				//node2=tree1.tree('find',id2);
				//var cnodes2=tree1.tree('getChildren',node2.target);
			}
			var node=tree1.tree('find',id1);
			if (node) tree1.tree('select',node.target);
		}
		return pmyTree1;
	}		
	
	function myAddTreeNode(pmyTree1,eid){
		if (pmyTree1.identityfield==undefined) pmyTree1.identityfield='sysid';
		if (pmyTree1.totalnodes==undefined) pmyTree1.totalnodes=1;
		tree1=$('#'+pmyTree1.id);
		//aaaaaa新增目录节点,eid addsub/add/insert
		var root=tree1.tree('getRoot');
		var node=tree1.tree('getSelected');
		pmyTree1.lastnode=node; //新增节点之前的那个节点
		tree1.tree('expand',node.target);
		if (eid=='add' || eid=='insert'){  //新增兄弟节点
			var pnode=tree1.tree('getParent',node.target);
		}else{
			var pnode=node;
		}
		if (pnode==null || pnode.id=='*') level=1;
		else level=1*pnode.level+1;
		if (eid=='insert'){  //插入兄弟节点
			tree1.tree('insert',{
				before:node.target,
				data:[{id:'_'+pmyTree1.totalnodes, text:'', level:level}]
			});				
		}else{ //新增兄弟节点
			eid='add';
			tree1.tree('append',{
				parent:pnode.target,
				data:[{id:'_'+pmyTree1.totalnodes, text:'', level:level}]
			});
		}
		var node=tree1.tree('find','_'+pmyTree1.totalnodes);
		tree1.tree('select',node.target);
		//var scrolltop=myScrolltoNode('myTree1',node);
		//$('#myQueryTab2').scrollTop(scrolltop);
		pmyTree1.addoredit=eid;
		pmyTree1.totalnodes++;
		return pmyTree1;
	}	

	function myRemoveBlankTreeNode(pmyTree1,eid){
		if (pmyTree1.identityfield==undefined) pmyTree1.identityfield='sysid';
		tree1=$('#'+pmyTree1.id);
		if (pmyTree1.selectednode!=null && pmyTree1.selectednode.text==''){
			pnode=tree1.tree('getParent',pmyTree1.selectednode.target);
			tree1.tree('remove',pmyTree1.selectednode.target);
			if (eid!='edit' && pmyTree1.lastnode!=null){
				tree1.tree('select',pmyTree1.lastnode.target);
			}else if (pnode!=null){
				tree1.tree('select',pnode.target);
			}
		}
		return pmyTree1;
	}	
		
