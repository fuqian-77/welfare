// var myDate = new Date();
// myDate.getYear();        // 获取当前年份(2位)
// myDate.getFullYear();    // 获取完整的年份(4位,1970-????)
// myDate.getMonth();       // 获取当前月份(0-11,0代表1月)
// myDate.getDate();        // 获取当前日(1-31)
// myDate.getDay();         // 获取当前星期X(0-6,0代表星期天)
// myDate.getTime();        // 获取当前时间(从1970.1.1开始的毫秒数)
// myDate.getHours();       // 获取当前小时数(0-23)
// myDate.getMinutes();     // 获取当前分钟数(0-59)
// myDate.getSeconds();     // 获取当前秒数(0-59)
// myDate.getMilliseconds();    // 获取当前毫秒数(0-999)
// myDate.toLocaleDateString();     // 获取当前日期
// var mytime=myDate.toLocaleTimeString();     // 获取当前时间
// myDate.toLocaleString( );        // 获取日期与时间



// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18

Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// var time1 = new Date().Format("yyyy-MM-dd");
// var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");


//验证身份证号码是否正确
//
// 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
// 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
// 15位校验规则 6位地址编码+6位出生日期+3位顺序号
// 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
//
//  校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
//                公式(1)中：
//               i----表示号码字符从由至左包括校验码在内的位置序号；
//                 ai----表示第i位置上的号码字符值；
//                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
//                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
//                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
function IdCodeValid(code){
    //身份证号合法性验证
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var row={
        'pass':true,
        'msg':'验证成功'
    };
    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)){
        row={
            'pass':false,
            'msg':'身份证号格式错误'
        };
    }else if(!city[code.substr(0,2)]){
        row={
            'pass':false,
            'msg':'身份证号地址编码错误'
        };
    }else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if(parity[sum % 11] != code[17].toUpperCase()){
                row={
                    'pass':false,
                    'msg':'身份证号校验位错误'
                };
            }
        }
    }
    return row;
}

//根据身份证号码获取性别和年龄
function analyzeIDCard(IDCard){
    var sexAndAge = {};
    //获取用户身份证号码
    var userCard = IDCard;
    //如果身份证号码为undefind则返回空
    if(!userCard){
        return sexAndAge;
    }
    //获取性别
    if(parseInt(userCard.substr(16,1)) % 2 == 1){
        sexAndAge.sex = '男'
    }else{
        sexAndAge.sex = '女'
    }
    //获取出生年月日
    userCard.substring(6,10) + "-" + userCard.substring(10,12) + "-" + userCard.substring(12,14);
    var yearBirth = userCard.substring(6,10);
    var monthBirth = userCard.substring(10,12);
    var dayBirth = userCard.substring(12,14);
    sexAndAge.birthdate=yearBirth+"-"+monthBirth+"-"+dayBirth;
    //获取当前年月日并计算年龄
    var myDate = new Date();
    var monthNow = myDate.getMonth() + 1;
    var dayNow = myDate.getDay();
    var age = myDate.getFullYear() - yearBirth;
    if(monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)){
        age--;
    }
    //得到年龄
    sexAndAge.age = age;
    //返回性别和年龄
    return sexAndAge;
}


// 验证电话号码
function checkPhone(phone){
    if(!(/^1[3456789]\d{9}$/.test(phone))){
        return false;
    }else{
        return true;
    }
}

