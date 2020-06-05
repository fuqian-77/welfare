--if (object_id('myGetUserRight') is not null) drop function myGetUserRight
--go
create function myGetUserRight(@account nvarchar(100))
returns @t table (f varchar(7000))
as
begin
	declare @s varchar(7000)
	set @s=''
	select @s=@s+',m'+RTRIM(menuid)+':"'+cast(addflag as varchar(10))
	+'#'+cast(updateflag as varchar(5))
	+'#'+cast(deleteflag as varchar(5))
	+'#'+cast(reviewflag as varchar(5))
	+'#'+cast(printflag as varchar(5))
	+'#'+cast(uploadflag as varchar(5))
	+'#'+cast(downloadflag as varchar(5))+'"'
	from sys_userright where account=@account
	insert into @t values('{'+substring(@s,2,7000)+'}')
	return  
end
go
--select LEN(f),f from .dbo.myGetUserRight('demo')
