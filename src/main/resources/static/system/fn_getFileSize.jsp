<%@ page language="java" import="java.util.*" import="java.sql.*,com.DBConn" pageEncoding="gb2312"%>
<%@ page import="com.StringUtil" import="java.io.*"%>
<%@ page import= "java.net.*"%>
<%@ page import="java.awt.Image,java.awt.image.*" %>
<%@ page import="javax.imageio.*" %>
<%@ page import="java.net.URL" %>
<%
	//String strAbsPath=new java.io.File(application.getRealPath(request.getRequestURI())).getParent();
	//String strAbsPath=application.getRealPath(request.getRequestURI());
	String strAbsPath=application.getRealPath("/");  //绝对路径
	String filename=strAbsPath+StringUtil.getToUtf8(request.getParameter("filename"));
	//System.out.println("filename="+filename);
	String fileext=filename.substring(filename.lastIndexOf(".")+1,filename.length()).toLowerCase();//文件扩展名
	String s1=filename.substring(0,filename.lastIndexOf("\\"));  //所在文件夹
	String s2=filename.substring(filename.lastIndexOf("\\")+1,filename.length()); //文件名
	String filesize="filesize:'-1'";
	String imagesize="imagewidth:'0',imageheight:'0'";
	File f=new File(s1,s2);  //在文件中删除已经存在的这个文件
	if (f.exists()) {
		//计算文件的字节大小
		File file = new File(filename);
		double n=file.length()/1024.0;
		filesize="filesize:'"+n+"'";
		imagesize="imagewidth:'0',imageheight:'0'";
		if (fileext.equals("jpg") || fileext.equals("jpeg") || fileext.equals("gif") || fileext.equals("png") || fileext.equals("bmp")) {
	//求图片文件的高度和宽度
	InputStream is = new FileInputStream(filename);
	BufferedImage buff = ImageIO.read(is);
	int a=buff.getWidth();  //得到图片的宽度
	int b=buff.getHeight();  //得到图片的高度
	is.close(); //关闭Stream
	imagesize="imagewidth:'"+a+"',imageheight:'"+b+"'";
		}
	}		
	//System.out.println("{success:true,"+filename+"',"+filesize+","+imagesize+",fileext:'"+fileext+"'}");
	response.getWriter().write("{success:true,"+filesize+","+imagesize+",fileext:'"+fileext+"'}");
%>
