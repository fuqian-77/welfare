$(function(){


//	个人信息 编辑
    $("#edit1").click(function(){
        $(".mask").show();
        $(".bj").show();
        $.ajax({
            type: "post",
            dataType: "json",
            contentType: 'application/json',
            url: "http://localhost:8080/welfare/user/findById",
            data: JSON.stringify({
                "userid": userid
            }),
            success: function (result) {
                console.log(result);
                document.getElementById("userid1").value=userid;
                document.getElementById("name1").value=result.name;
                document.getElementById("age1").value=result.age;
                document.getElementById("sex1").value=result.sex;
                document.getElementById("phone1").value=result.phone;
                document.getElementById("wechat1").value=result.wechat;
                document.getElementById("qq1").value=result.qq;
                document.getElementById("address1").value=result.address;
                document.getElementById("cardid1").value=result.cardid;
                document.getElementById("email1").value=result.email;
                document.getElementById("job1").value=result.job;
                document.getElementById("work1").value=result.work;
            }
        });
    });

//	取消按钮
    $("#cancel").click(function(){
        $(".mask").hide();
        $(".bj").hide();
    });
    //	保存按钮
    $("#save").click(function(){
        var name=document.getElementById("name1").value;
        var sex=document.getElementById("sex1").value;
        var age=document.getElementById("age1").value;
        var address=document.getElementById("address1").value;
        var email=document.getElementById("email1").value;
        var wechat=document.getElementById("wechat1").value;
        var qq=document.getElementById("qq1").value;
        var phone=document.getElementById("phone1").value;
        var cardid=document.getElementById("cardid1").value;
        var job=document.getElementById("job1").value;
        var work=document.getElementById("work1").value;
        console.log("qq===="+qq);
        var res = IdCodeValid(cardid);
        var data = analyzeIDCard(cardid);
        var pcheck = checkPhone(phone);
       if (name == null || name == "") {
            alert("请输入姓名！")
        } else {
            if (pcheck == true) {
                if (res.pass == true) {
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            contentType: 'application/json',
                            url: "http://localhost:8080/welfare/user/updateById",
                            data: JSON.stringify({
                                "userid": userid,
                                "name": name,
                                "sex": data.sex,
                                "age":data.age,
                                "address": address,
                                "qq": qq,
                                "phone": phone,
                                "cardid": cardid,
                                "wechat": wechat,
                                "email": email,
                                "job":job,
                                "work":work
                            }),
                            success: function (result) {
                                console.log(result);
                                alert("修改成功！");
                                $(".mask").hide();
                                $(".bj").hide();
                                $.ajax({
                                    type: "post",
                                    dataType: "json",
                                    contentType: 'application/json',
                                    url: "http://localhost:8080/welfare/user/findById",
                                    data: JSON.stringify({
                                        "userid": userid
                                    }),
                                    success: function (result) {
                                        console.log(result);
                                        $("#userid").html(userid);
                                        $("#name").html(result.name);
                                        $("#sex").html(result.sex);
                                        $("#age").html(result.age);
                                        $("#phone").html(result.phone);
                                        $("#wechat").html(result.wechat);
                                        $("#qq").html(result.qq);
                                        $("#cardid").html(result.cardid);
                                        $("#address").html(result.address);
                                        $("#email").html(result.email);
                                        $("#job").html(result.job);
                                        $("#work").html(result.work);
                                    }
                                });
                            }
                        });
                    }else {
                    alert(res.msg);
                    $('#cardid').html("");
                }
            } else {
                alert("请输入正确的电话号码！");
            }
        }

    });


})