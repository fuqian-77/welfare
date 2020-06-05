declare @x1 varchar(20),@x2 varchar(20),@x3 varchar(120),@i int,@j int
declare @xx1 varchar(20),@xx2 varchar(20),@xx3 varchar(20)
declare @s varchar(8000),@s1 varchar(1000),@s2 varchar(2000),@s3 varchar(2000)
declare c1 cursor scroll for select productid,parentnodeid,productname from Products 
open c1
set @s=''
fetch next from c1 into @x1,@x2,@x3
while @@FETCH_STATUS=0
begin
  set @s1='{'''+rtrim(@x1)+'''}'
  if CHARINDEX(@s1,@s)=0
  begin
	if (@s<>'') set @s=@s+','
    set @s=@s+@s1
  end  
  declare c2 cursor for select productid,parentnodeid,unitprice from products where parentnodeid=@x1
  open c2
  fetch next from c2 into @xx1,@xx2,@xx3
  set @s2=''
  set @j=1
  while @@FETCH_STATUS=0
  begin
    if (@s2<>'') set @s2=@s2+','
    set @s2=@s2+'{'''+rtrim(@xx1)+'''}'
	fetch next from c2 into @xx1,@xx2,@xx3
  end
  deallocate c2
  if rtrim(@s2)<>'' set @s=replace(@s,@s1,left(@s1,datalength(@s1)-1)+':children:['+@s2+']}')
  fetch next from c1 into @x1,@x2,@x3
  --print @s1+'>>>'+@s2+str(len(@s2),6)+'---------'+@s
  --print @s
  --print ''
end
print @s  --产生关键字的集合
fetch first from c1 into @x1,@x2,@x3
while @@FETCH_STATUS=0
begin
  set @s1=''''+rtrim(@x1)+''''
  set @s2='productid:"'+@x1+'",productname:"'+@x3+'"'
  set @s=REPLACE(@s,@s1,@s2)   --将关键字替换成json数据列即可
  fetch next from c1 into @x1,@x2,@x3
end
deallocate c1
print @s
go

