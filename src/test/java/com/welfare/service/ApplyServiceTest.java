package com.welfare.service;

import com.welfare.BookApplication;
import com.welfare.entity.Apply;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = BookApplication.class)
public class ApplyServiceTest {
    @Autowired
    private ApplyService staffService;


    @Test
    public void testCase() {
//        用户注册测试,1
//        Apply user =new Apply();
//        user.setUserid("zhnagxi");
//        Apply  map = staffService.insert(user);
//        System.out.println(map);
        //用户删除测试,1
//        int delete = staffService.deleteById("g001");
//        System.out.println(delete);
//        //用户根据id更新测试,1
//        user.setBackid(1);
//        user.setNotes("1111");
//        int update1 = staffService.updateById(user);
//        System.out.println(update1);
        //用户选择全部测试,1
//        List<Back> selectall = staffService.selectAll();
//        System.out.println(selectall);
    }
}

