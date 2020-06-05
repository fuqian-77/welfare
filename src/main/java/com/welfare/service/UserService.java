package com.welfare.service;

import com.welfare.entity.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    //用户登录
    Map<String, Object> login(String userid, String password);

    //用户注册
    Map<String, Object> register(User user);

    //查询全部用户
    List<User> selectAll();

    List<User> findByCondition(User record);

    int deleteById(String userid);

    User insert(User record);

    User selectById(String userid);

    User selectByName(String name);

    int updateById(User record);

//    int updateByName(User record);
}
