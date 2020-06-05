--输入客户编码和日期区间，输出该客户应收账款明细账
--if OBJECT_id('sys_receivables') is not null  drop function sys_receivables
--go
create function sys_receivables (@customerid varchar(8000),@employeeid varchar(8000),@date1 date,@date2 date) 
returns @t table (id int identity primary key,xfield varchar(50),
accamount decimal(14,2) default 0,
received decimal(14,2) default 0,
balance decimal(14,2) default 0,flag char(2))
as
begin
	declare @cindex int,@eindex int
	if (@customerid='') set @cindex=-1
	else set @cindex=0
	if (@employeeid='') set @eindex=-1
	else set @eindex=0
	insert into @t (xfield,accamount,received)
	select xfield,sum(accamount),sum(received) from (
	select convert(char(10),a.invoicedate,120) as xfield, 
	sum(a.amount) as accamount,0 as received
	from invoices as a 
	where a.invoicedate between @date1 and @date2 and Reviewer<>''
	and charindex(rtrim(customerid),@customerid)>@cindex
	and charindex(rtrim(employeeid),@employeeid)>@eindex
	group by convert(char(10),a.invoicedate,120)
	union all
	select convert(char(10),b.collectiondate,120) as xfield, 
	0,sum(a.amount) as received
	from collectionitems as a 
	join collections as b on a.collectionid=b.collectionid
	where b.collectiondate between @date1 and @date2 and Reviewer<>''
	and charindex(rtrim(customerid),@customerid)>@cindex
	and charindex(rtrim(employeeid),@employeeid)>@eindex
	group by convert(char(10),b.collectiondate,120)
	union all
	select '' as xfield,sum(amount),0 from accountreceivable 
	where charindex(rtrim(customerid),@customerid)>@cindex
	and charindex(rtrim(employeeid),@employeeid)>@eindex
	union all
	select '' as xfield,sum(amount),0 from invoices 
	where invoicedate<@date1
	and charindex(rtrim(customerid),@customerid)>@cindex
	and charindex(rtrim(employeeid),@employeeid)>@eindex
	union all
	select '', 0,sum(a.amount) as received
	from collectionitems as a 
	join collections as b on a.collectionid=b.collectionid
	where b.collectiondate<@date1
	and charindex(rtrim(customerid),@customerid)>@cindex
	and charindex(rtrim(employeeid),@employeeid)>@eindex
	) as p
	group by xfield
	--计算余额
	declare c1 cursor for select xfield,accamount,received from @t order by xfield
	open c1
	declare @accamount decimal(14,2),@received decimal(14,2),@flag char(2),
	@amt decimal(14,2),@balance decimal(14,2),@xfield varchar(50)
	declare @month int,@day int
	fetch next from c1 into @xfield,@accamount,@received
	set @amt=0
	while @@fetch_status=0
	begin
		set @balance=@amt+@accamount-@received
		update @t set balance=@balance where CURRENT of c1
		set @amt=@balance
		fetch next from c1 into @xfield,@accamount,@received
	end
	deallocate c1
	return
end
go
