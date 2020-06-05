--IF (OBJECT_ID('sys_FloatToRmb') IS NOT NULL)  DROP FUNCTION sys_FloatToRmb 
GO
CREATE FUNCTION sys_FloatToRmb (@amount decimal(15,2))
RETURNS varchar(100) AS
BEGIN
  DECLARE @s1 varchar(20) , @s2 varchar(6), @rmb varchar(80)
  DECLARE @s11 varchar(40), @s12 varchar(40) , @s13 varchar(40)
  SET @s1=STR(1000000000000+@amount,16,2)  --数值金额转换成字符串
  SET @s2=RIGHT(@s1,2)           --取小数部分，即28
  SET @s11=SUBSTRING(@s1,2,4)    --取亿的数量值，即0020
  SET @s12=SUBSTRING(@s1,6,4)    --取万的数量值，即6058
  SET @s13=SUBSTRING(@s1,10,4)   --取万以下的数量值，即0096
  SET @rmb=''
  IF @s11<>'0000'  --如果金额在“亿”部分中有值
  BEGIN
    SELECT @s11=stuff(@s11,2,0,'仟'), @s11=stuff(@s11,4,0,'佰'), @s11=stuff(@s11,6,0,'拾')
    /* 此时s11的值为：0仟0佰2拾0。*/
    SELECT @s11=REPLACE(@s11,'0仟','0') , @s11=REPLACE(@s11,'0佰','0') ,
    @s11=REPLACE(@s11,'0拾','0')   /* 此时s11的值为：002拾0。*/
    SET @rmb=@s11+'亿'   /* 此时rmb的值为：002拾0亿。*/
  END
  IF @s12<>'0000'   --如果金额在“万”部分中有值
  BEGIN
   SELECT @s12=stuff(@s12,2,0,'仟'), @s12=stuff(@s12,4,0,'佰'), @s12=stuff(@s12,6,0,'拾')
   SELECT @s12=REPLACE(@s12,'0仟','0'), @s12=REPLACE(@s12,'0佰','0'),
   @s12=REPLACE(@s12,'0拾','0')
   SET @rmb=@rmb+@s12+'万'
  END
  ELSE  SET @rmb=@rmb+'0'
  IF @s13<>'0000'   --如果金额在“万”以下部分中有值
  BEGIN
    SELECT @s13=stuff(@s13,2,0,'仟'), @s13=stuff(@s13,4,0,'佰'), @s13=stuff(@s13,6,0,'拾')
    SELECT @s13=REPLACE(@s13,'0仟','0'), @s13=REPLACE(@s13,'0佰','0'),
    @s13=REPLACE(@s13,'0拾','0')
    SET @rmb=@rmb+@s13+'元'
  END
  ELSE  SET @rmb=@rmb+'元'
  /* 这时rmb的值为：002拾0亿6仟05拾8万009拾6元。下面利用循环去掉重复的0。*/
  WHILE CHARINDEX('00',@rmb)>0  SET @rmb=REPLACE(@rmb,'00','0')
  /* 这时rmb的值为：02拾亿06仟05拾8万09拾6元。下面对量词单位进行处理。*/
  IF @amount>=1 SELECT @rmb=REPLACE(@rmb,'0亿','亿0'), @rmb=REPLACE(@rmb,'0万','万0'), 
  @rmb=REPLACE(@rmb,'0元','元0')
  /* 这时rmb的值为：02拾亿06仟05拾8万09拾6元2角8分。下面利用循环去掉可能重复的0。*/
  WHILE CHARINDEX('00',@rmb)>0  SET @rmb=REPLACE(@rmb,'00','0')
  /* 如果左边第一个为0，则去掉它。*/
  IF LEFT(@rmb,1)='0' and @amount>=1  SET @rmb=SUBSTRING(@rmb,2,255)
  /* 这时rmb的值为：2拾亿06仟05拾8万09拾6元2角8分。下面处理小数部分（角和分）。*/
  IF LEFT(@s2,1)<>'0'  SET @rmb=@rmb+substring(@s2,len(@s2)-01,1)+'角'
  IF RIGHT(@s2,1)<>'0'
  BEGIN
    IF LEFT(@s2,1)='0' SET @rmb=@rmb+'0'
    SET @rmb=@rmb+RIGHT(@s2,1)+'分'
  END
  ELSE  SET @rmb=@rmb+'整'
  /* 这时rmb的值为：2拾亿06仟05拾8万09拾6元2角8分。下面将阿拉伯数字替换成大写汉字。*/
  SELECT @rmb=replace(@rmb,'0','零'),
  @rmb=replace(@rmb,'1','壹'), @rmb=replace(@rmb,'2','贰'), @rmb=replace(@rmb,'3','叁'),
  @rmb=replace(@rmb,'4','肆'), @rmb=replace(@rmb,'5','伍'), @rmb=replace(@rmb,'6','陆'),
  @rmb=replace(@rmb,'7','柒'), @rmb=replace(@rmb,'8','捌'), @rmb=replace(@rmb,'9','玖')
  RETURN(@rmb)
END
GO
