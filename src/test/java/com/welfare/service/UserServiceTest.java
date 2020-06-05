package com.welfare.service;

import com.welfare.BookApplication;
import com.welfare.entity.User;
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
public class UserServiceTest {
    @Autowired
    private UserService userService;


    @Test
    public void testCase() {
        //用户注册测试
//        User user =new User();
//        user.setUserid("u001");
//        user.setName("张孜1");
//        user.setPassword("123456");
////        user.setAge(40);
//        user.setWechat("zhangzi");
//        user.setPhone("17376503170");
//        user.setAddress("浙江省张家界市");
//        user.setCardid("3920488430490");
//        user.setQq("19839405456");
//        user.setNote("");
//        user.setSex("女");
////        user.setEmail("zhangzi@163.com");
//        Map<String, Object> map = userService.register(user);
//        System.out.println(map);
        //用户登录测试
         Map<String, Object> login = userService.login("zhangzi","123456");
        System.out.println(login);
//        //用户删除测试
//        int delete = userService.deleteById("u001");
//        System.out.println(delete);
        //用户根据名字更新测试
//        user.setUsername("李翔");
//        user.setEmail("2");
//        int update = userService.updateByName(user);
//        System.out.println(update);
        //用户根据id更新测试
//        user.setUserid("u001");
//        user.setEmail("zhangq@163.com");
//        int update1 = userService.updateById(user);
//        System.out.println(update1);
////        //用户选择全部测试
//        List<User> selectall = userService.selectAll();
//        System.out.println(selectall);
    }
}

