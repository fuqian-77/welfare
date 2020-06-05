package com.welfare.service;

import com.welfare.BookApplication;
import com.welfare.entity.Advice;
import com.welfare.entity.Recipel;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = BookApplication.class)
public class RecipelServiceTest {
    @Autowired
    private RecipelService staffService;


    @Test
    public void testCase() {
//        用户注册测试,1
//        Recipel user =new Recipel();
//        user.setChildrenid("001");
////        Recipel  map = staffService.insert(user);
////        System.out.println(map);
        //用户删除测试,1
//        int delete = staffService.deleteById("h005");
//        System.out.println(delete);
        //用户根据id更新测试,1
//        user.setAdviceid("h006");/
//        System.out.println(update1);
//        //用户选择全部测试,1
//        List<Recipel> selectall = staffService.selectAll();
//        System.out.println(selectall);
     Recipel  select = staffService.selectById("h007");
     System.out.println(select);
    }
}

