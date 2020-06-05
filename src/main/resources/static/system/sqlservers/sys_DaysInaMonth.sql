if (object_id('sys_DaysInaMonth') is not null) drop function sys_DaysInaMonth
go
create function sys_DaysInaMonth (@today date)
returns int
as
begin
  return (day(dateadd(day,-1,dateadd(day,-day(DateAdd(month,1,@today))+1,DateAdd(month,1,@today)))))
end
go
