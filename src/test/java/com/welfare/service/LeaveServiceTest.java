package com.welfare.service;

import com.welfare.BookApplication;
import com.welfare.entity.Leave;
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
public class LeaveServiceTest {
    @Autowired
    private LeaveService staffService;


    @Test
    public void testCase() {
        //用户注册测试,1
        Leave user =new Leave();
//        user.setLeaveid("l003");
//        Map<String, Object> map = staffService.register(user);
//        System.out.println(map);
        //用户删除测试,1
//        int delete = staffService.deleteById("l003");
//        System.out.println(delete);
//        //用户根据id更新测试,1
//        user.setLeaveid("l003");
//        user.setNote("1111");
//        int update1 = staffService.updateById(user);
//        System.out.println(update1);
        //用户选择全部测试,1
//        List<Leave> selectall = staffService.selectAll();
//        System.out.println(selectall);
//        List<Leave> selectall1 = staffService.selectAll1();
//        System.out.println(selectall1);
    }
}

