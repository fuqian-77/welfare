//编辑树，表中包含identity列-sysid，orderno为排序列，关键字的值计算机自动生成为与sysid相同
	function myDeleteNode(pmyTree1){
		//删除目录节点ddddddddddddddddddelete
		if (pmyTree1.identityfield==undefined) pmyTree1.identityfield='sysid';
		tree1=$('#'+pmyTree1.id);
		var node=tree1.tree('getSelected');
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
					//求orderno减值的delta
					var cnodes=tree1.tree('getChildren',node.target);
					if (cnodes.length>0){
						var delta=cnodes.length+1;
						orderno=1*cnodes[cnodes.length-1].orderno;
					}else{
						delta=1;
						orderno=1*node.orderno;
					}
					//删除本身记录
					var sql="delete "+pmyTree1.tablename+" where "+pmyTree1.identityfield+"="+sysid+"\n";
					//之后记录的orderno减去delta
					sql+="update "+pmyTree1.tablename+" set orderno=orderno-"+delta+" where orderno>"+orderno+"\n";
					sql+=" and "+pmyTree1.identityfield+" in (select "+pmyTree1.identityfield+" from ("+pmyTree1.sql+") as p)";
					//删除父节点之下的所有子孙节点
					if (node.isparentflag==1){ 
						sql+="\n delete "+pmyTree1.tablename+" where ancester like '"+node.ancester+node.id+"#%'\n";
						sql+=" and "+pmyTree1.identityfield+" in (select "+pmyTree1.identityfield+" from ("+pmyTree1.sql+") as p)";
					}
					//console.log(sql);
					myRunUpdateSql('',sql);
					//找删除后聚焦的其他节点
					var newnode=myFindTreeNode(pmyTree1.id,node); //找兄弟节点
					if (newnode.nextnode!=null) var node1=newnode.nextnode;
					else if (newnode.priornode!=null) var node1=newnode.priornode;
					else{  //没有兄弟节点，将光标聚焦到父节点，并将父节点改为叶子节点
						var node1=newnode.parentnode;
						if (node1!=null){
							sql="update "+pmyTree1.tablename+" set isparentflag=0 where "+pmyTree1.keyfield+"='"+node1.id+"'\n";
							sql+=" and "+pmyTree1.identityfield+" in (select "+pmyTree1.identityfield+" from ("+pmyTree1.sql+") as p)";
							myRunUpdateSql('',sql);
							node1.isparentflag=0;
							tree1.tree('update',node1);
						}
					}
					tree1.tree('remove',node.target); //删除树中这个节点
					//修改这个树中相关结点的orderno
					n=0;
					var roots=tree1.tree('getRoots');
					for (i=0; i<roots.length; i++){
						if (1*roots[i].orderno>orderno){
							roots[i].orderno=1*root[i].orderno-delta;
							tree1.tree('update',roots[i]);
							n++;
						}
						var cnodes=tree1.tree('getChildren',roots[i].target);
						for (j=0; j<cnodes.length; j++){
							if (1*cnodes[j].orderno>orderno){
								cnodes[j].orderno=1*cnodes[j].orderno-delta;
								tree1.tree('update',cnodes[j]);
								//console.log(cnodes[j].text);
								n++;
							}
						}
					}
					//console.log('n='+n);
					//选中聚焦新节点
					if (node1!=null) tree1.tree('select',node1.target);
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
		if (node1.id=='*' || pnode==null) return pmyTree1;
		var node2=null;
		var cnodes=tree1.tree('getChildren',pnode.target);
		var bnodes=[];
		//取兄弟节点
		for (var i=0;i<cnodes.length;i++)
			if (cnodes[i].level==node1.level) bnodes.push(cnodes[i]);		
		for (var i=0;i<bnodes.length;i++){//找到前一个或后一个兄弟
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
			var orderno1=node1.orderno1;
			var orderno2=node2.orderno2;
			var cnodes1=tree1.tree('getChildren',node1.target);
			var cnodes2=tree1.tree('getChildren',node2.target);
			var n1=cnodes1.length+1;
			var n2=cnodes2.length+1;
			var id1=node1.id;
			var id2=node2.id;
			var xid1=node1.ancester+node1.id+'#%';
			var xid2=node2.ancester+node2.id+'#%';
			if (eid=='up'){
				//将node2插入到node1之前
				var xdata1=tree1.tree('getData',node1.target);
				tree1.tree('remove',node1.target);
				tree1.tree('insert',{  //插入节点
					before:node2.target,
					data:xdata1
				});
				//重新加载节点node1及其子节点，cnodes2不变
				//console.log('id1='+id1);
				node1=tree1.tree('find',id1);
				var cnodes1=tree1.tree('getChildren',node1.target);
				//修改node1结点的orderno值
				node1.orderno=1*node1.orderno-n2;
				tree1.tree('update',node1);
				//console.log(node1.orderno);
				//修改node2结点的orderno值
				node2.orderno=1*node2.orderno+n1;
				tree1.tree('update',node2);
				//修改node1子节点的orderno值
				for (i=0; i<cnodes1.length; i++){
					//console.log(cnodes1[i].id+'-c11='+cnodes1[i].orderno,n2);
					cnodes1[i].orderno=1*cnodes1[i].orderno-n2;
					tree1.tree('update',cnodes1[i]);
					//console.log(cnodes1[i].id+'-c12='+cnodes1[i].orderno);
				}
				//修改node2子节点的orderno值
				for (i=0; i<cnodes2.length; i++){
					//console.log(cnodes2[i].id+'-c21='+cnodes2[i].orderno,n1);
					cnodes2[i].orderno=1*cnodes2[i].orderno+n1;
					tree1.tree('update',cnodes2[i]);
					//console.log(cnodes2[i].id+'-c22='+cnodes2[i].orderno);
				}
				//修改数据库中orderno值	
				sql="update "+pmyTree1.tablename+" set orderno=orderno-"+n2+" where (ancester like '"+xid1+"' or "+pmyTree1.keyfield+"='"+id1+"')";
				sql+=" and "+pmyTree1.identityfield+" in (select "+pmyTree1.identityfield+" from ("+pmyTree1.sql+") as p)\n";
				sql+="update "+pmyTree1.tablename+" set orderno=orderno+"+n1+" where (ancester like '"+xid2+"' or "+pmyTree1.keyfield+"='"+id2+"')";
				sql+=" and "+pmyTree1.identityfield+" in (select "+pmyTree1.identityfield+" from ("+pmyTree1.sql+") as p)";
			}else if (eid=='down'){
				console.log(node1.text,node2.text,node1.id,node2.id,n1,n2);
				//将node2插入到node1之前
				var xdata2=tree1.tree('getData',node2.target);
				tree1.tree('remove',node2.target);
				tree1.tree('insert',{  //插入节点
					before:node1.target,
					data:xdata2
				});
				//重新加载节点node2及其子节点，cnodes1不变
				node2=tree1.tree('find',id2);
				var cnodes2=tree1.tree('getChildren',node2.target);
				//修改node1结点的orderno值
				node1.orderno=1*node1.orderno+n2;
				tree1.tree('update',node1);
				//修改node2结点的orderno值
				node2.orderno=1*node2.orderno-n1;
				tree1.tree('update',node2);
				//修改node1子节点的orderno值
				for (i=0; i<cnodes1.length; i++){
					cnodes1[i].orderno=1*cnodes1[i].orderno+n2;
					tree1.tree('update',cnodes1[i]);
				}
				//修改node2子节点的orderno值
				for (i=0; i<cnodes2.length; i++){
					cnodes2[i].orderno=1*cnodes2[i].orderno-n1;
					tree1.tree('update',cnodes2[i]);
				}
				//修改数据库中orderno值	
				sql="update "+pmyTree1.tablename+" set orderno=orderno+"+n2+" where (ancester like '"+xid1+"' or "+pmyTree1.keyfield+"='"+id1+"')";
				sql+=" and "+pmyTree1.identityfield+" in (select "+pmyTree1.identityfield+" from ("+pmyTree1.sql+") as p)\n";				
				sql+="update "+pmyTree1.tablename+" set orderno=orderno-"+n1+" where (ancester like '"+xid2+"' or "+pmyTree1.keyfield+"='"+id2+"')";
				sql+=" and "+pmyTree1.identityfield+" in (select "+pmyTree1.identityfield+" from ("+pmyTree1.sql+") as p)\n";				
			}
			var node=tree1.tree('find',id1);
			if (node) tree1.tree('select',node.target);
			console.log(sql);
			myRunUpdateSql('',sql);
		}
		return pmyTree1;
	}		
	
	function myAddTreeNode(pmyTree1,eid){
		if (pmyTree1.identityfield==undefined) pmyTree1.identityfield='sysid';
		tree1=$('#'+pmyTree1.id);
		//aaaaaa新增目录节点,eid addsub/add/insert
		var root=tree1.tree('getRoot');
		var node=tree1.tree('getSelected');
		pmyTree1.lastnode=node; //新增节点之前的那个节点
		var level=node.level;
		tree1.tree('expand',node.target);
		if (eid=='add' || eid=='insert'){  //新增兄弟节点
			var pnode=tree1.tree('getParent',node.target);
		}else{
			var pnode=node;
		}
		if (pnode!=null && pnode.id=='*') pnode.orderno=0;	
		if (eid=='insert'){
			var orderno=node.orderno;
		}else{
			var cnodes=tree1.tree('getChildren',pnode.target);
			var nodecount=cnodes.length;
			var orderno=cnodes.length+1*pnode.orderno+1;
		}
		console.log(pnode.orderno,orderno);
		//console.log(pnode);
		console.log(pnode.id);
		mySetValue('orderno',orderno);
		if (pnode!=null && pnode.id!='*'){	
			mySetValue('parentnodeid',pnode.id);
			mySetValue('level',pnode.level*1+1);
			mySetValue('ancester',pnode.ancester+pnode.id+'#');
			//console.log(pnode.ancester+pnode.id+'#');
		}else{
			mySetValue('parentnodeid','');
			mySetValue('level',1);
			mySetValue('ancester','');
		}
		if (eid=='insert'){  //插入兄弟节点
			tree1.tree('insert',{
				before:node.target,
				data:[{id:'_'+pnode.id,text:''}]
			});				
		}else{ //新增兄弟节点
			eid='add';
			tree1.tree('append',{
				parent:pnode.target,
				data:[{id:'_'+pnode.id,text:''}]
			});
		}
		var node=tree1.tree('find','_'+pnode.id);
		tree1.tree('select',node.target);
		//var scrolltop=myScrolltoNode('myTree1',node);
		//$('#myQueryTab2').scrollTop(scrolltop);
		pmyTree1.addoredit=eid;
		return pmyTree1;
	}	

	//保存目录ssssssssssssssss2
	function mySaveTreeNode(pmyTree1,eid){
		if (pmyTree1.identityfield==undefined) pmyTree1.identityfield='sysid';
		tree1=$('#'+pmyTree1.id);
		var node=$('#myTree1').tree('getSelected');
		var addoredit=eid; //myGetValue('addoredit2');
		var orderno=myGetValue('orderno');
		var sysid=myGetValue(pmyTree1.identityfield);
		var pid=myGetValue('parentnodeid');
		var tmp1=myGetValue('description');
		mySetValue('description','');  //目录表中此列没有复制
		if (addoredit=='add' || addoredit=='insert'){
			mySetValue('isparentflag',0);
			mySetValue(pmyTree1.keyfield,'');  //插入新记录之后，修改赋值，不是直接插入值
			//新增记录
			sql=myGenInsertSql('',pmyTree1.tablename);				
			console.log(1,sql);
			var result=myRunUpdateSql('',sql);
			console.log(result);
			sysid=result.identity;  //记录identity数据,不加var
			//修改其他记录orderno的值
			sql="update "+pmyTree1.tablename+" set orderno=orderno+1 where orderno>="+orderno;
			sql+=" and "+pmyTree1.identityfield+" in (select "+pmyTree1.identityfield+" from ("+pmyTree1.sql+") as p)\n";				
			sql+="update "+pmyTree1.tablename+" set "+pmyTree1.keyfield+"='"+sysid+"',orderno="+orderno+" where "+pmyTree1.identityfield+"="+sysid;
			if (pid!='*'){ //设置为父节点flag
				sql+="\n update "+pmyTree1.tablename+" set isparentflag=1 where isparentflag=0 and "+pmyTree1.keyfield+"='"+pid+"'";
				sql+=" and "+pmyTree1.identityfield+" in (select "+pmyTree1.identityfield+" from ("+pmyTree1.sql+") as p)\n";				
			}
			console.log(2,sql);
			myRunUpdateSql('',sql);
			//修改>orderno全部结点的orderno+1
			date1=myLocalTime('sec');
			n=0;
			var roots=tree1.tree('getRoots');
			for (var i=0; i<roots.length; i++){
				if (1*roots[i].orderno>=node.orderno && roots[i].id!=sysid && roots[i].id!='*'){
					roots[i].orderno=1*roots[i].orderno+1;
					tree1.tree('update',roots[i]);
					console.log(roots[i].text);
					n++;
				}
				var cnodes=tree1.tree('getChildren',roots[i].target);
				for (var j=0; j<cnodes.length; j++){
					if (1*cnodes[j].orderno>=node.orderno && cnodes[j].id!=sysid){
						cnodes[j].orderno=1*cnodes[j].orderno+1;
						tree1.tree('update',cnodes[j]);
						console.log(cnodes[j].text);
						n++;
					}
					if (cnodes[j].id==pid){
						cnodes[j].isparentflag=1;
						tree1.tree('update',cnodes[j]);
					}
				}
			}
			console.log('n='+n);
			date2=myLocalTime('sec');
			console.log(date2-date1);
		}else{
			sql=myGenUpdateSql('',pmyTree1.tablename,pmyTree1.identityfield)				
			console.log(sql);
			myRunUpdateSql('',sql);
		}
		sql="select * from ("+pmyTree1.sql+") as p where "+pmyTree1.identityfield+"="+sysid;
		console.log(3,sql);
		var rs=myRunSelectSql('',sql);
		mySetValue('orderno',orderno);
		node=mySetRecordValuebyJson(node,rs[0]);
		node.text=rs[0].text;
		node.level=rs[0].level;
		node.parentnodeid=rs[0].parentnodeid;
		node.ancester=rs[0].ancester;
		node.orderno=rs[0].orderno;
		node.isparentflag=rs[0].isparentflag;
		node.id=eval("rs[0]."+pmyTree1.keyfield);
		console.log(rs[0]);
		eval("node."+pmyTree1.identityfield+"=rs[0].sysid");
		console.log(node);
		tree1.tree('update',node);
		mySetValue('description',tmp1); //保留此值
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
		
