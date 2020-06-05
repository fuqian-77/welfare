--create index orders_orderid on orders(orderid)
--create index orders_orderdate on orders(orderdate)
go

if (object_id('rpt_productsales') is not null) drop function rpt_productsales
go 
create function rpt_productsales (@date date)
returns @t table (
	ProductID nvarchar(14) Primary key,
	pyCode nvarchar(40),
	ProductName nvarchar(100),
	Englishname varchar(100),
	QuantityPerUnit nvarchar(60),
	Unit nvarchar(16),
	UnitPrice decimal(12, 2),
	ParentNodeID nchar(14),
	IsParentFlag tinyint,
	Level tinyint,
	sortFlag bit default 0,
	ParentNodes nvarchar(255),
	qty int default 0,amt decimal(14,2) default 0,ytdqty int default 0,ytdamt decimal(14,2) default 0,
	salesprice decimal(12,4) default null,ytdsalesprice decimal(12,2) default null
)
AS
begin
	declare @year int,@month int
	declare @date11 varchar(10),@date12 varchar(10),@date21 varchar(10),@date22 varchar(10)
	select @year=year(@date),@month=month(@date)
	set @date11=str(@year,4)+'-'+ltrim(str(@month,2))+'-01'
	set @date12=str(@year,4)+'-'+ltrim(str(@month,2))+'-'+ltrim(str(dbo.sys_DaysInaMonth(@date11),2))
	set @date21=str(@year,4)+'-01-01'
	set @date22=str(@year,4)+'-'+ltrim(str(@month,2))+'-'+ltrim(str(dbo.sys_DaysInaMonth(@date11),2))
	insert into @t (productid,productname,quantityperunit,unit,unitprice,parentnodeid,isparentflag,level,ParentNodes)
	select productid,productname,quantityperunit,unit,unitprice,parentnodeid,isparentflag,level,ParentNodes from Products 
	insert into @t (productid,productname,amt,ytdamt,sortflag,isparentflag,level,qty,ytdqty)
	values('','<center><b>*** ºÏ&nbsp;¼Æ ***</b></center>',0,0,1,1,0,null,null)
	;with tmp as(
		select productid,sum(a.quantity) as qty,SUM(a.amount) as amt,0 as ytdqty,0 as ytdamt 
		from OrderItems a 
		join Orders b on a.OrderID=b.OrderID 
		where reviewer<>'' and InvoiceDate>=@date11 and InvoiceDate<=@date12 group by ProductID
		union all
		select productid,0,0,sum(a.quantity) as qty,SUM(a.amount) as amt 
		from OrderItems a
		join Orders b on a.OrderID=b.OrderID where reviewer<>'' and InvoiceDate>=@date21 and InvoiceDate<=@date22 
		group by ProductID
	)
	update @t set qty=(select sum(tmp.qty) from tmp where tmp.productid=p.productid),
	amt=(select sum(tmp.amt) from tmp where tmp.productid=p.productid),
	ytdqty=(select sum(tmp.ytdqty) from tmp where tmp.productid=p.productid),
	ytdamt=(select sum(tmp.ytdamt) from tmp where tmp.productid=p.productid) 
	from @t as p where isparentflag=0
	update @t set qty=(select SUM(qty) from @t where parentnodes like rtrim(p.parentnodes)+rtrim(p.productid)+'#%' and isparentflag=0),
	amt=(select SUM(amt) from @t where parentnodes like rtrim(p.parentnodes)+rtrim(p.productid)+'#%' and isparentflag=0),
	ytdqty=(select SUM(ytdqty) from @t where parentnodes like rtrim(p.parentnodes)+rtrim(p.productid)+'#%' and isparentflag=0),
	ytdamt=(select SUM(ytdamt) from @t where parentnodes like rtrim(p.parentnodes)+rtrim(p.productid)+'#%' and isparentflag=0)
	from @t as p
	where isparentflag=1
	update @t set salesprice=case when qty<>0 then amt/qty else null end
	update @t set ytdsalesprice=case when ytdqty<>0 then ytdamt/ytdqty else null end
	update @t set unitprice=null where unitprice=0
	update @t set amt=(select sum(amt) from @t where level=1),ytdamt=(select sum(ytdamt) from @t where level=1) where productid=''
	return
end
go
select productid,qty,amt,isparentflag,parentnodes from .dbo.rpt_productsales('2012-8-21')
