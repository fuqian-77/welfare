<%@ page language="java" import="java.util.*" import="java.sql.*,com.DBConn" pageEncoding="utf-8"%>
<%@ page import="com.StringUtil" import="java.io.*"%>
<%@ page import= "java.net.*"%>
<%@ page import="java.awt.Image,java.awt.image.*" %>
<%@ page import="javax.imageio.*" %>
<%@ page import="java.net.URL" %>
<%
	String strAbsPath=application.getRealPath("/");  //绝对路径
	String filename=StringUtil.getToUtf8(request.getParameter("filename"));
	String action=StringUtil.getToUtf8(request.getParameter("action"));
	String s1=filename.substring(0,filename.lastIndexOf("\\"));  //所在文件夹
	String s2=filename.substring(filename.lastIndexOf("\\")+1,filename.length()); //文件名
	//System.out.println("deletefile="+filename);
	File f=new File(s1,s2);  //在文件中删除已经存在的这个文件 
	int status=0;   
	if (f.exists()) {
		f.delete();
		status=1;  //删除成功
	}else{
		status=-1; //文件不存在
	} 
	response.getWriter().write("{success:false,status:"+status+"}");
%>
