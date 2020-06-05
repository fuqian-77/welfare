<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="java.io.*"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.zip.ZipEntry"%>
<%@page import="java.util.zip.ZipOutputStream"%>
<%@page import="javax.servlet.http.HttpServlet"%>
<%@page import="javax.servlet.http.HttpServletRequest"%>
<%@page import="javax.servlet.http.HttpServletResponse"%>
<%@page import="javax.servlet.jsp.JspWriter"%>
<%@page import="javax.servlet.jsp.PageContext"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
//接收参数，解码
String newFileName = request.getParameter("fileName");
newFileName = java.net.URLDecoder.decode(newFileName, "UTF-8") + ".zip";
String fileUrlList = java.net.URLDecoder.decode(request.getParameter("fileUrlList"), "UTF-8");
String fileNameStr = java.net.URLDecoder.decode(request.getParameter("fileNameList"), "UTF-8");
//System.out.println(fileUrlList);
//System.out.println(fileNameStr);

if(newFileName != null && !newFileName.equals("") && fileUrlList != null && !fileUrlList.equals("")){
	String[] fileUrlArr = fileUrlList.split("\\|");
	//String[] fileUrlArr = fileUrlList.split("	");  //tab
	List<File> fileList = new ArrayList<File>();
	String fileSaveDir = this.getServletContext().getRealPath("");		//获得根目录
	for(String fileUrl : fileUrlArr){
		//System.out.println(fileSaveDir + fileUrl);
		fileList.add(new File(fileSaveDir + fileUrl));	
	}
	String[] fileNameArr = fileNameStr.split("\\|");		//不传子文件名，则采用默认文件名
	//String[] fileNameArr = fileNameStr.split("	");		//tab 不传子文件名，则采用默认文件名
	downLoadFiles(fileList,newFileName,fileNameArr,this,request,response);
	//response.getWriter().write("{\"status\":1,\"info\":\"下载成功\"}");
}else{
	//response.getWriter().write("{\"status\":0,\"info\":\"下载失败，参数不完整\"}");
}
	//response.getWriter().write("{\"status\":0,\"info\":\"下载失败，参数不完整\"}");
%>

<%!		//静态方法
/** ******************* 批量文件打包下载： begin ******************** */
	// 文件打包下载,files必须是全路径,不存在则跳过该文件，传自定义文件名的情形
	public static HttpServletResponse downLoadFiles(List<File> files,
			String newFileName, String[] fileNameArr, HttpServlet servlet,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		try {
			/**
			 * 这个集合就是你想要打包的所有文件， 这里假设已经准备好了所要打包的文件
			 */
			// List<File> files = new ArrayList<File>();
			/**
			 * 创建一个临时压缩文件， 我们会把文件流全部注入到这个文件中 这里的文件你可以自定义是.rar还是.zip
			 */
			String fileSaveDir = servlet.getServletContext().getRealPath("/temp"); // 暂定temp文件夹下，经测试不会在服务器生成压缩包
			newFileName = URLEncoder.encode(newFileName, "UTF-8");
			File file = new File(fileSaveDir + "/" + newFileName);
			if (!file.exists()) {
				file.createNewFile();
			}
			response.reset();
			// response.getWriter()
			// 创建文件输出流
			FileOutputStream fous = new FileOutputStream(file);
			/**
			 * 打包的方法我们会用到ZipOutputStream这样一个输出流, 所以这里我们把输出流转换一下
			 */
			// org.apache.tools.zip.ZipOutputStream zipOut
			// = new org.apache.tools.zip.ZipOutputStream(fous);
			ZipOutputStream zipOut = new ZipOutputStream(fous);
			/**
			 * 这个方法接受的就是一个所要打包文件的集合， 还有一个ZipOutputStream
			 */
			if (files != null) {
				zipFile1(files, fileNameArr, zipOut);
			}
			zipOut.close();
			fous.close();
			return downloadZip(file, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
		/**
		 * 直到文件的打包已经成功了， 文件的打包过程被我封装在FileUtil.zipFile这个静态方法中，
		 * 稍后会呈现出来，接下来的就是往客户端写数据了
		 */
		// OutputStream out = response.getOutputStream();
		return response;
	}

	// 不传自定义文件名的情形，自定义空字符串数组，调用重载方法
	public static HttpServletResponse downLoadFilesNoFileName(List<File> files,
			String newFileName, HttpServlet servlet,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		return downLoadFiles(files, newFileName, new String[0], servlet, request, response);
	}

	public static HttpServletResponse downloadZip(File file,
			HttpServletResponse response) {
		try {
			// 以流的形式下载文件。
			InputStream fis = new BufferedInputStream(new FileInputStream(file.getPath()));
			byte[] buffer = new byte[fis.available()];
			fis.read(buffer);
			fis.close();
			// 清空response
			response.reset();
			OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition", "attachment;filename=" + file.getName());
			toClient.write(buffer);
			toClient.flush();
			toClient.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			try {
				File f = new File(file.getPath());
				f.delete();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return response;
	}

	/**
	 * 把接受的全部文件打成压缩包
	 * 
	 * @param List
	 *            <File>;
	 * @param org.apache.tools.zip.ZipOutputStream
	 */
	public static void zipFile1(List files, String[] fileNameArr,
			ZipOutputStream outputStream) {
		int size = files.size();
		for (int i = 0; i < size; i++) {
			File file = (File) files.get(i);
			if (file.exists()) {
				String fileName = "";
				if (i < fileNameArr.length && fileNameArr[i] != null
						&& !"".equals(fileNameArr[i])) {
					fileName = fileNameArr[i];
				}
				zipFile2(file, fileName, outputStream);
			}	
		}
	}
	
	/**
	 * 根据输入的文件与输出流对文件进行打包
	 * 
	 * @param File
	 * @param org.apache.tools.zip.ZipOutputStream
	 */
	public static void zipFile2(File inputFile, String fileName,
			ZipOutputStream ouputStream) {
		try {
			if (inputFile.exists()) {
				/**
				 * 如果是目录的话这里是不采取操作的， 至于目录的打包正在研究中
				 */
				if (inputFile.isFile()) {
					FileInputStream IN = new FileInputStream(inputFile);
					BufferedInputStream bins = new BufferedInputStream(IN, 512);
					// org.apache.tools.zip.ZipEntry
					ZipEntry entry = null;
					if (!"".equals(fileName)) {
						entry = new ZipEntry(fileName);
					} else {
						entry = new ZipEntry(inputFile.getName());
					}

					ouputStream.putNextEntry(entry);
					// 向压缩文件中输出数据
					int nNumber;
					byte[] buffer = new byte[512];
					while ((nNumber = bins.read(buffer)) != -1) {
						ouputStream.write(buffer, 0, nNumber);
					}
					// 关闭创建的流对象
					bins.close();
					IN.close();
				} else {
					try {
						File[] files = inputFile.listFiles();
						for (int i = 0; i < files.length; i++) {
							zipFile2(files[i], "", ouputStream);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/** ******************* 批量文件打包下载代码 ： end ******************** */

%>
