<%@ page language="java" import="java.util.*" import="java.sql.*,com.DBConn" pageEncoding="utf-8"%>
<%@ page import="com.StringUtil" import="java.io.*"%>
<%@ page import= "java.net.*"%>
<%@ page import="java.awt.Image,java.awt.image.*" %>
<%@ page import="javax.imageio.*" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.io.*,java.util.*, javax.servlet.*" %>
<%@ page import="javax.servlet.http.*" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.disk.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>

<%
	System.out.println("fileupload");
	//String strAbsPath=new java.io.File(application.getRealPath(request.getRequestURI())).getParent();
	//String strAbsPath=application.getRealPath(request.getRequestURI());
	String strAbsPath=application.getRealPath("/");  //绝对路径
	//String sourcename=StringUtil.getToUtf8(request.getParameter("filename"));
	String sourcename=request.getParameter("filename");
	String targetpath=request.getParameter("filepath");
	String targetname=request.getParameter("targetname");
	//String filename=request.getParameter("fileToUpload");
	System.out.println("filename="+sourcename);
	System.out.println("targetname="+targetname);
	String targetfilename="";
	String filename=sourcename.substring(sourcename.lastIndexOf("\\")+1, sourcename.length());  //原始文件名
	String fileext=filename.substring(filename.lastIndexOf(".")+1,filename.length()).toLowerCase();//文件扩展名
	if ("".equals(targetname)) targetname=filename;
	else targetname=targetname+"."+fileext;
	if ("".equals(targetpath)) targetfilename=strAbsPath+targetname;  //目标文件名
	else targetfilename=strAbsPath+targetpath+"\\"+targetname;  //目标文件名
	String s1=targetfilename.substring(0,targetfilename.lastIndexOf("\\"));  //所在文件夹
	String s2=targetfilename.substring(targetfilename.lastIndexOf("\\")+1,targetfilename.length()); //文件名
	System.out.println("netfilename="+filename);
	File f=new File(s1,s2);  //在文件中删除已经存在的这个文件 
	if (f.exists()) {
		f.delete();
	} 
	int status=0;  //标志值1：上传成功；-1：没有选择上传文件；-2:文件无内容 
	String errmsg="";  //错误提示信息
	if ("".equals(sourcename)) { 
		errmsg="没有选择上传文件"; 
		status=-1;
	}else{	

	   File file ;
	   int maxFileSize = 5000 * 1024;
	   int maxMemSize = 5000 * 1024;
	   ServletContext context = pageContext.getServletContext();
	   String filePath = context.getInitParameter("file-upload");
	   // Verify the content type
	   String contentType = request.getContentType();
	    out.println("contentType : " + contentType ); 
	   if ((contentType.indexOf("multipart/form-data") >= 0)) {
	      DiskFileItemFactory factory = new DiskFileItemFactory();
	      // maximum size that will be stored in memory
	      factory.setSizeThreshold(maxMemSize);
	      // Location to save data that is larger than maxMemSize.
	      factory.setRepository(new File("c:\\temp"));
	      // Create a new file upload handler
	      ServletFileUpload upload = new ServletFileUpload(factory);
	      // maximum file size to be uploaded.
	      upload.setSizeMax( maxFileSize );
	      try{ 
	         // Parse the request to get file items.
	         List fileItems = upload.parseRequest(request);
	          out.println("Uploaded Filename: " + fileItems); 
	         // Process the uploaded file items
	         Iterator i = fileItems.iterator();
	         while ( i.hasNext () ) 
	         {
	            FileItem fi = (FileItem)i.next();
	            if ( !fi.isFormField () )	
	            {
	            // Get the uploaded file parameters
	            String fieldName = fi.getFieldName();
	            String fileName = fi.getName();
	            boolean isInMemory = fi.isInMemory();
	            long sizeInBytes = fi.getSize();
	            // Write the file
	            if( fileName.lastIndexOf("\\") >= 0 ){
	            	file = new File( filePath + 
	            	fileName.substring( fileName.lastIndexOf("\\"))) ;
	            }else{
	            	file = new File( filePath + 
	            	fileName.substring(fileName.lastIndexOf("\\")+1)) ;
	            }
	            fi.write( file ) ;
	            out.println("Uploaded Filename: " + filePath + 
	            fileName + "<br>");
	            }
	         }
	      }catch(Exception ex) {
	         System.out.println(ex);
	      }
	   }else{
	    
	   }
	}	 
	if (status>=0) {
		//计算文件的字节大小
		File file = new File(targetfilename);
		long n=file.length()/1024;
		String filesize="filesize:'"+n+"'";
		String imagesize="imagewidth:'0',imageheight:'0'";
		System.out.println("filesize="+filesize);
		if (fileext.equals("jpg") || fileext.equals("jpeg") || fileext.equals("gif") || fileext.equals("png") || fileext.equals("bmp")) {
			//计算图片文件的高度和宽度
			InputStream is = new FileInputStream(targetfilename);
			BufferedImage buff = ImageIO.read(is);
			int a=buff.getWidth();  //得到图片的宽度
			int b=buff.getHeight();  //得到图片的高度
			is.close(); //关闭Stream
			imagesize="imagewidth:'"+a+"',imageheight:'"+b+"'";
		}	
		//System.out.println("filesize="+filesize+",target="+targetfilename);
		System.out.println("{success:true,status:'"+targetfilename+"',"+filesize+","+imagesize+",fileext:'"+fileext+"'}");
		response.getWriter().write("{success:true,status:'"+targetfilename+"',"+filesize+","+imagesize+",fileext:'"+fileext+"'}");
	}else{
		//System.out.println("{success:failure,status:'"+errmsg+"'}");
		response.getWriter().write("{success:false,status:'"+errmsg+"',filesize:'0',imagewidth:'0',imageheight:'0',fileext:''}");		
	}
%>
	
	
