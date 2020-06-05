<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page language="java" import="java.sql.*"%>
<%@ page import="com.DBConn" %>
<%@ page import="com.UserBean" %>
<%@ page import="com.StringUtil"%>
<%@ page import="java.io.*" %>
<%@ page import="java.io.BufferedInputStream" %>
<%@ page import="java.io.BufferedOutputStream" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="javax.xml.parsers.*,org.w3c.dom.*" %>


<%
	//输入一条sql语句（update, insert,delete），在后台执行该sql语句
	//从前台获取数据，使用param传递.
	String errmsg="";
	String database=StringUtil.filterNull(request.getParameter("database"));
	/*
	//获取数据库连接
	DBConn con=new DBConn();
	try{
		errmsg=con.testConnection(database);
	}catch (Exception e){
		errmsg=e.getMessage();
	}
	*/

	String xhostname="";
	String xsqlpassword="";
	String path = application.getRealPath("/");	
	String s1=path.substring(0,path.lastIndexOf("\\"));  //所在文件夹
	String s2="system//sqlservers//sqlserver.xml";
	String str="";
	File f=new File(s1,s2);  //在文件中删除已经存在的这个文件
	f=new File(s1,s2);  
	if (f.exists()){ 
		f = new File(s1+"/"+s2);
		DocumentBuilderFactory userDBF=DocumentBuilderFactory.newInstance();
 		userDBF.setIgnoringElementContentWhitespace(true);
 		DocumentBuilder userDB = userDBF.newDocumentBuilder();
		Document doc = userDB.parse("file:///"+s1+"/"+s2);
 		//Document doc=userDB.parse(pageContext.getServletContext().getResourceAsStream(s1+"/"+s2));
 		Element root= doc.getDocumentElement();		
		NamedNodeMap mlist=root.getAttributes();
		/*
		if (mlist!=null){
			for (int n1=0;n1<mlist.getLength();n1++){
				tempString.append(root.getTagName()+"结点的"+mlist.item(n1). getNodeName() +"属性的值为:"+mlist.item(n1).getNodeValue()+"<br>");
       		}
		}
		*/
     	//继续遍历当前结点的所有子结点
     	NodeList nlist=root.getChildNodes();
     	if (nlist!=null){
			for(int i=0;i<nlist.getLength();i++){
				if (nlist.item(i).getNodeType()==1 && nlist.item(i).getNodeName()=="host"){
					NamedNodeMap plist=nlist.item(i).getAttributes();
					for (int j=0;j<plist.getLength();j++){
						if (plist.item(j).getNodeName().equals("name") && !plist.item(j).getNodeValue().equals("")){
							xhostname=plist.item(j).getNodeValue().trim();
						}
						if (plist.item(j).getNodeName().equals("password") && !plist.item(j).getNodeValue().equals("")){
							xsqlpassword=plist.item(j).getNodeValue().trim();
						}
					}					
				}
				//if(nlist.item(n1).getNodeType()==3 && nlist.item(n1).getNodeValue().trim().length()!=0){ //3是text类型
					//tempString.append("本结点的值不为空,结点值为:"+nlist.item(n1).getNodeValue().trim()+"<br>");
				//}	
             	//1说明是一个带有子结点的结点
				//if (nlist.item(n1).getNodeType()==1) getPrintXML((Element)nlist. item(n1), tempString);
			}
		}
		/*
    	FileReader fileReader = new FileReader(f);    
    	BufferedReader br = new BufferedReader(fileReader);    
    	while((str = br.readLine() ) != null){  
			str=str.trim();			
		}
		*/
	}	    			
	
	
	response.getWriter().write(errmsg);		
%>