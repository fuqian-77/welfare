package com.welfare.service;

import com.welfare.BookApplication;
import com.welfare.entity.Staff;
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
public class StaffServiceTest {
    @Autowired
    private StaffService staffService;
    @Test
    public void testCase() {
        //用户注册测试,1
//        Staff user =new Staff();
//        user.setStaffid("011");
//        Map<String, Object> map = staffService.register(user);
//        System.out.println(map);
//        //用户登录测试
//         Staff login = staffService.insert(user);
//        System.out.println(login);
        //用户删除测试
        int delete = staffService.deleteById("011");
        System.out.println(delete);
        //用户根据名字更新测试,
//        user.setName("李翔");
//        user.setAddress("1111");
//        int update = staffService.updateByName(user);
//        System.out.println(update);
//        //用户根据id更新测试,1
//        user.setStaffid("001");
//        user.setName("符倩");
//        int update1 = staffService.updateById(user);
//        System.out.println(update1);
//        //用户选择全部测试,1
//        List<Staff> selectall = staffService.selectAll();
//        System.out.println(selectall);
//        List<Staff> find=staffService.findByCondition("符倩");

    }
}

