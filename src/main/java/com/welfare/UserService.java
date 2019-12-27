package com.welfare;

import com.welfare.entity.User;

import java.util.List;
import java.util.Map;

public interface UserService {

    //用户登录
    Map<String, Object> login(String username, String password);

    //用户注册
    Map<String, Object> register(User user);

    //查询全部用户
    List<User> selectAll();


    int deleteById(Long id);

    User insert(User record);

    User selectById(Long id);

    int updateById(User record);

    int updateByName(User record);

}
