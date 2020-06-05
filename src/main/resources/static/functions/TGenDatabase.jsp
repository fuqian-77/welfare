<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page language="java" import="java.sql.*"%>
<%@ page import="com.DBConn" %>
<%@ page import="com.UserBean" %>
<%@ page import="com.StringUtil"%>
<%@ page import="java.io.*" %>
<%
	request.setCharacterEncoding("ISO-8859-1");
	String database=StringUtil.getUrlCHN(request.getParameter("database"));
	String dbname=StringUtil.filterNull(request.getParameter("dbName"));
	String sqlfile=StringUtil.filterNull(request.getParameter("sqlFile"));
	//sql脚本文件名称
	String path=application.getRealPath("/")+"system\\sqlservers\\";  //绝对路径
	String tmp[];
	tmp=database.split("	");  //tab键分隔
	String hostname = tmp[0];
	String sqlpassword = tmp[1];
	String errormsg="";
	//String realpath = path.substring(0,path.lastIndexOf("\\"));  //所在文件夹
	String databasestring=hostname+"	"+sqlpassword+"	master";
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
		}	
		//改变数据库连接到新数据库
		databasestring=hostname+"	"+sqlpassword+"	"+dbname;  //tab
		//System.out.println(databasestring);	
		conn = db.getConnection(databasestring);
		stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
		stmt.executeQuery("select * from sysobjects where xtype in ('u','p','fn','tr')");
		rs=stmt.getResultSet();
		//ResultSetMetaData rsmd=rs.getMetaData();
		rs.beforeFirst();
		while (rs.next()) {
			String str=StringUtil.filterNull(rs.getString("name")).trim().replace("'","\\'");
			System.out.println(sqlfile+"---"+str);
			if ((";"+sqlfile+";").indexOf(";"+str+";")<0){
				sqlfile+=";"+str;
			}
		}
		tmp=sqlfile.split(";");
		for (int i=0;i<tmp.length;i++){
			if (!tmp[i].equals("")){
				String str=path+tmp[i]+".sql";
				File f=new File(str);
				if (f.exists()){ 
					String xcomstr="osql -Usa -P"+sqlpassword+" -H "+hostname+" -d "+dbname+" -i \""+str+"\"";
					System.out.println(xcomstr);	
					Process p ;
					try {
						//p = Runtime.getRuntime().exec("cmd /c "+xcomstr);
						//等待刚刚执行的命令的结束
						//int exitVal = p.waitFor();  
						//System.out.println("Process exitValue: " + exitVal); 
						//while (true){  
							//if(p.waitFor() == 0)   break;
					  	//}    
					} catch (Exception e) {
					    out.println(e.toString());
					}
				}	
			}
		}			
		rs.close();
		stmt.close();
		conn.close();
	}
	response.getWriter().write(errormsg);
%>


