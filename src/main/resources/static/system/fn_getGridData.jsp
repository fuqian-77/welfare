<%@ page language="java" import="java.util.*"  import="java.sql.*,com.DBConn" pageEncoding="utf-8"%>
<%@page import="com.StringUtil"%>
<%
	//这里不用双引号。如有额问题，通改。
	//如果要返回每列的宽度，可以将值放在data之后的第一行，其他行值不变。
	//从前台url取数据，使用params
	//System.out.println("----fn_getgriddata");
	request.setCharacterEncoding("ISO-8859-1");
	String database=StringUtil.getUrlCHN(request.getParameter("database"));
	String xsqlString=StringUtil.getUrlCHN(request.getParameter("sqlString"));
	String xkeyField=StringUtil.getUrlCHN(request.getParameter("keyField"));
	String xsortField=StringUtil.getUrlCHN(request.getParameter("sortField"));
	int xlimit=Integer.parseInt(request.getParameter("limit")); //每页行数，等于0表示返回全部
	int xstart=Integer.parseInt(request.getParameter("start")); //每页行数，等于0表示返回全部
	String summaryFields=StringUtil.getUrlCHN(request.getParameter("summaryFields")); //汇总列，用;分隔
	xsqlString=xsqlString.trim();
	//System.out.println("xsqlString="+xsqlString);	

	//数据库连接
	//System.out.println("sql="+xsqlString+"--"+xstart+"--"+xlimit);
	DBConn con=new DBConn();
	Connection connection=con.getConnection(database);
	Statement stmt=connection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
	//StringBuffer sqlstmt=new StringBuffer(); //创建一个stringbuffer对象用于存放查询语句
	ResultSetMetaData rsmd=null;
	ResultSet rs=null;
	if (xsortField.equals("")) xsortField=xkeyField;
	String xtotalfiddim[]=new String[100];
	double ytotalfiddim[]=new double[100];
	/*
	xtotalfiddim=summaryFields.split(";");
	String xsummaryFields="";
	for (int i=0;i<xtotalfiddim.length;i++){
		if (i>0) xsummaryFields+=",";
		xsummaryFields+="sum("+xtotalfiddim[i]+") as '"+xtotalfiddim[i]+"'";
		ytotalfiddim[i]=0; 
	}
	*/
	//计算总行数
	String xcountSql="";
	String xquerySql="";
	String xtotalSql="";
	String xwithSql="";
	String xwithtmp="";
	//对带with as的SQL语句进行处理，要求前台sql语句中不能使用query_tmp名称，最后一条查询语句为select * from ?语句。
	int xx1=xsqlString.indexOf(";with ");
	int xx2=xsqlString.indexOf("with ");
	int xx3=xsqlString.indexOf(" as ");
	if ((xx1>=0 || xx2>=0)&&(xx3>=0)){  //xsqlString.substring(0,5).toLowerCase().equals("with ")||xsqlString.substring(0,6).toLowerCase().equals(";with ")){
		int x1=xsqlString.lastIndexOf("select");
		int x2=xsqlString.lastIndexOf(" from ");
		//提取with ?? as中的临时表名称
		xwithtmp=xsqlString.substring(xx2+5,xx3-1);
		if (x1>0 && x2>x1) {
		System.out.println("withtmp="+xwithtmp+","+summaryFields);
			xcountSql=xsqlString.substring(0,x1-1)+" select count(*) as n "+xsqlString.substring(x2+1)+"\n";
			xwithSql=xsqlString.substring(0,x1-1)+",query_tmp as ("+xsqlString.substring(x1)+")\n";
			if (xlimit==0){ 		
				xquerySql="select top 100 percent * from query_tmp where "+xkeyField+" not in \n";
				xtotalSql="select top 100 percent "+xkeyField+" from query_tmp where "+xkeyField+" not in \n";
			}else{
				xquerySql="select top "+xlimit+" * from query_tmp where "+xkeyField+" not in";
				xtotalSql="select top "+xlimit+" "+xkeyField+" from query_tmp where "+xkeyField+" not in";
			}
			xquerySql+="(select top "+(xstart)+" "+xkeyField+" from query_tmp order by "+xsortField+")\n";
			xquerySql+=" order by "+xsortField;
			xtotalSql+="(select top "+(xstart)+" "+xkeyField+" from query_tmp order by "+xsortField+")\n";
			xtotalSql+=" order by "+xsortField;
			xtotalSql=xwithSql+" select "+summaryFields+" from  query_tmp where "+xkeyField+" not in ("+xtotalSql+") \n";
			xquerySql=xwithSql+xquerySql;
			System.out.println("xtotalsql1="+xtotalSql);	
		}
	}else{	
		xcountSql="select count(*) as n from ("+xsqlString+") as p \n";
		xwithSql="with query_tmp as ("+xsqlString+")\n";
		if (xlimit==0){ 		
			xquerySql="select top 100 percent * from query_tmp where "+xkeyField+" not in \n";
			xtotalSql="select top 100 percent "+xkeyField+" from query_tmp where "+xkeyField+" not in \n";
		}else{
			xquerySql="select top "+xlimit+" * from query_tmp where "+xkeyField+" not in \n";
			xtotalSql="select top "+xlimit+" "+xkeyField+" from query_tmp where "+xkeyField+" not in \n";
		}	
		xquerySql+="(select top "+(xstart)+" "+xkeyField+" from query_tmp order by "+xsortField+")\n";
		xquerySql+=" order by "+xsortField;
		xtotalSql+="(select top "+(xstart)+" "+xkeyField+" from query_tmp order by "+xsortField+")\n";
		xtotalSql+=" order by "+xsortField;
		xtotalSql=xwithSql+" select "+summaryFields+" from query_tmp where "+xkeyField+" not in ("+xtotalSql+") \n";
		System.out.println("xtotalsql2="+xtotalSql);
		xquerySql=xwithSql+xquerySql;
	}
	//System.out.println("xcountsql="+xcountSql);	
	//System.out.println("xquerysql="+xquerySql);	
	stmt.executeQuery(xcountSql);
	rs=stmt.getResultSet();
	rs.last();
	int rowCount=rs.getInt(1);
	if (xstart<0) { 
		xstart=0; 
	}	
	if (xlimit==0) { 
		xlimit=rowCount;
	}	
	//求汇总
	int xtotalcount=0;
	if (!summaryFields.equals("")){
		System.out.println("xtotalsql3="+xtotalSql);	
		stmt.executeQuery(xtotalSql);
		rs=stmt.getResultSet();
		rs.first();
		rsmd=rs.getMetaData();
		xtotalcount=rsmd.getColumnCount();
		for (int i=1;i<=xtotalcount;i++){
			xtotalfiddim[i]=rsmd.getColumnName(i).toLowerCase();
			ytotalfiddim[i]=rs.getDouble(xtotalfiddim[i]);
		}
	}
	//System.out.println("xtotalcount1="+xtotalcount);	
	stmt.executeQuery(xquerySql);
	ResultSet grid_rs=stmt.getResultSet();
	grid_rs.beforeFirst();
	rsmd=grid_rs.getMetaData();
	int xcolcount=rsmd.getColumnCount();
	//System.out.println("xtotal="+ytotalfiddim[1]);	
	//设置分页
	//查找关键字所在的行号
	int i=1;
	int j=0;
	//int xwidth[]=new int[xcolcount+4];  //定义整型数组	
	//for (j=1;j<=xcolcount;j++) xwidth[j]=0;
	//开始取记录    
	String field="";
	String value="";
	String str="";
	String result=""; //用于存放 最终返回结果
	String resultx="''"; //用于存放最终返回的关键字值，放在第一行
	if(rowCount>0){ //判断结果集是否含有数据
		//result=("{totalCount:\""+rowCount+"\",data:[");
		result="";
		while(grid_rs.next()) { //遍历记录进行数据组合
			resultx+=",'"+StringUtil.filterNull(grid_rs.getString(xkeyField)).trim()+"'";
			if (i>1) result+=",";
			str="sysrowno:'"+(xstart+i)+"'";  //记录行号
			for (j=1;j<=xcolcount;j++) {
				field=rsmd.getColumnName(j).toLowerCase();
		    	if (j>0) str=str+",";
		    	value=StringUtil.filterNull(grid_rs.getString(field)).trim();
		    	//value=value.replace("'","\\'");
		    	value=value.replace("\\","\\\\");  //无法返回斜杠
		    	str=str+field+":\""+value+"\"";
            }
            if (i==1) result+=""+str+"}";
            else result+="{"+str+"}";
			i++;
		}
		str="";
		if (!summaryFields.equals("")){
			for (int k=1;k<=xtotalcount;k++){
				if (k>1) str+=",";
				str+="\"sum_"+xtotalfiddim[k]+"\":\""+ytotalfiddim[k]+"\"";
			}
			result="{totalCount:\""+rowCount+"\",data:[{"+str+",sys_keyvalues:\""+resultx+"\","+result;
		}else{
			result="{totalCount:\""+rowCount+"\",data:[{"+"sys_keyvalues:\""+resultx+"\","+result;
		}
		result+="]}";
	}else{
		result+="{totalCount:0,data:[ ]}";
	}
	//System.out.println("gridresult="+result);
	response.getWriter().write(result);
	grid_rs.close();
	stmt.close();
	connection.close();
%>