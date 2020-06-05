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
 DeptID nchar(10) primary key,  --���ű���
 DeptName nvarchar(50),   --��������
 EnglishName nvarchar(50),
 Leader   nchar(8),   --���Ÿ�����
 Description ntext NULL,
 ParentNodeID nchar(10) NULL,
 IsParentFlag int NULL,
 Level tinyint NULL)
 GO
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('A','���̹���ϵ','','','',1,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('B','����ϵ','','','',1,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('C','����ó��ϵ','','','',1,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('D','�����ѧ�빤��ϵ','','','',1,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('E','���ϵ','','','',1,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('F','ѧԺ�칫��','','','',0,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('G','ѧ�������칫��','','','',0,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('H','���ù���ʵ���ѧ����','','','',0,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('K','MBA����','','','',0,1)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('A1','���̹���רҵ','','','A',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('A2','�г�Ӫ��רҵ','','','A',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('A3','������Դ����רҵ','','','A',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('B1','����ѧרҵ','','','B',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('B2','ͳ��ѧרҵ','','','B',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('C1','����ó��רҵ','','','C',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('C2','����ѧרҵ','','','C',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('D1','��Ϣ��������Ϣϵͳרҵ','','','D',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('D2','��������רҵ','','','D',0,2)
 insert into Departments (DeptID,DeptName,Leader,Description,ParentNodeID,IsParentFlag,level)values('E1','���ѧרҵ','','','E',0,2)
GO   

create table Teachers (
  TeacherID nchar(8) primary key,    --��ʦ����
  Name nchar(20),            --��ʦ����
  Alias nchar(50),           --����ƴ��
  IDNumber nchar(18),        --���֤��
  Password nchar(50),         --��¼����
  Type int,                  --Ȩ��
  Gender nchar(2),          --�Ա�   
  DeptID nchar(10),        --��ʦ���ڲ��ű���
  BirthDate datetime,      --��������
  Hiredate datetime,      --��У����
  Title nvarchar(20),     --ְ��
  Graduate nvarchar(100),  --��ҵѧУ
  Graduatedate datetime,  --��ҵʱ��
  Major nvarchar(30),       --��ҵרҵ
  Degree nvarchar(20),      --ѧ��ѧλ
  Party nvarchar(20),       --����
  HomeTown nvarchar(20),    --����
  Nationality nvarchar(20),    --����
  WorkDate datetime,   --�μӹ���ʱ��
  Address nvarchar(100),     --��ͥ��ַ
  zip nchar(6),         --��������
  HomePhone nvarchar(20),   --��ͥ�绰
  OfficePhone nvarchar(20),   --�칫�ҵ绰
  Fax nvarchar(20),   --����
  OfficeNo nvarchar(50),   --�칫�ص�
  Mobile nvarchar(20),      --�ƶ��绰
  Email nvarchar(40),       --��������
  Homepage nvarchar(40),    --������ҳ
  Institute nvarchar(40),  --�����о���
  TurtorTitle nvarchar(50),  --��ʦ��Ϣ ��˶����������
  Research nvarchar(250),    --�о�����
  Honor nvarchar(500),      --�����ƺ�
  Resume ntext,             --���˼���
  FileSize bigint,                  --��Ƭ��С(x B)
  FileOSname nvarchar(250),         --��Ƭ�ļ����ڵ�·��
  FileSourceName nvarchar(250),     --��ƬԴ�ļ�����
  FileSizeDesc nvarchar(100),           --��Ƭͼ���С
  Notes ntext                 --��ע�����˼�飩
)
GO
insert into Teachers (TeacherID,Name,Alias,Gender,Title,Degree,BirthDate,hiredate,deptID,Password,address,graduate,homephone)
values('20000554','ţ��','Newton','��','����','˶ʿ','1964-8-1','2000-5-8','D1','zxy','hangzhou','zstu','8681')
insert into Teachers (TeacherID,Name,Alias,Gender,Title,Degree,BirthDate,hiredate,deptID,Password)
values('20000555','����˹̹','Einstein','��','����','��ʿ','1955-8-1','1996-4-6','D2','123456')
insert into Teachers (TeacherID,Name,Alias,Gender,Title,Degree,BirthDate,hiredate,deptID,Password)
values('20000556','���޸�','Hualuogeng','��','����','˶ʿ','1955-8-1','1998-1-6','D1','')
GO
create table Students (
  StudentID nchar(15) primary key,    --ѧ������
  Name nchar(20),            --ѧ������
  IDNumber nchar(18),        --���֤��
  Gender nchar(2),           --�Ա� 
  Alias nchar(20),           --����ƴ��
  Password nchar(50),        --��¼����
  DeptID nchar(10),          --ѧ�����ڲ���
  Class nchar(30),           --ѧ�����ڰ༶
  BirthDate datetime,        --��������
  AdmissionDate datetime,    --��ѧ����
  Graduate nvarchar(100),    --��ѧ��ҵѧУ
  Party nvarchar(20),        --����
  Title  nvarchar(20),       --��ίְ��
  HomeTown nvarchar(20),     --����
  Nationality nvarchar(20),  --����
  Address nvarchar(100),     --��ͥ��ַ
  zip nchar(6),       --��������
  Mother nvarchar(20),       --ĸ������
  Father nvarchar(20),       --��������
  MotherPhone nvarchar(20),  --ĸ�׵绰
  FatherPhone nvarchar(20),  --���׵绰
  HomePhone nvarchar(20),     --��ͥ�绰
  Mobile nvarchar(20),        --�ƶ��绰
  Email nvarchar(40),         --��������
  Homepage nvarchar(40),      --������ҳ
  Speciality nvarchar(250),    --�����س������Զ�����ֺŷָ���
  Honor nvarchar(250),        --�����ƺ�
  Resume ntext,               --���˼���
  picturePath nvarchar(100),   --��Ƭ·��
  Note ntext                 --��ע
)
GO
insert into Students (StudentID,Name,Alias,Gender,BirthDate,AdmissionDate,DeptID)
values('2011329540101','����','Zhangli','Ů','1992-1-1','2011-9-1','10401')
insert into Students (StudentID,Name,Alias,Gender,BirthDate,AdmissionDate,DeptID)
values('2011329640222','����','Wangkuan','��','1992-11-1','2011-9-1','10401')
GO
--�γ�����
create table CourseCategories (
  CategoryID nchar(8) primary key,    --����
  CategoryName nvarchar(50),          --�������
  Description ntext,                 --�����
  ParentNodeID  nchar(8),			 --���ڵ�
  IsParentFlag tinyint,				  --�Ƿ��Ǹ��ڵ�
  Level tinyint,					--�ڵ���
  Note ntext						 --��ע
)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('A','ͨʶ������','',1,1)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B','���ù�����','',1,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B01','���ù��������','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B02','���̹�����','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B03','�г�Ӫ����','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B04','������Դ������','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B05','���ѧ��','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B06','����ѧ��','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B07','����ó����','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B08','����ͳ����','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B09','����ѧ��','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B10','��Ϣ��������Ϣϵͳ��','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B11','����������','B',0,2)
insert into CourseCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B99','���ù���������','B',0,2)

--�γ̱�
create table Courses (
  CourseID nchar(8) primary key,    --�γ̱�
  CourseName nvarchar(100),                --�γ�����
  EnglishName nvarchar(250),        --�γ�Ӣ������
  Language char(1),   --1˫��   2-��Ӣ��
  CategoryID nchar(20),      --�γ����
  Credit decimal(3,1),       --ѧ��
  Hours int,                 --ѧʱ
  DeptID nchar(10),          --����ϵ
  Description ntext,         --�γ̼��
  Note ntext                 --��ע
)
GO
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('02524','�������������','Introduction to Computer Basics','',1,'16','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('02530','C�������','C Programming','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('02537','VB���ݿ⿪��Ӧ�ü���','the Development and Applications Technology of Database based on VB','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('04503','ְҵ��չ���ҵָ��','Career Development and Employment Guidance','',2,'38','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('04507','��ѧ������������','Students'' Mental Health Education','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('07501','����������','Current Issues and Policies','',2,'128','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('08501','��������','Military Theory','',1,'21','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('26433','����ѡ��','Introduction to Classical Literary Works','',1,'16','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('47542','ƽ��ͼ���붯������','Plane Figure and Animation Creation','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51536','��۾���ѧB','Macro-economics B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51550','��óӢ��','Business English','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51567','΢�۾���ѧB','Microeconomics B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51640','���÷�','Economic Law','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51904','���÷�*','Economic Law','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51906','���ʽ���*','International Finance','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51907','�й�����ó�׸���*','Introduction to Chinese Foreign Trade','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51909','����ó������*','International Trade System','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51914','����ó�׵���*','Geography of International Trade','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51916','���ʷ���ó��*','International Service Trade','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51917','���ʽ���*','International Settlement','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51926','��ó����*','International Business Communication','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51927','��óǢ̸*','International Business Negotiation','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51928','�����̷�*','International Business Law','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51933','��������ѧ*','Econometrics','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51934','֤ȯͶ�ʷ���*','Investment in security','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51935','��������*','International Business','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51936','���羭��*','World Economy','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51937','���ʼ���ó��*','International Technical Trade','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51938','����Ͷ��������˾*','Multinational Corporations and Foreign Investment','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51939','����ó�������뱣��*','Transportation and Insurance in Foreign Trade','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51940','���������ʵ��*','Foreign Exchange Theories and Practice','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51941','�����г�Ӫ��*','International Marketing','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51942','����Ͷ��ѧ*','International Investment','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51943','�����Ӫ����*','Introduction to Multinational Corporations','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51953','���ʾ���ѧ*','International Economics','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52503','�������B','Financial Management B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52518','���ѧB','Accounting B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52904','�������*','Financial Management','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53514','����ѧB','Management B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53571','�г�Ӫ��ѧC','Marketing C','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53624','ս�Թ���','Strategic Mangement','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53901','����ѧ*','Management','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54503','Web��������','Web Programming','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54505','XML������Լ�Ӧ��','XML (Extensible Markup Language) and Applications','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54519','��Ӧ������������','Supply Chain and Logisctics Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54526','�����˳�ѧA','Management Operation A','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54530','���������A','Computer Network A','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54537','�ͻ���ϵ����ϵͳ','Customer Relationship Management System','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54539','��ҵ��Դ�ƻ�ϵͳ','Enterprise Resource Planning System','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54542','���ݽṹ','Data Structure','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54555','��Ϣϵͳ�����������ʵ��A','Information System Analysis, Design and Realization A','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54582','IT��Ŀ����','IT Project Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54603','�����ѧѧ�Ƶ���','Introduction to Management Science','',1,'16','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54606','���ݿ�ԭ����Ӧ��','Database Principles and Application','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54616','����ͳ��B','Management Statistics B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54618','������Ϣϵͳ(˫��)','Management Information System(Bilingual)','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54653','�������������','Object-Oriented Programming','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54664','��������ѧ','Quantitative Economics','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54665','����Ӫ��(˫��)','Network Marketing(Bilingual)','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54669','��������(˫��)','Electronic Business(Bilingual)','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54670','�����������','Software Development Tools','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54671','��ҵ�����������ھ�','Business Intelligence and Data Mining','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54674','���紴ҵ����','Network Entreprenerial Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54676','��Ϣ����Ӧ��ǰ��','IT Application Frontier','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54677','����������Ӫ����','E-Business Operation Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54683','���������ϵͳB','Computer Operating System','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54684','�߼����ݿ����','Advanced Database Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54685','�����������ר��','Case Study on Software Development','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54686','֪ʶϵͳ����','Knowledge System Engineering','',1,'16','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54901','��������*','Electronic Commerce','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('54903','��������*','Management of Logistics','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('63519','������������ͳ��A','Probability Theory and Mathematical Statistics A','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('63522','�ߵ���ѧA1','Advanced Mathematics A1','',5,'80','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('63523','�ߵ���ѧA2','Advanced Mathematics A2','',5,'80','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('63564','���Դ���A','Linear Algebra A','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('67526','�������ѧ','Social Psychology','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('73508','Ӣ��2','College English 2','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('73509','Ӣ��3','College English 3','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('73510','Ӣ��4','College English 4','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('73553','Ӣ��5','College English 5','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('74509','˼����������뷨�ɻ���','Ideological and Ethical Cultivation and Foundations of Law','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('74510','�й����ִ�ʷ��Ҫ','The Outline of Modern Chinese History','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('74514','ë��˼����й���ɫ�������������ϵ����1','Introduction to Mao Zedong Thought and the Theoretical System of Socialism with Chinese Characteristics 1','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('74515','ë��˼����й���ɫ�������������ϵ����2','Introduction to Mao Zedong Thought and the Theoretical System of Socialism with Chinese Characteristics 2','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('74516','���˼�������ԭ�����','Introduction to the Basic Principles of Marxism','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51501','����ѧ','Public Finance','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51523','����ó��������ʵ��B','International Trade Theories and Practice B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51537','��������ѧ','Monetary Banking','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('51599','�ʱ���Ӫ','Capital Operation','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52506','�ɱ����','Cost Accounting','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52507','�߼��������','Advanced Financial Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52513','����˰��','International Taxation','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52515','�������ר��','Accounting Theories','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52516','�����Ϣϵͳ','Accounting information System','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52535','�ʲ�����','Asset Evaluation','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52543','������������','Computerized Financial Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52549','�߼�������','Advanced Financial Accounting','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52554','���ѧԭ��(˫��)','Principles of Accounting(Bilingual)','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52555','�������','Financial Analysis','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52556','���ѧ','Auditing','',4,'64','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52557','������ҵ���','Financial Enterprises Accounting','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52569','˰��','Tax Law','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52571','�м�������','Intermediate Financial Accounting','',6,'96','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52572','������(˫��)','Managerial Accounting(Bilingual)','',3,'48','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52573','��˾ս������չ���','Corporate Strategy and Risk Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52574','�ڲ�����','Internal Control','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52701','˰�ճﻮ','Taxation Planning','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('52905','���ǰ���о�*','Accounting Frontier Research','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53515','����ѧѧ��ר�⽲��','Special Lectures on Management Science','',1,'18','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53518','����ѧԭ���Ķ�','Selective Readings of Classic Works on Management Science','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53547','������Դ����','Human Resource Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53562','��������������B','Production and Operation Management B','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53679','��ҵͶ�������ʹ���','Entrepreneurial Financial and Investment Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('53812','��ҵ����','Entrepreneurial Management','',2,'32','','','')
INSERT INTO courses(CourseID,CourseName,EnglishName,CategoryID,Credit,Hours,DeptID,Description,Note) VALUES ('59528','����ѧ','Finance','',2,'32','','','')
GO

--��Դ�����
create table ResourceCategories (
  CategoryID nchar(8) primary key,    --��Դ����
  CategoryName nvarchar(50),          --��Դ�������
  EnglishName nvarchar(50),          --��Դ�������
  Description ntext,             --��Դ������
  ParentNodeID  nchar(8),        --���ڵ�
  IsParentFlag tinyint,          --�Ƿ��Ǹ��ڵ�
  Level tinyint,                 --�ڵ���
  Note ntext                     --��ע
)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('A','���ӿμ�','',1,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('A1','���ӿμ�ppt','A',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('A2','���ӽ̰�','A',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('A3','���ӽ���','A',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('B','������Ƶ','',0,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('C','����ͼ��','',0,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('D','��ѧ�ļ�','',1,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('D1','��ѧ���','D',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('D2','���Դ��','D',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('D3','�γ̼��','D',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('E','ʵ���ѧ','',1,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('E1','ʵ�鱨���ʽ�淶','E',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('E2','ʵ��ָ����','E',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('E3','ʵ�鱨�淶��','E',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('F','��Ϣϵͳʵ��','',1,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('F1','��Դϵͳʵ��','F',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('F2','��Ϣϵͳ��ʾ��','F',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('G','������','',0,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('H','ѧ�ƾ�����Ʒ','',1,1)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('H1','��ս��������Ʒ','H',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('H2','������������Ʒ','H',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('H3','�����Ϣ��������Ʒ','H',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('H4','ERPɳ����Ʒ','H',0,2)
insert into ResourceCategories (CategoryID,CategoryName,ParentNodeID,IsparentFlag,Level)values('X','������Դ','',0,1)

--��Դ��
create table Resources (
  ResourceID nchar(8) primary key,  --��Դ����
  ResourceName nvarchar(50),        --��Դ����
  CategoryID nchar(8),              --������Դ���(categoryID��
  CourseID nchar(8),                 --��Ӧ�Ŀγ̱���
  Contributor nchar(8),             --��Դ�ṩ�ߣ���Ӧ��ʦ����TeacherID
  UpLoadDate datetime default (getdate()),          --�ṩ����
  FileSize bigint,                  --��Դ��С(x B)
  FileOSname nvarchar(250),         --�ļ����ڵ�·��
  FileSourceName nvarchar(250),     --����Դ�ļ�����
  FileSizeDesc nvarchar(100),           --�ļ�ͼ���С
  DownLoadTimes int,                --���ش���
  Description ntext,                --��Դ����
  Note ntext                        --��ע
)
GO
--ģ������resource����
insert into Resources (resourceID,resourceName,categoryID,courseid)
select 'A1'+courseid,coursename+'���ӿμ�ppt','A1',courseid from courses
union all
select 'A2'+courseid,coursename+'�̰�','A2',courseid from courses
union all
select 'A3'+courseid,coursename+'����','A3',courseid from courses
union all
select 'D1'+courseid,coursename+'��ѧ���','D1',courseid from courses
union all
select 'D3'+courseid,coursename+'���γ̼��','D3',courseid from courses
union all
select 'E101' as f1,'���ù���ʵ�鱨���׼��ʽ' as f2,'E1' as f3,'' as f4
union all
select 'E2'+courseid,coursename+'ʵ��ָ����','E2',courseid from courses where left(courseid,2)='54'
union all
select * from
(select top 10 'E3'+courseid as f1,coursename+'ʵ�鱨��' as f2,'E3' as f3,courseid from courses where left(courseid,2)='54' order by newid()) as p
union all
select 'F1'+courseid,coursename+'Դ��ʵ��','F1',courseid from courses where left(courseid,2)='54'
union all
select* from
(select top 25 'F2'+courseid as f1,coursename+'��ʾϵͳ' as f2,'F2' as f3,courseid from courses where left(courseid,2)='54' order by newid()) as p
union all
select * from
(select top 10 'C'+courseid as f1,coursename+'ʵ���̳�' as f2,'C' as f3,courseid from courses where left(courseid,2)='54' order by newid()) as p
union all
select 'G'+courseid,coursename+'������','G',courseid from courses where left(courseid,2)='53'
GO
create table basicinfotypes (
  id int identity primary key,
  type nvarchar(250),
  ParentNodeID nvarchar(10) default '',
  IsParentFlag int default 0,
  Level int default 1
)
INSERT INTO basicinfotypes(type) VALUES ('����')
INSERT INTO basicinfotypes(type) VALUES ('ѧ��')
INSERT INTO basicinfotypes(type) VALUES ('ְ��')
INSERT INTO basicinfotypes(type) VALUES ('�о���')
GO
create table basicinfo (
  id int identity primary key,
  type nvarchar(50),
  name nvarchar(250)
)
INSERT INTO basicinfo(Type,Name) VALUES ('ְ��','����')
INSERT INTO basicinfo(Type,Name) VALUES ('ְ��','�о�Ա')
INSERT INTO basicinfo(Type,Name) VALUES ('ְ��','������')
INSERT INTO basicinfo(Type,Name) VALUES ('ְ��','���о�Ժ')
INSERT INTO basicinfo(Type,Name) VALUES ('ְ��','�߼�����ʦ')
INSERT INTO basicinfo(Type,Name) VALUES ('ְ��','��ʦ')
INSERT INTO basicinfo(Type,Name) VALUES ('ְ��','����ʦ')
INSERT INTO basicinfo(Type,Name) VALUES ('ְ��','����')
INSERT INTO basicinfo(Type,Name) VALUES ('ְ��','����')
INSERT INTO basicinfo(Type,Name) VALUES ('ѧ��','��ʿ�о���')
INSERT INTO basicinfo(Type,Name) VALUES ('ѧ��','��ʿ')
INSERT INTO basicinfo(Type,Name) VALUES ('ѧ��','˶ʿ�о���')
INSERT INTO basicinfo(Type,Name) VALUES ('ѧ��','˶ʿ')
INSERT INTO basicinfo(Type,Name) VALUES ('ѧ��','����')
INSERT INTO basicinfo(Type,Name) VALUES ('ѧ��','ר��')
INSERT INTO basicinfo(Type,Name) VALUES ('ѧ��','����')
INSERT INTO basicinfo(Type,Name) VALUES ('����','�й���Ա')
INSERT INTO basicinfo(Type,Name) VALUES ('����','����')
INSERT INTO basicinfo(Type,Name) VALUES ('����','��')
INSERT INTO basicinfo(Type,Name) VALUES ('����','���')
INSERT INTO basicinfo(Type,Name) VALUES ('����','�¹���')
INSERT INTO basicinfo(Type,Name) VALUES ('����','����')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','���򾭼÷�չ�о���')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','���򾭼������о���')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','�ִ���Ϣϵͳ�����о���')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��ҵ�����о���')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��֯�����о���')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��ҵ�����о���')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','������Դ�����о���')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','�������о���')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','������Դ�����о���')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���1')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���2')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���3')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���4')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���5')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���6')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���7')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���8')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���9')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���10')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���11')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���12')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���13')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���14')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���15')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','��������Ϊ�о���16')
INSERT INTO basicinfo(Type,Name) VALUES ('�о���','����')
GO
create table labs (    --ʵ����
  LabID nvarchar(12) primary key,   --����
  LabName nvarchar(50),  --ʵ��������
  Room nvarchar(50),   --�ص�
  Chief  nvarchar(50),    --������
  Capacity int,    --����
  Area decimal(7,1),   --�����С
  FileSize bigint,                  --ͼƬ��С(x B)
  FileOSname nvarchar(250),         --ͼƬ���ڵ�·��
  FileSourceName nvarchar(250),     --ͼƬԴ�ļ�����
  FileSizeDesc nvarchar(100),       --ͼ���ļ���С
  Description ntext,    --����
  DPartition1 nvarchar(500),  --����1����˵��
  DPartition2 nvarchar(500),  --����2����˵��
  DPartition3 nvarchar(500),  --����3����˵��
  DPartition4 nvarchar(500),  --����4����˵��
  DPartition5 nvarchar(500),  --����5����˵��
  DPartition6 nvarchar(500),  --����6����˵��
  DPartition7 nvarchar(500),  --����7����˵��
  DPartition8 nvarchar(500),  --����8����˵��
  DPartition9 nvarchar(500),  --����9����˵��
  KPartition1 nvarchar(500),  --����1ά��˵��
  KPartition2 nvarchar(500),  --����2ά��˵��
  KPartition3 nvarchar(500),  --����3ά��˵��
  KPartition4 nvarchar(500),  --����4ά��˵��
  KPartition5 nvarchar(500),  --����5ά��˵��
  KPartition6 nvarchar(500),  --����6ά��˵��
  KPartition7 nvarchar(500),  --����7ά��˵��
  KPartition8 nvarchar(500),  --����8ά��˵��
  KPartition9 nvarchar(500)   --����9ά��˵��
  )
GO  
insert into labs (Labid,Labname,room,Chief,Capacity,area,description,dPartition1,dPartition2,dPartition3)
values('6080','��Ϣ��������Ϣϵͳʵ����','7-608','ף����',72,20,'','winxp;Delphi2010;Sql Server2008','winxp;Delphi7;Sql Server2005;C-free','winxp;J2EE;EXTJS;Sql Server2008')
insert into labs (Labid,Labname,room,Chief,Capacity,area,description,dPartition1,dPartition2,dPartition3)
values('6051','��������ʵ����','7-605','������',80,200,'','winxp;����ERP;Sql Server2008','winxp;���ɵ�������ģ��ϵͳ;Sql Server2005;C-free','winxp;J2EE;EXTJS;Sql Server2008')
insert into labs (Labid,Labname,room,Chief,Capacity,area,description,dPartition1,dPartition2,dPartition3)
values('6052','���½���ʵ����','7-605','���پ�',80,200,'','winxp;����ERP;Sql Server2008','winxp;���ɵ�������ģ��ϵͳ;Sql Server2005;C-free','winxp;J2EE;EXTJS;Sql Server2008')
insert into labs (Labid,Labname,room,Chief,Capacity,area,description,dPartition1,dPartition2,dPartition3)
values('6170','���ù������ʵ����','7-617','��Ρ',120,350,'','winxp;����ERP;Sql Server2008','winxp;���ɵ�������ģ��ϵͳ;Sql Server2005;C-free','winxp;J2EE;EXTJS;Sql Server2008')
insert into labs (Labid,Labname,room,Chief,Capacity,area,description,dPartition1,dPartition2,dPartition3)
values('4070','��רҵʵѵʵ��ƽ̨','7-407','����ΰ',64,300,'','����VBSE','winxp;���ɵ�������ģ��ϵͳ;Sql Server2005;C-free','winxp;J2EE;EXTJS;Sql Server2008')
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

