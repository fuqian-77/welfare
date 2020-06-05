package com.welfare.service;

import com.welfare.BookApplication;
import com.welfare.entity.Advice;
import com.welfare.entity.Drug;
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
public class DrugServiceTest {
    @Autowired
    private DrugService staffService;


    @Test
    public void testCase() {
//        用户注册测试,1
//        Drug user =new Drug();
//        user.setDrugid("d011");
//        Drug  map = staffService.insert(user);
//        System.out.println(map);
        //用户删除测试,1
        int delete = staffService.deleteById("d011");
        System.out.println(delete);
//        //用户根据id更新测试,1
//        user.setName("青霉素V");
//        user.setNote("1111");
//        int update1 = staffService.updateByName(user);
//        System.out.println(update1);
//        //用户选择全部测试,1
//        Drug select = staffService.selectByName("青霉素V");
//        System.out.println(select);
//         List<Drug> selectall = staffService.selectAll();
//        System.out.println(selectall);
    }
}

