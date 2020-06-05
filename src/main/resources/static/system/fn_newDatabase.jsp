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
	String action=StringUtil.filterNull(request.getParameter("action"));
	String sqlfile="";
	String errormsg="";
	String str="";
	String hostname = "localhost";;
	String sqlpassword = "sql2008";;
	String tmp[];
	tmp=database.split("	");  //tab
	if (tmp.length>1){
		hostname = tmp[0];
		sqlpassword = tmp[1];
	}
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
			//System.out.println("setup1---"+databasestring+"----"+dbname+"---"+action);
			action="setup";	
		}
		databasestring=hostname+"	"+sqlpassword+"	"+dbname;  //tab
		//System.out.println("setup2---"+databasestring+"----"+dbname);	
		conn = db.getConnection(databasestring);
		stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
		sqlfile="";
		if (action.equals("setup") || action.equals("demo") ){	//删除各表重新建立
			//改变数据库连接到新数据库
			//运行脚本
			sqlfile="crmlab;sys_menu";
			sqlfile+=";sys_customerreceivables";
			sqlfile+=";sys_FloatToRmb";
			sqlfile+=";sys_getuserright";
			sqlfile+=";sys_receivabledetails";
			sqlfile+=";sys_receivables";
			if (action.equals("demo") ){	//运行各个建表脚本
				//先提取各表脚本文件
				stmt.executeQuery("select * from sysobjects where xtype='u'");
				rs=stmt.getResultSet();
				ResultSetMetaData rsmd=rs.getMetaData();
				rs.beforeFirst();
				while (rs.next()) {
					String field=rsmd.getColumnName(1).toLowerCase();
					str=StringUtil.filterNull(rs.getString(field)).trim().replace("'","\\'");
					sqlfile+=";"+str;
				}
			}	
			//System.out.println("setup---"+databasestring+"----"+dbname+"---"+sqlfile);
			//运行实例中的各个脚本文件			
			tmp=sqlfile.split(";");			
			for (int i=0;i<tmp.length;i++){
				File f=new File(realpath+"//system//sqlservers//"+tmp[i]+".sql");
				if (f.exists()){ 
					//System.out.println("sqlfile---"+tmp[i]);				
					stmt.clearBatch();
					//stmt.addBatch("use "+dbname+" ");
    	    		FileReader fileReader = new FileReader(f);    
        			BufferedReader br = new BufferedReader(fileReader);    
        			while((str = br.readLine() ) != null){  
        				str=str.trim();
        				if (!str.toLowerCase().equals("go")){ 
							stmt.addBatch(" \n "+str);        	
						}		    
        			}    			
					stmt.executeBatch();
				}	
			}
		}
		rs.close();
		stmt.close();
		conn.close();
	}
	response.getWriter().write(errormsg);
%>
