package com.welfare.service;

import com.welfare.entity.Staff;

import java.util.List;
import java.util.Map;

public interface StaffService {
    //职员登录
    Map<String, Object> login(String staffid, String password);

    //用户注册
    Map<String, Object> register(Staff user);

    //查询全部职员
    List<Staff> selectAll();

    List<Staff> findByCondition(Staff record);


    int deleteById(String staffid);

    Staff insert(Staff record);

    Staff selectById(String staffid);

    int updateById(Staff record);

    int updateByName(Staff record);
}
