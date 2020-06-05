use crmlab
if object_id('Departments') is not null drop table Departments
GO
if object_id('Teachers') is not null drop table Teachers
GO
if object_id('Students') is not null drop table Students
GO
if object_id('Courses') is not null drop table Courses
GO
if object_id('CourseCategories') is not null drop table CourseCategories
GO
if object_id('Resources') is not null drop table Resources
GO
if object_id('ResourceCategories') is not null drop table ResourceCategories
GO
if object_id('Books') is not null drop table Books
GO
if object_id('basicinfo') is not null drop table basicinfo
GO
if object_id('basicinfotypes') is not null drop table basicinfotypes
GO
if object_id('labs') is not null drop table labs
GO
if object_id('Classes') is not null drop table Classes
GO
if object_id('Majors') is not null drop table Majors
GO
Create table Departments (
 DeptID nchar(10) primary key,  --部门编码
 DeptName nvarchar(50),   --部门名称
 EnglishName nvarchar(50),
 Leader   nchar(8),   --部门负责人
 Description ntext NULL,
 ParentNodeID nchar(10) NULL,
 IsParentFlag int NULL,
 Level tinyint NULL)
 GO
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('A','工商管理系','','','',1,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('B','经济系','','','',1,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('C','国际贸易系','','','',1,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('D','管理科学与工程系','','','',1,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('E','会计系','','','',1,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('F','学院办公室','','','',0,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('G','学生工作办公室','','','',0,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('H','经济管理实验教学中心','','','',0,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('K','MBA中心','','','',0,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('A1','工商管理专业','','','A',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('A2','市场营销专业','','','A',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('A3','人力资源管理专业','','','A',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('B1','经济学专业','','','B',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('B2','统计学专业','','','B',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('C1','国际贸易专业','','','C',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('C2','金融学专业','','','C',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('D1','信息管理与信息系统专业','','','D',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('D2','电子商务专业','','','D',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('E1','会计学专业','','','E',0,2)
GO   

create table Teachers (
  TeacherID nchar(8) primary key,    --教师编码
  Name nchar(20),            --教师姓名
  Alias nchar(50),           --姓名拼音
  IDNumber nchar(18),        --身份证号
  Password nchar(50),         --登录密码
  Type int,                  --权限
  Gender nchar(2),          --性别   
  DeptID nchar(10),        --教师所在部门编码
  BirthDate datetime,      --出生日期
  Hiredate datetime,      --进校日期
  Title nvarchar(20),     --职称
  Graduate nvarchar(100),  --毕业学校
  Graduatedate datetime,  --毕业时间
  Major nvarchar(30),       --毕业专业
  Degree nvarchar(20),      --学历学位
  Party nvarchar(20),       --党派
  HomeTown nvarchar(20),    --籍贯
  Nationality nvarchar(20),    --民族
  WorkDate datetime,   --参加工作时间
  Address nvarchar(100),     --家庭地址
  zip nchar(6),         --邮政编码
  HomePhone nvarchar(20),   --家庭电话
  OfficePhone nvarchar(20),   --办公室电话
  Fax nvarchar(20),   --传真
  OfficeNo nvarchar(50),   --办公地点
  Mobile nvarchar(20),      --移动电话
  Email nvarchar(40),       --电子邮箱
  Homepage nvarchar(40),    --个人主页
  Institute nvarchar(40),  --所在研究所
  TurtorTitle nvarchar(50),  --导师信息 （硕导、博导）
  Research nvarchar(250),    --研究方向
  Honor nvarchar(500),      --荣誉称号
  Resume ntext,             --个人简历
  FileSize bigint,                  --照片大小(x B)
  FileOSname nvarchar(250),         --照片文件所在的路径
  FileSourceName nvarchar(250),     --照片源文件名称
  FileSizeDesc nvarchar(100),           --照片图像大小
  Notes ntext                 --备注（个人简介）
)
GO
insert into Teachers (TeacherID,Name,Alias,Gender,Title,Degree,BirthDate,hiredate,deptID,Password,address,graduate,homephone)
values('20000554','牛顿','Newton','男','教授','硕士','1964-8-1','2000-5-8','D1','zxy','hangzhou','zstu','8681')
insert into Teachers (TeacherID,Name,Alias,Gender,Title,Degree,BirthDate,hiredate,deptID,Password)
values('20000555','爱因斯坦','Einstein','男','教授','博士','1955-8-1','1996-4-6','D2','123456')
insert into Teachers (TeacherID,Name,Alias,Gender,Title,Degree,BirthDate,hiredate,deptID,Password)
values('20000556','华罗庚','Hualuogeng','男','教授','硕士','1955-8-1','1998-1-6','D1','')
GO
create table Students (
  StudentID nchar(15) primary key,    --学生编码
  Name nchar(20),            --学生姓名
  IDNumber nchar(18),        --身份证号
  Gender nchar(2),           --性别 
  Alias nchar(20),           --姓名拼音
  Password nchar(50),        --登录密码
  DeptID nchar(10),          --学生所在部门
  Class nchar(30),           --学生所在班级
  BirthDate datetime,        --出生日期
  AdmissionDate datetime,    --入学日期
  Graduate nvarchar(100),    --中学毕业学校
  Party nvarchar(20),        --党派
  Title  nvarchar(20),       --班委职务
  HomeTown nvarchar(20),     --籍贯
  Nationality nvarchar(20),  --民族
  Address nvarchar(100),     --家庭地址
  zip nchar(6),       --邮政编码
  Mother nvarchar(20),       --母亲姓名
  Father nvarchar(20),       --父亲姓名
  MotherPhone nvarchar(20),  --母亲电话
  FatherPhone nvarchar(20),  --父亲电话
  HomePhone nvarchar(20),     --家庭电话
  Mobile nvarchar(20),        --移动电话
  Email nvarchar(40),         --电子邮箱
  Homepage nvarchar(40),      --个人主页
  Speciality nvarchar(250),    --个人特长（可以多个，分号分隔）
  Honor nvarchar(250),        --荣誉称号
  Resume ntext,               --个人简历
  picturePath nvarchar(100),   --照片路径
  Note ntext                 --备注
)
GO
insert into Students (StudentID,Name,Alias,Gender,BirthDate,AdmissionDate,DeptID)
values('2011329540101','张丽','Zhangli','女','1992-1-1','2011-9-1','10401')
insert into Students (StudentID,Name,Alias,Gender,BirthDate,AdmissionDate,DeptID)
values('2011329640222','王宽','Wangkuan','男','1992-11-1','2011-9-1','10401')
GO
--课程类别表
create table CourseCategories (
  CategoryID nchar(8) primary key,    --类别表
  CategoryName nvarchar(50),          --类别名称
  Description ntext,                 --类别简介
  ParentNodeID  nchar(8),			 --父节点
  IsParentFlag tinyint,				  --是否是父节点
  Level tinyint,					--节点层次
  Note ntext						 --备注
)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('A','通识教育类','',1,1)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B','经济管理类','',1,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B01','经济管理基础类','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B02','工商管理类','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B03','市场营销类','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B04','人力资源管理类','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B05','会计学类','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B06','经济学类','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B07','国际贸易类','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B08','经济统计类','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B09','金融学类','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B10','信息管理与信息系统类','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B11','电子商务类','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B99','经济管理其他类','B',0,2)

--课程表
create table Courses (
  CourseID nchar(8) primary key,    --课程表
  CourseName nvarchar(100),                --课程名称
  EnglishName nvarchar(250),        --课程英文名称
  Language char(1),   --1双语   2-纯英语
  CategoryID nchar(20),      --课程类别
  Credit decimal(3,1),       --学分
  Hours int,                 --学时
  DeptID nchar(10),          --开课系
  Description ntext,         --课程简介
  Note ntext                 --备注
)
GO
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('02524','计算机基础概论','Introduction to Computer Basics','',1,'16','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('02530','C程序设计','C Programming','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('02537','VB数据库开发应用技术','the Development and Applications Technology of Database based on VB','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('04503','职业发展与就业指导','Career Development and Employment Guidance','',2,'38','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('04507','大学生心理健康教育','Students'' Mental Health Education','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('07501','形势与政策','Current Issues and Policies','',2,'128','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('08501','军事理论','Military Theory','',1,'21','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('26433','名著选读','Introduction to Classical Literary Works','',1,'16','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('47542','平面图形与动画制作','Plane Figure and Animation Creation','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51536','宏观经济学B','Macro-economics B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51550','经贸英语','Business English','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51567','微观经济学B','Microeconomics B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51640','经济法','Economic Law','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51904','经济法*','Economic Law','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51906','国际金融*','International Finance','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51907','中国对外贸易概论*','Introduction to Chinese Foreign Trade','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51909','国际贸易体制*','International Trade System','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51914','国际贸易地理*','Geography of International Trade','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51916','国际服务贸易*','International Service Trade','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51917','国际结算*','International Settlement','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51926','外贸函电*','International Business Communication','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51927','外贸洽谈*','International Business Negotiation','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51928','国际商法*','International Business Law','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51933','计量经济学*','Econometrics','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51934','证券投资分析*','Investment in security','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51935','国际商务*','International Business','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51936','世界经济*','World Economy','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51937','国际技术贸易*','International Technical Trade','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51938','国际投资与跨国公司*','Multinational Corporations and Foreign Investment','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51939','对外贸易运输与保险*','Transportation and Insurance in Foreign Trade','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51940','外汇理论与实务*','Foreign Exchange Theories and Practice','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51941','国际市场营销*','International Marketing','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51942','国际投资学*','International Investment','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51943','跨国经营概论*','Introduction to Multinational Corporations','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51953','国际经济学*','International Economics','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52503','财务管理B','Financial Management B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52518','会计学B','Accounting B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52904','财务管理*','Financial Management','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53514','管理学B','Management B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53571','市场营销学C','Marketing C','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53624','战略管理','Strategic Mangement','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53901','管理学*','Management','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54503','Web开发技术','Web Programming','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54505','XML标记语言及应用','XML (Extensible Markup Language) and Applications','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54519','供应链与物流管理','Supply Chain and Logisctics Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54526','管理运筹学A','Management Operation A','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54530','计算机网络A','Computer Network A','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54537','客户关系管理系统','Customer Relationship Management System','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54539','企业资源计划系统','Enterprise Resource Planning System','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54542','数据结构','Data Structure','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54555','信息系统分析、设计与实现A','Information System Analysis, Design and Realization A','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54582','IT项目管理','IT Project Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54603','管理科学学科导论','Introduction to Management Science','',1,'16','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54606','数据库原理与应用','Database Principles and Application','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54616','管理统计B','Management Statistics B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54618','管理信息系统(双语)','Management Information System(Bilingual)','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54653','面向对象程序设计','Object-Oriented Programming','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54664','数量经济学','Quantitative Economics','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54665','网络营销(双语)','Network Marketing(Bilingual)','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54669','电子商务(双语)','Electronic Business(Bilingual)','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54670','软件开发工具','Software Development Tools','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54671','商业智能与数据挖掘','Business Intelligence and Data Mining','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54674','网络创业管理','Network Entreprenerial Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54676','信息技术应用前沿','IT Application Frontier','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54677','电子商务运营管理','E-Business Operation Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54683','计算机操作系统B','Computer Operating System','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54684','高级数据库管理','Advanced Database Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54685','软件开发技术专题','Case Study on Software Development','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54686','知识系统工程','Knowledge System Engineering','',1,'16','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54901','电子商务*','Electronic Commerce','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54903','物流管理*','Management of Logistics','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('63519','概率论与数理统计A','Probability Theory and Mathematical Statistics A','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('63522','高等数学A1','Advanced Mathematics A1','',5,'80','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('63523','高等数学A2','Advanced Mathematics A2','',5,'80','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('63564','线性代数A','Linear Algebra A','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('67526','社会心理学','Social Psychology','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('73508','英语2','College English 2','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('73509','英语3','College English 3','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('73510','英语4','College English 4','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('73553','英语5','College English 5','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('74509','思想道德修养与法律基础','Ideological and Ethical Cultivation and Foundations of Law','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('74510','中国近现代史纲要','The Outline of Modern Chinese History','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('74514','毛泽东思想和中国特色社会主义理论体系概论1','Introduction to Mao Zedong Thought and the Theoretical System of Socialism with Chinese Characteristics 1','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('74515','毛泽东思想和中国特色社会主义理论体系概论2','Introduction to Mao Zedong Thought and the Theoretical System of Socialism with Chinese Characteristics 2','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('74516','马克思主义基本原理概论','Introduction to the Basic Principles of Marxism','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51501','财政学','Public Finance','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51523','国际贸易理论与实务B','International Trade Theories and Practice B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51537','货币银行学','Monetary Banking','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51599','资本运营','Capital Operation','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52506','成本会计','Cost Accounting','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52507','高级财务管理','Advanced Financial Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52513','国际税收','International Taxation','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52515','会计理论专题','Accounting Theories','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52516','会计信息系统','Accounting information System','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52535','资产评估','Asset Evaluation','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52543','计算机财务管理','Computerized Financial Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52549','高级财务会计','Advanced Financial Accounting','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52554','会计学原理(双语)','Principles of Accounting(Bilingual)','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52555','财务分析','Financial Analysis','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52556','审计学','Auditing','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52557','金融企业会计','Financial Enterprises Accounting','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52569','税法','Tax Law','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52571','中级财务会计','Intermediate Financial Accounting','',6,'96','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52572','管理会计(双语)','Managerial Accounting(Bilingual)','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52573','公司战略与风险管理','Corporate Strategy and Risk Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52574','内部控制','Internal Control','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52701','税收筹划','Taxation Planning','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52905','会计前沿研究*','Accounting Frontier Research','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53515','管理学学科专题讲座','Special Lectures on Management Science','',1,'18','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53518','管理学原著阅读','Selective Readings of Classic Works on Management Science','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53547','人力资源管理','Human Resource Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53562','生产与运作管理B','Production and Operation Management B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53679','创业投资与融资管理','Entrepreneurial Financial and Investment Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53812','创业管理','Entrepreneurial Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('59528','金融学','Finance','',2,'32','','','')
GO

--资源分类表
create table ResourceCategories (
  CategoryID nchar(8) primary key,    --资源类别表
  CategoryName nvarchar(50),          --资源类别名称
  EnglishName nvarchar(50),          --资源类别名称
  Description ntext,             --资源分类简介
  ParentNodeID  nchar(8),        --父节点
  IsParentFlag tinyint,          --是否是父节点
  Level tinyint,                 --节点层次
  Note ntext                     --备注
)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('A','电子课件','',1,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('A1','电子课件ppt','A',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('A2','电子教案','A',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('A3','电子讲义','A',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B','电子视频','',0,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('C','电子图书','',0,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('D','教学文件','',1,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('D1','教学大纲','D',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('D2','考试大纲','D',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('D3','课程简介','D',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('E','实验教学','',1,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('E1','实验报告格式规范','E',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('E2','实验指导书','E',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('E3','实验报告范例','E',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('F','信息系统实例','',1,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('F1','开源系统实例','F',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('F2','信息系统演示版','F',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('G','案例库','',0,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('H','学科竞赛作品','',1,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('H1','挑战杯竞赛作品','H',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('H2','电子商务竞赛作品','H',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('H3','会计信息化竞赛作品','H',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('H4','ERP沙盘作品','H',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('X','其它资源','',0,1)

--资源表
create table Resources (
  ResourceID nchar(8) primary key,  --资源编码
  ResourceName nvarchar(50),        --资源名称
  CategoryID nchar(8),              --所属资源类别(categoryID）
  CourseID nchar(8),                 --对应的课程编码
  Contributor nchar(8),             --资源提供者，对应教师表中TeacherID
  UpLoadDate datetime default (getdate()),          --提供日期
  FileSize bigint,                  --资源大小(x B)
  FileOSname nvarchar(250),         --文件所在的路径
  FileSourceName nvarchar(250),     --附件源文件名称
  FileSizeDesc nvarchar(100),           --文件图像大小
  DownLoadTimes int,                --下载次数
  Description ntext,                --资源描述
  Note ntext                        --备注
)
GO
--模拟生成resource数据
insert into Resources (resourceID,resourceName,categoryID,courseid)
select 'A1'+courseid,coursename+'电子课件ppt','A1',courseid from courses
union all
select 'A2'+courseid,coursename+'教案','A2',courseid from courses
union all
select 'A3'+courseid,coursename+'讲义','A3',courseid from courses
union all
select 'D1'+courseid,coursename+'教学大纲','D1',courseid from courses
union all
select 'D3'+courseid,coursename+'考课程简介','D3',courseid from courses
union all
select 'E101' as f1,'经济管理实验报告标准格式' as f2,'E1' as f3,'' as f4
union all
select 'E2'+courseid,coursename+'实验指导书','E2',courseid from courses where left(courseid,2)='54'
union all
select * from
(select top 10 'E3'+courseid as f1,coursename+'实验报告' as f2,'E3' as f3,courseid from courses where left(courseid,2)='54' order by newid()) as p
union all
select 'F1'+courseid,coursename+'源码实例','F1',courseid from courses where left(courseid,2)='54'
union all
select* from
(select top 25 'F2'+courseid as f1,coursename+'演示系统' as f2,'F2' as f3,courseid from courses where left(courseid,2)='54' order by newid()) as p
union all
select * from
(select top 10 'C'+courseid as f1,coursename+'实例教程' as f2,'C' as f3,courseid from courses where left(courseid,2)='54' order by newid()) as p
union all
select 'G'+courseid,coursename+'案例库','G',courseid from courses where left(courseid,2)='53'
GO
create table basicinfotypes (
  id int identity primary key,
  type nvarchar(250),
  ParentNodeID nvarchar(10) default '',
  IsParentFlag int default 0,
  Level int default 1
)
INSERT INTO basicinfotypes(type) VALUES ('党派')
INSERT INTO basicinfotypes(type) VALUES ('学历')
INSERT INTO basicinfotypes(type) VALUES ('职称')
INSERT INTO basicinfotypes(type) VALUES ('研究所')
GO
create table basicinfo (
  id int identity primary key,
  type nvarchar(50),
  name nvarchar(250)
)
INSERT INTO basicinfo(Type,Name) VALUES ('职称','教授')
INSERT INTO basicinfo(Type,Name) VALUES ('职称','研究员')
INSERT INTO basicinfo(Type,Name) VALUES ('职称','副教授')
INSERT INTO basicinfo(Type,Name) VALUES ('职称','副研究院')
INSERT INTO basicinfo(Type,Name) VALUES ('职称','高级工程师')
INSERT INTO basicinfo(Type,Name) VALUES ('职称','讲师')
INSERT INTO basicinfo(Type,Name) VALUES ('职称','工程师')
INSERT INTO basicinfo(Type,Name) VALUES ('职称','助教')
INSERT INTO basicinfo(Type,Name) VALUES ('职称','其他')
INSERT INTO basicinfo(Type,Name) VALUES ('学历','博士研究生')
INSERT INTO basicinfo(Type,Name) VALUES ('学历','博士')
INSERT INTO basicinfo(Type,Name) VALUES ('学历','硕士研究生')
INSERT INTO basicinfo(Type,Name) VALUES ('学历','硕士')
INSERT INTO basicinfo(Type,Name) VALUES ('学历','本科')
INSERT INTO basicinfo(Type,Name) VALUES ('学历','专科')
INSERT INTO basicinfo(Type,Name) VALUES ('学历','其他')
INSERT INTO basicinfo(Type,Name) VALUES ('党派','中共党员')
INSERT INTO basicinfo(Type,Name) VALUES ('党派','九三')
INSERT INTO basicinfo(Type,Name) VALUES ('党派','民建')
INSERT INTO basicinfo(Type,Name) VALUES ('党派','民革')
INSERT INTO basicinfo(Type,Name) VALUES ('党派','致公党')
INSERT INTO basicinfo(Type,Name) VALUES ('党派','其他')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','无')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','区域经济发展研究所')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','区域经济理论研究所')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','现代信息系统工程研究所')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','产业经济研究所')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','纺织经济研究所')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','企业管理研究所')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','人力资源管理研究所')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','管理工程研究所')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','人力资源管理研究所')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所1')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所2')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所3')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所4')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所5')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所6')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所7')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所8')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所9')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所10')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所11')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所12')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所13')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所14')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所15')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','心理与行为研究所16')
INSERT INTO basicinfo(Type,Name) VALUES ('研究所','其他')
GO
create table labs (    --实验室
  LabID nvarchar(12) primary key,   --编码
  LabName nvarchar(50),  --实验室名称
  Room nvarchar(50),   --地点
  Chief  nvarchar(50),    --负责人
  Capacity int,    --容量
  Area decimal(7,1),   --面积大小
  FileSize bigint,                  --图片大小(x B)
  FileOSname nvarchar(250),         --图片所在的路径
  FileSourceName nvarchar(250),     --图片源文件名称
  FileSizeDesc nvarchar(100),       --图像文件大小
  Description ntext,    --描述
  DPartition1 nvarchar(500),  --分区1描述说明
  DPartition2 nvarchar(500),  --分区2描述说明
  DPartition3 nvarchar(500),  --分区3描述说明
  DPartition4 nvarchar(500),  --分区4描述说明
  DPartition5 nvarchar(500),  --分区5描述说明
  DPartition6 nvarchar(500),  --分区6描述说明
  DPartition7 nvarchar(500),  --分区7描述说明
  DPartition8 nvarchar(500),  --分区8描述说明
  DPartition9 nvarchar(500),  --分区9描述说明
  KPartition1 nvarchar(500),  --分区1维护说明
  KPartition2 nvarchar(500),  --分区2维护说明
  KPartition3 nvarchar(500),  --分区3维护说明
  KPartition4 nvarchar(500),  --分区4维护说明
  KPartition5 nvarchar(500),  --分区5维护说明
  KPartition6 nvarchar(500),  --分区6维护说明
  KPartition7 nvarchar(500),  --分区7维护说明
  KPartition8 nvarchar(500),  --分区8维护说明
  KPartition9 nvarchar(500)   --分区9维护说明
  )
GO  
insert into labs (Labid,Labname,room,Chief,Capacity,area,description,dPartition1,dPartition2,dPartition3)
values('6080','信息管理与信息系统实验室','7-608','祝锡永',72,20,'','winxp;Delphi2010;Sql Server2008','winxp;Delphi7;Sql Server2005;C-free','winxp;J2EE;EXTJS;Sql Server2008')
insert into labs (Labid,Labname,room,Chief,Capacity,area,description,dPartition1,dPartition2,dPartition3)
values('6051','电子商务实验室','7-605','王世雄',80,200,'','winxp;用友ERP;Sql Server2008','winxp;奥派电子商务模拟系统;Sql Server2005;C-free','winxp;J2EE;EXTJS;Sql Server2008')
insert into labs (Labid,Labname,room,Chief,Capacity,area,description,dPartition1,dPartition2,dPartition3)
values('6052','创新金融实验室','7-605','徐少君',80,200,'','winxp;用友ERP;Sql Server2008','winxp;奥派电子商务模拟系统;Sql Server2005;C-free','winxp;J2EE;EXTJS;Sql Server2008')
insert into labs (Labid,Labname,room,Chief,Capacity,area,description,dPartition1,dPartition2,dPartition3)
values('6170','经济管理基础实验室','7-617','张巍',120,350,'','winxp;用友ERP;Sql Server2008','winxp;奥派电子商务模拟系统;Sql Server2005;C-free','winxp;J2EE;EXTJS;Sql Server2008')
insert into labs (Labid,Labname,room,Chief,Capacity,area,description,dPartition1,dPartition2,dPartition3)
values('4070','跨专业实训实验平台','7-407','潘旭伟',64,300,'','用友VBSE','winxp;奥派电子商务模拟系统;Sql Server2005;C-free','winxp;J2EE;EXTJS;Sql Server2008')
GO
create table Majors(
  sysid int identity primary key,
  MajorID nvarchar(14),
  MajorName nvarchar(50),
  Leader nvarchar(14),
  DepartmentID nvarchar(14)
 )
 go 
create table Classes(
  sysid int identity primary key,
  ClassID nvarchar(14),
  ClassName nvarchar(50),
  Grade nvarchar(6),
  Leader nvarchar(14),
  LifeAdvisor nvarchar(14),
  CourseAdvisor nvarchar(14),
  MajorID nvarchar(14),
  Capacity int
 )
 go  
 
--select a.*,b.categoryname,c.coursename from resources a join resourcecategories b on a.categoryid=b.categoryid join courses c on a.courseid=c.courseid
--select a.*,str(a.filesize,12)+'kb' as sizeinkb,b.categoryname,c.coursename,convert(varchar(10),uploaddate,120) as uploadday from resources a join resourcecategories b on a.categoryid=b.categoryid join courses c on a.courseid=c.courseid
--select * from labs
--select * from Teachers
--select* from departments
update Departments set IsParentFlag=0 where DeptID='F'
select * from resourcecategories

