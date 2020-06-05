<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page language="java" import="java.sql.*"%>
<%@ page import="com.DBConn" %>
<%@ page import="com.UserBean" %>
<%@ page import="com.StringUtil"%>
<%@ page import="java.io.*" %>
<%@ page import="java.io.BufferedInputStream" %>
<%@ page import="java.io.BufferedOutputStream" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="javax.xml.parsers.*,org.w3c.dom.*" %>

<%
	//创建数据库crmlab
	String database=StringUtil.filterNull(request.getParameter("database"));
	String dbname=StringUtil.filterNull(request.getParameter("dbName"));
	//String sqlfile = request.getParameter("fileName");
	//StringBuffer sqlstmt=new StringBuffer();  //sql文件大会溢出 	
	String sqlfile="";
	String tmp[];
	tmp=database.split("	");  //tab
	String hostname = tmp[0];
	String sqlpassword = tmp[1];
	String errormsg="";
	String str="";
	String path = application.getRealPath("/");	
	String realpath = path.substring(0,path.lastIndexOf("\\"));  //所在文件夹
	String databasestring=hostname+"	"+sqlpassword+"	master";
	//System.out.println(databasestring);
	DBConn con=new DBConn();
	try{
		errormsg=con.testConnection(databasestring);
	}catch (Exception e){
		errormsg=e.getMessage();
	}
	if (errormsg.equals("")){  //连接成功
		//判断数据库是否存在
		//System.out.println(databasestring);		
		DBConn db = new DBConn();
		Connection conn = db.getConnection(databasestring);
		Statement stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
		String sql="select 1 from master.dbo.sysdatabases where name='"+dbname+"'";
		ResultSet rs = stmt.executeQuery(sql);
		if (!rs.next()){
			stmt.executeUpdate("create database "+dbname);
			//改变数据库连接到新数据库
			databasestring=hostname+"	"+sqlpassword+"	"+dbname;  //tab
			//System.out.println(databasestring);	
			conn = db.getConnection(databasestring);
			stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			//运行脚本
			sqlfile="crmlab;sys_menu";
			sqlfile+=";sys_customerreceivables";
			sqlfile+=";sys_FloatToRmb";
			sqlfile+=";sys_getuserright";
			sqlfile+=";sys_receivabledetails";
			sqlfile+=";sys_receivables";			
			tmp=sqlfile.split(";");			
			for (int i=0;i<tmp.length;i++){
				File f=new File(realpath+"//system//sqlservers//"+tmp[i]+".sql");
				if (f.exists()){ 
					stmt.clearBatch();
					stmt.addBatch("use "+dbname+" ");
					sql="use "+dbname+" "; 
    	    		FileReader fileReader = new FileReader(f);    
        			BufferedReader br = new BufferedReader(fileReader);    
        			while((str = br.readLine() ) != null){  
        				str=str.trim();
        				if (!str.toLowerCase().equals("go")){ 
	        				sql+=" \n"+str;
							stmt.addBatch(" \n"+str);        	
						}		    
        			}    			
					//System.out.println(sql);
					stmt.executeUpdate(sql);
					//stmt.executeBatch();
				}	
			}		
			rs.close();
			stmt.close();
			conn.close();
		}
	}
	response.getWriter().write(errormsg);
%>
