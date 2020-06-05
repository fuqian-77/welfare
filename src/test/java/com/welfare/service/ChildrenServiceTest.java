package com.welfare.service;

import com.welfare.BookApplication;
import com.welfare.entity.Activity;
import com.welfare.entity.Children;
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
public class ChildrenServiceTest {
    @Autowired
    private ChildrenService staffService;


    @Test
    public void testCase() {
        //用户注册测试,1
        Children user =new Children();
//        user.setChildrenid("0002");
//        user.setName("1");
//        user.setHeaderUrl("1");
//        user.setPassword("1");
//        user.setStatus(1);
//        user.setStatus(1);
//        user.setType(1);
//        user.setSalt("1");
//        user.setUsername("2");
//        Map<String, Object> map = staffService.register(user);
//        System.out.println(map);
//        //用户登录测试
//         Map<String, Object> login = staffService.login("001","123456");
//        System.out.println(login);
        //用户删除测试,1
//        int delete = staffService.deleteById("0002");
//        System.out.println(delete);
        //根据id选择测试，
//Children select =staffService.selectById("002");
//        System.out.println(select);
        //用户根据id更新测试,1
//        user.setChildrenid("012");
//        user.setChecker("001");
//        int update1 = staffService.updateById(user);
//        System.out.println(update1);
        //用户选择全部测试,1
//        List<Children> selectall = staffService.selectAll();
//        System.out.println(selectall);
//        List<Activity> selectall1 = staffService.selectAll1();
//        System.out.println(selectall1);
    }
}

