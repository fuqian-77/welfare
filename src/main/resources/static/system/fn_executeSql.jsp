<%@ page language="java" import="java.util.*"  import="java.sql.*,com.DBConn" pageEncoding="utf-8"%>
<%@page import="com.StringUtil"%>
<%
	//输入一条sql语句（update, insert,delete），在后台执行该sql语句
	//从前台获取数据，使用param传递.
	String database=StringUtil.filterNull(request.getParameter("database"));
	String selectSql=StringUtil.filterNull(request.getParameter("selectSql"));
	String updateSql=StringUtil.filterNull(request.getParameter("updateSql"));
	//String sqlString=new String(request.getParameter("sqlString").getBytes("ISO-8859-1"),"gbk"); 
	//获取数据库连接
	String errmsg="";
	String str="";
	String value="";
	DBConn con=new DBConn();
	Connection connection=null;
	Statement stmt= null;	
	//System.out.println("querysql="+selectSql);		
	try{
		//connection=con.getConnection(database);
		errmsg=con.testConnection(database);
	}catch (Exception e){
		errmsg="数据库连接错误！";
		errmsg=e.getMessage();
	}
	//System.out.println("error2");		
	if (errmsg.equals("")){
		connection=con.getConnection(database);
		stmt=connection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
		//updateSql=updateSql.replace("\\","\\\\");
		//selectSql=selectSql.replace("\\","\\\\");
		if (!updateSql.equals("")){
			try{
				stmt.executeUpdate(updateSql);
			}catch (SQLException e){
				//errmsg=e.printStackTrace();
				errmsg=e.getMessage();
			}
		}
		if (!selectSql.equals("")){  //执行select语句返回一行值，所有属性在其中
			String sqldim[];
			sqldim=selectSql.split("@	@");  //@tab键@分隔
			System.out.println("querysql="+selectSql);
			System.out.println("length="+sqldim.length);
			//System.out.println("sqldim1="+sqldim[0]);
			for (int i=0;i<sqldim.length;i++){
				if (!sqldim[i].equals("")){
					System.out.println("query-sqldim="+sqldim[i]);
					stmt.executeQuery(sqldim[i]);
					ResultSet rs=stmt.getResultSet();
					ResultSetMetaData rsmd=rs.getMetaData();
					int colcount=rsmd.getColumnCount();
					rs.beforeFirst();
					if (rs.next()) {
						for (int j=1;j<=colcount;j++) {
							String field=rsmd.getColumnName(j).toLowerCase();
							value=StringUtil.filterNull(rs.getString(field)).trim().replace("'","\\'");
							value=value.replace("\\","\\\\");
				    		str+=","+field+":\""+value+"\"";
						}
					}
				}
			}
		}
		//System.out.println("error--"+errmsg);
		stmt.close();
		connection.close();
	}
	if (errmsg.equals("") && !str.equals("")){			
		response.getWriter().write("{success:true,errors:''"+str+"}");
	}else{
		response.getWriter().write("{success:false,errors:\""+errmsg+"\"}");
	}	
%>