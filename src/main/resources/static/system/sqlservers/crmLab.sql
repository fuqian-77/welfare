if object_id('sys_unit') is not null
	drop table sys_unit
GO
if object_id('sys_menu') IS NOT NULL
   drop table sys_menu
GO
if object_id('sys_myunit') is not null
	drop table sys_myunit
GO
if object_id('dictionary') is not null
	drop table dictionary
GO
if object_id('Activities') is not null
	drop table Activities
GO
if object_id('Services') is not null
	drop table Services
GO
if object_id('Faqs') is not null
	drop table Faqs
GO
if object_id('Troubles') is not null
	drop table Troubles
GO
if object_id('CollectionItems') is not null
	drop table CollectionItems
GO
if object_id('Collections') is not null
	drop table Collections
GO
if object_id('OrderItems') is not null
	drop table OrderItems
GO
if object_id('ShippedItems') is not null
	drop table ShippedItems
GO
if object_id('Contacts') is not null
	drop table Contacts
GO
if object_id('Orders') is not null
	drop table Orders
GO
if object_id('Invoices') is not null
	drop table Invoices
GO
if object_id('Products') is not null
	drop table Products
GO
if object_id('Categories') is not null
	drop table Categories
GO
if object_id('departments') is not null
	drop table departments
GO
if object_id('Customers') is not null
	drop table Customers
GO
if object_id('AccountReceivable') is not null
	drop table AccountReceivable
GO
if object_id('CustomerGrades') is not null
	drop table CustomerGrades
GO
if object_id('Suppliers') is not null
	drop table Suppliers
GO
if object_id('Employees') is not null
	drop table Employees
GO
if object_id('Shippers') is not null
	drop table Shippers
GO	
if object_id('HistoryInvoices') is not null
	drop table HistoryInvoices
GO
if object_id('Accounts') is not null
	drop table Accounts
GO
if object_id('Areas') IS NOT NULL
   drop table Areas
GO
if object_id('sys_user') IS NOT NULL
   drop table sys_user
GO
if object_id('sys_userlog') IS NOT NULL
   drop table sys_userlog
GO
if object_id('sys_userright') IS NOT NULL
   drop table sys_userright
GO
if object_id('sys_backupdatabase') IS NOT NULL
   drop table sys_backupdatabase
GO
if object_id('sys_restoredatabase') IS NOT NULL
   drop table sys_restoredatabase
GO
if object_id('sys_searchdefinitions') IS NOT NULL
   drop table sys_searchdefinitions
GO

if OBJECT_id('sys_customerreceivables') is not null   drop function sys_customerreceivables
go
IF (OBJECT_ID('sys_FloatToRmb') IS NOT NULL)  DROP FUNCTION sys_FloatToRmb 
GO
if (object_id('myGetUserRight') is not null) drop function myGetUserRight
go
if OBJECT_id('sys_receivabledetails') is not null drop function sys_receivabledetails
go
if OBJECT_id('sys_receivables') is not null  drop function sys_receivables
go

if object_id('prog_productsales') IS NOT NULL
drop  table prog_productsales
go

/********************** 账套表************************/
CREATE TABLE sys_unit(
  unitid int identity(100,1),
  unitno char(2) primary key,
  unitname nvarchar(100), 
  unitchief nvarchar(30),
  dbname varchar(100),
  sqlserver nvarchar(255),  --服务器
  sqlpassword nvarchar(25),
  unitShortName varchar(12) default '',
  pyCode nvarchar(40) default '',
  Address nvarchar(100)  default '',
  CityID nvarchar(10)  default '',
  ProvinceID nvarchar(10)  default '',
  Zip nvarchar(10)  default '',
  Phone nvarchar(25)  default '',
  Fax nvarchar(25)  default '',
  Email nvarchar(50)  default '',
  HomePage nvarchar(60)  default '',
  Bank nvarchar(50) default '',
  BankAccountno nvarchar(30) default '',
  Taxno nvarchar(30) default '',	
  VatInvoiceTitle nvarchar(100) default '',
  Vatbank nvarchar(50) default '',
  VatbankaccountNo nvarchar(30) default '',
  VatAccountPhone nvarchar(25) default '',
  VatAccountAddress nvarchar(100) default '',
  Industry nvarchar(40) default '',  --行业
  notes ntext,
  createdate date,
  updatedate date,
  unittitle as unitno+' '+rtrim(unitname)  
)
/*************************sys_menu 系统菜单表**************************/
CREATE TABLE sys_menu(
	SysID bigint IDENTITY(1,1) Primary key,   --添加主键
	MenuID varchar(14) default '',
	MenuTitle varchar(100) default '',  
	ServiceFile varchar(100) default '',   
	Menuurl varchar(100) default '',   
	ParentNodeID varchar(14) default '',
	IsparentFlag int,
	level int,
	type tinyint,   --1业务模块     2-初始化    9-系统管理
	isvisible bit,
	Parentnodes nvarchar(255) default '',   --各级父节点
	addflag_enabled bit,  --是否提供新增功能
	updateflag_enabled bit,  --是否提供修改功能
	deleteflag_enabled bit,  --是否提供删除功能
	reviewflag_enabled bit,  --是否提供审核功能
	uploadflag_enabled bit,  --是否提供上传功能
	downloadflag_enabled bit,  --是否提供下载功能
	printflag_enabled bit  --是否提供打印功能	
)
GO
----本单位信息
CREATE TABLE sys_myunit(
  unitid int identity(100,1) primary key,
  unitname nvarchar(100), 
  unitchief nvarchar(30),
  sqlserver nvarchar(255),  --服务器
  sqlpassword nvarchar(25),
  unitShortName varchar(12) default '',
  pyCode nvarchar(40) default '',
  Address nvarchar(100)  default '',
  CityID nvarchar(10)  default '',
  ProvinceID nvarchar(10)  default '',
  Zip nvarchar(10)  default '',
  Phone nvarchar(25)  default '',
  Fax nvarchar(25)  default '',
  Email nvarchar(50)  default '',
  HomePage nvarchar(60)  default '',
  Bank nvarchar(50) default '',
  BankAccountno nvarchar(30) default '',
  Taxno nvarchar(30) default '',	
  VatInvoiceTitle nvarchar(100) default '',
  Vatbank nvarchar(50) default '',
  VatbankaccountNo nvarchar(30) default '',
  VatAccountPhone nvarchar(25) default '',
  VatAccountAddress nvarchar(100) default '',
  Industry nvarchar(40) default '',  --行业
  notes ntext,
  createdate date,
  unitno as right(str(unitid,3),2),
  unittitle as right(str(unitid,3),2)+' '+rtrim(unitname)  
)
/********************** Areas表************************/
CREATE TABLE Areas(
	AreaID nchar(10) primary key default '',
	AreaName nvarchar(30) default '',
	PYCode nvarchar(15) default '',
	Zip nchar(10) default '',
	PhoneCode nchar(10) default '',
	ParentNodeID nchar(10) default '',
	IsparentFlag tinyint default '',
	parentnodes varchar(255),
	level tinyint default 0
)	
GO
create table departments (
	departmentid char(12),
	departmentname varchar(80),
	notes ntext
)	

create table dictionary (
  sysID bigint identity primary key clustered,
  Type nvarchar(100) default '',
  Description nvarchar(200) default '',
  Pycode nvarchar(40) default '',
  notes nvarchar(500) default ''
)
GO
CREATE TABLE Activities(
	ActivityID bigint IDENTITY(1,1) primary key,
	ActivityTitle nvarchar(100) default '',
	ActivityType nvarchar(60) default '',
	CustomerID nchar(14) default '',
	ContactID  nchar(14) default '',
	EmployeeID nchar(14) default '',
	Opportunity nvarchar(60) default '',
	Priority char(6) default '',
	StartDate date ,
	StartTime nvarchar(10) default '',
	EndDate date,
	EndTime nvarchar(10) default '',
	DurationHours decimal(6,2) default 0,
	ReminderFlag bit,
	--ReminderDate date NULL,
	ReminderTime nvarchar(10) ,
	ReminderMinutes int default 0,
	RecurrFlag bit default 0,
	Frequency nvarchar(10) default '',
	Closed bit default 0,
	ValidDays int default 0,  --有效期
	IsPublic bit default 0,
	filename nvarchar(255) default '',
	FilePath nvarchar(255) default '',
	Notes ntext default '',
	Comment ntext default '',
	Grade nvarchar(40) default '',
	Expense decimal(12,2) default 0,  --支出
	Profit decimal(12,2) default 0,   --收益
	ResultFlag bit default 0,   --是否转换为订单
	StartDateTime as convert(varchar(10),StartDate,120)+' '+cast(StartTime as varchar(10)) persisted,
	EndDateTime as convert(varchar(10),EndDate,120)+' '+cast(EndTime as varchar(10)) persisted,
	Creator nvarchar(30) default '',
	Reviewer nvarchar(30) default '',
	Operator nvarchar(30) default '',
	ReviewDate date,
	CreateDate date,
	UpdateDate date
)
GO

CREATE TABLE Services(
	ServiceID bigint IDENTITY(1,1) primary key,
	ServiceTitle nvarchar(100) default '',
	ServiceType nvarchar(60) default '',
	CustomerID nchar(14) default '',
	ContactID  nchar(14) default '',
	EmployeeID nchar(14) default '',
	ProductID  nchar(14) default '',
	OrderID nvarchar(20) default '',
	ServiceDate date,
	ServiceEndFlag bit,  --是否结束
	ServiceEndDate date,
	ServiceNotes ntext default '',
	IsPublic bit NULL,
	filename nvarchar(255) default '',
	FilePath nvarchar(255) default '',
	Grade nvarchar(40) default '',
	ServiceComment ntext default '',
	Creator nvarchar(30) default '',
	Operator nvarchar(30) default '',
	Reviewer nvarchar(30) default '',
	CreateDate date,
	UpdateDate date,
	ReviewDate date
)
GO
CREATE TABLE Faqs(
	FaqID bigint IDENTITY(1,1) primary key,
	FaqTitle nvarchar(100) default '',
	FaqType nvarchar(60) default '',
	Grade nvarchar(60) default '',  --重要程度
	ProductID  nchar(14) default '',
	ReportedDate date,
	Notes ntext default '',
	Solutions ntext default '',
	FaqEndFlag bit default 0,  --是否解决
	filename nvarchar(255) default '',
	FilePath nvarchar(255) default '',
	Creator nvarchar(30) default '',
	Operator nvarchar(30) default '',
	CreateDate date,
	UpdateDate date
)
GO
CREATE TABLE Troubles(
	TroubleID bigint IDENTITY(1,1) primary key,
	TroubleTitle nvarchar(100) default '',
	TroubleType nvarchar(60) default '',
	Grade nvarchar(60) default '',  --重要程度
	ProductID  nchar(14) default '',
	ReportedDate date,
	SolutionDate date,
	Notes ntext default '',
	Solutions ntext default '',
	TroubleEndFlag bit default 0,  --是否解决
	filename nvarchar(255) default '',
	FilePath nvarchar(255) default '',
	Creator nvarchar(30) default '',
	Operator nvarchar(30) default '',
	CreateDate date,
	UpdateDate date
)
GO
CREATE TABLE Categories (
 CategoryID nchar(14) PRIMARY KEY  CLUSTERED,
 CategoryName nvarchar(80) default '',
 EnglishName  nvarchar(80) default '',
 Description ntext NULL default '',
 ParentNodeID nchar(14) default '',
 IsParentFlag int default 0,
 Level tinyint default 0,
 Picture image NULL 
)
GO
/********************** Suppliers 供应商表************************/
CREATE TABLE Suppliers (
	SupplierID nchar(14) PRIMARY KEY CLUSTERED,
	SupplierName nvarchar(100) NOT NULL default '',
	pyCode nvarchar(40) default '',
	Contactname nvarchar(30)  default '',
	Address nvarchar(100)  default '',
	CityID nvarchar(10)  default '',
	ProvinceID nvarchar(10)  default '',
	Zip nvarchar(10)  default '',
	Phone nvarchar(25)  default '',
	Fax nvarchar(25)  default '',
	Email nvarchar(50)  default '',
	HomePage nvarchar(60)  default '',
	Employees int default 0,
	Revenue decimal(12,2) default 0,
	StockNo char(8) default '',
    Bank nvarchar(40) default '',
	BankAccountno nvarchar(30) default '',
	Taxno nvarchar(30) default '',	
	VatInvoiceTitle nvarchar(100) default '',
	Vatbank nvarchar(40) default '',
	VatbankaccountNo nvarchar(30) default '',
	VatAccountPhone nvarchar(25) default '',
	VatAccountAddress nvarchar(100) default '',
	Owner nvarchar(30) default '',	
	LastMeetDate date default '',
	Type nvarchar(40) default '',  --类别
	Source nvarchar(40) default '',  --来源
	Status nvarchar(40) default '',  --状态
	Industry nvarchar(40) default '',  --行业
	ContactDate date default '',    --初次联系日期
	Filepath nvarchar(255) default '',
	filename nvarchar(255) default '',
	Notes ntext default '',
	Creator nvarchar(30) default '',
	Operator nvarchar(30) default '',
	CreateDate date default '',
	UpdateDate date default '',
	AccountReceivable decimal(14,2) default 0  --年初应收账款余额
 )
GO
/************************ Products 产品表*************************/
CREATE TABLE Products (
	ProductID nvarchar(14) PRIMARY KEY CLUSTERED,
	pyCode nvarchar(40) default '',
	ProductName nvarchar(100) NOT NULL,
	ProductShortName varchar(12),
	Englishname varchar(100),
	QuantityPerUnit nvarchar(60) default '',
	Unit nvarchar(16) default '',
	UnitPrice decimal(12,2) default 0,
	SupplierID nvarchar(14) default '',
	ParentNodeID nchar(14) default '',
	IsParentFlag tinyint default 0,
	Level tinyint default 0,
	ParentNodes nvarchar(255) default '',
	Quantity int default 0,
	Amount decimal(14,2) default 0,
	Taxrate decimal(6,2) default 0, --增值税率
	Filepath nvarchar(255) default '',
	filename nvarchar(255) default '',
	ReOrderLevel int DEFAULT (0) ,
	InventoryLimit int DEFAULT (0),
	Creator nvarchar(30) default '',
	Operator nvarchar(30) default '',
	CreateDate date default getdate(),
	UpdateDate date default getdate(),
	Notes ntext default '')
GO
/************************ CustomerTypes 客户类别表*************************/
CREATE TABLE CustomerGrades (
	TypeID tinyint identity(1,1) PRIMARY KEY CLUSTERED,
	TypeName nvarchar(40) NOT NULL ,
	Discountlimit money DEFAULT 0 CHECK(Discountlimit>=0) ,
	Receivableslimit money CHECK(Receivableslimit>=0)
)
GO
/**************************** AccountReceivable 客户应收账款期初余额***************************/
CREATE TABLE AccountReceivable(
	sysid bigint identity  PRIMARY KEY,
	CustomerID nchar(14) default '',
	AccountDate date,
	Description nvarchar(255) NULL ,
	Amount decimal(14,2) default 0,
	employeeid nvarchar(14)  --负责员工
 )
 GO 
/**************************** Customers 客户表***************************/
CREATE TABLE Customers(
	CustomerID nchar(14) PRIMARY KEY CLUSTERED,
	CustomerName nvarchar(100) NOT NULL default '',
	CustomerShortName varchar(12) default '',
	pyCode nvarchar(40) default '',
	ContactID nvarchar(14)  default '',
	employeeID nvarchar(14) default '',    --负责的员工
	Address nvarchar(100)  default '',
	CityID nvarchar(10)  default '',
	ProvinceID nvarchar(10)  default '',
	Zip nvarchar(10)  default '',
	Phone nvarchar(25)  default '',
	Fax nvarchar(25)  default '',
	Email nvarchar(50)  default '',
	HomePage nvarchar(60)  default '',
	Employees int default 0,
	Revenue decimal(12,2) default 0,
	StockNo char(8) default '',
    Bank nvarchar(40) default '',
	BankAccountno nvarchar(30) default '',
	Taxno nvarchar(30) default '',	
	VatInvoiceTitle nvarchar(100) default '',
	Vatbank nvarchar(40) default '',
	VatbankaccountNo nvarchar(30) default '',
	VatAccountPhone nvarchar(25) default '',
	VatAccountAddress nvarchar(100) default '',
	Owner nvarchar(30) default '',	
	LastMeetDate date default '',
	Type nvarchar(40) default '',  --类别
	Source nvarchar(40) default '',  --来源
	Status nvarchar(40) default '',  --状态
	Industry nvarchar(40) default '',  --行业
	ContactDate date default '',    --初次联系日期
	Filepath nvarchar(255) default '',
	filename nvarchar(255) default '',
	Notes ntext default '',
	Creator nvarchar(30) default '',
	Operator nvarchar(30) default '',
	CreateDate date default '',
	UpdateDate date default '',
	AccountReceivable decimal(14,2) default 0  --年初应收账款余额
 )
 GO
 /************联系人信息*************/
 CREATE TABLE Contacts(
	ContactID char(14) primary key,
	ContactName nvarchar(50) default '',
	PYCode nvarchar(30) default '',
	CustomerID nvarchar(14) default '',
	Gender nchar(2) default '',
	BirthDate date,
	PID nchar(18) default '',  --身份证号
	Title nvarchar(40) default '',
	Department nvarchar(40) default '',
	Nickname nvarchar(20) default '',
	Address [nvarchar](100) NULL,
	ProvinceID char(10) default '',
	cityID char(10) default '',
	Zip char(10) default '',
	HomePhone nvarchar(25) default '',
	OfficePhone nvarchar(25) default '',
	Mobile nvarchar(25) default '',
	Fax nvarchar(25) default '',
	Email nvarchar(50) NULL,
	HomePage nvarchar(255) default '',
	QQ nvarchar(20) default '',
	Hobbies nvarchar(255) default '',
	SpecialDay nvarchar(255) default '',
	Filepath nvarchar(255) default '',
	filename nvarchar(255) default '',
	IsPrimary bit, --是否主联系人
	Notes ntext,
	Creator nvarchar(30) default '',
	Operator nvarchar(30) default '',
	CreateDate date,
	UpdateDate date
) 
go 
 
/**************************** Shippers 运输公司表***************************/
CREATE TABLE Shippers (
	ShipperID nchar(14) PRIMARY KEY CLUSTERED,
	ShipperName nvarchar(100) NOT NULL ,
	pyCode nvarchar(40) default '',
	Address nvarchar(100) default '' ,
	CityID nvarchar(10) default '' ,
	ProvinceID nvarchar(10) default '',
	Zip nvarchar(10) default '' ,
	Phone nvarchar(25) default '',
	Fax nvarchar(25) default '',
	Email nvarchar(50) default '' ,
	HomePage nvarchar(100) default '',
    Bank nvarchar(40) default '',
	BankAccountno nvarchar(30) default '',
	Taxno nvarchar(30) default '',	
	VatInvoiceTitle nvarchar(100) default '',
	Vatbank nvarchar(40) default '',
	VatbankaccountNo nvarchar(30) default '',
	VatAccountPhone nvarchar(25) default '',
	VatAccountAddress nvarchar(100) default '',	
	Owner nvarchar(30) default '',	
	Notes ntext default '',
	Creator nvarchar(30) default '',
	Operator nvarchar(30) default '',
	CreateDate date,
	UpdateDate date
)
GO
/**************************** Employees 员工表***************************/
create table Employees (
  EmployeeID nchar(14) primary key,    --教师编码
  EmployeeName nvarchar(30) default '', 
  Account nvarchar(30) default '',   --系统操作账号
  Password nvarchar(30) default '',   --系统操作密码
  Pycode nvarchar(30) default '',       --姓名拼音
  IDNumber nchar(18) default '',        --身份证号
  Gender nchar(2) default '',          --性别   
  Department nchar(40) default '',        --教师所在部门
  BirthDate date,      --出生日期
  Hiredate date,      --进现单位日期
  Title nvarchar(40) default '',     --职务
  Graduate nvarchar(100) default '',  --毕业学校
  Graduatedate date,  --毕业时间
  Major nvarchar(30) default '',       --毕业专业
  Degree nvarchar(20) default '',      --学历学位
  Party nvarchar(20) default '',       --党派
  Provinceid nvarchar(10) default '',    --籍贯-省
  Cityid nvarchar(10) default '',    --籍贯-城市
  Nationality nvarchar(20) default '',    --民族
  WorkDate date,   --参加工作时间
  Address nvarchar(100) default '',     --家庭地址
  zip nchar(10) default '',         --邮政编码
  HomePhone nvarchar(20) default '',   --家庭电话
  OfficePhone nvarchar(20) default '',   --办公室电话
  Fax nvarchar(20) default '',   --传真
  Mobile nvarchar(20) default '',      --移动电话
  QQ nvarchar(40) default '',
  Email nvarchar(50) default '',       --电子邮箱
  Homepage nvarchar(50) default '',    --个人主页
  Filepath nvarchar(250) default '',     --照片源文件名称
  filename nvarchar(250) default '',     --照片文件所在的路径
  Expertise nvarchar(250) default '',    --专业特长
  Notes ntext default ''                 --备注（个人简介）
)
GO
/*************************** Orders 订单表**************************/
CREATE TABLE Orders (
	OrderID nchar(20) PRIMARY KEY CLUSTERED,
	OrderDate date,
	CustomerID nchar(14) default '',
	EmployeeID nchar(14) default '',
	ContractID nchar(20) default '',
	InvoiceID nchar(20) default '',
	InvoiceDate date,
	InvoiceIDSelected nchar(20) default '',  --临时选择未审核之前的发票号

	ContactID nchar(14) default '',  --联系人
	RequiredDate date,    --要求运输时间
	ShippedDate date ,   --实际发车时间
	ShipperID nchar(14) default '',  --运输公司编码
    Freight decimal(12,2) DEFAULT 0,   --运费
    Desination varchar(100),  --运输目的地
    
    Amount decimal(14,2) default 0,
    AccountRequiredDate date,
    Creator nvarchar(30) default '',
    Operator nvarchar(30) default '',
    Reviewer nvarchar(30) default '',
    CreateDate date,
    ReviewDate date,
    UpdateDate date,  
    Status int default 0,
    Notes ntext default '',
    filename nvarchar(255) default '',
    filepath nvarchar(255) default '',
    updateflag1 bigint default 0,  --特征值1（自身有没有修改过）
    updateflag2 bigint default 0   --特征值2（明细表有没有修改过）

)
GO
/************************** shipItems 订单明细表*************************/
CREATE TABLE ShippedItems (
	ShipID nchar(20) default '',
	ShipDate date,
	Warehouse nvarchar(40) default '',
	EmployeeID nvarchar(14) default '',
	Operator nvarchar(50) default '',
	OrderID nchar(20) default '',
	ProductID nvarchar(14) default '',
	UnitPrice decimal(14,2) DEFAULT (0),
	Quantity int DEFAULT(0),
	Discount decimal(6,2) DEFAULT (100),
	Amount as CAST(quantity*unitprice*discount/100 AS DECIMAL(16,2)),
	CreateDate date,
	ReviewDate date,
	UpdateDate date,
	CONSTRAINT PK_ShippedItems PRIMARY KEY CLUSTERED (ShipID,ProductID),
)
GO
CREATE TABLE OrderItems (
	OrderID nchar(20) default '',
	ProductID nvarchar(14) default '',
	UnitPrice decimal(12,2) DEFAULT (0),
	Quantity int DEFAULT(0),
	Discount decimal(6,2) DEFAULT (100),
	Amount as CAST(quantity*unitprice*discount/100 AS DECIMAL(16,2)),
	CONSTRAINT PK_OrderItems PRIMARY KEY CLUSTERED (OrderID,ProductID)
)
GO
/*************************** Invoices 发票表**************************/
CREATE TABLE Invoices (
	InvoiceID nchar(20) PRIMARY KEY CLUSTERED,
	InvoiceDate date,
	InvoiceType nchar(20) default '',
	CustomerID nchar(14) default '' ,
	EmployeeID nchar(14) default '',
    Amount decimal(14,2) default 0,
    Status int default 0,
    PayMode nvarchar(50) default '',  --付款方式
    Encryption ntext default '',  --密码
    Operator nvarchar(30) default '',
    creator nvarchar(30) default '',
    Reviewer nvarchar(30) default '',
    Collector nvarchar(30) default '',  --收款人
    CreateDate date,
    UpdateDate date,
    ReviewDate date,
    CollectionDate date,  --收款日期
    filepath nvarchar(250) default '',
    filename nvarchar(250) default '',
    Selectedorders ntext default '',
    notes ntext default '',
    updateflag1 bigint default 0,  --特征值1（自身有没有修改过）
    updateflag2 bigint default 0,  --特征值2（明细表有没有修改过）
)
GO
/*************************** HistoryInvoices 历史发票表**************************/
CREATE TABLE HistoryInvoices (
	InvoiceID nchar(20) PRIMARY KEY CLUSTERED,
	InvoiceDate date,
	InvoiceType nchar(20) default '',
	CustomerID nchar(14) NOT NULL ,
	EmployeeID nchar(14) default '',
    Amount decimal(14,2) default 0,
    Status int default 0,
    PayMode nvarchar(50) default '',  --付款方式
    Encryption ntext,  --密码
    Operator nvarchar(30) default '',
    creator nvarchar(30) default '',
    Reviewer nvarchar(30) default '',
    Receiver nvarchar(30) default '',  --收款人
    CreateDate date,
    UpdateDate date,
    ReviewDate date,
    ReceiveDate date,
    notes ntext default ''
)
GO
/************************ Collection 货款回笼明细表***********************/
CREATE TABLE Collections (
	CollectionID nchar(20) primary key,
	CollectionDate date,
	CustomerID nchar(14) default '', 
	EmployeeID nchar(14) default '',
	ContactID nchar(14) default '',
	Amount decimal(14,2) DEFAULT(0),
	filepath nvarchar(250) default '',
	filename nvarchar(250) default '',
	collector nvarchar(30) default '',  --收款人
	creator nvarchar(30) default '',
	operator nvarchar(30) default '',
	reviewer nvarchar(30) default '',
	createdate date,
	updatedate date,	
	reviewdate date,
	notes ntext default '',
	updateflag1 bigint default 0,
	updateflag2 bigint default 0
)
GO
/************************ CollectionItems 货款回笼明细表***********************/
CREATE TABLE CollectionItems (
	sysid bigint identity primary key,
	CollectionID nchar(20) default '',
	InvoiceID nchar(20) default '',
	PayDate date,
	Description nvarchar(255) default '',
	Paymode nvarchar(50) default '',
	Billno nvarchar(30) default '',  --相应对账凭证号
	Amount decimal(14,2) DEFAULT(0)

)
GO
/************************ Accounts 科目表 ***********************/
CREATE TABLE Accounts(
  AccountID nvarchar(14) primary key,
  AccountName nvarchar(50) DEFAULT '',
  EnglishName nvarchar(80) DEFAULT '',
  Pycode nvarchar(20) DEFAULT '',
  Debit decimal(14,2) DEFAULT 0,
  Credit decimal(14,2) DEFAULT 0,
  ParentNodeID varchar(14) DEFAULT '', 
  IsParentFlag tinyint DEFAULT 0,
  Level tinyint DEFAULT 0,
  UpdateDate date DEFAULT Getdate()
)
go
/**************************sys_user 用户账户表*******************************/
CREATE TABLE sys_user(
	UserID int IDENTITY(1,1),  --用户编码
	Account nvarchar(30) Primary key,  --用户账号
	Username nvarchar(30) default '',   --用户名称
	xtype varchar(1),
	pwd nvarchar(30) default '',    --密码
	Email nvarchar(50) default '',    
	RegistrationDate date default getdate(),    --注册日期
	Creator nvarchar(30) default '',
	Notes ntext default ''       --用户备注
)
GO
/**************************sys_userright用户权限表*******************************/
CREATE TABLE sys_userright (
	SysID int IDENTITY(1,1) Primary key,  
	UserID int,  --用户编号
	Account varchar(30) default '',      --用户账号
	MenuID nvarchar(14) default '',  --菜单
	addflag bit,    --新增的操作权限
	updateflag bit,    --修改的操作权限
	reviewflag bit,    --审核的操作权限
	deleteflag bit,    --删除的操作权限
	printflag bit,    --打印的操作权限
	uploadflag bit,
	downloadflag bit,
	saveflag as cast(addflag as int)+cast(updateflag as int)+cast(deleteflag as int)+cast(reviewflag as int),
	rightflag as cast(addflag as nvarchar(1))
	+cast(updateflag as nvarchar(1))
	+cast(deleteflag as nvarchar(1))
	+cast(reviewflag as nvarchar(1))
	+cast(uploadflag as nvarchar(1))
	+cast(downloadflag as nvarchar(1))
	+cast(printflag as nvarchar(1))
	--保存的操作权限
)

/**************************sys_operate_log 日志表*******************************/
CREATE TABLE sys_userlog(    --sys_operate_log(
	sysid int identity primary key,
	Account nvarchar(30) default '',
	operate_module nvarchar(60) default '',
	operate_type nvarchar(60) default '',
	operate_desc nvarchar(250) default '',
	Deleted tinyint  default 0,
	TimeIn date ,
	TimeOut date,
	AccTime date
) 
GO
/********************** sys_searchdefinitions搜索条件表************************/
CREATE TABLE sys_backupdatabase (
  id bigint identity primary key ,
  backupdate datetime,
  databasename varchar(255),
  backuppath varchar(500),
  description nvarchar(255),
  operator nvarchar(30),
  notes ntext
)
GO
CREATE TABLE sys_restoredatabase (
  id bigint identity primary key,
  restoredate datetime,
  databasename varchar(255),
  restorepath varchar(500),
  description nvarchar(255),
  operator nvarchar(30),
  notes ntext
)
GO
/********************** sys_searchdefinitions搜索条件表************************/
CREATE TABLE sys_searchdefinitions (
  ModuleID nvarchar(100) default '' ,--程序模块编号
  SearchID nvarchar(100) default '' ,--查找内容
  description nvarchar(100) default '', --查找方案描述
  keyword1 int,    --关键字选项述1
  operation1 int,  --操作运算符1
  text1 nvarchar(250) default '',  --查找内容1
  keyword2 int,    --关键字选项述2
  operation2 int,  --操作运算符2
  text2 nvarchar(250) default '',  --查找内容1
  Flagofandor int, --条件连接符号and/or
  sysid int identity primary key 
)
GO
---模拟数据
insert into sys_unit (unitno,unitname,dbname,createdate,unitchief,Address,Zip,Phone,fax) values('00','浙江理工大学演示版','crmlab',getdate(),'admin','浙江杭州下沙','310006','05718865434','057188945678')
insert into sys_unit (unitno,unitname,dbname,createdate,unitchief,Address,Zip,Phone,fax) values('01','杭州易通信息技术有限公司','',getdate(),'admin','浙江杭州西湖科技园区西园路','310013','','')
go
insert into sys_myunit (unitname,createdate,address,homepage) values('浙江理工大学',getdate(),'杭州市下沙高教园区','www.sina.com.cn');
go
insert into sys_user (Account,Username,pwd,xtype,Email) values('admin','admin','admin','s','admin@126.com');
insert into sys_user (Account,Username,pwd,xtype,Email) values('demo','demo','demo','u','demo@163.com');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user1','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user2','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user3','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user4','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user5','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user6','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user7','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user8','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user9','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user10','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user11','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user12','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user13','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user14','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user15','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user16','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user17','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user18','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user19','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user20','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user21','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user22','user1','user1','u','user@sina.com.cn');
insert into sys_user (Account,Username,pwd,xtype,Email) values('user23','user1','user1','u','user@sina.com.cn');
go
-----------------04-customertypes客户类别表------------------
GO
create index orders_orderdate on orders(orderdate)
create index orderitems_orderid on orderitems(orderid)
