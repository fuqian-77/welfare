<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="java.sql.*"%>
<%@page import="java.io.File"%>
<%@page import="com.*"%>

<%@ page contentType="text/html;charset=utf-8"%>  
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String realpath=getServletContext().getRealPath("/"); 
	request.setCharacterEncoding("ISO-8859-1");
	String action = StringUtil.getUrlCHN(request.getParameter("action"));
	String message="";
	if (action.equals("delete")){
		String filename=StringUtil.getUrlCHN(request.getParameter("filename"));
		filename=DBConn.myFromXcode(filename);
		System.out.println("filenames="+filename);
		String deletefile;
		String tmp[];
		tmp=filename.split("	");  //tab键分割
		for (int i=0;i<tmp.length;i++){
			if (!tmp[i].equals("")){
				File file1 = new File(realpath+tmp[i]);
				System.out.println("deletedfilename1="+realpath+tmp[i]);
				if (file1.exists()) {
					System.out.println("deletedfilename2="+realpath+tmp[i]);
					file1.delete();
				}
			}
		}
	}else if (action.equals("exist")||action.equals("exists")){
		String filename=StringUtil.getUrlCHN(request.getParameter("filename"));
		filename=DBConn.myFromXcode(filename);
		File file1 = new File(realpath+filename);
		if (file1.exists()) message="1";
		else  message="0";
	}else if (action.equals("download")){
		String resourceUrl = request.getParameter("resourceUrl");
		String fileName = resourceUrl.substring(resourceUrl.lastIndexOf("\\")+1).substring(resourceUrl.lastIndexOf("/")+1); 
		//System.out.println(fileName);
		if(resourceUrl != null && !resourceUrl.equals("")){
			boolean flag = FileEngine.fileDownload(fileName,resourceUrl,this,request,response,out,pageContext);
			System.out.println(flag);
		}
	}else if (action.equals("downloadlist")){
		String filename=StringUtil.getUrlCHN(request.getParameter("filename"));
		String filetitle=StringUtil.getUrlCHN(request.getParameter("filetitle"));
		filename=DBConn.myFromXcode(filename);
		filetitle=DBConn.myFromXcode(filetitle);
		String targetfile=StringUtil.getUrlCHN(request.getParameter("targetfile"));
		String newfilename=DBConn.myFromXcode(targetfile)+".zip";
		//String filename = java.net.URLDecoder.decode(request.getParameter("filename"), "UTF-8");
		if (newfilename != null && !newfilename.equals("") && filename != null && !filename.equals("")){
			String[] fileUrlArr = filename.split("	"); //tab
			List<File> fileList = new ArrayList<File>();
			String fileSaveDir = this.getServletContext().getRealPath("");		//获得根目录
			for(String fileUrl : fileUrlArr){
				fileList.add(new File(fileSaveDir + fileUrl));	
			}
			String[] fileNameArr = filetitle.split("	");	//tab	//不传子文件名，则采用默认文件名
			//for (int i=0;i<fileNameArr.length;i++)	System.out.println("filetitle="+fileNameArr[i]);
			//FileEngine.downLoadFiles(fileList,newfilename,this,request,response);
			FileEngine.downLoadFiles(fileList,newfilename,fileNameArr,this,request,response);
			//response.getWriter().write("{\"status\":1,\"info\":\"下载成功\"}");
		}else{
			//response.getWriter().write("{\"status\":0,\"info\":\"下载失败，参数不完整\"}");
		}
		//response.getWriter().write("{\"status\":0,\"info\":\"下载失败，参数不完整\"}");
	}
	response.getWriter().write(message);
%>
