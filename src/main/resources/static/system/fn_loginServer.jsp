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
	/*
	String dbname=StringUtil.filterNull(request.getParameter("dbName"));
	String loginstring=StringUtil.filterNull(request.getParameter("loginString"));
	String action = request.getParameter("action");
	String tmp[];
	tmp=loginstring.split("	");  //tab键
	String hostname = tmp[0];
	String sqlpassword = tmp[1];
	String unittitle = tmp[2];
	String unitno = tmp[3];
	String account = tmp[4];
	String password = tmp[5];
	String logindate = tmp[6];
	*/
	String account=StringUtil.filterNull(request.getParameter("account"));
	String password=StringUtil.filterNull(request.getParameter("password"));
	String unittitle=StringUtil.filterNull(request.getParameter("unittitle"));
	String unitno=StringUtil.filterNull(request.getParameter("unitno"));
	String hostname=StringUtil.filterNull(request.getParameter("hostname"));
	String sqlpassword=StringUtil.filterNull(request.getParameter("sqlpassword"));
	String logindate=StringUtil.filterNull(request.getParameter("logindate"));
	String dbname=StringUtil.filterNull(request.getParameter("dbname"));
	String action=StringUtil.filterNull(request.getParameter("action"));
	String message=StringUtil.filterNull(request.getParameter("message"));
	int userid=0;
	String notes="";
	String userright="";
	String username="";
	String pwd="";
	UserBean user = null;
	String errormsg="";
	//String str="";
	//String path = application.getRealPath("/");	
	//String realpath = path.substring(0,path.lastIndexOf("\\"));  //所在文件夹
	//String sqlfile = "system//sqlservers//sqlserver.xml";
	//System.out.println("startserver="+database+","+hostname+","+account+","+unitno+","+logindate+",");	
	//读sqlserver文件获取sql登录密码
	//选择master数据库，判断数据库连接是否成功
	String databasestring=hostname+"	"+sqlpassword+"	master";
	DBConn con=new DBConn();
	try{
		errormsg=con.testConnection(databasestring);
	}catch (Exception e){
		errormsg=e.getMessage();
	}
	if (errormsg.equals("")){  //连接成功
		//System.out.println(databasestring);	
		String sql="select 1 from master.dbo.sysdatabases where name='"+dbname+"'";
		DBConn db = new DBConn();
		Connection conn = db.getConnection(databasestring);
		Statement stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
		ResultSet rs = stmt.executeQuery(sql);
		if (!rs.next()){
			errormsg="账套<font color='blue'><b>【"+unittitle+"】</b></font><br>对应的数据库<font color='blue'><b>【"+dbname+"】</b></font>不存在！<br>请先在系统管理模块执行数据库初始化！";
		}else{
			databasestring=hostname+'	'+sqlpassword+'	'+dbname;
			conn = db.getConnection(databasestring);
			stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			if (action.equals("admin")){  //系统管理员登陆
				rs = stmt.executeQuery("select * from sys_user where xtype='s' and account = \'" + account.trim()+ "\'");
			}else{
				rs = stmt.executeQuery("select * from sys_user where account = \'" + account.trim()+ "\'");
			}
			if (rs.next()){
				userid=rs.getInt("userid");
				pwd=rs.getString("pwd");
				username=rs.getString("username");
				notes=rs.getString("notes");
				if (password.trim().equals(pwd)){  //密码正确
					//取权限
					sql="select '#'+lower(RTRIM(b.menuurl))+'#@'+str(a.saveflag,1)+a.rightflag+'@'";
					sql+=" as userright from sys_userright a ";
					sql+=" join sys_menu b on a.menuid=b.menuid ";
					sql+=" where account='"+ account.trim()+"'";
					rs = stmt.executeQuery(sql);
					userright="";
					while(rs.next()){
						userright+=","+rs.getString("userright"); 
					}
					//System.out.println("userright:"+userright);
					//System.out.println("errors="+errormsg);
					System.out.println(username+" login");
					//session.setMaxInactiveInterval(15);//设置session有效时长为15秒
					user = new UserBean(
						userid, 
						account, 
						username, 
						password, 
						unittitle, 
						unitno, 
						notes, 
						userright, 
						hostname,
						sqlpassword, 
						logindate, 
						databasestring, 
						action,
						message
					);
					session.setAttribute("user",user);
				}else{	
					errormsg="2"; //password错误
				}	
			}else{
				errormsg="1"; //account不能存在
			}
		}		
		rs.close();
		stmt.close();
		conn.close();
	}
	response.getWriter().write(errormsg);
%>
