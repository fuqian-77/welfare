<%@ page language="java" import="java.util.*"  import="java.sql.*,com.DBConn" pageEncoding="utf-8"%>
<%@page import="com.StringUtil"%>
<%
	//System.out.println("911");
	String strAbsPath=application.getRealPath("/");  //绝对路径
	//strAbsPath=strAbsPath.substring(0,strAbsPath.lastIndexOf("\\emlab\\"))+"\\emlab\\";
	System.out.println("path="+strAbsPath);
	
		//从前台url取数据，使用params
   	//String sqlString=StringUtil.filterNull(request.getParameter("sqlString"));
   	//String sqlString=request.getParameter("sqlString");//列过滤|新增定位所需
	String xactionType=StringUtil.getUrlCHN(request.getParameter("actionType"));
	String xfileFolders=StringUtil.getUrlCHN(request.getParameter("fileFolders"));
	xactionType=xactionType.toLowerCase();
	String[] xfolders=xfileFolders.split(";");
	//System.out.print("l="+xfolders.length);
	int i=0;
	int j=0;
	if (xactionType.equals("create")) {
		for (i=0;i<xfolders.length;i++) {
	//String filePath= "d:\aaa\ee\ ";
	String[] filePath=xfolders[i].split("//");
	//System.out.println(xfolders[i]);
	//String dirPath=filePath[0].toString()+"";
	String dirPath="";
	for (j=0;j<filePath.length;j++) { 
		dirPath=dirPath+"\\"+filePath[j].toString(); //中文转换
		String absDirPath=strAbsPath+dirPath;
		System.out.println("dir="+absDirPath);
		java.io.File myFilePath=new java.io.File(absDirPath);
		if(!myFilePath.exists())  {
			myFilePath.mkdir();  //创建文件夹
		}
	}
		}		
	}
%>