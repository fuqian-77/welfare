package com.welfare.service;
import java.util.List;
import com.welfare.BookApplication;
import com.welfare.entity.Staff;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = BookApplication.class)
public class StaffServiceTest {
    @Autowired
    private StaffService staffService;


    @Test
    public void testCase() {
        //用户注册测试
//        User user =new User();
//        user.setActivationCode("1");
//        user.setEmail("1");
//        user.setHeaderUrl("1");
//        user.setPassword("1");
//        user.setStatus(1);
//        user.setStatus(1);
//        user.setType(1);
//        user.setSalt("1");
//        user.setUsername("2");
//        Map<String, Object> map = userService.register(user);
//        System.out.println(map);
        //用户登录测试
//         Map<String, Object> login = userService.login("2","2");
//        System.out.println(login);
//        //用户删除测试
//        int delete = userService.deleteById(9L);
//        System.out.println(delete);
        //用户根据名字更新测试
//        user.setUsername("李翔");
//        user.setEmail("2");
//        int update = userService.updateByName(user);
//        System.out.println(update);
//        //用户根据id更新测试
//        user.setId(1l);
//        user.setEmail("zhangq@163.com");
//        int update1 = userService.updateById(user);
//        System.out.println(update1);
//        //用户选择全部测试
        List<Staff> selectall = staffService.selectAll();
        System.out.println(selectall);
    }
}

