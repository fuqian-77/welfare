<%@ page language="java" import="java.util.*" import="java.sql.*,com.DBConn" pageEncoding="utf-8"%>
<%@ page import="com.StringUtil" import="java.io.*"%>
<%@ page import= "java.net.*"%>
<%@ page import="java.awt.Image,java.awt.image.*" %>
<%@ page import="javax.imageio.*" %>
<%@ page import="java.net.URL" %>
<%
	//System.out.println("fileupload");
	//String strAbsPath=new java.io.File(application.getRealPath(request.getRequestURI())).getParent();
	//String strAbsPath=application.getRealPath(request.getRequestURI());
	String strAbsPath=application.getRealPath("/");  //绝对路径
	String filepath=StringUtil.getToUtf8(request.getParameter("filename"));
	//String targetname=StringUtil.getToUtf8(request.getParameter("targetname"));
	//String filepath=StringUtil.getUrlCHN(request.getParameter("filename"));
	String targetpath=StringUtil.getUrlCHN(request.getParameter("targetpath"));
	String targetname=StringUtil.getUrlCHN(request.getParameter("targetname"));
	
	String filename=filepath.substring(filepath.lastIndexOf("\\")+1, filepath.length());  //原始文件名
	String fileext=filename.substring(filename.lastIndexOf(".")+1,filename.length()).toLowerCase();//文件扩展名
	String targetfilename=strAbsPath+targetpath+"/"+targetname+"."+fileext;  //目标文件名
	String s1=targetfilename.substring(0,targetfilename.lastIndexOf("\\"));  //所在文件夹
	String s2=targetfilename.substring(targetfilename.lastIndexOf("\\")+1,targetfilename.length()); //文件名
	//System.out.println(filepath+","+filename+","+id+",target="+targetfilename);
	System.out.println("target="+targetfilename);
	//System.out.println("file="+s2);
	File f=new File(s1,s2);  //在文件中删除已经存在的这个文件 
	if (f.exists()) {
		f.delete();
	} 
	int status=0;  //标志值1：上传成功；-1：没有选择上传文件；-2:文件无内容 
	String errmsg="";  //错误提示信息
	if ("".equals(filepath)) { 
		errmsg="没有选择上传文件"; 
		status=-1;
	}else{	
		//上传程序开始
		char[] hchl={13,10};
		//System.out.println("id1="+id);
		//System.out.println("id2="+request.getContentType());
		//确定boundary 
		String boundary=request.getContentType().substring(30); 
		String field_boundary="--"+boundary+new String(hchl); 
		String last_boundary="--"+boundary+"--"+new String(hchl);
		ServletInputStream getdata=request.getInputStream(); 
		ByteArrayOutputStream temp=new ByteArrayOutputStream(); 
		byte[] data_line=new byte[8192]; 
		int line_byte_count=0; 
		boolean found_boundary=false; 
		while((line_byte_count=getdata.readLine(data_line,0,data_line.length))!=-1){ 
	    	if(!found_boundary){ 
	    	    line_byte_count=getdata.readLine(data_line,0,data_line.length); 
    		} 
    		String temp_str=new String(data_line,0,line_byte_count);  //前台传递的值
	    	//System.out.println("temp_str="+temp_str);
		    if(temp_str.indexOf("filename")!=-1){  //如果包含文件 
        		if(temp_str.substring(temp_str.indexOf("filename=")+9,temp_str.lastIndexOf("\"")+1).length()>2){
	        		//上传文件的名称 
		            String file_name=temp_str.substring(temp_str.lastIndexOf("\\")+1,temp_str.lastIndexOf("\""));
    		        //System.out.println(file_name);
        		    line_byte_count=getdata.readLine(data_line,0,data_line.length); 
            		line_byte_count=getdata.readLine(data_line,0,data_line.length);  //必须写两次，否则文件上传不完整
	            	FileOutputStream myfile=new FileOutputStream(targetfilename,false); //文件存放目录
    	        	boolean test=true; 
        	    	while(test) { 
            	    	line_byte_count=getdata.readLine(data_line,0,data_line.length); 
                		if(line_byte_count==-1){ 
	                	    test=false; 
	    	                break; 
    	    	        } 
        	    	    if(temp.size()==0){ 
            	    	    temp.write(data_line,0,line_byte_count); 
                		}else{ 
	                	    if(new String(data_line,0,line_byte_count).equals(field_boundary) || new String(data_line,0,line_byte_count).equals(last_boundary)){ 
    	                	    myfile.write(temp.toByteArray(),0,temp.toByteArray().length-2); 
	        	                temp.reset(); 
    	        	            myfile.close(); 
        	    	            status=1;  //上传成功
            	    	        //out.println(file_name+"上传成功了 <br>");
								errmsg=errmsg+file_name+"上传成功<br>"; 
                    	    	test=false; 
                        		found_boundary=true; 
		                    }else{ 
    		                    temp.writeTo(myfile); 
        		                temp.reset(); 
            		            temp.write(data_line,0,line_byte_count); 
                		    } 
                		} 
            		}  //while 
        		}else{ 
	            	String field_name=temp_str.substring(temp_str.indexOf("name")+6,temp_str.lastIndexOf(";")-1); 
    	        	line_byte_count=getdata.readLine(data_line,0,data_line.length); 
        	    	line_byte_count=getdata.readLine(data_line,0,data_line.length); 
            		line_byte_count=getdata.readLine(data_line,0,data_line.length); 
            		line_byte_count=getdata.readLine(data_line,0,data_line.length); 
	            	found_boundary=true;
    	        	status=-1;  //没有选择上传文件 
        	   		// out.println(field_name+"没有选择上传文件！ <br>"); 
           			// errmsg=errmsg+field_name+"没有选择上传文件<br>";
	        	} 	
    		}else{ 
        		String field_name=temp_str.substring(temp_str.indexOf("name")+6,temp_str.lastIndexOf("\"")); 
        		line_byte_count=getdata.readLine(data_line,0,data_line.length); 
	        	temp.reset(); 
    	    	boolean test=true; 
        		while(test) { 
	        	    line_byte_count=getdata.readLine(data_line,0,data_line.length); 
    	        	if(line_byte_count==-1){ 
        	        	test=false; 
            	    	break; 
            		} 
            		if(new String(data_line,0,line_byte_count).equals(field_boundary) || new String(data_line,0,line_byte_count).equals(last_boundary)){ 
	                	test=false; 
    	            	found_boundary=true; 
        	        	if(temp.size()>2){ 
		   					errmsg=errmsg+field_name+":"+new String(temp.toByteArray())+"<br>";
                		}else{
	                		status=-2; 
					   		errmsg=errmsg+field_name+"没有内容！<br>";
        	        	} 
	                	temp.reset(); 
    	        	}else{ 
	    	            temp.write(data_line,0,line_byte_count); 
    	    	    } 
	        	} 	
    		} 
		} 	
		getdata.close(); 
	}
	if (status>=0) {
		//计算文件的字节大小
		File file = new File(targetfilename);
		long n=file.length()/1024;
		String filesize="filesize:'"+n+"'";
		String imagesize="imagewidth:'0',imageheight:'0'";
		//System.out.println("fileext="+fileext);
		if (fileext.equals("jpg") || fileext.equals("jpeg") || fileext.equals("gif") || fileext.equals("png") || fileext.equals("bmp")) {
			//求图片文件的高度和宽度
			InputStream is = new FileInputStream(targetfilename);
			BufferedImage buff = ImageIO.read(is);
			int a=buff.getWidth();  //得到图片的宽度
			int b=buff.getHeight();  //得到图片的高度
			is.close(); //关闭Stream
			imagesize="imagewidth:'"+a+"',imageheight:'"+b+"'";
		}	
		//System.out.println("filesize="+filesize+",target="+targetfilename);
		System.out.println("{error:'',status:'"+targetfilename+"',"+filesize+","+imagesize+",fileext:'"+fileext+"'}");
		response.getWriter().write("{error:'',status:'"+targetfilename+"',"+filesize+","+imagesize+",fileext:'"+fileext+"'}");
	}else{
		//System.out.println("{success:failure,status:'"+errmsg+"'}");
		response.getWriter().write("{error:'1',status:'"+errmsg+"',filesize:'0',imagewidth:'0',imageheight:'0',fileext:''}");		
	}
%>
