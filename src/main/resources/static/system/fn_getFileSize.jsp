<%@ page language="java" import="java.util.*" import="java.sql.*,com.DBConn" pageEncoding="gb2312"%>
<%@ page import="com.StringUtil" import="java.io.*"%>
<%@ page import= "java.net.*"%>
<%@ page import="java.awt.Image,java.awt.image.*" %>
<%@ page import="javax.imageio.*" %>
<%@ page import="java.net.URL" %>
<%
	//String strAbsPath=new java.io.File(application.getRealPath(request.getRequestURI())).getParent();
	//String strAbsPath=application.getRealPath(request.getRequestURI());
	String strAbsPath=application.getRealPath("/");  //����·��
	String filename=strAbsPath+StringUtil.getToUtf8(request.getParameter("filename"));
	//System.out.println("filename="+filename);
	String fileext=filename.substring(filename.lastIndexOf(".")+1,filename.length()).toLowerCase();//�ļ���չ��
	String s1=filename.substring(0,filename.lastIndexOf("\\"));  //�����ļ���
	String s2=filename.substring(filename.lastIndexOf("\\")+1,filename.length()); //�ļ���
	String filesize="filesize:'-1'";
	String imagesize="imagewidth:'0',imageheight:'0'";
	File f=new File(s1,s2);  //���ļ���ɾ���Ѿ����ڵ�����ļ�
	if (f.exists()) {
		//�����ļ����ֽڴ�С
		File file = new File(filename);
		double n=file.length()/1024.0;
		filesize="filesize:'"+n+"'";
		imagesize="imagewidth:'0',imageheight:'0'";
		if (fileext.equals("jpg") || fileext.equals("jpeg") || fileext.equals("gif") || fileext.equals("png") || fileext.equals("bmp")) {
	//��ͼƬ�ļ��ĸ߶ȺͿ��
	InputStream is = new FileInputStream(filename);
	BufferedImage buff = ImageIO.read(is);
	int a=buff.getWidth();  //�õ�ͼƬ�Ŀ��
	int b=buff.getHeight();  //�õ�ͼƬ�ĸ߶�
	is.close(); //�ر�Stream
	imagesize="imagewidth:'"+a+"',imageheight:'"+b+"'";
		}
	}		
	//System.out.println("{success:true,"+filename+"',"+filesize+","+imagesize+",fileext:'"+fileext+"'}");
	response.getWriter().write("{success:true,"+filesize+","+imagesize+",fileext:'"+fileext+"'}");
%>
