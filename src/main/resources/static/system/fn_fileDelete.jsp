<%@ page language="java" import="java.util.*" import="java.sql.*,com.DBConn" pageEncoding="utf-8"%>
<%@ page import="com.StringUtil" import="java.io.*"%>
<%@ page import= "java.net.*"%>
<%@ page import="java.awt.Image,java.awt.image.*" %>
<%@ page import="javax.imageio.*" %>
<%@ page import="java.net.URL" %>
<%
	String strAbsPath=application.getRealPath("/");  //绝对路径
	String filename=StringUtil.getToUtf8(request.getParameter("filename"));
	String s1=filename.substring(0,filename.lastIndexOf("\\"));  //所在文件夹
	String s2=filename.substring(filename.lastIndexOf("\\")+1,filename.length()); //文件名
	//System.out.println("deletefile="+filename);
	File f=new File(s1,s2);  //在文件中删除已经存在的这个文件 
	int status=0;  //标志值1：上传成功；-1：没有选择上传文件；-2:文件无内容 
	if (f.exists()) {
		f.delete();
	}else{
		status=-1;
	} 
	response.getWriter().write("{success:false,status:"+status+"}");
%>
