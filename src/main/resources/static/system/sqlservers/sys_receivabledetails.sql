--����ͻ�������������䣬����ÿͻ�Ӧ���˿���ϸ��
--if OBJECT_id('sys_receivabledetails') is not null drop function sys_receivabledetails
--go
create function sys_receivabledetails (@customerid varchar(20),@date1 date,@date2 date) 
returns @t table (id int identity primary key,xmonth int,xday int,docid varchar(20),description varchar(400),
debit decimal(14,2),credit decimal(14,2),balance decimal(14,2),flag char(2))
as
begin
declare @debit decimal(14,2),@credit decimal(14,2),@flag char(2),@amt decimal(14,2),@balance decimal(14,2)
declare @month int,@day int
declare @debitsum decimal(14,2),@creditsum decimal(14,2)
select @balance=accountreceivable from customers where customerid=@customerid
if (@balance>0) select @debit=@balance,@credit=0,@flag='��'
else if (@balance<0) select @credit=-@balance,@debit=0,@flag='��'
else select @debit=0,@credit=0,@flag='ƽ'
insert into @t (xmonth,xday,docid,description,debit,credit,balance,flag)
values('1','1','�ƻ�','�����ת',@debit,@credit,@balance,@flag)
insert into @t 
select month(invoicedate) as xmonth,day(invoicedate) as xday,invoiceid,
'��Ʒ����('+cast(selectedorders as varchar(255))+')' as description,
Amount as debit,0 as credit,0 as balance,'ƽ' as flag
from Invoices where CustomerID=@customerid
and invoicedate between @date1 and @date2 and reviewer<>''
union all
select month(paydate) as xmonth,day(paydate) as xday,a.collectionid,
case when Description='' or Description is null then '�������('+paymode+','+billno+')' else '�������('+Description+')' end as description,
0,a.Amount,0,'ƽ'
from CollectionItems a join Collections b on a.CollectionID=b.CollectionID
where CustomerID=@customerid
and paydate between @date1 and @date2 and reviewer<>''
order by xmonth,xday
declare c1 cursor for select debit,credit,xmonth,xday from @t
open c1
--declare @debit decimal(14,2),@credit decimal(14,2),@flag char(2),@amt decimal(14,2),@balance decimal(14,2)
--declare @month int,@day int
--declare @debitsum decimal(14,2),@creditsum decimal(14,2)
select @debitsum=0,@creditsum=0
fetch next from c1 into @debit,@credit,@month,@day
set @amt=0 --@debit-@credit
while @@fetch_status=0
begin
  set @balance=@amt+@debit-@credit
  select @debitsum=@debitsum+@debit,@creditsum=@creditsum+@credit
  update @t set balance=@balance where CURRENT of c1
  set @amt=@balance
  fetch next from c1 into @debit,@credit,@month,@day
end
deallocate c1
select @day=day(dateadd(month,1,str(year(@date2),4)+'-'+ltrim(str(@month,2))+'-01') - day(str(year(@date2),4)+'-'+ltrim(str(@month,2))+'-01'))
insert into @t (docid,description,debit,credit,balance,xmonth,xday)
values('�ƻ�','<center><b>*** ��&nbsp;�� ***</b></center>',@debitsum,@creditsum,@balance,@month,@day)
update @t set flag='��' where balance>0 
update @t set flag='��',balance=abs(balance) where balance<0 
update @t set debit=null where debit=0
update @t set credit=null where credit=0
return
end
go
--select * from .dbo.sys_receivabledetails('BJHKTC','2013-01-01','2013-08-31')
