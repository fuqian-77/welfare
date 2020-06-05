package com.welfare.serviceImpl;

import com.welfare.dao.UserMapper;
import com.welfare.entity.User;
import com.welfare.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public Map<String, Object> login(String userid, String password) {
        Map<String, Object> map = new HashMap<>();

        // 验证账号
        User user = userMapper.selectByPrimaryKey(userid);
        if (user == null) {
            map.put("usernameMsg", "该账号不存在!");
            return map;
        }

        // 验证密码
        if (!user.getPassword().equals(password)) {
            map.put("passwordMsg", "密码不正确!");
            return map;
        }

        //填充用户
        map.put("user", user);
        return map;
    }

    @Override
    public Map<String, Object> register(User user) {
        Map<String, Object> map = new HashMap<>();
        if(userMapper.selectByPrimaryKey(user.getUserid()) != null){
            map.put("Msg", "用户名重复!");
            return map;
        }
        int insert = userMapper.insert(user);
        if(insert > 0 ){
            map.put("Msg", "注册成功!");
            return map;
        }else{
            map.put("Msg", "注册失败!");
            return map;
        }
    }

    @Override
    public List<User> selectAll() {
        return userMapper.selectAll();
    }
    @Override
    public List<User> findByCondition(User record) {
        return userMapper.findByCondition(record);
    }

    @Override
    public int deleteById(String userid) {
        return userMapper.deleteByPrimaryKey(userid);
    }

    @Override
    public User insert(User record) {
        userMapper.insert(record);
        return record;
    }

    @Override
    public User selectById(String userid) {
        return userMapper.selectByPrimaryKey(userid);
    }

    @Override
    public User selectByName(String name) {
        return userMapper.selectByName(name);
    }

    @Override
    public int updateById(User record) {
        return userMapper.updateByPrimaryKey(record);
    }

//    @Override
//    public int updateByName(User record) {
//        return userMapper.updateByName(record);
//    }


}
