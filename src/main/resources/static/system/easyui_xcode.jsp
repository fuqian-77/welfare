<%@ page language="java" import="java.util.*"  import="java.sql.*,com.DBConn" pageEncoding="utf-8"%>
<%@page import="com.StringUtil"%>
<%
	//从前台取数据,使用extjs的extraParams，根据sql语句获取combo选项
	request.setCharacterEncoding("ISO-8859-1");
	String database=StringUtil.getUrlCHN(request.getParameter("database"));
	String selectsql=StringUtil.getUrlCHN(request.getParameter("selectsql"));
	if (selectsql.equals("xcode")) selectsql="select * from sys_xcodes";  //密码
	System.out.println("sql="+selectsql);
	System.out.println("sqlx="+DBConn.myFromXcode(selectsql));
	
	StringBuffer record=new StringBuffer();//创建一个stringbuffer 对象用于存放 最终返回结果
	if ("".equals(selectsql)){
		record.append("[]");
	}else{
		//数据库连接
		DBConn con=new DBConn();
		Connection connection=con.getConnection(database);
		Statement stmt=connection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
		connection.close();
	}	
	//record.append("]}");
	response.getWriter().write(record.toString());
	System.out.println("result="+record.toString());
%>