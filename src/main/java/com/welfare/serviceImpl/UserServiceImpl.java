package com.welfare.serviceImpl;

import com.welfare.dao.UserMapper;
import com.welfare.entity.User;
import com.welfare.UserService;
import com.welfare.util.BookUtil;
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
    public Map<String, Object> login(String username, String password) {
        return null;
    }

    @Override
    public Map<String, Object> register(User user) {
        return null;
    }

    @Override
    public List<User> selectAll() {
        return userMapper.selectAll();
    }

    @Override
    public int deleteById(Long id) {
        return 0;
    }

    @Override
    public User insert(User record) {
        return null;
    }

    @Override
    public User selectById(Long id) {
        return null;
    }

    @Override
    public int updateById(User record) {
        return 0;
    }

    @Override
    public int updateByName(User record) {
        return 0;
    }

}
