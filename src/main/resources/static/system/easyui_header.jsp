<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.DBConn" %>
<%@ page import="com.UserBean" %>
<%
	String path = request.getContextPath();
	//String path=getServletContext().getRealPath("/"); 
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	UserBean user = (UserBean)session.getAttribute("user");
	String userid="";
	String useraccount="";
	String username="";
	String userpassword="";
	String usertype="";
	String userright="";
	String userlogindate="";
	String notes="";
	String action="";
	String flag="";
	if(user == null){
		String str="<script>\n";
		//str+="$(document).ready(function(){\n";
		str+="	if(window.top!=window.self){\n";
		str+="		window.top.location.href='login.jsp';\n";
		str+="	}else{window.location.href='login.jsp';}\n";
		//str+="});\n";
		str+="</script>\n";			
		out.println(str);
		//return;
	}else{
		userid=user.getUserid();
		useraccount=user.getUseraccount();
		username=user.getUsername();
		userpassword=user.getUserpassword();
		usertype=user.getUsertype();
		userright=user.getUserright();
		userlogindate=user.getLogindate();
		notes=user.getNotes();
		flag=user.getFlag();
		action=user.getAction();		
	}	
%>

<!doctype html>
<html lang="en">
<style type="text/css">
	a:link {color:#000000; text-decoration:none}
	a:hover {color: #ff7f24; text-decoration:none}
	tablex {border-spacing:20px;} 
</style>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="jqeasyui1.4.5/themes/default/easyui.me.css">
	<link rel="stylesheet" type="text/css" href="jqeasyui1.4.5/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="system/css/icon.css">
    <script type="text/javascript" src="jqeasyui1.4.5/jquery214.min.js"></script>
    <script type="text/javascript" src="jqeasyui1.4.5/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="jqeasyui1.4.5/easyui-lang-zh_CN.js"></script>	
	<script type="text/javascript" src="javascript/easyui_functions.js"></script>
</head>
</html>