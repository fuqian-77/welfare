package com.welfare.service;

import com.welfare.BookApplication;
import com.welfare.entity.User;
import com.welfare.entity.VisitResult;
import com.welfare.entity.Visitor;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = BookApplication.class)
public class VisitorServiceTest {
    @Autowired
    private VisitorService userService;


    @Test
    public void testCase() {
////        //用户注册测试
        Visitor user =new Visitor();
        user.setName("李昊");
//        user.setNote("曾沿");
////        user.setName("张孜1");
////        user.setPassword("123456");
//////        user.setAge(40);
////        user.setWechat("zhangzi");
////        user.setPhone("17376503170");
////        user.setAddress("浙江省张家界市");
////        user.setCardid("3920488430490");
////        user.setQq("19839405456");
////        user.setNote("");
////        user.setSex("女");
////        user.setEmail("zhangzi@163.com");
//        Map<String, Object> map = userService.register(user);
//        System.out.println(map);
        //用户删除测试
//        int delete = userService.deleteById("v005");
//        System.out.println(delete);

////        用户根据id更新测试
//        user.setVisitorid("v001");
//        user.setNote("。。");
//        int update1 = userService.updateById(user);
//        System.out.println(update1);
//        //拜访记录选择全部测试
        List<VisitResult> selectall = userService.childrenNum(user);
        System.out.println(selectall);
//          Visitor select=userService.selectById("v001");
//        System.out.println(select);
    }
}

