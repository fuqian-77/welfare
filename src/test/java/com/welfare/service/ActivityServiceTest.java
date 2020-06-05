package com.welfare.service;

import com.welfare.BookApplication;
import com.welfare.entity.Activity;
import com.welfare.entity.Staff;
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
public class ActivityServiceTest {
    @Autowired
    private ActivityService staffService;


    @Test
    public void testCase() {
        //用户注册测试
        Activity user =new Activity();
        user.setUserid("zhangzi");
        user.setAdate("2020-02-19");
//        user.setHeaderUrl("1");
//        user.setPassword("1");
//        user.setStatus(1);
//        user.setStatus(1);
//        user.setType(1);
//        user.setSalt("1");
//        user.setUsername("2");
//        Map<String, Object> map = userService.register(user);
//        System.out.println(map);
//        //用户登录测试
//         Map<String, Object> login = staffService.login("001","123456");
//        System.out.println(login);
//        //用户删除测试
//        int delete = staffService.deleteById("001");
//        System.out.println(delete);
        //用户根据名字更新测试
//        user.setUsername("李翔");
//        user.setEmail("2");
//        int update = userService.updateByName(user);
//        System.out.println(update);
//        //用户根据id更新测试
//        user.setActivityid("002");
//        user.setChecker("");
//        int update1 = staffService.updateById(user);
//        System.out.println(update1);
//        //用户选择全部测试
        List<Activity> selectall = staffService.selectByUId(user);
        System.out.println(selectall);
//        List<Activity> selectall1 = staffService.selectAll1();
//        System.out.println(selectall1);
    }
}

