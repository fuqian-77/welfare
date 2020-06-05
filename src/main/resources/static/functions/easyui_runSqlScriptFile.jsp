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
	String sqlfile = request.getParameter("filename");
	String filepath = request.getParameter("filepath");
	String message="";
	UserBean userBean = (UserBean)session.getAttribute("user");
	if (userBean!=null){
		String database=userBean.getDatabase();
		DBConn db = new DBConn();
		Connection conn = db.getConnection(database);
		Statement stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
		String path = application.getRealPath("/");	
		String realpath = path.substring(0,path.lastIndexOf("\\"));  //所在文件夹
		String str="";
		String tmp[];
		tmp=sqlfile.split(";");  //多个脚本文件之间分号分隔
		for (int i=0;i<tmp.length;i++){
			String realfile= realpath+"\\"+filepath+"\\"+tmp[i]; //+".sql";
			File f=new File(realfile);
			String msg="";
			if (f.exists()){ 
		 		//System.out.println("sqlfile="+realfile);
	       		FileReader fileReader = new FileReader(f);    
	       		BufferedReader br = new BufferedReader(fileReader);
				stmt.clearBatch();
	       		while((str = br.readLine() ) != null){  
	       			str=str.trim();
	       			if (!str.toLowerCase().equals("go")){ //跳过脚本中的go语句
	       				stmt.addBatch("\n"+str);
	       			}else{
		       			//执行go之前的sql语句
		       			try{
		   					stmt.executeBatch();
	     				}catch (Exception e){
							msg+=e.getMessage();
						}	
		    			stmt.clearBatch();
	       			}
	       		}
				try{
		   			stmt.executeBatch();
	     		}catch (Exception e){
	     			if (!msg.equals("")) msg+="\n";
	     			msg+=e.getMessage();
				}
				if (msg.equals("")) message+="\n"+tmp[i]+"运行成功！";
				else message+="\n"+tmp[i]+"运行失败！"+msg;
			}else{
				message+="\n"+realfile+"文件没有找到！";
			}
		}
		stmt.close();
		conn.close();
	}	
	//System.out.println("message="+message);
	response.getWriter().write(message.trim());
%>
