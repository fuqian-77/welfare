package com.welfare.service;

import com.welfare.BookApplication;
import com.welfare.entity.Reject;
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
public class RejectServiceTest {
    @Autowired
    private RejectService staffService;


    @Test
    public void testCase() {
//        //用户注册测试
//        Reject user =new Reject();
//        user.setRejectid(1);

//        user.setHeaderUrl("1");
//        user.setPassword("1");
//        user.setStatus(1);
//        user.setStatus(1);
//        user.setType(1);
//        user.setSalt("1");
//        user.setUsername("2");
//        Reject insert = staffService.insert(user);
//        System.out.println(insert);
//        //用户删除测试
        int delete = staffService.deleteById(1);
        System.out.println(delete);
        //用户根据名字更新测试
//        user.setFlag("通过");
//        int update = staffService.updateById(user);
//        System.out.println(update);
        //用户选择全部测试
//        List<Reject> selectallr = staffService.selectAllr();
//        System.out.println(selectallr);
//        List<Reject> selectall1 = staffService.selectAlla();
//        System.out.println(selectall1);
    }
}

