package com.welfare.service;

import com.welfare.BookApplication;
import com.welfare.entity.Recruit;
import com.welfare.entity.RecruitKey;
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
public class RecruitServiceTest {
    @Autowired
    private RecruitService recruitService;



    @Test
    public void testCase() {
        //用户注册测试
//        Recruit recruit =new Recruit();
//        recruit.setRecruitid("r006");
//        Recruit.setName("张孜1");
//        Recruit.setPassword("123456");
////        Recruit.setAge(40);
//        Recruit.setWechat("zhangzi");
//        Recruit.setPhone("17376503170");
//        Recruit.setAddress("浙江省张家界市");
//        Recruit.setCardid("3920488430490");
//        Recruit.setQq("19839405456");
//        Recruit.setNote("");
//        Recruit.setSex("女");
//        Recruit.setEmail("zhangzi@163.com");
//        Map<String, Object> map = recruitService.register(recruit);
//        System.out.println(map);
        //用户删除测试
//        int delete = recruitService.deleteById("r006");
//        System.out.println(delete);
        //用户根据id更新测试
////        recruit.setUserid("zhangzi");
//        List<Recruit>  update1 =recruitService.selectByUId("zhangzi");
//        System.out.println(update1);
//        //用户选择全部测试
//        RecruitKey key = new RecruitKey();
//        key.setUserid("zhangzi");
//        key.setRecruitid("r007");
        List<Recruit> selectall = recruitService.selectByUId("zhangzi");
        System.out.println(selectall);
//        int selectall = recruitService.activityNum("zhangzi");
//        System.out.println(selectall);
    }
}

