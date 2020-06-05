--IF (OBJECT_ID('sys_FloatToRmb') IS NOT NULL)  DROP FUNCTION sys_FloatToRmb 
GO
CREATE FUNCTION sys_FloatToRmb (@amount decimal(15,2))
RETURNS varchar(100) AS
BEGIN
  DECLARE @s1 varchar(20) , @s2 varchar(6), @rmb varchar(80)
  DECLARE @s11 varchar(40), @s12 varchar(40) , @s13 varchar(40)
  SET @s1=STR(1000000000000+@amount,16,2)  --��ֵ���ת�����ַ���
  SET @s2=RIGHT(@s1,2)           --ȡС�����֣���28
  SET @s11=SUBSTRING(@s1,2,4)    --ȡ�ڵ�����ֵ����0020
  SET @s12=SUBSTRING(@s1,6,4)    --ȡ�������ֵ����6058
  SET @s13=SUBSTRING(@s1,10,4)   --ȡ�����µ�����ֵ����0096
  SET @rmb=''
  IF @s11<>'0000'  --�������ڡ��ڡ���������ֵ
  BEGIN
    SELECT @s11=stuff(@s11,2,0,'Ǫ'), @s11=stuff(@s11,4,0,'��'), @s11=stuff(@s11,6,0,'ʰ')
    /* ��ʱs11��ֵΪ��0Ǫ0��2ʰ0��*/
    SELECT @s11=REPLACE(@s11,'0Ǫ','0') , @s11=REPLACE(@s11,'0��','0') ,
    @s11=REPLACE(@s11,'0ʰ','0')   /* ��ʱs11��ֵΪ��002ʰ0��*/
    SET @rmb=@s11+'��'   /* ��ʱrmb��ֵΪ��002ʰ0�ڡ�*/
  END
  IF @s12<>'0000'   --�������ڡ��򡱲�������ֵ
  BEGIN
   SELECT @s12=stuff(@s12,2,0,'Ǫ'), @s12=stuff(@s12,4,0,'��'), @s12=stuff(@s12,6,0,'ʰ')
   SELECT @s12=REPLACE(@s12,'0Ǫ','0'), @s12=REPLACE(@s12,'0��','0'),
   @s12=REPLACE(@s12,'0ʰ','0')
   SET @rmb=@rmb+@s12+'��'
  END
  ELSE  SET @rmb=@rmb+'0'
  IF @s13<>'0000'   --�������ڡ������²�������ֵ
  BEGIN
    SELECT @s13=stuff(@s13,2,0,'Ǫ'), @s13=stuff(@s13,4,0,'��'), @s13=stuff(@s13,6,0,'ʰ')
    SELECT @s13=REPLACE(@s13,'0Ǫ','0'), @s13=REPLACE(@s13,'0��','0'),
    @s13=REPLACE(@s13,'0ʰ','0')
    SET @rmb=@rmb+@s13+'Ԫ'
  END
  ELSE  SET @rmb=@rmb+'Ԫ'
  /* ��ʱrmb��ֵΪ��002ʰ0��6Ǫ05ʰ8��009ʰ6Ԫ����������ѭ��ȥ���ظ���0��*/
  WHILE CHARINDEX('00',@rmb)>0  SET @rmb=REPLACE(@rmb,'00','0')
  /* ��ʱrmb��ֵΪ��02ʰ��06Ǫ05ʰ8��09ʰ6Ԫ����������ʵ�λ���д���*/
  IF @amount>=1 SELECT @rmb=REPLACE(@rmb,'0��','��0'), @rmb=REPLACE(@rmb,'0��','��0'), 
  @rmb=REPLACE(@rmb,'0Ԫ','Ԫ0')
  /* ��ʱrmb��ֵΪ��02ʰ��06Ǫ05ʰ8��09ʰ6Ԫ2��8�֡���������ѭ��ȥ�������ظ���0��*/
  WHILE CHARINDEX('00',@rmb)>0  SET @rmb=REPLACE(@rmb,'00','0')
  /* �����ߵ�һ��Ϊ0����ȥ������*/
  IF LEFT(@rmb,1)='0' and @amount>=1  SET @rmb=SUBSTRING(@rmb,2,255)
  /* ��ʱrmb��ֵΪ��2ʰ��06Ǫ05ʰ8��09ʰ6Ԫ2��8�֡����洦��С�����֣��Ǻͷ֣���*/
  IF LEFT(@s2,1)<>'0'  SET @rmb=@rmb+substring(@s2,len(@s2)-01,1)+'��'
  IF RIGHT(@s2,1)<>'0'
  BEGIN
    IF LEFT(@s2,1)='0' SET @rmb=@rmb+'0'
    SET @rmb=@rmb+RIGHT(@s2,1)+'��'
  END
  ELSE  SET @rmb=@rmb+'��'
  /* ��ʱrmb��ֵΪ��2ʰ��06Ǫ05ʰ8��09ʰ6Ԫ2��8�֡����潫�����������滻�ɴ�д���֡�*/
  SELECT @rmb=replace(@rmb,'0','��'),
  @rmb=replace(@rmb,'1','Ҽ'), @rmb=replace(@rmb,'2','��'), @rmb=replace(@rmb,'3','��'),
  @rmb=replace(@rmb,'4','��'), @rmb=replace(@rmb,'5','��'), @rmb=replace(@rmb,'6','½'),
  @rmb=replace(@rmb,'7','��'), @rmb=replace(@rmb,'8','��'), @rmb=replace(@rmb,'9','��')
  RETURN(@rmb)
END
GO
