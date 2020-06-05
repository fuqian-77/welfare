<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>editbutton</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="ext4.2/resources/css/ext-all.css">  <!-- ext系统样式 -->
	<link rel="stylesheet" type="text/css" href="system/css/mystyle.css"> <!-- ext图标文件 -->
	<script type="text/javascript" src="ext4.2/ext-all.js"></script>  <!-- Ext核心源码 -->
	<script type="text/javascript" src="ext4.2/locale/ext-locale-zh_CN.js"></script>  <!-- 国际化文件 -->
	<script type="text/javascript" src="system/myeditbutton.js"></script>
	<script type="text/javascript" src="system/fn_compilers.js"></script>
	<script type="text/javascript" src="system/a_editbutton.js"></script>
	<style type="text/css">
	</style>

  </head>
  
  <body>
  </body>
</html>
